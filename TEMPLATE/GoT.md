# Game of Tones - Documentation

### Getting Started

This is a tutorial document for development of interactive, web-hosted Game of Tones games that explore basic tonal systems. The game was originally developed for Oaxacan languages (Santiago Laxopa Zapotec, San Martín Peras Mixtec), as part of the outreach efforts of Nido de Lenguas at UC Santa Cruz.

The TEMPLATE folder contains a number of documents that are ready to use, and require only minimal editing to develop a Game of Tones for the language of interest. The 'img' and 'mp3' folders contain images and audio files (respectively) to use for the playable cards that are dragged and dropped in the game itself. Before getting started, it can be helpful to add your image and audio files to these folders to reference them in the html portions of the game. The 'GoT_Styles.css' document contains all of the styling specifications, which can be freely edited (or replaced entirely) depending on your design preferences.

For the most part, the only files that will require editing are the html files that run each round of the game. These html files reference corresponding JavaScript files, which contain the functions that generate the game cards with appropriate attributes to drag and drop, and three buttons that allow players to restart the game, check their answers, or show the answers and move on to subsequent rounds. These js files allow for the core functions of the current version of the game, and for the most part, should not be edited. That said, more seasoned programmers may feel comfortable editing and developing these files further as they see fit (especially considering that this game was not developed by trained programmers, and can likely be improved upon). This document will briefly cover the functionality of the js component, and highlight portions that can be edited when adding additional tonal patterns in later rounds of the game. 

### JS Files

Lines 1-32 initiate the function which generates the draggable and droppable cards, with positional attributes that track the position of the cards as they are dragged to different playable areas of the game. 

