# 医学LLM、生成式AI、对话式AI与智能体：增量文献追踪报告

> 检索窗口：**2026-07-15—2026-10-04**；执行日期：2026-10-04（北京时间）。
> 基线：用户提供的2026-07-17版报告；目标期刊：原附录三的35种。
> 本报告为独立增量，不修改原报告。检索对象为公开题录和摘要；不把新闻、观点、模拟结果视为临床疗效证明。

## 本次结果

**窗口内新增主题记录 519 篇：核心相关 198 篇，边缘相关 321 篇。** 另列在线发表早于窗口的补录 12 篇，以及更正记录 6 篇，均不计入新增发表总数。这里的“篇”指独立DOI／题录，包含原创研究、综述、观点、新闻、来信和回复，并非全部为独立临床研究。

新增记录中：有摘要 336 篇；仅获得出版商简介 60 篇；仅题录／无摘要 123 篇。缺摘要记录按标题作主题归类，不能用于推断样本量、效果大小或安全性。

本次结果提示三个值得关注的方向：患者沟通和教育开始积累随机试验证据；智能体正在连接病历、工具调用和科研流程；评估重点正从考试分数转向真实使用、选择性处理、多轮安全与跨语言公平。这是对下列记录的叙述性归纳，不是定量趋势分析。

### 阅读入口

- 下节列出12篇优先阅读文献，结果与解释边界一并呈现。
- 十四个核心章节逐条给出中文要点、英文题名、日期、DOI／PMID及证据状态。
- 边缘相关章节按模型与应用背景分组；更正和早于窗口的补录另列。
- 附件提供可导入参考文献管理器的RIS、完整筛选台账、源数据和可复用脚本。

## 优先阅读：结果与适用边界

### 1. 急诊真实流程：准确输出并不保证采用率或效率提升

**Nature Medicine · 2026-08-19** · [DOI](https://doi.org/10.1038/s41591-026-04601-5) · [PMID 42618632](https://pubmed.ncbi.nlm.nih.gov/42618632/)
*Prospective evaluation of a large language model clinical decision support system in the emergency department.*

Nature Medicine的DECIDE-AI阶段1研究在4周内分析1,138例患者。系统使用率从68%降至30%；两组急诊停留时间均为4.9小时，差异不显著（P=0.99）。会诊周期缩短趋势也未达显著性（P=0.077）。这项非随机早期评估说明工作负荷和持续参与值得优先解决，不能据此宣称患者结局改善或已具备部署证据。

### 2. 医生辅助随机试验：效果受对照条件限制

**npj Digital Medicine · 2026-09-09** · [DOI](https://doi.org/10.1038/s41746-026-03111-5)
*Impact of LLM assistance on physician decision-making: a multi-country randomized controlled trial*

在印度尼西亚、肯尼亚和荷兰招募249名医生的随机试验中，GPT-4o辅助组表现分别提高10.7、18.0和7.2个百分点。但对照组不能使用互联网或临床指南，且未评价伤害，结果来自受控条件。可作为人机协作潜力证据，不能直接外推至常规临床工作或患者安全。

### 3. 术前沟通：患者焦虑与医生工作量同时改善

**npj Digital Medicine · 2026-09-26** · [DOI](https://doi.org/10.1038/s41746-026-03309-7)
*Large language model–assisted preoperative communication reduces patient anxiety and physician workload in prostate cancer: a prospective randomized phase II trial*

前列腺癌术前沟通Ⅱ期随机研究纳入268人，按病房分配；干预为本地LLM先回答患者问题，再进行常规面对面沟通。干预组GAD-7为3.2，对照组5.7（P=0.001）；沟通时间为11.3与19.9分钟（P<0.001）。适合关注患者教育和工作流的读者；目前结局以短期心理及流程指标为主。

### 4. 双模态患者教育：比较对象是文本LLM

**Med · 2026-08-17** · [DOI](https://doi.org/10.1016/j.medj.2026.101263) · [PMID 42607666](https://pubmed.ncbi.nlm.nih.gov/42607666/)
*A bimodal large language model reduces misalignment in patient education: A double-blinded randomized trial.*

Med研究先分析16,583个患者教育案例，再在555名患者中比较融合文本与音频的Dolphin和文本LLM。7天非计划再次联系为12.9%与22.9%（P=0.002），满意度为98.6%与93.8%。这是模型间的随机比较，不能写成相对于常规人工教育的随机试验证据。

### 5. HPV疫苗教育：知识收益未转化为短期行为差异

**JAMA Network Open · 2026-09-01** · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.34696) · [PMID 42804696](https://pubmed.ncbi.nlm.nih.gov/42804696/)
*AI Chatbot Use for Human Papillomavirus Vaccine Literacy in Japan: A Randomized Clinical Trial.*

日本随机试验分配848名女性照护者接受聊天机器人或政府宣传单。调整后健康素养差异为0.30分（满分7分）；两周接种决策无显著差异（调整OR=0.74，95%CI 0.41–1.33，P=0.31）。两周主要分析仅覆盖约56.7%的分析基数，需关注失访与短随访的限制。

### 6. 焦虑日志：生成式反馈的短期干预证据

**npj Digital Medicine · 2026-08-07** · [DOI](https://doi.org/10.1038/s41746-026-03087-2)
*Randomized controlled trial of GenAI coach feedback efficacy, acceptability and mechanisms in anxiety worry logs*

三臂随机试验比较10天担忧日志中的GenAI个性化反馈、人工反馈与仅日志。摘要报告GenAI组较仅日志组改善焦虑与担忧，与人工组的改善和可接受性相近。摘要未给出样本量与效应量，不能据“相近”推断达到统计学非劣效或长期疗效。

### 7. 本地智能体：高准确率来自选择性处理

**Nature Medicine · 2026-09-15** · [DOI](https://doi.org/10.1038/s41591-026-04609-x) · [PMID 42744896](https://pubmed.ncbi.nlm.nih.gov/42744896/)
*On-premise medical AI agents for reliable clinical decision-making.*

Nature Medicine研究在两个MIMIC-IV来源基准上的整体准确率为90.04%和83.8%。当一致性阈值设为0.90时，仅保留49.4%的病例，其准确率达到98.9%。应同时报告覆盖率与准确率；这不是对全部患者达到98.9%，也不是前瞻性自主诊疗试验。

### 8. Virtual Biotech：药物研发中的多智能体证据整合

**Science · 2026-09-17** · [DOI](https://doi.org/10.1126/science.aeg6779) · [PMID 42752167](https://pubmed.ncbi.nlm.nih.gov/42752167/)
*The Virtual Biotech: A multi-agent AI framework for therapeutic discovery and development.*

Science介绍覆盖靶点发现、安全评估及临床开发的智能体组织，演示试验数据整合、肺癌治疗策略假设和失败试验分析。55,984项试验的数据分析发现靶点特异性与上市及不良事件的关联；这些关联不能解释成使用该智能体导致上市成功率提升。

### 9. 心理健康安全：需要多轮而非单轮评测

**Nature Medicine · 2026-08-07** · [DOI](https://doi.org/10.1038/s41591-026-04577-2) · [PMID 42567928](https://pubmed.ncbi.nlm.nih.gov/42567928/)
*A clinically validated framework for auditing AI chatbot behavior in mental health interactions.*

SIM-VAIL用30种模拟用户画像与9个聊天机器人开展810段对话，并评价13类临床风险。风险随交互累积，表面支持性回复也可能强化脆弱性。这是临床框架指导下的模拟审计，不是810名真实患者的临床试验。

### 10. 医学考试高分不等于开放式诊断能力

**npj Digital Medicine · 2026-08-24** · [DOI](https://doi.org/10.1038/s41746-026-03169-1)
*Generative versus discriminative diagnostic performance of large multimodal models in intracranial and spinal neuroradiology*

252个神经影像病例中，开放式首诊准确率为51.6%–62.7%，提供选项后升至75.4%–81.0%；具有临床重要性的错误占全部病例17.8%–26.9%。评估应保留开放式任务和错误严重程度，不能用选择题成绩替代自主诊断安全证据。

### 11. LLM评审：跨语言与文化一致性仍不足

**npj Digital Medicine · 2026-07-20** · [DOI](https://doi.org/10.1038/s41746-026-02992-w) · [PMID 42477479](https://pubmed.ncbi.nlm.nih.gov/42477479/)
*Human evaluators vs. LLM-as-a-Judge: toward scalable evaluation of GenAI in global health.*

研究比较5个LLM评审与6名临床医生。表现最佳的模型仅在11项评价标准中的4项达到与人工一致；组合评审仅再改善1项。从英语转到卢旺达语后，表现和成本效益下降。自动评审不能直接替代本地语言和临床专家。

### 12. AI文献检索：单次提问可能漏掉大量相关证据

**npj Digital Medicine · 2026-09-29** · [DOI](https://doi.org/10.1038/s41746-026-03277-y)
*Blind spots in AI-assisted healthcare evidence search: multiplatform evaluation of clinical retrieval gaps and risk-of-bias*

该研究在非公开金标准集上评价5个平台、15种提问。单种提问召回率中位数范围为7.2%–42.2%，合并所有提问后才达到45.8%–72.3%；12.0%的证据从未被任何平台找出。该结果针对其研究领域与测试条件，支持保留数据库检索、查询日志和漏检反查，不能直接套用于所有检索任务。

## 检索、去重与筛选方法

| 环节 | 本次实际执行 |
|---|---|
| PubMed全量检索 | 35刊以`[ta]`限定，按4个月度片段检索`[dp]`，不加主题条件；累计命中9,835条，全部下载XML |
| Crossref全量补充 | 按35刊ISSN与`from-pub-date / until-pub-date`检索，游标分页，下载10,219条；BMJ改用电子ISSN 1756-1833后补齐 |
| 双源合并 | DOI优先；无DOI时以规范化完全相同标题辅助合并；保留不同DOI的同题来信／回复，共10,588条独立记录 |
| 基线去重 | 按原报告的DOI与PMID排除43条已收录记录；本次未重新核验原报告全部内容 |
| 主题筛选 | 标题与摘要宽召回320条，另反查AI／机器学习等泛词池981条；另反查未命中主题词的相关题名；结合可用摘要进行单一AI审阅和归类 |
| 摘要补充 | 对Crossref候选的缺失PMID按DOI补查PubMed；再从Nature公开页面补充摘要或简介，核对页面自身DOI |
| 日期复核 | 优先显示在线日期；有明确早期在线日期者单列补录；只有期刊日期时按该日期纳入，并保留日期字段的来源差异 |

核心口径：直接涉及医学／生物医学LLM、自然语言生成、对话交互、视觉语言模型、临床与科研智能体，或直接评价／治理这些系统。边缘口径沿用“宁宽勿严”：保留蛋白质／基因组／细胞基础模型、生成式分子或影像、经典NLP、数字孪生及医学AI／科研治理背景。**边缘相关不是LLM疗效证据，部分跨领域方法仅用于背景跟踪。** 普通临床预测、与主题无关的判别式影像模型、非医学工程应用，以及GPT2酶名、Angpt1、单位mgPt等词形误召回不自动纳入。

检索日期条件沿用原报告的PubMed `[dp]`，再用Crossref补充在线记录。因此这是一份**发表窗口增量**，不是对所有历史论文“新增索引日期”的全量补查。数据库存在收录和元数据延迟，结果不代表绝对无遗漏。本次没有逐篇阅读全文、独立双人筛选、正式风险偏倚评估或GRADE分级；出版商简介也不等同于摘要。

### 核心分类分布

| 分类 | 新增记录 |
|---|---:|
| 一、临床决策支持与诊断／分诊 | 12 |
| 二、医学智能体与多智能体系统 | 27 |
| 三、多模态与视觉语言医学模型 | 23 |
| 四、临床文书、环境记录与病历抽取 | 21 |
| 五、患者沟通、教育与问答 | 15 |
| 六、精神心理健康与行为干预 | 24 |
| 七、基准测试与评价方法 | 19 |
| 八、安全、偏倚、公平性与幻觉 | 18 |
| 九、治理、监管、伦理与政策 | 10 |
| 十、预测与病历表示学习 | 2 |
| 十一、模型开发与技术方法 | 6 |
| 十二、科研辅助与循证医学 | 14 |
| 十三、医学教育与培训 | 5 |
| 十四、公共卫生与健康公平 | 2 |
| 核心合计 | 198 |

## 一、临床决策支持与诊断／分诊（12篇）

### 1. 报道AI第二诊疗意见的公共言论；新闻中的主张不构成性能验证
*RFK Jr: AI can give a second opinion better "than any doctor in the country".*

**The BMJ · 2026-10-02** · 类型未充分核实 · [DOI](https://doi.org/10.1136/bmj-2026-101029) · [PMID 42826995](https://pubmed.ncbi.nlm.nih.gov/42826995/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B282。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 2. 讨论自主AI与AI辅助医生两类医疗模式的优劣
*Will Autonomous AI Exceed AI-Aided Physicians as the Best Medical Care?*

**JAMA · 2026-09-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jama.2026.15380) · [PMID 42606838](https://pubmed.ncbi.nlm.nih.gov/42606838/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B266。

### 3. 多国随机对照试验评估LLM辅助对医生决策的影响
*Impact of LLM assistance on physician decision-making: a multi-country randomized controlled trial*

**npj Digital Medicine · 2026-09-09** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1038/s41746-026-03111-5)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S269。

### 4. 将患者价值偏好纳入代理决策支持的语言模型
*Language Models for Value-Informed Proxy Decision Support*

**NEJM AI · 2026-08-27** · 类型未充分核实 · [DOI](https://doi.org/10.1056/aics2500562)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S318。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 5. 比较大型推理模型与语言模型的鼻咽癌决策支持表现
*Clinical decision support in nasopharyngeal carcinoma: comparative evaluation of large reasoning and language models*

**npj Digital Medicine · 2026-08-21** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03167-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S257。

### 6. SHAKED急诊前瞻性评估提示临床使用率仍是关键障碍，尚不足以支持部署
*Prospective evaluation of a large language model clinical decision support system in the emergency department.*

**Nature Medicine · 2026-08-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04601-5) · [PMID 42618632](https://pubmed.ncbi.nlm.nih.gov/42618632/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S103。

### 7. 讨论哪些临床决策支持功能适合引入生成式AI
*How Generative AI Should Transform Clinical Decision Support.*

**JAMA · 2026-08-18** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jama.2026.13187) · [PMID 42490104](https://pubmed.ncbi.nlm.nih.gov/42490104/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S142。

### 8. GPT-5肿瘤委员会模拟中角色提示改变语言风格，但专科决策差异有限
*Role prompting modulates linguistic style but not clinical decision structure in GPT-5 tumour board simulation.*

**npj Digital Medicine · 2026-08-13** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03069-4) · [PMID 42595794](https://pubmed.ncbi.nlm.nih.gov/42595794/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S117。

### 9. LLM辅助三级医院转诊分诊自动化
*Large language model-assisted referral triage automation in a tertiary hospital*

**npj Digital Medicine · 2026-08-05** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03067-6)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S241。

### 10. 电子病历内嵌LLM辅助识别适合围术期内外科共同管理的患者
*An Electronic Health Record-Integrated, Large Language Model-Powered Tool to Triage Surgical Patients.*

**JAMA Network Open · 2026-08-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.29579) · [PMID 42623072](https://pubmed.ncbi.nlm.nih.gov/42623072/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S100。

### 11. 提示策略影响LLM对结构化体检结果的解释准确性
*Large language models for interpretation of health checkup results.*

**npj Digital Medicine · 2026-07-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02467-y) · [PMID 42486995](https://pubmed.ncbi.nlm.nih.gov/42486995/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S24。

### 12. 多模态分类与检索增强推理结合，辅助认知障碍诊断
*A multimodal evidence-driven framework for clinical decision support in cognitive impairment.*

**npj Digital Medicine · 2026-07-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03048-9) · [PMID 42477097](https://pubmed.ncbi.nlm.nih.gov/42477097/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S31。

## 二、医学智能体与多智能体系统（27篇）

### 1. 讨论智能体自主性中尚未解决的环节
*The missing links in agentic AI autonomy.*

**Nature Medicine · 2026-10-02** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41591-026-04658-2) · [PMID 42827130](https://pubmed.ncbi.nlm.nih.gov/42827130/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：S214。
本条依据出版商公开简介归纳，未获得完整摘要。

### 2. 讨论自主AI智能体支持心力衰竭患者的ADVOCATE计划
*ADVOCATing for Patients With Heart Failure.*

**JAMA · 2026-09-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jama.2026.12837) · [PMID 42658547](https://pubmed.ncbi.nlm.nih.gov/42658547/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S207。

### 3. Virtual Biotech多智能体整合多尺度证据辅助药物发现与开发决策
*The Virtual Biotech: A multi-agent AI framework for therapeutic discovery and development.*

**Science · 2026-09-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1126/science.aeg6779) · [PMID 42752167](https://pubmed.ncbi.nlm.nih.gov/42752167/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S172。

### 4. 探讨智能体驱动自主生物医学科学及其可重复性和双重用途挑战
*Toward autonomous science with agentic artificial intelligence.*

**Cell · 2026-09-17** · 综述 · [DOI](https://doi.org/10.1016/j.cell.2026.08.052) · [PMID 42753735](https://pubmed.ncbi.nlm.nih.gov/42753735/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S167。

### 5. scBaseCount利用AI智能体持续整理标准化单细胞数据库
*scBaseCount: An AI agent-curated, standardized, auto-updated single-cell data repository.*

**Cell · 2026-09-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.cell.2026.08.025) · [PMID 42753696](https://pubmed.ncbi.nlm.nih.gov/42753696/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S169。

### 6. Paper2Agent把论文方法转为可调用智能体，并演示生物医学协作分析
*Reimagining research papers as interactive and reliable AI agents.*

**Nature · 2026-09-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41586-026-11044-y) · [PMID 42749808](https://pubmed.ncbi.nlm.nih.gov/42749808/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S176。

### 7. 本地医疗智能体以一致性等信号识别低风险病例并将其余病例交由人工
*On-premise medical AI agents for reliable clinical decision-making.*

**Nature Medicine · 2026-09-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04609-x) · [PMID 42744896](https://pubmed.ncbi.nlm.nih.gov/42744896/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S182。

### 8. RDMA利用低成本本地智能体从病历挖掘罕见病并标注不确定性
*RDMA: cost effective agent-driven rare disease mining from electronic health records*

**npj Digital Medicine · 2026-09-10** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03070-x)
证据：有摘要；来源：Crossref；审阅编号：S272。

### 9. 总结中国AI智能体眼科门诊的早期真实世界实施经验
*Initial lessons from real-world implementation of an AI-agent eye clinic in China.*

**Nature Medicine · 2026-09-10** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41591-026-04631-z) · [PMID 42722887](https://pubmed.ncbi.nlm.nih.gov/42722887/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：B224。
本条依据出版商公开简介归纳，未获得完整摘要。

### 10. 母婴智能体联合母亲与婴儿纵向病历预测临床结局
*Prediction of maternal and infant outcomes from longitudinal electronic health records with a mother-child AI agent.*

**Nature Medicine · 2026-09-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04694-y) · [PMID 42742183](https://pubmed.ncbi.nlm.nih.gov/42742183/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S186。

### 11. AgentDS-BUS分离分割与特征分析，用无需微调的智能体判断乳腺超声恶性风险
*AgentDS-BUS: a fine-tuning-free agentic breast ultrasound malignancy classification framework with decoupled segmentation and feature analysis*

**npj Digital Medicine · 2026-08-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03144-w)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S262。

### 12. 讨论自主医疗智能体的收益与风险
*Autonomous agentic artificial intelligence systems in health care: friend or foe?*

**Lancet Digital Health · 2026-08-29** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101073) · [PMID 42665468](https://pubmed.ncbi.nlm.nih.gov/42665468/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S79。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 13. 医学研究中的智能体协作与数字资源差距
*Agentic AI Teammates in Medical Research — From Tools to Collaborators — and the Accelerating Digital Divide*

**NEJM AI · 2026-08-27** · 类型未充分核实 · [DOI](https://doi.org/10.1056/aip2600239)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S315。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 14. ASTRA提出人工监督下多智能体临床试验中心的设计框架
*Towards a multi-agent Clinical Trial Center framework to support modern clinical trials*

**npj Digital Medicine · 2026-08-24** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03158-4)
证据：有摘要；来源：Crossref；审阅编号：S258。

### 15. HealthFlow通过自我改进的多智能体框架自动分析电子病历
*HealthFlow: automating electronic health record analysis via a strategically self-evolving multi-agent framework.*

**npj Digital Medicine · 2026-08-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03097-0) · [PMID 42660985](https://pubmed.ncbi.nlm.nih.gov/42660985/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S84。

### 16. 多学科LLM智能体系统用于急危重症患者谵妄风险预测
*A large language model-driven multidisciplinary AI agent system predicts delirium in emergency critically ill patients.*

**Cell Reports Medicine · 2026-08-13** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.xcrm.2026.102986) · [PMID 42594876](https://pubmed.ncbi.nlm.nih.gov/42594876/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S119。
日期说明：在线 2026-08-13；期刊／数据库发表日期 2026-09-15。

### 17. 多模态医疗智能体范围综述显示多数仍处于原型和早期技术验证阶段
*Multimodal artificial intelligence agents in healthcare: a scoping review*

**npj Digital Medicine · 2026-08-08** · 范围综述 · [DOI](https://doi.org/10.1038/s41746-026-03060-z)
证据：有摘要；来源：Crossref；审阅编号：S246。

### 18. AgentEYE结合多模态眼科分析与可追溯文献依据，仍需前瞻性验证
*An autonomous multimodal AI agent for evidence-grounded ophthalmic diagnosis.*

**Cell Reports Medicine · 2026-08-05** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.xcrm.2026.102969) · [PMID 42556343](https://pubmed.ncbi.nlm.nih.gov/42556343/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S138。
日期说明：在线 2026-08-05；期刊／数据库发表日期 2026-08-18。

### 19. MedKGent以LLM智能体构建随时间演化的医学知识图谱
*MedKGent: a large language model agent framework for constructing temporally evolving medical knowledge graph*

**npj Digital Medicine · 2026-08-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03058-7)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S239。

### 20. XunZi整合生物医学知识和数据以提出疾病干预靶点
*XunZi, an AI biologist, reveals disease-modifying targets.*

**Nature Biomedical Engineering · 2026-08-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41551-026-01769-6) · [PMID 42552442](https://pubmed.ncbi.nlm.nih.gov/42552442/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B141。

### 21. 探讨智能体AI在医疗产品监管策略与市场准入中的作用
*Reimagining regulatory strategy development: agentic AI as an enabler of market access.*

**Lancet Digital Health · 2026-07-31** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101062) · [PMID 42538231](https://pubmed.ncbi.nlm.nih.gov/42538231/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S13。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。
日期说明：在线 2026-07-31；期刊／数据库发表日期 2026-08。

### 22. 多智能体多模态LLM框架用于急性缺血性卒中的影像依据治疗建议
*A Multi-Agent MLLM Framework for Imaging-Grounded Treatment Recommendation in Acute Ischemic Stroke*

**npj Digital Medicine · 2026-07-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03066-7)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S233。

### 23. Pathology-CoT将病理专家的阅片行为转为视觉推理智能体训练监督
*Pathology-CoT: learning visual chain-of-thought agents from expert whole-slide image diagnosis behaviour.*

**Nature Biomedical Engineering · 2026-07-24** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41551-026-01739-y) · [PMID 42498734](https://pubmed.ncbi.nlm.nih.gov/42498734/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S20。

### 24. PULSE以知识增强和检索支持房颤患者自我管理问答
*A knowledge-enhanced domain-aware large language model agent for atrial fibrillation management.*

**npj Digital Medicine · 2026-07-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03038-x) · [PMID 42477462](https://pubmed.ncbi.nlm.nih.gov/42477462/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S29。

### 25. 分层多智能体与临床指南检索结合，支持糖尿病肾病管理建议
*Generating guideline-concordant and safe recommendations for diabetic kidney disease management via a hierarchical retrieval-augmented large language model.*

**npj Digital Medicine · 2026-07-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03035-0) · [PMID 42477060](https://pubmed.ncbi.nlm.nih.gov/42477060/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S32。

### 26. 报道加速生物医学研究的AI共同科学家
*An AI co-scientist to accelerate biomedical research.*

**Nature Medicine · 2026-07-17** · 新闻／报道 · [DOI](https://doi.org/10.1038/d41591-026-00037-z) · [PMID 42469479](https://pubmed.ncbi.nlm.nih.gov/42469479/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：B40。
本条依据出版商公开简介归纳，未获得完整摘要。

### 27. RadFabric编排胸片分析模型和视觉语言模型，输出局部依据与诊断推理
*Interpretable agentic AI system with localized reasoning for radiology.*

**npj Digital Medicine · 2026-07-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02994-8) · [PMID 42457975](https://pubmed.ncbi.nlm.nih.gov/42457975/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S48。

## 三、多模态与视觉语言医学模型（23篇）

### 1. 多国验证与阅片研究评价检索增强的乳腺超声诊断
*Interpretable multimodal retrieval augmented diagnosis for breast ultrasound with multinational clinical validation and reader study*

**npj Digital Medicine · 2026-10-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03272-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S299。

### 2. CT视觉语言模型连接群体健康、疾病表型与纵向风险
*Generalizable CT vision-language modeling for population health and disease risk*

**npj Digital Medicine · 2026-09-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03257-2)
证据：有摘要；来源：Crossref；审阅编号：S295。

### 3. 规则感知视觉语言推理用于无强化弥漫性胶质瘤的分子预测
*Rule-aware reasoning visual language model for molecular prediction in adult-type diffuse glioma lacking contrast enhancement*

**npj Digital Medicine · 2026-09-23** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03269-y)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S288。

### 4. RADAR通过放射学语言监督构建腹部CT通用诊断模型
*An expert-level generalist AI for abdominal CT diagnosis.*

**Science · 2026-09-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1126/science.aec6129) · [PMID 42752131](https://pubmed.ncbi.nlm.nih.gov/42752131/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S173。

### 5. 以预训练视觉语言模型分析自然亲子互动中的自闭症筛查信息
*Automated screening of autism via a pretrained vision-language model in naturalistic caregiver-child interactions*

**Nature Communications · 2026-09-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-77721-8)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S226。

### 6. 大型推理模型通过显式诊断链解释心脏磁共振
*Explicit chain of diagnosis for CMR semantic interpretation via large reasoning model*

**npj Digital Medicine · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03175-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S266。

### 7. LungGPT结合呼吸疾病多模态诊断与可解释决策支持
*LungGPT: A unified multimodal system for interpretable diagnosis and clinical decision support of respiratory diseases.*

**Cell Reports Medicine · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.xcrm.2026.102926) · [PMID 42685701](https://pubmed.ncbi.nlm.nih.gov/42685701/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S204。
日期说明：在线 2026-09-03；期刊／数据库发表日期 2026-09-15。

### 8. 结合心电图与报告的对比预训练用于心血管疾病识别和预后预测
*Development and external validation of a contrastive learning foundation model for ECG-based prediction of cardiovascular diseases and outcomes.*

**Lancet Digital Health · 2026-09-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.landig.2026.101092) · [PMID 42680677](https://pubmed.ncbi.nlm.nih.gov/42680677/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S206。

### 9. ALPaCA将全切片病理图像与Llama结合进行问答
*ALPaCA: Adapting Llama for Pathology Context Analysis to enable slide-level question answering.*

**Nature Communications · 2026-08-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76372-z) · [PMID 42754557](https://pubmed.ncbi.nlm.nih.gov/42754557/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S61。

### 10. RayDINO通过胸片自监督表示支持多任务及文本生成
*Advancing human-centric AI for robust X-ray analysis through holistic self-supervised learning.*

**Nature Communications · 2026-08-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76076-4) · [PMID 42754575](https://pubmed.ncbi.nlm.nih.gov/42754575/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S59。

### 11. ConceptCLIP以概念增强图文预训练提升医学影像解释能力
*An explainable biomedical foundation model via large-scale concept-enhanced vision-language pretraining.*

**Nature Biomedical Engineering · 2026-08-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41551-026-01764-x) · [PMID 42608573](https://pubmed.ncbi.nlm.nih.gov/42608573/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S109。

### 12. UniMedDiff以临床报告和知识增强扩散模型生成医学影像
*UniMedDiff: a knowledge-enhanced diffusion model for medical image generation from clinical reports*

**npj Digital Medicine · 2026-08-13** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03135-x)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：B338。

### 13. AUGUST以条件依赖的顺序问答支持胃病理分层诊断
*Sequential question answering AI for hierarchical gastric pathology diagnosis*

**npj Digital Medicine · 2026-08-10** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03107-1)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：B331。

### 14. 用姿势和运动视频进行骨质疏松性椎体压缩骨折分诊
*A Multimodal large language model-based triage tool for osteoporotic vertebral compression fractures using posture and movement videos*

**npj Digital Medicine · 2026-08-08** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03110-6)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S245。

### 15. 结合自然语言合成与诊断标注的多病种OCT分析系统
*Pan-retinal pathology detection in oct scans integrating natural language synthesis with diagnostic annotation*

**npj Digital Medicine · 2026-08-08** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03061-y)
证据：有摘要；来源：Crossref；审阅编号：B328。

### 16. 胶囊内镜视频生成可解释报告，并提供关键帧依据
*An explainable generative AI system for video-to-report generation in capsule endoscopy*

**npj Digital Medicine · 2026-08-06** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03079-2)
证据：有摘要；来源：Crossref；审阅编号：S242。

### 17. 综述基础模型和LLM整合肿瘤影像、病历与分子数据的证据
*Leave No Data Behind: Exploring a new paradigm in oncology with foundation models and large language models.*

**Cell Reports Medicine · 2026-08-04** · 综述 · [DOI](https://doi.org/10.1016/j.xcrm.2026.102966) · [PMID 42551431](https://pubmed.ncbi.nlm.nih.gov/42551431/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S129。

### 18. PRISM2通过临床对话监督学习全切片病理表示
*End-to-end multimodal pathology foundation model with clinical dialogue.*

**Nature Medicine · 2026-07-31** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04521-4) · [PMID 42538427](https://pubmed.ncbi.nlm.nih.gov/42538427/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S11。
日期说明：在线 2026-07-31；期刊／数据库发表日期 2026-09。

### 19. QoQ-Med3面向临床分析的多模态推理基础模型
*QoQ-Med3: a multimodal reasoning foundation model for clinical analysis*

**npj Digital Medicine · 2026-07-25** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02945-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S232。

### 20. CLEAR把胸片映射到临床概念空间，使预测可被分解和审计
*CLEAR: an auditable foundation model for radiology grounded in clinical concepts.*

**Nature Biomedical Engineering · 2026-07-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41551-026-01741-4) · [PMID 42486902](https://pubmed.ncbi.nlm.nih.gov/42486902/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S25。

### 21. DentVLM整合七种牙科影像模态，支持诊断和人机协作
*A multimodal vision-language model for comprehensive dental diagnosis and enhanced clinical practice.*

**Nature Communications · 2026-07-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-75718-x) · [PMID 42637739](https://pubmed.ncbi.nlm.nih.gov/42637739/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S9。

### 22. 医学知识增强多模态模型用于胃镜诊断和报告生成
*Bootstrapping multimodal large language model with medical knowledge for automatic esophagogastroduodenoscopy diagnosis and reporting.*

**Nature Communications · 2026-07-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-75377-y) · [PMID 42469206](https://pubmed.ncbi.nlm.nih.gov/42469206/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S36。

### 23. 胸片图文基础模型提取可解释的多疾病风险表征
*Transparent chest radiograph foundation model enables explainable human disease profiling.*

**npj Digital Medicine · 2026-07-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02990-y) · [PMID 42463845](https://pubmed.ncbi.nlm.nih.gov/42463845/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S41。

## 四、临床文书、环境记录与病历抽取（21篇）

### 1. 以临床医生为中心评价较长住院期间的LLM出院小结
*Clinician-centered evaluation of large language model-generated discharge summaries for longer hospitalizations*

**npj Digital Medicine · 2026-10-02** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03320-y)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S298。

### 2. 本地LLM从芬兰纵向病历检索信息，但仍有临床重要错误和提问敏感性
*Automating clinical information retrieval from Finnish electronic health records using large language models*

**npj Digital Medicine · 2026-09-28** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03282-1)
证据：有摘要；来源：Crossref；审阅编号：S294。

### 3. 面向家长介绍儿科诊疗中的环境式AI记录工具
*What Parents Need to Know About AI as a New Kind of Listener.*

**JAMA Pediatrics · 2026-09-28** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamapediatrics.2026.4424) · [PMID 42804215](https://pubmed.ncbi.nlm.nih.gov/42804215/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B182。

### 4. 知识增强支持多语言医学概念标准化，但仍存在表面形式与候选位置偏倚
*Knowledge-enhanced LLMs for multilingual biomedical concept normalization: a multilingual benchmarking and behavioral analysis*

**npj Digital Medicine · 2026-09-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03224-x)
证据：有摘要；来源：Crossref；审阅编号：S278。

