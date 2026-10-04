/** @param {Record<string,[string,string]>} assets
 * @param {(request:Request,env:any)=>Promise<Response|null>} handleApi */
export function createWorker(assets,handleApi) { return {
/** @param {Request} request @param {any} env */
  async fetch(request, env) {
    const apiResponse=await handleApi(request,env);
    if(apiResponse)return apiResponse;
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    const url=new URL(request.url);
    let pathname;try{pathname=decodeURIComponent(url.pathname);}catch{return new Response('Invalid URL',{status:400});}
    if(pathname.endsWith('/'))pathname+='index.html';
    if(!assets[pathname] && assets[pathname+'/index.html'])return Response.redirect(new URL(url.pathname+'/',url.origin).toString(),301);
    const asset=assets[pathname];
    if(!asset)return new Response('Page not found',{status:404});
    const bytes=Uint8Array.from(atob(asset[1]),char=>char.charCodeAt(0));
    return new Response(request.method==='HEAD'?null:new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')),{headers:{'Content-Type':asset[0],'Cache-Control':'private, no-cache','X-Content-Type-Options':'nosniff'}});
  }
}; }
