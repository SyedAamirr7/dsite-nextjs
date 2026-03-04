	
/*--------------------------------------
	Fixed Navbar Top
	--------------------------------------
	
	$(window).on('scroll', function() {
		if ($(this).scrollTop() >= 200) {
			$('.navbar').addClass('fixed-top');
		} else if ($(this).scrollTop() == 0) {
			$('.navbar').removeClass('fixed-top');
		}
	});
*/
/*--------------------------------------
	Scroll To Top
	--------------------------------------
	$(".scroll-to-top").click(function(){ 
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
*/
	
/*--------------------------------------
	Scroll To Section
	--------------------------------------*/
	$(".navbar .nav-link").click(function(){
		var div = $(this).attr("href");
		$(".navbar .nav-link").removeClass("active");
		$(this).addClass("active");
		$("html, body").animate({ scrollTop: $(div).offset().top}, 1000);
	}); 
	
/*--------------------------------------
	counter-number
	--------------------------------------*/
	
	$('.counter-number').counterUp({
	    delay: 10,
	    time: 1000
	}); 

/*--------------------------------------
	validation
	--------------------------------------*/ 
	(function() {
		'use strict';
		window.addEventListener('load', function() {
		  // Fetch all the forms we want to apply custom Bootstrap validation styles to
		  var forms = document.getElementsByClassName('needs-validation');
		  // Loop over them and prevent submission
		  var validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
			  if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			  }
			  form.classList.add('was-validated');
			}, false);
		  });
		}, false);
	})();
$(document).ready(function() {
    $(".picker-icon").click(function() {
        $(this).parent().parent().toggleClass('opened');
    });
});


// for color and background
 function changeColor(obj, mainId, colorId, color, type, effect, id){
            var data = {
            colorId: colorId,
            mainId: mainId,
            type: type,
            ColId: colorId
                };
                $.ajax({
                    url: Base_Url+"/acp/liveupdation/change_color",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                        if(result == '1'){
                            
                            if(effect == 'cButton'){
                                obj.closest("section").find("."+effect).css('background-color',color);
                            }else if(effect == 'bgStyle'){
                                obj.closest("section").css('background-color',color);
                            }
                            else{
                                obj.closest("section").find("."+effect).removeClass('color1');
                                obj.closest("section").find("."+effect).removeClass('color2');
                                obj.closest("section").find("."+effect).removeClass('color3');
                                obj.closest("section").find("."+effect).removeClass('color4');
                                obj.closest("section").find("."+effect).removeClass('color5');
                                obj.closest("section").find("."+effect).removeClass('color6');
                                obj.closest("section").find("."+effect).removeClass('color7');
                                obj.closest("section").find("."+effect).removeClass('color8');
                                obj.closest("section").find("."+effect).addClass(id);
                            }
                            
                            
                            obj.parent().parent().parent().find("button").css("background-color", color);
                        }
                    }
                });
            
            
        }
        
        function removeImg(mainId, obj){
            var data = {
            mainId: mainId,
                };
                $.ajax({
                    url: Base_Url+"/acp/liveupdation/bg_img_remove",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                        obj.closest("section").css('background-image', 'none');
                  },
               });
            
        };
        
        function bgImage(obj, mainId, obj2){
            var fd = new FormData();
            var files = obj.files;
            // Check file selected or not
            if(files.length > 0 ){
               fd.append('Section_Image',files[0]);
               fd.append('id',mainId);
               $.ajax({
                  url: Base_Url+"/acp/liveupdation/change_bg_img",
                  type: 'post',
                  data: fd,
                  contentType: false,
                  processData: false,
                  success: function(response){
                     if(response == '1'){
                        readURL(obj, obj2);
                     }
                  },
               });
            }
        };
    
    function readURL(input,obj) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                obj.closest("section").css('background-image', 'url('+e.target.result+')');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    
    // for header footer color and background
 function changeHFColor(obj, colorId, websiteId, key, type, id, color){
            var data = {
            colorId: colorId,
            websiteId: websiteId,
            key: key,
                };
                $.ajax({
                    url: Base_Url+"/acp/liveupdation/change_HF_color",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                        if(result == '1'){
                            
                            if(type == 'color'){
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color1');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color2');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color3');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color4');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color5');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color6');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color7');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").removeClass('color8');
                                obj.parent().parent().parent().parent().parent().parent().parent().parent().parent().find(".cNav").addClass(id);
                                
                            }
                            else if(type == 'background-color'){
                                if(key=='footer_bgcolor'){
                                   document.getElementById("f").style.backgroundColor = color;
                                }else if(key=='header_bgcolor'){
                                   document.getElementById("h").style.backgroundColor = color;
                                }
                            }
                            obj.parent().parent().parent().find("button").css("background-color", color);
                            obj.parent().parent().parent().find("button").html('');
                            if(colorId == "transparent"){
                                obj.parent().parent().parent().find("button").css("color", '#000');
                                obj.parent().parent().parent().find("button").css("padding-left", '10%');
                                obj.parent().parent().parent().find("button").html("<b>Transparent</b>");
                            }
                        }
                    }
                });
            
            
        }
        
