let frame = document.getElementById("player");

function kgzmeeting(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxpE60NSuTiQbnUbJxOBBHhN";
}

function ECHteammeetings(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxogBKmFamsYqUch8xEu55y2";
}

function peepaneip(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F";
}

function themerge(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxr020waJCI0dZAfPAW2naK1";
}

function eipip(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxpLrRIkDlBjDUUrGgF91pQw";
}

$(".video-thumb").click(function() {
            var $this = $(this);
            if (!$this.hasClass("active")) {
              player.loadVideoById($this.attr("data-video"));
                          $this.addClass("active").siblings().removeClass("active");
            }
          });
  
