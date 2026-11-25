import type {Metadata} from 'next';
import localFont from 'next/font/local';
import Home from '../../page';
import styles from './pilot.module.css';

const display=localFont({
 src:'../../../../public/fonts/anton/anton-latin-400.woff2',
 weight:'400',
 display:'swap',
 variable:'--pilot-display',
});

export const dynamic='force-dynamic';
export const metadata:Metadata={
 title:'LE GOLFE — Homepage pilote : typographie',
 description:'La homepage LE GOLFE avec une nouvelle typographie pour les titres.',
 robots:{index:false,follow:false},
};

export default function HomePilot({params}:{params:Promise<{locale:string}>}){
 return <div className={`${display.variable} ${styles.pilot}`}><Home params={params}/></div>;
}
