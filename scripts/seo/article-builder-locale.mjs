/**
 * zh / es long-form article sections 鈥?mirrors article-builder.mjs structure.
 */
import { insertSectionImages } from "./article-image-blocks.mjs";

function p(text) {
  return { type: "p", text };
}
function h2(text) {
  return { type: "h2", text };
}
function h3(text) {
  return { type: "h3", text };
}
function ul(items) {
  return { type: "ul", items };
}
function richLink(text, link, href) {
  return { type: "rich-p", segments: [text, { link, href }] };
}
function sectionBlocks(heading, paragraphs) {
  const blocks = [h2(heading)];
  for (const para of paragraphs) blocks.push(p(para));
  return blocks;
}

const LINKS = {
  zh: {
    factory: ["鏌ョ湅 ", "涓浗鍦版澘宸ュ巶鐢熶骇鑳藉姏涓庣敓浜х嚎", "/factory"],
    wall: ["了解 ", "墙板批发供应与混装整柜方案", "/wall-panels"],
    spc: ["Eshsire Group 鏄笓涓氱殑 ", "SPC 鍦版澘渚涘簲鍟嗕笌涓浗鍦版澘宸ュ巶", "/spc-flooring"],
    contact: ["", "索取工厂报价与整柜价格", "/contact"],
    imgCaption: "工厂与供应链参考 — SPC B2B 进口",
    imgEnding: "出口装柜与集装箱发运 — 地板经销商供应",
  },
  es: {
    factory: ["Consulte ", "capacidad de f谩brica y l铆neas de producci贸n en China", "/factory"],
    wall: ["Explore ", "suministro mayorista de paneles murales para contenedores mixtos", "/wall-panels"],
    spc: ["Eshsire Group es ", "proveedor de suelos SPC y f谩brica de suelos en China", "/spc-flooring"],
    contact: ["", "Solicite cotizaci贸n de f谩brica y precios de contenedor", "/contact"],
    imgCaption: "Referencia de f谩brica y cadena de suministro 鈥?importaci贸n SPC B2B",
    imgEnding: "Env铆o exportaci贸n y carga de contenedor 鈥?suministro distribuidor",
  },
};

