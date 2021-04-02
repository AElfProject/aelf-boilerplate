using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using AElf;
using AElf.Client.Dto;
using AElf.Client.Service;
using AElf.Types;
using Google.Protobuf;
using Volo.Abp.Threading;

namespace AElf.Boilerplate.EventHandler
{
    public class NodeManager : INodeManager
    {
        public NodeManager(string baseUrl, string keyPath = "")
        {
            _baseUrl = baseUrl;
            _keyStore = AElfKeyStore.GetKeyStore(keyPath);

            ApiClient = AElfClientExtension.GetClient(baseUrl);
            var check = AsyncHelper.RunSync(() => ApiClient.IsConnectedAsync());
            _chainId = GetChainId();
        }

        public string GetApiUrl()
        {
            return _baseUrl;
        }

        public bool UpdateApiUrl(string url)
        {
            _baseUrl = url;
            ApiClient = AElfClientExtension.GetClient(url);
            var check = AsyncHelper.RunSync(() => ApiClient.IsConnectedAsync());
            if (!check)
            {
                return false;
            }

            _chainId = GetChainId();

            return true;
        }

        public string GetChainId()
        {
            if (_chainId != null)
                return _chainId;

            var chainStatus = AsyncHelper.RunSync(ApiClient.GetChainStatusAsync);
            _chainId = chainStatus.ChainId;

            return _chainId;
        }

        public string GetGenesisContractAddress()
        {
            if (_genesisAddress != null) return _genesisAddress;

            var statusDto = AsyncHelper.RunSync(ApiClient.GetChainStatusAsync);
            _genesisAddress = statusDto.GenesisContractAddress;

            return _genesisAddress;
        }

        private string CallTransaction(Transaction tx)
        {
            var rawTransaction = TransactionManager.ConvertTransactionRawTxString(tx);
            return AsyncHelper.RunSync(() => ApiClient.ExecuteTransactionAsync(new ExecuteTransactionDto
            {
                RawTransaction = rawTransaction
            }));
        }

        private TransactionManager GetTransactionManager()
        {
            if (_transactionManager != null) return _transactionManager;

            _transactionManager = new TransactionManager(_keyStore);
            return _transactionManager;
        }

        private AccountManager GetAccountManager()
        {
            if (_accountManager != null) return _accountManager;

            _accountManager = new AccountManager(_keyStore);
            return _accountManager;
        }

        #region Properties

        private string _baseUrl;
        private string _chainId;
        private readonly AElfKeyStore _keyStore;

        private string _genesisAddress;
        public string GenesisAddress => GetGenesisContractAddress();

        private AccountManager _accountManager;
        public AccountManager AccountManager => GetAccountManager();

        private TransactionManager _transactionManager;
        public TransactionManager TransactionManager => GetTransactionManager();
        public AElfClient ApiClient { get; set; }

        #endregion

        #region Account methods

        public string NewAccount(string password = "")
        {
            return AccountManager.NewAccount(password);
        }

        public string GetRandomAccount()
        {
            var accounts = AccountManager.ListAccount();
            var retry = 0;
            while (retry < 5)
            {
                retry++;
                var randomId = CommonHelper.GenerateRandomNumber(0, accounts.Count);
                var result = AccountManager.UnlockAccount(accounts[randomId]);
                if (!result) continue;

                return accounts[randomId];
            }

            throw new Exception("Cannot got account with default password.");
        }

        public string GetAccountPublicKey(string account, string password = "")
        {
            return AccountManager.GetPublicKey(account, password);
        }

        public List<string> ListAccounts()
        {
            return AccountManager.ListAccount();
        }

        public bool UnlockAccount(string account, string password = "")
        {
            return AccountManager.UnlockAccount(account, password);
        }

        #endregion

        #region Web request methods

        public string SendTransaction(string from, string to, string methodName, IMessage inputParameter)
        {
            var rawTransaction = GenerateRawTransaction(from, to, methodName, inputParameter);
            var transactionOutput = AsyncHelper.RunSync(() => ApiClient.SendTransactionAsync(new SendTransactionInput
            {
                RawTransaction = rawTransaction
            }));

            return transactionOutput.TransactionId;
        }

        public string SendTransaction(string rawTransaction)
        {
            return AsyncHelper.RunSync(() => ApiClient.SendTransactionAsync(new SendTransactionInput
            {
                RawTransaction = rawTransaction
            })).TransactionId;
        }

        public List<string> SendTransactions(string rawTransactions)
        {
            var transactions = AsyncHelper.RunSync(() => ApiClient.SendTransactionsAsync(new SendTransactionsInput
            {
                RawTransactions = rawTransactions
            }));

            return transactions.ToList();
        }

        public string GenerateRawTransaction(string from, string to, string methodName, IMessage inputParameter)
        {
            var tr = new Transaction
            {
                From = from.ConvertAddress(),
                To = to.ConvertAddress(),
                MethodName = methodName
            };

            if (tr.MethodName == null)
            {
                return string.Empty;
            }

            tr.Params = inputParameter == null ? ByteString.Empty : inputParameter.ToByteString();
            tr = tr.AddBlockReference(_baseUrl, _chainId);

            TransactionManager.SignTransaction(tr);

            return tr.ToByteArray().ToHex();
        }

