NantesJS
===

* Article rédigé en markdown en utilisant 2 projets javascripts au top [**marked**][1] et [**highlight**][2].

* L'utilisation est super simple :

```javascript
  // Pour changer de préfix de class
  hljs.configure({classPrefix: ''});

  // Utilisation de marked combiné à highlight
  var divToMarkdown = document.getElementById("idDivToMarkdown");

  marked(divToMarkdown.innerHTML, {
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  }, function (err, content) {
    if (err) throw err;
      divToMarkdown.innerHTML = content;
  });
  ```


 [1]:https://github.com/chjj/marked
 [2]:https://github.com/isagalaev/highlight.js