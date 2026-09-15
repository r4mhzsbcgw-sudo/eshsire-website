import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const queue=JSON.parse(fs.readFileSync(path.join(root,"content/blog/blogQueue.en.json"),"utf8"));
const catalog=JSON.parse(fs.readFileSync(path.join(root,"content/blog/blogImageAssets.en.json"),"utf8"));
const sitemap=fs.readFileSync(path.join(root,"public/sitemap.xml"),"utf8");
const posts=queue.entries.filter((post)=>post.publishDate>="2026-09-15");
const bySrc=new Map(catalog.map((asset)=>[asset.src,asset]));
const perDay=Object.groupBy(posts,(post)=>post.publishGroupDate);
const imageUses=new Map(),featuredUses=new Map(),flooringImages=new Set(),wallImages=new Set(),topicPool=new Map();
const structures=new Map(),types=new Map(),generic=new Map();
let duplicates=0,wrongTopic=0,external=0,missing=0,outsideWords=0,missingTable=0,shortLinks=0,wallPrimarySpc=0,collisions=0;
let featuredWithin14=0;
for(const post of posts){
  const track=post.publishSlot==="flooring" ? "flooring" : "wall";
  const topic=post.imageTopic.replace(/^(flooring|wall)-/,"");
  if(track==="wall" && /\bspc[ -]?wall[ -]?panels?\b/i.test([post.title,post.targetKeyword,post.primaryTopic].join(" ")) && !/mixed.container/i.test(post.title)) wallPrimarySpc++;
  const images=[post.featuredImage,...post.inlineImages];
  if(new Set(images.map((item)=>item.src)).size!==images.length) duplicates++;
  for(const [index,image] of images.entries()){
    imageUses.set(image.src,(imageUses.get(image.src)||0)+1);
    if(index===0) featuredUses.set(image.src,(featuredUses.get(image.src)||0)+1);
    if(track==="flooring") flooringImages.add(image.src); else wallImages.add(image.src);
    if(/^https?:|unsplash|pexels/i.test(image.src)) external++;
    if(!fs.existsSync(path.join(root,"public",image.src.replace(/^\//,"")))) missing++;
    const asset=bySrc.get(image.src);
    if(!asset || !asset.tags.includes(topic)) wrongTopic++;
    const poolKey=`${track}-${topic}`;
    if(!topicPool.has(poolKey)) topicPool.set(poolKey,new Set());
    topicPool.get(poolKey).add(image.src);
  }
  const words=post.body.trim().split(/\s+/).length;
  if(words<900||words>1400) outsideWords++;
  if(!/^\|.+\|/m.test(post.body)) missingTable++;
  if(post.internalLinks.length<3) shortLinks++;
  const headings=post.body.match(/^## .+$/gm)||[];
  const signature=headings.map((heading)=>heading.replace(/SPC flooring|WPC|bamboo-wood fiber|wall panels?|\b\d+(?:\.\d+)?mm\b/gi,"[topic]").replace(/:\s*.+$/," : [focus]")).join(" > ");
  structures.set(signature,(structures.get(signature)||0)+1);
  types.set(post.contentType,(types.get(post.contentType)||0)+1);
  for(const heading of headings) if(/Commercial priorities|Order ownership|Repeat-order learning/i.test(heading)) generic.set(heading,(generic.get(heading)||0)+1);
}
for(const [date,pair] of Object.entries(perDay)) if(pair.length!==2 || pair.filter((post)=>post.publishSlot==="flooring").length!==1 || pair.filter((post)=>post.publishSlot==="wall-panel").length!==1 || pair[0].contentType===pair[1].contentType) collisions++;
for(const track of ["flooring","wall-panel"]){
  const sequence=posts.filter((post)=>post.publishSlot===track).sort((a,b)=>a.publishDate.localeCompare(b.publishDate));
  for(let i=0;i<sequence.length;i++) for(let j=i+1;j<sequence.length && j<i+14;j++) if(sequence[i].featuredImage.src===sequence[j].featuredImage.src) featuredWithin14++;
}
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match)=>match[1]);
const futureUrls=posts.filter((post)=>post.publishDate>"2026-09-15").filter((post)=>urls.some((url)=>url.endsWith(`/en/blog/${post.slug}`)));
const results={
  posts:posts.length,days:Object.keys(perDay).length,pairingAndSameDayTypeCollisions:collisions,
  totalImagePlacements:[...imageUses.values()].reduce((a,b)=>a+b,0),uniqueImagesUsed:imageUses.size,uniqueFeaturedImages:featuredUses.size,uniqueFlooringImages:flooringImages.size,uniqueWallPanelImages:wallImages.size,
  maxSingleImageUsage:Math.max(...imageUses.values()),maxSingleFeaturedUsage:Math.max(...featuredUses.values()),imagesUsedMoreThan10Times:[...imageUses.values()].filter((n)=>n>10).length,
  featuredRepeatedWithin14Days:featuredWithin14,sameArticleDuplicateImages:duplicates,incorrectImageTopics:wrongTopic,externalImages:external,missingImageFiles:missing,
  topicPoolUniqueImageCount:Object.fromEntries([...topicPool].map(([key,value])=>[key,value.size])),
  contentTypeCounts:Object.fromEntries(types),normalizedHeadingSignatureCounts:Object.fromEntries([...structures].sort((a,b)=>b[1]-a[1]).slice(0,10)),maxNormalizedTemplateReuse:Math.max(...structures.values()),repeatedGenericSections:Object.fromEntries(generic),
  companyCapabilityArticleCount:types.get("company-capability")||0,productSpotlightArticleCount:types.get("product-spotlight")||0,applicationArticleCount:types.get("application-scenario")||0,buyerGuideArticleCount:types.get("buyer-guide")||0,
  outside900to1400Words:outsideWords,missingMarkdownTables:missingTable,internalLinksBelow3:shortLinks,wallPanelSpcAsPrimary:wallPrimarySpc,
  sitemapTotal:urls.length,futureSitemapLeak:futureUrls.length,mixedContainerOld:urls.filter((url)=>url.includes("/applications/mixed-container-spc-wall-panels")).length,mixedContainerNew:urls.filter((url)=>url.includes("/mixed-container-spc-flooring-wall-panels")).length,
};
console.log(JSON.stringify(results,null,2));
