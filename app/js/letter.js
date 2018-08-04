var letterApp = angular.module('myletterApp', ['720kb.datepicker','ui.tinymce'])

letterApp.controller('letterController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	/* DEFAULTS */

	$scope.letter = {
		"client":{
			"clientName":"",
			"clientAddress1":"",
			"clientAddress2":"",
			"clientCity":"",
			"clientPincode":"",
			"clientGstNo":""
		},
		"date":"",
		"ref":"",
		"message":""
	};

	$http.get("data/client-data.json").then(function (response) {
		$scope.clientList = response.data;
	});

	
	$scope.changeClient = function () {
		if ($scope.selectedClient) {
			$scope.letter.client.clientName = $scope.selectedClient.name;
			$scope.letter.client.clientAddress1 = $scope.selectedClient.address1;
			$scope.letter.client.clientAddress2 = $scope.selectedClient.address2;
			$scope.letter.client.clientCity = $scope.selectedClient.city;
			$scope.letter.client.clientPincode = $scope.selectedClient.pincode;
			$scope.letter.client.clientGstNo = $scope.selectedClient.gstNo;
		}
		else {
			$scope.letter.client.clientName = null;
			$scope.letter.client.clientAddress1 = null;
			$scope.letter.client.clientAddress2 = null;
			$scope.letter.client.clientCity = null;
			$scope.letter.client.clientPincode = null;
			$scope.letter.client.clientGstNo = null;
		}
	}

	
	$scope.preview = false;

	$scope.$watch(
		function (scope) {
			$scope.htmlDisplayMessage = $sce.trustAsHtml($scope.letter.message);
		}
	);

	$scope.swapView = function (arg) {
		window.scrollTo(0, 0);
		$scope.preview = (arg == 'preview') ? true : false;
	}

	$scope.print = function () {
		window.print();
	}

}])