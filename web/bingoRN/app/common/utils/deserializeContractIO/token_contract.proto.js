/**
 * @file token_contract_proto.js
 * @author aelf
 */
export default {
  "nested": {
    "token": {
      "options": {
        "csharp_namespace": "AElf.Contracts.MultiToken"
      },
      "nested": {
        "TokenContract": {
          "methods": {
            "Create": {
              "requestType": "CreateInput",
              "responseType": "google.protobuf.Empty"
            },
            "Issue": {
              "requestType": "IssueInput",
              "responseType": "google.protobuf.Empty"
            },
            "Transfer": {
              "requestType": "TransferInput",
              "responseType": "google.protobuf.Empty"
            },
            "TransferFrom": {
              "requestType": "TransferFromInput",
              "responseType": "google.protobuf.Empty"
            },
            "Approve": {
              "requestType": "ApproveInput",
              "responseType": "google.protobuf.Empty"
            },
            "UnApprove": {
              "requestType": "UnApproveInput",
              "responseType": "google.protobuf.Empty"
            },
            "Lock": {
              "requestType": "LockInput",
              "responseType": "google.protobuf.Empty"
            },
            "Unlock": {
              "requestType": "UnlockInput",
              "responseType": "google.protobuf.Empty"
            },
            "Burn": {
              "requestType": "BurnInput",
              "responseType": "google.protobuf.Empty"
            },
            "AddTokenWhiteList": {
              "requestType": "AddTokeWhiteListInput",
              "responseType": "google.protobuf.Empty"
            },
            "SetPrimaryTokenSymbol": {
              "requestType": "SetPrimaryTokenSymbolInput",
              "responseType": "google.protobuf.Empty"
            },
            "CrossChainTransfer": {
              "requestType": "CrossChainTransferInput",
              "responseType": "google.protobuf.Empty"
            },
            "CrossChainReceiveToken": {
              "requestType": "CrossChainReceiveTokenInput",
              "responseType": "google.protobuf.Empty"
            },
            "CrossChainCreateToken": {
              "requestType": "CrossChainCreateTokenInput",
              "responseType": "google.protobuf.Empty"
            },
            "InitializeFromParentChain": {
              "requestType": "InitializeFromParentChainInput",
              "responseType": "google.protobuf.Empty"
            },
            "ClaimTransactionFees": {
              "requestType": "TotalTransactionFeesMap",
              "responseType": "google.protobuf.Empty"
            },
            "ChargeTransactionFees": {
              "requestType": "ChargeTransactionFeesInput",
              "responseType": "google.protobuf.BoolValue"
            },
            "SetSymbolsToPayTxSizeFee": {
              "requestType": "SymbolListToPayTxSizeFee",
              "responseType": "google.protobuf.Empty"
            },
            "UpdateCoefficientsForSender": {
              "requestType": "UpdateCoefficientsInput",
              "responseType": "google.protobuf.Empty"
            },
            "CheckThreshold": {
              "requestType": "CheckThresholdInput",
              "responseType": "google.protobuf.Empty"
            },
            "InitialCoefficients": {
              "requestType": "google.protobuf.Empty",
              "responseType": "google.protobuf.Empty"
            },
            "DonateResourceToken": {
              "requestType": "TotalResourceTokensMaps",
              "responseType": "google.protobuf.Empty"
            },
            "ChargeResourceToken": {
              "requestType": "ChargeResourceTokenInput",
              "responseType": "google.protobuf.Empty"
            },
            "CheckResourceToken": {
              "requestType": "google.protobuf.Empty",
              "responseType": "google.protobuf.Empty"
            },
            "UpdateCoefficientsForContract": {
              "requestType": "UpdateCoefficientsInput",
              "responseType": "google.protobuf.Empty"
            },
            "InitializeAuthorizedController": {
              "requestType": "google.protobuf.Empty",
              "responseType": "google.protobuf.Empty"
            },
            "GetTokenInfo": {
              "requestType": "GetTokenInfoInput",
              "responseType": "TokenInfo",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetNativeTokenInfo": {
              "requestType": "google.protobuf.Empty",
              "responseType": "TokenInfo",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetResourceTokenInfo": {
              "requestType": "google.protobuf.Empty",
              "responseType": "TokenInfoList",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetBalance": {
              "requestType": "GetBalanceInput",
              "responseType": "GetBalanceOutput",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetAllowance": {
              "requestType": "GetAllowanceInput",
              "responseType": "GetAllowanceOutput",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "IsInWhiteList": {
              "requestType": "IsInWhiteListInput",
              "responseType": "google.protobuf.BoolValue",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetLockedAmount": {
              "requestType": "GetLockedAmountInput",
              "responseType": "GetLockedAmountOutput",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetCrossChainTransferTokenContractAddress": {
              "requestType": "GetCrossChainTransferTokenContractAddressInput",
              "responseType": "aelf.Address",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetPrimaryTokenSymbol": {
              "requestType": "google.protobuf.Empty",
              "responseType": "google.protobuf.StringValue",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetCalculateFeeCoefficientsForContract": {
              "requestType": "google.protobuf.Int32Value",
              "responseType": "CalculateFeeCoefficients",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetCalculateFeeCoefficientsForSender": {
              "requestType": "google.protobuf.Empty",
              "responseType": "CalculateFeeCoefficients",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetSymbolsToPayTxSizeFee": {
              "requestType": "google.protobuf.Empty",
              "responseType": "SymbolListToPayTxSizeFee",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetLatestTotalTransactionFeesMapHash": {
              "requestType": "google.protobuf.Empty",
              "responseType": "aelf.Hash",
              "options": {
                "(aelf.is_view)": true
              }
            },
            "GetLatestTotalResourceTokensMapsHash": {
              "requestType": "google.protobuf.Empty",
              "responseType": "aelf.Hash",
              "options": {
                "(aelf.is_view)": true
              }
            }
          }
        },
        "TokenInfo": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "tokenName": {
              "type": "string",
              "id": 2
            },
            "supply": {
              "type": "int64",
              "id": 3
            },
            "totalSupply": {
              "type": "int64",
              "id": 4
            },
            "decimals": {
              "type": "int32",
              "id": 5
            },
            "issuer": {
              "type": "aelf.Address",
              "id": 6
            },
            "isBurnable": {
              "type": "bool",
              "id": 7
            },
            "isProfitable": {
              "type": "bool",
              "id": 8
            },
            "issueChainId": {
              "type": "int32",
              "id": 9
            },
            "burned": {
              "type": "int64",
              "id": 10
            }
          }
        },
        "CreateInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "tokenName": {
              "type": "string",
              "id": 2
            },
            "totalSupply": {
              "type": "int64",
              "id": 3
            },
            "decimals": {
              "type": "int32",
              "id": 4
            },
            "issuer": {
              "type": "aelf.Address",
              "id": 5
            },
            "isBurnable": {
              "type": "bool",
              "id": 6
            },
            "lockWhiteList": {
              "rule": "repeated",
              "type": "aelf.Address",
              "id": 7
            },
            "isProfitable": {
              "type": "bool",
              "id": 8
            },
            "issueChainId": {
              "type": "int32",
              "id": 9
            }
          }
        },
        "RegisterNativeTokenInfoInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "tokenName": {
              "type": "string",
              "id": 2
            },
            "totalSupply": {
              "type": "int64",
              "id": 3
            },
            "decimals": {
              "type": "int32",
              "id": 4
            },
            "issuer": {
              "type": "aelf.Address",
              "id": 5
            },
            "isBurnable": {
              "type": "bool",
              "id": 6
            },
            "isProfitable": {
              "type": "bool",
              "id": 7
            },
            "issueChainId": {
              "type": "int32",
              "id": 8
            }
          }
        },
        "SetPrimaryTokenSymbolInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            }
          }
        },
        "IssueInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "amount": {
              "type": "int64",
              "id": 2
            },
            "memo": {
              "type": "string",
              "id": 3
            },
            "to": {
              "type": "aelf.Address",
              "id": 4
            }
          }
        },
        "TransferInput": {
          "fields": {
            "to": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "amount": {
              "type": "int64",
              "id": 3
            },
            "memo": {
              "type": "string",
              "id": 4
            }
          }
        },
        "LockInput": {
          "fields": {
            "address": {
              "type": "aelf.Address",
              "id": 1
            },
            "lockId": {
              "type": "aelf.Hash",
              "id": 2
            },
            "symbol": {
              "type": "string",
              "id": 3
            },
            "usage": {
              "type": "string",
              "id": 4
            },
            "amount": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "UnlockInput": {
          "fields": {
            "address": {
              "type": "aelf.Address",
              "id": 1
            },
            "lockId": {
              "type": "aelf.Hash",
              "id": 2
            },
            "symbol": {
              "type": "string",
              "id": 3
            },
            "usage": {
              "type": "string",
              "id": 4
            },
            "amount": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "TransferFromInput": {
          "fields": {
            "from": {
              "type": "aelf.Address",
              "id": 1
            },
            "to": {
              "type": "aelf.Address",
              "id": 2
            },
            "symbol": {
              "type": "string",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            },
            "memo": {
              "type": "string",
              "id": 5
            }
          }
        },
        "ApproveInput": {
          "fields": {
            "spender": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "amount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UnApproveInput": {
          "fields": {
            "spender": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "amount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "BurnInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "amount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChargeResourceTokenInput": {
          "fields": {
            "costDic": {
              "keyType": "string",
              "type": "int64",
              "id": 1
            },
            "caller": {
              "type": "aelf.Address",
              "id": 2
            }
          }
        },
        "TransactionFeeBill": {
          "fields": {
            "feesMap": {
              "keyType": "string",
              "type": "int64",
              "id": 1
            }
          }
        },
        "CheckThresholdInput": {
          "fields": {
            "sender": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbolToThreshold": {
              "keyType": "string",
              "type": "int64",
              "id": 2
            },
            "isCheckAllowance": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "GetTokenInfoInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            }
          }
        },
        "GetBalanceInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "owner": {
              "type": "aelf.Address",
              "id": 2
            }
          }
        },
        "GetBalanceOutput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "owner": {
              "type": "aelf.Address",
              "id": 2
            },
            "balance": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "GetAllowanceInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "owner": {
              "type": "aelf.Address",
              "id": 2
            },
            "spender": {
              "type": "aelf.Address",
              "id": 3
            }
          }
        },
        "GetAllowanceOutput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "owner": {
              "type": "aelf.Address",
              "id": 2
            },
            "spender": {
              "type": "aelf.Address",
              "id": 3
            },
            "allowance": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "CrossChainTransferInput": {
          "fields": {
            "to": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "amount": {
              "type": "int64",
              "id": 3
            },
            "memo": {
              "type": "string",
              "id": 4
            },
            "toChainId": {
              "type": "int32",
              "id": 5
            },
            "issueChainId": {
              "type": "int32",
              "id": 6
            }
          }
        },
        "CrossChainReceiveTokenInput": {
          "fields": {
            "fromChainId": {
              "type": "int32",
              "id": 1
            },
            "parentChainHeight": {
              "type": "int64",
              "id": 2
            },
            "transferTransactionBytes": {
              "type": "bytes",
              "id": 3
            },
            "merklePath": {
              "type": "aelf.MerklePath",
              "id": 4
            }
          }
        },
        "IsInWhiteListInput": {
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "address": {
              "type": "aelf.Address",
              "id": 2
            }
          }
        },
        "SymbolToPayTxSizeFee": {
          "fields": {
            "tokenSymbol": {
              "type": "string",
              "id": 1
            },
            "baseTokenWeight": {
              "type": "int32",
              "id": 2
            },
            "addedTokenWeight": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "SymbolListToPayTxSizeFee": {
          "fields": {
            "symbolsToPayTxSizeFee": {
              "rule": "repeated",
              "type": "SymbolToPayTxSizeFee",
              "id": 1
            }
          }
        },
        "ChargeTransactionFeesInput": {
          "fields": {
            "methodName": {
              "type": "string",
              "id": 1
            },
            "contractAddress": {
              "type": "aelf.Address",
              "id": 2
            },
            "transactionSizeFee": {
              "type": "int64",
              "id": 3
            },
            "primaryTokenSymbol": {
              "type": "string",
              "id": 4
            },
            "symbolsToPayTxSizeFee": {
              "rule": "repeated",
              "type": "SymbolToPayTxSizeFee",
              "id": 5
            }
          }
        },
        "ExtraTokenListModified": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "symbolListToPayTxSizeFee": {
              "type": "SymbolListToPayTxSizeFee",
              "id": 1
            }
          }
        },
        "ReturnTaxInput": {
          "fields": {
            "balanceBeforeSelling": {
              "type": "int64",
              "id": 1
            },
            "returnTaxReceiverAddress": {
              "type": "aelf.Address",
              "id": 2
            }
          }
        },
        "GetLockedAmountInput": {
          "fields": {
            "address": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "lockId": {
              "type": "aelf.Hash",
              "id": 3
            }
          }
        },
        "GetLockedAmountOutput": {
          "fields": {
            "address": {
              "type": "aelf.Address",
              "id": 1
            },
            "symbol": {
              "type": "string",
              "id": 2
            },
            "lockId": {
              "type": "aelf.Hash",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "TokenInfoList": {
          "fields": {
            "value": {
              "rule": "repeated",
              "type": "TokenInfo",
              "id": 1
            }
          }
        },
        "GetCrossChainTransferTokenContractAddressInput": {
          "fields": {
            "chainId": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "CrossChainCreateTokenInput": {
          "fields": {
            "fromChainId": {
              "type": "int32",
              "id": 1
            },
            "parentChainHeight": {
              "type": "int64",
              "id": 2
            },
            "transactionBytes": {
              "type": "bytes",
              "id": 3
            },
            "merklePath": {
              "type": "aelf.MerklePath",
              "id": 4
            }
          }
        },
        "AddTokeWhiteListInput": {
          "fields": {
            "tokenSymbol": {
              "type": "string",
              "id": 1
            },
            "address": {
              "type": "aelf.Address",
              "id": 2
            }
          }
        },
        "InitializeFromParentChainInput": {
          "fields": {
            "resourceAmount": {
              "keyType": "string",
              "type": "int32",
              "id": 1
            },
            "registeredOtherTokenContractAddresses": {
              "keyType": "int32",
              "type": "aelf.Address",
              "id": 2
            },
            "creator": {
              "type": "aelf.Address",
              "id": 3
            }
          }
        },
        "UpdateCoefficientsInput": {
          "fields": {
            "pieceNumbers": {
              "rule": "repeated",
              "type": "int32",
              "id": 1
            },
            "coefficients": {
              "type": "CalculateFeeCoefficients",
              "id": 2
            }
          }
        },
        "FeeTypeEnum": {
          "values": {
            "READ": 0,
            "STORAGE": 1,
            "WRITE": 2,
            "TRAFFIC": 3,
            "TX": 4
          }
        },
        "CalculateFeePieceCoefficients": {
          "fields": {
            "value": {
              "rule": "repeated",
              "type": "int32",
              "id": 1
            }
          }
        },
        "CalculateFeeCoefficients": {
          "fields": {
            "feeTokenType": {
              "type": "int32",
              "id": 1
            },
            "pieceCoefficientsList": {
              "rule": "repeated",
              "type": "CalculateFeePieceCoefficients",
              "id": 2
            }
          }
        },
        "AllCalculateFeeCoefficients": {
          "fields": {
            "value": {
              "rule": "repeated",
              "type": "CalculateFeeCoefficients",
              "id": 1
            }
          }
        },
        "TotalTransactionFeesMap": {
          "fields": {
            "value": {
              "keyType": "string",
              "type": "int64",
              "id": 1
            },
            "blockHash": {
              "type": "aelf.Hash",
              "id": 2
            },
            "blockHeight": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "TotalResourceTokensMaps": {
          "fields": {
            "value": {
              "rule": "repeated",
              "type": "ContractTotalResourceTokens",
              "id": 1
            },
            "blockHash": {
              "type": "aelf.Hash",
              "id": 2
            },
            "blockHeight": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ContractTotalResourceTokens": {
          "fields": {
            "contractAddress": {
              "type": "aelf.Address",
              "id": 1
            },
            "tokensMap": {
              "type": "TotalResourceTokensMap",
              "id": 2
            }
          }
        },
        "TotalResourceTokensMap": {
          "fields": {
            "value": {
              "keyType": "string",
              "type": "int64",
              "id": 1
            }
          }
        },
        "Transferred": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "from": {
              "type": "aelf.Address",
              "id": 1,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "to": {
              "type": "aelf.Address",
              "id": 2,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "symbol": {
              "type": "string",
              "id": 3,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "amount": {
              "type": "int64",
              "id": 4
            },
            "memo": {
              "type": "string",
              "id": 5
            }
          }
        },
        "Approved": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "owner": {
              "type": "aelf.Address",
              "id": 1,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "spender": {
              "type": "aelf.Address",
              "id": 2,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "symbol": {
              "type": "string",
              "id": 3,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "UnApproved": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "owner": {
              "type": "aelf.Address",
              "id": 1,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "spender": {
              "type": "aelf.Address",
              "id": 2,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "symbol": {
              "type": "string",
              "id": 3,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "Burned": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "burner": {
              "type": "aelf.Address",
              "id": 1,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "symbol": {
              "type": "string",
              "id": 2,
              "options": {
                "(aelf.is_indexed)": true
              }
            },
            "amount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChainPrimaryTokenSymbolSet": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "tokenSymbol": {
              "type": "string",
              "id": 1
            }
          }
        },
        "TransactionSizeFeeUnitPriceUpdated": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "unitPrice": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "CalculateFeeAlgorithmUpdated": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "allTypeFeeCoefficients": {
              "type": "AllCalculateFeeCoefficients",
              "id": 1
            }
          }
        },
        "RentalCharged": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "amount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "RentalAccountBalanceInsufficient": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "amount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "TokenCreated": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "tokenName": {
              "type": "string",
              "id": 2
            },
            "totalSupply": {
              "type": "int64",
              "id": 3
            },
            "decimals": {
              "type": "int32",
              "id": 4
            },
            "issuer": {
              "type": "aelf.Address",
              "id": 5
            },
            "isBurnable": {
              "type": "bool",
              "id": 6
            },
            "isProfitable": {
              "type": "bool",
              "id": 7
            },
            "issueChainId": {
              "type": "int32",
              "id": 8
            }
          }
        },
        "Issued": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "symbol": {
              "type": "string",
              "id": 1
            },
            "amount": {
              "type": "int64",
              "id": 2
            },
            "memo": {
              "type": "string",
              "id": 3
            },
            "to": {
              "type": "aelf.Address",
              "id": 4
            }
          }
        },
        "CrossChainTransferred": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "from": {
              "type": "aelf.Address",
              "id": 1
            },
            "to": {
              "type": "aelf.Address",
              "id": 2
            },
            "symbol": {
              "type": "string",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            },
            "memo": {
              "type": "string",
              "id": 5
            },
            "toChainId": {
              "type": "int32",
              "id": 6
            },
            "issueChainId": {
              "type": "int32",
              "id": 7
            }
          }
        },
        "CrossChainReceived": {
          "options": {
            "(aelf.is_event)": true
          },
          "fields": {
            "from": {
              "type": "aelf.Address",
              "id": 1
            },
            "to": {
              "type": "aelf.Address",
              "id": 2
            },
            "symbol": {
              "type": "string",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            },
            "memo": {
              "type": "string",
              "id": 5
            },
            "fromChainId": {
              "type": "int32",
              "id": 6
            },
            "issueChainId": {
              "type": "int32",
              "id": 7
            },
            "parentChainHeight": {
              "type": "int64",
              "id": 8
            }
          }
        }
      }
    },
    "aelf": {
      "options": {
        "csharp_namespace": "AElf"
      },
      "nested": {
        "Transaction": {
          "fields": {
            "from": {
              "type": "Address",
              "id": 1
            },
            "to": {
              "type": "Address",
              "id": 2
            },
            "refBlockNumber": {
              "type": "int64",
              "id": 3
            },
            "refBlockPrefix": {
              "type": "bytes",
              "id": 4
            },
            "methodName": {
              "type": "string",
              "id": 5
            },
            "params": {
              "type": "bytes",
              "id": 6
            },
            "signature": {
              "type": "bytes",
              "id": 10000
            }
          }
        },
        "StatePath": {
          "fields": {
            "parts": {
              "rule": "repeated",
              "type": "string",
              "id": 1
            }
          }
        },
        "ScopedStatePath": {
          "fields": {
            "address": {
              "type": "Address",
              "id": 1
            },
            "path": {
              "type": "StatePath",
              "id": 2
            }
          }
        },
        "TransactionResultStatus": {
          "values": {
            "NOT_EXISTED": 0,
            "PENDING": 1,
            "FAILED": 2,
            "MINED": 3,
            "UNEXECUTABLE": 4,
            "CONFLICT": 5
          }
        },
        "TransactionResult": {
          "fields": {
            "transactionId": {
              "type": "Hash",
              "id": 1
            },
            "status": {
              "type": "TransactionResultStatus",
              "id": 2
            },
            "logs": {
              "rule": "repeated",
              "type": "LogEvent",
              "id": 3
            },
            "bloom": {
              "type": "bytes",
              "id": 4
            },
            "returnValue": {
              "type": "bytes",
              "id": 5
            },
            "blockNumber": {
              "type": "int64",
              "id": 6
            },
            "blockHash": {
              "type": "Hash",
              "id": 7
            },
            "index": {
              "type": "int32",
              "id": 8
            },
            "stateHash": {
              "type": "Hash",
              "id": 9
            },
            "error": {
              "type": "string",
              "id": 10
            }
          }
        },
        "LogEvent": {
          "fields": {
            "address": {
              "type": "Address",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "indexed": {
              "rule": "repeated",
              "type": "bytes",
              "id": 3
            },
            "nonIndexed": {
              "type": "bytes",
              "id": 4
            }
          }
        },
        "SmartContractRegistration": {
          "fields": {
            "category": {
              "type": "sint32",
              "id": 1
            },
            "code": {
              "type": "bytes",
              "id": 2
            },
            "codeHash": {
              "type": "Hash",
              "id": 3
            },
            "isSystemContract": {
              "type": "bool",
              "id": 4
            },
            "version": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "TransactionExecutingStateSet": {
          "fields": {
            "writes": {
              "keyType": "string",
              "type": "bytes",
              "id": 1
            },
            "reads": {
              "keyType": "string",
              "type": "bool",
              "id": 2
            },
            "deletes": {
              "keyType": "string",
              "type": "bool",
              "id": 3
            }
          }
        },
        "Address": {
          "fields": {
            "value": {
              "type": "bytes",
              "id": 1
            }
          }
        },
        "Hash": {
          "fields": {
            "value": {
              "type": "bytes",
              "id": 1
            }
          }
        },
        "SInt32Value": {
          "fields": {
            "value": {
              "type": "sint32",
              "id": 1
            }
          }
        },
        "SInt64Value": {
          "fields": {
            "value": {
              "type": "sint64",
              "id": 1
            }
          }
        },
        "MerklePath": {
          "fields": {
            "merklePathNodes": {
              "rule": "repeated",
              "type": "MerklePathNode",
              "id": 1
            }
          }
        },
        "MerklePathNode": {
          "fields": {
            "hash": {
              "type": "Hash",
              "id": 1
            },
            "isLeftChildNode": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "BinaryMerkleTree": {
          "fields": {
            "nodes": {
              "rule": "repeated",
              "type": "Hash",
              "id": 1
            },
            "root": {
              "type": "Hash",
              "id": 2
            },
            "leafCount": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "identity": {
          "type": "string",
          "id": 500001,
          "extend": "google.protobuf.FileOptions"
        },
        "base": {
          "rule": "repeated",
          "type": "string",
          "id": 505001,
          "extend": "google.protobuf.ServiceOptions"
        },
        "csharpState": {
          "type": "string",
          "id": 505030,
          "extend": "google.protobuf.ServiceOptions"
        },
        "isView": {
          "type": "bool",
          "id": 506001,
          "extend": "google.protobuf.MethodOptions"
        },
        "isEvent": {
          "type": "bool",
          "id": 50100,
          "extend": "google.protobuf.MessageOptions"
        },
        "isIndexed": {
          "type": "bool",
          "id": 502001,
          "extend": "google.protobuf.FieldOptions"
        }
      }
    },
    "google": {
      "nested": {
        "protobuf": {
          "nested": {
            "FileDescriptorSet": {
              "fields": {
                "file": {
                  "rule": "repeated",
                  "type": "FileDescriptorProto",
                  "id": 1
                }
              }
            },
            "FileDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "package": {
                  "type": "string",
                  "id": 2
                },
                "dependency": {
                  "rule": "repeated",
                  "type": "string",
                  "id": 3
                },
                "publicDependency": {
                  "rule": "repeated",
                  "type": "int32",
                  "id": 10,
                  "options": {
                    "packed": false
                  }
                },
                "weakDependency": {
                  "rule": "repeated",
                  "type": "int32",
                  "id": 11,
                  "options": {
                    "packed": false
                  }
                },
                "messageType": {
                  "rule": "repeated",
                  "type": "DescriptorProto",
                  "id": 4
                },
                "enumType": {
                  "rule": "repeated",
                  "type": "EnumDescriptorProto",
                  "id": 5
                },
                "service": {
                  "rule": "repeated",
                  "type": "ServiceDescriptorProto",
                  "id": 6
                },
                "extension": {
                  "rule": "repeated",
                  "type": "FieldDescriptorProto",
                  "id": 7
                },
                "options": {
                  "type": "FileOptions",
                  "id": 8
                },
                "sourceCodeInfo": {
                  "type": "SourceCodeInfo",
                  "id": 9
                },
                "syntax": {
                  "type": "string",
                  "id": 12
                }
              }
            },
            "DescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "field": {
                  "rule": "repeated",
                  "type": "FieldDescriptorProto",
                  "id": 2
                },
                "extension": {
                  "rule": "repeated",
                  "type": "FieldDescriptorProto",
                  "id": 6
                },
                "nestedType": {
                  "rule": "repeated",
                  "type": "DescriptorProto",
                  "id": 3
                },
                "enumType": {
                  "rule": "repeated",
                  "type": "EnumDescriptorProto",
                  "id": 4
                },
                "extensionRange": {
                  "rule": "repeated",
                  "type": "ExtensionRange",
                  "id": 5
                },
                "oneofDecl": {
                  "rule": "repeated",
                  "type": "OneofDescriptorProto",
                  "id": 8
                },
                "options": {
                  "type": "MessageOptions",
                  "id": 7
                },
                "reservedRange": {
                  "rule": "repeated",
                  "type": "ReservedRange",
                  "id": 9
                },
                "reservedName": {
                  "rule": "repeated",
                  "type": "string",
                  "id": 10
                }
              },
              "nested": {
                "ExtensionRange": {
                  "fields": {
                    "start": {
                      "type": "int32",
                      "id": 1
                    },
                    "end": {
                      "type": "int32",
                      "id": 2
                    }
                  }
                },
                "ReservedRange": {
                  "fields": {
                    "start": {
                      "type": "int32",
                      "id": 1
                    },
                    "end": {
                      "type": "int32",
                      "id": 2
                    }
                  }
                }
              }
            },
            "FieldDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "number": {
                  "type": "int32",
                  "id": 3
                },
                "label": {
                  "type": "Label",
                  "id": 4
                },
                "type": {
                  "type": "Type",
                  "id": 5
                },
                "typeName": {
                  "type": "string",
                  "id": 6
                },
                "extendee": {
                  "type": "string",
                  "id": 2
                },
                "defaultValue": {
                  "type": "string",
                  "id": 7
                },
                "oneofIndex": {
                  "type": "int32",
                  "id": 9
                },
                "jsonName": {
                  "type": "string",
                  "id": 10
                },
                "options": {
                  "type": "FieldOptions",
                  "id": 8
                }
              },
              "nested": {
                "Type": {
                  "values": {
                    "TYPE_DOUBLE": 1,
                    "TYPE_FLOAT": 2,
                    "TYPE_INT64": 3,
                    "TYPE_UINT64": 4,
                    "TYPE_INT32": 5,
                    "TYPE_FIXED64": 6,
                    "TYPE_FIXED32": 7,
                    "TYPE_BOOL": 8,
                    "TYPE_STRING": 9,
                    "TYPE_GROUP": 10,
                    "TYPE_MESSAGE": 11,
                    "TYPE_BYTES": 12,
                    "TYPE_UINT32": 13,
                    "TYPE_ENUM": 14,
                    "TYPE_SFIXED32": 15,
                    "TYPE_SFIXED64": 16,
                    "TYPE_SINT32": 17,
                    "TYPE_SINT64": 18
                  }
                },
                "Label": {
                  "values": {
                    "LABEL_OPTIONAL": 1,
                    "LABEL_REQUIRED": 2,
                    "LABEL_REPEATED": 3
                  }
                }
              }
            },
            "OneofDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "options": {
                  "type": "OneofOptions",
                  "id": 2
                }
              }
            },
            "EnumDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "value": {
                  "rule": "repeated",
                  "type": "EnumValueDescriptorProto",
                  "id": 2
                },
                "options": {
                  "type": "EnumOptions",
                  "id": 3
                }
              }
            },
            "EnumValueDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "number": {
                  "type": "int32",
                  "id": 2
                },
                "options": {
                  "type": "EnumValueOptions",
                  "id": 3
                }
              }
            },
            "ServiceDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "method": {
                  "rule": "repeated",
                  "type": "MethodDescriptorProto",
                  "id": 2
                },
                "options": {
                  "type": "ServiceOptions",
                  "id": 3
                }
              }
            },
            "MethodDescriptorProto": {
              "fields": {
                "name": {
                  "type": "string",
                  "id": 1
                },
                "inputType": {
                  "type": "string",
                  "id": 2
                },
                "outputType": {
                  "type": "string",
                  "id": 3
                },
                "options": {
                  "type": "MethodOptions",
                  "id": 4
                },
                "clientStreaming": {
                  "type": "bool",
                  "id": 5
                },
                "serverStreaming": {
                  "type": "bool",
                  "id": 6
                }
              }
            },
            "FileOptions": {
              "fields": {
                "javaPackage": {
                  "type": "string",
                  "id": 1
                },
                "javaOuterClassname": {
                  "type": "string",
                  "id": 8
                },
                "javaMultipleFiles": {
                  "type": "bool",
                  "id": 10
                },
                "javaGenerateEqualsAndHash": {
                  "type": "bool",
                  "id": 20,
                  "options": {
                    "deprecated": true
                  }
                },
                "javaStringCheckUtf8": {
                  "type": "bool",
                  "id": 27
                },
                "optimizeFor": {
                  "type": "OptimizeMode",
                  "id": 9,
                  "options": {
                    "default": "SPEED"
                  }
                },
                "goPackage": {
                  "type": "string",
                  "id": 11
                },
                "ccGenericServices": {
                  "type": "bool",
                  "id": 16
                },
                "javaGenericServices": {
                  "type": "bool",
                  "id": 17
                },
                "pyGenericServices": {
                  "type": "bool",
                  "id": 18
                },
                "deprecated": {
                  "type": "bool",
                  "id": 23
                },
                "ccEnableArenas": {
                  "type": "bool",
                  "id": 31
                },
                "objcClassPrefix": {
                  "type": "string",
                  "id": 36
                },
                "csharpNamespace": {
                  "type": "string",
                  "id": 37
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ],
              "reserved": [
                [
                  38,
                  38
                ]
              ],
              "nested": {
                "OptimizeMode": {
                  "values": {
                    "SPEED": 1,
                    "CODE_SIZE": 2,
                    "LITE_RUNTIME": 3
                  }
                }
              }
            },
            "MessageOptions": {
              "fields": {
                "messageSetWireFormat": {
                  "type": "bool",
                  "id": 1
                },
                "noStandardDescriptorAccessor": {
                  "type": "bool",
                  "id": 2
                },
                "deprecated": {
                  "type": "bool",
                  "id": 3
                },
                "mapEntry": {
                  "type": "bool",
                  "id": 7
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ],
              "reserved": [
                [
                  8,
                  8
                ]
              ]
            },
            "FieldOptions": {
              "fields": {
                "ctype": {
                  "type": "CType",
                  "id": 1,
                  "options": {
                    "default": "STRING"
                  }
                },
                "packed": {
                  "type": "bool",
                  "id": 2
                },
                "jstype": {
                  "type": "JSType",
                  "id": 6,
                  "options": {
                    "default": "JS_NORMAL"
                  }
                },
                "lazy": {
                  "type": "bool",
                  "id": 5
                },
                "deprecated": {
                  "type": "bool",
                  "id": 3
                },
                "weak": {
                  "type": "bool",
                  "id": 10
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ],
              "reserved": [
                [
                  4,
                  4
                ]
              ],
              "nested": {
                "CType": {
                  "values": {
                    "STRING": 0,
                    "CORD": 1,
                    "STRING_PIECE": 2
                  }
                },
                "JSType": {
                  "values": {
                    "JS_NORMAL": 0,
                    "JS_STRING": 1,
                    "JS_NUMBER": 2
                  }
                }
              }
            },
            "OneofOptions": {
              "fields": {
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ]
            },
            "EnumOptions": {
              "fields": {
                "allowAlias": {
                  "type": "bool",
                  "id": 2
                },
                "deprecated": {
                  "type": "bool",
                  "id": 3
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ]
            },
            "EnumValueOptions": {
              "fields": {
                "deprecated": {
                  "type": "bool",
                  "id": 1
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ]
            },
            "ServiceOptions": {
              "fields": {
                "deprecated": {
                  "type": "bool",
                  "id": 33
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ]
            },
            "MethodOptions": {
              "fields": {
                "deprecated": {
                  "type": "bool",
                  "id": 33
                },
                "uninterpretedOption": {
                  "rule": "repeated",
                  "type": "UninterpretedOption",
                  "id": 999
                }
              },
              "extensions": [
                [
                  1000,
                  536870911
                ]
              ]
            },
            "UninterpretedOption": {
              "fields": {
                "name": {
                  "rule": "repeated",
                  "type": "NamePart",
                  "id": 2
                },
                "identifierValue": {
                  "type": "string",
                  "id": 3
                },
                "positiveIntValue": {
                  "type": "uint64",
                  "id": 4
                },
                "negativeIntValue": {
                  "type": "int64",
                  "id": 5
                },
                "doubleValue": {
                  "type": "double",
                  "id": 6
                },
                "stringValue": {
                  "type": "bytes",
                  "id": 7
                },
                "aggregateValue": {
                  "type": "string",
                  "id": 8
                }
              },
              "nested": {
                "NamePart": {
                  "fields": {
                    "namePart": {
                      "rule": "required",
                      "type": "string",
                      "id": 1
                    },
                    "isExtension": {
                      "rule": "required",
                      "type": "bool",
                      "id": 2
                    }
                  }
                }
              }
            },
            "SourceCodeInfo": {
              "fields": {
                "location": {
                  "rule": "repeated",
                  "type": "Location",
                  "id": 1
                }
              },
              "nested": {
                "Location": {
                  "fields": {
                    "path": {
                      "rule": "repeated",
                      "type": "int32",
                      "id": 1
                    },
                    "span": {
                      "rule": "repeated",
                      "type": "int32",
                      "id": 2
                    },
                    "leadingComments": {
                      "type": "string",
                      "id": 3
                    },
                    "trailingComments": {
                      "type": "string",
                      "id": 4
                    },
                    "leadingDetachedComments": {
                      "rule": "repeated",
                      "type": "string",
                      "id": 6
                    }
                  }
                }
              }
            },
            "GeneratedCodeInfo": {
              "fields": {
                "annotation": {
                  "rule": "repeated",
                  "type": "Annotation",
                  "id": 1
                }
              },
              "nested": {
                "Annotation": {
                  "fields": {
                    "path": {
                      "rule": "repeated",
                      "type": "int32",
                      "id": 1
                    },
                    "sourceFile": {
                      "type": "string",
                      "id": 2
                    },
                    "begin": {
                      "type": "int32",
                      "id": 3
                    },
                    "end": {
                      "type": "int32",
                      "id": 4
                    }
                  }
                }
              }
            },
            "Empty": {
              "fields": {}
            },
            "DoubleValue": {
              "fields": {
                "value": {
                  "type": "double",
                  "id": 1
                }
              }
            },
            "FloatValue": {
              "fields": {
                "value": {
                  "type": "float",
                  "id": 1
                }
              }
            },
            "Int64Value": {
              "fields": {
                "value": {
                  "type": "int64",
                  "id": 1
                }
              }
            },
            "UInt64Value": {
              "fields": {
                "value": {
                  "type": "uint64",
                  "id": 1
                }
              }
            },
            "Int32Value": {
              "fields": {
                "value": {
                  "type": "int32",
                  "id": 1
                }
              }
            },
            "UInt32Value": {
              "fields": {
                "value": {
                  "type": "uint32",
                  "id": 1
                }
              }
            },
            "BoolValue": {
              "fields": {
                "value": {
                  "type": "bool",
                  "id": 1
                }
              }
            },
            "StringValue": {
              "fields": {
                "value": {
                  "type": "string",
                  "id": 1
                }
              }
            },
            "BytesValue": {
              "fields": {
                "value": {
                  "type": "bytes",
                  "id": 1
                }
              }
            }
          }
        }
      }
    }
  }
};
