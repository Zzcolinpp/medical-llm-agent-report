---
title: "LLM/Agent前瞻性研究集合"
source_note: "[[医学LLM与Agent_文献追踪报告]]"
source_window: "2025-07-01—2026-07-14"
screening_date: "2026-07-26"
strict_core_count: 33
boundary_count: 7
sibling_journal_count: 1
---

# LLM/Agent前瞻性研究集合

> [!summary] 结论
> 从原报告的 350 篇正文相关文献中，筛出 **33 篇严格核心研究**：明确进行了前瞻性临床/真实世界验证、随机对照或随机人因实验、前后测实施研究，或招募真实受试者完成用户/阅片者评估。另列 **7 篇边界/二次分析**，以及原报告附录中同系姊妹刊的 **1 篇前瞻性试点**。核心计数不包含纯回顾性研究、纯基准测试、合成/模拟数据评估或仅提出未来前瞻性验证的文章。

## 筛选口径

- **严格核心**：研究实际收集了前瞻性病例、患者问题、门诊/通话/工作流数据，或前瞻性招募参与者进行随机分组、干预、阅片、用户测试、教育测验和前后测评估。
- **边界/二次分析**：研究明确使用了纵向项目或前瞻性 RCT 数据，但当前文章主要是二次分析；或有真实受试者评估，但摘要没有明确时间方向/前瞻性表述。
- **排除**：仅使用既有回顾性 EHR/影像数据；纯 benchmark、模拟病例或 in silico 评估；系统评价、观点文章；以及把“未来将开展前瞻性验证”误当成已完成的前瞻性研究。
- **重要说明**：随机试验即使使用模拟病例，只要真实招募了受试者并进行了前瞻性随机分组，仍纳入核心；其中会在设计字段中注明“模拟场景”。

## 研究分布

| 分组 | 篇数 | 典型证据 |
|---|---:|---|
| 真实世界前瞻性验证与临床实施 | 11 | 前瞻性病例/队列、临床工作流、阅片者研究 |
| 前瞻性流程、人因与可行性研究 | 4 | 人在回路、患者教育、Agent 试点、注册人机研究 |
| 随机对照、随机实验与干预研究 | 18 | RCT、随机交叉、随机人因/教育实验 |
| 严格核心合计 | **33** |  |
| 边界/二次分析 | **7** | 不计入核心 |
| 姊妹刊附录前瞻性试点 | **1** | 不计入 npj Digital Medicine 正文统计 |

## 一、真实世界前瞻性验证与临床实施

### 1. 急诊科首次医疗接触时用于急性冠脉综合征分诊的大语言模型

*Large language models for acute coronary syndrome triage at first medical contact in emergency departments.*

