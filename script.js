import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdcFaw679_mnsuaONcKb6810IgJnegl7g",
    authDomain: "fir-practice-2e1aa.firebaseapp.com",
    projectId: "fir-practice-2e1aa",
    storageBucket: "fir-practice-2e1aa.appspot.com",
    messagingSenderId: "673320731538",
    appId: "1:673320731538:web:8746a370324a1e8e98f74b",
    measurementId: "G-ZL13ZEQFP0"
};


const title = document.getElementById('title_value');
const content = document.getElementById('content_value');
let tag;
document.querySelectorAll('input[name = "tag"]').forEach((elem) => {
    elem.addEventListener("change", (event) => {
        tag = event.target.value;
    });
});





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


firebase.initializeApp({
    projectId: 'fir-practice-2e1aa'
});
var db = firebase.firestore();


var db = firebase.firestore();
var ref = db.collection('articles');



const sub = document.getElementById('submit');
sub.addEventListener('click', () => { onSubmit() })

function onSubmit() {
    let inf = Boolean(title.value && content.value && tag);
    if (inf) {
        ref.doc().set({
            id: `Teng-Yi, ${new Date().toLocaleString()}`,
            title: title.value,
            content: content.value,
            tag: tag,
            author_id: 'IrvingV5ev2dpx8aIOmAIeha2q',
            created_time: new Date(),
        }).then(
            alert('資料已送出')
        ).then(
            ref.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data());
                })
                    ;
            })
        )
    } else {
        alert('請輸入完整資訊');
        return;
    }
};




// async function getUnseenMessages() {

//     const collectionRef = (await db).collection('articles') //chats/${user_id+second_identifier/messages}
//     try {
//         collectionRef.onSnapshot(snapshot => {
//             console.log('snapshot', snapshot)
//             snapshot.forEach(doc => {
//                 console.log(doc.id, doc.data());
//             })
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }

// getUnseenMessages()

let stranger
const notFriendYet = document.getElementById('not-friend-yet');
var refriend = db.collection('users');
const searchFriend = document.getElementById('search-friend');
searchFriend.addEventListener('keypress', function (keyNumber) {
    if (keyNumber.keyCode === 13) {
        notFriendYet.innerHTML = "";
        var keyValue = searchFriend.value;
        refriend.where("email", ">=", keyValue).where('email', '<=', keyValue + '~').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                stranger = doc.data();
                console.log(stranger)
                const divs = document.createElement('div');
                const divs1 = document.createElement('div');
                divs1.className = 'name';
                divs1.innerHTML = `Name: ${stranger.name}`;
                const divs2 = document.createElement('div');
                divs2.className = 'id';
                divs2.innerHTML = `Id: ${stranger.id}`;
                const divs3 = document.createElement('div');
                divs3.className = 'email';
                divs3.innerHTML = `e-mail: ${stranger.email}`;
                const divs4 = document.createElement('div');
                divs4.className = 'check';
                divs4.innerHTML = '送出朋友邀請';
                var reqfriend = db.collection('pending-list');
                divs4.addEventListener('click', () => {
                    reqfriend.doc().set({
                        getId: stranger.id,
                        sentEmail: 'jazz19910320@gmail.com',
                        sentId: 'IrvingV5ev2dpx8aIOmAIeha2q',
                        sentName: 'Irving',
                    });
                    notFriendYet.innerHTML = "";
                })
                const divs5 = document.createElement('div');
                divs5.className = 'application'
                divs5.innerHTML = '好友申請中';
                divs5.style.display = 'none';
                const divs6 = document.createElement('div');
                divs6.className = 'friendIng'
                divs6.innerHTML = '已是好友';
                divs6.style.display = 'none';
                divs.appendChild(divs1);
                divs.appendChild(divs2);
                divs.appendChild(divs3);
                divs.appendChild(divs4);
                divs.appendChild(divs5);
                divs.appendChild(divs6);
                notFriendYet.appendChild(divs);
                const nfy = document.getElementById('not-friend-yet');
                nfy.style.marginBottom = "100px"
                console.log('friendListNow', friendListNow);
                console.log('invitationNow', invitationNow)
                if (friendListNow.includes(stranger.name)) {
                    divs4.style.display = 'none';
                    divs5.style.display = 'none';
                    divs6.style.display = 'flex';
                } else if (invitationNow.includes(stranger.id)) {
                    divs4.style.display = 'none';
                    divs5.style.display = 'flex';
                    divs6.style.display = 'none';
                } else {
                    divs4.style.display = 'flex';
                    divs5.style.display = 'none';
                    divs6.style.display = 'none';
                }
            })
        })
        searchFriend.value = ''
    }
})