        public TransactionResultDto CheckTransactionResult(string txId, int maxSeconds = -1)
        {
            if (maxSeconds == -1) maxSeconds = 600; //check transaction result 10 minutes.
            Thread.Sleep(1000); //wait 1 second ignore NotExisted result
            var stopwatch = Stopwatch.StartNew();
            var pendingSource = new CancellationTokenSource(maxSeconds * 1000);
            var notExistSource = new CancellationTokenSource();
            var compositeCancel =
                CancellationTokenSource.CreateLinkedTokenSource(pendingSource.Token, notExistSource.Token);
            var notExist = 0;
            while (!compositeCancel.IsCancellationRequested)
            {
                TransactionResultDto transactionResult;
                try
                {
                    transactionResult = AsyncHelper.RunSync(() => ApiClient.GetTransactionResultAsync(txId));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    Thread.Sleep(10000);
                    transactionResult = AsyncHelper.RunSync(() => ApiClient.GetTransactionResultAsync(txId));
                }

                var status = transactionResult.Status.ConvertTransactionResultStatus();
                string message;
                string errorMsg;
                switch (status)
                {
                    case TransactionResultStatus.NodeValidationFailed:
                        message = $"Transaction {txId} status: {status}-[{transactionResult.GetTransactionFeeInfo()}]";
                        errorMsg = transactionResult.Error.Contains("\n")
                            ? transactionResult.Error.Split("\n")[0]
                            : transactionResult.Error;
                        message += $"\r\nError Message: {errorMsg}";
                        return transactionResult;
                    case TransactionResultStatus.NotExisted:
                        notExist++;
                        if (notExist >= 20)
                            notExistSource.Cancel(); //Continue check and if status 'NotExisted' and cancel check
                        break;
                    case TransactionResultStatus.PendingValidation:
                    case TransactionResultStatus.Pending:
                        if (notExist > 0) notExist = 0;
                        break;
                    case TransactionResultStatus.Mined:
                        Thread.Sleep(1000); //wait 1 second to wait set best chain
                        return transactionResult;
                    case TransactionResultStatus.Failed:
                        return transactionResult;
                }

                Console.Write(
                    $"\rTransaction {txId} status: {status}, time using: {CommonHelper.ConvertMileSeconds(stopwatch.ElapsedMilliseconds)}");
                Thread.Sleep(1000);
            }

            Console.WriteLine();
            throw new TimeoutException($"Transaction {txId} cannot be 'Mined' after long time.");
        }

        public void CheckTransactionListResult(List<string> transactionIds)
        {
            var transactionQueue = new ConcurrentQueue<string>();
            transactionIds.ForEach(transactionQueue.Enqueue);
            var stopwatch = Stopwatch.StartNew();
            while (transactionQueue.TryDequeue(out var transactionId))
            {
                var id = transactionId;
                TransactionResultDto transactionResult;
                try
                {
                    transactionResult = AsyncHelper.RunSync(() => ApiClient.GetTransactionResultAsync(id));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    Thread.Sleep(5000);
                    transactionResult = AsyncHelper.RunSync(() => ApiClient.GetTransactionResultAsync(id));
                }
                var status = transactionResult.Status.ConvertTransactionResultStatus();
                switch (status)
                {
                    case TransactionResultStatus.Pending:
                    case TransactionResultStatus.PendingValidation:
                    case TransactionResultStatus.NotExisted:
                        Console.Write(
                            $"\r[Processing]: TransactionId={id}, Status: {status}, using time:{CommonHelper.ConvertMileSeconds(stopwatch.ElapsedMilliseconds)}");
                        transactionQueue.Enqueue(id);
                        Thread.Sleep(500);
                        break;
                    case TransactionResultStatus.NodeValidationFailed:
                        break;
                    case TransactionResultStatus.Mined:
                        Thread.Sleep(500);
                        break;
                    case TransactionResultStatus.Failed:
                    case TransactionResultStatus.Conflict:
                        break;
                }
            }

            stopwatch.Stop();
        }

        public T QueryView<T>(string from, string to, string methodName, IMessage inputParameter)
            where T : IMessage<T>, new()
        {
            var transaction = new Transaction
            {
                From = from.ConvertAddress(),
                To = to.ConvertAddress(),
                MethodName = methodName,
                Params = inputParameter == null ? ByteString.Empty : inputParameter.ToByteString()
            };
            transaction = TransactionManager.SignTransaction(transaction);

            var resp = CallTransaction(transaction);

            //deserialize response
            if (resp == null)
            {
                return default;
            }

            var byteArray = ByteArrayHelper.HexStringToByteArray(resp);
            var messageParser = new MessageParser<T>(() => new T());

            return messageParser.ParseFrom(byteArray);
        }

        public ByteString QueryView(string from, string to, string methodName, IMessage inputParameter)
        {
            var transaction = new Transaction
            {
                From = from.ConvertAddress(),
                To = to.ConvertAddress(),
                MethodName = methodName,
                Params = inputParameter == null ? ByteString.Empty : inputParameter.ToByteString()
            };
            transaction = TransactionManager.SignTransaction(transaction);

            var resp = CallTransaction(transaction);

            //deserialize response
            if (resp == null)
            {
                return default;
            }

            var byteArray = ByteArrayHelper.HexStringToByteArray(resp);

            return ByteString.CopyFrom(byteArray);
        }

        //Net Api
        public List<PeerDto> NetGetPeers()
        {
            return AsyncHelper.RunSync(() => ApiClient.GetPeersAsync(true));
        }

        public bool NetAddPeer(string address)
        {
            return AsyncHelper.RunSync(() => ApiClient.AddPeerAsync(address));
        }

        public bool NetRemovePeer(string address)
        {
            return AsyncHelper.RunSync(() => ApiClient.RemovePeerAsync(address));
        }

        public NetworkInfoOutput NetworkInfo()
        {
            return AsyncHelper.RunSync(ApiClient.GetNetworkInfoAsync);
        }

        #endregion
    }
}