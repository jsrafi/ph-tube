// converting number into time
function convertTime (time)
{
    const year = parseInt((time/31536000).toFixed(8));
    const remainingMonth = time % 31536000;
    const month = parseInt((remainingMonth / 2592000).toFixed(8));
    const remainingWeek = remainingMonth % 2592000;
    const week = parseInt(remainingWeek / 604800);
    const remainingDay = remainingWeek % 604800;
    const day = parseInt(remainingDay/86400);
    const remainingHour = remainingDay % 86400;
    const hour = parseInt(remainingHour/3600);
    const remainingMinute = remainingHour%3600;
    const minute = parseInt(remainingMinute / 60);
    const remainingSecond = remainingMinute % 60;

    if(year)
    {
        const mainTime =`${year} year ${month} month ${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} seconds ago`
        return mainTime;
    }
    else if(month)
    {
        const mainTime =`${month} month ${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} seconds ago`
        return mainTime; 
    }
    else if(week)
    {
        const mainTime =`${week} week ${day} day ${hour} hour ${minute} minute ${remainingSecond} seconds ago`
        return mainTime; 
    }
    else if(day)
    {
        const mainTime =`${day} day ${hour} hour ${minute} minute ${remainingSecond} seconds ago`
        return mainTime; 
    }
    else if(hour)
    {
        const mainTime =`${hour} hour ${minute} minute ${remainingSecond} seconds ago`
        return mainTime; 
    }
    else if(minute)
    {
        const mainTime =`${minute} minute ${remainingSecond} seconds ago`
        return mainTime; 
    }
    else
    {
        const mainTime =`${remainingSecond} seconds ago`
        return mainTime; 
    }
    
    
}
// loading details of videos
async function loadDetails(details)
{
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${details}`);
    const data = await res.json();
    displayDetails(data.video);
}

function displayDetails(video)
{
 const detailsDiv = document.getElementById('videoDetails');
 document.getElementById('my_modal_5').showModal();
 detailsDiv.innerHTML = `
 
 <img src="${video.thumbnail}">
 <p class="mt-3 text-center">${video.description}</p>

 `
}

// remove bg btn

function removeBgBtn()
{
  const btnChange = document.getElementsByClassName('category-id')
  for (let btn of btnChange)
  {
    btn.classList.remove('bg-[#FF1F3D]','text-white');
  }
  
}

// show categories videos

async function showCategories(id)
{
  removeBgBtn();
  const searchBar = document.getElementById('search-input');
  searchBar.value = "";
  const categoryBtn = document.getElementById(`btn-${id}`)
    categoryBtn.classList.add('bg-[#FF1F3D]','text-white');
   

  // fatching the categoris
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    showVideo(data.category)

}




const fetchBtn = async() => {

    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
    showBtn(data.categories)
}
fetchBtn();

const showBtn = (data) => {

    const navBtnSection = document.getElementById('nav-btn')
    for( const item of data)
    {
      const btn = document.createElement('button');
      btn.innerText = item.category;
      btn.classList = 'btn hover:bg-[#FF1F3D] hover:text-white category-id'
      btn.id= `btn-${item.category_id}`
      btn.onclick = () =>{
        showCategories(`${item.category_id}`)
      }
      navBtnSection.appendChild(btn);
    }
}


const fetchVideo = async(id = "") => {

    removeBgBtn();
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${id}`);
    const data = await res.json();
    showVideo(data.videos)
}
fetchVideo();

const showVideo = (data) => {
     console.log(data)
    const videoSection = document.getElementById('video')
    videoSection.innerHTML = "";

    if(data.length ===0)
    {
      videoSection.classList.remove('grid')
      videoSection.innerHTML=`
      <div class="flex flex-col gap-5 justify-center items-center pt-20">
        <img src="assets/Icon.png">
        <h3 class="font-bold text-xl">Oops!! Sorry, There is no content here</h3>

      </div>
      
      `
    }
    else
    {
      videoSection.classList.add("grid");
    }


    for( const item of data)
    {
      const section = document.createElement('div');
      section.classList = 'card card-compact'
      section.innerHTML = `
      
  <figure class="h-[180px] relative">
    <img class="h-full object-cover w-full"
      src=${item.thumbnail}
      alt="Shoes" />
      ${item.others.posted_date ? `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> ${convertTime(item.others.posted_date)} </span> `: ""}
  </figure>
  <div class="py-2 flex gap-3 mt-3">
        <div class="w-[50px] h-[50px] ">
            <img class="w-full h-full rounded-full object-cover"  src="${item.authors[0].profile_picture}" alt="">
        </div>

        <div class="flex flex-col gap-2 w-full">
            <h3 class="text-xl font-bold">${item.title}</h3>
            <div class="flex justify-between">
              <div>
                <p class="flex items-center gap-2 ">${item.authors[0].profile_name} ${item.authors[0].verified === true ? `<img class="" src="assets/Group (1).png" alt="">` : ""}</p>
                <p>${item.others.views} views</p>
              </div>
              <div class="">
                <button onclick="loadDetails('${item.video_id}')" class="btn bg-[#FF1F3D] text-white"> Details </button>
              </div>
            </div>
        </div>

        

  </div>

      `
     
      videoSection.appendChild(section);
    }
}

document.getElementById('search-input').addEventListener('keyup',(event)=>{loadSearch(event.target.value)})

function loadSearch(value)
{
  const searchBtn = document.getElementById('click');
  searchBtn.onclick = () => {
    fetchVideo(value)
  }
}