**ACS3 specific methods**
-------------------------

**CreateProposal**
~~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc CreateProposal (CreateProposalInput) returns (aelf.Hash) { }

   message CreateProposalInput {
       string contract_method_name = 1;
       aelf.Address to_address = 2;
       bytes params = 3;
       google.protobuf.Timestamp expired_time = 4;
       aelf.Address organization_address = 5;
       string proposal_description_url = 6,
       aelf.Hash token = 7;
   }

   message ProposalCreated{
       option (aelf.is_event) = true;
       aelf.Hash proposal_id = 1;
   }

This method creates a proposal for which organization members can vote.
When the proposal is released, a transaction will be sent to the
specified contract.

**returns:** the ID of the newly created proposal.

**CreateProposalInput**: - **contract method name**: the name of the
method to call after release. - **to address**: the address of the
contract to call after release. - **expiration**: the timestamp at which
this proposal will expire. - **organization address**: the address of
the organization. - **proposal_description_url**: the url is used for
proposal describing. - **token**: the token is for proposal id
generation and with this token, proposal id can be calculated before
proposing.

After a successful execution, a **ProposalCreated** event log can be
found in the transaction result.

**ProposalCreated**: - **proposal_id**: the id of the created proposal.

**Approve**
~~~~~~~~~~~

.. code:: protobuf

       rpc Approve (aelf.Hash) returns (google.protobuf.Empty) {}
       
       message ReceiptCreated {
           option (aelf.is_event) = true;
           aelf.Hash proposal_id = 1;
           aelf.Address address = 2;
           string receipt_type = 3;
           google.protobuf.Timestamp time = 4;
       }

This method is called to approve the specified proposal.

**Hash**: the id of the proposal.

After a successful execution, a **ReceiptCreated** event log can be
found in the transaction result.

**ReceiptCreated**: - **proposal id**: id of proposal to reject. -
**address**: send address who votes for approval. - **receipt type**:
Approve. - **time**: timestamp of this method call.

**Reject**
~~~~~~~~~~

.. code:: protobuf

       rpc Reject(aelf.Hash) returns (google.protobuf.Empty) { }
       
       message ReceiptCreated {
           option (aelf.is_event) = true;
           aelf.Hash proposal_id = 1;
           aelf.Address address = 2;
           string receipt_type = 3;
           google.protobuf.Timestamp time = 4;
       }

This method is called to reject the specified proposal.

**Hash**: the id of the proposal.

After a successful execution, a **ReceiptCreated** event log can be
found in the transaction result.

**ReceiptCreated**: - **proposal id**: id of proposal to reject. -
**address**: send address who votes for rejection. - **receipt type**:
Reject. - **time**: timestamp of this method call.

**Abstain**
~~~~~~~~~~~

.. code:: protobuf

       rpc Abstain(aelf.Hash) returns (google.protobuf.Empty) { }

       message ReceiptCreated {
           option (aelf.is_event) = true;
           aelf.Hash proposal_id = 1;
           aelf.Address address = 2;
           string receipt_type = 3;
           google.protobuf.Timestamp time = 4;
       }

This method is called to abstain from the specified proposal.

**Hash**: the id of the proposal.

After a successful execution, a **ReceiptCreated** event log can be
found in the transaction result.

**ReceiptCreated**: - **proposal id**: id of proposal to abstain. -
**address**: send address who votes for abstention. - **receipt type**:
Abstain. - **time**: timestamp of this method call.

**Release**
~~~~~~~~~~~

.. code:: protobuf

       rpc Release(aelf.Hash) returns (google.protobuf.Empty) { }

This method is called to release the specified proposal.

**Hash**: the id of the proposal.

**ChangeOrganizationThreshold**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc ChangeOrganizationThreshold(ProposalReleaseThreshold) returns (google.protobuf.Empty) { }

   message ProposalReleaseThreshold {
       int64 minimal_approval_threshold = 1;
       int64 maximal_rejection_threshold = 2;
       int64 maximal_abstention_threshold = 3;
       int64 minimal_vote_threshold = 4;
   }

   message OrganizationThresholdChanged{
       option (aelf.is_event) = true;
       aelf.Address organization_address = 1;
       ProposalReleaseThreshold proposer_release_threshold = 2;
   }

This method changes the thresholds associated with proposals. All fields
will be overwritten by the input value and this will affect all current
proposals of the organization. Note: only the organization can execute
this through a proposal.

**ProposalReleaseThreshold**: - **minimal approval threshold**: the new
value for the minimum approval threshold. - **maximal rejection
threshold**: the new value for the maximal rejection threshold. -
**maximal abstention threshold**: the new value for the maximal
abstention threshold. - **minimal vote threshold**: the new value for
the minimal vote threshold.

After a successful execution, an **OrganizationThresholdChanged** event
log can be found in the transaction result.

**OrganizationThresholdChanged**: - **organization_address**: the
organization address. - **proposer_release_threshold**: the new release
threshold.

**ChangeOrganizationProposerWhiteList**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc ChangeOrganizationProposerWhiteList(ProposerWhiteList) returns (google.protobuf.Empty) { }

   message ProposerWhiteList {
       repeated aelf.Address proposers = 1;
   }

   message OrganizationWhiteListChanged{
       option (aelf.is_event) = true;
       aelf.Address organization_address = 1;
       ProposerWhiteList proposer_white_list = 2;
   }

This method overrides the list of whitelisted proposers.

**ProposerWhiteList**: - **proposers**: the new value for the list.

After a successful execution, a **OrganizationWhiteListChanged** event
log can be found in the transaction result.

**OrganizationWhiteListChanged**: - **organization_address**: the
organization address. - **proposer_white_list**: the new proposer
whitelist.

**CreateProposalBySystemContract**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc CreateProposalBySystemContract(CreateProposalBySystemContractInput) returns (aelf.Hash) { }

   message CreateProposalBySystemContractInput {
       acs3.CreateProposalInput proposal_input = 1;
       aelf.Address origin_proposer = 2;
   }

   message ProposalCreated{
       option (aelf.is_event) = true;
       aelf.Hash proposal_id = 1;
   }

Used by system contracts to create proposals.

**CreateProposalBySystemContractInput**: - **CreateProposalInput**: -
**contract method name**: the name of the method to call after release.
- **to address**: the address of the contract to call after release. -
**expiration**: the date at which this proposal will expire. -
**organization address**: the address of the organization. -
**proposal_description_url**: the url is used for proposal describing. -
**token**: the token is for proposal id generation and proposal id can
be calculated before proposing. - **origin proposer**: the actor that
trigger the call.

After a successful execution, a **OrganizationWhiteListChanged** event
log can be found in the transaction result.

**ProposalCreated**: - **proposal_id**: the id of the created proposal.

**ClearProposal**
~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc ClearProposal(aelf.Hash) returns (google.protobuf.Empty) { }

Removes the specified proposal.

**ValidateOrganizationExist**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: protobuf

   rpc ValidateOrganizationExist(aelf.Address) returns (google.protobuf.BoolValue) { }

Checks the existence of an organization.
