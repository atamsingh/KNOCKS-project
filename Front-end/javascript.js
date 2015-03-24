$(document).ready(function(){
	//alert("TEST reached");
	$.getJSON("http://168.235.65.135:3000/knocks")
	 .done(function(data) {
		//var obj = jQuery.parseJSON(data);
		var obj = data;
		if(obj.type == true){
			$('#KnocksSum').text(obj.data+" Bucks");
		}else{
			console.log("update from get API failed");
		}
	});

	$("#add").click(function(){
		$("#form1").slideToggle("slow");
		if($("#form2").is(":visible")){
			$("#form2").slideToggle("slow");
		};
	});
	
	$("#remove").click(function(){
		$("#form2").slideToggle("slow");
		if($("#form1").is(":visible")){
			$("#form1").slideToggle("slow");
		};
	});
	
	function ajaxCall(m,detail,Value){
		var today = new Date();
		today.toISOString().substring(0, 10);
		//console.log(today);
		var URLtoCall = "http://168.235.65.135:3000/knocks?mode="+m+"&amount="+Value+"&date"+today+"&detail"+detail+"";
		$.ajax({
			url: URLtoCall,
			type: "POST",
			//data: {mode:m,date: today, details:detail,amount:Value}, 
			success: function(data){
				//var obj = data;
				$('#KnocksSum').text(data.data+" Bucks");}
			});
	};
	
	
	$("#submit1").click(function(){
		x = $("input[name=add]:checked").val();
		console.log(x);
		ajaxCall("1","#ActivityName1",""+x);
		//location.reload();
		if($("#form1").is(":visible")){
			$("#form1").slideToggle("slow");
		};
		alert("Congratulations on the well earned "+x+" knocks!");
	});
	
	$("#submit2").click(function(){
		x= $("input[name=remove]:checked").val();
		if(x == 1){
			console.log (ajaxCall("2","Movie","500"));
			location.reload();
		} else if(x == 2){
			console.log (ajaxCall("2","Movie","300"));
			location.reload();
		}else{
			console.log (ajaxCall("2","Movie","200"));
			location.reload();
		}
		if($("#form2").is(":visible")){
			$("#form2").slideToggle("slow");
		};
		alert("You better earn them up quick! :/");
	});
	
});