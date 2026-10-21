// Default address already published on LE GOLFE; the existing server setting can override it.
export function publicContactEmail(){
 const value=process.env.LEGOLFE_CONTACT_EMAIL?.trim();
 return value&&/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value)?value:'contact@legolfe.com';
}
export function contactMailto(email:string,subject:string,body=''){
 return `mailto:${email}?subject=${encodeURIComponent(subject)}${body?`&body=${encodeURIComponent(body)}`:''}`;
}
