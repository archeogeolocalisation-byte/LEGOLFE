import {cache} from 'react';
import {localNews} from '../data/localNews';
import {getApprovedNews} from './editorialDb';
import {parisIsoDay} from './localCalendar';
import {mergeLocalNews} from './localNewsCatalog';
/** Approved DB entries and repository editions remain available when RSS items disappear. */
export const getPublicNews=cache(async()=>mergeLocalNews(await getApprovedNews(),localNews,parisIsoDay()));
