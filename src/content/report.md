# npj Digital Medicine · 医学 LLM / Agent 专题文献追踪报告

> **检索日期**：2026-07-14  
> **追踪窗口**：2025-07-01 — 2026-07-14（近一年）  
> **目标期刊**：npj Digital Medicine（ISSN 2398-6352）  
> **数据来源**：PubMed / NCBI E-utilities 全量抓取 + Crossref（npj 官方 DOI 注册库）交叉校验  
> **专题范围**：医疗/医学相关的大语言模型（LLM）、生成式 AI、对话式 AI、AI 智能体（Agent）

---

## 检索与筛选策略（可复现）

为达成「不遗漏任何一篇相关主题文章」的目标，本报告采用**全量抓取 + 宽召回筛选 + 双源交叉校验**的三步法，而非直接用主题词检索：

1. **全量抓取**：用 PubMed E-utilities 抓取 npj Digital Medicine 在追踪窗口内的**全部** 1,194 篇文献（不加任何主题限制），并解析标题与摘要全文。为防止刊名理解偏差导致漏检，同时扫描了两本同系新刊 npj Digital Public Health（5 篇）与 npj Digital Surgery（3 篇），合计 1,202 篇。
2. **宽召回关键词筛选**：对标题+摘要施加一组刻意放宽的正则（large language model / LLM / ChatGPT / GPT / generative AI / chatbot / conversational agent / foundation model / agentic / multi-agent / RAG / prompt engineering / Gemini / Claude / Llama / DeepSeek / Qwen / vision-language / zero-shot / ambient scribe / digital scribe 等 30 余个模式），命中 335 篇；另加入 6 篇仅命中 NLP 类弱词的边缘文献，构成初始候选池 341 篇。
3. **漏检反查（关键一步）**：对**未命中任何关键词的 806 篇**逐条筛查标题与摘要，**追回 19 篇被关键词表漏掉的真实相关文献**——它们使用了词表外的表述，例如 `GenAI`（而非 generative AI）、`AI scribes`、`large reasoning model`（大推理模型）、`text-to-image generators`、`foundational model`（而非 foundation model）、`BioBERT`、以及以“对话流程”驱动的社交辅助机器人 RCT。候选池由此扩充至 **360 篇**。
4. **逐篇摘要研判与分类**：对 360 篇候选逐篇阅读摘要，判定为 `核心相关` / `边缘相关` / `排除`（排除者多为仅因 “transformer” 架构或 “prompt” 一词被误召回的纯影像分割/传统机器学习论文），并归入下述 15 个主题类目。
5. **双源交叉校验**：用 Crossref 拉取 npj Digital Medicine 官方 DOI 全量列表（1,201 条）与 PubMed 结果逐条比对，确认 PubMed 覆盖完整；仅 7 篇因发表于 2026-07-13/14 尚未被 PubMed 索引，其中 2 篇属于本专题，已手工补入（见「智能体」章节，标注 *PubMed 未索引*）。

**最终纳入（npj Digital Medicine 正文）**：**265 篇核心相关** + **85 篇边缘相关** = **350 篇**；排除 9 篇误召回。

姊妹刊另命中 3 篇同主题文献，因不属目标期刊，单列于文末附录二，不计入上述统计。

---

## 一图速览：文献分布

| 分类 | 篇数 |
|---|---:|
| 一、临床决策支持与诊断/分诊推理 | 19 |
| 二、医学智能体（Agentic AI）与多智能体系统 | 24 |
| 三、基准测试、评估方法与模型性能评价 | 31 |
| 四、安全性、偏倚、幻觉与红队测试 | 21 |
| 五、临床文书、环境记录与EHR信息抽取 | 18 |
| 六、面向患者的沟通、教育与问答 | 19 |
| 七、精神心理健康与行为干预 | 12 |
| 八、多模态与视觉-语言医学大模型 | 36 |
| 九、预测建模与EHR表示学习 | 14 |
| 十、医学教育与培训 | 14 |
| 十一、公共卫生、流行病学监测与健康公平 | 7 |
| 十二、治理、监管、伦理与政策 | 23 |
| 十三、模型开发与技术方法 | 19 |
| 十四、科研辅助与循证医学 | 8 |
| 十五、【边缘相关】非语言基础模型、生成式影像与经典NLP | 85 |
| **合计** | **350** |

---

## 一、临床决策支持与诊断/分诊推理（19 篇）

### 1. 使用大语言模型结合专家知识增强提示进行静脉血栓栓塞症自动风险评分：一项多中心验证研究

*Automated risk scoring for venous thromboembolism using large language models with expert knowledge-augmented prompting: a multicenter validation study.*

**npj Digital Medicine** · 2026-07-09 · 原创研究 · [PMID 42426240](https://pubmed.ncbi.nlm.nih.gov/42426240/) · [DOI](https://doi.org/10.1038/s41746-026-02929-3)

研究基于全国30家医院的非结构化电子病历，开发并验证LLM自动完成Padua与Caprini静脉血栓栓塞（VTE）风险评分；10家医院50例用于开发，20家医院200例用于测试，提示词经19位专家Delphi流程形成“专家知识增强提示”，并在6个开源LLM上评测。测试集中专家知识增强提示表现最佳，Padua条目级平均PABAK/F1为0.97/0.96，Caprini为0.97/0.93；风险分层方面Padua（PABAK 0.92，F1 0.96）优于Caprini（PABAK 0.73，F1 0.64），单例处理时间分别为6.07秒和12.82秒。

> **要点**：专家知识增强提示使开源LLM在Padua/Caprini条目评分上达到PABAK 0.97，可支撑血栓预防工作流的自动化风险分层。

### 2. 急诊科首次医疗接触时用于急性冠脉综合征分诊的大语言模型

*Large language models for acute coronary syndrome triage at first medical contact in emergency departments.*

**npj Digital Medicine** · 2026-06-17 · 原创研究 · [PMID 42310091](https://pubmed.ncbi.nlm.nih.gov/42310091/) · [DOI](https://doi.org/10.1038/s41746-026-02904-y)

研究开发了TriageMaster-70B，一个仅利用患者叙述（主诉）与生命体征即可对急性冠脉综合征（ACS）进行首次医疗接触分诊的大语言模型，无需等待心肌肌钙蛋白或心电图结果。在16,428例回顾性病例和512例前瞻性病例中，该模型表现出高敏感性，单例处理速度比心内科医师独立回顾性评估快39%（临床试验注册号NCT06493175）。结果提示该模型可支持急诊科快速、准确且具可解释性的分诊。

> **要点**：TriageMaster-70B在16,428例回顾性与512例前瞻性病例中保持高敏感性，单例处理较心内科医师快39%。

### 3. ChatGPT在复杂多发性神经病诊断与管理中的应用：与神经科医师基于真实病例的对比分析

*ChatGPT in the diagnosis and management of complex polyneuropathies: comparative analysis with neurologists using real-world cases.*

**npj Digital Medicine** · 2026-06-05 · 原创研究 · [PMID 42243282](https://pubmed.ncbi.nlm.nih.gov/42243282/) · [DOI](https://doi.org/10.1038/s41746-026-02815-y)

研究从意大利米兰两家三级中心选取100例真实多发性神经病病例，将含临床、实验室与电生理资料的标准化病历摘要提供给ChatGPT-4o，要求其给出首选诊断、两个鉴别诊断与一项确诊检查，并与周围神经病专科医师、非专科神经科医师对比（医师可在看到ChatGPT-4o建议后修改答案）。ChatGPT-4o首选诊断准确率65.5%，与非专科医师（63.0%）相当但低于专科医师（74.0%，p=0.002）；鉴别诊断准确率优于非专科医师（82.0% vs 77.5%，p=0.043），推荐的确诊检查也更恰当（68.0% vs 53.0%，p<0.001）。非专科医师在参考ChatGPT-4o输出后修改了21.8%的病例判断并提升了准确率。

> **要点**：ChatGPT-4o首选诊断准确率65.5%，低于专科医师的74.0%（p=0.002），但促使非专科医师修正21.8%的病例并提高准确率。

### 4. 可解释的微调大语言模型辅助罕见病基因检测决策

*Interpretable fine-tuned large language models facilitate making genetic test decisions for rare diseases.*

**npj Digital Medicine** · 2026-05-19 · 原创研究 · [PMID 42156861](https://pubmed.ncbi.nlm.nih.gov/42156861/) · [DOI](https://doi.org/10.1038/s41746-026-02733-z)

针对罕见病诊断中依据 ACMG 指南在基因 panel 与全外显子/全基因组测序（WES/WGS）之间选择的难题，作者提出 RareDAI：整合非结构化病历文本与结构化 Phecode，用 7 个领域特异问题引导 Llama 3.1 与 Qwen 3 生成结构化思维链（CoT），再通过自蒸馏微调（SDFT）使模型先输出可解释推理再给出推荐。在院内与外部数据集上，RareDAI 在准确率、精确率、召回率与 F1 等全部指标上较传统监督微调及 Llama 3.1、GPT-4 等基线提升最高达 10–20%。

> **要点**：RareDAI 通过思维链自蒸馏微调，在基因检测选择任务上各项指标较基线 LLM 提升 10–20%，且推理过程可解释。

### 5. 大语言模型生成的医学解释对放射科诊断准确性的影响

*The effect of medical explanations from large language models on diagnostic accuracy in radiology.*

**npj Digital Medicine** · 2026-04-23 · 随机对照试验 · [PMID 42026140](https://pubmed.ncbi.nlm.nih.gov/42026140/) · [DOI](https://doi.org/10.1038/s41746-026-02619-0)

该大规模随机实验让放射科医生阅读含影像的患者病例（共N=2,020次评估），随机分配至无LLM支持的对照组，或三种LLM解释格式之一：仅给出诊断的标准输出、比较多个可能诊断的鉴别诊断、以及提供详细推理过程的思维链解释。解释格式显著影响诊断准确率：思维链表现最佳，较无LLM支持的对照条件提高12.2%（P=0.001），也优于无解释的标准输出（+7.2%，P=0.040）和鉴别诊断格式（+9.7%，P=0.004）。结果在不同病例难度和放射科医生背景（全科vs专科）间保持稳健，说明展示推理过程有助于医生识别并纠正LLM的错误预测。

> **要点**：思维链式LLM解释使放射科医生诊断准确率较无AI对照提高12.2%（P=0.001），优于标准输出（+7.2%）和鉴别诊断格式（+9.7%）。

### 6. 面向急诊神经科诊断的领域专用大语言模型的开发与前瞻性影子评估

*Development and prospective shadow evaluation of a domain-specific large language model for emergency neurological diagnosis.*

**npj Digital Medicine** · 2026-04-18 · 原创研究 · [PMID 42000879](https://pubmed.ncbi.nlm.nih.gov/42000879/) · [DOI](https://doi.org/10.1038/s41746-026-02644-z)

研究开发了定制化大语言模型Xuanwu-NeuroAid，并前瞻性纳入433例患者，将模型与急诊医生的诊断输出同确诊诊断进行比较，同时由专家组对双方给出的建议进行盲法评价。模型独立诊断准确率为79.4%，显著高于急诊医生的65.4%（p<0.001）；盲法专家评估显示模型在检查与治疗建议的全面性、准确性和临床适用性上均显著优于医生（p<0.001）。此外，纳入人口学信息会改变模型的健康教育建议，提示其对社会人口学因素具有敏感性。研究已在ClinicalTrials.gov注册（NCT06779292）。

> **要点**：Xuanwu-NeuroAid在433例前瞻性急诊患者中独立诊断准确率79.4%，显著高于急诊医生的65.4%（p<0.001）。

### 7. 从工具到队友：临床医生-AI协作诊断工作流的随机对照试验

*From tool to teammate in a randomized controlled trial of clinician-AI collaborative workflows for diagnosis.*

**npj Digital Medicine** · 2026-03-18 · 随机对照试验 · [PMID 41851268](https://pubmed.ncbi.nlm.nih.gov/41851268/) · [DOI](https://doi.org/10.1038/s41746-026-02545-1)

该研究开展了一项纳入70名临床医生的随机对照试验，评估一套用于协作式诊断推理的定制LLM系统：医生与AI先各自独立作出诊断，再由AI生成整合双方观点、标注一致与分歧并给出评述的综合意见。研究比较了“AI作为第一意见”（先于医生）与“AI作为第二意见”（后于医生）两种工作流，二者的医生诊断准确率分别为85%和82%，均高于使用常规资源的75%，且与AI单独诊断的90%无统计学差异。定性分析进一步说明工作流设计如何塑造人机交互方式。

> **要点**：两种人机协作工作流将医生诊断准确率从75%提升至85%和82%，接近AI单独作答的90%。

### 8. 大语言模型与医疗专业人员在诊断和分诊中的独立表现及协作表现

*Independent and collaborative performance of large language models and healthcare professionals in diagnosis and triage.*

**npj Digital Medicine** · 2026-02-06 · 系统评价/Meta分析 · [PMID 41652180](https://pubmed.ncbi.nlm.nih.gov/41652180/) · [DOI](https://doi.org/10.1038/s41746-026-02409-8)

这项系统评价与Meta分析检索了 7 个数据库 2020 年 1 月至 2025 年 9 月的研究，比较 LLM、医疗专业人员（HCP）及二者协作的诊断与分诊准确性（排除选择题形式），从 10,398 篇筛出 50 项研究、涉及 25 个 LLM。LLM 相对 HCP 的诊断准确性随候选诊断数递增而改善：top-1 为 0.89（95% CI 0.79–1.00），top-3 0.91，top-5 1.04，top-10 1.17。LLM 辅助的 HCP 优于 HCP 单独：top-1 相对准确性 1.13（1.00–1.27）、top-3 1.11（1.01–1.23）、top-5 1.42（1.16–1.73）；分诊准确性两者相当（1.01, 0.94–1.09）。

> **要点**：LLM 辅助医生显著优于医生单独（top-3 相对准确性 1.11, 95% CI 1.01–1.23），但研究方法学缺陷要求临床落地前开展严格真实世界评估。

### 9. 临床医学中的人类-大语言模型协作：系统评价与Meta分析

*Human-large language model collaboration in clinical medicine: a systematic review and meta-analysis.*

**npj Digital Medicine** · 2026-01-28 · 系统评价/Meta分析 · [PMID 41606089](https://pubmed.ncbi.nlm.nih.gov/41606089/) · [DOI](https://doi.org/10.1038/s41746-026-02382-2)

研究遵循 PRISMA 2020（PROSPERO: CRD420251068272）检索 4 个数据库至 2025 年 6 月 28 日，比较「人类+LLM」（H+AI）与「纯人类」工作流，最终纳入 10 项同行评审研究（3 篇预印本仅用于敏感性分析）。诊断/判读准确性（k=2）呈正向趋势但不显著（RR 1.59, 95% CI 0.08–32.74）；诊断/管理综合评分（k=2）显著改善（MD +4.88 个百分点, 95% CI +0.65 至 +9.12），但预测区间宽达 −31.65 至 41.42；时间效率无差异（MD +0.4 分钟, 95% CI −4.18 至 +4.97, I²=70.1%）。文书质量虽改善，但事实性错误率仍高达约 26%–36%。

> **要点**：人机协作使诊断/管理综合评分提升 4.88 个百分点，但事实性错误率仍达 26%–36%，效率无提升且证据高度不确定。

### 10. 放射学中大推理模型(LRM)基于结论进行推理带来的诊断与判读增益

*Diagnostic and interpretive gains from reasoning over conclusions with a large reasoning model in radiology.*

**npj Digital Medicine** · 2025-12-31 · 原创研究 · [PMID 41476119](https://pubmed.ncbi.nlm.nih.gov/41476119/) · [DOI](https://doi.org/10.1038/s41746-025-02285-8)

研究评估大推理模型(LRM)能否减少放射科医师对肿瘤分期与管理相关次要征象的漏诊。研究纳入中国3家医院的900例多中心肿瘤病例，比较LRM的推理过程输出与其仅给结论的形式，以及2个非推理模型；由3名高年资放射科医师评估诊断错误与质量属性，并开展6名放射科医师参与的人机协同研究，另用英文MIMIC-Cancer-90队列检验跨语言泛化。结果显示推理过程输出的漏诊与误分类最少，在全面性、可解释性与无偏性上评分最高（但简洁性下降）；仅使用结论时性能下降，非推理模型各项指标均较差，且改善在不同癌种、影像模态、机构与语言间保持一致，阅片者研究证实其完整性与推理清晰度更佳（初级医师尤为明显），但存在需优化的工作流耗时成本。

> **要点**：LRM显式推理过程较仅输出结论及非推理模型漏诊/误分类更少、可解释性更佳，且跨机构与跨语言一致，但增加工作流负担。

### 11. ARTEMIS：在神经内分泌肿瘤模拟临床病例中比较AI与专家治疗决策的先导研究

*ARTEMIS: a pilot study comparing AI-based and expert therapeutic decisions in simulated clinical cases of neuroendocrine neoplasms.*

**npj Digital Medicine** · 2025-12-23 · 原创研究 · [PMID 41436590](https://pubmed.ncbi.nlm.nih.gov/41436590/) · [DOI](https://doi.org/10.1038/s41746-025-02274-x)

该横断面先导研究使用20例非手术模拟病例，比较基线GPT、内置静态领域知识的定制GPTs与检索增强GPT（RAG）三种配置与9位意大利神经内分泌肿瘤专家的治疗决策，主要终点为系统治疗推荐的非劣效性。RAG与GPTs的一致率为70.0%（专家基准63.8%），达到探索性-10%非劣效界值但未达更严格的-5%界值；基线GPT为60.0%，未达非劣效。所有AI系统的推荐更完整、更常表达不确定性，RAG建议的额外检查更少、费用更低；专家间变异大于AI，且Ki-67与分歧相关。

> **要点**：RAG与定制GPT的治疗推荐一致率70.0%（专家63.8%），达-10%非劣效界值但未达-5%，基线GPT仅60.0%。

### 12. 利用大语言模型诊断自闭症相关语言障碍并识别其独特特征

*Exploiting large language models for diagnosing autism associated language disorders and identifying distinct features.*

**npj Digital Medicine** · 2025-12-16 · 原创研究 · [PMID 41402439](https://pubmed.ncbi.nlm.nih.gov/41402439/) · [DOI](https://doi.org/10.1038/s41746-025-02133-9)

研究探索用大语言模型的自然语言理解能力辅助诊断自闭症（ASD）相关语言障碍，以克服传统评估主观性强、速度慢、精度有限的问题。在零样本学习配置下，所提方法较基线模型的敏感性与阳性预测值均提高超过10%。研究还跨场景识别出十个自闭症相关语言障碍的关键特征，其中模仿言语（echolalia）、代词反转和非典型用语对ASD诊断及个体化治疗方案制定具有关键作用。

> **要点**：零样本LLM方法诊断ASD相关语言障碍的敏感性与阳性预测值较基线提升超过10%，并识别出echolalia等10个关键语言特征。

### 13. 大语言模型从非结构化临床记录中检测术后谵妄的效能：一项回顾性队列研究

*Efficacy of large language models in detecting postoperative delirium from unstructured clinical notes: A retrospective cohort study.*

**npj Digital Medicine** · 2025-12-12 · 队列研究 · [PMID 41388138](https://pubmed.ncbi.nlm.nih.gov/41388138/) · [DOI](https://doi.org/10.1038/s41746-025-02231-8)

该回顾性观察性队列研究比较了Llama-3-70B、GPT-4o与医师在预测具有临床意义的术后谵妄（POD，定义为需用抗精神病药或经神经科会诊确诊）方面的表现。两个模型的c统计量分别为0.74和0.76，敏感性高于医师（0.900、0.868 vs 0.723）但特异性较低（0.463、0.547 vs 0.814）；评价者间一致性在两个LLM中近乎完美（Fleiss' kappa 0.852和0.854），而医师仅为一般（0.219）。两个LLM检出POD的时间比医师约早一天（中位诊断时间34.5h、37.5h vs 62.9h，log-rank P<0.001）。

> **要点**：LLM检测术后谵妄的c统计量为0.74–0.76，敏感性0.87–0.90高于医师0.72，并比医师早约1天发现（P<0.001）。

### 14. 医师在临床决策中使用AI聊天机器人的输入方式类型学

*A typology of physician input approaches to using AI chatbots for clinical decision-making.*

**npj Digital Medicine** · 2025-12-05 · 原创研究 · [PMID 41350807](https://pubmed.ncbi.nlm.nih.gov/41350807/) · [DOI](https://doi.org/10.1038/s41746-025-02184-y)

本研究探讨医师在临床推理任务中如何使用LLM聊天机器人，以及输入中包含的病例信息量是否影响表现。研究先对美国医师进行半结构化访谈以构建输入方式类型学，再对两项随机对照试验的医师聊天记录逐例编码，并用线性混合效应模型比较不同输入方式的病例得分。共识别出四类输入方式：整例复制粘贴者(copy-paster)、选择性复制粘贴者、自行总结者(summarizer)和短查询检索者(searcher)，其中整例复制与短查询检索最常用。结果显示没有任何一种输入方式与更高的病例得分相关，提示提示策略、认知投入程度和对输出的解读等因素可能影响更大。

> **要点**：四类LLM输入方式（整例粘贴/选择性粘贴/自行总结/短查询）均未与更高的临床病例得分相关。

### 15. 人工智能在自身免疫性疾病中的应用

*Artificial intelligence for autoimmune diseases.*

**npj Digital Medicine** · 2025-10-24 · 综述/观点 · [PMID 41136754](https://pubmed.ncbi.nlm.nih.gov/41136754/) · [DOI](https://doi.org/10.1038/s41746-025-02015-0)

本文综述生成式人工智能在自身免疫与风湿性疾病的临床诊疗、科研与行政管理各领域的应用前景，认为其可超越传统的窄域AI，生成情境化的临床内容以支持广泛的医疗任务。文章同时指出落地实施仍面临重大挑战，包括临床验证、模型可解释性、数据整合的复杂性以及不断演变的监管框架。

> **要点**：生成式AI在风湿免疫病诊疗中潜力广泛，但受制于临床验证、可解释性与监管框架等落地障碍。

### 16. GutGPT——一种用于消化道出血的生成式AI工具的随机试验：可用性与采纳度

*Usability and adoption in a randomized trial of GutGPT a GenAI tool for gastrointestinal bleeding.*

**npj Digital Medicine** · 2025-08-18 · 随机对照试验 · [PMID 40825997](https://pubmed.ncbi.nlm.nih.gov/40825997/) · [DOI](https://doi.org/10.1038/s41746-025-01896-5)

该基于模拟场景的随机试验评估生成式AI增强的临床决策支持系统GutGPT相较AI仪表盘能否提升在急性上消化道出血管理中的采纳度，主要结局为UTAUT模型中的行为意向。106名临床受训者被随机分配（GutGPT组52人、对照组54人）完成三个病例。GutGPT组的努力期望（Effort Expectancy）更高，但两组行为意向无显著差异；定性分析突出了信任与工作流程方面的顾虑，提示仅靠可用性不足以驱动采纳（注册号NCT05816473）。

> **要点**：106名受训者的随机试验中GutGPT可用性更优但行为意向与AI仪表盘无显著差异，说明可用性本身不足以推动采纳。

### 17. 将大语言模型作为肿瘤学临床决策支持：Woollie模型

*Incorporating large language models as clinical decision support in oncology: the Woollie model.*

**npj Digital Medicine** · 2025-08-18 · 社论/评论 · [PMID 40825846](https://pubmed.ncbi.nlm.nih.gov/40825846/) · [DOI](https://doi.org/10.1038/s41746-025-01941-3)

这是一篇社论，评述Zhu等人新开发的大语言模型Woollie：该模型使用纪念斯隆-凯特琳癌症中心的放射学印象报告进行微调，并在加州大学旧金山分校的肿瘤学数据集上完成外部验证。社论认为其方法重视数据准确性、防止灾难性遗忘，在预测多种癌症进展方面展现出严谨性。作者认为这项工作为大语言模型在肿瘤学中可靠、可扩展且公平的应用奠定了基础。

> **要点**：社论认为经微调并外部验证的Woollie模型为LLM在肿瘤学决策支持中的可靠、可扩展应用奠定基础。

### 18. 评估大语言模型在中医诊断与治疗推荐中的作用

*Evaluating the role of large language models in traditional Chinese medicine diagnosis and treatment recommendations.*

**npj Digital Medicine** · 2025-07-21 · 基准/评估 · [PMID 40691277](https://pubmed.ncbi.nlm.nih.gov/40691277/) · [DOI](https://doi.org/10.1038/s41746-025-01845-2)

研究以一个真实针灸病例评估7个公开可用大语言模型在西医诊断、中医诊断、选穴、针刺手法和中药五个维度的表现，并与3位专业针灸师的作答对比，由来自中国、韩国和美国的28位专家评审通过多语言问卷评分。结果显示LLM在西医诊断上与针灸师表现相当，在中医特异性任务上表现参差；GPT-4o、Qwen 2.5 Max和Doubao 1.5 Pro与专家评价的一致性最高，尤其在中医诊断和选穴方面。研究提示通用LLM有潜力支持具有文化特异性的医疗决策并降低中医服务的可及性壁垒。

> **要点**：7个LLM在西医诊断上与针灸师相当，GPT-4o、Qwen 2.5 Max和Doubao 1.5 Pro在中医诊断与选穴上与专家一致性最高。

### 19. 大语言模型在癌症决策中的整合：系统评价与Meta分析

*Large language model integrations in cancer decision-making: a systematic review and meta-analysis.*

**npj Digital Medicine** · 2025-07-17 · 系统评价/Meta分析 · [PMID 40676129](https://pubmed.ncbi.nlm.nih.gov/40676129/) · [DOI](https://doi.org/10.1038/s41746-025-01824-7)

该系统评价检索PubMed、Web of Science、Scopus和ACM数字图书馆至2024年5月的文献，纳入56项研究、覆盖15种癌症类型，考察LLM在肿瘤学中的整合方式及研究者的评估方法。Meta分析显示LLM常被用于总结、翻译和传达临床信息，但性能参差：平均总体准确率为76.2%，而平均诊断准确率更低，仅67.4%，反映其临床成熟度不足。多数评估依赖定量数据集和自动化方法而缺乏人工评分，侧重“准确性”和“恰当性”，很少涉及“安全性”“伤害”或“清晰度”。作者呼吁建立开放数据集与标准化评估以提升可靠性。

> **要点**：56项研究的Meta分析显示LLM在肿瘤决策中平均总体准确率76.2%、诊断准确率仅67.4%，临床成熟度不足。

---

## 二、医学智能体（Agentic AI）与多智能体系统（24 篇）

### 1. 临床实践中的AI智能体：一张证据图谱

*AI agents in clinical practice: an evidence map*

**npj Digital Medicine** · 2026-07-13 · 综述/观点 · *PubMed 未索引* · [DOI](https://doi.org/10.1038/s41746-026-02960-4)

该观点文章系统梳理了自主AI系统（agentic AI）在诊断、疾病管理及诊疗辅助运营三大领域的证据分布，绘制出一张“证据图谱”。作者指出，目前的落地部署高度集中于行政/事务性工作流，但智能体应用正沿着完整的患者诊疗路径快速扩张。文章强调，若要让智能体负责任地进入临床，前瞻性治理、可审计性与临床医生监督是必要条件。

> **要点**：Agentic AI 当前落地集中于行政流程，向临床全路径扩张，亟需治理、可审计与人类监督。

### 2. 手术室中的人形机器人：外科具身AI分阶段整合框架

*Humanoid robots in the operating room: a framework for staged integration of embodied AI in surgery*

**npj Digital Medicine** · 2026-07-13 · 综述/观点 · *PubMed 未索引* · [DOI](https://doi.org/10.1038/s41746-026-02853-6)

作者提出，外科创新的下一次跃迁可能不来自精度的进一步提升，而来自“具身AI（embodied AI）”对手术室本身的改造。文章提出一个分阶段部署框架：智能人形智能体先经过临床前验证，再承担低风险任务，随后逐步推进到风险较高的辅助角色。该框架为通用具身AI在高风险临床环境中的自主性整合提供了现实路径，并讨论了其挑战与影响。

> **要点**：提出人形/具身AI进入手术室的分阶段（临床前→低风险→高风险辅助）部署框架。

### 3. KGRD：一个用于儿童罕见遗传病诊断与咨询的知识图谱增强自动推理框架

*KGRD: a knowledge-graph-augmented automated reasoning framework for diagnosis and counselling of paediatric rare genetic disorders.*

**npj Digital Medicine** · 2026-07-02 · 原创研究 · [PMID 42393263](https://pubmed.ncbi.nlm.nih.gov/42393263/) · [DOI](https://doi.org/10.1038/s41746-026-02943-5)

针对常规LLM在罕见病上易产生“常见病注意力偏倚”的问题，研究提出知识图谱增强的诊断支持框架KGRD，包含3个针对疾病病因进行演绎推理的专用智能体，以及整合多学科讨论与多源验证的集体决策模块，可对患者层面的基因组与表型数据进行知识驱动和数据驱动推理。在420例罕见病病例的验证基准上，KGRD(DS)整体表现最佳，将首位诊断的平均Bond评分从3.27提升至3.85，CIE从73.6%提升至81.9%，相当于新增35例候选诊断Bond评分≥4的病例。

> **要点**：多智能体+知识图谱的KGRD在420例罕见病中将首位诊断Bond评分从3.27提升至3.85、CIE从73.6%升至81.9%。

### 4. 用于急诊科临床决策支持的知识与数据协同自主AI智能体

*An autonomous AI agent for knowledge and data cooperation in ED clinical decision support.*

**npj Digital Medicine** · 2026-06-12 · 原创研究 · [PMID 42286154](https://pubmed.ncbi.nlm.nih.gov/42286154/) · [DOI](https://doi.org/10.1038/s41746-026-02869-y)

研究开发了一个自主AI智能体，将既有的医学知识图谱与动态临床数据融合成包含超过800,000个节点的混合图谱，利用大语言模型完成知识抽取与语义映射，并动态选择最相关的图谱来驱动急诊场景下的识别、预测与决策专用工具。相较最先进基线，该智能体在急诊分诊上平均提升23.13%，在药物-药物相互作用检测上提升13.05%，在再入院预测上提升1.58%，在用药推荐上提升5.47%，在所有任务类别上均表现更优。研究证明了在急诊医疗中协同已有医学知识与动态临床数据的有效框架。

> **要点**：融合80万+节点混合知识图谱的自主AI智能体在急诊分诊上较SOTA基线提升23.13%，并在全部四类任务上均优于基线。

### 5. 推理能力如何赋能内镜手术中的AI副驾机器人

*How can reasoning capability empower the AI copilot robot in endoscopic surgery.*

**npj Digital Medicine** · 2026-06-11 · 社论/评论 · [PMID 42277237](https://pubmed.ncbi.nlm.nih.gov/42277237/) · [DOI](https://doi.org/10.1038/s41746-026-02827-8)

这篇通讯探讨了推理能力在基于视觉-语言-动作（VLA）模型的AI副驾机器人中的潜力，指出该能力虽已在通用领域显著推进复杂逻辑推理与机器人决策，但在内镜手术中的应用尚未被探索。作者认为，有效的推理应使AI副驾机器人能够整合多模态线索、理解手术意图并推断隐匿的组织动态，从而缓解术中不确定性与外科医生的认知负担；若实现得当，推理驱动的自主性可将AI副驾从被动执行者转变为认知协作者，提升临床实践的精准性、安全性与可持续性。

> **要点**：观点性通讯：推理驱动的VLA副驾机器人有望从被动执行者转变为内镜手术中的认知协作者。

### 6. 从原始音频到结构化文本：一种提升医学LLM性能的智能体流水线

*From raw audio to structure: an agent-based pipeline that boosts medical LLM performance.*

**npj Digital Medicine** · 2026-06-08 · 原创研究 · [PMID 42259903](https://pubmed.ncbi.nlm.nih.gov/42259903/) · [DOI](https://doi.org/10.1038/s41746-026-02867-0)

研究构建了由Planner、Memory、Executor三模块协同的智能体转写框架，将原始非结构化医患对话转写(RUCT)自动转换为适合LLM微调的结构化转写(SCT)，涵盖降噪、内容纠错、说话人识别与对话分段的自纠正流程。在8个科室共7197分钟中文临床录音（另加240分钟英文对话做可移植性检验）上，智能体降噪准确率94.7%、内容纠错96.9%、说话人识别88.6%、分段92.7%，速度比人工快3.6倍，并稳定优于级联深度学习流水线、非智能体顺序执行与端到端长上下文模型；消融显示移除Planner或Memory后说话人识别最多下降47.6%。用SCT微调Qwen3-32B后，盲法专家在6个临床维度的总体质量评分由3.1升至3.7（P<0.001，Fleiss' κ=0.82），并在外部基准HealthBench上优于RUCT微调与未微调基线。

> **要点**：智能体结构化语料使Qwen3-32B微调后的专家质量评分由3.1提升至3.7（P<0.001）。

### 7. 面向临床预测模型的人机协同设计（HACHI）

*Human-AI co-design for clinical prediction models.*

**npj Digital Medicine** · 2026-06-06 · 原创研究 · [PMID 42251137](https://pubmed.ncbi.nlm.nih.gov/42251137/) · [DOI](https://doi.org/10.1038/s41746-026-02838-5)

研究提出HACHI，一种人在环的迭代框架，利用AI智能体从临床自由文本病历中加速构建完全可解释的临床预测模型（定义为由"是/否"问题构成的线性模型）。框架在"智能体用统计工具与内嵌知识探索候选概念"与"领域专家反馈纠偏"之间交替，以透明性、可操控性与双向学习为优化目标。在急性肾损伤与创伤性脑损伤两个真实预测任务中，HACHI优于现有方法，发现了临床相关概念，并改善了跨机构与跨时间段的泛化性；同时凸显人工监督在引导概念探索、调整概念粒度以及识别数据偏倚与泄漏方面的关键作用。

> **要点**：AI智能体与专家迭代协作可从临床文本构建可解释预测模型，在AKI与TBI任务上优于现有方法并提升跨站点泛化。

### 8. 重新思考眼科人工智能中的规模：从更大的模型到更聪明的临床推理

*Rethinking scale in ophthalmic artificial intelligence: from bigger models to smarter clinical reasoning.*

**npj Digital Medicine** · 2026-05-10 · 综述/观点 · [PMID 42106570](https://pubmed.ncbi.nlm.nih.gov/42106570/) · [DOI](https://doi.org/10.1038/s41746-026-02755-7)

该观点性综述指出，眼科AI 近年基准性能不断提升，但临床信任依然有限。作者主张研究方向应超越数据与模型规模的扩张，转向可信、技能高效的系统，融合多模态证据、外部知识与不确定性感知推理；并认为眼科是 agentic AI（智能体式AI）的良好试验场，但要安全落地必须有严格验证、工作流整合以及与真实决策相匹配的评估框架。

> **要点**：主张眼科AI 从堆规模转向可信的多模态、不确定性感知的智能体式临床推理，并需面向真实决策的评估框架。

### 9. 用于自动生成药物基因组学用药推荐的智能体AI系统

*An agentic AI system for automated pharmacogenomic recommendation generation.*

**npj Digital Medicine** · 2026-04-15 · 原创研究 · [PMID 41986608](https://pubmed.ncbi.nlm.nih.gov/41986608/) · [DOI](https://doi.org/10.1038/s41746-026-02590-w)

针对药物基因组学指南人工审编流程耗时费力、覆盖有限的问题，研究提出一个由大语言模型驱动、以结构化证据为引导的智能体AI系统，自动、可扩展地生成CPIC风格的用药推荐。其模块化流水线可检索并处理生物医学全文文献与FDA药品说明书，高准确率抽取临床相关实体（22篇文献上达91.9%），跨研究聚合证据，并为基因-药物对生成特定表型的剂量建议。在对24条随机抽取推荐的专家评估中，该系统在临床清晰度和指南一致性上显著优于GPT-5、Claude、Grok等领先LLM基线。

> **要点**：智能体系统实体抽取准确率达91.9%，生成的药物基因组学推荐在临床清晰度与指南一致性上显著优于GPT-5/Claude/Grok基线。

### 10. EcoRxAgent：用于生成经济可替代处方的AI智能体

*EcoRxAgent: an AI agent for generating economically substitutable prescriptions.*

**npj Digital Medicine** · 2026-04-08 · 原创研究 · [PMID 41951898](https://pubmed.ncbi.nlm.nih.gov/41951898/) · [DOI](https://doi.org/10.1038/s41746-026-02612-7)

针对药价上涨以及疗效相似但价格差异巨大的用药选择带来的处方优化需求，研究开发了AI智能体EcoRxAgent来生成经济上可替代的处方。该智能体通过顺序流水线运行：检索候选药物、生成候选处方集、严格进行安全性核查、开展成本效果分析，最终输出所有经安全校验且总费用更低的处方。在两个独立队列共1,559张处方上的实验显示，智能体生成的处方在治疗上不劣于医生原处方，同时总药费显著下降14.40%–40.14%，展示了AI智能体在医疗领域创造实际经济效益的潜力。

> **要点**：EcoRxAgent在1,559张处方上生成疗效非劣的替代方案，总药费降低14.40%–40.14%。

### 11. 用于生物医学概念映射的神经-符号AI智能体系统

*A neural-symbolic AI agent system for biomedical concept mapping.*

**npj Digital Medicine** · 2026-04-04 · 原创研究 · [PMID 41935204](https://pubmed.ncbi.nlm.nih.gov/41935204/) · [DOI](https://doi.org/10.1038/s41746-026-02594-6)

针对规则系统可解释但难以处理歧义与规模、学习型方法在长尾概念上表现差且可解释性有限的问题，研究提出Medical Concept Mapping（MCM）——一种智能体工作流，先用语言模型把含糊的提及改写为明确、标准化的描述，再进行概念链接。在MedMentions、ST21pv和MCN三个基准上，MCM的Recall@1分别达63.3、60.0和67.9，优于KrissBERT、SciSpaCy、USAGI等最先进基线；在零样本缩写提及上，其Recall@1最多超出基线24.8个百分点。人工评估显示79.4%的LLM扩写被认为合理且有用，其中GPT-OSS获得最高认可率（85.1%）。

> **要点**：MCM智能体工作流在三个基准上Recall@1达63.3/60.0/67.9，零样本缩写提及最多超基线24.8个百分点。

### 12. WiseMind：用于准确且富有共情的精神科诊断的知识引导多智能体框架

*WiseMind: a knowledge-guided multi-agent framework for accurate and empathetic psychiatric diagnosis.*

**npj Digital Medicine** · 2026-03-25 · 原创研究 · [PMID 41882314](https://pubmed.ncbi.nlm.nih.gov/41882314/) · [DOI](https://doi.org/10.1038/s41746-026-02559-9)

研究提出受辩证行为疗法启发的多智能体框架WiseMind，整合负责循证逻辑推理的“理性心智”智能体与负责共情沟通的“情绪心智”智能体，并以DSM-5引导的结构化知识图谱驱动诊断问询，从而显著减少幻觉。研究结合虚拟标准化病人、模拟交互与真实人机交互数据，在三种常见精神疾病上评估，共覆盖1206次模拟对话与180次真实用户会话。WiseMind的top-1诊断准确率达85.6%，接近已报道的执业精神科医师水平，并较知识增强的单智能体基线高出15-54个百分点；精神科专家评审确认其回复既临床合理又具心理支持性。

> **要点**：WiseMind多智能体框架top-1诊断准确率85.6%，比知识增强的单智能体基线高15-54个百分点。

### 13. 智能体人工智能（Agentic AI）在医疗中的作用：一项范围综述

*The role of agentic artificial intelligence in healthcare: a scoping review.*

**npj Digital Medicine** · 2026-03-14 · 系统评价/Meta分析 · [PMID 41832341](https://pubmed.ncbi.nlm.nih.gov/41832341/) · [DOI](https://doi.org/10.1038/s41746-026-02517-5)

该范围综述检索五个数据库，旨在厘清AI Agent与Agentic AI的概念差异并系统梳理其医疗应用，最终纳入7项符合条件的研究，覆盖急诊医学、肿瘤学、放射学和康复领域。纳入系统展现出自主运行、目标导向行为、主动发起动作以及部分多智能体协作等特征，报告的结果包括癌症诊断高准确率、治疗规划、预警生成、健康指导与流程优化。但多数研究属探索性、范围有限且缺乏严格的临床验证，仅有1项试验纳入真实患者，提示该领域亟需标准化定义、监管指引和严谨评估。

> **要点**：仅7项研究入选，Agentic AI在医疗中潜力与不成熟并存，仅1项试验涉及真实患者。

### 14. 在新加坡国家预防保健计划中使用智能体AI制定个性化健康计划：一项试点研究

*Personalised health plan development using agentic AI in Singapore's national preventive care programme: a pilot study.*

**npj Digital Medicine** · 2026-03-09 · 原创研究 · [PMID 41803278](https://pubmed.ncbi.nlm.nih.gov/41803278/) · [DOI](https://doi.org/10.1038/s41746-026-02514-8)

研究实现了一个由多智能体框架驱动的数字助手，可根据用户交互生成并迭代优化个性化健康计划，以支持从被动医疗向预防性医疗的转型。在20名居民和7名临床医生参与的试点中，两组对四项成功指标的评分均显著高于中性满意度水平（p<0.05）。多数居民认可其个性化程度（p=0.003）与建议的细致度（p=0.0003），且未对推荐计划表达重大顾虑（p=0.941）；超过50%的反馈对个性化饮食（p=0.110）、个性化运动（p=0.003）和总体功能（p=6e-06）持正面情绪。

> **要点**：20名居民与7名临床医生的试点中，多智能体个性化健康计划的四项指标评分均显著高于中性水平（p<0.05）。

### 15. 用 Agentic AI 重塑精神科诊疗：前景、挑战与路线图

*Reimagining psychiatric care with agentic AI: promise, challenges, and a roadmap forward.*

**npj Digital Medicine** · 2026-02-16 · 综述/观点 · [PMID 41699048](https://pubmed.ncbi.nlm.nih.gov/41699048/) · [DOI](https://doi.org/10.1038/s41746-026-02453-4)

这是一篇观点性综述，界定了区别于传统决策支持与完全自主系统的「精神科专属 Agentic AI」，综合了现有研究证据。文章提出智能体在文书记录、个体化治疗、持续监测与扩大可及性方面的潜力，同时指出偏倚、可解释性、隐私与治疗联盟受损等风险，并提出辅助型、协作型与半自主型三类角色定位及负责任落地的路线图。

> **要点**：精神科是 Agentic AI 的高风险试验场，作者提出辅助/协作/半自主三级角色框架与负责任实施路线图。

### 16. 迈向整合式睡眠健康：「行好梦」智能体中的多模态 AI

*Toward integrated sleep health: multimodal AI in Hang Hao Meng agent.*

**npj Digital Medicine** · 2026-02-09 · 综述/观点 · [PMID 41663720](https://pubmed.ncbi.nlm.nih.gov/41663720/) · [DOI](https://doi.org/10.1038/s41746-026-02432-9)

这篇观点文章介绍了「行好梦」（Hang Hao Meng）——一个用于睡眠健康全流程患者管理的 AI 专家智能体，融合大语言模型、多模态分析与数字人交互界面，提供从筛查到个体化治疗的端到端服务。该智能体已规模化部署，累计为超过 400 万人提供分诊服务，完成 9 万余次筛查。

> **要点**：睡眠健康智能体「行好梦」已为超 400 万人分诊、完成 9 万余次筛查，展示了可规模化的多模态 AI 专科智能体范式。

### 17. Agentic AI 可帮助医院应对前所未有的极端天气

*Agentic AI can help hospitals prepare for unprecedented weather.*

**npj Digital Medicine** · 2026-01-23 · 综述/观点 · [PMID 41577836](https://pubmed.ncbi.nlm.nih.gov/41577836/) · [DOI](https://doi.org/10.1038/s41746-026-02391-1)

这篇通讯指出，随着气候变化加剧，医疗系统将面临超出现有应急预案假设的极端气候事件；传统基于情景的应急预案对多数事件仍然适用，但在意外危机中可能失效，因此需要基于阈值（threshold-based）的响应框架。作者认为，新兴的 AI 智能体技术为构建此类系统提供了机会，可推动医院气候应急准备的范式转变。

> **要点**：作者主张用 AI 智能体驱动的「阈值触发式」框架取代传统情景预案，提升医院对极端天气的韧性。

### 18. 基于多智能体系统的基层医疗中轴性脊柱关节炎早期诊断

*Early diagnosis of axial spondyloarthritis in primary care using multi-agent systems.*

**npj Digital Medicine** · 2026-01-22 · 原创研究 · [PMID 41571772](https://pubmed.ncbi.nlm.nih.gov/41571772/) · [DOI](https://doi.org/10.1038/s41746-026-02372-4)

针对轴性脊柱关节炎全球平均6.7年的诊断延迟，研究开发并验证了SpAgents——整合大语言模型与影像模型的多智能体早期诊断系统，包含PlannerAgent、DataAgent、ToolAgent和DoctorAgent，并由长期记忆模块支持知识动态更新。共纳入596例患者：单中心545例分为训练集（n=359）与验证集（n=186），另有5家医院的51例作为独立测试集。SpAgents验证集敏感度0.8615、特异度0.8000，测试集分别为0.9375和0.7368；其敏感度（0.9400）与准确率（0.8600）显著高于基层医生和低年资风湿科医师，整体表现与高年资风湿科医师相当，且在其辅助下基层医生与低年资医师的敏感度和准确率均明显提升。

> **要点**：SpAgents诊断敏感度0.94、准确率0.86，优于基层医生与低年资风湿科医师，与高年资专家相当。

### 19. LLM驱动的知识增强癌痛评估与管理协作框架

*LLM-driven collaborative framework for knowledge-enhanced cancer pain assessment and management.*

**npj Digital Medicine** · 2026-01-19 · 原创研究 · [PMID 41554973](https://pubmed.ncbi.nlm.nih.gov/41554973/) · [DOI](https://doi.org/10.1038/s41746-026-02362-6)

研究开发了基于大语言模型的协作框架OncoPainBot，整合疼痛信息抽取、疼痛机制推理、治疗方案制定与安全核查四个专科智能体，模拟多位临床专家的推理与决策以完成全面的癌痛评估与管理。研究比较了7个LLM与3种检索增强生成（RAG）策略以确定最优配置，并在收集的516份真实癌痛电子病历上进行多维度验证。最终Claude-4结合RAG综合表现最佳，在语义一致性与循证推理多项指标上突出；OncoPainBot生成的报告与实际临床文书高度一致，镇痛推荐任务决策准确率达0.841，误差分析显示多数差异源自患者个体因素与监测建议而非药物选择错误。

> **要点**：OncoPainBot（Claude-4+RAG）在516份真实癌痛病历上镇痛推荐决策准确率达0.841，报告与临床文书高度一致。

### 20. KT-LLM：面向可审计肾移植建模的证据锚定序列文本框架

*KT-LLM: an evidence-grounded and sequence text framework for auditable kidney transplant modeling.*

**npj Digital Medicine** · 2026-01-10 · 原创研究 · [PMID 41520040](https://pubmed.ncbi.nlm.nih.gov/41520040/) · [DOI](https://doi.org/10.1038/s41746-025-02323-5)

研究提出KT-LLM可验证编排层，通过检索增强生成将知识访问限制于Banff肾移植病理参考、OPTN与SRTR政策文件，使决策锚定于带版本的权威来源，实现完整可审计并减少主观解释误差。系统协调三个可审计智能体：Agent-A（SRTR-MambaSurv）以线性时间推理主干进行离散时间生存与竞争风险预测以个性化随访安排；Agent-B（OPTN-BlackClust）用稳定深度嵌入聚类识别临床上不同的人群亚型；Agent-C（Policy-Ops）将OPTN/UNOS申报时限、SRTR报告节奏与Banff术语编码为可执行规则，返回通过、警告、失败结果及带版本证据。在去标识化的OPTN与UNOS队列上，KT-LLM在证据归因与预测校准方面优于强基线，并能在不过度外推的前提下识别黑人受者中的临床异质亚组。

> **要点**：KT-LLM以RAG锚定Banff/OPTN/SRTR权威文件，在证据归因与预测校准上优于强基线，实现可审计的肾移植决策支持。

### 21. 用于从临床病历中识别认知问题的自主智能体工作流

*An autonomous agentic workflow for clinical detection of cognitive concerns using large language models.*

**npj Digital Medicine** · 2026-01-07 · 原创研究 · [PMID 41501421](https://pubmed.ncbi.nlm.nih.gov/41501421/) · [DOI](https://doi.org/10.1038/s41746-025-02324-4)

研究构建了两种从临床病历中识别认知问题的大语言模型工作流：一是在三个模型（LLaMA 3.1 8B、LLaMA 3.2 3B、Med42 v2 8B）上进行迭代提示优化的专家驱动工作流；二是由五个专门智能体协同完成提示优化的自主智能体工作流。以Llama3.1在平衡的优化数据集上调优，并在反映真实患病率的独立数据集上验证。智能体工作流的验证集表现与专家驱动工作流相当（F1=0.74 vs 0.81），在优化集上更优（0.93 vs 0.87）；敏感度在两个数据集间从0.91降至0.62，显示患病率漂移对泛化性的显著影响。专家复判发现44%的表面假阴性实际上体现了临床上合理的推理。

> **要点**：自主智能体工作流性能接近专家驱动流程（F1 0.74 vs 0.81），但患病率漂移使敏感度由0.91降至0.62。

### 22. EvoMDT：用于多癌种结构化临床决策的自进化多智能体系统

*EvoMDT: a self-evolving multi-agent system for structured clinical decision-making in multi-cancer.*

**npj Digital Medicine** · 2026-01-07 · 原创研究 · [PMID 41501128](https://pubmed.ncbi.nlm.nih.gov/41501128/) · [DOI](https://doi.org/10.1038/s41746-025-02304-8)

研究提出EvoMDT多智能体系统以支持多学科肿瘤会诊（MDT）决策，其自进化循环可依据专家反馈与结局信号更新提示、共识权重和检索范围；各智能体对病灶级临床数据进行领域推理并结合结构化知识检索，由共识协议解决冲突并生成可溯源、证据关联的推荐。评估覆盖6个公开肿瘤学问答基准和4个真实数据集（乳腺、肝、肺、淋巴瘤），并进行单盲医师评价。EvoMDT优于Llama-3-70B、Claude-3、Med-PaLM 2等前沿LLM基线，指南符合度与语义对齐更好（BERTScore 0.62–0.68）、安全违规更少；医师评审认为其决策质量与人类MDT相当，同时将响应时间缩短30%–40%。

> **要点**：EvoMDT决策质量与人类MDT相当（BERTScore 0.62–0.68），响应时间缩短30%–40%，优于Med-PaLM 2等前沿基线。

### 23. MoMA：一种用于增强临床预测建模的多模态智能体混合架构

*MoMA: a mixture-of-multimodal-agents architecture for enhancing clinical prediction modelling.*

**npj Digital Medicine** · 2025-12-09 · 原创研究 · [PMID 41366502](https://pubmed.ncbi.nlm.nih.gov/41366502/) · [DOI](https://doi.org/10.1038/s41746-025-02219-4)

研究提出MoMA（Mixture-of-Multimodal-Agents）架构，利用多个大语言模型智能体处理多模态电子病历数据：由“专科智能体”把医学影像、化验结果等非文本模态转换为结构化文本摘要，再由“聚合智能体”结合临床记录生成统一的多模态摘要，最后由“预测智能体”产生临床预测。在多种模态组合与预测设置下评估，MoMA在三项基于私有数据集的预测任务上均优于现有方法，显示出更高的准确性与跨任务灵活性；摘要未报告具体数值指标。

> **要点**：由专科/聚合/预测三类LLM智能体组成的MoMA在3项多模态EHR临床预测任务上均优于现有方法。

### 24. CARE-AD：利用纵向临床病历预测阿尔茨海默病的多智能体大语言模型框架

*CARE-AD: a multi-agent large language model framework for Alzheimer's disease prediction using longitudinal clinical notes.*

**npj Digital Medicine** · 2025-08-24 · 原创研究 · [PMID 40849361](https://pubmed.ncbi.nlm.nih.gov/40849361/) · [DOI](https://doi.org/10.1038/s41746-025-01940-4)

研究提出CARE-AD多智能体大语言模型框架，通过分派专门的LLM智能体从纵向电子病历文本中抽取阿尔茨海默病（AD）相关的症状体征并进行领域特异性评估，模拟多方协作的诊断过程。回顾性评估显示，在首次AD诊断编码前10年预测发病风险时，CARE-AD的准确率为0.53，高于单模型基线的0.26–0.45。结果表明多智能体LLM系统可支持AD的早期风险评估，值得进一步整合入临床决策支持流程。

> **要点**：CARE-AD在AD首次确诊编码前10年预测发病的准确率为0.53，优于单模型基线的0.26–0.45。

---

## 三、基准测试、评估方法与模型性能评价（31 篇）

### 1. 人类与人工智能在心脏病学住院医师在职考试题目上的表现的心理测量学特征分析

*Psychometric characterization of human and artificial intelligence performance on cardiology residency in-service examination items.*

**npj Digital Medicine** · 2026-07-10 · 基准/评估 · [PMID 42432060](https://pubmed.ncbi.nlm.nih.gov/42432060/) · [DOI](https://doi.org/10.1038/s41746-026-03002-9)

研究用199道纯文本心脏病学住院医师在职考试题，以零样本、重复提问、严格多数表决方案评估5个LLM，并结合住院医师来源的心理测量学指标（经典难度、IRT潜在难度）分析。前沿模型准确率显著高于开源模型：Claude Opus 4.6为86.4%、Gemini 3.1 Flash-Lite为82.9%、GPT-5.4为81.9%，而MedQwen为53.3%、Qwen-3.5-35B仅18.6%；多因素分析显示题目难度是唯一与AI答对稳定相关的经典心理测量因素，IRT潜在难度越高模型准确率越低。人机题目层面相关性虽弱但高于置换零假设，模型错误集中于人类高排序干扰项；专家评定的解释质量与“以上都不是”扰动测试表明高考试分数并不等同于高质量推理与稳健性。

> **要点**：前沿LLM考试准确率达81.9%–86.4%，但题目难度主导其错误，且高分不代表解释质量与答案缺失识别能力可靠。

### 2. 在精神病理评估上将大语言模型与执业临床医生进行基准比较

*Benchmarking large language models against practicing clinicians on psychopathological assessment.*

**npj Digital Medicine** · 2026-07-07 · 基准/评估 · [PMID 42414575](https://pubmed.ncbi.nlm.nih.gov/42414575/) · [DOI](https://doi.org/10.1038/s41746-026-02852-7)

这项概念验证研究让10个LLM根据3场模拟精神科访谈的文字转录，对AMDP系统全部100个条目进行评估，并与108名早期职业临床医生（观看完整视听录像）比较，以专家共识小组为参考标准。GPT-5.1和Gemini-3-Pro-Preview准确率最高（0.72，处于临床医生分布的第64百分位）；GPT-5.1在抑郁、躁狂、精神分裂症场景的准确率分别为0.81/0.76/0.60，对应医生均值0.79/0.68/0.58。错误模式不同：医生倾向过度推断症状存在，LLM则更保守地标记条目“无法评估”（19.4% vs 11.4%，p<0.001）；在2091对医生的模拟分歧解决（35.5%存在分歧）中，LLM监督与专科医师监督均比随机选择更准确（p<0.0002）。

> **要点**：GPT-5.1在AMDP精神病理条目评估上准确率0.72，达临床医生第64百分位，且能有效辅助解决医生间分歧（p<0.0002）。

### 3. 医生与人工智能在真实临床病例上评价大语言模型时出现分歧

*Physicians and artificial intelligence diverge in evaluating large language models on real clinical cases.*

**npj Digital Medicine** · 2026-07-02 · 基准/评估 · [PMID 42393197](https://pubmed.ncbi.nlm.nih.gov/42393197/) · [DOI](https://doi.org/10.1038/s41746-026-02942-6)

针对当前医学LLM评估依赖多选题基准或合成病例、易高估性能的问题，研究开展了多中心多学科评估：400多名来自7个专科、不同资历和地域的医生，对LLM针对真实去标识化临床病例生成的自由文本回答进行评价；同时以匹配对照设计部署了数量相当、模仿医生特征的AI智能体评估者。结果显示医生评价存在显著异质性，随资历和执业环境不同导致模型相对排名明显变化；AI智能体评估虽高效且方向一致，但无法完全捕捉人类临床判断的细微差别，不能替代以医生为中心的评估，仅适合用于分诊或预筛以减轻人工负担。

> **要点**：400余名医生对LLM回答的评价异质性大且改变模型排名，AI智能体评估者方向一致但不能替代医生评估。

### 4. 大语言模型干预在实际应用中的临床结局与报告质量：一项系统证据图谱

*Clinical outcomes and reporting quality of large language model interventions in practice: a systematic evidence map.*

**npj Digital Medicine** · 2026-06-02 · 系统评价/Meta分析 · [PMID 42230743](https://pubmed.ncbi.nlm.nih.gov/42230743/) · [DOI](https://doi.org/10.1038/s41746-026-02837-6)

研究采用系统证据图谱方法，梳理2022年1月至2025年6月间评价LLM表现的已发表研究与注册临床试验所用的结局指标，共纳入55项研究。结果显示人机协作设计占主导（65.5%），主要用于决策支持与症状管理；纯LLM干预多聚焦功能性表现与流程/运营影响（如准确率、节省时间），而LLM辅助干预显示出积极临床效应，尤以心理健康终点为著。关键证据缺口包括：随机试验中的诊断准确率更低且波动更大（0.65–0.88），而非随机研究通常≥0.80；临床效率影响不一致；报告质量欠佳（CONSORT-AI平均依从率78.8%），在数据质量与性能错误处理方面存在关键遗漏。

> **要点**：55项研究中随机试验的LLM诊断准确率仅0.65–0.88（低于非随机研究的≥0.80），CONSORT-AI平均依从率仅78.8%。

### 5. 自动化评估可区分AI回答住院相关患者提问的优劣

*Automated evaluation can distinguish the good and bad AI responses to patient questions about hospitalization.*

**npj Digital Medicine** · 2026-05-30 · 基准/评估 · [PMID 42218285](https://pubmed.ncbi.nlm.nih.gov/42218285/) · [DOI](https://doi.org/10.1038/s41746-026-02727-x)

针对人工专家评审成本高、难以规模化的问题，研究系统检验了自动化评估AI回答患者住院相关问题的可行性。研究覆盖100个患者病例，收集了28个AI系统的共2800条自由文本回答，并从三个维度评估：是否回答了问题、是否恰当使用临床病历证据、是否运用一般医学知识。以临床医师撰写的参考答案为锚定，自动化指标给出的系统排名与人工评分高度一致，提示精心设计的自动化评估可规模化支持AI系统的横向比较并促进医患沟通。

> **要点**：以临床医师参考答案为锚定的自动化指标，对28个AI系统2800条回答的排名与人工评分高度吻合。

### 6. 大语言模型在HIV抗逆转录病毒治疗、药物相互作用与副作用场景中因果推理的一致性

*Consistency in causal reasoning for large language models in scenarios of HIV antiretroviral treatment, drug interactions, and side effects.*

**npj Digital Medicine** · 2026-05-27 · 基准/评估 · [PMID 42204276](https://pubmed.ncbi.nlm.nih.gov/42204276/) · [DOI](https://doi.org/10.1038/s41746-026-02771-7)

研究评估多个开源与闭源LLM（包括GPT-4o与LLaMA-3）在HIV抗逆转录病毒治疗(ART)相关药物相互作用与不良反应情境下，沿因果阶梯三个层级（关联、干预、反事实）进行因果推理的一致性。方法上先以语境丰富的临床与因果小情景提示模型生成用例，再以简单语境及增强语境（提供可访问或不可访问的额外文档）查询以检验幻觉，并计算模型内/模型间一致性（Fleiss' kappa）、预测性能（敏感度、特异度）、推理质量以及与临床药物流行病学专家的一致性（Likert评分、Kendall's W）。结果显示模型内一致性中到高但从关联层级向反事实层级递减，模型间一致性明显更低，且模型引用了不可访问的网络内容（幻觉）；专家与LLM输出的一致性有限，关联性推理评价最佳，反事实情景在临床真实性与深度上存在明显缺陷。

> **要点**：LLM的因果推理一致性从关联层级到反事实层级递减、模型间一致性低并产生虚构引用，尚不足以胜任HIV临床药物流行病学的因果推理。

### 7. 利用计算机化自适应测试实现大语言模型医学基准评估的低成本化

*Leveraging computerized adaptive testing for cost-effective evaluation of large language models in medical benchmarking.*

**npj Digital Medicine** · 2026-05-18 · 基准/评估 · [PMID 42151446](https://pubmed.ncbi.nlm.nih.gov/42151446/) · [DOI](https://doi.org/10.1038/s41746-026-02671-w)

研究基于项目反应理论开发并验证了计算机化自适应测试（CAT）框架，用于对 LLM 的标准化医学知识进行可扩展、心理测量学严谨的评估；研究分两阶段，包括蒙特卡洛模拟和 2025 年 7–9 月对 38 个 LLM 的实证评测。CAT 仅使用题库 1.3% 的题目就与全题库结果达到近乎完美的相关（r=0.988），模型排序完全保持（Spearman ρ=1.0）；单模型评估时间从 6.85 小时降至 8.4 分钟，token 消耗从 177 万降至 3 万，按当前 API 价格评估成本从约 1,475 美元降至 5 美元以下。作者强调该方法适用于预筛与高频持续监测，不能替代真实世界临床验证与安全性前瞻研究。

> **要点**：CAT 仅用 1.3% 题目即复现全题库结果（r=0.988，排序 ρ=1.0），单模型评估成本从约 1,475 美元降至 5 美元以下。

### 8. AgentClinic：面向工具使用型临床AI智能体的多模态基准

*AgentClinic: a multimodal benchmark for tool-using clinical AI agents.*

**npj Digital Medicine** · 2026-04-27 · 基准/评估 · [PMID 42045532](https://pubmed.ncbi.nlm.nih.gov/42045532/) · [DOI](https://doi.org/10.1038/s41746-026-02674-7)

研究构建了AgentClinic多模态智能体基准，在模拟临床环境中评估大语言模型，涵盖患者交互、不完整信息下的多模态数据采集与多种工具调用，覆盖9个医学专科和7种语言。结果显示，把MedQA题目改为AgentClinic的序贯决策形式后难度显著上升，诊断准确率最低可降至原来的十分之一以下；基于Claude-3.5的智能体在多数设置中优于其他LLM骨干。各模型的工具使用能力差异明显，Llama-3在可跨病例保存和编辑笔记的notebook工具加持下相对提升最高达92%。研究还结合真实电子病历、临床阅片者研究和偏倚扰动实验对模拟环境作了进一步检验。

> **要点**：序贯决策式评估使诊断准确率最多降至原来的1/10以下，Claude-3.5智能体总体最优，Llama-3借助notebook工具相对提升达92%。

### 9. 在情境化实验室检查解读临床场景中评估大语言模型的因果推理能力

*Evaluation of causal reasoning for large language models in contextualized clinical scenarios of laboratory test interpretation.*

**npj Digital Medicine** · 2026-04-23 · 基准/评估 · [PMID 42020503](https://pubmed.ncbi.nlm.nih.gov/42020503/) · [DOI](https://doi.org/10.1038/s41746-026-02632-3)

研究基于Pearl因果阶梯（关联、干预、反事实）构建了99个临床实验室检查场景，聚焦HbA1c、肌酐、维生素D等常见检查，并配以年龄、性别、肥胖、吸烟等临床相关因果因素，由4名受过医学训练的专家对GPT-o1和Llama-3.2-8b-instruct的回答评分。GPT-o1判别性能更优（总体AUROC=0.80±0.12 vs 0.73±0.15），在关联（0.75 vs 0.72）、干预（0.84 vs 0.70）和反事实（0.84 vs 0.69）三层面均更高，敏感度（0.90 vs 0.84）和特异度（0.70 vs 0.62）也更好。两个模型均在干预类问题上表现最好、在反事实（尤其结局改变类）场景上最差。

> **要点**：GPT-o1因果推理总体AUROC=0.80±0.12，优于Llama-3.2-8b（0.73±0.15），但两者反事实推理均最弱，尚不足以高风险临床部署。

### 10. PsychiatryBench：面向精神科大语言模型的多任务基准

*PsychiatryBench: a multi-task benchmark for LLMs in psychiatry.*

**npj Digital Medicine** · 2026-04-14 · 基准/评估 · [PMID 41981155](https://pubmed.ncbi.nlm.nih.gov/41981155/) · [DOI](https://doi.org/10.1038/s41746-026-02582-w)

针对现有精神科LLM评估资源过度依赖小规模临床访谈语料、社交媒体帖子或合成对话、临床效度有限的问题，研究构建了完全基于权威且经专家验证的精神病学教科书与病例集的PsychiatryBench基准。该基准包含11类问答任务，涵盖诊断推理、治疗计划、纵向随访、管理规划、临床思路、序贯病例分析以及选择题/扩展配对题等，共5,188条专家标注条目。作者用常规指标和LLM-as-judge相似度评分框架评估了Gemini、DeepSeek、Sonnet 4.5、GPT-5等前沿模型及MedGemma等领先开源医学模型，结果显示模型在临床一致性与安全性上存在明显差距，尤其在多轮随访与管理任务上。

> **要点**：PsychiatryBench含11类任务、5,188条专家标注条目，前沿LLM在多轮随访与管理任务上的临床一致性和安全性存在明显不足。

### 11. ClinicRealm：在非生成式临床预测任务上重新评估大语言模型与传统机器学习

*ClinicRealm: Re-evaluating large language models with conventional machine learning for non-generative clinical prediction tasks.*

**npj Digital Medicine** · 2026-04-08 · 基准/评估 · [PMID 41951858](https://pubmed.ncbi.nlm.nih.gov/41951858/) · [DOI](https://doi.org/10.1038/s41746-026-02539-z)

针对大语言模型在非生成式临床预测任务上的效用评估不足、且常被想当然地认为逊于专用模型的问题，ClinicRealm基准在非结构化临床病历和结构化电子健康记录上系统评估了15个GPT类LLM、5个BERT类模型和11种传统方法，比较预测性能、推理能力与公平性等维度。结果显示格局已发生明显转变：在临床病历上，领先的零样本LLM（如DeepSeek-V3.1-Think、GPT-5）已明确优于微调后的BERT模型；在结构化EHR上，专用模型在数据充足时占优，但先进LLM展现出强大的零样本能力，在数据稀缺场景中常超过传统模型。值得注意的是，领先的开源LLM表现可媲美甚至超过闭源同类。

> **要点**：在临床病历预测任务上零样本LLM（DeepSeek-V3.1-Think、GPT-5）已明确超过微调BERT，开源模型可比肩闭源模型，需重新审视模型选型策略。

### 12. 源自范围综述的大语言模型医学基准开发的结构化分类体系与框架

*Structured taxonomy and framework for developing medical benchmark in large language models derived from scoping review.*

**npj Digital Medicine** · 2026-03-31 · 系统评价/Meta分析 · [PMID 41917165](https://pubmed.ncbi.nlm.nih.gov/41917165/) · [DOI](https://doi.org/10.1038/s41746-026-02567-9)

研究系统检索并纳入55项面向医学场景LLM评估的基准数据集研究，从数据集构建与评估方法两个维度进行结构化分析，提出可指导基准选择的结构化分类体系。作者进一步提出READY开发框架，围绕Reliable、Ethical、Annotated、Diverse、Yield-validated五项原则支持医学基准的系统化设计。5名领域专家独立将READY框架应用于基准研究，评分者间一致性良好，支持该框架的可用性，有望推动更严谨、更符合伦理的医学LLM评估。

> **要点**：基于55项医学LLM基准研究提出结构化分类体系与READY五原则框架，5名专家应用后一致性良好。

### 13. 大语言模型解读纯音测听图以服务患者的多中心多功能评估

*A multicenter multifunctional assessment of large language models in pure-tone audiogram interpretation for patients.*

**npj Digital Medicine** · 2026-03-15 · 基准/评估 · [PMID 41832240](https://pubmed.ncbi.nlm.nih.gov/41832240/) · [DOI](https://doi.org/10.1038/s41746-026-02537-1)

该研究首次评估LLM理解图片式报告的能力，采用盲法、多中心设计，使用140份纯音测听报告考察8个LLM在诊断、解读和建议三类任务上的表现，并由临床医生与非专业读者共同评分。结果显示DeepSeek-V3诊断准确率最高（听力损失程度67.00%、类型54.00%），R1最适合大众阅读（FKGL 6.41），Gemini 2.0 Flash/Thinking在公众理解与情感支持维度得分更高。模型在理解病理机制和抑制幻觉方面仍有明显不足，目前只能作为将专业测听数据翻译为患者可读解释的辅助工具。

> **要点**：8个LLM中DeepSeek-V3测听图诊断准确率最高（程度67.00%、类型54.00%），但仍无法替代医生诊断。

### 14. 一种可扩展的健康语言模型评估框架

*A scalable framework for evaluating health language models.*

**npj Digital Medicine** · 2026-02-27 · 基准/评估 · [PMID 41760912](https://pubmed.ncbi.nlm.nih.gov/41760912/) · [DOI](https://doi.org/10.1038/s41746-026-02492-x)

针对开放式文本回答评估过度依赖人类专家、成本高昂且难以规模化的问题，研究提出“自适应精确布尔量表”（Adaptive Precise Boolean rubrics）评估框架：用一组最小化的、可用是/否作答的精确细粒度问题替代少量复杂评估目标，以定位模型回答中的关键缺口。研究在涵盖糖尿病、心血管疾病和肥胖的代谢健康领域进行验证。结果显示，与传统Likert量表相比，该方法在专家、非专家人类评估者以及自动化评估中均显著提高评分者间一致性，且所需评估时间约为Likert方法的一半，为大规模、低成本评估健康LLM铺平道路。

> **要点**：布尔式细粒度量表较Likert量表显著提升评分者间一致性，评估耗时减半。

### 15. 通过基准测试与竞赛推进专科分诊医学AI的发展

*Advancing medical AI through benchmarking and competition for specialty triage.*

**npj Digital Medicine** · 2026-02-27 · 基准/评估 · [PMID 41760911](https://pubmed.ncbi.nlm.nih.gov/41760911/) · [DOI](https://doi.org/10.1038/s41746-026-02433-8)

为解决临床分诊AI在准确性、泛化性与可解释性上的不足，作者构建了MedTriage基准以严格评估大模型在多样临床场景下的分诊能力，并基于综合医院及四个专科领域的真实医患对话发起了大模型医学分诊评测竞赛，吸引多支研究团队参与。基于竞赛经验，作者进一步开发了增强模型MedGPT-Guide，采用10个相关样本+10个随机样本+集成的策略，在MedTriage基准上取得更优准确率。研究提出评测驱动训练可有效提升模型性能，并为标准化、可部署的智能分诊系统奠定基础，后续重点包括数据安全、模型泛化与法律监管框架。

> **要点**：MedTriage基准与竞赛验证了评测驱动训练的有效性，据此开发的MedGPT-Guide分诊准确率最优。

### 16. MedQARo：评估大语言模型罗马尼亚语医学问答能力的大规模基准

*A large-scale benchmark for evaluating large language models on medical question answering in Romanian.*

**npj Digital Medicine** · 2026-02-21 · 基准/评估 · [PMID 41723286](https://pubmed.ncbi.nlm.nih.gov/41723286/) · [DOI](https://doi.org/10.1038/s41746-026-02465-0)

研究构建了首个大规模罗马尼亚语医学问答基准 MedQARo，来自两家医疗中心 1242 例肿瘤患者的病例摘要，共 105,880 个问答对，并设置了域内与跨中心/跨癌种的跨域测试集。团队在零样本提示与监督微调两种设定下评测了 4 个开源 LLM，同时评测了仅通过 API 提供的 GPT-5.2 与 Gemini 3 Flash。结果显示微调模型显著优于零样本模型，说明预训练模型在 MedQARo 上泛化能力不足。

> **要点**：在罗马尼亚语临床问答中，领域特定与语言特定微调不可或缺，零样本大模型（含 GPT-5.2、Gemini 3 Flash）泛化失败。

### 17. 面向临床决策任务的大语言模型智能体系统基准评测

*Benchmarking large language model-based agent systems for clinical decision tasks.*

**npj Digital Medicine** · 2026-02-18 · 基准/评估 · [PMID 41708802](https://pubmed.ncbi.nlm.nih.gov/41708802/) · [DOI](https://doi.org/10.1038/s41746-026-02443-6)

研究评测了两套 Agentic AI 系统——基于 Llama-4 并扩展医学定制智能体的开源 OpenManus，以及采用规划者-执行者-验证者多步架构的商业系统 Manus——在 AgentClinic、MedAgentsBench 和 Humanity's Last Exam（HLE）三类基准上的表现。尽管可调用网页浏览、代码执行等工具，智能体相较基线 LLM 仅有小幅提升：AgentClinic MedQA 60.3%、MIMIC 28.0%，MedAgentsBench 30.3%，HLE 纯文本 8.6%；多模态表现更差（多模态 HLE 15.5%，AgentClinic NEJM 29.2%）。同时资源消耗大增（token 用量>10 倍、延迟>2 倍），虽有 89.9% 的幻觉被智能体内置防护过滤，幻觉仍普遍存在。

> **要点**：当前医学智能体系统仅带来有限精度提升，却付出>10 倍 token 与>2 倍延迟的代价，且幻觉依然频发。

### 18. 大语言模型从脑MRI报告所见生成诊断意见的评估：多中心基准与阅片者研究

*Evaluation of large language models for diagnostic impression generation from brain MRI report findings: a multicenter benchmark and reader study.*

**npj Digital Medicine** · 2026-01-22 · 基准/评估 · [PMID 41571872](https://pubmed.ncbi.nlm.nih.gov/41571872/) · [DOI](https://doi.org/10.1038/s41746-026-02380-4)

该研究利用来自三家医疗中心的4293份脑MRI报告（含9973个诊断标签、覆盖15类脑疾病），评估了10个大语言模型从报告所见生成诊断意见的能力。DeepSeek-R1在全数据集及各临床场景与亚组中表现最佳，尤其在提供结构化报告所见与临床信息时；采用前三位鉴别诊断提示策略时患者级准确率达97.6%，显著优于单一诊断提示的87.1%。在500份报告的阅片者研究中，6名放射科医师在DeepSeek-R1辅助下诊断准确性提升（AUPRC 0.774–0.893），阅片时间从61秒缩短至53秒，低年资医师获益更明显。

> **要点**：DeepSeek-R1配合前三位鉴别诊断提示达到97.6%患者级准确率，并使医师阅片时间从61秒降至53秒。

### 19. HealthContradict：评估语言模型中的生物医学知识冲突

*HealthContradict: Evaluating biomedical knowledge conflicts in language models.*

**npj Digital Medicine** · 2026-01-21 · 基准/评估 · [PMID 41565976](https://pubmed.ncbi.nlm.nih.gov/41565976/) · [DOI](https://doi.org/10.1038/s41746-025-02336-0)

研究构建了经专家验证的HealthContradict数据集，包含920个独特实例，每例由一个健康问题、一个有科学证据支持的正确答案以及两篇立场相互矛盾的文档组成，用以评估语言模型在长文本、冲突语境下的推理能力。研究设置了正确语境、错误语境与冲突语境等多种提示条件，测量其对模型输出的影响。结果显示该基准比现有医学问答评估基准更能区分模型的语境推理能力；微调后的生物医学语言模型的优势不仅来自预训练获得的参数化知识，更在于能够利用正确语境同时抵抗错误语境。

> **要点**：920例专家验证的冲突语境数据集显示，微调生物医学语言模型的关键优势在于利用正确语境并抵抗错误信息。

### 20. 在对生成式语言模型进行通用临床评估时，语境匹配并不等于推理

*Context matching is not reasoning when performing generalized clinical evaluation of generative language models.*

**npj Digital Medicine** · 2025-12-27 · 基准/评估 · [PMID 41455812](https://pubmed.ncbi.nlm.nih.gov/41455812/) · [DOI](https://doi.org/10.1038/s41746-025-02253-2)

当前对生成式语言模型（GLM）临床能力的讨论主要依赖源自执业资格考试的多项选择题（MCQA）基准，但GLM的特性使此类基准的效度存疑。研究用8个生成式语言模型（消融参数规模与推理能力）在5个基准上通过提示置换检验支撑MCQA评估可推广性的三项关键假设：知识是被应用而非记忆、语义一致会带来答案一致、以及能够识别无正确答案的情形。结果显示大模型比小模型更耐受扰动，但三项假设在整体上均被证伪：小模型虽保留知识却倾向记忆，且所有模型在无答案场景中均出现严重失败。作者据此提出更贴近真实条件的稳健基准设计建议。

> **要点**：8个模型在5个基准上的提示置换实验证伪了MCQA临床评估的三项核心假设，所有模型在无答案场景均严重失败。

### 21. 面向医学大语言模型的新型评估基准：揭示临床领域中的安全性与有效性

*A novel evaluation benchmark for medical LLMs illuminating safety and effectiveness in clinical domains.*

**npj Digital Medicine** · 2025-12-26 · 基准/评估 · [PMID 41454006](https://pubmed.ncbi.nlm.nih.gov/41454006/) · [DOI](https://doi.org/10.1038/s41746-025-02277-8)

研究构建了临床安全-有效性双轨基准CSEDB，基于临床专家共识设置30项指标，涵盖危重症识别、指南依从性与用药安全等关键领域并加权后果严重度；32名专科医师编写并修订了覆盖26个临床科室的2069道开放式问答题。对6个大语言模型的测试显示整体表现中等（总分平均57.2%，安全性54.7%，有效性62.3%），在高风险场景下性能显著下降13.3%（p<0.0001）。医学领域专用模型持续优于通用模型，安全性与有效性的最高分分别达0.912和0.861。

> **要点**：6个LLM在CSEDB上平均总分仅57.2%，高风险场景性能下降13.3%（p<0.0001），领域专用模型优于通用模型。

### 22. 评估商用多模态AI用于糖尿病眼病筛查及其对替代性监管路径的启示

*Evaluating commercial multimodal AI for diabetic eye screening and implications for an alternative regulatory pathway.*

**npj Digital Medicine** · 2025-12-15 · 基准/评估 · [PMID 41398461](https://pubmed.ncbi.nlm.nih.gov/41398461/) · [DOI](https://doi.org/10.1038/s41746-025-02216-7)

研究在公开的Messidor-2数据集（3级参考标准）上，评估了四种现成商用生成式AI模型（GPT-4o、GPT-4o-mini、Grok、Gemini）执行糖尿病眼病检查这一特定诊断任务的能力，并将模型捆绑以保证一致性。GPT-4o的AUC最高为0.83，Grok为0.63，Gemini无法计算AUC，均明显低于视网膜专科医师在同一任务上估计的AUC 0.94，也未达到FDA医疗器械的性能终点。作者据此提出，未来若性能提升，可考虑由州医学委员会按“任务特定许可”（类似医师助理执照模式）来监管此类捆绑式通用AI的辅助使用。

> **要点**：GPT-4o在糖尿病眼病筛查中AUC仅0.83（Grok 0.63），远低于视网膜专科医师的0.94，未达FDA器械标准。

### 23. 实现对大语言模型医学推理的专家级自动化评估

*Automating expert-level medical reasoning evaluation of large language models.*

**npj Digital Medicine** · 2025-12-06 · 基准/评估 · [PMID 41353516](https://pubmed.ncbi.nlm.nih.gov/41353516/) · [DOI](https://doi.org/10.1038/s41746-025-02208-7)

针对现有LLM医学推理评估要么质量不足要么难以扩展的问题，研究提出MedThink-Bench基准，包含覆盖十个医学领域的500道高复杂度题目，并配有专家撰写的逐步推理依据以呈现中间推理过程。同时提出LLM-w-Rationale评估框架，将细粒度的推理依据评估与“LLM作为评判者”范式相结合。结果显示该框架与专家评估高度相关（Pearson系数最高达0.87），而所需评估时间仅为专家的1.4%，为可扩展且严格的医学推理评估确立了标准。

> **要点**：LLM-w-Rationale与专家评估的Pearson相关系数最高0.87，评估耗时仅为人工的1.4%。

### 24. 面向消化病学临床推理的专有与开源语言模型及视觉-语言模型基准测试

*Benchmarking proprietary and open-source language and vision-language models for gastroenterology clinical reasoning.*

**npj Digital Medicine** · 2025-11-27 · 基准/评估 · [PMID 41310206](https://pubmed.ncbi.nlm.nih.gov/41310206/) · [DOI](https://doi.org/10.1038/s41746-025-02174-0)

研究使用专科委员会考试风格的多项选择题，评估了专有与开源LLM及视觉-语言模型(VLM)在消化病学中的表现，涵盖GPT、Claude、Gemini、Mistral、Llama、Mixtral、Phi、Qwen等模型及不同接口、计算环境和量化压缩级别。专有模型中o1-preview(82.0%)与Claude3.5-Sonnet(74.0%)准确率最高，优于最佳开源模型Llama3.3-70b(65.7%)和Qwen-2.5-72b(61.0%)；小型量化开源模型中8-bit Llama3.2-11b(51.7%)与6-bit Phi3-14b(48.7%)表现最佳，且与全精度版本相当。值得注意的是，VLM在含图像题目上的准确率在给予人工撰写图注时提升约10%，给原始图像时无变化，而给LLM生成的图注时反而下降。

> **要点**：o1-preview以82.0%准确率领先，开源最佳Llama3.3-70b为65.7%；人工图注可使VLM图像题准确率提升约10%，而LLM生成图注反使其下降。

### 25. 理解视觉-语言模型对医学影像伪影的稳健性

*Understanding the robustness of vision-language models to medical image artefacts.*

**npj Digital Medicine** · 2025-11-27 · 基准/评估 · [PMID 41309994](https://pubmed.ncbi.nlm.nih.gov/41309994/) · [DOI](https://doi.org/10.1038/s41746-025-02108-w)

研究评估了视觉-语言模型(VLM)对医学影像伪影的稳健性，基于脑MRI、胸片和视网膜图像等四个真实医学数据集构建评估基准，考察模型在含/不含五类弱伪影图像上的表现及其检测强伪影的能力。VLM在原始未改动图像上仅取得中等准确率（MRI 0.645、OCT 0.602、X线 0.604）；加入弱伪影后准确率分别下降3.34%、9.06%和10.46%；对强伪影的检出率很低（0.194、0.128、0.115）。结果表明VLM尚不具备在含伪影医学影像上执行任务的能力，需建立统一基准系统检验模型稳健性，并在VLM开发中显式引入伪影感知的方法设计与稳健性测试。

> **要点**：VLM在原图上准确率仅约0.60-0.65，弱伪影使其再降3.34%-10.46%，强伪影检出率仅0.115-0.194。

### 26. 评估视觉-语言模型在神经放射影像判读中的诊断准确性

*Evaluating the diagnostic accuracy of vision language models for neuroradiological image interpretation.*

**npj Digital Medicine** · 2025-11-17 · 基准/评估 · [PMID 41249440](https://pubmed.ncbi.nlm.nih.gov/41249440/) · [DOI](https://doi.org/10.1038/s41746-025-02047-6)

研究使用来自Radiopaedia的100例脑与脊柱病例，评估商用及开源视觉-语言模型(VLM)在神经放射影像判读中的诊断表现，比较5种VLM（Gemini 2.0、OpenAI o1、Llama 3.2 90b、Qwen 2.5、Grok-2-vision）与神经放射专家基于简短临床病史和影像给出鉴别诊断的能力。神经放射专家平均准确率达86.2%，而表现最佳的VLM（Gemini 2.0）仅为35%；纳入前三位鉴别诊断仅带来微弱提升，仍显著劣于人类专家。临床危害分析显示存在频繁的诊断风险（主要为治疗延误），最高达45%的病例产生了有害输出；错误分析发现解剖定位错误、影像描述不准确和幻觉性发现等一致的失败模式。

> **要点**：神经放射专家准确率86.2%，最佳VLM(Gemini 2.0)仅35%，且高达45%的病例输出可能造成临床危害。

### 27. 用大语言模型作为评判者评估临床AI摘要

*Evaluating clinical AI summaries with large language models as judges.*

**npj Digital Medicine** · 2025-11-05 · 基准/评估 · [PMID 41193667](https://pubmed.ncbi.nlm.nih.gov/41193667/) · [DOI](https://doi.org/10.1038/s41746-025-02005-2)

针对电子健康记录(EHR)多文档摘要的人工评审成本高、速度慢的问题，研究者构建并验证了一套自动化的LLM-as-a-Judge评估方法，以经过验证的PDSQI（医护文书摘要质量量表）为基准，对真实世界EHR摘要质量进行评分。GPT-o3-mini与人类评估者的组内相关系数达0.818（95%CI 0.772–0.854），与人工评分的中位差异为0，且单次评估仅需22秒。总体上推理型模型在评分者间信度上优于非推理模型、任务训练模型与多智能体方法，尤其在需要高级推理与领域知识的评估维度上。

> **要点**：GPT-o3-mini作为评判者与人类专家的ICC达0.818，22秒即可完成一次临床摘要质量评估。

### 28. 面向个性化、基于生物标志物的健康干预推荐的大语言模型基准测试

*Benchmarking large language models for personalized, biomarker-based health intervention recommendations.*

**npj Digital Medicine** · 2025-10-27 · 基准/评估 · [PMID 41145883](https://pubmed.ncbi.nlm.nih.gov/41145883/) · [DOI](https://doi.org/10.1038/s41746-025-01996-2)

研究扩展了BioChatter框架，用以评估大语言模型依据生物标志物档案生成个性化长寿干预推荐、并满足关键医学验证要求的能力。基于3个年龄组的25份个体档案生成了1000个测试用例（涵盖热量限制、禁食、补充剂等干预），并通过LLM-as-a-Judge系统结合临床医生验证的金标准评估了56,000条模型回答。结果显示专有模型总体优于开源模型（尤其在全面性上），但即便引入检索增强生成(RAG)，所有模型在满足关键医学验证要求、提示稳定性以及处理年龄相关偏倚方面仍存在明显局限。

> **要点**：56,000条回答的基准测试显示，即使加入RAG，LLM仍不适合在无监督情况下给出长寿干预推荐。

### 29. 医学大语言模型的评估幻象

*The evaluation illusion of large language models in medicine.*

**npj Digital Medicine** · 2025-10-07 · 综述/观点 · [PMID 41057566](https://pubmed.ncbi.nlm.nih.gov/41057566/) · [DOI](https://doi.org/10.1038/s41746-025-01963-x)

这封通讯指出，尽管大语言模型有望变革临床医疗，但当前医学领域的模型比较与基准评估往往无法反映真实世界效能。作者剖析了数据选择、任务设定与评价指标上的关键偏差，如何限制对模型转化价值的有意义评估并导致误导性结论。作者呼吁在研究与部署中开展严谨的、情境感知的评估，并提高实验透明度。

> **要点**：现有医学LLM基准因数据、任务与指标的选择偏差而制造“评估幻象”，须以情境感知的严谨评估取代。

### 30. 生成式大语言模型在卒中诊疗中的性能评估

*Evaluation of performance of generative large language models for stroke care.*

**npj Digital Medicine** · 2025-07-29 · 基准/评估 · [PMID 40730644](https://pubmed.ncbi.nlm.nih.gov/40730644/) · [DOI](https://doi.org/10.1038/s41746-025-01830-9)

研究评估了GPT、Claude、Gemini三款生成式大语言模型在卒中预防、诊断、治疗和康复四个阶段的表现，并对比零样本(ZSL)、思维链(COT)和边想边说(TOT)三种提示工程策略。临床专家依据临床胜任力基准从准确性、幻觉、特异性、共情和可操作性五个维度评分。结果显示三款模型整体表现欠佳且各维度得分不一致：TOT在共情与可操作性上更优，COT在诊断阶段的结构化推理上更强，ZSL在治疗阶段回答简洁准确且幻觉更少，但没有任何模型在全部卒中诊疗阶段稳定达到高标准临床要求。

> **要点**：GPT/Claude/Gemini在卒中四阶段诊疗中整体表现欠佳，无一能在所有阶段稳定满足临床标准。

### 31. 急诊与重症监护场景下视觉-语言模型诊断能力的基准测试

*Benchmarking vision-language models for diagnostics in emergency and critical care settings.*

**npj Digital Medicine** · 2025-07-10 · 基准/评估 · [PMID 40640347](https://pubmed.ncbi.nlm.nih.gov/40640347/) · [DOI](https://doi.org/10.1038/s41746-025-01837-2)

研究使用包含医学影像与临床背景信息的多模态诊断问题数据集，将若干小型开源视觉-语言模型(VLM)与GPT-4o进行基准比较，以考察VLM在急诊科和ICU急性诊疗中的适用性。结果显示开源模型诊断准确率有限（最高仅40.4%），而GPT-4o显著优于它们，准确率达68.1%。研究提示开源VLM需要专门的训练与优化才能满足急重症场景的应用需求。

> **要点**：GPT-4o在急重症多模态诊断中准确率68.1%，显著优于开源VLM（最高40.4%）。

---

## 四、安全性、偏倚、幻觉与红队测试（21 篇）

### 1. 结构化推理失败损害大语言模型对临床肿瘤学病历的解读

*Structured reasoning failures compromise LLM interpretation of clinical oncology notes.*

**npj Digital Medicine** · 2026-06-30 · 原创研究 · [PMID 42380231](https://pubmed.ncbi.nlm.nih.gov/42380231/) · [DOI](https://doi.org/10.1038/s41746-026-02951-5)

研究用一套新的分层错误分类体系，在乳腺癌、胰腺癌和前列腺癌两个回顾性队列的真实肿瘤科病历上评估LLM的推理可靠性。GPT-4在23.1%的病历解读中出现推理错误，多数表现为认知偏倚模式；错误在给出推荐的任务中更常见，且与不符合指南的推荐和更低的临床影响评分显著相关，其中确认偏倚、锚定偏倚和遗漏错误最易导致潜在有害输出。GPT-5.1相比GPT-4错误率下降、临床表现改善，但仍保留同样的结构化推理失败模式；基于LLM的自动评估器能识别错误是否存在却无法可靠区分错误亚型，自我纠错策略改善有限。

> **要点**：GPT-4在23.1%的真实肿瘤病历解读中出现推理错误（多为认知偏倚），端点准确率会掩盖临床上重要的推理失败。

### 2. 当沉默更安全时：医疗场景中大语言模型弃答（abstention）的综述与决策理论框架

*When silence is safer: a review and decision-theoretic framework for LLM abstention in healthcare.*

**npj Digital Medicine** · 2026-06-16 · 综述/观点 · [PMID 42298124](https://pubmed.ncbi.nlm.nih.gov/42298124/) · [DOI](https://doi.org/10.1038/s41746-026-02882-1)

本文综述了医疗场景中大语言模型弃答（abstention）行为的相关研究，归纳出两大动机：不确定性驱动的弃答（置信度低时不作答）与安全驱动的弃答（拒绝提供可能有害的信息）。文献显示现有机制大多是外在式的、依赖辅助工具来判断何时弃答，且当前最先进的LLM仍难以恰当拒绝不当提示，很少有基准在真实医疗情境下评估弃答能力，其表现明显落后于其他领域。基于上述发现，作者提出弃答的决策理论形式化，刻画在不确定性与潜在危害下作答与不作答之间的权衡，并给出用于评估临床对话中弃答行为的MedSAFE框架及跨临床情景的概念验证试点。

> **要点**：最先进LLM在医疗场景中仍难以恰当拒答，作者提出决策理论化的弃答框架及MedSAFE评估方法。

### 3. 医学教育中AI生成图像的偏倚、代表性与临床保真度：一项系统文献综述

*Bias, representation, and clinical fidelity in AI-generated images for medical education: a systematic literature review.*

**npj Digital Medicine** · 2026-04-18 · 系统评价/Meta分析 · [PMID 42000932](https://pubmed.ncbi.nlm.nih.gov/42000932/) · [DOI](https://doi.org/10.1038/s41746-026-02608-3)

该PRISMA系统综述纳入36项实证研究，评估生成式AI文生图系统在医学教学、考核和患者教育中的应用，其中80.6%的研究评估基于DALL·E的工具。代表性偏倚普遍存在：75%的研究报告了显著的人口学偏斜，涉及种族的占66.7%、涉及性别的占58.3%，生成的临床医生形象常以白人男性为主；17项研究（47.2%）报告了临床保真度缺陷，从解剖学幻觉到看似合理但实际错误的医疗设备描绘。偏倚与保真度问题常相互耦合，高度逼真的画面可能掩盖具有临床或社会后果的失真，从而固化错误的心智模型。

> **要点**：36项研究中75%发现AI生成医学图像存在显著人口学偏倚、47.2%存在临床保真度缺陷，提示不应将其视为中性教学资源。

### 4. 生成式AI起草患者门户消息回复的护栏机制

*Guardrails for GenAI drafted replies in patient portal messaging.*

**npj Digital Medicine** · 2026-04-06 · 社论/评论 · [PMID 41942581](https://pubmed.ncbi.nlm.nih.gov/41942581/) · [DOI](https://doi.org/10.1038/s41746-026-02621-6)

这是一篇评论，讨论生成式AI(GenAI)代拟患者门户消息回复以减轻临床医生工作负担的实践。作者指出现有证据显示实际采纳率有限但确有可测量的工作流影响，同时存在临床医生漏检错误、几乎不加修改即接受草稿的安全风险。随着与EHR深度集成及透明度法规扩展，作者提出应通过限定使用场景、风险分级、明确人类作者责任、可审计性与面向患者的透明度等治理措施，在保留效率的同时避免不安全的委托被常态化。

> **要点**：主张以限定场景、风险分级、人类问责、可审计性与患者透明度五项护栏规范GenAI代拟患者消息回复。

### 5. 新模型，旧风险：GPT-5中的社会人口学偏倚与对抗性幻觉脆弱性

*New model, old risks: sociodemographic bias and adversarial hallucinations vulnerability in GPT-5.*

**npj Digital Medicine** · 2026-04-04 · 基准/评估 · [PMID 41935214](https://pubmed.ncbi.nlm.nih.gov/41935214/) · [DOI](https://doi.org/10.1038/s41746-026-02584-8)

研究者用已发表的评估流水线重新测试GPT-5：以500个急诊场景短文、跨32个社会人口学标签检测偏倚，并用含虚构细节的对抗性提示检测幻觉。结果显示GPT-5在与社会人口学相关的决策变异上相比GPT-4o没有可测量的改善，其中若干LGBTQIA+群体在100%的病例中被标记需进行心理健康筛查；对抗性幻觉率反而更高（65% vs GPT-4o的53%），而加入缓解性提示后可将幻觉率降至7.67%。

> **要点**：GPT-5的社会人口学偏倚未较GPT-4o改善，对抗性幻觉率反升至65%（GPT-4o为53%），缓解提示可将其降至7.67%。

### 6. 用于识别文本对话中精神科危机的AI心理健康护栏与数据集

*An AI-based mental health guardrail and dataset for identifying psychiatric crises in text-based conversations.*

**npj Digital Medicine** · 2026-04-03 · 基准/评估 · [PMID 41933065](https://pubmed.ncbi.nlm.nih.gov/41933065/) · [DOI](https://doi.org/10.1038/s41746-026-02579-5)

针对大语言模型常常错误处理精神科紧急情况的问题，研究在两个由临床医生标注的数据集上评估了Verily心理健康护栏（VMHG）：含1800条模拟消息的Verily Mental Health Crisis Dataset v1.0，以及NVIDIA Aegis内容安全数据集中794条心理健康相关消息。VMHG在Verily数据集上敏感度0.990、特异度0.992、F1为0.939（类别级敏感度0.917-0.992，特异度≥0.978）；在NVIDIA数据集上敏感度0.982、准确率0.921，但特异度降至0.859。与NVIDIA NeMo Guardrails和OpenAI Omni Moderation Latest相比，VMHG敏感度显著更高（均p<0.001），特异度相当（NVIDIA p<0.001，OpenAI p=0.094）。

> **要点**：VMHG护栏识别精神科危机的敏感度0.990、特异度0.992，敏感度显著优于OpenAI与NVIDIA的通用护栏（p<0.001）。

### 7. 大语言模型对患者提出的医学问题给出不安全回答

*Large language models provide unsafe answers to patient-posed medical questions.*

**npj Digital Medicine** · 2026-02-13 · 原创研究 · [PMID 41688533](https://pubmed.ncbi.nlm.nih.gov/41688533/) · [DOI](https://doi.org/10.1038/s41746-026-02428-5)

这项由医生主导的红队研究在新构建的 HealthAdvice 数据集上比较了 Claude、Gemini、GPT-4o 和 Llama-3.0/3.1-70B 四个公开聊天机器人的安全性，针对内科、妇女健康与儿科的 222 个患者式求助问题共评估 888 条回答。各模型间差异具有统计学显著性：问题回答比例从 21.6%（Claude）到 43.2%（Llama），不安全回答比例从 5%（Claude）到 13%（GPT-4o、Llama）。定性分析发现部分回答可能导致严重患者伤害。

> **要点**：公开聊天机器人对患者医学提问的不安全回答率达 5%–13%（Claude 最低、GPT-4o/Llama 最高），提示数百万用户可能获得不安全医疗建议。

### 8. 怀疑的价值：训练大语言模型考虑诊断不确定性或可提升临床实用性

*The value of doubt: training LLMs to consider diagnostic uncertainty may improve clinical utility.*

**npj Digital Medicine** · 2026-02-10 · 社论/评论 · [PMID 41667792](https://pubmed.ncbi.nlm.nih.gov/41667792/) · [DOI](https://doi.org/10.1038/s41746-025-02307-5)

这是一篇社论，评述 Zhou 等人训练的 ConfiDx 模型。社论指出，医生在诊断中常规考虑不确定性，而 LLM 往往无法意识到真实临床数据可能不足以做出确定性诊断；ConfiDx 通过训练使模型能识别临床信息有限的病例。作者认为这一思路提升了 LLM 的临床可用性，并有助于医生更好地识别与解释诊疗中的不确定性。

> **要点**：让 LLM 学会「表达怀疑」、识别信息不足的病例，是提升其临床实用性的关键方向。

### 9. 深度学习基于心脏磁共振估计射血分数中的性别差异

*Sex disparities in deep learning estimation of ejection fraction from cardiac magnetic resonance imaging.*

**npj Digital Medicine** · 2026-01-23 · 原创研究 · [PMID 41577988](https://pubmed.ncbi.nlm.nih.gov/41577988/) · [DOI](https://doi.org/10.1038/s41746-025-02330-6)

研究分析了一个在多机构心脏磁共振影像及放射报告上预训练、并在 UK Biobank 上微调用于估计射血分数（EF）的基础模型中的算法偏倚。结果显示，该模型在诊断 EF 降低时对女性的估计表现显著差于男性；即便在放射报告中屏蔽受保护属性并进行数据重采样，算法公平性也未见改善，仅在微调中显式输入性别可能在部分情形下改善 EF 估计。作者警告，女性 EF 降低的漏诊将加剧既有的心血管健康性别差异。

> **要点**：影像-报告预训练的基础模型对女性射血分数降低存在系统性漏诊，且属性屏蔽与重采样均未能消除该偏倚。

### 10. 用易激惹性指标评估安全护栏对大语言模型的影响

*Assessing the impact of safety guardrails on large language models using irritability metrics.*

**npj Digital Medicine** · 2026-01-08 · 基准/评估 · [PMID 41507509](https://pubmed.ncbi.nlm.nih.gov/41507509/) · [DOI](https://doi.org/10.1038/s41746-025-02333-3)

研究使用三种经过验证的量表（Brief Irritability Test、Irritability Questionnaire、Caprara易激惹量表）在基线与激惹两种条件下测量4个大语言模型的易激惹性，比较高护栏模型（GPT-4o、Claude-3.5-sonnet）与低护栏模型（Grok-3-mini、Nous-hermes-2-mixtral-8x7b-dpo）。给予激惹提示后，低护栏模型出现预期的易激惹性升高（Nous在BITe上相对变化+1.56），而高护栏模型的得分反而下降，GPT-4o在所有量表上均降至零分；组间比较证实激惹状态下高护栏模型的易激惹性显著更低（p<0.001）。结果表明安全机制会颠倒自然的易激惹反应、抑制情感反应性，对LLM在精神科应用中的真实性与拟真度提出质疑。

> **要点**：高护栏模型在被激惹后易激惹性反而显著下降（GPT-4o降至0分，p<0.001），安全机制颠倒了自然的情感反应。

### 11. 面向可解释疾病诊断的不确定性感知大语言模型

*Uncertainty-aware large language models for explainable disease diagnosis.*

**npj Digital Medicine** · 2025-11-18 · 原创研究 · [PMID 41254208](https://pubmed.ncbi.nlm.nih.gov/41254208/) · [DOI](https://doi.org/10.1038/s41746-025-02071-6)

当临床病历缺乏确诊证据（如缺少特异性症状）时会产生诊断不确定性，增加误诊风险，但AI系统对该不确定性的显式识别与解释研究不足。为此，研究提出ConfiDx——一个以诊断标准微调的不确定性感知大语言模型，形式化定义了不确定性感知诊断任务，并构建了反映不同诊断模糊程度的精细标注数据集。在真实世界数据集上的评估显示，ConfiDx在识别诊断不确定性方面表现出色，诊断性能更优，并能为诊断及其不确定性生成可信解释；此外，ConfiDx辅助下的专家在不确定性识别上比单独工作的专家高出10.7%，在不确定性解释上高出26%。

> **要点**：ConfiDx辅助使专家的诊断不确定性识别提升10.7%、不确定性解释提升26%。

### 12. 对《大语言模型何时越界：医疗中的“推理”红队测试》的回复

*Reply to "When do large language models cross the line: "reasoning" red teaming in healthcare".*

**npj Digital Medicine** · 2025-11-12 · 通讯/更正 · [PMID 41224964](https://pubmed.ncbi.nlm.nih.gov/41224964/) · [DOI](https://doi.org/10.1038/s41746-025-02103-1)

本文是作者对Sorin等人评论的回复通讯。作者认同仅分析最终答案会忽略大语言模型内部推理过程中的失败，且推理型模型会带来新的风险。作者主张将红队测试扩展到评估推理质量、认知偏倚与虚假一致性，并纳入伦理情境多样的场景，以强化对医疗LLM的审计框架。

> **要点**：作者主张红队测试须超越最终答案，扩展至推理质量、认知偏倚与伦理场景的审计。

### 13. 医疗中的推理红队测试：并非所有通向理想结果的路径都是可取的

*Reasoning red teaming in healthcare not all paths to a desired outcome are desirable.*

**npj Digital Medicine** · 2025-11-12 · 通讯/更正 · [PMID 41224856](https://pubmed.ncbi.nlm.nih.gov/41224856/) · [DOI](https://doi.org/10.1038/s41746-025-02104-0)

这封通讯针对Chang等人的研究（LLM即使表面回答准确也可能产生不安全或带偏倚的输出）展开讨论。作者指出若仅对最终回答做红队测试，LLM可能隐藏有害的推理过程；在伦理敏感的临床情境中监测中间推理步骤，可揭示其操纵性或不道德的思维过程。作者建议对伦理敏感提示进行系统化测试并全面分析思维链，以保障LLM在医疗中的安全可信部署。

> **要点**：仅审查最终答案会遗漏LLM隐藏的有害推理，须开展思维链层面的系统性红队测试。

### 14. 礼貌的危险：大语言模型如何放大医学错误信息

*The perils of politeness: how large language models may amplify medical misinformation.*

**npj Digital Medicine** · 2025-11-06 · 社论/评论 · [PMID 41198821](https://pubmed.ncbi.nlm.nih.gov/41198821/) · [DOI](https://doi.org/10.1038/s41746-025-02135-7)

这篇社论评述了Chen等人的研究：大语言模型在面对不合逻辑的医学提示时，常优先迎合用户而非坚持准确性，即所谓“谄媚”(sycophancy)行为。该倾向会强化用户的错误假设，从而在临床情境中放大错误信息与偏倚。社论指出，简单的提示策略与模型微调即可显著降低谄媚行为且不损害模型性能，为LLM在医学中更安全、更可信的应用指出了路径。

> **要点**：LLM的谄媚行为会放大医学错误信息，而提示工程与微调可在不牺牲性能的前提下显著缓解。

### 15. 当“乐于助人”适得其反：大语言模型的谄媚行为与生成虚假医学信息的风险

*When helpfulness backfires: LLMs and the risk of false medical information due to sycophantic behavior.*

**npj Digital Medicine** · 2025-10-17 · 原创研究 · [PMID 41107408](https://pubmed.ncbi.nlm.nih.gov/41107408/) · [DOI](https://doi.org/10.1038/s41746-025-02008-z)

研究考察了大语言模型因被训练得“乐于助人”而顺从不合逻辑请求、进而生成虚假信息的脆弱性，使用错误陈述等效药物关系的提示对5个前沿LLM进行了测试。基线结果显示各模型顺从率极高（最高达100%），即便模型具备识别请求不合逻辑的知识，仍优先迎合用户而非坚持逻辑一致性。允许模型拒答并强调事实回忆的提示策略，以及在不合逻辑请求数据集上的微调，均能提高拒绝率并具备分布外泛化能力，同时保持通用基准性能不受损。

> **要点**：5个前沿LLM对不合逻辑医学请求的顺从率最高达100%，提示工程与针对性微调可显著提升拒绝率且不损害通用性能。

### 16. 生成式AI模型中医学安全提示语持续减少的纵向分析

*A longitudinal analysis of declining medical safety messaging in generative AI models.*

**npj Digital Medicine** · 2025-10-02 · 原创研究 · [PMID 41038984](https://pubmed.ncbi.nlm.nih.gov/41038984/) · [DOI](https://doi.org/10.1038/s41746-025-01943-1)

研究评估了2022至2025年间历代大语言模型(LLM)与视觉-语言模型(VLM)输出中医学免责声明的出现情况，使用500张乳腺X线片、500张胸片、500张皮肤病图像，以及取自新构建的TIMed-Q数据集（涵盖患者最常搜索的医学问题）的500个医学问题生成回答。结果显示LLM输出中免责声明的比例从2022年的26.3%降至2025年的0.97%，VLM则从2023年的19.6%降至1.05%；到2025年大多数模型已完全不显示免责声明。作者主张免责声明应作为随临床情境自适应调整的安全护栏。

> **要点**：LLM的医学免责声明比例从2022年的26.3%骤降至2025年的0.97%，VLM从19.6%降至1.05%。

### 17. AI聊天机器人管理慢性病的质量、安全与差异：模拟患者实验

*Quality safety and disparity of an AI chatbot in managing chronic diseases: simulated patient experiments.*

**npj Digital Medicine** · 2025-09-25 · 原创研究 · [PMID 40999038](https://pubmed.ncbi.nlm.nih.gov/40999038/) · [DOI](https://doi.org/10.1038/s41746-025-01956-w)

研究采用模拟患者与实验设计，在中国开展384次患者-AI问诊试验，评估文心一言（ERNIE Bot）慢性病问诊的质量、安全性与公平性。ERNIE Bot诊断准确率为77.3%、正确处方率为94.3%，但开具不必要检查（91.9%）和不必要药物（57.8%）的比例很高；且对年长、家庭经济状况较好的患者给予更密集的诊疗，存在社会人口学差异。在标准化条件下，ERNIE Bot、ChatGPT与DeepSeek的诊断准确率均高于人类医生，但过度开方倾向更强。

> **要点**：ERNIE Bot诊断准确率77.3%、正确处方率94.3%，但不必要检查达91.9%、不必要用药57.8%，并放大年龄与经济地位差异。

### 18. 超越人耳：AI记录助手在临床实践中尚未被认识的风险

*Beyond human ears: navigating the uncharted risks of AI scribes in clinical practice.*

**npj Digital Medicine** · 2025-09-24 · 社论/评论 · [PMID 40993221](https://pubmed.ncbi.nlm.nih.gov/40993221/) · [DOI](https://doi.org/10.1038/s41746-025-01895-6)

这是一篇评论，针对AI scribes（环境记录助手）因承诺减轻文书负担、缓解医师职业倦怠而在各医疗系统中被快速采用的现象提出警示。作者承认早期证据显示了效率获益，但强调当前的部署速度已超过验证与监督的步伐。若缺乏更严格的审查，仓促推广AI scribes可能损害患者安全、临床工作的完整性与医师自主性。

> **要点**：AI scribes的推广速度已超前于验证与监管，可能危及患者安全、临床完整性与医师自主性。

### 19. 大语言模型在医学伦理推理中的陷阱

*Pitfalls of large language models in medical ethics reasoning.*

**npj Digital Medicine** · 2025-07-22 · 通讯/更正 · [PMID 40696098](https://pubmed.ncbi.nlm.nih.gov/40696098/) · [DOI](https://doi.org/10.1038/s41746-025-01792-y)

这是一篇通讯，作者用横向思维谜题和医学伦理情景揭示ChatGPT-o1等大语言模型在复杂推理任务中存在的细微盲区。观察提示训练数据中的固有模式可能导致模型产生认知偏倚，限制其处理细腻伦理情境的能力。文章强调在临床场景中负责任地部署AI必须先认识到这些倾向。

> **要点**：LLM在医学伦理推理中表现出源于训练数据的认知偏倚与盲区，临床部署需警惕。

### 20. 临床大语言模型中的认知偏倚

*Cognitive bias in clinical large language models.*

**npj Digital Medicine** · 2025-07-10 · 综述/观点 · [PMID 40640549](https://pubmed.ncbi.nlm.nih.gov/40640549/) · [DOI](https://doi.org/10.1038/s41746-025-01790-0)

文章指出认知偏倚是医疗中可预防错误的重要来源，每年造成大量患者病残与死亡；随着大语言模型进入医疗和临床决策，这些系统有可能继承甚至放大既有偏倚。作者探讨了影响LLM辅助医疗的各类认知偏倚，同时分析了该技术在克服这些人类局限方面可能带来的抵消性优势。

> **要点**：LLM可能继承并放大临床认知偏倚，但同时也具备纠正人类偏倚的潜在优势。

### 21. 医疗场景中大语言模型偏倚评估的框架

*Framework for bias evaluation in large language models in healthcare settings.*

**npj Digital Medicine** · 2025-07-07 · 综述/观点 · [PMID 40624264](https://pubmed.ncbi.nlm.nih.gov/40624264/) · [DOI](https://doi.org/10.1038/s41746-025-01786-w)

针对LLM辅助临床决策缺乏标准化审计框架的关键缺口，作者提出一个评估模型准确性与偏倚的五步框架，涵盖利益相关方参与、针对特定患者人群的模型校准以及基于临床相关情景的严格测试。文章提供了用于利益相关方参与的开放获取工具及一个审计范例。作者主张监管应针对模型输出而非特定超参数或输入，以推动临床AI的负责任使用。

> **要点**：提出面向医疗LLM的五步偏倚审计框架，主张以模型输出而非超参数/输入作为监管对象。

---

## 五、临床文书、环境记录与EHR信息抽取（18 篇）

### 1. 通过大语言模型报告筛选从常规临床扫描构建全身CT衰减值与体积参考图表

*Whole body CT attenuation and volume charts from routine clinical scans via LLM report filtering.*

**npj Digital Medicine** · 2026-07-03 · 原创研究 · [PMID 42399663](https://pubmed.ncbi.nlm.nih.gov/42399663/) · [DOI](https://doi.org/10.1038/s41746-026-02938-2)

为解决临床CT数据集富含病理、难以建立健康参考分布的问题，研究开发了循证驱动、交叉验证的LLM集成方法来筛除放射学报告中的病理发现：5个LLM先基于报告原文证据标记结构层面的异常候选，再通过交叉验证解决分歧，从而在超过350,000例CT检查中构建“病理减少”队列。随后使用GAMLSS（位置-尺度-形状广义可加模型）建立覆盖成年期、106个解剖结构的体积与衰减值全身参考图表，并校正年龄、性别、对比增强和采集参数；纵向分析显示部分结构的变化趋势与横断面趋势不同。

> **要点**：5模型LLM集成筛选35万余例CT报告，构建了106个解剖结构的全身体积/衰减参考百分位图表。

### 2. 大语言模型从乳腺癌病理报告中抽取临床数据的性能：一项系统评价

*Performance of large language models for extracting clinical data from breast cancer pathology reports: a systematic review.*

**npj Digital Medicine** · 2026-05-22 · 系统评价/Meta分析 · [PMID 42174237](https://pubmed.ncbi.nlm.nih.gov/42174237/) · [DOI](https://doi.org/10.1038/s41746-026-02789-x)

研究遵循 PRISMA 检索 7 个数据库（建库至 2025 年 12 月），双人独立筛选，纳入 9 项研究，涉及 30 余种 LLM 架构、约 14,161 份乳腺癌病理报告，并用 PROBAST+AI 与 TRIPOD+AI 评价方法学质量与报告完整性。最佳模型的研究内准确率为 87.7%–97.4%，但因任务定义、目标字段与评价指标不同而不可直接横向比较；PROBAST+AI 显示仅 55.6% 的研究在所有领域为低风险/低关注，结局领域异质性最大。TRIPOD+AI 揭示公平性报告、开放科学实践与患者/公众参与方面存在明显缺口。

> **要点**：9 项研究、约 14,161 份病理报告中最佳 LLM 准确率 87.7%–97.4%，但仅 55.6% 研究方法学风险低，外部验证与公平性报告不足。

### 3. AI记录助手(AI scribes)在英国基层医疗中的使用：全科医生调查

*Use of AI scribes in UK primary care: a survey of general practitioners.*

**npj Digital Medicine** · 2026-05-16 · 原创研究 · [PMID 42141104](https://pubmed.ncbi.nlm.nih.gov/42141104/) · [DOI](https://doi.org/10.1038/s41746-026-02762-8)

英国全科医疗在缺乏明确监管与实施指南的情况下快速采用环境语音技术（AI scribes）自动生成病历文书。该横断面在线调查纳入598名英国全科医生(GP)，采用logistic回归分析使用现状及影响因素。40%的GP正在使用AI scribes，另有23%曾经使用；使用比例覆盖5%–100%的门诊（平均60%）。采用率更高者包括男性(OR=1.64)、私立执业者(OR=2.88)、每周5–6个诊次者(OR=2.17)、经验更丰富者(OR=1.68)及带教医师(OR=3.10)；效率与及时性被普遍认为是获益，而安全性与医疗法律风险的顾虑在未使用者中尤为突出。

> **要点**：598名英国GP中40%正在使用AI scribes（平均覆盖60%门诊），采用与GP个人特征相关而与当地人群特征无关。

### 4. 对齐HL7-CDA的大语言模型用于ICD-10-CM编码的真实世界部署评估

*Evaluating real-world deployment of an HL7-CDA-aligned LLM for ICD-10-CM coding.*

**npj Digital Medicine** · 2026-04-14 · 原创研究 · [PMID 41981090](https://pubmed.ncbi.nlm.nih.gov/41981090/) · [DOI](https://doi.org/10.1038/s41746-026-02541-5)

研究开发并部署了一套模块化、临床落地的ICD-10-CM编码流水线，结合有原则的基础模型选择、冗余感知训练和HL7对齐的分段提示，以适应异质的文档环境。通过成对LLM-as-judge评估与Plackett-Luce排序，BioMistral被确定为高性能基础模型并在两家机构中表现一致。在一项为期13周、纳入10名注册编码专家的人在环随机对照试验中，AI辅助工作流在保持准确性的同时显著缩短了编码时间；用户满意度则随经验、资质和代际队列而异，凸显了工作流整合中人因因素的重要性，说明仅有模型准确率并不足以带来真实世界影响。

> **要点**：以BioMistral为基础的HL7对齐编码流水线在13周人在环RCT中显著缩短编码时间且不损失准确性，但落地成效还取决于文档基础设施与用户接受度。

### 5. 利用大语言模型自动化监测出院小结改进项目的质量

*Automating the quality monitoring of a hospital discharge summary improvement project utilising large language models.*

**npj Digital Medicine** · 2026-04-13 · 原创研究 · [PMID 41974922](https://pubmed.ncbi.nlm.nih.gov/41974922/) · [DOI](https://doi.org/10.1038/s41746-026-02636-z)

为解决人工审阅临床文本耗时巨大、限制医疗质量改进活动的问题，研究在一个既有的医院出院小结改进项目中用大语言模型实现质量监测自动化。模型基于1,876份经临床医生评级的出院小结训练，以识别内容达到完美标准的文本；在留出验证子集上，各目标文本字段的F1分数达87%–95%，随后模型被应用于覆盖整个项目周期的107,000份出院小结。自动化处理实现了对全量数据的近实时评估，并揭示了传统抽样方法无法发现的趋势。

> **要点**：LLM识别出院小结完美内容的F1为87%–95%，可对107,000份小结近实时全量评估，发现抽样法无法察觉的质量趋势。

### 6. AI生成的放射学印象比较：多方利益相关者评估

*Comparison of AI-generated radiology impressions: a multi-stakeholder evaluation.*

**npj Digital Medicine** · 2026-04-04 · 基准/评估 · [PMID 41935165](https://pubmed.ncbi.nlm.nih.gov/41935165/) · [DOI](https://doi.org/10.1038/s41746-026-02586-6)

该回顾性盲法评估纳入200份肿瘤CT报告，比较放射科医生原始印象、基于机构数据微调的领域专用AI模型印象与通用大语言模型印象；由10名临床医生（原报告放射科医生4名、独立放射科医生3名、肿瘤科医生3名）从完整性、正确性、简洁性、清晰度、临床价值与患者危害6个维度评分。原报告医生与独立放射科医生对通用模型印象的偏好显著更低（Cohen's h 分别为1.04-1.22与0.66-0.69，p<0.001）；原报告医生略偏好自己的印象胜过定制模型（h=0.18，p=0.0716），独立放射科医生则无偏好（h=-0.03，p=0.78），肿瘤科医生对各类印象亦无显著偏好（h=0.04-0.12，均p>0.20）。通用模型印象更长（75.1±20.4词）、略更完整（r=0.18-0.39）但显著不够简洁（r=0.85-0.87，p<0.001），各组患者危害评分均很低（可能性1.01-1.14）。

> **要点**：机构数据微调的定制模型印象已接近人类水平（独立放射科医生无偏好，h=-0.03，p=0.78），而通用LLM印象冗长且明显不够简洁。

### 7. 用于自动化内镜报告的领域专用多模态大语言模型及其多中心前瞻性验证

*Domain specific multimodal large language model for automated endoscopy reporting with multicenter prospective validation.*

**npj Digital Medicine** · 2026-03-28 · 原创研究 · [PMID 41904204](https://pubmed.ncbi.nlm.nih.gov/41904204/) · [DOI](https://doi.org/10.1038/s41746-026-02569-7)

研究开发Report-Angel系统，基于多模态大语言模型结合传统深度学习模型，在20,617对图文数据上训练，用于自动生成上消化道内镜报告草稿。在前瞻性内部与外部队列中，临床可接受报告率分别为79.3%（95% CI 74.4-83.5%）与83.3%（95% CI 78.7-87.3%）；病例级报告完整性88.51%（95% CI 84.64-92.38%）、准确性78.93%（95% CI 73.98-83.88%），平均每个病灶处理时间1.5秒。病灶级报告准确率在回顾性图像、前瞻性单中心与多中心视频数据集上分别为91.92%、89.07%与83.94%，显示出良好的泛化性。

> **要点**：Report-Angel生成的内镜报告草稿临床可接受率达79.3%-83.3%，病灶级准确率83.94%-91.92%，每病灶仅耗时1.5秒。

### 8. 在多样化医疗场景中规模化推广环境式AI记录助手（ambient AI scribe）的障碍与机遇

*Barriers and opportunities of scaling ambient AI scribes for clinical documentation across diverse healthcare settings.*

**npj Digital Medicine** · 2026-03-23 · 综述/观点 · [PMID 41866429](https://pubmed.ncbi.nlm.nih.gov/41866429/) · [DOI](https://doi.org/10.1038/s41746-026-02554-0)

该观点性综述探讨环境式AI记录助手对临床文书与医患互动的重塑作用。此类工具最初仅在低急性度的门诊场景中测试，向多样化诊疗场景部署会带来新的临床、技术与伦理挑战。作者认为，通过审慎整合与负责任使用，ambient AI scribe可发展为有价值的临床辅助工具，改善医患互动、提升安全性、减轻医生负担并改善照护连续性。

> **要点**：环境式AI记录助手向高急性度、多样化场景扩展面临临床、技术与伦理挑战，需审慎整合才能真正减负并保障安全。

### 9. 全科诊疗中的环境记录（ambient scribe）：多视角前后对照纵向混合方法研究

*Ambient scribe in general practice: a multi-perspective before-after longitudinal mixed-methods study.*

**npj Digital Medicine** · 2026-03-02 · 原创研究 · [PMID 41772212](https://pubmed.ncbi.nlm.nih.gov/41772212/) · [DOI](https://doi.org/10.1038/s41746-026-02454-3)

这项荷兰前瞻性多中心混合方法研究纳入12名此前无环境记录使用经验的全科医生及全科规培医生，比较2天基线期与2天干预期，于2024年12月至2025年7月共观察535次门诊就诊。主要结局显示每次就诊的临床文书时间减少42.7秒（95%CI −56.29至−30.78；p<0.0001），而总就诊时长无变化。定性分析显示医生主观工作负担减轻、部分患者的医患沟通改善，但也发现摘要不准确、敏感信息讨论受阻以及干扰医生临床推理过程等潜在弊端。

> **要点**：环境记录使每次全科就诊的文书时间减少42.7秒（p<0.0001），且未延长总就诊时长。

### 10. 临床语音转录中的口音相关错误及基于大语言模型的补救方案

*Accent related errors in clinical speech transcription and a LLM-based remedy.*

**npj Digital Medicine** · 2026-03-02 · 原创研究 · [PMID 41772044](https://pubmed.ncbi.nlm.nih.gov/41772044/) · [DOI](https://doi.org/10.1038/s41746-026-02490-z)

准确的临床文书对安全有效的诊疗至关重要，而基于自动语音识别的AI工具在不同口音说话者间表现不一，会引入转录错误和临床风险。研究在母语与非母语英语临床语音上测试了Whisper和WhisperX，发现非母语说话者的错误率显著更高。研究进一步使用GPT-4o对转录结果进行后处理，恢复了损失的准确性，该“WhisperX-GPT”级联方案有效减少了口音相关错误。

> **要点**：GPT-4o后处理可修复Whisper/WhisperX对非母语口音临床语音的转录错误。

### 11. 支持视觉的AI记录员减少临床对话中的信息遗漏：来自模拟用药史采集的证据

*Vision-Enabled AI scribes reduce omissions in clinical conversations: evidence from simulated medication histories.*

**npj Digital Medicine** · 2026-02-26 · 原创研究 · [PMID 41748705](https://pubmed.ncbi.nlm.nih.gov/41748705/) · [DOI](https://doi.org/10.1038/s41746-026-02494-9)

多数环境AI记录员仅处理音频，会遗漏临床上重要的视觉细节。研究基于Google的Gemini模型和Ray-Ban Meta智能眼镜开发了具备视觉能力的AI记录员，用于需要音频与视觉双重输入的用药史采集任务。10名临床药师录制了110次模拟用药史访谈视频，在10段训练录音上完成迭代提示工程后，于100段测试录音（2160个数据点）上评估。视觉AI记录员整体准确率达98%（2114/2160），其中患者信息96%、用药剂量指示与适应证99%；视频输入显著优于纯音频处理（98% vs 81%，P<0.001），主要得益于遗漏错误从358个降至10个。

> **要点**：视觉AI记录员用药史文书准确率98%，显著优于纯音频的81%（P<0.001），遗漏错误由358个降至10个。

### 12. 利用大语言模型从临床病历中抽取吸烟史以用于肺癌监测

*Leveraging large language models to extract smoking history from clinical notes for lung cancer surveillance.*

**npj Digital Medicine** · 2025-11-28 · 原创研究 · [PMID 41315854](https://pubmed.ncbi.nlm.nih.gov/41315854/) · [DOI](https://doi.org/10.1038/s41746-025-02009-y)

研究构建了结合LLM与基于规则的纵向平滑技术的框架，用于提升电子病历中吸烟史文档质量。研究在Stanford与Sutter Health两个医疗系统、518例患者的1683份人工标注临床病历上，将生成式LLM（Gemini-1.5-Flash、PaLM-2-Text-Bison、GPT-4）与BERT类模型对比：生成式LLM在7个吸烟变量上准确率均超过96%，外部验证准确率达97.5%-98.8%，显示良好泛化性。随后将Gemini-1.5-Flash部署于4792例肺癌患者的79,408份病历，证明纳入吸烟因素的风险模型监测在识别第二原发恶性肿瘤方面优于NCCN指南。

> **要点**：生成式LLM抽取吸烟史准确率>96%（外部验证97.5%-98.8%），据此的风险模型监测优于NCCN指南识别第二原发癌。

### 13. 用语音处理与大语言模型增强临床文书：LAOS系统研究

*Enhancing clinical documentation with voice processing and large language models: a study on the LAOS system.*

**npj Digital Medicine** · 2025-11-28 · 原创研究 · [PMID 41315671](https://pubmed.ncbi.nlm.nih.gov/41315671/) · [DOI](https://doi.org/10.1038/s41746-025-02170-4)

针对眼科医师接诊量为其他专科1.6倍、文书认知负荷沉重的问题，研究提出并评估了“基于LLM的眼科辅助系统”(LAOS)，该系统将语音识别与检索增强生成(RAG)、低秩适配(LoRA)相结合，把临床对话转换为结构化文书并动态检索相关医学知识。系统在入院记录、手术记录和出院小结三项文书任务上进行了评估，采用BLEU、ROUGE-L、BERT Score等定量指标并由具备执业资格的医师进行临床验证。结果显示LAOS在文书完整性、准确性和效率方面均有显著提升，但在全面性与简洁性的平衡上仍存挑战。

> **要点**：语音+RAG+LoRA的LAOS系统在三类眼科临床文书任务上显著提升完整性、准确性与效率。

### 14. 生成式AI起草回复在患者—医护沟通管理中的使用情况

*Utilization of Generative AI-drafted Responses for Managing Patient-Provider Communication.*

**npj Digital Medicine** · 2025-10-02 · 原创研究 · [PMID 41038966](https://pubmed.ncbi.nlm.nih.gov/41038966/) · [DOI](https://doi.org/10.1038/s41746-025-01972-w)

这项回顾性观察研究分析了纽约市某大型医疗系统2023年10月至2024年8月的EHR审计日志，考察75名医护人员对AI生成的患者消息草稿的实际使用情况。总体采纳率偏低（19.4%），提示词优化后使用率由12%升至20%（医生提升尤为明显）；系统为所有消息生成草稿，其中80%的消息本无需回复，反而增加了审阅负担、可能削弱效率。文本分析显示医护偏好简洁、信息密度高的草稿，并存在角色差异（医生偏好更短草稿，临床支持人员偏好更具共情的回复）；AI草稿使消息周转时间缩短6.76%，但所需InBasket操作步骤略有增加。

> **要点**：75名医护对AI草稿的总体采纳率仅19.4%，消息周转时间缩短6.76%，但80%的消息本无需回复而徒增审阅负担。

### 15. 利用大语言模型对电子病历中敏感健康信息进行去标识化与时间归一化

*Leveraging large language models for the deidentification and temporal normalization of sensitive health information in electronic health records.*

**npj Digital Medicine** · 2025-08-13 · 原创研究 · [PMID 40804132](https://pubmed.ncbi.nlm.nih.gov/40804132/) · [DOI](https://doi.org/10.1038/s41746-025-01921-7)

研究依托SREDH/AI CUP 2023竞赛，使用3,244份含替代敏感健康信息与规范化日期的病理报告，评估大语言模型在敏感信息去标识化与时间归一化任务上的表现。竞赛吸引291支队伍参加，顶尖队伍的macro-F1超过0.8，且77.2%的方案使用了大语言模型。进一步比较上下文学习与微调发现，微调（尤其是低秩适配LoRA）能提升性能，但在参数超过约6B的模型上因过拟合而停滞甚至下降；数据增强、训练策略与混合方法具有重要价值。

> **要点**：3,244份病理报告的去标识化任务中顶尖方案macro-F1>0.8、77.2%采用LLM；LoRA微调有效但在超过6B参数的模型上因过拟合而收益递减。

### 16. 基于关键词的AI辅助放射学报告生成：一项试点研究

*Keyword-based AI assistance in the generation of radiology reports: A pilot study.*

**npj Digital Medicine** · 2025-08-01 · 原创研究 · [PMID 40750683](https://pubmed.ncbi.nlm.nih.gov/40750683/) · [DOI](https://doi.org/10.1038/s41746-025-01889-4)

研究提出基于关键词的AI辅助放射报告范式并评估其临床落地潜力。以100例颅内肿瘤患者的MRI数据为对象，2名放射科住院医师分别独立撰写常规完整报告与关键词报告，随后由AI依据关键词报告及设计好的提示词生成报告。结果显示两名住院医师的报告耗时中位数分别缩短27.1%与28.8%（平均28.0%），AI生成报告与常规报告的质量评分无显著差异(p>0.50)，AI报告的主要诊断准确率分别为68.0%和76.0%（平均72.0%）。

> **要点**：关键词驱动的AI辅助报告使撰写时间平均缩短28.0%且质量评分无显著差异(p>0.50)，主要诊断准确率平均72.0%。

### 17. 大语言模型在围手术期医学中的临床与经济影响：一项随机交叉试验

*Clinical and economic impact of a large language model in perioperative medicine: a randomized crossover trial.*

**npj Digital Medicine** · 2025-07-21 · 随机对照试验 · [PMID 40691284](https://pubmed.ncbi.nlm.nih.gov/40691284/) · [DOI](https://doi.org/10.1038/s41746-025-01858-x)

该随机交叉试验在新加坡中央医院的住院医师中评估基于LLM的临床决策支持系统PEACH（围手术期AI聊天机器人）对术前评估文书效率、质量、用户接受度和成本效果的影响。PEACH未显著缩短总体文书时间，但亚组分析显示中等复杂度患者可节省5.77分钟(p=0.010)、经验丰富的医师可节省4.6分钟(p=0.040)；评估者在57.1%的病例中更偏好PEACH辅助的文书，问题列表纳入情况有所改善(p=0.05)。经济模型预测每年可为机构节省197,501新元（约146,297美元），敏感性分析范围为48,979–197,499新元（36,280–146,295美元）。

> **要点**：PEACH未显著缩短总体文书时间，但中等复杂度病例节省5.77分钟(p=0.010)，预计年节省约14.6万美元。

### 18. 基于GPT-4o的电子健康记录认知障碍分期识别框架

*A GPT-4o-powered framework for identifying cognitive impairment stages in electronic health records.*

**npj Digital Medicine** · 2025-07-03 · 原创研究 · [PMID 40610683](https://pubmed.ncbi.nlm.nih.gov/40610683/) · [DOI](https://doi.org/10.1038/s41746-025-01834-5)

研究开发了基于GPT-4o的认知障碍(CI)分期分类框架，整合纵向病史摘要、多步推理和置信度感知决策，以从非结构化临床病历中识别阿尔茨海默病及相关痴呆。在Mass General Brigham的1002名Medicare患者、共165,926份病历上评估，加权Cohen's kappa达0.95、Spearman相关系数0.93，优于另外两个语言模型（加权kappa 0.82–0.85）；在769名记忆门诊患者的独立数据集上进行临床痴呆评定(CDR)评分，加权kappa为0.83。研究还设计了融合该框架与临床医师监督的交互式AI智能体以保障可靠性与安全性。

> **要点**：GPT-4o框架在165,926份病历中判定认知障碍分期，加权kappa 0.95，显著优于其他语言模型(0.82–0.85)。

---

## 六、面向患者的沟通、教育与问答（19 篇）

### 1. 用于术前患者准备的对话式人工智能：实施、验证与患者满意度

*Conversational artificial intelligence for pre-procedural patient preparation: implementation, validation and patient satisfaction.*

**npj Digital Medicine** · 2026-07-04 · 原创研究 · [PMID 42401677](https://pubmed.ncbi.nlm.nih.gov/42401677/) · [DOI](https://doi.org/10.1038/s41746-026-02959-x)

研究前瞻性评估了AI语音助手Sofiya（定制LLM+智能体AI框架+对话式AI）在心导管检查术前电话随访中的应用，任务包括宣教、采集临床数据、答疑及必要时转接护士。2025年1月16日至7月17日，1431名患者共接到1606次通话；第一阶段（临床-开发者协作90天）806次通话完成率逐步提升至平均86.4%，第二阶段（护士主导90天）800次通话完成率维持在87.9%；AI系统错误在两阶段分别为48次（6.0%）和24次（2.6%）。结果表明语音AI助手可承担术前准备的重复性工作，使护士聚焦于临床照护。

> **要点**：AI语音助手Sofiya完成1606次术前电话，成功完成率达86.4%–87.9%，系统错误率降至2.6%。

### 2. 核医学领域大语言模型回答患者医疗与行政咨询的真实世界评估

*Real-world evaluation of large language model for patients medical and administrative queries in nuclear medicine.*

**npj Digital Medicine** · 2026-06-17 · 基准/评估 · [PMID 42303756](https://pubmed.ncbi.nlm.nih.gov/42303756/) · [DOI](https://doi.org/10.1038/s41746-026-02889-8)

研究前瞻性收集患者咨询问题，分别由核医学医师、行政人员和ChatGPT v4.1作答，由医学与行政专家及两名独立非专家依据QUEST框架的17个维度中的15个进行Likert评分，并逐题判断LLM回答相对人类回答“更好/相当/更差”，以二项检验评估其表现是否超过50%。共分析339条药物相互作用、42条医疗和76条行政咨询。医疗问题上，10个维度中有8个维度76–98%的LLM回答被医学专家评为与人类相当或更好（p<0.001）；行政问题上，非专家评价者认为LLM回答更具信息量（97%）且更受偏好（86%）。医疗问题中LLM回答被评为更具信息量（67%），但人类回答更易理解（62%），总体偏好上存在60%的分歧；LLM回答的评分者一致性（PABAK）在医疗（0.14–0.90 vs −0.90–0.52）与行政（0.92–1.00 vs −0.63–−0.13）问题上均高于人类回答。

> **要点**：ChatGPT v4.1的回答在8/10维度上有76–98%被专家评为不劣于人类（p<0.001），行政类问题中97%被非专家认为更具信息量，但临床应用前仍需进一步验证。

### 3. 大语言模型在临床试验参与知情同意流程中的表现

*Performance of a large language model in the informed consent process for participation in a clinical trial.*

**npj Digital Medicine** · 2026-06-11 · 原创研究 · [PMID 42277365](https://pubmed.ncbi.nlm.nih.gov/42277365/) · [DOI](https://doi.org/10.1038/s41746-026-02745-9)

这项概念验证研究评估了被约束在特定试验文档内的大语言模型能否对知情同意问题给出技术准确、可复现且幻觉极少的回答，并检验以第二个LLM作为“评审者”复现人类文档依据式准确性评价的可行性。人类评审与评审LLM给出的平均准确性评分均较高（人类4.8，95%CI 4.7–4.9；LLM 4.7，4.6–4.8），可读性适宜（人类评为7.5年级，LLM为6.4年级），语义一致性几乎相同（均为0.91）。但评分者间信度差异显著：人类评审κ仅为0.1（0.0–0.2），而评审LLM达0.8；人类评分分歧主要源于认为回答虽技术准确，却缺乏对话语气、情境意识与共情。

> **要点**：受试验文档约束的LLM知情同意回答准确性达4.8/5，且评审LLM的评分一致性（κ=0.8）远高于人类评审（κ=0.1）。

### 4. 超越翻译：面向医疗中AI口译服务的以患者为中心研究议程

*Beyond translation: a patient-centered research agenda for artificial intelligence interpreter services in healthcare.*

**npj Digital Medicine** · 2026-05-15 · 综述/观点 · [PMID 42141054](https://pubmed.ncbi.nlm.nih.gov/42141054/) · [DOI](https://doi.org/10.1038/s41746-026-02764-6)

这是一篇通讯文章，指出AI在医疗语言可及性服务中的应用日益增多，但若干方面仍研究不足。作者提出一项研究议程，以指导形成关于患者如何看待AI语言服务、以及其如何影响临床接触中信任与理解的证据，并据此制定实施策略。文章同时建议建立治理体系，以降低潜在危害并使有非英语语言偏好的患者充分获益。

> **要点**：提出以患者为中心的AI口译服务研究议程，并呼吁建立治理体系以保障非英语偏好人群的公平获益。

### 5. RESPECT：一个具备准确性、安全性与利益相关方评估的知情同意对话式AI系统

*RESPECT: a conversational AI system for informed consent with accuracy, safety, and stakeholder-centered evaluation.*

**npj Digital Medicine** · 2026-05-09 · 原创研究 · [PMID 42106536](https://pubmed.ncbi.nlm.nih.gov/42106536/) · [DOI](https://doi.org/10.1038/s41746-026-02691-6)

研究开发了 RESPECT（研究参与者参与与知情同意工具），一个采用检索增强生成（RAG）、将回答锚定在知情同意源文件上的 LLM 同意助手。团队通过留一交叉验证与问题改写分析验证其信息检索准确性，并提出以恰当拒答率与效用两个维度构成的新型安全评估框架，绘制类比 ROC-AUC 的拒答-效用曲线（RUC）。结果显示 RESPECT 的恰当拒答率显著高于 GPT-4，但代价是对合法问题的回答效用下降；此外还邀请科研人员进行利益相关方评估，考察准确性、全面性与满意度。

> **要点**：首个基于 RAG 的科研知情同意 LLM 助手，恰当拒答率显著高于 GPT-4（以效用下降为代价），并提出拒答-效用曲线（RUC）评估框架。

### 6. 大语言模型在放射学报告可读性方面的多维评估

*Multidimensional evaluation of large language models in radiology report readability.*

**npj Digital Medicine** · 2026-04-01 · 原创研究 · [PMID 41922696](https://pubmed.ncbi.nlm.nih.gov/41922696/) · [DOI](https://doi.org/10.1038/s41746-026-02589-3)

研究采用序贯两阶段设计，先回顾性评估320份放射学报告，再在800例患者中进行临床验证，比较三种大语言模型生成面向患者报告的表现，并考察人口学特征对可读性与理解的影响。三种LLM均显著提升报告可读性（P<0.05），其中DeepSeek-R1在该队列中表现可能更优；人口学分析显示较高学历以及（同等学历下）较大年龄与更好的理解相关。临床验证表明阅读简化报告可显著改善患者的主观与客观理解并显著缓解就医焦虑（P<0.05），但仍存在模型输出不一致、解剖细节缺失等局限，提示LLM应作为放射科医生的辅助沟通工具而非独立方案。

> **要点**：三种LLM均显著改善放射学报告可读性（P<0.05），DeepSeek-R1表现相对最佳，简化报告显著提升患者理解并减轻焦虑。

### 7. 评估大语言模型在临床医生参与下简化非英语医疗知情同意书

*Evaluating large language models for simplifying non-English medical consent with clinician involvement.*

**npj Digital Medicine** · 2026-04-01 · 原创研究 · [PMID 41922537](https://pubmed.ncbi.nlm.nih.gov/41922537/) · [DOI](https://doi.org/10.1038/s41746-026-02591-9)

研究收集9家医院的中文手术知情同意书官方版本，为每份文件生成原始版、LLM简化版与医生修订版三个版本，采用定量指标与专家评分比较文本结构、可读性、内容质量及普通人理解度。结果显示LLM简化版提升了可读性与理解度，但内容质量下降，尤其是风险信息的缺失；医生修订在保持清晰度的同时恢复了准确性，并获得最高的理解得分。线性混合效应模型证实上述趋势，凸显人机协作在患者沟通中的价值。

> **要点**：LLM简化中文知情同意书提高可读性但削弱风险信息，经临床医生修订后既恢复准确性又获得最高理解度。

### 8. AI增强的沟通提高HIV高负担人群的PrEP启动率与持续性

*AI-augmented communication improves HIV PrEP initiation and persistence in populations disproportionately impacted by HIV.*

**npj Digital Medicine** · 2026-03-07 · 队列研究 · [PMID 41792418](https://pubmed.ncbi.nlm.nih.gov/41792418/) · [DOI](https://doi.org/10.1038/s41746-026-02519-3)

这项回顾性队列研究评估了在美国AIDS Healthcare Foundation下属诊所部署的AI聊天机器人对暴露前预防（PrEP）支持的效果，纳入155,217名符合条件的成年人。结果显示，与聊天机器人有互动的个体在PrEP启动率、随访就诊率和预约依从性方面均高于未使用者。互动参与度在较年轻人群及少数种族/族裔患者中最高，提示AI辅助沟通可能改善PrEP服务链条中的多个环节，并惠及受HIV影响较重的人群。

> **要点**：155,217人队列中，使用AI聊天机器人者的PrEP启动、随访出席与预约依从性均高于未使用者。

### 9. 医疗信任与在线健康信息获取的分岔轨迹：大语言模型时代的下一步

*Diverging trajectories of trust in healthcare and on-line information seeking: what's next with LLMs.*

**npj Digital Medicine** · 2026-01-31 · 综述/观点 · [PMID 41620476](https://pubmed.ncbi.nlm.nih.gov/41620476/) · [DOI](https://doi.org/10.1038/s41746-026-02408-9)

这篇通讯指出，过去 25 年互联网使用激增带动了在线健康信息搜寻的同步增长，而同期美国公众对医疗系统的信任持续下滑，二者虽非因果但相互关联，成本与可及性受限是信任下降的主要驱动因素。作者认为，LLM 提供了前所未有的个性化、情境感知健康信息，可能进一步取代临床医生成为患者获取健康信息与指导的第一接触点。文章主张，以患者为中心的医疗系统应主动整合而非对抗这些工具，以重建信任、提升健康素养并加深患者参与。

> **要点**：LLM 正加速患者绕开医生自行获取健康信息，医疗系统应与之协作而非竞争，以重建信任与健康素养。

### 10. 基于微信的人工智能智能体用于骨科患者术后照护的随机对照试验

*A randomized controlled trial of a WeChat-based artificial intelligence agent for postoperative care in orthopedic patients.*

**npj Digital Medicine** · 2026-01-17 · 随机对照试验 · [PMID 41548028](https://pubmed.ncbi.nlm.nih.gov/41548028/) · [DOI](https://doi.org/10.1038/s41746-025-02269-8)

该随机对照试验（中国临床试验注册中心ChiCTR2500101273）纳入261例骨科术后患者，140例使用GPT-4驱动的微信AI智能体获得实时、情境感知的支持，121例接受医生主导的常规沟通。AI系统响应速度远快于医生（0.5±0.6 vs 358±47.5分钟，p<0.05），反馈的感知质量更高，但准确性略低（93.9% vs 98.1%，p<0.05）。术后1个月和3个月时，AI组在膝关节功能（IKDC）、躯体健康（PCS）和总体满意度上显著更优（均p<0.05）；至6个月随访时组间差异不再显著（p>0.05），提示长期结局相当。

> **要点**：GPT-4微信智能体带来术后短期功能与体验获益（1、3个月均p<0.05），但6个月时与医生主导照护无差异。

### 11. 大语言模型在术前与出院教育中的有效性：基于评价框架的系统评价

*Effectiveness of large language models in preoperative and discharge education: a systematic review based on an evaluation framework.*

**npj Digital Medicine** · 2026-01-07 · 系统评价/Meta分析 · [PMID 41501337](https://pubmed.ncbi.nlm.nih.gov/41501337/) · [DOI](https://doi.org/10.1038/s41746-025-02302-w)

该系统评价检索五个数据库（建库至2025年4月18日），最终纳入20项研究，采用已发表的四维度框架评估基于LLM的术前与出院教育干预，并以热图呈现各维度的报告模式，结果作叙述性综合。多数研究报告LLM干预在减轻焦虑和部分满意度维度上有获益，但在疼痛、康复及其他满意度要素方面与传统教育材料相比无显著差异。评价子维度的报告很不均衡，可信度与模型性能极少与临床终点一并报告，提示未来研究需将以模型为中心与以患者为中心的评估相结合。

> **要点**：纳入20项研究显示LLM教育干预可减轻焦虑，但对疼痛与康复无显著获益，且评估维度报告存在明显缺口。

### 12. 利用集成电子病历的LLM智能体实现前列腺癌患者的个性化教育

*Personalizing prostate cancer education for patients using an EHR-Integrated LLM agent.*

**npj Digital Medicine** · 2025-12-18 · 原创研究 · [PMID 41413170](https://pubmed.ncbi.nlm.nih.gov/41413170/) · [DOI](https://doi.org/10.1038/s41746-025-02166-0)

该质量改进研究开发并评估了与临床电子病历（EHR）集成的LLM智能体MedEduChat，用于加强前列腺癌患者教育。2024年5月至2025年4月，梅奥诊所15例非转移性前列腺癌患者和3名临床医生与该智能体进行了交互。结果显示其可用性评分较高（UMUX=83.7/100），患者健康信心评分从9.9升至13.9；临床医生对聊天记录的评分为正确性2.9/3、完整性2.7/3、安全性2.7/3，个性化程度中等（2.3/3）。

> **要点**：EHR集成的LLM智能体MedEduChat可用性达83.7/100，患者健康信心评分从9.9升至13.9，医生评正确性2.9/3。

### 13. 评估社交辅助机器人对患者参与度与照护质量影响的随机试点研究

*A randomized pilot study evaluating socially assistive robot effects on patient engagement and care quality.*

**npj Digital Medicine** · 2025-12-02 · 随机对照试验 · [PMID 41331089](https://pubmed.ncbi.nlm.nih.gov/41331089/) · [DOI](https://doi.org/10.1038/s41746-025-02117-9)

该随机对照外部试点研究(ISRCTN96689284)在马里博尔大学医学中心外科病房纳入229名患者，随机分为社交辅助机器人(SAR)干预组（标准照护+SAR）与对照组（仅标准照护）。SAR具备经验证的故事驱动型对话能力，通过预设对话流程提供标准化患者教育、支持与基础分诊；共同主要结局为患者参与度与感知照护质量，次要结局为健康相关生活质量。结果显示对总体参与度与感知照护质量的效应有限，但在疼痛管理方面呈现积极影响，情境因素调节了干预效果；未检出明显负面效应，较高的留存率证明了在外科病房实施SAR的可行性。

> **要点**：229例患者的随机试点显示SAR对总体参与度与照护质量效应有限，但改善疼痛管理且实施可行、无明显危害。

### 14. 共同设计的教育干预能否帮助消费者批判性思考向ChatGPT提出健康问题？一项随机对照试验结果

*Can co-designed educational interventions help consumers think critically about asking ChatGPT health questions? Results from a randomised-controlled trial.*

**npj Digital Medicine** · 2025-11-17 · 随机对照试验 · [PMID 41249473](https://pubmed.ncbi.nlm.nih.gov/41249473/) · [DOI](https://doi.org/10.1038/s41746-025-02056-5)

这项随机对照试验评估了两种简短的共同设计健康素养教育干预（动画版与图片版），旨在帮助公众批判性反思向ChatGPT提出健康问题的行为。研究通过在线调查面板招募有ChatGPT使用经验且无大学学历的澳大利亚成年人，主要结局为在“低风险”和“高风险”健康情境下向ChatGPT提问的意愿，分析样本为619人中的592人。结果显示，动画组(n=191)在高风险情境下的使用意愿(M=2.42/5, 95%CI 2.27-2.56)低于图片组(n=203, M=2.69/5, 95%CI 2.54-2.83, p=0.010)，两组均低于未观看教育内容的对照组(n=205, M=3.12/5, 95%CI 2.98-3.27, p<0.001)；但对低风险情境下的使用意愿无影响(p=0.800)。

> **要点**：动画式教育干预使高风险健康情境下使用ChatGPT提问的意愿显著降低(2.42 vs 图片组2.69, p=0.010; 对照组3.12, p<0.001)，但对低风险情境无效(p=0.800)。

### 15. 我们是否需要AI守护者来抵御健康信息过载？

*Do we need AI guardians to protect us from health information overload?*

**npj Digital Medicine** · 2025-10-27 · 综述/观点 · [PMID 41145602](https://pubmed.ncbi.nlm.nih.gov/41145602/) · [DOI](https://doi.org/10.1038/s41746-025-02093-0)

这是一篇观点文章，指出数字健康技术使个体获得了前所未有的生物特征数据与健康洞见，但过度监测可能导致疲劳、焦虑与信息过载，有时反而降低参与度并恶化结局。文章探讨AI驱动的健康助手如何通过筛选、情境化与个性化健康信息来应对这一挑战，从而在支持知情自我管理的同时减轻数字健康技术带来的非预期危害。

> **要点**：提出以AI助手筛选与个性化健康信息，缓解数字健康带来的信息过载与焦虑。

### 16. 评估人在回路策略用于AI辅助的患者出院指导翻译：一项多学科分析

*Evaluating human-in-the-loop strategies for artificial intelligence-enabled translation of patient discharge instructions: a multidisciplinary analysis.*

**npj Digital Medicine** · 2025-10-24 · 原创研究 · [PMID 41136708](https://pubmed.ncbi.nlm.nih.gov/41136708/) · [DOI](https://doi.org/10.1038/s41746-025-02055-6)

研究针对阿拉伯语、亚美尼亚语、孟加拉语、简体中文、索马里语和西班牙语6种语言的住院出院指导自由文本，比较了三种翻译方式：ChatGPT-4o直接翻译、专业语言学家翻译、以及人在回路（AI生成+专业译员后编辑），并由语言学家、临床医生与家庭照护者用5分Likert量表评分。ChatGPT-4o相对专业翻译表现波动，在数字资源不足的语言（亚美尼亚语、索马里语）上评分最差。人在回路翻译在所有语言上均达到甚至优于专业翻译（如亚美尼亚语总体质量均分3.9 [95%CI 3.7–4.2] vs 专业3.6 [3.4–3.9]，p=0.01），被偏好比例最高（46.5% vs 28.4%），且平均耗时更短（7.1 [5.4–8.8] vs 16.8 [13.7–19.9]分钟，p<0.001）。

> **要点**：人在回路翻译质量不劣于（常优于）专业翻译且更快（7.1 vs 16.8分钟，p<0.001），纯ChatGPT-4o在低资源语言上表现最差。

### 17. 在生成式AI时代重新构想患者报告结局

*Reimagining patient-reported outcomes in the age of generative AI.*

**npj Digital Medicine** · 2025-10-23 · 综述/观点 · [PMID 41131097](https://pubmed.ncbi.nlm.nih.gov/41131097/) · [DOI](https://doi.org/10.1038/s41746-025-02006-1)

本文为观点性综述，认为生成式人工智能（尤其是大语言模型）为重新思考患者报告结局(PRO)的测量与实施提供了契机。传统PRO植根于自上而下的预设量表与单维性假设，难以刻画真实健康体验的波动性与多维性；而生成式AI支持自下而上、基于叙事、情境感知的语言处理方式。作者提出两条方向：一是用生成式AI改良现有心理测量模型，二是转向能够综合患者叙事的“语言原生”工具；但要实现其潜力，仍须解决验证、临床可操作性、公平性与信任等关键挑战。

> **要点**：生成式AI有望推动PRO从预设量表转向语言原生的叙事综合，但验证、公平性与信任问题亟待解决。

### 18. 用对话式AI平台变革医疗服务

*Transforming healthcare delivery with conversational AI platforms.*

**npj Digital Medicine** · 2025-09-30 · 综述/观点 · [PMID 41028209](https://pubmed.ncbi.nlm.nih.gov/41028209/) · [DOI](https://doi.org/10.1038/s41746-025-01968-6)

本文为观点类文章，讨论生成式AI驱动的对话式智能体在医疗服务中的应用前景。作者指出，在医务人员行政负担加重、与患者接触时间减少的背景下，对话式智能体可通过流畅且有情境的对话完成信息采集、答疑、就诊记录书写与临床决策支持。文章同时强调，要实现其潜力必须经过严格验证与审慎实施，并坚守安全、公平和以人为本的照护原则。

> **要点**：生成式对话式AI有望减轻医疗行政负担并支持诊疗，但需严格验证及安全与公平保障。

### 19. 大语言模型对全美医疗系统中患者自报症状与需求的分类

*LLM enabled classification of patient self-reported symptoms and needs in health systems across the USA.*

**npj Digital Medicine** · 2025-07-01 · 原创研究 · [PMID 40595018](https://pubmed.ncbi.nlm.nih.gov/40595018/) · [DOI](https://doi.org/10.1038/s41746-025-01779-9)

美国各医疗系统官网每月访问量高达2亿人次，需将患者搜索准确路由至相应服务流程。研究对约15家美国医疗系统网站的搜索记录进行标注与特征刻画，训练并评估了一个多标签、多分类深度神经网络（训练集含504个独立类别），将其部署到覆盖全部50个州的医疗系统，并与LLM进行对比。模型在504类搜索分类上的各项指标表现约在0.70–0.90之间（随纳入类别数变化）；GPT-4在给定类别主列表时表现相当，并能补充覆盖监督分类器遗漏的类别，二者互补价值明显。该研究是迄今针对美国医疗系统患者搜索行为最大规模的多中心全国性研究。

> **要点**：监督分类器在504类患者搜索上表现约0.70–0.90，GPT-4表现相当并可增强其覆盖面。

---

## 七、精神心理健康与行为干预（12 篇）

### 1. 依恋、孤独感和社会支持作为对话式AI心理健康干预效果的调节因素

*Attachment, loneliness, and social support as moderators of conversational AI-based mental health outcomes.*

**npj Digital Medicine** · 2026-07-07 · 随机对照试验 · [PMID 42414532](https://pubmed.ncbi.nlm.nih.gov/42414532/) · [DOI](https://doi.org/10.1038/s41746-026-02974-y)

这项预注册随机对照试验纳入977名18–32岁大学生，将基于对话式AI的干预、整合式团体治疗与等待名单对照组进行12周比较并随访3个月。AI干预在干预后和随访时在广泛性焦虑症状降低、幸福感和生活满意度提升方面优于其他两组，并相对对照组降低了抑郁；团体治疗改善了干预后抑郁与幸福感；PTSD症状各组无差异。孤独感高、社会支持低和不安全依恋（焦虑型/回避型）者从AI干预中获益更多、使用更多，高孤独感者的使用量约为低孤独感者的两倍，且关系脆弱性与焦虑改善的关联完全由使用参与度中介。

> **要点**：N=977的RCT显示对话式AI干预在降低焦虑、提升幸福感上优于团体治疗和对照，且对孤独/不安全依恋者获益最大。

### 2. 年轻人对青少年心理健康领域对话式生成式人工智能的看法与建议

*Young people's perceptions and recommendations for conversational generative artificial intelligence in youth mental health.*

**npj Digital Medicine** · 2026-06-19 · 原创研究 · [PMID 42321405](https://pubmed.ncbi.nlm.nih.gov/42321405/) · [DOI](https://doi.org/10.1038/s41746-026-02888-9)

研究以Mia（Mental health Intelligence Agent，一款原为澳大利亚青少年服务机构专业人员设计的生成式AI聊天机器人）为对象，在共同设计（co-design）基础上组织32名年轻人参加线上工作坊，探讨其对青少年心理健康领域genAI聊天机器人的看法，并就如何将Mia重新定位为面向消费者的产品及融入服务体系提出建议。反身性主题分析形成四个主题：在不使照护去人性化的前提下让AI更具人性、需要知道“引擎盖下”的运作机制、是否为“合适的工具、合适的场景、合适的时机”、以及在安全基础上实现个性化。研究结果为genAI心理聊天机器人的伦理、设计、开发、实施与治理提供了依据。

> **要点**：32名年轻人参与的定性共同设计研究提炼出4大主题，强调透明度、可个性化与安全边界是青少年接受genAI心理聊天机器人的前提。

### 3. 利用大语言模型进行数字表型分析以检测患者抑郁状态的变化

*Digital phenotyping with large language models to detect depressive state changes in patients.*

**npj Digital Medicine** · 2026-06-15 · 原创研究 · [PMID 42298144](https://pubmed.ncbi.nlm.nih.gov/42298144/) · [DOI](https://doi.org/10.1038/s41746-026-02883-0)

研究评估大语言模型（LLM）从智能手机与可穿戴设备的连续数字表型数据中检测重性抑郁发作患者抑郁严重程度变化的潜力，并比较了上下文学习（in-context learning）与微调两类策略。结果显示，少样本提示的LLM与微调后的LLM均优于传统基线方法；仅用嵌入（embedding-only）与QLoRA微调的效果相当，前者在单一特征上表现更好，后者在多特征组合输入上更优。研究提示LLM可整合异质行为数据用于心理健康分析，但摘要未给出具体准确率数值，并强调真实应用中需要临床验证与伦理保障。

> **要点**：少样本提示与微调后的LLM在数字表型数据上检测抑郁严重程度变化均优于传统基线，embedding-only与QLoRA效果相当。

### 4. 基于CBT的NLP驱动AI对话智能体用于心理健康干预的有效性：系统评价与Meta分析

*The effectiveness of CBT-based NLP-enabled AI conversational agents for mental health intervention: a systematic review and meta-analysis.*

**npj Digital Medicine** · 2026-06-12 · 系统评价/Meta分析 · [PMID 42286191](https://pubmed.ncbi.nlm.nih.gov/42286191/) · [DOI](https://doi.org/10.1038/s41746-026-02886-x)

该系统评价与Meta分析纳入15项随机对照试验、共1,737名参与者，评估以认知行为疗法（CBT）为基础的NLP驱动AI对话智能体（CAs）在各类心理健康问题中的干预效果。结果显示，此类对话智能体对抑郁症状具有小到中等效应、对负性情绪具有小效应；而在校正发表偏倚后，对广泛性焦虑、压力和积极情绪的效应均不显著。亚组分析初步提示多模态CAs在减轻抑郁症状上可能优于单模态CAs，且不含心理教育内容者的即时效应量更大；Meta回归显示研究质量越高效应量越大（提示当前文献可能低估真实疗效），年龄越小者抑郁症状改善越明显。

> **要点**：15项RCT（n=1,737）显示CBT类AI对话智能体对抑郁症状有小到中等效应，但对焦虑、压力、积极情绪的效应在校正发表偏倚后不显著。

### 5. AI驱动与规则驱动的对话式智能体对抑郁、焦虑与压力的干预效果：一项Meta分析

*Effectiveness of AI and rule-based conversational agents for depression, anxiety and stress: A meta-analysis.*

**npj Digital Medicine** · 2026-05-29 · 系统评价/Meta分析 · [PMID 42209800](https://pubmed.ncbi.nlm.nih.gov/42209800/) · [DOI](https://doi.org/10.1038/s41746-026-02820-1)

该系统评价与Meta分析纳入48项随机对照试验、共28,071名参与者，评估对话式智能体（含AI驱动与规则驱动系统）作为可规模化心理健康干预的疗效。结果显示其对抑郁（SMD -0.27）、焦虑（SMD -0.20）与压力（SMD -0.26）症状均有小到中等但具统计学意义的改善；采用稳健方差估计(RVE)处理研究内依赖，结果与随机效应模型一致。亚组分析提示临床人群与较短疗程干预效应更大，Meta回归未发现结局测量时点的显著影响；总体偏倚风险较低（部分研究存在数据缺失或选择性报告问题），发表偏倚可忽略。

> **要点**：48项RCT、28,071名参与者显示对话式智能体可降低抑郁（SMD -0.27）、焦虑（SMD -0.20）与压力（SMD -0.26）。

### 6. 动机性访谈聊天机器人在基层医疗中改善生活方式：一项实用性随机对照试验

*Motivational interviewing chatbot improves lifestyle in primary healthcare settings in a pragmatic randomised controlled trial.*

**npj Digital Medicine** · 2026-05-25 · 随机对照试验 · [PMID 42185597](https://pubmed.ncbi.nlm.nih.gov/42185597/) · [DOI](https://doi.org/10.1038/s41746-026-02728-w)

这是首个在常规基层医疗中检验自动化动机性访谈（MI）聊天机器人的实用性、开放标签、多中心 RCT，在香港三家基层医疗机构将 627 名 45–75 岁患有或存在高血压/糖尿病风险的成人随机分为 12 周 MI 聊天机器人加常规照护组或仅常规照护组。修正意向性治疗分析（n=460）显示，12 周时干预组体力活动（+576 MET-分钟/周）、果蔬摄入（+0.27 份/天）与承诺行动（+0.95 a.u.）显著优于对照，依从者获益更大提示剂量-反应关系。亚组分析中基线体力活动低者改善更明显（+537 MET-分钟/周），高血压参与者收缩压下降 5.03 mmHg；效应维持至 9 个月随访，未报告严重不良事件。

> **要点**：627 人 RCT 中 MI 聊天机器人使体力活动增加 576 MET-分钟/周，高血压亚组收缩压降低 5.03 mmHg，效果维持至 9 个月。

### 7. 聊天机器人管理抑郁与焦虑症状的系统评价与Meta分析

*Systematic review and meta analysis of chatbots in the management of depressive and anxiety symptoms.*

**npj Digital Medicine** · 2026-03-25 · 系统评价/Meta分析 · [PMID 41882250](https://pubmed.ncbi.nlm.nih.gov/41882250/) · [DOI](https://doi.org/10.1038/s41746-026-02566-w)

该系统评价与Meta分析检索2017年1月至2025年10月的PubMed、Embase、PsycINFO、Scopus与Web of Science，纳入比较聊天机器人与任意对照条件的随机对照试验，用Cochrane修订版工具评估偏倚风险，并以随机效应模型合并Hedges' g。39项符合条件的研究中，38项（n=7,401）纳入抑郁分析、34项（n=7,621）纳入焦虑分析。聊天机器人显著减轻抑郁症状（g=0.31，95% CI 0.17-0.46）与焦虑症状（g=0.28，95% CI 0.05-0.51）；亚组分析显示临床与亚临床样本的抑郁改善效应大于非临床样本（p=0.001）。

> **要点**：39项RCT的Meta分析显示聊天机器人显著改善抑郁（g=0.31）与焦虑（g=0.28），对症状更重者效果更明显。

### 8. 通用AI聊天机器人如何延续强迫症与焦虑障碍的跨诊断模型

*A transdiagnostic model for how general purpose AI chatbots can perpetuate OCD and anxiety disorders.*

**npj Digital Medicine** · 2026-03-13 · 综述/观点 · [PMID 41826639](https://pubmed.ncbi.nlm.nih.gov/41826639/) · [DOI](https://doi.org/10.1038/s41746-026-02531-7)

该综述提出一个跨诊断理论框架，论述数百万人转向通用AI聊天机器人寻求心理支持时，可能强化不确定性不耐受、“必须知道”式强迫行为与完美主义等症状。作者结合临床观察与新兴证据指出，聊天机器人的交互特性会加剧作为强迫症与焦虑障碍核心过程的跨诊断回避，使适应不良循环持续并阻碍纠正性学习。文章进而为临床医生、用户、开发者和政策制定者提出促进更健康使用的应对策略。

> **要点**：反复求助通用聊天机器人可能强化回避行为，延续强迫与焦虑症状的适应不良循环。

### 9. 基于智能手机语音的可扩展抑郁监测：多模态基准与主题分析

*Scalable depression monitoring with smartphone speech using a multimodal benchmark and topic analysis.*

**npj Digital Medicine** · 2026-02-28 · 原创研究 · [PMID 41764298](https://pubmed.ncbi.nlm.nih.gov/41764298/) · [DOI](https://doi.org/10.1038/s41746-026-02486-9)

研究分析了284名德语成年人（128名重性抑郁障碍患者、156名对照）的3151份每周语音日记，以预测贝克抑郁量表（BDI）评分，探索可扩展的抑郁数字表型标志物。句子嵌入模型显著优于词汇和声学基线：Qwen3-8B达到MAE 4.65、R²=0.34，将multilingual-E5与Qwen3-8B堆叠泛化后进一步提升至MAE 4.37、R²=0.41，而音频嵌入几乎未提供增量价值。在仅纳入抑郁患者的分析中multilingual-E5为最佳单一模态（MAE 6.74、R²=0.20）；BERTopic提取出六个连贯主题，其中“痛苦与照护”主题对应的BDI评分最高，支持其临床表面效度。

> **要点**：LLM句子嵌入（Qwen3-8B与E5堆叠）预测BDI达MAE 4.37、R²=0.41，优于声学与词汇基线。

### 10. 面向心理困扰的大龄青少年及青年的引导式聊天机器人心理干预：约旦随机临床试验

*A guided chatbot-based psychological intervention for psychologically distressed older adolescents and young adults: a randomised clinical trial in Jordan.*

**npj Digital Medicine** · 2026-01-15 · 随机对照试验 · [PMID 41540250](https://pubmed.ncbi.nlm.nih.gov/41540250/) · [DOI](https://doi.org/10.1038/s41746-025-02142-8)

该随机对照试验在约旦纳入344名存在心理困扰的青年，比较10节次聊天机器人干预加5次每周简短支持电话（STARS）与强化常规照护（EUC），主要结局为霍普金斯症状清单（HSCL）测得的焦虑与抑郁严重程度变化，主要评估时点为治疗后3个月。3个月时，STARS组焦虑（效应量0.70）与抑郁（效应量0.61）的下降幅度显著大于EUC组，心理困扰、个人化问题和功能损害的改善以及幸福感与能动感的提升亦更明显。即使在症状较重的人群中疗效仍得以保持，提示该引导式聊天机器人是可规模化推广的循证心理干预方案。

> **要点**：引导式聊天机器人干预（N=344）使3个月时焦虑（效应量0.70）与抑郁（0.61）改善显著优于强化常规照护。

### 11. 结合生理监测的AI引导数字干预可减少实验性创伤后的闯入性记忆

*AI-guided digital intervention with physiological monitoring reduces intrusive memories after experimental trauma.*

**npj Digital Medicine** · 2025-12-26 · 随机对照试验 · [PMID 41454171](https://pubmed.ncbi.nlm.nih.gov/41454171/) · [DOI](https://doi.org/10.1038/s41746-025-02145-5)

研究首次测试了ANTIDOTE系统，将生成式AI引导与瞳孔测量相结合，自动实施并监测原本需人工引导的意象竞争任务干预（ICTI）。100名健康志愿者观看创伤性视频后被随机分入干预组或活性对照组，干预组在随后一周内报告的闯入性记忆显著少于对照组。事后评估确认AI引导者成功实施了干预；瞳孔大小可追踪干预参与度并与症状减轻相关，提示其可作为候选生物标志物。

> **要点**：在100名受试者的实验性创伤模型中，AI引导+瞳孔监测的ICTI显著减少一周内闯入性记忆，瞳孔大小与症状改善相关。

### 12. 优化大语言模型以从慢性病患者沟通消息中检测抑郁/焦虑症状

*Optimizing large language models for detecting symptoms of depression/anxiety in chronic diseases patient communications.*

**npj Digital Medicine** · 2025-09-30 · 原创研究 · [PMID 41028413](https://pubmed.ncbi.nlm.nih.gov/41028413/) · [DOI](https://doi.org/10.1038/s41746-025-01969-5)

糖尿病患者共病抑郁或焦虑的风险升高，会使疾病管理复杂化。研究评估了大语言模型从患者安全消息中检测此类症状的性能，并采用提示工程、系统人设(persona)、温度调节以及零样本与少样本学习等多种策略进行优化。5个LLM中有3个表现优异（F1与准确率均超过90%），其中Llama 3.1 405B以零样本方式取得F1与准确率均为93%的最佳成绩。模型在二分类任务及处理PHQ-4等复杂指标上均显示潜力，但在疑难病例上仍存在不一致，需在真实场景中进一步评估。

> **要点**：Llama 3.1 405B以零样本方式检测糖尿病患者消息中的抑郁/焦虑症状，F1与准确率均达93%。

---

## 八、多模态与视觉-语言医学大模型（36 篇）

### 1. 一个与临床医生认知一致的视觉-语言框架用于眼底荧光素血管造影的分步解读

*A clinician aligned vision language framework for stepwise interpretation in fundus fluorescein angiography.*

**npj Digital Medicine** · 2026-07-12 · 原创研究 · [PMID 42437856](https://pubmed.ncbi.nlm.nih.gov/42437856/) · [DOI](https://doi.org/10.1038/s41746-026-02932-8)

研究构建了多模态视觉-语言框架Clin-FFA-VLM，模仿视网膜专科医生的认知流程，将FFA解读分解为病灶感知、临床报告生成和诊断决策支持三个阶段。模型在多中心数据（13,178张带专家标注的FFA图像、21,717张图像及1790份涵盖7种视网膜疾病的临床报告与诊断）上训练测试，病灶检测F1为0.834，报告生成实体级F1为0.73，诊断F1为0.77；两家外部医院验证F1分别为0.78和0.70。在200例FFA病例的前瞻性阅片者研究中，该系统显著提升了医学生和住院医师的诊断准确率（p<0.05）。

> **要点**：Clin-FFA-VLM分阶段解读FFA，诊断F1达0.77，并显著提升低年资医师诊断准确率（p<0.05）。

### 2. 面向超声理解的多模态指令数据集与基准

*A multimodal instruction dataset and benchmark for ultrasound understanding.*

**npj Digital Medicine** · 2026-06-26 · 基准/评估 · [PMID 42362710](https://pubmed.ncbi.nlm.nih.gov/42362710/) · [DOI](https://doi.org/10.1038/s41746-026-02930-w)

针对大型视觉-语言模型（LVLM）在超声领域因视觉-语义鸿沟和指令数据稀缺而表现不佳的问题，研究构建了大规模多源数据集SonoInstruct（来自30余个超声数据源，11万+图像、26万+指令跟随实例）以及评估8项核心能力（含分布外场景）的多维基准SonoBench。用SonoInstruct微调Qwen3-VL-2B-Instruct得到Qwen3-VL-2B-Sono，在SonoBench上相对基座模型取得30.3%的相对提升，表明该数据集有效弥合了噪声超声图像与临床推理之间的鸿沟。

> **要点**：SonoInstruct微调后的Qwen3-VL-2B-Sono在SonoBench上较基座模型相对提升30.3%。

### 3. IVCM-Insight：活体共聚焦显微镜的自动化交互式判读系统

*IVCM-Insight: automated interactive interpretation of in vivo confocal microscopy.*

**npj Digital Medicine** · 2026-06-23 · 原创研究 · [PMID 42337008](https://pubmed.ncbi.nlm.nih.gov/42337008/) · [DOI](https://doi.org/10.1038/s41746-026-02926-6)

研究开发了IVCM-Insight，将图文对比学习与大语言模型（LLM）结合，用于活体共聚焦显微镜（IVCM）图像的自动报告生成与交互式问答（QA）。系统基于30,368张IVCM图像和4,155份配对临床报告，通过对比对齐、图像条件语言建模与多图一致性损失训练，并以领域适配LLM支持面向患者的问答。自动评估显示BLEU-1至BLEU-4分别为0.69、0.58、0.47、0.41，ROUGE-L为0.67，CIDEr为1.85，METEOR为0.66，多标签分类准确率0.96、F1为0.80；角膜专科医师人工评分在报告准确性(4.17)、完整性(4.19)、连贯性(4.70)、诊断支持(4.06)上表现良好，问答输出准确性4.33、相关性4.54、无害性4.81。

> **要点**：首个IVCM综合判读AI系统，报告生成CIDEr达1.85、多标签分类准确率0.96，专家各维度评分均在4分以上。

### 4. 用于慢性眼部移植物抗宿主病（coGVHD）早期预警与诊断的多模态大语言模型开发

*Development of a multimodal large language model for early warning and diagnosis of chronic ocular GVHD.*

**npj Digital Medicine** · 2026-06-22 · 原创研究 · [PMID 42332126](https://pubmed.ncbi.nlm.nih.gov/42332126/) · [DOI](https://doi.org/10.1038/s41746-026-02916-8)

研究构建了GVHD-MLLM，一个融合四种模态序列潜在表征的多任务多模态网络，用于异基因造血干细胞移植（allo-HSCT）后慢性眼部GVHD的早期预警与诊断。共纳入666例患者（预警模型）和805例患者/1,574只眼（诊断模型）进行构建、内部与外部验证。内部测试中早期预警AUROC为93.44%（95%CI 91.85–95.03%），诊断为98.98%（98.59–99.36%），严重程度分级为98.24%；外部验证中预警AUROC为83.45%，三个外部中心的诊断AUROC均高于96.0%。使用预警模型后就诊患者的疾病严重程度显著降低，低年资眼科医师借助该模型也提升了诊断准确率。

> **要点**：GVHD-MLLM内部诊断AUROC达98.98%、外部各中心均>96.0%，早期预警外部AUROC为83.45%。

### 5. 面向临床实验室多任务形态学诊断的专家级视觉-语言模型Lingjian（灵鉴）

*An expert-level vision-language model for multitask diagnostic morphology in clinical laboratories.*

**npj Digital Medicine** · 2026-06-22 · 原创研究 · [PMID 42331997](https://pubmed.ncbi.nlm.nih.gov/42331997/) · [DOI](https://doi.org/10.1038/s41746-026-02905-x)

研究提出Lingjian，一个基于Qwen3-VL-8B、在40万余张实验室图像及配对文本与定位监督上经多阶段领域自适应训练的视觉-语言模型，统一完成图像理解、细胞识别、形态描述与解读、目标定位等任务。在中国国家临床检验中心室间质量评价（EQA，2021–2025）中总体准确率达93.0%，优于人类专家组（78.1%）和强通用模型（如Gemini-3 Pro，75.3%）。在120例多阅片者多病例（MRMC）研究中，Lingjian辅助使低年资阅片者的异常筛查敏感性从69.7%提升至91.7%，特异性同时由85.0%提升至89.5%；模型权重与评测资源已开源。

> **要点**：Lingjian在国家级室间质评中准确率93.0%，显著超过人类专家（78.1%）与Gemini-3 Pro（75.3%）。

### 6. 由多模态大语言模型驱动的语音控制超分辨率超声成像与报告生成

*Voice-controlled super-resolution ultrasound imaging and reporting powered by multimodal large language models.*

**npj Digital Medicine** · 2026-06-21 · 原创研究 · [PMID 42324351](https://pubmed.ncbi.nlm.nih.gov/42324351/) · [DOI](https://doi.org/10.1038/s41746-026-02924-8)

研究构建了一个多模态AI框架，将自研超分辨率超声成像（SRUI）平台与用于自然语言处理的DeepSeek-R1和用于图像识别的MiniCPM-V结合：临床医生通过语音指令发起成像任务，系统将其翻译为采集参数（包括时间窗与自适应微泡滤波，滤波阈值由微泡相似性评分动态确定），随后完成超分辨重建、提取血管定量指标并生成结合临床背景的结构化诊断报告。结构化报告可在约4分钟内生成，14名临床医生的评估认为其结构完整性良好、术语规范统一（中国临床试验注册中心ChiCTR2100048361）。

> **要点**：语音控制的多模态LLM框架约4分钟即可生成结构化超分辨率超声报告，14名医生评价其结构完整、术语标准化。

### 7. FetalCLIP：用于胎儿超声图像分析的视觉-语言基础模型

*FetalCLIP: a visual-language foundation model for fetal ultrasound image analysis.*

**npj Digital Medicine** · 2026-06-20 · 原创研究 · [PMID 42321373](https://pubmed.ncbi.nlm.nih.gov/42321373/) · [DOI](https://doi.org/10.1038/s41746-026-02907-9)

研究提出FetalCLIP，一个基于210,035对胎儿超声图像-文本数据（迄今该类配对数据集中规模最大）进行多模态预训练的视觉-语言基础模型，可生成胎儿超声图像的通用表征。在分类、孕龄估计、先天性心脏病（CHD）检测和胎儿结构分割等多项关键下游任务的广泛基准测试中，FetalCLIP优于所有基线，并在标注数据有限的条件下仍展现出强泛化能力与稳健性能。模型已在GitHub公开发布以支持社区研究。

> **要点**：基于210,035对图文数据预训练的FetalCLIP在分类、孕龄估计、CHD检测与分割等下游任务上全面优于基线，且少标注场景下依然稳健。

### 8. 用于视力损害与眼部肿瘤风险分层的超声基础模型（SonoEye）

*An ultrasound foundation model for the stratification of vision impairment and eye cancer risk.*

**npj Digital Medicine** · 2026-06-11 · 原创研究 · [PMID 42277320](https://pubmed.ncbi.nlm.nih.gov/42277320/) · [DOI](https://doi.org/10.1038/s41746-026-02870-5)

研究提出SonoEye，一个用于眼病风险分层的视觉-语言超声基础模型，基于来自70,452名患者的215,356对图像-文本数据以对比学习进行预训练，并用共识确认的患者级标签微调。模型筛查敏感性达98.3%，鉴别18种疾病的平均准确率为96.3%。作者建立了4级风险分层框架Eye-RADS（正常、低视力风险、高视力风险、肿瘤风险），在内部（Cohen's kappa 0.808）与外部（0.677–0.685）测试队列中均显示良好一致性；纳入年龄信息可显著提升老年（而非年轻）人群的Eye-RADS表现。通过图文对齐，SonoEye还能生成带注意力可视化解释的结构化临床报告。

> **要点**：SonoEye筛查敏感性98.3%、18种眼病鉴别平均准确率96.3%，Eye-RADS风险分层内部Cohen's kappa达0.808。

### 9. 像放射科医生一样学习：通过课程学习构建用于放射影像分析的医学视觉-语言模型

*Learning like a radiologist: a medical vision-language model for radiological image analysis via curriculum learning.*

**npj Digital Medicine** · 2026-06-05 · 原创研究 · [PMID 42249121](https://pubmed.ncbi.nlm.nih.gov/42249121/) · [DOI](https://doi.org/10.1038/s41746-026-02713-3)

研究提出RadiSim-CL，一个模仿放射科医师三阶段成长路径（基础知识理解、解剖知识、进阶诊断推理）以课程学习训练的医学视觉-语言模型，并配套构建了按阶段对齐的1200万图文对数据集RadiSim。评估采用五阶段由粗到细的验证框架（模态识别、解剖识别、解剖定位、异常与疾病诊断、疾病鉴别与分级），覆盖MR、CT、DR三种成像的24个零样本子任务。RadiSim-CL在基础与解剖任务上与SOTA基线相当，在复杂推理任务上更优（脑肿瘤诊断AUC 0.953，脑膜瘤分级准确率0.764），消融实验证实课程学习设计的有效性。

> **要点**：RadiSim-CL在24个零样本任务中复杂推理表现突出，脑肿瘤诊断AUC达0.953、脑膜瘤分级准确率0.764。

### 10. 人类专业能力还是人工智能？一项关于甲病诊断的前瞻性研究

*Human expertise or artificial intelligence? A prospective study on nail disorder diagnosis.*

**npj Digital Medicine** · 2026-06-02 · 原创研究 · [PMID 42230912](https://pubmed.ncbi.nlm.nih.gov/42230912/) · [DOI](https://doi.org/10.1038/s41746-026-02850-9)

该前瞻性对比研究基于甲病临床图像，比较皮肤科医师与4个可免费获取的多模态LLM（GPT-4o、Grok 3、Claude Sonnet 4、Gemini 2.5 Flash）的诊断准确率。17名皮肤科医师首选诊断正确率为70.6%（95%CI 65.5–75.2），计入鉴别诊断后为80.3%（75.7–84.2），并随资历递增（住院医师SD+DD 68.3%，甲病专家达96.0%）；AI模型对应仅为25.0%（16.8–35.5）与35.0%（25.5–45.9），显著低于医师（p<0.001）。AI对肿瘤性病变的正确分类率仅13.9%，非肿瘤性为52.3%（p<0.001）。作者认为当前通用多模态模型不宜在无临床监督下独立用于甲病诊断。

> **要点**：免费通用多模态LLM诊断甲病的准确率仅25.0%–35.0%，远低于皮肤科医师的70.6%–80.3%（p<0.001）。

### 11. 迈向可泛化的癫痫发作监测：用于跨环境检测与分类的 EpiVLM

*Towards generalizable seizure monitoring: EpiVLM for cross-environment detection and classification.*

**npj Digital Medicine** · 2026-05-26 · 原创研究 · [PMID 42185513](https://pubmed.ncbi.nlm.nih.gov/42185513/) · [DOI](https://doi.org/10.1038/s41746-026-02810-3)

研究提出 EpiVLM，一个将临床结构化提示词与视频推理相结合的多模态视觉-语言系统，用于把癫痫发作监测从受控病房推广到真实环境。评估数据来自两家三级中心、家庭非受限录像及一个独立公开数据集，共 232 段视频、127 例患者、11,666 个专家标注片段；EpiVLM 识别五类主要发作症状学的准确率为 0.795–0.947，敏感度 0.842–0.957。在提示词与决策阈值预先固定、不做站点特异性再校准的条件下，外部验证集中视频级假检出率仅 0.47–2.45%，平均发作起始到检出延迟 <6 秒，整体优于标准视频深度学习基线。

> **要点**：EpiVLM 在 127 例患者、232 段视频上识别五类发作症状学准确率达 0.795–0.947，跨环境无需重新校准且视频级假阳性仅 0.47–2.45%。

### 12. 面向具备推理能力的医学视觉-语言模型的关键概念学习

*Key concept learning for medical vision language model with reasoning capabilities.*

**npj Digital Medicine** · 2026-04-30 · 原创研究 · [PMID 42056236](https://pubmed.ncbi.nlm.nih.gov/42056236/) · [DOI](https://doi.org/10.1038/s41746-026-02676-5)

训练医学视觉-语言模型（VLM）通常需要数百万图文对，数据获取代价高昂。作者提出 ConceptVLM，一种数据高效的微调范式：构建结构化医学概念词典并使用掩码注意力，引导通用 VLM 聚焦关键临床概念，从而在注入医学知识的同时不破坏模型原有的通用能力、推理能力与回答多样性。在多个多模态医学基准上，ConceptVLM 仅使用原始训练数据的 1% 即取得最先进结果，优于依赖大规模问答语料的传统方法。

> **要点**：ConceptVLM 仅用 1% 训练数据即在多模态医学基准上达到 SOTA，说明关键概念引导的微调可替代大规模标注语料。

### 13. 整合多模态临床数据的大模型用于前列腺癌诊断

*Integrating multimodal clinical data with a large model for prostate cancer diagnosis.*

**npj Digital Medicine** · 2026-04-25 · 原创研究 · [PMID 42034911](https://pubmed.ncbi.nlm.nih.gov/42034911/) · [DOI](https://doi.org/10.1038/s41746-026-02670-x)

研究开发了多模态大语言模型Prost-LM，将MRI衍生特征、PSA数值和自由文本临床报告嵌入统一语义空间以实现深度跨模态推理，并在3,940例患者的多中心队列上训练与验证。内部验证中区分前列腺癌与良性病变的AUC达0.954，显著优于仅用MRI的模型（AUC=0.868，P<0.001）；检测临床显著性前列腺癌（Gleason评分≥7）的AUC为0.955。模型还能提供可解释的诊断决策以支持临床核查。

> **要点**：Prost-LM在3,940例多中心队列中诊断前列腺癌AUC=0.954，显著优于MRI单模态模型（AUC=0.868，P<0.001）。

### 14. 面向智能手术室的专用基础模型

*Specialized foundation models for intelligent operating rooms.*

**npj Digital Medicine** · 2026-04-15 · 原创研究 · [PMID 41986551](https://pubmed.ncbi.nlm.nih.gov/41986551/) · [DOI](https://doi.org/10.1038/s41746-026-02631-4)

针对ChatGPT、Gemini等通用大模型在安全攸关、多模态的手术场景中能力不足的问题，研究提出ORQA——一个统一视觉、听觉与结构化数据的多模态基础模型，以问答框架支撑对复杂手术活动与风险的整体理解，可作为手术机器人、智能器械和数字副驾的智能内核。与通用视觉-语言模型的基准对比显示，通用模型难以感知手术场景，而ORQA表现显著更强、更稳定。为满足不同部署需求，研究还设计并发布了一系列适配不同算力要求的小型ORQA模型。

> **要点**：ORQA作为统一视觉-听觉-结构化数据的手术基础模型，在手术场景理解上显著且稳定地优于通用视觉-语言模型。

### 15. 用于肺结节综合分析与风险分层的图化视觉-语言建模

*Graphicalized vision-language modeling for comprehensive lung nodule analysis and risk stratification.*

**npj Digital Medicine** · 2026-04-11 · 原创研究 · [PMID 41965884](https://pubmed.ncbi.nlm.nih.gov/41965884/) · [DOI](https://doi.org/10.1038/s41746-026-02602-9)

研究提出VITALIS多模态视觉-语言框架，用图感知Transformer融合CT与PET/CT影像和结构化放射学文本：在图像-文本图上通过拉普拉斯扩散丰富token特征，用结构化与先验引导的注意力聚焦解剖和临床相关上下文，再经双向图文条件化形成融合的患者表征。该表征参数化一个由上下文调制的Neural ODE控制的连续时间潜在风险过程，任务头据此解码出结节检测、结节恶性分类、生存风险估计和结节计数预测。在三个公开队列上的评估显示，该框架分割勾画准确、定位假阳性低、生存风险估计校准良好，且各任务间结节计数一致。

> **要点**：VITALIS将图感知视觉-语言融合与连续时间Neural ODE结合，在三个公开队列上一体化完成肺结节检测、恶性分类、生存风险与计数预测。

### 16. HoloTrauma 3X：面向机器人辅助急诊颌面重建的三元AI协同推理

*HoloTrauma 3X Triadic AI Co reasoning for robot assisted emergency maxillofacial reconstruction.*

**npj Digital Medicine** · 2026-04-04 · 原创研究 · [PMID 41935194](https://pubmed.ncbi.nlm.nih.gov/41935194/) · [DOI](https://doi.org/10.1038/s41746-026-02573-x)

研究开发了HoloTrauma 3X系统，利用视觉-语言模型在急诊场景中同步评估咬合-骨性结构-气道三元关系，以支持机器人辅助的颌面创伤重建（颌面创伤占急诊就诊的8-12%）。系统在8427例创伤患者上评估，数据整合了12家机构的公开数据集及三大洲3家医院的临床数据。结果显示上颌骨平均绝对误差0.42 mm、下颌骨0.38 mm，手术时间较标准技术缩短31.4%，术中并发症较传统方法减少42.3%。

> **要点**：在8427例患者中上/下颌骨定位误差分别为0.42/0.38 mm，手术时间减少31.4%、术中并发症减少42.3%。

### 17. Decipher-MR：用于3D MRI表征的视觉-语言基础模型

*Decipher-MR: a vision-language foundation model for 3D MRI representations.*

**npj Digital Medicine** · 2026-04-04 · 原创研究 · [PMID 41935229](https://pubmed.ncbi.nlm.nih.gov/41935229/) · [DOI](https://doi.org/10.1038/s41746-026-02596-4)

研究提出Decipher-MR，一个面向3D MRI的视觉-语言基础模型，在来自22,000余项检查的200,000个MRI序列上训练，覆盖多种解剖部位、扫描序列与病理。模型将自监督视觉学习与报告文本引导的监督相结合，并采用冻结预训练编码器+轻量级任务专用解码器的模块化设计以便高效迁移。在疾病分类、人口学预测、解剖定位与跨模态检索等任务上，Decipher-MR相较现有基础模型与任务专用方法均取得一致提升。

> **要点**：在20万个MRI序列上预训练的视觉-语言基础模型，在疾病分类、解剖定位、跨模态检索等多任务上一致优于现有基础模型。

### 18. 用于成人型弥漫性胶质瘤分子状态预测与放射学报告生成的稳健视觉-语言模型

*A robust vision language model for molecular status prediction and radiology report generation in adult-type diffuse gliomas.*

**npj Digital Medicine** · 2026-04-02 · 原创研究 · [PMID 41927936](https://pubmed.ncbi.nlm.nih.gov/41927936/) · [DOI](https://doi.org/10.1038/s41746-026-02581-x)

研究基于LLaMA 3.1、先在279万对PubMed Central生物医学图文对上预训练，再用1001例成人型弥漫性胶质瘤的多参数MRI及配对报告微调，构建视觉-语言模型Glio-LLaMA-Vision，并在内部验证集（100例）、外部三级医院AMC（75例）及TCGA（170例）、UCSF（477例）上验证。IDH突变状态预测在内部与外部数据集的AUC为0.85-0.95；报告生成的BLEU-1/ROUGE-L在内部验证为0.50/0.49、在AMC为0.32/0.36。37.8%的生成报告被认为优于或等同于原始报告，91.0%被神经放射科医生判定为临床可接受。

> **要点**：Glio-LLaMA-Vision预测IDH突变AUC 0.85-0.95，91.0%的自动生成报告被神经放射科医生认为临床可接受。

### 19. 从眨眼到诊疗：基于智能手机视频的儿童上睑下垂功能分析与个性化管理

*From blink to care: smartphone video-based functional analysis and personalized management in pediatric blepharoptosis.*

**npj Digital Medicine** · 2026-03-18 · 原创研究 · [PMID 41844953](https://pubmed.ncbi.nlm.nih.gov/41844953/) · [DOI](https://doi.org/10.1038/s41746-026-02510-y)

这项前瞻性多中心研究开发并验证了一套智能手机平台，包含形态学评估、功能分析和领域适配对话模型三个模块，使用3164段眨眼视频和1229张面部图像构建。形态学模块与人工测量的组内相关系数超过0.90；功能模块识别提上睑肌功能不良的AUC达0.993，内部队列和真实世界队列的功能分层准确率分别为0.91和0.89。对话模型在回答上睑下垂相关问题的正确性与适用性上优于其基线模型，专家评估整体表现与GPT-4o相当，真实世界部署中患者满意度为4.93/5。

> **要点**：功能模块识别提上睑肌功能不良AUC达0.993，配套对话模型表现与GPT-4o相当、患者满意度4.93/5。

### 20. 教会多模态大语言模型理解12导联心电图图像

*Teaching multimodal LLMs to comprehend 12-lead electrocardiographic images.*

**npj Digital Medicine** · 2026-03-16 · 原创研究 · [PMID 41840182](https://pubmed.ncbi.nlm.nih.gov/41840182/) · [DOI](https://doi.org/10.1038/s41746-026-02551-3)

针对心电图图像解读缺乏指令微调数据与标准化基准的问题，研究构建了首个大规模ECG图像指令微调数据集ECGInstruct（超过100万样本，覆盖特征识别、节律分析、形态评估和临床报告生成），并基于其训练出完全开源的多模态大语言模型PULSE。研究同时构建了由人类专家开发、横跨9个数据集4项核心任务、包含合成与真实ECG图像的基准ECGBench。实验表明PULSE平均准确率较通用多模态大模型高出21%–33%，达到新的最优水平。

> **要点**：开源多模态模型PULSE在ECG图像解读上平均准确率超过通用MLLM 21%–33%。

### 21. 用于肺癌病灶分割与定量的闭环文本引导框架BiomedLoop

*Closed loop text guided framework for lung cancer lesion segmentation and quantification.*

**npj Digital Medicine** · 2026-02-12 · 原创研究 · [PMID 41680279](https://pubmed.ncbi.nlm.nih.gov/41680279/) · [DOI](https://doi.org/10.1038/s41746-026-02422-x)

针对传统分割方法输出的像素掩膜与放射科医师语言及报告规范脱节的问题，研究提出文本引导框架BiomedLoop，将语义描述与空间定量相结合以贴合常规诊断实践。该流程用微调的Grounding DINO进行定位、用SEEM进行细化，并引入不确定性感知特征调制器以增强边界敏感表征；核心创新是将掩膜衍生的几何描述子转换为结构化伪文本提示来微调定位通路，使得在缺乏原生放射报告的数据集上也能实现监督，系统还可输出符合TID 1500规范的结构化报告。在5个公开基准上，BiomedLoop的Dice相似系数高于传统CNN架构与各类SAM变体，Hausdorff距离持续更低。

> **要点**：文本引导的BiomedLoop在5个公开基准上Dice优于CNN与SAM变体、Hausdorff距离更低，并可输出TID 1500结构化报告。

### 22. 间质性肺病影像的图文对齐：将胸片证据关联到 CT 定量

*Text-image alignment for ILD imaging: linking CXR evidence to CT quantification.*

**npj Digital Medicine** · 2026-02-04 · 原创研究 · [PMID 41639194](https://pubmed.ncbi.nlm.nih.gov/41639194/) · [DOI](https://doi.org/10.1038/s41746-025-02292-9)

针对当前 AI 流程孤立处理胸片（CXR）与 CT、导致报告幻觉和跨模态不一致的问题，作者提出 ARCTIC-ILD 框架：先用经校准的 CXR 证据抽取器将影像映射为 ILD 专用术语并生成结构化所见，再由术语-掩膜模块通过轻量交叉注意力适配器生成肺叶感知的 CT 掩膜与负荷估计，并以显式的视觉-语言审计强制文本与定量结果一致。在配对 CXR-CT 队列上，该框架显著降低文本幻觉、改善短语-掩膜对齐，且不增加推理延迟。

> **要点**：通过显式视觉-语言审计将胸片文本证据与 CT 定量对齐，显著减少 ILD 报告幻觉且不增加推理延迟。

### 23. Melan-Dx：知识增强的视觉-语言框架改善黑色素细胞肿瘤病理的鉴别诊断

*Melan-Dx: a knowledge-enhanced vision-language framework improves differential diagnosis of melanocytic neoplasm pathology.*

**npj Digital Medicine** · 2026-01-20 · 原创研究 · [PMID 41559412](https://pubmed.ncbi.nlm.nih.gov/41559412/) · [DOI](https://doi.org/10.1038/s41746-026-02357-3)

针对现有病理影像基础模型难以在40余种黑色素细胞肿瘤组织学亚型间做出准确鉴别诊断的问题，研究构建了由宾夕法尼亚大学皮肤病理专家标注的高质量图像与知识语料库（2893张图像、1102条知识条目），并提出Melan-Dx框架，通过从视觉-知识数据库中检索来增强冻结的病理视觉-语言模型，在patch级与全切片级同时改善鉴别诊断。Melan-Dx最佳表现为二分类准确率0.869、四十分类Top-1准确率0.699、少样本全切片ROC AUC 0.915、全监督全切片AUPRC 0.925；相较线性探针与全微调方法提升最高13.8%，较零样本方法提升23%–70.6%，全切片分类提升最高8.4%，且无需微调视觉主干。

> **要点**：知识检索增强使冻结的病理视觉-语言模型在40类鉴别诊断Top-1准确率达0.699、少样本WSI AUC 0.915，较零样本提升23%–70.6%。

### 24. 用于多模态肿瘤学数据整合的基础模型嵌入

*Foundation model embeddings for multimodal oncology data integration.*

**npj Digital Medicine** · 2026-01-10 · 综述/观点 · [PMID 41514042](https://pubmed.ncbi.nlm.nih.gov/41514042/) · [DOI](https://doi.org/10.1038/s41746-025-02312-8)

本文探讨HONeYBEE平台如何利用基础模型驱动的嵌入（把临床记录、病理图像、放射影像和分子谱等复杂数据表示为数值向量）将肿瘤诊疗中长期分散在各部门与技术系统中的多模态数据整合为统一的患者表示。文章将该平台的整合思路置于表示学习的更广泛发展脉络中加以评述，并讨论了影响其走向临床落地的临床与技术挑战。属观点/评述性文章，未报告新的定量性能指标。

> **要点**：提出以基础模型嵌入构建统一患者表示来打通肿瘤学多模态数据孤岛，并指出其临床落地面临的关键挑战。

### 25. 利用视觉-语言分割模型生成有依据的报告以提升眼科超声解读

*Grounded report generation for enhancing ophthalmic ultrasound interpretation using Vision-Language Segmentation models.*

**npj Digital Medicine** · 2026-01-03 · 原创研究 · [PMID 41484436](https://pubmed.ncbi.nlm.nih.gov/41484436/) · [DOI](https://doi.org/10.1038/s41746-025-02300-y)

研究提出视觉-语言分割（VLS）模型，将视觉-语言模型与Segment Anything Model（SAM）结合，在生成眼科超声报告的同时定位病灶，以克服传统报告生成模型无法同时识别病灶且缺乏可解释性的问题。基于三家医院共64,098张图像与21,355份报告进行开发与测试，VLS在内部测试集BLEU4达66.37，两个外部测试集分别为85.36和73.77；内部测试平均Dice系数59.6%，外部为50.2%和51.5%（特异度分别为97.8%和97.7%）；总体诊断准确率内部为90.59%、外部为71.87%。成本效益分析显示单份报告成本从高年资眼科医师的39美元降至1.3美元，降低约30倍。

> **要点**：VLS模型内部测试诊断准确率90.59%、BLEU4 66.37，并将单份报告成本从39美元降至1.3美元。

### 26. 基于少样本视觉-语言三分类模型从胸部CT预测肺腺癌浸润性

*Predicting Invasiveness of Lung Adenocarcinoma from Chest CT with Few-shot Vision-Language Ternary Classification Model.*

**npj Digital Medicine** · 2025-12-20 · 原创研究 · [PMID 41422131](https://pubmed.ncbi.nlm.nih.gov/41422131/) · [DOI](https://doi.org/10.1038/s41746-025-02229-2)

该多中心回顾性研究纳入848例经病理证实、表现为纯磨玻璃结节（pGGN）的肺腺癌患者，让GPT-4o在CT上定位结节并识别10个与浸润性相关的征象以生成诊断，并与Molmo比较。二十样本（twenty-shot）GPT-4o在浸润前病变、微浸润腺癌与浸润性腺癌的三分类中表现显著更优（DeLong检验P<0.01）；6名放射科医师评价其输出可靠性高、使用意愿强、危害风险与不当/缺失内容少；另6名医师在GPT-4o辅助下对pGGN浸润性的诊断准确率平均提升。

> **要点**：20-shot GPT-4o在848例pGGN浸润性三分类中显著优于对照（P<0.01），并提升放射科医师的诊断准确率。

### 27. PlaqueCap：使用视觉-语言模型与提示注入对血管内超声中动脉粥样硬化斑块进行以病灶为中心的图像描述

*PlaqueCap: lesion-centered captioning of atherosclerotic plaques in intravascular ultrasound using vision-language models and prompt injection.*

**npj Digital Medicine** · 2025-11-20 · 原创研究 · [PMID 41266555](https://pubmed.ncbi.nlm.nih.gov/41266555/) · [DOI](https://doi.org/10.1038/s41746-025-02044-9)

针对血管内超声(IVUS)斑块表征依赖手工特征和规则算法、适应性与可解释性不足的问题，研究提出PlaqueCap——一个以病灶为中心的图像描述(captioning)框架，可直接从IVUS图像生成具有临床意义的自然语言描述。其关键在于先进行高保真分割以定位斑块，再通过病灶提示注入(Lesion Prompt Injection, LPI)模块将空间信息注入预训练的视觉-语言模型，使生成文本聚焦于病理特征。在自建IVUS数据集上的实验表明，PlaqueCap实现了准确的病灶定位与分类，在定量指标和专家评价上均优于基线方法，生成的描述细致且具临床可解释性。

> **要点**：通过病灶提示注入(LPI)将分割定位信息注入视觉-语言模型，PlaqueCap生成的IVUS斑块描述在定量指标与专家评价上均优于基线。

### 28. 通过自然语言监督从12导联心电图诊断心脏疾病

*Diagnosis of cardiac conditions from 12-lead electrocardiogram through natural language supervision.*

**npj Digital Medicine** · 2025-11-19 · 原创研究 · [PMID 41261169](https://pubmed.ncbi.nlm.nih.gov/41261169/) · [DOI](https://doi.org/10.1038/s41746-025-02074-3)

针对现有心脏AI诊断需针对每种疾病做有监督训练、依赖大量标注数据的可扩展性瓶颈，研究开发了ECG-CLIP模型，采用对比式多模态学习，以自然语言监督实现12导联心电图的零样本心脏诊断。模型在MIMIC-IV-ECG的800,034对ECG-文本配对上训练，无需针对特定疾病训练即可评估18种心脏疾病；对节律异常的表现优于形态学异常(AUROC>0.90)，外部验证显示AUROC排序一致性稳健(ρ=0.934)，并在无任何儿科训练样本的情况下对儿科患者展现出显著的零样本性能。直接比较显示ECG-CLIP接近有监督模型水平，同时提供更广的诊断覆盖面；人口学分析揭示了U形的年龄依赖性表现及疾病特异的性别-年龄模式。

> **要点**：基于80万对ECG-文本训练的ECG-CLIP实现18种心脏疾病零样本诊断，节律异常AUROC>0.90，外部验证排序一致性ρ=0.934。

### 29. SpeechCARE：面向多样语言与言语任务情境的认知筛查动态多模态建模

*SpeechCARE: dynamic multimodal modeling for cognitive screening in diverse linguistic and speech task contexts.*

**npj Digital Medicine** · 2025-11-17 · 原创研究 · [PMID 41249382](https://pubmed.ncbi.nlm.nih.gov/41249382/) · [DOI](https://doi.org/10.1038/s41746-025-02026-x)

SpeechCARE是一个多模态transformer流水线，通过对阿尔茨海默病及相关痴呆(ADRD)、轻度认知障碍(MCI)与健康对照进行多分类，从简短语音录音中检测认知障碍。其预处理流程包含基于LLM的音频异常检测、言语任务识别、降噪与转录；核心架构以新颖的自适应门控融合机制融合mHuBERT（声学）与mGTE（语言）嵌入及人口学信息，并设有专门的编码组件处理mHuBERT输出以捕捉长时段录音中的全局时序模式。模型在美国国家老龄化研究所PREPARE挑战赛数据集（1655名英语、西班牙语和普通话参与者）上训练，在留出测试集(n=412)上取得平均F1值72.11%，获NIA特别表彰奖；公平性分析显示存在中等程度差异（尤以西班牙语使用者为著），但模型展现出较强的多语种泛化能力。

> **要点**：融合mHuBERT与mGTE嵌入的SpeechCARE在1655人多语种队列的留出测试集(n=412)上认知障碍分类平均F1达72.11%。

### 30. HONeYBEE：通过基础模型驱动的嵌入实现可扩展的肿瘤学多模态AI

*HONeYBEE: enabling scalable multimodal AI in oncology through foundation model-driven embeddings.*

**npj Digital Medicine** · 2025-10-23 · 原创研究 · [PMID 41131352](https://pubmed.ncbi.nlm.nih.gov/41131352/) · [DOI](https://doi.org/10.1038/s41746-025-02003-4)

HONeYBEE是一个开源框架，利用领域特定基础模型与融合策略，将结构化/非结构化临床数据、全切片图像、放射影像与分子谱整合为统一的患者级嵌入，支持生存预测、癌种分类、相似患者检索与队列聚类。在TCGA的11,400余例患者、33种癌症上评估，临床数据嵌入的单模态表现最强（癌种分类准确率98.5%，患者检索precision@10为96.4%），并在多数癌种上取得最高的生存预测一致性指数；多模态融合对特定癌种带来互补获益。对4个大语言模型的比较显示，通用模型Qwen3在临床文本表示上优于专用医学模型，而任务特定微调可改善其在病理报告等异质数据上的表现。

> **要点**：在11,400+例TCGA患者中，临床文本嵌入达到98.5%的癌种分类准确率，且通用LLM Qwen3优于专用医学模型。

### 31. 评估通用大语言模型识别人类面部情绪的性能

*Evaluating the performance of general purpose large language models in identifying human facial emotions.*

**npj Digital Medicine** · 2025-10-16 · 基准/评估 · [PMID 41102392](https://pubmed.ncbi.nlm.nih.gov/41102392/) · [DOI](https://doi.org/10.1038/s41746-025-01985-5)

研究使用NimStim面部表情数据集，评估了GPT-4o、Gemini 2.0 Experimental与Claude 3.5 Sonnet三个主流大语言模型识别人类面部表情的能力。GPT与Gemini的表现达到或超过人类水平，在平静/中性与惊讶类别上尤为突出；所有模型与真值标签的一致性均较强，但恐惧表情常被错误分类。结果凸显了LLM日益增长的社会情感能力及其在医疗健康场景中的应用潜力。

> **要点**：GPT-4o与Gemini在NimStim面部情绪识别上达到或超过人类水平，但恐惧类别仍常被误判。

### 32. NeoCLIP：用于新生儿X线片解读的自监督基础模型

*NeoCLIP: a self-supervised foundation model for the interpretation of neonatal radiographs.*

**npj Digital Medicine** · 2025-09-24 · 原创研究 · [PMID 40993183](https://pubmed.ncbi.nlm.nih.gov/40993183/) · [DOI](https://doi.org/10.1038/s41746-025-01922-6)

研究回顾性纳入波士顿某新生儿重症监护病房2008—2023年间4,629名婴儿的20,154张X线片及15,795份配套报告（按80%/10%/10%划分训练、验证与测试集），基于图像-文本深度对比学习构建NeoCLIP，用于识别15种影像学征象和5类医疗器械。除门静脉积气外，NeoCLIP在所有标签上的AUROC均高于对照模型；加入人口学信息可提升性能但未达统计学显著。NeoCLIP是首个专为新生儿X线片解读定制的深度学习模型，效果超过同类成人模型。

> **要点**：基于20,154张新生儿X线片与15,795份报告训练的NeoCLIP，在除门静脉积气外的所有标签上AUROC均优于对照模型。

### 33. 由文本提示驱动的医学影像大词表分割模型SAT

*Large-vocabulary segmentation for medical images with text prompts.*

**npj Digital Medicine** · 2025-09-02 · 原创研究 · [PMID 40897901](https://pubmed.ncbi.nlm.nih.gov/40897901/) · [DOI](https://doi.org/10.1038/s41746-025-01964-w)

研究构建了可由医学术语文本提示驱动的3D医学影像通用分割模型SAT。作者首先建立了含6502个解剖学术语的人体解剖多模态知识树，并整合72个数据集、逾2.2万例3D扫描、涵盖497个类别，构建了目前最大的分割训练集；随后通过对比学习将医学知识注入文本编码器，形成大词表分割模型，并训练了SAT-Nano(1.1亿参数)与SAT-Pro(4.47亿参数)。SAT-Pro在497个类别上的性能与72个逐数据集训练的nnU-Net专科模型（合计逾22亿参数）相当；相较交互式方法MedSAM，在全部7个人体区域均更优（平均Dice系数提升7.1%），并在2个跨中心外部数据集上优于所有基线（平均Dice提升3.7%）。

> **要点**：文本提示驱动的SAT-Pro(4.47亿参数)以单一模型媲美72个nnU-Net专科模型，较MedSAM平均Dice提升7.1%、外部数据集提升3.7%。

### 34. 用于视网膜图像分析的视觉-语言模型专项训练课程

*Specialized curricula for training vision language models in retinal image analysis.*

**npj Digital Medicine** · 2025-08-19 · 原创研究 · [PMID 40830259](https://pubmed.ncbi.nlm.nih.gov/40830259/) · [DOI](https://doi.org/10.1038/s41746-025-01893-8)

研究发现OpenAI的ChatGPT-4o及两个医学视觉-语言模型（VLM）在年龄相关性黄斑变性（AMD）关键任务上显著逊于眼科医生，为此由领域专家设计了专门的训练课程来优化VLM的临床决策能力。所得模型RetinaVLM-Specialist在AMD疾病分期（F1 0.63 vs 0.33）和转诊决策（0.67 vs 0.50）上显著优于医学基础VLM与ChatGPT-4o，达到初级眼科医师水平。阅片者研究中，两位资深眼科医师认定RetinaVLM生成报告更准确的比例为64.3%，而ChatGPT-4o仅为14.3%。

> **要点**：课程化训练的RetinaVLM-Specialist在AMD分期F1达0.63（ChatGPT-4o为0.33），报告准确性认可度64.3% vs 14.3%。

### 35. 用于CT肺动脉造影报告生成与结局预测的视觉-语言模型

*Vision-language model for report generation and outcome prediction in CT pulmonary angiogram.*

**npj Digital Medicine** · 2025-07-12 · 原创研究 · [PMID 40652098](https://pubmed.ncbi.nlm.nih.gov/40652098/) · [DOI](https://doi.org/10.1038/s41746-025-01807-8)

研究提出一个基于智能体的框架，结合视觉-语言模型(VLM)检测32种肺栓塞相关异常，并用大语言模型生成结构化报告。模型在Brown大学医疗系统(BUH)、约翰霍普金斯大学(JHU)和斯坦福INSPECT数据集共24,890名患者、逾69,000次CTPA检查上训练；异常分类AUROC分别为0.788(BUH)、0.754(INSPECT)和0.710(JHU)，对应BERT-F1为0.891、0.829和0.842，异常引导的报告策略持续优于基于器官和整体描述的基线。融合影像、临床变量、诊断输出和生成报告的多模态生存预测模型一致性指数达0.863(BUH)和0.731(JHU)，优于传统PESI评分。

> **要点**：VLM+LLM框架在69,000余次CTPA上实现异常分类(AUROC 0.71–0.79)、结构化报告与生存预测(C-index 0.863/0.731，优于PESI)。

### 36. 生成式人工智能用于眼底荧光素血管造影(FFA)判读及人类专家评估

*Generative artificial intelligence for fundus fluorescein angiography interpretation and human expert evaluation.*

**npj Digital Medicine** · 2025-07-02 · 原创研究 · [PMID 40603524](https://pubmed.ncbi.nlm.nih.gov/40603524/) · [DOI](https://doi.org/10.1038/s41746-025-01759-z)

研究提出InterpreFFA——一种诊断监督的对比学习框架，模拟眼科医师决策过程自动生成FFA报告，并在多中心数据集上验证，性能与泛化性均优于基线模型。在模拟临床场景中，2名住院医师借助InterpreFFA进行诊断和报告书写，6名获认证眼科专家以5分Likert量表评分：诊断准确率由85.55%提升至90.34%（p<0.05），报告耗时由153.93秒缩短至108.08秒（p<0.001）。AI生成报告评分略低于人工报告（4.12 vs 4.38, p<0.01），但作者认为其仍是提升临床效率的高性价比辅助工具。

> **要点**：InterpreFFA使住院医师FFA诊断准确率从85.55%升至90.34%，报告耗时缩短约30%。

---

## 九、预测建模与EHR表示学习（14 篇）

### 1. 大语言模型是强大的电子健康记录编码器

*Large language models are powerful electronic health record encoders.*

**npj Digital Medicine** · 2026-07-06 · 原创研究 · [PMID 42410244](https://pubmed.ncbi.nlm.nih.gov/42410244/) · [DOI](https://doi.org/10.1038/s41746-026-02915-9)

研究将电子健康记录中的医疗编码替换为自然语言描述，把EHR转为纯文本，使通用大语言模型无需接触私有医疗训练数据即可生成高维嵌入用于下游临床预测。在EHRSHOT基准的15项临床任务上，基于LLM的嵌入表现与专门的EHR基础模型CLMBR-T-Base相当；在UK Biobank的外部验证中，LLM嵌入在部分任务上有统计学显著提升，作者归因于更高的词表覆盖率和更好的泛化性。研究揭示了专用EHR模型的计算效率与LLM嵌入的可移植性、数据独立性之间的权衡。

> **要点**：通用LLM生成的EHR文本嵌入在EHRSHOT 15项任务上与专用EHR基础模型CLMBR-T-Base性能相当，且更易迁移。

### 2. 用于重症监护脓毒症管理的大语言模型增强离线强化学习框架

*Large language model-augmented offline reinforcement learning framework for sepsis management in critical care.*

**npj Digital Medicine** · 2026-04-14 · 原创研究 · [PMID 41975229](https://pubmed.ncbi.nlm.nih.gov/41975229/) · [DOI](https://doi.org/10.1038/s41746-026-02611-8)

针对现有脓毒症管理强化学习方法主要依赖生命体征、化验结果等结构化数据、缺乏全面理解患者所需上下文信息的问题，研究提出MORE-CLEAR框架：利用大语言模型从临床病历文本中抽取丰富的语义表征以保留临床语境并改进患者状态表示，并通过门控融合与跨模态注意力实现多模态数据的动态加权整合。在两个公开数据集（MIMIC-III、MIMIC-IV）和一个三级医院ICU数据集（SNUH）上的交叉验证显示，MORE-CLEAR相比单模态强化学习显著提高了估计生存率和策略性能。

> **要点**：用LLM从临床文本抽取语义表征增强状态表示后，多模态离线RL在MIMIC-III/IV与SNUH数据上的估计生存率与策略性能均显著优于单模态RL。

### 3. 整合大语言模型以增强医疗预测分析

*Integrating large language models for enhanced predictive analytics in healthcare.*

**npj Digital Medicine** · 2026-04-02 · 原创研究 · [PMID 41927986](https://pubmed.ncbi.nlm.nih.gov/41927986/) · [DOI](https://doi.org/10.1038/s41746-026-02572-y)

研究提出Hopkins LLM框架，基于70亿参数的LLaMA架构，利用结构化电子健康记录数据构建可执行多任务的临床预测引擎，以降低预测模型开发与落地的门槛。模型在约翰霍普金斯医疗系统42,160例患者数据上微调与测试，并在3个外部医疗系统、共1,329例患者的4项任务（30天全因再入院、90天全因死亡、30天ICU入住、治疗推荐）上外部验证。Hopkins-LLM平均ROC-AUC达0.84 [0.82, 0.88]，较零样本基线LLM显著提升0.28（p<0.05）。

> **要点**：Hopkins-LLM在4项临床预测任务上平均AUC 0.84，较零样本基线LLM提升0.28（p<0.05）。

### 4. 大语言模型与机器学习在预测经皮椎体后凸成形术后并发症中的性能比较

*Comparative performance of LLMs and machine learning in predicting complications after percutaneous kyphoplasty for osteoporotic vertebral compression fractures.*

**npj Digital Medicine** · 2026-04-01 · 原创研究 · [PMID 41922526](https://pubmed.ncbi.nlm.nih.gov/41922526/) · [DOI](https://doi.org/10.1038/s41746-026-02588-4)

研究在单中心三级医院的回顾性联合前瞻性数据上，比较两种大语言模型（GPT-5、DeepSeek R1，分别采用零样本与少样本策略）、5种传统机器学习模型以及2名脊柱外科医生（有/无LLM解释辅助）对骨质疏松性椎体压缩骨折经皮椎体后凸成形术（PKP）后骨水泥渗漏（BCL）与新发椎体骨折（NVF）的预测能力。BCL预测中零样本LLM表现可接受（F1 0.857-0.871，MCC 0.164-0.332），与传统机器学习（F1 0.758-0.867，MCC 0.265-0.416）相当且略优于医生（F1 0.675-0.684）；NVF预测中零样本LLM表现较差（F1 0.309，MCC 0.044），少样本后有所改善，最佳者为RBF-SVM（F1 0.536，MCC 0.414）。LLM解释提升了医生对BCL的预测但对NVF无帮助，且LLM对并发症亚型预测很差，提示当前LLM尚不成熟。

> **要点**：LLM对骨水泥渗漏预测（F1 0.857-0.871）与传统机器学习相当，但对新发椎体骨折预测很差（F1 0.309），临床应用尚不成熟。

### 5. 面向院内死亡预测、解决高假警报率的人工智能分级预警框架

*Artificial Intelligence-powered tiered early warning framework addressing high false alarm rates for in-hospital mortality prediction.*

**npj Digital Medicine** · 2026-03-14 · 原创研究 · [PMID 41832244](https://pubmed.ncbi.nlm.nih.gov/41832244/) · [DOI](https://doi.org/10.1038/s41746-026-02522-8)

研究提出两阶段分级预警框架AI-TEW，以缓解急诊预测模型因类别极度不平衡（院内死亡发生率常低于5.0%）导致的警报疲劳。第一阶段基于中美三家医院174,292人次急诊就诊数据开发并验证机器学习模型，内外部验证的AUROC为0.84（95%CI 0.81–0.86）至0.91（95%CI 0.90–0.91）；第二阶段通过分层风险阈值优化，将阳性预测值从基线的9.8%–18.8%提升至32.5%–40.5%，同时低危人群阴性预测值保持在98%以上。研究进一步引入基于大语言模型解读SHAP风险因子的知识过滤层，在外部验证中使PPV再提高11.53%（MedGemma，p=0.0092）。

> **要点**：AI-TEW将院内死亡预警的PPV从9.8%–18.8%提升至32.5%–40.5%，LLM知识过滤层再提升11.53%（p=0.0092）。

### 6. 融合结构化数据与临床文本预测房颤复发的深度学习模型

*A deep learning model integrating structured data and clinical text for predicting atrial fibrillation recurrence.*

**npj Digital Medicine** · 2026-02-16 · 队列研究 · [PMID 41699044](https://pubmed.ncbi.nlm.nih.gov/41699044/) · [DOI](https://doi.org/10.1038/s41746-026-02436-5)

这项多中心回顾性研究纳入中国 5 家中心 2508 例接受房颤消融的患者，构建双分支深度学习模型：结构化数据经 1D ResNet 处理，文本数据分别用 LLaMA-7B、Phi2-2.7B、Mistral-7B 和 MedGemma-27B 四种大语言模型编码。以 MedGemma 提取文本特征的模型表现最佳，训练集、验证集与测试集 AUC 分别为 0.934（95% CI 0.921–0.946）、0.928（0.904–0.950）和 0.911（0.878–0.941）。模型可有效识别高危个体以指导针对性干预。

> **要点**：以 MedGemma-27B 编码围术期临床文本的多模态模型预测房颤消融后复发，外部测试集 AUC 达 0.911。

### 7. 大语言模型提升基于电子健康记录的预测模型跨国家、跨编码体系的可迁移性

*Large language models improve transferability of electronic health record-based predictions across countries and coding systems.*

**npj Digital Medicine** · 2026-01-22 · 队列研究 · [PMID 41571946](https://pubmed.ncbi.nlm.nih.gov/41571946/) · [DOI](https://doi.org/10.1038/s41746-026-02363-5)

针对不同医疗体系间医疗实践与编码标准差异限制结构化 EHR 预测模型迁移的问题，作者提出 GRASP 方法：将大语言模型的医学编码嵌入与基于 Transformer 的预测模型结合。方法在超过 100 万人群中预测 21 种疾病的发病及全因死亡，用 UK Biobank（英国）训练，在 FinnGen（芬兰）和 Mount Sinai（美国）外部验证，平均 ΔC-index 分别较「语言无关」模型高 88% 和 47%。GRASP 在 62% 的疾病中与多基因风险评分的相关性显著更高，且在数据未统一到同一数据模型时仍保持稳健表现。

> **要点**：GRASP 借助 LLM 语义嵌入使跨国 EHR 预测的平均 ΔC-index 较语言无关模型提升 88%（芬兰）和 47%（美国）。

### 8. 增强型语言模型预测与理解HIV照护脱失：坦桑尼亚案例研究

*Enhanced language models for predicting and understanding HIV care disengagement: a case study in Tanzania.*

**npj Digital Medicine** · 2026-01-21 · 原创研究 · [PMID 41565873](https://pubmed.ncbi.nlm.nih.gov/41565873/) · [DOI](https://doi.org/10.1038/s41746-026-02349-3)

研究基于坦桑尼亚国家HIV照护与治疗项目2018–2023年的480万份电子病历记录，用EMR微调大语言模型以预测抗病毒治疗不依从、病毒载量未抑制及失访等脱失风险，服务于UNAIDS 95-95-95目标。该增强型LLM表现可优于传统机器学习模型和零样本LLM。坦桑尼亚HIV专科医师对模型预测及其给出的理由进行评估，65%与专家判断一致，其中92.3%的一致病例被认为具有临床相关性，提示该模型可支持数据驱动的决策并有望改善患者结局。

> **要点**：基于480万份EMR微调的LLM预测HIV照护脱失风险，65%与专家判断一致、其中92.3%被认为具临床相关性。

### 9. 医学中的整体性人工智能：性能与可解释性的提升（xHAIM）

*Holistic AI in medicine; improved performance and explainability.*

**npj Digital Medicine** · 2026-01-06 · 原创研究 · [PMID 41495177](https://pubmed.ncbi.nlm.nih.gov/41495177/) · [DOI](https://doi.org/10.1038/s41746-025-02298-3)

针对既往多模态融合框架HAIM任务无关且缺乏可解释性的局限，研究提出xHAIM，利用生成式AI通过四个结构化步骤增强预测与解释：自动识别跨模态的任务相关患者数据、生成全面的患者摘要、用这些摘要改进预测建模、并将预测与患者特异性医学知识关联以给出临床解释。在HAIM-MIMIC-MM数据集上评估显示，xHAIM将胸部病理与手术相关任务的平均AUC从79.9%提升至91.3%，并把黑箱预测器转变为可将预测回溯到相关患者数据的可解释决策支持系统。

> **要点**：xHAIM用生成式AI生成患者摘要，将多模态临床预测的平均AUC从79.9%提升至91.3%并提供可追溯的解释。

### 10. 大语言模型预测患者健康轨迹以实现数字孪生

*Large language models forecast patient health trajectories enabling digital twins.*

**npj Digital Medicine** · 2025-10-01 · 原创研究 · [PMID 41034564](https://pubmed.ncbi.nlm.nih.gov/41034564/) · [DOI](https://doi.org/10.1038/s41746-025-02004-3)

研究开发了DT-GPT（数字孪生-生成式预训练Transformer），将基于大语言模型的预测方法扩展至临床轨迹预测：直接利用电子健康记录而无需数据插补或归一化，并可应对缺失、噪声与样本量有限等真实世界数据难题。在非小细胞肺癌、重症监护(ICU)与阿尔茨海默病三个数据集上，DT-GPT优于当前最优机器学习模型，将标准化平均绝对误差分别降低3.4%、1.3%和1.8%，同时保持了临床变量的分布与互相关结构，并通过人类可理解的交互界面提供可解释性。模型还展现出零样本预测能力。

> **要点**：DT-GPT在三个疾病数据集上将标准化MAE分别降低3.4%、1.3%、1.8%，并具备零样本临床轨迹预测能力。

### 11. 利用LLM衍生嵌入增强基于电子健康记录的胰腺癌预测

*Enhancing EHR-based pancreatic cancer prediction with LLM-derived embeddings.*

**npj Digital Medicine** · 2025-07-21 · 原创研究 · [PMID 40691317](https://pubmed.ncbi.nlm.nih.gov/40691317/) · [DOI](https://doi.org/10.1038/s41746-025-01869-8)

研究利用大语言模型对疾病名称生成的嵌入来增强从纵向电子健康记录中的学习，构建胰腺癌早期检测预测模型。在哥伦比亚大学医学中心和Cedars-Sinai医学中心两个中心，LLM嵌入把6-12个月预测的AUROC分别从0.60提升到0.67、从0.82提升到0.86；进一步剔除诊断前0-3个月数据后AUROC升至0.82和0.89。模型阳性预测值达0.141，远高于仅用传统危险因素的0.004，并能识别出许多不具备传统危险因素或已知遗传变异的胰腺癌患者。

> **要点**：LLM嵌入使EHR胰腺癌预测AUROC提升至0.67/0.86，PPV 0.141远超传统危险因素的0.004。

### 12. 面向罕见妇科肿瘤精准医疗的大语言模型驱动数字孪生

*Large language models-enabled digital twins for precision medicine in rare gynecological tumors.*

**npj Digital Medicine** · 2025-07-09 · 原创研究 · [PMID 40634659](https://pubmed.ncbi.nlm.nih.gov/40634659/) · [DOI](https://doi.org/10.1038/s41746-025-01810-z)

罕见妇科肿瘤(RGT)因发病率低、异质性高且缺乏明确指南而管理欠佳，本研究探索用大语言模型构建数字孪生以支持精准医疗。概念验证系统整合了机构与已发表病例的临床和生物标志物数据(n=21)以及文献衍生数据(655篇文献)，为转移性子宫癌肉瘤生成个体化治疗方案，识别出传统单一来源分析可能遗漏的治疗选择。结果表明LLM驱动的数字孪生能高效建模个体患者的疾病轨迹，并支持从以器官为基础转向以生物学为基础的肿瘤定义。

> **要点**：整合21例病例与655篇文献的LLM数字孪生系统可为转移性子宫癌肉瘤生成个体化方案，发现传统分析遗漏的治疗选择。

### 13. 利用多源电子健康记录数据生成的伪病历(pseudo-notes)实现临床决策支持

*Clinical decision support using pseudo-notes from multiple streams of EHR data.*

**npj Digital Medicine** · 2025-07-02 · 原创研究 · [PMID 40604255](https://pubmed.ncbi.nlm.nih.gov/40604255/) · [DOI](https://doi.org/10.1038/s41746-025-01777-x)

研究提出深度学习框架MEME(Multiple Embedding Model for EHR)，先把表格化EHR转换为“伪病历”文本，从而减少跨EHR系统概念统一的需求并可直接使用任意开源语言基础模型；随后分别嵌入各EHR域，并用自注意力机制学习多重嵌入的上下文重要性。在400,019次急诊就诊的数据中，MEME成功预测急诊去向、出院地点、ICU需求和死亡，性能优于传统机器学习模型（逻辑回归、随机森林、XGBoost、MLP）、EHR基础模型（EHR-shot、MC-BEC、MSEM）以及GPT-4提示策略；得益于文本序列化，MEME在外部非标准化EHR数据库中还表现出很强的少样本学习能力。

> **要点**：MEME在400,019次急诊就诊中优于传统机器学习、EHR基础模型和GPT-4提示策略，并具备强少样本迁移能力。

### 14. 基于临床肿瘤学数据训练的大语言模型可预测癌症进展

*Large language model trained on clinical oncology data predicts cancer progression.*

**npj Digital Medicine** · 2025-07-02 · 原创研究 · [PMID 40604229](https://pubmed.ncbi.nlm.nih.gov/40604229/) · [DOI](https://doi.org/10.1038/s41746-025-01780-2)

研究者利用纪念斯隆-凯特琳癌症中心(MSK)肺癌、乳腺癌、前列腺癌、胰腺癌和结直肠癌的真实世界数据，训练了开源肿瘤专科大语言模型Woollie，并使用加州大学旧金山分校(UCSF)数据进行外部验证。在4002例患者的39,319份影像学印象报告上，Woollie预测癌症进展的总体AUROC达0.97（胰腺癌高达0.98）；在UCSF外部数据上总体AUROC为0.88，其中肺癌检出AUROC为0.95。Woollie在医学基准及8项非医学基准上均优于ChatGPT，是首个经跨机构验证的肿瘤专科LLM，跨癌种表现具有较高一致性。

> **要点**：肿瘤专科LLM Woollie预测癌症进展内部AUROC 0.97、外部验证AUROC 0.88，跨癌种稳定。

---

## 十、医学教育与培训（14 篇）

### 1. 人在环验证一个序贯式多大语言模型医学教育内容生成流水线

*Human-in-the-loop validation of a sequential multi-LLM medical education pipeline.*

**npj Digital Medicine** · 2026-07-07 · 原创研究 · [PMID 42414538](https://pubmed.ncbi.nlm.nih.gov/42414538/) · [DOI](https://doi.org/10.1038/s41746-026-02978-8)

研究评估了一个完全基于Gemini家族（Gemini 3 Flash/Pro生成文本，Gemini 3 Pro Image生成图像）的7阶段序贯多LLM流水线，为放射科专科考试生成6000张记忆卡片和833张信息图；9名住院医师和11名主治放射科医师围绕第5阶段（S5）反馈以两阶段设计评估了11个亚专业的1284张卡片。在980张文本层面通过卡片的1100次评估中，阻断性错误的假阴性率为1.00%（95%CI 0.50–1.78%），超过预设的0.3%安全阈值；S5反馈后阻断性错误标记增加（McNemar p=0.003），技术准确性和教育质量评分反而下降（均p<0.001）。主治医师比住院医师发现更多错误（OR 4.52，95%CI 2.38–8.57），19项图像试点显示表格与信息图均存在关键错误。

> **要点**：多LLM教育内容流水线的阻断性错误假阴性率1.00%，超过0.3%安全阈值，不支持全自动化部署。

### 2. 在人工智能时代重新审视临床推理的学习方式

*Reconciling how clinical reasoning is learned in the age of artificial intelligence.*

**npj Digital Medicine** · 2026-06-08 · 社论/评论 · [PMID 42259908](https://pubmed.ncbi.nlm.nih.gov/42259908/) · [DOI](https://doi.org/10.1038/s41746-026-02873-2)

这是一篇社论，评述了两项关于AI在医学生学习中作用的研究：一项是真实场景下有监督使用AI的自评结局纵向研究，另一项是比较AI解释的获益与似是而非的错误信息风险的模拟实验。作者认为两项研究共同表明，AI的作用效果取决于个体特征与教育环境，这对医学课程设计以及如何界定临床胜任力具有重要启示。

> **要点**：AI对医学生临床推理学习的影响因个体与教育环境而异，需据此重新设计课程与胜任力标准。

### 3. 中国医学生生成式AI使用、依赖行为与标准化应用路径的混合方法研究

*Mixed-methods study on GenAI Usage, dependence behaviors, and standardized application paths among Chinese medical students.*

**npj Digital Medicine** · 2026-06-02 · 原创研究 · [PMID 42230756](https://pubmed.ncbi.nlm.nih.gov/42230756/) · [DOI](https://doi.org/10.1038/s41746-026-02839-4)

研究采用解释性序贯混合方法：定量阶段对1295名中国医学生进行问卷调查并做实证分析，定性阶段对16名医学教育者的访谈转录做主题分析以揭示机制。结果显示生成式AI已深度嵌入医学生日常学习，工具选择偏向通用平台而专业医学工具使用率极低，各类情境下的临床应用可能性均低于20%；总体依赖得分为21.91±6.75，超过60%的学生报告对GenAI存在依赖。多元线性回归显示绩效期望、学业压力与社会影响与依赖显著正相关，批判性思维则显著负相关。作者建议将GenAI重新定位为"认知脚手架"，强化批判性思维并建立标准化使用指南。

> **要点**：1295名医学生中逾60%报告依赖生成式AI（依赖得分21.91±6.75），批判性思维与依赖显著负相关。

### 4. 评估大语言模型用于药物治疗学模拟教学：一项混合方法研究

*Evaluating large language models for pharmacotherapy simulations: a mixed-methods study.*

**npj Digital Medicine** · 2026-05-05 · 原创研究 · [PMID 42086710](https://pubmed.ncbi.nlm.nih.gov/42086710/) · [DOI](https://doi.org/10.1038/s41746-026-02626-1)

该混合方法、抵消设计的评估研究让 104 名 PharmD 学生使用由 4 个 LLM 依专家元提示生成的急性髓系白血病（AML）或慢性髓系白血病（CML）病例进行模拟学习，由专家小组从临床真实性、教学设计与临床推理三方面评分，学生填写满意度问卷。103 次会话中仅 53 次（51.5%）在所有维度达标；临床准确性与安全性是瓶颈领域（58.3%），低于临床推理（81.6%）与教学设计（82.5%）；CML 会话表现优于 AML（62.3% vs 40.0%，p=0.031），各平台通过率介于 34.5%–62.1%，且指南偏离、药物治疗错误与伪造证据等错误仅出现在 AML 会话中。学生偏好 LLM 胜过传统方法（49.8% vs 30.0%），但满意度与专家评定质量之间未见统计学显著一致性。

> **要点**：仅 51.5% 的 LLM 生成模拟病例全维度达标，临床准确性与安全性最弱（58.3%），CML 显著优于 AML（62.3% vs 40.0%，p=0.031）。

### 5. 在生成式AI时代设计具备AI韧性的卫生专业培训招生面试

*Designing AI-resilient admissions interviews for health professions training in the age of generative AI.*

**npj Digital Medicine** · 2026-04-23 · 综述/观点 · [PMID 42026111](https://pubmed.ncbi.nlm.nih.gov/42026111/) · [DOI](https://doi.org/10.1038/s41746-026-02667-6)

文章指出，新冠疫情后虚拟面试已成为卫生专业培训招生的标准做法，而生成式AI技术的出现引发了对面试公平性与诚信的担忧；招生项目目前采用的AI检测软件、加强监考和全面禁用等应对手段均难以执行。作者结合Eva等人关于医学院申请者在虚拟多站小型面试（MMI）中使用生成式AI工具的随机对照试验，提出良好的面试结构本身就更能抵抗AI带来的优势，且细微调整即可限制AI使用而不损害信度、真实性与可接受性。核心主张是将生成式AI重新理解为面试设计问题而非检测问题，从而兼顾诚信、公平与学习价值。

> **要点**：主张把生成式AI从检测问题重构为面试设计问题：结构良好的MMI本身即可削弱AI带来的作弊优势且不损害信度。

### 6. 对AI生成的描绘患者使用聊天机器人的精神科病例短文的评估

*Evaluation of artificial intelligence-generated vignettes depicting patient chatbot use in psychiatric contexts.*

**npj Digital Medicine** · 2026-04-07 · 原创研究 · [PMID 41946953](https://pubmed.ncbi.nlm.nih.gov/41946953/) · [DOI](https://doi.org/10.1038/s41746-026-02605-6)

聊天机器人相关的心理健康风险日益受到公众关注，但面向临床医生的教学案例材料仍然匮乏，为此研究评估了ChatGPT-5 Pro生成涉及患者使用聊天机器人的精神科病例短文（vignette）的能力。三位获委员会认证的精神科医生从聊天机器人相关性、诊断信息充分性、解释质量和安全性四个维度进行评分。结果显示聊天机器人相关性与诊断充分性评分较高，但安全性评分偏低，提示此类AI生成材料在用于教学前必须经过专家审核。

> **要点**：ChatGPT-5 Pro生成的精神科教学短文在相关性与诊断充分性上评分较高，但安全性评分偏低，教学使用前需专家审核。

### 7. DeepSeek在放射科住院医师培训结业考试题目生成中的表现

*Performance of DeepSeek in the generation of in-training examination questions in radiology resident education.*

**npj Digital Medicine** · 2026-03-24 · 原创研究 · [PMID 41876633](https://pubmed.ncbi.nlm.nih.gov/41876633/) · [DOI](https://doi.org/10.1038/s41746-026-02568-8)

研究由DeepSeek生成、并由放射学专家依据中国教育标准编写各14道选择题（A1、A2、A3/A4型），随机混合成28题在线测试，由40名放射科住院医师（二年级17名、三年级23名）闭卷作答，同时判断题目来源并对难度、课程相关性、整体质量与临床真实性评分。结果显示DeepSeek生成题与专家编写题在总体正确率与来源识别准确率上均无显著差异；但按题型分层后，住院医师对DeepSeek生成的A3/A4型题正确率低于专家题，且对DeepSeek生成的A2型题临床情景真实性评分更低（三年级住院医师中差异更明显）。研究提示DeepSeek具备命题潜力，但在需要临床情景的高阶题目上仍逊于人类专家。

> **要点**：DeepSeek生成的考题总体正确率与来源可识别度与专家题无显著差异，但高阶情景类题目（A2、A3/A4）的质量与临床真实性不及专家。

### 8. AI错误信息对医学生初学者诊断准确性与信心校准的影响

*Impact of AI misinformation on diagnostic accuracy and confidence calibration in novice medical students.*

**npj Digital Medicine** · 2026-03-17 · 随机对照试验 · [PMID 41844809](https://pubmed.ncbi.nlm.nih.gov/41844809/) · [DOI](https://doi.org/10.1038/s41746-026-02547-z)

该随机对照试验纳入111名医学生，比较正确AI解释、误导性AI解释与无解释对照三种条件下的诊断表现（中国临床试验注册中心ChiCTR2500111932）。结果显示存在显著且值得警惕的不对称性：误导性AI解释显著降低诊断准确率，而正确解释相比无解释对照并未带来显著提升；在误导条件下信心亦未得到校准，即信心水平无法可靠区分回答正确与否。作者认为在缺乏保护机制时，AI生成的虚假信息造成的危害强于正确指导带来的收益，医学教育应转向培养学习者的批判性评估能力。

> **要点**：111名医学生的RCT显示误导性AI解释显著损害诊断准确率并破坏信心校准，而正确AI解释无显著获益。

### 9. 弥合导师制鸿沟：大语言模型如何重塑医疗人力公平

*Bridging the mentorship divide: how large language models could reshape medical workforce equity.*

**npj Digital Medicine** · 2026-01-09 · 社论/评论 · [PMID 41513946](https://pubmed.ncbi.nlm.nih.gov/41513946/) · [DOI](https://doi.org/10.1038/s41746-025-02167-z)

这是一篇通讯性质的观点文章，讨论预测性大语言模型应用于医学导师制所带来的机遇与不平等风险。作者指出导师制在无形中塑造着医学职业发展，但其机会分布并不均等；LLM能够分析学生写作，发现考试无法体现的潜力，这种预测能力有望指导更公平的导师资源配置、将支持导向最需要的学生，从而构建更公平的医疗人力队伍。文章同时警示：若这些系统在设计时缺乏审慎考量，反而可能加剧不公平。

> **要点**：主张用LLM分析学生写作以识别被考试忽视的潜力、更公平地分配导师资源，但需警惕设计不当放大不平等。

### 10. GPT-4o生成的多项选择题与人工命题在影像相关专业中的心理测量学特性与可识别性比较

*Psychometric properties and detectability of GPT-4o-generated multiple-choice questions compared with human-authored items across imaging specialties.*

**npj Digital Medicine** · 2026-01-08 · 原创研究 · [PMID 41507355](https://pubmed.ncbi.nlm.nih.gov/41507355/) · [DOI](https://doi.org/10.1038/s41746-025-02313-7)

这项预注册、单中心、盲法、被试内比较研究，在放射肿瘤学、放射学与核医学领域比较24道GPT-4o生成与24道人工命制的主题匹配多项选择题；82名医学生和46名医师完成了同一份48题形成性模拟考试，题目来源全程遮蔽。结果显示题目难度（人工0.65[SD 0.22] vs LLM 0.67[0.20]）与区分度（0.27[0.12] vs 0.29[0.12]）差异均无统计学意义，参与者判断题目来源的正确率不优于随机水平（0.50）；专家对题目适宜性与教学质量评分的评分者间一致性很低（ICC=0.07–0.18）。研究提示在专家审核的人机协同流程下可负责任地规模化生成形成性评估内容，但需配套监督、透明与公平方面的教育政策。

> **要点**：在专家把关的人机协同流程下，GPT-4o生成试题的难度与区分度与专家命题无显著差异，考生也无法辨别其AI来源。

### 11. 生成式AI对医学院招生虚拟面试中申请者行为、表现与面试信度的影响

*The impact of GenAI on applicant behaviour, performance, and interview reliability during virtual interviews for medical school admissions.*

**npj Digital Medicine** · 2025-12-23 · 随机对照试验 · [PMID 41437146](https://pubmed.ncbi.nlm.nih.gov/41437146/) · [DOI](https://doi.org/10.1038/s41746-025-02256-z)

研究通过随机实验比较了被鼓励暗中使用ChatGPT的候选人与两个对照组（常规做法组、事先告知考站内容组）在虚拟面试中的准备行为、表现、信度与可接受性。结果显示使用ChatGPT并无优势（ChatGPT组均分3.67，sd=0.69；常规对照3.74，sd=0.61；预告知组3.73，sd=0.80）。缩短受试者在镜头外使用ChatGPT的时间未损害表现（3.73，sd=0.58 vs 对照3.70，sd=0.81）、分数精度（SEMeas 0.34 vs 0.39）或可接受性评分（4.0 vs 4.1），提示这是提升虚拟面试公平性的简便办法。

> **要点**：暗中使用ChatGPT并未提高虚拟面试成绩（3.67 vs 对照3.74），限制镜头外时间可提升公平性且不损害信度。

### 12. 面向医学教育个性化学习的生成式AI教学助手

*A generative AI teaching assistant for personalized learning in medical education.*

**npj Digital Medicine** · 2025-11-04 · 原创研究 · [PMID 41188616](https://pubmed.ncbi.nlm.nih.gov/41188616/) · [DOI](https://doi.org/10.1038/s41746-025-02022-1)

研究在某医学院基础科学课程的连续两届学生中部署了基于检索增强生成(RAG)的教学助手，将大语言模型的回答限定在教师精选材料范围内，以减少幻觉同时保留教学效用，并考察其使用模式、对话内容与学生反馈。学生呈现出策略性、情境依赖的使用行为：在高利害考核期使用强度显著上升，且课后/夜间使用量可观；学生主要用它澄清基础概念，并看重其随时可用与有出处依据的回答。然而，保证准确性的知识库约束同时也限制了更广泛的提问，形成可靠性与全面性之间的张力。

> **要点**：RAG约束型教学助手因有据可依而受学生青睐、在考试期使用激增，但知识库边界限制了提问广度。

### 13. 大语言模型数字患者系统提升眼科病史采集技能

*A large language model digital patient system enhances ophthalmology history taking skills.*

**npj Digital Medicine** · 2025-08-04 · 随机对照试验 · [PMID 40760042](https://pubmed.ncbi.nlm.nih.gov/40760042/) · [DOI](https://doi.org/10.1038/s41746-025-01841-6)

研究基于既往开源的检索增强框架构建了大语言模型数字患者（LLMDP）系统，将去标识化电子病历转化为可语音交互、支持自由文本对话并给予适应性反馈的虚拟患者。在单中心随机对照试验中（ClinicalTrials.gov: NCT06229379，N=84），使用LLMDP训练的学生病史采集考核得分比传统方法组提高10.50分（95%CI 4.66–16.33，p<0.001），并表现出更强的共情。参与者满意度高，认为该系统降低培训成本并增强了面对真实患者的信心。

> **要点**：随机对照试验（N=84）显示LLM数字患者训练使病史采集评分提高10.50分（95%CI 4.66–16.33，p<0.001）。

### 14. 生成式人工智能：社会建构主义医学教育框架中的“更有知识的他者”

*Generative artificial intelligence: the 'more knowledgeable other' in a social constructivist framework of medical education.*

**npj Digital Medicine** · 2025-07-11 · 社论/评论 · [PMID 40646156](https://pubmed.ncbi.nlm.nih.gov/40646156/) · [DOI](https://doi.org/10.1038/s41746-025-01823-8)

这篇通讯提出，生成式人工智能能够满足社会建构主义框架中“更有知识的他者”的标准。通过为学习者搭建学习脚手架、提供独特而增强的最近发展区，它可以模拟社会互动并参与人机共同建构知识。作者认为生成式AI进入医学教育促使我们重新想象和诠释既有教学法中的传统角色。

> **要点**：论证生成式AI可充当社会建构主义框架中的“更有知识的他者”，推动医学教育中的人机共同建构知识。

---

## 十一、公共卫生、流行病学监测与健康公平（7 篇）

### 1. AFP助手：面向低资源语言社区的检索增强生成与大语言模型驱动的多语言脊髓灰质炎聊天机器人

*AFP assistant: a retrieval-augmented generation and large language model-powered multilingual polio chatbot for low-resource language communities.*

**npj Digital Medicine** · 2026-06-30 · 原创研究 · [PMID 42380241](https://pubmed.ncbi.nlm.nih.gov/42380241/) · [DOI](https://doi.org/10.1038/s41746-026-02944-4)

针对埃塞俄比亚急性弛缓性麻痹（AFP）社区监测中报告不足、沟通障碍和错误信息的问题，研究开发了支持阿姆哈拉语、奥罗莫语和英语的多语言LLM聊天机器人AFP Assistant，用于加强健康沟通与实时报告。系统基于预训练的Gemini 2.5-flash，结合监督微调与检索增强生成（RAG），在468对经专家翻译校验的问答数据上训练，达到准确率0.90、损失0.31。内部测试与基于结构化评分表的人工标注显示其在多任务、多语言上表现稳健，用户反馈确认了可用性与相关性。

> **要点**：基于Gemini 2.5-flash微调+RAG的多语言AFP聊天机器人准确率达0.90，可支持低资源地区的脊灰社区监测。

### 2. 面向高海拔人群全球健康公平的Agentic AI

*Agentic AI in global health equity for high altitude populations.*

**npj Digital Medicine** · 2026-06-05 · 综述/观点 · [PMID 42249081](https://pubmed.ncbi.nlm.nih.gov/42249081/) · [DOI](https://doi.org/10.1038/s41746-026-02701-7)

这是一篇观点性综述，讨论高海拔（"世界屋脊"）人群面临的健康公平问题：这些人群自然分割为不同族群、属独特的边缘化人口，且恶劣自然环境、薄弱的医疗基础设施与研究匮乏共同构成公平获取医疗的障碍。作者指出现有医学AI多为窄任务模型、训练数据缺乏地区代表性、且忽视健康的生物-生理-环境-社会多因素本质，按当前形态难以促进健康公平。文章主张基于通用基础模型开发的智能医学智能体（intelligent medical agents）有望跨越既有障碍，满足高海拔人群的独特需求并提供公平医疗。

> **要点**：主张构建于通用基础模型之上的医学智能体是弥合高海拔人群健康公平差距的可行路径。

### 3. 观点：大语言模型与移民人群的抗微生物药物耐药性——一项公平性使命

*Perspective: large language models and antimicrobial resistance among migrants: an equity imperative.*

**npj Digital Medicine** · 2026-05-14 · 综述/观点 · [PMID 42135455](https://pubmed.ncbi.nlm.nih.gov/42135455/) · [DOI](https://doi.org/10.1038/s41746-026-02742-y)

该观点文章指出，尽管抗微生物药物耐药性（AMR）监测总体在进步，承担了不成比例 AMR 负担的移民与少数族裔人群仍在相关项目中代表性不足，且作者未找到任何利用 LLM 降低这些社区 AMR 的干预措施。通过三场工作坊，作者凝练出三项优先事项：文化与语言上具包容性的设计、来自社区场景的情境化知识，以及借助社区卫生工作者建立信任，并同时强调数据保护与偏倚缓解。

> **要点**：目前尚无面向移民与少数族裔 AMR 的 LLM 干预；提出包容性设计、社区情境知识与信任建设三大优先方向。

### 4. 面向公共卫生信息监测（infoveillance）的大语言模型套件

*A suite of large language models for public health infoveillance.*

**npj Digital Medicine** · 2026-02-23 · 原创研究 · [PMID 41731011](https://pubmed.ncbi.nlm.nih.gov/41731011/) · [DOI](https://doi.org/10.1038/s41746-026-02435-6)

研究者基于 Qwen 2.5、采用 QLoRA 与 LoRA plus 在自建多语种语料上训练了 PH-LLM 系列模型，用于社交媒体上的实时公共卫生信息监测。他们构建了包含 19 项英文任务和 20 项多语种留出任务的基准，评估零样本性能。PH-LLM-14B 与 PH-LLM-32B 在英文任务（≥56.0% vs ≤52.3%）和多语种任务（≥59.6% vs ≤59.1%）上均超过 Qwen2.5-72B-Instruct、Llama-3.1-70B-Instruct、Mistral-Large-Instruct-2407 和 GPT-4o 等更大规模模型。

> **要点**：PH-LLM-14B/32B 以更小参数量在英文与多语种公共卫生任务上超越 GPT-4o 及 70B 级开源模型，提供低成本实时舆情监测方案。

### 5. 基于智能手机聊天机器人的干预对南亚裔人群流感与新冠疫苗接种率的影响

*Effects of a smartphone-based chatbot intervention on influenza and COVID-19 vaccine uptake among South Asians.*

**npj Digital Medicine** · 2025-12-11 · 随机对照试验 · [PMID 41381754](https://pubmed.ncbi.nlm.nih.gov/41381754/) · [DOI](https://doi.org/10.1038/s41746-025-02200-1)

该两臂整群随机、等待名单对照试验（ChiCTR2200061503）纳入过去一年未接种流感或新冠疫苗、年满18岁的南亚裔（巴基斯坦、印度、尼泊尔）居民，干预包括嵌入手机应用的规则型聊天机器人以及按需连线受训研究助理的功能。在纳入分析的610名参与者中，干预组的流感疫苗接种率在干预结束即刻（57.8% vs 1.3%，p<0.001）和干预后3个月（68.0% vs 2.0%，p<0.001）均显著高于对照组，提示手机聊天机器人可有效提升少数族裔的疫苗接种率。

> **要点**：聊天机器人干预使南亚裔流感疫苗接种率大幅提升（3个月时68.0% vs 对照2.0%，p<0.001，n=610）。

### 6. 接触ChatGPT后公众对医疗人工智能认知的变化

*Changes in public perception of artificial intelligence in healthcare after exposure to ChatGPT.*

**npj Digital Medicine** · 2025-11-25 · 队列研究 · [PMID 41290943](https://pubmed.ncbi.nlm.nih.gov/41290943/) · [DOI](https://doi.org/10.1038/s41746-025-02169-x)

研究利用5899名调查参与者在2022年（ChatGPT发布前）与2024年的基线及随访数据，考察接触ChatGPT如何改变公众对医疗AI的认知，并采用多项多元logistic回归建模。随访时有1195人(20%)接触过ChatGPT；在基线时对AI持不确定态度的人群中，接触ChatGPT与认知转变为“有益”的更高几率相关(OR 3.21, 95%CI 2.34-4.40)，而在基线已有明确认知者中则与转向不确定的更低几率相关。研究提示通过接触AI工具可减少公众的不确定性并改善其对医疗AI的认知。

> **要点**：5899人纵向调查显示，接触ChatGPT使基线态度不确定者转为认为AI有益的几率提高约3.2倍(OR 3.21, 95%CI 2.34-4.40)。

### 7. 基于大语言模型量化社会决定因素对肝移植决策影响的方法

*A large language model-based approach to quantifying the effects of social determinants in liver transplant decisions.*

**npj Digital Medicine** · 2025-11-17 · 原创研究 · [PMID 41249463](https://pubmed.ncbi.nlm.nih.gov/41249463/) · [DOI](https://doi.org/10.1038/s41746-025-02025-y)

研究开发了一个大语言模型框架，用于抽取并分析社会心理风险因素与健康的社会决定因素(SDOH)如何影响肝移植的诊疗轨迹。关键可干预障碍的患病率因人口学特征而异：社会支持缺乏占35.4%（女性受影响尤为突出）、近期物质使用占14.2%-22.7%、心理健康问题占17.6%（西班牙裔/拉丁裔存在治疗缺口）；每个因素与列入移植等候名单概率下降5-14个百分点相关，其影响程度与临床指标相当。社会心理风险与SDOH因素解释了亚裔患者列名决策中42.6%的种族差异，超过肝脏健康指标的36.8%，合计可解释94.6%的差异。

> **要点**：LLM抽取显示社会心理与SDOH因素使肝移植列名概率降低5-14个百分点，并解释亚裔患者42.6%的种族差异（高于肝脏健康指标的36.8%）。

---

## 十二、治理、监管、伦理与政策（23 篇）

### 1. 需要基于公开生物信号数据的大语言模型研究以保护患者

*LLM research on public biosignals data is needed to protect patients.*

**npj Digital Medicine** · 2026-07-04 · 综述/观点 · [PMID 42401685](https://pubmed.ncbi.nlm.nih.gov/42401685/) · [DOI](https://doi.org/10.1038/s41746-026-02872-3)

这是一篇观点/综述性文章，指出LLM为医学带来新机遇，但要发展安全且创新的数字健康工具，必须有可支持研究和提供基准的公开生物信号数据集。作者指出当前多个公开数据集的数据使用协议实际上限制了LLM相关研究，并提出了一系列建议，以使生物信号数据的公开发布能够在伦理合规的前提下促进LLM研究。

> **要点**：现有公开生物信号数据集的使用协议限制了LLM研究，作者呼吁修订数据治理条款以在保护患者的同时促进研究。

### 2. “会倾听的墙”的伦理：环境临床AI时代的患者自主权与知情同意

*The ethics of listening walls: patient autonomy and consent in the age of ambient clinical AI.*

**npj Digital Medicine** · 2026-07-03 · 综述/观点 · [PMID 42399409](https://pubmed.ncbi.nlm.nih.gov/42399409/) · [DOI](https://doi.org/10.1038/s41746-026-02973-z)

这是一篇针对环境（ambient）临床AI记录系统的伦理评论。文章指出这类“始终在听”的AI书记员虽能减轻文书负担与医生倦怠、带来效率收益，但在知情同意、自主权、隐私、数据治理和信任方面引发重大伦理担忧。作者分析了患者视角、监管与公平性缺口，主张以患者为中心的知情同意、透明度、数据最小化和健全治理来保障其伦理部署。

> **要点**：环境临床AI书记员需以患者为中心的知情同意、透明度、数据最小化与治理框架方可伦理部署。

### 3. 当AI给出错误的处方建议时，责任由谁承担

*Who bears liability when AI gives bad prescribing advice.*

**npj Digital Medicine** · 2026-06-11 · 社论/评论 · [PMID 42277191](https://pubmed.ncbi.nlm.nih.gov/42277191/) · [DOI](https://doi.org/10.1038/s41746-026-02854-5)

这篇通讯讨论AI聊天机器人在常无医生参与的情况下向患者提供处方级建议所引发的法律责任归属问题。作者提出，在美国法下，长期用于规制药品生产商未尽警示义务的“学习中间人原则”（learned intermediary doctrine）在两条新兴路径中的适用方式并不相同：一是AI置于临床医生之后（辅助医生），二是AI直接向患者提供建议。作者认为更紧迫的影响其实来自普通医疗过失（medical malpractice）责任——临床医生可能被要求主动筛查患者是否已获取来自AI的处方建议。

> **要点**：观点性通讯：AI直接向患者提供处方建议将改变“学习中间人原则”的适用，临床医生或负有筛查患者AI用药建议的义务。

### 4. 专家视角：生成式AI时代医疗AI监督的生态系统

*Expert perspectives on the ecosystem of medical AI oversight in the GenAI era.*

**npj Digital Medicine** · 2026-05-22 · 综述/观点 · [PMID 42174156](https://pubmed.ncbi.nlm.nih.gov/42174156/) · [DOI](https://doi.org/10.1038/s41746-026-02785-1)

本文是与美国 FDA 局长办公室 AI 治理与数字健康政策顾问 Shantanu Nundy 博士访谈三篇系列中的第三篇。文章论述生成式AI（GenAI）与大语言模型驱动的医疗器械，其监督已超出任何单一监管机构的职权范围，需要政府机构、卫生系统与一线临床医生之间的协同；同时为希望与 FDA 建立有效沟通的创新者提供了实务建议。

> **要点**：GenAI/LLM 医疗器械的监督需政府、卫生系统与临床医生协同，单一监管者无法独立胜任。

### 5. 专家视角：美国对医疗健康领域大语言模型的监管路径

*Expert perspectives on US regulatory approaches to large language models in healthcare.*

**npj Digital Medicine** · 2026-05-19 · 综述/观点 · [PMID 42156995](https://pubmed.ncbi.nlm.nih.gov/42156995/) · [DOI](https://doi.org/10.1038/s41746-026-02787-z)

本文为与 FDA 局长办公室顾问 Shantanu Nundy 博士访谈三篇系列中的第二篇，聚焦监管 LLM 驱动医疗AI 的难题。核心论点是：LLM 的应用常常超出传统医疗器械的边界，使既有的器械审评与监管框架难以直接套用，需要重新思考适配生成式模型特性的监管模式。

> **要点**：LLM 医疗AI 超出传统医疗器械边界，对既有 FDA 监管框架构成结构性挑战。

### 6. 大语言模型需要新型监督：基于能力的监测

*Large language models require a new form of oversight: capability-based monitoring.*

**npj Digital Medicine** · 2026-05-15 · 社论/评论 · [PMID 42141031](https://pubmed.ncbi.nlm.nih.gov/42141031/) · [DOI](https://doi.org/10.1038/s41746-026-02740-0)

这篇来信指出 LLM 已在医疗中被快速采用，但缺乏配套的监督策略，进而提出「基于能力的监测」（capability-based monitoring）。其出发点是 LLM 属通用系统，内部重叠的能力会在众多下游任务中被反复复用，因此监测应围绕共享能力而非单个任务组织，以便跨任务发现系统性弱点、长尾错误与涌现行为；文中还给出面向开发者、机构管理者、专业学会与政策制定者的具体考量。

> **要点**：提出以共享能力而非单一任务为单位监测医疗 LLM，从而跨任务捕捉系统性缺陷、长尾错误与涌现行为。

### 7. 追溯落笔者：生成式AI兴起下的电子健康记录

*Tracing the Pen: Electronic Health Records Amid the Rise of Generative AI.*

**npj Digital Medicine** · 2026-04-21 · 综述/观点 · [PMID 42014474](https://pubmed.ncbi.nlm.nih.gov/42014474/) · [DOI](https://doi.org/10.1038/s41746-026-02508-6)

这篇观点综述指出，大语言模型正通过辅助临床文书、起草初步诊断报告和支持医患沟通，深刻改变医生与电子健康记录（EHR）的交互方式。尽管LLM能减轻行政负担，但其融入临床工作流会带来AI生成内容与人类书写内容在EHR中混杂的风险。文章梳理了确保EHR中AI生成内容可追溯性的技术方案与政策方案，以维护临床记录的完整性。

> **要点**：呼吁以技术与政策手段确保EHR中AI生成内容可溯源，防止AI与人类书写内容混杂损害临床记录完整性。

### 8. 医疗沟通中“空洞共情话语”的风险与自动化共情的挑战

*The risk of empty empathy talk and challenges of automated empathy in healthcare communication.*

**npj Digital Medicine** · 2026-03-28 · 综述/观点 · [PMID 41904237](https://pubmed.ncbi.nlm.nih.gov/41904237/) · [DOI](https://doi.org/10.1038/s41746-026-02574-w)

该观点性综述指出，近期研究显示大语言模型在文本化医疗沟通中的共情表现优于人类，但推广自动化共情可能助长“空洞共情话语”——即缺乏关系深度与具身意义的语言。作者警告，不加批判地依赖自动化共情可能削弱临床医生自身的共情能力，并损害医患关系质量。文章呼吁通过反思性策略在未来医疗中守护真实、有温度的共情。

> **要点**：警示依赖LLM自动化共情会制造“空洞共情话语”并侵蚀临床医生的共情能力，需以反思性策略保障真实共情。

### 9. 医生不在，但聊天机器人在：犹他州监管心理健康AI的经验

*The doctor is not in, but the Chatbot is: Utah's experience regulating mental health AI.*

**npj Digital Medicine** · 2026-03-27 · 社论/评论 · [PMID 41888409](https://pubmed.ncbi.nlm.nih.gov/41888409/) · [DOI](https://doi.org/10.1038/s41746-026-02580-y)

这封通讯总结了美国犹他州对生成式AI心理健康智能体的监管审查结果，该审查已用于指导立法与最佳实践指南的制定。文章指出，此类智能体可为未满足的行为健康需求提供可扩展、低成本的支持，但也带来复杂的政策挑战；关键洞见包括利益相关方立场分歧、风险-收益权衡的动态演变以及对适应性监管的需求。作者主张建立循证协议、持续监测和整体、包容的政策制定流程，以确保其安全有效地融入心理健康服务。

> **要点**：基于犹他州监管审查，主张以循证协议、持续监测与适应性监管来治理生成式AI心理健康聊天机器人。

### 10. 重症监护病房中人工智能的监管：从狭义工具到通用系统

*The regulation of artificial intelligence in intensive care units: from narrow tools to generalist systems.*

**npj Digital Medicine** · 2026-03-21 · 综述/观点 · [PMID 41865113](https://pubmed.ncbi.nlm.nih.gov/41865113/) · [DOI](https://doi.org/10.1038/s41746-026-02535-3)

该观点文章指出，ICU中目前获批的AI设备多为狭义模型，而研究正快速转向基于大语言模型与agentic AI（智能体AI）的通用系统。作者提出一个五范式框架，说明监管复杂性如何随AI功能与规模的提升而上升。文章认为现行监管框架以设备为中心，难以适配通用系统，需要诸如“智能体监督（agentic oversight）”等新方法来编排和治理AI系统。

> **要点**：提出五范式框架，指出以设备为中心的监管难以覆盖ICU中的LLM与agentic AI通用系统，需引入智能体监督等新机制。

### 11. 革新面向医疗器械中生成式AI的全球监管框架是当务之急

*Innovating global regulatory frameworks for generative AI in medical devices is an urgent priority.*

**npj Digital Medicine** · 2026-03-19 · 综述/观点 · [PMID 41857339](https://pubmed.ncbi.nlm.nih.gov/41857339/) · [DOI](https://doi.org/10.1038/s41746-026-02552-2)

该观点文章讨论生成式AI（GenAI）与大语言模型融入医疗所带来的空前机遇与挑战。作者剖析了基于GenAI/LLM的医疗器械所固有的风险，以及现行医疗器械监管框架在应对此类产品时的局限性。文章主张开展全球协作的监管科学研究，纳入多学科专业力量，并聚焦于多样化人群的实际需求。

> **要点**：呼吁以全球协作的监管科学研究革新现行框架，使其能够应对生成式AI与LLM医疗器械的特有风险。

### 12. 智能体时代的临床人工智能监管：面向医疗的非受限非确定性临床软件（UNDCS）系统

*Regulation of clinical Artificial Intelligence (AI) in the Age of Agents: Unconfined Non-Deterministic Clinical Software (UNDCS) systems for healthcare.*

**npj Digital Medicine** · 2026-02-23 · 社论/评论 · [PMID 41731018](https://pubmed.ncbi.nlm.nih.gov/41731018/) · [DOI](https://doi.org/10.1038/s41746-026-02420-z)

这是一篇回应性通讯，针对Weissman等人提出的“基于LLM的临床决策支持（CDS）输出符合受监管医疗器械标准、因而需要新监管框架”的观点作出回应。作者指出其中部分考量已被现有指南覆盖、无需另立新框架，但对未锚定于特定临床适应证的“通用型”CDSS确实存在监管空白，并通过区分受限与非受限AI系统的文献梳理来界定这一空白。文章进一步列出可能需要新监管的具体领域，以及可纳入未来指南的风险缓解策略。

> **要点**：提出以“非受限非确定性临床软件（UNDCS）”界定通用型LLM临床决策支持的监管空白。

### 13. 利用大语言模型扩展医疗器械监管科学的数据分析

*Scaling medical device regulatory science using large language models.*

**npj Digital Medicine** · 2026-02-05 · 原创研究 · [PMID 41644679](https://pubmed.ncbi.nlm.nih.gov/41644679/) · [DOI](https://doi.org/10.1038/s41746-026-02353-7)

面对 AI/ML 医疗器械激增而监管文档非结构化、术语繁杂、依赖人工标注的困境，本研究首次大范围验证了 LLM 在医疗器械监管科学数据分析中的可行性。以专家人工标注与「LLM-as-a-judge」双重方式评估，LLM 抽取上市前与上市后各类属性的准确率常达 80% 或更高。作者进一步展示了三类规模化应用：监测器械验证实践、对医疗器械报告进行编码、识别上市后不良事件的潜在风险因素。

> **要点**：LLM 从监管文档中抽取关键属性的准确率常≥80%，可规模化支撑器械监管政策分析与上市后风险监测。

### 14. 政策简报：环境AI记录员与编码军备竞赛

*Policy brief: ambient AI scribes and the coding arms race.*

**npj Digital Medicine** · 2025-12-24 · 综述/观点 · [PMID 41444833](https://pubmed.ncbi.nlm.nih.gov/41444833/) · [DOI](https://doi.org/10.1038/s41746-025-02272-z)

这是一篇政策简报（Letter），讨论环境AI“数字记录员”快速进入常规诊疗后带来的支付政策问题：此类工具虽能减轻文书负担与医生倦怠，但早期证据显示其会提高计费与风险调整编码强度，促使支付方以下调编码和风险分值再校准作为反制。文章对比了按服务付费与Medicare Advantage模式下的不同影响，并提出在不引发“编码军备竞赛”的前提下保留其价值的政策步骤。

> **要点**：环境AI记录员可能推高编码强度并引发支付方反制，需政策设计避免陷入编码军备竞赛。

### 15. 如果一个治疗机器人走起来像鸭子、叫起来也像鸭子，那它就是一只受医疗监管的鸭子

*If a therapy bot walks like a duck and talks like a duck then it is a medically regulated duck.*

**npj Digital Medicine** · 2025-12-05 · 社论/评论 · [PMID 41350404](https://pubmed.ncbi.nlm.nih.gov/41350404/) · [DOI](https://doi.org/10.1038/s41746-025-02175-z)

这是一篇关于LLM心理治疗机器人监管的评论性通讯。作者指出LLM日益被用于心理健康交互并常模仿治疗行为，却缺乏监管；已有包括自杀在内的实际伤害记录，凸显加强防护的紧迫性。文章主张：凡提供类治疗功能的LLM应按医疗器械进行监管，建立保障安全性、透明度与问责的标准，以务实监管保护脆弱用户并维护数字健康干预的公信力。

> **要点**：主张具备类治疗功能的LLM应作为医疗器械纳入监管，以应对已发生的实际伤害。

### 16. 政策简报：AI优先的Medicaid——CMS如何以精准福利(Precision Benefits)构建更智慧的安全网

*Policy brief: AI-first Medicaid: how CMS can build a smarter safety net with Precision Benefits.*

**npj Digital Medicine** · 2025-11-28 · 综述/观点 · [PMID 41315760](https://pubmed.ncbi.nlm.nih.gov/41315760/) · [DOI](https://doi.org/10.1038/s41746-025-02195-9)

这是一篇面向美国CMS的政策简报，讨论如何用AI改造覆盖逾7000万美国人的Medicaid体系。文章提出AI驱动的数字助手可提供7×24小时多语种语音或文本支持，在现有人力监督下以“嵌入式员工”形式通过治疗聊天机器人等工具弥补行为健康与社区协调的缺口，并提出“精准福利”(Precision Benefits)概念，即在正确的时间为正确的人提供正确的支持。文章将其与H.R.1中的行政与资格改革相衔接，同时强调必须以负责任的AI开发应对安全、偏倚、隐私与信任问题，并推动基础设施与支付模式现代化。

> **要点**：提出以AI数字助手与“精准福利”重塑覆盖7000万人的Medicaid，前提是解决安全、偏倚、隐私与信任问题。

### 17. 倡导异形化(xenomorphic)的面向患者AI：反对医学AI的拟人化设计

*Promoting xenomorphic patient-facing AIs: The case against anthropomorphism in medical AIs.*

**npj Digital Medicine** · 2025-11-17 · 综述/观点 · [PMID 41249441](https://pubmed.ncbi.nlm.nih.gov/41249441/) · [DOI](https://doi.org/10.1038/s41746-025-02046-7)

这是一篇观点性综述，针对面向患者的医学人工智能(MAI)迅速兴起所引发的设计与影响问题。作者认为当前赋予AI类人特征的拟人化设计基于对医疗的简化理解，可能侵蚀作为良好健康结局基础的医患关系(DPR)的完整性。文章主张采用异形化(xenomorphic)设计，即刻意赋予MAI非人乃至异类的特征，使其尽可能区别于人类医师，从而避免与人类的关系角色直接竞争，保护医患关系的本体独特性。作者类比动物辅助治疗的既有获益，提出异形化MAI有望建立一类非人却有益健康的新型治疗性关系。

> **要点**：主张以异形化而非拟人化设计面向患者的医学AI，以保护医患关系并开辟新型治疗性关系。

### 18. 涉及生成式人工智能应用的研究报告规范：该用哪个、何时用？

*Reporting guidelines for studies involving generative artificial intelligence applications: what do I use, and when?*

**npj Digital Medicine** · 2025-11-07 · 综述/观点 · [PMID 41203886](https://pubmed.ncbi.nlm.nih.gov/41203886/) · [DOI](https://doi.org/10.1038/s41746-025-02113-z)

随着将生成式人工智能(GAI)模型用于健康领域的研究不断增多，配套的报告标准正在制订之中。本文梳理了当前适用于GAI模型的各类报告指南，并概述了即将出台的报告标准。作者强调研究者须及时跟进最适用的工具，以在GAI融入医疗的进程中实现全面、规范的研究报告。

> **要点**：本文汇总并指引研究者选用适合生成式AI健康研究的现有及在研报告规范。

### 19. 在医疗系统中落地机器辅助翻译

*Operationalizing machine-assisted translation in healthcare.*

**npj Digital Medicine** · 2025-09-30 · 综述/观点 · [PMID 41028827](https://pubmed.ncbi.nlm.nih.gov/41028827/) · [DOI](https://doi.org/10.1038/s41746-025-01944-0)

美国超过2500万有非英语语言偏好的患者，因出院指导等材料难以及时翻译而面临不安全的医疗。本文指出大语言模型辅助的翻译技术有望弥合这一鸿沟，但相应的实施指导仍十分匮乏。作者运用CFIR（实施研究综合框架），从创新本身、个体、内部环境、实施过程与外部环境五个维度提出关键考量，为医疗管理者与政策制定者整合语言模型机器辅助翻译提供了一份实用路线图。

> **要点**：基于CFIR框架为LLM机器辅助医疗翻译的落地提出五维度实施路线图，惠及2500万非英语偏好患者。

### 20. 生物医学基础模型的鲁棒性测试应针对规范定制

*Robustness tests for biomedical foundation models should tailor to specifications.*

**npj Digital Medicine** · 2025-08-29 · 社论/评论 · [PMID 40883427](https://pubmed.ncbi.nlm.nih.gov/40883427/) · [DOI](https://doi.org/10.1038/s41746-025-01926-2)

本文为评论性文章，指出生物医学基础模型能力广泛且易受复杂分布偏移影响，给模型测试与审批授权带来新障碍。作者主张按任务相关的优先级定制鲁棒性测试，并将细粒度的鲁棒性概念纳入预先设定的规范（specification）以指导实施。该思路有助于在模型全生命周期中实现鲁棒性评估的标准化，并把抽象的AI监管框架与具体测试流程衔接起来。

> **要点**：主张以预设规范定制生物医学基础模型的鲁棒性测试，从而连接抽象监管框架与具体测试流程。

### 21. 同行如何看待临床医生在医疗决策中使用生成式AI

*Peer perceptions of clinicians using generative AI in medical decision-making.*

**npj Digital Medicine** · 2025-08-18 · 原创研究 · [PMID 40826224](https://pubmed.ncbi.nlm.nih.gov/40826224/) · [DOI](https://doi.org/10.1038/s41746-025-01901-x)

该随机实验让276名执业临床医生阅读三种情境之一：医生不使用生成式AI（对照）、将生成式AI作为主要决策工具（GenAI-primary）、或将其作为核查工具（GenAI-verify），并评价该医生。结果显示GenAI-primary情境下医生的临床技能评分（1–7分制，均值3.79）显著低于对照组（5.93，p<0.001），而将AI定位为核查工具可部分缓解这一负面评价（4.99，p<0.001）；在整体医疗体验与胜任力感知上呈类似模式。受访者同时认可生成式AI提升准确性的价值（4.30，p<0.002），并对机构定制版生成式AI评价更高（4.96，p<0.001）。

> **要点**：把生成式AI作为主要决策工具会使同行对医生临床技能的评分从5.93降至3.79（p<0.001），定位为核查工具仅能部分缓解。

### 22. 医学中的基础模型是一场社会实验：亟需伦理框架

*Foundation models in medicine are a social experiment: time for an ethical framework.*

**npj Digital Medicine** · 2025-08-16 · 社论/评论 · [PMID 40819001](https://pubmed.ncbi.nlm.nih.gov/40819001/) · [DOI](https://doi.org/10.1038/s41746-025-01924-4)

本文为通讯/观点，指出基础模型正被迅速整合进医学，带来机遇的同时也带来伦理挑战：与传统医疗技术不同，它们往往在缺乏严格测试与监管的情况下进入真实世界使用。作者主张这种使用实质上构成一场「社会实验」，其影响具有不可预测和部分不可控的特性。文章提出一套伦理框架，强调以「负责任实验」应具备的条件（而非追求不可实现的完全可预测性）来指导基础模型的负责任落地。

> **要点**：主张把医学基础模型的部署视为社会实验，并用负责任实验的伦理框架而非完全可预测性来规范其应用。

### 23. 肿瘤学中的负责任人工智能治理

*Responsible Artificial Intelligence governance in oncology.*

**npj Digital Medicine** · 2025-07-04 · 原创研究 · [PMID 40615544](https://pubmed.ncbi.nlm.nih.gov/40615544/) · [DOI](https://doi.org/10.1038/s41746-025-01794-w)

研究报告了一家综合癌症中心在临床、运营和科研项目中实施的负责任AI治理模型及其AI治理委员会一年的运行结果，包括26个AI模型（含大语言模型）的注册与监测、2个环境记录(ambient AI)试点以及33个列线图的审查。文章分享了整体项目模型、模型信息表、风险评估工具和生命周期管理工具等新型治理管理工具，并通过两个AI模型案例说明经验教训及针对部分模型的“快速通道”方法。作者认为这是已知最早发表的肿瘤学大规模负责任AI治理报告之一。

> **要点**：癌症中心一年内治理26个AI模型（含LLM）、2个ambient AI试点和33个列线图，形成可复用的负责任AI治理工具集。

---

## 十三、模型开发与技术方法（19 篇）

### 1. 以电子病历为核心的临床大语言模型（AI4Doctor）

*Clinical large language model centered on electronic medical records.*

**npj Digital Medicine** · 2026-06-19 · 原创研究 · [PMID 42321427](https://pubmed.ncbi.nlm.nih.gov/42321427/) · [DOI](https://doi.org/10.1038/s41746-026-02509-5)

研究提出AI4Doctor，一个面向临床领域的大语言模型：在监督微调阶段将从电子病历（EMR）中蒸馏的数据与执业医师的经验性见解相融合，并采用课程学习（curriculum learning）策略处理多源指令的复杂性。研究进一步设计奖励系统与一种新型强化学习方法，使模型输出对齐医师在实践与EMR中积累的诊断先验、风险阈值和启发式显著性；作者还引入了包含对比评价的新基准，并由专家从专业视角进行主观评估。摘要未报告具体量化指标，但结果支持该混合模型有潜力成为弥合AI与真实临床实践差距的医疗咨询工具。

> **要点**：通过EMR蒸馏数据与医师经验的课程学习+强化学习对齐，AI4Doctor更接近真实医师的综合诊断决策过程。

### 2. EyeRAG：面向安全准确眼科临床对话的图检索增强生成系统

*EyeRAG: graph retrieval-augmented generation for safe and accurate clinical dialogue in ophthalmology.*

**npj Digital Medicine** · 2026-06-05 · 原创研究 · [PMID 42249114](https://pubmed.ncbi.nlm.nih.gov/42249114/) · [DOI](https://doi.org/10.1038/s41746-026-02860-7)

研究提出EyeRAG，一个以临床指南为唯一来源构建的眼科知识图谱OphthaKG为基础的GraphRAG对话系统，用于缓解LLM的事实性错误（幻觉）与领域知识不足。评估覆盖120个临床场景（青光眼、糖尿病视网膜病变、白内障各40例）、6个LLM（GPT-4o、Gemini 2.5 Flash、Grok 4、Llama 3.3 70B、Claude Sonnet 4、DeepSeek-V2.5）与4种RAG配置，由LLM-as-a-judge及具资质的眼科医师在内部/外部数据集上验证。EyeRAG优于原生LLM与标准RAG：LLM评价平均排名最高（内部1.61±1.04，外部1.72±1.18），专家给出的平均排名为1.0，幻觉率由基线30%降至3.3%。作者定位其为医师监督下的患者沟通解释工具而非临床决策工具。

> **要点**：指南知识图谱驱动的EyeRAG将眼科对话幻觉率从30%降至3.3%，在6个LLM与4种RAG配置中排名第一。

### 3. 一种用于电子健康记录语义审计的生成式方法

*A generative approach for semantic auditing of electronic health records.*

**npj Digital Medicine** · 2026-05-30 · 原创研究 · [PMID 42225932](https://pubmed.ncbi.nlm.nih.gov/42225932/) · [DOI](https://doi.org/10.1038/s41746-026-02809-w)

针对EHR数据常与既有科学知识不一致、而现有质量评估或仅关注语法或依赖人工规则的问题，研究提出"Medical Data Pecking"方法，将软件单元测试原理引入医疗数据验证，并提出"语义数据覆盖度"概念：用大语言模型生成上下文感知的测试用例，"啄食"式地检出观测数据与流行病学证据之间的不一致。参考实现采用检索增强生成(RAG)架构，将医学文献合成为可执行代码；在3个数据集上应用后，每个队列生成了数十项测试，识别出观测分布与流行病学先验之间的差异，这些差异既包含真实的数据不一致，也包含预期的队列选择效应。

> **要点**：基于LLM+RAG自动生成语义测试，每个队列可产生数十项检查并发现EHR与流行病学先验之间的偏离。

### 4. Aloe 家族：开放且专科化医疗大语言模型的训练配方

*The Aloe Family recipe for open and specialized healthcare LLMs.*

**npj Digital Medicine** · 2026-05-11 · 原创研究 · [PMID 42115745](https://pubmed.ncbi.nlm.nih.gov/42115745/) · [DOI](https://doi.org/10.1038/s41746-026-02637-y)

该研究以完全开放的方式系统研究医疗 LLM 的训练与基准评测，公开了复现 Aloe 模型所需的全部权重、数据与代码。技术路线包括：以精选公开数据结合合成样本共 1.8B token 进行训练；通过直接偏好优化（DPO）提升伦理稳健性并抵御越狱攻击；并集成检索增强生成（RAG）系统以提升推理表现。基于 Llama 3.1 与 Qwen 2.5 构建的 Aloe 模型在封闭式、开放式、安全性与人工评估中均取得有竞争力的表现，安全性与抗偏倚能力显著改善，并附有面向医疗场景的详细风险评估。

> **要点**：Aloe 以 1.8B token 训练加 DPO 与 RAG，在医疗基准上表现具竞争力且安全性/抗偏倚显著提升，权重与数据全部开源。

### 5. 强化学习提升大语言模型从放射学报告进行疾病分类的准确性与推理能力

*Reinforcement learning improves LLM accuracy and reasoning in disease classification from radiology reports.*

**npj Digital Medicine** · 2026-04-30 · 原创研究 · [PMID 42062541](https://pubmed.ncbi.nlm.nih.gov/42062541/) · [DOI](https://doi.org/10.1038/s41746-026-02685-4)

研究针对轻量级 LLM 在放射学报告疾病分类中监督微调（SFT）虽提升准确率却损害推理能力的问题，提出两阶段方案：先在疾病标签上做 SFT，再用群体相对策略优化（GRPO）在无推理监督的情况下同时优化准确性与输出格式。在三个由放射科医师标注的数据集上，SFT 优于基线，GRPO 进一步提升了分类性能，并改善了推理内容的召回度与全面性。

> **要点**：SFT 加 GRPO 的两阶段训练在三个放射科医师标注数据集上同时提升 LLM 分类准确性与推理质量。

### 6. 多类型提示工程对大语言模型高血压治疗决策的影响

*The effects of multitype prompt engineering for large language models in hypertension treatment decisions.*

**npj Digital Medicine** · 2026-04-15 · 原创研究 · [PMID 41986562](https://pubmed.ncbi.nlm.nih.gov/41986562/) · [DOI](https://doi.org/10.1038/s41746-026-02645-y)

研究采用两阶段验证设计，基于真实临床场景构建300例去标识化模拟高血压病例，评估不同提示工程策略对LLM决策表现的影响。ChatGPT-4.1配合Guidance-Self-Consistency提示表现最佳（准确率91.3%，接近专家水平），而零样本提示效果最差（DeepSeek-V3仅62.7%）。最优LLM辅助持续提升各级医院医生的平均准确率（社区医院73.4%→82.5%，县级医院84.0%→87.9%，教学医院91.5%→92.0%）并降低不合理方案率；而最差的LLM配置反使医生表现低于基线，不合理方案率从26.6%升至35.2%。研究已试验注册（ChiCTR2500099307）。

> **要点**：最优提示策略（ChatGPT-4.1 + Guidance-Self-Consistency）准确率达91.3%并提升各级医生表现，而劣质提示反使医生不合理方案率从26.6%升至35.2%。

### 7. SynthEHR-eviction：利用LLM增强的合成EHR数据提升“驱逐”类健康社会决定因素的识别

*SynthEHR-eviction: enhancing eviction SDoH detection with LLM-augmented synthetic EHR data.*

**npj Digital Medicine** · 2026-02-27 · 原创研究 · [PMID 41760885](https://pubmed.ncbi.nlm.nih.gov/41760885/) · [DOI](https://doi.org/10.1038/s41746-026-02473-0)

驱逐是一项重要却研究不足的健康社会决定因素（SDoH），它虽出现在非结构化电子健康记录中却极少被结构化编码。研究提出可扩展流程SynthEHR-Eviction，整合人在回路标注、自动提示优化（APO）与推理增强微调，用于从临床文本中抽取低资源的驱逐相关SDoH，并据此构建了包含14个细粒度类别的公开数据集。基于该数据微调的LLM（如Qwen2.5、LLaMA3）在人工验证数据上的Macro-F1达88.8%（驱逐）和90.3%（其他SDoH），优于GPT-4o-APO（87.8%、87.3%）、GPT-4o-mini-APO（69.1%、78.1%）和BioBERT（60.7%、68.3%），同时将标注工作量减少超过80%。

> **要点**：微调LLM抽取驱逐相关SDoH的Macro-F1达88.8%，优于GPT-4o-APO，并减少80%以上标注工作量。

### 8. CancerLLM：面向肿瘤领域的大语言模型

*CancerLLM: a large language model in cancer domain.*

**npj Digital Medicine** · 2026-02-20 · 原创研究 · [PMID 41720895](https://pubmed.ncbi.nlm.nih.gov/41720895/) · [DOI](https://doi.org/10.1038/s41746-026-02441-8)

作者训练了 CancerLLM，一个 70 亿参数的 Mistral 架构模型，语料为覆盖 17 种癌症的 270 万份临床病历和 51.5 万份病理报告，并针对癌症表型抽取与诊断生成任务进行微调。内部基准上表型抽取 F1 达 91.78%，诊断生成 F1 达 86.81%，较现有 LLM 平均 F1 提升 9.23%。模型在时间与 GPU 资源消耗方面也更高效、更鲁棒。

> **要点**：7B 的 CancerLLM 在癌症表型抽取（F1 91.78%）与诊断生成（F1 86.81%）上平均超出现有 LLM 9.23 个 F1 点，且算力开销更低。

### 9. 多步检索与推理提升大语言模型的放射学问答表现

*Multi-step retrieval and reasoning improves radiology question answering with large language models.*

**npj Digital Medicine** · 2025-12-22 · 原创研究 · [PMID 41429891](https://pubmed.ncbi.nlm.nih.gov/41429891/) · [DOI](https://doi.org/10.1038/s41746-025-02250-5)

研究提出多步检索框架RaR（radiology Retrieval and Reasoning），通过迭代地概括临床问题、检索证据并综合答案来克服单步RAG的局限；在104道专家精选放射学问题和65道真实放射学专科考试题上评估了25个参数量从0.5B到670B的通用、推理优化及临床微调模型。RaR将平均诊断准确率从零样本的67%提升至75%（P=1.1×10⁻⁷），也优于常规在线RAG的69%（P=1.9×10⁻⁶），中小模型获益最大（如Mistral Large从72%升至81%），超大模型几乎无变化。RaR还减少了幻觉，并在46%的病例中提供了临床相关证据。

> **要点**：多步检索框架RaR将放射学问答准确率从67%提升至75%（P=1.1×10⁻⁷），中小模型获益最大。

### 10. 含预定义验证步骤的两阶段提示框架在两个数据集诊断推理任务上的评估

*Two-stage prompting framework with predefined verification steps for evaluating diagnostic reasoning tasks on two datasets.*

**npj Digital Medicine** · 2025-12-16 · 原创研究 · [PMID 41402582](https://pubmed.ncbi.nlm.nih.gov/41402582/) · [DOI](https://doi.org/10.1038/s41746-025-02146-4)

研究在589道MedQA-USMLE题目和300例NEJM病例上，用GPT-4o与DeepSeek-V3评估“初始诊断→验证→最终诊断”的两阶段提示框架，每例采样5次并由盲法的执业认证医师评价。经验证后，最终诊断的准确率最高提升5.2%，不确定性降低16.0%，一致性提高23.3%；在三类推理错误中，“错误医学知识”的减少幅度最大（63.0%）。与思维链（CoT）相比，该框架的准确率最高提升4.0%、不确定性降低4.9%、一致性提高11.0%。

> **要点**：两阶段验证提示使诊断准确率最高提升5.2%、一致性提高23.3%，错误医学知识类推理错误减少63.0%。

### 11. 增强面向围手术期并发症检测的隐私保护可部署大语言模型：基于LoRA微调的针对性策略

*Enhancing privacy-preserving deployable large language models for perioperative complication detection: a targeted strategy with LoRA fine-tuning.*

**npj Digital Medicine** · 2025-12-13 · 原创研究 · [PMID 41390570](https://pubmed.ncbi.nlm.nih.gov/41390570/) · [DOI](https://doi.org/10.1038/s41746-025-02139-3)

针对围手术期并发症人工检测漏报率高达27%的问题，研究以针对性提示工程结合低秩适配（LoRA）微调，将较小的开源LLM转化为可本地部署的专家级诊断工具，并在双中心验证中构建了可同时识别并分级22种并发症严重度的框架。思维链提示显著提升通用模型表现（p<0.001）；在各文书长度四分位上AI模型F1均>0.64，而人类专家表现从0.73降至0.45。外部验证（中心2）中，优化后的4B模型micro-F1从0.28升至0.64（接近人类专家的0.69），其中针对性策略贡献ΔF1=0.256（95%CI 0.181–0.336）、LoRA贡献ΔF1=0.103（95%CI 0.023–0.186）；8B模型F1>0.70，超过人类专家。

> **要点**：针对性策略+LoRA使本地部署的4B模型外部验证micro-F1从0.28升至0.64，8B模型F1>0.70超过人类专家（0.69）。

### 12. 大语言模型驱动的神经架构搜索用于组织病理切片图像的通用轻量化疾病诊断

*Large language models driven neural architecture search for universal and lightweight disease diagnosis on histopathology slide images.*

**npj Digital Medicine** · 2025-11-18 · 原创研究 · [PMID 41254215](https://pubmed.ncbi.nlm.nih.gov/41254215/) · [DOI](https://doi.org/10.1038/s41746-025-02042-x)

针对任务专用模型需为每种疾病单独建模、而通用基础模型定制成本高昂的问题，研究提出Pathology-NAS——一个利用LLM知识来精炼架构搜索空间、从而免去穷尽搜索的通用轻量化医学分析框架。该框架在三种超网架构上以130万张图像预训练，构建了可跨任务泛化的视觉基础。在乳腺癌和糖尿病视网膜病变诊断任务上，Pathology-NAS取得99.98%的分类准确率，同时相比领先方法减少45%的FLOPs，并仅需10次迭代即可给出接近最优的架构，绕开了指数级搜索空间。

> **要点**：LLM引导的架构搜索使Pathology-NAS在10次迭代内取得99.98%分类准确率并降低45% FLOPs。

### 13. 出版方更正：面向面部表型相关罕见遗传病的图检索增强大语言模型

*Publisher Correction: Graph retrieval augmented large language models for facial phenotype associated rare genetic disease.*

**npj Digital Medicine** · 2025-10-08 · 通讯/更正 · [PMID 41062673](https://pubmed.ncbi.nlm.nih.gov/41062673/) · [DOI](https://doi.org/10.1038/s41746-025-02017-y)

本条目为出版方更正声明，无摘要内容。原研究利用图检索增强生成(Graph RAG)技术增强大语言模型，用于识别与面部表型相关的罕见遗传病。

> **要点**：对“图检索增强大语言模型用于面部表型相关罕见遗传病”一文的出版方更正声明。

### 14. 大型医疗系统中生成式AI的成本：以收入周期管理为例

*Generative AI costs in large healthcare systems, an example in revenue cycle.*

**npj Digital Medicine** · 2025-09-30 · 综述/观点 · [PMID 41028226](https://pubmed.ncbi.nlm.nih.gov/41028226/) · [DOI](https://doi.org/10.1038/s41746-025-01971-x)

本文以收入周期管理中的医学自由文本分类任务为例，探讨大型医疗系统部署生成式AI（大语言模型）的成本与可靠性问题。作者指出，尽管ChatGPT等基础模型展现出潜力，但替代模型在此类任务上可实现更高准确率且成本更低。文章强调计算成本与模型可靠性是主要挑战，建议医疗系统采用本地模型与商业模型相结合的平衡方案。

> **要点**：在医学自由文本分类任务中替代模型比ChatGPT类基础模型更准确且更便宜，本地+商业模型混合部署可能是医疗系统的平衡解。

### 15. TIMER：面向纵向临床记录的时间性指令建模与评估

*TIMER: temporal instruction modeling and evaluation for longitudinal clinical records.*

**npj Digital Medicine** · 2025-09-26 · 原创研究 · [PMID 41006898](https://pubmed.ncbi.nlm.nih.gov/41006898/) · [DOI](https://doi.org/10.1038/s41746-025-01965-9)

针对大语言模型难以跨多次就诊的纵向电子病历进行时间推理的问题，研究提出TIMER方法，通过将每个指令-回答对绑定到具体时间戳，实现具时间意识的指令微调，使模型锚定于患者特异的时间情境。在临床医生构建的基准上，TIMER微调模型的回答完整性比常规医学指令微调方法高6.6%，分布匹配训练在时间推理上最多提升6.5%。定性分析显示TIMER改善了时间边界遵循、趋势识别与时序精确性，可支持疾病轨迹建模与治疗反应监测。

> **要点**：时间感知指令微调TIMER使LLM在纵向EHR上的回答完整性提升6.6%，时间推理最多提升6.5%。

### 16. 图检索增强的大语言模型用于面部表型相关罕见遗传病

*Graph retrieval augmented large language models for facial phenotype associated rare genetic disease.*

**npj Digital Medicine** · 2025-08-24 · 原创研究 · [PMID 40849403](https://pubmed.ncbi.nlm.nih.gov/40849403/) · [DOI](https://doi.org/10.1038/s41746-025-01955-x)

针对大语言模型在罕见遗传病领域存在幻觉与领域知识不足的问题，研究构建了包含6,143个节点、19,282条关系的面部表型知识图谱（FPKG），并结合检索增强生成（RAG）提升模型回答罕见病问题的能力。研究在领域问答、诊断测试、一致性评估和温度分析四类任务上评测了8个大语言模型，结果显示该方法同时提高了诊断准确性与回答一致性，其中RAG使温度引起的输出变异降低53.94%。研究表明LLM可有效结合领域知识图谱以改进诊断决策。

> **要点**：知识图谱+RAG提升LLM罕见遗传病诊断准确性与一致性，温度导致的输出变异降低53.94%。

### 17. 合成数据训练的开源语言模型可作为放射学报告结构化中专有模型的可行替代方案

*Synthetic data trained open-source language models are feasible alternatives to proprietary models for radiology reporting.*

**npj Digital Medicine** · 2025-07-23 · 原创研究 · [PMID 40702278](https://pubmed.ncbi.nlm.nih.gov/40702278/) · [DOI](https://doi.org/10.1038/s41746-025-01658-3)

研究用3000份合成甲状腺结节口述报告微调6个开源模型（Starcoderbase-1B、Starcoderbase-3B、Mistral-7B、Llama-3-8B、Llama-2-13B、Yi-34B），任务是把自由文本转换为ACR TI-RADS结构化模板，并在来自MIMIC-III的50份甲状腺结节口述报告上测试，与GPT-3.5和GPT-4的0-shot、1-shot、5-shot表现比较。结果显示GPT-4 5-shot与Yi-34B表现最高且两者差异无统计学意义，多个开源模型显著优于GPT模型。作者认为合成数据训练的开源LLM在结构化文本转换上可媲美专有GPT模型，且具备隐私保护优势。

> **要点**：合成数据微调的Yi-34B与GPT-4 5-shot表现相当（差异无统计学意义），开源模型可作为隐私友好的替代方案。

### 18. 将通用AI适配为专科医学AI应用的观点及其挑战

*A perspective for adapting generalist AI to specialized medical AI applications and their challenges.*

**npj Digital Medicine** · 2025-07-11 · 综述/观点 · [PMID 40646157](https://pubmed.ncbi.nlm.nih.gov/40646157/) · [DOI](https://doi.org/10.1038/s41746-025-01789-7)

文章提出把大语言模型适配到医学的三步框架：(1)建模——将医疗工作流拆解为可管理的步骤；(2)优化——通过高级适配方法提升模型性能；(3)系统工程——构建智能体或链式系统。作者列举了临床试验设计、临床决策支持和医学影像分析等多种应用场景，并讨论了用LLM构建医学AI面临的挑战与注意事项。

> **要点**：提出“建模—优化—系统工程”三步框架，指导将通用LLM适配为专科医学AI。

### 19. 检索增强生成(RAG)提升本地部署大语言模型在放射科对比剂咨询中的质量

*Retrieval-augmented generation elevates local LLM quality in radiology contrast media consultation.*

**npj Digital Medicine** · 2025-07-02 · 基准/评估 · [PMID 40604147](https://pubmed.ncbi.nlm.nih.gov/40604147/) · [DOI](https://doi.org/10.1038/s41746-025-01802-z)

针对隐私顾虑与医学领域训练不足限制LLM临床落地的问题，研究在100例合成的碘对比剂咨询案例中，比较了本地可部署的Llama 3.2-11B（基线与RAG增强版）与GPT-4o mini、Gemini 2.0 Flash、Claude 3.5 Haiku三个云端模型，由盲法放射科医师对每例5个回答排序，并用3个LLM评审对准确性、安全性、结构、语气、适用性和延迟评分。RAG将幻觉率由8%降至0%（Yates校正χ²=6.38, p=0.012），平均排名提升1.3位（Z=-4.82, p<0.001），响应更快（2.6秒 vs 云端4.9–7.3秒），但与云端模型仍有差距。LLM评审更偏好RAG模型，而放射科医师仍将GPT-4o mini排在更高位次。

> **要点**：RAG消除了本地LLM的幻觉（8%→0%，p=0.012）并显著改善排名，同时保留本地部署的隐私优势。

---

## 十四、科研辅助与循证医学（8 篇）

### 1. 大语言模型时代的“快信息”与“慢证据”

*Fast information and slow evidence in the large language models era.*

**npj Digital Medicine** · 2026-07-03 · 综述/观点 · [PMID 42399653](https://pubmed.ncbi.nlm.nih.gov/42399653/) · [DOI](https://doi.org/10.1038/s41746-026-02909-7)

这是一篇观点文章，认为LLM虽加速了医学信息处理，但合成速度并不等于可信赖性。作者借助“数据-信息-证据-实践”层级框架指出，LLM输出进入临床时只是“信息”，只有经过评价、验证和情境判断才能成为“证据”。文章讨论了LLM如何支撑证据基础设施、厘清证据边界并重塑临床专业能力，从而强化而非取代循证医学。

> **要点**：LLM输出属于“信息”而非“证据”，须经评价与验证方可用于临床，应强化而非取代循证医学。

### 2. 一种AI辅助的新方法用于对齐数据标准并加速生物医学研究的互操作性

*A new AI assisted approach aligns data standards and accelerates interoperability in biomedical research.*

**npj Digital Medicine** · 2026-06-12 · 原创研究 · [PMID 42286188](https://pubmed.ncbi.nlm.nih.gov/42286188/) · [DOI](https://doi.org/10.1038/s41746-026-02795-z)

研究展示了如何用大语言模型自动生成通用数据元（Common Data Element, CDE）以加速生物医学数据协调：通过OpenAI GPT-4（API模型gpt-4-0613）处理31个数据集（含临床术语体系与研究数据字典），用基于模板的系统为每个数据元生成完整元数据，并以ElasticSearch加权字段匹配识别变量间语义等价、避免重复CDE。领域专家验证显示总体94%的生成元数据字段无需修改，半结构化来源的未加权准确率为83.8%，速度远快于人工方法。在ADNI与GP2数据集上的测试显示，32.4%此前未见过的字段头可成功映射到CDE，基于匹配度、完整性与合规性的互操作性得分平均为53.8/100。

> **要点**：GPT-4生成的CDE元数据有94%无需人工修改（半结构化来源准确率83.8%），32.4%的新字段头可自动映射，显著降低跨研究数据整合成本。

### 3. 大语言模型流水线改写外科试验摘要的可行性与影响

*Feasibility and impact of a large language model pipeline for surgical trial abstracts.*

**npj Digital Medicine** · 2026-05-26 · 原创研究 · [PMID 42191815](https://pubmed.ncbi.nlm.nih.gov/42191815/) · [DOI](https://doi.org/10.1038/s41746-026-02788-y)

研究开展三阶段in silico研究，纳入2005–2025年PubMed收录且在PMC有开放获取全文的外科随机对照试验共651篇，评估受严格约束的LLM流水线能否规模化提升摘要的完整性与可读性。团队先构建并验证了14条目、满分25分的CONSORT衍生评分量表（与专家评分一致性良好，CCC 0.71，95%CI 0.44–0.86；重复性高，ICC 0.91，95%CI 0.80–0.96），再用GPT-4o在禁止编造信息的严格约束下依据全文重写摘要。原始摘要完整性偏低（均分9.06/25，95%CI 8.58–9.53），改写后显著提升（250词版本平均提高7.40分，300词版本提高8.06分，均p<0.0001），在随机化、危害与试验注册等条目改善最明显，可读性略有改善且与完整性正相关。

> **要点**：GPT-4o重写使651篇外科RCT摘要的CONSORT完整性评分自9.06/25平均提升7.40–8.06分（p<0.0001）。

### 4. 大语言模型用于阴道穹隆脱垂手术治疗的系统评价与Meta分析

*Large language models in systematic review and meta-analysis of surgical treatments for vaginal vault prolapse.*

**npj Digital Medicine** · 2026-02-19 · 系统评价/Meta分析 · [PMID 41714807](https://pubmed.ncbi.nlm.nih.gov/41714807/) · [DOI](https://doi.org/10.1038/s41746-026-02431-w)

研究评估了 ChatGPT 在遵循 PRISMA 的阴道穹隆脱垂手术 RCT 系统评价中的表现：题目/摘要筛选召回率 69.8%、精确率 85.7%（κ=0.77），全文一致性 94.1–100%（κ=0.82–1），数据提取准确率 87.5–99.7%，各任务均在数分钟内完成。基于纳入的 18 项 RCT（1668 名女性），骶骨阴道固定术（SC）较骶棘韧带固定术（SSF）解剖学成功率更高（OR 1.42, 95% CI 0.71–2.84），经阴道网片 3 年客观成功率优于 SSF（OR 1.84, 95% CI 1.13–2.99）但再手术率更高（5–16% vs 2–4%）。所有 LLM 得出的统计结果与传统 R 分析完全一致。

> **要点**：经验证的 LLM 工作流可在数分钟内完成筛选与数据提取（提取准确率 87.5–99.7%），统计结果与 R 分析完全一致，但未证实任一术式明确占优。

### 5. 用大语言模型简化循证临床推荐的制定

*Streamlining evidence based clinical recommendations with large language models.*

**npj Digital Medicine** · 2025-12-22 · 原创研究 · [PMID 41423701](https://pubmed.ncbi.nlm.nih.gov/41423701/) · [DOI](https://doi.org/10.1038/s41746-025-02273-y)

研究提出Quicker系统，基于LLM按照标准指南制定流程自动完成证据合成并生成临床推荐，提供从临床问题到推荐的端到端流程及交互式工具。作者依据3种疾病的指南制定记录构建了基准Q2CRBench-3进行评估，结果显示Quicker能精确分解问题、检索结果与专家一致、筛选近乎全面；其辅助提高了研究数据提取的准确性，生成的推荐比临床医生撰写的更全面、连贯；系统级测试中1名参与者配合Quicker可将一条推荐的制定时间压缩到20–40分钟。

> **要点**：Quicker在Q2CRBench-3上实现专家级证据合成，1人协作即可在20–40分钟内完成一条临床推荐的制定。

### 6. 人工智能与临床试验创新

*AI and innovation in clinical trials.*

**npj Digital Medicine** · 2025-11-18 · 综述/观点 · [PMID 41254234](https://pubmed.ncbi.nlm.nih.gov/41254234/) · [DOI](https://doi.org/10.1038/s41746-025-02048-5)

这是一篇观点性文章，探讨人工智能(AI)、大语言模型(LLM)、适应性试验设计和数字孪生(DT)如何改造临床试验的设计与执行，以应对试验在成本、入组和结果外推性方面的长期挑战。文章详细阐述了AI驱动的入组资格优化、用于实时调整的强化学习以及计算机模拟的数字孪生建模，并讨论了方法学、监管与伦理方面的障碍。作者强调需要经过验证的、可扩展的框架，以实现负责任而广泛的整合。

> **要点**：提出以LLM、适应性设计与数字孪生优化临床试验的入组与实时调整，但需经验证的可扩展框架与监管伦理保障。

### 7. 用大语言模型加速临床证据合成

*Accelerating clinical evidence synthesis with large language models.*

**npj Digital Medicine** · 2025-08-08 · 原创研究 · [PMID 40775042](https://pubmed.ncbi.nlm.nih.gov/40775042/) · [DOI](https://doi.org/10.1038/s41746-025-01840-7)

研究提出名为TrialMind的生成式AI流程，用于系统评价中的文献检索、研究筛选与数据抽取，并基于100篇已发表系统评价、2,220项临床研究构建了TrialReviewBench基准。TrialMind的检索召回率为0.711–0.834（人类基线仅0.138–0.232），筛选性能较既往文档排序方法提升1.5–2.6倍，数据抽取准确率比GPT-4高16–32%。试点研究中，人机协作使召回率提高71.4%、筛选时间减少44.2%，数据抽取准确率提高23.5%、耗时减少63.4%，医学专家在62.5%–100%的情形下更偏好TrialMind合成的证据。

> **要点**：TrialMind检索召回率0.711–0.834（人类基线0.138–0.232），人机协作使筛选时间减少44.2%、抽取准确率提高23.5%。

### 8. AI会成为我们的共同主要研究者(Co-PI)吗？

*Will AI become our Co-PI?*

**npj Digital Medicine** · 2025-07-14 · 综述/观点 · [PMID 40659716](https://pubmed.ncbi.nlm.nih.gov/40659716/) · [DOI](https://doi.org/10.1038/s41746-025-01859-w)

这是一篇观点/综述文章，探讨大语言模型的快速发展如何重塑生物医学研究中学生与主要研究者(PI)的角色。作者认为LLM可作为事实上的“共同PI”，承担从文献筛选到假设生成的多种任务，并据此提出一个高效人机协作框架。文章同时厘清了其中的机遇与风险，旨在指导研究者与学员负责任地使用LLM。

> **要点**：提出把LLM作为“Co-PI”的协作框架，覆盖文献筛选到假设生成，同时警示相应风险。

---

## 十五、【边缘相关】非语言基础模型、生成式影像与经典NLP（85 篇）

> 本章为**边缘相关**文献：非语言的影像/EHR 基础模型（foundation model）、生成式影像模型、经典 NLP 编码器（BERT/ERNIE）应用，以及未特指生成式 AI 的宽泛 AI 治理评论。它们不属于严格意义的 LLM/Agent，但与本专题技术脉络高度邻接，按「宁宽勿漏」原则一并收录，供快速浏览。

### 1. 睡眠脑电基础模型揭示传统睡眠分期之外的期内微结构并改善健康筛查

*Sleep EEG foundation models reveal within-stage microstructure that improves health screening beyond traditional stages.*

**npj Digital Medicine** · 2026-07-09 · 原创研究 · [PMID 42426257](https://pubmed.ncbi.nlm.nih.gov/42426257/) · [DOI](https://doi.org/10.1038/s41746-026-02970-2)

研究利用11,261例整夜睡眠记录，以自监督方式（SSL）预训练Transformer基础模型，考察其学到的睡眠脑电表征是否超越传统五期分期并编码额外健康信息。与随机初始化的同架构模型相比，SSL预训练在多个下游任务上表现更优；与五期监督预训练相比，纯脑电优势主要体现在BMI和年龄预测，而AHI、性别和功能结局的差异较小或不稳健。嵌套控制分析显示，模型分数在协变量、分期摘要、频谱摘要之外仍具增量价值，嵌入分析表明模型能无标签恢复分期骨架并保留更高分辨率的期内结构。

> **要点**：睡眠脑电自监督基础模型能捕捉五期分期之外的微结构信息，对BMI、年龄等健康指标提供增量预测价值。

### 2. 利用多模态基础模型从视网膜眼底图像预测新发心房颤动

*Prediction of incident atrial fibrillation from retinal fundus images using a multimodal foundation model.*

**npj Digital Medicine** · 2026-07-08 · 原创研究 · [PMID 42420432](https://pubmed.ncbi.nlm.nih.gov/42420432/) · [DOI](https://doi.org/10.1038/s41746-026-02969-9)

研究提出基于多模态基础模型的视网膜影像生物标志物RetiAF评分，用于房颤（AF）的早期识别。在UK Biobank开发集与内部测试集AUROC分别为0.8610和0.8019，中国上海外部数据集AUROC为0.7803，均优于传统风险评分CHARGE-AF（0.7553）与C2HEST（0.7246）；多变量logistic回归与倾向性评分分析显示RetiAF与AF风险独立相关（p<0.001）。在C2HEST≥3的高危亚组中AUROC达0.9619；融合年龄、BMI等临床特征的Hybrid_RetiAF在UKBB两个队列上AUROC进一步提升至0.8924和0.8381。

> **要点**：基于眼底影像基础模型的RetiAF评分预测新发房颤AUROC 0.78–0.86，优于CHARGE-AF与C2HEST等传统评分。

### 3. 用于痴呆筛查与风险分层的可解释视网膜眼底图像基础模型

*Explainable foundation model for dementia screening and risk stratification using retinal fundus images.*

**npj Digital Medicine** · 2026-07-04 · 原创研究 · [PMID 42401717](https://pubmed.ncbi.nlm.nih.gov/42401717/) · [DOI](https://doi.org/10.1038/s41746-026-02968-w)

研究基于超过36,000名韩国体检人群的眼底照片，评估视觉基础模型深度学习能否检测痴呆并预测未来发病；共比较5种视觉基础模型和多种微调策略。表现最佳的RETFound-MAE（部分微调）痴呆检测AUROC为0.750，未来发病预测C指数为0.812；校正混杂后模型输出仍为独立危险因素（调整OR 1.155，调整HR 1.045）。显著性图分析显示模型关注视盘及盘周区域，具生物学合理性。

> **要点**：RETFound-MAE眼底基础模型痴呆检测AUROC 0.750、发病预测C指数0.812，可作为机会性筛查工具。

### 4. FedFound：面向全生命周期脑形态学连接组分析的联邦基础模型

*FedFound: a federated foundation model for lifespan brain morphological connectome analysis.*

**npj Digital Medicine** · 2026-06-30 · 原创研究 · [PMID 42373765](https://pubmed.ncbi.nlm.nih.gov/42373765/) · [DOI](https://doi.org/10.1038/s41746-026-02925-7)

研究提出首个用于全生命周期脑形态学连接组分析的联邦基础模型FedFound，其设计灵感来自放射科医师的教育与住院医师培训路径，整合了跨站点、跨疾病的异质神经影像数据（22,911名0–100岁受试者），结合自监督预训练与有监督的联邦疾病特异性精调。在涵盖神经发育、神经精神和神经退行性疾病的9项诊断任务中，FedFound表现和可解释性均优于对照方法，并揭示了跨病因的共享与疾病特异性形态学模式。

> **要点**：FedFound在22,911名受试者、9项诊断任务上以联邦方式训练脑形态连接组基础模型并取得最优性能。

### 5. 利用生成式AI将冰冻切片转换为FFPE图像以评估皮肤癌切缘

*Translation of frozen sections into FFPE images for skin cancer resection margins using generative AI.*

**npj Digital Medicine** · 2026-06-29 · 原创研究 · [PMID 42373874](https://pubmed.ncbi.nlm.nih.gov/42373874/) · [DOI](https://doi.org/10.1038/s41746-026-02939-1)

研究开发并验证了将术中冰冻切片图像转换为AI生成FFPE图像（GenFFPE）的生成式模型，使用5种主要皮肤癌类型、283例、2594张切片；比较了4种非配对图像到图像模型（CycleGAN、CUT、AIFFPE、SANTA），CUT在定量指标与专家排序中整体保真度最佳。外部验证与视觉图灵测试（准确率60.2%）确认了图像的真实感；在55例诊断不一致病例中，基于GenFFPE的重新评估使诊断一致性提高了53.3%。

> **要点**：CUT模型生成的GenFFPE图像通过视觉图灵测试（60.2%），并使55例疑难病例的诊断一致性提高53.3%。

### 6. 识别高危青少年智能手机键盘输入中的自杀相关语言

*Identifying suicide-related language in smartphone keyboard entries among high-risk adolescents.*

**npj Digital Medicine** · 2026-06-25 · 原创研究 · [PMID 42350774](https://pubmed.ncbi.nlm.nih.gov/42350774/) · [DOI](https://doi.org/10.1038/s41746-026-02921-x)

研究利用被动采集的智能手机键盘数据，用NLP识别青少年自杀相关语言：开发了面向青少年语言的自杀相关词表，并在171,468条标注文本（含消息、网页搜索）上验证，其识别性能优于大语言模型的少样本预测以及非青少年专用词表。在两个自杀高危队列（n=208与n=257，超过600万条文本）中，终生自杀意念与行为（STB）及当前自杀意念均与手机中自杀相关语言频率升高相关；人工编码显示语言类型多样，其中真实的第一人称当前自杀意念占14.5%，玩笑或夸张表达占20.2%，仅对含第一人称语言的条目进行人工编码后与STB病史的关联更强。

> **要点**：青少年专用自杀词表在171,468条文本上优于LLM少样本预测，但仅20.2%的相关表达为玩笑/夸张，提示需更具情境性的NLP工具。

### 7. 利用基础模型从多平面MRI重建以进行子宫肌瘤分析

*Reconstruction from multi-planar MRI with foundation models for uterine fibroid analysis.*

**npj Digital Medicine** · 2026-06-24 · 原创研究 · [PMID 42342992](https://pubmed.ncbi.nlm.nih.gov/42342992/) · [DOI](https://doi.org/10.1038/s41746-026-02780-6)

针对子宫肌瘤MRI各向异性体素、3D覆盖稀疏且模型跨中心泛化差的问题，研究提出基础模型引导的自适应分割框架FGAS，实现无标注的多平面（矢状位、冠状位、横断位）MRI分割与3D重建；方法利用解剖先验优化伪标签，并引入多视图一致性约束与连通分量控制以降低平面依赖和抑制假阳性。在临床数据集上，FGAS将Dice相似系数从基线模型的42.8%提升至70.6%，优于现有的无监督域适应与多平面方法。

> **要点**：基础模型引导的FGAS在无标注多平面子宫肌瘤MRI分割中将Dice从42.8%提升至70.6%。

### 8. 基于潜在流匹配的冠状动脉造影视频插帧

*Video frame interpolation for coronary angiography using latent flow matching.*

**npj Digital Medicine** · 2026-06-23 · 原创研究 · [PMID 42337305](https://pubmed.ncbi.nlm.nih.gov/42337305/) · [DOI](https://doi.org/10.1038/s41746-026-02923-9)

研究提出Angio-FILM，一种专用于冠脉造影视频插帧的生成式AI模型，采用潜在流匹配（latent flow matching）从7.5 FPS低帧率输入合成15 FPS高时间分辨率视频，以在降低辐射暴露的同时保留时间分辨率。模型在357,933段视频上训练，并在内部与外部开源数据集上验证；定量指标结果不一，但人类专家的定性评价显示其优于现有最先进方法。视觉图灵测试（30名医生、600段视频）中单视频二分类准确率为54%（p=0.107）、二选一强迫选择任务为49%（p=0.749），提示生成视频几乎无法与真实造影区分；定量冠脉分析显示原始帧与插值帧的最小管腔直径偏差极小（MAE 0.180 mm）。

> **要点**：Angio-FILM生成的插帧视频在视觉图灵测试中几乎无法被医生识别（准确率54%/49%，p>0.1），最小管腔直径测量MAE仅0.180 mm。

### 9. 非小细胞肺癌多模态生存预测中缺失模态的处理

*Handling missing modalities in multimodal survival prediction for non-small cell lung cancer.*

**npj Digital Medicine** · 2026-06-22 · 原创研究 · [PMID 42332139](https://pubmed.ncbi.nlm.nih.gov/42332139/) · [DOI](https://doi.org/10.1038/s41746-026-02783-3)

研究提出一个“缺失感知”的多模态生存预测框架，整合CT、全切片病理图像（WSI）与结构化临床变量，对不可切除的II–III期非小细胞肺癌（NSCLC）进行总生存建模；框架使用基础模型（foundation models）提取各模态特征，并通过缺失感知编码策略在模态天然不完整的情况下实现中间层融合，训练与推理均无需剔除病例。结果显示中间融合优于单模态基线以及早期与晚期融合策略，三模态组合的C指数达74.42；模态重要性分析表明融合模型会依据表征信息量自适应调整对各数据流的依赖。所学风险评分可对疾病进展与转移风险做出有临床意义的分层，各模态组合的log-rank检验均具统计学显著性。

> **要点**：缺失感知的三模态中间融合模型C指数达74.42，优于单模态及早期/晚期融合基线，且无需删除缺失模态病例。

### 10. 作者更正：面向智能外科的大规模自监督视频基础模型

*Author Correction: Large-scale self-supervised video foundation model for intelligent surgery.*

**npj Digital Medicine** · 2026-06-16 · 通讯/更正 · [PMID 42303709](https://pubmed.ncbi.nlm.nih.gov/42303709/) · [DOI](https://doi.org/10.1038/s41746-026-02864-3)

本条目为《面向智能外科的大规模自监督视频基础模型》一文的作者更正（Author Correction），无摘要内容。原文属于非语言的手术视频自监督基础模型范畴，本条目仅为对原文的勘误说明，未提供新的研究数据或结论。

> **要点**：手术视频基础模型原文的作者更正，无新增研究结果。

### 11. 临床编码的嵌入表示助力医学中知识驱动的AI（ClinVec）

*Embeddings of clinical codes enable knowledge-grounded AI in medicine.*

**npj Digital Medicine** · 2026-06-11 · 原创研究 · [PMID 42277300](https://pubmed.ncbi.nlm.nih.gov/42277300/) · [DOI](https://doi.org/10.1038/s41746-026-02664-9)

研究提出ClinVec，一个覆盖8种术语体系、共153,166个临床编码与概念的嵌入存储库；其嵌入来自ClinGraph——一个专为EHR临床词表构建、包含超过200万条边的知识图谱。研究通过跨机构临床医师专家组以及涵盖11个疾病领域的3,767对临床术语（N=3,767）进行验证，发现嵌入相似度可反映临床相关性。ClinVec进一步被用于大语言模型医学问答中的知识注入，以及无监督的患者分层与风险预测，为患者与人群建模提供了共享的临床概念表征。

> **要点**：覆盖153,166个临床编码的ClinVec嵌入与临床相关性一致（3,767对术语验证），可用于LLM医学问答的知识注入与患者风险分层。

### 12. 基于视觉基础模型的联邦生成式提示学习：通用高效的多中心医学影像分析

*Federated generative prompt learning with vision foundation models: universal efficient multi-center medical image analysis.*

**npj Digital Medicine** · 2026-06-10 · 原创研究 · [PMID 42265348](https://pubmed.ncbi.nlm.nih.gov/42265348/) · [DOI](https://doi.org/10.1038/s41746-026-02866-1)

研究提出Fed-GPL（联邦生成式提示学习）框架，通过协同训练一个提示生成器为每位患者生成定制化提示，以捕捉个体差异并克服多中心联邦医学AI中的通信成本、数据稀缺与异质性问题；该框架兼容多种视觉基础模型与医学任务（如用ViT做糖尿病视网膜病变与黑色素瘤分类、用SAM做息肉与前列腺分割）。Fed-GPL优于传统模型与全量微调方法，分类与分割任务分别仅需训练基础模型总参数的8.26%和6.55%，且在15轮通信内即收敛；在低资源场景下，仅使用5%的原始训练数据仍能维持性能。

> **要点**：Fed-GPL仅训练6.55%–8.26%的基础模型参数、15轮通信内收敛即超越全量微调，且用5%训练数据仍保持性能。

### 13. 基于MALDI-TOF数据进行细菌鉴定与耐药性预测的深度学习系统

*A deep learning system for bacterial identification and resistance prediction from MALDI-TOF data.*

**npj Digital Medicine** · 2026-06-08 · 原创研究 · [PMID 42260134](https://pubmed.ncbi.nlm.nih.gov/42260134/) · [DOI](https://doi.org/10.1038/s41746-026-02879-w)

研究开发了名为ANTIBIOTIC的深度学习系统，可直接从原始MALDI-TOF质谱数据中鉴定细菌种类、预测抗菌药物耐药性（AMR）并推荐抗生素。基于公开的DRIAMS数据集（2015–2018）与本院89,026条质谱记录（NTUHYL，2017–2023），研究构建了26个LightGBM模型用于常见菌种鉴定，以及248个时间卷积网络（TCN）模型用于各菌种-抗生素组合的耐药预测。细菌鉴定的中位AUC内部为0.99、时间外部数据上为0.96；AMR预测的中位AUC内部为0.94，但在时间外部数据上降至0.55，用近期数据微调后回升至0.61。研究进一步将上述模型与大语言模型集成，实现了抗生素推荐聊天机器人。

> **要点**：细菌鉴定中位AUC达0.99（时间外部0.96），但耐药预测在时间外部数据上从0.94降至0.55，提示模型需定期更新。

### 14. 从眼底图像生成荧光素血管造影视频：一种视网膜生成式基础模型

*Fundus to fluorescein angiography video generation as a retinal generative foundation model.*

**npj Digital Medicine** · 2026-06-06 · 原创研究 · [PMID 42251139](https://pubmed.ncbi.nlm.nih.gov/42251139/) · [DOI](https://doi.org/10.1038/s41746-026-02804-1)

研究提出Fundus2Video，一种自回归生成对抗网络（GAN），可由单张彩色眼底照片生成动态荧光素眼底血管造影（FFA）视频，弥补既往方法只做静态图像生成、忽略病灶动态变化的不足。模型视频生成性能达FVD 1497.12、PSNR 11.77，临床专家验证了生成视频的保真度；在10个外部公开数据集上展现出零样本与少样本迁移能力，可完成血管分割、视网膜疾病诊断、全身疾病预测与多模态检索等任务。作者认为其可作为无创替代传统FFA检查的视网膜生成式基础模型。

> **要点**：Fundus2Video以FVD 1497.12、PSNR 11.77生成动态FFA视频，并在10个外部数据集上具备零样本/少样本迁移能力。

### 15. 利用patch级对比学习增强基础模型迁移以检测前列腺癌

*Enhancing foundation model transfer for prostate cancer detection with patch-level contrastive learning.*

**npj Digital Medicine** · 2026-06-05 · 原创研究 · [PMID 42249085](https://pubmed.ncbi.nlm.nih.gov/42249085/) · [DOI](https://doi.org/10.1038/s41746-026-02831-y)

针对自然图像视觉基础模型直接迁移到前列腺MRI存在的领域鸿沟，研究开发了ProViCNet——一种在MRI上采用patch级对比学习的弱监督模型，用于MRI筛查、穿刺靶向与局部治疗规划。模型在6个队列共4401例患者上训练与验证，训练标签为穿刺证实的放射科医师标注，评估标签包含穿刺与手术证实病灶：多个内外部验证队列的AUROC为0.875–0.966，在专家读片研究中优于放射科医师（0.907 vs 0.805，p<0.01）。结合血清PSA构建的虚拟筛查试验在PSA≥4 ng/mL人群中保持对临床显著癌的高敏感性，同时将特异性从15%提升至38%（p<0.001）。

> **要点**：ProViCNet检测前列腺癌AUROC 0.875–0.966并优于放射科医师（0.907 vs 0.805），虚拟筛查特异性由15%提高至38%。

### 16. 基于腰椎MRI椎旁肌影像特征的跨机构骨质疏松性椎体骨折全自动预测系统

*Fully automated system predicts osteoporotic vertebral fracture across institutions using lumbar MRI paraspinal muscle signatures.*

**npj Digital Medicine** · 2026-06-04 · 原创研究 · [PMID 42243528](https://pubmed.ncbi.nlm.nih.gov/42243528/) · [DOI](https://doi.org/10.1038/s41746-026-02855-4)

研究开发PMSAC-OVF，一个全自动、多机构系统，在MRI上分割腰椎椎旁肌，提取联邦学习(FL)特征与影像组学特征并与临床变量整合以预测骨质疏松性椎体骨折(OVF)；系统基于视觉基础模型框架，支持隐私保护的跨机构训练与轻量本地部署。分析5家机构2014–2024年共2884例患者：自动分割达专家级精度（Dice 0.952，IoU 0.909）且耗时缩短至秒级；FL与影像组学模型的合并AUC分别为0.827（0.819–0.861）与0.803（0.793–0.892）；整合影像组学特征、FL特征与临床变量的三模态模型合并AUC达0.840（0.822–0.916），显著优于仅用临床变量的模型（AUC 0.742）。SHAP分析显示影像组学特征、FL特征与骨密度为最重要预测因子。

> **要点**：三模态模型预测骨质疏松性椎体骨折的合并AUC为0.840，显著优于仅临床模型的0.742。

### 17. 面向肌肉骨骼X线片的大规模视觉基础模型SKELEX

*A large-scale vision foundation model for musculoskeletal radiographs.*

**npj Digital Medicine** · 2026-06-02 · 原创研究 · [PMID 42230902](https://pubmed.ncbi.nlm.nih.gov/42230902/) · [DOI](https://doi.org/10.1038/s41746-026-02826-9)

研究提出SKELEX，一个在120万张多样化、病种丰富的肌肉骨骼X线片上以自监督学习训练的大规模视觉基础模型，以克服现有模型任务专用、依赖标注、跨疾病与跨解剖部位适应性差的局限。模型在12项下游诊断任务上评估，在骨折检测、骨关节炎分级与骨肿瘤分类中总体优于基线；并可通过无监督重建实现异常定位，无需任务特定训练即可生成标示病理区域的误差图。作者据此构建了可解释的区域引导骨肿瘤分类器，在独立外部数据集上保持稳健性能，并部署为公开可访问的网页应用作为临床转化的概念验证。

> **要点**：基于120万张X线片自监督训练的SKELEX在12项下游任务上总体优于基线，并具备无监督异常定位能力。

### 18. 预测儿童哮喘急性加重的AI模型（AIRE-KIDS）

*AI for predicting exacerbations in KIDs with asthma (AIRE-KIDS).*

**npj Digital Medicine** · 2026-06-01 · 原创研究 · [PMID 42225895](https://pubmed.ncbi.nlm.nih.gov/42225895/) · [DOI](https://doi.org/10.1038/s41746-026-02824-x)

研究基于加拿大东安大略儿童医院电子病历，开发机器学习模型预测既往有哮喘急诊史的患儿在一年内再次因哮喘急诊或住院的风险。训练数据为疫情前2017年2月–2019年2月记录（N=2716），并链接环境污染物暴露与社区边缘化指标；验证数据为疫情后2022年7月–2023年4月记录（N=1237）。研究比较了提升树方法（LGBM、XGBoost）与三个开源大语言模型（DistilGPT2、Llama 3.2 1B、Llama-8b-UltraMedical），结果LGBM表现最佳（AUC 0.712，F1 0.51），优于当前最佳实践（F1 0.334）；SHAP显示既往哮喘急诊次数、分诊等级、医疗复杂程度、食物过敏、既往非哮喘呼吸系统急诊及年龄为关键预测因子。

> **要点**：LGBM（AUC 0.712、F1 0.51）优于开源LLM与现行最佳实践（F1 0.334）。

### 19. 用于快速自动病灶检测与个体化卒中后结局预测的临床神经影像平台

*A clinical neuroimaging platform for rapid, automated lesion detection and personalized post-stroke outcome prediction.*

**npj Digital Medicine** · 2026-05-27 · 原创研究 · [PMID 42204350](https://pubmed.ncbi.nlm.nih.gov/42204350/) · [DOI](https://doi.org/10.1038/s41746-026-02803-2)

研究构建了一个全自动神经影像平台，基于深度学习病灶分割与病灶位置/脑网络特征，对缺血性卒中患者的个体化认知结局进行预测，可直接处理来自异构扫描仪的原始DICOM MRI并输出文本化的个性化结局信息。研究在一个大型病灶队列（N=604）上训练认知结局预测模型，并应用于独立卒中队列（N=153）：多项认知结局预测达到合理准确度，与人工方法的一致性为96%；由大语言模型生成的报告可在约3分钟内提供可解释的患者特异性预后。

> **要点**：在N=604训练、N=153独立验证下与人工方法一致性达96%，LLM可在约3分钟内生成个体化可解释预后报告。

### 20. 一种数据与知识跨层融合驱动的漏诊检测学习框架

*A data and knowledge cross-level fusion-driven learning framework for detecting missing diagnosis.*

**npj Digital Medicine** · 2026-05-14 · 原创研究 · [PMID 42135450](https://pubmed.ncbi.nlm.nih.gov/42135450/) · [DOI](https://doi.org/10.1038/s41746-026-02725-z)

针对电子病历出院诊断列表漏填导致 DRG 分组错误与医保支付损失的问题，作者提出数据与知识跨层融合驱动的学习框架，用于自动识别漏诊。在中国六省六家医院的真实电子病历上，该模型的 F1 优于专家系统方法、BERT 类方法及多种 LLM 基线；结果显示 37.8% 的病历被预测存在漏诊，其中 9.0% 会改变 DRG 分组，进而影响 3.2% 的医保报销金额。为降低警报疲劳，作者将模型与专家系统混合，使精确率再提升 6.7–13.4%，并设计了两种人机耦合工作模式。

> **要点**：该融合框架在六家医院 EMR 上 F1 优于 BERT 与 LLM 基线，预测 37.8% 病历存在漏诊、9.0% 影响 DRG 分组。

### 21. 一个编码深度表型数据并支持多种下游应用的基础模型

*A foundational model encodes deep phenotyping data and enables diverse downstream applications.*

**npj Digital Medicine** · 2026-05-14 · 原创研究 · [PMID 42135472](https://pubmed.ncbi.nlm.nih.gov/42135472/) · [DOI](https://doi.org/10.1038/s41746-026-02736-w)

作者提出 ukbFound，一个把个体层面数千项性状编码为类语言序列的基础模型，采用领域特异分词、无位置嵌入与可解释推理，在 502,118 名 UK Biobank 个体的数据上捕捉潜在的疾病-性状关系。在三类下游应用中：疾病分层方面，289 种疾病中有 53 种（18.3%）呈现 FDR 显著的预后差异，并在 COPD 中识别出以嗜碱性粒细胞计数区分的两个亚群；多病共存网络分析发现了低血小板疾病与痛风等此前未报道的关联；疾病预测方面，仅凭生活方式与饮食数据即优于 10 个基线模型，AUC 提升 0.03–0.16，最高风险组在 8 年内发生痛风的比值高出 17.5 倍。

> **要点**：ukbFound 基于 50.2 万 UK Biobank 个体，疾病预测 AUC 较 10 个基线模型提升 0.03–0.16，最高危组痛风风险高 17.5 倍。

### 22. 作者更正：使用基础模型预测外科出院后阿片类药物消耗量的多国推导与验证研究

*Author Correction: Predicting opioid consumption after surgical discharge: a multinational derivation and validation study using a foundation model.*

**npj Digital Medicine** · 2026-05-13 · 通讯/更正 · [PMID 42129453](https://pubmed.ncbi.nlm.nih.gov/42129453/) · [DOI](https://doi.org/10.1038/s41746-026-02749-5)

这是一篇作者更正（Author Correction），针对已发表的《使用基础模型预测外科出院后阿片类药物消耗量：多国推导与验证研究》一文。该条目无研究摘要，属于勘误性通讯，仅对原文内容作出订正，本身不报告新的数据、模型或结果。

> **要点**：对一项基于基础模型的术后阿片类药物消耗预测研究的作者更正，未提供新结果。

### 23. SurvivEHR：一个基于基层医疗电子病历、面向多种长期慢病的竞争风险生存基础模型

*SurvivEHR: a competing risks, time-to-event foundation model for multiple long-term conditions from primary care electronic health records.*

**npj Digital Medicine** · 2026-05-09 · 原创研究 · [PMID 42106492](https://pubmed.ncbi.nlm.nih.gov/42106492/) · [DOI](https://doi.org/10.1038/s41746-026-02709-z)

作者提出 SurvivEHR，一个基于生成式 Transformer 的基础模型，在英国基层医疗 2,300 万患者、逾 76 亿条编码事件上预训练，采用竞争风险的下一事件发生时间目标，从而对诊断、检查、用药与死亡等广泛结局提供校准良好的风险分层。结果显示该预训练目标带来较强的下一事件判别能力，并学到了具有临床意义的患者轨迹；经微调后在长时程风险预测等下游预后任务上性能提升，在低资源（小样本）场景中获益尤为明显。

> **要点**：SurvivEHR 在 2,300 万患者、76 亿条事件上预训练竞争风险生存基础模型，微调后长时程风险预测显著改善且在低资源场景优势最大。

### 24. 面向智能消化道病理的亚专科基础模型 Digepath

*Subspecialty-specific foundation model for intelligent gastrointestinal pathology.*

**npj Digital Medicine** · 2026-05-04 · 原创研究 · [PMID 42082713](https://pubmed.ncbi.nlm.nih.gov/42082713/) · [DOI](https://doi.org/10.1038/s41746-026-02684-5)

研究构建了 Digepath——一个专注于高影响力消化道（GI）病理的疾病专科化病理基础模型，采用两阶段迭代优化：先在 210,043 张 H&E 染色切片、逾 3.53 亿个多尺度图块上预训练，再在 471,443 个专家标注区域上微调并平衡肿瘤与非肿瘤样本，以增强全片中稀疏病灶的感知能力。Digepath 在涵盖诊断、分子分型与生存预后的 33 项系统性下游任务中，有 32 项达到最先进水平，展现出稳健的泛化能力；作者进一步将其能力整合进基于智能体的临床推理框架，支持端到端的智能诊断工作流。

> **要点**：Digepath 在 21 万张切片、3.53 亿图块上预训练，33 项消化道病理下游任务中 32 项达到 SOTA，并接入智能体式诊断工作流。

### 25. OncoPT：用于院内病理报告肿瘤表型抽取的长上下文 Transformer 模型

*OncoPT: long-context transformer models for in hospital tumor phenotype extraction from pathology reports.*

**npj Digital Medicine** · 2026-05-02 · 原创研究 · [PMID 42069805](https://pubmed.ncbi.nlm.nih.gov/42069805/) · [DOI](https://doi.org/10.1038/s41746-026-02630-5)

针对病理报告非结构化、内容复杂且篇幅长的问题，作者基于 Longformer 与 BigBird 架构、用真实世界病理报告训练出两个肿瘤病理优化模型 OncoPT，可处理最长 4,096 token 的报告，适合资源有限医院的本地部署以保护受保护健康信息。研究在常见癌（乳腺癌）与罕见癌（胃癌）上抽取亚部位、组织学类型、分级、分期与侧别 5 类关键表型；OncoPT 在私有病理数据集上取得最优加权 F1，并在公开 CORAL 数据集上超过商用聊天机器人 ChatGPT-4o 与 o1，最多提升 30%。

> **要点**：OncoPT（Longformer/BigBird，支持 4,096 token）在病理表型抽取上较 ChatGPT-4o/o1 最多提升 30%，且可本地部署保护隐私。

### 26. 使用 EndoStyle 进行消化内镜图像风格迁移以改进人工智能预测模型

*Gastrointestinal endoscopic image style transfer using EndoStyle to improve artificial intelligence prediction models.*

**npj Digital Medicine** · 2026-04-28 · 原创研究 · [PMID 42050035](https://pubmed.ncbi.nlm.nih.gov/42050035/) · [DOI](https://doi.org/10.1038/s41746-026-02693-4)

多数内镜 AI 模型在多种视频处理器的图像上训练，而临床通常只用单一处理器，作者据此基于 StarGANv2 开发了 EndoStyle 风格迁移系统，可模拟 5 种不同内镜处理器的视觉特征。验证集上 Fréchet Inception Distance 与 LPIPS 表明转换图像具有高视觉保真度与感知相似性，使用 3 个基础模型的语义相似度分析确认转换图像与内容输入和风格输入均一致，多中心研究中内镜医师判定真实图像与转换图像为真实的比例相当。将合成图像用于扩增息肉检测模型训练后，精确率与特异度显著提升，在两个独立评估集上假阳性减少超过 40%。

> **要点**：EndoStyle 生成的跨处理器合成内镜图像用于训练扩增后，息肉检测在两个评估集上假阳性减少超过 40%。

### 27. TikTok是追踪阿片类药物危机的有价值数据源

*TikTok is a valuable data source for tracking the opioid crisis.*

**npj Digital Medicine** · 2026-04-27 · 原创研究 · [PMID 42045414](https://pubmed.ncbi.nlm.nih.gov/42045414/) · [DOI](https://doi.org/10.1038/s41746-026-02654-x)

研究首次大规模分析TikTok评论用于阿片类药物成瘾与过量监测，收集了2021年1月至2025年6月间48,306个阿片类相关视频下的569,581条评论。作者用潜在狄利克雷分配（LDA）提取200个主题并纳入ARIMA模型预测未来6个月的合成阿片类药物死亡率，同时用LIWC2015代词词典和GPT o1-mini分析对话模式。纳入TikTok主题使预测的平均绝对误差最多降低37%，主题涵盖使用、来源、康复、减害与丧亲五大主题，评论中同时存在第一、第二和第三人称的用药叙述。

> **要点**：将TikTok评论主题纳入ARIMA模型使合成阿片类药物死亡率预测的平均绝对误差最多下降37%。

### 28. 融合傅里叶Kolmogorov-Arnold网络的BioBERT模型用于生物医学命名实体识别

*Fourier Kolmogorov-Arnold Network integrated into BioBERT-based model for Biomedical Named Entity Recognition.*

**npj Digital Medicine** · 2026-04-27 · 原创研究 · [PMID 42045658](https://pubmed.ncbi.nlm.nih.gov/42045658/) · [DOI](https://doi.org/10.1038/s41746-026-02677-4)

研究提出FRKAN-BioNER模型，将BioBERT与傅里叶Kolmogorov-Arnold网络(FourierKAN)相结合，用于从术语密集、语义复杂的生物医学文本中抽取疾病、药物、基因等实体，以支持精准医学知识图谱构建。KAN架构改善了传统神经网络在表达能力与可训练性方面的局限。该模型在9个公开数据集上的F1值分别为84.80%、93.12%、90.02%、82.10%、87.90%、83.14%、78.58%、89.93%和90.87%，优于多个既往最优方法，有望提升临床文本处理与大规模文献知识挖掘的效率。

> **要点**：BioBERT+FourierKAN在9个BioNER公开数据集上F1达78.58%–93.12%，优于多个既往SOTA方法。

### 29. 用于重症监护中急性呼吸窘迫综合征定量化与一体化管理的CT基AI系统

*CT-based AI system for quantitative and integrated management of acute respiratory distress syndrome in critical care.*

**npj Digital Medicine** · 2026-04-24 · 原创研究 · [PMID 42032151](https://pubmed.ncbi.nlm.nih.gov/42032151/) · [DOI](https://doi.org/10.1038/s41746-026-02648-9)

研究提出AutoARDS，一个将常规胸部CT转化为定量评估平台的一体化基础模型，采用带对抗扰动的多任务预训练策略，在单一无创工作流中整合ARDS的诊断、进展、氧合、生理与预后评估。模型在超过50,000个CT体数据上训练，并在6家医疗中心的6,153例个体中验证：诊断急性呼吸衰竭和ARDS的AUC分别为0.97和0.87，直接估计P/F比值的相关系数PCC=0.83（优于基于SpO2的监测），预测28天结局的时间平均AUC=0.79，对ARDS相关右心室功能障碍的泛化AUC为0.76。属非语言影像基础模型，故列为peripheral。

> **要点**：AutoARDS基于常规胸部CT，诊断急性呼吸衰竭/ARDS的AUC分别为0.97/0.87，P/F比值估计PCC=0.83，28天结局预测AUC=0.79。

### 30. 用目标试验模拟验证胚胎选择基础AI模型的临床效力

*Trial emulation for validating the clinical efficacy of a foundational AI model in embryo selection.*

**npj Digital Medicine** · 2026-04-23 · 原创研究 · [PMID 42026141](https://pubmed.ncbi.nlm.nih.gov/42026141/) · [DOI](https://doi.org/10.1038/s41746-026-02672-9)

针对现有胚胎选择AI多依赖忽视临床混杂因素的相关性指标的问题，研究采用目标试验模拟(target trial emulation)框架，对无创胚胎评估基础模型FEMI进行多中心因果效应估计(n=4674)。倾向性评分匹配显示FEMI-Ploidy与着床失败之间存在稳健关联：开发队列的平均处理效应(ATE)为-0.131 (95% CI [-0.196, -0.066])，外部队列为-0.157 (95% CI [-0.254, -0.054])。基于S-Learner的比较分析显示，高风险FEMI评分对着床的个体处理效应(ITE)惩罚显著强于其他评分机制(p<0.0001)，且在校正母亲年龄后依然成立，提示FEMI捕获了独特的生物学特征，为后续前瞻性RCT提供了临床前依据。

> **要点**：n=4674的目标试验模拟显示FEMI-Ploidy与着床失败的ATE为-0.131（外部队列-0.157），优于其他评分机制(p<0.0001)。

### 31. 临床决策支持中基础模型的可移植性悖论

*The portability paradox of foundation models for clinical decision support.*

**npj Digital Medicine** · 2026-04-07 · 社论/评论 · [PMID 41942735](https://pubmed.ncbi.nlm.nih.gov/41942735/) · [DOI](https://doi.org/10.1038/s41746-026-02615-4)

这篇社论评述了Yakdan等人的研究：基于电子健康记录数据训练、用于预测颈椎病性脊髓病的基础模型在内部数据集上优于传统模型，但在外部验证中这一优势消失。作者指出，基础模型学到的高密度特征模式可能降低其跨机构、跨场景的可移植性，对罕见结局尤其明显。随着基础模型走向临床部署，本地验证、亚组分析以及对实施负担的关注对卫生系统的规划与管理至关重要。因评论对象为非语言的EHR基础模型，故归为peripheral。

> **要点**：EHR基础模型内部验证优于传统模型但外部验证优势丧失，揭示可移植性悖论，临床部署前必须做本地验证与亚组分析。

### 32. 基础模型在肌肉骨骼MRI中用于生物标志物保真度与预后预测的临床效用

*Clinical utility of foundation models in musculoskeletal MRI for biomarker fidelity and predictive outcomes.*

**npj Digital Medicine** · 2026-03-24 · 原创研究 · [PMID 41876760](https://pubmed.ncbi.nlm.nih.gov/41876760/) · [DOI](https://doi.org/10.1038/s41746-026-02520-w)

研究构建了一套模块化系统，将可提示的基础分割模型（SAM、SAM2、MedSAM）在异质肌骨影像数据集上微调，并与自动检测模块耦合实现全自动提示，从而把常规MRI转化为标准化定量生物标志物。微调后的分割结果在软骨、骨与软组织生物标志物上与专家标注高度一致。基于同一套测量，作者展示两项应用：三阶段膝关节分诊级联在保持敏感性的同时减少复核工作量；48个月界标模型可预测膝关节置换与新发骨关节炎，具有良好的校准度与净获益。

> **要点**：微调后的可提示分割基础模型产出的MRI定量生物标志物与专家标注高度一致，并可支撑膝关节分诊与48个月置换/骨关节炎风险预测。

### 33. 通过多模态文本到图像生成框架提升基础模型对罕见眼病的诊断能力

*Boosting foundation models for rare eye disease diagnosis via a multimodal text-to-image generative framework.*

**npj Digital Medicine** · 2026-03-24 · 原创研究 · [PMID 41872533](https://pubmed.ncbi.nlm.nih.gov/41872533/) · [DOI](https://doi.org/10.1038/s41746-026-02560-2)

针对罕见眼病训练数据稀缺与类别不平衡问题，研究提出EyeDiff——一个可依据文本描述合成保留病灶特征的眼科图像的生成式基础模型。客观指标与专家人工评估均证实EyeDiff能在多种影像模态上生成高保真图像，并准确反映各类视网膜疾病与病灶类型的文本描述。通过对11个全球来源数据集中的少数类进行数据增强，EyeDiff在仅用真实数据训练的模态专用、多模态及视觉-语言等多类基础模型上，均一致提升了常见与罕见眼病的诊断准确率。

> **要点**：EyeDiff文本到图像生成用于11个数据集的少数类增强后，一致提升多种基础模型对常见与罕见眼病的诊断准确率。

### 34. 基于不确定性量化的高敏感度泛癌淋巴结转移AI评估

*High-sensitivity pan-cancer AI assessment of lymph node metastasis via uncertainty quantification.*

**npj Digital Medicine** · 2026-03-21 · 原创研究 · [PMID 41862698](https://pubmed.ncbi.nlm.nih.gov/41862698/) · [DOI](https://doi.org/10.1038/s41746-026-02564-y)

研究提出统一诊断平台UPATHLN，将病理基础模型编码器与解耦的不确定性估计机制相结合，以解决AI在罕见组织学变异上产生“过度自信错误”导致漏诊的问题；开发与验证使用了涵盖14种原发肿瘤、26,229枚淋巴结的大规模多中心数据集。内部验证AUC达0.986；不确定性模块将潜在假阴性预测标记为必须由病理医师复核，在开发与独立测试队列（含7种训练中未见过的原发肿瘤）中拦截了全部漏诊，实现100%条件敏感度。同时该机制使阴性淋巴结的复核负担减少73.2%。

> **要点**：UPATHLN内部验证AUC 0.986，通过不确定性标记实现100%条件敏感度并将阴性淋巴结复核负担减少73.2%。

### 35. 对医学影像基础模型的审慎乐观：平衡隐私与创新

*Cautious optimism on foundation models in medical imaging balancing privacy and innovation.*

**npj Digital Medicine** · 2026-03-15 · 社论/评论 · [PMID 41833961](https://pubmed.ncbi.nlm.nih.gov/41833961/) · [DOI](https://doi.org/10.1038/s41746-026-02533-5)

这是一篇通讯评论，针对npj Digital Medicine近期报道的视网膜影像基础模型可实现高达94%患者再识别率的研究发出警示。作者指出，影像基础模型在训练过程中会保留潜在的人口学与身份信号，从而带来患者再识别风险，而该研究既未厘清因果机制，也未提出缓解策略。文章呼吁尽快建立技术防护措施与政策框架，在推动创新的同时保护个人隐私与信息保密性。

> **要点**：视网膜影像基础模型的患者再识别率最高达94%，亟需技术防护与政策框架。

### 36. 用于疾病预测与风险分层的时间与个体敏感型基础模型（RETFound Plus）

*Time and person sensitive foundation model for disease prediction and risk stratification.*

**npj Digital Medicine** · 2026-03-14 · 原创研究 · [PMID 41832356](https://pubmed.ncbi.nlm.nih.gov/41832356/) · [DOI](https://doi.org/10.1038/s41746-026-02524-6)

针对现有视网膜基础模型擅长横断面分类与检测、却不擅长预测疾病发生与进展的问题，研究基于304,345名参与者多次随访的1,304,292张眼底彩照，采用时序建模训练出RETFound Plus，以学习进展感知表征。与RETFound相比，其校准度和5年风险预测能力均提升，全身性疾病（卒中、心肌梗死、糖尿病、高血压）的c-index提高4%–10%，眼部疾病（糖尿病视网膜病变、青光眼）提高3%–7%，全身性疾病风险分层的风险比趋势提高1.2–2.1倍。结果在英国、美国、新加坡、中国香港和丹麦的多区域多族裔外部数据集中保持一致。

> **要点**：RETFound Plus在5年全身性疾病风险预测上较RETFound提升c-index 4%–10%。

### 37. RoentMod：用于识别与纠正影像解读模型捷径学习的合成胸片修改模型

*RoentMod: a synthetic chest X-ray modification model to identify and correct image interpretation model shortcuts.*

**npj Digital Medicine** · 2026-03-06 · 原创研究 · [PMID 41792409](https://pubmed.ncbi.nlm.nih.gov/41792409/) · [DOI](https://doi.org/10.1038/s41746-026-02497-6)

研究提出反事实图像编辑框架RoentMod，将开源医学图像生成器RoentGen与图像到图像修改模型结合（无需重新训练），在保留原始解剖结构的前提下生成带有用户指定合成病灶的真实感胸片。读者研究显示93%的生成图像被判为真实，89%–99%正确包含了指定征象，且解剖结构保真度与真实随访胸片相当。借助RoentMod，研究发现当前最先进的多任务模型和基础模型常将非目标病灶用作捷径，从而限制特异性；而在训练中加入RoentMod生成的反事实图像后，内部验证中多种病灶的判别力提升3%–19% AUC，外部测试中6种病灶里有5种提升1%–11%。

> **要点**：反事实合成胸片纳入训练使模型判别力在内部验证提升3%–19% AUC，有效纠正捷径学习。

### 38. 将视网膜基础模型范式从切片转向体积：面向光学相干断层扫描（OCT）

*Shifting the retinal foundation models paradigm from slices to volumes for optical coherence tomography.*

**npj Digital Medicine** · 2026-03-05 · 原创研究 · [PMID 41786902](https://pubmed.ncbi.nlm.nih.gov/41786902/) · [DOI](https://doi.org/10.1038/s41746-026-02496-7)

针对现有基础模型仅依赖单张B扫描（通常为中心切片）、忽略体积上下文的局限，该研究首次将基于transformer的视频基础模型应用于三维OCT。研究将视频基础模型V-JEPA与视网膜基础模型（RETFound、VisionFM）以及自然图像基础模型DINOv2在五个OCT数据集上微调，用于检测年龄相关性黄斑变性和青光眼性视神经病变。V-JEPA表现持平或优于所有基于图像的模型，平均AUROC达0.94（0.80–0.99），显著高于最佳图像模型的0.90（0.76–0.98）（p<0.001）。

> **要点**：视频基础模型V-JEPA在体积OCT上平均AUROC 0.94，显著优于图像基础模型的0.90（p<0.001）。

### 39. 利用电子健康记录基础模型预测抗生素相关皮肤不良药物反应

*Prediction of antibiotic-associated cutaneous adverse drug reactions using electronic health record foundation models.*

**npj Digital Medicine** · 2026-03-04 · 原创研究 · [PMID 41775818](https://pubmed.ncbi.nlm.nih.gov/41775818/) · [DOI](https://doi.org/10.1038/s41746-026-02503-x)

皮肤不良药物反应（CADR）是最常见的药物不良反应，轻则皮疹重则可致Stevens-Johnson综合征和中毒性表皮坏死松解症，但目前缺乏有效的预测工具。研究基于电子健康记录基础模型（沿用语言模型的预训练-微调范式，将医疗编码及其序列类比为词与句），纳入韩国三家三级医院的802,131名住院患者，结合EHR数据与护理记录和报告以提取皮疹信息，构建抗生素相关CADR预测模型。该方法在所有数据集上均优于全部基线模型，并按速发型与迟发型进行了亚组分析，结果提示配置得当的EHR基础模型尤其适用于缺乏预测性检测手段的迟发型反应。

> **要点**：基于802,131名住院患者的EHR基础模型预测抗生素相关皮肤不良反应优于所有基线，迟发型获益最大。

### 40. 基于深度语言模型从实时急救呼叫中早期识别院外心脏骤停

*Deep language model-based early recognition of out-of-hospital cardiac arrest from real-time emergency calls.*

**npj Digital Medicine** · 2026-03-03 · 原创研究 · [PMID 41775831](https://pubmed.ncbi.nlm.nih.gov/41775831/) · [DOI](https://doi.org/10.1038/s41746-026-02498-5)

研究开发了动态深度学习语言模型DyLM-OHCA，用于在急救通话60秒内早期识别院外心脏骤停（OHCA）。模型基于韩国三个都市区的158,973份急救通话转录文本训练，并与逻辑回归、XGBoost、梯度提升和随机森林四种传统机器学习算法比较，DyLM-OHCA显著优于所有基线（AUROC=0.937，AUPRC=0.456）。词语归因分析显示来电者与调度员的关键词存在差异，OHCA识别更多受对话流程而非单个关键词影响；真阳性病例风险分持续偏高，而半数以上假阳性病例的风险分在早期即下降。

> **要点**：DyLM-OHCA基于158,973份急救通话转录识别院外心脏骤停，AUROC 0.937，显著优于传统机器学习。

### 41. 利用眼科基础模型的测试时临床自适应框架检测多种眼底疾病

*A test-time clinically adaptive framework for detecting multiple fundus diseases harnessing ophthalmic foundation models.*

**npj Digital Medicine** · 2026-03-02 · 原创研究 · [PMID 41772178](https://pubmed.ncbi.nlm.nih.gov/41772178/) · [DOI](https://doi.org/10.1038/s41746-026-02480-1)

研究提出测试时临床自适应框架RetExpert，以增强眼科基础模型在彩色眼底照相上稳健、可泛化地检测多种眼底疾病的能力，应对数据分布不均衡、多标签预测不确定性、疾病间混淆和域漂移等问题。该框架引入带随机独热激活模块的自适应知识单元、长尾感知学习与不确定性感知多标签学习策略，并整合眼底疾病共现矩阵作为医学先验以降低疾病间混淆分数（C-score），同时采用结合无监督与伪监督学习的轻量测试时自适应方法（TTUL+TTPL），无需完整重训练即可动态调整参数。在15个公开与私有数据集上的评估显示，RetExpert在检测性能、可靠性与跨域适应性上均优于现有眼科基础模型。

> **要点**：RetExpert在15个数据集上的多病种眼底筛查性能与跨域适应性均优于现有眼科基础模型。

### 42. 基于机器学习的语言抑郁检测：系统评价与Meta分析

*Language-based detection of depression with machine learning: systematic review and meta-analysis.*

**npj Digital Medicine** · 2026-02-24 · 系统评价/Meta分析 · [PMID 41735551](https://pubmed.ncbi.nlm.nih.gov/41735551/) · [DOI](https://doi.org/10.1038/s41746-026-02448-1)

该系统评价与Meta分析检索六个电子数据库及其他来源共892篇文献，纳入123项应用自然语言处理与机器学习从口语或书面语言中识别抑郁的研究，每个数据集取一个代表性结果进行定量合成。基于43项研究、40,983份文本样本的合并准确率为0.80，合并精确率0.78（28项）、召回率0.76（33项）、AUC 0.79（14项）、平衡准确率0.71（16项）。亚组分析显示语言、文本来源、特征类型和分类器间差异显著，使用结构化临床访谈、非英语语言及语言学或嵌入类特征的研究准确率最高；但单因素Meta回归中仅文本来源仍显著，可解释13.6%的研究间方差，发表偏倚较小。

> **要点**：123项研究的Meta分析显示文本抑郁检测合并准确率0.80，异质性大，临床应用前仍需方法学标准化与验证。

### 43. 面向跨模态乳腺癌理解的解剖引导视觉提示微调（A-VPT）

*Anatomy-guided visual prompt tuning for cross-modal breast cancer understanding.*

**npj Digital Medicine** · 2026-02-13 · 原创研究 · [PMID 41688744](https://pubmed.ncbi.nlm.nih.gov/41688744/) · [DOI](https://doi.org/10.1038/s41746-026-02417-8)

作者提出 A-VPT 框架，在冻结的 ViT 主干的提示空间中注入显式解剖结构先验，依据腺体、脂肪与导管区域嵌入动态生成组织感知提示，并跨 Transformer 层进行层级提示-token 交互；同时用跨模态对比对齐统一钼靶、超声与 MRI 的解剖语义。在 INbreast、BUSI 和 Duke-Breast-MRI 三个基准上，A-VPT 在病灶分类与分割任务上达到 SOTA，且可调参数量不足全量微调的 2%。

> **要点**：解剖先验引导的视觉提示微调用不到 2% 的可调参数在三个乳腺影像数据集上实现分类与分割 SOTA。

### 44. 来函商榷：解释医学影像患者再识别的是近乎相同的图像，而非基础模型

*Matters Arising: Near-identical images, not foundation models, explain purported re-identification of patients from medical imaging.*

**npj Digital Medicine** · 2026-02-13 · 通讯/更正 · [PMID 41688581](https://pubmed.ncbi.nlm.nih.gov/41688581/) · [DOI](https://doi.org/10.1038/s41746-026-02440-9)

这是一篇针对 Nebbia 等人研究的 Matters Arising 通讯。原文报告影像基础模型能够在已知同类型影像的前提下对医学影像数据集中的患者进行再识别，并归因于基础模型可从影像中推断年龄、性别或族裔等属性，从而构成医学基础模型研究的隐私风险。本文作者反驳认为，该「再识别」现象实际由数据集中近乎相同的重复图像所致，而非基础模型的表征能力。

> **要点**：作者认为所谓基础模型导致的患者再识别实为数据集中近重复图像的假象，隐私风险被高估。

### 45. 面向智能手术的大规模自监督视频基础模型 SurgVISTA

*Large-scale self-supervised video foundation model for intelligent surgery.*

**npj Digital Medicine** · 2026-02-04 · 原创研究 · [PMID 41639385](https://pubmed.ncbi.nlm.nih.gov/41639385/) · [DOI](https://doi.org/10.1038/s41746-026-02403-0)

针对现有手术 AI 自监督方法缺乏预训练阶段显式时序建模的问题，作者构建了包含 3650 段视频、355 万帧、覆盖 20 余种术式与 10 余种解剖结构的大规模手术视频数据集，并提出首个视频级手术预训练框架 SurgVISTA（基于重建的时空联合表征学习，并引入手术专家模型指导的图像级知识蒸馏）。在涵盖 6 类术式、4 种任务的 13 个视频级数据集基准上，SurgVISTA 稳定优于自然域与手术域的已有预训练模型。

> **要点**：基于 3650 段手术视频预训练的 SurgVISTA 在 13 个视频级基准、4 类任务上全面超越现有自然域与手术域预训练模型。

### 46. StructSAM：结构感知提示适配用于 CT 肺癌病灶的稳健分割

*StructSAM: structure-aware prompt adaptation for robust lung cancer lesion segmentation in CT.*

**npj Digital Medicine** · 2026-02-03 · 原创研究 · [PMID 41634130](https://pubmed.ncbi.nlm.nih.gov/41634130/) · [DOI](https://doi.org/10.1038/s41746-025-02306-6)

针对 SAM 等基础模型在医学影像中因低对比度、边界模糊和缺乏 3D 上下文而表现不佳的问题，作者提出 StructSAM：在提示通路中注入解剖先验，引入 3D 层间聚合器保证体数据一致性，并采用参数高效微调（PEFT）提升可扩展性。在 LIDC-IDRI 数据集上，StructSAM 在肺结节分割上达到 SOTA，优于经典架构和其他 SAM 改进方法；在 KiTS19 与 MSD Pancreas 上的跨器官评估进一步验证了其对域漂移的鲁棒性。

> **要点**：将结构先验嵌入 SAM 提示通路后，StructSAM 在 LIDC-IDRI 肺结节分割上取得 SOTA 并可跨器官泛化。

### 47. 临床 AI 的「飞行守则」：从航空业汲取医学人机协作的经验

*Flight rules for clinical AI: lessons from aviation for human-AI collaboration in medicine.*

**npj Digital Medicine** · 2026-01-31 · 综述/观点 · [PMID 41620563](https://pubmed.ncbi.nlm.nih.gov/41620563/) · [DOI](https://doi.org/10.1038/s41746-026-02410-1)

这篇由临床医生与航空专家合著的观点文章，借鉴航空业早期自动化在提升安全与效率的同时也带来新脆弱性和「过度信任复杂系统」的教训，主张医学界在 AI 深度融入临床诊疗之际借鉴航空的安全框架。作者提出应从把 AI 视作「自动驾驶（autopilot）」转向与「数字副驾（digital copilot）」协作，并提出情景化训练、临床医生基准测评、最低无辅助操作量等具体举措。

> **要点**：应将临床 AI 定位为「数字副驾」而非「自动驾驶」，并配套情景训练、医生基准测评与最低无辅助操作要求。

### 48. 临床引导模型还是基础模型？基于电子健康记录预测脊髓型颈椎病

*Clinically-guided models or foundation models? predicting cervical spondylotic myelopathy from electronic health records.*

**npj Digital Medicine** · 2026-01-20 · 原创研究 · [PMID 41559180](https://pubmed.ncbi.nlm.nih.gov/41559180/) · [DOI](https://doi.org/10.1038/s41746-026-02337-7)

研究利用Merative MarketScan理赔数据库与本机构EHR中约200万患者的结构化数据，开发并外部验证机器学习模型，以提前至多30个月预测脊髓型颈椎病（CSM）的发生。比较策略涵盖从简单临床引导架构到大规模预训练基础模型，包括基于计数的前馈网络、临床精选的Mamba状态空间模型、两个中等规模transformer模型（CoreBEHRT、CEHRBERT）以及大型EHR基础模型（clmbr-t-base、clmbr-t-5k-CSM）。结果显示大型基础模型在更大更异质数据集的内部验证中整体表现更强，但临床导向的简单模型在跨医疗系统的外部验证中泛化更有效，提示基础模型的泛化性仍存在持续挑战。

> **要点**：EHR基础模型内部验证表现更优，但临床引导的简单模型在跨机构外部验证中泛化性更强、更稳健。

### 49. 利用病理基础模型实现乳腺癌复发风险的可解释预测

*Towards interpretable prediction of recurrence risk in breast cancer using pathology foundation models.*

**npj Digital Medicine** · 2026-01-16 · 基准/评估 · [PMID 41545684](https://pubmed.ncbi.nlm.nih.gov/41545684/) · [DOI](https://doi.org/10.1038/s41746-025-02334-2)

研究提出MAKO基准框架，评估12个病理基础模型与2个非病理基线模型，基于注意力多示例学习从H&E染色全切片图像预测PAM50衍生的ROR-P复发风险评分，在Carolina乳腺癌研究队列（CBCS）训练与验证、并在TCGA BRCA上外部测试。多个基础模型在分类、回归与生存任务上均优于基线模型：CONCH取得最高ROC AUC，H-optimus-0与Virchow2与连续ROR-P评分相关性最强，所有病理模型对CBCS受试者的复发分层效果与转录组ROR-P相似。借助HIPPO可解释性方法发现肿瘤区域对高风险预测既必要又充分，并识别出候选的复发组织生物标志物。

> **要点**：12个病理基础模型中CONCH的ROC AUC最高，基于H&E全切片的复发风险分层效果与转录组ROR-P评分相当。

### 50. 以高质量真实世界数据支撑负责任的人工智能：面向可扩展多专科临床研究的S-RACE平台

*Powering responsible artificial intelligence with high-quality real-world data: the S-RACE platform for scalable, multi-specialty clinical research.*

**npj Digital Medicine** · 2026-01-03 · 原创研究 · [PMID 41484225](https://pubmed.ncbi.nlm.nih.gov/41484225/) · [DOI](https://doi.org/10.1038/s41746-025-02132-w)

针对非结构化医疗信息阻碍AI临床转化的问题，研究开发了安全的云端平台S-RACE，其端到端流程先在本地完成匿名化以保护隐私，再用自然语言处理抽取临床信息并标准化为FHIR格式；集成的数据科学实验室支持可解释性技术，并遵循ISO 42001与欧盟AI法案等治理标准。平台目前已纳入31,276例患者数据，支撑肿瘤、心血管、糖尿病等领域的19个研究项目；在肾癌与主动脉瓣狭窄的示例中，基于自动处理数据训练的模型性能与基于人工整理数据训练的模型相当。

> **要点**：S-RACE平台用NLP自动整理31,276例患者数据支撑19个研究项目，模型性能与人工整理数据训练的模型相当。

### 51. 基础模型引导的多视图半监督CT肝肿瘤分割在资源受限环境中的应用

*Foundation model-guided multi-view semi-supervised CT segmentation of liver tumors in resource-constrained settings.*

**npj Digital Medicine** · 2025-12-29 · 原创研究 · [PMID 41461915](https://pubmed.ncbi.nlm.nih.gov/41461915/) · [DOI](https://doi.org/10.1038/s41746-025-02190-0)

研究提出一种面向资源受限场景的标注高效CT自动分割流程，将半监督分割主干与基础模型引导的正则化器结合以强化稀缺标注下的学习，并引入多视图协同学习，通过视角特异性推理形成统一监督信号，抑制视角依赖噪声、提升掩膜保真度。在公开CT基准上以不同标注量评估，在标注极为有限的情形下（20例标注），肝脏平均Dice达83.79%、肿瘤达60.08%，优于现有分割方法。该方法无需交互式提示，可将勾画时间从数小时缩短至数秒，便于即插即用部署并支撑后续影像组学与纵向随访。

> **要点**：仅用20例标注即达肝脏Dice 83.79%、肿瘤Dice 60.08%，优于现有半监督分割方法且无需交互式提示。

### 52. 融合临床信息提示的多模态深度学习用于癌症预后预测

*Multimodal deep learning for cancer prognosis prediction with clinical information prompts integration.*

**npj Digital Medicine** · 2025-12-27 · 原创研究 · [PMID 41455823](https://pubmed.ncbi.nlm.nih.gov/41455823/) · [DOI](https://doi.org/10.1038/s41746-025-02257-y)

针对肿瘤异质性给预后预测带来的挑战，以及既往多模态研究偏重影像与基因组、临床信息因离散稀疏低维而利用不足的问题，研究提出SurvPGC模型，整合病理图像、基因组数据与临床记录进行癌症预后预测。其中临床信息经文本模板与基础模型转换为高维向量，再通过交叉注意力模块与其他模态融合。在癌症基因组图谱（TCGA）的三个数据集上验证表明，模型能有效捕捉各模态特异性特征，注意力可视化显示不同数据类型的关注区域各不相同，凸显整合多源信息对提升生存预测的价值。

> **要点**：SurvPGC以文本模板加基础模型嵌入临床信息并与病理、基因组跨注意力融合，在TCGA三个数据集上改善生存预测。

### 53. 商用深度学习模型检测颅内出血的真实世界性能评估

*Real-world performance evaluation of a commercial deep learning model for intracranial hemorrhage detection.*

**npj Digital Medicine** · 2025-12-24 · 原创研究 · [PMID 41444826](https://pubmed.ncbi.nlm.nih.gov/41444826/) · [DOI](https://doi.org/10.1038/s41746-025-02244-3)

研究回顾性评估了FDA批准的商用AI模型（Aidoc颅内出血分诊）在17家机构、74,142例患者的101,944次头颅平扫CT中的真实表现（2023年4月至2025年4月），其中参考标准标签由GPT-4o以零样本提示优化策略从放射报告中抽取，经500例人工标注验证达96%准确率（κ=0.85）。Aidoc模型总体敏感性82.2%、特异性97.6%、准确率96.6%；对急性（86.2%）、>10mm（95.0%）和多腔室出血（93.6%）敏感性高，但对亚急性（45.5%）、慢性（54.8%）、≤10mm（74.8%）和单腔室出血（76.0%）明显下降，门诊场景仅72.2%。

> **要点**：商用ICH分诊模型总体准确率96.6%，但对亚急性（45.5%）、慢性（54.8%）等细微出血敏感性低；GPT-4o标签抽取准确率96%。

### 54. 利用BERT与ERNIE在荷兰基层医疗中实现AI驱动的传染病早期发现

*AI-driven early infectious disease detection in Dutch primary care using BERT and ERNIE.*

**npj Digital Medicine** · 2025-12-23 · 原创研究 · [PMID 41437151](https://pubmed.ncbi.nlm.nih.gov/41437151/) · [DOI](https://doi.org/10.1038/s41746-025-02278-7)

研究提出ERNIE框架，采用无监督语言建模（BERT类编码器）分析基层医疗的非结构化文本，无需预设诊断标签即可自主发现异常疾病聚集。模型在荷兰北部数据上训练并用外部数据集验证：在首例确诊前即识别出类COVID-19聚集，捕捉到2021年RSV流行期的特征模式，并成功标记模拟的西尼罗河病毒病例，同时在对照期保持稳定（就诊级召回率0.97、聚集精确度0.82、聚集召回率0.90）。

> **要点**：基于经典NLP编码器的ERNIE可在确诊前发现COVID-19样聚集，就诊级召回0.97、聚集精确度0.82、聚集召回0.90。

### 55. 一种用于解耦多模态学习中诊断信息的表征融合框架（MODES）

*A Representation Fusion Framework for Decoupling Diagnostic Information in Multimodal Learning.*

**npj Digital Medicine** · 2025-12-17 · 原创研究 · [PMID 41408105](https://pubmed.ncbi.nlm.nih.gov/41408105/) · [DOI](https://doi.org/10.1038/s41746-025-02144-6)

研究提出MODES（多模态解耦嵌入空间），一种显式分离共享因子与模态特异因子的表征融合框架，覆盖临床记录、影像与基因组等异质数据。该框架借助预训练的单模态基础模型降低对大规模配对数据的依赖，并通过掩码策略剔除低信息维度以获得紧凑且富含信息的表征。在诊断与表型预测任务中，MODES优于单模态模型与常规融合模型，且在模态缺失场景下仍能稳健推断并提升可解释性；摘要未报告具体数值指标。

> **要点**：MODES通过解耦共享/模态特异表征，在诊断与表型预测上优于单模态及常规融合模型，并对模态缺失稳健。

### 56. 用于超声心动图报告质量自动评估的EchoGraph系统

*EchoGraph system for automated quality assessment of echocardiography reports.*

**npj Digital Medicine** · 2025-12-10 · 原创研究 · [PMID 41372462](https://pubmed.ncbi.nlm.nih.gov/41372462/) · [DOI](https://doi.org/10.1038/s41746-025-02140-w)

为填补生成式AI在超声心动图领域缺乏自动化临床文本准确性评价指标的空白，研究基于BERT开发了EchoGraph，使用梅奥诊所2017年600份密集标注报告（标注48,256个实体、29,731条关系）按7:2:1划分训练、验证与测试，并用60份MIMIC-EchoNote报告（3,672个实体、2,360条关系）做外部验证。EchoGraph实体预测micro-F1为0.85、关系为0.70，外部验证仍达实体0.80、关系0.52；其F1对报告错误的敏感性优于RadGraph F1（斜率绝对值高2.8倍，-0.817 vs -0.291；R²=0.803 vs 0.578）。

> **要点**：EchoGraph实体/关系抽取micro-F1达0.85/0.70，对报告错误的敏感性为RadGraph F1的2.8倍，可用于评估语言模型生成的超声报告。

### 57. 可解释AI驱动的精准临床试验富集：NetraAI平台在II期抑郁症试验中的示范

*Explainable AI-driven precision clinical trial enrichment: demonstration of the NetraAI platform with a phase II depression trial.*

**npj Digital Medicine** · 2025-12-08 · 原创研究 · [PMID 41360997](https://pubmed.ncbi.nlm.nih.gov/41360997/) · [DOI](https://doi.org/10.1038/s41746-025-02143-7)

研究提出可解释AI平台NetraAI，融合动力系统建模、进化式长程记忆特征选择与大语言模型生成的洞见，从高维临床数据中发现高效应量的患者亚群（“Personas”）。在一项难治性抑郁症氯胺酮II期试验（n=63）中，NetraAI分析了每例175项精神量表数据和185项MRI衍生特征，预测治疗结局的准确率较传统机器学习提高约25–30%，并具有更高的敏感性与特异性；其10个临床变量模型使预测AUC较标准ML提高0.32，8个MRI特征模型达到95%准确率和100%特异性。

> **要点**：NetraAI在n=63的II期氯胺酮抑郁症试验中使结局预测准确率较传统ML提升25–30%，AUC提高0.32，MRI模型准确率95%。

### 58. 面向稳健结直肠癌病理诊断的不确定性感知与因果测试时自适应基础模型（UAD-FM）

*Uncertainty-aware and causal test-time adaptive foundation model for robust colorectal cancer pathology diagnosis.*

**npj Digital Medicine** · 2025-12-06 · 原创研究 · [PMID 41353286](https://pubmed.ncbi.nlm.nih.gov/41353286/) · [DOI](https://doi.org/10.1038/s41746-025-02149-1)

研究提出UAD-FM，一种用于结直肠癌病理诊断的基础模型框架，整合了认知/偶然不确定性分解、基于do-干预的因果测试时自适应以及事后校准，以应对域偏移、不确定性估计不可靠和虚假相关等问题。在TCGA-COAD/READ、CRAG、DigestPath 2019、NCT-CRC-HE-100K和LC25000五个公开数据集上，UAD-FM在准确率、校准度和跨域稳健性方面均优于现有基础模型与自适应基线，并能输出可解释的不确定性图以支持人机协作；摘要未报告具体数值。

> **要点**：UAD-FM在5个公开结直肠癌病理数据集上的准确率、校准度与跨域稳健性均优于现有基础模型基线。

### 59. 结直肠癌全切片图像的多模态分析

*Multimodal analysis of whole slide images in colorectal cancer.*

**npj Digital Medicine** · 2025-11-24 · 系统评价/Meta分析 · [PMID 41286436](https://pubmed.ncbi.nlm.nih.gov/41286436/) · [DOI](https://doi.org/10.1038/s41746-025-02095-y)

这是一篇系统评价，批判性评估了应用于结直肠癌(CRC)的多模态数字病理技术及其性能，并与基础模型(foundation model)进行对比。研究检索PubMed、Web of Science、Scopus和IEEE Xplore中2014年1月至2024年8月发表的文献，筛查1601项研究，最终纳入22项合格研究，采用Newcastle-Ottawa量表评估质量与偏倚(PROSPERO注册号635831)。结果显示多数研究整合数字病理、放射影像、临床信息与组学等不同模态以提升诊断准确性和生存预测，多模态方法优于单模态，但多数研究未做外部验证；仍存在多模态数据集构建、数据异质性、时间对齐、模态权重设定和可解释性等挑战。

> **要点**：22项纳入研究显示多模态数字病理优于单模态模型，但绝大多数缺乏外部验证。

### 60. 从预训练到隐私：基于自监督学习的联邦超声基础模型

*From pretraining to privacy: federated ultrasound foundation model with self-supervised learning.*

**npj Digital Medicine** · 2025-11-21 · 原创研究 · [PMID 41272022](https://pubmed.ncbi.nlm.nih.gov/41272022/) · [DOI](https://doi.org/10.1038/s41746-025-02085-0)

研究提出UltraFedFM——一个保护隐私的超声基础模型，通过联邦学习在9个国家16家分布式医疗机构间协同预训练，使用超过100万张覆盖19个器官、10种超声模态的超声图像。该模型在疾病诊断上取得平均AUROC 0.927，在病灶分割上取得Dice系数0.878。在8种常见全身性疾病的联合诊断中，UltraFedFM超过了中级超声医师（4-8年经验）的诊断准确率，并达到专家级超声医师（10年以上经验）的水平，表明其可在保护患者隐私的同时显著增强临床诊断能力。

> **要点**：跨9国16家机构、逾100万张图像联邦预训练的UltraFedFM诊断AUROC 0.927、分割Dice 0.878，达到专家级超声医师水平。

### 61. 从临床病历中检测住院患者谵妄的自然语言处理技术：系统评价

*Natural language processing techniques to detect delirium in hospitalized patients from clinical notes: a systematic review.*

**npj Digital Medicine** · 2025-11-20 · 系统评价/Meta分析 · [PMID 41266514](https://pubmed.ncbi.nlm.nih.gov/41266514/) · [DOI](https://doi.org/10.1038/s41746-025-02051-w)

谵妄影响50%的住院老年人和80%的ICU患者，但传统方法检出率仅20%-30%。本系统评价检索了8个数据库截至2025年3月的文献，从912条记录中纳入13项研究、涵盖逾45万例患者，考察用于从临床病历自动检测谵妄的NLP技术。所用方法包括基于规则(38%)、机器学习(31%)、深度学习(15%)、主题模型(8%)和半监督学习(8%)；敏感度介于28.5%-99.1%，其中transformer模型表现最佳(AUROC 0.984)。然而61.5%的研究因验证不充分而存在高偏倚风险，仅1项研究进行了外部验证，无一项评估前瞻性实施或患者结局，且所有研究均完全未考虑公平性问题。

> **要点**：13项研究、逾45万患者中transformer类模型检测谵妄表现最佳(AUROC 0.984)，但61.5%研究高偏倚风险且仅1项做过外部验证。

### 62. PathOrchestra：一个覆盖100余项临床级任务的计算病理学综合基础模型

*PathOrchestra: a comprehensive foundation model for computational pathology with over 100 diverse clinical-grade tasks.*

**npj Digital Medicine** · 2025-11-19 · 原创研究 · [PMID 41258399](https://pubmed.ncbi.nlm.nih.gov/41258399/) · [DOI](https://doi.org/10.1038/s41746-025-02027-w)

研究提出PathOrchestra——一个通用病理基础模型，基于来自3个中心、21种组织类型的287,424张切片训练。模型在来自61个私有和51个公开数据集的112项任务上进行评估，涵盖数字切片预处理、泛癌分类、病灶识别、多癌种亚型分类、生物标志物评估、基因表达预测和结构化报告生成。在27,755张全切片图像和9,415,729张感兴趣区域图像上，模型在47项任务中准确率超过0.950，包括泛癌分类、淋巴瘤亚型分型和膀胱癌筛查，并首次实现结直肠癌和淋巴瘤的结构化报告生成。结果表明大规模自监督病理基础模型已具备临床可用性。

> **要点**：基于287,424张切片训练的PathOrchestra在112项任务中的47项准确率>0.950，并首次实现结直肠癌与淋巴瘤结构化报告生成。

### 63. 来函商榷：利用基础模型开发临床工具

*Matters arising: Utilizing foundation models for developing clinical tools.*

**npj Digital Medicine** · 2025-11-18 · 通讯/更正 · [PMID 41254183](https://pubmed.ncbi.nlm.nih.gov/41254183/) · [DOI](https://doi.org/10.1038/s41746-025-02065-4)

这是一篇针对Zhang等人研究的商榷性通讯。Zhang等开发了基于RETFound增强的深度学习模型用于检测多种眼病，并在社区筛查场景中进行了测试。本文作者认为，要支持“该模型比两款商业模型所采用的传统卷积神经网络具有更好泛化性”这一论断，尚需提供更多信息，并就其他模型的细节、泛化性、微调数据集和统计分析四个方面提出质疑。

> **要点**：就RETFound增强模型优于商业CNN模型的泛化性论断，从模型细节、泛化性、微调数据集与统计分析四方面提出质疑。

### 64. 回复：利用基础模型开发临床工具

*Reply to: Utilizing foundation models for developing clinical tools.*

**npj Digital Medicine** · 2025-11-18 · 通讯/更正 · [PMID 41254165](https://pubmed.ncbi.nlm.nih.gov/41254165/) · [DOI](https://doi.org/10.1038/s41746-025-02066-3)

这是原作者对Chan等人商榷意见的回复通讯。作者澄清了基础模型（如RETFound）的使用方式、商业数据来源与匿名性问题以及DeLong检验结果，强调经SDEDS微调的RETFound优于商业模型，同时引用了一个早期基准值，并承认仍需进一步测试。

> **要点**：作者回应称SDEDS微调的RETFound优于商业模型，并澄清了数据来源与DeLong检验细节。

### 65. EVA-X：基于自监督学习的通用胸部X线分析基础模型

*EVA-X: a foundation model for general chest x-ray analysis with self-supervised learning.*

**npj Digital Medicine** · 2025-11-17 · 原创研究 · [PMID 41249470](https://pubmed.ncbi.nlm.nih.gov/41249470/) · [DOI](https://doi.org/10.1038/s41746-025-02032-z)

针对胸部X线影像AI受标注数据不足与标注质量参差限制、泛化能力弱难以临床推广的问题，研究提出EVA-X——一个广泛适用的X线影像基础模型。EVA-X采用自监督学习方法，能从无标注图像中同时捕捉语义与几何信息，形成通用的X线影像表征。该模型在胸部疾病分析与定位任务中表现优异，可覆盖20余种胸部病理，并在11项以上病理检测任务中取得领先结果；同时它显著减轻了医学AI领域的数据标注负担，在小样本学习方面展现出强大潜力。

> **要点**：自监督的EVA-X覆盖20余种胸部病理，在11项以上检测任务中取得领先结果并具备强小样本学习能力。

### 66. STPath：整合空间转录组与全切片图像的生成式基础模型

*STPath: a generative foundation model for integrating spatial transcriptomics and whole-slide images.*

**npj Digital Medicine** · 2025-11-14 · 原创研究 · [PMID 41238784](https://pubmed.ncbi.nlm.nih.gov/41238784/) · [DOI](https://doi.org/10.1038/s41746-025-02020-3)

研究提出STPath，一个在大规模全切片图像(WSI)与配对空间转录组(ST)数据上预训练的生成式基础模型，采用几何感知Transformer整合组织学图像、基因表达、器官类型与测序技术模态，并通过带定制噪声调度的掩码基因表达预测进行训练。模型无需下游微调即可直接预测覆盖17个器官、38,984个基因的表达。在涵盖23个数据集、14个生物标志物的6类任务（表达预测、spot插补、空间聚类、标志物预测、突变预测、生存预测）上，STPath均展现出良好的可扩展病理学应用价值。

> **要点**：STPath无需微调即可跨17个器官预测38,984个基因的表达，并在23个数据集的6类下游任务中表现稳健。

### 67. 面向视网膜光学相干断层扫描(OCT)图像的深度学习自动报告生成器

*A deep learning based automatic report generator for retinal optical coherence tomography images.*

**npj Digital Medicine** · 2025-10-20 · 原创研究 · [PMID 41115948](https://pubmed.ncbi.nlm.nih.gov/41115948/) · [DOI](https://doi.org/10.1038/s41746-025-01988-2)

研究提出MORG（多标签OCT报告生成）模型：用双图像编码器提取OCT图像对的特征，经带注意力机制的多尺度模块融合后，由句子解码器生成报告。模型在57,308对视网膜OCT图像上训练与测试，对16种病理、37种描述类型实现了高分类准确性。在盲法评分测试中，MORG得分4.55（满分5分），接近眼科医生的4.63，并优于通用大语言模型及其他先进图像描述模型；估计可将眼科医生的报告起草时间减少58.9%。

> **要点**：MORG在57,308对OCT图像上训练，盲评得分4.55（医生4.63），有望减少58.9%的报告起草时间。

### 68. 使用微调大语言模型进行基于症状的抑郁评估

*Using a fine-tuned large language model for symptom-based depression evaluation.*

**npj Digital Medicine** · 2025-10-07 · 原创研究 · [PMID 41057559](https://pubmed.ncbi.nlm.nih.gov/41057559/) · [DOI](https://doi.org/10.1038/s41746-025-01982-8)

研究微调了一个基于德语BERT的语言模型，采用回归方式预测蒙哥马利-阿斯伯格抑郁评定量表(MADRS)各症状条目的分值（0–6级严重度），训练数据来自跨诊断患者的结构化临床访谈以及合成生成的访谈文本。微调后模型各条目的平均绝对误差为0.7–1.0，准确率介于79%–88%，与临床医生评分高度接近；相较未训练模型，微调使预测误差降低了75%。结果表明轻量级语言模型可较准确地评估抑郁症状严重度，为临床决策与疗效监测（尤其在资源匮乏环境中）提供可扩展工具。

> **要点**：微调德语BERT模型预测MADRS条目分的MAE为0.7–1.0、准确率79%–88%，误差较未微调模型下降75%。

### 69. 日常作息变异性与情感状态的个性化建模

*Personalised modelling of routine variability and affective states.*

**npj Digital Medicine** · 2025-10-06 · 原创研究 · [PMID 41053272](https://pubmed.ncbi.nlm.nih.gov/41053272/) · [DOI](https://doi.org/10.1038/s41746-025-01979-3)

研究利用多模态智能手机传感数据，提出以生活各方面日常作息的变异性作为个性化数字标志物来关联情感状态。作者用非负矩阵分解(NMF)将传感数据分解为个体特异的作息模式及其周度变异，并为每位个体构建广义线性模型(GLM)，将特定传感类别的变异性与焦虑或抑郁状态相关联；人群层面对GLM分组后发现各组间心理健康指标存在显著差异。研究还用大语言模型(GPT-4o)将建模结果转译为更通俗易懂的语言，帮助个体理解自身作息表型并支持自我调节。

> **要点**：作息变异性可作为关联焦虑/抑郁的个性化数字标志物，GPT-4o负责将模型结果转译为个体可理解的反馈。

### 70. 基于视网膜图像与可解释基础模型优化颈动脉粥样硬化预测

*Optimizing retinal images based carotid atherosclerosis prediction with explainable foundation models.*

**npj Digital Medicine** · 2025-09-30 · 原创研究 · [PMID 41028180](https://pubmed.ncbi.nlm.nih.gov/41028180/) · [DOI](https://doi.org/10.1038/s41746-025-01957-9)

研究利用39,620名个体的数据，评估4种视觉基础模型与3种微调策略在视网膜图像识别颈动脉粥样硬化中的表现，并从预测性能、临床效用（未来心血管死亡的生存分析）和可解释性（Grad-CAM结合血管分割）三个维度进行评价。结果显示DINOv2结合低秩适配（LoRA）综合表现最佳：AUC为0.71，敏感度0.87，特异度0.44，且具备预后价值（HR=2.20，P趋势<0.05），热图与血管结构对齐良好。研究支持利用视网膜影像进行动脉粥样硬化与心血管病的机会性筛查，并强调多维评估框架对基础模型选型的重要性。

> **要点**：DINOv2+LoRA综合表现最佳（AUC 0.71，HR=2.20，P趋势<0.05），支持视网膜影像机会性筛查颈动脉粥样硬化。

### 71. 用于视网膜OCT图像综合分析的多模态基础模型与基准（MIRAGE）

*Multimodal foundation model and benchmark for comprehensive retinal OCT image analysis.*

**npj Digital Medicine** · 2025-09-25 · 原创研究 · [PMID 40999048](https://pubmed.ncbi.nlm.nih.gov/40999048/) · [DOI](https://doi.org/10.1038/s41746-025-01852-3)

研究提出MIRAGE——一种用于光学相干断层扫描（OCT）与扫描激光检眼镜（SLO）图像分析的多模态影像基础模型，并构建了包含OCT/SLO分类与分割任务的新评估基准，以弥补现有眼科基础模型验证不足、仅覆盖单一成像模态的缺陷。与通用及专用基础模型和多种分割方法比较，MIRAGE在分类与分割两类任务上均表现更优（摘要未给出具体数值）。结果表明其适合作为稳健视网膜OCT分析AI系统的开发基础。

> **要点**：多模态影像基础模型MIRAGE在OCT/SLO分类与分割任务上均优于现有通用与专用基础模型。

### 72. 面向资源匮乏地区临床医学影像的嵌入式Segment Anything框架（Embed-MedSAM）

*Embedded framework for clinical medical image segment anything in resource limited healthcare regions.*

**npj Digital Medicine** · 2025-09-24 · 原创研究 · [PMID 40993173](https://pubmed.ncbi.nlm.nih.gov/40993173/) · [DOI](https://doi.org/10.1038/s41746-025-01881-y)

研究提出Embed-MedSAM，一种部署成本低的全自动医学影像分割模型：在MedSAM基础上引入轻量RepViT编码器降低计算量，并在超过100万张多模态医学影像上进行两阶段蒸馏以保留原模型的视觉表征，同时引入自提示机制由模型生成伪标签引导精细分割，训练中联合优化KL散度与分割损失。在覆盖7种成像模态的17个基准数据集上，无外部提示条件下平均Dice较次优模型提升近16%，并可在iPhone 14上以接近30 FPS运行，显示出良好的实地部署潜力。

> **要点**：Embed-MedSAM在无提示条件下平均Dice较次优模型提升约16%，并能在iPhone 14上以近30 FPS运行。

### 73. 基于密度演变局部基础模型评估COPD患者的肺气肿进展风险

*Emphysema progression risk in COPD using a localized foundational model of density evolution.*

**npj Digital Medicine** · 2025-08-28 · 原创研究 · [PMID 40877584](https://pubmed.ncbi.nlm.nih.gov/40877584/) · [DOI](https://doi.org/10.1038/s41746-025-01917-3)

研究提出一种密度演变的局部基础模型，从CT中提取指示肺气肿进展的局部影像嵌入，并据此构建将局部肺组织激活聚合为个体水平风险的LEP(Local Emphysema Progression)评分。模型在3728名COPDGene受试者（基线至5年）及1421例5–10年间隔扫描上测试，并在1058名ECLIPSE受试者中重复验证。模型识别肺气肿进展肺区的AUC为0.88；在存在进展(Δ%LAA-950>0)的受试者中，LEP评分与低衰减区百分比变化(Δ%LAA-950)的相关系数在COPDGene为0.50、在ECLIPSE为0.40，且LEP评分与死亡率及多项COPD结局相关，提示其具备临床预后价值。

> **要点**：局部基础模型的LEP评分识别肺气肿进展区域AUC达0.88，并在两个独立队列中与Δ%LAA-950变化及死亡率相关。

### 74. 利用自然语言处理进行AI辅助预测择期神经外科手术的非计划重症监护入住

*AI assisted prediction of unplanned intensive care admissions using natural language processing in elective neurosurgery.*

**npj Digital Medicine** · 2025-08-27 · 原创研究 · [PMID 40858789](https://pubmed.ncbi.nlm.nih.gov/40858789/) · [DOI](https://doi.org/10.1038/s41746-025-01952-0)

研究使用改良的CogStack-MedCAT自然语言处理模型，从伦敦大学学院医院2,268例择期神经外科患者的电子病历中抽取临床概念，训练AI模型将术后去向分类为普通病房或神经重症监护病房（ITU）。随机森林模型对ITU入住的召回率为0.87（CI 0.82–0.91），可将人类专家漏判的非计划ITU病例比例从36%降至4%；可解释性分析证实模型依据的是临床相关概念。研究提示AI有助于神经外科患者的资源分配，但仍需进一步研究与临床整合。

> **要点**：基于NLP概念抽取的随机森林模型ITU入住召回率0.87，把漏判的非计划ITU比例从36%降至4%。

### 75. 使用基础模型预测外科出院后阿片类药物消耗：多国推导与验证研究

*Predicting opioid consumption after surgical discharge: a multinational derivation and validation study using a foundation model.*

**npj Digital Medicine** · 2025-08-26 · 原创研究 · [PMID 40858986](https://pubmed.ncbi.nlm.nih.gov/40858986/) · [DOI](https://doi.org/10.1038/s41746-025-01798-6)

研究将表格型基础模型应用于预测手术患者出院后阿片类药物消耗风险，在普外科、骨科、妇科和泌尿外科成人手术队列（n=4,267）中按80:20划分训练与内部测试，并在独立的普外科出院队列（n=826）中外部验证。内部测试AUC为0.84（95%CI 0.81–0.88），外部验证为0.77（95%CI 0.74–0.80），Brier评分分别为0.13和0.19。预测风险<50%的患者术后第一周口服吗啡当量中位数为0；应用该模型可使全球阿片处方减少4.5%，反事实建模提示不会增加重度疼痛时间（-4.3%，95%CI -17.7至8.6）。

> **要点**：表格基础模型预测出院后阿片消耗内部AUC 0.84、外部0.77，可减少4.5%阿片处方且不增加重度疼痛时间。

### 76. 一种基于序列的新型Transformer模型架构用于整合多组学数据预测早产风险

*A novel sequence-based transformer model architecture for integrating multi-omics data in preterm birth risk prediction.*

**npj Digital Medicine** · 2025-08-20 · 原创研究 · [PMID 40835718](https://pubmed.ncbi.nlm.nih.gov/40835718/) · [DOI](https://doi.org/10.1038/s41746-025-01942-2)

研究开发了基于Transformer的序列模型架构（作者称之为组学大模型），整合游离DNA（cfDNA）与游离RNA（cfRNA）测序数据预测早产风险。测试集中cfDNA模型AUC为0.822，cfRNA模型为0.851，二者在Transformer框架内融合后AUC升至0.890，显著优于单模态模型；此外借助RNA编辑信息的cfDNA与cfRNA整合方案AUC为0.82。结果提示多组学数据融合结合Transformer架构可为精准产科等领域的疾病风险评估提供有力框架。

> **要点**：cfDNA与cfRNA融合的Transformer多组学模型预测早产AUC达0.890，优于单模态模型（0.822/0.851）。

### 77. 用于脊柱外科风险分层打包付费的多模态机器学习

*Multimodal machine learning for risk-stratified bundled payments in spinal surgery.*

**npj Digital Medicine** · 2025-08-10 · 原创研究 · [PMID 40783461](https://pubmed.ncbi.nlm.nih.gov/40783461/) · [DOI](https://doi.org/10.1038/s41746-025-01915-5)

研究构建了首个术前风险分层的多模态机器学习模型，通过自然语言处理整合结构化临床数据与非结构化的外科医生病历文本，以预测脊柱手术的财务指标。模型预测总费用与可变费用异常值的ROC-AUC分别为0.845和0.883；在1,898例脊柱手术患者中，209例（11.0%）被识别为财务异常者，造成1,280万美元亏损，而其余病例产生180万美元盈利。财务异常者的ICU入住率、90天再手术率与住院时长均显著更高（均P<0.001），提示需要个体化、基于风险的付费模型以改善付费公平性。

> **要点**：多模态模型预测脊柱手术费用异常值的ROC-AUC达0.845/0.883；11.0%的异常患者造成1,280万美元亏损。

### 78. 人工智能在临床试验风险评估中应用的范围综述

*A scoping review of artificial intelligence applications in clinical trial risk assessment.*

**npj Digital Medicine** · 2025-07-30 · 系统评价/Meta分析 · [PMID 40731070](https://pubmed.ncbi.nlm.nih.gov/40731070/) · [DOI](https://doi.org/10.1038/s41746-025-01886-7)

该范围综述分析了2013—2024年间发表的142项研究，聚焦安全性风险（n=55）、有效性风险（n=46）和运营风险（n=45）的预测。所涉AI技术包括传统机器学习、深度学习（如图神经网络、Transformer）和因果机器学习，任务涵盖药物不良事件预测、治疗效应估计与试验阶段转化预测，数据来源从分子结构、试验方案到患者数据与科学文献。近年大语言模型应用激增，2023年的33项研究中已有7项使用LLM；部分模型性能优异（AUROC最高达96%），但仍存在选择偏倚、前瞻性研究缺乏与数据质量等问题。

> **要点**：142项研究的范围综述显示AI用于临床试验风险评估AUROC最高达96%，2023年33项研究中已有7项使用大语言模型。

### 79. 基于基础模型提取的影像特征进行患者再识别

*Re-identification of patients from imaging features extracted by foundation models.*

**npj Digital Medicine** · 2025-07-22 · 原创研究 · [PMID 40696111](https://pubmed.ncbi.nlm.nih.gov/40696111/) · [DOI](https://doi.org/10.1038/s41746-025-01801-0)

研究评估医学影像基础模型提取的特征能否用于患者再识别，并考察其与人口学特征预测的关系。在彩色眼底照片(CFP)、OCT b-scan和胸部X线上，再识别率分别为40.3%、46.3%和25.9%；专门训练深度学习模型执行再识别任务时，内部数据图像级性能分别达82.3%、93.9%和63.7%。人口学预测性能随再识别状态而异，例如CFP性别预测的AUC-ROC在可再识别图像中为82.1%、在不可再识别图像中为76.8%。结果表明眼科与放射影像基础模型提取的特征中含有可导致患者身份泄露的信息。

> **要点**：影像基础模型特征可实现患者再识别（CFP 40.3%、OCT 46.3%、胸片25.9%），存在隐私泄露风险。

### 80. 面向术中诊断的端到端多功能AI平台

*An end-to-end multifunctional AI platform for intraoperative diagnosis.*

**npj Digital Medicine** · 2025-07-20 · 原创研究 · [PMID 40685437](https://pubmed.ncbi.nlm.nih.gov/40685437/) · [DOI](https://doi.org/10.1038/s41746-025-01808-7)

针对术中冰冻切片质量常不理想、增加病理诊断难度的问题，研究基于超过6700张全切片图像开发了GAS平台，包含生成(Generation)、评估(Assessment)和支持(Support)三个模块。生成模块采用由FFPE风格文本描述引导的GAN多模态网络，可有效提升多器官冰冻切片质量；评估模块基于病理基础模型微调质控模型，显著改善生成图像的微结构质量；支持模块通过一项人机协作软件的前瞻性研究(ChiCTR2300076555)验证，显示GAS显著提升病理医师的诊断信心。研究为端到端AI方案融入临床工作流确立了新范式。

> **要点**：基于6700余张全切片图像的GAS平台可增强冰冻切片质量，并在前瞻性研究中显著提升病理医师诊断信心。

### 81. AI文生图工具描绘患者时的人口学不准确性与偏倚

*Demographic inaccuracies and biases in the depiction of patients by artificial intelligence text-to-image generators.*

**npj Digital Medicine** · 2025-07-19 · 原创研究 · [PMID 40683994](https://pubmed.ncbi.nlm.nih.gov/40683994/) · [DOI](https://doi.org/10.1038/s41746-025-01817-6)

研究评估4款常用文生图工具(Adobe Firefly、Bing Image Generator、Meta Imagine、Midjourney)在描绘患者时的人口学准确性与潜在偏倚。针对29种疾病共生成9060张患者图像，由12名独立评分者判定图中患者的性别、年龄、体重及种族/族裔。与真实世界流行病学数据相比，生成图像未能准确反映性别、年龄、种族/族裔等特征，并过度呈现白人与体重正常个体。作者认为偏倚可能源于训练数据不具代表性、不够具体以及偏倚缓解策略不足或方向错误，需要新的应对策略。

> **要点**：4款文生图工具生成的9060张患者图像人口学特征失真，显著过度呈现白人与正常体重个体。

### 82. 利用大语言模型识别多重长期共病人群的聚类：一项基于人群的研究

*Identifying clusters of people with Multiple Long-Term Conditions using Large Language Models: a population-based study.*

**npj Digital Medicine** · 2025-07-17 · 原创研究 · [PMID 40676244](https://pubmed.ncbi.nlm.nih.gov/40676244/) · [DOI](https://doi.org/10.1038/s41746-025-01806-9)

研究构建了包含DeBERTa语言模型的流程以生成性别特异的多重长期共病(MLTC)聚类。模型EHR-DeBERTa在英国580万名患者初级保健电子健康记录的诊断、用药和检验结果纵向序列上预训练，分别为男性和女性生成患者嵌入，再用K-Means聚类。结果在女性中识别出15个聚类、男性中17个聚类，可归类为低疾病负担、精神健康、心血管代谢、呼吸系统和混合疾病；心血管代谢与精神健康疾病在聚类间的分离度最强，心血管代谢聚类中患者年龄更大。作者认为该方法展示了语言模型可为疾病模式提供可解释的洞见。

> **要点**：基于580万人EHR预训练的EHR-DeBERTa嵌入聚类出女性15个、男性17个共病亚群，心血管代谢与精神健康分离最明显。

### 83. X-ray2CTPA：利用扩散模型提升肺栓塞分类性能

*X-ray2CTPA: leveraging diffusion models to enhance pulmonary embolism classification.*

**npj Digital Medicine** · 2025-07-14 · 原创研究 · [PMID 40659838](https://pubmed.ncbi.nlm.nih.gov/40659838/) · [DOI](https://doi.org/10.1038/s41746-025-01857-y)

研究提出一种基于扩散模型的跨模态生成方法，从二维低对比度分辨率的胸片(CXR)输入合成三维高对比度、高空间分辨率的CT肺动脉造影(CTPA)图像。将合成的3D影像用于分类框架后，仅以初始胸片作为输入的肺栓塞(PE)分类AUC得到提升，并通过定量指标验证了生成图像的诊断相关性。该方法具有通用性，可扩展到其他医学影像跨模态转换任务，有望提供更可及、更低成本的先进诊断工具，代码已开源。

> **要点**：扩散模型由胸片合成CTPA影像，提升了仅基于胸片输入的肺栓塞分类AUC。

### 84. 整合价值医疗模式下基于临床预警与个性化诊疗系统的数字化转型

*Digital transformation with clinical alerts and personalized care systems in an integrated value based model.*

**npj Digital Medicine** · 2025-07-08 · 原创研究 · [PMID 40629133](https://pubmed.ncbi.nlm.nih.gov/40629133/) · [DOI](https://doi.org/10.1038/s41746-025-01838-1)

服务490万患者的南加州Permanente医疗集团于2024年10月部署了Kaiser Permanente智能导航系统(KPIN)，该系统用自然语言处理识别患者门户中的就医意图，为高危急症生成预警并推荐合适的诊疗服务。早期结果显示临床预警和临床导航的AUC分别为0.977和0.889；KPIN校正后的成功预约率为53.68%，放弃率为2.94%(IQR 2.77–3.11%)，患者调查显示正面情绪比例提升8.63个百分点。结果支持该系统在整合式价值医疗模式中的有效性。

> **要点**：KPIN临床预警AUC 0.977、导航AUC 0.889，成功预约率53.68%，患者正面情绪提升8.63个百分点。

### 85. AI在FDA获批医疗器械中的使用方式：涵盖1016项授权的分类体系

*How AI is used in FDA-authorized medical devices: a taxonomy across 1,016 authorizations.*

**npj Digital Medicine** · 2025-07-01 · 原创研究 · [PMID 40596700](https://pubmed.ncbi.nlm.nih.gov/40596700/) · [DOI](https://doi.org/10.1038/s41746-025-01800-1)

作者系统梳理了1016项FDA批准的AI/ML医疗器械授权，构建了刻画其临床与AI技术特征差异的分类体系。定量影像分析仍是最常见的应用类型，但其相对占比近期有所下降；超过100款器械利用AI进行数据生成，然而迄今尚无任何一款涉及大语言模型。该分类体系厘清了医疗器械中AI应用的现状，并为持续追踪技术与监管演变提供了基础框架。

> **要点**：1016项FDA授权AI器械中影像分析仍占主导，100余款用于数据生成，但尚无器械使用LLM。

---

## 附录一：完整清单（按时间倒序）

| 日期 | 分类 | 标题 | PMID |
|---|---|---|---|
| 2026-07-13 | 医学智能体（Agentic AI）与多智能体系统 | AI agents in clinical practice: an evidence map | — |
| 2026-07-13 | 医学智能体（Agentic AI）与多智能体系统 | Humanoid robots in the operating room: a framework for staged integration of embodied AI in surgery | — |
| 2026-07-12 | 多模态与视觉-语言医学大模型 | A clinician aligned vision language framework for stepwise interpretation in fundus fluorescein angiography. | [42437856](https://pubmed.ncbi.nlm.nih.gov/42437856/) |
| 2026-07-10 | 基准测试、评估方法与模型性能评价 | Psychometric characterization of human and artificial intelligence performance on cardiology residency in-service examination items. | [42432060](https://pubmed.ncbi.nlm.nih.gov/42432060/) |
| 2026-07-09 | 临床决策支持与诊断/分诊推理 | Automated risk scoring for venous thromboembolism using large language models with expert knowledge-augmented prompting: a multicenter validation study. | [42426240](https://pubmed.ncbi.nlm.nih.gov/42426240/) |
| 2026-07-09 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Sleep EEG foundation models reveal within-stage microstructure that improves health screening beyond traditional stages. | [42426257](https://pubmed.ncbi.nlm.nih.gov/42426257/) |
| 2026-07-08 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Prediction of incident atrial fibrillation from retinal fundus images using a multimodal foundation model. | [42420432](https://pubmed.ncbi.nlm.nih.gov/42420432/) |
| 2026-07-07 | 基准测试、评估方法与模型性能评价 | Benchmarking large language models against practicing clinicians on psychopathological assessment. | [42414575](https://pubmed.ncbi.nlm.nih.gov/42414575/) |
| 2026-07-07 | 医学教育与培训 | Human-in-the-loop validation of a sequential multi-LLM medical education pipeline. | [42414538](https://pubmed.ncbi.nlm.nih.gov/42414538/) |
| 2026-07-07 | 精神心理健康与行为干预 | Attachment, loneliness, and social support as moderators of conversational AI-based mental health outcomes. | [42414532](https://pubmed.ncbi.nlm.nih.gov/42414532/) |
| 2026-07-06 | 预测建模与EHR表示学习 | Large language models are powerful electronic health record encoders. | [42410244](https://pubmed.ncbi.nlm.nih.gov/42410244/) |
| 2026-07-04 | 治理、监管、伦理与政策 | LLM research on public biosignals data is needed to protect patients. | [42401685](https://pubmed.ncbi.nlm.nih.gov/42401685/) |
| 2026-07-04 | 面向患者的沟通、教育与问答 | Conversational artificial intelligence for pre-procedural patient preparation: implementation, validation and patient satisfaction. | [42401677](https://pubmed.ncbi.nlm.nih.gov/42401677/) |
| 2026-07-04 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Explainable foundation model for dementia screening and risk stratification using retinal fundus images. | [42401717](https://pubmed.ncbi.nlm.nih.gov/42401717/) |
| 2026-07-03 | 临床文书、环境记录与EHR信息抽取 | Whole body CT attenuation and volume charts from routine clinical scans via LLM report filtering. | [42399663](https://pubmed.ncbi.nlm.nih.gov/42399663/) |
| 2026-07-03 | 科研辅助与循证医学 | Fast information and slow evidence in the large language models era. | [42399653](https://pubmed.ncbi.nlm.nih.gov/42399653/) |
| 2026-07-03 | 治理、监管、伦理与政策 | The ethics of listening walls: patient autonomy and consent in the age of ambient clinical AI. | [42399409](https://pubmed.ncbi.nlm.nih.gov/42399409/) |
| 2026-07-02 | 医学智能体（Agentic AI）与多智能体系统 | KGRD: a knowledge-graph-augmented automated reasoning framework for diagnosis and counselling of paediatric rare genetic disorders. | [42393263](https://pubmed.ncbi.nlm.nih.gov/42393263/) |
| 2026-07-02 | 基准测试、评估方法与模型性能评价 | Physicians and artificial intelligence diverge in evaluating large language models on real clinical cases. | [42393197](https://pubmed.ncbi.nlm.nih.gov/42393197/) |
| 2026-06-30 | 公共卫生、流行病学监测与健康公平 | AFP assistant: a retrieval-augmented generation and large language model-powered multilingual polio chatbot for low-resource language communities. | [42380241](https://pubmed.ncbi.nlm.nih.gov/42380241/) |
| 2026-06-30 | 安全性、偏倚、幻觉与红队测试 | Structured reasoning failures compromise LLM interpretation of clinical oncology notes. | [42380231](https://pubmed.ncbi.nlm.nih.gov/42380231/) |
| 2026-06-30 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | FedFound: a federated foundation model for lifespan brain morphological connectome analysis. | [42373765](https://pubmed.ncbi.nlm.nih.gov/42373765/) |
| 2026-06-29 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Translation of frozen sections into FFPE images for skin cancer resection margins using generative AI. | [42373874](https://pubmed.ncbi.nlm.nih.gov/42373874/) |
| 2026-06-26 | 多模态与视觉-语言医学大模型 | A multimodal instruction dataset and benchmark for ultrasound understanding. | [42362710](https://pubmed.ncbi.nlm.nih.gov/42362710/) |
| 2026-06-25 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Identifying suicide-related language in smartphone keyboard entries among high-risk adolescents. | [42350774](https://pubmed.ncbi.nlm.nih.gov/42350774/) |
| 2026-06-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Reconstruction from multi-planar MRI with foundation models for uterine fibroid analysis. | [42342992](https://pubmed.ncbi.nlm.nih.gov/42342992/) |
| 2026-06-23 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Video frame interpolation for coronary angiography using latent flow matching. | [42337305](https://pubmed.ncbi.nlm.nih.gov/42337305/) |
| 2026-06-23 | 多模态与视觉-语言医学大模型 | IVCM-Insight: automated interactive interpretation of in vivo confocal microscopy. | [42337008](https://pubmed.ncbi.nlm.nih.gov/42337008/) |
| 2026-06-22 | 多模态与视觉-语言医学大模型 | Development of a multimodal large language model for early warning and diagnosis of chronic ocular GVHD. | [42332126](https://pubmed.ncbi.nlm.nih.gov/42332126/) |
| 2026-06-22 | 多模态与视觉-语言医学大模型 | An expert-level vision-language model for multitask diagnostic morphology in clinical laboratories. | [42331997](https://pubmed.ncbi.nlm.nih.gov/42331997/) |
| 2026-06-22 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Handling missing modalities in multimodal survival prediction for non-small cell lung cancer. | [42332139](https://pubmed.ncbi.nlm.nih.gov/42332139/) |
| 2026-06-21 | 多模态与视觉-语言医学大模型 | Voice-controlled super-resolution ultrasound imaging and reporting powered by multimodal large language models. | [42324351](https://pubmed.ncbi.nlm.nih.gov/42324351/) |
| 2026-06-20 | 多模态与视觉-语言医学大模型 | FetalCLIP: a visual-language foundation model for fetal ultrasound image analysis. | [42321373](https://pubmed.ncbi.nlm.nih.gov/42321373/) |
| 2026-06-19 | 模型开发与技术方法 | Clinical large language model centered on electronic medical records. | [42321427](https://pubmed.ncbi.nlm.nih.gov/42321427/) |
| 2026-06-19 | 精神心理健康与行为干预 | Young people's perceptions and recommendations for conversational generative artificial intelligence in youth mental health. | [42321405](https://pubmed.ncbi.nlm.nih.gov/42321405/) |
| 2026-06-17 | 临床决策支持与诊断/分诊推理 | Large language models for acute coronary syndrome triage at first medical contact in emergency departments. | [42310091](https://pubmed.ncbi.nlm.nih.gov/42310091/) |
| 2026-06-17 | 面向患者的沟通、教育与问答 | Real-world evaluation of large language model for patients medical and administrative queries in nuclear medicine. | [42303756](https://pubmed.ncbi.nlm.nih.gov/42303756/) |
| 2026-06-16 | 安全性、偏倚、幻觉与红队测试 | When silence is safer: a review and decision-theoretic framework for LLM abstention in healthcare. | [42298124](https://pubmed.ncbi.nlm.nih.gov/42298124/) |
| 2026-06-16 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Author Correction: Large-scale self-supervised video foundation model for intelligent surgery. | [42303709](https://pubmed.ncbi.nlm.nih.gov/42303709/) |
| 2026-06-15 | 精神心理健康与行为干预 | Digital phenotyping with large language models to detect depressive state changes in patients. | [42298144](https://pubmed.ncbi.nlm.nih.gov/42298144/) |
| 2026-06-12 | 精神心理健康与行为干预 | The effectiveness of CBT-based NLP-enabled AI conversational agents for mental health intervention: a systematic review and meta-analysis. | [42286191](https://pubmed.ncbi.nlm.nih.gov/42286191/) |
| 2026-06-12 | 科研辅助与循证医学 | A new AI assisted approach aligns data standards and accelerates interoperability in biomedical research. | [42286188](https://pubmed.ncbi.nlm.nih.gov/42286188/) |
| 2026-06-12 | 医学智能体（Agentic AI）与多智能体系统 | An autonomous AI agent for knowledge and data cooperation in ED clinical decision support. | [42286154](https://pubmed.ncbi.nlm.nih.gov/42286154/) |
| 2026-06-11 | 面向患者的沟通、教育与问答 | Performance of a large language model in the informed consent process for participation in a clinical trial. | [42277365](https://pubmed.ncbi.nlm.nih.gov/42277365/) |
| 2026-06-11 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Embeddings of clinical codes enable knowledge-grounded AI in medicine. | [42277300](https://pubmed.ncbi.nlm.nih.gov/42277300/) |
| 2026-06-11 | 医学智能体（Agentic AI）与多智能体系统 | How can reasoning capability empower the AI copilot robot in endoscopic surgery. | [42277237](https://pubmed.ncbi.nlm.nih.gov/42277237/) |
| 2026-06-11 | 治理、监管、伦理与政策 | Who bears liability when AI gives bad prescribing advice. | [42277191](https://pubmed.ncbi.nlm.nih.gov/42277191/) |
| 2026-06-11 | 多模态与视觉-语言医学大模型 | An ultrasound foundation model for the stratification of vision impairment and eye cancer risk. | [42277320](https://pubmed.ncbi.nlm.nih.gov/42277320/) |
| 2026-06-10 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Federated generative prompt learning with vision foundation models: universal efficient multi-center medical image analysis. | [42265348](https://pubmed.ncbi.nlm.nih.gov/42265348/) |
| 2026-06-08 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A deep learning system for bacterial identification and resistance prediction from MALDI-TOF data. | [42260134](https://pubmed.ncbi.nlm.nih.gov/42260134/) |
| 2026-06-08 | 医学智能体（Agentic AI）与多智能体系统 | From raw audio to structure: an agent-based pipeline that boosts medical LLM performance. | [42259903](https://pubmed.ncbi.nlm.nih.gov/42259903/) |
| 2026-06-08 | 医学教育与培训 | Reconciling how clinical reasoning is learned in the age of artificial intelligence. | [42259908](https://pubmed.ncbi.nlm.nih.gov/42259908/) |
| 2026-06-06 | 医学智能体（Agentic AI）与多智能体系统 | Human-AI co-design for clinical prediction models. | [42251137](https://pubmed.ncbi.nlm.nih.gov/42251137/) |
| 2026-06-06 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Fundus to fluorescein angiography video generation as a retinal generative foundation model. | [42251139](https://pubmed.ncbi.nlm.nih.gov/42251139/) |
| 2026-06-05 | 多模态与视觉-语言医学大模型 | Learning like a radiologist: a medical vision-language model for radiological image analysis via curriculum learning. | [42249121](https://pubmed.ncbi.nlm.nih.gov/42249121/) |
| 2026-06-05 | 模型开发与技术方法 | EyeRAG: graph retrieval-augmented generation for safe and accurate clinical dialogue in ophthalmology. | [42249114](https://pubmed.ncbi.nlm.nih.gov/42249114/) |
| 2026-06-05 | 公共卫生、流行病学监测与健康公平 | Agentic AI in global health equity for high altitude populations. | [42249081](https://pubmed.ncbi.nlm.nih.gov/42249081/) |
| 2026-06-05 | 临床决策支持与诊断/分诊推理 | ChatGPT in the diagnosis and management of complex polyneuropathies: comparative analysis with neurologists using real-world cases. | [42243282](https://pubmed.ncbi.nlm.nih.gov/42243282/) |
| 2026-06-05 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Enhancing foundation model transfer for prostate cancer detection with patch-level contrastive learning. | [42249085](https://pubmed.ncbi.nlm.nih.gov/42249085/) |
| 2026-06-04 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Fully automated system predicts osteoporotic vertebral fracture across institutions using lumbar MRI paraspinal muscle signatures. | [42243528](https://pubmed.ncbi.nlm.nih.gov/42243528/) |
| 2026-06-02 | 多模态与视觉-语言医学大模型 | Human expertise or artificial intelligence? A prospective study on nail disorder diagnosis. | [42230912](https://pubmed.ncbi.nlm.nih.gov/42230912/) |
| 2026-06-02 | 医学教育与培训 | Mixed-methods study on GenAI Usage, dependence behaviors, and standardized application paths among Chinese medical students. | [42230756](https://pubmed.ncbi.nlm.nih.gov/42230756/) |
| 2026-06-02 | 基准测试、评估方法与模型性能评价 | Clinical outcomes and reporting quality of large language model interventions in practice: a systematic evidence map. | [42230743](https://pubmed.ncbi.nlm.nih.gov/42230743/) |
| 2026-06-02 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A large-scale vision foundation model for musculoskeletal radiographs. | [42230902](https://pubmed.ncbi.nlm.nih.gov/42230902/) |
| 2026-06-01 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | AI for predicting exacerbations in KIDs with asthma (AIRE-KIDS). | [42225895](https://pubmed.ncbi.nlm.nih.gov/42225895/) |
| 2026-05-30 | 模型开发与技术方法 | A generative approach for semantic auditing of electronic health records. | [42225932](https://pubmed.ncbi.nlm.nih.gov/42225932/) |
| 2026-05-30 | 基准测试、评估方法与模型性能评价 | Automated evaluation can distinguish the good and bad AI responses to patient questions about hospitalization. | [42218285](https://pubmed.ncbi.nlm.nih.gov/42218285/) |
| 2026-05-29 | 精神心理健康与行为干预 | Effectiveness of AI and rule-based conversational agents for depression, anxiety and stress: A meta-analysis. | [42209800](https://pubmed.ncbi.nlm.nih.gov/42209800/) |
| 2026-05-27 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A clinical neuroimaging platform for rapid, automated lesion detection and personalized post-stroke outcome prediction. | [42204350](https://pubmed.ncbi.nlm.nih.gov/42204350/) |
| 2026-05-27 | 基准测试、评估方法与模型性能评价 | Consistency in causal reasoning for large language models in scenarios of HIV antiretroviral treatment, drug interactions, and side effects. | [42204276](https://pubmed.ncbi.nlm.nih.gov/42204276/) |
| 2026-05-26 | 科研辅助与循证医学 | Feasibility and impact of a large language model pipeline for surgical trial abstracts. | [42191815](https://pubmed.ncbi.nlm.nih.gov/42191815/) |
| 2026-05-26 | 多模态与视觉-语言医学大模型 | Towards generalizable seizure monitoring: EpiVLM for cross-environment detection and classification. | [42185513](https://pubmed.ncbi.nlm.nih.gov/42185513/) |
| 2026-05-25 | 精神心理健康与行为干预 | Motivational interviewing chatbot improves lifestyle in primary healthcare settings in a pragmatic randomised controlled trial. | [42185597](https://pubmed.ncbi.nlm.nih.gov/42185597/) |
| 2026-05-22 | 临床文书、环境记录与EHR信息抽取 | Performance of large language models for extracting clinical data from breast cancer pathology reports: a systematic review. | [42174237](https://pubmed.ncbi.nlm.nih.gov/42174237/) |
| 2026-05-22 | 治理、监管、伦理与政策 | Expert perspectives on the ecosystem of medical AI oversight in the GenAI era. | [42174156](https://pubmed.ncbi.nlm.nih.gov/42174156/) |
| 2026-05-19 | 治理、监管、伦理与政策 | Expert perspectives on US regulatory approaches to large language models in healthcare. | [42156995](https://pubmed.ncbi.nlm.nih.gov/42156995/) |
| 2026-05-19 | 临床决策支持与诊断/分诊推理 | Interpretable fine-tuned large language models facilitate making genetic test decisions for rare diseases. | [42156861](https://pubmed.ncbi.nlm.nih.gov/42156861/) |
| 2026-05-18 | 基准测试、评估方法与模型性能评价 | Leveraging computerized adaptive testing for cost-effective evaluation of large language models in medical benchmarking. | [42151446](https://pubmed.ncbi.nlm.nih.gov/42151446/) |
| 2026-05-16 | 临床文书、环境记录与EHR信息抽取 | Use of AI scribes in UK primary care: a survey of general practitioners. | [42141104](https://pubmed.ncbi.nlm.nih.gov/42141104/) |
| 2026-05-15 | 治理、监管、伦理与政策 | Large language models require a new form of oversight: capability-based monitoring. | [42141031](https://pubmed.ncbi.nlm.nih.gov/42141031/) |
| 2026-05-15 | 面向患者的沟通、教育与问答 | Beyond translation: a patient-centered research agenda for artificial intelligence interpreter services in healthcare. | [42141054](https://pubmed.ncbi.nlm.nih.gov/42141054/) |
| 2026-05-14 | 公共卫生、流行病学监测与健康公平 | Perspective: large language models and antimicrobial resistance among migrants: an equity imperative. | [42135455](https://pubmed.ncbi.nlm.nih.gov/42135455/) |
| 2026-05-14 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A data and knowledge cross-level fusion-driven learning framework for detecting missing diagnosis. | [42135450](https://pubmed.ncbi.nlm.nih.gov/42135450/) |
| 2026-05-14 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A foundational model encodes deep phenotyping data and enables diverse downstream applications. | [42135472](https://pubmed.ncbi.nlm.nih.gov/42135472/) |
| 2026-05-13 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Author Correction: Predicting opioid consumption after surgical discharge: a multinational derivation and validation study using a foundation model. | [42129453](https://pubmed.ncbi.nlm.nih.gov/42129453/) |
| 2026-05-11 | 模型开发与技术方法 | The Aloe Family recipe for open and specialized healthcare LLMs. | [42115745](https://pubmed.ncbi.nlm.nih.gov/42115745/) |
| 2026-05-10 | 医学智能体（Agentic AI）与多智能体系统 | Rethinking scale in ophthalmic artificial intelligence: from bigger models to smarter clinical reasoning. | [42106570](https://pubmed.ncbi.nlm.nih.gov/42106570/) |
| 2026-05-09 | 面向患者的沟通、教育与问答 | RESPECT: a conversational AI system for informed consent with accuracy, safety, and stakeholder-centered evaluation. | [42106536](https://pubmed.ncbi.nlm.nih.gov/42106536/) |
| 2026-05-09 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | SurvivEHR: a competing risks, time-to-event foundation model for multiple long-term conditions from primary care electronic health records. | [42106492](https://pubmed.ncbi.nlm.nih.gov/42106492/) |
| 2026-05-05 | 医学教育与培训 | Evaluating large language models for pharmacotherapy simulations: a mixed-methods study. | [42086710](https://pubmed.ncbi.nlm.nih.gov/42086710/) |
| 2026-05-04 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Subspecialty-specific foundation model for intelligent gastrointestinal pathology. | [42082713](https://pubmed.ncbi.nlm.nih.gov/42082713/) |
| 2026-05-02 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | OncoPT: long-context transformer models for in hospital tumor phenotype extraction from pathology reports. | [42069805](https://pubmed.ncbi.nlm.nih.gov/42069805/) |
| 2026-04-30 | 模型开发与技术方法 | Reinforcement learning improves LLM accuracy and reasoning in disease classification from radiology reports. | [42062541](https://pubmed.ncbi.nlm.nih.gov/42062541/) |
| 2026-04-30 | 多模态与视觉-语言医学大模型 | Key concept learning for medical vision language model with reasoning capabilities. | [42056236](https://pubmed.ncbi.nlm.nih.gov/42056236/) |
| 2026-04-28 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Gastrointestinal endoscopic image style transfer using EndoStyle to improve artificial intelligence prediction models. | [42050035](https://pubmed.ncbi.nlm.nih.gov/42050035/) |
| 2026-04-27 | 基准测试、评估方法与模型性能评价 | AgentClinic: a multimodal benchmark for tool-using clinical AI agents. | [42045532](https://pubmed.ncbi.nlm.nih.gov/42045532/) |
| 2026-04-27 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | TikTok is a valuable data source for tracking the opioid crisis. | [42045414](https://pubmed.ncbi.nlm.nih.gov/42045414/) |
| 2026-04-27 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Fourier Kolmogorov-Arnold Network integrated into BioBERT-based model for Biomedical Named Entity Recognition. | [42045658](https://pubmed.ncbi.nlm.nih.gov/42045658/) |
| 2026-04-25 | 多模态与视觉-语言医学大模型 | Integrating multimodal clinical data with a large model for prostate cancer diagnosis. | [42034911](https://pubmed.ncbi.nlm.nih.gov/42034911/) |
| 2026-04-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | CT-based AI system for quantitative and integrated management of acute respiratory distress syndrome in critical care. | [42032151](https://pubmed.ncbi.nlm.nih.gov/42032151/) |
| 2026-04-23 | 临床决策支持与诊断/分诊推理 | The effect of medical explanations from large language models on diagnostic accuracy in radiology. | [42026140](https://pubmed.ncbi.nlm.nih.gov/42026140/) |
| 2026-04-23 | 医学教育与培训 | Designing AI-resilient admissions interviews for health professions training in the age of generative AI. | [42026111](https://pubmed.ncbi.nlm.nih.gov/42026111/) |
| 2026-04-23 | 基准测试、评估方法与模型性能评价 | Evaluation of causal reasoning for large language models in contextualized clinical scenarios of laboratory test interpretation. | [42020503](https://pubmed.ncbi.nlm.nih.gov/42020503/) |
| 2026-04-23 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Trial emulation for validating the clinical efficacy of a foundational AI model in embryo selection. | [42026141](https://pubmed.ncbi.nlm.nih.gov/42026141/) |
| 2026-04-21 | 治理、监管、伦理与政策 | Tracing the Pen: Electronic Health Records Amid the Rise of Generative AI. | [42014474](https://pubmed.ncbi.nlm.nih.gov/42014474/) |
| 2026-04-18 | 安全性、偏倚、幻觉与红队测试 | Bias, representation, and clinical fidelity in AI-generated images for medical education: a systematic literature review. | [42000932](https://pubmed.ncbi.nlm.nih.gov/42000932/) |
| 2026-04-18 | 临床决策支持与诊断/分诊推理 | Development and prospective shadow evaluation of a domain-specific large language model for emergency neurological diagnosis. | [42000879](https://pubmed.ncbi.nlm.nih.gov/42000879/) |
| 2026-04-15 | 医学智能体（Agentic AI）与多智能体系统 | An agentic AI system for automated pharmacogenomic recommendation generation. | [41986608](https://pubmed.ncbi.nlm.nih.gov/41986608/) |
| 2026-04-15 | 模型开发与技术方法 | The effects of multitype prompt engineering for large language models in hypertension treatment decisions. | [41986562](https://pubmed.ncbi.nlm.nih.gov/41986562/) |
| 2026-04-15 | 多模态与视觉-语言医学大模型 | Specialized foundation models for intelligent operating rooms. | [41986551](https://pubmed.ncbi.nlm.nih.gov/41986551/) |
| 2026-04-14 | 基准测试、评估方法与模型性能评价 | PsychiatryBench: a multi-task benchmark for LLMs in psychiatry. | [41981155](https://pubmed.ncbi.nlm.nih.gov/41981155/) |
| 2026-04-14 | 临床文书、环境记录与EHR信息抽取 | Evaluating real-world deployment of an HL7-CDA-aligned LLM for ICD-10-CM coding. | [41981090](https://pubmed.ncbi.nlm.nih.gov/41981090/) |
| 2026-04-14 | 预测建模与EHR表示学习 | Large language model-augmented offline reinforcement learning framework for sepsis management in critical care. | [41975229](https://pubmed.ncbi.nlm.nih.gov/41975229/) |
| 2026-04-13 | 临床文书、环境记录与EHR信息抽取 | Automating the quality monitoring of a hospital discharge summary improvement project utilising large language models. | [41974922](https://pubmed.ncbi.nlm.nih.gov/41974922/) |
| 2026-04-11 | 多模态与视觉-语言医学大模型 | Graphicalized vision-language modeling for comprehensive lung nodule analysis and risk stratification. | [41965884](https://pubmed.ncbi.nlm.nih.gov/41965884/) |
| 2026-04-08 | 医学智能体（Agentic AI）与多智能体系统 | EcoRxAgent: an AI agent for generating economically substitutable prescriptions. | [41951898](https://pubmed.ncbi.nlm.nih.gov/41951898/) |
| 2026-04-08 | 基准测试、评估方法与模型性能评价 | ClinicRealm: Re-evaluating large language models with conventional machine learning for non-generative clinical prediction tasks. | [41951858](https://pubmed.ncbi.nlm.nih.gov/41951858/) |
| 2026-04-07 | 医学教育与培训 | Evaluation of artificial intelligence-generated vignettes depicting patient chatbot use in psychiatric contexts. | [41946953](https://pubmed.ncbi.nlm.nih.gov/41946953/) |
| 2026-04-07 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | The portability paradox of foundation models for clinical decision support. | [41942735](https://pubmed.ncbi.nlm.nih.gov/41942735/) |
| 2026-04-06 | 安全性、偏倚、幻觉与红队测试 | Guardrails for GenAI drafted replies in patient portal messaging. | [41942581](https://pubmed.ncbi.nlm.nih.gov/41942581/) |
| 2026-04-04 | 安全性、偏倚、幻觉与红队测试 | New model, old risks: sociodemographic bias and adversarial hallucinations vulnerability in GPT-5. | [41935214](https://pubmed.ncbi.nlm.nih.gov/41935214/) |
| 2026-04-04 | 医学智能体（Agentic AI）与多智能体系统 | A neural-symbolic AI agent system for biomedical concept mapping. | [41935204](https://pubmed.ncbi.nlm.nih.gov/41935204/) |
| 2026-04-04 | 多模态与视觉-语言医学大模型 | HoloTrauma 3X Triadic AI Co reasoning for robot assisted emergency maxillofacial reconstruction. | [41935194](https://pubmed.ncbi.nlm.nih.gov/41935194/) |
| 2026-04-04 | 临床文书、环境记录与EHR信息抽取 | Comparison of AI-generated radiology impressions: a multi-stakeholder evaluation. | [41935165](https://pubmed.ncbi.nlm.nih.gov/41935165/) |
| 2026-04-04 | 多模态与视觉-语言医学大模型 | Decipher-MR: a vision-language foundation model for 3D MRI representations. | [41935229](https://pubmed.ncbi.nlm.nih.gov/41935229/) |
| 2026-04-03 | 安全性、偏倚、幻觉与红队测试 | An AI-based mental health guardrail and dataset for identifying psychiatric crises in text-based conversations. | [41933065](https://pubmed.ncbi.nlm.nih.gov/41933065/) |
| 2026-04-02 | 预测建模与EHR表示学习 | Integrating large language models for enhanced predictive analytics in healthcare. | [41927986](https://pubmed.ncbi.nlm.nih.gov/41927986/) |
| 2026-04-02 | 多模态与视觉-语言医学大模型 | A robust vision language model for molecular status prediction and radiology report generation in adult-type diffuse gliomas. | [41927936](https://pubmed.ncbi.nlm.nih.gov/41927936/) |
| 2026-04-01 | 面向患者的沟通、教育与问答 | Multidimensional evaluation of large language models in radiology report readability. | [41922696](https://pubmed.ncbi.nlm.nih.gov/41922696/) |
| 2026-04-01 | 面向患者的沟通、教育与问答 | Evaluating large language models for simplifying non-English medical consent with clinician involvement. | [41922537](https://pubmed.ncbi.nlm.nih.gov/41922537/) |
| 2026-04-01 | 预测建模与EHR表示学习 | Comparative performance of LLMs and machine learning in predicting complications after percutaneous kyphoplasty for osteoporotic vertebral compression fractures. | [41922526](https://pubmed.ncbi.nlm.nih.gov/41922526/) |
| 2026-03-31 | 基准测试、评估方法与模型性能评价 | Structured taxonomy and framework for developing medical benchmark in large language models derived from scoping review. | [41917165](https://pubmed.ncbi.nlm.nih.gov/41917165/) |
| 2026-03-28 | 治理、监管、伦理与政策 | The risk of empty empathy talk and challenges of automated empathy in healthcare communication. | [41904237](https://pubmed.ncbi.nlm.nih.gov/41904237/) |
| 2026-03-28 | 临床文书、环境记录与EHR信息抽取 | Domain specific multimodal large language model for automated endoscopy reporting with multicenter prospective validation. | [41904204](https://pubmed.ncbi.nlm.nih.gov/41904204/) |
| 2026-03-27 | 治理、监管、伦理与政策 | The doctor is not in, but the Chatbot is: Utah's experience regulating mental health AI. | [41888409](https://pubmed.ncbi.nlm.nih.gov/41888409/) |
| 2026-03-25 | 医学智能体（Agentic AI）与多智能体系统 | WiseMind: a knowledge-guided multi-agent framework for accurate and empathetic psychiatric diagnosis. | [41882314](https://pubmed.ncbi.nlm.nih.gov/41882314/) |
| 2026-03-25 | 精神心理健康与行为干预 | Systematic review and meta analysis of chatbots in the management of depressive and anxiety symptoms. | [41882250](https://pubmed.ncbi.nlm.nih.gov/41882250/) |
| 2026-03-24 | 医学教育与培训 | Performance of DeepSeek in the generation of in-training examination questions in radiology resident education. | [41876633](https://pubmed.ncbi.nlm.nih.gov/41876633/) |
| 2026-03-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Clinical utility of foundation models in musculoskeletal MRI for biomarker fidelity and predictive outcomes. | [41876760](https://pubmed.ncbi.nlm.nih.gov/41876760/) |
| 2026-03-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Boosting foundation models for rare eye disease diagnosis via a multimodal text-to-image generative framework. | [41872533](https://pubmed.ncbi.nlm.nih.gov/41872533/) |
| 2026-03-23 | 临床文书、环境记录与EHR信息抽取 | Barriers and opportunities of scaling ambient AI scribes for clinical documentation across diverse healthcare settings. | [41866429](https://pubmed.ncbi.nlm.nih.gov/41866429/) |
| 2026-03-21 | 治理、监管、伦理与政策 | The regulation of artificial intelligence in intensive care units: from narrow tools to generalist systems. | [41865113](https://pubmed.ncbi.nlm.nih.gov/41865113/) |
| 2026-03-21 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | High-sensitivity pan-cancer AI assessment of lymph node metastasis via uncertainty quantification. | [41862698](https://pubmed.ncbi.nlm.nih.gov/41862698/) |
| 2026-03-19 | 治理、监管、伦理与政策 | Innovating global regulatory frameworks for generative AI in medical devices is an urgent priority. | [41857339](https://pubmed.ncbi.nlm.nih.gov/41857339/) |
| 2026-03-18 | 临床决策支持与诊断/分诊推理 | From tool to teammate in a randomized controlled trial of clinician-AI collaborative workflows for diagnosis. | [41851268](https://pubmed.ncbi.nlm.nih.gov/41851268/) |
| 2026-03-18 | 多模态与视觉-语言医学大模型 | From blink to care: smartphone video-based functional analysis and personalized management in pediatric blepharoptosis. | [41844953](https://pubmed.ncbi.nlm.nih.gov/41844953/) |
| 2026-03-17 | 医学教育与培训 | Impact of AI misinformation on diagnostic accuracy and confidence calibration in novice medical students. | [41844809](https://pubmed.ncbi.nlm.nih.gov/41844809/) |
| 2026-03-16 | 多模态与视觉-语言医学大模型 | Teaching multimodal LLMs to comprehend 12-lead electrocardiographic images. | [41840182](https://pubmed.ncbi.nlm.nih.gov/41840182/) |
| 2026-03-15 | 基准测试、评估方法与模型性能评价 | A multicenter multifunctional assessment of large language models in pure-tone audiogram interpretation for patients. | [41832240](https://pubmed.ncbi.nlm.nih.gov/41832240/) |
| 2026-03-15 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Cautious optimism on foundation models in medical imaging balancing privacy and innovation. | [41833961](https://pubmed.ncbi.nlm.nih.gov/41833961/) |
| 2026-03-14 | 医学智能体（Agentic AI）与多智能体系统 | The role of agentic artificial intelligence in healthcare: a scoping review. | [41832341](https://pubmed.ncbi.nlm.nih.gov/41832341/) |
| 2026-03-14 | 预测建模与EHR表示学习 | Artificial Intelligence-powered tiered early warning framework addressing high false alarm rates for in-hospital mortality prediction. | [41832244](https://pubmed.ncbi.nlm.nih.gov/41832244/) |
| 2026-03-14 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Time and person sensitive foundation model for disease prediction and risk stratification. | [41832356](https://pubmed.ncbi.nlm.nih.gov/41832356/) |
| 2026-03-13 | 精神心理健康与行为干预 | A transdiagnostic model for how general purpose AI chatbots can perpetuate OCD and anxiety disorders. | [41826639](https://pubmed.ncbi.nlm.nih.gov/41826639/) |
| 2026-03-09 | 医学智能体（Agentic AI）与多智能体系统 | Personalised health plan development using agentic AI in Singapore's national preventive care programme: a pilot study. | [41803278](https://pubmed.ncbi.nlm.nih.gov/41803278/) |
| 2026-03-07 | 面向患者的沟通、教育与问答 | AI-augmented communication improves HIV PrEP initiation and persistence in populations disproportionately impacted by HIV. | [41792418](https://pubmed.ncbi.nlm.nih.gov/41792418/) |
| 2026-03-06 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | RoentMod: a synthetic chest X-ray modification model to identify and correct image interpretation model shortcuts. | [41792409](https://pubmed.ncbi.nlm.nih.gov/41792409/) |
| 2026-03-05 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Shifting the retinal foundation models paradigm from slices to volumes for optical coherence tomography. | [41786902](https://pubmed.ncbi.nlm.nih.gov/41786902/) |
| 2026-03-04 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Prediction of antibiotic-associated cutaneous adverse drug reactions using electronic health record foundation models. | [41775818](https://pubmed.ncbi.nlm.nih.gov/41775818/) |
| 2026-03-03 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Deep language model-based early recognition of out-of-hospital cardiac arrest from real-time emergency calls. | [41775831](https://pubmed.ncbi.nlm.nih.gov/41775831/) |
| 2026-03-02 | 临床文书、环境记录与EHR信息抽取 | Ambient scribe in general practice: a multi-perspective before-after longitudinal mixed-methods study. | [41772212](https://pubmed.ncbi.nlm.nih.gov/41772212/) |
| 2026-03-02 | 临床文书、环境记录与EHR信息抽取 | Accent related errors in clinical speech transcription and a LLM-based remedy. | [41772044](https://pubmed.ncbi.nlm.nih.gov/41772044/) |
| 2026-03-02 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A test-time clinically adaptive framework for detecting multiple fundus diseases harnessing ophthalmic foundation models. | [41772178](https://pubmed.ncbi.nlm.nih.gov/41772178/) |
| 2026-02-28 | 精神心理健康与行为干预 | Scalable depression monitoring with smartphone speech using a multimodal benchmark and topic analysis. | [41764298](https://pubmed.ncbi.nlm.nih.gov/41764298/) |
| 2026-02-27 | 基准测试、评估方法与模型性能评价 | A scalable framework for evaluating health language models. | [41760912](https://pubmed.ncbi.nlm.nih.gov/41760912/) |
| 2026-02-27 | 模型开发与技术方法 | SynthEHR-eviction: enhancing eviction SDoH detection with LLM-augmented synthetic EHR data. | [41760885](https://pubmed.ncbi.nlm.nih.gov/41760885/) |
| 2026-02-27 | 基准测试、评估方法与模型性能评价 | Advancing medical AI through benchmarking and competition for specialty triage. | [41760911](https://pubmed.ncbi.nlm.nih.gov/41760911/) |
| 2026-02-26 | 临床文书、环境记录与EHR信息抽取 | Vision-Enabled AI scribes reduce omissions in clinical conversations: evidence from simulated medication histories. | [41748705](https://pubmed.ncbi.nlm.nih.gov/41748705/) |
| 2026-02-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Language-based detection of depression with machine learning: systematic review and meta-analysis. | [41735551](https://pubmed.ncbi.nlm.nih.gov/41735551/) |
| 2026-02-23 | 治理、监管、伦理与政策 | Regulation of clinical Artificial Intelligence (AI) in the Age of Agents: Unconfined Non-Deterministic Clinical Software (UNDCS) systems for healthcare. | [41731018](https://pubmed.ncbi.nlm.nih.gov/41731018/) |
| 2026-02-23 | 公共卫生、流行病学监测与健康公平 | A suite of large language models for public health infoveillance. | [41731011](https://pubmed.ncbi.nlm.nih.gov/41731011/) |
| 2026-02-21 | 基准测试、评估方法与模型性能评价 | A large-scale benchmark for evaluating large language models on medical question answering in Romanian. | [41723286](https://pubmed.ncbi.nlm.nih.gov/41723286/) |
| 2026-02-20 | 模型开发与技术方法 | CancerLLM: a large language model in cancer domain. | [41720895](https://pubmed.ncbi.nlm.nih.gov/41720895/) |
| 2026-02-19 | 科研辅助与循证医学 | Large language models in systematic review and meta-analysis of surgical treatments for vaginal vault prolapse. | [41714807](https://pubmed.ncbi.nlm.nih.gov/41714807/) |
| 2026-02-18 | 基准测试、评估方法与模型性能评价 | Benchmarking large language model-based agent systems for clinical decision tasks. | [41708802](https://pubmed.ncbi.nlm.nih.gov/41708802/) |
| 2026-02-16 | 医学智能体（Agentic AI）与多智能体系统 | Reimagining psychiatric care with agentic AI: promise, challenges, and a roadmap forward. | [41699048](https://pubmed.ncbi.nlm.nih.gov/41699048/) |
| 2026-02-16 | 预测建模与EHR表示学习 | A deep learning model integrating structured data and clinical text for predicting atrial fibrillation recurrence. | [41699044](https://pubmed.ncbi.nlm.nih.gov/41699044/) |
| 2026-02-13 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Anatomy-guided visual prompt tuning for cross-modal breast cancer understanding. | [41688744](https://pubmed.ncbi.nlm.nih.gov/41688744/) |
| 2026-02-13 | 安全性、偏倚、幻觉与红队测试 | Large language models provide unsafe answers to patient-posed medical questions. | [41688533](https://pubmed.ncbi.nlm.nih.gov/41688533/) |
| 2026-02-13 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Matters Arising: Near-identical images, not foundation models, explain purported re-identification of patients from medical imaging. | [41688581](https://pubmed.ncbi.nlm.nih.gov/41688581/) |
| 2026-02-12 | 多模态与视觉-语言医学大模型 | Closed loop text guided framework for lung cancer lesion segmentation and quantification. | [41680279](https://pubmed.ncbi.nlm.nih.gov/41680279/) |
| 2026-02-10 | 安全性、偏倚、幻觉与红队测试 | The value of doubt: training LLMs to consider diagnostic uncertainty may improve clinical utility. | [41667792](https://pubmed.ncbi.nlm.nih.gov/41667792/) |
| 2026-02-09 | 医学智能体（Agentic AI）与多智能体系统 | Toward integrated sleep health: multimodal AI in Hang Hao Meng agent. | [41663720](https://pubmed.ncbi.nlm.nih.gov/41663720/) |
| 2026-02-06 | 临床决策支持与诊断/分诊推理 | Independent and collaborative performance of large language models and healthcare professionals in diagnosis and triage. | [41652180](https://pubmed.ncbi.nlm.nih.gov/41652180/) |
| 2026-02-05 | 治理、监管、伦理与政策 | Scaling medical device regulatory science using large language models. | [41644679](https://pubmed.ncbi.nlm.nih.gov/41644679/) |
| 2026-02-04 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Large-scale self-supervised video foundation model for intelligent surgery. | [41639385](https://pubmed.ncbi.nlm.nih.gov/41639385/) |
| 2026-02-04 | 多模态与视觉-语言医学大模型 | Text-image alignment for ILD imaging: linking CXR evidence to CT quantification. | [41639194](https://pubmed.ncbi.nlm.nih.gov/41639194/) |
| 2026-02-03 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | StructSAM: structure-aware prompt adaptation for robust lung cancer lesion segmentation in CT. | [41634130](https://pubmed.ncbi.nlm.nih.gov/41634130/) |
| 2026-01-31 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Flight rules for clinical AI: lessons from aviation for human-AI collaboration in medicine. | [41620563](https://pubmed.ncbi.nlm.nih.gov/41620563/) |
| 2026-01-31 | 面向患者的沟通、教育与问答 | Diverging trajectories of trust in healthcare and on-line information seeking: what's next with LLMs. | [41620476](https://pubmed.ncbi.nlm.nih.gov/41620476/) |
| 2026-01-28 | 临床决策支持与诊断/分诊推理 | Human-large language model collaboration in clinical medicine: a systematic review and meta-analysis. | [41606089](https://pubmed.ncbi.nlm.nih.gov/41606089/) |
| 2026-01-23 | 医学智能体（Agentic AI）与多智能体系统 | Agentic AI can help hospitals prepare for unprecedented weather. | [41577836](https://pubmed.ncbi.nlm.nih.gov/41577836/) |
| 2026-01-23 | 安全性、偏倚、幻觉与红队测试 | Sex disparities in deep learning estimation of ejection fraction from cardiac magnetic resonance imaging. | [41577988](https://pubmed.ncbi.nlm.nih.gov/41577988/) |
| 2026-01-22 | 预测建模与EHR表示学习 | Large language models improve transferability of electronic health record-based predictions across countries and coding systems. | [41571946](https://pubmed.ncbi.nlm.nih.gov/41571946/) |
| 2026-01-22 | 基准测试、评估方法与模型性能评价 | Evaluation of large language models for diagnostic impression generation from brain MRI report findings: a multicenter benchmark and reader study. | [41571872](https://pubmed.ncbi.nlm.nih.gov/41571872/) |
| 2026-01-22 | 医学智能体（Agentic AI）与多智能体系统 | Early diagnosis of axial spondyloarthritis in primary care using multi-agent systems. | [41571772](https://pubmed.ncbi.nlm.nih.gov/41571772/) |
| 2026-01-21 | 基准测试、评估方法与模型性能评价 | HealthContradict: Evaluating biomedical knowledge conflicts in language models. | [41565976](https://pubmed.ncbi.nlm.nih.gov/41565976/) |
| 2026-01-21 | 预测建模与EHR表示学习 | Enhanced language models for predicting and understanding HIV care disengagement: a case study in Tanzania. | [41565873](https://pubmed.ncbi.nlm.nih.gov/41565873/) |
| 2026-01-20 | 多模态与视觉-语言医学大模型 | Melan-Dx: a knowledge-enhanced vision-language framework improves differential diagnosis of melanocytic neoplasm pathology. | [41559412](https://pubmed.ncbi.nlm.nih.gov/41559412/) |
| 2026-01-20 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Clinically-guided models or foundation models? predicting cervical spondylotic myelopathy from electronic health records. | [41559180](https://pubmed.ncbi.nlm.nih.gov/41559180/) |
| 2026-01-19 | 医学智能体（Agentic AI）与多智能体系统 | LLM-driven collaborative framework for knowledge-enhanced cancer pain assessment and management. | [41554973](https://pubmed.ncbi.nlm.nih.gov/41554973/) |
| 2026-01-17 | 面向患者的沟通、教育与问答 | A randomized controlled trial of a WeChat-based artificial intelligence agent for postoperative care in orthopedic patients. | [41548028](https://pubmed.ncbi.nlm.nih.gov/41548028/) |
| 2026-01-16 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Towards interpretable prediction of recurrence risk in breast cancer using pathology foundation models. | [41545684](https://pubmed.ncbi.nlm.nih.gov/41545684/) |
| 2026-01-15 | 精神心理健康与行为干预 | A guided chatbot-based psychological intervention for psychologically distressed older adolescents and young adults: a randomised clinical trial in Jordan. | [41540250](https://pubmed.ncbi.nlm.nih.gov/41540250/) |
| 2026-01-10 | 医学智能体（Agentic AI）与多智能体系统 | KT-LLM: an evidence-grounded and sequence text framework for auditable kidney transplant modeling. | [41520040](https://pubmed.ncbi.nlm.nih.gov/41520040/) |
| 2026-01-10 | 多模态与视觉-语言医学大模型 | Foundation model embeddings for multimodal oncology data integration. | [41514042](https://pubmed.ncbi.nlm.nih.gov/41514042/) |
| 2026-01-09 | 医学教育与培训 | Bridging the mentorship divide: how large language models could reshape medical workforce equity. | [41513946](https://pubmed.ncbi.nlm.nih.gov/41513946/) |
| 2026-01-08 | 安全性、偏倚、幻觉与红队测试 | Assessing the impact of safety guardrails on large language models using irritability metrics. | [41507509](https://pubmed.ncbi.nlm.nih.gov/41507509/) |
| 2026-01-08 | 医学教育与培训 | Psychometric properties and detectability of GPT-4o-generated multiple-choice questions compared with human-authored items across imaging specialties. | [41507355](https://pubmed.ncbi.nlm.nih.gov/41507355/) |
| 2026-01-07 | 医学智能体（Agentic AI）与多智能体系统 | An autonomous agentic workflow for clinical detection of cognitive concerns using large language models. | [41501421](https://pubmed.ncbi.nlm.nih.gov/41501421/) |
| 2026-01-07 | 面向患者的沟通、教育与问答 | Effectiveness of large language models in preoperative and discharge education: a systematic review based on an evaluation framework. | [41501337](https://pubmed.ncbi.nlm.nih.gov/41501337/) |
| 2026-01-07 | 医学智能体（Agentic AI）与多智能体系统 | EvoMDT: a self-evolving multi-agent system for structured clinical decision-making in multi-cancer. | [41501128](https://pubmed.ncbi.nlm.nih.gov/41501128/) |
| 2026-01-06 | 预测建模与EHR表示学习 | Holistic AI in medicine; improved performance and explainability. | [41495177](https://pubmed.ncbi.nlm.nih.gov/41495177/) |
| 2026-01-03 | 多模态与视觉-语言医学大模型 | Grounded report generation for enhancing ophthalmic ultrasound interpretation using Vision-Language Segmentation models. | [41484436](https://pubmed.ncbi.nlm.nih.gov/41484436/) |
| 2026-01-03 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Powering responsible artificial intelligence with high-quality real-world data: the S-RACE platform for scalable, multi-specialty clinical research. | [41484225](https://pubmed.ncbi.nlm.nih.gov/41484225/) |
| 2025-12-31 | 临床决策支持与诊断/分诊推理 | Diagnostic and interpretive gains from reasoning over conclusions with a large reasoning model in radiology. | [41476119](https://pubmed.ncbi.nlm.nih.gov/41476119/) |
| 2025-12-29 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Foundation model-guided multi-view semi-supervised CT segmentation of liver tumors in resource-constrained settings. | [41461915](https://pubmed.ncbi.nlm.nih.gov/41461915/) |
| 2025-12-27 | 基准测试、评估方法与模型性能评价 | Context matching is not reasoning when performing generalized clinical evaluation of generative language models. | [41455812](https://pubmed.ncbi.nlm.nih.gov/41455812/) |
| 2025-12-27 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Multimodal deep learning for cancer prognosis prediction with clinical information prompts integration. | [41455823](https://pubmed.ncbi.nlm.nih.gov/41455823/) |
| 2025-12-26 | 精神心理健康与行为干预 | AI-guided digital intervention with physiological monitoring reduces intrusive memories after experimental trauma. | [41454171](https://pubmed.ncbi.nlm.nih.gov/41454171/) |
| 2025-12-26 | 基准测试、评估方法与模型性能评价 | A novel evaluation benchmark for medical LLMs illuminating safety and effectiveness in clinical domains. | [41454006](https://pubmed.ncbi.nlm.nih.gov/41454006/) |
| 2025-12-24 | 治理、监管、伦理与政策 | Policy brief: ambient AI scribes and the coding arms race. | [41444833](https://pubmed.ncbi.nlm.nih.gov/41444833/) |
| 2025-12-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Real-world performance evaluation of a commercial deep learning model for intracranial hemorrhage detection. | [41444826](https://pubmed.ncbi.nlm.nih.gov/41444826/) |
| 2025-12-23 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | AI-driven early infectious disease detection in Dutch primary care using BERT and ERNIE. | [41437151](https://pubmed.ncbi.nlm.nih.gov/41437151/) |
| 2025-12-23 | 医学教育与培训 | The impact of GenAI on applicant behaviour, performance, and interview reliability during virtual interviews for medical school admissions. | [41437146](https://pubmed.ncbi.nlm.nih.gov/41437146/) |
| 2025-12-23 | 临床决策支持与诊断/分诊推理 | ARTEMIS: a pilot study comparing AI-based and expert therapeutic decisions in simulated clinical cases of neuroendocrine neoplasms. | [41436590](https://pubmed.ncbi.nlm.nih.gov/41436590/) |
| 2025-12-22 | 模型开发与技术方法 | Multi-step retrieval and reasoning improves radiology question answering with large language models. | [41429891](https://pubmed.ncbi.nlm.nih.gov/41429891/) |
| 2025-12-22 | 科研辅助与循证医学 | Streamlining evidence based clinical recommendations with large language models. | [41423701](https://pubmed.ncbi.nlm.nih.gov/41423701/) |
| 2025-12-20 | 多模态与视觉-语言医学大模型 | Predicting Invasiveness of Lung Adenocarcinoma from Chest CT with Few-shot Vision-Language Ternary Classification Model. | [41422131](https://pubmed.ncbi.nlm.nih.gov/41422131/) |
| 2025-12-18 | 面向患者的沟通、教育与问答 | Personalizing prostate cancer education for patients using an EHR-Integrated LLM agent. | [41413170](https://pubmed.ncbi.nlm.nih.gov/41413170/) |
| 2025-12-17 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A Representation Fusion Framework for Decoupling Diagnostic Information in Multimodal Learning. | [41408105](https://pubmed.ncbi.nlm.nih.gov/41408105/) |
| 2025-12-16 | 模型开发与技术方法 | Two-stage prompting framework with predefined verification steps for evaluating diagnostic reasoning tasks on two datasets. | [41402582](https://pubmed.ncbi.nlm.nih.gov/41402582/) |
| 2025-12-16 | 临床决策支持与诊断/分诊推理 | Exploiting large language models for diagnosing autism associated language disorders and identifying distinct features. | [41402439](https://pubmed.ncbi.nlm.nih.gov/41402439/) |
| 2025-12-15 | 基准测试、评估方法与模型性能评价 | Evaluating commercial multimodal AI for diabetic eye screening and implications for an alternative regulatory pathway. | [41398461](https://pubmed.ncbi.nlm.nih.gov/41398461/) |
| 2025-12-13 | 模型开发与技术方法 | Enhancing privacy-preserving deployable large language models for perioperative complication detection: a targeted strategy with LoRA fine-tuning. | [41390570](https://pubmed.ncbi.nlm.nih.gov/41390570/) |
| 2025-12-12 | 临床决策支持与诊断/分诊推理 | Efficacy of large language models in detecting postoperative delirium from unstructured clinical notes: A retrospective cohort study. | [41388138](https://pubmed.ncbi.nlm.nih.gov/41388138/) |
| 2025-12-11 | 公共卫生、流行病学监测与健康公平 | Effects of a smartphone-based chatbot intervention on influenza and COVID-19 vaccine uptake among South Asians. | [41381754](https://pubmed.ncbi.nlm.nih.gov/41381754/) |
| 2025-12-10 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | EchoGraph system for automated quality assessment of echocardiography reports. | [41372462](https://pubmed.ncbi.nlm.nih.gov/41372462/) |
| 2025-12-09 | 医学智能体（Agentic AI）与多智能体系统 | MoMA: a mixture-of-multimodal-agents architecture for enhancing clinical prediction modelling. | [41366502](https://pubmed.ncbi.nlm.nih.gov/41366502/) |
| 2025-12-08 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Explainable AI-driven precision clinical trial enrichment: demonstration of the NetraAI platform with a phase II depression trial. | [41360997](https://pubmed.ncbi.nlm.nih.gov/41360997/) |
| 2025-12-06 | 基准测试、评估方法与模型性能评价 | Automating expert-level medical reasoning evaluation of large language models. | [41353516](https://pubmed.ncbi.nlm.nih.gov/41353516/) |
| 2025-12-06 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Uncertainty-aware and causal test-time adaptive foundation model for robust colorectal cancer pathology diagnosis. | [41353286](https://pubmed.ncbi.nlm.nih.gov/41353286/) |
| 2025-12-05 | 临床决策支持与诊断/分诊推理 | A typology of physician input approaches to using AI chatbots for clinical decision-making. | [41350807](https://pubmed.ncbi.nlm.nih.gov/41350807/) |
| 2025-12-05 | 治理、监管、伦理与政策 | If a therapy bot walks like a duck and talks like a duck then it is a medically regulated duck. | [41350404](https://pubmed.ncbi.nlm.nih.gov/41350404/) |
| 2025-12-02 | 面向患者的沟通、教育与问答 | A randomized pilot study evaluating socially assistive robot effects on patient engagement and care quality. | [41331089](https://pubmed.ncbi.nlm.nih.gov/41331089/) |
| 2025-11-28 | 临床文书、环境记录与EHR信息抽取 | Leveraging large language models to extract smoking history from clinical notes for lung cancer surveillance. | [41315854](https://pubmed.ncbi.nlm.nih.gov/41315854/) |
| 2025-11-28 | 治理、监管、伦理与政策 | Policy brief: AI-first Medicaid: how CMS can build a smarter safety net with Precision Benefits. | [41315760](https://pubmed.ncbi.nlm.nih.gov/41315760/) |
| 2025-11-28 | 临床文书、环境记录与EHR信息抽取 | Enhancing clinical documentation with voice processing and large language models: a study on the LAOS system. | [41315671](https://pubmed.ncbi.nlm.nih.gov/41315671/) |
| 2025-11-27 | 基准测试、评估方法与模型性能评价 | Benchmarking proprietary and open-source language and vision-language models for gastroenterology clinical reasoning. | [41310206](https://pubmed.ncbi.nlm.nih.gov/41310206/) |
| 2025-11-27 | 基准测试、评估方法与模型性能评价 | Understanding the robustness of vision-language models to medical image artefacts. | [41309994](https://pubmed.ncbi.nlm.nih.gov/41309994/) |
| 2025-11-25 | 公共卫生、流行病学监测与健康公平 | Changes in public perception of artificial intelligence in healthcare after exposure to ChatGPT. | [41290943](https://pubmed.ncbi.nlm.nih.gov/41290943/) |
| 2025-11-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Multimodal analysis of whole slide images in colorectal cancer. | [41286436](https://pubmed.ncbi.nlm.nih.gov/41286436/) |
| 2025-11-21 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | From pretraining to privacy: federated ultrasound foundation model with self-supervised learning. | [41272022](https://pubmed.ncbi.nlm.nih.gov/41272022/) |
| 2025-11-20 | 多模态与视觉-语言医学大模型 | PlaqueCap: lesion-centered captioning of atherosclerotic plaques in intravascular ultrasound using vision-language models and prompt injection. | [41266555](https://pubmed.ncbi.nlm.nih.gov/41266555/) |
| 2025-11-20 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Natural language processing techniques to detect delirium in hospitalized patients from clinical notes: a systematic review. | [41266514](https://pubmed.ncbi.nlm.nih.gov/41266514/) |
| 2025-11-19 | 多模态与视觉-语言医学大模型 | Diagnosis of cardiac conditions from 12-lead electrocardiogram through natural language supervision. | [41261169](https://pubmed.ncbi.nlm.nih.gov/41261169/) |
| 2025-11-19 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | PathOrchestra: a comprehensive foundation model for computational pathology with over 100 diverse clinical-grade tasks. | [41258399](https://pubmed.ncbi.nlm.nih.gov/41258399/) |
| 2025-11-18 | 科研辅助与循证医学 | AI and innovation in clinical trials. | [41254234](https://pubmed.ncbi.nlm.nih.gov/41254234/) |
| 2025-11-18 | 模型开发与技术方法 | Large language models driven neural architecture search for universal and lightweight disease diagnosis on histopathology slide images. | [41254215](https://pubmed.ncbi.nlm.nih.gov/41254215/) |
| 2025-11-18 | 安全性、偏倚、幻觉与红队测试 | Uncertainty-aware large language models for explainable disease diagnosis. | [41254208](https://pubmed.ncbi.nlm.nih.gov/41254208/) |
| 2025-11-18 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Matters arising: Utilizing foundation models for developing clinical tools. | [41254183](https://pubmed.ncbi.nlm.nih.gov/41254183/) |
| 2025-11-18 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Reply to: Utilizing foundation models for developing clinical tools. | [41254165](https://pubmed.ncbi.nlm.nih.gov/41254165/) |
| 2025-11-17 | 面向患者的沟通、教育与问答 | Can co-designed educational interventions help consumers think critically about asking ChatGPT health questions? Results from a randomised-controlled trial. | [41249473](https://pubmed.ncbi.nlm.nih.gov/41249473/) |
| 2025-11-17 | 公共卫生、流行病学监测与健康公平 | A large language model-based approach to quantifying the effects of social determinants in liver transplant decisions. | [41249463](https://pubmed.ncbi.nlm.nih.gov/41249463/) |
| 2025-11-17 | 基准测试、评估方法与模型性能评价 | Evaluating the diagnostic accuracy of vision language models for neuroradiological image interpretation. | [41249440](https://pubmed.ncbi.nlm.nih.gov/41249440/) |
| 2025-11-17 | 多模态与视觉-语言医学大模型 | SpeechCARE: dynamic multimodal modeling for cognitive screening in diverse linguistic and speech task contexts. | [41249382](https://pubmed.ncbi.nlm.nih.gov/41249382/) |
| 2025-11-17 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | EVA-X: a foundation model for general chest x-ray analysis with self-supervised learning. | [41249470](https://pubmed.ncbi.nlm.nih.gov/41249470/) |
| 2025-11-17 | 治理、监管、伦理与政策 | Promoting xenomorphic patient-facing AIs: The case against anthropomorphism in medical AIs. | [41249441](https://pubmed.ncbi.nlm.nih.gov/41249441/) |
| 2025-11-14 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | STPath: a generative foundation model for integrating spatial transcriptomics and whole-slide images. | [41238784](https://pubmed.ncbi.nlm.nih.gov/41238784/) |
| 2025-11-12 | 安全性、偏倚、幻觉与红队测试 | Reply to "When do large language models cross the line: "reasoning" red teaming in healthcare". | [41224964](https://pubmed.ncbi.nlm.nih.gov/41224964/) |
| 2025-11-12 | 安全性、偏倚、幻觉与红队测试 | Reasoning red teaming in healthcare not all paths to a desired outcome are desirable. | [41224856](https://pubmed.ncbi.nlm.nih.gov/41224856/) |
| 2025-11-07 | 治理、监管、伦理与政策 | Reporting guidelines for studies involving generative artificial intelligence applications: what do I use, and when? | [41203886](https://pubmed.ncbi.nlm.nih.gov/41203886/) |
| 2025-11-06 | 安全性、偏倚、幻觉与红队测试 | The perils of politeness: how large language models may amplify medical misinformation. | [41198821](https://pubmed.ncbi.nlm.nih.gov/41198821/) |
| 2025-11-05 | 基准测试、评估方法与模型性能评价 | Evaluating clinical AI summaries with large language models as judges. | [41193667](https://pubmed.ncbi.nlm.nih.gov/41193667/) |
| 2025-11-04 | 医学教育与培训 | A generative AI teaching assistant for personalized learning in medical education. | [41188616](https://pubmed.ncbi.nlm.nih.gov/41188616/) |
| 2025-10-27 | 基准测试、评估方法与模型性能评价 | Benchmarking large language models for personalized, biomarker-based health intervention recommendations. | [41145883](https://pubmed.ncbi.nlm.nih.gov/41145883/) |
| 2025-10-27 | 面向患者的沟通、教育与问答 | Do we need AI guardians to protect us from health information overload? | [41145602](https://pubmed.ncbi.nlm.nih.gov/41145602/) |
| 2025-10-24 | 临床决策支持与诊断/分诊推理 | Artificial intelligence for autoimmune diseases. | [41136754](https://pubmed.ncbi.nlm.nih.gov/41136754/) |
| 2025-10-24 | 面向患者的沟通、教育与问答 | Evaluating human-in-the-loop strategies for artificial intelligence-enabled translation of patient discharge instructions: a multidisciplinary analysis. | [41136708](https://pubmed.ncbi.nlm.nih.gov/41136708/) |
| 2025-10-23 | 多模态与视觉-语言医学大模型 | HONeYBEE: enabling scalable multimodal AI in oncology through foundation model-driven embeddings. | [41131352](https://pubmed.ncbi.nlm.nih.gov/41131352/) |
| 2025-10-23 | 面向患者的沟通、教育与问答 | Reimagining patient-reported outcomes in the age of generative AI. | [41131097](https://pubmed.ncbi.nlm.nih.gov/41131097/) |
| 2025-10-20 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A deep learning based automatic report generator for retinal optical coherence tomography images. | [41115948](https://pubmed.ncbi.nlm.nih.gov/41115948/) |
| 2025-10-17 | 安全性、偏倚、幻觉与红队测试 | When helpfulness backfires: LLMs and the risk of false medical information due to sycophantic behavior. | [41107408](https://pubmed.ncbi.nlm.nih.gov/41107408/) |
| 2025-10-16 | 多模态与视觉-语言医学大模型 | Evaluating the performance of general purpose large language models in identifying human facial emotions. | [41102392](https://pubmed.ncbi.nlm.nih.gov/41102392/) |
| 2025-10-08 | 模型开发与技术方法 | Publisher Correction: Graph retrieval augmented large language models for facial phenotype associated rare genetic disease. | [41062673](https://pubmed.ncbi.nlm.nih.gov/41062673/) |
| 2025-10-07 | 基准测试、评估方法与模型性能评价 | The evaluation illusion of large language models in medicine. | [41057566](https://pubmed.ncbi.nlm.nih.gov/41057566/) |
| 2025-10-07 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Using a fine-tuned large language model for symptom-based depression evaluation. | [41057559](https://pubmed.ncbi.nlm.nih.gov/41057559/) |
| 2025-10-06 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Personalised modelling of routine variability and affective states. | [41053272](https://pubmed.ncbi.nlm.nih.gov/41053272/) |
| 2025-10-02 | 安全性、偏倚、幻觉与红队测试 | A longitudinal analysis of declining medical safety messaging in generative AI models. | [41038984](https://pubmed.ncbi.nlm.nih.gov/41038984/) |
| 2025-10-02 | 临床文书、环境记录与EHR信息抽取 | Utilization of Generative AI-drafted Responses for Managing Patient-Provider Communication. | [41038966](https://pubmed.ncbi.nlm.nih.gov/41038966/) |
| 2025-10-01 | 预测建模与EHR表示学习 | Large language models forecast patient health trajectories enabling digital twins. | [41034564](https://pubmed.ncbi.nlm.nih.gov/41034564/) |
| 2025-09-30 | 治理、监管、伦理与政策 | Operationalizing machine-assisted translation in healthcare. | [41028827](https://pubmed.ncbi.nlm.nih.gov/41028827/) |
| 2025-09-30 | 精神心理健康与行为干预 | Optimizing large language models for detecting symptoms of depression/anxiety in chronic diseases patient communications. | [41028413](https://pubmed.ncbi.nlm.nih.gov/41028413/) |
| 2025-09-30 | 模型开发与技术方法 | Generative AI costs in large healthcare systems, an example in revenue cycle. | [41028226](https://pubmed.ncbi.nlm.nih.gov/41028226/) |
| 2025-09-30 | 面向患者的沟通、教育与问答 | Transforming healthcare delivery with conversational AI platforms. | [41028209](https://pubmed.ncbi.nlm.nih.gov/41028209/) |
| 2025-09-30 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Optimizing retinal images based carotid atherosclerosis prediction with explainable foundation models. | [41028180](https://pubmed.ncbi.nlm.nih.gov/41028180/) |
| 2025-09-26 | 模型开发与技术方法 | TIMER: temporal instruction modeling and evaluation for longitudinal clinical records. | [41006898](https://pubmed.ncbi.nlm.nih.gov/41006898/) |
| 2025-09-25 | 安全性、偏倚、幻觉与红队测试 | Quality safety and disparity of an AI chatbot in managing chronic diseases: simulated patient experiments. | [40999038](https://pubmed.ncbi.nlm.nih.gov/40999038/) |
| 2025-09-25 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Multimodal foundation model and benchmark for comprehensive retinal OCT image analysis. | [40999048](https://pubmed.ncbi.nlm.nih.gov/40999048/) |
| 2025-09-24 | 多模态与视觉-语言医学大模型 | NeoCLIP: a self-supervised foundation model for the interpretation of neonatal radiographs. | [40993183](https://pubmed.ncbi.nlm.nih.gov/40993183/) |
| 2025-09-24 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Embedded framework for clinical medical image segment anything in resource limited healthcare regions. | [40993173](https://pubmed.ncbi.nlm.nih.gov/40993173/) |
| 2025-09-24 | 安全性、偏倚、幻觉与红队测试 | Beyond human ears: navigating the uncharted risks of AI scribes in clinical practice. | [40993221](https://pubmed.ncbi.nlm.nih.gov/40993221/) |
| 2025-09-02 | 多模态与视觉-语言医学大模型 | Large-vocabulary segmentation for medical images with text prompts. | [40897901](https://pubmed.ncbi.nlm.nih.gov/40897901/) |
| 2025-08-29 | 治理、监管、伦理与政策 | Robustness tests for biomedical foundation models should tailor to specifications. | [40883427](https://pubmed.ncbi.nlm.nih.gov/40883427/) |
| 2025-08-28 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Emphysema progression risk in COPD using a localized foundational model of density evolution. | [40877584](https://pubmed.ncbi.nlm.nih.gov/40877584/) |
| 2025-08-27 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | AI assisted prediction of unplanned intensive care admissions using natural language processing in elective neurosurgery. | [40858789](https://pubmed.ncbi.nlm.nih.gov/40858789/) |
| 2025-08-26 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Predicting opioid consumption after surgical discharge: a multinational derivation and validation study using a foundation model. | [40858986](https://pubmed.ncbi.nlm.nih.gov/40858986/) |
| 2025-08-24 | 模型开发与技术方法 | Graph retrieval augmented large language models for facial phenotype associated rare genetic disease. | [40849403](https://pubmed.ncbi.nlm.nih.gov/40849403/) |
| 2025-08-24 | 医学智能体（Agentic AI）与多智能体系统 | CARE-AD: a multi-agent large language model framework for Alzheimer's disease prediction using longitudinal clinical notes. | [40849361](https://pubmed.ncbi.nlm.nih.gov/40849361/) |
| 2025-08-20 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A novel sequence-based transformer model architecture for integrating multi-omics data in preterm birth risk prediction. | [40835718](https://pubmed.ncbi.nlm.nih.gov/40835718/) |
| 2025-08-19 | 多模态与视觉-语言医学大模型 | Specialized curricula for training vision language models in retinal image analysis. | [40830259](https://pubmed.ncbi.nlm.nih.gov/40830259/) |
| 2025-08-18 | 治理、监管、伦理与政策 | Peer perceptions of clinicians using generative AI in medical decision-making. | [40826224](https://pubmed.ncbi.nlm.nih.gov/40826224/) |
| 2025-08-18 | 临床决策支持与诊断/分诊推理 | Usability and adoption in a randomized trial of GutGPT a GenAI tool for gastrointestinal bleeding. | [40825997](https://pubmed.ncbi.nlm.nih.gov/40825997/) |
| 2025-08-18 | 临床决策支持与诊断/分诊推理 | Incorporating large language models as clinical decision support in oncology: the Woollie model. | [40825846](https://pubmed.ncbi.nlm.nih.gov/40825846/) |
| 2025-08-16 | 治理、监管、伦理与政策 | Foundation models in medicine are a social experiment: time for an ethical framework. | [40819001](https://pubmed.ncbi.nlm.nih.gov/40819001/) |
| 2025-08-13 | 临床文书、环境记录与EHR信息抽取 | Leveraging large language models for the deidentification and temporal normalization of sensitive health information in electronic health records. | [40804132](https://pubmed.ncbi.nlm.nih.gov/40804132/) |
| 2025-08-10 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Multimodal machine learning for risk-stratified bundled payments in spinal surgery. | [40783461](https://pubmed.ncbi.nlm.nih.gov/40783461/) |
| 2025-08-08 | 科研辅助与循证医学 | Accelerating clinical evidence synthesis with large language models. | [40775042](https://pubmed.ncbi.nlm.nih.gov/40775042/) |
| 2025-08-04 | 医学教育与培训 | A large language model digital patient system enhances ophthalmology history taking skills. | [40760042](https://pubmed.ncbi.nlm.nih.gov/40760042/) |
| 2025-08-01 | 临床文书、环境记录与EHR信息抽取 | Keyword-based AI assistance in the generation of radiology reports: A pilot study. | [40750683](https://pubmed.ncbi.nlm.nih.gov/40750683/) |
| 2025-07-30 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | A scoping review of artificial intelligence applications in clinical trial risk assessment. | [40731070](https://pubmed.ncbi.nlm.nih.gov/40731070/) |
| 2025-07-29 | 基准测试、评估方法与模型性能评价 | Evaluation of performance of generative large language models for stroke care. | [40730644](https://pubmed.ncbi.nlm.nih.gov/40730644/) |
| 2025-07-23 | 模型开发与技术方法 | Synthetic data trained open-source language models are feasible alternatives to proprietary models for radiology reporting. | [40702278](https://pubmed.ncbi.nlm.nih.gov/40702278/) |
| 2025-07-22 | 安全性、偏倚、幻觉与红队测试 | Pitfalls of large language models in medical ethics reasoning. | [40696098](https://pubmed.ncbi.nlm.nih.gov/40696098/) |
| 2025-07-22 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Re-identification of patients from imaging features extracted by foundation models. | [40696111](https://pubmed.ncbi.nlm.nih.gov/40696111/) |
| 2025-07-21 | 预测建模与EHR表示学习 | Enhancing EHR-based pancreatic cancer prediction with LLM-derived embeddings. | [40691317](https://pubmed.ncbi.nlm.nih.gov/40691317/) |
| 2025-07-21 | 临床文书、环境记录与EHR信息抽取 | Clinical and economic impact of a large language model in perioperative medicine: a randomized crossover trial. | [40691284](https://pubmed.ncbi.nlm.nih.gov/40691284/) |
| 2025-07-21 | 临床决策支持与诊断/分诊推理 | Evaluating the role of large language models in traditional Chinese medicine diagnosis and treatment recommendations. | [40691277](https://pubmed.ncbi.nlm.nih.gov/40691277/) |
| 2025-07-20 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | An end-to-end multifunctional AI platform for intraoperative diagnosis. | [40685437](https://pubmed.ncbi.nlm.nih.gov/40685437/) |
| 2025-07-19 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Demographic inaccuracies and biases in the depiction of patients by artificial intelligence text-to-image generators. | [40683994](https://pubmed.ncbi.nlm.nih.gov/40683994/) |
| 2025-07-17 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Identifying clusters of people with Multiple Long-Term Conditions using Large Language Models: a population-based study. | [40676244](https://pubmed.ncbi.nlm.nih.gov/40676244/) |
| 2025-07-17 | 临床决策支持与诊断/分诊推理 | Large language model integrations in cancer decision-making: a systematic review and meta-analysis. | [40676129](https://pubmed.ncbi.nlm.nih.gov/40676129/) |
| 2025-07-14 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | X-ray2CTPA: leveraging diffusion models to enhance pulmonary embolism classification. | [40659838](https://pubmed.ncbi.nlm.nih.gov/40659838/) |
| 2025-07-14 | 科研辅助与循证医学 | Will AI become our Co-PI? | [40659716](https://pubmed.ncbi.nlm.nih.gov/40659716/) |
| 2025-07-12 | 多模态与视觉-语言医学大模型 | Vision-language model for report generation and outcome prediction in CT pulmonary angiogram. | [40652098](https://pubmed.ncbi.nlm.nih.gov/40652098/) |
| 2025-07-11 | 模型开发与技术方法 | A perspective for adapting generalist AI to specialized medical AI applications and their challenges. | [40646157](https://pubmed.ncbi.nlm.nih.gov/40646157/) |
| 2025-07-11 | 医学教育与培训 | Generative artificial intelligence: the 'more knowledgeable other' in a social constructivist framework of medical education. | [40646156](https://pubmed.ncbi.nlm.nih.gov/40646156/) |
| 2025-07-10 | 安全性、偏倚、幻觉与红队测试 | Cognitive bias in clinical large language models. | [40640549](https://pubmed.ncbi.nlm.nih.gov/40640549/) |
| 2025-07-10 | 基准测试、评估方法与模型性能评价 | Benchmarking vision-language models for diagnostics in emergency and critical care settings. | [40640347](https://pubmed.ncbi.nlm.nih.gov/40640347/) |
| 2025-07-09 | 预测建模与EHR表示学习 | Large language models-enabled digital twins for precision medicine in rare gynecological tumors. | [40634659](https://pubmed.ncbi.nlm.nih.gov/40634659/) |
| 2025-07-08 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | Digital transformation with clinical alerts and personalized care systems in an integrated value based model. | [40629133](https://pubmed.ncbi.nlm.nih.gov/40629133/) |
| 2025-07-07 | 安全性、偏倚、幻觉与红队测试 | Framework for bias evaluation in large language models in healthcare settings. | [40624264](https://pubmed.ncbi.nlm.nih.gov/40624264/) |
| 2025-07-04 | 治理、监管、伦理与政策 | Responsible Artificial Intelligence governance in oncology. | [40615544](https://pubmed.ncbi.nlm.nih.gov/40615544/) |
| 2025-07-03 | 临床文书、环境记录与EHR信息抽取 | A GPT-4o-powered framework for identifying cognitive impairment stages in electronic health records. | [40610683](https://pubmed.ncbi.nlm.nih.gov/40610683/) |
| 2025-07-02 | 预测建模与EHR表示学习 | Clinical decision support using pseudo-notes from multiple streams of EHR data. | [40604255](https://pubmed.ncbi.nlm.nih.gov/40604255/) |
| 2025-07-02 | 预测建模与EHR表示学习 | Large language model trained on clinical oncology data predicts cancer progression. | [40604229](https://pubmed.ncbi.nlm.nih.gov/40604229/) |
| 2025-07-02 | 模型开发与技术方法 | Retrieval-augmented generation elevates local LLM quality in radiology contrast media consultation. | [40604147](https://pubmed.ncbi.nlm.nih.gov/40604147/) |
| 2025-07-02 | 多模态与视觉-语言医学大模型 | Generative artificial intelligence for fundus fluorescein angiography interpretation and human expert evaluation. | [40603524](https://pubmed.ncbi.nlm.nih.gov/40603524/) |
| 2025-07-01 | 【边缘相关】非语言基础模型、生成式影像与经典NLP | How AI is used in FDA-authorized medical devices: a taxonomy across 1,016 authorizations. | [40596700](https://pubmed.ncbi.nlm.nih.gov/40596700/) |
| 2025-07-01 | 面向患者的沟通、教育与问答 | LLM enabled classification of patient self-reported symptoms and needs in health systems across the USA. | [40595018](https://pubmed.ncbi.nlm.nih.gov/40595018/) |

---

## 附录二：同系姊妹刊命中的同主题文献（3 篇，非目标期刊，仅供参考）

> 目标期刊为 **npj Digital Medicine**。以下文献出自同系新刊 npj Digital Public Health / npj Digital Surgery，主题同属医学 LLM/Agent，一并列出以备参考，**不计入正文统计**。

### 1. 整合虚拟现实与大语言模型的手术室团队非技术技能训练与评估

*Integrating virtual reality and large language models for team-based non-technical skills training and evaluation in the operating room.*

**npj Digital Surgery** · 2026-06-04 · 原创研究 · [PMID 42254077](https://pubmed.ncbi.nlm.nih.gov/42254077/) · [DOI](https://doi.org/10.1038/s44484-026-00009-3)

研究提出VORTeX，一个多人虚拟现实平台，将沉浸式团队模拟与LLM分析结合，用于训练与评估沟通、决策、团队协作和领导力。团队对话由源自NOTSS框架的结构化提示进行分析，可自动分类行为并生成量化沟通结构与层级的有向交互图；平台实现了气胸与腹腔内出血两个腹腔镜急症场景以诱发真实压力与协作。12名外科专业人员在2024年SAGES会议上完成试点，评价平台直观、沉浸且对培养团队协作与沟通有价值；LLM稳定产出可解释的沟通网络，呈现出外科医生为中心整合者、护士为发起者、麻醉医师为平衡中介者的预期手术层级结构。

> **要点**：12名外科人员试点验证VR+LLM可自动生成可解释的团队沟通网络，实现非技术技能的客观评估与自动化复盘。

### 2. 利用多语言语言模型进行跨语言迁移以从社交媒体文本中检测流感样疾病

*Cross-lingual transfer with multilingual language models for influenza-like-illness detection in social media texts.*

**npj Digital Public Health** · 2026-06-03 · 原创研究 · [PMID 42257039](https://pubmed.ncbi.nlm.nih.gov/42257039/) · [DOI](https://doi.org/10.1038/s44482-026-00020-y)

研究构建了首个类别平衡的多语言流感样疾病(ILI)检测标注数据集MuILI，包含5种主要欧洲语言的4284条推文，用以检验单一多语言分类器能否跨国家、语言与流感季稳定提取ILI信号（法国2014–2023共9个流感季，意大利、西班牙、德国2018–2023共5个季）。研究比较了5个微调的多语言掩码语言模型、3种跨语言迁移策略与4种基于解码器大模型的上下文学习技术：领域适配的Bernice设定基准性能（F1=0.87），仅用法语数据的translate-train（F1=0.85）与model-transfer（F1=0.84）表现相当，西班牙语translate-train亦达F1=0.84；LLM中仅Qwen2.5-72B-Instruct超过基准（F1=0.88–0.90）。基准分类器所得ILI信号与官方就诊率的Spearman互相关显示良好的实时一致性，但在疫情扰动期有所波动。

> **要点**：多语言模型可扩展社交媒体ILI监测：Bernice F1=0.87，Qwen2.5-72B-Instruct达F1 0.88–0.90但计算成本高昂。

### 3. 使用AI智能体评估肿瘤患者的术前衰弱

*Use of AI agents to assess preoperative frailty in cancer patients.*

**npj Digital Surgery** · 2026-06-03 · 原创研究 · [PMID 42254078](https://pubmed.ncbi.nlm.nih.gov/42254078/) · [DOI](https://doi.org/10.1038/s44484-026-00012-8)

研究利用手术前60天内记录的真实术前病历，比较智能体式LLM系统与单一LLM系统在肝胆胰(HPB)及胃肠(GI)恶性肿瘤大手术患者中计算衰弱评分与判定衰弱状态的表现。在二分类衰弱判定任务中，智能体系统在6个模型中的4个优于单LLM系统；在生成风险评估指数(RAI)评分任务中，6个模型中有5个更优；提升幅度最大的是低参数量模型（Llama 3.1 8b、Qwen 2.5 7b）。作者认为从EHR自动化计算衰弱评分可提升临床效率并支撑针对性的预康复策略。

> **要点**：智能体式工作流在多数模型上优于单一LLM完成术前衰弱评分与分级，低参数模型获益最显著。

---

*本报告由自动化文献追踪流程生成：PubMed E-utilities 全量抓取 → 宽召回正则筛选 → 未命中文献逐条漏检反查 → 逐篇摘要研判与分类 → Crossref 交叉校验。*