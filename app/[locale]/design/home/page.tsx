import type {Metadata} from 'next';
import localFont from 'next/font/local';
import Home from '../../page';
import styles from './pilot.module.css';

const display=localFont({
 src:'../../../../public/fonts/sedgwick-ave-display/latin-400.woff2',
 weight:'400',
 display:'swap',
 variable:'--pilot-display',
});
const support=localFont({
 src:'../../../../public/fonts/anton/anton-latin-400.woff2',
 weight:'400',
 display:'swap',
 variable:'--pilot-support',
});

export const dynamic='force-dynamic';
export const metadata:Metadata={
 title:'LE GOLFE — Homepage pilote : freestyle noir et blanc',
 description:'La homepage LE GOLFE : titres freestyle et direction graphique en noir et blanc.',
 robots:{index:false,follow:false},
};

export default function HomePilot({params}:{params:Promise<{locale:string}>}){
 return <div className={`${display.variable} ${support.variable} ${styles.pilot}`}><Home params={params}/></div>;
}
