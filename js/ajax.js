/**
 * Created by jueminlu on 15. 6. 23..
 */
window.onload = function(){
    var employee = '{"a":"b"}';
    var emp_json = JSON.parse(employee);
    console.log(emp_json);
    var btn = document.getElementById("btn");
    var textContainer = document.getElementById("inner");

    btn.onclick = function(){
        var inputText = document.getElementById("input");
        var xhr = new XMLHttpRequest();
        xhr.open("GET","game_back.php", true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    textContainer.innerHTML = processData(xhr);
                }
            }
        };
        processData = function(xhr){
            var xhr_obj = eval('('+xhr.responseText+')');
            var str;
            for(var x in xhr_obj){
                if(x==inputText.value){
                    return  x+" is "+xhr_obj[x];
                } else {
                    str =  "Nothing Searched";
                }
            }
            console.log(str);
            return str;
        }

    };

    var btn2 = $("#btn2");
    var textContainer2 = $("#inner2");
    btn2.click(function(){
        $.ajax({

        });
    })
};