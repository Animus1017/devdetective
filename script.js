document.addEventListener('DOMContentLoaded',function(){
    const input=document.querySelector('#input');
    const searchBtn=document.querySelector('#search-btn');
    const userData=document.querySelector('.user-data');
    const errorMsg=document.querySelector('#error');
    const modeBtn=document.querySelector('#mode-btn');
    const modeText=document.querySelector('.mode-text');
    const modeIcon=document.querySelector('.mode-icon');
    const root = document.documentElement.style;
    let darkMode=false;


    function validate(username){
        if(username.trim()===''){
            alert('Username cannot be empty');
            return false;
        }
        else{
            const regex=/^(?!-)[a-zA-Z0-9-]{1,39}(?<!-)$/;
            const match=regex.test(username);
            if(!match)
            alert("Username not valid");
            return match;
        }
    }
    function display(data){
        const photo=document.querySelector('#photo');
        photo.src=data.avatar_url;
        const name=document.querySelector('#name');
        name.textContent=data.name;
        const tag=document.querySelector('#usertag');
        tag.innerText=`@${data.login}`;
        tag.href=data.html_url;
        const joining=document.querySelector('#joining');
        const date=new Date(data.created_at);
        const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
        joining.innerText=`Joined ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        const bio=document.querySelector('#bio');
        bio.innerText=(data.bio===null)?'This Profile has no Bio':data.bio;
        const repos=document.querySelector('#repos');
        const followers=document.querySelector('#followers');
        const following=document.querySelector('#following');
        repos.innerText=data.public_repos;
        repos.href=data.repos_url;
        followers.innerText=data.followers;
        followers.href=data.followers_url;
        following.innerText=data.following;
        following.href=data.following_url;
        const location=document.querySelector('#location');
        const website=document.querySelector('#website');
        const twitter=document.querySelector('#twitter');
        const company=document.querySelector('#company');
        location.innerText=(data.location===null)?'Not Available':data.location;
        website.innerText=(data?.blog==='')?'Not Available':data?.blog;
        
        twitter.innerText=(data.twitter_username===null)?'Not Available':data.twitter_username;
        company.innerText=(data.company===null)?'Not Available':data.company;
        website.href=(data.blog===null)?'#':data.blog;
        twitter.href=(data.twitter_username===null)?'#':`https://twitter.com/${data.twitter_username}`;
    }
    async function fetchUser(username){
        try{
            searchBtn.textContent='Searching...';
            searchBtn.disabled=true;
            const url=`https://api.github.com/users/${username}`;
            const response=await fetch(url);
            if(!response.ok)
            throw new Error('Unable to fetch data');
            const data=await response.json();
            userData.style.visibility='visible';  
            display(data);          
        }
        catch(error){
            errorMsg.style.scale=1;
            setTimeout(()=>{
                errorMsg.style.scale=0;
            },2000);
        }
        finally{
            searchBtn.textContent='Search';
            searchBtn.disabled=false;
        }
    }
    searchBtn.addEventListener('click',()=>{
        userData.style.visibility='hidden';
        const username=input.value;
        if(validate(username)){
            fetchUser(username);
        }    
    });


    function dark(){
        darkMode=true;
        modeText.innerText='LIGHT';
        modeIcon.src=`./Images/sun-icon.svg`;
        root.setProperty("--lm-bg", "#141D2F");
        root.setProperty("--lm-bg-content", "#1E2A47");
        root.setProperty("--lm-text", "white");
        root.setProperty("--lm-text-alt", "white");
        root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
        root.setProperty("--lm-icon-bg", "brightness(1000%)");
        localStorage.setItem("darkMode",true);
    }
    function light(){
        darkMode=false;
        modeText.innerText='DARK';
        modeIcon.src=`./Images/moon-icon.svg`;
        root.setProperty("--lm-bg", "#F6F8FF");
        root.setProperty("--lm-bg-content", "#FEFEFE");
        root.setProperty("--lm-text", "#4B6A9B");
        root.setProperty("--lm-text-alt", "#2B3442");
        root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
        root.setProperty("--lm-icon-bg", "brightness(100%)");
        localStorage.setItem("darkMode",false);
    }
    modeBtn.addEventListener('click',()=>{
        if(darkMode===false)
        dark();
        else
        light();
    });

    // This code checks if the user's device has a preference for dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode properties
        dark();
    } else {
        // If the device preference is not for dark mode, apply light mode properties
        light();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        dark();
    } else {
        // If the value is not "true", apply light mode properties
        light();
    }
}
});
