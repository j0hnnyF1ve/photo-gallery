// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

  $(function() 
  { 
    $(document)
      .mouseover( UI.MouseHandler.mouseover )
      .mouseout( UI.MouseHandler.mouseout )
      .mousedown( UI.MouseHandler.mousedown )
      .mousemove( UI.MouseHandler.mousemove )
      .mouseup( UI.MouseHandler.mouseup );

    $('#SaveButton').click( Remote.saveHandler );
    $('#ReloadButton').click( 
      (function(filename, galleryName) 
      { 
        return function() { Remote.loadDataFile(filename, galleryName); Component.OptionsMenu.remove(); } 
      } )(GLOBAL.filename, GLOBAL.galleryName) );  


    Remote.loadDataFile(GLOBAL.filename, GLOBAL.galleryName);
  });

})();
/* end script */
