var invoiceApp = angular.module('myApp', ['720kb.datepicker'])

invoiceApp.controller('getDetailsController', ['$scope', '$http', function ($scope, $http) {
	/* DEFAULTS */

	$scope.invoice = {
		"invoiceDate":"",
		"invoiceNo":"",
		"eWayBillNo":"",
		"gstType": "GST",
		"gstSlab": "18",
		"products": [],
		"goodsValue": 0,
		"packingValue": 0,
		"gstValue": 0,
		"totalAmount": 0,
		"advanceAmount": 0,
		"balanceAmount": 0,
		"preparedBy": "",
		"checkedBy": "",
		"refNo":"",
		"despatchedThru":"",
		"lrNo":"",
		"despatchedDate":"",
		"despatchedTo":"",
		"documentsThru":"",
		"invoiceOrgType":"Original",
		"client":{
			"clientId": "",
			"clientName":"",
			"clientAddress1":"",
			"clientAddress2":"",
			"clientCity":"",
			"clientPincode":"",
			"clientGstNo":""
		}
	};

	/* INITIAL METHODS */
	$scope.preview = false;

	$scope.getClientList = function () {
		$http.get("http://localhost:3000/api/v1/getClients").then(function (data) {
			$scope.clientList = data.data.response;
		});
	}
	$scope.getClientList();

	/* GET OLD INVOICES LIST */
	$scope.getInvoiceList = function () {
		$scope.oldInvoiceList = [];
		$http.get("http://localhost:3000/api/v1/getInvoices").then(function (data) {
			angular.forEach(data.data.response, function (invoice) {
				invoice.invoiceDate = $scope.formatDateToClient(invoice.invoiceDate);
				$scope.oldInvoiceList.push(invoice);
			});
		});
	}
	$scope.getInvoiceList();

	$scope.formatDateToClient = function (dateStr) {
		let d = new Date(dateStr);
		let month = String(d.getMonth() + 1);
		let day = String(d.getDate());
		const year = String(d.getFullYear());
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return `${day}/${month}/${year}`;
	  }

	$scope.changeClient = function () {
		if ($scope.selectedClient) {
			$scope.invoice.clientId = $scope.selectedClient.id;
			$scope.invoice.clientName = $scope.selectedClient.clientName;
			$scope.invoice.clientAddress1 = $scope.selectedClient.clientAddress1;
			$scope.invoice.clientAddress2 = $scope.selectedClient.clientAddress2;
			$scope.invoice.clientCity = $scope.selectedClient.clientCity;
			$scope.invoice.clientPincode = $scope.selectedClient.clientPincode;
			$scope.invoice.clientGstNo = $scope.selectedClient.clientGstNo;
		}
		else {
			$scope.invoice.clientId = null;
			$scope.invoice.clientName = null;
			$scope.invoice.clientAddress1 = null;
			$scope.invoice.clientAddress2 = null;
			$scope.invoice.clientCity = null;
			$scope.invoice.clientPincode = null;
			$scope.invoice.clientGstNo = null;
		}
	}

	/* PRODUCTS */
	$scope.invoice.products.push(new Product());
	$scope.addProduct = function () {
		$scope.invoice.products.push(new Product());
	}

	$scope.removeProduct = function (product) {
		$scope.invoice.products.splice($scope.invoice.products.indexOf(product), 1);
	}

	$scope.updateAmount = function (product) {
		product.amount = parseFloat(((product.rate * product.quantity) / product.ratePer).toFixed(2));
	}

	var ones = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
	var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	$scope.wordsConvertor = function (num) {
		if ((num = num.toString()).length > 9) return 'overflow';
		n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return; var str = '';
		str += (n[1] != 0) ? (ones[Number(n[1])] || tens[n[1][0]] + ' ' + ones[n[1][1]]) + 'crore ' : '';
		str += (n[2] != 0) ? (ones[Number(n[2])] || tens[n[2][0]] + ' ' + ones[n[2][1]]) + 'lakh ' : '';
		str += (n[3] != 0) ? (ones[Number(n[3])] || tens[n[3][0]] + ' ' + ones[n[3][1]]) + 'thousand ' : '';
		str += (n[4] != 0) ? (ones[Number(n[4])] || tens[n[4][0]] + ' ' + ones[n[4][1]]) + 'hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (ones[Number(n[5])] || tens[n[5][0]] + ' ' + ones[n[5][1]]) + 'only ' : 'only';
		return str;
	}

	$scope.$watch(
		function (scope) {
			$scope.invoice.goodsValue = 0;
			angular.forEach($scope.invoice.products, function (product) {
				$scope.invoice.goodsValue += product.amount;
			});
			$scope.invoice.goodsValue += $scope.invoice.packingValue;
			$scope.invoice.gstValue = parseFloat((($scope.invoice.goodsValue) * $scope.invoice.gstSlab / 100).toFixed(2));
			$scope.invoice.totalAmount = parseFloat(($scope.invoice.goodsValue + $scope.invoice.gstValue).toFixed(2));
			$scope.invoice.balanceAmount = parseFloat(($scope.invoice.totalAmount - $scope.invoice.advanceAmount).toFixed(0));
		}
	);

	$scope.swapView = function (arg) {
		window.scrollTo(0, 0);
		$scope.preview = (arg == 'preview') ? true : false;
	}

	$scope.print = function () {
		var existInvoice = $scope.findInvoice($scope.invoice.invoiceNo);
		if(!existInvoice){
			//var invList = JSON.parse(JSON.stringify($scope.oldInvoiceList));
			//invList.push($scope.invoice);
			//localStorage.setItem("prevInvoiceData", angular.toJson(invList));	
			$scope.saveInvoice();
		}
		window.print();
	}

	$scope.saveInvoice = function () {
		var params = $scope.constructSaveInvoiceParams();
		$http.post("http://localhost:3000/api/v1/saveInvoice", params).then(function (data) {
			$scope.getInvoiceList();
		});
	}

	$scope.constructSaveInvoiceParams = function() {
		return $scope.invoice;
	}

	$scope.loadPrevInvoice = function(){
		if($scope.oldInvoiceList){
			var selInv = $scope.findInvoice($scope.selectedInvoiceNo);
			$scope.invoice = selInv;
			//$scope.swapView('preview');
			//$scope.invoice.invoiceOrgType = "Copy";
		}
		else{
			alert("Sorry! Old Invoice not available");
		}
	}

	$scope.findInvoice = function(invNo){
		var selInv = $scope.oldInvoiceList.filter(function(item) {
  				return item.invoiceNo === invNo;
			})[0];
		return selInv;
	}

}])