const COPY = {
  zh: {
    intro: (t, pk, sk0, sk1) =>
      `${t}鈥斺€旀湰鏂囬潰鍚戜粠涓浗閲囪喘鐨勫湴鏉跨粡閿€鍟嗐€佹壒鍙戝晢銆佸伐绋嬫壙鍖呭晢鍙婂缓鏉愯繘鍙ｅ晢銆傛牳蹇冮噰璐瑙掓槸${pk}锛氬伐鍘傚畾浠烽€昏緫銆侀泦瑁呯杩愯緭鏁堢巼銆佸ぇ璐ф壒閲忛噰璐笌渚涘簲閾鹃€忔槑搴︼紝鑰岄潪瑁呴グ娼祦銆傛纭瘎浼?{sk0}鍜?{sk1}锛岃繘鍙ｅ晢鎵嶈兘淇濇姢鍒╂鼎銆佸噺灏戠储璧斿苟缂╃煭琛ヨ揣鍛ㄦ湡銆俙,
    Eshsire GroupH2: "Eshsire Group 宸ュ巶浼樺娍锛氳繘鍙ｅ晢涓轰綍杞悜鐩翠緵",
    Eshsire GroupP: (pk) =>
      `Eshsire Group 鍚堜綔浼欎即 Eshsire Group 鍦ㄥ寳浜繍钀?6000銕?涓€浣撳寲 SPC 鍦版澘涓庡鏉垮伐鍘傦紝鎷ユ湁鎸ゅ嚭銆佸帇璐淬€佽川妫€鍙婂嚭鍙ｅ崟璇佸洟闃熴€傚綋缁忛攢鍟嗛渶瑕佸彲楠岃瘉鐢熶骇鐨?{pk}鈥斺€旇€岄潪璐告槗鍟嗘崲鏍囪创鐗屸€斺€斾互鍙婇潰鍚戦潪娲层€佷腑涓溿€佹娲插拰涓滃崡浜?30 澶氫釜鍥藉鐨勬暣鏌滈」鐩椂锛屼細閫夋嫨鎴戜滑銆俙,
    factoryDirect: (sk0, sk2) =>
      `宸ュ巶鐩翠緵${sk0}閫氬父鍙渷鍘?FOB 鎶ヤ环涓?8鈥?5% 鐨勮锤鏄撳晢鍔犱环锛涢攣瀹?BOM 鍙傝€冨彲淇濇寔闆跺敭涓庡伐绋嬫笭閬撴壒娆￠鑹茬ǔ瀹氥€傛瘡鍛ㄧ敓浜х収鐗囥€佽鏌滆褰曞強鎸?SKU 鐨勫钩鏂圭背瑁呯鍗曪紝鏄笓涓氳繘鍙ｅ晢瀵归噸澶?{sk2}鐨勫熀鏈姹傘€俙,
    profitH2: "SPC 鍦版澘涔板涓轰綍鍏虫敞鍒╂鼎涓庝緵搴旈摼",
    profitP1: (pk, sk2) =>
      `鎴愬姛鐨勮繘鍙ｅ晢灏嗗湴鏉胯涓虹幇閲戞祦鍝佺被銆傚埌宀告瘡骞虫柟绫虫垚鏈€丮OQ 缁撴瀯銆佺敓浜т氦鏈熶笌闆嗚绠卞埄鐢ㄧ巼锛屽喅瀹氱粡閿€鍟嗚兘鍚︽寔缁闀裤€傚彲闈犵殑${pk}鍙幓闄や腑闂村晢鍔犱环銆佺ǔ瀹氭壒娆￠鑹插苟鏀寔閲嶅${sk2}銆俙,
    profitP2: (sk0) =>
      `璐告槗鍏徃鎶ヤ环蹇紝浣嗗父鍦ㄤ笉鍚岄泦瑁呯涔嬮棿鍒囨崲宸ュ巶銆傚伐鍘傜洿渚?{sk0}鎻愪緵涓庡悓涓€鍘傚尯缁戝畾鐨勭敓浜ф棩鏈熴€丵C 鐓х墖銆佽绠卞崟涓庤鏌滆褰曗€斺€斿綋闆跺敭瀹㈡埛鎴栧伐绋嬮」鐩洜寤惰繜缃氭鏃讹紝杩欎竴鐐硅嚦鍏抽噸瑕併€俙,
    docH3: "涓嬪崟鍓嶅簲璁板綍鐨勯噰璐枃浠?,
    docItems: (pk, sk3) => [
      `宸ュ巶鍦板潃銆佺敓浜х嚎鐓х墖鍙?{pk}鍙傝€冩姤浠穈,
      `鑰愮（灞?鍘氬害鐭╅樀鍙婂悇 SKU 鐨?MOQ锛?{sk3}锛塦,
      "鏁存煖 CBM 璁″垝锛?0HQ 骞虫柟绫炽€佺焊绠卞爢鐮佸強娣疯壊鍙鎬?,
      "QC 娓呭崟銆佸嚭璐у墠妫€楠屾祦绋嬪強绱㈣禂澶勭悊鏈哄埗",
      "浠樻鏉℃銆佺敓浜ф椂闂磋〃鍙婃瘡鍛ㄨ繘搴︽洿鏂版牸寮?,
    ],
    mistakeH2: "缁忛攢鍟嗗繀椤绘秷闄ょ殑楂樻垚鏈噰璐敊璇?,
    mistakeItems: [
      "鍙拷鏈€浣?FOB 鑰屼笉绠楀埌宀告垚鏈€斺€旇繍璐广€佺储璧斾笌鏂揣浼氬湪涓や釜瀛ｅ害鍐呮姽骞冲樊浠枫€?,
      "璺宠繃宸ュ巶楠屽巶鎴栬棰戝鏍糕€斺€旀壒娆¤壊宸湪闆跺敭绔垎鍙戞椂锛屼腑闂村晢寰€寰€娑堝け銆?,
      "鏈攣瀹氫骇鍓嶆牱锛堥鑹层€佽€愮（灞傘€佸绠辨爣璁帮級灏变笅棣栧崟澶ц揣銆?,
      "瀹氶噾鍒拌鏌滀箣闂寸己涔忕敓浜у彲瑙佹€р€斺€旀矇榛橀€氬父鎰忓懗鐫€鎺掍骇琚彃闃燂紝鑰岄潪杩涘睍椤哄埄銆?,
    ],
    chooseH2: "棣栨煖鍓嶅浣曡瘎浼颁腑鍥?SPC 鍦版澘渚涘簲鍟?,
    chooseItems: [
      "纭鐢熶骇鍦板潃涓庡嚭鍙ｅ崟璇併€佽鏌滅収鐗囦竴鑷粹€斺€旇€岄潪甯備腑蹇冭锤鏄撳姙鍏銆?,
      "绱㈠彇鐩爣甯傚満 3 瀹跺璐鎴峰弬鑰冨強绱㈣禂鐜囨暟鎹€?,
      "瀹℃煡 QC 娓呭崟锛氬昂瀵稿叕宸€侀攣鎵ｉ厤鍚堛€佽€愮（灞傛娊妫€鍙婄焊绠辫穼钀芥爣鍑嗐€?,
      "瀵规瘮鏁存煖 CBM 瑙勫垝鍝嶅簲璐ㄩ噺鈥斺€旀瑙勫伐鍘傚湪鎶?FOB 鍓嶄細璁＄畻 40HQ 骞虫柟绫炽€?,
    ],
    factoryPriceH2: "宸ュ巶浠?vs 璐告槗鍏徃鎶ヤ环",
    factoryPriceItems: (pk, sk2) => [
      "宸ュ巶 FOB 鎸夊帤搴︺€佽€愮（灞?mil銆佽〃闈㈠鐞嗐€佽鍗曢噺鍙?OEM 鍖呰鎷嗗垎鈥斺€斾笉鏄崟涓€闆跺敭浠枫€傝绱㈠彇鍒嗛」骞虫柟绫虫姤浠峰苟娉ㄦ槑娓彛涓庤锤鏄撴湳璇€?,
      `涓€浣撳寲${pk}鍦ㄥ悓涓€鍘傚尯瀹屾垚鎸ゅ嚭銆佸帇璐淬€佸紑妲戒笌鍖呰锛屽噺灏戜腑闂村姞浠峰苟鎻愰珮${sk2}鎵规涓€鑷存€с€俙,
      "鐢ㄥ埌宀告垚鏈瘮杈冩姤浠凤細FOB + 鏈湴璐圭敤 + 娴疯繍璐?+ 鐩殑娓垂鐢?+ 妫€楠?+ 璧勯噾鎴愭湰銆傛湭楠岃瘉渚涘簲鍟嗙殑浣?FOB 甯稿湪寤惰繜涓庣储璧斿悗鏇磋吹銆?,
      "澶嶈喘璁㈠崟閿佸畾 BOM 鍙傝€冿紝淇濇寔棰滆壊銆佸帇绾逛笌鑺潗閰嶆柟绋冲畾鈥斺€斿闆跺敭闄堝垪涓庡伐绋嬮獙鏀惰嚦鍏抽噸瑕併€?,
    ],
    riskH2: "閲囪喘椋庨櫓鎺у埗娓呭崟",
    riskItems: [
      "楠岃瘉渚涘簲鍟嗘槸鍒堕€犲晢鑰岄潪閲嶆柊鎵撳寘浠栦汉绾哥鐨勪腑闂村晢锛涜姹傚綋鏃ュ伐鍘傚ぇ闂ㄧ収鐗囧苟鏍囨敞璁㈠崟鍙枫€?,
      "鏂扮郴鍒楃粷涓嶈烦杩囦骇鍓嶆牱绛惧瓧锛堥鑹蹭笌鑰愮（灞傦級銆?,
      "鍚堝悓鏉℃锛氶€炬湡鐢熶骇缃氬垯銆佽繍杈撴崯鍧忔浛鎹㈡斂绛栥€丅L 涓?CO 鍗曡瘉鏃堕棿琛ㄣ€?,
      "鍩虹宸ュ巶鍏崇郴绋冲畾鍚庡啀鑰冭檻鍙屾簮鈥斺€旀棤浣撻噺鍒嗛厤鐨勫弻婧愪細澧炲姞澶嶆潅搴︿笌 QC 婕傜Щ銆?,
    ],
    landedH2: "杩涘彛鍟嗙粡娴庡锛氬埌宀告垚鏈笌鏁存煖璁＄畻",
    landedItems: (sk1, sk2, pk) => [
      `FOB 姣忓钩鏂圭背鍙槸璧风偣銆傝繘鍙ｅ晢蹇呴』鏍哥畻娴疯繍璐广€佷繚闄┿€佺洰鐨勬腐璐圭敤銆佸唴闄嗛厤閫併€佽祫閲戞垚鏈強棰勬湡绱㈣禂鐜囷紝鍐嶆瘮杈?{sk1}鎶ヤ环銆俙,
      "浼樺寲绾哥鍫嗙爜鐨?40HQ 瑁?3500 銕?鏃讹紝鍗曚綅杩愯垂鍙瘮 LCL 鎷肩浣?15鈥?5%鈥斺€旇繖涓€宸窛甯歌秴杩囩暐楂?FOB 鐨勫彲闈犲伐鍘傘€?,
      `璁″垝瀛ｅ害${sk2}鐨勭粡閿€鍟嗗簲涓庡伐鍘備骇鑳藉榻愭帓浜э紝閬垮厤鏃哄鎺掗槦澧炲姞 10鈥?0 澶╁苟鎵撲贡闆跺敭淇冮攢銆俙,
      `璁板綍姣忔煖鏁版嵁锛氬嚭璐у钩鏂圭背銆丼KU 缁勫悎銆佺储璧旀鏁般€丳O 鍒颁粨澶╂暟鈥斺€旇繖鏄勾搴?{pk}渚涘簲鍗忚璋堝垽鍩虹銆俙,
    ],
    commH2: "渚涘簲鍟嗘矡閫氫笌鐢熶骇鍙鎬?,
    commItems: (sk0) => [
      "姣忓懆杩涘害搴斿寘鍚凡瀹屾垚骞虫柟绫炽€丵C 鏆傛墸銆佸绠辨爣绛剧姸鎬佸強棰勮瑁呮煖绐楀彛鈥斺€旇€岄潪娉涙硾鐨勩€岃繘琛屼腑銆嶉偖浠躲€?,
      "瑁呮煖鍓嶆敹鍒拌鏌滅収鐗囥€侀搮灏佸彿涓?BL 鑽夌鐨勮繘鍙ｅ晢锛屾竻鍏虫洿蹇紝閿€鍞洟闃?ETA 鏇村噯纭€?,
      `浠庤锤鏄撳叕鍙歌浆鍚戝伐鍘傜洿渚?{sk0}锛屽崟璇佷笌 SKU 鏄犲皠閫氬父鏈?1鈥? 鏌滃涔犳湡鈥斺€旇妭鐪佷粠绗笁鏌滃紑濮嬫樉鐜般€俙,
      "澶氳瑷€鍑哄彛鍥㈤槦甯姪涓笢銆侀潪娲蹭笌鎷夌編缁忛攢鍟嗗榻愬绠辨爣璁般€佽瘉涔︿笌宸ョ▼瑙勬牸锛岄伩鍏嶇炕璇戝欢璇€?,
    ],
    scaleH2: "鎵╁ぇ閲囪喘鑰屼笉澧炲姞娴佸姩璧勯噾鍘嬪姏",
    scaleItems: (sk3) => [
      "杞崲 A/B/C SKU锛欰 绫绘瘡鏌滃繀瑁咃紝B 绫婚殧鏌滐紝C 绫诲湪 MOQ 鍙嬪ソ鐨勬贩瑁呮煖璇曞崟銆?,
      "鍙敤宸ュ巶浠撴殏瀛樻椂灏嗕竴鎵圭敓浜ф媶鎴愪袱涓湀涓ゆ煖鈥斺€旂幇閲戞祦姣斿崟娆″ぇ PO 鏇村钩婊戙€?,
      "闆跺敭涓庡伐绋嬫笭閬撴瘺鍒╃粨鏋勪笉鍚岋紱鍒嗗埆鏍哥畻鍒板哺鎴愭湰锛岄伩鍏嶅伐绋嬫姤浠蜂镜铓€缁忛攢鍟嗚鍒掑埄娑︺€?,
      `鏈夊嚭璐ц褰曠殑骞村害閲囪喘鎵胯鍙В閿?{sk3}闃舵浠封€斺€斿伐鍘備紭鍏堟帓浜ц妭濂忓彲棰勬祴鐨勫悎浣滀紮浼淬€俙,
    ],
    roadmapH2: "涓嬩竴鍗曞疄鏂借矾绾垮浘",
    roadmapP: (pk) =>
      `姝ラ 1锛氬彂閫佺洰鏍囧钩鏂圭背銆佸帤搴?鑰愮（灞傜煩闃靛強鐩殑娓紝绱㈠彇${pk}宸ュ巶浠风洰琛ㄣ€傛楠?2锛氱‘璁ゆ暣鏌滆鍒掍笌鐢熶骇绐楀彛銆傛楠?3锛氭壒鍑嗕骇鍓嶆牱銆傛楠?4锛氭帴鏀舵瘡鍛?QC 鏇存柊銆傛楠?5锛欱L 閲婃斁鍓嶅鏍歌鏌滅収鐗囥€俙,
    roadmapItems: (sk1, sk2) => [
      `绱㈠彇娣疯 SKU 40HQ 鍦烘櫙鐨?{sk1}鎶ヤ环`,
      `灏?{sk2} MOQ 涓庝粨搴撳閲忓榻恅,
      "璁″垝瑁呮煖鏃ュ墠 5鈥? 澶╁畨鎺掓楠?,
      "閿佸畾鐩殑浠撳绠辨爣璁颁笌鎵樼洏妯″紡",
    ],
    conclusionH2: "鎳傝繘鍙ｇ粡娴庡鐨勪緵搴斿晢",
    conclusionP: (t, pk, sk0, sk3) =>
      `${t}鈥斺€斾笓涓氫拱瀹剁殑缁撹寰堢畝鍗曪細閫夋嫨绮鹃€?{pk}銆?{sk0}涓庢暣鏌滅粡娴庡鐨勫悎浣滀紮浼淬€傚綋宸ュ巶瀹氫环銆佺敓浜у彲瑙佹€т笌鍙戣繍绾緥涓€鑷存椂锛岀粡閿€鍟嗗彲鍦ㄤ笉鎻愰珮闆跺敭浠风殑鎯呭喌涓嬫敼鍠勫埄娑︼紝骞舵湁淇″績鎵╁ぇ${sk3}璁″垝銆傝嫢鐜版湁渚涘簲鍟嗘棤娉曞湪姣忔煖灞曠ず鐢熶骇銆丵C 涓庤鏌滆瘉鎹紝鏄椂鍊欏悜涓浗鍦版澘宸ュ巶绱㈠彇骞宠鎶ヤ环銆俙,
    contactP: (sk2) =>
      `鑱旂郴鍑哄彛鍥㈤槦绱㈠彇宸ュ巶浠风洰琛ㄣ€?0HQ 鏁存煖鎶ヤ环鍙?{sk2}鎵归噺浠枫€傛垜浠湇鍔￠渶瑕佺ǔ瀹氫緵搴旈摼绠℃帶鐨勭粡閿€鍟嗏€斺€旇€岄潪钀ラ攢鏁呬簨銆俙,
    padding: (n, kw, pk) =>
      `閲囪喘娣卞害鍒嗘瀽 ${n}锛氳瘎浼?{kw}涓?{pk}鐨勪笓涓氫拱瀹讹紝搴斿涓夌鍦烘櫙鍘嬪姏娴嬭瘯鎶ヤ环鈥斺€斿崟鑹叉暣鏌溿€佹贩鑹?40HQ 鍙婄揣鎬?LCL 琛ヨ揣銆傛瘡绉嶅満鏅褰曠敓浜уぉ鏁般€丵C 鏆傛墸椋庨櫓銆佽繍璐规瘡骞虫柟绫冲強鎵ｉ櫎绱㈣禂鍚庣殑棰勬湡姣涘埄銆傜绾﹀勾搴﹀崗璁墠杩愯姝ゅ垎鏋愶紝鍙伩鍏嶅彧浼樺寲 FOB 鑰屽拷瑙嗙墿娴佷笌搴撳瓨鎸佹湁鎴愭湰鐨勯櫡闃便€傛効鎰忓垎浜尋鍑烘帓浜с€佸師鏉愭枡浜ゆ湡涓庤鏌滄棩鍘嗙殑宸ュ巶浼欎即锛屽湪鎮ㄨ法鍖烘墿澶?SPC 鍦版澘杩涘彛閲忔椂搴斾紭鍏堣€冭檻銆俙,
  },
  es: {
    intro: (t, pk, sk0, sk1) =>
      `${t}: art铆culo para distribuidores, mayoristas, contratistas e importadores de materiales de construcci贸n que compran en China. Su enfoque principal es ${pk}: l贸gica de precio de f谩brica, eficiencia de contenedor, compras al por mayor y visibilidad de cadena de suministro 鈥?no tendencias decorativas. Al evaluar bien ${sk0} y ${sk1}, los importadores protegen m谩rgenes, reducen reclamaciones y acortan ciclos de reposici贸n.`,
    Eshsire GroupH2: "Ventaja Eshsire Group: por qu茅 los importadores eligen suministro directo",
    Eshsire GroupP: (pk) =>
      `El socio Eshsire Group Eshsire Group opera una f谩brica integrada de 6000 m虏 de suelos SPC y paneles murales en Pek铆n con extrusi贸n, laminaci贸n, QC y documentaci贸n de exportaci贸n internas. Los distribuidores nos eligen cuando necesitan ${pk} con producci贸n verificable 鈥?no reempaquetado de intermediarios 鈥?y programas de contenedor a m谩s de 30 pa铆ses en 脕frica, Oriente Medio, Europa y el Sudeste Asi谩tico.`,
    factoryDirect: (sk0, sk2) =>
      `El suministro directo de f谩brica ${sk0} elimina el margen del comercializador (8鈥?5 % en FOB), mientras las referencias BOM bloqueadas mantienen color estable en retail y proyectos. Fotos semanales de producci贸n, registros de carga y packing lists por m虏/SKU son est谩ndar para ${sk2} repetidos 鈥?la transparencia que exigen importadores profesionales.`,
    profitH2: "Por qu茅 los compradores de suelos SPC priorizan beneficio y cadena de suministro",
    profitP1: (pk, sk2) =>
      `Los importadores exitosos tratan el suelo como categor铆a de flujo de caja. El coste landed por m虏, MOQ, plazo de producci贸n y utilizaci贸n de contenedor determinan si un distribuidor crece o se estanca. Un ${pk} fiable elimina margen de intermediario, estabiliza color por lote y apoya ${sk2} repetidos.`,
    profitP2: (sk0) =>
      `Las trading companies cotizan r谩pido pero cambian de f谩brica entre contenedores. ${sk0} directo de f谩brica ofrece fechas de producci贸n, fotos QC, packing lists y registros de carga de una sola instalaci贸n 鈥?cr铆tico cuando clientes retail o proyectos penalizan retrasos.`,
    docH3: "Qu茅 documentar antes de pedir",
    docItems: (pk, sk3) => [
      `Direcci贸n de f谩brica, fotos de l铆nea y precio de referencia ${pk}`,
      `Matriz de capa de desgaste / espesor y MOQ por SKU (${sk3})`,
      "Plan CBM contenedor: m虏 por 40HQ, apilado de cartones y viabilidad de colores mixtos",
      "Checklist QC, inspecci贸n pre-embarque y proceso de reclamaciones",
      "T茅rminos de pago, cronograma de producci贸n y formato de actualizaci贸n semanal",
    ],
    mistakeH2: "Errores de compras costosos que los distribuidores deben eliminar",
    mistakeItems: [
      "Perseguir el FOB m谩s bajo sin c谩lculo landed 鈥?flete, reclamaciones y roturas de stock borran el ahorro en dos trimestres.",
      "Omitir auditor铆a de f谩brica o video 鈥?los intermediarios desaparecen cuando fallan lotes de color en retail.",
      "Pedidos grandes iniciales sin bloqueo de muestra pre-producci贸n (color, desgaste, marcado de cart贸n).",
      "Sin visibilidad entre dep贸sito y carga 鈥?el silencio suele significar saltos de cola, no progreso fluido.",
    ],
    chooseH2: "C贸mo evaluar un proveedor SPC en China antes del primer contenedor",
    chooseItems: [
      "Confirme que la direcci贸n de fabricaci贸n coincide con documentaci贸n de exportaci贸n y fotos de carga 鈥?no una oficina comercial.",
      "Solicite tres referencias en su regi贸n con historial de recompra y tasa de reclamaciones.",
      "Revise checklist QC: tolerancia dimensional, ajuste click-lock, test de desgaste y ca铆da de cart贸n.",
      "Compare calidad de respuesta en planificaci贸n CBM 鈥?f谩bricas serias calculan m虏 por 40HQ antes de cotizar FOB.",
    ],
    factoryPriceH2: "Precio de f谩brica vs cotizaciones de trading company",
    factoryPriceItems: (pk, sk2) => [
      "El FOB de f谩brica se desglosa por espesor, mil de desgaste, textura, volumen y embalaje OEM 鈥?no un precio retail 煤nico. Pida cotizaciones itemizadas por m虏 con puerto e incoterm.",
      `Instalaciones integradas ${pk} controlan extrusi贸n, laminaci贸n, perfilado y embalaje en un sitio 鈥?menos markup y mejor consistencia de lote para ${sk2}.`,
      "Compare en coste landed: FOB + cargos locales + flete + destino + inspecci贸n + financiaci贸n. FOB bajo de proveedor no verificado suele salir caro tras retrasos y reclamaciones.",
      "Bloquee referencias BOM en recompras para color, gofrado y f贸rmula de n煤cleo estables 鈥?esencial para retail y sign-off de proyecto.",
    ],
    riskH2: "Checklist de control de riesgo de compras",
    riskItems: [
      "Verifique que el proveedor es fabricante, no broker que reempaqueta cartones ajenos. Pida fotos del d铆a en puerta de f谩brica con referencia de pedido.",
      "Nunca omita sign-off de muestra pre-producci贸n en color y desgaste para nuevas colecciones.",
      "Cl谩usulas: penalizaciones por retraso, pol铆tica de reemplazo por da帽o en tr谩nsito, plazos de BL y CO.",
      "Diversifique solo tras relaci贸n estable con f谩brica base 鈥?doble sourcing sin reparto de volumen aumenta complejidad y deriva QC.",
    ],
    landedH2: "Econom铆a del importador: coste landed y matem谩tica de contenedor",
    landedItems: (sk1, sk2, pk) => [
      `El FOB por m虏 es solo el inicio. Modele flete, seguro, puerto destino, entrega interior, financiaci贸n y tasa de reclamaciones antes de comparar ${sk1}.`,
      "Un 40HQ con 3500 m虏 y apilado optimizado reduce flete unitario 15鈥?5 % vs LCL 鈥?a menudo supera un FOB ligeramente mayor de f谩brica verificada.",
      `Distribuidores con ${sk2} trimestrales alinean slots de producci贸n con capacidad, evitando colas de temporada (+10鈥?0 d铆as) que rompen promociones retail.`,
      `Documente cada contenedor: m虏 enviados, mix SKU, reclamaciones, d铆as PO a almac茅n 鈥?base para acuerdos anuales ${pk}.`,
    ],
    commH2: "Comunicaci贸n con proveedor y visibilidad de producci贸n",
    commItems: (sk0) => [
      "Las actualizaciones semanales deben incluir m虏 completados, retenciones QC, etiquetado de cart贸n y ventana de carga estimada 鈥?no emails gen茅ricos 芦en progreso禄.",
      "Importadores con fotos de carga, n煤meros de precinto y BL borrador antes de salida resuelven aduanas m谩s r谩pido y dan ETAs precisos a ventas.",
      `Al pasar de trading company a ${sk0} directo, espere curva de aprendizaje de 1鈥? contenedores en documentaci贸n 鈥?el ahorro aparece desde el tercer env铆o.`,
      "Equipos de exportaci贸n multiling眉es ayudan a distribuidores en Oriente Medio, 脕frica y Latam a alinear marcas de cart贸n, certificados y specs de proyecto.",
    ],
    scaleH2: "Escalar compras sin aumentar estr茅s de capital de trabajo",
    scaleItems: (sk3) => [
      "Rote SKUs A/B/C: clase A cada contenedor, B cada otro ciclo, C en cargas mixtas MOQ-friendly.",
      "Use staging en almac茅n de f谩brica para dividir una producci贸n en dos contenedores mensuales 鈥?flujo de caja m谩s suave que un PO grande 煤nico.",
      "Retail y proyectos tienen m谩rgenes distintos; cotice landed por separado para que licitaciones de contratista no erosionen programas de dealer.",
      `Compromisos anuales de volumen con historial de env铆os desbloquean ${sk3} por tramos 鈥?las f谩bricas priorizan socios con ritmo de contenedor predecible.`,
    ],
    roadmapH2: "Hoja de ruta para su pr贸ximo pedido",
    roadmapP: (pk) =>
      `Paso 1: Env铆e m虏 objetivo, matriz espesor/desgaste y puerto destino para lista de precios ${pk}. Paso 2: Confirme plan de contenedor y ventana de producci贸n. Paso 3: Apruebe muestra pre-producci贸n. Paso 4: Reciba actualizaciones QC semanales. Paso 5: Revise fotos de carga antes de liberar BL.`,
    roadmapItems: (sk1, sk2) => [
      `Solicite cotizaci贸n ${sk1} con escenario 40HQ mixto`,
      `Alinee MOQ de ${sk2} con capacidad de almac茅n`,
      "Programe inspecci贸n 5鈥? d铆as antes de carga planificada",
      "Bloquee marcado de cart贸n y patr贸n de pal茅 para almac茅n destino",
    ],
    conclusionH2: "Conclusi贸n: proveedor que entiende econom铆a de importaci贸n",
    conclusionP: (t, pk, sk0, sk3) =>
      `${t}: la conclusi贸n para compradores profesionales es simple 鈥?elija socios que dominen ${pk}, ${sk0} y econom铆a de contenedor. Cuando precio de f谩brica, visibilidad y disciplina de env铆o se alinean, los distribuidores mejoran m谩rgenes sin subir precios retail y ganan confianza para escalar ${sk3}. Si su proveedor actual no muestra producci贸n, QC y carga en cada contenedor, pida una cotizaci贸n paralela a una f谩brica de suelos en China.`,
    contactP: (sk2) =>
      `Contacte al equipo de exportaci贸n para lista de precios de f谩brica, cotizaci贸n 40HQ y precios ${sk2}. Apoyamos distribuidores que necesitan control estable de cadena de suministro 鈥?no historias de marketing.`,
    padding: (n, kw, pk) =>
      `An谩lisis de compras ${n}: compradores profesionales que eval煤an ${kw} junto a ${pk} deben stress-testear cotizaciones con tres escenarios 鈥?contenedor lleno un SKU, 40HQ multicolor y top-up LCL de emergencia. Por escenario, registre d铆as de producci贸n, riesgo de retenci贸n QC, flete por m虏 y margen bruto esperado tras reclamaciones. Distribuidores que ejecutan este an谩lisis antes de acuerdos anuales evitan optimizar solo FOB ignorando log铆stica y coste de inventario. Socios de f谩brica que comparten calendario de extrusi贸n, lead times de materia prima y carga merecen prioridad al escalar importaci贸n de suelos SPC en varias regiones.`,
  },
};

export function getLocaleImageLabels(locale) {
  return LINKS[locale];
}

export function buildLocalizedSections(meta, locale) {
  const C = COPY[locale];
  const L = LINKS[locale];
  const pk = meta.primaryKeyword;
  const sk = meta.secondaryKeywords;
  const t = meta.title;
  const topicType = meta.topicType;
  const slug = meta.slug;

  const sections = [
    p(C.intro(t, pk, sk[0], sk[1])),
    h2(C.Eshsire GroupH2),
    p(C.Eshsire GroupP(pk)),
    richLink(...L.factory),
    p(C.factoryDirect(sk[0], sk[2])),
    richLink(...L.wall),
    h2(C.profitH2),
    p(C.profitP1(pk, sk[2])),
    p(C.profitP2(sk[0])),
    h3(C.docH3),
    ul(C.docItems(pk, sk[3])),
  ];

  if (topicType === "risk" || slug.includes("mistake") || slug.includes("7-mistakes")) {
    sections.push(...sectionBlocks(C.mistakeH2, C.mistakeItems));
  }

  if (topicType === "supplier" || slug.includes("choose-reliable")) {
    sections.push(...sectionBlocks(C.chooseH2, C.chooseItems));
  }

  if (topicType === "factory" || slug.includes("supplier-manufacturer")) {
    sections.push(...sectionBlocks(C.factoryPriceH2, C.factoryPriceItems(pk, sk[2])));
  }

  if (topicType === "risk" || slug.includes("mistake") || slug.includes("7-mistakes")) {
    sections.push(...sectionBlocks(C.riskH2, C.riskItems));
  }

  sections.push(
    ...sectionBlocks(C.landedH2, C.landedItems(sk[1], sk[2], pk)),
    ...sectionBlocks(C.commH2, C.commItems(sk[0])),
    ...sectionBlocks(C.scaleH2, C.scaleItems(sk[3])),
    h2(C.roadmapH2),
    p(C.roadmapP(pk)),
    ul(C.roadmapItems(sk[1], sk[2])),
    h2(C.conclusionH2),
    p(C.conclusionP(t, pk, sk[0], sk[3])),
    richLink(...L.spc),
    richLink(...L.contact),
    p(C.contactP(sk[2]))
  );

  return sections;
}

export function localizedPaddingParagraph(locale, n, kw, pk) {
  return COPY[locale].padding(n, kw, pk);
}

export function countCjkWords(text) {
  const cjk = (text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length;
  const latin = text.replace(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g, " ").split(/\s+/).filter(Boolean).length;
  return cjk + latin;
}

export function countBlocksWordsLocalized(blocks, locale) {
  const countText = (text) => {
    if (locale === "zh" || locale === "ja" || locale === "ko") return countCjkWords(text);
    if (locale === "ar" || locale === "he") return Math.ceil(text.replace(/\s/g, "").length / 4);
    return text.split(/\s+/).filter(Boolean).length;
  };
  return blocks.reduce((sum, b) => {
    if (b.type === "p") return sum + countText(b.text);
    if (b.type === "ul") return sum + countText(b.items.join(" "));
    if (b.type === "rich-p")
      return sum + countText(b.segments.filter((s) => typeof s === "string").join(" "));
    return sum;
  }, 0);
}

export function buildLocalizedLongFormBlocks(meta, images, locale) {
  const L = LINKS[locale];
  const sections = buildLocalizedSections(meta, locale);
  let blocks = insertSectionImages(sections, images, meta, L);

  let wc = countBlocksWordsLocalized(blocks, locale);
  let pad = 0;
  while (wc < 1800 && pad < 40) {
    const kw = meta.secondaryKeywords[pad % meta.secondaryKeywords.length];
    blocks.splice(
      blocks.length - 1,
      0,
      p(localizedPaddingParagraph(locale, pad + 1, kw, meta.primaryKeyword))
    );
    wc = countBlocksWordsLocalized(blocks, locale);
    pad++;
  }

  return { blocks, wordCount: wc };
}
