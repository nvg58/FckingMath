var s_HelloWorld = "HelloWorld.jpg";
var s_CloseNormal = "CloseNormal.png";
var s_CloseSelected = "CloseSelected.png";
var s_start_n = "start_n.png";
var s_start_s = "start_s.png";
var s_plus_n = "plus_n.png";
var s_plus_s = "plus_s.png";
var s_multi_n = "multi_n.png";
var s_multi_s = "multi_s.png";
var s_restart_n = "restart_n.png";
var s_restart_s = "restart_s.png";
var s_to_start_n = "to_start_n.png";
var s_to_start_s = "to_start_s.png";
var s_gameover = "gameover.png";
var s_right_n = "right_n.png";
var s_right_s = "right_s.png";
var s_wrong_n = "wrong_n.png";
var s_wrong_s = "wrong_s.png";
var score = 0;
var f_lato = "Arial Rounded MT Bold";
var s_loading = "loading.png";
var TG_TIMER = 1;
var e_passed = "res/passed.mp3";
var e_fail = "res/fail.mp3";
var e_reload = "res/reload.mp3";
var TAG_PLAY_SCENE = 10;
var TAG_GAME_OVER = 11;
var TAG_START_SCENE = 12;
var mode; 
var PLUS = 0;
var MULTI = 1;

var g_resources = [
  //image
  {src: s_HelloWorld},
  {src: s_CloseNormal},
  {src: s_CloseSelected},
  {src: s_start_n},
  {src: s_start_s},
  {src: s_plus_n},
  {src: s_plus_s},
  {src: s_multi_n},
  {src: s_multi_s},
  {src: s_restart_n},
  {src: s_restart_s},
  {src: s_to_start_s},
  {src: s_to_start_n},
  {src: s_gameover},
  {src: s_right_s},
  {src: s_right_n},
  {src: s_wrong_s},
  {src: s_wrong_n},
  {src: s_loading},

  //plist

  //fnt
//  {src: f_lato}
  //tmx

  //bgm

  //effect
  {src: e_passed},
  {src: e_fail},
  {src: e_reload}

];