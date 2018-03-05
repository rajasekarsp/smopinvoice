var invoiceApp = angular.module('myApp', [])

invoiceApp.controller('getDetailsController',['$scope','$http', function($scope, $http)  {
	/* DEFAULTS */
	$scope.invoiceDate = new Date();
	$scope.clientList = [];
	$scope.gstType = "GST";
	$scope.gstSlab = "18";
	$scope.products = [];
	$scope.goodsValue = 0;
	$scope.packingValue = 0;
	$scope.gstValue = 0;
	$scope.totalAmount = 0;
	$scope.advanceAmount = 0;
	$scope.balanceAmount = 0;
	$scope.preparedBy = "MSP";
	$scope.checkedBy = "MSP";
	$scope.refNo = "";
	
	$http.get("data/client-data.json").then(function(response) {
        $scope.clientList = response.data;
	});

	$scope.changeClient = function(){
		if($scope.selectedClient){
			$scope.clientName = $scope.selectedClient.name;
			$scope.clientAddress1 = $scope.selectedClient.address1;
			$scope.clientAddress2 = $scope.selectedClient.address2;
			$scope.clientCity = $scope.selectedClient.city;
			$scope.clientPincode = $scope.selectedClient.pincode;
			$scope.clientGstNo = $scope.selectedClient.gstNo;
		}
		else{
			$scope.clientName = null;
			$scope.clientAddress1 = null;
			$scope.clientAddress2 = null;
			$scope.clientCity = null;
			$scope.clientPincode = null;
			$scope.clientGstNo = null;
		}
	}

$scope.invoiceOrgType = 'Original';
	$scope.preview = false;
	/* PRODUCTS */
	$scope.products.push(new Product());
	$scope.addProduct = function(){
		$scope.products.push(new Product());
	}

	$scope.removeProduct = function(product){
		console.log($scope.products.indexOf(product));
		$scope.products.splice($scope.products.indexOf(product), 1);
	}

	$scope.updateAmount = function(product){
		product.amount = parseFloat(((product.rate * product.quantity) / product.ratePer).toFixed(2));
	}
	var ones = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
	
	$scope.wordsConvertor = function(num){
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
		function(scope) { 
			$scope.goodsValue = 0;
			angular.forEach($scope.products, function(product) {
				$scope.goodsValue += product.amount;
			});
			$scope.goodsValue += $scope.packingValue;
			$scope.gstValue = parseFloat(( ($scope.goodsValue + $scope.packingValue) * $scope.gstSlab / 100).toFixed(2));
			$scope.totalAmount = parseFloat(($scope.goodsValue + $scope.packingValue + $scope.gstValue).toFixed(2));
			$scope.balanceAmount = parseFloat(($scope.totalAmount - $scope.advanceAmount).toFixed(0));			
		}
   );

   $scope.swapView = function(arg){
		window.scrollTo(0, 0);
		$scope.preview = (arg == 'preview') ? true : false;
   }

   $scope.print = function(){
	   window.print();
   }




}])