let invitationNow = []
let requestFriend
let invitations
async function getUnseen() {
    const collectionRef = (await db).collection('pending-list').where("getId", "==", 'IrvingV5ev2dpx8aIOmAIeha2q') //chats/${user_id+second_identifier/messages}
    try {
        collectionRef.onSnapshot(snapshot => {
            const friendCheckBox2 = document.querySelector('.friend-check-box');
            friendCheckBox2.innerHTML = ''
            snapshot.forEach(doc => {
                invitations = doc.data();
                let requstDelete = doc.id;
                friendCheck(invitations, requstDelete);
            })
        })
    } catch (error) {
        console.log(error)
    }
}
getUnseen()


async function getUnseen2() {
    const collectionRef = (await db).collection('pending-list').where("sentId", "==", 'IrvingV5ev2dpx8aIOmAIeha2q') //chats/${user_id+second_identifier/messages}
    try {
        collectionRef.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                invitations = doc.data();
                invitationNow.push(doc.data().getId)
            })
        })
    } catch (error) {
        console.log(error)
    }
}
getUnseen2()


function friendCheck(item, id) {

    const friendCheckBox = document.querySelector('.friend-check-box');
    const divs = document.createElement('div');
    const divs1 = document.createElement('div');
    divs1.className = 'invitationId';
    divs1.innerHTML = `Id: ${item.sentId}`;

    const divs2 = document.createElement('div');
    divs2.className = 'ok';
    divs2.innerHTML = '接受';
    divs2.addEventListener('click', () => {
        beFriend(item.sentName, item.sentId)
        deleteFirendRequest(id)
    })
    const divs3 = document.createElement('div');
    divs3.addEventListener('click', () => {
        deleteFirendRequest(id);
        getUnseen()
    })
    divs3.className = 'no';
    divs3.innerHTML = '拒絕';
    divs.appendChild(divs1);
    divs.appendChild(divs2);
    divs.appendChild(divs3);
    friendCheckBox.appendChild(divs);
    friendCheckBox.style.marginBottom = '100px'
}

var friendList = db.collection('friend-list');
let friendListUpdate = []
let friendListUpdate2 = []
function beFriend(namess, sentidsss) {
    friendList.doc('IrvingV5ev2dpx8aIOmAIeha2q').get().then(doc => {
        friendListUpdate = doc.data().friends;
        friendListUpdate.push(namess)
        friendList.doc('IrvingV5ev2dpx8aIOmAIeha2q').set({ friends: friendListUpdate })
    });
    friendList.doc(sentidsss).get().then(doc => {
        console.log(doc.data());
        friendListUpdate2 = doc.data().friends;
        friendListUpdate2.push('Irving')
        friendList.doc(sentidsss).set({ friends: friendListUpdate2 })
    })
}


var deleteRequest = db.collection('pending-list');
function deleteFirendRequest(id) {
    deleteRequest.doc(id).delete()
}