A brief note on terminology: 'draggable' elements (or elements that can be dragged) are those which can be dragged when clicking and moving the element with the cursor, whereas 'droppable' elements are those onto which draggables are dropped (and *not* elements that can be dropped). In the context of this game, draggables are the playable vocabulary cards and droppables are the answer spots where players move and bin the draggable cards based on their tonal patterns. The documentation for the draggable and droppable interactions from jQuery UI 1.12 can be found [here](https://api.jqueryui.com/1.12/category/interactions/). 

```js

			$( init );
			
			//generate draggable and droppable cards with relevant attributes, including their position and current state 
			 
			function init() {
			  	$('.draggable').draggable( {
			  		cursor: 'move',
			  		containment: 'document',
			  		stack: '.draggable',
			  		revert: 'invalid',
			  		snap: '.droppable',
			  		snapMode: 'inner',
			  		snapTolerance: 20
			  	}) .each(function(index){
					//assign position as an attribute
					$(this).attr('data-home-l', $(this).offset().left)
					$(this).attr('data-home-t', $(this).offset().top)
					//initialze the state of the draggable as not in a droppable card
					$(this).attr('boxIn', null)
				});
			  	$('.droppable').droppable( {
			  		accept: '.draggable',
					
    				//call the handleDropEvent function when an item is dropped
					drop: handleDropEvent
    			} ) .each(function(index){
					//initialize the state of the droppable as empty
    				$(this).attr('hasItem', null)
    			});
				
    			$('#cards').droppable( {
			  		accept: '.draggable'
    			} );
```

The positional attributes of the cards are necessary for tracking the position of the draggable cards, which allows for the functionality of the three buttons and to confirm correct answers/reject incorrect answers. Essentially, each draggable and droppable element contain fixed attributes which correspond to their tonal pattern (e.g. pattern1). When a draggable is moved onto a droppable element, an unvalued attribute of the draggable is updated with the fixed tonal pattern attribute of the droppable element. Lines 173-182 contain the 'handleDropEvent' function that updates these relevant attributes when a draggable element is moved onto a droppable.

```js

			//updates location of the draggable corresponding to the pattern of the droppable card on which the draggable was dropped
			function handleDropEvent( event, ui ) {
				var draggable = ui.draggable;
				var droppable = $(this);
				
				//when dropped, a positional attribute of the draggable is updated to reflect the melody of the droppable card on which the draggable was dropped
				draggable.attr("data-loc", droppable.attr("data-ans"));
				draggable.attr('boxIn', droppable);
				droppable.attr('hasItem', draggable);
			}
```

This process of updating attributes allows for the comparison of the fixed tonal attribute of the draggable with its unvalued/updatable attribute to evaluate whether or not the draggable was moved onto a correct answer spot. Lines 137-169 initiate the Check Answer button, which maintains the position of correctly placed cards and reverts incorrectly placed cards to their original positions in the card deck. If all cards are moved onto correct spots, a congratulatory message appears and the player can continue onto subsequent rounds (Lines 157-168). 

```js

				//Check Answer Button - maintains the position of correctly placed draggables, and reverts the position of incorrectly placed draggables
				$("#btnCheck1").click(function(){				
					var correctCount = 0;
					
					//revert draggable cards to starting position if situated in an incorrect answer spot
					$("#r1 .draggable").each(function(index){
						if ($(this).attr("data-loc") != $(this).attr("data-ans")){
						    $(this).animate({
								"left": 0,
								"top": 0
						    });
						}
						
						//update correctCount if card is situated in a correct answer spot
						else if ($(this).attr("data-loc") == $(this).attr("data-ans")) {
							
							correctCount ++;
						}
					})
					
					//Show congrats message, answer details, and continue button if all cards are placed in correct spots
					//update the correctCount depending on the number of cards used in the round
					if (correctCount == 6){
						$('#congratsLabel1').show("fast");
						$('#ContBtn1').show("fast");
						$('#answerp1').show("slow");
						
						//congrats label disappears after 15000 ms
						setTimeout(function() {
							$('#congratsLabel1').fadeOut('slow')
						}, 15000);
					}
				});
```

Lines 35-110 initiate the Show Answer button, which moves all draggable cards to their corresponding droppable spots (e.g. cards with a pattern1 melody move to the pattern1 bin). The in-line comments describe the details of the process of resetting and updating the relevant attributes of the draggable cards. 

```js

				//Show Answer Button - When clicked, all unmoved draggable cards are moved to the empty and matching droppable card spots.  
				$("#btnShow1").click(function(){
					
					//reset drag/drop positional attributes for items in Round 1 (r1)
					$('#r1 .draggable').attr("data-loc", "");
					$('#r1 .draggable').attr("boxIn", null);
					$('#r1 .droppable').attr("hasItem", null);
					
					//for every draggable card in Round 1, assign new variables corresponding to the current attributes of that card
					$("#r1 .draggable").each(function(index){
						var dragCard = $(this);
			
						//'data-ans' refers to the tonal pattern of the given card, defined when generating the cards in html
						var ansAttr = $(this).attr('data-ans');
						
						//both variables are defined using the top/left position of the card
						var leftAttr = $(this).attr('data-home-l');
						var topAttr = $(this).attr('data-home-t');
						
						//move draggable cards w/ pattern1 melody to correct and open answer spots if the pattern1 draggable is not on a pattern1 droppable
						if (ansAttr == 'pattern1' && dragCard.attr("data-loc") != ansAttr){
								
							//this function applies to every droppable card in Round 1
							$("#r1 .droppable").each(function(index){
								var drop = $(this);
									
								//only applies to empty droppables
								if (drop.attr('hasItem') == null)
								{	
									//only applies to pattern1 droppables								
									if ($(this).attr('data-ans') == 'pattern1'){
											
										//update the attribute of the draggable card with the attribute of the droppable card (here, pattern1)
										dragCard.attr("data-loc", $(this).attr("data-ans"));
											
										//move the draggable card to the position of the droppable card
										dragCard.animate({
											left: $(this).offset().left - (leftAttr),
											top: $(this).offset().top - (topAttr)
										});
											
										//update the relevant attributes of the current draggable and the current droppable 
										dragCard.attr('boxIn', drop);
										drop.attr('hasItem', dragCard);
										return false;
										
									}										
								}
							});							
						}
						
						//move draggable cards w/ pattern2 melody to correct and open answer spots, operating identically to lines 55-84 for pattern1
						else if (ansAttr == 'pattern2' && dragCard.attr("data-loc") != ansAttr){					
								$("#r1 .droppable").each(function(index){
									var drop = $(this);
									if (drop.attr('hasItem') == null)
									{
										if ($(this).attr('data-ans') == 'pattern2'){											
											dragCard.attr("data-loc", $(this).attr("data-ans"));
											dragCard.animate({
												left: $(this).offset().left - (leftAttr),
												top: $(this).offset().top - (topAttr)
											});
											dragCard.attr('boxIn', drop);
											drop.attr('hasItem', dragCard);
											return false;
									}
								}									
							});							
						}						
					});
					
					//Reveal the textual explanation of the answers and a button to continue to the next round
					$('#answerp1').show("slow");
					$('#ContBtn1').show("fast");				
				});
```

The main functionality of the Show Answer button comes from the if-statements, which check the relevant states of the different elements. This round of the game involves only two tonal patterns (pattern1 and pattern2), and correspondingly, there are only two if-statements (one if-statement, and an else-if-statement) which move the two sets of cards to the two sets of matching answer spots. When developing the game further, you may want to add additional tonal patterns. To expand the Show Answer button for another tonal pattern, add another else-if-statement that checks the additional tonal pattern (pattern3):

```js

						else if (ansAttr == 'pattern3' && dragCard.attr("data-loc") != ansAttr){					
								$("#r1 .droppable").each(function(index){
									var drop = $(this);
									if (drop.attr('hasItem') == null)
									{
										if ($(this).attr('data-ans') == 'pattern3'){											
											dragCard.attr("data-loc", $(this).attr("data-ans"));
											dragCard.animate({
												left: $(this).offset().left - (leftAttr),
												top: $(this).offset().top - (topAttr)
											});
											dragCard.attr('boxIn', drop);
											drop.attr('hasItem', dragCard);
											return false;
									}
								}									
							});							
						}						
```

Append this else-if-statement within the scope of the Show Answer button, and repeat for additional tonal patterns as necessary. Make sure to double check the conditional portion of each if-statement to ensure the code applies to the tonal pattern of interest.

Finally, Lines 112-135 initiate the Restart/Reset button, which reverts all moved draggable cards to their original positions in the card deck.

```js

				//Restart button - moves all of the cards back to their original positions in the card deck
				$("#btnReset1").click(function() {
					
					//reset drag/drop positional attributes for items in Round 1
					$('#r1 .draggable').attr("data-loc", "");
					$('#r1 .draggable').attr("boxIn", null);
					$('#r1 .droppable').attr("hasItem", null);
					
					//revert cards to starting position in the deck
				    $("#r1 .draggable").animate({
						"left": 0,
						"top": 0
				    });
					
					//hide the 'congrats' message if already shown
					setTimeout(function() {
						$('#congratsLabel1').fadeOut('fast')
					}, 0);
					
					//hide the textual correct answer details if already shown
					setTimeout(function() {
						$('#answerp1').fadeOut('fast')
					}, 0);
				});
```

### HTML Files

The head portion of the html files contain the initializing information for the html document, as well as calls for the CSS style sheets, the jQuery libraries, and the JS script discussed above. These should not be edited, unless your files are named differently.

```html

		<link href="GoT_Styles.css" rel="stylesheet" type="text/css" media="all"/>
		
		<!--Do Not Edit -- these scripts permit all of the dragging/dropping functionality of the GoT-->
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		
		<!--Only edit if you rename the round1-template JavaScript (js) file-->
		<script src = "round1.js"></script>
```

The body of the html contains several containers that format the game. Within these containers, you'll need to add your audio files, making reference to their location in the 'mp3' folder of the directory. For example, the audio corresponding to the SLZ word for corn is labeled 'corn.mp3' in the 'mp3' folder, and this location is referenced as the source (src) for the audio. The id 'audio-corn' can be referenced later when creating the 'corn' card which will play the 'corn.mp3' audio. 

```html

     <audio id="audio-corn" src="mp3/corn.mp3"></audio>
```

To generate the draggable card deck with the vocabulary cards, create a `<div>` with the id "cards." Within this div element, we'll generate all of the draggable cards for the current round.

```html

	<div id="cards"></div>
```
Each draggable card is generated individually, with appropriate attributes: `class = "draggable"` generates the card with the draggable attributes from the js file, "id" is simply the label for the card, "data-ans" encodes the fixed tonal pattern of the card itself (here, pattern1), and "data-loc" is left undefined, as this is the attribute which is updated when moved onto a droppable answer spot. The cards are formatted with a button that displays the word (here, *xhua'*) and plays the corresponding audio file, which is retrieved using the `getElementById` function. Finally, each card contains an image, which is retrieved from the 'img' folder and scaled appropriately. Each card is contained in an individual div element, so this formatting is repeated for every card used in the draggable card deck.

```html

			<!--EDIT HERE: define the attributes of the card (class, id), including the type of melody pattern (here, data-ans = 'pattern1')-->
			<div class="draggable" id="card-corn" data-ans="pattern1" data-loc=""> 
									
				<!--each card has a button which displays the word and plays the corresponding audio when clicked-->
				<button onclick="document.getElementById('audio-corn').play()">xhua'</button> <br>
									
				<!--assign the card an image corresponding with the audio (adjust size if necessary)-->
				<img src = "img/corn.png" style="width:90px;margin:8px 0px 0px 0px"> <br>
			</div>
```

The droppable answer spots are similarly formatted, contained within another div element with the id "cards." Within this div, the droppable answer spots are formatted using div elements with `class = "drop-spots"` and an id corresponding to the tonal pattern (here, *Melody #1*). Create as many of these 'drop-spots' div elements as there are tonal patterns in the given round. The droppable answer spots are labeled for the player to group the cards based on their melody (here, Falling Melody). Each individual card spot is generated with a div element with `class = "droppable"`, generating a droppable card with the relevant attributes from the js file, and the fixed tonal pattern attribute "data-ans" (here, *pattern1*). This formatting is repeated for every droppable answer card, corresponding to the number of draggable vocabulary cards that bear the same tonal pattern.

```html

			<div class= "drop-spots" id ="Melody #1">
				<h4> Falling Melody </h4>
				<div class="droppable" data-ans="pattern1"> </div>
				<div class="droppable" data-ans="pattern1"> </div>
				<div class="droppable" data-ans="pattern1"> </div>
			</div>
```

The following div elements contain the three in-game buttons (Restart, Check Your Answer, and Show Answer) and the various messages that surface upon completion of the game, inclduing the textual explanation of the answers and a link to continue onto the next round. The text within these components can be freely edited, but their different ids are referenced in the js files, and changing these ids in the html requires identical changes in the js scripts. These final components are formatted within different containers to be centered at the bottom of the screen, and can be edited in the css style sheet. 

```html

				<!--display a message upon correct completion of the game-->
				<div id="congratsContainer">
					<label id="congratsLabel1" style="display: none">Great Job! All of your answers are correct!</label>
				</div>
							
				<!--textual explanation of the answers displayed upon completion of the game-->
				<div id="congratsContainer"><label id="answerp1" style="display: none">The words <em>beku'</em> "dog", <em>xhua'</em> "corn", and <em>xhile'</em> "sheep", all have the same melody, that starts high and ends low. <br> The words <em>beye'</em> "snow", <em>lage'</em> "leaf", and <em>ya'ado</em> "mountain" all have a different melody, that stays flat and low.</label></div>
				
				<!--link to Round2 html displayed upon completion of the game-->
				<div id="congratsContainer">
					<a href="round2-template.html" id="ContBtn1" style="display: none">Click Here to Continue</a>
				</div>
							
				<!--centered container for the buttons available while playing the game-->
				<div id="btnContainer">								
					<button id = "btnReset1">Restart</button>								
					<button id = "btnCheck1">Check Your Answer</button>								
					<button id = "btnShow1">Show The Answer</button>
				</div>
```

And those are the basics of making your own Game of Tones! For the most part, you can use this template as is, editing the audio/image files and text as necessary for the language of interest. As always, there are many components and labels that are cross-referenced across the css, js, and html files, and a small typo can derail the functionality of the game. There is also much room for improvement, so feel free to add new buttons or features if you're comfortable making those changes. To this point, it should be noted that the current implementation of this game is not mobile-friendly, but can be edited with different librarys to enable mobile functionality. We hope that this template and document are helpful in creating games for studying vocabulary and lexical tones across languages!
