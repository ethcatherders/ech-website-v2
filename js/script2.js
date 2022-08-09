// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;
 
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '315',
//     width: '560',
//     //LIVE STREAM ID: GQcXUn5XG5c
//     //NORMAL videoId: 'qnu_tBM9aGM',
//     videoId: 'aH3Le-3v320',
//     events: {
//       'onReady': function() {
//         $(".video-thumb").click(function() {
//           var $this = $(this);
//           if (!$this.hasClass("active")) {
//             player.loadVideoById($this.attr("data-video"));
//                         $this.addClass("active").siblings().removeClass("active");
//           }
//         });

   

//       }
//     }
//   });
// }

let frame = document.getElementById("player");

function Latest(){
  frame.src = "https://www.youtube.com/embed/BDPQBVP6XHs";
}

function ECHteammeetings(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxogBKmFamsYqUch8xEu55y2";
}

function peepaneip(){
  frame.src = "https://www.youtube.com/embed/videoseries?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F";
}

function communityevent(){
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
  
