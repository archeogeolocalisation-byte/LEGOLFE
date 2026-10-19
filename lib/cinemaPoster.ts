export function cinemaPoster(url:string):string|undefined {
 try{const u=new URL(url);if(u.protocol==='https:'&&!u.username&&!u.password&&['images.monnaie-services.com','fr.web.img3.acsta.net','fr.web.img6.acsta.net','cinemedia.cine.digital'].includes(u.hostname)&&/\.(jpe?g|png|webp)$/i.test(u.pathname))return u.href;}catch{}return;
}
