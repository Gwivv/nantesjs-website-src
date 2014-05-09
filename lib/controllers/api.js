'use strict';

/**
 * Get skills
 */
exports.mySkills = function(req, res) {
  res.json([
        {
            "name" : "Javascript",
            "level" : 90,
            "color" : "#4f9eea"
        }, {
            "name" : "HTML5 & CSS",
            "level" : 85,
            "color" : "#8771b6"
        }, {
            "name" : "JAVA MVC (struts,spring,hibernate)",
            "level" : 75,
            "color" : "#ffaa55"
        }, {
            "name" : "Dojo",
            "level" : 70,
            "color" : "#9e9e9e"
        }, {
            "name" : "Node.js",
            "level" : 65,
            "color" : "#ffb600"
        }, {
            "name" : "Angular.js",
            "level" : 60,
            "color" : "#4bc380"
        }
    ].sort(function (o1,o2) {
      return o2.level - o1.level;
  }));
};