let friendListNow = []
async function getFriendList() {
    const collectionRef = (await db).collection('friend-list').doc('IrvingV5ev2dpx8aIOmAIeha2q')
    try {
        collectionRef.onSnapshot(snapshot => {
            const friendNameBox = document.getElementById('friends')
            friendNameBox.innerHTML = ''
            snapshot.data().friends.forEach(doc => {
                const friends = document.getElementById('friends');
                const div = document.createElement('div')
                div.innerText = `${doc}`
                friends.appendChild(div);
                friendListNow.push(doc);
            })
        })
    } catch (error) {
        console.log(error)
    }
}
getFriendList()

const searchButton = document.getElementById('article-search-button')
searchButton.addEventListener('click', () => { searchArticle() })
let articleTag
document.querySelectorAll('input[name = "article-type"]').forEach((elem) => {
    elem.addEventListener("change", (event) => {
        articleTag = event.target.value;
        console.log('articleTag', articleTag)
    });
});


const searchContent = document.getElementById('search-content');
var refarticle = db.collection('articles');
function searchArticle() {
    const authorId = document.getElementById('author_id')
    var keyValue = authorId.value;
    var keyTag = articleTag;
    console.log('keyTag', keyTag)
    if (Boolean(articleTag)) {
        refarticle.where("author_id", ">=", keyValue).where('author_id', '<=', keyValue + '~').where('tag', '==', keyTag)
            .get().then(querySnapshot => {
                searchContent.innerHTML = '';
                querySnapshot.forEach(doc => {
                    stranger = doc.data();
                    const div = document.createElement('div');
                    div.className = 'search_airticle'
                    const div1 = document.createElement('div');
                    div1.className = 'search_airticle_title';
                    div1.innerText = doc.data().title;
                    const div2 = document.createElement('div');
                    div2.className = 'search_airticle_tag';
                    div2.innerText = doc.data().author_tag;
                    const div3 = document.createElement('div');
                    div3.className = 'search_airticle_content';
                    div3.innerText = doc.data().author_content;
                    const div4 = document.createElement('div');
                    div4.className = 'search_airticle_author';
                    div4.innerText = doc.data().author_id;
                    const div5 = document.createElement('div');
                    div5.className = 'search_airticle_time';
                    div5.innerText = doc.data().created_time;
                    const div6 = document.createElement('div');
                    div6.className = 'search_airticle_id';
                    div6.innerText = doc.data().id;
                    div.appendChild(div1);
                    div.appendChild(div2);
                    div.appendChild(div3);
                    div.appendChild(div4);
                    div.appendChild(div5);
                    div.appendChild(div6);
                    searchContent.appendChild(div);
                })
            })
    } else {
        refarticle.where("author_id", ">=", keyValue).where('author_id', '<=', keyValue + '~')
            .get().then(querySnapshot => {
                searchContent.innerHTML = '';
                querySnapshot.forEach(doc => {
                    stranger = doc.data();
                    const div = document.createElement('div');
                    div.className = 'search_airticle'
                    const div1 = document.createElement('div');
                    div1.className = 'search_airticle_title';
                    div1.innerText = doc.data().title;
                    const div2 = document.createElement('div');
                    div2.className = 'search_airticle_tag';
                    div2.innerText = doc.data().author_tag;
                    const div3 = document.createElement('div');
                    div3.className = 'search_airticle_content';
                    div3.innerText = doc.data().author_content;
                    const div4 = document.createElement('div');
                    div4.className = 'search_airticle_author';
                    div4.innerText = doc.data().author_id;
                    const div5 = document.createElement('div');
                    div5.className = 'search_airticle_time';
                    div5.innerText = doc.data().created_time;
                    const div6 = document.createElement('div');
                    div6.className = 'search_airticle_id';
                    div6.innerText = doc.data().id;
                    div.appendChild(div1);
                    div.appendChild(div2);
                    div.appendChild(div3);
                    div.appendChild(div4);
                    div.appendChild(div5);
                    div.appendChild(div6);
                    searchContent.appendChild(div);
                })
            })
    }

}


