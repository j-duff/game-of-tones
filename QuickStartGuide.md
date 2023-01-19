# Getting set up

1. Download the `TEMPLATE` folder.

2. Prepare your own images and sound files for the game. If you are following the exact format from the template, you'll want 5 words with the first tonal pattern, another 5 words with the second tonal pattern, and 3 words for the final tonal pattern. If you would like, you can also include an image to introduce the speaker in the recordings.

3. Replace the contents of `TEMPLATE/img/` with your images, and replace the contents of `TEMPLATE/mp3/` with your sound files.

# Editing the introductory page

1. Open `index-template.html` in a text editor.

2. Inside the `<title>` tags on line 5, type the title of the game. For instance, `Game of Tones - San Martín Peras Mixtec`. This will appear at the top of the web browser when people visit this page.

3. Paste the same title inside the `<h2>` tags on line 17. This will display as a header on the page.

4. Edit the text inside the `<h2>` tags on line 34 to reflect the name of your language.

5. Pick two sample words. They should demonstrate each of the two tone categories you use in the first round of the game.

6. On lines 30 and 31, edit the `id=` attributes to labels for your two words. Also edit the `src=` attributes to be the filepath to their corresponding audio files. For instance, if my first word was the word for 'rabbit', and the file for the audio was named `rabbit.mp3` I would edit line 30 to look like the following.

```html
<audio id="audio-rabbit" src="mp3/rabbit.mp3"></audio>
```

7. On line 44, edit the `id=` attribute appropriately for the first word. Then on line 45, edit the argument of `getElementById()` to the `id=` attribute of the audio object on line 30. Edit the text before the `</button>` to be the word itself. Then, on line 46, edit the `src=` tag to be the filepath to the image for the first word. Do the same for the second word starting on line 48. Here's an example.

```html
<div class="card" id="card-rabbit"> 
	<button onclick="document.getElementById('audio-rabbit').play()">leso</button> <br>
	<img src = "img/rabbit.png" style="width:90px;margin:8px 0px 0px 0px"> <br>
</div>
```

8. If you would like to include an image of the speaker or speakers in the recordings, change the `src=` attribute on line 35 to be the filepath to that image. If not, comment out the line by placing `<!--` at the beginning and `-->` at the end. It should look like the example below.

```html
<!-- <img src = "img/filename.jpeg" style="width:145px;margin:15px 15px 15px 15px" ALIGN = "right"> -->
```

9. Edit the text in `<p>` tags throughout to reflect the language, words, and tones you are introducing.

10. Open your html file in a web browser. Take a look at the images. If they don't fit nicely on the cards, adjust values for `width` and `margin` the `style=` tags until they do.

11. Rename this file to `index.html`.

# Editing the first round

1. Open `round1-template.html` in a text editor.

2. Edit the title on line 4.

3. Add all the audio files you need starting at the first `EDIT HERE` comment. Don't forget to change the `id=` attributes to be sensible names based on the words.

4. Add the information for your words under the first `<div id="cards">` tag, at the second `EDIT HERE` comment. You'll set your own `id=` attributes, reference back to the matching audio `id=` attribute from step 3, include the words themselves before the `</button>` tag, and add the image files in the `src=` attribute. Repeat this for all six cards. When you are done, make sure the cards are correctly associated into your tone groups in their `data-ans=` attributes, and shuffle the order so that the first three cards aren't all `"pattern1"`.

5. Add the labels for your two tonal patterns underneath the second `<div id="cards">` tag, at the third `EDIT HERE` comment. The labels go in between the `<h4>` tags. Make sure you match them to the cards you labeled as e.g. `"pattern1"` above.

6. Edit the text of the game as needed. You should be sure to edit the text of the `congratsContainer` in particular to include descriptions of the correct groupings and patterns with reference to the words in your game.

7. Rename this file to `round1.html`. You'll then need to go back to `index.html` and make sure the link at the end points to `round1.html` and not `round1-template.html`.

# Editing the second round

1. Open `round2-template.html` in a text editor.

2. Edit the title on line 5.

3. Add all the audio files you need as before.

4. Add all the cards you need as before, making sure to use the appropriate `data-ans=` attributes.

5. Add the labels for your three tonal patterns below, matching the labels to the attributes as before.

6. Edit the text as needed.

7. Rename this file to `round2.html`. You'll then need to go back to `round1.html` and make sure the link at the end connected to the `Click Here to Continue` button points to `round2.html` and not `round2-template.html`.
