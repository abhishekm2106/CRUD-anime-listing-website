var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [{
    name: "One Punch Man",
    image: "https://sm.ign.com/t/ign_in/review/o/one-punch-/one-punch-man-season-2-review_mt1x.1200.jpg",
    para: "One-Punch Man is a Japanese superhero franchise created by the artist ONE. It tells the story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy foe after growing bored by a lack of challenge in his fight against evil."
},
{
    name: "Deathnote",
    image: "https://thebuzzpaper.com/wp-content/uploads/2020/04/Death-Note-Season-2-The-Buzz-Paper-1280x720.jpg",
    para: "Death Note (Japanese: デスノート, Hepburn: Desu Nōto) is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. The story follows Light Yagami, a teen genius[3] who stumbles across a mysterious otherworldly notebook: the 'Death Note', which belonged to the Shinigami Ryuk, and grants the user the supernatural ability to kill anyone whose name is written in its pages. The series centers around Light's subsequent attempts to use the Death Note to carry out a worldwide massacre of individuals whom he deems morally unworthy of life to change the world into a utopian society without crime, using the alias of a god-like vigilante named  the Japanese transliteration of the English word: killer) and the subsequent efforts of an elite task-force of law enforcement officers, consisting of members of the Japanese police force, led by L, an enigmatic international detective whose past is shrouded in mystery, to apprehend him and end his reign of terror."
},
{
    name: "Attack On Titan",
    image: "https://www.monstersandcritics.com/wp-content/uploads/2018/10/Attack-On-Titan-Season-3-Episode-13-50-hiatus-confirmed-Shingeki-no-Kyojin-Season-3-Part-2-a-split-cour-anime-or-just-on-break.jpg",
    para: "When man-eating Titans first appeared 100 years ago, humans found safety behind massive walls that stopped the giants in their tracks. But the safety they have had for so long is threatened when a colossal Titan smashes through the barriers, causing a flood of the giants into what had been the humans' safe zone. During the carnage that follows, soldier Eren Jaeger sees one of the creatures devour his mother, which leads him to vow that he will kill every Titan. He enlists some friends who survived to help him, and that group is humanity's last hope for avoiding extinction at the hands of the monsters."
}
]

function seedDB() {
    //remove campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err)
        }
        console.log("removed campgrounds")
        //add few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("campground created")

                    Comment.create({
                        text: "this place is great but it would be great if there was Internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            campground.comments.push(comment)
                            campground.save()
                            console.log("New Comment created")
                        }

                    })
                }
            })
        })
    })
}


module.exports = seedDB;