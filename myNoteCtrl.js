app.controller("myNoteCtrl", function($scope) {
    $scope.message = "";// create message variable
    $scope.block= false;// create block variable to restrict the user to not enter more than 100 ctrs
    $scope.letters = 100;
    $scope.disableValue=false;
    $scope.user="";
    $scope.login = function(msg) {
        swal({   title: "Login",
                text: "Please login to use notepad feature",
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Login!",
                closeOnConfirm: false },
            function(isConfirm){
                if (isConfirm)
                {
                    window.location.assign("login.html");
                }
                else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");   } });
    };
    $scope.clear = function() {
        $scope.message = "";
        $scope.block= false;
        $scope.letters = 100-$scope.message.length;
    };
    $scope.save = function() {
        if($scope.message.length == 0){
            swal({   title: "Info",   text: "Please type some text to save!",   type: "warning",   confirmButtonText: "Close" });
            document.getElementsByClassName("conform").click = window.location.assign("http://www.w3schools.com");
        }else{
            swal({   title: "Saved",   text: "Your content is saved",   type: "success",   confirmButtonText: "Close" });
        }
    };
    $scope.maxLimit = function() {
        $scope.letters = 100-$scope.message.length;
        // to solve the issue of shoowing -1 in text we use = sign
        if((100-$scope.message.length) <= 0){
            swal({   title: "Warning",   text: "Max text reached!",   type: "warning",   confirmButtonText: "Close" });
            $scope.block= true;// we will use this boolean value to set value for ng-disable directive
        }else {
            // reset logic is written in $scope.clear function
        }
    };
    $scope.validate = function() {
        var user=document.getElementById('userName').value;
        var password=document.getElementById('password').value;
        $scope.handleClick = function(msg) {
            $scope.$emit('handleEmit', {user: msg});
        };
        if(user==""){
            alert('please fill the username');
        } else if (password==""){
            alert('please fill the password');
        }
        else if(user =="test" && password=="password"){
            $scope.$emit('handleEmit', {message: user});
            window.location.assign("app.html");
        }else if(user !=="test" || password !=="password"){
            alert('Please fill the correct credentials');
        }
    };
});
app.controller('myAppCtrl',function($scope) {
    $scope.message = "";// create message variable
    $scope.block= false;// create block variable to restrict the user to not enter more than 100 ctrs
    $scope.letters = 100;
    $scope.disableValue=false;
});