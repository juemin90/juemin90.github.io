/**
 * Created by jueminlu on 15. 6. 13..
 */
window.onload = function(){

    var images = document.images,
        tables = document.getElementsByTagName("table");
    console.log(tables.length);
    for(var i= 0,l=images.length; i<l; i++){
        images[i].className+=" img-responsive";
    }
    for(var i= 0, l=tables.length; i<l; i++){
        tables[i].className+="table-responsive";
    }

    //var photo = document.getElementById("my_photo");
    //photo.onclick = photo_enlarge;
    //function photo_enlarge(e){
    //    e = window.event || e;
    //    var target = e.target || e.srcElement;
    //    //target.style.cssText += "display:none;";
    //    target.style.cssText += "filter:gray";
    //    var pf = new photoFrame(target.src);
    //    document.body.appendChild(pf.wrapper);
    //    console.log(pf);
    //    return false;
    //}
    //function photoFrame(src){
    //    this.wrapper = document.createElement("div");
    //    var img = document.createElement("img");
    //    img.style.cssText += "width:400px; ";
    //    img.src = src;
    //    img.className = "";
    //    this.wrapper.appendChild(img);
    //    this.wrapper.style.cssText += "padding:20px; position:absolute; top:50%; left:50%; transition:100ms linear";
    //    this.wrapper.onclick = function(){
    //        //this = null;
    //        console.log("asdf");
    //    }
    //}
}