- 日期：2026-06-17；设计：回顾性开发/验证 + 前瞻性病例验证；注册号：NCT06493175。
- 样本：16,428 例回顾性病例 + 512 例前瞻性病例。
- 主要结果：模型保持较高敏感性，单例处理速度比心内科医师独立评估快 39%。
- 前瞻性证据：报告明确区分并纳入 512 例前瞻性病例。
- 标识：[PMID 42310091](https://pubmed.ncbi.nlm.nih.gov/42310091/) · [DOI 10.1038/s41746-026-02904-y](https://doi.org/10.1038/s41746-026-02904-y)

### 2. 面向急诊神经科诊断的领域专用大语言模型的开发与前瞻性影子评估

*Development and prospective shadow evaluation of a domain-specific large language model for emergency neurological diagnosis.*

- 日期：2026-04-18；设计：前瞻性影子评估；注册号：NCT06779292。
- 样本：433 名急诊患者。
- 主要结果：Xuanwu-NeuroAid 独立诊断准确率 79.4%，高于急诊医生的 65.4%（p<0.001）；检查与治疗建议的专家评分也更高。
- 前瞻性证据：题名和摘要均明确使用 prospective shadow evaluation，并对真实急诊患者前瞻性纳入。
- 标识：[PMID 42000879](https://pubmed.ncbi.nlm.nih.gov/42000879/) · [DOI 10.1038/s41746-026-02644-z](https://doi.org/10.1038/s41746-026-02644-z)

### 3. 用于自动化内镜报告的领域专用多模态大语言模型及其多中心前瞻性验证

*Domain specific multimodal large language model for automated endoscopy reporting with multicenter prospective validation.*

- 日期：2026-03-28；设计：多中心前瞻性内部/外部验证。
- 样本：模型训练使用 20,617 对图文数据；前瞻性队列报告临床可接受率分别为 79.3% 和 83.3%。
- 主要结果：病例级报告完整性 88.51%、准确性 78.93%；多中心视频数据的病灶级准确率 83.94%，平均每个病灶处理 1.5 秒。
- 前瞻性证据：题名明确写出 multicenter prospective validation，且报告分别给出前瞻性单中心和多中心结果。
- 标识：[PMID 41904204](https://pubmed.ncbi.nlm.nih.gov/41904204/) · [DOI 10.1038/s41746-026-02569-7](https://doi.org/10.1038/s41746-026-02569-7)

### 4. 全科诊疗中的环境记录（ambient scribe）：多视角前后对照纵向混合方法研究

*Ambient scribe in general practice: a multi-perspective before-after longitudinal mixed-methods study.*

- 日期：2026-03-02；设计：荷兰前瞻性多中心、前后对照、混合方法研究。
- 样本：12 名全科医生/规培医生，观察 535 次门诊就诊；比较 2 天基线期与 2 天干预期。
- 主要结果：每次就诊临床文书时间减少 42.7 秒（95%CI -56.29 至 -30.78，p<0.0001），总就诊时长无变化；同时发现摘要不准确、敏感信息讨论受阻等风险。
- 前瞻性证据：摘要明确称为 prospective multi-centre study，并按时间顺序实施基线与干预期。
- 标识：[PMID 41772212](https://pubmed.ncbi.nlm.nih.gov/41772212/) · [DOI 10.1038/s41746-026-02454-3](https://doi.org/10.1038/s41746-026-02454-3)

### 5. 用于术前患者准备的对话式人工智能：实施、验证与患者满意度

*Conversational artificial intelligence for pre-procedural patient preparation: implementation, validation and patient satisfaction.*

- 日期：2026-07-04；设计：前瞻性真实世界实施/验证研究；系统：Sofiya（定制 LLM + Agent 框架）。
- 样本：1,431 名患者，1,606 次心导管检查术前电话；时间为 2025-01-16 至 2025-07-17。
- 主要结果：两个 90 天阶段的通话完成率分别为 86.4% 和 87.9%，系统错误率由 6.0% 降至 2.6%。
- 前瞻性证据：报告明确称为 prospectively evaluated，并按实际临床通话连续收集数据。
- 标识：[PMID 42401677](https://pubmed.ncbi.nlm.nih.gov/42401677/) · [DOI 10.1038/s41746-026-02959-x](https://doi.org/10.1038/s41746-026-02959-x)

### 6. 核医学领域大语言模型回答患者医疗与行政咨询的真实世界评估

*Real-world evaluation of large language model for patients medical and administrative queries in nuclear medicine.*

- 日期：2026-06-17；设计：前瞻性收集患者问题的真实世界比较评估。
- 样本：339 条药物相互作用问题、42 条医疗问题和 76 条行政问题。
- 主要结果：医疗问题中 10 个评价维度有 8 个维度的 LLM 回答被专家评为与人类相当或更好，比例为 76%–98%（p<0.001）；行政问题中 97% 被非专家认为更具信息量、86% 更受偏好。
- 前瞻性证据：患者咨询问题先前瞻性收集，再由人类与 ChatGPT v4.1 作答并盲法评分。
- 标识：[PMID 42303756](https://pubmed.ncbi.nlm.nih.gov/42303756/) · [DOI 10.1038/s41746-026-02889-8](https://doi.org/10.1038/s41746-026-02889-8)

### 7. 一个与临床医生认知一致的视觉-语言框架用于眼底荧光素血管造影的分步解读

*A clinician aligned vision language framework for stepwise interpretation in fundus fluorescein angiography.*

- 日期：2026-07-12；设计：多模态模型开发 + 前瞻性阅片者研究。
- 样本：前瞻性阅片者研究含 200 例 FFA 病例；模型开发/测试使用多中心图像和报告数据。
- 主要结果：Clin-FFA-VLM 诊断 F1 为 0.77，并显著提升医学生和住院医师的诊断准确率（p<0.05）。
- 前瞻性证据：报告明确写出 200 例 prospective reader study，评估真实阅片者在使用系统前后的表现。
- 标识：[PMID 42437856](https://pubmed.ncbi.nlm.nih.gov/42437856/) · [DOI 10.1038/s41746-026-02932-8](https://doi.org/10.1038/s41746-026-02932-8)

### 8. 人类专业能力还是人工智能？一项关于甲病诊断的前瞻性研究

*Human expertise or artificial intelligence? A prospective study on nail disorder diagnosis.*

- 日期：2026-06-02；设计：前瞻性医生-多模态 LLM 比较研究。
- 样本：17 名皮肤科医师；比较 GPT-4o、Grok 3、Claude Sonnet 4 和 Gemini 2.5 Flash。
- 主要结果：医师首选诊断正确率 70.6%、纳入鉴别诊断后 80.3%；AI 对应为 25.0% 和 35.0%，均显著低于医师（p<0.001）。
- 前瞻性证据：题名和摘要均明确为 prospective study，使用临床甲病图像进行前瞻性比较。
- 标识：[PMID 42230912](https://pubmed.ncbi.nlm.nih.gov/42230912/) · [DOI 10.1038/s41746-026-02850-9](https://doi.org/10.1038/s41746-026-02850-9)

### 9. 从眨眼到诊疗：基于智能手机视频的儿童上睑下垂功能分析与个性化管理

*From blink to care: smartphone video-based functional analysis and personalized management in pediatric blepharoptosis.*

- 日期：2026-03-18；设计：前瞻性多中心研究，含功能分析、风险分层和领域适配对话模型。
- 样本：3,164 段眨眼视频和 1,229 张面部图像；另有真实世界部署评估。
- 主要结果：提上睑肌功能不良识别 AUC 0.993，内部/真实世界功能分层准确率 0.91/0.89，患者满意度 4.93/5。
- 前瞻性证据：摘要明确称为 prospective multicenter study，并报告真实世界队列结果。
- 标识：[PMID 41844953](https://pubmed.ncbi.nlm.nih.gov/41844953/) · [DOI 10.1038/s41746-026-02510-y](https://doi.org/10.1038/s41746-026-02510-y)

### 10. 大语言模型与机器学习在预测经皮椎体后凸成形术后并发症中的性能比较

*Comparative performance of LLMs and machine learning in predicting complications after percutaneous kyphoplasty for osteoporotic vertebral compression fractures.*

- 日期：2026-04-01；设计：单中心回顾性联合前瞻性数据的混合研究。
- 样本：单中心三级医院 PKP 患者数据；比较 GPT-5、DeepSeek R1、5 种传统机器学习模型和 2 名脊柱外科医生。
- 主要结果：骨水泥渗漏预测中零样本 LLM F1 为 0.857–0.871；新发椎体骨折预测较差，零样本 F1 为 0.309，提示临床应用尚不成熟。
- 前瞻性证据：报告明确写出 retrospective combined prospective data；因此纳入，但标记为混合设计。
- 标识：[PMID 41922526](https://pubmed.ncbi.nlm.nih.gov/41922526/) · [DOI 10.1038/s41746-026-02588-4](https://doi.org/10.1038/s41746-026-02588-4)

### 11. 面向术中诊断的端到端多功能 AI 平台

*An end-to-end multifunctional AI platform for intraoperative diagnosis.*

- 日期：2025-07-20；设计：平台开发 + 人机协作前瞻性研究；注册号：ChiCTR2300076555。
- 样本：平台开发使用超过 6,700 张全切片图像；临床支持模块由病理医师进行前瞻性人机协作验证。
- 主要结果：GAS 平台改善冰冻切片质量，并在前瞻性研究中显著提升病理医师诊断信心。
- 前瞻性证据：摘要明确写出 prospective study，并给出临床试验注册号。
- 标识：[PMID 40685437](https://pubmed.ncbi.nlm.nih.gov/40685437/) · [DOI 10.1038/s41746-025-01808-7](https://doi.org/10.1038/s41746-025-01808-7)

## 二、前瞻性流程、人因与可行性研究

### 12. 评估人在回路策略用于 AI 辅助的患者出院指导翻译：一项多学科分析

*Evaluating human-in-the-loop strategies for artificial intelligence-enabled translation of patient discharge instructions: a multidisciplinary analysis.*

- 日期：2025-10-24；设计：前瞻性人因/多学科评估；全文明确称为 prospective study。
- 样本：6 种语言的出院指导文本，由语言学家、临床医生和家庭照护者组成的 42 名评估者评分。
- 主要结果：AI 生成 + 专业译员后编辑的人在回路方案在所有语言上达到或优于专业翻译；平均耗时 7.1 分钟，比专业翻译的 16.8 分钟更短（p<0.001）。
- 前瞻性证据：实际招募评估者对预设翻译方案进行比较，属于前瞻性人因研究，不是仅做机器翻译基准。
- 标识：[PMID 41136708](https://pubmed.ncbi.nlm.nih.gov/41136708/) · [DOI 10.1038/s41746-025-02055-6](https://doi.org/10.1038/s41746-025-02055-6)

### 13. 利用集成电子病历的 LLM 智能体实现前列腺癌患者的个性化教育

*Personalizing prostate cancer education for patients using an EHR-Integrated LLM agent.*

- 日期：2025-12-18；设计：前瞻性质量改进/前后测可行性研究。
- 样本：15 名前列腺癌患者和 3 名临床医生；患者与医生均在 2024-05 至 2025-04 期间与 MedEduChat 交互。
- 主要结果：UMUX 可用性评分 83.7/100；患者健康信心评分由 9.9 升至 13.9；医生对正确性评分 2.9/3、完整性 2.7/3、安全性 2.7/3。
- 前瞻性证据：全文确认患者被招募并完成干预前后调查，属于真实参与者的前后测研究。
- 标识：[PMID 41413170](https://pubmed.ncbi.nlm.nih.gov/41413170/) · [DOI 10.1038/s41746-025-02166-0](https://doi.org/10.1038/s41746-025-02166-0)

### 14. 在新加坡国家预防保健计划中使用智能体 AI 制定个性化健康计划：一项试点研究

*Personalised health plan development using agentic AI in Singapore's national preventive care programme: a pilot study.*

- 日期：2026-03-09；设计：多智能体数字助手的真实用户/临床医生试点。
- 样本：20 名居民和 7 名临床医生。
- 主要结果：四项成功指标评分均高于中性满意度水平（p<0.05）；居民对个性化程度和建议细致度的评价较积极。
- 前瞻性证据：参与者实际与 Agent 系统交互并完成评价，属于前瞻性试点而非离线 benchmark。
- 标识：[PMID 41803278](https://pubmed.ncbi.nlm.nih.gov/41803278/) · [DOI 10.1038/s41746-026-02514-8](https://doi.org/10.1038/s41746-026-02514-8)

### 15. 多类型提示工程对大语言模型高血压治疗决策的影响

*The effects of multitype prompt engineering for large language models in hypertension treatment decisions.*

- 日期：2026-04-15；设计：注册的人机协作两阶段验证/参与者评估；注册号：ChiCTR2500099307。
- 样本：300 例去标识化模拟高血压病例，并比较不同医院层级医生在 LLM 辅助前后的表现。
- 主要结果：最佳配置（ChatGPT-4.1 + Guidance-Self-Consistency）准确率 91.3%，并提升社区、县级和教学医院医生的平均准确率；劣质配置反而使不合理方案率由 26.6% 升至 35.2%。
- 前瞻性证据：有试验注册和真实医生参与的前后人机评估；病例本身为模拟病例，因此不等同于真实患者结局研究。
- 标识：[PMID 41986562](https://pubmed.ncbi.nlm.nih.gov/41986562/) · [DOI 10.1038/s41746-026-02645-y](https://doi.org/10.1038/s41746-026-02645-y)

## 三、随机对照、随机实验与干预研究

### 16. 大语言模型生成的医学解释对放射科诊断准确性的影响

*The effect of medical explanations from large language models on diagnostic accuracy in radiology.*

- 日期：2026-04-23；设计：随机人因实验/随机对照试验。
- 样本：2,020 次放射科医生病例评估；对照、标准输出、鉴别诊断和思维链解释四种条件。
- 主要结果：思维链解释相对无 LLM 对照使诊断准确率提高 12.2%（p=0.001），并优于其他解释格式。
- 前瞻性证据：真实医生被随机分配到预设解释条件并完成病例评估。
- 标识：[PMID 42026140](https://pubmed.ncbi.nlm.nih.gov/42026140/) · [DOI 10.1038/s41746-026-02619-0](https://doi.org/10.1038/s41746-026-02619-0)

### 17. 从工具到队友：临床医生-AI 协作诊断工作流的随机对照试验

*From tool to teammate in a randomized controlled trial of clinician-AI collaborative workflows for diagnosis.*

- 日期：2026-03-18；设计：临床医生-AI 协作工作流 RCT。
- 样本：70 名临床医生；比较 AI 作为第一意见、第二意见和常规资源。
- 主要结果：医生诊断准确率分别为 85% 和 82%，高于常规资源组的 75%，接近 AI 单独诊断的 90%。
- 前瞻性证据：实际招募临床医生并随机分配工作流，直接测量人机协作后的诊断表现。
- 标识：[PMID 41851268](https://pubmed.ncbi.nlm.nih.gov/41851268/) · [DOI 10.1038/s41746-026-02545-1](https://doi.org/10.1038/s41746-026-02545-1)

### 18. GutGPT——一种用于消化道出血的生成式 AI 工具的随机试验：可用性与采纳度

*Usability and adoption in a randomized trial of GutGPT a GenAI tool for gastrointestinal bleeding.*

- 日期：2025-08-18；设计：基于模拟病例的受试者随机试验；注册号：NCT05816473。
- 样本：106 名临床受训者，GutGPT 组 52 人、AI 仪表盘对照组 54 人。
- 主要结果：GutGPT 组努力期望更高，但行为意向无显著差异；信任和工作流整合是主要采纳障碍。
- 前瞻性证据：真实受试者被随机分组完成三个病例；“模拟场景”只描述任务场景，不改变其前瞻性随机设计属性。
- 标识：[PMID 40825997](https://pubmed.ncbi.nlm.nih.gov/40825997/) · [DOI 10.1038/s41746-025-01896-5](https://doi.org/10.1038/s41746-025-01896-5)

### 19. 对齐 HL7-CDA 的大语言模型用于 ICD-10-CM 编码的真实世界部署评估

*Evaluating real-world deployment of an HL7-CDA-aligned LLM for ICD-10-CM coding.*

- 日期：2026-04-14；设计：13 周人在回路随机对照试验。
- 样本：10 名注册编码专家，两个机构的真实编码工作流。
- 主要结果：AI 辅助工作流在保持准确性的同时显著缩短编码时间；满意度受经验、资质和代际队列影响。
- 前瞻性证据：研究按 13 周持续部署和随机工作流分配观察用户表现，属于真实世界前瞻性实施研究。
- 标识：[PMID 41981090](https://pubmed.ncbi.nlm.nih.gov/41981090/) · [DOI 10.1038/s41746-026-02541-5](https://doi.org/10.1038/s41746-026-02541-5)

### 20. 大语言模型在围手术期医学中的临床与经济影响：一项随机交叉试验

*Clinical and economic impact of a large language model in perioperative medicine: a randomized crossover trial.*

- 日期：2025-07-21；设计：住院医师随机交叉试验；系统：PEACH。
- 样本：新加坡中央医院住院医师，按随机交叉顺序完成术前评估文书任务。
- 主要结果：总体文书时间未显著下降；中等复杂度病例节省 5.77 分钟（p=0.010），经验丰富医师节省 4.6 分钟（p=0.040）；模型预测每年可节省约 197,501 新元。
- 前瞻性证据：受试者按随机交叉顺序完成任务并比较同一研究期内的效率、质量和接受度。
- 标识：[PMID 40691284](https://pubmed.ncbi.nlm.nih.gov/40691284/) · [DOI 10.1038/s41746-025-01858-x](https://doi.org/10.1038/s41746-025-01858-x)

### 21. 基于微信的人工智能智能体用于骨科患者术后照护的随机对照试验

*A randomized controlled trial of a WeChat-based artificial intelligence agent for postoperative care in orthopedic patients.*

- 日期：2026-01-17；设计：患者随机对照试验；注册号：ChiCTR2500101273。
- 样本：261 名骨科术后患者；AI 组 140 人、医生主导常规沟通组 121 人。
- 主要结果：AI 响应更快（0.5±0.6 vs 358±47.5 分钟），准确性略低（93.9% vs 98.1%）；1 和 3 个月功能及满意度更好，6 个月组间差异消失。
- 前瞻性证据：患者在术后被随机分组并接受持续照护，带有 1、3、6 个月随访。
- 标识：[PMID 41548028](https://pubmed.ncbi.nlm.nih.gov/41548028/) · [DOI 10.1038/s41746-025-02269-8](https://doi.org/10.1038/s41746-025-02269-8)

### 22. 评估社交辅助机器人对患者参与度与照护质量影响的随机试点研究

*A randomized pilot study evaluating socially assistive robot effects on patient engagement and care quality.*

- 日期：2025-12-02；设计：外部随机试点；注册号：ISRCTN96689284。
- 样本：229 名外科病房患者；标准照护 + 社交辅助机器人 vs 标准照护。
- 主要结果：总体参与度和感知照护质量效应有限，但疼痛管理有积极影响；留存率较高且未见明显负面效应。
- 前瞻性证据：患者在住院期间随机接受干预并测量共同主要结局和健康相关生活质量。
- 标识：[PMID 41331089](https://pubmed.ncbi.nlm.nih.gov/41331089/) · [DOI 10.1038/s41746-025-02117-9](https://doi.org/10.1038/s41746-025-02117-9)

### 23. 共同设计的教育干预能否帮助消费者批判性思考向 ChatGPT 提出健康问题？

*Can co-designed educational interventions help consumers think critically about asking ChatGPT health questions? Results from a randomised-controlled trial.*

- 日期：2025-11-17；设计：在线随机对照教育干预。
- 样本：619 人进入研究，592 人纳入分析；动画组 191 人、图片组 203 人、对照组 205 人。
- 主要结果：两种教育内容均降低高风险情境下向 ChatGPT 提问的意愿；动画组均值 2.42，图片组 2.69，对照组 3.12，差异显著。
- 前瞻性证据：在线面板招募参与者后随机分配教育内容并立即测量预设健康素养结局。
- 标识：[PMID 41249473](https://pubmed.ncbi.nlm.nih.gov/41249473/) · [DOI 10.1038/s41746-025-02056-5](https://doi.org/10.1038/s41746-025-02056-5)

### 24. 依恋、孤独感和社会支持作为对话式 AI 心理健康干预效果的调节因素

*Attachment, loneliness, and social support as moderators of conversational AI-based mental health outcomes.*

- 日期：2026-07-07；设计：预注册随机对照试验，含 12 周干预和 3 个月随访。
- 样本：977 名 18–32 岁大学生；对话式 AI、整合式团体治疗和等待名单对照。
- 主要结果：AI 干预在焦虑、幸福感和生活满意度方面优于其他组，并相对对照降低抑郁；高孤独感、低社会支持和不安全依恋者获益更多。
- 前瞻性证据：预注册 RCT 直接实施 12 周干预并进行 3 个月纵向随访。
- 标识：[PMID 42414532](https://pubmed.ncbi.nlm.nih.gov/42414532/) · [DOI 10.1038/s41746-026-02974-y](https://doi.org/10.1038/s41746-026-02974-y)

### 25. 动机性访谈聊天机器人在基层医疗中改善生活方式：一项实用性随机对照试验

*Motivational interviewing chatbot improves lifestyle in primary healthcare settings in a pragmatic randomised controlled trial.*

- 日期：2026-05-25；设计：香港三家基层医疗机构的开放标签、多中心、实用性 RCT。
- 样本：627 名 45–75 岁、患有或有高血压/糖尿病风险的成人；修正意向性治疗分析 n=460。
- 主要结果：12 周体力活动增加 576 MET-分钟/周，果蔬摄入和行动承诺改善；高血压亚组收缩压下降 5.03 mmHg，效应维持至 9 个月。
- 前瞻性证据：参与者随机接受 12 周 MI 聊天机器人或常规照护，并有长期随访。
- 标识：[PMID 42185597](https://pubmed.ncbi.nlm.nih.gov/42185597/) · [DOI 10.1038/s41746-026-02728-w](https://doi.org/10.1038/s41746-026-02728-w)

### 26. 面向心理困扰的大龄青少年及青年的引导式聊天机器人心理干预：约旦随机临床试验

*A guided chatbot-based psychological intervention for psychologically distressed older adolescents and young adults: a randomised clinical trial in Jordan.*

- 日期：2026-01-15；设计：随机临床试验。
- 样本：344 名心理困扰青年；10 节聊天机器人干预 + 5 次每周支持电话 vs 强化常规照护。
- 主要结果：治疗后 3 个月焦虑和抑郁改善显著优于对照，效应量分别为 0.70 和 0.61，功能、幸福感和能动感也改善。
- 前瞻性证据：参与者被招募、随机分组并在干预后 3 个月评估。
- 标识：[PMID 41540250](https://pubmed.ncbi.nlm.nih.gov/41540250/) · [DOI 10.1038/s41746-025-02142-8](https://doi.org/10.1038/s41746-025-02142-8)

### 27. 结合生理监测的 AI 引导数字干预可减少实验性创伤后的闯入性记忆

*AI-guided digital intervention with physiological monitoring reduces intrusive memories after experimental trauma.*

- 日期：2025-12-26；设计：随机对照实验；系统：ANTIDOTE。
- 样本：100 名健康志愿者观看创伤性视频后随机进入 AI 干预组或活性对照组。
- 主要结果：AI 引导的意象竞争任务结合瞳孔监测，显著减少随后一周的闯入性记忆；瞳孔大小与干预参与度和症状改善相关。
- 前瞻性证据：健康志愿者先接受实验性创伤暴露，再按随机分组实施干预并进行一周测量。
- 标识：[PMID 41454171](https://pubmed.ncbi.nlm.nih.gov/41454171/) · [DOI 10.1038/s41746-025-02145-5](https://doi.org/10.1038/s41746-025-02145-5)

### 28. AI 错误信息对医学生初学者诊断准确性与信心校准的影响

*Impact of AI misinformation on diagnostic accuracy and confidence calibration in novice medical students.*

- 日期：2026-03-17；设计：随机对照试验；注册号：ChiCTR2500111932。
- 样本：111 名医学生；正确 AI 解释、误导性 AI 解释和无解释对照。
- 主要结果：误导性 AI 解释显著降低诊断准确率并破坏信心校准；正确解释相对无解释对照没有显著提升。
- 前瞻性证据：真实医学生被随机分配到预设解释条件并完成诊断任务。
- 标识：[PMID 41844809](https://pubmed.ncbi.nlm.nih.gov/41844809/) · [DOI 10.1038/s41746-026-02547-z](https://doi.org/10.1038/s41746-026-02547-z)

### 29. 生成式 AI 对医学院招生虚拟面试中申请者行为、表现与面试信度的影响

*The impact of GenAI on applicant behaviour, performance, and interview reliability during virtual interviews for medical school admissions.*

- 日期：2025-12-23；设计：虚拟面试随机实验。
- 样本：医学院申请者，随机分为鼓励暗中使用 ChatGPT、常规做法和事先告知考站内容等条件。
- 主要结果：ChatGPT 组均分 3.67，未高于常规对照 3.74；限制镜头外使用时间未损害表现、测量精度或可接受性。
- 前瞻性证据：受试者在面试前按条件随机分配，并在统一虚拟面试中实时完成任务。
- 标识：[PMID 41437146](https://pubmed.ncbi.nlm.nih.gov/41437146/) · [DOI 10.1038/s41746-025-02256-z](https://doi.org/10.1038/s41746-025-02256-z)

### 30. 大语言模型数字患者系统提升眼科病史采集技能

*A large language model digital patient system enhances ophthalmology history taking skills.*

- 日期：2025-08-04；设计：单中心随机对照试验；注册号：NCT06229379。
- 样本：84 名学生；LLM 数字患者训练 vs 传统训练。
- 主要结果：病史采集考核得分提高 10.50 分（95%CI 4.66–16.33，p<0.001），共情能力和面对真实患者的信心也更好。
- 前瞻性证据：学生先被随机分组接受训练，随后完成统一病史采集考核。
- 标识：[PMID 40760042](https://pubmed.ncbi.nlm.nih.gov/40760042/) · [DOI 10.1038/s41746-025-01841-6](https://doi.org/10.1038/s41746-025-01841-6)

### 31. 基于智能手机聊天机器人的干预对南亚裔人群流感与新冠疫苗接种率的影响

*Effects of a smartphone-based chatbot intervention on influenza and COVID-19 vaccine uptake among South Asians.*

- 日期：2025-12-11；设计：两臂整群随机、等待名单对照试验；注册号：ChiCTR2200061503。
- 样本：610 名过去一年未接种相关疫苗的南亚裔成年人。
- 主要结果：干预组流感疫苗接种率在干预结束时为 57.8% vs 1.3%，3 个月时为 68.0% vs 2.0%（均 p<0.001）。
- 前瞻性证据：参与者被整群随机分配，接受手机聊天机器人干预并在干预后 3 个月随访。
- 标识：[PMID 41381754](https://pubmed.ncbi.nlm.nih.gov/41381754/) · [DOI 10.1038/s41746-025-02200-1](https://doi.org/10.1038/s41746-025-02200-1)

### 32. 同行如何看待临床医生在医疗决策中使用生成式 AI

*Peer perceptions of clinicians using generative AI in medical decision-making.*

- 日期：2025-08-18；设计：执业临床医生随机情境实验。
- 样本：276 名执业临床医生；医生不使用 AI、将 AI 作为主要决策工具、将 AI 作为核查工具三种情境。
- 主要结果：GenAI-primary 情境下临床技能评分 3.79，显著低于对照 5.93（p<0.001）；将 AI 定位为核查工具可部分缓解负面评价。
- 前瞻性证据：受试者随机阅读预设情境并完成评价，属于前瞻性随机人因研究。
- 标识：[PMID 40826224](https://pubmed.ncbi.nlm.nih.gov/40826224/) · [DOI 10.1038/s41746-025-01901-x](https://doi.org/10.1038/s41746-025-01901-x)

### 33. GPT-4o 生成的多项选择题与人工命题在影像相关专业中的心理测量学特性与可识别性比较

*Psychometric properties and detectability of GPT-4o-generated multiple-choice questions compared with human-authored items across imaging specialties.*

- 日期：2026-01-08；设计：预注册、单中心、盲法、被试内比较研究。
- 样本：82 名医学生和 46 名医师；比较 24 道 GPT-4o 题与 24 道人工题。
- 主要结果：题目难度和区分度无显著差异；参与者识别题目来源的正确率不高于随机水平（0.50），专家评分者间一致性较低。
- 前瞻性证据：预注册后招募受试者，在统一模拟考试中完成被试内比较，属于前瞻性教育人因研究。
- 标识：[PMID 41507355](https://pubmed.ncbi.nlm.nih.gov/41507355/) · [DOI 10.1038/s41746-025-02313-7](https://doi.org/10.1038/s41746-025-02313-7)

## 边界条目：前瞻性数据二次分析或时间方向未完全明确

> 这些条目保留在集合中，便于后续综述或系统评价检索；它们不计入上面的 33 篇严格核心。

### B1. 医师在临床决策中使用 AI 聊天机器人的输入方式类型学

*A typology of physician input approaches to using AI chatbots for clinical decision-making.*

- 日期：2025-12-05；设计：美国医师访谈 + 两项 RCT 聊天日志二次分析。
- 样本/数据：半结构化医师访谈，以及两项随机对照试验中的医师聊天记录。
- 主要结果：识别出整例复制、选择性复制、自行总结和短查询四种输入方式；没有一种方式与更高病例得分相关。
- 边界原因：文章本身不是前瞻性试验，而是对前瞻性 RCT 数据的二次分析。
- 标识：[PMID 41350807](https://pubmed.ncbi.nlm.nih.gov/41350807/) · [DOI 10.1038/s41746-025-02184-y](https://doi.org/10.1038/s41746-025-02184-y)

### B2. 接触 ChatGPT 后公众对医疗人工智能认知的变化

*Changes in public perception of artificial intelligence in healthcare after exposure to ChatGPT.*

- 日期：2025-11-25；设计：纵向观察性队列。
- 样本：5,899 名调查参与者；2022 年基线与 2024 年随访，随访时 1,195 人报告接触过 ChatGPT。
- 主要结果：基线对 AI 持不确定态度者，接触 ChatGPT 后转为认为 AI 有益的几率更高（OR 3.21，95%CI 2.34–4.40）。
- 边界原因：明确使用了纵向随访数据，但不是临床干预或 LLM 工作流验证。
- 标识：[PMID 41290943](https://pubmed.ncbi.nlm.nih.gov/41290943/) · [DOI 10.1038/s41746-025-02169-x](https://doi.org/10.1038/s41746-025-02169-x)

### B3. 基于智能手机语音的可扩展抑郁监测：多模态基准与主题分析

*Scalable depression monitoring with smartphone speech using a multimodal benchmark and topic analysis.*

- 日期：2026-02-28；设计：纵向项目数据的二次分析。
- 样本：284 名德语成年人（128 名重性抑郁障碍患者、156 名对照），3,151 份每周语音日记。
- 主要结果：Qwen3-8B 与 multilingual-E5 堆叠预测 BDI 的 MAE 4.37、R²=0.41，优于声学和词汇基线。
- 边界原因：数据来自纵向每周采集项目，但当前文章是既有数据的二次建模分析。
- 标识：[PMID 41764298](https://pubmed.ncbi.nlm.nih.gov/41764298/) · [DOI 10.1038/s41746-026-02486-9](https://doi.org/10.1038/s41746-026-02486-9)

### B4. 大语言模型在放射学报告可读性方面的多维评估

*Multidimensional evaluation of large language models in radiology report readability.*

- 日期：2026-04-01；设计：序贯两阶段研究。
- 样本/数据：先评估 320 份回顾性报告，再对 800 名患者进行临床场景验证。
- 主要结果：LLM 简化报告显著改善患者理解并减轻焦虑（p<0.05）。
- 边界原因：临床验证阶段具有前瞻性用户评估特征，但摘要没有明确写出该阶段是否前瞻性，因此不计入核心。
- 标识：[PMID 41922696](https://pubmed.ncbi.nlm.nih.gov/41922696/) · [DOI 10.1038/s41746-026-02589-3](https://doi.org/10.1038/s41746-026-02589-3)

### B5. 由多模态大语言模型驱动的语音控制超分辨率超声成像与报告生成

*Voice-controlled super-resolution ultrasound imaging and reporting powered by multimodal large language models.*

- 日期：2026-06-21；设计：临床医生人因评估；注册号：ChiCTR2100048361。
- 样本：14 名临床医生。
- 主要结果：结构化报告约 4 分钟生成；医生认为报告结构完整、术语规范统一。
- 边界原因：有试验注册和真实医生评估，但摘要未明确写出 prospective，不能仅凭注册号判定为前瞻性。
- 标识：[PMID 42324351](https://pubmed.ncbi.nlm.nih.gov/42324351/) · [DOI 10.1038/s41746-026-02924-8](https://doi.org/10.1038/s41746-026-02924-8)

### B6. 医生与人工智能在真实临床病例上评价大语言模型时出现分歧

*Physicians and artificial intelligence diverge in evaluating large language models on real clinical cases.*

- 日期：2026-07-02；设计：多中心、多专科医生评估研究。
- 样本：400 多名来自 7 个专科、不同资历和地域的医生；评价真实去标识化病例的 LLM 自由文本回答。
- 主要结果：医生评价的异质性会改变模型相对排名；AI 评估者虽高效，但不能替代医生的细粒度判断。
- 边界原因：是真实病例的人因实证研究，但摘要未明确时间方向或前瞻性招募，因此单列。
- 标识：[PMID 42393197](https://pubmed.ncbi.nlm.nih.gov/42393197/) · [DOI 10.1038/s41746-026-02942-6](https://doi.org/10.1038/s41746-026-02942-6)

### B7. DeepSeek 在放射科住院医师培训结业考试题目生成中的表现

*Performance of DeepSeek in the generation of in-training examination questions in radiology resident education.*

- 日期：2026-03-24；设计：真实住院医师参与的横断面教育测验。
- 样本：40 名放射科住院医师；完成 28 道由 DeepSeek 和专家分别生成的题目。
- 主要结果：总体正确率和来源识别无显著差异，但 DeepSeek 在高阶情境题的临床真实性和表现较弱。
- 边界原因：有真实受试者，但报告未明确前瞻性时间方向，且主要是一次性教育测验，不计入严格临床核心。
- 标识：[PMID 41876633](https://pubmed.ncbi.nlm.nih.gov/41876633/) · [DOI 10.1038/s41746-026-02568-8](https://doi.org/10.1038/s41746-026-02568-8)

## 姊妹刊附录：不计入正文统计的前瞻性试点

### S1. 整合虚拟现实与大语言模型的手术室团队非技术技能训练与评估

*Integrating virtual reality and large language models for team-based non-technical skills training and evaluation in the operating room.*

- 期刊：npj Digital Surgery；日期：2026-06-04；设计：VR + LLM 真实用户试点。
- 样本：12 名外科专业人员，在 SAGES 会议完成两个腹腔镜急症场景。
- 主要结果：VORTeX 能自动生成可解释的团队沟通网络，用于沟通、决策、协作和领导力复盘。
- 纳入说明：属于原报告附录姊妹刊，是真实专业人员试点，但不计入 npj Digital Medicine 正文核心数量。
- 标识：[PMID 42254077](https://pubmed.ncbi.nlm.nih.gov/42254077/) · [DOI 10.1038/s44484-026-00009-3](https://doi.org/10.1038/s44484-026-00009-3)

## 已排除的相近条目

| PMID | 原报告条目 | 排除原因 |
|---:|---|---|
| 41792418 | AI 增强沟通提高 HIV PrEP 启动率 | 原报告明确为回顾性队列，不是前瞻性干预。 |
| 40750683 | 基于关键词的 AI 放射学报告生成 | 全文明确为 100 名患者的回顾性纳入。 |
| 41571772 | SpAgents | 全部患者数据为回顾性，作者提出的是未来前瞻性验证。 |
| 42026141 | 胚胎选择基础 AI 模型的 target trial emulation | 回顾性因果模拟，仅为后续 RCT 提供临床前依据。 |
| 42277365 | LLM 在临床试验知情同意中的表现 | proof-of-concept，摘要明确在真实受试者评估前完成。 |
| 42106536 | RESPECT 知情同意对话式 AI | 留一交叉验证、问题改写和科研人员评价，不是前瞻性临床研究。 |
| 42151446 | LLM 医学基准的计算机化自适应测试 | CAT/模型基准评估，不能替代真实世界前瞻性验证。 |
| 42414575 | LLM 与执业临床医生精神病理评估基准 | 模拟访谈基准与概念验证，不是前瞻性临床或干预研究。 |
| 41360997 | NetraAI 精准临床试验富集 | 分析既有 II 期试验数据；“prospectively identifying”描述未来用途，不等于本文完成前瞻性研究。 |

## 后续使用建议

- 做临床证据综述时，优先使用“严格核心”部分，并把前瞻性验证、随机干预和人因研究分别做亚组分析。
- 做方法学综述时，可把边界条目中的 RCT 数据二次分析、纵向数字表型和真实医生评估作为补充证据，但不要与原始试验重复计数。
- 对每个核心研究继续追踪注册号、完整样本量、主要结局和不良事件；尤其关注当前仅有流程指标或满意度指标、尚未报告患者临床结局的研究。

