import{a as S,i as m,S as I}from"./assets/vendor-6e0bf343.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();async function u(o,n){const e="https://pixabay.com"+"/api/",t={key:"43041938-51a06b63921488a862c0fcc6d",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,lang:"en",page:n,per_page:15};return(await S.get(e,{params:t})).data}let v=!0;function p(o){return o.length===0?(d(),m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),catchData=!1):o.map(({webformatURL:c,largeImageURL:r,tags:e,likes:t,views:a,comments:L,downloads:b})=>`
    <li class="gallery-item">
    <a class="gallery-link" href="${r}">
    <img class="gallery-image" src="${c}" alt="${e}" />
    </a>
    <div class="content-image">
    <p class="pege-item">Likes<span class="inf-item">${t}</span></p>
    <p class="pege-item">Views<span class="inf-item">${a}</span></p>
    <p class="pege-item">Comments<span class="inf-item">${L}</span></p>
    <p class="pege-item">Downloads<span class="inf-item">${b}</span></p>
    </div>
    </li>
    `).join("")}let l,i=1,f=0;const w=15,s={formElem:document.querySelector("form"),list:document.querySelector(".gallery-image"),loadItem:document.querySelector(".loader-cont"),btnLoad:document.querySelector(".btn-primary"),loadIcon:document.querySelector(".content-loader"),loadIconMore:document.querySelector(".loader")};s.formElem.addEventListener("submit",M);s.btnLoad.addEventListener("click",q);async function M(o){if(o.preventDefault(),h(),i=1,l=o.target.elements.search.value.trim(),s.list.innerHTML="",!l&&v){d(),m.info({message:"Line is empty, enter a value",position:"topLeft"}),s.list.innerHTML="";return}try{O();const n=await u(l,i);f=Math.ceil(n.totalHits/w),s.list.insertAdjacentHTML("beforeend",p(n.hits)),y.refresh(),g(),d()}catch(n){console.log(n)}o.target.reset()}async function q(){try{i+=1,D();const o=await u(l,i);s.list.insertAdjacentHTML("beforeend",p(o.hits)),P(),y.refresh()}catch(o){console.log(o)}B(),g()}function g(){i>=f?(h(),m.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):E()}function E(){s.btnLoad.classList.remove("hidden")}function h(){s.btnLoad.classList.add("hidden")}function O(){s.loadIcon.classList.remove("hidden")}function d(){s.loadIcon.classList.add("hidden")}function D(){s.loadIconMore.classList.remove("hidden")}function P(){s.loadIconMore.classList.add("hidden")}function B(){const n=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}const y=new I(".gallery-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8});
//# sourceMappingURL=commonHelpers.js.map
