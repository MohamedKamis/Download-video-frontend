const api_url='http://localhost:8080';
// const api_url='https://download-video.onrender.com';
const endD=(res)=>{
  window.filter.innerHTML=' ';
  for (const iterator of res) {
    window.filter.innerHTML+=`<option value="${iterator}">${iterator}</option>`;
  }
}
const loding=()=>{
  document.getElementById('icon_download').style.display='inline';
}
const server=async()=>{
  try {
      const response = await fetch(api_url+'/',{
        method:"get",
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json',
      }
    });
      const data= await response.json();
      console.log('server : '+data.data);
      return ;
  } catch (error) {
     console.log(error);
     return
  }
}

server();

const index=async(link_body,targt)=>{
  try {
      // window.video.style.display='inline-block';
      // window.video.src=link_body;
      const dataform={
        link:link_body,
        targt:targt,
      }
      // console.log(dataform);
      const response = await fetch(api_url+'/',{
        method:"post",
        body:JSON.stringify(dataform),
        headers:{
            'Content-Type':'application/json',
      }
    });

      const data= await response.json();
      // console.log(data);
      return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
document.getElementById('scan').onclick=async ()=>{
  const link_body=window.link.value;
  let targt='';  
  if(link_body!=''||link_body!=' '){
      targt=link_body.split('://')[1].split('.')[0];
      loding();
      window.err.style.display='none';
  
      const res=await index(link_body,targt);
      if(res!=null && targt ){
          let filter=res.data;
          // console.log(res.data);
          document.getElementById('icon_download').style.display='none';
          document.getElementById('div_end').style.display='block';
          endD(filter)
        
      }else{
          document.getElementById('icon_download').style.display='none';
          window.err.style.display='inline';
          // document.getElementById('div_end').style.display='block';
      }
    }
 } 
document.getElementById('end_download').onclick=async ()=>{
      const f=window.filter.value;
      const t=window.type.value;
      const l=window.link.value;
  window.location=`${api_url}/d?link=${l}&filter=${f}&type=${t}`;
}
document.getElementById('clear').onclick=async ()=>{
  document.getElementById('icon_download').style.display='none';
  document.getElementById('div_end').style.display='none';
  window.err.style.display='none';
  window.link.value='';
}