### 5. 讨论环境式AI记录对诊疗交谈的可审计性和认识局限
*Auditing what was said: the epistemic promise and limits of ambient AI in clinical practice*

**npj Digital Medicine · 2026-09-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03192-2)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：B366。

### 6. 从结构化与非结构化病历构建可计算的纵向患者历程
*Computable longitudinal patient journeys from structured and unstructured EHR data.*

**Nature Medicine · 2026-09-10** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04695-x) · [PMID 42742184](https://pubmed.ncbi.nlm.nih.gov/42742184/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S185。

### 7. 讨论AI翻译出院指导中的政策与实践衔接
*AI-Based Translation of Discharge Instructions - Aligning Policy with Practice.*

**New England Journal of Medicine · 2026-09-05** · 类型未充分核实 · [DOI](https://doi.org/10.1056/nejmp2603777) · [PMID 42708472](https://pubmed.ncbi.nlm.nih.gov/42708472/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B240。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。
日期说明：在线 2026-09-05；期刊／数据库发表日期 2026-09-10。

### 8. 比较LLM与人工共识从免疫治疗试验就诊笔记中识别不良事件的能力
*Large Language Models and Adverse Event Detection Within Immunotherapy Clinical Trials.*

**JAMA Network Open · 2026-09-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.31840) · [PMID 42690663](https://pubmed.ncbi.nlm.nih.gov/42690663/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S201。

### 9. 关于AI记录工具、临床工作时间与就诊量的作者回复
*AI-Powered Scribes and Clinician Time Expenditure and Visit Quantity-Reply.*

**JAMA · 2026-09-01** · 回复／评论 · [DOI](https://doi.org/10.1001/jama.2026.10781) · [PMID 42530899](https://pubmed.ncbi.nlm.nih.gov/42530899/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S212。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 10. 围绕AI记录工具、临床工作时间与就诊量的来信
*AI-Powered Scribes and Clinician Time Expenditure and Visit Quantity.*

**JAMA · 2026-09-01** · 类型未充分核实 · [DOI](https://doi.org/10.1001/jama.2026.10778) · [PMID 42530923](https://pubmed.ncbi.nlm.nih.gov/42530923/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S210。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 11. 围绕AI记录工具、临床工作时间与就诊量的另一篇来信
*AI-Powered Scribes and Clinician Time Expenditure and Visit Quantity.*

**JAMA · 2026-09-01** · 类型未充分核实 · [DOI](https://doi.org/10.1001/jama.2026.10775) · [PMID 42530917](https://pubmed.ncbi.nlm.nih.gov/42530917/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S211。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 12. 区分精神科AI记录中的转写、总结与推断，并讨论同意和监督
*AI scribe functions in psychiatric practice: clinical oversight, consent, and regulation.*

**Lancet Psychiatry · 2026-09** · 综述 · [DOI](https://doi.org/10.1016/s2215-0366(26)00201-4) · [PMID 42586083](https://pubmed.ncbi.nlm.nih.gov/42586083/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S209。

### 13. 分析医生修改AI代拟患者消息及其工作量影响
*Physician Edits to AI-Drafted Patient Messages and Their Impact on Clinical Workload*

**NEJM AI · 2026-08-27** · 类型未充分核实 · [DOI](https://doi.org/10.1056/aioa2501034)
证据：仅题录／无摘要；来源：Crossref；审阅编号：B409。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 14. 讨论LLM介导的数据库构建与人工病历审查的变化
*The beginning of the end for manual chart review: LLM-mediated database construction*

**npj Digital Medicine · 2026-08-27** · 综述 · [DOI](https://doi.org/10.1038/s41746-026-03179-z)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S261。

### 15. OncoRAG用本地中等规模模型与图检索抽取多语言肿瘤病历表型
*OncoRAG: graph-based retrieval enabling clinical phenotyping from oncology notes using local mid-size language models*

**npj Digital Medicine · 2026-08-26** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03170-8)
证据：有摘要；来源：Crossref；审阅编号：S260。

### 16. 环境记录工具也是叙事解释工具，需保留患者语境与社会背景
*Ambient scribes as narrative technologies.*

**The Lancet · 2026-08-18** · 综述 · [DOI](https://doi.org/10.1016/s0140-6736(26)01381-4) · [PMID 42612661](https://pubmed.ncbi.nlm.nih.gov/42612661/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S108。

### 17. 资源高效提示工程支持临床信函的数据抽取
*Developing a scalable pipeline for data extraction from clinical letters through resource-efficient prompt engineering*

**npj Digital Medicine · 2026-08-13** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03136-w)
证据：有摘要；来源：Crossref；审阅编号：S250。

### 18. 比较BERT与DeepSeek-R1从病历提取癫痫和发作类型表型，细粒度任务中推理模型更稳健
*Automated epilepsy and seizure type phenotyping with transformer-based language models*

**npj Digital Medicine · 2026-08-11** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03103-5)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S248。

### 19. 斯坦福医学ChatEHR系统的部署经验
*Lessons from deploying the ChatEHR system at Stanford Medicine.*

**Nature Medicine · 2026-08-10** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41591-026-04574-5) · [PMID 42575987](https://pubmed.ncbi.nlm.nih.gov/42575987/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：X8。
本条依据出版商公开简介归纳，未获得完整摘要。

### 20. LLM从IgA肾病叙述性病理报告提取具有预后意义的亚型信息
*Large language models decode narrative pathology reports to define clinically relevant subtypes in IgA nephropathy.*

**Nature Communications · 2026-08-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76326-5) · [PMID 42675083](https://pubmed.ncbi.nlm.nih.gov/42675083/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S74。

### 21. 讨论环境式AI临床记录对原始沟通的忠实性
*The art of fidelity: clinical documentation and ambient AI.*

**The Lancet · 2026-07-18** · 类型未充分核实 · [DOI](https://doi.org/10.1016/s0140-6736(26)01388-7) · [PMID 42462730](https://pubmed.ncbi.nlm.nih.gov/42462730/)
证据：仅题录／无摘要；来源：PubMed；审阅编号：B51。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

## 五、患者沟通、教育与问答（15篇）

### 1. 前列腺癌术前LLM沟通随机Ⅱ期试验评估患者焦虑与医生工作量
*Large language model–assisted preoperative communication reduces patient anxiety and physician workload in prostate cancer: a prospective randomized phase II trial*

**npj Digital Medicine · 2026-09-26** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1038/s41746-026-03309-7)
证据：有摘要；来源：Crossref；审阅编号：S293。

### 2. 范围综述AI介导医患与照护者沟通的应用及概念框架
*Artificial intelligence-mediated clinical communication between providers and patients or caregivers: scoping review and conceptual framework*

**npj Digital Medicine · 2026-09-25** · 范围综述 · [DOI](https://doi.org/10.1038/s41746-026-03279-w)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：B379。

### 3. 报道AI生成投诉信给医疗机构带来的变化
*AI patient complaints: GPs and hospitals get advice after wave of algorithm generated letters.*

**The BMJ · 2026-09-21** · 评论／来信 · [DOI](https://doi.org/10.1136/bmj-2026-100923) · [PMID 42767693](https://pubmed.ncbi.nlm.nih.gov/42767693/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B205。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 4. 讨论面向患者的生成式AI如何影响理解及其系统层面的评价
*Patient-facing generative artificial intelligence: interpretive influence and system-level evaluation.*

**Lancet Digital Health · 2026-09-19** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101072) · [PMID 42763270](https://pubmed.ncbi.nlm.nih.gov/42763270/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S164。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 5. 健康素养导向的AI应帮助用户理解信息、风险与后续行动
*Building health-literate artificial intelligence.*

**Nature Human Behaviour · 2026-09-15** · 综述 · [DOI](https://doi.org/10.1038/s41562-026-02595-1) · [PMID 42745006](https://pubmed.ncbi.nlm.nih.gov/42745006/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B214。

### 6. 混合方法系统综述LLM患者教育对患者观点与自报结局的影响
*Impact of LLM-supported patient education on patient perspectives and patient-reported outcomes: a mixed-methods systematic review*

**npj Digital Medicine · 2026-09-10** · 系统综述／荟萃分析 · [DOI](https://doi.org/10.1038/s41746-026-03228-7)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S271。

### 7. 评估语音识别与LLM对失语、儿童语言障碍和痴呆人群的适用性
*Assessing the use of automatic speech recognition and large language models for individuals with language impairments*

**Nature Communications · 2026-09-10** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76677-z)
证据：有摘要；来源：Crossref；审阅编号：S224。

### 8. 比较AI与医护回复在不同患者人口学群体中的语气差异
*Differences in tone of AI and care team responses to patient messages by patient demographics*

**npj Digital Medicine · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03185-1)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：B352。

### 9. 报道AI接待系统识别不同口音患者时的障碍
*GP AI receptionist failing to understand patients with accents, report warns.*

**The BMJ · 2026-09-01** · 类型未充分核实 · [DOI](https://doi.org/10.1136/bmj-2026-100720) · [PMID 42680477](https://pubmed.ncbi.nlm.nih.gov/42680477/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B259。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 10. 日本HPV疫苗聊天机器人随机试验改善健康素养，但未证明短期接种决策改变
*AI Chatbot Use for Human Papillomavirus Vaccine Literacy in Japan: A Randomized Clinical Trial.*

**JAMA Network Open · 2026-09-01** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.34696) · [PMID 42804696](https://pubmed.ncbi.nlm.nih.gov/42804696/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S151。

### 11. 家长对罕见病照护中LLM聊天机器人的观点
*Parental Perspectives on Using Large Language Model–Powered Chatbots in Rare Disease Care*

**NEJM AI · 2026-08-27** · 观点 · [DOI](https://doi.org/10.1056/aics2600199)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S317。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 12. 用LLM分析全国在线评论中的患者感知医生特征
*Mapping patient-perceived physician traits from nationwide online reviews with LLMs*

**npj Digital Medicine · 2026-08-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03117-z)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S255。

### 13. 双模态LLM患者教育随机试验评估情绪语义匹配及沟通效果
*A bimodal large language model reduces misalignment in patient education: A double-blinded randomized trial.*

**Med · 2026-08-17** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1016/j.medj.2026.101263) · [PMID 42607666](https://pubmed.ncbi.nlm.nih.gov/42607666/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S111。
日期说明：在线 2026-08-17；期刊／数据库发表日期 2026-09-11。

### 14. 讨论医生真实表达与AI代写之间的关系
*Matt Morgan: AI can never replace a doctor's authentic voice.*

**The BMJ · 2026-08-05** · 社论 · [DOI](https://doi.org/10.1136/bmj-2026-100394) · [PMID 42556865](https://pubmed.ncbi.nlm.nih.gov/42556865/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B140。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 15. 模拟AI问诊的沟通形式与患者压力、记忆及可信度相关；交互实际由人控制
*Perceptions of simulated artificial intelligence in medical consultations: associations with stress, memory, and perceived credibility.*

**npj Digital Medicine · 2026-07-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03022-5) · [PMID 42527429](https://pubmed.ncbi.nlm.nih.gov/42527429/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S17。

## 六、精神心理健康与行为干预（24篇）

### 1. 报道儿童使用AI获得情感支持及证据与防护不足的问题
*More Than 1 in 5 Children Report Using AI for Emotional Support-Is It Good News or Bad?*

**JAMA · 2026-10-02** · 新闻／报道 · [DOI](https://doi.org/10.1001/jama.2026.19502) · [PMID 42826013](https://pubmed.ncbi.nlm.nih.gov/42826013/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S216。

### 2. 讨论如何减少迎合式回复并支持健康的情绪调节
*Beyond the sycophantic vs. cold divide: towards flexible, emotionally intelligent agents to foster healthier human-AI interactions.*

**npj Digital Medicine · 2026-10-01** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03245-6) · [PMID 42823427](https://pubmed.ncbi.nlm.nih.gov/42823427/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S217。

### 3. 讨论AI陪伴可能加深社会不平等的机制
*How AI companions could deepen social inequality.*

**Nature Human Behaviour · 2026-09-21** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41562-026-02538-w) · [PMID 42768071](https://pubmed.ncbi.nlm.nih.gov/42768071/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：B203。
本条依据出版商公开简介归纳，未获得完整摘要。
日期说明：在线 2026-09-21；期刊／数据库发表日期 2026-09。

### 4. 随机试验评估人工与生成式AI联合的单次学业焦虑暴露干预
*Safety, efficacy and acceptability of human-GenAI single-session exposure-based intervention for academic anxiety: randomized controlled trials*

**npj Digital Medicine · 2026-09-12** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1038/s41746-026-03199-9)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S274。

### 5. 异质数据影响LLM对临床评定自杀意念的分类与泛化
*Exploring generalizability and explainability of LLMs in classifying clinically rated suicidal ideation using heterogeneous data*

**npj Digital Medicine · 2026-09-05** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03198-w)
证据：有摘要；来源：Crossref；审阅编号：S268。

### 6. AI伴侣更新引发的身份不连续感、依恋与哀伤体验
*Mourning the loss of AI companions.*

**Nature Human Behaviour · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41562-026-02569-3) · [PMID 42693267](https://pubmed.ncbi.nlm.nih.gov/42693267/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S200。

### 7. 关系建议中LLM的拟人感与共情感可能并不一致
*Perceived humanness and empathy are dissociated in relationship advice generated by a large language model*

**Nature Communications · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-77350-1)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S222。

### 8. 将LLM视为可验证的精神卫生临床工具，并配套培训和机构流程
*LLMs as Clinical Instruments-Toward Verifiable Reasoning.*

**JAMA Psychiatry · 2026-09-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamapsychiatry.2026.2211) · [PMID 42525421](https://pubmed.ncbi.nlm.nih.gov/42525421/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S213。

### 9. 讨论儿童借助AI寻求建议是否替代了向人求助
*Pediatric Use of Artificial Intelligence for Support and Advice-Developmental Practice or Help-Seeking Substitution?*

**JAMA Pediatrics · 2026-08-31** · 类型未充分核实 · [DOI](https://doi.org/10.1001/jamapediatrics.2026.4058) · [PMID 42671864](https://pubmed.ncbi.nlm.nih.gov/42671864/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B71。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 10. 呼吁加快儿童与青少年AI聊天机器人的安全性研究
*Do No Harm This Time-The Urgency of AI Chatbot Research.*

**JAMA Pediatrics · 2026-08-31** · 类型未充分核实 · [DOI](https://doi.org/10.1001/jamapediatrics.2026.3949) · [PMID 42671856](https://pubmed.ncbi.nlm.nih.gov/42671856/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S76。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 11. 青少年情感性生成式AI使用与心理困扰相关，横断面结果不能证明因果
*Affective Generative Artificial Intelligence Use and Youth Mental Health.*

**JAMA Pediatrics · 2026-08-31** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamapediatrics.2026.3904) · [PMID 42671861](https://pubmed.ncbi.nlm.nih.gov/42671861/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S75。

### 12. 讨论将情绪属性赋予大语言模型的概念问题
*Large language models do not have emotions.*

**Nature Human Behaviour · 2026-08-24** · 评论／来信 · [DOI](https://doi.org/10.1038/s41562-026-02558-6) · [PMID 42637912](https://pubmed.ncbi.nlm.nih.gov/42637912/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S91。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 13. 范围综述梳理聊天机器人的心理健康伤害，区分观察证据与假设风险
*A scoping review on the mental health harms of LLM-based chatbots.*

**npj Digital Medicine · 2026-08-20** · 范围综述 · [DOI](https://doi.org/10.1038/s41746-026-03054-x) · [PMID 42624944](https://pubmed.ncbi.nlm.nih.gov/42624944/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S97。

### 14. 讨论与AI交互可能强化妄想样信念的临床应对
*Does Interacting With Artificial Intelligence Cause Delusions?*

**JAMA Psychiatry · 2026-08-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamapsychiatry.2026.2500) · [PMID 42616533](https://pubmed.ncbi.nlm.nih.gov/42616533/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B102。

### 15. 随机试验比较生成式AI与人工焦虑担忧日志反馈
*Randomized controlled trial of GenAI coach feedback efficacy, acceptability and mechanisms in anxiety worry logs*

**npj Digital Medicine · 2026-08-07** · 随机研究（仍需区分模拟与临床场景） · [DOI](https://doi.org/10.1038/s41746-026-03087-2)
证据：有摘要；来源：Crossref；审阅编号：S243。

### 16. 对话AI可补充筛查、候诊、治疗间歇与随访中的支持缺口
*Conversational AI should fill the white space in mental health care, not replace humans.*

**npj Digital Medicine · 2026-08-05** · 综述 · [DOI](https://doi.org/10.1038/s41746-026-03088-1) · [PMID 42786199](https://pubmed.ncbi.nlm.nih.gov/42786199/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S53。

### 17. AI陪伴与幸福感的关联取决于线下支持、使用强度和自我披露
*Interaction with AI companions and psychological well-being.*

**Nature Human Behaviour · 2026-08-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41562-026-02516-2) · [PMID 42552393](https://pubmed.ncbi.nlm.nih.gov/42552393/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S139。

### 18. 调查公开生成式AI对话中心理健康讨论的出现情况
*Prevalence of Mental Health Discussions in Publicly Available Generative AI Conversations.*

**JAMA Network Open · 2026-08-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.30635) · [PMID 42635990](https://pubmed.ncbi.nlm.nih.gov/42635990/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S93。

### 19. 梳理青少年自杀风险与AI聊天机器人证据缺口和研究议程
*AI chatbots and youth suicide risk: current evidence, critical gaps, and a clinical research agenda*

**npj Digital Medicine · 2026-08-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03080-9)
证据：有摘要；来源：Crossref；审阅编号：S237。

### 20. 调查2024年美国成年人使用通用LLM寻求心理健康支持的情况
*Real-world use of large language models for mental health in 2024.*

**npj Digital Medicine · 2026-08-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02842-9) · [PMID 42601385](https://pubmed.ncbi.nlm.nih.gov/42601385/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S114。

### 21. 范围综述生成式心理健康聊天机器人的干预设计与用户体验
*Generative AI mental health chatbots: a scoping review of intervention design and user experience*

**npj Digital Medicine · 2026-07-23** · 范围综述 · [DOI](https://doi.org/10.1038/s41746-026-02972-0)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S231。

### 22. 评估开源LLM从精神病风险访谈中提取临床信息的能力
*Evaluating large language models for assessment of psychosis risk.*

**npj Digital Medicine · 2026-07-23** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02928-4) · [PMID 42493532](https://pubmed.ncbi.nlm.nih.gov/42493532/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S22。

### 23. 借助虚拟人的情感对话场景探索抑郁症状相关生理信号
*Biosignal-based screening of depressive symptoms during affective conversations with virtual humans.*

**npj Digital Medicine · 2026-07-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03017-2) · [PMID 42463950](https://pubmed.ncbi.nlm.nih.gov/42463950/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B47。

### 24. 讨论生成式AI支持循证心理治疗的潜力
*The Therabot will see you now.*

**Science · 2026-07-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1126/science.aeh4808) · [PMID 42462035](https://pubmed.ncbi.nlm.nih.gov/42462035/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S45。

## 七、基准测试与评价方法（19篇）

### 1. 评价LLM作为临床生成式AI评审者的适用性
*Large language models as judges for clinical generative AI evaluation*

**npj Digital Medicine · 2026-09-25** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03248-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S290。

### 2. 以患者历程评价消费级AI健康助手的持续支持、风险升级与临床效果
*Patient journey evaluation for consumer AI health assistants*

**npj Digital Medicine · 2026-09-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03251-8)
证据：有摘要；来源：Crossref；审阅编号：B373。

### 3. 讨论医学LLM所面临的证据质量挑战
*The evidence challenge facing large language models in medicine*

**npj Digital Medicine · 2026-09-17** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41746-026-03262-5)
证据：仅出版商简介；来源：Crossref；审阅编号：S281。
本条依据出版商公开简介归纳，未获得完整摘要。

### 4. LongevityBench与Longevity-LLMs面向衰老生物学的结构化组学任务
*An open benchmark and language models for AI in aging biology.*

**Cell · 2026-09-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.cell.2026.08.026) · [PMID 42753698](https://pubmed.ncbi.nlm.nih.gov/42753698/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S168。

### 5. 强调对话式医疗AI必须取得前瞻性证据
*Prospective evidence for conversational medical AI is hard, but non-negotiable.*

**Nature Medicine · 2026-09-14** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41591-026-04639-5) · [PMID 42736437](https://pubmed.ncbi.nlm.nih.gov/42736437/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：S187。
本条依据出版商公开简介归纳，未获得完整摘要。

### 6. 提出生成式AI验证共识框架并征集合作
*Consensus framework for the validation of generative AI: call for collaborators on the Validation Accords.*

**Nature Medicine · 2026-09-09** · 评论／来信 · [DOI](https://doi.org/10.1038/s41591-026-04647-5) · [PMID 42717036](https://pubmed.ncbi.nlm.nih.gov/42717036/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S193。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 7. 临床能力基准揭示视觉语言模型的推理能力缺口
*The illusion of clinical reasoning: a benchmark reveals the pervasive gap in vision-language models for clinical competency*

**npj Digital Medicine · 2026-09-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03191-3)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S265。

### 8. 讨论临床AI基准中人类参考标准的不确定性
*The benchmark illusion: on the curious underestimation of AI and the uncertainty of its creators' gold standards.*

**eClinicalMedicine · 2026-08-31** · 综述 · [DOI](https://doi.org/10.1016/j.eclinm.2026.104184) · [PMID 42729460](https://pubmed.ncbi.nlm.nih.gov/42729460/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S69。
日期说明：在线 2026-08-31；期刊／数据库发表日期 2026-09。

### 9. MedError以错误分类体系和LLM辅助标注改进临床概念抽取评估
*A machine-assisted framework for systematic error analysis in clinical concept extraction.*

**Nature Communications · 2026-08-26** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-77067-1) · [PMID 42786185](https://pubmed.ncbi.nlm.nih.gov/42786185/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S54。

### 10. 神经影像中选择题表现明显强于开放式诊断，不能据此支持自主诊断
*Generative versus discriminative diagnostic performance of large multimodal models in intracranial and spinal neuroradiology*

**npj Digital Medicine · 2026-08-24** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03169-1)
证据：有摘要；来源：Crossref；审阅编号：S259。

### 11. 主张以住院医师层级的任务检验临床智能体安全性
*Building safer clinical agents: the case for residency-level benchmarks in medical artificial intelligence.*

**Lancet Digital Health · 2026-08-20** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101057) · [PMID 42624705](https://pubmed.ncbi.nlm.nih.gov/42624705/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B93。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 12. 通过标准化问题评价RAG模型的儿科心脏病知识
*Evaluating retrieval-augmented large language models for pediatric cardiology knowledge using standardized questions*

**npj Digital Medicine · 2026-08-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03153-9)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S252。

### 13. 罕见病LLM诊断系统综述提示回顾性基准存在数据泄漏与偏倚风险
*Diagnostic accuracy of large language models for rare diseases: a systematic review and meta-analysis*

**npj Digital Medicine · 2026-08-12** · 系统综述／荟萃分析 · [DOI](https://doi.org/10.1038/s41746-026-03109-z)
证据：有摘要；来源：Crossref；审阅编号：S249。

### 14. 多中心脊柱影像报告诊断评测揭示低患病率疾病的精确率下降
*Multicenter evaluation of four large language models for automated spine imaging diagnosis.*

**npj Digital Medicine · 2026-08-08** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03133-z) · [PMID 42733104](https://pubmed.ncbi.nlm.nih.gov/42733104/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S68。

### 15. 评估语言模型进行医学文本验证的能力
*Toward expert-level medical text validation with language models*

**npj Digital Medicine · 2026-08-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03084-5)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S240。

### 16. 评估检索增强推理对放射学文本问答集体可靠性的影响
*Retrieval-augmented reasoning reshapes collective reliability in text-based radiology question answering*

**Patterns · 2026-08** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.patter.2026.101639)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S313。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 17. 讨论如何测试医学AI的高阶能力
*Toward a test of medical AI superintelligence.*

**Nature Medicine · 2026-07-27** · 类型未充分核实 · [DOI](https://doi.org/10.1038/s41591-026-04539-8) · [PMID 42509372](https://pubmed.ncbi.nlm.nih.gov/42509372/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：B271。
本条依据出版商公开简介归纳，未获得完整摘要。
日期说明：在线 2026-07-27；期刊／数据库发表日期 2026-09。

### 18. 比较视觉与视觉语言病理基础模型，模型规模并不稳定预测下游表现
*A benchmark study of vision and pathology foundation models for computational pathology.*

**Nature Communications · 2026-07-24** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76004-6) · [PMID 42642435](https://pubmed.ncbi.nlm.nih.gov/42642435/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S7。

### 19. 全球健康问答中LLM评审与临床专家的一致性有限，低资源语言表现更弱
*Human evaluators vs. LLM-as-a-Judge: toward scalable evaluation of GenAI in global health.*

**npj Digital Medicine · 2026-07-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02992-w) · [PMID 42477479](https://pubmed.ncbi.nlm.nih.gov/42477479/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S28。

## 八、安全、偏倚、公平性与幻觉（18篇）

### 1. 专家评价生成式手术视频的可信外观与临床合理性差距
*Quantifying the plausibility gap in generative AI for surgical video generation with expert assessment*

**npj Digital Medicine · 2026-09-26** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03276-z)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S292。

### 2. 患者使用的医疗聊天机器人的信息泄漏与双重用途安全问题
*When the Chatbot Leaks: Securing Patient-Facing Medical AI in the Age of Dual-Use Large Language Models*

**NEJM AI · 2026-09-24** · 类型未充分核实 · [DOI](https://doi.org/10.1056/aip2600583)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S316。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 3. 多中心模拟决策评估人类监督生成式AI输出的能力
*A multicenter assessment of human oversight of generative AI outputs in simulated clinical decision making*

**npj Digital Medicine · 2026-09-24** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03294-x)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S289。

### 4. 高风险医疗场景的聊天机器人需结合自杀风险监测、人工分诊和升级机制
*Preparing AI chatbots to respond to patient distress and suicidality in high-risk healthcare settings.*

**npj Digital Medicine · 2026-09-22** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03288-9) · [PMID 42773125](https://pubmed.ncbi.nlm.nih.gov/42773125/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S159。

### 5. 评估带污名化的临床信息对LLM急诊分诊优先级的影响
*Outcome-grounded effect of clinically stigmatizing information on large language model emergency triage prioritization*

**npj Digital Medicine · 2026-09-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03270-5)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S283。

### 6. 分阶段、目的盲法评价通用生成模型在乳腺超声中的来源识别风险
*Staged purpose-blinded evaluation of provenance risk from a general-purpose generator in breast ultrasound*

**npj Digital Medicine · 2026-09-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03209-w)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：X11。

### 7. 报道LLM生物安全与双重用途风险争议，不将新闻主张视为已证实事件
*Alarming report on AI and bioweapons divides scientists.*

**Science · 2026-09-17** · 新闻／报道 · [DOI](https://doi.org/10.1126/science.aem4440) · [PMID 42752123](https://pubmed.ncbi.nlm.nih.gov/42752123/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S174。

### 8. 梳理医学AI在分布变化、因果解释和部署中的常见可靠性失败
*Avoiding common failures in AI for health and medicine.*

**Cell · 2026-09-17** · 综述 · [DOI](https://doi.org/10.1016/j.cell.2026.07.025) · [PMID 42753694](https://pubmed.ncbi.nlm.nih.gov/42753694/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S170。

### 9. 报道Claude相关危险生物研究指控及生物安全问题
*AI bioweapons: Anthropic claims scientists used Claude AI tool for dangerous research.*

**The BMJ · 2026-09-16** · 类型未充分核实 · [DOI](https://doi.org/10.1136/bmj-2026-100871) · [PMID 42749307](https://pubmed.ncbi.nlm.nih.gov/42749307/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S178。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 10. 配对比较审计LLM急诊分诊中的性别差异
*Auditing sex/gender disparities in emergency triage with LLM-based paired comparisons*

**npj Digital Medicine · 2026-09-16** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03090-7)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S277。

### 11. 按开发与部署阶段梳理医疗LLM的安全和信息安全威胁
*Safety and security of large language models in healthcare.*

**Nature · 2026-08-19** · 综述 · [DOI](https://doi.org/10.1038/s41586-026-10687-1) · [PMID 42618758](https://pubmed.ncbi.nlm.nih.gov/42618758/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S102。
日期说明：在线 2026-08-19；期刊／数据库发表日期 2026-08。

### 12. MedGuard识别中文远程问诊中的临床风险
*MedGuard: an LLM-based gatekeeper for detecting clinical risks in Chinese telemedicine consultations*

**npj Digital Medicine · 2026-08-10** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03116-0)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S247。

### 13. 把语言公平纳入医疗LLM评估，防止低资源语言人群处于不利地位
*Promoting health equity through linguistic justice: mitigating embedded bias of large language models.*

**npj Digital Medicine · 2026-08-08** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03093-4) · [PMID 42570942](https://pubmed.ncbi.nlm.nih.gov/42570942/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S128。

### 14. SIM-VAIL审计心理健康对话风险，关注多轮交互中的累积升级
*A clinically validated framework for auditing AI chatbot behavior in mental health interactions.*

**Nature Medicine · 2026-08-07** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04577-2) · [PMID 42567928](https://pubmed.ncbi.nlm.nih.gov/42567928/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S130。

### 15. 以虚构疾病Bixonimania讨论医学AI的证据脆弱性
*Bixonimania and the epistemic fragility of artificial intelligence in medicine: lessons from a fabricated disease.*

**Lancet Digital Health · 2026-08-07** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101048) · [PMID 42567756](https://pubmed.ncbi.nlm.nih.gov/42567756/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B133。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 16. LLM辅助解释对临床医生与普通人的影响不同，并存在锚定风险
*Divergent impacts of explainable AI for dermatological diagnosis on clinicians versus lay people.*

**Nature Medicine · 2026-08-04** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41591-026-04553-w) · [PMID 42552380](https://pubmed.ncbi.nlm.nih.gov/42552380/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S140。
日期说明：在线 2026-08-04；期刊／数据库发表日期 2026-08。

### 17. 报道利用AI生成医务人员形象进行虚假宣传的问题
*Fake AI doctors: NHS trust condemns adverts featuring AI generated staff.*

**The BMJ · 2026-08-03** · 类型未充分核实 · [DOI](https://doi.org/10.1136/bmj-2026-100473) · [PMID 42547218](https://pubmed.ncbi.nlm.nih.gov/42547218/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B147。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 18. 评估医学影像疾病分类视觉语言模型的交叉群体公平性
*Intersectional fairness in vision-language models for medical image disease classification*

**npj Digital Medicine · 2026-08-03** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03030-5)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S238。

## 九、治理、监管、伦理与政策（10篇）

### 1. 呼吁主动缓解智能体AI风险
*Threats posed by Agentic AI require proactive mitigation.*

**The BMJ · 2026-10-02** · 社论 · [DOI](https://doi.org/10.1136/bmj-2026-101022) · [PMID 42827000](https://pubmed.ncbi.nlm.nih.gov/42827000/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S215。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 2. 讨论医生使用AI的实践规则
*Six rules for doctors using AI.*

**The BMJ · 2026-09-17** · 社论 · [DOI](https://doi.org/10.1136/bmj-2026-100883) · [PMID 42754293](https://pubmed.ncbi.nlm.nih.gov/42754293/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B208。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 3. 医学出版中作者使用AI的更新指导
*Updated Guidance for Author Use of AI in Medical Publication.*

**JAMA · 2026-09-15** · 评论／来信 · [DOI](https://doi.org/10.1001/jama.2026.16613) · [PMID 42574208](https://pubmed.ncbi.nlm.nih.gov/42574208/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B269。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 4. 关于未经监管聊天机器人参与儿科心理健康管理责任的回复
*Legal and Clinical Liability of Comanaging Pediatric Mental Health With Unregulated AI Chatbots-Reply.*

**JAMA Pediatrics · 2026-09-14** · 回复／评论 · [DOI](https://doi.org/10.1001/jamapediatrics.2026.3929) · [PMID 42734955](https://pubmed.ncbi.nlm.nih.gov/42734955/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S190。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 5. 讨论未经监管聊天机器人参与儿科心理健康管理的法律与临床责任
*Legal and Clinical Liability of Comanaging Pediatric Mental Health With Unregulated AI Chatbots.*

**JAMA Pediatrics · 2026-09-14** · 类型未充分核实 · [DOI](https://doi.org/10.1001/jamapediatrics.2026.3923) · [PMID 42734907](https://pubmed.ncbi.nlm.nih.gov/42734907/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S191。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 6. 关注环境式临床AI使用中患者未被充分告知的问题
*The consent gap in ambient clinical artificial intelligence: what patients are not being told.*

**Lancet Digital Health · 2026-08-29** · 类型未充分核实 · [DOI](https://doi.org/10.1016/j.landig.2026.101055) · [PMID 42665470](https://pubmed.ncbi.nlm.nih.gov/42665470/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：B75。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 7. 关于环境式AI记录工具知情同意缺口的回复
*The Consent Gap in Ambient AI Scribes — Reply*

**NEJM AI · 2026-08-27** · 回复／评论 · [DOI](https://doi.org/10.1056/ailtr2600683)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S320。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 8. 讨论环境式AI记录工具的知情同意缺口
*The Consent Gap in Ambient AI Scribes*

**NEJM AI · 2026-08-27** · 类型未充分核实 · [DOI](https://doi.org/10.1056/ailtr2600505)
证据：仅题录／无摘要；来源：Crossref；审阅编号：S319。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 9. 报道英国监管机构更新医生使用AI环境记录工具的建议
*AI scribes: UK regulator issues update on use of technology by doctors.*

**The BMJ · 2026-08-10** · 类型未充分核实 · [DOI](https://doi.org/10.1136/bmj-2026-100540) · [PMID 42575564](https://pubmed.ncbi.nlm.nih.gov/42575564/)
证据：仅题录／无摘要；来源：Crossref＋PubMed；审阅编号：S126。
仅确认题录主题；具体设计、结果与结论未依据摘要核实。

### 10. 有效人工监督需要认知能力、时间空间、决策权限与实际干预能力
*Meaningful oversight of medical AI beyond human in the loop.*

**npj Digital Medicine · 2026-07-23** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-02971-1) · [PMID 42493536](https://pubmed.ncbi.nlm.nih.gov/42493536/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S21。

## 十、预测与病历表示学习（2篇）

### 1. 动态提示从肿瘤病历预测结局，低发癌种仍需外部验证
*Leveraging dynamic prompting for outcome prediction of cancer patients using large language models and electronic health record notes*

**npj Digital Medicine · 2026-09-22** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03280-3)
证据：有摘要；来源：Crossref；审阅编号：S287。

### 2. 结合急性肾损伤预测与可解释风险归因的双LLM框架
*Large language model driven multicenter prediction and explainable risk attribution of acute kidney injury.*

**Nature Communications · 2026-07-27** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76029-x) · [PMID 42608399](https://pubmed.ncbi.nlm.nih.gov/42608399/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S10。

## 十一、模型开发与技术方法（6篇）

### 1. LEME开发具有推理与临床验证的眼科开源LLM
*LEME: open large language models for ophthalmology with advanced reasoning and clinical validation*

**npj Digital Medicine · 2026-09-25** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03104-4)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S291。

### 2. EviNurse面向循证护理开发与评价领域LLM
*A domain-specific large language model for evidence-based nursing: development and multi-method evaluation of EviNurse*

**npj Digital Medicine · 2026-09-09** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03229-6)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S270。

### 3. 综述知识注入、领域适配与智能体编排如何支持医学专用LLM
*Transforming large language models into medical specialists via knowledge injection.*

**Cell Reports Medicine · 2026-09-04** · 综述 · [DOI](https://doi.org/10.1016/j.xcrm.2026.103020) · [PMID 42697202](https://pubmed.ncbi.nlm.nih.gov/42697202/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S197。

### 4. 参数高效联邦适配支持多机构医学LLM隐私保护训练
*Toward federated large language models in medicine: a parameter-efficient framework for privacy-preserving, multi-institutional adaptation*

**npj Digital Medicine · 2026-08-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03064-9)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S251。

### 5. 医学RAG范围综述指出临床验证、跨语言适配与安全评估仍不足
*Retrieval-augmented generation in medicine: A scoping review of technical implementations, clinical applications, and ethical considerations.*

**Cell Reports Medicine · 2026-07-20** · 范围综述 · [DOI](https://doi.org/10.1016/j.xcrm.2026.102927) · [PMID 42476143](https://pubmed.ncbi.nlm.nih.gov/42476143/)
证据：有摘要；来源：PubMed；审阅编号：S33。

### 6. 用LLM合成临床笔记，增强单模态皮肤病数据的多模态训练
*Synthesized clinical notes enable training robust multimodal AI models from unimodal dermatology datasets.*

**npj Digital Medicine · 2026-07-17** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03040-3) · [PMID 42469346](https://pubmed.ncbi.nlm.nih.gov/42469346/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S35。

## 十二、科研辅助与循证医学（14篇）

### 1. 多平台评价AI证据检索中的文献遗漏与可见性偏倚
*Blind spots in AI-assisted healthcare evidence search: multiplatform evaluation of clinical retrieval gaps and risk-of-bias*

**npj Digital Medicine · 2026-09-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03277-y)
证据：有摘要；来源：Crossref；审阅编号：S297。

### 2. 以LLM预测分子编辑序列以优化可合成性
*Guiding large language models to predict edit sequences for molecular synthesizability optimization*

**Nature Machine Intelligence · 2026-09-23** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s42256-026-01304-x)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S309。

### 3. 提出面向实际医疗决策、可审查且可追溯的医学证据合成框架
*Toward reviewable medical evidence synthesis for care delivery*

**npj Digital Medicine · 2026-09-19** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03195-z)
证据：有摘要；来源：Crossref；审阅编号：S284。

### 4. 综述AI作为试验干预与试验基础设施的证据及研究缺口
*Artificial intelligence in clinical trials-state of the evidence, gaps, and next steps.*

**eClinicalMedicine · 2026-09-12** · 综述 · [DOI](https://doi.org/10.1016/j.eclinm.2026.104196) · [PMID 42763541](https://pubmed.ncbi.nlm.nih.gov/42763541/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S163。
日期说明：在线 2026-09-12；期刊／数据库发表日期 2026-10。

### 5. 利用LLM调查临床试验注册主要结局的变更
*Monitoring Changes in Clinical Trial Primary Outcomes Using Large Language Models.*

**JAMA Network Open · 2026-09-01** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1001/jamanetworkopen.2026.34214) · [PMID 42747855](https://pubmed.ncbi.nlm.nih.gov/42747855/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S179。

### 6. 关于可信AI辅助指南制定的作者回复
*Reply to ensuring trustworthy AI assisted guideline development for clinical practice.*

**npj Digital Medicine · 2026-08-27** · 回复／评论 · [DOI](https://doi.org/10.1038/s41746-026-03099-y) · [PMID 42661029](https://pubmed.ncbi.nlm.nih.gov/42661029/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S83。

### 7. 探讨AI辅助临床指南制定的可信性要求
*Ensuring trustworthy AI assisted guideline development for clinical practice.*

**npj Digital Medicine · 2026-08-27** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03098-z) · [PMID 42661056](https://pubmed.ncbi.nlm.nih.gov/42661056/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S82。

### 8. 通过改进报告标准减少人和AI误读生物医学研究
*When machines misread science: creating guardrails for human and AI interpretation of biomedical research.*

**npj Digital Medicine · 2026-08-24** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03160-w) · [PMID 42637916](https://pubmed.ncbi.nlm.nih.gov/42637916/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B84。

### 9. PubMind从生物医学文献提取遗传变异、功能与疾病关联
*PubMind: literature-based genetic variant extraction and functional annotation using large language models.*

**Nature Communications · 2026-08-20** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76834-4) · [PMID 42754603](https://pubmed.ncbi.nlm.nih.gov/42754603/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S58。

### 10. 报道生物医学论文中AI辅助写作迹象；不把检测比例等同于已证实使用率
*Staggering 90% of biomedical papers now show signs of AI help.*

**Nature · 2026-08-20** · 新闻／报道 · [DOI](https://doi.org/10.1038/d41586-026-02551-z) · [PMID 42625041](https://pubmed.ncbi.nlm.nih.gov/42625041/)
证据：仅出版商简介；来源：Crossref＋PubMed；审阅编号：B263。
本条依据出版商公开简介归纳，未获得完整摘要。
日期说明：在线 2026-08-20；期刊／数据库发表日期 2026-09。

### 11. InfoFlowEX为生物医学知识抽取提供统一框架和基准
*A unified framework and benchmark for generalizable biomedical knowledge extraction and applications with large language models.*

**Cell Reports Medicine · 2026-08-11** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1016/j.xcrm.2026.102975) · [PMID 42580345](https://pubmed.ncbi.nlm.nih.gov/42580345/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S125。
日期说明：在线 2026-08-11；期刊／数据库发表日期 2026-08-18。

### 12. 百万临床试验数据用于LLM基准测试与领域模型开发
*Benchmarking and developing large language models using one million clinical trials*

**npj Digital Medicine · 2026-07-31** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-02933-7)
证据：有摘要；来源：Crossref；审阅编号：S236。

### 13. 以嵌入表示对LLM提出的基因功能假设进行统计检验
*An embedding-based framework enables statistical testing of gene-set function hypotheses inferred by large language models.*

**Nature Communications · 2026-07-30** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-75972-z) · [PMID 42669697](https://pubmed.ncbi.nlm.nih.gov/42669697/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S2。

### 14. 自动检查试验注册质量及注册结局变更
*An automated approach to improve clinical trial registration and to identify outcome changes on ClinicalTrials.gov*

**npj Digital Medicine · 2026-07-29** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03045-y)
证据：有摘要；来源：Crossref；审阅编号：S234。

## 十三、医学教育与培训（5篇）

### 1. 多智能体协作支持医学考试题目的起草、批评与迭代
*Multi-Agent collaboration as a complementary architecture for AI-generated medical examination items.*

**npj Digital Medicine · 2026-09-14** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03187-z) · [PMID 42736348](https://pubmed.ncbi.nlm.nih.gov/42736348/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S188。

### 2. 使用德国执业考试评估多模态与文本模型，并与考生表现比较
*Evaluating foundation models on official German medical licensing examinations: Implications for high-stakes assessment and AI-assisted medical education.*

**npj Digital Medicine · 2026-08-31** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03082-7) · [PMID 42675170](https://pubmed.ncbi.nlm.nih.gov/42675170/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S73。

### 3. 用生成式AI制作交互教学界面，帮助医学生理解AI概念
*Developing interactive learning interfaces for teaching AI in health professions education using generative AI tools.*

**npj Digital Medicine · 2026-08-07** · 评论／来信 · [DOI](https://doi.org/10.1038/s41746-026-03124-0) · [PMID 42567889](https://pubmed.ncbi.nlm.nih.gov/42567889/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S131。

### 4. 生成式AI时代卫生专业教育需要强化批判判断、指导与可信评价
*Health professions education (HPE) in the age of generative AI*

**npj Digital Medicine · 2026-07-31** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03042-1)
证据：有摘要；来源：Crossref；审阅编号：S235。

### 5. 观察学生在执业考试准备中自然采用AI模拟OSCE平台的情况
*Naturalistic adoption and deliberate practice use of an AI-based OSCE platform during national licensure preparation.*

**npj Digital Medicine · 2026-07-15** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03024-3) · [PMID 42458025](https://pubmed.ncbi.nlm.nih.gov/42458025/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：B56。

## 十四、公共卫生与健康公平（2篇）

### 1. 结合文献计量与LLM分析传染病AI研究格局
*Global evolution of AI-related infectious disease research: a bibliometric and LLM-assisted analysis*

**npj Digital Medicine · 2026-09-21** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41746-026-03255-4)
证据：有摘要；来源：Crossref＋Publisher；审阅编号：S286。

### 2. 借助LLM分析全球卫生援助与疾病负担之间的资源错配
*Tracking funding disparities in global health aid with machine learning.*

**Nature Communications · 2026-08-18** · 研究／文章（见原文设计） · [DOI](https://doi.org/10.1038/s41467-026-76542-z) · [PMID 42613327](https://pubmed.ncbi.nlm.nih.gov/42613327/)
证据：有摘要；来源：Crossref＋PubMed；审阅编号：S107。

## 十五、边缘相关（321篇）

本章单列技术外围与背景文献。题名保持英文，避免把尚未获得摘要的题录改写为未经核实的研究结论。各条的来源及筛选理由见筛选台账，已获取摘要见JSON附件。

### 分子/蛋白质/基因组AI（66篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-09-30 | GenAI-Net: A generative AI framework for automated biomolecular network design. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aeh8819) · [PMID 42814845](https://pubmed.ncbi.nlm.nih.gov/42814845/) |
| 2026-09-30 | CytoVI: deep generative modeling of antibody-based single cell data. | Nature Methods | 有摘要 | [DOI](https://doi.org/10.1038/s41592-026-03224-5) · [PMID 42816645](https://pubmed.ncbi.nlm.nih.gov/42816645/) |
| 2026-09-30 | Function-preserving watermarking of AI-generated proteins. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10965-y) · [PMID 42816606](https://pubmed.ncbi.nlm.nih.gov/42816606/) |
| 2026-09-30 | Secret watermark labels proteins as 'made by AI'. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-03033-y) · [PMID 42816575](https://pubmed.ncbi.nlm.nih.gov/42816575/) |
| 2026-09-28 | Accelerated discovery of thermostable mRNA-lipid nanoparticle vaccines using data-efficient AI. | Nature Biotechnology | 有摘要 | [DOI](https://doi.org/10.1038/s41587-026-03331-w) · [PMID 42806112](https://pubmed.ncbi.nlm.nih.gov/42806112/) |
| 2026-09-28 | AI-guided optimization for thermostable mRNA vaccines. | Nature Biotechnology | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41587-026-03330-x) · [PMID 42806114](https://pubmed.ncbi.nlm.nih.gov/42806114/) |
| 2026-09-28 | Governance and Responsible Deployment of AI-Enabled Pediatric Care. | JAMA Pediatrics | 有摘要 | [DOI](https://doi.org/10.1001/jamapediatrics.2026.4089) · [PMID 42804184](https://pubmed.ncbi.nlm.nih.gov/42804184/) |
| 2026-09-25 | Anthropic's AI biolab finds 'CRISPR-like' DNA in viruses. What's next? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-03039-6) · [PMID 42791345](https://pubmed.ncbi.nlm.nih.gov/42791345/) |
| 2026-09-25 | Counting who was not tested: artificial intelligence extraction of genomic and treatment data from hospital records. | Lancet Oncology | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/s1470-2045(26)00449-3) · [PMID 42790441](https://pubmed.ncbi.nlm.nih.gov/42790441/) |
| 2026-09-24 | How Repeal of the NTAP Alternative Pathway will Impact U.S. Clinical AI Innovation | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aipc2600711) |
| 2026-09-22 | Generative AI designs functional thiolation domains for reprogramming non-ribosomal peptide synthetases. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77963-6) · [PMID 42773138](https://pubmed.ncbi.nlm.nih.gov/42773138/) |
| 2026-09-21 | Generating protein hydrogels with customizable stress relaxation behavior via deep learning-driven entanglement design | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77607-9) |
| 2026-09-17 | The generative rearchitecture of antibody engineering shifts empirical discovery into intentional design | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03266-1) |
| 2026-09-14 | GLM-Prior: a genomic language model for transferable sequence-derived priors in gene regulatory network inference. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77381-8) · [PMID 42791261](https://pubmed.ncbi.nlm.nih.gov/42791261/) |
| 2026-09-14 | Drug firms' secret data supercharge AI protein models. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02882-x) · [PMID 42736393](https://pubmed.ncbi.nlm.nih.gov/42736393/) |
| 2026-09-12 | Leveraging high-throughput proteomics and AI-based protein folding to accelerate VAV1 molecular glue discovery | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77657-z) |
| 2026-09-12 | Functional alignment of protein language models via reinforcement learning | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77557-2) |
| 2026-09-10 | AI-guided design of complete bacteriophage genomes. | Nature Biotechnology | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41587-026-03311-0) · [PMID 42722822](https://pubmed.ncbi.nlm.nih.gov/42722822/) |
| 2026-09-09 | A global framework for artificial intelligence education in medicine: international working group recommendations | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03197-x) |
| 2026-09-09 | Predicting genome-wide functional constraints with GPN-Star. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-11005-5) · [PMID 42717086](https://pubmed.ncbi.nlm.nih.gov/42717086/) |
| 2026-09-09 | Defining attributes of effective binders for AI-assisted CAR design. | Nature Biomedical Engineering | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41551-026-01792-7) · [PMID 42716965](https://pubmed.ncbi.nlm.nih.gov/42716965/) |
| 2026-09-08 | Put patients at the centre of medical AI governance. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02796-8) · [PMID 42711387](https://pubmed.ncbi.nlm.nih.gov/42711387/) |
| 2026-09-03 | NucleicBERT interprets RNA sequence space through self-supervised language modelling | Nature Machine Intelligence | 有摘要 | [DOI](https://doi.org/10.1038/s42256-026-01295-9) |
| 2026-09-03 | Sampling protein language models for functional protein design. | Cell Systems | 有摘要 | [DOI](https://doi.org/10.1016/j.cels.2026.101714) · [PMID 42743923](https://pubmed.ncbi.nlm.nih.gov/42743923/) |
| 2026-09-02 | Creating bottom-up RNA transfer vehicles from synthetic protein assemblies. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10952-3) · [PMID 42686908](https://pubmed.ncbi.nlm.nih.gov/42686908/) |
| 2026-09-02 | Unsupervised discovery of functional sequence patterns from protein language model with MotifAE. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77333-2) · [PMID 42823418](https://pubmed.ncbi.nlm.nih.gov/42823418/) |
| 2026-09-01 | Condition controllable generation of 3D molecules using textual prompts by multimodal equivariant diffusion model | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03161-9) |
| 2026-09-01 | Mutating every DNA letter of a genome shows surprising effects - and the limits of AI. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02609-y) · [PMID 42680862](https://pubmed.ncbi.nlm.nih.gov/42680862/) |
| 2026-09 | Towards predictive virtual embryos with genomics and AI. | Nature Methods | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41592-026-03055-4) · [PMID 41888299](https://pubmed.ncbi.nlm.nih.gov/41888299/) |
| 2026-09 | Limitations of genomic language models for realistic sequence generation | Patterns | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.patter.2026.101682) |
| 2026-08-28 | scProtoTransformer: Scalable reference mapping across molecules, cells, and donors. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aef0286) · [PMID 42664347](https://pubmed.ncbi.nlm.nih.gov/42664347/) |
| 2026-08-28 | Programmable protein degraders enable selective knockdown of pathogenic β-catenin subpopulations in vitro and in vivo. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aec8271) · [PMID 42664344](https://pubmed.ncbi.nlm.nih.gov/42664344/) |
| 2026-08-27 | De novo design of RNA pseudoknots with deep learning. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aeg6829) · [PMID 42658941](https://pubmed.ncbi.nlm.nih.gov/42658941/) |
| 2026-08-24 | Adaptive model-guided protein evolution with sparse data optimizes compact eukaryotic genome editors. | Nature Biotechnology | 有摘要 | [DOI](https://doi.org/10.1038/s41587-026-03272-4) · [PMID 42637959](https://pubmed.ncbi.nlm.nih.gov/42637959/) |
| 2026-08-20 | Trust, in vaccines and AI, is earned only with evidence | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100601) |
| 2026-08-20 | AI-enabled discovery and biochemical optimization of minibinders targeting cancer cell-surface proteins. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76760-5) · [PMID 42624861](https://pubmed.ncbi.nlm.nih.gov/42624861/) |
| 2026-08-20 | Power, governance, and accountability in humanitarian artificial intelligence. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101068) · [PMID 42624703](https://pubmed.ncbi.nlm.nih.gov/42624703/) |
| 2026-08-19 | Large language models enhance annotation of enzymes in metagenomes. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aee4389) · [PMID 42616879](https://pubmed.ncbi.nlm.nih.gov/42616879/) |
| 2026-08-14 | Alignment with experimental data improves protein generative modeling. | Nature Methods | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41592-026-03138-2) · [PMID 42601462](https://pubmed.ncbi.nlm.nih.gov/42601462/) |
| 2026-08-14 | Aligning protein-generative models to experimental fitness with ProteinDPO. | Nature Methods | 有摘要 | [DOI](https://doi.org/10.1038/s41592-026-03137-3) · [PMID 42601461](https://pubmed.ncbi.nlm.nih.gov/42601461/) |
| 2026-08-12 | Agentic profiles for effective AI governance. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10805-z) · [PMID 42587118](https://pubmed.ncbi.nlm.nih.gov/42587118/) |
| 2026-08-11 | AI-assisted design of synthetic gene editors. | Nature Biotechnology | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41587-026-03273-3) · [PMID 42581120](https://pubmed.ncbi.nlm.nih.gov/42581120/) |
| 2026-08-10 | Learning millisecond protein dynamics from what is missing in NMR spectra. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10989-4) · [PMID 42742167](https://pubmed.ncbi.nlm.nih.gov/42742167/) |
| 2026-08-06 | AI-designed viral genomes. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aej8512) · [PMID 42561080](https://pubmed.ncbi.nlm.nih.gov/42561080/) |
| 2026-08-06 | Generative design of bacteriophages with genome language models. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aec2657) · [PMID 42561074](https://pubmed.ncbi.nlm.nih.gov/42561074/) |
| 2026-08-06 | AI-designed antibodies with Germinal. | Nature Methods | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41592-026-03190-y) · [PMID 42562932](https://pubmed.ncbi.nlm.nih.gov/42562932/) |
| 2026-07-31 | A machine learning framework for predicting and modulating condition-dependent protein phase separation. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76248-2) · [PMID 42669678](https://pubmed.ncbi.nlm.nih.gov/42669678/) |
| 2026-07-30 | Daily briefing: 'Raygun' AI can shrink or supersize proteins. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02420-9) · [PMID 42538356](https://pubmed.ncbi.nlm.nih.gov/42538356/) |
| 2026-07-29 | Property guidance for protein sequence generative models with ProteinGuide. | Nature Biotechnology | 有摘要 | [DOI](https://doi.org/10.1038/s41587-026-03207-z) · [PMID 42527525](https://pubmed.ncbi.nlm.nih.gov/42527525/) |
| 2026-07-29 | Miniaturizing and modifying natural proteins with Raygun. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10842-8) · [PMID 42527603](https://pubmed.ncbi.nlm.nih.gov/42527603/) |
| 2026-07-29 | Mol-CADiff: text-conditional molecule generation via causality-aware autoregressive diffusion. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75702-5) · [PMID 42660893](https://pubmed.ncbi.nlm.nih.gov/42660893/) |
| 2026-07-29 | This AI Raygun can shrink and supersize proteins - opening the door to easy editing. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02335-5) · [PMID 42527652](https://pubmed.ncbi.nlm.nih.gov/42527652/) |
| 2026-07-28 | Operationalizing the EU AI Act in a comprehensive cancer center through an institutional governance framework. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03073-8) · [PMID 42823482](https://pubmed.ncbi.nlm.nih.gov/42823482/) |
| 2026-07-28 | AI proteomics: from protein identification to virtual cells. | Nature Methods | 有摘要 | [DOI](https://doi.org/10.1038/s41592-026-03085-y) · [PMID 42521824](https://pubmed.ncbi.nlm.nih.gov/42521824/) |
| 2026-07-22 | AI-redesigned starting points and outcomes enhance protein evolution. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10820-0) · [PMID 42486980](https://pubmed.ncbi.nlm.nih.gov/42486980/) |
| 2026-07-22 | AI identifies interactions in CRISPR complexes to improve specificity of DNA editing. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02042-1) · [PMID 42486884](https://pubmed.ncbi.nlm.nih.gov/42486884/) |
| 2026-07-21 | Expanding the scope of protein language modeling to protein-protein interactions with MSA Pairformer. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.06.029) · [PMID 42480528](https://pubmed.ncbi.nlm.nih.gov/42480528/) |
| 2026-07-20 | Incorporating AI-optimized zinc finger proteins enhances the efficiencies and targeting ranges of miniature base editors. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75912-x) · [PMID 42477347](https://pubmed.ncbi.nlm.nih.gov/42477347/) |
| 2026-07-20 | Viral protease-initiated lytic cell death as a universal antiviral mRNA therapy. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.06.031) · [PMID 42476130](https://pubmed.ncbi.nlm.nih.gov/42476130/) |
| 2026-07-18 | Machine unlearning as a governance imperative for clinical AI. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03050-1) · [PMID 42471427](https://pubmed.ncbi.nlm.nih.gov/42471427/) |
| 2026-07-17 | An enzyme-specific protein language model for catalytic property prediction. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75283-3) · [PMID 42469205](https://pubmed.ncbi.nlm.nih.gov/42469205/) |
| 2026-07-17 | Daily briefing: CRISPR gets an AI-designed upgrade. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02272-3) · [PMID 42477197](https://pubmed.ncbi.nlm.nih.gov/42477197/) |
| 2026-07-17 | Evaluating SARS-CoV-2 antibody resilience via prediction and design of escape viral variants. | Cell Systems | 有摘要 | [DOI](https://doi.org/10.1016/j.cels.2026.101673) · [PMID 42468530](https://pubmed.ncbi.nlm.nih.gov/42468530/) |
| 2026-07-16 | AlphaGEM enables precise genome-scale metabolic modelling by integrating protein structure alignment with deep-learning-based dark metabolism mining. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75549-w) · [PMID 42463708](https://pubmed.ncbi.nlm.nih.gov/42463708/) |
| 2026-07-16 | PeptiVerse: A unified platform for therapeutic peptide property prediction. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-74167-w) · [PMID 42463657](https://pubmed.ncbi.nlm.nih.gov/42463657/) |
| 2026-07-16 | CRISPR gets a power boost from AI-designed 'molecular scissors'. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02217-w) · [PMID 42469463](https://pubmed.ncbi.nlm.nih.gov/42469463/) |

### 医学AI治理/实施背景（127篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-10-01 | U.K. funder used 'AI triage' to reject grant proposals. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aem8458) · [PMID 42821678](https://pubmed.ncbi.nlm.nih.gov/42821678/) |
| 2026-10-01 | Influence of physician and consumer demographics on AI-use penalties in primary care: a vignette-based study. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03361-3) · [PMID 42823464](https://pubmed.ncbi.nlm.nih.gov/42823464/) |
| 2026-10-01 | Healthcare professionals’ perceptions on AI-assisted decision-making in clinical practice: a qualitative meta-synthesis | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03338-2) |
| 2026-10-01 | Evaluating generative models for structure-based drug discovery from de novo design to lead optimization | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-78105-8) |
| 2026-10-01 | Comparative analysis of mitochondrial proteomes across the tree of life. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.08.029) · [PMID 42822426](https://pubmed.ncbi.nlm.nih.gov/42822426/) |
| 2026-09-30 | AI in primary care: approach with healthy scepticism. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100947) · [PMID 42815974](https://pubmed.ncbi.nlm.nih.gov/42815974/) |
| 2026-09-30 | Vision wearables with artificial intelligence to close the sensory gap in patient characterization | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03156-6) |
| 2026-09-30 | AI 'speech clock' assesses how fast you're ageing from your voice. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-03106-y) · [PMID 42816579](https://pubmed.ncbi.nlm.nih.gov/42816579/) |
| 2026-09-30 | Licensure Framework for Autonomous Clinical Artificial Intelligence-In Reply. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.15637) · [PMID 42814428](https://pubmed.ncbi.nlm.nih.gov/42814428/) |
| 2026-09-30 | Licensure Framework for Autonomous Clinical Artificial Intelligence. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.15634) · [PMID 42814440](https://pubmed.ncbi.nlm.nih.gov/42814440/) |
| 2026-09-30 | Licensure Framework for Autonomous Clinical Artificial Intelligence. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.15631) · [PMID 42814437](https://pubmed.ncbi.nlm.nih.gov/42814437/) |
| 2026-09-30 | Licensure Framework for Autonomous Clinical Artificial Intelligence. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.15628) · [PMID 42814453](https://pubmed.ncbi.nlm.nih.gov/42814453/) |
| 2026-09-30 | Licensure Framework for Autonomous Clinical Artificial Intelligence. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.15625) · [PMID 42814414](https://pubmed.ncbi.nlm.nih.gov/42814414/) |
| 2026-09-29 | AI amplifies experts, not expertise. | Nature Human Behaviour | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41562-026-02604-3) · [PMID 42811053](https://pubmed.ncbi.nlm.nih.gov/42811053/) |
| 2026-09-29 | AI-powered medical devices must be tested in real-world settings. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-03046-7) · [PMID 42811149](https://pubmed.ncbi.nlm.nih.gov/42811149/) |
| 2026-09-28 | Women, Medicine, and AI. | JAMA Internal Medicine | 有摘要 | [DOI](https://doi.org/10.1001/jamainternmed.2026.4880) · [PMID 42804197](https://pubmed.ncbi.nlm.nih.gov/42804197/) |
| 2026-09-28 | Will Women Physicians Face an AI Gap? | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.15713) · [PMID 42804168](https://pubmed.ncbi.nlm.nih.gov/42804168/) |
| 2026-09-24 | From Technical Performance to Clinical Readiness: A Phase-Based Framework for Evidence Standards in Clinical Artificial Intelligence | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aip2600684) |
| 2026-09-24 | Win, Place, or Show? Why Specialist AI May Still Win the Deployment Race in Radiology | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/ailtr2600389) |
| 2026-09-24 | Causal reinforcement learning for personalized adaptive interventions in mild cognitive impairment | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03287-w) |
| 2026-09-24 | Enabling equitable global health AI with privacy‑enhancing technologies | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03284-z) |
| 2026-09-24 | Beyond the AI Alarm: How ARPA-H Is Rethinking Innovation in Health Care. | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.15949) · [PMID 42782726](https://pubmed.ncbi.nlm.nih.gov/42782726/) |
| 2026-09-23 | Medial temporal default mode network selectively encodes autobiographical visual imagery. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aee4232) · [PMID 42777057](https://pubmed.ncbi.nlm.nih.gov/42777057/) |
| 2026-09-23 | Practical lessons in the global scaling of clinical AI: from one hospital to over a million patients screened. | Nature Medicine | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41591-026-04643-9) · [PMID 42778767](https://pubmed.ncbi.nlm.nih.gov/42778767/) |
| 2026-09-22 | AI adoption and workflow optimization following orchestration platform implementation and structured change management | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03278-x) |
| 2026-09-22 | Why AI companies can't be trusted to self-regulate. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-03014-1) · [PMID 42773274](https://pubmed.ncbi.nlm.nih.gov/42773274/) |
| 2026-09-21 | Why responsible AI needs regional networks in low-resource health systems. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03208-x) · [PMID 42786250](https://pubmed.ncbi.nlm.nih.gov/42786250/) |
| 2026-09-18 | Failing to act on warning signs: from Letby to AI | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100905) |
| 2026-09-17 | How fast are you ageing? Ask AI. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02913-7) · [PMID 42754682](https://pubmed.ncbi.nlm.nih.gov/42754682/) |
| 2026-09-16 | Benchmarking AI-generated thin-slice CT under clinical reconstruction conditions: a multicohort study | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03253-6) |
| 2026-09-15 | On-demand design of controlled-release systems using an expert-mimic AI framework | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77619-5) |
| 2026-09-13 | Clinical usability of an explainable AI decision support tool and evaluation of multimodal models in NSCLC. | Nature Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41591-026-04488-2) · [PMID 42733093](https://pubmed.ncbi.nlm.nih.gov/42733093/) |
| 2026-09-12 | Artificial Intelligence and the Future of the Clinical Workforce. | New England Journal of Medicine | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/nejmp2607831) · [PMID 42734218](https://pubmed.ncbi.nlm.nih.gov/42734218/) |
| 2026-09-10 | From Aging to AI and Beyond: A Conversation With Eric Topol. | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.13053) · [PMID 42720967](https://pubmed.ncbi.nlm.nih.gov/42720967/) |
| 2026-09-09 | Breaking timescales with generative sampling of conformational transitions. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-11025-1) · [PMID 42717085](https://pubmed.ncbi.nlm.nih.gov/42717085/) |
| 2026-09-09 | Use AI as a sparring partner, not an oracle. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02846-1) · [PMID 42717032](https://pubmed.ncbi.nlm.nih.gov/42717032/) |
| 2026-09-09 | Regulating artificial intelligence in health care: a tech-enabled, people-centred future. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101113) · [PMID 42722597](https://pubmed.ncbi.nlm.nih.gov/42722597/) |
| 2026-09-08 | AI face drives patients to plastic surgery. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100775) · [PMID 42710910](https://pubmed.ncbi.nlm.nih.gov/42710910/) |
| 2026-09-07 | Causal evidence that language models use confidence to drive behaviour | Nature Machine Intelligence | 有摘要 | [DOI](https://doi.org/10.1038/s42256-026-01293-x) |
| 2026-09-07 | From algorithms to patient outcomes - lessons from one of the first randomized trials of AI in medicine. | Nature Medicine | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41591-026-04633-x) · [PMID 42706370](https://pubmed.ncbi.nlm.nih.gov/42706370/) |
| 2026-09-04 | Platforms for artificial intelligence-enabled infectious disease surveillance | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03189-x) |
| 2026-09-04 | Embedding AI in biology - part 2. | Nature Methods | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41592-026-03234-3) · [PMID 42697993](https://pubmed.ncbi.nlm.nih.gov/42697993/) |
| 2026-09-03 | A five-phase evaluation framework for diagnostic and predictive medical artificial intelligence. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03155-7) · [PMID 42697954](https://pubmed.ncbi.nlm.nih.gov/42697954/) |
| 2026-09-03 | Limited benchmarks constrain the conclusions of a general-purpose versus clinical AI comparison. | Nature Medicine | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41591-026-04638-6) · [PMID 42693299](https://pubmed.ncbi.nlm.nih.gov/42693299/) |
| 2026-09-03 | Reply to: Limited benchmarks constrain the conclusions of a general-purpose versus clinical AI comparison. | Nature Medicine | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41591-026-04637-7) · [PMID 42693298](https://pubmed.ncbi.nlm.nih.gov/42693298/) |
| 2026-09-03 | Artificial intelligence models for automated and semiautomated analysis and interpretation of clinical electroencephalography. | Lancet Digital Health | 有摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101023) · [PMID 42692953](https://pubmed.ncbi.nlm.nih.gov/42692953/) |
| 2026-09-03 | Artificial intelligence and machine learning in heart and lung transplantation. | eClinicalMedicine | 有摘要 | [DOI](https://doi.org/10.1016/j.eclinm.2026.104180) · [PMID 42733791](https://pubmed.ncbi.nlm.nih.gov/42733791/) |
| 2026-09-02 | Multi-objective optimization in the context of generative chemistry. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77324-3) · [PMID 42686780](https://pubmed.ncbi.nlm.nih.gov/42686780/) |
| 2026-09-01 | AI-enhanced adaptive virtual screening of large libraries for ligand discovery. | Nature Biotechnology | 有摘要 | [DOI](https://doi.org/10.1038/s41587-026-03217-x) · [PMID 42680826](https://pubmed.ncbi.nlm.nih.gov/42680826/) |
| 2026-09-01 | Bland new world: is AI making us all think the same? | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02682-3) · [PMID 42680892](https://pubmed.ncbi.nlm.nih.gov/42680892/) |
| 2026-09-01 | Artificial Intelligence-Generated Discharge Dates and Estimation Accuracy in Hospitalized Patients. | JAMA Network Open | 有摘要 | [DOI](https://doi.org/10.1001/jamanetworkopen.2026.32033) · [PMID 42690661](https://pubmed.ncbi.nlm.nih.gov/42690661/) |
| 2026-09-01 | Sorting Results of Unknown Significance-A Framework for Clinicians Navigating Wearable Data in the AI Era. | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.13895) · [PMID 42545692](https://pubmed.ncbi.nlm.nih.gov/42545692/) |
| 2026-09 | Frontier AI companies as biotech acquirers. | Nature Biotechnology | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41587-026-03214-0) · [PMID 42414651](https://pubmed.ncbi.nlm.nih.gov/42414651/) |
| 2026-09 | Programming biology: next-gen AI firms raise billions to design better medicines. | Nature Biotechnology | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41587-026-03170-9) · [PMID 42191989](https://pubmed.ncbi.nlm.nih.gov/42191989/) |
| 2026-09 | Questions AI cannot answer. | Lancet Psychiatry | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/s2215-0366(26)00242-7) · [PMID 42586075](https://pubmed.ncbi.nlm.nih.gov/42586075/) |
| 2026-09 | AI safety is a system property, not a sum of individual defenses | Patterns | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.patter.2026.101686) |
| 2026-08-31 | When an Algorithm Renews a Prescription. | JAMA Internal Medicine | 有摘要 | [DOI](https://doi.org/10.1001/jamainternmed.2026.3480) · [PMID 42671833](https://pubmed.ncbi.nlm.nih.gov/42671833/) |
| 2026-08-30 | AI models are being used to track zoonotic diseases. Will they prevent the next pandemic? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02684-1) · [PMID 42669763](https://pubmed.ncbi.nlm.nih.gov/42669763/) |
| 2026-08-29 | Navigating regulatory fragmentation in the convergence of synthetic biology, artificial intelligence, and automation. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77338-x) · [PMID 42668325](https://pubmed.ncbi.nlm.nih.gov/42668325/) |
| 2026-08-27 | A Classification of Safety Risks in Medical AI | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aip2600358) |
| 2026-08-27 | Building an AI-Ready Evidence Base for Behavior Change | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aip2600248) |
| 2026-08-27 | Probabilistic calibration of a closed-loop cardiac electromechanical model with application to cardiac resynchronization therapy | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03149-5) |
| 2026-08-27 | Automated transition state generation for mechanistic exploration in organic synthesis. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77230-8) · [PMID 42802179](https://pubmed.ncbi.nlm.nih.gov/42802179/) |
| 2026-08-26 | The epistemic debt of generative AI | Nature Machine Intelligence | 仅出版商简介 | [DOI](https://doi.org/10.1038/s42256-026-01294-w) |
| 2026-08-25 | Amend copyright licences to halt AI misuse and reassert human control. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02633-y) · [PMID 42642636](https://pubmed.ncbi.nlm.nih.gov/42642636/) |
| 2026-08-25 | Assessing students in the AI era. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02632-z) · [PMID 42642638](https://pubmed.ncbi.nlm.nih.gov/42642638/) |
| 2026-08-25 | AI-detection tools have made huge leaps forward - how good are they? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02569-3) · [PMID 42642641](https://pubmed.ncbi.nlm.nih.gov/42642641/) |
| 2026-08-25 | How to manage AI risks while reaping the benefits. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02567-5) · [PMID 42642642](https://pubmed.ncbi.nlm.nih.gov/42642642/) |
| 2026-08-24 | The shrinking landscape of linguistic diversity in the age of large language models. | Nature Human Behaviour | 有摘要 | [DOI](https://doi.org/10.1038/s41562-026-02550-0) · [PMID 42637911](https://pubmed.ncbi.nlm.nih.gov/42637911/) |
| 2026-08-24 | AI writing assistants shrink linguistic diversity and blur personal identity. | Nature Human Behaviour | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41562-026-02549-7) · [PMID 42637910](https://pubmed.ncbi.nlm.nih.gov/42637910/) |
| 2026-08-24 | Improving outdoor navigation for people with blindness using an AI-driven smartphone application and personalized audio guidance. | Nature Biomedical Engineering | 有摘要 | [DOI](https://doi.org/10.1038/s41551-026-01772-x) · [PMID 42637836](https://pubmed.ncbi.nlm.nih.gov/42637836/) |
| 2026-08-21 | HIPPIE: a generative model for electrophysiological analysis across species, technologies, and modalities. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76939-w) · [PMID 42764354](https://pubmed.ncbi.nlm.nih.gov/42764354/) |
| 2026-08-20 | We can, but should we? Red flags for hasty, low integrity AI integration into healthcare. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100589) · [PMID 42624524](https://pubmed.ncbi.nlm.nih.gov/42624524/) |
| 2026-08-20 | Powers of persuasion. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.ael6251) · [PMID 42623475](https://pubmed.ncbi.nlm.nih.gov/42623475/) |
| 2026-08-20 | Who checks what AI can do? | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.ael2161) · [PMID 42623461](https://pubmed.ncbi.nlm.nih.gov/42623461/) |
| 2026-08-20 | Modernizing evidence generation for clinical artificial intelligence: the case for adaptive platform trials | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03154-8) |
| 2026-08-20 | Need for ethical use of artificial intelligence in humanitarian data collection to address aid shortfalls. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101045) · [PMID 42624704](https://pubmed.ncbi.nlm.nih.gov/42624704/) |
| 2026-08-19 | Asymmetric prefrontal representations for leader-follower dynamics. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10900-1) · [PMID 42618793](https://pubmed.ncbi.nlm.nih.gov/42618793/) |
| 2026-08-18 | Outputs of generative diffusion models are often unattributable. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75667-5) · [PMID 42613337](https://pubmed.ncbi.nlm.nih.gov/42613337/) |
| 2026-08-17 | Regulating AI in healthcare: a moving target. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100555) · [PMID 42608082](https://pubmed.ncbi.nlm.nih.gov/42608082/) |
| 2026-08-15 | CliniSense AI for automated clinical skills assessment with real-time feedback | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03100-8) |
| 2026-08-15 | Accelerating AI in clinical care: policy priorities of the 2025 HHS request for information. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03094-3) · [PMID 42603822](https://pubmed.ncbi.nlm.nih.gov/42603822/) |
| 2026-08-14 | A critical look at AI in medicine. | Nature Biomedical Engineering | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41551-026-01778-5) · [PMID 42601405](https://pubmed.ncbi.nlm.nih.gov/42601405/) |
| 2026-08-14 | Briefing Chat: Anthropic rolls out new AI watermark - will it make a difference? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02562-w) · [PMID 42601497](https://pubmed.ncbi.nlm.nih.gov/42601497/) |
| 2026-08-13 | Beyond expertise: exploring behavioral personas in AI-assisted rare renal cancer diagnosis | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03134-y) |
| 2026-08-13 | Context-aware monitoring: rethinking comprehensive screening in the era of AI. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03106-2) · [PMID 42587001](https://pubmed.ncbi.nlm.nih.gov/42587001/) |
| 2026-08-13 | AI decision support is scaling-up fast - can the evidence keep up? | Nature Medicine | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41591-026-00040-4) · [PMID 42595904](https://pubmed.ncbi.nlm.nih.gov/42595904/) |
| 2026-08-13 | Predicting specificity of TCR-pMHC interactions using machine-learning and biophysical models. | Cell Systems | 有摘要 | [DOI](https://doi.org/10.1016/j.cels.2026.101700) · [PMID 42594866](https://pubmed.ncbi.nlm.nih.gov/42594866/) |
| 2026-08-13 | From Breakthrough to Follow-Through-A Public Health Agenda for AI. | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.16748) · [PMID 42593958](https://pubmed.ncbi.nlm.nih.gov/42593958/) |
| 2026-08-11 | Navigating fairness in artificial intelligence-based prediction models: theoretical constructs and practical applications. | Lancet Digital Health | 有摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101035) · [PMID 42580934](https://pubmed.ncbi.nlm.nih.gov/42580934/) |
| 2026-08-10 | AI used to design brand new viruses raises safety and security concerns. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100537) · [PMID 42575569](https://pubmed.ncbi.nlm.nih.gov/42575569/) |
| 2026-08-10 | I caught my students using AI to cheat in an exam - here's what universities must do to stamp this out. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02447-y) · [PMID 42576003](https://pubmed.ncbi.nlm.nih.gov/42576003/) |
| 2026-08-07 | Prehospital Injury Severity Estimate (PHISE) matches in-hospital trauma scores when embedded in AI models. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03074-7) · [PMID 42562846](https://pubmed.ncbi.nlm.nih.gov/42562846/) |
| 2026-08-06 | The next Turing tests: Reimagining conceptions and measures of AI. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aee3176) · [PMID 42561078](https://pubmed.ncbi.nlm.nih.gov/42561078/) |
| 2026-08-06 | Explainable AI: learning from the learners. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76359-w) · [PMID 42562819](https://pubmed.ncbi.nlm.nih.gov/42562819/) |
| 2026-08-04 | Privacy risks from medical AI tools are not shared equally. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02288-9) · [PMID 42552439](https://pubmed.ncbi.nlm.nih.gov/42552439/) |
| 2026-08-03 | Patient engagement, acceptability, and preference of artificial intelligence versus human coaching for diabetes prevention | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03063-w) |
| 2026-08-03 | Care Team Response to Patient Portal Message Content and Writing Style. | JAMA Network Open | 有摘要 | [DOI](https://doi.org/10.1001/jamanetworkopen.2026.30379) · [PMID 42635988](https://pubmed.ncbi.nlm.nih.gov/42635988/) |
| 2026-08-03 | Consumer Perspectives on Trust in and Benefits of Artificial Intelligence in Health Care. | JAMA Network Open | 有摘要 | [DOI](https://doi.org/10.1001/jamanetworkopen.2026.26916) · [PMID 42550507](https://pubmed.ncbi.nlm.nih.gov/42550507/) |
| 2026-08-03 | Public Acceptance of Artificial Intelligence in Health Care. | JAMA Network Open | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jamanetworkopen.2026.26843) · [PMID 42550512](https://pubmed.ncbi.nlm.nih.gov/42550512/) |
| 2026-08-03 | Artificial Intelligence in Correctional Health Care-Designing for Access, Inclusion, and Trust. | JAMA Internal Medicine | 有摘要 | [DOI](https://doi.org/10.1001/jamainternmed.2026.3471) · [PMID 42545681](https://pubmed.ncbi.nlm.nih.gov/42545681/) |
| 2026-08 | AI detection risks undermining academic integrity. | Nature Human Behaviour | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41562-026-02528-y) · [PMID 42443434](https://pubmed.ncbi.nlm.nih.gov/42443434/) |
| 2026-07-29 | An AI-enabled structural atlas decodes kinase specificity across the human proteome. | Nature Biotechnology | 有摘要 | [DOI](https://doi.org/10.1038/s41587-026-03239-5) · [PMID 42527527](https://pubmed.ncbi.nlm.nih.gov/42527527/) |
| 2026-07-28 | Low-burden AI approach for cross-national early identification of cognitive impairment using real-world questionnaire response behaviours. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76071-9) · [PMID 42660937](https://pubmed.ncbi.nlm.nih.gov/42660937/) |
| 2026-07-28 | Conversational AI: align commercial incentives with public interests. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02348-0) · [PMID 42521734](https://pubmed.ncbi.nlm.nih.gov/42521734/) |
| 2026-07-28 | Use AI, but don't mask it. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02347-1) · [PMID 42521735](https://pubmed.ncbi.nlm.nih.gov/42521735/) |
| 2026-07-28 | When physicians and AI work together, who is accountable? How to lay out medical liability. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02315-9) · [PMID 42521731](https://pubmed.ncbi.nlm.nih.gov/42521731/) |
| 2026-07-28 | Medical AI has a measurement problem. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02125-z) · [PMID 42521737](https://pubmed.ncbi.nlm.nih.gov/42521737/) |
| 2026-07-28 | Why machines don't speak biology: Toward native biological language models. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.07.003) · [PMID 42520803](https://pubmed.ncbi.nlm.nih.gov/42520803/) |
| 2026-07-27 | Autonomous bioisosteric replacement for multi-property optimization in drug design. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75512-9) · [PMID 42649168](https://pubmed.ncbi.nlm.nih.gov/42649168/) |
| 2026-07-27 | Artificial Intelligence and the Financialization of Medical Knowledge. | JAMA Internal Medicine | 有摘要 | [DOI](https://doi.org/10.1001/jamainternmed.2026.2961) · [PMID 42507464](https://pubmed.ncbi.nlm.nih.gov/42507464/) |
| 2026-07-24 | AI might help the NHS-but we need to build the evidence. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100390) · [PMID 42498311](https://pubmed.ncbi.nlm.nih.gov/42498311/) |
| 2026-07-24 | Global health suffers when corporate AI sovereigns reign. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101069) · [PMID 42498610](https://pubmed.ncbi.nlm.nih.gov/42498610/) |
| 2026-07-23 | AI is expanding online sexual abuse against women and girls. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100373) · [PMID 42492992](https://pubmed.ncbi.nlm.nih.gov/42492992/) |
| 2026-07-23 | How the Impact of Artificial Intelligence on Health Care Costs Will Be Shaped by Policy and Management Choices | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aip2600447) |
| 2026-07-23 | Will Artificial Intelligence Augment Global Health Inequalities? | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aics2600267) |
| 2026-07-22 | Artificial intelligence as a new commercial determinant of health. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100370) · [PMID 42486623](https://pubmed.ncbi.nlm.nih.gov/42486623/) |
| 2026-07-22 | Crew Resource Management - Navigating AI's Automation Paradox. | New England Journal of Medicine | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/nejmp2600938) · [PMID 42485645](https://pubmed.ncbi.nlm.nih.gov/42485645/) |
| 2026-07-22 | Can Laws Be Flexible? Rethinking Legislation for Innovation. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-02846-5) · [PMID 42487026](https://pubmed.ncbi.nlm.nih.gov/42487026/) |
| 2026-07-22 | How to use AI to make a graphical abstract in minutes. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02072-9) · [PMID 42486891](https://pubmed.ncbi.nlm.nih.gov/42486891/) |
| 2026-07-21 | Artificial intelligence as a new commercial determinant of health. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100272) · [PMID 42481074](https://pubmed.ncbi.nlm.nih.gov/42481074/) |
| 2026-07-17 | Artificial intelligence needs better health systems to reduce inequalities. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03041-2) · [PMID 42469355](https://pubmed.ncbi.nlm.nih.gov/42469355/) |
| 2026-07-17 | Flow matching for reaction pathway generation. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75654-w) · [PMID 42469237](https://pubmed.ncbi.nlm.nih.gov/42469237/) |
| 2026-07-16 | Social calibration of sycophantic AI-Response. | Science | 仅题录／无摘要 | [DOI](https://doi.org/10.1126/science.aeh8601) · [PMID 42462011](https://pubmed.ncbi.nlm.nih.gov/42462011/) |
| 2026-07-16 | Social calibration of sycophantic AI. | Science | 仅题录／无摘要 | [DOI](https://doi.org/10.1126/science.aeh5853) · [PMID 42462010](https://pubmed.ncbi.nlm.nih.gov/42462010/) |
| 2026-07-15 | A Bayesian framework for longitudinal EHR and genetic discovery. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10780-5) · [PMID 42457967](https://pubmed.ncbi.nlm.nih.gov/42457967/) |
| 2026-07-15 | AI avatars are reshaping society in China - the law is trying to catch up. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-01674-7) · [PMID 42458086](https://pubmed.ncbi.nlm.nih.gov/42458086/) |

### 医学基础模型/影像与信号AI（34篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-09-22 | Prospective multicenter evaluation of an autonomous robotic ultrasound system integrated with AI-assisted thyroid nodule assessment | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03260-7) |
| 2026-09-21 | Physician involvement and research quality in chest X-ray foundation models | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03205-0) |
| 2026-09-18 | Video-based assessment of surgical skills using frozen pretrained video foundation models | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03249-2) |
| 2026-09-18 | Class visualizations and activation atlases for computational pathology. | Cell Reports Medicine | 有摘要 | [DOI](https://doi.org/10.1016/j.xcrm.2026.103054) · [PMID 42759505](https://pubmed.ncbi.nlm.nih.gov/42759505/) |
| 2026-09-16 | Rapid patient-specific neural networks for X-ray to volume registration. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-11045-x) · [PMID 42749809](https://pubmed.ncbi.nlm.nih.gov/42749809/) |
| 2026-09-15 | Multi-institutional pan-cancer validation of pathology foundation models for whole-slide image retrieval using TCGA | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03122-2) |
| 2026-09-14 | BenchECG and xECG: a benchmark and baseline for ECG foundation models | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03196-y) |
| 2026-09-10 | Matt Morgan: After checkmate-if AI is better, what are doctors for? | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100753) · [PMID 42727949](https://pubmed.ncbi.nlm.nih.gov/42727949/) |
| 2026-09-10 | A clinically-oriented foundation model for intraoperative pathology. | Nature Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41591-026-04703-0) · [PMID 42742185](https://pubmed.ncbi.nlm.nih.gov/42742185/) |
| 2026-09-04 | A voice-biomarker foundation model for ALS monitoring and Parkinson’s screening | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03206-z) |
| 2026-09-04 | Benchmarking biomedical foundation models. | Nature Methods | 有摘要 | [DOI](https://doi.org/10.1038/s41592-026-03182-y) · [PMID 42697996](https://pubmed.ncbi.nlm.nih.gov/42697996/) |
| 2026-09-01 | A perspective on federated foundation models in biomedical sensing and imaging | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03164-6) |
| 2026-08-29 | Balancing privacy and performance: the impact of facial defacing on AI in medical imaging. | eBioMedicine | 有摘要 | [DOI](https://doi.org/10.1016/j.ebiom.2026.106457) · [PMID 42667924](https://pubmed.ncbi.nlm.nih.gov/42667924/) |
| 2026-08-28 | Performance and label efficiency of traditional deep-learning models and a retina-specific foundation model for ocular and systemic disease detection: a retrospective comparative study. | Lancet Digital Health | 有摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101031) · [PMID 42665469](https://pubmed.ncbi.nlm.nih.gov/42665469/) |
| 2026-08-26 | Deep learning aging marker from retinal images unveils sex-specific clinical and genetic signatures. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-77102-1) · [PMID 42786167](https://pubmed.ncbi.nlm.nih.gov/42786167/) |
| 2026-08-25 | nnMIL: a generalizable multiple instance learning framework for computational pathology. | Nature Biomedical Engineering | 有摘要 | [DOI](https://doi.org/10.1038/s41551-026-01767-8) · [PMID 42642650](https://pubmed.ncbi.nlm.nih.gov/42642650/) |
| 2026-08-25 | Toward unified and comprehensive automated electroencephalogram interpretation: a multicentre development and validation of an electroencephalogram foundation model. | Lancet Digital Health | 有摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101039) · [PMID 42642264](https://pubmed.ncbi.nlm.nih.gov/42642264/) |
| 2026-08-25 | The iPatient Meets the iDoctor. | JAMA | 有摘要 | [DOI](https://doi.org/10.1001/jama.2026.13582) · [PMID 42507375](https://pubmed.ncbi.nlm.nih.gov/42507375/) |
| 2026-08-19 | Full end-to-end diagnostic workflow automation of 3D OCT via foundation model-driven AI for retinal diseases | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03151-x) |
| 2026-08-19 | Conditional generative modeling of postoperative radiographs in adolescent idiopathic scoliosis | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03148-6) |
| 2026-08-18 | Fine-tuning an ECG foundation model to predict coronary CT angiography outcomes | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03085-4) |
| 2026-08-14 | An AI-Health infrastructure for the Nordic region: technical foundations, data assets, and a roadmap for deployment. | Nature Medicine | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41591-026-04575-4) · [PMID 42601486](https://pubmed.ncbi.nlm.nih.gov/42601486/) |
| 2026-08-12 | A foundation model for acute abdomen diagnosis stratification and triage on noncontrast computed tomography. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76634-w) · [PMID 42716938](https://pubmed.ncbi.nlm.nih.gov/42716938/) |
| 2026-08-11 | Foundation models in biomedical imaging: turning hype into reality. | Nature Biomedical Engineering | 有摘要 | [DOI](https://doi.org/10.1038/s41551-026-01762-z) · [PMID 42595819](https://pubmed.ncbi.nlm.nih.gov/42595819/) |
| 2026-08-11 | Segment any tumour: an uncertainty-aware vision foundation model for whole-body analysis. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76531-2) · [PMID 42711328](https://pubmed.ncbi.nlm.nih.gov/42711328/) |
| 2026-08-10 | Surgical scene understanding and the structural validation gap in an industry-led AI ecosystem. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03029-y) · [PMID 42575929](https://pubmed.ncbi.nlm.nih.gov/42575929/) |
| 2026-08-10 | Reply to: Surgical scene understanding and the emerging challenge of independent validation in an industry-led AI ecosystem. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03028-z) · [PMID 42575930](https://pubmed.ncbi.nlm.nih.gov/42575930/) |
| 2026-08-07 | Review of open foundation models and datasets for ECG and PPG waveforms | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03101-7) |
| 2026-08-03 | Predicting Alzheimer progression using EEG-based digital twins | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-02997-5) |
| 2026-08-03 | A foundation model for sleep-based risk stratification and clinical outcomes. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75326-9) · [PMID 42547512](https://pubmed.ncbi.nlm.nih.gov/42547512/) |
| 2026-08 | AI learns across species to address human clinical imaging data sparsity. | Nature Biomedical Engineering | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41551-025-01586-3) · [PMID 41588073](https://pubmed.ncbi.nlm.nih.gov/41588073/) |
| 2026-07-23 | Bridging the Gap — Translating AI in Pathology into Clinical Impact | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aip2600029) |
| 2026-07-23 | After Clearance — Continuous Monitoring as the Foundation of Clinical AI Oversight | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aie2600807) |
| 2026-07-15 | Doctored data sets could trick AI agents. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02071-w) · [PMID 42458092](https://pubmed.ncbi.nlm.nih.gov/42458092/) |

### 心理/认知与对话AI背景（10篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-10-01 | Can an AI feel pain? It can at least act like it does. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aem8459) · [PMID 42821679](https://pubmed.ncbi.nlm.nih.gov/42821679/) |
| 2026-09-01 | Generative deep learning reconstructs subcortical neural signals from cortical recordings for closed-loop brain stimulation | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03173-5) |
| 2026-08-28 | Large language models as uncertainty-calibrated optimizers for experimental discovery. | Nature Machine Intelligence | 有摘要 | [DOI](https://doi.org/10.1038/s42256-026-01283-z) · [PMID 42761044](https://pubmed.ncbi.nlm.nih.gov/42761044/) |
| 2026-08-24 | Can AI ever be conscious? The question stems from a misconception | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02571-9) |
| 2026-08-11 | Will AI make our dreams all look the same? | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02491-8) · [PMID 42581311](https://pubmed.ncbi.nlm.nih.gov/42581311/) |
| 2026-08-06 | AI enabled continuous care features enhance engagement and clinical outcomes in psychotherapy | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03081-8) |
| 2026-08-03 | Beyond representational alignment with brain-guided language models for robust reasoning | Nature Machine Intelligence | 有摘要 | [DOI](https://doi.org/10.1038/s42256-026-01278-w) |
| 2026-07-28 | Consciousness research is having an AI moment. Will the hype help the field? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02300-2) · [PMID 42521724](https://pubmed.ncbi.nlm.nih.gov/42521724/) |
| 2026-07-23 | AI for Proactive Mental Health: A Multi-Institutional, Longitudinal Randomized Controlled Trial | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aioa2501293) |
| 2026-07-23 | Concept2Brain: an AI model for predicting neurophysiological responses to text and pictures. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-75653-x) · [PMID 42637720](https://pubmed.ncbi.nlm.nih.gov/42637720/) |

### 数字孪生/模拟背景（5篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-09-26 | The application, development and challenge of digital twin in drug evaluation | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03295-w) |
| 2026-09-08 | Identifying potential nonpulmonary vein triggers in persistent atrial fibrillation using digital twins and deep learning | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03223-y) |
| 2026-09-02 | Digital twins are funhouse mirrors: Five systematic distortions. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aeh8260) · [PMID 42685195](https://pubmed.ncbi.nlm.nih.gov/42685195/) |
| 2026-09-01 | Integration of biological avatars and digital twins for "ex vivo clinical trials". | eBioMedicine | 有摘要 | [DOI](https://doi.org/10.1016/j.ebiom.2026.106467) · [PMID 42679602](https://pubmed.ncbi.nlm.nih.gov/42679602/) |
| 2026-07-23 | More on Digital Twin-Guided Ablation for Ventricular Tachycardia. Reply. | New England Journal of Medicine | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/nejmc2605923) · [PMID 42485642](https://pubmed.ncbi.nlm.nih.gov/42485642/) |

### 科研应用与方法背景（53篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-10-03 | OncoTagger: a reproducible abstract-level landscape of open-access AI-oncology articles in Web of Science | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03252-7) |
| 2026-10-01 | Keep AI-augmented science contestable. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aek7949) · [PMID 42821695](https://pubmed.ncbi.nlm.nih.gov/42821695/) |
| 2026-09-30 | A scoping review and staged research agenda for artificial intelligence in viscoelastic haemostatic assays | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03327-5) |
| 2026-09-30 | Elena, Aris, Marcus: AI-generated 'ghosts' are polluting the scientific literature. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02991-7) · [PMID 42816574](https://pubmed.ncbi.nlm.nih.gov/42816574/) |
| 2026-09-29 | DentalGEN: a large-scale controllable generative AI framework for automated dental crown restoration | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03236-7) |
| 2026-09-29 | Why AI-authorship debates miss a deeper shift in how scholarly knowledge is produced. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-03055-6) · [PMID 42811145](https://pubmed.ncbi.nlm.nih.gov/42811145/) |
| 2026-09-29 | AI can widen science - but only if institutions stop rewarding the already measurable. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02961-z) · [PMID 42811142](https://pubmed.ncbi.nlm.nih.gov/42811142/) |
| 2026-09-29 | The clinician-artificial intelligence scientist: a proposed career pathway in medicine. | Lancet Digital Health | 有摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101077) · [PMID 42810919](https://pubmed.ncbi.nlm.nih.gov/42810919/) |
| 2026-09-28 | The role of digital twin technology in transforming medical education: a scoping review | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03263-4) |
| 2026-09-25 | AI bots are flooding researchers with requests for money and time. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-03005-2) · [PMID 42791337](https://pubmed.ncbi.nlm.nih.gov/42791337/) |
| 2026-09-24 | Where Are the Prepared Minds? The Impact of AI on Scientific Thinking | NEJM AI | 仅题录／无摘要 | [DOI](https://doi.org/10.1056/aie2601110) |
| 2026-09-24 | AI system helps lab devices 'talk' with each other - streamlining research. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02990-8) · [PMID 42786214](https://pubmed.ncbi.nlm.nih.gov/42786214/) |
| 2026-09-23 | How to stay smart in the age of AI: the science of critical thinking. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02930-6) · [PMID 42778707](https://pubmed.ncbi.nlm.nih.gov/42778707/) |
| 2026-09-21 | AI co-scientists are revolutionizing how research is done. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02931-5) · [PMID 42768190](https://pubmed.ncbi.nlm.nih.gov/42768190/) |
| 2026-09-18 | Daily briefing: How to turn a paper into an AI agent. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02994-4) · [PMID 42768167](https://pubmed.ncbi.nlm.nih.gov/42768167/) |
| 2026-09-17 | Changing minds: How AI is transforming the life sciences. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.08.019) · [PMID 42753695](https://pubmed.ncbi.nlm.nih.gov/42753695/) |
| 2026-09-16 | AI tool turns any paper into an 'agent' that can collaborate and answer complex queries. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02899-2) · [PMID 42749771](https://pubmed.ncbi.nlm.nih.gov/42749771/) |
| 2026-09-16 | AI companies must work with the research community to protect attribution. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02886-7) · [PMID 42749921](https://pubmed.ncbi.nlm.nih.gov/42749921/) |
| 2026-09-16 | Turning scientific research papers into interactive AI agents. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02880-z) · [PMID 42749764](https://pubmed.ncbi.nlm.nih.gov/42749764/) |
| 2026-09-10 | AI medical tools used in "potentially life threatening" scenarios need tighter checks, says head of UK government review. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100803) · [PMID 42778228](https://pubmed.ncbi.nlm.nih.gov/42778228/) |
| 2026-09-04 | Designing reproducible large-language-model-assisted scientific analyses. | Patterns | 有摘要 | [DOI](https://doi.org/10.1016/j.patter.2026.101644) · [PMID 42746527](https://pubmed.ncbi.nlm.nih.gov/42746527/) |
| 2026-09-04 | FDA Authorizes First Autonomous Robotic Blood Draw Device. | JAMA | 仅题录／无摘要 | [DOI](https://doi.org/10.1001/jama.2026.12070) · [PMID 42696297](https://pubmed.ncbi.nlm.nih.gov/42696297/) |
| 2026-09-01 | When AI does science, who is accountable for mistakes? | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02735-7) · [PMID 42680894](https://pubmed.ncbi.nlm.nih.gov/42680894/) |
| 2026-09-01 | Who is responsible when AI helps to write science? | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02686-z) · [PMID 42680891](https://pubmed.ncbi.nlm.nih.gov/42680891/) |
| 2026-09 | Unifying AI-assisted scientific discovery around exploration, hypothesis generation, and testing | Patterns | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.patter.2026.101660) |
| 2026-09 | Epilepsy research in the AI era. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101115) · [PMID 42767701](https://pubmed.ncbi.nlm.nih.gov/42767701/) |
| 2026-08-31 | The future of AI-assisted science is both fast and slow. | Nature Human Behaviour | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41562-026-02574-6) · [PMID 42675136](https://pubmed.ncbi.nlm.nih.gov/42675136/) |
| 2026-08-31 | What's your lab's archetype? The answer could inform how you use AI. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02543-z) · [PMID 42675206](https://pubmed.ncbi.nlm.nih.gov/42675206/) |
| 2026-08-25 | The future of peer review requires AI support, not AI bans. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02631-0) · [PMID 42642639](https://pubmed.ncbi.nlm.nih.gov/42642639/) |
| 2026-08-24 | Quantifying the prevalence and impact of overreaching causal claims in social science. | Nature Human Behaviour | 有摘要 | [DOI](https://doi.org/10.1038/s41562-026-02553-x) · [PMID 42637914](https://pubmed.ncbi.nlm.nih.gov/42637914/) |
| 2026-08-20 | Investors' sneak peak: can this AI tool spot the science that will lead to patents? | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02549-7) · [PMID 42625037](https://pubmed.ncbi.nlm.nih.gov/42625037/) |
| 2026-08-17 | Developments in AI designed viruses demonstrate why such research must be done in the open. | The BMJ | 仅题录／无摘要 | [DOI](https://doi.org/10.1136/bmj-2026-100572) · [PMID 42608062](https://pubmed.ncbi.nlm.nih.gov/42608062/) |
| 2026-08-17 | Disruption of the research software landscape through AI software generation. | Nature Methods | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41592-026-03210-x) · [PMID 42608460](https://pubmed.ncbi.nlm.nih.gov/42608460/) |
| 2026-08-17 | Why AI systems are most useful as designers of new scientific tools | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02529-x) |
| 2026-08-15 | AI for science: decoding complexity for planetary health. | The Lancet | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/s0140-6736(26)01368-1) · [PMID 42594903](https://pubmed.ncbi.nlm.nih.gov/42594903/) |
| 2026-08-13 | Can Anthropic's invisible watermarks curb 'AI slop'? Researchers remain sceptical. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02503-7) · [PMID 42595889](https://pubmed.ncbi.nlm.nih.gov/42595889/) |
| 2026-08-13 | AI isn't ready to research itself. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02494-5) · [PMID 42595888](https://pubmed.ncbi.nlm.nih.gov/42595888/) |
| 2026-08-12 | Ethics oversight of health-related research should be contemporaneous in the age of artificial intelligence. | Lancet Digital Health | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.landig.2026.101085) · [PMID 42586929](https://pubmed.ncbi.nlm.nih.gov/42586929/) |
| 2026-08-11 | AI tools speed up analysis, but scientific truths must be grounded in reality. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02490-9) · [PMID 42581312](https://pubmed.ncbi.nlm.nih.gov/42581312/) |
| 2026-08-10 | Daily briefing: AI agents sniff out decades-old errors in scientific literature. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02500-w) · [PMID 42581215](https://pubmed.ncbi.nlm.nih.gov/42581215/) |
| 2026-08-10 | This AI tool claims to pick the top 1% of preprints. Should researchers trust it? | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02276-z) · [PMID 42576040](https://pubmed.ncbi.nlm.nih.gov/42576040/) |
| 2026-08-06 | AI agents are checking the scientific literature - and spotting decades-old errors. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02235-8) · [PMID 42562915](https://pubmed.ncbi.nlm.nih.gov/42562915/) |
| 2026-08-03 | Want to get more from AI? Treat every prompt like an experiment. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02083-6) · [PMID 42547618](https://pubmed.ncbi.nlm.nih.gov/42547618/) |
| 2026-08 | The unspoken tensions that AI brings to academic collaboration. | Nature Human Behaviour | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/s41562-026-02529-x) · [PMID 42443433](https://pubmed.ncbi.nlm.nih.gov/42443433/) |
| 2026-08 | Judicious use of LLMs could speed up progress in the social sciences. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-01875-0) · [PMID 42420617](https://pubmed.ncbi.nlm.nih.gov/42420617/) |
| 2026-08 | The cost of reproducibility in artificial intelligence | Patterns | 仅题录／无摘要 | [DOI](https://doi.org/10.1016/j.patter.2026.101640) |
| 2026-07-31 | Scientists using LLMs will 'do more, less well', modelling study predicts. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02397-5) · [PMID 42538359](https://pubmed.ncbi.nlm.nih.gov/42538359/) |
| 2026-07-22 | Three tips to avoid AI image mistakes in science. | Nature | 仅出版商简介 | [DOI](https://doi.org/10.1038/d41586-026-02233-w) · [PMID 42487039](https://pubmed.ncbi.nlm.nih.gov/42487039/) |
| 2026-07-22 | 'Good design takes mastery': scientific illustrators sketch out AI's future. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02230-z) · [PMID 42487040](https://pubmed.ncbi.nlm.nih.gov/42487040/) |
| 2026-07-21 | Don't let AI steal all the joy: what scientists won't give up to chatbots. | Nature | 仅题录／无摘要 | [DOI](https://doi.org/10.1038/d41586-026-02213-0) · [PMID 42481718](https://pubmed.ncbi.nlm.nih.gov/42481718/) |
| 2026-07-18 | Reinforcement learning for treatment decision-making in sepsis: a scoping review. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03034-1) · [PMID 42471397](https://pubmed.ncbi.nlm.nih.gov/42471397/) |
| 2026-07-16 | AI in scientific publishing: Slower, worse, and more expensive. | Science | 有摘要 | [DOI](https://doi.org/10.1126/science.aek5570) · [PMID 42462024](https://pubmed.ncbi.nlm.nih.gov/42462024/) |
| 2026-07-15 | A scoping review of explainable artificial intelligence for medical multimodal data. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-02953-3) · [PMID 42457856](https://pubmed.ncbi.nlm.nih.gov/42457856/) |

### 细胞与组学基础模型（21篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-09-24 | UpTCR: a unified progressive knowledge transfer foundation model for robust T-cell receptor-antigen binding recognition | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-78075-x) |
| 2026-09-23 | AI-based characterization of Alzheimer's disease phenotypes from population-scale single-cell data. | Nature Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41591-025-04128-1) · [PMID 42778763](https://pubmed.ncbi.nlm.nih.gov/42778763/) |
| 2026-09-17 | A world model of the virtual cell. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.08.042) · [PMID 42753692](https://pubmed.ncbi.nlm.nih.gov/42753692/) |
| 2026-09-09 | A systematic comparison of single-cell perturbation response prediction models. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aed3414) · [PMID 42715312](https://pubmed.ncbi.nlm.nih.gov/42715312/) |
| 2026-09-09 | An operational perturbation proteomics-based virtual cell model. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-11001-9) · [PMID 42717098](https://pubmed.ncbi.nlm.nih.gov/42717098/) |
| 2026-09-04 | Natural language processing-based model to predict radiation pneumonitis in patients with locally advanced non-small cell lung cancer undergoing chemoradiotherapy: a retrospective cohort study. | eClinicalMedicine | 有摘要 | [DOI](https://doi.org/10.1016/j.eclinm.2026.104137) · [PMID 42733925](https://pubmed.ncbi.nlm.nih.gov/42733925/) |
| 2026-09-01 | Ensuring multiomics data reproducibility for artificial intelligence with reference materials as a common calibrator. | Nature Biotechnology | 仅出版商简介 | [DOI](https://doi.org/10.1038/s41587-026-03267-1) · [PMID 42680824](https://pubmed.ncbi.nlm.nih.gov/42680824/) |
| 2026-08-26 | Virtual Cell Challenge 2026: Benchmarking zero-shot generalization across cellular contexts. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.08.004) · [PMID 42648290](https://pubmed.ncbi.nlm.nih.gov/42648290/) |
| 2026-08-21 | Geneformer-guided multiomics integration identifies Pbx1 as a network hub of hematopoietic stem cell aging. | Science Advances | 有摘要 | [DOI](https://doi.org/10.1126/sciadv.aeb1346) · [PMID 42627902](https://pubmed.ncbi.nlm.nih.gov/42627902/) |
| 2026-08-20 | CoxFormer enables spatial omics inference with multimodal generative modeling. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76404-8) · [PMID 42754563](https://pubmed.ncbi.nlm.nih.gov/42754563/) |
| 2026-08-19 | STADiffuser: high-fidelity simulation and full-view 3D modeling of spatial transcriptomics. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76829-1) · [PMID 42749702](https://pubmed.ncbi.nlm.nih.gov/42749702/) |
| 2026-08-17 | TabPFN-SHAP metabolic networks reveal chronic liver disease progression and identify a hepatocellular carcinoma screening panel | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03140-0) |
| 2026-08-17 | scE2TM improves single-cell embedding interpretability and reveals cellular perturbation signatures. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76825-5) · [PMID 42744811](https://pubmed.ncbi.nlm.nih.gov/42744811/) |
| 2026-08-17 | Decoding the sequence determinants of locus-specific DNA methylation across human tissues. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76744-5) · [PMID 42744826](https://pubmed.ncbi.nlm.nih.gov/42744826/) |
| 2026-08-17 | Fifteen challenges for generative AI applications to cell biology. | Cell | 有摘要 | [DOI](https://doi.org/10.1016/j.cell.2026.07.004) · [PMID 42607668](https://pubmed.ncbi.nlm.nih.gov/42607668/) |
| 2026-08-14 | From pixels to patterns: the AI revolution in stem cell-derived models. | Nature Methods | 有摘要 | [DOI](https://doi.org/10.1038/s41592-026-03202-x) · [PMID 42601460](https://pubmed.ncbi.nlm.nih.gov/42601460/) |
| 2026-08-13 | How to build an AI-driven digital organism. | Nature Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41591-026-04595-0) · [PMID 42595785](https://pubmed.ncbi.nlm.nih.gov/42595785/) |
| 2026-08-10 | Enhancing pan-cancer spatial transcriptomics at single-cell resolution with stPainter. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76552-x) · [PMID 42706255](https://pubmed.ncbi.nlm.nih.gov/42706255/) |
| 2026-08-05 | The Virtual Tissues foundation model resolves spatial proteomics across scales. | Nature | 有摘要 | [DOI](https://doi.org/10.1038/s41586-026-10884-y) · [PMID 42557331](https://pubmed.ncbi.nlm.nih.gov/42557331/) |
| 2026-07-31 | Unify learns cellular evolution with universal multimodal embeddings. | Nature Communications | 有摘要 | [DOI](https://doi.org/10.1038/s41467-026-76230-y) · [PMID 42669747](https://pubmed.ncbi.nlm.nih.gov/42669747/) |
| 2026-07-17 | Foundation model reveals the shared organization of transcription and topologically associating domains. | Cell Systems | 有摘要 | [DOI](https://doi.org/10.1016/j.cels.2026.101675) · [PMID 42468531](https://pubmed.ncbi.nlm.nih.gov/42468531/) |

### 经典NLP/文本抽取（5篇）

| 日期 | 英文题名 | 期刊 | 证据状态 | 链接 |
|---|---|---|---|---|
| 2026-09-23 | Diabetes self-management in the digital health era: a concept analysis using natural language processing | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03300-2) |
| 2026-09-17 | Conditional deep generative modeling of blood-based infrared spectra enables controlled in-silico phenotyping studies | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03226-9) |
| 2026-08-12 | Natural language processing application in electronic health records studies for psychosis: a systematic review | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03125-z) |
| 2026-08-03 | Cross-linguistic benchmarking of NLP metrics for psychosis research. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03053-y) · [PMID 42547525](https://pubmed.ncbi.nlm.nih.gov/42547525/) |
| 2026-07-16 | Enhancing out-of-hospital emergency care via lexical machine learning modeling of chief complaints. | npj Digital Medicine | 有摘要 | [DOI](https://doi.org/10.1038/s41746-026-03005-6) · [PMID 42463962](https://pubmed.ncbi.nlm.nih.gov/42463962/) |

## 附录一：旧文补录（不计入新增发表）

这些记录被本次日期查询命中、且原报告DOI／PMID清单未收录，但明确在线发表日期早于2026-07-15。不能称为本窗口新发表论文。

| 在线日期 | 期刊／数据库日期 | 分类 | 题名 | 链接 |
|---|---|---|---|---|
| 2026-07-10 | 2026-08-14 | core | A unified multi-task framework enables interpretable chest radiograph analysis. | [DOI](https://doi.org/10.1016/j.medj.2026.101223) · [PMID 42431195](https://pubmed.ncbi.nlm.nih.gov/42431195/) |
| 2026-07-09 | 2026-09 | peripheral | Multidisciplinary research priorities for artificial intelligence in mental health: a call to action. | [DOI](https://doi.org/10.1016/s2215-0366(26)00127-6) · [PMID 42425118](https://pubmed.ncbi.nlm.nih.gov/42425118/) |
| 2026-07-08 | 2026-08 | peripheral | Large language models can predict the results of social science experiments. | [DOI](https://doi.org/10.1038/s41586-026-10742-x) · [PMID 42420458](https://pubmed.ncbi.nlm.nih.gov/42420458/) |
| 2026-07-07 | 2026-08-14 | core | BioMaster: Multi-agent system for automated bioinformatics analysis workflow. | [DOI](https://doi.org/10.1016/j.patter.2026.101611) · [PMID 42630761](https://pubmed.ncbi.nlm.nih.gov/42630761/) |
| 2026-07-03 | 2026-08 | peripheral | Extending responsible artificial intelligence to palliative care: the irreversibility problem with algorithmic accountability. | [DOI](https://doi.org/10.1016/j.landig.2026.101052) · [PMID 42399144](https://pubmed.ncbi.nlm.nih.gov/42399144/) |
| 2026-07-01 | 2026-08-14 | peripheral | AI-driven therapeutic antisense oligonucleotide for processing-deficient progeroid laminopathies. | [DOI](https://doi.org/10.1016/j.medj.2026.101193) · [PMID 42385712](https://pubmed.ncbi.nlm.nih.gov/42385712/) |
| 2026-07-01 | 2026-07-01 | core | Second-Level Appeals of Denied Anticancer Medication Claims in Medicare Part D. | [DOI](https://doi.org/10.1001/jamanetworkopen.2026.24772) · [PMID 42490111](https://pubmed.ncbi.nlm.nih.gov/42490111/) |
| 2026-06-26 | 2026-08-14 | peripheral | Brain-AI convergence: Generative world models and hierarchical attention for human intelligence. | [DOI](https://doi.org/10.1016/j.patter.2026.101593) · [PMID 42630565](https://pubmed.ncbi.nlm.nih.gov/42630565/) |
| 2026-06-24 | 2026-08 | peripheral | Disparate privacy risks from medical AI. | [DOI](https://doi.org/10.1038/s41586-026-10688-0) · [PMID 42343130](https://pubmed.ncbi.nlm.nih.gov/42343130/) |
| 2026-05-04 | 2026-08-14 | core | Multimodal integrated knowledge transfer to large language models through preference optimization with biomedical applications. | [DOI](https://doi.org/10.1016/j.patter.2026.101544) · [PMID 42630531](https://pubmed.ncbi.nlm.nih.gov/42630531/) |
| 2026-03-20 | 2026-09 | peripheral | Open and sustainable AI: challenges, opportunities and the road ahead in the life sciences. | [DOI](https://doi.org/10.1038/s41592-026-03037-6) · [PMID 41862658](https://pubmed.ncbi.nlm.nih.gov/41862658/) |
| 2025-11-06 | 2026-08 | core | A vision-language pretrained transformer for versatile clinical respiratory disease applications. | [DOI](https://doi.org/10.1038/s41551-025-01544-z) · [PMID 41198875](https://pubmed.ncbi.nlm.nih.gov/41198875/) |

## 附录二：更正记录（不计入新的独立研究）

| 日期 | 题名 | 期刊 | 链接 |
|---|---|---|---|
| 2026-09-21 | Author Correction: Integrating artificial intelligence tools in health research. | npj Digital Medicine | [DOI](https://doi.org/10.1038/s41746-026-03286-x) · [PMID 42768103](https://pubmed.ncbi.nlm.nih.gov/42768103/) |
| 2026-09-14 | Publisher Correction: A scoping review on the mental health harms of LLM-based chatbots. | npj Digital Medicine | [DOI](https://doi.org/10.1038/s41746-026-03240-x) · [PMID 42736346](https://pubmed.ncbi.nlm.nih.gov/42736346/) |
| 2026-09-03 | Author Correction: On the conversational persuasiveness of GPT-4. | Nature Human Behaviour | [DOI](https://doi.org/10.1038/s41562-026-02588-0) · [PMID 42693269](https://pubmed.ncbi.nlm.nih.gov/42693269/) |
| 2026-09 | Author Correction: The STARD-AI reporting guideline for diagnostic accuracy studies using artificial intelligence. | Nature Medicine | [DOI](https://doi.org/10.1038/s41591-026-04570-9) · [PMID 42443516](https://pubmed.ncbi.nlm.nih.gov/42443516/) |
| 2026-08-24 | Author Correction: WiseMind: a knowledge-guided multi-agent framework for accurate and empathetic psychiatric diagnosis. | npj Digital Medicine | [DOI](https://doi.org/10.1038/s41746-026-03162-8) · [PMID 42637919](https://pubmed.ncbi.nlm.nih.gov/42637919/) |
| 2026-08-08 | Author Correction: Clinically-guided models or foundation models? predicting cervical spondylotic myelopathy from electronic health records. | npj Digital Medicine | [DOI](https://doi.org/10.1038/s41746-026-03043-0) · [PMID 42570947](https://pubmed.ncbi.nlm.nih.gov/42570947/) |

## 附录三：35刊覆盖核对

下表的新增核心／边缘数排除旧文补录与更正。零条表示本次未纳入该刊的主题记录，不表示期刊没有发表文章。

| 期刊 | PubMed缩写 | 查询ISSN | 新增核心 | 新增边缘 |
|---|---|---|---:|---:|
| Cell | Cell | 0092-8674 | 4 | 8 |
| Nature | Nature | 0028-0836 | 3 | 76 |
| Science | Science | 0036-8075 | 4 | 12 |
| Nature Medicine | Nat Med | 1078-8956 | 14 | 10 |
| Nature Biomedical Engineering | Nat Biomed Eng | 2157-846X | 4 | 6 |
| Nature Machine Intelligence | Nat Mach Intell | 2522-5839 | 1 | 5 |
| Nature Communications | Nat Commun | 2041-1723 | 14 | 36 |
| npj Digital Medicine | NPJ Digit Med | 2398-6352 | 90 | 55 |
| Nature Human Behaviour | Nat Hum Behav | 2397-3374 | 5 | 7 |
| Nature Biotechnology | Nat Biotechnol | 1087-0156 | 0 | 11 |
| Nature Methods | Nat Methods | 1548-7091 | 0 | 10 |
| Cell Reports Medicine | Cell Rep Med | 2666-3791 | 7 | 1 |
| Med | Med | 2666-6340 | 1 | 0 |
| Patterns | Patterns (N Y) | 2666-3899 | 1 | 5 |
| Cell Systems | Cell Syst | 2405-4712 | 0 | 4 |
| Science Translational Medicine | Sci Transl Med | 1946-6234 | 0 | 0 |
| Science Advances | Sci Adv | 2375-2548 | 0 | 8 |
| The Lancet | Lancet | 0140-6736 | 2 | 1 |
| Lancet Digital Health | Lancet Digit Health | 2589-7500 | 7 | 11 |
| Lancet Oncology | Lancet Oncol | 1470-2045 | 0 | 1 |
| Lancet Respiratory Medicine | Lancet Respir Med | 2213-2600 | 0 | 0 |
| Lancet Neurology | Lancet Neurol | 1474-4422 | 0 | 0 |
| Lancet Psychiatry | Lancet Psychiatry | 2215-0366 | 1 | 1 |
| eBioMedicine | EBioMedicine | 2352-3964 | 0 | 2 |
| eClinicalMedicine | EClinicalMedicine | 2589-5370 | 2 | 2 |
| JAMA | JAMA | 0098-7484 | 8 | 12 |
| JAMA Network Open | JAMA Netw Open | 2574-3805 | 5 | 4 |
| JAMA Internal Medicine | JAMA Intern Med | 2168-6106 | 0 | 4 |
| JAMA Psychiatry | JAMA Psychiatry | 2168-622X | 2 | 0 |
| JAMA Oncology | JAMA Oncol | 2374-2437 | 0 | 0 |
| JAMA Pediatrics | JAMA Pediatr | 2168-6203 | 6 | 1 |
| New England Journal of Medicine | N Engl J Med | 0028-4793 | 1 | 3 |
| NEJM AI | NEJM AI | 2836-9386 | 7 | 11 |
| NEJM Evidence | NEJM Evid | 2766-5526 | 0 | 0 |
| The BMJ | BMJ | 0959-8138；补查1756-1833 | 9 | 14 |

## 附录四：附件与审计说明

- `新增文献.ris`：仅包含窗口内新增核心和边缘记录；可导入Zotero、EndNote等。
- `新增核心文献.ris`：只包含窗口内新增核心记录。
- `增量清单.tsv`：新增、旧文补录和更正均有独立状态字段。
- `筛选台账.tsv`：10,588条合并记录的筛选状态、理由和证据层级。
- `included.json` / `screened_records.json`：保留题录、摘要、来源、原始文件指针与审阅编号。
- `raw/`：PubMed XML、Crossref JSON、DOI补查结果及出版商摘要／简介响应。
- `pubmed_log.json`、`log_*.json`、`supplement_log.json`：查询、计数与分页日志。
- `metadata_audit.json`：双源题名对照及待核查差异。
- `core_notes.tsv`、`highlights.tsv`：本次中文归纳与重点阅读说明。
- Python脚本可复用，但规则初筛不能取代对新候选的主题审阅。

出版商页面补查中的临时连接失败已重试；最终仍未获得摘要的条目保留题录或简介并明确标识。无摘要不等于论文没有摘要，也不等于没有研究结果。PubMed未命中只表示本次查询未获取到该记录，不能断言它永久不被收录。

基线文件SHA-256：`c4a850bb54dfdb4e83520d7858084750dbac5729f20dab4e972b859c19fcac25`。
