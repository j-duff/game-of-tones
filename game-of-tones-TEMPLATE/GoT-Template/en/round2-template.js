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
				
				//Show Answer Button - When clicked, all unmoved draggable cards are moved to the empty and matching droppable card spots.  
				$("#btnShow2").click(function(){
					
					//reset drag/drop positional attributes for items in Round 2 (r2)
					$('#r2 .draggable').attr("data-loc", "");
					$('#r2 .draggable').attr("boxIn", null);
					$('#r2 .droppable').attr("hasItem", null);
					
					//for every draggable card in Round 1, assign new variables corresponding to the current attributes of that card
					$("#r2 .draggable").each(function(index){
						var dragCard = $(this);
			
						//'data-ans' refers to the tonal pattern of the given card, defined when generating the cards in html
						var ansAttr = $(this).attr('data-ans');
						
						//both variables are defined using the top/left position of the card
						var leftAttr = $(this).attr('data-home-l');
						var topAttr = $(this).attr('data-home-t');
						
						//move draggable cards w/ pattern1 melody to correct and open answer spots if the pattern1 draggable is not on a pattern1 droppable
						if (ansAttr == 'pattern1' && dragCard.attr("data-loc") != ansAttr){
								
							//this function applies to every droppable card in Round 2
							$("#r2 .droppable").each(function(index){
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
						
						//move draggable cards w/ pattern2 melody to correct and open answer spots, operating identically to lines 55-84
						if (ansAttr == 'pattern2' && dragCard.attr("data-loc") != ansAttr){
							
								$("#r2 .droppable").each(function(index){
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
						
						//move draggable cards w/ pattern3 melody to correct and open answer spots
						if (ansAttr == 'pattern3' && dragCard.attr("data-loc") != ansAttr){
							
								$("#r2 .droppable").each(function(index){
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
					});
					
					//Reveal the textual explanation of the answers 
					$('#answerp2').show("slow");					
				});
				
				//Reset Button - moves all of the cards back to their original positions in the card deck if moved to droppable positions
				$("#btnReset2").click(function() {
					
					//reset drag/drop positional attributes for items in Round 2
					$('#r2 .draggable').attr("data-loc", "");
					$('#r2 .draggable').attr("boxIn", null);
					$('#r2 .droppable').attr("hasItem", null);
					
					//revert cards to starting position in the deck
				    $("#r2 .draggable").animate({
						"left": 0,
						"top": 0
				    });
					
					//hide congrats label/answer description if already shown
					setTimeout(function() {
						$('#congratsLabel2').fadeOut('fast')
					}, 0);
					
					//hide the textual correct answer details if already shown
					setTimeout(function() {
						$('#answerp2').fadeOut('fast')
					}, 0);
				});
				
				//Check Answer Button - maintains the position of correctly placed draggables, and reverts the position of incorrectly placed draggables
				$("#btnCheck2").click(function(){
					
					var correctCount2 = 0;
					
					//revert draggable cards to starting position if situated in an incorrect answer spot
					$("#r2 .draggable").each(function(index){
						if ($(this).attr("data-loc") != $(this).attr("data-ans")){
						    $(this).animate({
								"left": 0,
								"top": 0
						    });
						}
						
						//update correctCount if card situated in a correct answer spot
						else if ($(this).attr("data-loc") == $(this).attr("data-ans")) {
							
							correctCount2 ++;
						}
					})
					
					//show congrats label and answer description if all the cards are situated in correct answer spots
					//update the correctCount depending on the number of cards used in the round
					if (correctCount2 == 7){
						$('#congratsLabel2').show("fast");
						$('#answerp2').show("slow");
						setTimeout(function() {
							$('#congratsLabel2').fadeOut('slow')
						}, 15000);
					}
				});
				
			}
			
			//updates location of the draggable corresponding to the pattern of the droppable card on which the draggable was dropped
			function handleDropEvent( event, ui ) {
				var draggable = ui.draggable;
				var droppable = $(this);
				
				//when dropped, a positional attribute of the draggable is updated to reflect the melody of the droppable card on which the draggable was dropped
				draggable.attr("data-loc", droppable.attr("data-ans"));
				draggable.attr('boxIn', droppable);
				droppable.attr('hasItem', draggable);
			}