function changeLogoColor(obj, key, websiteId) {
    var data = {
        key: key,
        websiteId: websiteId,
        value: obj.val(),
    };
    $.ajax({
        url: Base_Url + "/acp/liveupdation/change_logo_color",
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function (result) {
            if (result == '1') {

                if (key == 'header_logo') {
                    if(obj.val() == 'dark')
                        $('#hLogo').attr("src", dark_logo);
                    if(obj.val() == 'white')
                        $('#hLogo').attr("src", light_logo);
                } else if (key == 'footer_logo') {
                    if(obj.val() == 'dark')
                        $('#fLogo').attr("src", dark_logo);
                    if(obj.val() == 'white')
                        $('#fLogo').attr("src", light_logo);
                }
            }
        }
    });
}  

// for pages

// for color and background
 function changePageColor(obj, colorId, websiteId, key, effect, id, color){
            var data = {
            colorId: colorId,
            websiteId: websiteId,
            key: key
                };
                $.ajax({
                    url: Base_Url+"/acp/liveupdation/change_page_colors",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                        if(result == '1'){
                            
                            if(effect == 'cButton'){
                                obj.closest("section").find("."+effect).css('background-color',color);
                            }else if(effect == 'bgStyle'){
                                obj.closest("section").css('background-color',color);
                            }
                            else{
                                obj.closest("section").find("."+effect).removeClass('color1');
                                obj.closest("section").find("."+effect).removeClass('color2');
                                obj.closest("section").find("."+effect).removeClass('color3');
                                obj.closest("section").find("."+effect).removeClass('color4');
                                obj.closest("section").find("."+effect).removeClass('color5');
                                obj.closest("section").find("."+effect).removeClass('color6');
                                obj.closest("section").find("."+effect).removeClass('color7');
                                obj.closest("section").find("."+effect).removeClass('color8');
                                obj.closest("section").find("."+effect).addClass(id);
                            }
                            
                            
                            obj.parent().parent().parent().find("button").css("background-color", color);
                        }
                    }
                });
            
            
        }
        
        function removePageImg(mainId, obj){
            var data = {
            mainId: mainId,
                };
                $.ajax({
                    url: Base_Url+"/acp/liveupdation/page_bg_img_remove",
                    type: "POST",
                    dataType: "JSON",
                    data: data,
                    success: function (result) {
                        obj.closest("section").css('background-image', 'none');
                  },
               });
            
        };
        
        function bgPageImage(obj, websiteId, obj2){
            var fd = new FormData();
            var files = obj.files;
            // Check file selected or not
            if(files.length > 0 ){
               fd.append('Section_Image',files[0]);
               fd.append('websiteId',websiteId);
               $.ajax({
                  url: Base_Url+"/acp/liveupdation/change_page_bg_img",
                  type: 'post',
                  data: fd,
                  contentType: false,
                  processData: false,
                  success: function(response){
                     if(response == '1'){
                        readURL(obj, obj2);
                     }
                  }
               });
            }
        };
    