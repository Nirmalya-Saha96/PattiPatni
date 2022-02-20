pragma solidity ^0.4.17;

contract Factory{
    struct AppointMarriageName{
        string husbandName;
        string wifeName;
        string approverName;
        uint husbandAdhar;
        uint wifeAdhar;
        uint approverAdhar;
        string husbandAdharHash;
        string wifeAdharHash;
        uint index;
    }

    struct AppointMarriageAddress{
        address husbandAddress;
        address wifeAddress;
        address approverAddress;
    }

    struct Work{
        string vowHash;
        string ringHash;
        bool isComplete;
        bool isCertified;
        bool signature;
        bool isApprove;
    }

    struct Child{
        string childName;
        string fatherName;
        string MotherName;
        uint fatherAdhar;
        uint motherAdhar;
        string fatherHash;
        string motherHash;
        bool isApproved;
    }

    struct Divorce{
      string husbandName;
      string wifeName;
      uint husbandAdhar;
      uint wifeAdhar;
      string certificate;
      bool isCertified;
    }

    address public government;
    uint public totalMarriage;
    uint public totalChild;
    AppointMarriageName[] public appointMarriage;
    AppointMarriageAddress[] public appointMarriageAddress;
    Work[] public work;
    Child[] public child;
    Divorce[] public divorce;
    mapping(uint => mapping(uint => bool)) public marriageList;
    mapping(uint => mapping(uint => address)) public marriageCertificate;
    mapping(uint => bool) public husbandMarriage;
    mapping(uint => bool) public wifeMarriage;
    mapping(uint => address[]) public individualMarriageCertificate;
    mapping(uint => address[]) public individualChildCertificate;
    mapping(uint => mapping(uint => uint)) public childCount;
    mapping(uint => mapping(uint => address[])) public childCertificate;

    function Factory() public{
        government = msg.sender;
        totalMarriage = 0;
        totalChild = 0;
    }

    function bookMarriageAppointment(
     string hn, uint ha, address haddr,
      string wn, uint wa, address waddr,
    string apn, uint apa, address apaddr, string hah, string wah ) public{
        require(!marriageList[ha][wa]);
        require(!husbandMarriage[ha]);
        require(!wifeMarriage[wa]);

        AppointMarriageName memory newAppointMarriageName = AppointMarriageName({
            husbandName: hn,
            wifeName: wn,
            approverName: apn,
            husbandAdhar: ha,
            wifeAdhar: wa,
            approverAdhar: apa,
            husbandAdharHash: hah,
            wifeAdharHash: wah,
            index: appointMarriage.length
        });

        AppointMarriageAddress memory newAppointMarriageAddress = AppointMarriageAddress({
            husbandAddress: haddr,
            wifeAddress: waddr,
            approverAddress: apaddr
        });

        Work memory newWork = Work({
            vowHash: "",
            ringHash: "",
            isComplete: false,
            isCertified: false,
            signature: false,
            isApprove: false
        });

        appointMarriage.push(newAppointMarriageName);
        appointMarriageAddress.push(newAppointMarriageAddress);
        work.push(newWork);
    }

    function approveMarriage(uint aAdhar, uint index) public{
        require(msg.sender == appointMarriageAddress[index].approverAddress);
        require(appointMarriage[index].approverAdhar == aAdhar);
        require(!work[index].isApprove);

        work[index].isApprove = true;
    }

    function wifeSignature(uint wAdhar, uint index) public{
        require(msg.sender == appointMarriageAddress[index].wifeAddress);
        require(appointMarriage[index].wifeAdhar == wAdhar);
        require(work[index].isApprove);
        require(!work[index].signature);

        work[index].signature = true;
    }

    function uploadHusband(string vHash, string rHash, uint hAdhar, uint index) public payable{
        require(msg.sender == appointMarriageAddress[index].husbandAddress);
        require(appointMarriage[index].husbandAdhar == hAdhar);
        require(work[index].signature);
        require(!work[index].isComplete);
        require(msg.value == 100000000000000000);

        work[index].vowHash = vHash;
        work[index].ringHash = rHash;
        work[index].isComplete = true;
    }

    function claimChildBirth(
        string child_name, string father_name, string mother_name, uint father_adhar, uint mother_adhar,
        string father_hash, string mother_hash
    )public payable{
        require(marriageList[father_adhar][mother_adhar]);
        require(childCount[father_adhar][mother_adhar] < 3);
        require(msg.value == 100000000000000000);

         Child memory newChild = Child({
            childName: child_name,
            fatherName: father_name,
            MotherName: mother_name,
            fatherAdhar: father_adhar,
            motherAdhar: mother_adhar,
            fatherHash: father_hash,
            motherHash: mother_hash,
            isApproved: false
        });

        child.push(newChild);
    }

    function claimChildBirthWithFine(
        string child_name, string father_name, string mother_name, uint father_adhar, uint mother_adhar,
        string father_hash, string mother_hash
    )public payable{
        require(marriageList[father_adhar][mother_adhar]);
        require(childCount[father_adhar][mother_adhar] >= 2);
        require(msg.value == 1000000000000000000);

         Child memory newChild = Child({
            childName: child_name,
            fatherName: father_name,
            MotherName: mother_name,
            fatherAdhar: father_adhar,
            motherAdhar: mother_adhar,
            fatherHash: father_hash,
            motherHash: mother_hash,
            isApproved: false
        });

        child.push(newChild);
    }

    function claimDivorce(string husband_name, string wife_name, uint husband_adhar, uint wife_adhar, string c_hash) public {
      require(marriageList[husband_adhar][wife_adhar]);
      require(husbandMarriage[husband_adhar]);
      require(wifeMarriage[wife_adhar]);

      Divorce memory newDivorce = Divorce({
        husbandName: husband_name,
        wifeName: wife_name,
        husbandAdhar: husband_adhar,
        wifeAdhar: wife_adhar,
        certificate: c_hash,
        isCertified: false
      });

      divorce.push(newDivorce);
    }

    function governmentMarriageCertificate(uint index) public{
        require(msg.sender == government);
        require(!marriageList[appointMarriage[index].husbandAdhar][appointMarriage[index].wifeAdhar]);
        require(!husbandMarriage[appointMarriage[index].husbandAdhar]);
        require(!wifeMarriage[appointMarriage[index].wifeAdhar]);
        require(!work[index].isCertified);
        require(work[index].isComplete);

        address newMarriage = new Certificate(
            appointMarriage[index].husbandName,
            appointMarriage[index].husbandAdhar,
            appointMarriage[index].wifeName,
            appointMarriage[index].wifeAdhar,
            appointMarriage[index].approverName,
            work[index].vowHash,
            work[index].ringHash
        );

        totalMarriage++;
        work[index].isCertified = true;
        husbandMarriage[appointMarriage[index].husbandAdhar] = true;
        wifeMarriage[appointMarriage[index].wifeAdhar] = true;
        marriageList[appointMarriage[index].husbandAdhar][appointMarriage[index].wifeAdhar] = true;
        marriageCertificate[appointMarriage[index].husbandAdhar][appointMarriage[index].wifeAdhar] = newMarriage;
        individualMarriageCertificate[appointMarriage[index].husbandAdhar].push(newMarriage);
        individualMarriageCertificate[appointMarriage[index].wifeAdhar].push(newMarriage);
    }

    function governmentChildCertificate(uint index) public{
        require(msg.sender == government);
        require(!child[index].isApproved);

        address newChild = new Certificate(
            child[index].fatherName,
            child[index].fatherAdhar,
            child[index].MotherName,
            child[index].motherAdhar,
            child[index].childName,
            child[index].fatherHash,
            child[index].motherHash
        );

        totalChild++;
        child[index].isApproved = true;
        childCount[child[index].fatherAdhar][child[index].motherAdhar]++;
        childCertificate[child[index].fatherAdhar][child[index].motherAdhar].push(newChild);
        individualChildCertificate[child[index].fatherAdhar].push(newChild);
        individualChildCertificate[child[index].motherAdhar].push(newChild);
    }

    function governmentCertifyDivorce(uint index) public{
      require(msg.sender == government);
      require(marriageList[divorce[index].husbandAdhar][divorce[index].wifeAdhar]);
      require(husbandMarriage[divorce[index].husbandAdhar]);
      require(wifeMarriage[divorce[index].wifeAdhar]);
      require(!divorce[index].isCertified);

      marriageList[divorce[index].husbandAdhar][divorce[index].wifeAdhar] = false;
      husbandMarriage[divorce[index].husbandAdhar] = false;
      wifeMarriage[divorce[index].wifeAdhar] = false;
      divorce[index].isCertified = true;
    }

    function checkMarried(uint husband_adhar, uint wife_adhar) public view returns(bool){
        return marriageList[husband_adhar][wife_adhar];
    }

    function checkHusbandMarriage(uint husband_adhar) public view returns(bool){
      return husbandMarriage[husband_adhar];
    }

    function checkWifeMarriage(uint wife_adhar) public view returns(bool){
      return wifeMarriage[wife_adhar];
    }

    function getMarriageCertificate(uint husband_adhar, uint wife_adhar) public view returns(address){
        return marriageCertificate[husband_adhar][wife_adhar];
    }

    function getChildCertificate(uint father_adhar, uint mother_adhar) public view returns(address[]){
        return childCertificate[father_adhar][mother_adhar];
    }

    function getChildCount(uint father_adhar, uint mother_adhar) public view returns(uint){
        return childCount[father_adhar][mother_adhar];
    }

    function getSummary() public view returns(uint, uint, uint){
        return(
            totalMarriage,
            totalChild,
            this.balance
        );
    }

    function publicCheckDetails(uint adhar_no) public view returns(address[], address[]){
        return (
            individualMarriageCertificate[adhar_no],
            individualChildCertificate[adhar_no]
        );
    }

    function getAppointMarriageCount() public view returns(uint){
      return appointMarriage.length;
    }

    function getChildRequestCount() public view returns(uint){
      return child.length;
    }

    function getDivorceCount() public view returns(uint){
      return divorce.length;
    }

    function getBalance() public view returns(uint){
        return this.balance;
    }

    function moneyTransfer(address a) public {
      require(msg.sender == government);
      a.transfer(this.balance);
    }
}

contract Certificate{
    string public husbandName;
    uint public husbandAdhar;
    string public wifeName;
    uint public wifeAdhar;
    string public approver;
    string public vowHash;
    string public ringHash;

    function Certificate(
         string hn, uint ha, string wn, uint wa,
         string ph, string vh, string rh
    ) public {
        husbandName = hn;
        husbandAdhar = ha;
        wifeName = wn;
        wifeAdhar = wa;
        approver = ph;
        vowHash = vh;
        ringHash = rh;
    }

    function getCertificate() public view returns(
         string, uint, string, uint, string, string, string
    ){
        return(
            husbandName,
            husbandAdhar,
            wifeName,
            wifeAdhar,
            approver,
            vowHash,
            ringHash
        );
    }
}
