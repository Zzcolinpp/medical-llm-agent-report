# 多期刊 · 手术 + AI 专题文献追踪报告

> **检索日期**：2026-07-16  
> **追踪窗口**：2025-07-01 — 2026-07-14（近一年）  
> **目标期刊**：AI/数字医学刊（Nature Medicine 1546-170X、Nature Biomedical Engineering 2157-846X、Nature Machine Intelligence 2522-5839、The Lancet Digital Health 2589-7500、npj Digital Medicine 2398-6352、NEJM AI 2836-9386、Cell Reports Medicine 2666-3791）+ CNS 正刊及大子刊（Nature 1476-4687、Science 1095-9203、Cell 0092-8674、Nature Communications 2041-1723、Science Translational Medicine 1946-6242、Science Advances 2375-2548）+ 顶级外科刊（JAMA Surgery 2168-6254、Annals of Surgery 0003-4932、British Journal of Surgery 0007-1323、International Journal of Surgery 1743-9191）  
> **预印本**：arXiv + medRxiv/bioRxiv（单列，标注为预印本）  
> **数据来源**：PubMed / NCBI E-utilities 全量抓取 + Crossref 官方 DOI 交叉校验 + Europe PMC/arXiv 预印本检索  
> **专题范围**：外科/手术/操作/介入/围手术期 与 人工智能/机器学习/深度学习/影像组学/大语言模型/手术机器人 的交叉


---

## 检索与筛选策略（可复现）

本报告为达成「不遗漏任何一篇相关主题文章」，采用**全量抓取 + 双轴宽召回 + 漏检反查 + 双源交叉校验**的五步法，并针对多期刊规模做了「只在稳定词表轴（外科）上设闸、绝不在易变体轴（AI）上设闸」的适配。

1. **全量抓取（PubMed E-utilities，不加主题限制）**：对 AI/数字医学刊与外科专科刊（共 11 刊）在窗口内**全量**抓取；对 6 本 CNS 综合大刊（Nature/Science/Cell/Nat Commun/Sci Transl Med/Sci Adv，窗口内合计约 25,750 篇），因综合刊中「手术+AI」为极小众，遂在 esearch 层**仅按外科轴设闸**（MeSH `Surgical Procedures, Operative` 展开 + `/surgery` 副主题词 + 宽 tiab 外科词表——外科术语可枚举、MeSH 索引完整，漏检风险低），得到外科相关子集后再抓全文摘要。**AI 轴自始至终不设闸**，一律抓全摘要后用宽正则+子代理反查，正是易变体轴需要的保护。全量抓取合计 **8,018 篇**。DOI 仅取文章自身（`PubmedData/ArticleIdList/ArticleId[@IdType='doi']`，兜底 `ELocationID`），规避「抓到参考文献 DOI」的陷阱。
2. **双轴宽召回正则**：外科轴（surgery/surgical/operative/resection/laparoscop/anastomos/-ectomy 等 40+ 模式）× AI 轴（Tier-1 强词 AI/ML/DL/CNN/LLM/foundation model 等 + Tier-2 扩展 random forest/XGBoost/segmentation/radiomics/computer-aided 等）。外科刊只需 AI 轴命中即入候选（外科由刊别保证），综合刊需双轴命中。初步候选池 **1,141 篇**。
3. **漏检反查（关键一步，绝不可省）**：对未命中 AI 轴的外科语境文献 + 未命中外科轴的 AI 文献，共 **5,419 篇**残差，先用 AI 变体正则（GenAI/agentic/autonomous/reasoning model/LASSO/data-mining 等词表外表述）自动追回 **71 篇**，再派 **18 个子代理**逐条筛查剩余 5,348 篇标题+摘要片段，**追回 142 篇**关键词表漏掉的真实相关文献。
4. **逐篇摘要研判与分类**：对合并候选池逐篇读摘要，判 `core`/`peripheral`/`exclude` 三档并归入 14 个主题类目（peripheral 单列）。并行化：切成每批 ≤48 篇，派多个子代理并行处理，输出 JSONL 落盘、仅回报计数（摘要正文不流经主上下文）。
5. **双源交叉校验（查 PubMed 自身的漏）**：用 Crossref 官方 DOI 全量列表逐刊比对（标准化标题+DOI 双键匹配，规避 DOI 解析误差导致的假阳性），得 Crossref 独有候选 **539 篇**，经 3 个子代理确认 + 人工复核（剔除 BJS/IJS 会议摘要集与 Nature Communications 等的物理/材料/组学离题假阳性），**并入 43 篇**真正的手术+AI 论文（多为 Int J Surg 近 48 小时 PubMed 未及索引的新论文，及 Nature Communications 的"自主颈动脉超声机器人""根治性肾切除深度学习预后"等）。**关于欠索引刊**：Nature Machine Intelligence（PubMed 索引 14 篇 vs Crossref 229 篇）与 NEJM AI（PubMed 19 vs Crossref 141）在 PubMed 严重欠索引，已逐条核对其 Crossref 全表的手术相关条目——其中真正的手术AI论文（如 NEJM AI 的"AI 引导手术备血""AI 辅助外科出院""阑尾切除手术视频群体学习"、Nat Mach Intell 的"合成 X 线微型器械追踪"）实际均已被主源 PubMed 抓取并纳入正文，无遗漏。
   **预印本**：用 Europe PMC（`SRC:PPR`，覆盖 medRxiv/bioRxiv）+ arXiv API（cs.CV/AI/LG/RO/eess.IV 等）以外科×AI 双词检索，得 medRxiv/bioRxiv 198 篇 + arXiv 标题含外科词 507 篇；Research Square、Preprints.org、SSRN 等低选择性服务器（EPMC 命中 766 篇）依「高影响力预印本」标准不计入，单列为预印本章节。

**最终纳入**：期刊论文 **core 426 篇 + peripheral 356 篇（合计 782）**；预印本 **core 437 + 边缘 104 篇（合计 541）**；排除误召回 763 篇（含会议摘要、物理/组学离题假阳性、无AI成分的纯外科研究、非手术语境临床AI）。全流程：全量抓取 8,018 → 双轴候选 1,141 + 变体正则追回 71 + 子代理漏检追回 142 + Crossref 补入 43 + 预印本 705 = 待判 2,062（去重后 2,086 含少量重叠）→ 分类为 core 863 / peripheral 460 / exclude 763。


## 一图速览：文献分布

| 分类 | 篇数 |
|---|---:|
| 一、术中导航、引导与增强现实 | 36 |
| 二、手术视频理解与技能评估 | 22 |
| 三、手术机器人与自主操作 | 10 |
| 四、手术规划、数字孪生与三维建模 | 14 |
| 五、术前诊断、影像AI与可切除性评估 | 71 |
| 六、数字病理与影像组学（外科肿瘤） | 55 |
| 七、术后结局、并发症与手术风险预测 | 116 |
| 八、分诊、急诊外科与围手术期流程 | 8 |
| 九、移植相关AI | 16 |
| 十、麻醉、围手术期监测与外科ICU | 1 |
| 十一、大语言模型与生成式AI（外科应用） | 27 |
| 十二、外科教育、培训与模拟 | 9 |
| 十三、治理、监管、伦理与评价/基准方法 | 37 |
| 十四、模型开发与技术方法（外科语境） | 4 |
| （边缘相关，单列） | 356 |
| **期刊论文正文合计（core+peripheral）** | **782** |
| 预印本（core+peripheral，单列） | 541 |


## 一、术中导航、引导与增强现实（36 篇）

### 1. 用视频分割AI模型实现腹腔镜肝切除术中实时解剖识别

*Real-time anatomy recognition in laparoscopic liver resection using video segmentation AI model.*

**npj Digital Medicine** · 2026-07-10 · 多中心模型开发与验证研究 · [PMID 42432115](https://pubmed.ncbi.nlm.nih.gov/42432115/) · [DOI](https://doi.org/10.1038/s41746-026-02989-5)

多中心研究,基于Mamba架构的视频分割模型Vivim在45段视频、15,865帧标注数据上训练,用于腹腔镜肝切除术中实时识别Glissonean蒂(GP)与肝静脉(HV)。Vivim在单/多目标分割Dice分别为0.71/0.66,25 fps实时推理,优于U-Net、nnU-Net、SegFormer、ViViT等图像/视频基线,跨中心外部测试泛化良好;13名外科医生验证显示其提升识别速度与准确性,辅助术中决策。

> **要点**：Mamba视频分割模型实时(25fps)识别腹腔镜肝切除关键血管(Dice 0.71),辅助术中导航。


### 2. 单次增强现实引导定位切除疑似早期肺癌的随机对照试验

*Single-Encounter Augmented Reality-Guided Localization for Resection of Suspected Early-Stage Lung Cancer: A Randomized Clinical Trial.*

**JAMA Surgery** · 2026-07-08 · 多中心随机非劣效性试验 · [PMID 42418181](https://pubmed.ncbi.nlm.nih.gov/42418181/) · [DOI](https://doi.org/10.1001/jamasurg.2026.2516)

中国5中心随机非劣效试验，296例随机、270例纳入改良ITT分析(AR组134、CT组136)，比较单次AR引导经皮定位与多次CT引导定位用于亚肺叶切除。成功亚肺叶切除率AR 98.5% vs CT 99.3%(风险差-0.8个百分点，95%CI -2.7~3.9，达非劣效)；定位误差两组中位均3.0；AR组辐射剂量更低(456.50 vs 1260.11 mGy·cm，P<.001)、术前疼痛更轻(NRS 0 vs 5，P<.001)、穿刺时间更短(0.63 vs 6.50分钟，P<.001)、定位至切皮间隔更短(2.00 vs 33.50分钟，P<.001)；CT组气胸29.4%。

> **要点**：单次AR引导定位对亚肺叶切除非劣于CT引导，并显著降低辐射、疼痛与流程时间。


### 3. 增强现实、胸外科与改善患者体验（社论）

*Augmented Reality, Thoracic Surgery, and Improving the Patient Experience.*

**JAMA Surgery** · 2026-07-08 · 社论/评论（无数据） · [PMID 42418177](https://pubmed.ncbi.nlm.nih.gov/42418177/) · [DOI](https://doi.org/10.1001/jamasurg.2026.2513)

社论（无数据），配合AR引导肺结节定位RCT，评述增强现实在胸外科中降低辐射、疼痛并改善患者体验的价值与前景。

> **要点**：AR术中定位有望改善胸外科患者体验。


### 4. 在多学科世界中增强现实——作者回复（通信）

*Enhancing Reality in the Multidisciplinary World-Reply.*

**JAMA Surgery** · 2026-07-01 · 通信/回复（无数据） · [PMID 42160089](https://pubmed.ncbi.nlm.nih.gov/42160089/) · [DOI](https://doi.org/10.1001/jamasurg.2026.1496)

作者回复通信（无数据），就外科增强现实(AR)在多学科协作情境中的应用进行讨论与回应。

> **要点**：外科AR多学科应用的讨论回复。


### 5. 在多学科世界中增强现实（通信）

*Enhancing Reality in the Multidisciplinary World.*

**JAMA Surgery** · 2026-07-01 · 通信/评论（无数据） · [PMID 42160068](https://pubmed.ncbi.nlm.nih.gov/42160068/) · [DOI](https://doi.org/10.1001/jamasurg.2026.1493)

读者来信/评论（无数据），讨论外科增强现实(AR)在多学科医疗情境中的意义与局限。

> **要点**：外科AR多学科应用的评论。


### 6. 用人工智能增强外科医生在盆腔淋巴结清扫中的解剖识别

*Enhancing anatomical recognition by surgeons during pelvic lymph node dissection using artificial intelligence.*

**npj Digital Medicine** · 2026-06-30 · 模型开发+读者(外科医生)对照研究 · [PMID 42380252](https://pubmed.ncbi.nlm.nih.gov/42380252/) · [DOI](https://doi.org/10.1038/s41746-026-02936-4)

研究开发AI模型识别盆腔淋巴结清扫(PLND)关键解剖结构,模型在293段PLND视频的23,259幅标注+653幅未标注图像上训练。三折交叉验证Dice为输尿管0.6483、闭孔神经0.8654、髂外动脉0.8619、髂外静脉0.8736;36名结直肠/妇科/泌尿外科不同资历医生审阅640个0.5秒视频片段,AI辅助使其识别的敏感度与特异度均显著提升(p<0.001)。

> **要点**：AI盆腔解剖识别(血管Dice约0.87)显著提升各科各资历术者在PLND中的识别敏感度与特异度。


### 7. 用生成式AI将冰冻切片转换为FFPE图像以评估皮肤癌切除切缘

*Translation of frozen sections into FFPE images for skin cancer resection margins using generative AI.*

**npj Digital Medicine** · 2026-06-29 · 生成式AI开发与验证研究 · [PMID 42373874](https://pubmed.ncbi.nlm.nih.gov/42373874/) · [DOI](https://doi.org/10.1038/s41746-026-02939-1)

研究开发并验证生成式AI将术中冰冻切片图像转换为AI生成FFPE图像(GenFFPE),用于皮肤癌切除术中切缘评估,数据涵盖283例5种皮肤癌共2594张切片。比较CycleGAN、CUT、AIFFPE、SANTA四种非配对图像翻译模型,CUT整体保真度最佳;外部验证与视觉图灵测试(准确率60.2%)证实图像真实感;在55个诊断不一致病例中,基于GenFFPE重新评估使诊断一致性提升53.3%。

> **要点**：生成式AI将冰冻切片转为FFPE辅助皮肤癌术中切缘评估,使不一致病例诊断一致性提升53.3%。


### 8. SPaR-liver：基于几何形变图神经网络的稀疏点感知配准用于术中肝脏形变补偿

*SPaR-liver: sparse point–aware registration for intraoperative liver-deformation compensation using Geometric Deformation Graph Neural Network*

**International Journal of Surgery** · 2026-06-16 · 配准算法开发+术中导航验证 · [DOI](https://doi.org/10.1097/js9.0000000000005304)

方法学研究，提出稀疏点感知配准管线SPaR-Liver(核心为稀疏几何形变图神经网络SGD-GNN)用于图像引导肝脏手术的术中形变补偿。在DIR-Liver数据集上(每半肝5个地标)取得最佳RMSE 1.17mm、Hausdorff距离1.56mm、基准配准误差1.88mm；开放肝脏手术术中验证在无术中影像下达到靶点配准误差7.99±1.56mm。

> **要点**：从稀疏部分肝表面即可实现OR可用的术中形变补偿导航(5-10个地标恢复导航精度)


### 9. AI引导的计算机辅助介入(CAI)系统用于腹腔镜直肠癌手术

*Artificial intelligence-guided computer-aided intervention system for laparoscopic rectal cancer surgery*

**International Journal of Surgery** · 2026-05-06 · 深度学习模型开发+回顾性对照 · [DOI](https://doi.org/10.1097/js9.0000000000005382)

深度学习开发加回顾性对照研究，从386段腹腔镜直肠癌手术视频标注8756张Holy Plane图像与6527张盆腔自主神经(PAN)图像。U-Net识别Holy Plane(DSC 0.898、召回率0.811、像素准确率0.918)，ResNet50-U-Net识别PAN(DSC 0.815、召回率0.794、像素准确率0.823)。以两者为双地标构建CAI系统，CAI辅助组较对照组术中出血更少、并发症率更低、男性性功能障碍发生率更低。

> **要点**：双地标(Holy Plane+PAN)AI术中导航系统可提升腹腔镜直肠癌手术质量与安全性


### 10. 手术室中的环境人工智能：从被动记录到预测性协调

*Ambient Artificial Intelligence in the Operating Room: From Passive Recording to Predictive Coordination.*

**Annals of Surgery** · 2026-04-24 · 评论/观点 · [PMID 42026714](https://pubmed.ncbi.nlm.nih.gov/42026714/) · [DOI](https://doi.org/10.1097/SLA.0000000000007073)

评论/展望类文章(无摘要)，阐述手术室环境AI(ambient AI)从被动记录向预测性协调演进的理念，主张利用手术室内持续感知实现术中流程的预测与协同。属观点性论述、无量化数据。

> **要点**：手术室环境AI正从被动记录走向对术中流程的主动预测与协调。


### 11. AI增强共聚焦激光显微内镜用于脑肿瘤快速术中诊断

*AI Augmented Confocal Laser Endomicroscopy for Rapid Intraoperative Diagnosis of Brain Tumors.*

**npj Digital Medicine** · 2026-04-18 · 多中心前瞻性诊断试验 · [PMID 42000880](https://pubmed.ncbi.nlm.nih.gov/42000880/) · [DOI](https://doi.org/10.1038/s41746-026-02651-0)

多中心前瞻试验，376例患者461份活检，评估共聚焦激光显微内镜（CLE）并开发Swin Transformer AI模型。CLE诊断准确率与冰冻切片非劣（0.94 vs 0.92，P=0.14），周转时间显著更短（5分56秒 vs 20分，P<0.001）；AI肿瘤检测准确率0.94、亚型诊断0.88。

> **要点**：CLE+AI实现脑肿瘤术中快速诊断，媲美冰冻切片。


### 12. 增强腹腔镜胆囊切除术解剖识别与安全性的AI导航系统：一项初步研究

*An artificial intelligence-based navigation system for enhancing anatomical recognition and safety during laparoscopic cholecystectomy: a pilot study*

**International Journal of Surgery** · 2026-04-09 · 分割模型开发+随机可用性初步研究 · [DOI](https://doi.org/10.1097/js9.0000000000005086)

模型开发加外部验证加初步可用性研究。基于73段腹腔镜胆囊切除视频训练DeepLab v3+分割模型，依据东京指南2018标注警戒区(AZ)与胆囊(GB)表面，在10段独立视频(100帧)测试：AZ与GB的IoU分别为0.703/0.735(对开发者金标准)、0.706/0.730(对外部金标准)。10名高年资住院医参与两臂试验，AI辅助下安全切开点正确选择由58%升至90%、胆囊表面轮廓识别由70%升至92%(均P<0.05)。

> **要点**：基于TG2018的AI导航可靠勾画关键地标并显著改善学员术中决策


### 13. 基于智能手机拍摄手术切除标本图像的深度学习模型预测临床IA期肺腺癌病理浸润性(SuRImage):一项前瞻性多中心诊断研究

*Deep learning model for pathological invasiveness prediction using smartphone-based surgical resection images in clinical stage IA lung adenocarcinoma (SuRImage): a prospective, multicentric, diagnostic study.*

**The Lancet Digital Health** · 2026-04-01 · 前瞻性多中心诊断研究 · [PMID 41927432](https://pubmed.ncbi.nlm.nih.gov/41927432/) · [DOI](https://doi.org/10.1016/j.landig.2025.100965)

前瞻性多中心诊断研究,2020.6-2023.9纳入中国3家医院临床IA期肺腺癌患者,术中用智能手机在自然光下拍摄切除标本图像建立深度学习模型SuRImage,以术中快速判断浸润性辅助段切除/肺叶切除决策。广东省人民医院队列(1529例、2344幅图)中浸润性识别AUC 0.84(95%CI 0.82-0.86)、诊断AUC 0.87、分级AUC 0.85,优于冰冻切片;SuRImage辅助下胸外科医生对浸润性分级的平均准确率由63.80%提升至73.44%。

> **要点**：手机拍摄切除标本+深度学习术中快速判断肺腺癌浸润性(AUC 0.84-0.87),医生分级准确率提升约10个百分点。


### 14. AI驱动的无标记拉曼光谱组学用于术中脊柱肿瘤评估（SpineXtract）

*AI-driven label-free Raman spectromics for intraoperative spinal tumor assessment.*

**npj Digital Medicine** · 2026-03-17 · 国际多中心模拟单臂研究 · [PMID 41844881](https://pubmed.ncbi.nlm.nih.gov/41844881/) · [DOI](https://doi.org/10.1038/s41746-025-02279-6)

构建首个用于术中脊柱肿瘤快速诊断的AI系统SpineXtract，基于受激拉曼组织学(SRH)与Transformer分类器识别脑膜瘤、神经鞘瘤、室管膜瘤与转移瘤。3国际机构44例患者、142张切片图的多中心模拟研究中，5分钟内达92.9%宏平均均衡准确率(95%CI 85.5-98.2)，各机构一致(91.4-92.0%)，较现有脑肿瘤分类器高15.6%。

> **要点**：SRH+Transformer实现术中脊柱肿瘤5分钟内高精度诊断。


### 15. 全直肠系膜切除术(TME)的人工智能实时整体识别模型

*Artificial intelligence real-time overall recognition model for total mesorectal excision*

**International Journal of Surgery** · 2026-03-03 · 回顾性深度学习(术中图像分割)建模 · [DOI](https://doi.org/10.1097/js9.0000000000003816)

回顾性研究，收集2016年1月至2024年4月直肠癌患者术中图像与视频，纳入训练组325例患者6700张高质量图像，经1000次迭代建立TME术中结构实时识别导航模型。各结构(以不同颜色标注)的mIoU/召回率/精确率/F1分别为：输尿管0.7086/0.7601/0.9128/0.8295，动脉0.8095/0.8789/0.9111/0.8947，静脉0.8114/0.8599/0.9350/0.8959，Toldt筋膜0.8985/0.9532/0.9400/0.9466，分离层0.7281/0.8191/0.8676/0.8427。

> **要点**：TME术中多结构实时识别导航模型有望减少结构损伤并推动手术标准化


### 16. 合成X线驱动的微型医疗器械跟踪与控制

*Synthetic X‑ray‑driven tracking and control of miniature medical devices.*

**Nature Machine Intelligence** · 2026-02-23 · 方法学开发+离体/在体验证 · [PMID 41757246](https://pubmed.ncbi.nlm.nih.gov/41757246/) · [DOI](https://doi.org/10.1038/s42256-026-01190-3)

提出MicroSyn-X框架，用合成的高保真、像素级精确、自动标注且域随机化的X线图像训练计算机视觉模型，从而无需人工标注即实现微型医疗器械（MMD）的机器人遥操作。在离体与动态在体环境中实现磁性软/液态MMD的实时定位与导航，在低对比、高噪声、遮挡下稳健，推进MMD辅助微创手术，并开源X线MMD数据集。

> **要点**：合成X线训练CV实现微创手术器械实时术中定位与导航。


### 17. 语义分割深度学习模型提升微创子宫切除术中术者的器官识别

*Semantic segmentation deep learning model boosts surgeons' organ recognition in minimally invasive hysterectomy - a prospective multi-center reader performance study using pre-selected video clips.*

**International Journal of Surgery** · 2026-01-20 · 前瞻性多中心阅片者研究+DL语义分割 · [PMID 41427529](https://pubmed.ncbi.nlm.nih.gov/41427529/) · [DOI](https://doi.org/10.1097/JS9.0000000000004606)

在41家机构13934张输尿管与4940张膀胱图像上训练语义分割模型，输尿管/膀胱Dice分别0.66/0.62；前瞻多中心阅片研究中，16名术者在AI辅助下输尿管检出敏感度由43.5%升至58.1%、膀胱由54.2%升至70.0%（均P<0.001）且特异度不降，低年资术者获益更大（+27.3%/+26.8%）。属术中实时解剖识别/引导以降低损伤风险。

> **要点**：AI术中器官识别提升安全性，低年资术者获益最大。


### 18. 生成式AI低剂量数字减影血管造影用于术中辐射剂量降低（随机对照试验）

*Generative AI-based low-dose digital subtraction angiography for intra-operative radiation dose reduction: a randomized controlled trial.*

**Nature Medicine** · 2026-01-02 · 多中心随机对照试验 · [PMID 41482562](https://pubmed.ncbi.nlm.nih.gov/41482562/) · [DOI](https://doi.org/10.1038/s41591-025-04042-6)

生成式AI系统GenDSA-V2以70家中心46,829例患者（逾500万张DSA图像）迭代开发，在1,068例（干预533/对照535，涵盖脑动脉瘤、肺癌、晚期肝癌）随机对照验证。GenDSA-V2组空气比释动能151.3±125.1 mGy vs 标准457.4±407.4 mGy（差-306.1 mGy，P<0.001优效），剂量面积积亦显著下降；手术时间34.8 vs 33.1分（非劣，P<0.001），并发症率7.5% vs 8.1%（非劣）。使术中辐射降低约2/3。

> **要点**：生成式AI低剂量DSA使术中辐射降约2/3且不延长手术（RCT）。


### 19. 云端实时人工智能检测结直肠肿瘤的随机对照试验（EAGLE）

*A novel cloud-based artificial intelligence for real-time detection of colorectal neoplasia - a randomized controlled trial (EAGLE).*

**npj Digital Medicine** · 2025-12-26 · 多中心平行组随机对照试验（RCT） · [PMID 41449203](https://pubmed.ncbi.nlm.nih.gov/41449203/) · [DOI](https://doi.org/10.1038/s41746-025-02270-1)

平行组RCT评估云端实时结直肠息肉CADe（针对≥10 mm大息肉与广基锯齿状病变SSL训练），欧洲4国8中心841例患者、22名内镜医师随机。CADe组每次结肠镜腺瘤数APC 0.82 vs 0.62（比值1.33，95%CI 1.06-1.67）、ADR 43.2% vs 35.9%、SSL检出比值3.30、大息肉比值2.36（均p<0.05），云端平均延迟59.4 ms、99.6%<100 ms。证实云端实时CADe对临床显著息肉的可行性与有效性（NCT05730192）。

> **要点**：云端实时息肉CADe随机试验，APC提升至0.82（比值1.33），大息肉/SSL检出显著提高。


### 20. 深度学习改进的虚拟支气管镜导航系统用于外周肺病变活检:单中心随机对照试验

*Efficacy of a virtual bronchoscopic navigation system improved by deep learning for biopsy of peripheral lung lesions: a single-center randomized controlled trial.*

**International Journal of Surgery** · 2025-12-11 · 单中心随机对照试验 · [PMID 41376368](https://pubmed.ncbi.nlm.nih.gov/41376368/) · [DOI](https://doi.org/10.1097/JS9.0000000000004391)

单中心RCT比较深度学习改进的小气道重建系统SARS-pro与原虚拟支气管镜导航(VBN)引导外周肺病变活检。95例入组,SARS-pro诊断阳性率显著高于VBN(FAS 91.49% vs 62.50%,P=0.002;PPS 93.48% vs 65.22%,P=0.002),在女性、无吸烟史、1-2cm病变等亚组亦更优。

> **要点**：深度学习改进的支气管镜导航显著提高外周肺病变活检诊断率。


### 21. 对“增强现实引导对比CT引导经皮肺结节定位（非劣效RCT）”的读者来信

*Letter to the editor"Augmented reality guided versus computed tomography guided percutaneous lung nodule localization. A noninferiority randomized clinical trial".*

**International Journal of Surgery** · 2025-12-08 · 读者来信（无原始数据） · [PMID 41363203](https://pubmed.ncbi.nlm.nih.gov/41363203/) · [DOI](https://doi.org/10.1097/JS9.0000000000004215)

读者来信（Letter），无原始数据，针对一项比较增强现实（AR）引导与CT引导经皮肺结节定位的非劣效随机对照试验进行讨论。属术中/操作增强现实导航引导。

> **要点**：就AR引导经皮肺结节定位RCT的来信讨论。


### 22. 软性输尿管镜手术中实时肾结石检测AI系统的临床验证（AiFURS）

*Clinical validation of an AI-assisted system for real-time kidney stone detection during flexible ureteroscopic surgery.*

**npj Digital Medicine** · 2025-11-27 · AI系统开发+离体/体内/外部临床验证 · [PMID 41309923](https://pubmed.ncbi.nlm.nih.gov/41309923/) · [DOI](https://doi.org/10.1038/s41746-025-02109-9)

为软性输尿管镜（FURS）手术开发实时结石检测、分类与测量AI系统AiFURS。用6170帧标注视频、11,870个标注结石训练；离体191组、300样本结石计数精确（r>0.9），>2 mm结石尺寸与卡尺金标准相关（n=100，r=0.81）；体内100例、外部80例患者级结石类型预测准确率92.2-95.3%与86.8-92.2%，优于专家外科医师；FURS末段测得的>2 mm残余碎片比例为再手术独立预测因子。

> **要点**：AiFURS术中实时检测肾结石，患者级准确率92-95%，优于专家并预测再手术。


### 23. 基于冰冻切片病理的AI增强弥漫中线胶质瘤活检术中决策

*AI-augmented intraoperative decision-making workflows in diffuse midline glioma biopsy using cryosection pathology.*

**Nature Communications** · 2025-11-26 · 多队列回顾性验证 · [PMID 41298469](https://pubmed.ncbi.nlm.nih.gov/41298469/) · [DOI](https://doi.org/10.1038/s41467-025-66853-y)

提出术中决策框架CryoAID,整合生成模型(校正冰冻切片伪影)与病理基础模型,术中直接从冰冻切片图像预测分子状态(如ATRX、H3K27M、TP53)。在内部(n=326)、外部多中心(n=52)与连续(n=68)队列验证,可利用既往判为不合格的切片完成分子预测;回顾性分析使再活检率分别下降26.4%与26.6%。

> **要点**：术中冰冻切片病理AI实时预测分子状态,降低再活检率约26%(核心-术中决策)


### 24. 基于组织pH与PSA活性的无标记导航系统用于前列腺肿瘤原位恶性分级

*Label-free navigation system for grading prostate tumour malignancy in situ via tissue pH and prostate-specific antigen activity.*

**Nature Biomedical Engineering** · 2025-11-18 · 器械开发+离体临床样本（144例）验证 · [PMID 41254130](https://pubmed.ncbi.nlm.nih.gov/41254130/) · [DOI](https://doi.org/10.1038/s41551-025-01561-y)

面向根治性前列腺切除术中肿瘤边界难界定的问题，开发表面增强拉曼散射(SERS)导航系统，同时检测组织酸度与PSA酶活性，并用二维深度学习模型快速解读拉曼光谱。在144例中国患者的新鲜前列腺组织中，该系统术中识别Gleason分级组≥3的高级别恶性区域的AUC达0.89。

> **要点**：SERS+深度学习实现术中高级别前列腺癌区域实时无标记定位


### 25. 识别机器人胰十二指肠切除术中血管解剖的新型AI模型

*Development of a novel artificial intelligence model to recognize vascular anatomy during robotic pancreatoduodenectomy.*

**British Journal of Surgery** · 2025-11-06 · AI模型开发(手术影像) · [PMID 41236618](https://pubmed.ncbi.nlm.nih.gov/41236618/) · [DOI](https://doi.org/10.1093/bjs/znaf255)

研究报告(无摘要),开发用于在机器人胰十二指肠切除术(robotic pancreatoduodenectomy)中实时识别血管解剖结构的新型人工智能模型,以辅助术中解剖辨识、降低血管损伤风险。

> **要点**：术中AI识别血管解剖为高风险机器人胰腺手术提供解剖引导


### 26. 人工智能辅助近红外荧光成像术中评估乳腺癌转移性前哨淋巴结

*Intraoperative evaluation of metastatic SLNs with NIRF imaging assisted by artificial intelligence in breast cancers.*

**International Journal of Surgery** · 2025-10-10 · 临床前＋前瞻临床试验(CNN影像) · [PMID 41085673](https://pubmed.ncbi.nlm.nih.gov/41085673/) · [DOI](https://doi.org/10.1097/JS9.0000000000003547)

在4T1-Luc/MDA-MB-231-Luc小鼠模型与35例乳腺癌前瞻临床试验(NCT05623280,114枚切除前哨淋巴结,16枚转移)中，对ICG近红外荧光图像评估4种CNN(Vgg19、Efficientnet、Resnet、Densenet)。小鼠测试集AUC 0.799/0.804，临床队列检测转移性前哨淋巴结AUC 0.898；聚合多图像的LymphNet假阴性率18.75%，与冰冻切片(13.5-31.3%)相当，预测<10秒且不损耗组织。

> **要点**：AI＋ICG近红外成像术中实时评估乳腺癌前哨淋巴结转移(AUC 0.898)，替代耗时冰冻切片。


### 27. 基于深度学习的纵隔超声内镜导航系统用于质量控制:单中心随机对照试验

*Development and clinical validation of a novel deep learning-based mediastinal endoscopic ultrasound navigation system for quality control: a single-center, randomized controlled trial.*

**International Journal of Surgery** · 2025-09-22 · 单中心随机对照试验(RCT) · [PMID 40990678](https://pubmed.ncbi.nlm.nih.gov/40990678/) · [DOI](https://doi.org/10.1097/JS9.0000000000003469)

AI系统用120例患者11230张标注图训练,内部(1972张)与外部(824张)验证;148例随机分组(AI组72、对照76)。AI组标准站点完整性显著高于对照(1.00 vs 0.80,P<0.001),解剖结构完整性亦更高(1.00 vs 0.85,P<0.001),操作时间无差异,无不良事件。

> **要点**：实时AI导航显著提升纵隔EUS扫查完整性,改善检查质量控制。


### 28. 多模态机器学习用于分期腹腔镜:结合图像与形态学判别腹膜转移

*Multimodal machine learning for staging laparoscopy: a combined image analysis and morphologic tool for the discrimination of peritoneal metastasis.*

**International Journal of Surgery** · 2025-09-09 · 回顾性多模态ML模型开发与内部验证 · [PMID 40928288](https://pubmed.ncbi.nlm.nih.gov/40928288/) · [DOI](https://doi.org/10.1097/JS9.0000000000003448)

回顾性(67例患者、453个连续活检病灶:良性197、恶性256)。融合深度学习图像模型与形态学ML的多模态模型(MML)于术中判别腹膜转移,AUC 0.88,优于最佳图像DL(0.72)、形态学ML(0.86)及外科医生判断(0.78)。

> **要点**：术中多模态ML判别腹膜转移优于外科医生,可作术中决策支持。


### 29. 对“增强现实导航联合荧光成像行腹腔镜保实质肝切除治疗结直肠肝转移”的评论

*Comment on "Efficacy of laparoscopic parenchyma-sparing hepatectomy using augmented reality navigation combined with fluorescence imaging for colorectal liver metastases: a retrospective cohort study using inverse probability treatment weighting analysis".*

**International Journal of Surgery** · 2025-08-25 · 评论/通讯（无数据） · [PMID 40865975](https://pubmed.ncbi.nlm.nih.gov/40865975/) · [DOI](https://doi.org/10.1097/JS9.0000000000003281)

评论（Comment），无原始数据，讨论一项采用增强现实（AR）导航联合荧光成像、行腹腔镜保实质肝切除治疗结直肠癌肝转移的回顾队列（IPTW分析）研究。属术中AR导航+荧光引导。

> **要点**：就AR导航+荧光腹腔镜肝切除的评论。


### 30. 对“DeepGuide：一种用于术中膜结构可视化的波长特异性导航系统”的评论

*Comment on "DeepGuide: a novel wavelength-specific navigation system for membrane visualization in surgery".*

**International Journal of Surgery** · 2025-08-05 · 评论/通讯（无数据） · [PMID 41382400](https://pubmed.ncbi.nlm.nih.gov/41382400/) · [DOI](https://doi.org/10.1097/JS9.0000000000003178)

评论（Comment），无原始数据，针对DeepGuide——一种用于外科术中膜/层面结构可视化的波长特异性导航系统进行讨论。属术中导航/引导（名称提示含深度学习成分）。

> **要点**：就术中膜结构可视化导航系统DeepGuide的评论。


### 31. 手术特征数字化经手术引导与机器人化提升手术精度

*Digitalization of surgical features improves surgical accuracy via surgeon guidance and robotization.*

**npj Digital Medicine** · 2025-08-02 · 视频数据驱动的AI引导系统开发与验证 · [PMID 40753134](https://pubmed.ncbi.nlm.nih.gov/40753134/) · [DOI](https://doi.org/10.1038/s41746-025-01887-6)

采集17,538段白内障撕囊视频构建AI系统MetaS，评估并识别理想病例、提取数字特征并在术中实时拟合最优撕囊路径。配合MetaS引导与晶状体卡尺，理想撕囊率提升约40%；这些数字特征还使手术机器人在猪眼中自主完成精准撕囊。属术中实时引导(兼具自主机器人)。

> **要点**：视频驱动实时术中引导提升撕囊精度并支持自主机器人。


### 32. 端到端多功能AI平台用于术中冰冻诊断

*An end-to-end multifunctional AI platform for intraoperative diagnosis.*

**npj Digital Medicine** · 2025-07-20 · 回顾开发加前瞻验证研究 · [PMID 40685437](https://pubmed.ncbi.nlm.nih.gov/40685437/) · [DOI](https://doi.org/10.1038/s41746-025-01808-7)

利用逾6700张WSI开发GAS平台，含生成(GAN驱动、FFPE风格文本引导增强冰冻切片质量)、评估(病理基础模型微调质控)与支持三模块。前瞻研究(ChiCTR2300076555)显示GAS显著提升病理医师诊断信心。属术中实时冰冻诊断决策支持。

> **要点**：端到端AI增强并支持术中冰冻切片实时诊断。


### 33. 评论：AI病灶标注系统辅助内镜黏膜下剥离术（ESD）治疗食管病变（低手术量中心前瞻队列）

*A commentary on "Application of artificial intelligence lesion labeling system-assisted endoscopic submucosal dissection for the treatment of esophageal lesions in a low-volume center: a prospective cohort study".*

**International Journal of Surgery** · 2025-07-16 · 评论/述评（无数据） · [PMID 40697009](https://pubmed.ncbi.nlm.nih.gov/40697009/) · [DOI](https://doi.org/10.1097/JS9.0000000000003077)

一篇评论（commentary），针对一项在低手术量中心以AI病灶标注系统实时辅助内镜黏膜下剥离术（ESD）治疗食管病变的前瞻性队列研究。ESD为内镜介入操作，AI提供术中病灶标注与引导。评论本身无原始数据。

> **要点**：评论AI实时标注辅助食管ESD的术中价值。


### 34. 用于手术的可穿戴术中增强现实(AR)

*Wearable Intraoperative Augmented Reality for Surgery.*

**JAMA Surgery** · 2025-07-01 · 外科创新评论（无数据） · [PMID 40072453](https://pubmed.ncbi.nlm.nih.gov/40072453/) · [DOI](https://doi.org/10.1001/jamasurg.2024.5494)

外科创新评述（无临床数据），探讨可穿戴增强现实(AR)设备在改善术中成像、患者结局与手术工作流方面的潜力。

> **要点**：可穿戴AR有望增强术中成像与手术工作流。


### 35. AI病灶标注系统辅助内镜黏膜下剥离(ESD)治疗食管病变（低容量中心）：前瞻队列

*Application of artificial intelligence lesion labeling system-assisted endoscopic submucosal dissection for the treatment of esophageal lesions in a low-volume center: a prospective cohort study.*

**International Journal of Surgery** · 2025-06-20 · 前瞻双中心队列研究 · [PMID 40540547](https://pubmed.ncbi.nlm.nih.gov/40540547/) · [DOI](https://doi.org/10.1097/JS9.0000000000002748)

首个实时AI病灶边界标注系统辅助ESD的前瞻队列，纳入AI组174例患者/200处病变（多由初学者操作），对照高容量中心常规ESD 181例/202处。AI组侧切缘阴性90.0%(180/200)、整块切除98.5%、组织学完全切除87.5%；完全侧切缘率AI组vs常规组90.0%比92.1%(P=0.465)无差异，但AI组总操作时间显著更长(82比49分钟,P<0.001)。

> **要点**：实时AI边界标注助力低容量中心初学者ESD侧切缘阴性率达90%，安全可行。


### 36. 机器人辅助微创食管切除术(RAMIE)中喉返神经过度牵拉的实时AI预警：概念验证

*Real-time AI-based detection of excessive traction on the recurrent laryngeal nerve during robot-assisted minimally invasive esophagectomy: a proof-of-concept study.*

**International Journal of Surgery** · 2025-06-18 · 概念验证研究（回顾视频标注+前瞻叠加显示） · [PMID 40540442](https://pubmed.ncbi.nlm.nih.gov/40540442/) · [DOI](https://doi.org/10.1097/JS9.0000000000002772)

概念验证研究，在既往解剖识别AI模型基础上，标注130例RAMIE患者视频帧为过度牵拉(ET)/非ET，实时输出过度牵拉风险(ETR)叠加于术野。在10例手术中AI正确识别84.4%的非预期神经牵拉场景，ETR与实际牵拉程度相符；代表病例中AI比神经完整性监测(NIM)振幅下降更早发现ET。

> **要点**：实时AI在喉返神经损伤前预警过度牵拉，识别率84.4%，早于NIM。



## 二、手术视频理解与技能评估（22 篇）

### 1. 基于智能手术流程识别的微创下颌下腺切除术技能评估

*Intelligent surgical workflow recognition-based skill assessment for minimally invasive submandibular gland resection.*

**npj Digital Medicine** · 2026-07-07 · 多中心模型开发与验证研究 · [PMID 42414567](https://pubmed.ncbi.nlm.nih.gov/42414567/) · [DOI](https://doi.org/10.1038/s41746-026-02976-w)

研究开发手术流程识别模型AI-miSMG用于微创下颌下腺(SMG)切除术,将内镜手术划分为Creation、Position、Separation、Inspection、Idle五个阶段。模型在73段高质量内镜视频(386,122标注帧)上训练,在4中心85,913幅图像的多中心数据上外部验证总体准确率0.87;可用于不同经验术者的手术流畅度分析,并将标注时间减少约47%(94.00→49.90分钟)。

> **要点**：手术流程识别模型实现微创下颌下腺切除阶段识别(准确率0.87)与技能评估,标注提效47%。


### 2. 基于群体学习的隐私保护手术视频分析——多国阑尾切除队列结果

*Privacy-Preserving Surgical Video Analysis with Swarm Learning — Results from a Multinational Appendectomy Cohort*

**NEJM AI** · 2026-06-25 · 多国多中心队列研究 · [DOI](https://doi.org/10.1056/aioa2501116)

多国阑尾切除队列研究（摘要缺失），采用群体学习(swarm learning，去中心化/联邦式机器学习)在保护隐私前提下分析手术视频，实现跨机构协作的手术视频理解。

> **要点**：群体学习实现隐私保护的跨国手术视频AI分析。


### 3. 端到端AI系统：手术手势序列识别与临床结局预测(F2O)

*End to end AI system for surgical gesture sequence recognition and clinical outcome prediction.*

**npj Digital Medicine** · 2026-06-23 · 回顾性手术视频建模/算法开发 · [PMID 42337001](https://pubmed.ncbi.nlm.nih.gov/42337001/) · [DOI](https://doi.org/10.1038/s41746-026-02927-5)

回顾性视频建模研究，构建端到端系统Frame-to-Outcome(F2O)，用基于Transformer的时空建模将机器人辅助根治性前列腺切除术保神经步骤的组织分离视频转为约2秒的手势序列，帧级AUC 0.80、视频级AUC 0.81。F2O提取的手势频率/时长/转换等特征预测术后结局准确率0.79，与人工标注(0.75)相当(95%CI重叠)；25个共享特征效应方向一致(Δd_avg≈0.07)、相关r=0.96(p<1e-14)；并发现勃起功能恢复与组织剥离延长、能量使用减少相关。

> **要点**：端到端自动量化术中手势并关联术后结局，为数据驱动手术反馈奠基。


### 4. 远端胃切除手术质量的自动化评估：基于关键质量视野(CVQ)的计算机视觉模型

*Automated Assessment of Surgical Quality in Distal Gastrectomy: Development of a Novel Computer Vision Model Based on the Critical View of Quality (CVQ).*

**Annals of Surgery** · 2026-06-22 · 回顾性队列+计算机视觉模型开发 · [PMID 42319158](https://pubmed.ncbi.nlm.nih.gov/42319158/) · [DOI](https://doi.org/10.1097/SLA.0000000000007130)

回顾性纳入260例腹腔镜或机器人远端胃切除且有完整术中视频的患者，开发计算机视觉模型自动判定CVQ各组分完整与否。CVQ与淋巴结获取数中度正相关(Pearson r=0.485, P<0.001)，校正后仍独立相关(β=4.79, 95%CI 3.83-5.74, P<0.001)，最高与最低四分位淋巴结数28.9对47.6(P<0.001)；自动CVQ分类平均精度(average precision)最高达91.5%。

> **要点**：计算机视觉可从手术视频自动评估淋巴结清扫质量，实现可扩展的术中表现评价。


### 5. 作者更正：面向智能手术的大规模自监督视频基础模型

*Author Correction: Large-scale self-supervised video foundation model for intelligent surgery.*

**npj Digital Medicine** · 2026-06-16 · 作者更正/勘误 · [PMID 42303709](https://pubmed.ncbi.nlm.nih.gov/42303709/) · [DOI](https://doi.org/10.1038/s41746-026-02864-3)

这是一则作者更正(Author Correction)，针对论文《面向智能手术的大规模自监督视频基础模型》，无摘要与新数据。主题为手术视频基础模型，属核心专题，但本条仅为更正声明、不含研究数据。

> **要点**：手术视频基础模型论文的更正声明，无新数据。


### 6. 可部署实时脊柱内镜实例分割(轻量多尺度注意力,EndoSeg-RT)

*Deployable real-time spinal endoscopic instance segmentation with lightweight multi-scale attention mechanism.*

**npj Digital Medicine** · 2026-06-10 · 算法开发+自建数据集实验 · [PMID 42270950](https://pubmed.ncbi.nlm.nih.gov/42270950/) · [DOI](https://doi.org/10.1038/s41746-026-02680-9)

提出可部署实时框架EndoSeg-RT，在骨干/颈/头协同设计轻量多尺度注意力，并发布经临床审核的PELD数据集(61例患者610图，标注脂肪/骨/黄韧带/神经)。模型仅1.8M参数、8.8 GFLOPs，精度媲美或超越更重基线，可泛化到公开牙科分割基准；面向batch-size-one实时术中部署以识别保护关键解剖。

> **要点**：超轻量实时脊柱内镜解剖实例分割，支持术中保护关键结构。


### 7. 可解释的全流程视频深度学习框架I3D-SAP用于基础操作要素的手术技能评估

*An interpretable whole-stream video based deep learning framework for surgical skill assessment of basic procedural elements*

**International Journal of Surgery** · 2026-04-22 · 视频深度学习方法开发+公开数据集验证 · [DOI](https://doi.org/10.1097/js9.0000000000005082)

基于3D CNN构建可解释手术技能评估框架I3D-SAP，在公开JIGSAWS数据集上将术者分为新手/中级/专家三级。缝合、过针、打结任务准确率分别达100%、96.3%、97.2%，并通过CAM可视化提供可解释性；但在严格的留一术者(LOUO)方案下性能显著下降，外部ROSMA数据集接近随机水平，泛化性受限。

> **要点**：高精度且可解释的手术技能自动评估框架，但跨未见术者泛化能力尚不足


### 8. 鼻咽喉镜检查中实时AI辅助质控随机对照试验（ENDOVISTA-ENT）

*Real-time AI-assisted quality control during nasopharyngolaryngoscopy: a randomized controlled trial.*

**npj Digital Medicine** · 2026-04-16 · 前瞻性双中心随机对照试验 · [PMID 41992031](https://pubmed.ncbi.nlm.nih.gov/41992031/) · [DOI](https://doi.org/10.1038/s41746-026-02643-0)

开发基于3,630例NPL视频训练的ENDOVISTA-ENT实时质控系统，实时监测解剖覆盖（不用于检出病变）。双中心RCT纳入318例，AI辅助组平均解剖覆盖率显著高于常规（93.08% vs 83.50%，P<0.0001），未显著增加检查时间，各经验层级尤其初级医师均获益。

> **要点**：实时AI质控提升鼻咽喉镜检查完整性与标准化。


### 9. 面向智能手术室的专用基础模型（ORQA）

*Specialized foundation models for intelligent operating rooms.*

**npj Digital Medicine** · 2026-04-15 · 基础模型开发与基准评估 · [PMID 41986551](https://pubmed.ncbi.nlm.nih.gov/41986551/) · [DOI](https://doi.org/10.1038/s41746-026-02631-4)

提出ORQA多模态基础模型，统一视觉、听觉与结构化数据实现整体手术理解，以问答框架服务多种手术任务并作为手术技术的智能核心。基准显示ORQA在感知手术场景上显著且一致地优于通用视觉-语言模型，并发布适配不同算力需求的小型ORQA系列。为下一代智能手术解决方案奠基。

> **要点**：多模态手术基础模型ORQA理解手术场景，超越通用VLM。


### 10. 眼科手术视频基础模型OVFM用于术中识别与导航（离体猪眼验证）

*An ophthalmic video foundation model for surgical recognition and navigation with wet-lab porcine eye validation.*

**Nature Biomedical Engineering** · 2026-03-03 · 基础模型开发+离体（湿实验室猪眼）验证 · [PMID 41776035](https://pubmed.ncbi.nlm.nih.gov/41776035/) · [DOI](https://doi.org/10.1038/s41551-026-01622-w)

基于自监督视频Transformer，在144种术式、110万段视频片段上训练眼科手术视频基础模型OVFM，学习眼科操作的时空运动特征，并在7项下游任务中表现优越。通过知识蒸馏压缩模型以支持手术显微镜实时部署；在10名术者对离体猪眼行白内障手术的验证中，OVFM辅助系统提升手术表现并缩小技能差距。

> **要点**：首个眼科手术视频基础模型，可实时术中识别导航并缩小术者技能差距


### 11. 面向智能手术的大规模自监督手术视频基础模型

*Large-scale self-supervised video foundation model for intelligent surgery.*

**npj Digital Medicine** · 2026-02-04 · 方法学/基础模型开发 · [PMID 41639385](https://pubmed.ncbi.nlm.nih.gov/41639385/) · [DOI](https://doi.org/10.1038/s41746-026-02403-0)

构建含3650个手术视频、355万帧、覆盖20多种术式与10多种解剖结构的大规模数据集，提出重建式视频级预训练框架SurgVISTA联合建模时空表征，并引入手术专家模型的图像级知识蒸馏。在覆盖6类术式、4类任务的13个视频级数据集上一致优于自然域与手术域预训练模型。为首个手术视频级时空自监督框架。

> **要点**：首个手术视频级时空自监督基础模型，13数据集领先。


### 12. 来信：深度学习驱动的多层次粒度整合用于手术场景理解

*Letter to the editor--Deep learning-driven multi-hierarchical granularity integration for surgical scene understanding: experimental study.*

**International Journal of Surgery** · 2025-12-16 · 评论/来信（Letter） · [PMID 41405271](https://pubmed.ncbi.nlm.nih.gov/41405271/) · [DOI](https://doi.org/10.1097/JS9.0000000000004506)

本文为针对「深度学习驱动多层次粒度整合用于手术场景理解」实验研究的来信/评论（摘要缺失，无数据）。所评述主题为手术视频/场景理解的深度学习，属手术+AI核心议题。

> **要点**：关于DL手术场景理解的学术通讯。


### 13. 融合视频与运动学数据的多模态集成模型用于机器人手术技能自动评估

*Multimodal learning for automated robotic surgical skill assessment: integrating video and kinematic data with ensemble model.*

**International Journal of Surgery** · 2025-12-16 · 方法学/公开数据集实验 · [PMID 41399175](https://pubmed.ncbi.nlm.nih.gov/41399175/) · [DOI](https://doi.org/10.1097/JS9.0000000000004471)

提出结合3D CNN视频分类器与1D CNN运动学分类器的多模态手术技能分级框架,并用类激活图(CAM)提供可解释性。在公开数据集JIGSAWS(108组试验,8名不同水平术者)与ROSMA(206组试验,12名受试者)上验证,多模态在多数任务上优于单模态。

> **要点**：多模态(视频+运动学)集成模型实现机器人手术技能客观自动评估。


### 14. 结肠镜退镜期合格黏膜观察时间自动评估AI系统

*An artificial intelligence system for qualified mucosal observation time during colonoscopic withdrawal.*

**npj Digital Medicine** · 2025-11-18 · 回顾性AI系统开发与队列分析 · [PMID 41254127](https://pubmed.ncbi.nlm.nih.gov/41254127/) · [DOI](https://doi.org/10.1038/s41746-025-02067-2)

开发QAMaster自动计算结肠镜退镜合格黏膜观察时间(QMOT)，含图像质量模型(57,235图/64例训练)与解剖标志模型(7712图/3013例训练)，AUC分别达0.980-0.991与0.977-0.997。482例中高QMOT组(不小于90s)腺瘤检出率36.54% vs 低QMOT组19.94%(校正OR 2.02，95%CI 1.23-3.33)。属内镜操作术中视频质量评估。

> **要点**：实时评估结肠镜退镜质量以提升腺瘤检出。


### 15. 深度学习多层级粒度融合用于手术场景理解:实验研究

*Deep learning-driven multi-hierarchical granularity integration for surgical scene understanding: experimental study.*

**International Journal of Surgery** · 2025-09-03 · 多中心视频数据集构建+深度学习框架实验研究 · [PMID 40899800](https://pubmed.ncbi.nlm.nih.gov/40899800/) · [DOI](https://doi.org/10.1097/JS9.0000000000003434)

构建首个腹腔镜根治性肾切除全粒度标注数据集(41个多中心视频、141443帧;8手术阶段、17步骤、6类器械分割8435帧、35种手术动作三元组SAT 25305帧)。轻量框架同时感知多粒度信息,识别准确率超过6个单任务SOTA算法;并基于全粒度特征用123种ML组合建术中出血预测模型,自动生成术后手术报告。

> **要点**：多粒度融合框架实现手术场景理解、术中出血预测与自动报告一体化。


### 16. 视觉-语言模型用于腹腔镜手术视频自动分析与记录：概念验证研究

*Vision-language models for automated video analysis and documentation in laparoscopic surgery: a proof-of-concept study.*

**International Journal of Surgery** · 2025-07-17 · 观察性对比（概念验证）研究 · [PMID 40679978](https://pubmed.ncbi.nlm.nih.gov/40679978/) · [DOI](https://doi.org/10.1097/JS9.0000000000003069)

观察性对比研究，用GPT-4o与Gemini-1.5-pro分析15例胆囊切除+15例阑尾切除视频（CholecT45、LapApp数据集，1 fps）。血管夹识别均达100%；GPT-4o在取物袋（100% vs 93.3%）、纱布（93.3% vs 60%）更优，Gemini在出血检测（93.3% vs 86.7%）更优；阑尾炎分级较差（40% vs 26.7%）；上下文学习（ICL）提升器械识别。通用VLM可用于手术视频理解。

> **要点**：通用VLM（GPT-4o/Gemini）可做手术视频物体检测与分类，分级仍弱。


### 17. 基于人工智能的机器人胰十二指肠切除术自动手术阶段识别

*Automated surgical phase recognition for robotic pancreatoduodenectomy using artificial intelligence.*

**British Journal of Surgery** · 2025-07-03 · AI模型开发(手术视频阶段识别) · [PMID 40728177](https://pubmed.ncbi.nlm.nih.gov/40728177/) · [DOI](https://doi.org/10.1093/bjs/znaf160)

研究报告(无摘要),利用人工智能对机器人胰十二指肠切除术(robotic pancreatoduodenectomy)手术视频进行自动手术阶段识别(surgical phase recognition)。

> **要点**：AI实现机器人胰腺手术视频的自动阶段识别,支撑手术工作流分析


### 18. 作为外科可解释AI的液态白盒模型

*Liquid white box model as an explainable AI for surgery*

**npj Digital Medicine** · 2025-06-19 · 方法学研究(可解释深度学习) · [DOI](https://doi.org/10.1038/s41746-025-01769-x)

面向外科数据的实时理解与反馈，构建两个分别用于外科任务分类与技能分类的模型，并给出决策解释。研究采用基于液态时间常数(liquid time constant)的网络，在约束条件下开发更优模型并阐释其内部决策机制，以满足外科AI对可解释性与透明度的要求。(方法性论述，未报告具体样本量与量化指标)

> **要点**：液态时间常数网络实现可解释的外科任务与技能分类。


### 19. 对“腹腔镜手术器械自动识别智能平台的开发与应用（多中心）”的读者来信

*Letter to the Editor: "Development and application of an intelligent platform for automated recognition of surgical instruments in laparoscopic procedures: a multicenter retrospective study".*

**International Journal of Surgery** · 2025-06-18 · 读者来信（无原始数据） · [PMID 40549418](https://pubmed.ncbi.nlm.nih.gov/40549418/) · [DOI](https://doi.org/10.1097/JS9.0000000000002726)

读者来信（Letter），无原始数据，针对一项开发用于腹腔镜手术器械自动识别的智能（计算机视觉/深度学习）平台的多中心回顾研究进行讨论。属手术视频理解/器械检测。

> **要点**：就腹腔镜手术器械自动识别智能平台的来信讨论。


### 20. 妇科腹腔镜手术器械的实时自动检测及其在手术技能评估中的应用：横断面研究

*Real-time automatic detection of gynecological laparoscopic surgical instruments and exploration in surgical skills assessment application: a cross-sectional study.*

**International Journal of Surgery** · 2025-06-12 · 横断面研究（模型开发+外部验证） · [PMID 40503769](https://pubmed.ncbi.nlm.nih.gov/40503769/) · [DOI](https://doi.org/10.1097/JS9.0000000000002699)

横断面研究采集两中心265段妇科腹腔镜手术视频，按4:1分训练/测试，提取161348个器械实例，用RTMDet检测9类器械：mAP 91.75%、敏感度94.29%、F1 93.00%，第三中心外部验证稳健，且优于PP-YOLOE。对阴道残端缝合步骤实时追踪，熟练组较非熟练组路径更短、移动时间更短、速度更高，可用于客观量化GOALS技能评分。

> **要点**：RTMDet实时检测腹腔镜器械(mAP 91.75%)并支持运动学技能评估。


### 21. 腹腔镜手术器械自动识别智能平台的开发与应用：多中心回顾研究

*Development and application of an intelligent platform for automated recognition of surgical instruments in laparoscopic procedures: a multicenter retrospective study (experimental studies).*

**International Journal of Surgery** · 2025-05-23 · 多中心回顾研究（模型开发+平台部署+问卷） · [PMID 40405782](https://pubmed.ncbi.nlm.nih.gov/40405782/) · [DOI](https://doi.org/10.1097/JS9.0000000000002562)

采集中国21家中心、覆盖5类手术的1261段手术视频，提取96324帧、标注268828个标签，构建通用AI手术器械识别模型，对21种器械平均精度(mAP)达80.31%，并部署于SurgSmart平台（快速回看、器械报告、器械热力图、教学模式）。30名外科医生多中心问卷反馈满意度高、认可临床价值。

> **要点**：通用手术器械识别模型(mAP 80.31%)部署SurgSmart平台实现术中数据可视化。


### 22. AI辅助手术场景识别:与医护人员的对比研究

*Artificial Intelligence-Assisted Surgical Scene Recognition: A Comparative Study Among Health Care Professionals.*

**Annals of Surgery** · 2024-10-30 · 横断面对比研究 · [PMID 39474680](https://pubmed.ncbi.nlm.nih.gov/39474680/) · [DOI](https://doi.org/10.1097/SLA.0000000000006577)

横断面对比研究,用深度学习模型MACSSwin-T从手术视频检测脑动脉瘤,并比较医护在有/无AI辅助下的识别力。共338名医护、5154帧标注:无AI辅助正确率70%,AI辅助升至78%(OR 1.77,P<0.001);神经外科主治医师提升最大(77%→92%,OR 4.24,P=0.003)。AI辅助人类表现超越单独人类或单独AI。

> **要点**：术中视频AI辅助全层级外科医生提升动脉瘤识别,资深者获益亦显著



## 三、手术机器人与自主操作（10 篇）

### 1. 手术室中的人形机器人:外科具身AI分阶段整合框架(观点)

*Humanoid robots in the operating room: a framework for staged integration of embodied AI in surgery.*

**npj Digital Medicine** · 2026-07-13 · 观点/框架(无数据) · [PMID 42443339](https://pubmed.ncbi.nlm.nih.gov/42443339/) · [DOI](https://doi.org/10.1038/s41746-026-02853-6)

观点文章(无数据),提出智能人形机器人凭借拟人化设计经"临床前验证→低风险任务→逐步承担较高风险辅助角色"的分阶段部署框架进入手术室,探讨通用具身AI自主性融入外科关键环境的路径、挑战与影响。

> **要点**：观点框架,主张人形具身AI机器人分阶段进入手术室。


### 2. 类人机器人用于手术的在体可行性研究

*In vivo feasibility study of humanoid robots in surgery.*

**Nature** · 2026-07-08 · 在体可行性研究（台架+干实验室+活体猪） · [PMID 42420461](https://pubmed.ncbi.nlm.nih.gov/42420461/) · [DOI](https://doi.org/10.1038/s41586-026-10796-x)

在体可行性研究，系统评估当代类人(humanoid)机器人执行腹腔镜手术任务的能力。研究搭建基于类人机器人、使用通用器械的腹腔镜遥操作框架，通过台架表征、覆盖不同经验层次的干实验室用户研究及在体猪实验，量化其相对于da Vinci等成熟平台的技术可行性、任务表现与临床就绪度（属具身智能范畴，摘要以定性评估为主）。

> **要点**：首次系统评估类人机器人执行微创手术任务的可行性与关键技术差距。


### 3. 迈向自主机器人辅助与微机器人手术

*Toward autonomous robotic-assisted and microrobotic surgery.*

**Science Advances** · 2026-07-01 · 观点/综述 · [PMID 42384805](https://pubmed.ncbi.nlm.nih.gov/42384805/) · [DOI](https://doi.org/10.1126/sciadv.aec4197)

观点/综述，展望自主机器人辅助手术（RAS）及微机器人手术（μ-RAS），横跨血管内、腔内、腹腔镜、眼科、骨科五大外科领域，结合外科专家与生物工程视角勾勒自主化技术路线图。无数据。

> **要点**：自主RAS与微机器人手术路线图（观点）


### 4. 基于单端多模光纤的深度学习柔性机器人多模态形状感知

*Deep learning-enabled versatile shape perception for soft robots via single-ended multimode fiber.*

**Science Advances** · 2026-06-12 · 方法学研发（多任务验证） · [PMID 42284416](https://pubmed.ncbi.nlm.nih.gov/42284416/) · [DOI](https://doi.org/10.1126/sciadv.aef6263)

提出基于单端多模光纤+可重构神经解码器的深度学习形状感知方法：软夹爪离散状态识别>99%准确率、仿生灵巧手连续形状追踪空间分辨率提升约5倍、软体手术机器人三维形态重建IoU>0.93。为软体手术机器人闭环控制/数字孪生提供本体感知。

> **要点**：深度学习实现软体手术机器人形状感知，IoU>0.93


### 5. 推理能力如何赋能内镜手术中的AI副驾机器人

*How can reasoning capability empower the AI copilot robot in endoscopic surgery.*

**npj Digital Medicine** · 2026-06-11 · 评论/观点(Letter) · [PMID 42277237](https://pubmed.ncbi.nlm.nih.gov/42277237/) · [DOI](https://doi.org/10.1038/s41746-026-02827-8)

评论/来信(Letter)，探讨基于视觉-语言-动作(VLA)模型的AI副驾机器人在内镜手术中引入推理能力的前景：整合多模态线索、解读手术意图、推断隐藏组织动态，从而降低术中不确定性与外科医师认知负担。无数据。

> **要点**：主张推理驱动自主性可将AI副驾机器人从被动执行者转为认知协作者。


### 6. HoloTrauma 3X：面向机器人辅助急诊颌面重建的三元AI协同推理系统

*HoloTrauma 3X Triadic AI Co reasoning for robot assisted emergency maxillofacial reconstruction.*

**npj Digital Medicine** · 2026-04-04 · 多中心回顾性验证（含公开数据集与临床数据） · [PMID 41935194](https://pubmed.ncbi.nlm.nih.gov/41935194/) · [DOI](https://doi.org/10.1038/s41746-026-02573-x)

针对占急诊8-12%的颌面外伤，构建基于视觉-语言模型的HoloTrauma 3X，在急诊情境下同步评估咬合-骨-气道三元结构以指导机器人辅助重建。在跨三大洲、12家机构与3家医院的8427例外伤患者中，上颌骨/下颌骨平均绝对误差分别为0.42mm和0.38mm，手术时间较标准术式缩短31.4%，术中并发症较传统方法减少42.3%。

> **要点**：VLM协同推理+机器人辅助显著提升颌面重建精度与效率。


### 7. 胸外科自主手术机器人时代：即将到来了吗？

*The era of autonomous surgical robotics in thoracic surgery: is it coming?*

**International Journal of Surgery** · 2026-01-26 · 观点/评论（无数据） · [PMID 41427538](https://pubmed.ncbi.nlm.nih.gov/41427538/) · [DOI](https://doi.org/10.1097/JS9.0000000000004637)

观点/评论类文章，探讨自主手术机器人（autonomous surgical robotics）在胸外科的前景与到来时机。无原始数据。

> **要点**：展望自主手术机器人在胸外科的应用前景。


### 8. 预测性数字孪生同步增强远程机器人手术安全的时延补偿框架

*Enhancing telesurgical safety with predictive digital twin synchronization: a framework for latency compensation in robotic surgery.*

**npj Digital Medicine** · 2026-01-13 · 系统开发加离体/临床可行性验证 · [PMID 41530256](https://pubmed.ncbi.nlm.nih.gov/41530256/) · [DOI](https://doi.org/10.1038/s41746-025-02283-w)

提出数字孪生视觉辅助(DTVA)系统，用参数化3D建模加虚拟内镜可视化的三层架构实现实时双向同步以补偿主从时延。地理分布机器人平台上，典型条件空间精度误差小于2mm，900ms时延下peg-transfer耗时降13.6%、操作者负荷降27.2%；300ms时延下远程根治性肾切除全部顺利完成、无并发症。为远程机器人手术时延补偿。

> **要点**：数字孪生时延补偿使远程机器人手术在900ms下提效13.6%。


### 9. 视网膜下注射的机器人手术技能增强：一种新型半自动系统

*Robotic augmentation of surgical skills in subretinal injection: a novel semiautomated system.*

**International Journal of Surgery** · 2025-12-16 · 临床前动物随机对照（n=48兔） · [PMID 41399130](https://pubmed.ncbi.nlm.nih.gov/41399130/) · [DOI](https://doi.org/10.1097/JS9.0000000000004501)

临床前动物随机对照研究，48只有色素家兔随机分为手动组（n=24）与机器人辅助组（n=24），评估半自动高精度眼科手术机器人（HiPOSuR）辅助视网膜下注射（SRI）。机器人组首次成功率91.7%（22/24）显著高于手动组37.5%（9/24，P<0.001），并发症由54.2%降至8.3%（P<0.001），住院医师成功率33.3%→83.3%（P=0.036），平均震颤幅度34.56±18.75μm vs 95.32±46.92μm（P<0.001）。

> **要点**：半自动手术机器人显著提升视网膜下注射成功率、降低震颤与并发症。


### 10. CBCT引导机器人人工耳蜗植入的精度、效率与流程标准化：临床前研究

*CBCT-guided robotic cochlear implantation precision, efficiency, and procedural standardization in a preclinical study.*

**International Journal of Surgery** · 2025-11-19 · 临床前（尸头）研究 · [PMID 41255297](https://pubmed.ncbi.nlm.nih.gov/41255297/) · [DOI](https://doi.org/10.1097/JS9.0000000000004082)

临床前研究（10例尸头耳），开发CBCT引导的人工耳蜗植入机器人系统，机器人自动规划安全路径并辅助电极植入。全部10耳成功钻孔，钻孔通道距面神经最小距离0.70±0.12mm，8耳尝试植入电极7耳成功；主要挑战为CBCT对比度低。属自主/半自主手术机器人。

> **要点**：CBCT引导机器人实现亚毫米级自主人工耳蜗植入。



## 四、手术规划、数字孪生与三维建模（14 篇）

### 1. 用于脊柱侧凸手术规划与术后预测的人工智能

*Artificial intelligence for scoliosis surgical planning and postoperative prediction.*

**npj Digital Medicine** · 2026-07-01 · 回顾开发+前瞻内外部验证研究 · [PMID 42386936](https://pubmed.ncbi.nlm.nih.gov/42386936/) · [DOI](https://doi.org/10.1038/s41746-026-02934-6)

研究开发ScoliosisPLAN系统:含基于YOLOv8的分割模型ScolioPlanNet做个体化融合节段规划,及潜在扩散模型ScolioPredNet模拟术后X线片。在回顾开发队列及前瞻收集的内/外部验证队列共1425例(随访≥2年)中,系统在复现融合规划决策上达到与资深外科医生相当的水平,并在临床可接受误差内预测关键影像学结局。

> **要点**：AI系统实现青少年特发性脊柱侧凸个体化融合规划与术后影像预测,水平媲美资深术者。


### 2. 用基础模型从多平面MRI重建以进行子宫肌瘤分析

*Reconstruction from multi-planar MRI with foundation models for uterine fibroid analysis.*

**npj Digital Medicine** · 2026-06-24 · 方法学开发与验证研究 · [PMID 42342992](https://pubmed.ncbi.nlm.nih.gov/42342992/) · [DOI](https://doi.org/10.1038/s41746-026-02780-6)

研究提出基础模型引导的自适应分割框架FGAS,用于无标注的多平面(矢/冠/横)子宫肌瘤MRI分割与三维重建,服务临床诊断、手术规划与疗效评估;利用解剖先验优化伪标签、多视图一致性约束与连通域控制以降低平面依赖并抑制假阳性。临床数据集上将Dice由基线的42.8%提升至70.6%,优于现有无监督域适应与多平面方法。

> **要点**：基础模型无标注三维重建子宫肌瘤(Dice 70.6%),支撑手术规划与疗效评估。


### 3. 衔接AI与数字孪生实现实时精准手术：将COFFEE组织病理分类器转化到临床工作流

*Bridging AI and digital twins for real-time precision surgery: translating the COFFEE histopathological classifier into clinical workflows*

**International Journal of Surgery** · 2026-04-22 · 观点/评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005252)

观点/评论类文章(无摘要、无数据)，探讨如何将COFFEE组织病理分类器与数字孪生、AI结合，转化为实时精准手术的临床工作流。核心为数字孪生加AI服务术中精准决策的转化路径。

> **要点**：AI加数字孪生驱动实时精准手术的临床转化构想


### 4. 用于容积血管造影中动脉瘤瘤颈勾画的可微中心线感知框架

*Differentiable centerline-aware framework for aneurysm neck delineation in volumetric angiography.*

**npj Digital Medicine** · 2026-04-17 · 可微几何建模方法(影像) · [PMID 41998109](https://pubmed.ncbi.nlm.nih.gov/41998109/) · [DOI](https://doi.org/10.1038/s41746-026-02613-6)

提出可微框架NeckSpline，将颅内动脉瘤瘤颈建模为连续周期三次B样条，以母血管中心线锚定优化闭合曲线，并引入紧致正则化与欧拉示性数拓扑损失。在MCA-CTA与ADAM-TOF基准上，瘤颈宽度平均绝对误差(MAE)0.44mm、角度MAE 4.6°，显著优于SOTA且亚秒级推理，保证拓扑完整与亚体素精度，面向术前/介入规划。

> **要点**：自动精确勾画动脉瘤瘤颈形态，支持介入/手术术前规划。


### 5. 拓展视野：将多通道深度学习预测器整合入患者特异性数字孪生以实现精准肺癌管理

*Expanding horizons: integrating multichannel deep learning predictors into patient-specific digital twins for precision lung cancer management*

**International Journal of Surgery** · 2026-03-25 · 观点/评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005064)

观点/评论类文章(无摘要、无数据)，提出将多通道深度学习预测器整合入患者特异性数字孪生，以推进精准肺癌管理(含手术在内的诊疗决策)。核心为数字孪生加深度学习的个体化建模构想。

> **要点**：多通道深度学习加数字孪生赋能个体化精准肺癌管理


### 6. 经极低剂量方案实时重建三维骨模型（SSR-KD）

*Real-time reconstruction of 3D bone models via very-low-dose protocols.*

**npj Digital Medicine** · 2026-03-17 · AI重建框架开发与专家模拟验证 · [PMID 41840145](https://pubmed.ncbi.nlm.nih.gov/41840145/) · [DOI](https://doi.org/10.1038/s41746-026-02389-9)

提出半监督知识蒸馏框架SSR-KD，从双平面X线在30秒内重建高质量三维骨模型，平均误差<1.0mm，摆脱对CT与人工勾画的依赖。专家在重建模型上完成的高位胫骨截骨模拟显示其临床适用性与CT标注模型相当，可降低辐射并支持术中引导。属手术规划/三维重建，核心相关。

> **要点**：双平面X线30秒重建亚毫米级骨模型，服务术前规划与术中引导。


### 7. 几何深度学习快速预测左心室心脏激动：迈向心脏再同步治疗规划

*Rapid prediction of cardiac activation in the left ventricle with geometric deep learning: a step towards cardiac resynchronization therapy planning.*

**npj Digital Medicine** · 2026-02-07 · 几何深度学习(有限元仿真) · [PMID 41654658](https://pubmed.ncbi.nlm.nih.gov/41654658/) · [DOI](https://doi.org/10.1038/s41746-026-02399-7)

针对约1/3心脏再同步治疗(CRT)患者无应答(部分因导线位置欠佳)，开发两种几何深度学习模型(图神经网络GNN与几何信息神经算子GINO)实时预测左心室激动时间图。基于有限元仿真大数据训练，合成病例GINO误差1.38%优于GNN 2.44%，真实几何两者相当(GINO 4.79%/GNN 4.07%)；并建立从激动图识别最优起搏位点的工作流，可从含噪输入稳健恢复个体参数。

> **要点**：几何DL实时预测LV激动，面向个体化术前CRT起搏位点优化。


### 8. 物理约束图神经网络实时预测颅内动脉瘤血流动力学

*Physics constrained graph neural network for real time prediction of intracranial aneurysm hemodynamics.*

**npj Digital Medicine** · 2026-02-06 · 物理约束GNN(CFD代理)方法 · [PMID 41652107](https://pubmed.ncbi.nlm.nih.gov/41652107/) · [DOI](https://doi.org/10.1038/s41746-026-02404-z)

提出物理约束图神经网络(GNN)框架，基于高保真CFD数据预测颅内动脉瘤全三维、时间分辨的血流动力学场(壁面剪切应力、振荡剪切指数)，近实时且可泛化到不同流入条件与未见患者几何而无需微调。发布105个患者来源动脉瘤几何及CFD场的基准数据集，为首个应用于瞬态三维动脉瘤流动预测的GNN，面向破裂风险分层与治疗规划。

> **要点**：物理约束GNN近实时预测动脉瘤血流动力学，支持风险分层与治疗规划。


### 9. 数字孪生辅助手术：技术架构、跨手术阶段整合、实施挑战与未来方向（综述）

*Digital twin-assisted surgery: technological architecture, integration across surgical phases, implementation challenges and future directions.*

**International Journal of Surgery** · 2026-02-03 · 叙述性综述 · [PMID 41632007](https://pubmed.ncbi.nlm.nih.gov/41632007/) · [DOI](https://doi.org/10.1097/JS9.0000000000004921)

综述性文章，阐述数字孪生（患者特异性实时虚拟模型，整合机器人、智能植入物、生物传感器与影像）在术前/术中/术后的预测建模、实时决策支持与个体化康复中的应用，并讨论数据互操作性、传感器精度、实时处理、成本与监管伦理等挑战，提出AI+边缘计算等方向。无定量数据。

> **要点**：数字孪生手术的架构、跨阶段整合与实施挑战综述。


### 10. 迈向数字孪生赋能的围手术期照护：拓展多模态深度学习用于心血管风险分层

*Towards digital twin-enabled perioperative care: extending the potential of multimodal deep learning for cardiovascular risk stratification.*

**International Journal of Surgery** · 2026-01-13 · 述评/展望（摘要缺失） · [PMID 41537304](https://pubmed.ncbi.nlm.nih.gov/41537304/) · [DOI](https://doi.org/10.1097/JS9.0000000000004617)

述评/展望性文章，提出以数字孪生（digital twin）结合多模态深度学习拓展围手术期心血管风险分层（摘要缺失，无具体数据）。核心涉及围手术期+DL+数字孪生，属手术规划/数字孪生方向。

> **要点**：倡导数字孪生+多模态DL赋能围手术期风险分层。


### 11. 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」的通讯

*Correspondence on: 3D auto-segmentation of pancreas cancer and surrounding anatomical structures for surgical planning.*

**International Journal of Surgery** · 2025-12-16 · 通讯/来信(无数据) · [PMID 41399324](https://pubmed.ncbi.nlm.nih.gov/41399324/) · [DOI](https://doi.org/10.1097/JS9.0000000000004346)

针对一篇利用AI三维自动分割胰腺癌及周围解剖结构以辅助手术规划的论文的通讯(correspondence),无原始数据。所议主题为外科手术规划+深度学习自动分割,核心相关。

> **要点**：评述AI自动分割用于胰腺癌手术规划,主题属外科+AI。


### 12. 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」临床适用性的来信

*Regarding the clinical applicability of "3D auto-segmentation of pancreas cancer and surrounding anatomical structures for surgical planning".*

**International Journal of Surgery** · 2025-12-10 · 来信(无数据) · [PMID 41376482](https://pubmed.ncbi.nlm.nih.gov/41376482/) · [DOI](https://doi.org/10.1097/JS9.0000000000004262)

针对上述AI三维自动分割胰腺癌用于手术规划论文的临床适用性讨论来信,无原始数据。主题为外科手术规划+深度学习自动分割,核心相关。

> **要点**：讨论AI自动分割用于胰腺癌手术规划的临床适用性,主题属外科+AI。


### 13. 胰腺癌及周围解剖结构三维自动分割用于手术规划

*3D auto-segmentation of pancreas cancer and surrounding anatomical structures for surgical planning.*

**International Journal of Surgery** · 2025-06-27 · 多中心深度学习分割研究 · [PMID 40576127](https://pubmed.ncbi.nlm.nih.gov/40576127/) · [DOI](https://doi.org/10.1097/JS9.0000000000002835)

多中心研究，用分层Swin Transformer V2从术前增强CT自动分割胰腺、胰腺癌及胰周结构（275例，训练176/内部59/外部40）。总体平均Dice内部75.4、外部75.6；胰腺实质最高（84.8/86.1），胰腺癌较低（57.0/54.5），肿瘤越大Dice越高；肠系膜上动脉、门/肠系膜上静脉定性完整分割率达87.5–100%，用于三维可视化辅助手术规划。

> **要点**：Swin Transformer自动分割胰腺癌及周围结构（Dice约75）辅助手术规划。


### 14. 对“复杂胰腺手术中虚拟3D模型、AR系统与虚拟腹腔镜仿真：现状、前景与挑战”的读者来信

*Letter to Editor: "Virtual 3D models, augmented reality systems and virtual laparoscopic simulations in complicated pancreatic surgeries state of art, future perspectives, and challenges".*

**International Journal of Surgery** · 2025-06-14 · 读者来信（无数据） · [PMID 40540449](https://pubmed.ncbi.nlm.nih.gov/40540449/) · [DOI](https://doi.org/10.1097/JS9.0000000000002782)

读者来信（Letter），无原始数据，讨论一篇关于复杂胰腺手术中虚拟3D模型、增强现实系统与虚拟腹腔镜仿真的综述。属外科三维重建/仿真规划与数字外科技术。

> **要点**：就胰腺手术3D建模/AR/仿真综述的来信讨论。



## 五、术前诊断、影像AI与可切除性评估（71 篇）

### 1. 基于超声与机器学习的胸段食管癌选择性颈淋巴结清扫无创评估方法

*A noninvasive approach based on ultrasonography and machine learning for selective cervical lymphadenectomy in thoracic esophageal cancer.*

**International Journal of Surgery** · 2026-10-24 · 回顾性诊断建模(超声＋多算法ML) · [PMID 41143654](https://pubmed.ncbi.nlm.nih.gov/41143654/) · [DOI](https://doi.org/10.1097/JS9.0000000000003803)

纳入887例行手术并颈淋巴结病理检查的食管鳞癌(ESCC)，用患者特征＋超声评估建立多种ML模型预测颈淋巴结转移(32.1%阳性)，五折交叉验证并对比基线列线图。随机森林平均准确率0.68(95%CI 0.65-0.71)、AUC 0.72(0.71-0.74)、F1 0.56，所有ML模型均优于列线图(P<0.05)；最大颈淋巴结直径为最关键预测因子，术中病理未提升预测。

> **要点**：超声＋ML无创预测ESCC颈淋巴结转移(AUC 0.72)，指导选择性颈清扫决策。


### 2. 基于超声图像评估小儿回结肠型肠套叠严重程度的视觉Transformer模型

*A vision transformer deep learning model for assessing pediatric ileocolic intussusception severity using ultrasound images.*

**npj Digital Medicine** · 2026-07-10 · 多中心回顾+前瞻队列(ViT建模) · [PMID 42432112](https://pubmed.ncbi.nlm.nih.gov/42432112/) · [DOI](https://doi.org/10.1038/s41746-026-02941-7)

开发并前瞻验证视觉Transformer(ViT)系统，从静态B超图像预测小儿回结肠型肠套叠空气灌肠复位失败(即需手术)。多中心双向队列纳入14家中国三甲医院5602名患儿(4-60月龄)，扩增后10,151张图像训练/验证；前瞻队列190例外部验证。内部失败/成功准确率0.880/0.970；前瞻队列整体准确率93.7%，显著高于高年资(74.7%)与低年资(60.7%)超声医师(p<0.05)。

> **要点**：ViT预测肠套叠灌肠复位失败，准确率93.7%，助力手术决策与减少穿孔。


### 3. 基于对比增强超声与深度学习预测肝细胞癌微血管侵犯

*Prediction of microvascular invasion in hepatocellular carcinoma using contrast-enhanced ultrasound and deep learning.*

**Nature Communications** · 2026-07-10 · 多中心回顾+前瞻诊断建模（1,716例/5,148视频） · [PMID 42431906](https://pubmed.ncbi.nlm.nih.gov/42431906/) · [DOI](https://doi.org/10.1038/s41467-026-74985-y)

核心：开发深度学习模型MAPUSE，用对比增强超声(CEUS)术前无创预测肝细胞癌微血管侵犯(MVI，通常仅术后可知)。在多中心5,148段CEUS视频、1,716例患者上训练测试，跨肿瘤大小、造影剂与前瞻验证AUC达0.835–0.978；转录组分析显示预测与CD8+ T细胞浸润相关，MVI阳性者可从消融后免疫治疗获益。

> **要点**：CEUS+DL术前无创预测HCC微血管侵犯，服务外科/介入决策


### 4. 基于MRI的一体化智能诊断策略评估乳腺癌腋窝淋巴结状态

*An intelligent MRI-based all-in-one diagnostic strategy for axillary lymph node status in breast cancer.*

**Nature Communications** · 2026-06-22 · 回顾性多任务诊断建模（6,271例） · [PMID 42331837](https://pubmed.ncbi.nlm.nih.gov/42331837/) · [DOI](https://doi.org/10.1038/s41467-026-74704-7)

核心：开发基于MRI的分层多任务深度学习模型BCALN-Net，在6,271例乳腺癌患者中同时预测前哨淋巴结(SLN)转移、SLN转移负荷与非前哨淋巴结转移，且跨分子分型、临床分期、受体状态等稳健。4,081例汇总分析中预测腋窝有创操作可否豁免优于临床标准，有望指导腋窝手术降级。

> **要点**：MRI深度学习一体化评估腋窝淋巴结，指导腋窝手术降级


### 5. 整合超声-CT-MR的卵巢癌术前多任务预测：达MDT诊断水平

*Integrating ultrasound-CT-MR for preoperative multi-task prediction in ovarian cancer: achieving diagnostic parity with multidisciplinary team consensus.*

**npj Digital Medicine** · 2026-06-15 · 回顾性多中心多模态AI+外部验证 · [PMID 42298142](https://pubmed.ncbi.nlm.nih.gov/42298142/) · [DOI](https://doi.org/10.1038/s41746-026-02875-0)

开发多任务AI系统OVUCM，经影像组学+机器学习+5×4嵌套交叉验证整合多模态影像，训练1742例。五项术前任务(良恶性、交界/恶性、上皮/非上皮、FIGO I-II/III-IV、HGSOC)AUC 0.847-0.929；150例外部验证AUC 0.833-0.974；四项任务与多学科团队(MDT)共识持平、一项超越，且均优于至少一名独立妇科医师。

> **要点**：多模态术前AI达MDT水平，直接服务卵巢癌手术决策。


### 6. 预测局部进展期直肠癌全程新辅助治疗后的治疗反应

*Predicting Treatment Response After Total Neoadjuvant Therapy for Locally Advanced Rectal Cancer.*

**Annals of Surgery** · 2026-06-04 · 回顾性建模+外部验证(表格基础模型) · [PMID 42240534](https://pubmed.ncbi.nlm.nih.gov/42240534/) · [DOI](https://doi.org/10.1097/SLA.0000000000007058)

微调表格基础模型(tabular foundation models)集成，预测局部进展期直肠癌全程新辅助(TNT)后病理完全缓解(pCR)以辅助观察等待(W/W)选择。308例TNT+全直肠系膜切除(TME)队列预测pCR的AUROC 0.71(95%CI 0.65-0.77)、AUPRC 0.44、Brier 0.17；外部验证83例TNT+W/W预测持续临床完全缓解AUROC 0.69、AUPRC 0.90，重校准后Brier由0.30改善至0.17。

> **要点**：表格基础模型预测TNT后pCR，经重校准可辅助直肠癌观察等待的患者选择。


### 7. 深度学习从造影预测临界冠脉病变的支架植入

*Deep learning predicts stent implantation in borderline coronary lesions from angiography.*

**npj Digital Medicine** · 2026-05-22 · 回顾性多中心深度学习+外部验证 · [PMID 42174128](https://pubmed.ncbi.nlm.nih.gov/42174128/) · [DOI](https://doi.org/10.1038/s41746-026-02779-z)

回顾性多中心1298例，用Improved_EfficientNet+CBAM注意力从冠脉造影图直接预测临界病变(50-70%狭窄)是否需支架，训练以FFR/IVUS/OCT为参考标准。内部准确率0.976、F1 0.971，外部准确率0.807、AUC 0.897，Grad-CAM聚焦狭窄区且与专家判读高度一致。

> **要点**：造影影像AI预测支架必要性，支持介入决策、减少有创辅助检查。


### 8. 基于CT的深度学习模型多中心验证以指导纯磨玻璃结节治疗决策

*Multicenter validation of a CT-based deep learning model to inform treatment decision-making for pure ground-glass pulmonary nodules*

**International Journal of Surgery** · 2026-05-21 · 回顾性多中心+读者研究（n=1707） · [DOI](https://doi.org/10.1097/js9.0000000000005183)

回顾性多中心研究，纳入6家机构1707个手术切除并病理确诊的纯磨玻璃结节（pGGN），开发Lung-PNetV2深度学习框架（跨扫描仪归一化+ResNet-18三维编码+影像/结节/临床多模态融合），训练847、内部验证203、外部验证657。模型AUC 0.892/0.831/0.827，显著优于7名临床医师（0.681–0.722，P<0.01）；外部集准确率81.0%、敏感度67.7%、特异度84.1%、阴性预测值91.8%，帮助筛选需手术的浸润性腺癌（IAC）候选者。

> **要点**：CT深度学习判别pGGN浸润性超越专家，支持“手术/观察”分层决策。


### 9. 检测腹部CT游离气体以辅助手术决策的深度学习模型开发

*Development of a deep-learning model to detect free air on abdominal computed tomography for surgical decision support*

**International Journal of Surgery** · 2026-05-07 · 回顾性开发+多机构验证(分割模型) · [DOI](https://doi.org/10.1097/js9.0000000000005385)

回顾性开发加多中心验证研究，构建分割模型Free Air-Net并经负样本训练得FA-NET-NT以检测腹部CT游离气体(FA)。开发集n=162、时间内部队列n=215、外部队列n=237；两模型Dice均达0.87，FA-NET-NT图像级特异度96%、敏感度85%，患者级对溃疡穿孔敏感度95-96%、对非FA疾病特异度82-92%(肠梗阻仅62%)；外部验证对溃疡穿孔敏感度95%。

> **要点**：FA-NET-NT可稳健检测游离气体、辅助急腹症手术决策


### 10. 种植体美学风险影像替代标志物的深度学习模型开发与临床验证

*Deep learning model development and clinical validation for radiographic surrogate markers of implant esthetic risk.*

**npj Digital Medicine** · 2026-05-05 · 模型开发+多策略临床验证 · [PMID 42086729](https://pubmed.ncbi.nlm.nih.gov/42086729/) · [DOI](https://doi.org/10.1038/s41746-026-02696-1)

开发多功能AI从根尖片自动评估种植体美学风险替代标志物（根尖炎症、邻牙修复、接触点至牙槽嵴距离）。AI在炎症/修复任务与初级牙医相当、在距离任务显著优于专家；人机协作显著提升召回率，探索性前瞻与多中心验证泛化性可接受、特异度高。服务种植（外科）术前评估与决策支持。

> **要点**：AI辅助种植前美学风险评估，提升牙医表现。


### 11. 肾肿瘤多分类的多模态深度学习模型（MPANet）

*Multimodal deep learning model for multiclass classification of renal tumors.*

**npj Digital Medicine** · 2026-05-04 · 多中心回顾性开发与外部验证 · [PMID 42082763](https://pubmed.ncbi.nlm.nih.gov/42082763/) · [DOI](https://doi.org/10.1038/s41746-026-02697-0)

开发MPANet整合多期增强CT与临床信息，对四类易混肾肿瘤（ccRCC、pRCC、嗜酸细胞类、乏脂AML）多分类，1688例多中心。内部测试macro-AUC 0.850、micro-AUC 0.865、准确率73.3%，优于放射科医生（准确率43.6-62.4%）；两外部集macro-AUC 0.811/0.813。术前肿瘤分型直接服务外科治疗决策。

> **要点**：多期CT深度学习术前鉴别肾肿瘤，优于医生。


### 12. 可解释机器学习通过常规血液标志物鉴别坏死性筋膜炎与骨髓炎

*Explainable machine learning differentiates necrotizing fasciitis and osteomyelitis via routine blood biomarkers.*

**npj Digital Medicine** · 2026-04-29 · 回顾性多中心建模与外部验证 · [PMID 42056542](https://pubmed.ncbi.nlm.nih.gov/42056542/) · [DOI](https://doi.org/10.1038/s41746-026-02686-3)

基于回顾性多中心队列3415例(坏死性筋膜炎NF 579、骨髓炎OM 2836)开发并验证可解释ML模型，以常规血液标志物鉴别两种肢体威胁性感染。最优10标志物LightGBM在外部队列判别AUC 0.926；可解释性分析显示预测由严重炎症与代谢紊乱等临床相关标志物驱动，并部署为公开网页实时风险分层工具。

> **要点**：可解释ML快速鉴别NF(需急诊清创)与OM，外部AUC 0.926，直接服务手术决策。


### 13. 深度学习自动评分药物诱导睡眠内镜用于阻塞性睡眠呼吸暂停

*Deep learning-based automatic scoring of drug-induced sleep endoscopy in obstructive sleep apnea.*

**npj Digital Medicine** · 2026-04-28 · 内外部验证的深度学习研究 · [PMID 42050026](https://pubmed.ncbi.nlm.nih.gov/42050026/) · [DOI](https://doi.org/10.1038/s41746-026-02673-8)

基于EfficientNet-B2与注意力多示例学习，用五家韩国医院1904例DISE视频预测气道阻塞程度与主要病因。DISE-V-obs、DISE-OTE-obs、DISE-OTE-cause的F1分别为84.7%、74.7%、88.2%。客观化阻塞评估服务OSA治疗与手术规划决策。

> **要点**：深度学习客观化DISE评分，助OSA外科治疗规划。


### 14. 术前识别病理高危因素优化肺腺癌手术决策：深度学习模型的回顾性开发与前瞻性验证

*Optimizing surgical decision-making for lung adenocarcinoma by preoperatively identifying pathological high-risk factors: retrospective development and prospective validation of a deep learning model*

**International Journal of Surgery** · 2026-03-17 · 回顾性开发+前瞻性观察性验证(预注册) · [DOI](https://doi.org/10.1097/js9.0000000000005084)

回顾性开发加前瞻性验证研究，基于术前CT构建知识图卷积网络(KB-GCN)识别早期肺腺癌病理高危因素(PHRF)。回顾性内部验证AUC 0.92(95%CI 0.86-0.97)、外部0.88(95%CI 0.81-0.94)，优于6种经典2D/3D CNN(最佳0.79)；前瞻性200例中术中冰冻(FS)敏感度59%、准确率77%(漏诊40.6%)，KB-GCN敏感度82%、AUC 0.83(特异度75% vs FS 92%)，在部分实性结节及2-3cm肿瘤中表现更优(AUC 0.86)。

> **要点**：术前深度学习模型敏感度显著高于术中冰冻，可弥补FS不足以优化切除范围决策


### 15. 用于甲状腺结节术前诊断的靶向蛋白质组学检测(ThyroProt)

*A targeted proteomics assay for the preoperative diagnosis of thyroid nodules.*

**Cell Reports Medicine** · 2026-03-10 · 前瞻性多中心诊断分类器开发与验证 · [PMID 41812663](https://pubmed.ncbi.nlm.nih.gov/41812663/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102664)

前瞻性、非干预、盲法、多中心研究建立ThyroProt分类器,整合3蛋白质谱定量、BRAF V600E状态、年龄与性别用于甲状腺结节术前诊断。建模/验证共837份FNA样本,前瞻测试集322份,AUC 0.94、总体准确率90.7%;Bethesda III/IV亚组准确率88.0%(敏感度82.4%、特异度100%);两独立多中心队列AUC 0.87-0.91、准确率84.3%-85.7%。

> **要点**：蛋白质组分类器改善不确定细胞学甲状腺结节术前诊断(AUC 0.94),辅助手术决策


### 16. AI超声诊断与分层滤泡性甲状腺肿瘤：多中心研究

*Artificial intelligence-enabled ultrasound diagnosis and stratification of follicular thyroid neoplasms: a multi-center study.*

**npj Digital Medicine** · 2026-03-05 · 多中心回顾性诊断建模研究 · [PMID 41781694](https://pubmed.ncbi.nlm.nih.gov/41781694/) · [DOI](https://doi.org/10.1038/s41746-026-02489-6)

为术前区分滤泡性甲状腺癌(FTC)与腺瘤(FTA)，用31家医院数据(1531例开发、900例三外部测试集)构建深度学习超声模型。FTC vs FTA判别外部AUC 0.816-0.847，侵袭亚型AUC 0.754-0.910，三分类宏AUC 0.818-0.861，一致优于放射科医生并作为辅助工具提升准确率。直接服务术前外科决策，核心相关。

> **要点**：AI超声无创术前鉴别滤泡性甲状腺癌，服务外科决策。


### 17. 域自适应深度对比网络用于MRI驱动的膀胱癌分类（DADCNet）

*A domain-adaptive deep contrastive network for magnetic resonance imaging-driven bladder cancer classification.*

**npj Digital Medicine** · 2026-03-03 · 深度学习方法开发（多中心） · [PMID 41775791](https://pubmed.ncbi.nlm.nih.gov/41775791/) · [DOI](https://doi.org/10.1038/s41746-026-02499-4)

提出域自适应深度对比网络DADCNet区分非肌层浸润(NMIBC)与肌层浸润(MIBC)膀胱癌——该分期直接决定经尿道切除或根治性膀胱切除的术式选择。联合源域与目标域学习域不变判别表征并引入深度对比，在多中心数据上准确率0.955、F1 0.955、AUC 0.991，优于CNN与Transformer方法。

> **要点**：域自适应网络高精度判别膀胱癌肌层浸润，服务术式决策。


### 18. 深度学习快速筛查与定位脊髓硬脊膜动静脉瘘以优化临床流程

*Deep learning for fast screening and localization of spinal dural arteriovenous fistulas to enhance clinical workflow.*

**npj Digital Medicine** · 2026-02-27 · 多中心深度学习开发与验证 · [PMID 41760890](https://pubmed.ncbi.nlm.nih.gov/41760890/) · [DOI](https://doi.org/10.1038/s41746-026-02474-z)

开发自动AI系统SDAVFdoc，整合3D卷积网络与解剖先验，在718例多中心队列中识别并定位脊髓硬脊膜动静脉瘘(SDAVF)瘘口。引流静脉丛分割(阈值42.5)区分SDAVF的F1 0.932-0.960，DenseNet瘘口检测AUC 0.928-0.954；较技师将处理时间从40.75±11.57分降至1.05±0.29分、点击从761.80降至9.68(均P<0.001)。

> **要点**：AI快速筛查并定位SDAVF瘘口，大幅缩短流程，支持治疗定位规划。


### 19. AI辅助综合模型预测浅表食管鳞癌淋巴结转移:一项诊断研究

*An artificial intelligence-assisted comprehensive model for predicting lymph node metastasis in superficial esophageal squamous cell carcinoma: a diagnostic study.*

**International Journal of Surgery** · 2026-02-25 · 两中心回顾性诊断研究(影像组学+DNN) · [PMID 41738619](https://pubmed.ncbi.nlm.nih.gov/41738619/) · [DOI](https://doi.org/10.1097/JS9.0000000000004969)

整合CT影像组学与临床风险因素构建组合模型预测浅表ESCC淋巴结转移。两中心473例(训练/内部403、外部70),影像组学特征输入深度神经网络(DNN)。组合模型AUC分别为训练0.95(95%CI 0.91-0.99)、内部验证0.93、外部验证0.88;pT分期、分化差、肿瘤大小为独立预测因子。

> **要点**：临床-影像组学DNN术前预测浅表ESCC淋巴结转移(外部AUC 0.88),指导术式选择


### 20. 基于人工智能的自动化无创烧伤诊断系统：AMBUSH-AI

*Automated Noninvasive Burn Diagnostic System for Health Care Using Artificial Intelligence: AMBUSH-AI.*

**Annals of Surgery** · 2026-02-19 · 动物模型+前瞻性人体研究(AI影像判读) · [PMID 41709317](https://pubmed.ncbi.nlm.nih.gov/41709317/) · [DOI](https://doi.org/10.1097/SLA.0000000000007029)

先用猪烧伤模型(n=12)构建AI框架，再在30例热烧伤患者前瞻验证，结合组织多普勒弹性成像(TDI)与谐波B型超声由AI预测烧伤深度。AI在猪识别三度烧伤准确率100%、在人达95%(对照：烧伤专家76%、非专家50%)，为判定是否需手术提供无创依据。

> **要点**：AI判读超声弹性/B型图像无创预测烧伤深度，辅助判断是否需手术。


### 21. 评“基于超声的深度学习生境影像组学预测甲状腺癌术前进展与术后复发风险的多中心研究”

*Comment on "Deep learning habitat radiomics based on ultrasound for predicting preoperative locally progression and postoperative recurrence risk of thyroid cancer: a multicenter study".*

**International Journal of Surgery** · 2026-02-03 · 评论(无原始数据) · [PMID 41632014](https://pubmed.ncbi.nlm.nih.gov/41632014/) · [DOI](https://doi.org/10.1097/JS9.0000000000004818)

针对一项超声深度学习生境(habitat)影像组学模型（预测甲状腺癌术前局部进展与术后复发）的评论，无独立数据。涉及外科相关的影像AI决策讨论。

> **要点**：关于甲状腺癌DL影像组学预测的评论。


### 22. 基于TabPFN与AI直方图特征的IA期肺腺癌亚型三分类：多中心回顾队列

*TabPFN-driven ternary classification of stage IA lung adenocarcinoma subtypes using AI-derived histogram features a retrospective multicenter cohort study.*

**International Journal of Surgery** · 2026-02-03 · 多中心回顾性队列(诊断建模) · [PMID 41632008](https://pubmed.ncbi.nlm.nih.gov/41632008/) · [DOI](https://doi.org/10.1097/JS9.0000000000004585)

多中心回顾研究，584例IA期肺腺癌（训练/验证412例，外部测试114+58例），用商用AI(InferRead CT Lung)自动提取26个直方图特征，TabPFN联合5种ML算法对PGL/MIA/IAC三分类。TabPFN外部集macro-AUC 0.781–0.911、准确率67.2–78.9%，优于其他ML；准确率总体优于术中冰冻(外部2：67.2% vs 43.1%，P<0.001)，mGGN亚组达85%。

> **要点**：TabPFN术前三分类肺腺癌亚型，优于常规ML与冰冻切片。


### 23. 整合自动体积体成分分析的可解释AI预测胃肠胰神经内分泌肿瘤病理分级：多中心队列

*An explainable AI workflow integrating automated volumetric body composition analysis for predicting pathological grading of gastroenteropancreatic neuroendocrine neoplasms: a multicenter cohort study.*

**International Journal of Surgery** · 2026-01-29 · 多中心回顾性队列(自动分割+ML) · [PMID 41609392](https://pubmed.ncbi.nlm.nih.gov/41609392/) · [DOI](https://doi.org/10.1097/JS9.0000000000004879)

多中心回顾队列，633例GEP-NEN(训练403/内验174/外测56)，用nnUNetv2自动分割腹部脂肪与骨骼肌(Dice=0.98)，XGBoost结合体成分参数预测高/低级别；训练/验证/测试集AUC分别0.863/0.750/0.717，SHAP示相对肌间脂肪(rIMAT)贡献最大。为术前无创分级工具。

> **要点**：nnUNet体成分+XGBoost术前预测GEP-NEN病理分级。


### 24. 多模态数字活检术前预测胃癌隐匿性腹膜转移

*Multimodal digital biopsy for preoperative prediction of occult peritoneal metastasis in gastric cancer.*

**npj Digital Medicine** · 2026-01-26 · 多中心回顾加前瞻验证 · [PMID 41588105](https://pubmed.ncbi.nlm.nih.gov/41588105/) · [DOI](https://doi.org/10.1038/s41746-025-02268-9)

整合原发肿瘤CT影像组学与临床因素的多模态模型无创预测局部晚期胃癌隐匿性腹膜转移(OPM)，以减少有创分期腹腔镜。训练/内验证n=940，外部两队列n=309、增量队列n=477、前瞻试验队列n=168，各队列AUC 0.834-0.857，显著优于单模态；AI辅助使放射科医师平均AUC由0.735升至0.872，低危分层对应更强抗肿瘤免疫微环境。

> **要点**：无创预测胃癌腹膜转移AUC 0.834-0.857，助医师升至0.872。


### 25. 基于影像预测肝细胞癌转化治疗的持久获益：对外科决策的意义

*Imaging-based prediction of durable benefit in conversion therapy for hepatocellular carcinoma: implications for surgical decision-making.*

**International Journal of Surgery** · 2026-01-21 · 影像预测研究/观点（摘要缺失） · [PMID 41563037](https://pubmed.ncbi.nlm.nih.gov/41563037/) · [DOI](https://doi.org/10.1097/JS9.0000000000004810)

探讨基于影像的预测方法评估肝细胞癌（HCC）转化治疗的持久获益，并直接讨论其对外科（转化后切除）决策的意义。（仅标题、无摘要，具体模型与效能未获取。）

> **要点**：影像预测HCC转化治疗获益以指导手术决策。


### 26. 基于CT深度学习影像组学与基因组学的上皮性卵巢癌术前分期预测模型

*CT deep learning radiomics and genomics for predicting staging of epithelial ovarian cancer.*

**International Journal of Surgery** · 2026-01-19 · 多中心回顾性诊断模型开发与外部验证 · [PMID 41556167](https://pubmed.ncbi.nlm.nih.gov/41556167/) · [DOI](https://doi.org/10.1097/JS9.0000000000004924)

回顾性纳入3家医院201例上皮性卵巢癌（EOC），按8:2分为训练集160例与内部验证集41例，另以TCGA 84例作外部验证；从CT提取1130个影像组学特征与512个深度学习（DL）特征，经mRMR+LASSO筛选后以logistic回归构建联合模型。联合模型预测分期AUC在训练/内部验证/外部集分别为0.910、0.913、0.882，DCA显示阈值概率>20%时具临床价值，晚期组免疫浸润更高。

> **要点**：CT影像组学+DL+转录组联合模型可术前准确判定EOC分期，服务手术决策。


### 27. 来信：自监督学习融合平扫与增强CT术前识别坏疽性胆囊炎

*Letter to the Editor: Self-supervised learning model integrates plain and contrast-enhanced CT for preoperatively identifying gangrenous cholecystitis: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2026-01-13 · 评论/来信（Letter） · [PMID 41549837](https://pubmed.ncbi.nlm.nih.gov/41549837/) · [DOI](https://doi.org/10.1097/JS9.0000000000004756)

本文为针对「自监督学习模型融合平扫与增强CT术前识别坏疽性胆囊炎多中心回顾队列」研究的来信/评论（无原始数据，摘要缺失）。原研究以自监督学习（AI）实现坏疽性胆囊炎的术前影像识别，直接服务胆囊切除的手术决策与紧迫性判断。

> **要点**：关于AI术前识别坏疽性胆囊炎、指导手术的学术通讯。


### 28. 深度学习对CTA上肾下腹主动脉瘤的容积分析

*Deep learning based volumetric analysis of infrarenal abdominal aortic aneurysms characterized on CTA.*

**npj Digital Medicine** · 2026-01-10 · 回顾性开发加内外部验证 · [PMID 41519965](https://pubmed.ncbi.nlm.nih.gov/41519965/) · [DOI](https://doi.org/10.1038/s41746-025-02262-1)

训练网络对CTA上EVAR术前/术后肾下腹主动脉瘤(AAA)自动分割与容积测定并评估工作流提速。全瘤体内部/外部验证平均Dice 0.972±0.013与0.960±0.035，AI血栓容积与金标准强相关(内部r=0.996、外部r=0.940)，全瘤体平均节省117.1秒(56.0%)。为机构无关网络，服务EVAR围术期评估。

> **要点**：AAA容积自动分析Dice 0.972，EVAR评估提速56%。


### 29. 融合临床-病理-内镜数据的深度学习模型改进早期胃癌淋巴结转移预测

*Integration of clinical, pathological, and endoscopic data improves prediction for lymph node metastasis in early gastric cancer: a retrospective multicenter study.*

**International Journal of Surgery** · 2026-01-07 · 多中心回顾性DL模型开发+阅片者研究 · [PMID 41536186](https://pubmed.ncbi.nlm.nih.gov/41536186/) · [DOI](https://doi.org/10.1097/JS9.0000000000004707)

多中心回顾性研究纳入5家机构605例早期胃癌（EGC）；深度学习模型LNMate预测ESD前淋巴结转移（LNM）AUC 0.843–0.875，辅助内镜医师诊断准确率提升13.8%（特异度平均+0.17，P=0.03）；ESD后深度学习内镜nomogram（DLEN）AUC 0.91优于eCura的0.71（P<0.01），减少过度手术24.2%且无假阴性。

> **要点**：DL全流程系统精准预测EGC淋巴结转移，指导ESD/手术决策。


### 30. 3D深度学习量化胰腺癌血管侵犯的临床验证研究（PAN-VIQ）

*A clinically validated 3D deep learning approach for quantifying vascular invasion in pancreatic cancer.*

**npj Digital Medicine** · 2025-12-31 · 深度学习模型开发+前瞻性验证（回顾+前瞻） · [PMID 41476122](https://pubmed.ncbi.nlm.nih.gov/41476122/) · [DOI](https://doi.org/10.1038/s41746-025-02260-3)

针对胰腺导管腺癌（PDAC）术前可切除性评估，构建自动化深度学习框架PAN-VIQ，从增强CT分割胰腺肿瘤及腹腔干、肝总动脉、肠系膜上动/静脉、门静脉5条关键血管，以3D包绕角度量化肿瘤-血管相互作用。模型在2130例训练与内部验证，前瞻性检验202例，外部验证准确率超过90%；前瞻评估中优于初级放射科医师、与高年资医师相当。提示可标准化血管侵犯评估、降低观察者间差异。

> **要点**：自动化3D量化胰腺癌血管侵犯，术前可切除性评估准确率>90%，达高年资放射科医师水平。


### 31. 基于深度学习的CBCT上颌窦自动分割与骨移植分析（SA-ai）

*A deep learning based automated maxillary sinus segmentation and bone grafts analysis in CBCT images.*

**npj Digital Medicine** · 2025-12-31 · 深度学习系统开发+临床验证（配对CBCT，85例） · [PMID 41469515](https://pubmed.ncbi.nlm.nih.gov/41469515/) · [DOI](https://doi.org/10.1038/s41746-025-02275-w)

为上颌窦提升术后骨增量评估构建全自动深度学习系统SA-ai，整合2D U-Net（窦轮廓）与3D V-Net（上颌骨分割）。85例配对CBCT训练测试，Dice达93.2%、配准RMSE 1.046 mm；与手工测量相比骨体积一致性ICC=0.993，效率提升20倍以上。为种植治疗提供客观、可纵向监测骨移植体积的自动化方案。

> **要点**：上颌窦提升植骨自动量化，Dice 93.2%、体积ICC 0.993，效率提升>20倍。


### 32. 可解释深度学习从CT进行多中心胃癌T分期

*Interpretable deep learning for multicenter gastric cancer T staging from CT images.*

**npj Digital Medicine** · 2025-12-20 · 多中心回顾性可解释深度学习建模 · [PMID 41422179](https://pubmed.ncbi.nlm.nih.gov/41422179/) · [DOI](https://doi.org/10.1038/s41746-025-02002-5)

构建端到端可解释深度学习GTRNet，无需手工分割即从常规增强CT分类胃癌T1-T4。多中心回顾1792例，取最大轴位肿瘤层面训练，两个外部队列验证AUC 0.86-0.95、准确率81-85%，优于放射科医师；Grad-CAM定位至胃壁与浆膜；结合深度rad-score与肿瘤大小/分化/Lauren分型的列线图临床净获益更高。可标准化CT分期、支持术前决策与新辅助治疗选择。

> **要点**：CT深度学习自动胃癌T分期AUC 0.86-0.95、准确率81-85%，服务术前决策。


### 33. 少样本视觉-语言三分类模型从胸部CT预测肺腺癌侵袭性

*Predicting Invasiveness of Lung Adenocarcinoma from Chest CT with Few-shot Vision-Language Ternary Classification Model.*

**npj Digital Medicine** · 2025-12-20 · 多中心回顾性视觉-语言模型研究+读片者试验 · [PMID 41422131](https://pubmed.ncbi.nlm.nih.gov/41422131/) · [DOI](https://doi.org/10.1038/s41746-025-02229-2)

多中心回顾848例病理确诊、表现为纯磨玻璃结节（pGGN）的肺腺癌，用GPT-4o定位结节并识别10项侵袭性相关特征以三分类（浸润前/微浸润/浸润性腺癌），并与Molmo比较。二十样本GPT-4o三分类显著更优（DeLong P<0.01）；6名放射医师在GPT-4o辅助下诊断准确率平均提升，可靠性、使用意愿高、危害风险低。服务术前浸润性判断与切除范围决策。

> **要点**：二十样本GPT-4o预测pGGN浸润性并提升医师诊断准确率，服务术前决策。


### 34. 深度卷积神经网络自动判读白细胞酯酶试纸辅助诊断假体周围关节感染

*Auxiliary diagnosis of periprosthesis joint infection by leukocyte esterase strips test using a deep learning model.*

**International Journal of Surgery** · 2025-12-19 · 前瞻性诊断试验（DCNN图像分类） · [PMID 41417979](https://pubmed.ncbi.nlm.nih.gov/41417979/) · [DOI](https://doi.org/10.1097/JS9.0000000000004576)

前瞻性诊断试验，基于AlexNet的DCNN用46例训练、78例前瞻分析，以ICM2018为金标准诊断假体周围关节感染（PJI）；离心前AUC 0.92（敏感度0.83、特异度0.97、PPV 0.98），离心后AUC 0.91（特异度1.00、PPV 1.00），与传统方法一致性Kappa 0.82（P<0.05）。属外科（关节置换）相关的AI诊断辅助。

> **要点**：DCNN判读LE试纸客观化诊断PJI，指导翻修决策。


### 35. AI影像组学与深度学习模型革新桥本甲状腺炎背景下甲状腺结节诊断

*Revolutionizing thyroid nodule diagnosis in Hashimoto's thyroiditis: AI-driven radiomics and deep learning model.*

**International Journal of Surgery** · 2025-12-16 · 多中心回顾性DLR模型+两轮阅片研究 · [PMID 41405348](https://pubmed.ncbi.nlm.nih.gov/41405348/) · [DOI](https://doi.org/10.1097/JS9.0000000000004546)

回顾8家医院1585例桥本甲状腺炎（HT）患者超声，构建DL-影像组学（DLR, ResNet152）模型；LR模型验证集AUC 0.917、准确率85.7%、敏感度81.8%、特异度86.6%，外部集AUC 0.827、准确率93.9%、特异度96.3%；诊断效能优于低年资医师且与FNA联合BRAFV600E检测相当。

> **要点**：DLR模型无创鉴别HT背景甲状腺结节良恶性，减少不必要活检/手术。


### 36. 整合临床症状的纵向关节间隙影像组学模型提升全膝关节置换预测

*Enhancing total knee replacement prediction: a longitudinal joint space radiomic model integrated with clinical symptoms.*

**International Journal of Surgery** · 2025-12-11 · 回顾性影像组学模型(含读片者实验) · [PMID 41376347](https://pubmed.ncbi.nlm.nih.gov/41376347/) · [DOI](https://doi.org/10.1097/JS9.0000000000004427)

基于OAI队列442膝、1227次MRI,用深度学习提取关节间隙(半月板与股胫软骨)影像组学特征并整合KOOS评分构建JSC-RM模型预测4年内全膝置换(TKR)。总测试集AUC 0.85(0.82-0.88),高风险OR 22.9(13.8-37.9);外科医生借助模型后敏感度42%→72%、特异度45%→78%。

> **要点**：关节间隙深度学习影像组学+KOOS可较好预测TKR并提升医生判读。


### 37. 基于瘤内异质性评分的机器学习定量预测原发性肺腺癌气腔播散

*Machine learning-based quantitative prediction of spread through air spaces in primary lung adenocarcinoma using intratumoural heterogeneity scores.*

**International Journal of Surgery** · 2025-12-11 · 回顾性多队列影像组学研究 · [PMID 41376342](https://pubmed.ncbi.nlm.nih.gov/41376342/) · [DOI](https://doi.org/10.1097/JS9.0000000000004447)

从术前CT瘤内与瘤周提取常规影像组学与生境(habitat)特征并构建瘤内异质性(ITH)评分,以ML术前预测原发肺腺癌气腔播散(STAS)。共1268例(训练943/验证236/外测89),LightGBM联合模型AUC训练0.97、验证0.98、外测0.91,可指导手术切除范围决策。

> **要点**：术前CT影像组学联合ITH评分高精度预测STAS以指导手术策略。


### 38. 基于超声的深度学习生境影像组学预测甲状腺癌术前局部进展与术后复发风险:多中心研究

*Deep learning habitat radiomics based on ultrasound for predicting preoperative locally progression and postoperative recurrence risk of thyroid cancer: a multicenter study.*

**International Journal of Surgery** · 2025-12-10 · 多中心回顾性+前瞻性影像组学研究 · [PMID 41363706](https://pubmed.ncbi.nlm.nih.gov/41363706/) · [DOI](https://doi.org/10.1097/JS9.0000000000004415)

多中心1881例甲状腺癌(8中心1383例按7:3分训练/内测,外中心498例外测,前瞻130例验证),以超声深度学习生境影像组学(DLH)预测局部进展期(LATC)与复发。临床-影像组学列线图术前识别LATC的AUC内测0.852、外测0.897;Cox示DLH、肿瘤大小、术式、淋巴结转移数为无复发生存独立预测因素。

> **要点**：超声深度学习影像组学可术前识别甲状腺癌局部进展并预测复发。


### 39. 外周血单细胞免疫特征驱动的小侵袭性肺结节精准诊断

*Precise diagnosis of small invasive pulmonary nodules driven by single-cell immune signatures in peripheral blood.*

**Nature Communications** · 2025-12-08 · 多中心前瞻性研究 · [PMID 41360981](https://pubmed.ncbi.nlm.nih.gov/41360981/) · [DOI](https://doi.org/10.1038/s41467-025-65930-6)

多中心前瞻性研究,将质谱流式(mass cytometry)外周血免疫分型与机器学习结合,构建肺结节管理平台。可准确区分侵袭性与非侵袭性肺结节(AUC=0.952),优于既有临床与影像组学模型;并有效区分微浸润与浸润性腺癌(AUC=0.949),为手术决策提供指导。

> **要点**：外周血免疫分型+ML判定肺结节侵袭性(AUC 0.952),直接指导外科决策


### 40. 来信:构建兼具临床基础与生物可解释性的AI模型预测甲状腺乳头状癌淋巴结转移

*Letter: Building AI models with both clinical foundations and biological interpretability to predict lymph node metastasis in papillary thyroid cancer.*

**International Journal of Surgery** · 2025-12-04 · 来信(无数据) · [PMID 41342461](https://pubmed.ncbi.nlm.nih.gov/41342461/) · [DOI](https://doi.org/10.1097/JS9.0000000000004300)

针对一篇构建AI模型(强调临床基础与生物可解释性)预测甲状腺乳头状癌淋巴结转移的来信,无原始数据。主题为术前淋巴结转移预测直接服务外科决策(中央区清扫),核心相关。

> **要点**：评述AI预测甲状腺乳头状癌淋巴结转移,服务外科决策。


### 41. 关于「基于超声与机器学习改进食管鳞癌颈部淋巴结转移预测」的来信

*Letter to the editor: Improvement in the prediction of cervical lymph node metastasis in esophageal squamous cell carcinoma based on ultrasonography and machine learning.*

**International Journal of Surgery** · 2025-12-03 · 来信(无数据) · [PMID 41342648](https://pubmed.ncbi.nlm.nih.gov/41342648/) · [DOI](https://doi.org/10.1097/JS9.0000000000004330)

针对一篇用超声+机器学习预测食管鳞癌颈部淋巴结转移论文的来信,无原始数据。主题为术前淋巴结转移(分期)预测直接服务外科决策(清扫范围),核心相关。

> **要点**：评述超声+ML预测食管癌颈部淋巴结转移,服务外科分期决策。


### 42. AI影像决策支持用于英格兰急性卒中治疗:一项前瞻性观察研究

*Artificial intelligence imaging decision support for acute stroke treatment in England: a prospective observational study.*

**The Lancet Digital Health** · 2025-12-02 · 前瞻性观察(实施效果)研究 · [PMID 41339157](https://pubmed.ncbi.nlm.nih.gov/41339157/) · [DOI](https://doi.org/10.1016/j.landig.2025.100927)

前瞻性观察(实施效果)研究,利用英格兰NHS国家卒中审计数据评估26家医院系统性引入卒中AI影像软件(Brainomix 360)对血管内取栓的影响。2019-2023年107家医院共收治452,952例卒中。评估点医院取栓率由2.3%(376/15969)升至4.6%(751/15428,相对增100%),非评估点由1.6%升至2.6%(交互OR 1.24,95%CI 1.08-1.43,p=0.0026);患者层面使用AI软件与更高取栓可能性相关(OR 1.57,95%CI 1.33-1.86,p<0.0001)。

> **要点**：卒中AI影像软件与血管内取栓率翻倍相关(OR 1.57),支持影像AI辅助介入选择常规应用。


### 43. 基于侵袭弱监督的MRI影像组学识别评估侵袭性垂体神经内分泌肿瘤

*An MRI radiomics approach using invasion-based weak supervision for identifying and evaluating aggressive PitNETs.*

**npj Digital Medicine** · 2025-12-02 · 多中心回顾性深度学习影像组学建模 · [PMID 41331080](https://pubmed.ncbi.nlm.nih.gov/41331080/) · [DOI](https://doi.org/10.1038/s41746-025-02189-7)

构建深度学习影像组学（DLR）模型（自动分割+特征提取/选择+DLR评分），三中心共1089例训练与验证。用nnUnet与微调Swin Transformer筛选13个关键特征，DLR评分与Knosp、Hardy-Wilson侵袭分级强相关，且在预测复发及提示侵袭性病理标志（Ki-67、p53、巨噬细胞）、生物学通路（MAPK、TGF-β）上表现更优，并部署为在线平台。为术前无创识别PitNET侵袭性提供影像标志物。

> **要点**：MRI影像组学DLR评分术前无创评估垂体瘤侵袭性，优于Knosp/Hardy-Wilson并预测复发。


### 44. PlaqueCap：基于视觉-语言模型与提示注入的血管内超声动脉粥样斑块病灶级描述

*PlaqueCap: lesion-centered captioning of atherosclerotic plaques in intravascular ultrasound using vision-language models and prompt injection.*

**npj Digital Medicine** · 2025-11-20 · 视觉-语言模型框架开发(IVUS) · [PMID 41266555](https://pubmed.ncbi.nlm.nih.gov/41266555/) · [DOI](https://doi.org/10.1038/s41746-025-02044-9)

提出病灶中心的描述生成框架PlaqueCap，先高保真分割定位斑块，再用病灶提示注入(LPI)模块将空间信息注入预训练视觉-语言模型，直接从血管内超声(IVUS)图像生成临床可解释的自然语言描述。在自建IVUS数据集上实现准确的病灶定位与分类，定量指标与专家评价均超越基线，面向介入心脏病学的可解释AI与自动报告。

> **要点**：VLM实现IVUS斑块病灶级自动描述，服务冠脉介入决策与报告。


### 45. 颞叶癫痫多尺度功能改变的个体化生物标志物

*Personalized biomarkers of multiscale functional alterations in temporal lobe epilepsy.*

**Nature Communications** · 2025-11-19 · 多中心横断面/建模研究 · [PMID 41258102](https://pubmed.ncbi.nlm.nih.gov/41258102/) · [DOI](https://doi.org/10.1038/s41467-025-65042-1)

多中心研究，分析282例颞叶癫痫（TLE）、298名健康对照与45例疾病对照的多模态MRI与临床数据，用规范建模（normative modeling）刻画个体相对正常寿命轨迹的脑功能偏离并做连接组仿真。监督学习模型区分TLE与疾病对照AUC 0.77、致痫灶定侧AUC 0.74、预测术后无发作AUC 0.64；对侧颞叶偏离越大术后结局越差。支持对局灶性癫痫开展精准术前评估。

> **要点**：个体化功能生物标志物服务癫痫术前定侧与手术结局预测（定侧AUC 0.74）。


### 46. 早期肺腺癌影像组学：是否应重新审视磨玻璃结节的PET-CT（致编辑信）

*Radiomics in early lung adenocarcinoma: should we rethink PET-CT for ground-glass nodules? Letter to the editor: Non-invasive prediction of invasive lung adenocarcinoma and high-risk histopathological characteristics in resectable early-stage adenocarcinoma by [18F]FDG PET/CT radiomics-based machine learning models: a prospective cohort study.*

**International Journal of Surgery** · 2025-11-18 · 致编辑信/评论 · [PMID 41255287](https://pubmed.ncbi.nlm.nih.gov/41255287/) · [DOI](https://doi.org/10.1097/JS9.0000000000003720)

致编辑信，评论一项前瞻队列研究——基于[18F]FDG PET/CT影像组学机器学习模型无创预测可切除早期肺腺癌的浸润性及高危组织病理特征。信函质疑PET-CT用于磨玻璃结节的价值，本身无原始数据，但主题为服务外科切除决策的术前影像组学ML。

> **要点**：术前影像组学ML服务可切除肺腺癌决策，核心DIAG。


### 47. 就「DeepSeek辅助LI-RADS分类：AI驱动的肝细胞癌诊断精准化」的评论

*Comments on "DeepSeek-assisted LI-RADS classification: AI-driven precision in hepatocellular carcinoma diagnosis".*

**International Journal of Surgery** · 2025-11-12 · 评论/通讯（无摘要） · [PMID 41222909](https://pubmed.ncbi.nlm.nih.gov/41222909/) · [DOI](https://doi.org/10.1097/JS9.0000000000004052)

评论类（无摘要），针对以DeepSeek辅助LI-RADS分类、AI驱动提升肝细胞癌（HCC）诊断精准度的研究展开讨论。主题为服务HCC外科/移植决策的AI影像诊断分类，属手术+AI核心议题。

> **要点**：AI辅助LI-RADS分类服务HCC外科决策，核心DIAG。


### 48. 基于Transformer的深度学习术前预测喉鳞癌淋巴管血管侵犯

*A transformer-based deep learning model for preoperative prediction of lymphovascular invasion in laryngeal squamous cell carcinoma: a multicenter study.*

**International Journal of Surgery** · 2025-11-11 · 多中心回顾性诊断研究 · [PMID 41231622](https://pubmed.ncbi.nlm.nih.gov/41231622/) · [DOI](https://doi.org/10.1097/JS9.0000000000004012)

多中心诊断研究纳入1024例喉鳞癌（训练291、内部验证126、外部437+170），基于增强CT提取影像组学与深度学习特征，构建Transformer混合模型术前无创预测淋巴管血管侵犯（LVI）。DLR随机森林模型AUC 0.812-0.867，Transformer混合模型各集AUC 0.881/0.843/0.833/0.836，NRI、IDI改善。

> **要点**：Transformer影像组学术前预测喉鳞癌LVI服务外科决策，核心DIAG。


### 49. 就「多通道深度学习预测肺癌MPR：算法卓越与临床落地间的转化陷阱」的致编辑信

*Letter to the Editor: "Multichannel deep learning for MPR prediction in lung cancer: navigating translational pitfalls between algorithmic excellence and clinical deployment".*

**International Journal of Surgery** · 2025-11-10 · 致编辑信（无摘要） · [PMID 41208798](https://pubmed.ncbi.nlm.nih.gov/41208798/) · [DOI](https://doi.org/10.1097/JS9.0000000000003962)

致编辑信（无摘要），针对使用多通道深度学习预测肺癌主要病理缓解（MPR）的研究，探讨算法性能与临床部署间的转化难题。主题为服务可切除肺癌新辅助/手术决策的深度学习预测，属手术+AI核心议题。

> **要点**：多通道DL预测肺癌MPR服务外科决策，核心DIAG。


### 50. 评'基于AI的多模态多任务分析揭示肿瘤分子异质性并预测甲状腺乳头状癌术前淋巴结转移与预后:回顾研究'(致编辑信)

*Letter to editor: Artificial intelligence-based multi-modal multi-tasks analysis reveals tumor molecular heterogeneity, predicts preoperative lymph node metastasis and prognosis in papillary thyroid carcinoma: a retrospective study.*

**International Journal of Surgery** · 2025-10-14 · 评论/致编辑信(无数据) · [PMID 41092359](https://pubmed.ncbi.nlm.nih.gov/41092359/) · [DOI](https://doi.org/10.1097/JS9.0000000000003669)

致编辑信(无摘要数据)，评论一项基于AI的多模态多任务研究，其揭示甲状腺乳头状癌肿瘤分子异质性并预测术前淋巴结转移与预后。术前淋巴结转移预测直接服务颈部手术决策，属外科AI主题。

> **要点**：评论AI多模态预测甲状腺乳头状癌术前淋巴结转移，服务外科决策。


### 51. 机器学习术前鉴别黄色肉芽肿性胆囊炎与胆囊癌(多中心)

*Machine learning model for differentiating xanthogranulomatous cholecystitis and gallbladder cancer in multicenter largescale study.*

**npj Digital Medicine** · 2025-10-01 · 多中心回顾性ML建模 · [PMID 41034367](https://pubmed.ncbi.nlm.nih.gov/41034367/) · [DOI](https://doi.org/10.1038/s41746-025-01991-7)

多中心回顾性研究纳入1246例(554 XGC、692 GBC)，用术前临床、影像、实验室数据开发ML模型LIDGAX，经多因素回归与LASSO选出12个独立预测因子。内部验证AUC 0.94、外部0.88，优于其他5种ML模型；较6名放射科医师提高敏感度(1.2-8.5%)、特异度(0-4.6%)并缩短诊断时间30-36秒，在线平台AUC 0.95。属术前诊断决策。

> **要点**：无创术前鉴别XGC与胆囊癌以指导手术决策。


### 52. 基于[18F]FDG PET/CT影像组学机器学习模型无创预测可切除早期肺腺癌浸润性及高危病理特征：前瞻队列

*Non-invasive prediction of invasive lung adenocarcinoma and high-risk histopathological characteristics in resectable early-stage adenocarcinoma by [18F]FDG PET/CT radiomics-based machine learning models: a prospective cohort study.*

**International Journal of Surgery** · 2025-09-30 · 前瞻性队列(影像组学ML) · [PMID 41572551](https://pubmed.ncbi.nlm.nih.gov/41572551/) · [DOI](https://doi.org/10.1097/JS9.0000000000003566)

前瞻性队列研究，基于FDG PET/CT影像组学ML模型无创预测可切除早期肺腺癌的浸润性及高危组织病理特征（摘要未提供具体数值）。术前影像组学AI服务外科决策。

> **要点**：PET/CT影像组学ML术前预测可切除肺腺癌浸润性。


### 53. 基于深度学习的窄带成像内镜细胞学分类预测结直肠病变

*Development of deep learning-based narrow-band imaging endocytoscopic classification for predicting colorectal lesions from a retrospective study.*

**Nature Communications** · 2025-09-24 · 多中心回顾性诊断建模+人机对比 · [PMID 40993107](https://pubmed.ncbi.nlm.nih.gov/40993107/) · [DOI](https://doi.org/10.1038/s41467-025-63812-5)

多中心回顾队列研究,用窄带成像内镜细胞学(EC-NBI)构建计算机辅助诊断(CAD)模型,经多阶段预训练+有监督深度聚类将结直肠病变分为非肿瘤、腺瘤与浸润癌;性能超过最新有监督方法,人机对抗中超过内镜医师准确率,并作为辅助工具提升医师表现。为区分浅表与深部黏膜下浸润癌奠定基础,直接服务内镜/外科切除决策。

> **要点**：EC-NBI深度学习CAD区分结直肠病变浸润深度,服务内镜/外科切除决策。


### 54. 不同AI辅助水平对创伤骨盆X线判读的比较

*Comparative analysis of AI support levels in clinical interpretation of traumatic pelvic radiographs.*

**npj Digital Medicine** · 2025-08-13 · MRMC诊断研究 · [PMID 40804461](https://pubmed.ncbi.nlm.nih.gov/40804461/) · [DOI](https://doi.org/10.1038/s41746-025-01923-5)

多读者多病例(MRMC)研究纳入26名医师(8放射、10急诊、8创伤外科)判读150张骨盆X线，分无AI、AI预警、AI可视化引导三阶段。AI辅助使整体诊断准确率由0.870升至0.940(p<0.001)、判读时间由22.70缩至9.58秒(p<0.001)；创伤外科医师在AI可视化引导下达到与未辅助放射科医师相当的准确率(0.940 vs 0.920)。属服务创伤外科决策的影像AI。

> **要点**：AI辅助弥合非放射专科(含创伤外科)骨盆片判读差距。


### 55. 可解释多模态深度学习基于超声预测甲状腺癌侧颈淋巴结转移

*Explainable multimodal deep learning for predicting thyroid cancer lateral lymph node metastasis using ultrasound imaging.*

**Nature Communications** · 2025-08-01 · 多中心回顾性多模态深度学习建模 · [PMID 40750786](https://pubmed.ncbi.nlm.nih.gov/40750786/) · [DOI](https://doi.org/10.1038/s41467-025-62042-z)

七中心研究,构建双向注意力深度学习模型LLNM-Net融合术前超声图像、放射与病理报告及人口学(29,615例患者、9,836例手术病例)预测侧颈淋巴结转移。多中心测试AUC 0.944、准确率84.7%,优于人类专家(64.3%)且较既往模型提升7.4%;识别高危患者AUC达0.983,并揭示距被膜0.25cm内肿瘤转移风险>72%、中上极为高危区。用于术前筛查与手术策略制定。

> **要点**：多模态DL术前预测甲状腺癌侧颈淋巴结转移(AUC 0.944)指导手术策略。


### 56. 定义无功能胰腺神经内分泌肿瘤(NF-PanNET)的生物学交界可切除性：术前早期复发风险预测模型

*Defining Biological Borderline Resectable Non-functioning Pancreatic Neuroendocrine Tumors (NF-PanNETs): A Predictive Model for Preoperative Assessment of Early Recurrence Risk.*

**Annals of Surgery** · 2025-08-01 · 多中心回顾性队列+分类树模型(外部验证) · [PMID 40747911](https://pubmed.ncbi.nlm.nih.gov/40747911/) · [DOI](https://doi.org/10.1097/SLA.0000000000006867)

3家三级中心回顾性研究496例(开发290/验证206)局部NF-PanNET根治切除，用分类树(classification tree)模型预测24月内早期复发(ER)。ER发生11%，肿瘤性静脉血栓为最强预测因子(ER概率71%)，无血栓者Ki-67≥5%且肿瘤≥3cm伴淋巴结病者ER概率41%；模型开发AUC 0.91、验证0.84。

> **要点**：分类树模型术前识别高早期复发风险NF-PanNET，提出生物学交界可切除概念指导手术决策。


### 57. 自监督学习模型融合平扫与增强CT术前识别坏疽性胆囊炎：多中心回顾性队列研究

*Self-supervised learning model integrates plain and contrast-enhanced CT for preoperatively identifying gangrenous cholecystitis: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2025-07-28 · 多中心回顾性队列，自监督深度学习(seResNet-50) · [PMID 40844296](https://pubmed.ncbi.nlm.nih.gov/40844296/) · [DOI](https://doi.org/10.1097/JS9.0000000000003063)

多中心回顾性队列，纳入1228例患者7368张CT(训练921例、独立验证307例)，构建基于seResNet-50的自监督学习(SSL)融合模型术前识别坏疽性胆囊炎(GC)。融合模型训练集AUC 0.965(敏感度88%、特异度95%)，验证集I、II的AUC分别为0.879、0.887，均优于单纯增强(0.791/0.810)或平扫(0.756/0.730)模型。

> **要点**：SSL融合CT模型术前识别坏疽性胆囊炎AUC 0.88–0.97，辅助及时手术决策与风险分层。


### 58. 深度学习基于支气管内超声多模态视频检测与诊断胸内淋巴结病变

*Deep learning for detection and diagnosis of intrathoracic lymphadenopathy from endobronchial ultrasound multimodal videos: A multi-center study.*

**Cell Reports Medicine** · 2025-07-21 · 回顾+前瞻多中心诊断研究 · [PMID 40695290](https://pubmed.ncbi.nlm.nih.gov/40695290/) · [DOI](https://doi.org/10.1016/j.xcrm.2025.102243)

提出DL辅助诊断系统AI-CEMA,基于凸探头支气管内超声(CP-EBUS)多模态视频自动选图、识别淋巴结并鉴别良恶性。单中心1006枚淋巴结训练,前瞻多中心267枚验证AUC 0.8490(95%CI 0.80-0.898),与资深专家相当(专家AUC 0.7847,p=0.080);迁移至肺部病变诊断AUC 0.8192。服务肺癌纵隔分期与外科决策。

> **要点**：EBUS视频DL达专家级淋巴结良恶性鉴别(AUC 0.85),支持纵隔分期与手术决策


### 59. 基于超声图像术前诊断滤泡性甲状腺肿瘤的无创深度学习系统：多中心回顾研究

*Noninvasive Deep Learning System for Preoperative Diagnosis of Follicular-Like Thyroid Neoplasms Using Ultrasound Images: A Multicenter, Retrospective Study.*

**Annals of Surgery** · 2025-07-21 · 多中心回顾性研究+深度学习(外部验证) · [PMID 40689491](https://pubmed.ncbi.nlm.nih.gov/40689491/) · [DOI](https://doi.org/10.1097/SLA.0000000000006841)

多中心回顾纳入11中心3634例滤泡性甲状腺肿瘤(FN)患者(腺瘤1748/滤泡癌299/滤泡型乳头状癌1587)，用Inception-v3/ResNet50/Inception-ResNet-v2/DenseNet161四种深度学习模型基于常规超声图像术前诊断。外部验证AUC 82.2%-85.2%、敏感度69.6%-76.0%、特异度84.1%-89.2%，优于ACR TI-RADS，且不必要穿刺率显著更低(8.5%-12.8%对40.7%, P<0.001)。

> **要点**：深度学习超声系统术前鉴别滤泡性甲状腺肿瘤良恶性优于TI-RADS，减少不必要手术与穿刺。


### 60. 整合临床-病理-MRI特征预测乳腺癌新辅助治疗后腋窝淋巴结病理完全缓解

*Integrating Clinical-Pathological-MRI features to construct a prediction model for pathological complete remission of axillary lymph nodes after neoadjuvant therapy: a retrospective study.*

**International Journal of Surgery** · 2025-07-18 · 回顾性诊断预测研究 · [PMID 40694024](https://pubmed.ncbi.nlm.nih.gov/40694024/) · [DOI](https://doi.org/10.1097/JS9.0000000000003070)

回顾研究，505例腋窝淋巴结转移乳腺癌患者（训练354/测试151），经LASSO+多因素logistic构建预测腋窝pCR模型以指导是否豁免腋窝淋巴结清扫（ALND）。Clinical-Pathological-MRI模型AUC训练0.817/测试0.680；加入Delta-MRI后提升至0.844/0.793，决策曲线净获益更高。直接服务腋窝清扫的外科决策。

> **要点**：临床-病理-Delta-MRI模型（AUC 0.844/0.793）指导是否免ALND。


### 61. 致编辑信：机器学习模型检测甲状腺乳头状癌淋巴结转移的临床表现（多中心研究）

*Letter to Editor: Clinical performance of a machine learning-based model for detecting lymph node metastasis in papillary thyroid carcinoma: a multicenter study.*

**International Journal of Surgery** · 2025-07-18 · 评论信（无数据） · [PMID 40679989](https://pubmed.ncbi.nlm.nih.gov/40679989/) · [DOI](https://doi.org/10.1097/JS9.0000000000002949)

致编辑信，评论一项基于机器学习检测甲状腺乳头状癌（PTC）淋巴结转移的多中心模型。PTC经甲状腺切除+颈淋巴结清扫治疗，术前预测淋巴结转移可直接指导手术范围，属服务外科决策的诊断AI。信件本身无原始数据。

> **要点**：评论ML预测PTC淋巴结转移以指导手术范围。


### 62. 计算机辅助诊断模型评估胰腺导管腺癌血管侵犯与R0切除

*Utility of a CAD model for estimation of vascular involvement and R0 resection in pancreatic ductal adenocarcinoma.*

**International Journal of Surgery** · 2025-07-17 · 回顾性诊断研究（DoDNet分割+CAD） · [PMID 40697063](https://pubmed.ncbi.nlm.nih.gov/40697063/) · [DOI](https://doi.org/10.1097/JS9.0000000000003048)

回顾性研究纳入87例PDAC(其中61例有术后切缘病理)，基于DoDNet训练肿瘤/胰腺/血管分割网络提取229个影像特征，最终以3个特征(肿瘤-血管包绕角、血管形变风险评分、肿瘤形态风险评分)构建CAD模型预测血管侵犯与R0切除。模型AUC达到并部分超过放射科医师，敏感度不低于医师但特异度较低。

> **要点**：基于DoDNet的CAD模型评估PDAC血管侵犯与可切除性，敏感度不劣于放射科医师。


### 63. 基于术前临床特征与实验室指标预测中枢恶性肿瘤诊断的列线图：一项诊断研究

*A nomogram for predicting the diagnosis of central malignant tumors based on preoperative clinical characteristics and laboratory indicators: a diagnostic study.*

**International Journal of Surgery** · 2025-07-15 · 回顾性诊断研究（多种ML模型） · [PMID 40717568](https://pubmed.ncbi.nlm.nih.gov/40717568/) · [DOI](https://doi.org/10.1097/JS9.0000000000002921)

回顾性诊断研究纳入712例(127例原发中枢神经系统淋巴瘤PCNSL、586例胶质瘤)，经LASSO+多因素logistic筛选变量并构建7种机器学习模型(logistic、决策树、随机森林、SVM、神经网络、XGBoost、lightGBM)。PCNSL对比胶质瘤模型AUC 0.784–0.889(外部验证最高0.877)，胶质母细胞瘤对比非胶母AUC 0.778–0.857。术前鉴别可辅助手术切除/活检决策。

> **要点**：7种ML模型术前鉴别中枢淋巴瘤与胶质瘤AUC达0.89，辅助手术/活检决策。


### 64. 常规全乳X线摄影深度学习提升早期乳腺癌淋巴结转移预测

*Deep learning on routine full-breast mammograms enhances lymph node metastasis prediction in early breast cancer.*

**npj Digital Medicine** · 2025-07-10 · 多中心回顾性影像AI建模 · [PMID 40640522](https://pubmed.ncbi.nlm.nih.gov/40640522/) · [DOI](https://doi.org/10.1038/s41746-025-01831-8)

回顾性纳入三家瑞典机构1265例cN0 T1-T2乳腺癌(直接手术、无新辅助)，用深度学习分析术前全乳X线片预测腋窝淋巴结转移。相比仅临床变量模型，加入全乳X线片将ROC AUC从0.690提升至0.774；在敏感度≥90%时净获益更优，前哨淋巴结活检可减少41.7%(13.0-62.6%)。

> **要点**：常规乳腺X线增强术前腋窝分期预测，直接服务手术降级与患者分层决策。


### 65. 多通道深度学习预测肺癌新辅助免疫化疗后主要病理缓解：多中心诊断研究

*Multichannel deep learning prediction of major pathological response after neoadjuvant immunochemotherapy in lung cancer: a multicenter diagnostic study.*

**International Journal of Surgery** · 2025-07-02 · 多中心诊断建模研究 · [PMID 40607969](https://pubmed.ncbi.nlm.nih.gov/40607969/) · [DOI](https://doi.org/10.1097/JS9.0000000000002821)

多中心诊断研究，纳入四中心332例NSCLC患者，基于治疗前CT用GoogLeNet多通道+Transformer融合模型术前预测新辅助免疫化疗后主要病理缓解（MPR）。外部测试集中传统影像组学AUC 0.736、最优深度学习模块0.855、Transformer_GoogLeNet融合模型0.924，有助改善手术规划与术前评估。

> **要点**：多通道DL+Transformer融合术前预测肺癌MPR（AUC 0.924）。


### 66. 致编辑信：评「影像组学用于结直肠癌淋巴结转移术前预测的系统综述与荟萃分析」

*Letter to the Editor: A commentary on "Application of radiomics for preoperative prediction of lymph node metastasis in colorectal cancer: a systematic review and meta-analysis".*

**International Journal of Surgery** · 2025-06-24 · 评论信（无数据） · [PMID 40557452](https://pubmed.ncbi.nlm.nih.gov/40557452/) · [DOI](https://doi.org/10.1097/JS9.0000000000002865)

致编辑信，评论一项关于影像组学用于结直肠癌淋巴结转移术前预测的系统综述与荟萃分析。术前淋巴结转移预测直接服务外科决策（清扫范围），属影像AI服务外科。信件本身无原始数据。

> **要点**：评论影像组学术前预测CRC淋巴结转移（服务外科决策）。


### 67. 可解释机器学习预测早期口腔舌鳞癌隐匿性淋巴结转移：多中心研究

*Development and validation of an explainable machine learning model for predicting occult lymph node metastasis in early-stage oral tongue squamous cell carcinoma: A multi-center study.*

**International Journal of Surgery** · 2025-06-05 · 回顾性多中心研究（模型开发与外部验证） · [PMID 40479496](https://pubmed.ncbi.nlm.nih.gov/40479496/) · [DOI](https://doi.org/10.1097/JS9.0000000000002641)

多中心纳入678例早期(cT1-2N0)口腔舌鳞癌(OTSCC)，随机分推导队列与外部验证队列（OLNM发生率34.7%与30.6%）。经多变量逻辑回归+Lasso筛出9个临床病理变量，构建6种ML模型；随机森林(RF)最优，内部验证AUC 0.941(95%CI 0.907–0.975)、外部验证AUC 0.917(0.868–0.967)，优于浸润深度与肿瘤芽等传统方法，SHAP解释并提供在线计算平台。用于决定是否行择区性颈清扫（避免过度治疗）。

> **要点**：RF预测早期OTSCC隐匿性淋巴结转移，外部AUC 0.917，指导颈清扫决策。


### 68. 人工智能辅助CT影像组学预测甲状腺乳头状癌颈侧区淋巴结转移

*Artificial intelligence-assisted CT radiomics: redefining preoperative prediction of lateral cervical lymph node metastasis in papillary thyroid carcinoma.*

**International Journal of Surgery** · 2025-05-16 · 影像组学诊断模型研究（摘要缺失） · [PMID 40387731](https://pubmed.ncbi.nlm.nih.gov/40387731/) · [DOI](https://doi.org/10.1097/JS9.0000000000002521)

研究开发AI辅助CT影像组学模型，用于甲状腺乳头状癌（PTC）术前无创预测颈侧区淋巴结转移，以指导是否行颈侧淋巴结清扫。（本条仅有标题、无摘要，具体样本量与AUC等数据未获取。）

> **要点**：AI-CT影像组学有望术前无创预测PTC颈侧淋巴结转移、辅助手术决策。


### 69. 基于CT影像组学评估胰腺神经内分泌瘤假包膜以预测预后并指导手术策略：队列研究

*Evaluation of tumor pseudocapsule using computed tomography-based radiomics in pancreatic neuroendocrine tumors to predict prognosis and guide surgical strategy: a cohort study.*

**International Journal of Surgery** · 2025-05-16 · 回顾性队列（影像组学+ML，含scRNA-seq） · [PMID 40395025](https://pubmed.ncbi.nlm.nih.gov/40395025/) · [DOI](https://doi.org/10.1097/JS9.0000000000002511)

队列研究纳入复旦肿瘤医院578例（475例合格）行首次胰腺切除的胰腺神经内分泌瘤(PanNET)。术前动脉期增强CT影像组学结合机器学习预测假包膜状态，AUC 0.744(95%CI 0.652–0.837，小肿瘤尤佳)；完整假包膜组(46.95%)较不完整组3/5年无复发生存更高(94.8%/92.5%比76.7%/70.4%)，单细胞测序示不完整组免疫抑制微环境更强。完整假包膜者更可能从剜除术获益，直接指导术式选择。

> **要点**：CT影像组学预测PanNET假包膜(AUC 0.744)以指导剜除等手术策略。


### 70. 对《人工神经网络模型提升非肠型早期胃癌淋巴结转移高危人群临床评估准确性》的评论

*A commentary on "Artificial neural network model enhancing the accuracy of clinical evaluation for high-risk population of lymph node metastasis in non-intestinal type early gastric cancer: a multicenter real-world study in China".*

**International Journal of Surgery** · 2025-05-12 · 评论（无数据） · [PMID 40359559](https://pubmed.ncbi.nlm.nih.gov/40359559/) · [DOI](https://doi.org/10.1097/JS9.0000000000002493)

针对一项中国多中心真实世界研究（人工神经网络ANN模型预测非肠型早期胃癌淋巴结转移）的评论文章。该预测关乎早期胃癌内镜vs外科切除决策。属评论类，无自身数据。

> **要点**：评论ANN预测早期胃癌淋巴结转移以辅助手术方式选择。


### 71. 预测胰腺导管腺癌肠系膜上动脉(SMA)切缘状态的计算机视觉算法

*A Computer Vision Algorithm to Predict Superior Mesenteric Artery Margin Status for Patients With Pancreatic Ductal Adenocarcinoma.*

**Annals of Surgery** · 2024-08-23 · 回顾性诊断模型开发与专家对比 · [PMID 39176476](https://pubmed.ncbi.nlm.nih.gov/39176476/) · [DOI](https://doi.org/10.1097/SLA.0000000000006506)

回顾性纳入200例行Whipple的PDAC(阳性SMA切缘40例,20%),用U-Net分割(Dice 0.90)+ResNet50分类,从术前增强CT预测SMA切缘状态,并与放射科/外科专家盲评比较。算法敏感度最高0.43(放射科0.23、外科0.36),特异度0.94,准确率0.85(放射科0.80、外科0.76)。

> **要点**：术前CT计算机视觉可行预测PDAC血管切缘,敏感度优于专家、服务可切除性判断



## 六、数字病理与影像组学（外科肿瘤）（55 篇）

### 1. 深度学习基于H&E的脑膜瘤分子分类与结局预测

*Deep learning for H&E-based meningioma molecular classification and outcome prediction: a retrospective cohort study.*

**The Lancet Digital Health** · 2026-06-05 · 回顾性多中心模型开发/验证 · [PMID 42248714](https://pubmed.ncbi.nlm.nih.gov/42248714/) · [DOI](https://doi.org/10.1016/j.landig.2026.100986)

多中心回顾研究（训练439+166例、验证67例大体全切2级脑膜瘤），5个深度学习模型仅凭H&E预测脑膜瘤分子分组（平衡准确率87-97%，MG1-4的AUC分别0.98/0.96/0.81/0.88）、染色体臂异常（1p缺失AUC 0.86、22q缺失0.86、1q获得0.79）及5年无进展生存风险（校正后HR 3.49，95%CI 1.54-7.91，p=0.0028）。首次单凭H&E实现脑膜瘤分子分型与预后。

> **要点**：H&E深度学习预测脑膜瘤分子分型与复发，AUC达0.98


### 2. 用于肺癌病理图像STAS预测与半自动定位的扩散注意力专家模型

*Diffusion attention expert model for predicting and semi-automatic localizing STAS in lung cancer histopathological images.*

**Nature Communications** · 2026-05-27 · 多中心回顾性诊断模型开发与验证 · [PMID 42203800](https://pubmed.ncbi.nlm.nih.gov/42203800/) · [DOI](https://doi.org/10.1038/s41467-026-73786-7)

提出Diffusion Attention Expert Model（DAEM）在冰冻切片（FS）与石蜡切片（PS）上检测肺癌气腔播散（STAS），以指导手术决策与术后管理。内部数据集FS的AUC为0.8946、PS为0.9112；来自8家机构的外部多中心数据验证泛化性与可解释性。进一步用肿瘤微环境（TME）特征实现STAS位置及其与原发灶距离的半自动测量，并识别微乳头型STAS等潜在生物标志物。

> **要点**：冰冻/石蜡切片AI检测STAS（AUC约0.89–0.91）支持术中与术后决策。


### 3. 可解释深度学习经组织病理预测胶质瘤分子改变（GMAP）

*Molecular alterations prediction in gliomas via an interpretable deep learning model: a multicentre and retrospective study.*

**The Lancet Digital Health** · 2026-05-11 · 多中心回顾性模型开发/验证 · [PMID 42115062](https://pubmed.ncbi.nlm.nih.gov/42115062/) · [DOI](https://doi.org/10.1016/j.landig.2025.100977)

基于基础模型的可解释方法GMAP，用877例1696张全切片开发，内部（88例）与外部（3147例、12家中国医院+EBRAINS）验证：内部AUROC分别为IDH 0.939、1p/19q共缺失0.955、TERT 0.944、+7/-10 0.886；外部为0.870/0.885/0.694/0.672。为资源受限地区提供快速低成本分子分型。

> **要点**：基础模型病理预测胶质瘤分子改变，IDH AUROC 0.939


### 4. 基于AI的肿瘤微环境分析预测胆囊癌预后：一项回顾性队列研究

*Artificial intelligence-based tumor microenvironment analysis for prognosis prediction in gallbladder cancer: a retrospective cohort study*

**International Journal of Surgery** · 2026-04-28 · 多中心回顾性队列(AI数字病理) · [DOI](https://doi.org/10.1097/js9.0000000000005258)

多中心回顾性研究，纳入225例R0切除胆囊癌(GBC)及41例外部验证患者，采用AI全切片分析平台Lunit SCOPE IO绘制肿瘤微环境(TME)特征。以TME风险因素(低TIL密度、低三级淋巴结构计数、高成纤维细胞密度)数量分层：以3个风险因素为参照，0个因素者OS校正HR 0.20(95%CI 0.06-0.67，P=0.009)、DFS HR 0.13(95%CI 0.04-0.41，P<0.001)，风险因素越少预后越好，外部验证一致。

> **要点**：AI数字病理TME分析可作为R0切除胆囊癌的预后生物标志物


### 5. 基于深度学习的数字活检预测胃癌早期复发

*A deep learning-based digital biopsy for predicting early recurrence in gastric cancer.*

**Nature Communications** · 2026-04-15 · 多中心回顾开发+多队列/前瞻验证（1,763例） · [PMID 41986314](https://pubmed.ncbi.nlm.nih.gov/41986314/) · [DOI](https://doi.org/10.1038/s41467-026-71347-6)

核心：提出可解释多模态模型RSA，融合常规H&E切片的深度学习组织病理特征与临床变量预测局部进展期胃癌(LAGC)术后早期复发。多中心回顾队列(n=1,763)开发，经两内部、两外部队列及一前瞻试验人群验证，AUC 0.843–0.887；SHAP解释关键组织学特征，低危组呈免疫富集微环境与检查点基因升高。

> **要点**：H&E数字病理AI预测胃癌术后复发，AUC 0.843–0.887


### 6. 用于泛癌种淋巴结转移检测的人工智能病理模型(PanCAM):一项含回顾与前瞻验证的多中心诊断研究

*Artificial intelligence-based pathological model for pan-cancer lymph node metastasis detection: a multicentre diagnostic study with retrospective and prospective validation.*

**The Lancet Digital Health** · 2026-03-05 · 多中心诊断研究(回顾+前瞻验证) · [PMID 41792018](https://pubmed.ncbi.nlm.nih.gov/41792018/) · [DOI](https://doi.org/10.1016/j.landig.2025.100961)

多中心诊断研究,纳入中国17家医院接受肿瘤切除+淋巴结清扫的9256例患者(含9种常见癌和24种罕见癌、153,985枚淋巴结),对手术切除淋巴结全切片图像(WSI)训练AI模型PanCAM检测转移。回顾验证中16家医院敏感度0.97-1.00、CAMELYON16为0.96,前瞻验证9家医院0.93-1.00;仅用常见癌训练但对罕见癌敏感度仍达0.98;回顾/前瞻验证分别额外检出120例、21例被病理医生漏诊的转移患者。

> **要点**：泛癌种数字病理AI检测手术切除淋巴结转移敏感度0.93-1.00,并检出百余例病理漏诊。


### 7. 用深度学习从组织病理图像区分原发与转移性黏液性卵巢癌

*Distinction between primary and metastatic mucinous ovarian carcinoma from histopathology images using deep learning.*

**npj Digital Medicine** · 2026-02-24 · 多中心深度学习开发与外部验证 · [PMID 41735519](https://pubmed.ncbi.nlm.nih.gov/41735519/) · [DOI](https://doi.org/10.1038/s41746-026-02459-y)

构建深度学习模型MOCOPM从组织病理图像预测黏液性卵巢癌(MOC)为原发或胃肠道转移——该判别直接影响手术与肿瘤学处理策略。三家医院167例患者，经五折交叉验证选最优模型并外部验证，平均AUROC内部0.91、外部0.96。属外科肿瘤数字病理，核心相关。

> **要点**：数字病理DL鉴别黏液性卵巢癌原发/转移，支持外科决策。


### 8. 用于高级别浆液性卵巢癌风险分层的端到端分割+影像组学预后模型:一项回顾性多队列研究

*End-to-end integrative segmentation and radiomics prognostic models for risk stratification of high-grade serous ovarian cancer: a retrospective multicohort study.*

**The Lancet Digital Health** · 2026-02-23 · 回顾性多队列研究 · [PMID 41735102](https://pubmed.ncbi.nlm.nih.gov/41735102/) · [DOI](https://doi.org/10.1016/j.landig.2025.100955)

回顾性多队列研究,收集英/德/美605例接受一线减瘤术的上皮性卵巢癌患者增强CT,建立自动分割(U-Net)+影像组学的端到端预后模型。自动分割Dice为0.90(Hammersmith验证)、0.88(TCIA)、0.80(KEM);最佳OS影像组学模型C-index 0.66-0.72,联合年龄/残留病灶/分期后各队列C-index达0.73;高危组死亡HR分别为4.81(95%CI 1.61-14.35)、6.34、1.71,优于CA125、残留病灶、FIGO分期及既往影像组学预后向量。

> **要点**：CT影像组学端到端流程改善HGSOC术前风险分层,高危组死亡HR最高6.34,优于现有临床与影像基准。


### 9. 多模态AI解码ERS-CAF免疫调控轴及其泛癌预后与疗效预测价值

*Decoding the ERS-CAF immunoregulatory axis via multimodal AI and its pan-cancer prognostic and therapeutic predictive value.*

**npj Digital Medicine** · 2026-01-30 · 回顾性多模态队列加泛癌验证 · [PMID 41617967](https://pubmed.ncbi.nlm.nih.gov/41617967/) · [DOI](https://doi.org/10.1038/s41746-026-02388-w)

以术前MRI与H&E全切片(WSI)为输入、用三种转录组参考评分做代理监督，在126例脊索瘤中构建分阶段多模态框架(校准WSI注意力加门控放射病理融合加域对齐)，与分子谱高度一致、具独立预后价值并定位于纤维化免疫排斥区，零样本泛化至TCGA泛癌；仅MRI蒸馏模型保留大部分性能且效率显著提升。属外科肿瘤的影像组学/数字病理分子分型与预后。

> **要点**：放射病理多模态无创预测脊索瘤ERS-CAF生物学与预后。


### 10. 基于机器学习的转录组标志预测T1期结直肠癌根治性切除后复发：多中心回顾队列(Tw1CE)

*A machine learning-based transcriptomic signature for predicting tumor recurrence after curative resection in T1 colorectal cancer: a retrospective multicenter cohort study (The Tw1CE trial).*

**International Journal of Surgery** · 2026-01-28 · 多中心回顾性队列(ML组学) · [PMID 41604539](https://pubmed.ncbi.nlm.nih.gov/41604539/) · [DOI](https://doi.org/10.1097/JS9.0000000000004690)

多中心回顾队列(西班牙)，138例T1 CRC，从FFPE内镜标本RT-qPCR定量5个mRNA+2个miRNA，构建XGBoost转录组面板；训练/测试AUROC=91.7%/88.2%，高危组RFS与OS显著更差(log-rank P<0.001)，联合淋巴管浸润后AUROC升至94.6%。

> **要点**：XGBoost转录组面板预测T1 CRC切除后复发，AUROC达88–94%。


### 11. 评“内脏脂肪CT影像组学特征预测NMIBC早期复发的多中心队列研究”

*Comment on Yu et al. "CT-based radiomics signature of visceral adipose tissue for prediction of early recurrence in patients with NMIBC: a multicentre cohort study".*

**International Journal of Surgery** · 2026-01-20 · 评论(无原始数据) · [PMID 41562639](https://pubmed.ncbi.nlm.nih.gov/41562639/) · [DOI](https://doi.org/10.1097/JS9.0000000000004844)

针对一项CT内脏脂肪影像组学预测非肌层浸润性膀胱癌(NMIBC)早期复发研究的评论，无独立数据。涉及外科肿瘤影像组学复发预测。

> **要点**：关于VAT影像组学预测NMIBC复发的评论。


### 12. UroFusion-X：泌尿系肿瘤诊断、分型与预后的统一多模态深度学习框架

*UroFusion-X: a unified multimodal deep learning framework for robust diagnosis, subtyping, and prognosis of urological cancers.*

**npj Digital Medicine** · 2026-01-19 · 多中心回顾加外部验证 · [PMID 41554842](https://pubmed.ncbi.nlm.nih.gov/41554842/) · [DOI](https://doi.org/10.1038/s41746-025-02295-6)

提出UroFusion-X，整合3D影像编码器、病理多示例学习、组学图网络与TabTransformer，用跨模态共注意力加门控专家融合，对膀胱、肾、前列腺癌做诊断、分子分型与预后(DeepSurv/DeepHit)，对缺失模态稳健。多中心真实队列加外部与留一中心验证下优于单模态与简单融合，模态大量缺失时仍保留90%以上性能，决策曲线净获益更高。属外科肿瘤多模态分型/预后。

> **要点**：多模态泌尿肿瘤分型预后，缺失模态下保留90%以上性能。


### 13. 深度学习影像组学与机器学习拓展IDH野生型胶质母细胞瘤最大安全切除术后的预后评估

*Expanding the clinical utility of deep learning-based radiomics and machine learning for prognostic assessment in IDH-wildtype glioblastoma following maximal safe surgical resection.*

**International Journal of Surgery** · 2026-01-13 · DL影像组学预后研究/评论（摘要缺失） · [PMID 41537390](https://pubmed.ncbi.nlm.nih.gov/41537390/) · [DOI](https://doi.org/10.1097/JS9.0000000000004661)

主题为在IDH野生型胶质母细胞瘤（GBM）最大安全手术切除后，运用基于深度学习的影像组学与机器学习进行预后评估的临床拓展（摘要缺失，具体样本量与AUC未获取，格式疑为扩展性通讯/评论）。属外科肿瘤影像组学预后建模，核心相关。

> **要点**：DL影像组学拓展GBM术后预后评估。


### 14. 整合多组学与影像基因组学解析NNK相关胰腺癌肿瘤重塑与预后分层

*Integrative multi-omics and radiogenomic profiling decodes NNK-related tumor remodeling and prognostic stratification in pancreatic cancer.*

**International Journal of Surgery** · 2026-01-07 · 多组学+影像基因组学+ML，回顾性（含手术队列） · [PMID 41504500](https://pubmed.ncbi.nlm.nih.gov/41504500/) · [DOI](https://doi.org/10.1097/JS9.0000000000004732)

整合毒理基因组与多队列转录组，识别268个NNK相关胰腺癌基因，经多算法机器学习+Cox锁定ITGA3为独立预后因子；构建CT影像组学模型预测ITGA3表达（AUC 0.893、0.839），并在含独立手术队列中实现术后生存分层。属影像组学+组学服务外科肿瘤的分子/预后分层。

> **要点**：影像组学无创解码NNK相关胰腺癌分子表型，助术前风险分层。


### 15. 内镜-影像组学与临床数据的深度多模态状态空间融合用于结直肠癌生存预测

*Deep multimodal state-space fusion of endoscopic-radiomic and clinical data for survival prediction in colorectal cancer.*

**npj Digital Medicine** · 2025-12-31 · 方法学/多模态模型开发 · [PMID 41476131](https://pubmed.ncbi.nlm.nih.gov/41476131/) · [DOI](https://doi.org/10.1038/s41746-025-02236-3)

提出HydraMamba多模态选择性状态空间框架，融合内镜与盆腔CT做病灶分割、检测与生存预测，服务结直肠癌术前评估。内镜Dice 0.856、F1 0.918；CT Dice 0.812、F1 0.888；CT生存建模Harrell C指数0.832、Uno C@1y 0.853、积分Brier分数0.161、校准斜率约1.01。为外科肿瘤影像组学预后建模。

> **要点**：内镜加CT多模态融合CRC术前评估与生存预测，C指数0.832。


### 16. 可解释多模态深度学习提升肝内胆管癌术后风险分层（多中心）

*Interpretable multimodal deep learning improves postoperative risk stratification in intrahepatic cholangiocarcinoma in multicentre cohorts.*

**npj Digital Medicine** · 2025-12-29 · 多中心回顾性多模态深度学习建模+空间组学验证 · [PMID 41466129](https://pubmed.ncbi.nlm.nih.gov/41466129/) · [DOI](https://doi.org/10.1038/s41746-025-02282-x)

针对肝内胆管癌（ICC）根治性切除后高复发问题，构建基于Transformer的可解释多模态流水线，融合临床变量、影像组学与全切片病理（WSI）预测2年总生存。三个独立验证队列AUC分别为0.952（95%CI 0.909-0.983）、0.924（0.804-1.000）、0.924（0.828-0.993）；空间转录组/蛋白组显示模型注意力聚焦于肿瘤侵袭与侵袭性行为相关区域。

> **要点**：ICC术后多模态可解释建模预测2年OS，三队列AUC均≥0.92。


### 17. AI病理生物学Transformer预测结直肠癌卵巢转移的预后与靶向治疗获益

*AI-powered pathobiology transformers predict prognosis and targeted therapy benefits in patients with colorectal cancer ovarian metastases: a multicohort study.*

**International Journal of Surgery** · 2025-12-18 · 多队列（回顾+前瞻）Transformer深度学习 · [PMID 41417976](https://pubmed.ncbi.nlm.nih.gov/41417976/) · [DOI](https://doi.org/10.1097/JS9.0000000000004397)

多队列回顾+前瞻研究，构建可解释的Transformer迁移学习模型整合数字病理与RNA数据；预测腹膜复发AUC 0.90/0.74/0.83，复发无进展生存分层HR最高107.22（P<0.001），预测BRAF/RAS突变训练集AUC 0.96/0.94；仅高危BRAF/RAS突变者从靶向治疗获益（HR 0.38, P=0.007）。

> **要点**：数字病理Transformer预测CRC卵巢转移预后并筛选靶向获益者。


### 18. 基于Transformer的多模态融合框架整合影像组学与病理组学预测胶质瘤术后认知改善

*Transformer-based multimodal fusion framework for predicting postoperative cognitive improvement in glioma: integrating radiomics and pathomics.*

**International Journal of Surgery** · 2025-12-17 · 回顾性多中心Transformer多模态融合建模 · [PMID 41403361](https://pubmed.ncbi.nlm.nih.gov/41403361/) · [DOI](https://doi.org/10.1097/JS9.0000000000004453)

回顾性多中心纳入189例胶质瘤，提出Transformer多模态框架融合术前MRI 2.5D影像组学与全切片病理组学，预测术后认知改善AUC训练0.973、验证0.860、独立测试0.829，显著优于单模态（影像组学0.596、病理组学0.658）与传统集成（0.675），验证特异度0.921。

> **要点**：影像组学+病理组学多模态Transformer预测胶质瘤术后认知转归。


### 19. 快速多模态成像联合机器学习发现牛磺酸作为乳腺癌切缘评估标志物

*Fast multimodal imaging combined with machine learning identifying taurine as a potential marker for breast cancer margin assessment.*

**npj Digital Medicine** · 2025-12-17 · 多模态成像+机器学习的转化组学研究 · [PMID 41402452](https://pubmed.ncbi.nlm.nih.gov/41402452/) · [DOI](https://doi.org/10.1038/s41746-025-02202-z)

为保乳手术（BCS）切缘判定，整合飞秒无标记成像（FLI）显微与成像质谱（IMS）加机器学习。FLI识别的感兴趣区与病理诊断的组织微区高度吻合；建立牛磺酸、苏糖酸、谷氨酸标志物组区分癌与癌旁组织，其中高丰度牛磺酸可评估阳性切缘且与总生存差相关，功能实验验证其促瘤作用。为切缘评估提供新方法与代谢标志物。

> **要点**：FLI+成像质谱+ML锁定牛磺酸为乳腺癌切缘评估代谢标志物，服务保乳手术。


### 20. 随机特征结合多示例学习：深度高斯过程预测结直肠癌MSI

*Random features meet MIL: a deep GP approach to colorectal MSI prediction.*

**npj Digital Medicine** · 2025-12-15 · 计算病理深度学习方法开发（TCGA-CRC） · [PMID 41398439](https://pubmed.ncbi.nlm.nih.gov/41398439/) · [DOI](https://doi.org/10.1038/s41746-025-02214-9)

提出结合深度高斯过程（随机特征展开DGP-RF）与多示例学习（MIL）及注意力聚合的框架，从全切片图像弱监督预测结直肠癌微卫星不稳定（MSI）。在TCGA-CRC上AUC 0.895，优于ResNet(0.777)、EfficientNet(0.791)、ShuffleNet(0.784)。属外科肿瘤数字病理分子分型。

> **要点**：DGP+MIL从WSI预测结直肠癌MSI，AUC 0.895优于CNN基线。


### 21. AI从H&E切片判定结直肠癌MSI/MMR状态的多中心盲法验证

*H&E-based MSI/MMR testing with AI in colorectal cancer: a multi-centred blinded evaluation.*

**npj Digital Medicine** · 2025-12-15 · 多中心盲法验证研究（数字病理） · [PMID 41398057](https://pubmed.ncbi.nlm.nih.gov/41398057/) · [DOI](https://doi.org/10.1038/s41746-025-02218-5)

AI biomarker工具PANProfiler Colorectal（PPC）直接从H&E切片判定MSI/MMR状态。英国三家机构1243例CRC患者、3576张全切片图像盲法验证：PPC对86.55%切片给出确定结果，总体一致率93.83%、阳性一致92.54%、阴性一致94.02%。为常规H&E提供快速、可扩展的MSI/MMR检测替代方案。

> **要点**：H&E切片AI判定CRC MSI/MMR，总体一致率93.83%，可替代常规检测。


### 22. 乳腺癌标签高效计算病理肿瘤浸润淋巴细胞评估(ECTIL):2340例多中心验证

*Label-efficient computational tumour infiltrating lymphocyte assessment in breast cancer (ECTIL): multicentre validation in 2340 patients with breast cancer.*

**The Lancet Digital Health** · 2025-12-10 · 多中心验证研究 · [PMID 41381302](https://pubmed.ncbi.nlm.nih.gov/41381302/) · [DOI](https://doi.org/10.1016/j.landig.2025.100921)

多中心验证研究,收集美/英/荷3队列及荷兰3项RCT共2340例乳腺癌(含790例三阴性)全切片图像,基于病理基础模型提取形态特征后直接回归TIL评分(ECTIL),仅需10分钟训练、标注量少100倍。ECTIL与病理医生一致性r=0.54-0.74、AUROC 0.80-0.94;多变量Cox显示ECTIL-combined评分每升高10%与总生存改善相关(HR 0.85,95%CI 0.77-0.93,p=0.0007),与病理医生评分(HR 0.86)相当且独立于临床病理因素。

> **要点**：简化数字病理模型高效评估乳腺癌TIL,与病理医生一致且预后HR相当(0.85 vs 0.86)。


### 23. 关于「深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后预后评估:多中心研究」的评论

*A commentary on: "deep learning-based radiomics and machine learning for prognostic assessment in IDH-wildtype glioblastoma after maximal safe surgical resection: a multicenter study".*

**International Journal of Surgery** · 2025-12-08 · 评论/来信(无数据) · [PMID 41363102](https://pubmed.ncbi.nlm.nih.gov/41363102/) · [DOI](https://doi.org/10.1097/JS9.0000000000004153)

针对一篇DL影像组学+ML评估IDH野生型胶质母细胞瘤最大安全切除术后预后的多中心论文的评论,无原始数据。主题为外科切除术后影像组学预后建模,核心相关。

> **要点**：评述DL影像组学预测胶质母细胞瘤术后预后,主题属外科+AI。


### 24. 病理-影像组学与临床数据深度多模态融合提升结直肠癌生存预测

*Deep multimodal fusion of patho-radiomic and clinical data for enhanced survival prediction for colorectal cancer patients.*

**npj Digital Medicine** · 2025-12-05 · 多模态深度学习预后建模（回顾） · [PMID 41350716](https://pubmed.ncbi.nlm.nih.gov/41350716/) · [DOI](https://doi.org/10.1038/s41746-025-02210-z)

提出深度学习框架PRISM-CRC，融合组织病理、放射、内镜与临床数据。预测5年无病生存C指数0.82、判定微卫星不稳定（MSI）AUC 0.91，显著优于单模态；PRISM-CRC风险评分为独立生存预测因子，分层优于TNM，可识别可能获益辅助化疗的高危II期患者。存在域漂移导致的轻度性能下降，需前瞻验证。

> **要点**：多模态PRISM-CRC预测CRC 5年DFS（C指数0.82）与MSI（AUC 0.91），优于TNM分层。


### 25. 临床知情的中间推理实现有限条件下可泛化的前列腺癌预后判定

*Clinically informed intermediate reasoning enables generalizable prostate cancer prognostication through machine learning in limited settings.*

**npj Digital Medicine** · 2025-12-03 · 多机构计算病理机器学习（泛化性评估） · [PMID 41339469](https://pubmed.ncbi.nlm.nih.gov/41339469/) · [DOI](https://doi.org/10.1038/s41746-025-02193-x)

从活检全贴装组织病理提取通用特征并引入临床知情的中间推理步骤，实现数据高效的术前前列腺癌预后判定。跨多机构数据解决标本类型与机构双重域漂移，取得一致的外部验证，稳健性优于Gleason分级体系（摘要以定性结论为主，未给出具体AUC）。为资源有限环境提供公平、可解释、可临床应用的预后与治疗规划框架。

> **要点**：临床知情中间推理使前列腺癌病理预后可泛化，稳健性优于Gleason分级。


### 26. 基于增强CT深度学习识别增殖型肝癌并预测介入治疗生存获益

*Deep learning model for assessing survival benefits in hepatocellular carcinoma patients undergoing intra-arterial therapies based on proliferative subtype.*

**npj Digital Medicine** · 2025-11-19 · 多中心回顾性深度学习研究 · [PMID 41258471](https://pubmed.ncbi.nlm.nih.gov/41258471/) · [DOI](https://doi.org/10.1038/s41746-025-02100-4)

多中心回顾性研究纳入手术切除(n=398)与不可切除行TACE/HAIC(n=1749)队列，用nnUNet分割加新型Prototype Mamba Net提取影像特征。识别增殖型HCC训练/测试集AUC 0.825/0.792；结合影像组学与临床的预后列线图优于传统分期(时间依赖AUC 0.83-0.87；Brier评分0.12 vs 0.18-0.23，P<0.001)。高危患者中HAIC较TACE有显著生存获益(P<0.001)，支持个体化介入治疗选择。

> **要点**：无创识别增殖型HCC并指导介入(TACE/HAIC)选择。


### 27. 深度学习多光子显微成像从常规FFPE切片预测结直肠癌复发

*Deep learning-enabled multiphoton microscopy predicts colorectal cancer recurrence from routine FFPE specimens.*

**npj Digital Medicine** · 2025-11-18 · 多中心回顾性深度学习研究 · [PMID 41254110](https://pubmed.ncbi.nlm.nih.gov/41254110/) · [DOI](https://doi.org/10.1038/s41746-025-02058-3)

开发双流深度学习模型MPMRecNet，基于两家医院1071例患者FFPE切片的多光子显微成像预测结直肠癌根治术后复发，采用MaxViT编码器与跨模态注意力融合。外部验证ROC-AUC 0.849、PR-AUC 0.664，多因素分析中为最强独立预测因子(OR 5.66，p<0.001)，联合临床列线图ROC-AUC升至0.872。属数字病理用于术后复发预测。

> **要点**：常规病理切片无损预测结直肠癌术后复发。


### 28. 多模态AI精准预测透明细胞肾癌术后预后(多中心)

*A multimodal AI model for precision prognosis in clear cell renal cell carcinoma: A multicenter study.*

**npj Digital Medicine** · 2025-11-17 · 多中心回顾性多模态建模 · [PMID 41249481](https://pubmed.ncbi.nlm.nih.gov/41249481/) · [DOI](https://doi.org/10.1038/s41746-025-02034-x)

整合临床、CT影像与病理WSI，基于6中心及TCGA共1648例开发多模态复发评分MPRS，内/外部验证C-index 0.886/0.838，优于Leibovich、UISS及KEYNOTE-564分层。将83.3%(50/60)KEYNOTE-564低危复发者正确重分为高危、57.7%(15/26)中/高危非复发者重分为低危，优化辅助治疗决策。属影像加病理组学用于外科肿瘤复发预测。

> **要点**：多模态组学精准分层ccRCC术后复发风险。


### 29. 预测乳腺癌新辅助化疗结局的基础模型（数字病理）

*A foundation model for predicting outcomes of neoadjuvant chemotherapy in breast cancer.*

**International Journal of Surgery** · 2025-11-11 · 多队列回顾性（数字病理基础模型） · [PMID 41231625](https://pubmed.ncbi.nlm.nih.gov/41231625/) · [DOI](https://doi.org/10.1097/JS9.0000000000003999)

收集三队列1543例非转移浸润性乳腺癌（训练756/验证560/测试227）的全切片图像与临床数据，构建CNN分支加基于TCGA预训练的Transformer基础模型的混合AI-多模态模型预测pCR与DFS。pCR在训练/验证AUC达0.999，盲测试集pCR AUC 0.994、4年DFS AUC 0.885；可识别可从强化辅助化疗获益的高危non-pCR患者。

> **要点**：数字病理基础模型精准预测乳腺癌新辅助疗效与预后，核心PATHOMICS。


### 30. 评'AI驱动的copilot用于可切除结直肠癌肝转移组织学生长模式的精准诊断与外科评估：前瞻研究'(致编辑信)

*Letter to the editor: Artificial Intelligence-powered copilots for precision diagnosis and surgical assessment of histological growth patterns in resectable colorectal liver metastases: a prospective study.*

**International Journal of Surgery** · 2025-10-14 · 评论/致编辑信(无数据) · [PMID 41092366](https://pubmed.ncbi.nlm.nih.gov/41092366/) · [DOI](https://doi.org/10.1097/JS9.0000000000003664)

致编辑信(无摘要数据)，评论一项前瞻研究——AI驱动的'copilot'用于可切除结直肠癌肝转移(CRLM)组织学生长模式(HGP)的精准诊断与外科评估。涉及数字病理/AI用于外科可切除肝转移的评估，属外科AI主题。

> **要点**：评论AI copilot用于可切除CRLM组织学生长模式的病理与外科评估。


### 31. 自监督学习从3446张全切片图像发现切除间皮瘤的组织形态学图谱

*A histomorphological atlas of resected mesothelioma discovered by self-supervised learning from 3446 whole-slide images.*

**Nature Communications** · 2025-10-07 · 自监督学习(回顾性WSI) · [PMID 41057342](https://pubmed.ncbi.nlm.nih.gov/41057342/) · [DOI](https://doi.org/10.1038/s41467-025-63846-9)

采用自监督AI对3446张切除肿瘤H&E全切片(WSI)学习,构建间皮瘤组织形态学图谱,生成高可解释预测:结局预测一致性指数(c-index)0.65,亚型分型AUC 88%,并获病理学家全面评估背书及分子机制刻画。属切除标本数字病理组学,服务外科肿瘤。

> **要点**：自监督数字病理图谱预测间皮瘤结局(c-index 0.65)与亚型(AUC 88%)(核心-病理组学)


### 32. 深度学习用于上尿路上皮癌预后分层与生物标志物探索：多中心回顾队列

*Deep learning for prognostic stratification and biomarker exploration in upper tract urothelial carcinoma: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2025-10-03 · 多中心回顾数字病理深度学习研究 · [PMID 41056040](https://pubmed.ncbi.nlm.nih.gov/41056040/) · [DOI](https://doi.org/10.1097/JS9.0000000000003581)

多中心纳入805例行根治性肾输尿管切除的上尿路上皮癌(UTUC)全切片图像，构建先验知识引导的DL系统(UCSegNet分割＋CONCH视觉-语言模型＋MacroContextNet/PGCA-Net)预测总生存。UCSegNet组织分类AUC 0.9916-0.9948；主预后模型PGCA-Net的C-index 0.672-0.795优于对照，校正后高危组HR 4.93-9.38；肿瘤-肌层(HR≤5.06)与肿瘤-肾实质共定位(HR≤4.52)等7个AI量化病理标志物预示更高死亡风险。

> **要点**：先验引导的WSI深度学习系统改善UTUC术后预后分层(C-index≤0.795,高危HR至9.38)。


### 33. 基于可解释AI的乳腺癌新辅助治疗反应预测(数字病理)

*Prediction of neoadjuvant therapy response in breast cancer based on interpretable artificial intelligence.*

**International Journal of Surgery** · 2025-09-24 · 多中心回顾性数字病理AI模型开发与验证 · [PMID 40990507](https://pubmed.ncbi.nlm.nih.gov/40990507/) · [DOI](https://doi.org/10.1097/JS9.0000000000003326)

多中心回顾性(826例,2中心),用H&E全切片图像+UNI特征提取+多示例学习(MIL)预测RCB分层的新辅助治疗反应;子任务2(RCB0-1 vs 2-3)AUC训练0.901、测试0.858、内部验证0.808、外部0.819;模型评分与肿瘤浸润淋巴细胞(TILs)空间共定位、免疫微环境相关,具生物学可解释性。

> **要点**：可解释数字病理AI预测乳腺癌新辅助反应,关联肿瘤免疫微环境。


### 34. 基于CT瘤内与瘤周异质性预测食管鳞癌新辅助化免治疗后病理反应

*Intratumoral and peritumoral heterogeneity based on CT to predict the pathological response after neoadjuvant chemoimmunotherapy in esophageal squamous cell carcinoma.*

**International Journal of Surgery** · 2025-09-19 · 回顾+前瞻性影像组学预测模型 · [PMID 40968727](https://pubmed.ncbi.nlm.nih.gov/40968727/) · [DOI](https://doi.org/10.1097/JS9.0000000000003422)

回顾+前瞻纳入157例食管鳞癌(NACI后手术),提取瘤内/瘤周传统与生境(habitat)影像组学特征,14种ML算法建6模型;联合模型预测主要病理缓解(MPR)测试集AUC 0.915、准确率0.872、敏感度0.733、特异度0.938,预测pCR的AUC 0.895。

> **要点**：瘤内瘤周生境影像组学联合模型可准确预测ESCC新辅助后病理反应。


### 35. 放射转录组学补充甲状腺乳头状癌的无创风险分层

*Radiotranscriptomics in papillary thyroid carcinoma complement current noninvasive risk stratification system.*

**Science Advances** · 2025-08-29 · 回顾性影像组学+转录组研究 · [PMID 40880461](https://pubmed.ncbi.nlm.nih.gov/40880461/) · [DOI](https://doi.org/10.1126/sciadv.adv6697)

255例甲状腺乳头状癌影像组学研究，无监督聚类分出3个肿瘤簇，构建的影像组学评分内外部验证AUC达0.98，可独立预测较低N分期与良好治疗反应，并结合转录组揭示Cluster 2免疫激活特征。为术前风险分层（主动监测vs手术）提供无创工具。

> **要点**：影像组学评分AUC 0.98，指导甲状腺癌术前分层


### 36. 评论：基于AI的多模态预测透明细胞肾细胞癌核分级状态与预后（多中心队列）

*Comment on "Artificial intelligence-based multi-modal prediction for nuclear grading status and prognosis of clear cell renal cell carcinoma: a multicenter cohort study".*

**International Journal of Surgery** · 2025-08-22 · 评论/述评（无数据） · [PMID 40696981](https://pubmed.ncbi.nlm.nih.gov/40696981/) · [DOI](https://doi.org/10.1097/JS9.0000000000002963)

评论文章，针对一项基于AI的多模态模型预测透明细胞肾细胞癌（ccRCC）核分级状态与预后的多中心队列研究。ccRCC经肾切除等外科治疗，核分级属数字病理/多模态组学服务外科肿瘤学。评论本身无原始数据。

> **要点**：评论AI多模态预测ccRCC核分级与预后（数字病理）。


### 37. 用深度学习评估结直肠癌基因型-表型关联:一项多中心队列研究

*Assessing genotype-phenotype correlations in colorectal cancer with deep learning: a multicentre cohort study.*

**The Lancet Digital Health** · 2025-08-19 · 多中心队列研究 · [PMID 40829965](https://pubmed.ncbi.nlm.nih.gov/40829965/) · [DOI](https://doi.org/10.1016/j.landig.2025.100891)

多中心队列研究,对经手术切除并HE染色的结直肠癌组织WSI训练Transformer,同时预测多种基因改变。主要数据集1376例(经组合panel测序)+2个公开数据集536例验证。外部验证中多靶点Transformer平均AUROC为BRAF 0.78、超突变0.88、MSI 0.93、RNF43 0.86,匹配并部分超越单靶点模型;但高AUROC生物标志物多与MSI相关形态学相关联。

> **要点**：单一多靶点Transformer从结直肠癌手术切片HE同时预测多种基因改变(MSI AUROC 0.93)。


### 38. HIBRID:结合深度学习组织学与ctDNA的结直肠癌风险分层

*HIBRID: histology-based risk-stratification with deep learning and ctDNA in colorectal cancer.*

**Nature Communications** · 2025-08-14 · 多队列回顾性深度学习建模 · [PMID 40813777](https://pubmed.ncbi.nlm.nih.gov/40813777/) · [DOI](https://doi.org/10.1038/s41467-025-62910-8)

II-IV期结直肠癌数字病理深度学习研究,从HE全切片图像预测无病生存;DACHS队列(n=1766)训练、GALAXY队列(n=1404)验证。DL将GALAXY中304例判为高危、1100例低危(HR 2.31,p<0.005);联合MRD状态在MRD阳性(HR 1.58)与阴性(HR 2.1)组均改善分层;MRD阴性但DL高危者从辅助化疗获益(HR 0.49,p=0.01)而DL低危者无获益(HR 0.92,p=0.64)。用于术后随访与个体化辅助治疗决策。

> **要点**：DL组织学联合ctDNA显著改善结直肠癌术后复发风险分层与辅助化疗决策。


### 39. 基于CT内脏脂肪影像组学预测非肌层浸润性膀胱癌TURBT术后早期复发：多中心队列研究

*CT-based radiomics signature of visceral adipose tissue for prediction of early recurrence in patients with NMIBC: a multicentre cohort study.*

**International Journal of Surgery** · 2025-08-05 · 多中心回顾性队列（影像组学ML） · [PMID 40787990](https://pubmed.ncbi.nlm.nih.gov/40787990/) · [DOI](https://doi.org/10.1097/JS9.0000000000003140)

多中心回顾性队列纳入3家中心325例NMIBC患者，构建基于ML的内脏脂肪(VAT)与皮下脂肪(SAT)影像组学模型预测TURBT术后1年内早期复发。VAT-RM在训练/测试队列AUC分别0.853、0.823、0.808，均优于SAT-RM(P<0.001)；多因素分析VAT-RM为最显著独立预测因子(OR=0.295, P<0.001)；联合临床因素的融合模型AUC达0.938、0.909、0.905。

> **要点**：内脏脂肪影像组学预测NMIBC术后早期复发，融合模型AUC达0.90–0.94。


### 40. AI驱动的空间分析评估可切除胰腺癌免疫表型

*Artificial Intelligence-Powered Spatial Analysis of Immune Phenotypes in Resected Pancreatic Cancer.*

**JAMA Surgery** · 2025-08-01 · 回顾性队列研究 · [PMID 40560550](https://pubmed.ncbi.nlm.nih.gov/40560550/) · [DOI](https://doi.org/10.1001/jamasurg.2025.1999)

回顾性队列研究，纳入304例接受R0切除的胰腺导管腺癌(PDAC)，用AI全切片图像分析器对肿瘤浸润淋巴细胞(TIL)进行空间量化并分类免疫表型。TIL主要集中于间质（间质TIL中位734.88/mm²，瘤内100.64/mm²）；免疫炎症型占9.9%、免疫排斥型85.2%、免疫荒漠型4.9%。免疫炎症型OS/RFS最长(P<.001/P=.001)；高瘤内TIL密度与更长OS(中位52.47月，P=.004)和RFS(中位21.67月，P=.02)相关。

> **要点**：AI空间TIL分析大幅简化人工评估，免疫表型是可切除PDAC的重要预后标志物。


### 41. 多模态放射-病理组学预测胃癌预后与免疫治疗反应：多队列回顾性研究

*Multimodal radiopathomics approach for predictions of prognosis and immunotherapy response in patients with gastric cancer: a multicohort retrospective study.*

**International Journal of Surgery** · 2025-07-24 · 多中心回顾性队列（放射病理组学，ResNet-50+HoverNet） · [PMID 40705499](https://pubmed.ncbi.nlm.nih.gov/40705499/) · [DOI](https://doi.org/10.1097/JS9.0000000000002939)

多中心回顾性研究纳入3家机构1133例胃癌，融合CT(ResNet-50)与H&E病理(HoverNet)特征构建放射病理组学签名(RPS)。RPS预测5年OS的AUC在训练集0.928(95%CI 0.899–0.956)、内外部验证0.857–0.917；可识别术后化疗获益人群(HR 11.751, P<0.0001)，与免疫治疗反应显著相关(n=64, HR 3.651, P=0.009)；联合TNM的列线图C指数0.79–0.84。

> **要点**：放射病理组学预测胃癌5年OS AUC 0.928，并指导化疗/免疫获益分层。


### 42. 可解释机器学习整合瘤内瘤周影像组学与身体成分预测胰腺癌根治术后早期复发

*Interpretable machine learning model for predicting early recurrence of pancreatic cancer: integrating intratumoral and peritumoral radiomics with body composition.*

**International Journal of Surgery** · 2025-07-15 · 多中心回顾性队列（影像组学ML，含SHAP） · [PMID 40717595](https://pubmed.ncbi.nlm.nih.gov/40717595/) · [DOI](https://doi.org/10.1097/JS9.0000000000003078)

多中心研究纳入589例胰腺导管腺癌(PDAC)根治术后患者(训练320、内部验证138、外部验证131)，用6种ML算法整合瘤内瘤周影像组学与CT体成分预测早期复发。基于随机森林的瘤内瘤周影像组学模型AUC 0.865/0.849/0.839，联合临床病理的组合模型AUC 0.936/0.899/0.884，SHAP分析增强可解释性。

> **要点**：影像组学联合临床病理ML模型预测PDAC术后早期复发AUC达0.88–0.94。


### 43. 评估生成式AI模型对肺腺癌可解释病理特征提取：分级评估与预后模型构建

*Evaluating generative AI models for explainable pathological feature extraction in lung adenocarcinoma: grading assessment and prognostic model construction.*

**International Journal of Surgery** · 2025-07-09 · 数字病理AI诊断/预后研究（无摘要） · [PMID 40697010](https://pubmed.ncbi.nlm.nih.gov/40697010/) · [DOI](https://doi.org/10.1097/JS9.0000000000002924)

原始研究（无摘要），利用生成式AI（generative AI）从肺腺癌病理切片提取可解释特征，用于组织学分级评估并构建预后模型。肺腺癌为外科可切除肿瘤，属数字病理服务外科肿瘤学。因无摘要，具体样本量与AUC等指标未知。

> **要点**：生成式AI用于肺腺癌病理分级与预后建模（数字病理）。


### 44. 基于元学习优化Transformer的乳腺癌淋巴结微转移病理识别(MetaTrans)

*Transformer optimization with meta learning on pathology images for breast cancer lymph node micrometastasis.*

**npj Digital Medicine** · 2025-07-09 · 深度学习模型开发与多中心验证(数字病理) · [PMID 40634485](https://pubmed.ncbi.nlm.nih.gov/40634485/) · [DOI](https://doi.org/10.1038/s41746-025-01833-6)

针对微转移病灶小、数据受限的难题，提出元学习网络MetaTrans并构建34类数据集(MT-MCD)识别病理图像中淋巴结微转移。在两个多中心数据集表现优异，尤擅长术中冰冻切片的0-shot诊断，并可泛化到甲状腺、结直肠癌及显微镜数码相机图像，全面超越SOTA基线，展现跨域适应力。

> **要点**：元学习实现小样本淋巴结微转移识别，支持术中冰冻快速诊断。


### 45. 人工智能在乳腺癌数字病理中的应用：实践新纪元？

*Artificial Intelligence in digital pathology of breast cancer, new era of practice?*

**International Journal of Surgery** · 2025-07-08 · 系统综述 · [PMID 40696940](https://pubmed.ncbi.nlm.nih.gov/40696940/) · [DOI](https://doi.org/10.1097/JS9.0000000000002953)

系统综述，梳理AI在乳腺癌数字病理中的应用，包括肿瘤浸润淋巴细胞等组织学特征识别，以及HER2、ER、PR等经典生物标志物评估，并介绍AI结合多组学用于乳腺癌结局预测与治疗。乳腺癌为外科肿瘤，属数字病理服务外科肿瘤学。为综述类，无具体样本量与性能指标。

> **要点**：综述AI在乳腺癌数字病理中的应用前景。


### 46. 致编辑信：评「基于组织病理图像深度学习预测NSCLC手术结局——Sr-PPS模型的开发与多组学验证」

*Letter to Editor "Predicting NSCLC surgical outcomes using deep learning on histopathological images: development and multi-omics validation of Sr-PPS model".*

**International Journal of Surgery** · 2025-07-07 · 评论信（无数据） · [PMID 40643594](https://pubmed.ncbi.nlm.nih.gov/40643594/) · [DOI](https://doi.org/10.1097/JS9.0000000000002840)

致编辑信，评论一项在组织病理图像上用深度学习预测非小细胞肺癌（NSCLC）手术结局的Sr-PPS模型（含多组学验证）。属数字病理/组学用于外科肿瘤预后，明确面向手术结局。信件本身无原始数据。

> **要点**：评论DL组织病理预测NSCLC手术结局（Sr-PPS模型）。


### 47. AI副驾用于可切除结直肠癌肝转移组织学生长模式的精准诊断与外科评估：前瞻研究

*Artificial intelligence-powered copilots for precision diagnosis and surgical assessment of histological growth patterns in resectable colorectal liver metastases: a prospective study.*

**International Journal of Surgery** · 2025-07-04 · 前瞻性数字病理AI研究 · [PMID 40638258](https://pubmed.ncbi.nlm.nih.gov/40638258/) · [DOI](https://doi.org/10.1097/JS9.0000000000002922)

前瞻研究开发基于Transformer的深度学习模型COFFEE（ViT+TransMIL），对结直肠癌肝转移（CRLM）全切片图像分类组织学生长模式（HGP）。共431例（训练297/测试104/前瞻30），TCGA 1442张WSI预训练、972张WSI验证。二分类AUC训练0.961、测试0.935、前瞻1.000；四分类0.961/0.966/0.985。AI辅助初级病理医生准确率达94.7%（vs 85.9%）、诊断时间减少36%；desmoplastic型OS 53.6 vs 31.9个月（P=0.002）。

> **要点**：COFFEE模型高精度分型CRLM生长模式并指导术后治疗。


### 48. 组织病理图像深度学习分层平滑肌肉瘤分子亚型：概念验证诊断研究

*Deep learning algorithms from histopathological images stratify molecular subtypes for leiomyosarcoma: a proof-and-concept diagnostic study.*

**International Journal of Surgery** · 2025-07-04 · 多中心概念验证诊断研究（数字病理） · [PMID 40557542](https://pubmed.ncbi.nlm.nih.gov/40557542/) · [DOI](https://doi.org/10.1097/JS9.0000000000002667)

深度学习模型在TCGA单张HE全切片图像训练（n=154，1 579 215个瓦片）、多中心真实世界外部验证（n=80，555 211瓦片）。基于DenseNet121的LMS_DL分子分型AUROC 0.944±0.001，ResNet50预测2年总生存AUROC 0.937±0.024；分型准确率超病理医生30%以上（P<0.001），并使病理医生分型准确率提升12.1%±4.4%（P=0.024）、缩短诊断时间。

> **要点**：DL从HE切片对平滑肌肉瘤分子分型（AUROC 0.944）并预测生存。


### 49. 致编辑信：基于全切片图像的AI模型用于透明细胞肾细胞癌核分级（回顾多中心诊断研究）

*Letter to the Editor: An artificial intelligence model for nuclear grading of clear cell renal cell carcinoma using whole slide images: a retrospective, multicentre, diagnostic study.*

**International Journal of Surgery** · 2025-06-27 · 评论信（无数据） · [PMID 40576191](https://pubmed.ncbi.nlm.nih.gov/40576191/) · [DOI](https://doi.org/10.1097/JS9.0000000000002700)

致编辑信，评论一项基于全切片图像（WSI）的AI模型对透明细胞肾细胞癌（ccRCC）进行核分级的回顾性多中心诊断研究。ccRCC经肾切除治疗，WSI核分级属数字病理服务外科肿瘤学。信件本身无原始数据。

> **要点**：评论AI基于WSI对ccRCC核分级（数字病理）。


### 50. 致编辑信：评「评估生成式AI模型对肺腺癌分级评估与预后模型构建的可解释病理特征提取」

*Letter to the Editor: a commentary on "Evaluating generative AI Models for Explainable Pathological Feature Extraction in Lung Adenocarcinoma Grading Assessment and Prognostic Model Construction".*

**International Journal of Surgery** · 2025-06-24 · 评论信（无数据） · [PMID 40557444](https://pubmed.ncbi.nlm.nih.gov/40557444/) · [DOI](https://doi.org/10.1097/JS9.0000000000002862)

致编辑信，评论一项用生成式AI从肺腺癌病理切片提取可解释特征以进行分级评估与预后建模的研究。肺腺癌为外科可切除肿瘤，属数字病理服务外科肿瘤学。信件本身无原始数据。

> **要点**：评论生成式AI用于肺腺癌病理分级与预后（数字病理）。


### 51. 整合计算病理与多组学刻画肺腺癌异质性并构建预后模型

*Integrating computational pathology and multi-transcriptomics to characterize lung adenocarcinoma heterogeneity and prognostic modeling.*

**International Journal of Surgery** · 2025-06-05 · 回顾性计算病理+多组学生物信息学研究 · [PMID 40474806](https://pubmed.ncbi.nlm.nih.gov/40474806/) · [DOI](https://doi.org/10.1097/JS9.0000000000002639)

基于TCGA-LUAD全切片图像(WSI)，用ResNet-50提取深度学习特征、CellProfiler提取病理特征，结合inferCNV、hdWGCNA、CellChat、Monocle2等多组学分析。识别出高CNV恶性亚群（高干性、糖酵解/MYC、免疫逃逸），筛出与CNV负荷显著相关的192个影像特征（11个CellProfiler+181个ResNet-50深度特征），构建的机器学习预后模型可稳健区分高/低风险（高风险免疫浸润低、免疫治疗反应差）。属回顾性生物信息学分析。

> **要点**：计算病理(ResNet-50)+多组学刻画LUAD异质性并构建预后模型。


### 52. 基于组织病理图像深度学习预测非小细胞肺癌手术预后：Sr-PPS模型的开发与多组学验证

*Predicting NSCLC surgical outcomes using deep learning on histopathological images: development and multi-omics validation of Sr-PPS model.*

**International Journal of Surgery** · 2025-05-29 · 回顾性队列（深度学习开发+外部多组学验证） · [PMID 40440686](https://pubmed.ncbi.nlm.nih.gov/40440686/) · [DOI](https://doi.org/10.1097/JS9.0000000000002526)

开发队列337例局部NSCLC、以TCGA 554例独立验证，用Res2Net深度学习架构构建手术预后预测评分Sr-PPS。Sr-PPS对无病生存(DFS)与总生存(OS)预测精度显著提升，多变量Cox证实为独立预后因子；低Sr-PPS者抗肿瘤免疫微环境增强（T细胞迁移、BCR信号上调，IGF/STAT下调），并与CTNND2、PRRX1、ALK等驱动基因突变相关。

> **要点**：Res2Net病理深度学习模型Sr-PPS预测NSCLC术后DFS/OS并揭示分子机制。


### 53. 基于分子分型预测胃癌血行转移风险

*Prediction of hematogenous metastasis risk from molecular classification in gastric cancer.*

**International Journal of Surgery** · 2025-05-28 · 回顾性组学建模（含PDX验证） · [PMID 40434726](https://pubmed.ncbi.nlm.nih.gov/40434726/) · [DOI](https://doi.org/10.1097/JS9.0000000000002587)

分析64例显微切割原发胃癌的bulk-RNA测序，识别出干性亚型与胃型两种分子亚型，干性亚型血行转移(HM)风险显著升高并经PDX模型验证。用机器学习生存模型筛出10个干性+7个胃型signature基因，构建17基因评分分层HM风险，在三个外部队列中高危组无转移生存显著更差；并借CCLE评估潜在治疗药物。属组学用于外科肿瘤的分子分型与转移/复发预测。

> **要点**：ML生存模型基于17基因分子分型预测胃癌血行转移风险。


### 54. 基于深度学习影像组学与机器学习评估IDH野生型胶质母细胞瘤最大安全切除术后预后：多中心研究

*Deep learning-based radiomics and machine learning for prognostic assessment in IDH-wildtype glioblastoma after maximal safe surgical resection: a multicenter study.*

**International Journal of Surgery** · 2025-05-20 · 回顾性多中心研究（DL分割+影像组学+ML） · [PMID 40391963](https://pubmed.ncbi.nlm.nih.gov/40391963/) · [DOI](https://doi.org/10.1097/JS9.0000000000002488)

回顾性纳入582例IDH野生型GBM（训练301、内部128、外部153）。用ResNet分割网络将增强T1WI分为增强肿瘤、坏死非增强核、瘤周水肿三区，提取4227个影像特征经LASSO-Cox筛选，用Mime框架构建预后模型。Step Cox[backward]+RSF在三队列C指数达0.89/0.81/0.76，高低危组生存差异显著(P<0.05)；年龄、KPS、坏死核与瘤周水肿rad-score为独立预测因子并构建列线图。

> **要点**：DL分割影像组学模型预测GBM术后OS，C指数达0.89/0.81/0.76。


### 55. 基于全切片图像的透明细胞肾细胞癌AI核分级：回顾性多中心诊断研究

*An artificial intelligence model for nuclear grading of clear cell renal cell carcinoma using whole slide images: a retrospective, multicenter, diagnostic study.*

**International Journal of Surgery** · 2025-05-12 · 多中心回顾性诊断研究（含人机协作） · [PMID 40358632](https://pubmed.ncbi.nlm.nih.gov/40358632/) · [DOI](https://doi.org/10.1097/JS9.0000000000002484)

多中心回顾研究，纳入1807例ccRCC患者、5697张肾切除术全切片图像（WSI），开发AI核分级系统RIGDAS（ISUP分级）。验证集AUC 0.943–0.980；准确率0.930，较两名初级病理医师（0.897/0.887，P=0.004/0.001）高3.3–4.3%，与高级医师（0.960/0.970）相当，并将初级医师提升至高级水平，阅片时间缩短20.5–45.1%（P<0.0001）。

> **要点**：数字病理AI对肾癌核分级达高级医师水平并大幅提效。



## 七、术后结局、并发症与手术风险预测（116 篇）

### 1. Transformer-DAPT：PCI术后双联抗血小板治疗缺血与出血风险的AI动态评估

*Transformer-DAPT: AI-based dynamic assessment of ischemic and bleeding risks in patients on DAPT following PCI.*

**npj Digital Medicine** · 2026-07-14 · 深度生存建模与外部验证 · [PMID 42448824](https://pubmed.ncbi.nlm.nih.gov/42448824/) · [DOI](https://doi.org/10.1038/s41746-026-02977-9)

开发基于transformer的深度生存框架Transformer-DAPT，估计经皮冠脉介入(PCI)术后一年内患者特异的缺血与出血风险(传统评分C指数仅0.63-0.73)。基于Mayo Clinic 29,032例训练、OneFlorida+ 19,173例外部验证，时间依赖C指数(Ctd)缺血0.84-0.87、出血0.81-0.88，较DeepSurv/DeepHit提升2%-12%；外部队列Ctd 0.74-0.84/0.75-0.83，校准更优。

> **要点**：Transformer实现PCI术后多区间缺血/出血风险预测，支持个体化DAPT时长决策。


### 2. 术前人工智能模型估计非转移性肾癌患者的癌症特异性死亡率

*A preoperative Artificial Intelligence model to estimate cancer-specific mortality in nonmetastatic kidney cancer patients.*

**Nature Communications** · 2026-06-16 · 回顾性开发+外部验证（2,536+580例） · [PMID 42303642](https://pubmed.ncbi.nlm.nih.gov/42303642/) · [DOI](https://doi.org/10.1038/s41467-026-74419-9)

核心：结合随机生存森林与白盒模型开发可解释术前机器学习模型，用2,536例真实临床数据训练、580例外部验证，仅用肿瘤大小、淋巴结受累、体能状态等8项术前特征。外部队列C-index 0.88、Brier 0.02，优于既有GRANT模型，术后第一年尤为准确，并提供网页应用。

> **要点**：8特征可解释术前ML模型预测肾癌特异死亡，C-index 0.88


### 3. 年龄、情绪负担与深部脑刺激(DBS)电极位置影响帕金森病生活质量

*Age, emotional burden and deep brain stimulation electrode location shape Parkinson's disease quality of life.*

**npj Digital Medicine** · 2026-06-05 · 回顾性可解释机器学习 · [PMID 42249056](https://pubmed.ncbi.nlm.nih.gov/42249056/) · [DOI](https://doi.org/10.1038/s41746-026-02828-7)

回顾性分析130例丘脑底核DBS患者，用可解释随机森林+SHAP预测术后生活质量(QoL)变化是否超过最小临床重要差异；年轻、术前情绪负担高、电极位于右侧STN运动-联合过渡区者改善更佳；留出测试集AUC 0.70，敏感/特异度均衡。

> **要点**：年龄/情绪/电极位置预测DBS术后生活质量，指导个体化神经调控。


### 4. 可解释机器学习术前预测轻型出血性疾病的决策支持工具MBD-Check

*Development, validation, and user-centric evaluation of an interpretable machine learning decision support tool for the preoperative prediction of mild bleeding disorders (MBD-Check): a prospective diagnostic prediction study.*

**The Lancet Digital Health** · 2026-06-04 · 前瞻性诊断预测研究（外部验证） · [PMID 42243044](https://pubmed.ncbi.nlm.nih.gov/42243044/) · [DOI](https://doi.org/10.1016/j.landig.2026.101019)

前瞻性诊断预测研究，训练队列555例、外部验证217例，基于APTT、血小板功能、性别与简化出血史构建可解释ML工具MBD-Check，外部验证敏感度90.2%、特异度54.3%、AUC 0.85；86名临床医师评估中位用时72秒、SUS可用性评分82.5（优秀）。有望简化术前出血风险筛查与转诊。

> **要点**：可解释ML术前预测出血性疾病，AUC 0.85，敏感度90.2%


### 5. 预测微创左侧胰腺切除术后的最佳恢复者：全国队列洞见

*Predicting Best Performers After Minimally Invasive Left Pancreatectomy: Insights From a National Cohort.*

**Annals of Surgery** · 2026-06-04 · 全国多中心回顾性队列+机器学习 · [PMID 42237086](https://pubmed.ncbi.nlm.nih.gov/42237086/) · [DOI](https://doi.org/10.1097/SLA.0000000000007066)

纳入法国55中心2010-2022年2092例微创左胰切除(MILP)，用多变量logistic回归与XGBoost预测理想结局(IO)与最佳恢复者(BP)，IO/BP发生率59.6%/28.1%。逐步建模由术前logistic(AUC 0.57)、术前XGBoost(0.59)、加术中变量(0.62)至最终BP的XGBoost达AUC 0.72(95%CI 0.70-0.74)，敏感度0.78、特异度0.57、PPV 0.41、NPV 0.87；SHAP显示中心手术量与手术时长贡献最大。

> **要点**：XGBoost整合术前术中变量预测MILP最佳恢复者，中心手术量与手术时长权重最高。


### 6. 可解释多模态深度学习预测BCG治疗非肌层浸润性膀胱癌复发

*Explainable multimodal deep learning for recurrence prediction in BCG-treated non-muscle-invasive bladder cancer: a retrospective cohort study*

**International Journal of Surgery** · 2026-06-02 · 回顾性队列（n=523/327） · [DOI](https://doi.org/10.1097/js9.0000000000005386)

回顾性队列，纳入2006–2022年523例经尿道切除（TUR）+膀胱灌注BCG的非肌层浸润性膀胱癌（NMIBC），质控后327例（2256张膀胱镜图像+临床资料）用于分类、315例用于生存分析。融合膀胱镜图像与临床数据的多模态深度学习模型（MIBR）分类AUROC 0.84，优于纯图像（0.57）、纯临床（0.64）及EORTC/CUETO/EAU评分（0.55/0.60/0.65，P<0.001）；生存模型IBS 0.13低于评分体系（0.23/0.20/0.24，P<0.001）。

> **要点**：多模态深度学习较传统评分更准确预测NMIBC术后复发与生存轨迹。


### 7. MySurgeryRisk模型预测术后并发症与死亡率

*MySurgeryRisk Model Predictions of Postoperative Complications and Mortality.*

**JAMA Surgery** · 2026-06-01 · 回顾性多中心队列(XGBoost) · [PMID 42054034](https://pubmed.ncbi.nlm.nih.gov/42054034/) · [DOI](https://doi.org/10.1001/jamasurg.2026.1112)

回顾性纵向多中心队列，纳入OneFlorida+网络14家机构2012-2023年366875例患者508097次大手术。采用XGBoost预测ICU入住、术后机械通气、急性肾损伤(AKI)及院内死亡，AUROC分别为0.93、0.94、0.92、0.95；并发症患病率分别为8%、4%、7%、1%；主要手术操作码与医生相关因素为最具影响力变量。

> **要点**：多中心大样本ML模型准确预测术后并发症与死亡且泛化性良好


### 8. 机器学习预测可切除/交界可切除胰腺癌12个月生存以优化新辅助患者选择

*Machine learning-based prediction of 12-month survival in resectable and borderline resectable pancreatic cancer: a retrospective cohort study to optimize patient selection for neoadjuvant therapy*

**International Journal of Surgery** · 2026-05-28 · 单中心回顾队列+时间验证（n=1043） · [DOI](https://doi.org/10.1097/js9.0000000000005316)

单中心回顾队列，纳入2000–2024年1043例可切除/交界可切除胰腺导管腺癌；以625例直接手术者中500例（2000–2021）训练、125例（2022–2024）时间验证，构建预测术后OS<12个月的XGBoost模型（AUC 0.806、Brier 0.13），葡萄糖-淋巴细胞比值为最重要预测因子。以21.3%阈值分层，高危组新辅助化疗OS优于直接手术（P=0.048），低危组两种治疗无差异。

> **要点**：XGBoost预测胰腺癌术后早期死亡，助力筛选新辅助获益人群。


### 9. 多模态深度学习对根治性肾切除患者功能预后风险分层

*Multimodal deep learning model for AI-based functional prognostic risk stratification in patients undergoing radical nephrectomy*

**Nature Communications** · 2026-05-28 · 多中心回顾性建模研究 · [DOI](https://doi.org/10.1038/s41467-026-73813-7)

针对复杂肾细胞癌（RCC）在技术困难的部分肾切除（PN）与根治性肾切除（RN）间抉择难题，回顾性分析多中心1621例患者增强CT与临床数据，构建多模态深度学习模型预测RN术后GFR快速下降（年降>3 mL/min/1.73m²）。外部测试集AUC 0.788–0.873，可将患者分为高/低风险组且慢性肾病进展风险显著不同。有望术前辅助复杂RCC术式决策。

> **要点**：多模态DL术前预测肾切除术后肾功能下降（AUC 0.79–0.87）辅助术式选择。


### 10. 从行政数据推导Clavien-Dindo分级：肝胆手术中的开发与外部验证

*Deriving Clavien-Dindo Classification from Administrative Data: Development and External Validation in Hepatobiliary Surgery.*

**Annals of Surgery** · 2026-05-28 · 回顾性队列，算法开发+外部验证(对比ML) · [PMID 42204395](https://pubmed.ncbi.nlm.nih.gov/42204395/) · [DOI](https://doi.org/10.1097/SLA.0000000000007105)

双中心回顾性研究959例肝切除(开发476/验证488)，构建基于311个手术操作码映射至168个ICHI码的可解释专家算法分类30天Clavien-Dindo并发症，并与RandomForest/ElasticNet/XGBoost对比。验证集专家算法macro-F1 0.962、平衡准确度0.974、敏感度0.950、特异度0.971、加权κ 0.928，全面优于ML方法(误分类3.2%)。

> **要点**：可解释的操作码算法准确复现CDC并发症分级并优于机器学习，支持实时并发症监测。


### 11. 子宫内膜癌术后血栓栓塞风险的个体化预测：基于SHAP的可解释AI

*Personalised thrombo-embolic risk prediction after endometrial cancer surgery: an explainable AI approach using SHAP.*

**npj Digital Medicine** · 2026-05-27 · 多中心回顾性机器学习 · [PMID 42204240](https://pubmed.ncbi.nlm.nih.gov/42204240/) · [DOI](https://doi.org/10.1038/s41746-026-02782-4)

多中心841例围手术期数据，评估26种ML算法预测子宫内膜癌术后下肢深静脉血栓(LEDVT)，SVM经递归特征消除保留术后D-二聚体、年龄、纤维蛋白原、临床分期4变量，内部AUC 0.828、外部0.819；结合SHAP揭示D-二聚体非线性阈值并做成Web决策工具。

> **要点**：四变量可解释模型预测子宫内膜癌术后DVT，支持术后管理。


### 12. 机器学习模型指导直肠癌手术选择性使用临时转流回肠造口的随机对照试验

*Machine learning model-guided selective use of temporary diverting ileostomy in rectal cancer surgery: a randomized controlled trial.*

**Nature Communications** · 2026-05-25 · 随机对照试验（872例随机/750例分析，NCT04999007） · [PMID 42185305](https://pubmed.ncbi.nlm.nih.gov/42185305/) · [DOI](https://doi.org/10.1038/s41467-026-73565-4)

核心：RCT评估基于机器学习吻合口漏预测模型的RTID系统能否优化临时转流回肠造口(TDI)使用。872例I–III期直肠癌前切除患者1:1随机（分析750例），RTID组总TDI率18.6% vs 40.5%(P<0.001)、不必要造口17.7% vs 41.3%(P<0.001)，吻合口漏发生率相当(2.4% vs 2.7%，P=0.753)。

> **要点**：ML吻合口漏预测指导造口决策，安全性不受损而显著减少不必要造口


### 13. 基于术中生命体征动态在手术结束时预测术后感染并发症

*End-of-surgery prediction of postoperative infectious complications from intraoperative vital-sign dynamics.*

**npj Digital Medicine** · 2026-05-07 · 回顾性机器学习开发与验证 · [PMID 42092125](https://pubmed.ncbi.nlm.nih.gov/42092125/) · [DOI](https://doi.org/10.1038/s41746-026-02707-1)

利用10,719例手术的术中动脉血压、心率、血氧、体温、呼气末CO₂时序特征构建机器学习模型，手术结束即刻预测术后感染AUROC 0.88（95%CI 0.85-0.91），显著优于仅术前变量模型，并经SHAP解释与跨手术簇校准。

> **要点**：术中体征时序编码术后感染早期信号，可解释。


### 14. 预测退伍军人大手术后的迁延性恢复与长期独立性丧失

*Predicting Protracted Recovery and Long-Term Loss of Independence after Major Surgery in Veterans.*

**Annals of Surgery** · 2026-05-05 · 回顾性队列+LASSO/梯度提升机器学习 · [PMID 42083088](https://pubmed.ncbi.nlm.nih.gov/42083088/) · [DOI](https://doi.org/10.1097/SLA.0000000000007080)

回顾性队列用全部VA外科质量改进项目数据(2016-2019)，以LASSO回归筛选变量建立长期恢复轨迹(0-60天顺利恢复对≥6月迁延/失独立)风险计算器。模型判别力高(c统计量0.906-0.908)、敏感度83.0-83.6%、特异度82.4-82.5%；梯度提升(树基机器学习)未明显更优(c统计量0.920)；最强预测因子为90天住院护理评估需求评分。

> **要点**：机器学习风险计算器识别术后长期迁延恢复或独立性丧失高危患者。


### 15. 面向CA19-9不产生型胰腺导管腺癌的AI衍生电子肿瘤标志物(e19-9)

*AI-Derived Electronic Tumor Marker For Cancer Antigen 19-9 Nonproducers With Pancreatic Ductal Adenocarcinoma.*

**JAMA Surgery** · 2026-05-01 · 队列研究(AI/机器学习标志物开发与验证) · [PMID 41848749](https://pubmed.ncbi.nlm.nih.gov/41848749/) · [DOI](https://doi.org/10.1001/jamasurg.2026.0291)

队列研究，基于电子健康记录常规血清实验室数据训练AI模型衍生电子肿瘤标志物e19-9。训练集3239例、外部验证4384例(跨58家机构)，应用于121例CA19-9不产生型可切除/交界可切除PDAC。e19-9下降≥50%(AUC 0.79)与e19-9<100(AUC 0.84)与预后相关；达标者完成全部新辅助加手术的OR分别为5.00、19.31，e19-9<100独立关联OS(HR 0.49，95%CI 0.25-0.97，P=.04)。

> **要点**：AI衍生e19-9可为约30%不产生CA19-9的PDAC患者提供无创疗效与预后评估


### 16. 基于深度学习定量评估右上肺叶切除术后肺不张

*Deep-learning based quantitative evaluation of postoperative atelectasis following right upper lobectomy.*

**npj Digital Medicine** · 2026-04-30 · 回顾性深度学习分割研究 · [PMID 42062447](https://pubmed.ncbi.nlm.nih.gov/42062447/) · [DOI](https://doi.org/10.1038/s41746-026-02683-6)

回顾236例右上肺叶切除，训练三个nnU-Net v2分割模型定量右中/下叶与全肺体积。右中叶体积丢失随不张分级加重（0级-4.6mL至4级-317.8mL，p<0.001）；标化ΔRML/RL、ΔRML/TL越高，1年支气管镜需求越低（OR 0.89、0.80，p=0.01/0.03）。

> **要点**：深度学习定量分级术后肺不张并关联临床结局。


### 17. 引产后分娩方式预测机器学习模型的外部验证

*External validation of a machine learning model for delivery mode prediction after induction.*

**npj Digital Medicine** · 2026-04-28 · 机器学习建模与外部验证 · [PMID 42050170](https://pubmed.ncbi.nlm.nih.gov/42050170/) · [DOI](https://doi.org/10.1038/s41746-026-02384-0)

开发并外部验证预测引产(IOL)后分娩方式(阴道分娩VD vs 剖宫产CS)的ML模型。葡萄牙三级中心n=2434开发/内部验证，Consortium on Safe Labor n=10,591外部验证。内部验证逻辑回归在多种ML中最佳(AUROC 0.793、F1 0.748、PPV 0.752)；简化13特征模型外部AUROC 0.808、F1 0.781、PPV 0.822，倾向VD(99.6%)、假阳性0.5%；校准低估CS风险10-75%。

> **要点**：首个外部验证的引产后分娩方式(含剖宫产)预测ML模型，外部AUROC 0.808。


### 18. 收缩压变异性与心脏术后房颤发生的关系：基于机器学习的回顾队列

*Relationship between systolic blood pressure variability and the incidence of postoperative atrial fibrillation after cardiac surgery: a machine learning-based retrospective cohort study*

**International Journal of Surgery** · 2026-04-27 · 回顾性队列（MIMIC-IV）+机器学习 · [DOI](https://doi.org/10.1097/js9.0000000000005211)

基于MIMIC-IV数据库的回顾队列，研究收缩压变异性（SBPV）与心脏术后房颤（POAF）的关系。全调整logistic模型示SBPV升高独立增加POAF风险（T3 vs T1：OR 1.51，95%CI 1.34–1.70，P<0.001）；POAF患者中高SBPV组180天（HR 2.14）与360天死亡率（HR 1.82）显著升高。六种ML模型中CatBoost表现最佳（AUC=0.763），SBPV为重要预测因子。

> **要点**：收缩压变异性预测心脏术后房颤及远期死亡，CatBoost AUC 0.763。


### 19. 联邦模型堆叠改进全国网络中心心脏术后AKI的医院层面预测

*Exploring the limits of localization: federated model stacking improves hospital-level prediction in a national research network.*

**npj Digital Medicine** · 2026-04-24 · 多中心回顾性建模比较 · [PMID 42032114](https://pubmed.ncbi.nlm.nih.gov/42032114/) · [DOI](https://doi.org/10.1038/s41746-026-02634-1)

在23家医院43,926例心脏手术数据上，比较本地训练模型与多中心pooling及新型联邦模型堆叠预测心脏术后急性肾损伤。多中心模型在时间与外部验证集各AKI严重度AUC均高于单中心；病例量小的医院AUC提升最大。

> **要点**：多中心/联邦模型优于本地模型预测心脏术后AKI。


### 20. AI预后工具对结直肠癌肝转移临床医生表现的影响

*Impact of an AI prognostic tool on clinician performance in colorectal liver metastases.*

**npj Digital Medicine** · 2026-04-08 · 前瞻性随机多阅片者多病例试验 · [PMID 41951838](https://pubmed.ncbi.nlm.nih.gov/41951838/) · [DOI](https://doi.org/10.1038/s41746-026-02606-5)

前瞻随机多阅片者多病例试验，12名外科肿瘤学家在有/无ML预后工具辅助下评估166例结直肠癌肝转移（交叉设计、5周洗脱、共3984次评估）。工具辅助显著提升3年死亡预测AUC（均差0.091，95%CI 0.001-0.181，P=0.048），缩短决策时间（2.53 vs 3.04分钟）并提升信心，初中级医师获益最大。

> **要点**：ML预后工具提升CRLM评估准确率、效率与信心。


### 21. 基于术前T1加权MRI的深度表征学习预测迷走神经刺激(VNS)疗效

*A deep representation learning model to predict response to vagus nerve stimulation.*

**Nature Communications** · 2026-04-07 · 多队列回顾性预测建模 · [PMID 41946715](https://pubmed.ncbi.nlm.nih.gov/41946715/) · [DOI](https://doi.org/10.1038/s41467-026-71555-0)

针对儿童难治性癫痫VNS植入术疗效无法术前预测的问题,构建深度表征学习模型VQ-VNS。最大VNS队列(n=1046)显示术前临床数据无法预测应答(AUC 0.54,p>0.99);VQ-VNS在7433例T1w图像上预训练后,基于术前T1w(n=263)预测VNS应答达AUC 0.73(p=0.007),预测定位于富含5-羟色胺脑区并提示非应答者网络连接大范围破坏。

> **要点**：术前结构MRI深度学习可预测VNS手术疗效,优于临床指标(AUC 0.73 vs 0.54)


### 22. 大语言模型与机器学习预测经皮椎体后凸成形术后并发症的比较

*Comparative performance of LLMs and machine learning in predicting complications after percutaneous kyphoplasty for osteoporotic vertebral compression fractures.*

**npj Digital Medicine** · 2026-04-01 · 单中心回顾+前瞻性诊断建模对比研究 · [PMID 41922526](https://pubmed.ncbi.nlm.nih.gov/41922526/) · [DOI](https://doi.org/10.1038/s41746-026-02588-4)

单中心回顾+前瞻研究，用GPT-5、DeepSeek R1（零/少样本）、5种传统ML及2名脊柱外科医生预测经皮椎体后凸成形术(PKP)后骨水泥渗漏(BCL)与新发椎体骨折(NVF)。BCL预测中LLM零样本F1 0.857-0.871、MCC 0.164-0.332，与传统ML(F1 0.758-0.867)相当、略优于医生(F1 0.675-0.684)；NVF零样本较差(F1 0.309)，RBF-SVM最佳(F1 0.536, MCC 0.414)。结论认为当前LLM尚不成熟。

> **要点**：LLM对PKP不同术后并发症预测能力参差，尚未成熟。


### 23. 从预测到协作：将机器学习定位为术后感染预防中护理风险评估的决策支持工具

*From prediction to partnership: positioning machine learning as a decision-support tool for nursing risk assessment in postoperative infection prevention*

**International Journal of Surgery** · 2026-03-17 · 观点/评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005065)

观点/评论类文章(无摘要、无数据)，主张将机器学习定位为术后感染预防中护理风险评估的协作式决策支持工具，而非替代人的预测器，强调人机协作。

> **要点**：机器学习应作为术后感染预防的护理决策支持而非替代者


### 24. 评论：预测踝关节骨折术后手术部位感染风险的机器学习模型构建效度验证

*Comment on “Construct validation of machine learning models for predicting surgical site infection risk following ankle fracture surgery”*

**International Journal of Surgery** · 2026-03-10 · 评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005030)

评论文章(无摘要、无数据)，针对一项关于机器学习预测踝关节骨折手术后手术部位感染(SSI)风险模型的构建效度研究进行讨论。

> **要点**：对踝关节骨折术后SSI预测ML模型的构建效度评论


### 25. 三维时空心脏重建预测急性心梗患者主要不良心血管事件(MACE)

*3D Spatiotemporal cardiac reconstruction for predicting MACE in acute myocardial infarction.*

**npj Digital Medicine** · 2026-03-06 · 多模态深度学习预后建模（回顾性） · [PMID 41792188](https://pubmed.ncbi.nlm.nih.gov/41792188/) · [DOI](https://doi.org/10.1038/s41746-026-02449-0)

针对PCI术后急性心梗患者，先用ReconSeg3D将短轴电影CMR重建为随时间演变的三维双心室容积，再与45项临床/CMR变量经时空分解与交叉注意力融合构建HeartTTable模型。5年时间依赖AUC达0.934(95%CI 0.907-0.959)、Harrell C指数0.897，显著优于仅用表格特征模型，且术后风险分层能力强。属介入术后结局预测，核心相关。

> **要点**：影像+表格多模态融合显著提升PCI术后长期MACE预测。


### 26. 基于炎症指标综合评估结肠癌术后异时性肝转移风险:多中心前瞻研究

*Comprehensive assessment of postoperative metachronous liver metastasis risk in colon cancer based on inflammatory indicators: a multicenter prospective study.*

**International Journal of Surgery** · 2026-02-25 · 多中心回顾建模+前瞻验证 · [PMID 41738596](https://pubmed.ncbi.nlm.nih.gov/41738596/) · [DOI](https://doi.org/10.1097/JS9.0000000000004984)

开发并验证预测结肠癌根治术后异时性肝转移的ML模型。回顾队列3938例(1年内11.2%发生),前瞻队列724例(7.5%);经三重特征筛选纳入18项临床变量与9项免疫炎症指标,比较10种ML模型。梯度提升机(GBM)最优,AUC 0.964(95%CI 0.944-0.983),前瞻验证AUC 0.939;SHAP解释,遵循TRIPOD+AI。

> **要点**：GBM准确预测结肠癌术后1年异时性肝转移(前瞻AUC 0.939)


### 27. 预测穿孔性消化性溃疡术后不良事件的机器学习模型:二次队列研究

*Development and internal-external validation of a machine learning model to predict the risk for postoperative adverse events in patients with peptic ulcer perforation: a secondary cohort study of the perforated peptic ulcer analyzing project study.*

**International Journal of Surgery** · 2026-02-18 · 多中心回顾性二次队列建模(随机森林) · [PMID 41706610](https://pubmed.ncbi.nlm.nih.gov/41706610/) · [DOI](https://doi.org/10.1097/JS9.0000000000004942)

基于日本七中心穿孔性消化性溃疡(PPU)分析项目开发并部署术后不良事件(Clavien-Dindo≥III级)预测模型。425例手术患者中78例(18.3%)发生不良事件;随机森林经内-外部交叉验证入选10变量,合并AUROC 0.83,优于PULP(0.79)与Boey评分(0.67),并部署为交互式网页应用。

> **要点**：随机森林预测PPU术后重度并发症(AUROC 0.83),优于传统评分


### 28. 融合结构化数据与临床文本的房颤消融术后复发预测深度学习模型

*A deep learning model integrating structured data and clinical text for predicting atrial fibrillation recurrence.*

**npj Digital Medicine** · 2026-02-16 · 多中心回顾性队列研究 · [PMID 41699044](https://pubmed.ncbi.nlm.nih.gov/41699044/) · [DOI](https://doi.org/10.1038/s41746-026-02436-5)

多中心回顾性研究纳入5家中国中心2508例房颤(AF)导管消融患者，构建双分支模型：结构化数据经1D ResNet、文本经四种LLM(LLaMA-7B、Phi2-2.7B、Mistral-7B、MedGemma-27B)编码。以MedGemma提取文本特征表现最佳，训练/验证/测试集AUC分别为0.934(95%CI 0.921-0.946)、0.928(0.904-0.950)、0.911(0.878-0.941)。可有效识别高危个体以指导降低复发的靶向干预。

> **要点**：多模态围术期数据预测房颤消融复发，测试集AUC 0.911。


### 29. AI冠脉血运重建临床决策支持系统的卫生经济学仿真建模

*Health economic simulation modeling of an AI-enabled clinical decision support system for coronary revascularization.*

**npj Digital Medicine** · 2026-02-16 · 回顾性真实世界数据卫生经济学仿真建模 · [PMID 41699068](https://pubmed.ncbi.nlm.nih.gov/41699068/) · [DOI](https://doi.org/10.1038/s41746-026-02430-x)

用加拿大Alberta 25,942例阻塞性冠心病患者真实数据对AI冠脉血运重建决策支持系统做卫生经济学仿真，AI提供3年与5年MACE及全因死亡预测以辅助在药物治疗、PCI与冠脉搭桥(CABG)间选择。在5万美元/QALY支付意愿下，多达72.4%实际决策转向经济最优治疗，人均节省22,960美元、QALY增益等值最高22,439美元；保守情景仍有53.2%决策改变。属AI辅助血运重建(含CABG手术)决策，核心相关。

> **要点**：AI决策支持可优化冠脉血运重建的系统级经济价值。


### 30. 基于临床与影像特征预测创伤性脑损伤去骨瓣减压术后血肿扩大或再出血的可解释机器学习模型

*Explainable machine learning model based on clinical and radiological features for predicting hematoma expansion or rebleeding after decompressive craniectomy in traumatic brain injury: a bicentric cohort study.*

**International Journal of Surgery** · 2026-02-12 · 双中心回顾性建模与外部验证(XGBoost) · [PMID 41677336](https://pubmed.ncbi.nlm.nih.gov/41677336/) · [DOI](https://doi.org/10.1097/JS9.0000000000004933)

双中心队列(训练/内部n=880,外部n=302)开发预测TBI去骨瓣减压(DC)术后血肿扩大/再出血的可解释模型。比较5种ML算法,XGBoost最优:合并AUC 0.868(外部0.847),准确率83.4%、敏感度75.6%、特异度86.6%;保留11项术前预测因子(年龄、GCS、抗凝抗板、高血压、基底池状态等),SHAP解释并部署在线工具。

> **要点**：可解释XGBoost术前预测去骨瓣减压术后再出血(外部AUC 0.847)


### 31. 深度学习分析创伤中REBOA与复苏性开胸术的生存结局：韩国全国队列

*Deep learning-based survival outcomes of REBOA vs resuscitative thoracotomy in trauma: a nationwide cohort study in South Korea.*

**International Journal of Surgery** · 2026-01-29 · 全国性回顾队列(深度学习) · [PMID 41609386](https://pubmed.ncbi.nlm.nih.gov/41609386/) · [DOI](https://doi.org/10.1097/JS9.0000000000004925)

全国性队列研究，用深度学习比较创伤患者REBOA与复苏性开胸术的生存结局（摘要未提供具体数值）。深度学习+急诊创伤外科操作的结局比较。

> **要点**：DL比较REBOA与复苏性开胸术创伤生存结局。


### 32. 可解释多模态机器学习预测胰腺导管腺癌根治性切除后早期复发

*Interpretable multi-modal machine learning model predicts early recurrence after curative resection of pancreatic ductal adenocarcinoma.*

**International Journal of Surgery** · 2026-01-26 · 回顾性研究(多模态ML) · [PMID 41586629](https://pubmed.ncbi.nlm.nih.gov/41586629/) · [DOI](https://doi.org/10.1097/JS9.0000000000004762)

研究采用可解释多模态机器学习预测PDAC根治性切除后早期复发（摘要未提供具体数值）。多模态ML+外科(根治性切除)+复发预测。

> **要点**：可解释多模态ML预测PDAC切除后早期复发。


### 33. 评“MRI影像组学与临床特征模型预测腰椎间盘突出术后功能结局的多中心回顾研究”

*Comment on "MRI radiomics and clinical feature model for predicting postoperative functional outcome of lumbar disc herniation: a multicenter retrospective study".*

**International Journal of Surgery** · 2026-01-26 · 评论(无原始数据) · [PMID 41586605](https://pubmed.ncbi.nlm.nih.gov/41586605/) · [DOI](https://doi.org/10.1097/JS9.0000000000004659)

针对一项MRI影像组学+临床特征模型预测腰椎间盘突出症术后功能结局研究的评论，无独立数据。涉及外科术后结局的影像组学预测。

> **要点**：关于MRI影像组学预测腰椎间盘突出术后结局的评论。


### 34. CT影像组学列线图预测肾癌部分肾切除术后早期肾功能下降：多中心开发/验证

*Computed tomography radiomics-derived nomogram for prediciting early renal function decline after partial nephrectomy in renal cell carcinoma: a multicenter development/validation study.*

**International Journal of Surgery** · 2026-01-26 · 多中心回顾性队列(影像组学列线图) · [PMID 41586593](https://pubmed.ncbi.nlm.nih.gov/41586593/) · [DOI](https://doi.org/10.1097/JS9.0000000000004782)

多中心回顾研究，1440例局限性RCC行部分肾切除，从肿瘤与同侧正常肾实质多期相提取影像组学特征，经LASSO构建影像组学-临床列线图；术前列线图AUC 0.909–0.952，术前+术中列线图进一步提升至0.926–0.962，10中心+KITS23外部验证稳健。

> **要点**：CT影像组学列线图术前/术中预测部分肾切除后早期肾功能下降，AUC最高0.962。


### 35. 深度学习衍生CT体成分在局部进展期胃癌中超越TNM的生存风险分层：多模态队列

*Deep learning-derived CT body composition enhances survival risk stratification beyond the TNM system in locally advanced gastric cancer: a multi-modality cohort study.*

**International Journal of Surgery** · 2026-01-23 · 多模态回顾性队列(深度学习分割) · [PMID 41570290](https://pubmed.ncbi.nlm.nih.gov/41570290/) · [DOI](https://doi.org/10.1097/JS9.0000000000004835)

回顾队列，227例III期胃癌根治性胃切除，UNet++自动量化CT体成分(与手动分割r²>0.85)；低SAT指数与高VAT/SAT比独立预测更差DFS/OS(HR 1.4–1.6)，纳入体成分显著改善生存模型(P<0.03)，高VAT/SAT关联免疫代谢表型。

> **要点**：DL衍生VAT/SAT比在胃癌中超越TNM进行生存分层。


### 36. 因果可解释机器学习用于颅骨成形术后风险预测与手术决策支持

*A Causal and interpretable machine learning framework for postcranioplasty risk prediction and surgical decision support.*

**npj Digital Medicine** · 2026-01-21 · 多中心回顾加因果推断 · [PMID 41566002](https://pubmed.ncbi.nlm.nih.gov/41566002/) · [DOI](https://doi.org/10.1038/s41746-026-02370-6)

多中心研究筛选9个特征、比较15种算法，随机森林最优：内部交叉验证AUROC 0.949、地理外部0.930、时间外部0.932，亚组最低0.927、校准O/E 1.16(95%CI 0.97-1.40)。用双重机器学习与T-learner因果推断发现皮下负压引流(ATE=-0.241)与钛网(ATE=-0.191)对术后并发症有保护效应，并提供网页工具支持术中决策。

> **要点**：颅骨成形并发症预测AUROC 0.949，识别可改善的术中保护因素。


### 37. 机器学习模型预测胰腺导管腺癌与腺鳞癌术后生存

*Postoperative survival prediction in pancreatic ductal adenocarcinoma and adenosquamous carcinoma: development of the machine learning-based model.*

**International Journal of Surgery** · 2026-01-21 · 回顾性ML模型开发+SHAP可解释 · [PMID 41417942](https://pubmed.ncbi.nlm.nih.gov/41417942/) · [DOI](https://doi.org/10.1097/JS9.0000000000004008)

回顾性研究以Boruta与LASSO从临床-实验室数据筛选7个特征，比较9种ML模型；XGBoost验证集AUROC 0.796，1/3/5年生存AUROC 0.593/0.699/0.774，在PDAC与PASC亚型AUC分别0.730与0.822；SHAP显示嗜碱性粒细胞、病理类型、DB、CA125、HDL贡献最大。

> **要点**：XGBoost整合多维临床数据预测胰腺癌术后生存与亚型分层。


### 38. 评“多模态深度学习预测非心脏手术后主要不良心脑血管事件”

*Comment on "Multimodal deep learning to predict postoperative major adverse cardiac and cerebrovascular events after noncardiac surgery".*

**International Journal of Surgery** · 2026-01-20 · 评论(无原始数据) · [PMID 41563071](https://pubmed.ncbi.nlm.nih.gov/41563071/) · [DOI](https://doi.org/10.1097/JS9.0000000000004804)

针对一项多模态深度学习预测非心脏手术后MACCE研究的评论，无独立数据。属外科术后结局深度学习预测的学术讨论。

> **要点**：关于多模态DL预测非心脏手术后MACCE的评论。


### 39. 评“33579例尿路结石：成分、共病、季节变化及基于机器学习的尿脓毒症预测的新模式”

*Comment on "Clinical management implications from 33,579 urinary stones: novel patterns in composition, comorbidities, seasonal variation, and machine learning-based urosepsis prediction".*

**International Journal of Surgery** · 2026-01-20 · 评论(无原始数据) · [PMID 41556911](https://pubmed.ncbi.nlm.nih.gov/41556911/) · [DOI](https://doi.org/10.1097/JS9.0000000000004680)

针对一项大样本尿路结石研究(成分/共病/季节+ML尿脓毒症预测)的评论，无独立数据。涉及结石(外科处理)围手术期尿脓毒症的机器学习预测。

> **要点**：关于尿路结石ML尿脓毒症预测的评论。


### 40. 面向多模态外科风险评估的12导联心电图动态图表示

*Toward dynamic graph representation of 12-lead ECG in multimodal surgical risk assessment.*

**International Journal of Surgery** · 2026-01-13 · 方法学观点（摘要缺失） · [PMID 41537399](https://pubmed.ncbi.nlm.nih.gov/41537399/) · [DOI](https://doi.org/10.1097/JS9.0000000000004779)

观点/方法类文章，提出将12导联心电图用动态图（graph）表示并融入多模态外科风险评估，属AI（图表示/图神经网络）用于手术风险分层。（仅标题、无摘要。）

> **要点**：用动态图表示ECG增强多模态外科风险评估。


### 41. 评述：机器学习模型预测胃腺癌全胃/近端胃切除术后吻合口漏的多中心前瞻验证

*Comment on "prospective multicenter validation of a machine learning model for predicting anastomotic leakage in patients with gastric adenocarcinoma undergoing total or proximal gastrectomy".*

**International Journal of Surgery** · 2026-01-13 · 评论/来信（Comment） · [PMID 41549839](https://pubmed.ncbi.nlm.nih.gov/41549839/) · [DOI](https://doi.org/10.1097/JS9.0000000000004794)

本文为针对「机器学习预测胃腺癌全胃或近端胃切除术后吻合口漏多中心前瞻验证」研究的评论/来信（无原始数据，摘要缺失）。所评述主题为外科并发症（吻合口漏）的ML预测，属手术+AI核心议题。

> **要点**：围绕胃切除吻合口漏ML预测模型的学术评述。


### 42. 血浆蛋白质组标志物预测炎症性肠病肠切除风险

*Plasma proteomic markers predict risk for bowel resection in inflammatory bowel disease: a retrospective cohort study.*

**International Journal of Surgery** · 2026-01-12 · 回顾性队列（UK Biobank）+RSF机器学习+蛋白组学 · [PMID 41427536](https://pubmed.ncbi.nlm.nih.gov/41427536/) · [DOI](https://doi.org/10.1097/JS9.0000000000004636)

基于UK Biobank 915例IBD（随访中81例行肠切除），用随机生存森林（RSF）结合Olink炎症蛋白建模，C-index 0.784显著优于传统标志物0.543（P<0.01）；关键蛋白IL15/PAPPA/PIK3AP1，风险评分为独立预测因子（校正HR 0.83, 95%CI 0.81–0.86），净重分类改善0.096（P=0.027）。属ML预测手术（肠切除）需求的风险分层。

> **要点**：蛋白组ML优于传统标志物预测IBD肠切除风险。


### 43. 围手术期替雷利珠单抗联合仑伐替尼治疗高复发风险可切除肝癌的单臂II期试验

*Perioperative tislelizumab plus lenvatinib treatment for resectable hepatocellular carcinoma at high risk of recurrence: single-arm phase II trial.*

**Nature Communications** · 2026-01-08 · 单臂II期临床试验+事后机器学习 · [PMID 41501032](https://pubmed.ncbi.nlm.nih.gov/41501032/) · [DOI](https://doi.org/10.1038/s41467-025-68108-2)

单臂II期试验(NCT04834986,n=27)评估高复发风险可切除HCC围手术期替雷利珠单抗(抗PD-1)+仑伐替尼:3级治疗相关不良反应7.4%,ORR 55.6%;20例手术者中位DFS 18.8个月,1/2年DFS为74.0%/49.8%,pCR 20%。事后基于Tabular Prior Data Fitted Network(TabPFN)、含6项治疗前血液学指标的机器学习模型,训练集AUC/ACC/AP均为1.0,测试集AUC=0.917、ACC=0.778、AP=0.966,用于手术候选患者筛选。

> **要点**：围手术期免疫联合治疗可切除HCC,ML(TabPFN)辅助手术候选筛选(测试AUC 0.917)


### 44. 2.5D深度学习模型优化前列腺癌术后生化复发预测与风险分层

*Optimizing recurrence prediction and risk stratification in prostate cancer using a 2.5D deep learning model: a multicenter MRI-based study.*

**International Journal of Surgery** · 2025-12-19 · 多中心回顾性影像DL模型开发与外部验证 · [PMID 41417975](https://pubmed.ncbi.nlm.nih.gov/41417975/) · [DOI](https://doi.org/10.1097/JS9.0000000000004584)

回顾性纳入5中心923例（10153幅MRI）根治性前列腺切除患者，以ResNet18为骨干、Transformer构建DL模型并融合临床变量（DLF）；DLF预测生化复发（BCR）内部AUC 0.938、外部0.935，显著优于所有单模态（P<0.05），较临床模型提升0.058–0.253、较CAPRA提升0.189–0.299；1/2/3年时间依赖AUC 0.866/0.867/0.879，有效分层高危复发。

> **要点**：MRI 2.5D DL模型精准预测前列腺癌术后生化复发与风险分层。


### 45. 深度学习模型辅助下消融与亚肺叶切除治疗IA期非小细胞肺癌的多中心对比

*Ablation versus sublobar resection for stage IA non-small cell lung cancer: a multicenter retrospective cohort study using a deep learning model in the ablation group.*

**International Journal of Surgery** · 2025-12-18 · 多中心回顾队列+倾向匹配+DL（ViT）预后模型 · [PMID 41418024](https://pubmed.ncbi.nlm.nih.gov/41418024/) · [DOI](https://doi.org/10.1097/JS9.0000000000004580)

回顾2145例（2012–2023）图像引导热消融（IGTA）或亚肺叶切除（SLR），倾向评分匹配后PFS（HR 2.02, P=0.120）与CSS（HR 3.09, P=0.082）无显著差异；基于治疗前CT的Vision Transformer（ViT）模型预测消融后无病生存AUC 0.826/0.814，高ViT评分预示更差生存（HR 8.61, P<0.001），多模态XGBoost进一步提升。属DL预后建模指导消融/手术患者选择。

> **要点**：ViT模型预测消融预后，辅助IA期NSCLC消融vs手术选择。


### 46. 机器学习聚类多模态高维围手术期数据揭示心脏外科血流动力学驱动表型

*Machine-learning approach uncovers hemodynamic-driven phenotypes in cardiac surgery by clustering multimodal, high-dimensional perioperative data.*

**International Journal of Surgery** · 2025-12-16 · 多中心回顾性无监督ML聚类+外部验证 · [PMID 41405269](https://pubmed.ncbi.nlm.nih.gov/41405269/) · [DOI](https://doi.org/10.1097/JS9.0000000000004536)

多中心回顾研究，整合10847例心脏外科（体外循环）临床与术中高分辨生命体征时序（1006个参数），经无监督层次聚类识别5种表型；表型E（严重血流动力学波动）急性肾损伤66.9%、急性肝衰38.8%、死亡率11.4%最高，并在多个外部队列验证可重复性。属ML表型用于手术风险分层。

> **要点**：ML聚类识别心脏外科血流动力学表型，助个体化围术期风险分层。


### 47. 不稳定骨盆骨折合并颅脑损伤的预后模型与SBP-风险U形关系

*Prognostic model and U-shaped SBP-risk correlation in unstable pelvic fractures with TBI.*

**npj Digital Medicine** · 2025-12-16 · 单中心回顾性预后建模（列线图+可解释ML） · [PMID 41402560](https://pubmed.ncbi.nlm.nih.gov/41402560/) · [DOI](https://doi.org/10.1038/s41746-025-02249-y)

回顾2010-2025年204例不稳定骨盆骨折合并TBI患者，经LASSO+多因素logistic构建列线图并同步开发可解释机器学习模型。休克、SBP异常、非手术处理、凝血时间延长为独立不良预后因素；以SBP、休克、骨盆骨折手术、PT构建的列线图AUC=0.801、C指数0.7747；SBP 110-122 mmHg风险最低，呈U形关系。为个体化血压管理与手术决策提供依据（含XGBoost）。

> **要点**：骨盆骨折合并TBI预后列线图AUC 0.801，揭示SBP-预后U形关系，支持手术决策。


### 48. 关于“隐私保护联邦学习预测结直肠手术90天死亡率（多中心）”的读者来信

*Letter to the Editor about privacy preserving federated learning for 90-day mortality prediction in colorectal surgery: a multicenter retrospective development and comparison study.*

**International Journal of Surgery** · 2025-12-11 · 读者来信（无原始数据） · [PMID 41376454](https://pubmed.ncbi.nlm.nih.gov/41376454/) · [DOI](https://doi.org/10.1097/JS9.0000000000004167)

读者来信（Letter），无原始数据，针对同一项以隐私保护联邦学习开发并比较、预测结直肠手术90天死亡率的多中心回顾研究进行讨论。所评论研究属外科术后死亡率的联邦学习/机器学习预测。

> **要点**：就结直肠手术90天死亡率联邦学习模型的又一封来信讨论。


### 49. 提升术前风险分层:脊柱转移瘤手术ICU入住的可解释机器学习模型

*Enhancing preoperative risk stratification: an interpretable machine learning model for ICU admission in spinal metastasis surgery.*

**International Journal of Surgery** · 2025-12-09 · 多中心机器学习预测模型(含外部验证) · [PMID 41376391](https://pubmed.ncbi.nlm.nih.gov/41376391/) · [DOI](https://doi.org/10.1097/JS9.0000000000004416)

多中心研究开发并验证ML模型预测脊柱转移瘤术后30天非计划ICU入住。共642例(推导/内验525例,外验117例),11特征、6种算法;KNN最优(AUC 0.884,准确率82.1%,召回96.4%,Brier 0.149),外验KNN AUC 0.834显著优于ANN 0.741(DeLong P<0.001)。

> **要点**：KNN模型可较好预测脊柱转移瘤术后ICU入住(外验AUC 0.834)。


### 50. 关于「机器学习预测结直肠手术后并发症的系统综述与荟萃分析:进展几何?」的评论

*Comment on "Systematic review and meta-analysis of the role of machine learning in predicting postoperative complications following colorectal surgery: how far has machine learning come?".*

**International Journal of Surgery** · 2025-12-08 · 评论/来信(无数据) · [PMID 41363091](https://pubmed.ncbi.nlm.nih.gov/41363091/) · [DOI](https://doi.org/10.1097/JS9.0000000000004186)

针对一篇评估ML预测结直肠手术后并发症的系统综述/荟萃分析的评论,无原始数据。主题为ML预测术后并发症,核心相关。

> **要点**：评述ML预测结直肠术后并发症的荟萃分析,主题属外科+AI。


### 51. 更具选择性的风险分层机器学习肺癌血栓预防方案:VATS肺段切除术后前瞻队列

*A more selective risk-stratified, machine learning based, lung cancer thromboprophylaxis protocol following vats segmentectomy: a prospective cohort study.*

**International Journal of Surgery** · 2025-12-08 · 前瞻性队列(机器学习预测模型) · [PMID 41351270](https://pubmed.ncbi.nlm.nih.gov/41351270/) · [DOI](https://doi.org/10.1097/JS9.0000000000004151)

前瞻性开发并验证ML模型预测VATS肺段切除术后静脉血栓栓塞(VTE)。训练557例、验证239例,49个变量(含新标志物vWF-A2),比较11种算法;XGBoost最优(训练AUC 0.903、验证0.856),经SHAP降至11变量,优于Caprini评分;术后VTE者无病生存显著更短(P=0.017)。

> **要点**：可解释XGBoost模型准确预测VATS肺段切除术后VTE并关联不良预后。


### 52. 多模态深度学习预测非心脏手术后主要不良心脑血管事件(MACCE)——通讯

*Multimodal deep learning to predict postoperative major adverse cardiac and cerebrovascular events after non-cardiac surgery - correspondence.*

**International Journal of Surgery** · 2025-12-05 · 通讯/来信(无原始数据) · [PMID 41677095](https://pubmed.ncbi.nlm.nih.gov/41677095/) · [DOI](https://doi.org/10.1097/JS9.0000000000004261)

针对一项多模态深度学习预测非心脏手术后MACCE研究的通讯/来信，无独立数据。属外科术后结局预测(深度学习)领域的学术讨论。

> **要点**：关于多模态DL预测术后MACCE的学术通讯。


### 53. 关于「预测踝关节骨折手术后手术部位感染风险的机器学习模型构建验证」的评论

*Comments on the manuscript entitled construct validation of machine learning models for predicting surgical site infection risk following ankle fracture surgery.*

**International Journal of Surgery** · 2025-12-05 · 评论/来信(无数据) · [PMID 41347940](https://pubmed.ncbi.nlm.nih.gov/41347940/) · [DOI](https://doi.org/10.1097/JS9.0000000000004194)

针对一篇构建并验证ML模型预测踝关节骨折术后手术部位感染(SSI)风险论文的评论,无原始数据。主题为ML预测术后并发症(SSI),核心相关。

> **要点**：评述ML预测踝骨折术后SSI,主题属外科+AI。


### 54. 机器学习预测血液透析动静脉通路1年成功临床使用

*Predicting 1-year successful clinical use of an arteriovenous access for hemodialysis using machine learning.*

**npj Digital Medicine** · 2025-12-04 · 多中心回顾性机器学习预测建模 · [PMID 41345783](https://pubmed.ncbi.nlm.nih.gov/41345783/) · [DOI](https://doi.org/10.1038/s41746-025-02187-9)

用术前数据构建机器学习预测动静脉（AV）通路1年成功临床使用。基于血管质量倡议（VQI）2011-2024年手术造瘘/移植物病例、111项术前特征，6个模型10折交叉验证。59,674例造通路者中28,304例（47.4%）1年成功使用；最佳模型XGBoost AUROC 0.90，显著优于logistic回归（0.70）。可辅助血管通路手术决策。

> **要点**：XGBoost术前预测AV通路1年成功使用AUROC 0.90，远优于logistic(0.70)。


### 55. 开发并验证预测食管癌术后静脉血栓栓塞的可解释机器学习模型

*Development and validation of an explainable machine learning model for predicting postoperative venous thromboembolism in esophageal cancer.*

**International Journal of Surgery** · 2025-12-04 · 预测模型开发与验证(无摘要) · [PMID 41347287](https://pubmed.ncbi.nlm.nih.gov/41347287/) · [DOI](https://doi.org/10.1097/JS9.0000000000004166)

(无摘要)题示开发并验证可解释ML模型预测食管癌术后静脉血栓栓塞(VTE);主题为ML预测术后并发症,核心相关,具体样本量与AUC等指标因无摘要未提供。

> **要点**：可解释ML模型预测食管癌术后VTE,主题属外科+AI。


### 56. 整合肿瘤与身体成分CT的Transformer预后特征预测胃癌术后复发

*A transformer-based prognostic signature integrating tumor and body composition CT images predicts postoperative recurrence in gastric cancer.*

**npj Digital Medicine** · 2025-12-03 · 回顾性深度学习预后建模（1862例，内外部验证） · [PMID 41339473](https://pubmed.ncbi.nlm.nih.gov/41339473/) · [DOI](https://doi.org/10.1038/s41746-025-02183-z)

整合骨骼肌、脂肪组织与原发肿瘤CT，用Vision Transformer构建SM-AT-Tumor-Clinical（SMAT-TC）评分预测胃癌无复发生存（RFS），共1862例。SMAT-TC在训练/内部/外部队列C指数0.966（95%CI 0.937-0.990）、0.890、0.855，优于临床/SM/AT/Tumor/TC/SM-TC等模型；为独立复发危险因素，可将患者分为高/中/低危，3年RFS 99.6% vs 67.0% vs 10.9%、5年98.8% vs 61.7% vs 2.4%。

> **要点**：ViT整合身体成分与肿瘤CT预测胃癌术后复发，C指数最高0.966。


### 57. MRI影像组学联合临床特征预测腰椎间盘突出症术后功能结局的多中心回顾性研究

*MRI radiomics and clinical feature model for predicting postoperative functional outcome of lumbar disc herniation: a multicenter retrospective study*

**International Journal of Surgery** · 2025-12-02 · 多中心回顾性预测建模 · [DOI](https://doi.org/10.1097/js9.0000000000004135)

多中心回顾性研究，纳入455例腰椎间盘突出症(LDH)手术患者，以术后6个月PROMIS PF评分是否达到最小临床重要差异(MCID)为结局。基于SVM构建临床模型(CM)、影像组学模型(RM)与联合模型(CRM)，筛选10个核心影像组学特征；术前及术后3个月PROMIS PF、症状持续时间、腰大肌横截面积、FCSA/VBA比值、多裂肌脂肪浸润率为独立危险因素。联合模型CRM在各数据集预测性能最佳且跨中心泛化性强。

> **要点**：术前MRI影像组学加临床指标联合模型可预测LDH术后功能改善不达标风险


### 58. 胰十二指肠切除术后胰瘘：影像组学能否改进临床风险评分？

*Postoperative Pancreatic Fistula After Pancreatoduodenectomy: Can Radiomics Improve Clinical Risk Scores?*

**Annals of Surgery** · 2025-11-28 · 回顾性+前瞻验证，影像组学+随机森林 · [PMID 41310921](https://pubmed.ncbi.nlm.nih.gov/41310921/) · [DOI](https://doi.org/10.1097/SLA.0000000000006991)

单中心回顾性纳入2009-2021年术前有CT的胰十二指肠切除(PD)患者，从剩余胰腺分割提取影像组学特征，用random forest构建5个预测B/C级临床相关胰瘘(CR-POPF)模型(训练339/测试145/前瞻验证60)。测试集PreClin/IntraClin/Rad AUC 0.74/0.78/0.75，联合模型PreClin-Rad 0.82、IntraClin-Rad 0.84；前瞻验证PreClin-Rad 0.78最佳。

> **要点**：影像组学与临床数据联合模型提升术后胰瘘预测，PreClin-Rad仅凭术前数据表现最佳。


### 59. 机器学习动态预测结直肠癌术后静脉血栓栓塞（中国多中心）

*Machine learning to predict venous thromboembolism After Colorectal Cancer Surgery: a Chinese dynamic modelling study.*

**International Journal of Surgery** · 2025-11-19 · 多中心回顾性队列/机器学习预测建模（含外部验证） · [PMID 41314804](https://pubmed.ncbi.nlm.nih.gov/41314804/) · [DOI](https://doi.org/10.1097/JS9.0000000000004036)

基于中国46家中心CRC-VTE研究1836例结直肠癌手术患者（建模集1515例、外部测试集321例），用递归特征消除与Boruta筛特征，开发并评估162个ML模型预测术后VTE。CatBoost表现最佳，验证集术前/术后AUROC分别为0.950/0.971，外部测试集为0.686±0.037/0.715±0.036；SHAP精简模型（7术前/9术后特征）验证集AUROC 0.933/0.949，含术后数据模型持续优于仅术前模型。

> **要点**：CatBoost+SHAP可为结直肠癌术后VTE提供个体化风险预测工具。


### 60. 前额叶-终纹床核生理与神经心理生物标志物预测抑郁症治疗结局

*Prefrontal-bed nucleus of the stria terminalis physiological and neuropsychological biomarkers predict therapeutic outcomes in depression.*

**Nature Communications** · 2025-11-18 · 随机对照试验(DBS)+机器学习 · [PMID 41253805](https://pubmed.ncbi.nlm.nih.gov/41253805/) · [DOI](https://doi.org/10.1038/s41467-025-65179-z)

对26例难治性抑郁开展终纹床核(BNST)-伏隔核(NAc)深部脑刺激(DBS)随机对照试验(NCT04530942),开放期应答率50%、缓解率35%。结合急/慢性颅内电生理记录、影像与机器学习:较低BNST theta及前额叶-BNST耦合(自上而下连接)可预测慢性刺激后3/6/12个月更佳疗效与生活质量,并在睁/闭眼状态与ML中得到确认。

> **要点**：ML结合颅内电生理预测DBS手术治疗难治性抑郁的结局(核心-手术结局预测)


### 61. 基于术中脑电深度学习预测成人术后谵妄

*Development of a deep learning-based prediction model for postoperative delirium using intraoperative electroencephalogram in adults.*

**npj Digital Medicine** · 2025-11-17 · 单中心回顾性深度学习开发(交叉验证) · [PMID 41249487](https://pubmed.ncbi.nlm.nih.gov/41249487/) · [DOI](https://doi.org/10.1038/s41746-025-02033-y)

纳入2022-2024年34,550例行6导联术中脑电监测的手术病例(267例谵妄事件)开发DELPHI-EEG模型。5折交叉验证AUROC 0.870、AUPRC 0.038，显著优于基于爆发抑制比的logistic回归(AUROC 0.729，p=0.004；AUPRC 0.013，p=0.002)。属术后并发症(谵妄)预测，尚需外部验证。

> **要点**：术中脑电深度学习预测术后谵妄以指导预防。


### 62. 深度学习定量出血CT参数vs传统半定量评分预测aSAH延迟性脑缺血

*A comparative analysis of deep learning-based quantitative hemorrhagic CT parameters versus traditional semi-quantitative CT scores for predicting delayed cerebral ischemia in aneurysmal subarachnoid hemorrhage: a multicenter cohort study.*

**International Journal of Surgery** · 2025-11-14 · 多中心回顾+前瞻队列（含外部验证） · [PMID 41247872](https://pubmed.ncbi.nlm.nih.gov/41247872/) · [DOI](https://doi.org/10.1097/JS9.0000000000004024)

多中心队列研究（回顾+前瞻+外部验证），用3D-UNet深度学习定量动脉瘤性蛛网膜下腔出血的出血体积等参数预测延迟性脑缺血（DCI）。DL参数预测准确性显著优于传统评分，各队列AUC 0.735-0.816 vs 0.635-0.698（DeLong校正p<0.05），决策曲线临床获益更优。

> **要点**：3D-UNet定量出血参数优于传统评分预测DCI，核心OUTCOME。


### 63. LASSO动态预测系统预测OLIF术后融合器沉降

*Development of a LASSO dynamic prediction system for interbody cage subsidence following OLIF surgery.*

**npj Digital Medicine** · 2025-11-13 · 回顾性预测建模(LASSO加logistic) · [PMID 41233509](https://pubmed.ncbi.nlm.nih.gov/41233509/) · [DOI](https://doi.org/10.1038/s41746-025-02019-w)

基于337个OLIF手术节段(674个终板，2017-2024)构建LASSO预测系统，沉降率45.70%。LASSO筛选出椎间盘高度矫正、术中终板损伤、下终板形态、下椎体/终板体积骨密度为关键预测因子，纳入多因素logistic回归并可视化为数字列线图，训练与验证队列ROC、PR、校准曲线均表现优异，DCA证实临床效用。属脊柱术后并发症预测建模。

> **要点**：LASSO列线图个体化预测OLIF融合器沉降。


### 64. 就「预测踝关节骨折术后手术部位感染风险的机器学习模型」的构建效度通讯

*Construct validation of machine learning models for predicting surgical site infection risk following ankle fracture surgery - correspondence.*

**International Journal of Surgery** · 2025-11-12 · 通讯/评论（无摘要） · [PMID 41222914](https://pubmed.ncbi.nlm.nih.gov/41222914/) · [DOI](https://doi.org/10.1097/JS9.0000000000003961)

通讯/评论类（无摘要），针对预测踝关节骨折手术后手术部位感染（SSI）风险的机器学习模型进行构建效度探讨。主题为外科并发症的ML预测模型，属手术+AI核心议题。

> **要点**：ML预测踝骨折术后SSI的效度讨论，核心OUTCOME。


### 65. 就「预测食管癌术后静脉血栓栓塞的可解释机器学习模型」的致编辑信

*Letter to the editor: Development and validation of an explainable machine learning model for predicting postoperative venous thromboembolism in esophageal cancer.*

**International Journal of Surgery** · 2025-11-12 · 致编辑信（无摘要） · [PMID 41222905](https://pubmed.ncbi.nlm.nih.gov/41222905/) · [DOI](https://doi.org/10.1097/JS9.0000000000003994)

致编辑信（无摘要），针对开发并验证预测食管癌术后静脉血栓栓塞（VTE）的可解释机器学习模型的研究。主题为外科术后并发症的可解释ML预测，属手术+AI核心议题。

> **要点**：可解释ML预测食管癌术后VTE，核心OUTCOME。


### 66. 借助人工智能与个性化康复改善老年髋部骨折关节置换后长期结局

*Leveraging artificial intelligence and personalized rehabilitation to improve long-term outcomes in geriatric hip fracture patients after arthroplasty.*

**International Journal of Surgery** · 2025-11-12 · 观点/评论（无摘要） · [PMID 41222904](https://pubmed.ncbi.nlm.nih.gov/41222904/) · [DOI](https://doi.org/10.1097/JS9.0000000000003966)

观点/评论类（无摘要），主张利用人工智能与个性化康复方案改善老年髋部骨折患者关节置换术后的长期结局。属外科（关节置换）与AI结合改善术后结局的议题。

> **要点**：AI+个性化康复改善关节置换术后结局，核心OUTCOME。


### 67. 关于“数据插补与域适应预测老年髋部骨折关节置换术后1年死亡率（多中心）”的读者来信

*Letter to the Editor: Data imputation and domain adaptative prediction of one-year postoperative mortality in geriatric hip fracture patients following arthroplasty from multi-center study.*

**International Journal of Surgery** · 2025-11-12 · 读者来信（无原始数据） · [PMID 41222917](https://pubmed.ncbi.nlm.nih.gov/41222917/) · [DOI](https://doi.org/10.1097/JS9.0000000000003995)

读者来信（Letter），无独立原始数据，针对一项利用数据插补（data imputation）与域适应（domain adaptation）机器学习方法、预测老年髋部骨折关节置换术后1年死亡率的多中心研究进行讨论。所评论研究属外科术后死亡率的机器学习预测。

> **要点**：就老年髋部骨折术后死亡率ML预测模型的方法学来信讨论。


### 68. 就「集成学习预测重度腰椎间盘突出PLIF术中失血风险」的评论

*Comment on "predicting intraoperative blood loss risk in severe lumbar disc herniation patients undergoing PLIF: a multicenter cohort study using ensemble learning" by Ning Shen et al.*

**International Journal of Surgery** · 2025-11-11 · 评论/通讯（无摘要） · [PMID 41217402](https://pubmed.ncbi.nlm.nih.gov/41217402/) · [DOI](https://doi.org/10.1097/JS9.0000000000004029)

评论类（无摘要），针对一项使用集成学习（ensemble learning）在多中心队列预测重度腰椎间盘突出患者PLIF手术术中失血风险的研究。主题为外科围手术期风险的集成ML预测，属手术+AI核心议题。

> **要点**：集成学习预测PLIF术中失血风险，核心OUTCOME。


### 69. 整合MRI与临床数据预测脊柱转移瘤手术大量术中出血的术前预测工具：多中心研究

*Development of a preoperative prediction tool for massive intraoperative blood loss in spinal metastases surgery integrating MRI and clinical data: a multicenter study.*

**International Journal of Surgery** · 2025-11-04 · 多中心回顾诊断建模(MRI影像组学＋多算法ML) · [PMID 41186592](https://pubmed.ncbi.nlm.nih.gov/41186592/) · [DOI](https://doi.org/10.1097/JS9.0000000000003800)

回顾纳入601例(后共702例)脊柱转移瘤手术患者，开发队列479例、内部测试122例、外部测试101例；基于T1c MRI影像组学与临床变量在9种ML算法中择优建模，以术中出血≥2500mL为大量出血终点。融合模型内部/外部验证AUC分别为0.901、0.885，显著优于纯临床模型(0.735、0.604)；亚组中非富血管肿瘤敏感度由0.30升至0.85、富血管肿瘤特异度由0.55升至0.81(均P<0.001)，并提升脊柱外科医生的预测表现。

> **要点**：MRI影像组学＋临床ML模型无偏预测脊柱转移瘤手术大量出血(AUC 0.90)，指导术前规划。


### 70. 评'多模态深度学习预测非心脏手术后主要心脑血管不良事件(MACCE)'(评论)

*Commentary on "Multimodal deep learning to predict postoperative major adverse cardiac and cerebrovascular events after non-cardiac surgery".*

**International Journal of Surgery** · 2025-11-04 · 评论/社论(无数据) · [PMID 41186523](https://pubmed.ncbi.nlm.nih.gov/41186523/) · [DOI](https://doi.org/10.1097/JS9.0000000000003813)

针对'多模态深度学习预测非心脏手术后主要心脑血管不良事件(MACCE)'一文的评论(无原始数据)，讨论多模态DL用于术后心脑血管并发症预测的价值与临床转化考量。属外科AI术后结局预测主题。

> **要点**：评论多模态DL预测非心脏手术后MACCE的意义与局限。


### 71. 评'集成学习预测重度腰椎间盘突出行PLIF患者术中出血风险：多中心队列研究'(致编辑信)

*Letter to the Editor "Predicting intraoperative blood loss risk in severe lumbar disc herniation patients undergoing PLIF: a multicenter cohort study using ensemble learning".*

**International Journal of Surgery** · 2025-11-04 · 评论/致编辑信(无数据) · [PMID 41186512](https://pubmed.ncbi.nlm.nih.gov/41186512/) · [DOI](https://doi.org/10.1097/JS9.0000000000003829)

致编辑信(无摘要数据)，评论一项采用集成学习(ensemble learning)预测重度腰椎间盘突出行后路腰椎椎间融合术(PLIF)术中出血风险的多中心队列研究。涉及外科手术＋机器学习的术中出血风险预测。

> **要点**：评论集成学习预测PLIF术中出血风险的方法与价值。


### 72. 视觉-语言基础模型驱动的手术切口高效识别与居家管理

*Vision-language foundation model-driven efficient recognition and home-based management of surgical incisions.*

**International Journal of Surgery** · 2025-11-02 · 多中心回顾诊断验证(视觉-语言基础模型) · [PMID 41186521](https://pubmed.ncbi.nlm.nih.gov/41186521/) · [DOI](https://doi.org/10.1097/JS9.0000000000003727)

回顾纳入中心1的865例患者1008张手术切口图像为主队列，另设中心1时间验证集(199例/252张)与中心2外部验证集(130例/183张)，基于GLIP视觉-语言基础模型构建DeepIncision系统识别7类切口状态。时间验证与外部验证平均精度(AP)分别为68.50%、57.85%，显著优于5种传统目标检测方法及非专业人员(P<0.01)；相较非医护(AP 3.80%/AR 15.30%)与非伤口专科医护(AP 41.00%/AR 52.50%)，DeepIncision达AP 68.50%、AR 96.91%。

> **要点**：VLFM可自动准确识别手术切口并发症(AP 68.5%/AR 96.9%)，支持术后居家伤口管理。


### 73. 跨越数据壁垒：迁移学习预测普通外科术后90天死亡率——多中心开发与比较研究

*Overcoming the data barrier: transfer learning for 90-day mortality prediction in general surgery - a retrospective multicenter development and comparison study.*

**International Journal of Surgery** · 2025-10-30 · 多中心回顾模型开发与比较研究(迁移学习/神经网络) · [PMID 41186562](https://pubmed.ncbi.nlm.nih.gov/41186562/) · [DOI](https://doi.org/10.1097/JS9.0000000000003595)

多中心纳入3家三级中心2015-2023年14922例(平均58.5岁)普通外科患者，基于85个术前参数训练大规模源模型预测90天死亡率，并对食管、肝、胰、结直肠手术分别微调。常规ML的AUROC为0.73-0.92；迁移学习(TL)显著提升AUPRC：食管+38%(0.54,P<0.001)、肝+14%(0.34)、胰+8%(0.31)。年龄与Charlson合并症指数(CCI)为最高权重特征，所有神经网络均优于ASA分级与CCI等传统评分。

> **要点**：迁移学习在数据受限的外科亚专业显著提升术后死亡预测，优于传统风险评分。


### 74. 机器学习驱动的同时性寡转移NSCLC根治性局部巩固治疗临床决策支持：基于SEER 17注册库(2018-2021)的人群研究

*Machine learning-driven clinical decision support for radical local consolidative therapy in synchronous oligometastatic NSCLC: A SEER population-based analysis of 17 cancer registries (2018-2021).*

**International Journal of Surgery** · 2025-10-28 · 基于SEER的人群回顾队列＋机器学习(RSF) · [PMID 41187318](https://pubmed.ncbi.nlm.nih.gov/41187318/) · [DOI](https://doi.org/10.1097/JS9.0000000000003599)

基于SEER 17注册库纳入5377例同时性寡转移NSCLC，其中221例接受根治性局部巩固治疗(LCT，含原发灶手术切除±转移灶切除和/或放疗)。加权随机生存森林(RSF)训练C-index 0.752优于Cox 0.735；根治性LCT组中位OS 27个月 vs 无LCT组7个月(P<0.001)，联合化疗达30个月。多因素显示化疗(HR=0.41,95%CI 0.36-0.46)与根治性LCT(HR=0.59,95%CI 0.38-0.91,P=0.018)为独立保护因素，SHAP提示二者贡献最大。

> **要点**：ML风险分层提示根治性LCT(含手术)联合化疗改善寡转移NSCLC生存。


### 75. 关于“隐私保护联邦学习预测结直肠手术90天死亡率（多中心）”的读者来信

*Letter to the editor: Privacy preserving federated learning for 90-day mortality prediction in colorectal surgery: a multicenter retrospective development and comparison study.*

**International Journal of Surgery** · 2025-10-23 · 读者来信（无原始数据） · [PMID 41133392](https://pubmed.ncbi.nlm.nih.gov/41133392/) · [DOI](https://doi.org/10.1097/JS9.0000000000003782)

读者来信（Letter），无原始数据，针对一项采用隐私保护联邦学习（federated learning）开发并比较、预测结直肠手术90天死亡率的多中心回顾研究进行讨论。所评论研究属外科术后死亡率的联邦学习/机器学习预测。

> **要点**：就结直肠手术90天死亡率联邦学习模型的来信讨论。


### 76. 机器学习与规则模型半自动监测手术部位感染

*Semi-automated surveillance of surgical site infections using machine learning and rule-based classification models.*

**npj Digital Medicine** · 2025-10-17 · 前瞻队列回顾性建模 · [PMID 41107441](https://pubmed.ncbi.nlm.nih.gov/41107441/) · [DOI](https://doi.org/10.1038/s41746-025-01989-1)

基于3931例手术患者前瞻队列开发ML与规则模型半自动检测深部及器官/腔隙手术部位感染(SSI)。最佳ML模型(朴素贝叶斯、稠密神经网络)敏感度达0.90、AUROC达0.968、AUPRC达0.248，工作量削减超90%；规则模型敏感度更高(0.954)但其余指标较低。属术后并发症(SSI)监测。

> **要点**：ML半自动SSI监测，减负90%以上。


### 77. PreOpNet预测非心脏大手术30天死亡的外部验证

*External validation of PreOpNet to predict 30-day mortality after major non-cardiac surgery using digital electrocardiogram.*

**npj Digital Medicine** · 2025-10-16 · 前瞻多中心外部验证研究 · [PMID 41102258](https://pubmed.ncbi.nlm.nih.gov/41102258/) · [DOI](https://doi.org/10.1038/s41746-025-01983-7)

在欧洲前瞻研究(2014-2019)6098例高危非心脏大手术患者中外部验证基于12导联数字心电的深度学习模型PreOpNet。死亡AUC 0.707、MACE 0.675，优于RCRI(死亡AUC 0.644)但不及高敏肌钙蛋白T(AUC 0.762/0.743)，且高估风险；与RCRI/hs-cTnT联合可提供增量预后价值。属术前风险评估。

> **要点**：心电深度学习单用价值有限，联合传统指标可增益。


### 78. 预测伴微血管侵犯肝细胞癌根治性肝切除术后复发的新列线图

*Development of a new nomogram for predicting recurrence in HCC with MVI following curative hepatectomy.*

**International Journal of Surgery** · 2025-10-14 · 回顾性队列＋机器学习(RSF)＋Cox列线图 · [PMID 41092419](https://pubmed.ncbi.nlm.nih.gov/41092419/) · [DOI](https://doi.org/10.1097/JS9.0000000000003626)

回顾纳入两家医院2015-2020年经病理证实伴微血管侵犯(MVI)的肝细胞癌根治切除患者，用随机生存森林(RSF)结合Cox回归识别独立预后因素并构建列线图。纳入肿瘤大小、卫星结节、MVI分级、肿瘤数目、腹水、凝血酶原时间、γ-GT共7个预测因子，训练/验证C-index分别为0.700、0.675，1/2/3年AUC一致较高，校准与决策曲线良好。

> **要点**：RSF辅助构建的7因子列线图分层HCC(MVI)术后复发风险(C-index 0.70)。


### 79. 推进胃切除术后死亡预测：基于NSQIP数据的机器学习方法

*Advancing postoperative mortality prediction in gastrectomy: a machine learning approach using NSQIP data.*

**International Journal of Surgery** · 2025-10-14 · 回顾性机器学习建模(NSQIP) · [PMID 41091961](https://pubmed.ncbi.nlm.nih.gov/41091961/) · [DOI](https://doi.org/10.1097/JS9.0000000000003688)

基于NSQIP 2017-2022的7954例胃切除患者(30天死亡率约4.3%)，开发随机森林、梯度提升树、XGBoost并与logistic回归比较，分别用全变量(模型C)或ACS-NSQIP风险计算器17变量(模型L)训练。两种设定下XGBoost表现最佳、随机森林次之，模型C优于模型L且所有ML优于logistic回归；SHAP显示术前血尿素氮为最重要预测因子，其次为年龄。

> **要点**：XGBoost预测胃切除术后30天死亡最佳，术前BUN与年龄为关键因子。


### 80. 人工智能预测口腔潜在恶性病变手术切除后复发与恶性进展

*Artificial intelligence for predicting post-excision recurrence and malignant progression in oral potentially malignant disorders: a retrospective cohort study.*

**International Journal of Surgery** · 2025-10-07 · 双中心回顾性队列/多任务预测模型开发与外部验证 · [PMID 41056008](https://pubmed.ncbi.nlm.nih.gov/41056008/) · [DOI](https://doi.org/10.1097/JS9.0000000000003592)

双中心回顾性队列(366例OPMD手术患者),用多维数据训练多任务AI模型预测治疗失败、恶性进展与病变复发;最优模型TabPFN在外部测试AUC分别为0.829、0.912、0.791,Brier分数0.085–0.147,净获益优于WHO及二元异型增生分级,并实现可解释性。

> **要点**：多任务TabPFN模型可对OPMD术后风险全面分层,辅助口腔癌早诊决策。


### 81. 预测踝关节骨折术后手术部位感染风险的机器学习模型构建与验证

*Prognostic impact and predictive model for early non-curative recurrence after liver resection for hepatocellular carcinoma: a retrospective cohort study.*

**International Journal of Surgery** · 2025-10-06 · 回顾性机器学习建模与验证研究 · [PMID 41071942](https://pubmed.ncbi.nlm.nih.gov/41071942/) · [DOI](https://doi.org/10.1097/JS9.0000000000003534)

回顾单中心2023-2024年踝关节骨折切开复位内固定患者，比较逻辑回归、SVM、GBM、神经网络、XGBoost、KNN、AdaBoost、CatBoost共8种ML预测手术部位感染(SSI)。GBM各指标最佳:AUC 0.919、准确率0.82、敏感度0.93、特异度0.81、精确率0.35、F1 0.51、Youden 0.74，优于传统logistic；术前白蛋白、创伤类型、糖尿病/高血压史、手术时长为主要影响因素。

> **要点**：GBM高精度预测踝骨折术后SSI(AUC 0.919)，优于传统logistic回归。


### 82. 多中心验证可解释多任务模型预测多种术后结局

*Multicenter validation of a scalable, interpretable, multitask prediction model for multiple clinical outcomes.*

**npj Digital Medicine** · 2025-09-30 · 多中心开发与外部验证 · [PMID 41028168](https://pubmed.ncbi.nlm.nih.gov/41028168/) · [DOI](https://doi.org/10.1038/s41746-025-01949-9)

开发并外部验证基于树的可解释多任务学习模型，用16个术前EHR特征同时预测急性肾损伤(AKI)、术后呼吸衰竭(PRF)与院内死亡。衍生及两外部队列AKI AUROC 0.805/0.789/0.863、PRF 0.886/0.925/0.911、死亡0.907/0.913/0.849(多数p<0.001)。属术前多结局风险评估。

> **要点**：多任务学习一体化术前多并发症风险评估。


### 83. 用于实时检测心脏手术相关急性肾损伤的因果深度学习:七个时序队列的推导与验证

*Causal deep learning for real-time detection of cardiac surgery-associated acute kidney injury: derivation and validation in seven time-series cohorts.*

**The Lancet Digital Health** · 2025-09-24 · 回顾性开发+前瞻验证研究(七队列) · [PMID 40998651](https://pubmed.ncbi.nlm.nih.gov/40998651/) · [DOI](https://doi.org/10.1016/j.landig.2025.100901)

回顾性开发+前瞻验证研究,纳入7队列接受心脏开胸手术的成人,建立因果深度学习架构REACT动态预测未来48小时内心脏手术相关AKI(CSA-AKI)。推导队列14,513例(21.0%发生CSA-AKI),REACT将1328个输入变量精简为6个因果因子,内部验证平均AUROC 0.930(SD 0.032),外部(中国20,813例+美国MIMIC-IV/eICU 28,023例)0.920、跨区域0.867,前瞻验证0.896,并较指南路径平均提前16.35小时发现CSA-AKI,优于Transformer/LSTM等模型。

> **要点**：因果深度学习仅用6个变量即可实时预测心脏术后AKI(AUROC 0.93),较指南平均提前16.35小时。


### 84. 可解释机器学习模型识别TACE术后高危肝癌早期复发

*Identification and validation of an explainable machine learning model for hepatocellular carcinoma at high risk: a retrospective multicenter cohort study.*

**International Journal of Surgery** · 2025-09-23 · 多中心回顾性队列/验证研究 · [PMID 40990650](https://pubmed.ncbi.nlm.nih.gov/40990650/) · [DOI](https://doi.org/10.1097/JS9.0000000000003480)

多中心回顾性队列(2068例不可切除HCC经TACE介入),纳入39项术前+5项治疗变量建5种ML模型预测24个月内早期复发;XGBoost(前7变量)内部测试AUC 0.888、外部0.854,时间依赖AUC优于BCLC/CNLC/AJCC/JSH/HKLC各分期(DeLong,均P<0.001),并可显著分层OS与RFS。

> **要点**：XGBoost模型优于各临床分期,可指导TACE个体化管理。


### 85. 结直肠癌手术患者决策支持AI预测模型的临床落地

*Clinical implementation of an AI-based prediction model for decision support for patients undergoing colorectal cancer surgery.*

**Nature Medicine** · 2025-09-18 · 模型开发验证+前后对照实施研究 · [PMID 40968272](https://pubmed.ncbi.nlm.nih.gov/40968272/) · [DOI](https://doi.org/10.1038/s41591-025-03942-x)

利用丹麦全国登记18,403例结直肠癌真实数据开发、验证并在临床实施AI风险预测模型，按预测的1年死亡风险设计个体化围手术期路径，验证集AUC 0.79。非随机前后对照队列显示：综合并发症指数>20者19.1%（个体化组）vs 28.0%（标准组），校正OR 0.63（95%CI 0.42–0.92，P=0.02）；任一内科并发症23.7% vs 37.3%，OR 0.53（P<0.001），并具成本效益。

> **要点**：AI围手术期风险分层降低结直肠癌术后并发症（OR 0.53–0.63）。


### 86. 术前脑脊液sTREM2浓度与膝/髋关节置换术后谵妄及3年死亡的关联

*Association of preoperative cerebrospinal fluid sTREM2 concentration with postoperative delirium and 3-year mortality in patients total knee or hip arthroplasty: a prospective cohort study.*

**International Journal of Surgery** · 2025-09-10 · 前瞻性队列+机器学习预测模型 · [PMID 40928387](https://pubmed.ncbi.nlm.nih.gov/40928387/) · [DOI](https://doi.org/10.1097/JS9.0000000000003465)

前瞻性队列(545例膝/髋关节置换,POD 122例、NPOD 423例)。术前CSF sTREM2升高为POD危险因素,经tau、ptau部分中介(17.91%、22.09%);LR/SVM/KNN/AdaBoost/CatBoost五模型中CatBoost预测POD最佳(ROC AUC 0.999、PRC AUC 0.998);年龄≥80且sTREM2≥20000pg/ml亚组3年死亡显著升高(log-rank P=0.017)。

> **要点**：CSF sTREM2联合CatBoost可精准预测术后谵妄并提示远期死亡风险。


### 87. 数据插补与域自适应预测老年髋部骨折关节置换术后1年死亡(多中心)

*Data imputation and domain-adaptive prediction of 1-year postoperative mortality in geriatric hip fracture patients following arthroplasty from multi-center study.*

**International Journal of Surgery** · 2025-09-02 · 多中心回顾性预测模型开发/域自适应 · [PMID 40990498](https://pubmed.ncbi.nlm.nih.gov/40990498/) · [DOI](https://doi.org/10.1097/JS9.0000000000003427)

多中心回顾性(3中心744例,22项特征)。用ML方法插补缺失值(Random Forest Imputer最优,RMSE/MAD约0.14/0.10);XGBoost内部验证AUC 0.80–0.83;外部测试时域自适应Nearest Neighbor Importance Weighting表现最佳(AUC 0.69–0.83)。

> **要点**：域自适应ML提升跨中心术后死亡预测的泛化性能。


### 88. 细菌胞外囊泡作为脊柱手术后谵妄状态的预测性生物标志物

*Bacterial extracellular vesicle as a predictive biomarker for postoperative delirium status after spinal surgery: a prospective cohort study.*

**International Journal of Surgery** · 2025-08-27 · 前瞻性队列+随机森林预测模型 · [PMID 40865967](https://pubmed.ncbi.nlm.nih.gov/40865967/) · [DOI](https://doi.org/10.1097/JS9.0000000000003024)

前瞻性队列(128例脊柱手术)。基线特征无差异,但谵妄组循环细菌胞外囊泡(BEV)多样性更低、以Gammaproteobacteria为主;以显著BEV构建随机森林分类器错误率最低(21.59%),独立数据集验证准确率80%;Moraxellaceae、Acinetobacter来源EV预测概率最高。

> **要点**：术前循环BEV谱结合随机森林可区分脊柱术后谵妄。


### 89. 多模态深度学习预测非心脏手术后主要不良心脑血管事件(MACCE)

*Multimodal deep learning to predict postoperative major adverse cardiac and cerebrovascular events after noncardiac surgery.*

**International Journal of Surgery** · 2025-08-27 · 单中心回顾性多模态深度学习模型开发与验证 · [PMID 40865965](https://pubmed.ncbi.nlm.nih.gov/40865965/) · [DOI](https://doi.org/10.1097/JS9.0000000000003143)

单中心回顾队列(165577例,30天MACCE发生率0.6%)。Transformer处理原始12导联心电图+梯度提升机(GBM)融合人口学与ICD-10术式码;多模态GBM预测30天MACCE的AUROC 0.902,显著优于基线GBM(0.842)、修订心脏风险指数RCRI(0.812)与ASA分级(0.759)。

> **要点**：原始ECG+少量临床数据的多模态DL显著改善非心脏手术围术期心脑血管风险分层。


### 90. 表格基础模型预测手术出院后阿片类药物用量(多国)

*Predicting opioid consumption after surgical discharge: a multinational derivation and validation study using a foundation model.*

**npj Digital Medicine** · 2025-08-26 · 多国回顾性队列建模(基础模型) · [PMID 40858986](https://pubmed.ncbi.nlm.nih.gov/40858986/) · [DOI](https://doi.org/10.1038/s41746-025-01798-6)

应用表格基础模型预测术后出院后阿片使用风险，在4267例(全科/骨科/妇科/泌尿手术)按80:20训练/验证，并在826例普外队列外部验证。内部测试AUROC 0.84、外部0.77(Brier 0.13与0.19)；预测风险低于50%者术后首周中位用量为0。应用该模型可全球减少4.5%阿片处方且不增加重度疼痛时间。属术后结局预测。

> **要点**：基础模型预测术后阿片用量以减少过度处方。


### 91. 输尿管上尿路尿路上皮癌节段性输尿管切除术对比根治性肾输尿管切除术的疗效与预后：多中心队列研究

*Comparative outcomes and prognosis in patients with ureteral upper tract urothelial carcinoma undergoing segmental ureterectomy versus radical nephroureterectomy: a multicenter cohort study.*

**International Journal of Surgery** · 2025-08-26 · 多中心回顾性队列 + 机器学习预后建模 + meta分析 · [PMID 40865937](https://pubmed.ncbi.nlm.nih.gov/40865937/) · [DOI](https://doi.org/10.1097/JS9.0000000000003292)

多中心回顾性队列纳入546例输尿管尿路上皮癌(282例SU、264例RNU)。SU是膀胱内复发(IV-RFS)的独立预测因子(HR=1.48, P=0.02)，总生存与RNU无差异；8种机器学习算法(含RSF、CoxBoost、XGBoost等)预测IV-RFS 3年AUC 0.771、OS 3年AUC 0.739。合并21项研究31293例的meta分析示SU的IV-RFS更低(HR=1.21, P=0.019)、术后eGFR更高(WMD 14.16 mL/min, P<0.001)。

> **要点**：SU肾功能保护更优、总生存与RNU相当，但膀胱内复发风险更高。


### 92. 隐私保护的联邦学习预测结直肠手术后90天死亡率(多中心)

*Privacy preserving federated learning for 90-day mortality prediction in colorectal surgery: a multicenter retrospective development and comparison study.*

**International Journal of Surgery** · 2025-08-26 · 多中心回顾性联邦学习开发与比较研究 · [PMID 40865959](https://pubmed.ncbi.nlm.nih.gov/40865959/) · [DOI](https://doi.org/10.1097/JS9.0000000000003084)

多中心回顾(3中心2959例,90天死亡率3.1%)。各中心本地神经网络AUROC 0.80–0.84;集中式模型AUROC 0.81;分布式联邦学习(FL)与之相当(AUROC 0.78,P=0.67);加入中央差分隐私使AUROC降约5%、AUPRC降35%,本地差分隐私几乎丧失性能。年龄、血液状态、Charlson合并症指数权重最高。

> **要点**：联邦学习性能媲美集中式建模,为隐私保护下的外科AI协作提供框架。


### 93. 基于入院3天内术前/术后平扫CT预测动脉瘤性蛛网膜下腔出血功能结局

*Prediction of functional outcomes in aneurysmal subarachnoid hemorrhage using pre-/postoperative noncontrast CT within 3 days of admission.*

**npj Digital Medicine** · 2025-08-24 · 多中心回顾性深度学习建模 · [PMID 40849351](https://pubmed.ncbi.nlm.nih.gov/40849351/) · [DOI](https://doi.org/10.1038/s41746-025-01953-z)

整合术前与术后平扫CT及临床数据的深度学习模型预测aSAH患者3个月改良Rankin量表(mRS)，基于4家医院1850例构建并验证5种模型。融合模型显著优于其他(均p<0.001)，外部测试平均绝对误差0.79、AUC 0.92。属神经外科术后功能结局预测。

> **要点**：多模态深度学习早期预测aSAH术后功能结局。


### 94. 33579例泌尿系结石的临床管理启示：成分、共病、季节变化新模式与基于机器学习的尿脓毒症预测

*Clinical management implications from 33 579 urinary stones: novel patterns in composition, comorbidities, seasonal variation, and machine learning-based urosepsis prediction.*

**International Journal of Surgery** · 2025-08-08 · 大样本回顾性研究 + 机器学习预测建模 · [PMID 40787982](https://pubmed.ncbi.nlm.nih.gov/40787982/) · [DOI](https://doi.org/10.1097/JS9.0000000000002934)

回顾分析2014–2024年华南地区33579例泌尿系结石，揭示成分(以含钙结石为主，其次感染性与尿酸结石)、性别差异、30余种共病、解剖分布与季节规律，并首次构建机器学习尿脓毒症预测模型，识别性别、感染状态、贫血、结石特征与解剖异常等关键危险因素以辅助围术期风险分层。

> **要点**：迄今亚洲最大结石成分分析(33579例)，并建立首个ML尿脓毒症风险预测模型。


### 95. 机器学习预测主髂动脉腔内血运重建术后结局

*Predicting outcomes following endovascular aortoiliac revascularization using machine learning.*

**npj Digital Medicine** · 2025-07-24 · 回顾性数据库ML建模 · [PMID 40707760](https://pubmed.ncbi.nlm.nih.gov/40707760/) · [DOI](https://doi.org/10.1038/s41746-025-01865-y)

基于NSQIP血管数据库2011-2021年6601例主髂动脉腔内血运重建患者，用37个术前变量训练6种ML模型预测30天主要不良肢体事件(MALE)或死亡(发生率7.1%，470例)。最佳模型XGBoost AUROC 0.94(0.93-0.95)，显著优于logistic回归0.74。属血管介入术后结局预测。

> **要点**：XGBoost优于logistic预测腔内血运重建术后结局。


### 96. Super Learner提升结直肠手术术后并发症预测

*Super Learner Enhances Postoperative Complication Prediction in Colorectal Surgery.*

**Annals of Surgery** · 2025-07-23 · 回顾性队列+Super Learner集成机器学习 · [PMID 40698768](https://pubmed.ncbi.nlm.nih.gov/40698768/) · [DOI](https://doi.org/10.1097/SLA.0000000000006847)

回顾性分析2018-2022 ACS NSQIP结直肠手术病例，构建Super Learner(SL)集成机器学习预测14项术后结局，与logistic回归(LOG)和XGBoost(XGB)比较。SL在所有并发症上判别与校准均更优，预测死亡率AUROC>0.94，感染并发症与住院时长预测更准。

> **要点**：Super Learner集成学习全面提升结直肠术后并发症与死亡预测精度。


### 97. 机器学习模型预测胃腺癌全胃/近端胃切除术吻合口漏的前瞻性多中心验证

*Prospective multicenter validation of a machine learning model for predicting anastomotic leakage in patients with gastric adenocarcinoma undergoing total or proximal gastrectomy.*

**International Journal of Surgery** · 2025-07-17 · 前瞻性多中心验证研究 · [PMID 40696942](https://pubmed.ncbi.nlm.nih.gov/40696942/) · [DOI](https://doi.org/10.1097/JS9.0000000000003025)

前瞻多中心研究，纳入四中心512例行全胃或近端胃切除的胃腺癌患者，术中用实时机器学习模型评估吻合口漏（AL）风险。AL发生率2.54%（13例）；模型AUC 0.780、敏感度0.769、特异度0.577、阴性预测值0.990；高危组AL率显著高于低危组（10/221 vs 3/291，P=0.027），约35%患者可安全免于强化监测。

> **要点**：实时ML高敏感度分层胃切除吻合口漏风险。


### 98. 基于机器学习的胆囊癌远处转移预测系统：回顾队列研究

*Prediction system for gallbladder cancer distant metastasis a retrospective cohort study based on machine learning.*

**International Journal of Surgery** · 2025-07-17 · 回顾队列机器学习建模 · [PMID 40679985](https://pubmed.ncbi.nlm.nih.gov/40679985/) · [DOI](https://doi.org/10.1097/JS9.0000000000002901)

基于SEER数据库（2000–2020）按7:3划分，用六种ML构建胆囊癌远处转移预测模型。XGBoost表现最佳（precision=0.968，AUC=0.885）；T、N、分级、年龄为危险因素，并开发在线计算器，用于早期识别转移风险、指导个体化治疗与手术决策。

> **要点**：XGBoost预测胆囊癌远处转移（AUC 0.885）。


### 99. 迈向精准胆囊切除：增强预测模型以改善长期疗效

*Toward precision cholecystectomy: augmenting predictive models for long-term success.*

**International Journal of Surgery** · 2025-07-17 · 述评/编者按（无数据） · [PMID 40679971](https://pubmed.ncbi.nlm.nih.gov/40679971/) · [DOI](https://doi.org/10.1097/JS9.0000000000002972)

一篇述评/编者按（无摘要），围绕如何增强针对胆囊切除术长期疗效的预测模型展开讨论。属外科手术结局预测建模的观点性文章，本身无原始数据与性能指标。

> **要点**：述评：完善胆囊切除长期疗效预测模型。


### 100. 基因组测序对预测先天性心脏手术后结局至关重要

*Genome sequencing is critical for forecasting outcomes following congenital cardiac surgery.*

**Nature Communications** · 2025-07-10 · 前瞻性观察队列+AI预测建模 · [PMID 40640177](https://pubmed.ncbi.nlm.nih.gov/40640177/) · [DOI](https://doi.org/10.1038/s41467-025-61625-0)

前瞻观察队列(2,253例先心病患者,来自Pediatric Cardiac Genomics Consortium),用AI技术评估全外显子测序对先天性心脏缺陷手术后临床结局的预测价值。染色质修饰与纤毛相关基因的有害基因型与术后不良结局(死亡、心脏骤停、机械通气延长)风险升高相关,并随特定表型、手术复杂度与心外畸形放大;缺乏此类有害基因型可降低部分不良结局风险。

> **要点**：全外显子测序+AI提升先天性心脏手术后死亡/并发症的预后预测能力。


### 101. 机器学习基于真实世界临床数据改进内镜不良事件记录

*How machine learning on real world clinical data improves adverse event recording for endoscopy.*

**npj Digital Medicine** · 2025-07-10 · 回顾性机器学习建模 · [PMID 40640575](https://pubmed.ncbi.nlm.nih.gov/40640575/) · [DOI](https://doi.org/10.1038/s41746-025-01826-5)

回顾性分析2490例住院内镜病例，用随机森林从结构化院内元数据(ICD编码、操作时间等)检测穿孔、出血、再入院等内镜操作不良事件。穿孔AUC-ROC/AUC-PR 0.90/0.69，出血0.84/0.64，再入院0.96/0.90，显著优于基线。此半自动、保护隐私的方法可识别文档差异并加强质控。

> **要点**：ML识别内镜操作并发症的漏报，提升质控与围操作期患者安全。


### 102. 消费级可穿戴设备生物节律预测儿童术后并发症

*Biorhythms derived from consumer wearables predict postoperative complications in children.*

**Science Advances** · 2025-07-09 · 前瞻性队列（n=103） · [PMID 40632861](https://pubmed.ncbi.nlm.nih.gov/40632861/) · [DOI](https://doi.org/10.1126/sciadv.adv2643)

103名阑尾切除术患儿术后佩戴消费级可穿戴21天，提取昼夜/超日节律指标，机器学习模型可在正式诊断前最多3天预测术后并发症，敏感度91%、特异度74%。提示可穿戴生物节律为术后无扰监测新途径。

> **要点**：可穿戴+ML提前3天预测儿童术后并发症，敏感度91%


### 103. 基于图像的人工智能手术部位感染检测

*Imaging-based Surgical Site Infection Detection Using Artificial Intelligence.*

**Annals of Surgery** · 2025-07-03 · 回顾性多中心队列+计算机视觉(10折交叉验证) · [PMID 40607706](https://pubmed.ncbi.nlm.nih.gov/40607706/) · [DOI](https://doi.org/10.1097/SLA.0000000000006826)

回顾性纳入Mayo 9院2019-2022年NSQIP捕获、术后30天内经门户上传伤口图像的6060例患者(SSI 6.2%)，构建两阶段AI管线(切口检测+SSI检测)。Vision Transformer表现最佳，切口检测准确率0.94(AUC 0.98)、SSI检测准确率0.73(AUC 0.81)，各种族亚组表现相当。

> **要点**：Vision Transformer自动分诊患者上传伤口图像并检测手术部位感染，减轻临床负担。


### 104. 自动化机器学习模型用于中期肝细胞癌TACE后预后风险分层

*An automated machine-learning model for prognostic risk stratification of intermediate-stage hepatocellular carcinoma after transarterial chemoembolization.*

**International Journal of Surgery** · 2025-07-02 · 多中心回顾机器学习建模 · [PMID 40607968](https://pubmed.ncbi.nlm.nih.gov/40607968/) · [DOI](https://doi.org/10.1097/JS9.0000000000002719)

回顾纳入七家三级医院4426例行首次常规TACE的中期HCC患者（训练2667/内部667/外部1092），用NLP从电子病历抽取信息构建六种ML模型。XGBoost最佳，预测2年HCC相关死亡AUC训练0.842、内部0.815、外部0.798；高危患者中TACE联合微波消融者累积生存显著更高。TACE属介入操作。

> **要点**：XGBoost对TACE后中期HCC预后分层（外部AUC 0.798）。


### 105. 个体化结构网络偏离预测内侧颞叶癫痫手术结局：多中心验证研究

*Individualized structural network deviations predict surgical outcome in mesial temporal lobe epilepsy: a multicenter validation study.*

**International Journal of Surgery** · 2025-07-02 · 多中心验证研究 · [PMID 40607947](https://pubmed.ncbi.nlm.nih.gov/40607947/) · [DOI](https://doi.org/10.1097/JS9.0000000000002928)

多中心回顾研究，189例行单侧颞叶切除的内侧颞叶癫痫（mTLE）患者与78名对照，基于T1-MRI构建个体化结构协变网络（iSCN）并用SVM预测术后无发作。对侧iSCN特征预测最优，准确率82%、AUC 0.81；两独立外部队列准确率80%/88%、AUC 0.80/0.82，提示良好泛化性。

> **要点**：iSCN+SVM预测mTLE术后无发作（AUC 0.81，外部0.80/0.82）。


### 106. 皮层与皮层下区域边界复杂度预测帕金森病脑深部电刺激结局

*Boundary complexity of cortical and subcortical areas predicts deep brain stimulation outcomes in Parkinson's disease.*

**Nature Communications** · 2025-07-01 · 回顾性影像组学+ML预后建模 · [PMID 40595525](https://pubmed.ncbi.nlm.nih.gov/40595525/) · [DOI](https://doi.org/10.1038/s41467-025-60695-4)

231例帕金森病患者,从术前T1加权MRI提取分形维数(FD)边界复杂度,预测脑深部电刺激(DBS)术后用药变化;FD在九个脑区区分PD与健康对照。加入影像FD使模型解释力从仅临床特征R²=0.252升至R²=0.388(额外13.6%方差);超图分类学习预测AUC由仅临床特征0.64升至临床+影像0.76。有望优化DBS候选者选择与治疗规划。

> **要点**：术前MRI分形维数+超图学习提升DBS神经外科术后结局预测(AUC 0.64→0.76)。


### 107. 基于人工智能的转移性脊柱疾病手术部位感染预测模型：多中心开发与验证

*Artificial intelligence-based prediction model for surgical site infection in metastatic spinal disease: a multicenter development and validation study.*

**International Journal of Surgery** · 2025-06-27 · 多中心开发与验证研究 · [PMID 40576176](https://pubmed.ncbi.nlm.nih.gov/40576176/) · [DOI](https://doi.org/10.1097/JS9.0000000000002806)

多中心研究，纳入667例转移性脊柱疾病患者（衍生485例、外部182例），用逻辑回归与五种ML算法预测手术部位感染（SSI）。SSI发生率6.4%/7.7%；GBM模型最佳，内部AUC 0.986（95%CI 0.972–1.000）、外部0.848；AI显著优于临床医生评估（AUC 0.986 vs 0.572–0.627，P<0.001）；手术时间、肿瘤类型、合并症数为主要影响因素。

> **要点**：GBM模型预测脊柱转移瘤术后SSI，远超临床医生。


### 108. 术前血浆神经酰胺作为临床相关肝切除术后肝衰竭新型预测标志物的前瞻多中心验证

*Prospective multicenter validation of preoperative plasma ceramides as novel predictive biomarkers for clinically relevant post-hepatectomy liver failure.*

**International Journal of Surgery** · 2025-06-24 · 前瞻多中心验证研究 · [PMID 40557443](https://pubmed.ncbi.nlm.nih.gov/40557443/) · [DOI](https://doi.org/10.1097/JS9.0000000000002791)

前瞻多中心研究，纳入四家医院736例肝切除患者（训练392、前瞻内部195、外部149），用LASSO logistic筛选预测临床相关肝切除术后肝衰竭（CR-PHLF）。CER(d18:1/20:1)单指标AUROC 0.837；整合大范围肝切除、直接胆红素的Hpx-CER模型AUROC训练0.896、内部0.907、外部0.862，各高危亚组均优于传统模型。

> **要点**：血浆神经酰胺+LASSO模型（Hpx-CER）预测肝切除术后肝衰竭。


### 109. 高出血风险经皮冠脉介入(PCI)患者长期净不良临床事件的可解释机器学习预测模型：前瞻队列

*Development and validation of a machine learning-based explainable predictive model for long-term net adverse clinical events in patients with high bleeding risk undergoing percutaneous coronary intervention: results from a prospective cohort study.*

**International Journal of Surgery** · 2025-06-23 · 前瞻队列（模型开发与验证） · [PMID 40549441](https://pubmed.ncbi.nlm.nih.gov/40549441/) · [DOI](https://doi.org/10.1097/JS9.0000000000002744)

基于PANDA-HBR前瞻登记的1512例PCI高出血风险(HBR)患者，比较逻辑回归、随机森林、梯度提升与XGBoost四种算法预测长期净不良临床事件(NACE)。XGBoost性能最优，AUC=0.85；SHAP结合递归特征消除筛出24个重要变量（临床、化验、超声心动）。设计为前瞻队列验证研究。

> **要点**：XGBoost预测PCI-HBR患者NACE，AUC 0.85，SHAP可解释。


### 110. 肝门部胆管癌移植后肿瘤复发风险评估(PRETREAT)评分的开发与验证

*Development of the Perihilar Cholangiocarcinoma Risk Estimation of Tumor Recurrence After Transplant (PRETREAT) Score.*

**Annals of Surgery** · 2025-06-23 · 回顾性预测模型开发与外部验证 · [PMID 40548581](https://pubmed.ncbi.nlm.nih.gov/40548581/) · [DOI](https://doi.org/10.1097/SLA.0000000000006815)

回顾Mayo(1993-2024)399例经新辅助放化疗+肝移植的不可切除pCCA(建模301、验证98),用Cox回归结合LASSO变量选择构建PRETREAT评分(0-22),含4独立预测因子(残留大体肿瘤HR 12.4、血管包绕HR 2.18、淋巴血管侵犯HR 2.04、径向直径HR 1.02/mm)。内/外部验证C指数0.83/0.85;低/中/高危组5年无复发生存89.0%/38.3%/15.4%(P<0.001)。

> **要点**：LASSO-Cox构建的PRETREAT评分有效分层pCCA移植后复发风险,指导监测


### 111. 用全基因组测序衍生多基因风险评分预测垂直袖状胃切除术后减重(All of Us队列)

*Predicting Weight Loss After Vertical Sleeve Gastrectomy Using a Whole-genome Sequencing-derived Polygenic Risk Score in the All of Us Cohort.*

**Annals of Surgery** · 2025-06-20 · 队列+全基因组+多种机器学习 · [PMID 40539265](https://pubmed.ncbi.nlm.nih.gov/40539265/) · [DOI](https://doi.org/10.1097/SLA.0000000000006809)

利用All of Us全基因组测序资源，用两阶段惩罚回归加弹性网logistic筛选1583个变异构建多基因风险评分(PRS)，预测垂直袖状胃切除(VSG)后12月减重。发现队列395例、验证336例；PRS加入临床模型后AUC提升：logistic +0.03(P<4.3e-14)、随机森林+0.03、决策树+0.05、梯度提升+0.08(P<8.3e-10)。

> **要点**：全基因组多基因风险评分结合机器学习提升袖状胃切除术后减重预测。


### 112. 集成学习预测重度腰椎间盘突出PLIF手术术中出血风险：多中心队列(IBLED-LDH)

*Predicting intraoperative blood loss risk in severe lumbar disc herniation patients undergoing PLIF: a multicenter cohort study using ensemble learning.*

**International Journal of Surgery** · 2025-06-19 · 回顾性多中心队列（模型开发与外部验证） · [PMID 40540437](https://pubmed.ncbi.nlm.nih.gov/40540437/) · [DOI](https://doi.org/10.1097/JS9.0000000000002730)

多中心研究，训练集3055例、四个地理独立外部队列共3186例。以Lasso从38个临床可及特征选变量，经XGBoost+随机森林+逻辑回归堆叠泛化(Stacking)，贝叶斯优化+10折交叉验证；在70种算法组合中Lasso+Stack最优，平均AUC=0.884。SHAP显示融合节段数、病程、术前住院时长、术前血红蛋白与白蛋白为前五预测因子。

> **要点**：集成学习预测PLIF术中出血风险，AUC 0.884，兼顾精度与可解释性。


### 113. 机器学习准确预测乳房重建术后1年的患者报告结局

*Machine Learning Accurately Predicts Patient-reported Outcomes 1 Year After Breast Reconstruction.*

**Annals of Surgery** · 2025-03-05 · 回顾性队列+机器学习(外部验证) · [PMID 40040622](https://pubmed.ncbi.nlm.nih.gov/40040622/) · [DOI](https://doi.org/10.1097/SLA.0000000000006688)

回顾性收集MSKCC 2010-2024年乳房重建患者BREAST-Q评分，开发5种机器学习算法预测术后1年结局是否改善，并用多中心Mastectomy Reconstruction Outcomes Consortium数据外部验证。共4776例(MSKCC 2687/外部2089)，各域AUC：腹部身体健康0.97、乳房满意0.86、性健康0.79、胸部身体健康0.78、社会心理0.74；术前BREAST-Q、放疗时机、BMI、年龄、重建方式贡献最大。

> **要点**：机器学习可在术前准确预测乳房重建术后患者报告结局，助力共享决策。


### 114. 腹部手术后身体功能恢复的纵向聚类分析

*Recovery Patterns: Longitudinal Cluster Analysis of Physical Function Following Abdominal Surgery.*

**Annals of Surgery** · 2025-02-18 · RCT数据二次分析+无监督机器学习聚类 · [PMID 39963795](https://pubmed.ncbi.nlm.nih.gov/39963795/) · [DOI](https://doi.org/10.1097/SLA.0000000000006671)

对2项RCT的649例患者PROMIS身体功能纵向t分数二次分析,用k-medoids聚类与增长混合模型识别恢复轨迹。两种方法在不同数据集一致识别出快速、中间、不均匀恢复3类;重手术下出现"复发"类,另经k-medoids识别低增益/高增益类。

> **要点**：无监督ML可从术后功能轨迹提取有临床意义的恢复模式,助术前共同决策


### 115. 以主要CPT码对比多CPT码表示手术风险时ACS NSQIP风险计算器的准确性

*American College of Surgeons National Surgical Quality Improvement Program Surgical Risk Calculator Accuracy When Operative Risk is Represented by the Principal Current Procedural Terminology Code Versus Many Codes.*

**Annals of Surgery** · 2025-02-07 · 大规模回顾性数据+机器学习(XGBoost对CatBoost) · [PMID 39917834](https://pubmed.ncbi.nlm.nih.gov/39917834/) · [DOI](https://doi.org/10.1097/SLA.0000000000006661)

用2016-2020年ACS NSQIP 5,020,713例数据，比较仅用主要CPT码(XGBoost)与用多达21个CPT码(CatBoost机器学习)对13项结局的风险预测(80%训练/20%验证)。CatBoost相对XGBoost在判别上无一致优势、校准互有胜负，但在有≥4个CPT码的约8%患者中CatBoost估计明显更准。

> **要点**：对含多个CPT码的复杂病例，CatBoost机器学习可为NSQIP风险计算器提供更准估计。


### 116. 面向行政数据库的外科专用合并症评分(CORE score)开发

*Development of a Surgery-specific Comorbidity Score for Use in Administrative Data.*

**Annals of Surgery** · 2024-09-24 · 预测模型开发与多数据集验证 · [PMID 39315437](https://pubmed.ncbi.nlm.nih.gov/39315437/) · [DOI](https://doi.org/10.1097/SLA.0000000000006544)

基于2019年NIS 699,155例、14专科62种手术,用4种机器学习算法筛选非零重要性特征后行logistic回归构建CORE合并症评分预测院内死亡。预测院内死亡AUC在NIS/SID/机构数据分别为0.90/0.91/0.88,均优于Elixhauser(0.84/0.86/0.84)与Charlson(P<0.001)。

> **要点**：ML筛选特征构建的外科专用合并症评分优于经典ECI/CCI预测术后院内死亡



## 八、分诊、急诊外科与围手术期流程（8 篇）

### 1. AI预测创伤患者院前输血需求:一项多国注册库回顾性机器学习开发与验证研究

*AI-enabled forecasting of prehospital transfusion needs in patients with trauma: a multinational, registry-based, retrospective, machine learning development and validation study.*

**The Lancet Digital Health** · 2026-01-30 · 多国回顾性ML开发与验证研究 · [PMID 41620321](https://pubmed.ncbi.nlm.nih.gov/41620321/) · [DOI](https://doi.org/10.1016/j.landig.2025.100945)

回顾性多国机器学习研究,基于院前生命体征、损伤模式、抗凝用药等,用美国国家创伤数据库364,350例训练、并在德/奥/瑞/爱/加4个注册库54,210例外部验证,预测创伤院前输血需求。外部验证中预测任何输血需求AUC 0.87(95%CI 0.86-0.87)、红细胞(PRBC)AUC 0.88,优于到院实验室分层;高输血概率组(>0.5)总死亡、失血性死亡、需早期手术止血及及时输血发生率均显著更高(如需早期手术止血padjusted=3.58×10^-83)。

> **要点**：院前ML提前识别高输血/失血性休克风险创伤患者(AUC 0.87-0.88),支持及早手术止血与资源调度。


### 2. 运用人工智能辅助外科出院的可行性案例研究

*Operationalization of Artificial Intelligence to Assist in Surgical Discharge: A Feasibility Case Study*

**NEJM AI** · 2026-01-01 · 可行性案例研究 · [DOI](https://doi.org/10.1056/aics2401132)

可行性案例研究（摘要缺失），描述将人工智能工具落地用于辅助外科患者出院流程/决策的实施经验，属围手术期路径与流程管理。

> **要点**：AI辅助外科出院流程的落地可行性探索。


### 3. AI引导的手术备血：Smart Match前瞻性验证

*AI-Guided Surgical Blood Readiness: Overcoming Real-World Challenges in Prospective Validation for Safer, More Efficient Blood Preparation.*

**NEJM AI** · 2025-11-26 · 回顾性建模+前瞻性静默验证 · [PMID 42245984](https://pubmed.ncbi.nlm.nih.gov/42245984/) · [DOI](https://doi.org/10.1056/aioa2401198)

回顾性建模+前瞻性静默验证。基于电子病历82个变量、1921个特征训练XGBoost模型(Smart Match)预测择期手术患者围手术期红细胞输注需求，替代传统MSBOS。回顾性队列235,054例(输血率3.04%)，测试集AUROC 0.94、AUPRC 0.57；前瞻性静默验证24,003例(输血率2.18%)维持AUROC 0.94、AUPRC 0.55，敏感度0.72、阳性预测值0.34，均优于MSBOS与临床医生行为；混合模型预测每日用血MAE 12.86优于MSBOS 13.34。

> **要点**：机器学习备血模型实时优于传统MSBOS与医生经验，个体化预测围手术期输血需求。


### 4. 预测创伤性脑损伤手术干预与输血需求的可解释多组学模型

*Interpretable Multiomics Models for Predicting Surgical Interventions and Blood Transfusion Requirements in Traumatic Brain Injury.*

**npj Digital Medicine** · 2025-11-19 · 多中心多组学融合建模 · [PMID 41258135](https://pubmed.ncbi.nlm.nih.gov/41258135/) · [DOI](https://doi.org/10.1038/s41746-025-02072-5)

构建融合临床生物标志物、神经影像与临床文本挖掘的多组学数据融合(MDF)模型，在四个多中心队列(N=2219)预测创伤性脑损伤(TBI)的手术干预与输血需求，预测中位领先干预3小时。手术模型外部F1 0.63-0.85，输血模型验证/外部F1 0.78/0.74(与输血量相关R=0.687/0.580)；简化急诊模型验证/外部AUC 0.81/0.75。SHAP显示影像特征主导手术预测。

> **要点**：多组学模型提前预测TBI是否需手术与输血，支持急诊外科决策。


### 5. NLP预测择期神经外科非计划ICU入住

*AI assisted prediction of unplanned intensive care admissions using natural language processing in elective neurosurgery.*

**npj Digital Medicine** · 2025-08-27 · 单中心回顾性NLP建模 · [PMID 40858789](https://pubmed.ncbi.nlm.nih.gov/40858789/) · [DOI](https://doi.org/10.1038/s41746-025-01952-0)

用CogStack-MedCAT NLP模型从UCLH 2268份择期神经外科病历提取临床概念，训练AI分类病房与ICU入住。随机森林对ICU入住召回率0.87(CI 0.82-0.91)，将人工漏判的非计划ICU比例从36%降至4%。属围手术期资源规划/路径管理。

> **要点**：NLP预测神经外科ICU需求以优化资源分配。


### 6. 多模态机器学习支持脊柱手术风险分层的捆绑支付

*Multimodal machine learning for risk-stratified bundled payments in spinal surgery.*

**npj Digital Medicine** · 2025-08-10 · 回顾性多模态ML建模 · [PMID 40783461](https://pubmed.ncbi.nlm.nih.gov/40783461/) · [DOI](https://doi.org/10.1038/s41746-025-01915-5)

构建首个术前风险分层多模态ML模型，融合结构化临床数据与NLP处理的外科医师病历预测脊柱手术财务指标。总费用与可变费用离群预测ROC-AUC分别0.845与0.883；1898例中209例(11.0%)为财务离群，造成1280万美元亏损，其余盈利180万美元；离群者ICU入住、90天再手术与住院时间更高(均P<0.001)。属围手术期资源/支付流程管理。

> **要点**：多模态ML风险分层实现脊柱手术公平捆绑支付。


### 7. 应用大语言模型预测外科手术时长

*Applying Large Language Models for Surgical Case Length Prediction.*

**JAMA Surgery** · 2025-08-01 · 回顾性研究（含外部验证） · [PMID 40632526](https://pubmed.ncbi.nlm.nih.gov/40632526/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2154)

回顾性研究，纳入单中心2017-2023年125,493例择期手术，用1950例微调、2500例评估、500例外部验证，比较11种LLM（GPT-4、GPT-3.5、Mistral、Llama-3、Phi-3等）基于非结构化临床文本预测手术时长。微调GPT-4表现最佳，平均绝对误差(MAE)47.64分钟、R²0.61，与现有排程系统相当(MAE 49.34分钟，P=.10)；在预测值处于实际时长±20%以内的准确率上，微调GPT-4/GPT-3.5显著优于现排程(46.12%/46.08% vs 40.92%，P<.001)；外部验证MAE 48.66分钟、准确率46.0%。

> **要点**：微调LLM可基于既有临床文书预测手术时长，精度媲美或超过现有手术室排程方法。


### 8. 预测急诊普外科转院"未见"患者死亡的风险计算器开发与验证

*Predicting Mortality Before Interhospital Hospital for "Unseen" General Surgery Patients: Development, Validation, and Feasibility Trial of a Mortality Risk Calculator.*

**Annals of Surgery** · 2024-05-10 · 预测模型开发与验证(含可行性试验) · [PMID 38726671](https://pubmed.ncbi.nlm.nih.gov/38726671/) · [DOI](https://doi.org/10.1097/SLA.0000000000006334)

回顾纳入4664例转入普外/结直肠科患者(死亡6.0%),按3:1分训练/验证集,比较多种预测模型后选定惩罚回归(penalized regression)模型,仅用12个常规变量。验证集AUC 0.851、敏感度0.90、特异度0.67、平衡准确率0.79,偏差校正后Brier 0.04,变量可由非临床转运人员采集。

> **要点**：12变量惩罚回归计算器可在转院时准确预测急诊普外死亡,助分诊与资源调配



## 九、移植相关AI（16 篇）

### 1. 偏振敏感光学相干断层扫描评估人供肝活力

*Human donor liver viability evaluation with polarization-sensitive optical coherence tomography.*

**Science Translational Medicine** · 2026-06-24 · 影像验证研究（ML） · [PMID 42341084](https://pubmed.ncbi.nlm.nih.gov/42341084/) · [DOI](https://doi.org/10.1126/scitranslmed.adv7124)

采用偏振敏感OCT（PS-OCT）对人供肝全表面多参数活力评估，结合机器学习与纹理分析量化脂肪变、纤维化、炎症、坏死，与病理相关性>80%，并与常温机器灌注功能及移植临床结局强相关。有望降低高危供肝弃用率、扩大供体池。

> **要点**：PS-OCT+ML无创评估供肝活力，与病理相关>80%


### 2. AI增强诊断促成心脏移植的一例报道

*A case of artificial intelligence-enhanced diagnostics leading to heart transplantation.*

**Nature Medicine** · 2026-06-22 · 病例通讯（Letter） · [PMID 42332144](https://pubmed.ncbi.nlm.nih.gov/42332144/) · [DOI](https://doi.org/10.1038/s41591-026-04454-y)

为一篇Letter通讯（无摘要正文），报道AI增强诊断识别问题并促成心脏移植的病例。涉及AI诊断与心脏移植手术，但为单个案例通讯、无量化数据。

> **要点**：个案：AI诊断促成心脏移植（通讯，无量化数据）。


### 3. 肾移植中基于电子病历的AI风险预测随机试验（PRIMA-AI）

*Randomized trial of electronic health record implemented AI risk prediction in kidney transplant care.*

**npj Digital Medicine** · 2026-05-14 · 单中心随机对照试验（n=76） · [PMID 42135463](https://pubmed.ncbi.nlm.nih.gov/42135463/) · [DOI](https://doi.org/10.1038/s41746-026-02757-5)

单中心PRIMA-AI试验将76例eGFR<30的肾移植受者1:1随机分为常规护理或加用EHR集成机器学习模型（预测1年移植物丢失风险）。主要结局即移植失败后治疗方案沟通频率两组无差异（39% vs 40%，χ² p=1.00），次要共同决策结局亦无差异，工具使用率低且有工作流障碍。

> **要点**：被动提供AI移植物丢失风险未改善医患沟通与共同决策。


### 4. AI是否应进入肝移植遴选委员会?(社论)

*Should AI have a seat in the selection committee for liver transplantation?*

**The Lancet Digital Health** · 2026-04-07 · 社论/评论(无数据) · [PMID 41951493](https://pubmed.ncbi.nlm.nih.gov/41951493/) · [DOI](https://doi.org/10.1016/j.landig.2026.101004)

《Lancet Digital Health》配发的社论,针对同期用多智能体大语言模型(LLM)模拟肝移植遴选委员会的研究展开讨论,探讨将AI纳入移植候选者遴选决策的价值、客观性提升潜力与伦理/公平性顾虑,无原始数据。核心观点:AI有望减少主观性、提升移植分配的客观与公平,但需审慎评估其角色与责任边界。

> **要点**：评论文章,肯定AI辅助移植遴选的客观化潜力但强调审慎与伦理边界。


### 5. 基于多智能体大语言模型模拟肝移植遴选委员会的系统:一项回顾性队列研究

*A multiagent large language model-based system to simulate the liver transplant selection committee: a retrospective cohort study.*

**The Lancet Digital Health** · 2026-04-07 · 回顾性队列研究(概念验证) · [PMID 41951492](https://pubmed.ncbi.nlm.nih.gov/41951492/) · [DOI](https://doi.org/10.1016/j.landig.2025.100966)

回顾性混合队列研究,基于美国SRTR数据库,构建由4个GPT-4o(2024-08-06)智能体(移植肝病学家、移植外科医生、心脏病学家、社会工作者)组成的AI遴选委员会评估肝移植候选者。共8412例,其中7033例(83.6%)进入等待名单、1379例(16.4%)为设定绝对禁忌证的假设队列。预测移植后1年生存的准确率92.00%(95%CI 91.43-92.58)、敏感度1.00、特异度0.66;识别绝对禁忌证准确率98.19%、预测6个月生存准确率94.88%。假阴性最常见原因为超米兰标准肝细胞癌,假阳性1年内最常见死因为恶性肿瘤(137/481,28%)。

> **要点**：多智能体LLM可较客观模拟肝移植遴选委员会决策,1年生存预测准确率92%、敏感度1.00。


### 6. 用离线强化学习进行肝移植供受体匹配

*Liver transplant donor-recipient matching with offline reinforcement learning.*

**npj Digital Medicine** · 2026-03-16 · 基于全国注册库的离线强化学习建模 · [PMID 41840109](https://pubmed.ncbi.nlm.nih.gov/41840109/) · [DOI](https://doi.org/10.1038/s41746-026-02529-1)

将肝移植决策建模为在不同时点等待/摘牌/移植的序列优化，用离线强化学习基于SRTR全国等待名单轨迹训练。模型可避免73%导致移植物失功或死亡的供受配对，保留93%成功移植，并为47%等待名单死亡患者找到潜在合适供体。属移植供受匹配，核心相关。

> **要点**：离线RL更贴近真实肝移植供受匹配决策。


### 7. 单倍体造血干细胞移植结局的可解释AI预后模型开发与刻画

*Development and explainable AI-driven characterization of a prognostic model for haploidentical transplantation outcomes.*

**npj Digital Medicine** · 2026-03-03 · 单中心回顾性可解释ML预后建模 · [PMID 41772139](https://pubmed.ncbi.nlm.nih.gov/41772139/) · [DOI](https://doi.org/10.1038/s41746-026-02377-z)

用668例接受PTCy预处理的单倍体造血干细胞移植(HCT)患者(2015-2024)训练梯度提升机并用可解释AI(部分依赖图、代理决策树)刻画总生存预后层级。供体年龄呈U形效应(20末至40初最佳)，受体年龄为主导，HLA-DPB1非允许错配影响最大(3年OS降9.6%)；模型将患者分为3年生存75%至<20%的风险四分位，优化供体选择可将风险改善约一个四分位。属移植供受匹配/移植物结局，核心相关。

> **要点**：可解释AI量化单倍体HCT供受因素，指导个体化供体选择。


### 8. 深度学习增强的近红外高光谱成像定量评估肝缺血再灌注损伤与脂肪变

*Deep learning-enhanced quantitative evaluation of hepatic ischemia-reperfusion injury and steatosis via near-infrared hyperspectral imaging.*

**International Journal of Surgery** · 2026-01-12 · 动物模型+移植受者回顾队列，DL+高光谱成像 · [PMID 41532427](https://pubmed.ncbi.nlm.nih.gov/41532427/) · [DOI](https://doi.org/10.1097/JS9.0000000000004819)

结合近红外高光谱成像（NIR-HSI, 900–1700nm）与一维卷积神经网络（1D-CNN）分类肝脂肪变与缺血再灌注（I/R）损伤程度，精确度均>0.95、F1>0.90；LSSVM预测总胆固醇/甘油三酯/IL-1β/TNF-α/HMGB1的NRMSE均<0.10、R²>0.9，并在肝移植回顾队列中有效预测术后早期移植物功能障碍（EAD）。属AI辅助移植物质量与预后评估。

> **要点**：AI增强高光谱成像无创评估肝移植物质量并预测EAD。


### 9. KT-LLM：证据锚定与序列文本的可审计肾移植建模框架

*KT-LLM: an evidence-grounded and sequence text framework for auditable kidney transplant modeling.*

**npj Digital Medicine** · 2026-01-10 · 方法学/多智能体系统加队列验证 · [PMID 41520040](https://pubmed.ncbi.nlm.nih.gov/41520040/) · [DOI](https://doi.org/10.1038/s41746-025-02323-5)

提出KT-LLM，用RAG将知识约束于Banff、OPTN、SRTR权威文档，协同三个可审计智能体：SRTR-MambaSurv做离散时间生存与竞争风险预测、OPTN-BlackClust做稳定深度嵌入聚类分型、Policy-Ops将政策时限编码为pass/warn/fail规则。在去标识OPTN/UNOS队列上证据归因与预测校准优于强基线，并能在黑人受者中识别临床异质亚群。属移植建模。

> **要点**：证据锚定可审计的肾移植生存预测与政策合规LLM框架。


### 10. 可解释机器学习纵向预测肾移植术后移植物丢失与死亡

*Enhancing post-kidney transplant prognostication: an interpretable machine learning approach for longitudinal outcome prediction.*

**npj Digital Medicine** · 2025-11-18 · 多中心队列回顾性ML建模 · [PMID 41254094](https://pubmed.ncbi.nlm.nih.gov/41254094/) · [DOI](https://doi.org/10.1038/s41746-025-02049-4)

基于瑞士移植队列(STCS)多中心数据，提出两阶段ML框架每年动态更新预测次年移植物丢失与死亡风险，跨13年随访训练评估5种模型。纳入纵向数据显著优于仅基线模型，LightGBM表现最佳，移植物丢失AUROC达0.896、死亡0.797。属肾移植术后预后建模。

> **要点**：动态可解释ML提升肾移植受者个体化风险分层。


### 11. 大语言模型量化社会决定因素对肝移植决策的影响

*A large language model-based approach to quantifying the effects of social determinants in liver transplant decisions.*

**npj Digital Medicine** · 2025-11-17 · 回顾性LLM文本抽取与关联分析 · [PMID 41249463](https://pubmed.ncbi.nlm.nih.gov/41249463/) · [DOI](https://doi.org/10.1038/s41746-025-02025-y)

构建LLM框架从病历提取并分析心理社会与健康社会决定因素(SDOH)对肝移植准入的影响。关键可干预障碍患病率不一(社会支持缺口35.4%、近期物质使用14.2-22.7%、心理健康问题17.6%)，各因素使列入等待名单概率下降5-14个百分点；SDOH解释了亚裔患者42.6%的种族差异(超过肝脏健康指标36.8%)。属LLM应用于肝移植准入/分配公平。

> **要点**：LLM揭示社会决定因素驱动肝移植准入不平等。


### 12. 开发并验证减少循环死亡后捐献肝移植中无效获取的机器学习模型:一项美国多中心研究

*Development and validation of a machine-learning model to reduce futile procurements in donations after circulatory death in liver transplantation in the USA: a multicentre study.*

**The Lancet Digital Health** · 2025-11-13 · 多中心回顾开发+前瞻验证研究 · [PMID 41238506](https://pubmed.ncbi.nlm.nih.gov/41238506/) · [DOI](https://doi.org/10.1016/j.landig.2025.100918)

多中心研究,纳入美国6中心2221例DCD捐献者,用LightGBM基于神经/生化/呼吸/循环参数预测拔管后进展至死亡以减少无效器官获取。交叉验证中30/45/60分钟进展至死亡预测AUC分别为0.833/0.801/0.805,回顾与前瞻验证保持稳定;相比外科医生预测,模型无效获取率更低(0.078 vs 0.195)、在外科医生分歧大时准确率更高,错失机会率相近;优于DCD-N评分(0.799)与Colorado计算器(0.694)。

> **要点**：ML(LightGBM)预测DCD供体进展至死亡(AUC 0.83),较外科医生显著降低无效器官获取率(0.078 vs 0.195)。


### 13. 用机器学习减少循环死亡后捐献的无效获取(评论)

*Reducing futile donation after circulatory death procurement with machine learning.*

**The Lancet Digital Health** · 2025-11-13 · 评论/短文(无数据) · [PMID 41238507](https://pubmed.ncbi.nlm.nih.gov/41238507/) · [DOI](https://doi.org/10.1016/j.landig.2025.100932)

核心相关但为评论/短文(无摘要)。与同期DCD肝移植无效获取ML模型研究相呼应,讨论用机器学习预测DCD供体进展至死亡、减少无效器官获取的临床意义,无独立数据。

> **要点**：评论文章,支持ML减少DCD无效器官获取。


### 14. 自主人工智能处方药物预防HLA半相合移植的重度急性移植物抗宿主病

*Autonomous artificial intelligence prescribing a drug to prevent severe acute graft-versus-host disease in HLA-haploidentical transplants.*

**Nature Communications** · 2025-09-25 · 前瞻性II期临床试验 · [PMID 40998766](https://pubmed.ncbi.nlm.nih.gov/40998766/) · [DOI](https://doi.org/10.1038/s41467-025-62926-0)

前瞻性II期研究(NCT05600855),将自研daGOAT算法作为条件自主AI智能体,在HLA半相合造血干细胞移植后处方鲁索替尼预防重度(3-4级)急性GvHD。110例入组,daGOAT在移植后+17至+23天判定57例为中高危并处方;初始依从率98%(56/57),1个月内8例偏离剂量/方案。85%符合条件者受邀、88%同意参与。证明医患对自主AI处方接受度高。

> **要点**：首个前瞻部署的条件自主AI在移植后自主处方预防GvHD,依从率98%。


### 15. 多模态深度学习预测活体供肾移植受者肾功能结局

*Multimodal deep learning integration for predicting renal function outcomes in living donor kidney transplantation: a retrospective cohort study.*

**International Journal of Surgery** · 2025-09-17 · 回顾性多模态深度学习模型开发与验证 · [PMID 40961229](https://pubmed.ncbi.nlm.nih.gov/40961229/) · [DOI](https://doi.org/10.1097/JS9.0000000000003494)

回顾性队列(3772例中筛出1937例活体肾移植),整合CT影像(CLIP编码)、放射报告文本(BioBERT)与结构化临床变量,XGBoost集成预测术后1年eGFR四分类;全多模态模型macro-F1 0.675、micro-F1 0.704,远超仅临床模型(macro-F1 0.292),CT贡献大于文本;供者年龄、BMI、性别为关键预测因子。

> **要点**：多模态DL显著提升活体肾移植术后肾功能预测,支持供受匹配。


### 16. 以AI、新兴技术与异种移植重塑移植医学

*Reshaping transplantation with AI, emerging technologies and xenotransplantation.*

**Nature Medicine** · 2025-07-14 · 叙述性综述 · [PMID 40659768](https://pubmed.ncbi.nlm.nih.gov/40659768/) · [DOI](https://doi.org/10.1038/s41591-025-03801-9)

综述指出AI工具日益通过整合临床、人口学与免疫学数据指导器官分配、优化排斥监测与个体化免疫抑制并支持虚拟患者仿真；同时异种移植经多基因编辑供体猪推进、再生医学（干细胞、类器官、3D生物打印）迈向个体化组织。为叙述性综述，明确涉及AI与移植手术。

> **要点**：综述：AI指导器官分配与排斥监测重塑移植医学。



## 十、麻醉、围手术期监测与外科ICU（1 篇）

### 1. 用于消化内镜的强化学习自动麻醉系统多中心随机试验（AAS-GE）

*Reinforcement learning based automated anesthesia system for gastrointestinal endoscopy with a multicenter randomized trial.*

**npj Digital Medicine** · 2026-04-29 · 前瞻性多中心随机对照试验 · [PMID 42056274](https://pubmed.ncbi.nlm.nih.gov/42056274/) · [DOI](https://doi.org/10.1038/s41746-026-02657-8)

开发基于强化学习的环泊酚自动给药系统AAS-GE，中国四中心前瞻RCT纳入418例（ASA I-II）。低氧血症发生率与人工管理相当（14.42% vs 14.29%，OR 1.01，P=0.968），诱导时间更短（1.55 vs 1.90 min，P<0.001）且未增加用药与恢复时间，但术中体动更多。

> **要点**：RL自动麻醉系统在内镜镇静中非劣且更高效。



## 十一、大语言模型与生成式AI（外科应用）（27 篇）

### 1. 用于术前/操作前患者准备的对话式人工智能:实施、验证与患者满意度

*Conversational artificial intelligence for pre-procedural patient preparation: implementation, validation and patient satisfaction.*

**npj Digital Medicine** · 2026-07-04 · 前瞻性实施评估研究 · [PMID 42401677](https://pubmed.ncbi.nlm.nih.gov/42401677/) · [DOI](https://doi.org/10.1038/s41746-026-02959-x)

前瞻性实施评估,定制大语言模型部署于具身/对话式AI框架构建语音助手Sofiya,为心导管术前患者拨打准备电话(说明须知、采集临床数据、答疑或转接护士)。2025.1.16-7.17共1431例患者接1606通电话:第一阶段806通完成率逐步升至86.4%,第二阶段800通维持87.9%;AI系统错误从第一阶段48通(6.0%)降至第二阶段24通(2.6%)。

> **要点**：对话式LLM语音助手自动完成心导管术前准备电话(完成率约88%),让护士聚焦临床。


### 2. 大语言模型流水线改善外科试验摘要的可行性与影响

*Feasibility and impact of a large language model pipeline for surgical trial abstracts.*

**npj Digital Medicine** · 2026-05-26 · in silico三阶段评估研究 · [PMID 42191815](https://pubmed.ncbi.nlm.nih.gov/42191815/) · [DOI](https://doi.org/10.1038/s41746-026-02788-y)

in silico三阶段研究，纳入2005-2025年PubMed共651项外科RCT，用14项CONSORT评分表(满分25)，GPT-4o在非虚构约束下从全文重写摘要。原摘要完整度均值仅9.06/25，重写后提升7.40(250词)/8.06(300词)(均p<0.0001)，随机化、危害、注册等域均改善；评分表与专家一致性CCC 0.71、ICC 0.91。

> **要点**：受约束LLM流水线可大规模提升外科RCT摘要完整度(需人工监督)。


### 3. 大语言模型联合临床医生修订简化非英语手术知情同意书

*Evaluating large language models for simplifying non-English medical consent with clinician involvement.*

**npj Digital Medicine** · 2026-04-01 · 多版本对比评估研究（含专家评分与混合效应模型） · [PMID 41922537](https://pubmed.ncbi.nlm.nih.gov/41922537/) · [DOI](https://doi.org/10.1038/s41746-026-02591-9)

评估LLM能否简化中文手术知情同意书：取九家医院官方同意书生成原始、LLM简化、医生修订三版本，比较文本结构、可读性、内容质量与外行理解。LLM版提升可读性与理解但降低内容质量（尤其风险信息），医生修订恢复准确性并获最高理解分，线性混合效应模型证实上述趋势。

> **要点**：LLM简化手术同意书需医生把关以兼顾清晰与准确。


### 4. 大语言模型用于预测手术病例时长的适用性

*Suitability of Large Language Models and Predicting Case Duration.*

**JAMA Surgery** · 2026-03-01 · 来信/评论(无数据) · [PMID 41499138](https://pubmed.ncbi.nlm.nih.gov/41499138/) · [DOI](https://doi.org/10.1001/jamasurg.2025.5844)

来信/评论(无摘要、无数据)，探讨大语言模型(LLM)在预测手术病例时长(用于手术室排程与流程管理)方面的适用性。

> **要点**：对LLM预测手术病例时长适用性的探讨


### 5. 大语言模型用于预测手术病例时长的适用性——作者回复

*Suitability of Large Language Models and Predicting Case Duration-Reply.*

**JAMA Surgery** · 2026-03-01 · 作者回复(无数据) · [PMID 41499103](https://pubmed.ncbi.nlm.nih.gov/41499103/) · [DOI](https://doi.org/10.1001/jamasurg.2025.5847)

作者回复(无摘要、无数据)，回应关于大语言模型预测手术病例时长适用性的来信讨论。

> **要点**：作者就LLM预测手术病例时长适用性作出回应


### 6. 大语言模型用于阴道穹窿脱垂手术治疗的系统综述与荟萃分析

*Large language models in systematic review and meta-analysis of surgical treatments for vaginal vault prolapse.*

**npj Digital Medicine** · 2026-02-19 · LLM性能评估（PRISMA系统综述/荟萃） · [PMID 41714807](https://pubmed.ncbi.nlm.nih.gov/41714807/) · [DOI](https://doi.org/10.1038/s41746-026-02431-w)

评估ChatGPT在PRISMA指导下对阴道穹窿脱垂手术RCT做系统综述的表现：标题/摘要筛查召回69.8%、精确率85.7%(κ=0.77)，全文一致94.1-100%，数据提取准确87.5-99.7%。从18项RCT(1668名女性)得骶骨阴道固定优于骶棘固定(OR 1.42)、经阴道网片3年客观成功优于骶棘固定(OR 1.84, 95%CI 1.13-2.99)但再手术率更高；所有LLM统计结果与常规R分析一致。属LLM辅助外科证据合成，核心相关。

> **要点**：经验证的LLM工作流可高效完成外科证据合成。


### 7. 大语言模型简化前列腺癌病理报告的比较评估：ChatGPT与Gemini

*A comparative evaluation of large language models for simplifying prostate cancer pathology reports: ChatGPT and Gemini.*

**International Journal of Surgery** · 2026-02-03 · 双中心回顾性研究(LLM评测) · [PMID 41632012](https://pubmed.ncbi.nlm.nih.gov/41632012/) · [DOI](https://doi.org/10.1097/JS9.0000000000004454)

回顾性研究，纳入两中心228例前列腺癌病理报告（内部171、外部57），评估GPT-3.5/4.0/4o与Gemini的报告简化能力，含人工评分、可读性与BERT语义相似度。GPT-4o(Few-Shot)在病理医师评定的准确性与全面性最高，Gemini可理解性最佳；患者/临床医师可理解性各模型均高。提示LLM在病理报告简化与结构保真间存在权衡。

> **要点**：GPT-4o少样本简化前列腺癌病理报告综合最佳，Gemini更易懂。


### 8. 评“大语言模型能否辅助耐药癫痫术前致痫区定位？多源文本分析性能研究”

*Commentary on "Can large language models aid pre-surgical epileptogenic zone localization? A multi-source text analysis performance study in drug-resistant epilepsy".*

**International Journal of Surgery** · 2026-01-21 · 评论(无原始数据) · [PMID 41563393](https://pubmed.ncbi.nlm.nih.gov/41563393/) · [DOI](https://doi.org/10.1097/JS9.0000000000004811)

针对一项LLM辅助耐药癫痫术前致痫区定位(多源文本分析)研究的评论，无独立数据。涉及LLM用于癫痫外科术前决策。

> **要点**：关于LLM辅助癫痫术前致痫区定位的评论。


### 9. 微信端GPT-4人工智能助手用于骨科术后护理的随机对照试验

*A randomized controlled trial of a WeChat-based artificial intelligence agent for postoperative care in orthopedic patients.*

**npj Digital Medicine** · 2026-01-17 · 随机对照试验(ChiCTR2500101273) · [PMID 41548028](https://pubmed.ncbi.nlm.nih.gov/41548028/) · [DOI](https://doi.org/10.1038/s41746-025-02269-8)

RCT纳入261例骨科术后患者(AI组140、医生组121)，AI组用GPT-4微信助手提供实时情境化支持。AI响应更快(0.5±0.6 vs 358±47.5分钟,p小于0.05)、感知质量更高但准确率略低(93.9% vs 98.1%,p小于0.05)；1和3个月时AI组膝功能(IKDC)、躯体健康(PCS)与满意度更优(均p小于0.05)，6个月时组间无显著差异。支持LLM作为术后管理的补充。

> **要点**：GPT-4术后护理助手短期改善功能与体验，长期与医生持平。


### 10. 大语言模型用于术前与出院教育有效性的系统综述

*Effectiveness of large language models in preoperative and discharge education: a systematic review based on an evaluation framework.*

**npj Digital Medicine** · 2026-01-07 · 系统综述 · [PMID 41501337](https://pubmed.ncbi.nlm.nih.gov/41501337/) · [DOI](https://doi.org/10.1038/s41746-025-02302-w)

基于四维评价框架的系统综述，检索5个数据库至2025-04-18纳入20项研究。多数研究报告LLM在焦虑缓解与部分满意度维度有益，但在疼痛、康复及其他满意度维度与常规材料无显著差异；可信度与性能维度报告不足。指出需整合模型中心与患者中心评价以支持负责任部署。属LLM用于围手术期患者教育。

> **要点**：LLM术前/出院教育可缓解焦虑，但疼痛康复无显著获益。


### 11. 隐私保护可本地部署的大模型检测围手术期并发症：LoRA微调策略

*Enhancing privacy-preserving deployable large language models for perioperative complication detection: a targeted strategy with LoRA fine-tuning.*

**npj Digital Medicine** · 2025-12-13 · 双中心LLM微调+外部验证 · [PMID 41390570](https://pubmed.ncbi.nlm.nih.gov/41390570/) · [DOI](https://doi.org/10.1038/s41746-025-02139-3)

针对围手术期并发症人工检测存在27%漏报，提出提示工程+LoRA微调将小型开源LLM改造为专家级诊断工具，双中心验证、同时识别与分级22类并发症严重度。跨文档长度AI模型F1>0.64而人类从0.73降至0.45；外部验证中优化后4B模型micro-F1由0.28升至0.64（接近专家0.69），靶向策略ΔF1=0.256（95%CI 0.181-0.336）、LoRA ΔF1=0.103，8B模型F1>0.70超过专家。

> **要点**：LoRA微调小型LLM检测围手术期并发症，4B micro-F1 0.28→0.64、8B超过人类专家。


### 12. 大语言模型从非结构化病历检测术后谵妄的疗效：回顾性队列

*Efficacy of large language models in detecting postoperative delirium from unstructured clinical notes: A retrospective cohort study.*

**npj Digital Medicine** · 2025-12-12 · 回顾性观察队列（LLM vs 医师） · [PMID 41388138](https://pubmed.ncbi.nlm.nih.gov/41388138/) · [DOI](https://doi.org/10.1038/s41746-025-02231-8)

回顾性队列比较Llama-3-70B、GPT-4o与医师预测有临床意义的术后谵妄（POD）。两模型c统计量0.74与0.76；敏感度更高（0.900、0.868 vs 医师0.723）、特异度更低（0.463、0.547 vs 0.814）；评分者间一致近乎完美（Fleiss'κ 0.852、0.854 vs 医师0.219）；LLM较医师约提前1天检出（中位34.5 h、37.5 h vs 62.9 h，log-rank P<0.001）。可作医师监督下的早期筛查补充。

> **要点**：LLM从病历检测术后谵妄，敏感度更高并提前约1天（34.5 h vs 62.9 h）。


### 13. 大语言模型能否辅助耐药癫痫术前致痫区定位?多源文本分析性能研究

*Can large language models aid pre-surgical epileptogenic zone localization? A multi-source text analysis performance study in drug-resistant epilepsy.*

**International Journal of Surgery** · 2025-12-08 · 回顾性多队列LLM评估研究 · [PMID 41363150](https://pubmed.ncbi.nlm.nih.gov/41363150/) · [DOI](https://doi.org/10.1097/JS9.0000000000004435)

对154例(两队列、术后Engel I级)耐药癫痫,用三种LLM(GPT-4.1、Claude 3.7 Sonnet、DeepSeek-R1)从五类术前非结构化文本预测经手术验证的致痫区。侧别分类准确率队列1为98.3%、队列2为100%;脑叶定位GPT-4.1与Claude中位分70显著高于DeepSeek-R1的60(P<0.001);预测重测信度ICC=0.951。

> **要点**：LLM可从术前文本较准确推断经手术验证的致痫区,可作术前决策支持。


### 14. DeepSeek-R1对AAOS髋骨关节炎指南问题回答的质量评估

*Quality assessment of DeepSeek-R1's responses to guideline-related questions on hip osteoarthritis from AAOS.*

**International Journal of Surgery** · 2025-11-13 · LLM评测研究（问答质量） · [PMID 41231615](https://pubmed.ncbi.nlm.nih.gov/41231615/) · [DOI](https://doi.org/10.1097/JS9.0000000000004034)

基于2023 AAOS髋骨关节炎临床指南的17个开放问题、4类提示词评测DeepSeek-V3与R1。R1组在BERTScore与ROUGE-L上更优、能体现思维链推理，Flesch-Kincaid可读性显著高于V3（P<0.001）、指南提及率更高，但仍需12年级/大学新生阅读水平。

> **要点**：DeepSeek-R1回答骨科指南问题准确且可读性更佳，核心LLM。


### 15. 生成式大语言模型用于良性前列腺增生临床决策支持的真实世界可行性

*Real-world feasibility of generative large language models for clinical decision support in benign prostatic hyperplasia.*

**International Journal of Surgery** · 2025-11-12 · LLM评测研究（问答+病例） · [PMID 41231618](https://pubmed.ncbi.nlm.nih.gov/41231618/) · [DOI](https://doi.org/10.1097/JS9.0000000000004022)

以30道临床问题与6个真实BPH病例评估ChatGPT o1与DeepSeek R1，并与中国临床医师闭卷作答对比。两模型临床知识测评均优于医师组、两者间无显著差异，表现接近主治医师；决策支持方面DeepSeek R1在医学知识准确性与逻辑连贯性上优于ChatGPT o1。

> **要点**：LLM在BPH临床决策支持接近主治水平，核心LLM。


### 16. “共识的海市蜃楼”：反思外科专家panel中AI驱动的Delphi模拟——读者来信

*The mirage of consensus: rethinking AI-driven delphi simulations in surgical expert panels – letter to the editor*

**International Journal of Surgery** · 2025-11-11 · 读者来信/观点（无数据） · [DOI](https://doi.org/10.1097/js9.0000000000004069)

读者来信/观点（Letter），无原始数据，批判性反思在外科专家小组中以AI（大语言模型）驱动的Delphi共识模拟，指出其可能制造“共识的海市蜃楼”、并非真实专家共识。属生成式AI/LLM在外科决策与共识中的应用讨论。

> **要点**：质疑AI驱动Delphi模拟在外科共识中的有效性，属LLM外科应用讨论。


### 17. Delphi情境下AI与专家的比较：用大语言模型模拟医学共识

*How does AI compare to the experts in a Delphi setting: simulating medical consensus with large language models.*

**International Journal of Surgery** · 2025-10-15 · 方法学研究(多LLM改良Delphi比较) · [PMID 41092428](https://pubmed.ncbi.nlm.nih.gov/41092428/) · [DOI](https://doi.org/10.1097/JS9.0000000000003631)

用改良Delphi法让8个大语言模型(LLM)对国际肥胖与代谢病外科联合会(IFSO)2024 Delphi研究的135条陈述进行三轮评估。LLM总体共识率高于人类专家(93.3% vs 81.5%,P=0.002)，与专家结论一致度78.5%(专家已达共识者达91.8%)，共识率强正相关(Spearman rho=0.73,P<0.001)；各LLM在被说服(0-80.0%)与说服他人(0-63.6%)上差异大。基于肥胖/代谢外科共识陈述，属LLM＋外科主题。

> **要点**：多LLM可高度复现减重代谢外科专家共识(93.3% vs 81.5%)，倾向更保守的指南导向立场。


### 18. T1结直肠癌内镜切除后手术决策的指南依从性:大语言模型vs临床医生

*Guideline adherence in surgical decisions for T1 colorectal cancer after endoscopic resection: large language models vs clinicians.*

**International Journal of Surgery** · 2025-09-10 · 多中心回顾性对照研究 · [PMID 40928382](https://pubmed.ncbi.nlm.nih.gov/40928382/) · [DOI](https://doi.org/10.1097/JS9.0000000000003492)

多中心回顾性(3医院202例T1 CRC内镜切除)。比较ChatGPT-4o、DeepSeek与29名医生判断是否需追加手术;经提示工程(角色/情境/少样本学习),两款LLM在决定追加手术上显著优于医生,且不受医生年资/背景及中英文输入影响(临床指南依从率<80%)。

> **要点**：LLM在T1 CRC内镜切除后追加手术决策上优于临床医生,可提升指南依从。


### 19. 从算法到手术室:大语言模型能否通过中国麻醉主治医师考试?横断面评估

*From algorithms to operating room: can large language models master China's attending anesthesiology exam? A cross-sectional evaluation.*

**International Journal of Surgery** · 2025-09-04 · 横断面LLM基准评估 · [PMID 40905848](https://pubmed.ncbi.nlm.nih.gov/40905848/) · [DOI](https://doi.org/10.1097/JS9.0000000000003406)

横断面研究,用2025年CAAPE题库(5647题)评测GPT-3.5/GPT-4与DeepSeek-V3/R1。DeepSeek-R1(70.6-73.4%)与GPT-4(68.6-70.3%)显著优于GPT-3.5/DeepSeek-V3(约52-55%);系统角色提示提升表现,GPT英文优于中文;各模型在临床情景与高阶推理上薄弱,逾70%为逻辑/信息错误且过半为高危临床错误。

> **要点**：顶级LLM可达麻醉主治考试约七成正确率,但高危场景仍存关键错误风险。


### 20. 使用大语言模型增强手术说明书

*Enhanced Surgical Instructions Using Large Language Models.*

**JAMA Surgery** · 2025-08-13 · 横断面比较研究 · [PMID 40802263](https://pubmed.ncbi.nlm.nih.gov/40802263/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2825)

横断面研究，比较人类作者与聊天机器人(LLM)在简化术前及术后患者文档方面的能力。属大语言模型用于外科围手术期患者沟通/教育材料。

> **要点**：LLM可用于简化围手术期患者说明文档


### 21. GPT-4对比放射科医师在不同报告质量下的纵隔肿瘤分类：一项队列研究

*GPT-4 vs. radiologists: who advances mediastinal tumor classification better across report quality levels? a cohort study.*

**International Journal of Surgery** · 2025-08-08 · 多中心回顾性队列（LLM诊断性能对比） · [PMID 40788014](https://pubmed.ncbi.nlm.nih.gov/40788014/) · [DOI](https://doi.org/10.1097/JS9.0000000000003127)

回顾性队列，纳入五家三级医院1494例经CT与病理确诊的纵隔肿瘤。GPT-4从放射报告分类的总体准确率73.3%(95%CI 71.0–75.5)，与副高放射科医师相当(74.3%, P>0.05)；在低质量报告中优于副高(60.8% vs 51.1%, P<0.001)，诊断淋巴瘤更优(75.4% vs 60.4%, P<0.001)。纵隔肿瘤分型直接影响手术与否的决策。

> **要点**：GPT-4纵隔肿瘤分类准确率与副高放射科医师相当，低质量报告与淋巴瘤诊断更具优势。


### 22. 大语言模型用于外科工作流优化

*Large Language Models for Surgical Workflow Optimization.*

**JAMA Surgery** · 2025-08-01 · 评论(无数据) · [PMID 40632543](https://pubmed.ncbi.nlm.nih.gov/40632543/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2134)

评论文章(无摘要、无数据)，探讨大语言模型(LLM)在外科工作流程优化中的应用与前景。

> **要点**：对LLM用于外科工作流优化的评论性观点


### 23. 大语言模型在围手术期医学的临床与经济影响(随机交叉试验)

*Clinical and economic impact of a large language model in perioperative medicine: a randomized crossover trial.*

**npj Digital Medicine** · 2025-07-21 · 随机交叉试验 · [PMID 40691284](https://pubmed.ncbi.nlm.nih.gov/40691284/) · [DOI](https://doi.org/10.1038/s41746-025-01858-x)

随机交叉试验评估基于LLM的术前评估决策支持系统PEACH对新加坡总医院住院医师文书的影响。整体文书时间未显著缩短，但中等复杂患者(节省5.77分钟，p=0.010)与资深医师(4.6分钟，p=0.040)有获益；57.1%病例评估者更偏好PEACH文书，经济模型预计年省19.75万新元(约14.6万美元)。属围手术期LLM决策支持。

> **要点**：围手术期LLM可提升术前文书效率并具经济价值。


### 24. DeepSeek辅助LI-RADS分类：AI驱动的肝细胞癌诊断精准化

*DeepSeek-assisted LI-RADS classification: AI-driven precision in hepatocellular carcinoma diagnosis.*

**International Journal of Surgery** · 2025-06-20 · 回顾-前瞻诊断对比研究（LLM） · [PMID 40552875](https://pubmed.ncbi.nlm.nih.gov/40552875/) · [DOI](https://doi.org/10.1097/JS9.0000000000002763)

回顾-前瞻双阶段研究，分析426个肝脏病灶（回顾300、前瞻126）。DeepSeek-V3（DSV3）解析非结构化放射报告生成LI-RADS分类，在诊断困难类别显著优于初级放射科医生：LR-4（80.4% vs 46.2%）、LR-5（86.2% vs 66.7%，均P<0.05），并达到与高级医生相当水平，中英文输入表现一致。LI-RADS分类服务HCC治疗（含手术/移植/消融）决策。

> **要点**：DeepSeek-V3辅助LI-RADS分类，达高级放射科医生水平。


### 25. 乳腺外科CPT编码的开放架构AI模型：开发、验证与前瞻测试

*An Open-architecture AI Model for CPT Coding in Breast Surgery: Development, Validation, and Prospective Testing.*

**Annals of Surgery** · 2025-06-16 · 开发+验证+前瞻测试(临床语言模型) · [PMID 40518998](https://pubmed.ncbi.nlm.nih.gov/40518998/) · [DOI](https://doi.org/10.1097/SLA.0000000000006793)

纳入2017-2023年3259份乳腺外科手术记录(8036个CPT码)，用预训练临床语言模型GatorTron(3.45亿与39亿参数)微调，从自由文本手术记录抽取CPT编码。交叉验证AUPRC 0.976(小)/0.981(大)，优于外科医生(0.937,编码差异12%)；2024年268份前瞻测试证实真实表现。

> **要点**：开放架构临床语言模型自动从乳腺手术记录抽取CPT编码，准确率超过外科医生。


### 26. 多模态大语言模型在喉癌手术中的应用——迈向精准但挑战犹存

*Harnessing multimodal large language models in laryngeal cancer surgery - a step toward precision but with challenges ahead.*

**International Journal of Surgery** · 2025-05-16 · 评论/观点（无数据） · [PMID 40387726](https://pubmed.ncbi.nlm.nih.gov/40387726/) · [DOI](https://doi.org/10.1097/JS9.0000000000002503)

评论/观点类文章，探讨多模态大语言模型（multimodal LLM）在喉癌手术中的潜在应用，认为其有助于走向精准外科，但在可靠性与临床落地方面仍面临挑战。无原始数据。

> **要点**：多模态LLM为喉癌外科精准化带来机遇，但落地挑战需正视。


### 27. AI讲解胃癌手术：可读性与可靠性的权衡

*AI explains gastric cancer surgery: readability versus reliability.*

**International Journal of Surgery** · 2025-05-16 · LLM输出质量评估（摘要缺失） · [PMID 40387693](https://pubmed.ncbi.nlm.nih.gov/40387693/) · [DOI](https://doi.org/10.1097/JS9.0000000000002440)

评估生成式AI/LLM在向患者解释胃癌手术相关信息时的表现，聚焦可读性（readability）与可靠性（reliability）之间的矛盾。（仅标题、无摘要，具体评分未获取。）

> **要点**：AI科普胃癌手术信息易读但可靠性存疑，需谨慎。



## 十二、外科教育、培训与模拟（9 篇）

### 1. 面向医学临床技能培训的智能评估系统

*Development and application of an intelligent assessment system for medical clinical skill training.*

**npj Digital Medicine** · 2026-06-10 · 深度学习(对比学习)系统开发与验证 · [PMID 42271165](https://pubmed.ncbi.nlm.nih.gov/42271165/) · [DOI](https://doi.org/10.1038/s41746-026-02877-y)

引入对比学习构建标准统一、过程可视、评价客观的临床技能评估系统，用于自主教学与自动化评估。实践验证显示模型能有效区分特定外科操作的熟练度水平，最优参数下某操作预测峰值准确率94.01%，允许一分容差时提升至96.41%，并提供即时表现反馈。

> **要点**：对比学习实现外科技能训练的客观自动评估，准确率达94%。


### 2. AI驱动的腹腔镜培训定性技能评估：前瞻观察研究

*AI-driven qualitative skill assessment in laparoscopic training: a prospective observational study.*

**npj Digital Medicine** · 2026-05-20 · 前瞻性观察研究 · [PMID 42162259](https://pubmed.ncbi.nlm.nih.gov/42162259/) · [DOI](https://doi.org/10.1038/s41746-026-02770-8)

前瞻观察研究(2024达沃斯外科课程)，50名初级外科住院医师在猪模型上行腹腔镜胆囊切除，视频经专家与AI模型按GOALS评估。AI总分测试-重测信度ICC 0.91，与专家评分一致性ICC 0.92，各维度良至优、偏倚极小。

> **要点**：AI视频分析可靠再现专家级腹腔镜技能定性评估，助力可扩展外科培训。


### 3. 用整合式合成数据赋能外科医生应对复杂临床场景（观点）

*Empowering surgeons with integrated synthetic data: solutions for mastering complex clinical scenarios.*

**npj Digital Medicine** · 2026-04-30 · 观点/综述（Perspective） · [PMID 42062460](https://pubmed.ncbi.nlm.nih.gov/42062460/) · [DOI](https://doi.org/10.1038/s41746-026-02660-z)

观点/综述文章，探讨合成数据在外科的三大应用：训练外科医生与AI的视觉数据合成、用于技能与机器人的手术仿真、用于个体化手术规划的数字孪生。主张合成数据须超越常规、覆盖非典型解剖与术中并发症等高风险场景。无量化数据。

> **要点**：合成数据整合以变革外科培训与手术AI全流程。


### 4. 用于合成手术培训视频的生成式AI

*Generative AI for synthetic surgical training videos.*

**British Journal of Surgery** · 2026-03-04 · 评论/短文(无数据) · [PMID 41746193](https://pubmed.ncbi.nlm.nih.gov/41746193/) · [DOI](https://doi.org/10.1093/bjs/znag017)

短文/评论(无摘要),主题为利用生成式人工智能(generative AI)生成合成手术培训视频,以扩展外科教育与技能训练资源。

> **要点**：生成式AI可合成手术培训视频,拓展外科教育资源


### 5. AI增强的显微外科培训：系统综述

*Artificial intelligence-enhanced microsurgical training: a systematic review.*

**npj Digital Medicine** · 2026-02-20 · 系统综述（PRISMA/GRADE） · [PMID 41721012](https://pubmed.ncbi.nlm.nih.gov/41721012/) · [DOI](https://doi.org/10.1038/s41746-026-02452-5)

遵循PRISMA系统综述AI增强显微外科培训疗效，从2056条记录纳入13项研究(3-50名参与者，多为单中心)。所用模型含Mask R-CNN、YOLOv2、ResNet-50等，主要用于评估或引导，聚焦器械追踪(30.8%)、运动分析(23.1%)，中位准确率83.8%(IQR 78.4-88.2%)；AI经实时反馈改善技能与学习曲线，但证据异质、质量低、外部验证差。属外科教育，核心相关。

> **要点**：AI以客观指标增强显微外科培训，但证据质量低。


### 6. 需要智能、以人为中心的交付以最大化AI价值

*Intelligent, Human-Centric Delivery Is Needed to Maximize AI.*

**JAMA Surgery** · 2025-09-01 · 评论(无数据) · [PMID 40768222](https://pubmed.ncbi.nlm.nih.gov/40768222/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2550)

评论文章(无摘要、无数据)，针对AI增强外科训练研究提出评论，强调需以人为中心的智能交付方式才能最大化AI在外科培训中的价值。

> **要点**：以人为中心的交付是发挥外科AI培训价值的关键


### 7. AI增强的人类指导与手术模拟表现：一项随机对照试验

*Artificial Intelligence-Augmented Human Instruction and Surgical Simulation Performance: A Randomized Clinical Trial.*

**JAMA Surgery** · 2025-09-01 · 单盲随机对照试验(外科模拟培训) · [PMID 40768205](https://pubmed.ncbi.nlm.nih.gov/40768205/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2564)

单盲随机对照试验，87名无VR模拟经验的医学生随机分3组：仅智能导师(对照，n=30)、与导师措辞相同的专家反馈(n=29)、AI数据驱动的个体化专家反馈(n=28)。以AI计算的综合专业度评分(-1至1)为主要结局，第3组显著优于对照组(第5次操作均差0.26，P=.01；真实情景任务均差0.20，P=.02)及在出血/损伤风险等指标上更优。

> **要点**：AI驱动的个体化专家指导比单纯智能导师更能提升手术技能与迁移


### 8. 人工智能增强的外科带教(coaching)模式：SmartCoach用于腹腔镜胰十二指肠切除

*An artificial intelligence-enhanced coaching mode.*

**International Journal of Surgery** · 2025-06-23 · 概念论述/描述性研究（含初步问卷） · [PMID 40549435](https://pubmed.ncbi.nlm.nih.gov/40549435/) · [DOI](https://doi.org/10.1097/JS9.0000000000002713)

介绍SmartCoach——一套基于计算机视觉(CV)的AI辅助手术带教系统，面向技术要求极高的腹腔镜胰十二指肠切除，提供术中实时评估、手术步骤自动识别与结构化术后复盘，并借5G实现规模化。初步问卷显示外科医生对手术带教理念与AI角色认知有限、常用手术视频学习但缺乏专家反馈。为概念/描述性论述，无硬性精度指标。

> **要点**：CV驱动的AI外科带教系统SmartCoach，实现自动步骤识别与实时反馈。


### 9. 普通外科Milestones评估对毕业后执业结局的预测价值

*The Predictive Performance of General Surgery Milestones on Postgraduation Outcomes.*

**Annals of Surgery** · 2024-07-25 · 回顾性队列+机器学习预测建模 · [PMID 39051106](https://pubmed.ncbi.nlm.nih.gov/39051106/) · [DOI](https://doi.org/10.1097/SLA.0000000000006457)

回顾队列纳入278名外科医生,用弹性网(elastic net)机器学习模型纳入120项Milestones特征预测风险校正后的患者死亡/严重并发症。Patient Care、职业精神、系统实践域最具预测力;结局较差者Patient Care 3评分显著更低(2.86 vs 3.04,P=0.011),信号见于毕业前12-18个月。

> **要点**：毕业前特定Milestones(术中技能/伦理/患者安全)可预测独立执业后患者结局



## 十三、治理、监管、伦理与评价/基准方法（37 篇）

### 1. 实体器官移植中AI工具的临床试验与评估:对临床、监管科学与罕见病的启示(观点)

*Clinical trials and evaluation of AI tools in solid organ transplantation: implications for clinical care, regulatory science, and rare diseases.*

**npj Digital Medicine** · 2026-07-07 · 观点/综述 · [PMID 42414473](https://pubmed.ncbi.nlm.nih.gov/42414473/) · [DOI](https://doi.org/10.1038/s41746-026-02963-1)

观点/综述(无原始数据),梳理AI在实体器官移植(SOT)从器官分配到移植后管理全流程的应用,指出仅少数经过临床试验检验,识别证据缺口并展望AI工具临床试验与监管评估的未来方向。

> **要点**：观点文章,呼吁加强移植AI工具的临床试验与监管评估。


### 2. 用人工智能从数字化组织病理切片预测新辅助治疗应答:一项系统综述

*Predicting response to neoadjuvant therapy using artificial intelligence on digitized histopathology slides: a systematic review.*

**npj Digital Medicine** · 2026-07-03 · 系统综述 · [PMID 42399484](https://pubmed.ncbi.nlm.nih.gov/42399484/) · [DOI](https://doi.org/10.1038/s41746-026-02947-1)

系统综述(遵循PRISMA、QUADAS-2),首次评估从实体瘤HE染色活检切片预测新辅助治疗(NAT)应答的AI模型。235篇中25篇纳入,多数报告AUC 0.70-0.90,约40%含外部验证队列;结论认为AI在病理切片预测NAT应答上有前景,但需标准化数据采集、患者层面验证与数据/代码透明。

> **要点**：系统综述:数字病理AI预测新辅助治疗应答AUC多为0.70-0.90,但需更规范验证。


### 3. 手术AI研究的门诊手术中心悖论：60%手术发生地仅占2%的AI研究

*The Ambulatory Surgery Center Paradox: Why 60% of Surgeries Occur Where 2% of AI Research Happens.*

**Annals of Surgery** · 2026-06-30 · 范围综述/文献计量 · [PMID 42374614](https://pubmed.ncbi.nlm.nih.gov/42374614/) · [DOI](https://doi.org/10.1097/SLA.0000000000007143)

范围综述(scoping review)，检索PubMed/Scopus/Web of Science/Cochrane 2020年1月至2025年9月关于门诊手术中心(ASC)AI/机器学习应用的定量研究。门诊手术中心承担美国约60%的6000万例择期手术，但筛查847篇后仅不足10篇针对ASC，而同期医院场景研究超过500篇；现有ASC研究集中于工作流预测分析，无一涉及术中AI。揭示ASC手术量与ASC专属AI研究间存在巨大证据鸿沟。

> **要点**：占60%手术量的门诊手术中心几乎是外科AI研究空白区，亟需针对性验证。


### 4. 超越黑箱：STAS预测模型的可解释性危机与临床转化鸿沟

*Beyond the “Black Box”: the crisis of interpretability and the gap in clinical translation of the STAS prediction model*

**International Journal of Surgery** · 2026-06-02 · 评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005150)

评论文章(无摘要、无数据)，聚焦肺癌气腔播散(STAS)预测模型的可解释性危机及其临床转化差距。STAS状态直接影响肺癌切除范围决策，文章呼吁提升模型可解释性以弥合临床应用鸿沟。

> **要点**：STAS预测模型须突破可解释性瓶颈方能真正指导手术决策


### 5. 为何外科医生必须主导外科人工智能的治理

*Why Surgeons Must Lead the Governance of Surgical Artificial Intelligence.*

**JAMA Surgery** · 2026-06-01 · 观点(无数据) · [PMID 42054044](https://pubmed.ncbi.nlm.nih.gov/42054044/) · [DOI](https://doi.org/10.1001/jamasurg.2026.1109)

观点文章，论述外科医生在制定自主外科系统的政策、规则与实践规范中发挥领导作用的重要性，并勾勒初步治理路线图。无量化数据。

> **要点**：外科医生应主导自主外科AI系统的治理


### 6. 优化手术AI落地：手术室基础设施与部署建议

*Optimizing AI implementation for surgery: recommendations for infrastructure and deployment in the operating room.*

**npj Digital Medicine** · 2026-05-20 · 多站点实施科学/可用性研究 · [PMID 42162215](https://pubmed.ncbi.nlm.nih.gov/42162215/) · [DOI](https://doi.org/10.1038/s41746-026-02763-7)

多站点实施科学研究，评估手术室内AI部署(云vs边缘)在可用性、成本、碳足迹三域的影响，23名终端用户(外科医师/住院医/进修医/手术护士)参与、累计使用396小时。云端任务完成度更高但体力负担、碳排、成本更高，两系统可用性相近；给出以用户为中心、可持续的手术AI部署建议。

> **要点**：手术室AI云/边部署的可用性-成本-碳足迹权衡与落地建议。


### 7. 外科AI设备的全球监管：美、欧、英、中跨境兼容性评估

*Global regulation of surgical AI devices: assessing cross-border compatibility in the United States, Europe, United Kingdom, and China*

**International Journal of Surgery** · 2026-05-07 · 监管政策比较分析(综述) · [DOI](https://doi.org/10.1097/js9.0000000000005378)

综述/政策分析文章，比较美国、欧盟、英国、中国对外科AI设备(涵盖术前风险分层与规划、术中导航与计算机视觉、术后监测)的监管框架。指出各司法辖区均采风险分级范式，但在分类阈值、审批路径、临床证据要求与上市速度上差异显著(如FDA 510(k)快速但存在predicate creep，欧盟MDR叠加AI法案，英国AI Airlock沙盒，中国NMPA多归为高风险)。

> **要点**：外科AI跨境监管差异大，需加强透明度与国际协作以保障患者安全


### 8. AI与数字标准时代的大语言外科

*Large language surgery in the era of AI and digital standards*

**International Journal of Surgery** · 2026-04-29 · 叙述性综述(无量化数据) · [DOI](https://doi.org/10.1097/js9.0000000000005360)

叙述性综述，沿从研究到实践的转化连续谱梳理AI在外科路径各环节的整合，包括影像与手术视频的计算机视觉、围手术期风险与结局预测建模，以及生成临床数据的大语言模型。强调标准生态可提升外科AI证据的透明度、可重复性与可解释性，并指出生成式系统因输出变异、幻觉与快速迭代需额外审慎。

> **要点**：以生命周期、标准引领的路径推动外科AI更安全有效的临床采用


### 9. 评论：人工智能在消化内镜应用中的临床试验版图

*Comment on the clinical trial landscape of artificial intelligence applications in gastrointestinal endoscopy*

**International Journal of Surgery** · 2026-04-20 · 评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005098)

评论文章(无摘要、无数据)，针对AI在消化内镜(GI endoscopy)应用的临床试验现状与证据版图展开讨论。内镜为介入性操作，属手术加AI主题范畴的评价性评论。

> **要点**：对消化内镜AI临床试验证据版图的评论性观点


### 10. 结肠镜中计算机辅助检测(CADe)结肠息肉降低癌症相关医疗费用：新加坡单中心成本效益分析

*Computer-Assisted Detection (CADe) of colonic polyps during colonoscopy reduces cancer-related healthcare costs – a single Singaporean institution cost effectiveness analysis*

**International Journal of Surgery** · 2026-04-20 · 成本效益分析(决策树模型) · [DOI](https://doi.org/10.1097/js9.0000000000005080)

成本效益分析，评估GI Genius CADx智能内镜模块在新加坡三级公立医院筛查性结肠镜中的经济性。采用决策树模型计算增量成本效益比(ICER)，结果ICER为0.72，提示AI辅助结肠镜具成本效益；各亚组质量调整生命年(QALY)亦显示AI辅助组生活质量改善。

> **要点**：AI辅助结肠镜具成本效益并改善患者生活质量


### 11. 苦涩的教训及其对外科人工智能的启示

*The Bitter Lesson and its Implications for Surgical Artificial Intelligence.*

**Annals of Surgery** · 2026-03-26 · 评论/观点 · [PMID 41881839](https://pubmed.ncbi.nlm.nih.gov/41881839/) · [DOI](https://doi.org/10.1097/SLA.0000000000007054)

评论/观点类文章(无摘要)，借用AI领域The Bitter Lesson(算力与通用学习方法终将胜过人工设计特征)反思外科AI的发展路径，主张外科AI应拥抱可扩展的数据与计算驱动方法。属方法论观点、无数据。

> **要点**：外科AI应顺应苦涩教训，倚重数据与算力驱动的通用方法而非手工特征。


### 12. AI与医疗专业人员在外科与介入视频分析中的表现比较：系统综述与荟萃分析

*Comparing artificial intelligence and healthcare professional performance in surgical and interventional video analysis: a systematic review and meta-analysis.*

**npj Digital Medicine** · 2026-03-06 · 系统综述与荟萃分析 · [PMID 41786868](https://pubmed.ncbi.nlm.nih.gov/41786868/) · [DOI](https://doi.org/10.1038/s41746-026-02401-2)

系统综述从37,956项研究纳入146项、76项入荟萃，量化AI、无辅助医务人员与AI辅助医务人员在外科/介入视频分析的表现。AI较无辅助人员敏感度更高(RR 1.12, 95%CI 1.07-1.19, p<0.001)、特异度相当(RR 1.04, p=0.224)；AI辅助较无辅助在各水平敏感度(RR 1.18)与特异度(RR 1.05)均更高；AI辅助专家与AI单独无显著差异。属外科AI评价荟萃分析，核心相关。

> **要点**：AI辅助显著提升外科/介入视频分析的敏感度与特异度。


### 13. 术中人工智能干预的期望与现实(OR Black Box)

*Expectations vs Reality of an Intraoperative Artificial Intelligence Intervention.*

**JAMA Surgery** · 2026-03-01 · 多中心定性研究(实施科学) · [PMID 41533394](https://pubmed.ncbi.nlm.nih.gov/41533394/) · [DOI](https://doi.org/10.1001/jamasurg.2025.6029)

定性研究，在3家大型学术中心对30名外科医生与17名实施负责人进行半结构化访谈，评估手术室黑箱(OR Black Box)这一术中AI干预的期望与真实效果差距。识别出4大主题：模型需大量额外训练、病例数据获取困难耗时、预测术后并发症能力有限、学术产出少。多数外科医生(57%)持中立态度。

> **要点**：术中AI落地需弥合外科医生期望与实际交付之间的差距


### 14. 抢先化解外科AI的幻灭低谷

*Preempting the Trough of Disillusionment in Surgical AI.*

**JAMA Surgery** · 2026-03-01 · 评论(无数据) · [PMID 41533360](https://pubmed.ncbi.nlm.nih.gov/41533360/) · [DOI](https://doi.org/10.1001/jamasurg.2025.6035)

评论文章(无摘要、无数据)，就外科AI在技术成熟度曲线中幻灭低谷的风险提出预警与观点，呼吁理性看待外科AI的炒作与落地。

> **要点**：应主动预防外科AI陷入期望幻灭低谷


### 15. 机器人手术从基于结局的验证走向数据驱动的评价

*From outcome-based validation to data-driven evaluation in robotic surgery.*

**International Journal of Surgery** · 2026-02-23 · 观点/评论（无数据） · [PMID 41729691](https://pubmed.ncbi.nlm.nih.gov/41729691/) · [DOI](https://doi.org/10.1097/JS9.0000000000004961)

观点/评论类文章，主张机器人手术评价范式应从传统的基于结局验证转向数据驱动（data-driven）评价方法。无原始数据。

> **要点**：倡导用数据驱动方法评价机器人手术。


### 16. 计算机视觉在血管外科中的应用：系统综述与批判性评价

*Computer vision applications in vascular surgery: a systematic review and critical appraisal.*

**npj Digital Medicine** · 2026-02-18 · 系统综述与批判性评价(PROBAST/TRIPOD+AI) · [PMID 41708923](https://pubmed.ncbi.nlm.nih.gov/41708923/) · [DOI](https://doi.org/10.1038/s41746-026-02427-6)

系统综述加批判性评价纳入288项计算机视觉用于血管外科的研究(2017年后指数增长)，主要涉及主动脉病变(33%)、颈动脉狭窄(30%)、足部溃疡(25%)，多为回顾性观察(81%)；最常报告Dice(51%)与准确率(36%)，AUROC仅17%；仅15%低偏倚风险，TRIPOD+AI依从性57%。属外科AI综述与方法学评价，核心相关。

> **要点**：血管外科CV研究快速增长但偏倚风险高、报告欠规范。


### 17. 就“机器学习预测结直肠手术后并发症作用的系统综述与meta分析”致编辑的来信

*Letter to editor on "Systematic review and meta-analysis of the role of machine learning in predicting postoperative complications following colorectal surgery: how far has machine learning come?".*

**International Journal of Surgery** · 2026-01-26 · 来信(无原始数据) · [PMID 41586587](https://pubmed.ncbi.nlm.nih.gov/41586587/) · [DOI](https://doi.org/10.1097/JS9.0000000000004803)

针对一项评估ML预测结直肠手术后并发症作用的系统综述与meta分析的来信评论，无独立数据。属外科AI证据评价/系统综述的学术讨论。

> **要点**：关于ML预测结直肠术后并发症系统综述的来信。


### 18. 应对AI用于组织病理生长模式分类临床落地的实际挑战

*Navigating practical challenges in the clinical deployment of AI for histopathological growth pattern classification.*

**International Journal of Surgery** · 2026-01-26 · 观点/评论(无原始数据) · [PMID 41586582](https://pubmed.ncbi.nlm.nih.gov/41586582/) · [DOI](https://doi.org/10.1097/JS9.0000000000004724)

观点/评论文章，讨论AI用于组织病理生长模式(如肝转移HGP)分类在临床部署中的实际挑战。无定量数据，属外科病理AI落地与治理层面的讨论。

> **要点**：论AI组织病理生长模式分类的临床部署挑战。


### 19. 机器学习预测胆囊癌转移中的一项关键方法学考量

*A critical methodological consideration in machine learning for predicting gallbladder cancer metastasis.*

**International Journal of Surgery** · 2026-01-21 · 方法学评论(无原始数据) · [PMID 41563356](https://pubmed.ncbi.nlm.nih.gov/41563356/) · [DOI](https://doi.org/10.1097/JS9.0000000000004923)

针对一项ML预测胆囊癌转移研究的方法学评论，指出建模关键问题，无独立数据。属外科肿瘤AI建模的方法学评价。

> **要点**：就ML预测胆囊癌转移提出方法学考量。


### 20. 负责任地发展外科人工智能

*Responsible Development of Artificial Intelligence in Surgery.*

**JAMA Surgery** · 2026-01-01 · 观点(无数据) · [PMID 41191350](https://pubmed.ncbi.nlm.nih.gov/41191350/) · [DOI](https://doi.org/10.1001/jamasurg.2025.4806)

观点文章，呼吁采取行动确保外科AI的使用遵循与外科实践相同的安全与透明伦理原则。无量化数据。

> **要点**：外科AI须坚守安全与透明的伦理原则


### 21. 为何欧盟亟需制定安全落地手术AI的指南

*Why the European Union urgently needs guidelines for the safe implementation of artificial intelligence in surgery.*

**British Journal of Surgery** · 2025-12-24 · 社论/观点(无数据) · [PMID 41604495](https://pubmed.ncbi.nlm.nih.gov/41604495/) · [DOI](https://doi.org/10.1093/bjs/znaf298)

社论/观点文(无摘要),论述欧盟亟需为人工智能在外科中的安全实施制定监管指南,聚焦手术AI的治理、监管与合规。

> **要点**：呼吁欧盟出台手术AI安全实施指南,填补监管空白


### 22. 手术场景理解人工智能的系统综述与报告质量荟萃分析

*Artificial intelligence for surgical scene understanding: a systematic review and reporting quality meta-analysis.*

**npj Digital Medicine** · 2025-12-17 · 系统综述+荟萃分析（外科AI） · [PMID 41407878](https://pubmed.ncbi.nlm.nih.gov/41407878/) · [DOI](https://doi.org/10.1038/s41746-025-02227-4)

系统综述+报告质量荟萃分析（PROSPERO CRD420251005301），评估微创腹部手术的手术场景理解（SSU）AI。纳入188项研究，70.7%依赖小样本单中心数据、59.0%为腹腔镜胆囊切除；外部验证仅10.1%、涉及临床转化5.9%、代码开放29.8%、性能变异估计38.3%。指出过去十年临床整合进展有限，呼吁多机构数据、稳健验证与临床驱动开发。

> **要点**：188项手术场景理解AI研究，验证薄弱、临床转化<6%、代码开放<30%。


### 23. AI诊断胎盘植入谱系疾病及预测不良妊娠结局：诊断准确性系统综述与荟萃分析

*Artificial Intelligence (AI) in the diagnosis and prediction of adverse pregnancy outcomes for Placenta Accreta Spectrum Disorders (PAS): a systematic review and meta-analysis of diagnostic accuracy.*

**International Journal of Surgery** · 2025-12-16 · 系统综述与荟萃分析（诊断准确性） · [PMID 41405278](https://pubmed.ncbi.nlm.nih.gov/41405278/) · [DOI](https://doi.org/10.1097/JS9.0000000000004443)

系统综述与荟萃分析纳入16项研究4457例；AI诊断胎盘植入谱系（PAS）合并敏感度88%、特异度88%、AUC 0.94；预测大出血/子宫切除等不良妊娠结局敏感度80%、特异度86%、AUC 0.87；QUADAS-2评价质量，研究设计为主要异质性来源。PAS常需剖宫产/子宫切除等外科处理，属外科AI主题的证据合成。

> **要点**：Meta证据显示AI高准确诊断PAS并预测需外科处理的不良结局。


### 24. AI纳入诊疗标准对患者知情同意的法律影响：来自外科的启示

*Legal implications of AI standard of care integration on patients' informed consent: lessons from surgery.*

**npj Digital Medicine** · 2025-12-13 · 观点/法律评述（Perspective/Review） · [PMID 41390878](https://pubmed.ncbi.nlm.nih.gov/41390878/) · [DOI](https://doi.org/10.1038/s41746-025-02157-1)

观点/综述类（无数据）：探讨AI融入临床带来的法律与伦理问题，借鉴既往评估新型外科技术使用/可及性与知情同意的判例，为AI整合过渡期如何影响知情同意提供借鉴。核心观点是AI的采纳与外科技术创新有可类比的知情同意演进路径。

> **要点**：借外科技术判例论述AI时代知情同意，属外科AI治理/伦理观点。


### 25. 人工智能模型预测胰腺导管腺癌肝转移的诊断效能:系统综述与荟萃分析

*Diagnostic performance of artificial intelligence models in predicting liver metastasis in pancreatic ductal adenocarcinoma (PDAC): a systematic review and meta-analysis.*

**International Journal of Surgery** · 2025-12-10 · 系统综述与荟萃分析(PRISMA-DTA) · [PMID 41376499](https://pubmed.ncbi.nlm.nih.gov/41376499/) · [DOI](https://doi.org/10.1097/JS9.0000000000004425)

遵循PRISMA-DTA的系统综述与荟萃分析,纳入10项研究、其中6项(9,887例)可合并。AI模型术前预测PDAC肝转移的合并AUC 0.86(95%CI 0.83-0.89),敏感度0.78,特异度0.80;样本量越大效能越好(P=0.0471),未见发表偏倚。旨在优化术前分层、减少无谓手术。

> **要点**：AI术前预测PDAC肝转移效能稳健(AUC 0.86),可减少无谓切除。


### 26. 人工智能在急诊外科中的应用:前景、陷阱与前行路径(范围综述)

*A scoping review of artificial intelligence in acute care surgery: promise, pitfalls, and a path forward.*

**International Journal of Surgery** · 2025-11-25 · 范围综述(scoping review) · [PMID 41706695](https://pubmed.ncbi.nlm.nih.gov/41706695/) · [DOI](https://doi.org/10.1097/JS9.0000000000003794)

范围综述纳入49项研究、341个AI模型评估急诊外科(ACS)AI应用。69.5%来自北美,76.5%针对术前预后任务,91.5%用结构化EHR;仅20.2%有外部验证、3.2%公平性评估、0.2%监管审批。模型敏感度71.3±24.2%、特异度81.5±18.7%、AUROC 0.83±0.11。呼吁前瞻验证、实时预测与多模态整合。

> **要点**：急诊外科AI多聚焦术前风险预测且外部验证不足,亟需前瞻与多模态推进


### 27. 构建有影响力的外科人工智能：一种外科式方法（评论）

*A surgical approach to building impactful artificial intelligence.*

**npj Digital Medicine** · 2025-11-21 · 评论/观点（Commentary/Review） · [PMID 41272076](https://pubmed.ncbi.nlm.nih.gov/41272076/) · [DOI](https://doi.org/10.1038/s41746-025-02073-4)

评论/综述类（无数据）：基于两项外科AI视频分析研究呈现的分歧结局，指出即便均因AI辅助提升准确率，用户专长与AI可解释性带来的信任与透明度差异关键地塑造了实际影响。主张以信任、可用性、可解释性等人机交互因素与结构化评估框架保障AI安全有效融入外科实践。

> **要点**：外科AI落地关键在信任与可解释性，呼吁结构化评估框架。


### 28. 弥合鸿沟:揭示外科采纳人工智能面临的隐性挑战

*Bridging the gap: exposing the hidden challenges towards adoption of artificial intelligence in surgery.*

**British Journal of Surgery** · 2025-11-06 · 评论/观点(无数据) · [PMID 41206573](https://pubmed.ncbi.nlm.nih.gov/41206573/) · [DOI](https://doi.org/10.1093/bjs/znaf217)

评论/观点文(无摘要),剖析人工智能在外科落地应用中被忽视的隐性障碍与挑战,探讨推动手术AI临床采纳的路径,属外科AI治理/评价议题。

> **要点**：指出手术AI临床采纳的隐性壁垒,呼吁针对性应对


### 29. 从像素到实践:将深度学习框架推向外科的临床转化(通讯)

*From pixels to practice: extending deep learning frameworks toward clinical translation in surgery (correspondence).*

**International Journal of Surgery** · 2025-10-13 · 通讯/观点(无数据) · [PMID 41085664](https://pubmed.ncbi.nlm.nih.gov/41085664/) · [DOI](https://doi.org/10.1097/JS9.0000000000003642)

通讯/观点文章(无摘要数据)，探讨如何将深度学习框架从研究推向外科临床转化(clinical translation)，属外科AI的评价/治理与转化主题。

> **要点**：讨论外科深度学习框架临床转化的路径与挑战。


### 30. SHAP与临床友好解释对临床决策行为影响的比较

*Comparison of SHAP and clinician friendly explanations reveals effects on clinical decision behaviour.*

**npj Digital Medicine** · 2025-09-26 · 交叉平衡设计的人因评价研究 · [PMID 41006498](https://pubmed.ncbi.nlm.nih.gov/41006498/) · [DOI](https://doi.org/10.1038/s41746-025-01958-8)

在术前需开血制品的63名外科与内科医师中，采用平衡设计比较三种CDSS解释方式(仅结果、结果加SHAP、临床解释)对6个情景决策的影响。发现提供临床解释比仅结果或结果加SHAP更能提升医师接受度，且信任、满意度与可用性均与接受度相关。属外科AI解释方法评价研究。

> **要点**：临床式解释比SHAP更能提升外科医师对AI的接受度。


### 31. 深度学习的前景：为多模态AI在肺癌精准外科中的临床转化指明方向（述评）

*Deep learning horizons: charting a course for clinical translation of multimodal AI in lung cancer precision surgery.*

**International Journal of Surgery** · 2025-08-07 · 述评/观点（无数据） · [PMID 40793836](https://pubmed.ncbi.nlm.nih.gov/40793836/) · [DOI](https://doi.org/10.1097/JS9.0000000000003182)

述评/观点文章，无原始数据。探讨多模态深度学习/AI在肺癌精准外科(precision surgery)中的临床转化路径、挑战与未来方向。

> **要点**：展望多模态AI在肺癌精准外科临床转化的路径与前景。


### 32. 人工智能辅助结直肠癌肝转移诊疗是未来的前景与方向（述评）

*Artificial intelligence assisted diagnosis and treatment of colorectal liver metastasis is the future prospect and direction.*

**International Journal of Surgery** · 2025-08-06 · 述评/观点（无数据） · [PMID 40793852](https://pubmed.ncbi.nlm.nih.gov/40793852/) · [DOI](https://doi.org/10.1097/JS9.0000000000003173)

述评/观点文章，无原始数据。阐述人工智能在结直肠癌肝转移(CRLM，常需手术切除/消融治疗)诊断与治疗中的应用前景与发展方向。

> **要点**：展望AI在结直肠癌肝转移外科诊疗中的应用方向。


### 33. 应用人工智能：下一个前沿

*Applied Artificial Intelligence: The Next Frontier.*

**Annals of Surgery** · 2025-08-06 · 社论/评论 · [PMID 40767572](https://pubmed.ncbi.nlm.nih.gov/40767572/) · [DOI](https://doi.org/10.1097/SLA.0000000000006879)

社论/评论类文章(无摘要)，发表于Annals of Surgery，展望应用人工智能在外科领域的前景与角色。属观点性论述、无量化数据。

> **要点**：应用AI被视为外科的下一个前沿。


### 34. 机器学习预测结直肠手术后并发症的系统综述与荟萃分析：机器学习走到哪一步了？

*Systematic review and meta-analysis of the role of machine learning in predicting postoperative complications following colorectal surgery: how far has machine learning come?*

**International Journal of Surgery** · 2025-07-29 · 系统综述与荟萃分析 · [PMID 40844287](https://pubmed.ncbi.nlm.nih.gov/40844287/) · [DOI](https://doi.org/10.1097/JS9.0000000000003067)

系统综述与荟萃分析，纳入18项研究。随机效应模型合并AUC：吻合口漏0.813(95%CI 0.753–0.873)、死亡率0.867(0.838–0.896)、延长住院0.810(0.728–0.892)、手术部位感染0.802(0.742–0.862)。提示ML在结直肠术后并发症预测中具良好临床潜力，尚需多中心研究验证泛化性。

> **要点**：ML预测结直肠术后主要并发症合并AUC 0.80–0.87，展现良好临床应用前景。


### 35. 人工智能、机器人与导航辅助技术在骨质疏松性椎体压缩骨折诊疗与预后中的作用与潜力（综述）

*Role and potential of artificial intelligence, robotics, and navigation-assisted technologies in the diagnosis, treatment, and prognosis of osteoporotic vertebral compression fractures.*

**International Journal of Surgery** · 2025-07-07 · 叙述性综述 · [PMID 40844278](https://pubmed.ncbi.nlm.nih.gov/40844278/) · [DOI](https://doi.org/10.1097/JS9.0000000000002910)

叙述性综述。OVCF发病率呈上升趋势、年增约4–5%，5年以上人群年龄校正发病率超850/100000。系统梳理先进影像与导航系统、虚拟现实、3D打印与机器人手术、以及AI辅助诊断/治疗/预后工具在骨质疏松性椎体压缩骨折中的应用，并讨论当前局限、挑战与未来方向。

> **要点**：综述数字骨科技术(AI/导航/机器人/3D打印)在OVCF诊疗中的作用与前景。


### 36. 外科结局报告中的人工智能：下一个利器，还是垃圾进垃圾出的人工智能？

*Artificial Intelligence in Surgical Outcomes Reporting: The Next Best Thing, or Just Artificially Intelligent "Garbage In, Garbage Out"?*

**Annals of Surgery** · 2025-06-13 · 评论/观点 · [PMID 40511870](https://pubmed.ncbi.nlm.nih.gov/40511870/) · [DOI](https://doi.org/10.1097/SLA.0000000000006789)

评论/观点类文章(无摘要)，质疑人工智能应用于外科结局报告时若输入数据质量差则garbage in, garbage out的风险，呼吁重视底层数据质量与评价方法。属观点性论述、无量化数据。

> **要点**：外科AI结局报告的价值取决于底层数据质量，警惕垃圾进垃圾出。


### 37. 对《外科中的人工智能：演进、趋势与未来方向》的评论

*A commentary on "Artificial intelligence in surgery: evolution, trends, and future directions".*

**International Journal of Surgery** · 2025-05-12 · 评论（无数据） · [PMID 40359568](https://pubmed.ncbi.nlm.nih.gov/40359568/) · [DOI](https://doi.org/10.1097/JS9.0000000000002450)

针对综述《Artificial intelligence in surgery: evolution, trends, and future directions》的评论文章，讨论外科AI的发展脉络、趋势与未来方向。属评论类，无原始数据。

> **要点**：对外科AI总体演进与未来方向的评论性讨论。



## 十四、模型开发与技术方法（外科语境）（4 篇）

### 1. SurgWound-Bench：外科伤口诊断基准

*SurgWound-Bench: a benchmark for surgical wound diagnosis.*

**npj Digital Medicine** · 2026-05-23 · 数据集/基准与模型开发 · [PMID 42177302](https://pubmed.ncbi.nlm.nih.gov/42177302/) · [DOI](https://doi.org/10.1038/s41746-026-02791-3)

针对手术部位感染(SSI)伤口护理，发布首个多样化外科伤口开源数据集SurgWound(686张图，三名外科医师标注8项细粒度临床属性)，并建立含视觉问答与报告生成的首个外科伤口诊断基准，提出三阶段MLLM框架WoundQwen(预测伤口特征→评估感染风险与紧急度→生成报告)。数据与代码开源。

> **要点**：首个外科伤口诊断数据集、基准及MLLM框架，服务SSI筛查。


### 2. Xeno-learning：跨物种知识迁移用于深度学习光谱手术影像分析

*Xeno-learning: knowledge transfer across species in deep learning-based spectral image analysis.*

**Nature Biomedical Engineering** · 2026-01-26 · 方法学开发+多物种高光谱影像验证 · [PMID 41588072](https://pubmed.ncbi.nlm.nih.gov/41588072/) · [DOI](https://doi.org/10.1038/s41551-025-01585-4)

针对临床高光谱手术影像缺乏大规模标注数据的问题，提出受异种移植启发的跨物种知识迁移概念xeno-learning，共用14,013张人、猪、鼠高光谱图像。研究发现虽器官光谱特征跨物种差异大，但病理或手术操作（如灌注不良、造影剂注射）引起的相对变化可比，通过基于生理的数据增强可将一物种习得的变化迁移到新物种，实现临床前动物数据的大规模二次利用。

> **要点**：跨物种迁移学习让海量动物高光谱数据可复用于人体手术影像AI


### 3. 人工智能生成合成数据以优化外科试验设计

*Synthetic Data Generated by Artificial Intelligence to Optimize Surgical Trial Design.*

**Annals of Surgery** · 2025-08-06 · AI生成合成数据的方法学开发与验证 · [PMID 40767615](https://pubmed.ncbi.nlm.nih.gov/40767615/) · [DOI](https://doi.org/10.1097/SLA.0000000000006871)

以2010-2024年接受微创全直肠系膜切除(双吻合DS或经肛单吻合TTSS)的真实队列(n=653)训练生成式AI模型产出合成数据(SD)，并在临床试验情境以90天吻合口漏(AL)为终点检验。合成与真实数据在统计保真度、临床效用与隐私保护上高度一致；条件生成平衡队列(n=1200)证实TTSS组AL率显著更低(P<0.0001)。

> **要点**：生成式AI可产出高保真外科合成数据，有望优化外科临床试验设计。


### 4. 头颈癌精准肿瘤学多模态数据集HANCOCK

*A multimodal dataset for precision oncology in head and neck cancer.*

**Nature Communications** · 2025-08-04 · 多模态数据集构建+ML基准 · [PMID 40759646](https://pubmed.ncbi.nlm.nih.gov/40759646/) · [DOI](https://doi.org/10.1038/s41467-025-62386-6)

数据集/方法研究,发表HANCOCK多模态数据集,含763例头颈癌患者的人口学、病理、血液数据及手术报告与组织学图像;机器学习证明多模态融合优于单模态,用基础模型整合影像有助于终点预测。为外科肿瘤多模态机器学习方法研究提供数据资源。

> **要点**：含手术报告与组织学的头颈癌多模态数据集,多模态ML优于单模态。



## 十五、【边缘相关】外科邻接的AI/影像/组学文献（356 篇）

> 收录理由：技术脉络与外科决策邻接但非严格属于「手术+AI」（如非手术语境影像AI、纯诊断影像组学、无自主成分的手术机器人、术后生物标志物ML等），依「宁宽勿漏」单列。

### 1. 评估ChatGPT-5与DeepSeek R1对距骨骨软骨损伤患者科普信息的质量与可读性

*Evaluation of ChatGpt-5 and DeepSeek R1 for patient information on talus osteochondral lesions: a cross-sectional comparative content analysis of quality and readability*

**International Journal of Surgery** · 2026-07-15 · 横断面比较内容分析 · [DOI](https://doi.org/10.1097/js9.0000000000005510)

横断面比较内容分析，针对距骨骨软骨损伤的12个常见问题，由2名骨科专家用四级评分与4分Likert量表评估两大语言模型回答的质量，并用FKGL、FRES评估可读性。DeepSeek R1在清晰度上显著更优(P=0.012)且可读性更佳(FRES 53.33±6.47、FKGL 8.76±1.06)，ChatGPT-5在全面性上得分更高(P=0.017)。

> **要点**：两款LLM在距骨损伤患者科普上各有所长可互补(患者科普为主、外科关联弱，列边缘)


### 2. 面向端到端急诊救治的统一多模态基础模型(ED-Foundation)

*A unified multi-modal foundation model for end-to-end emergency care.*

**npj Digital Medicine** · 2026-07-14 · 基础模型开发与多数据集回顾评估 · [PMID 42448807](https://pubmed.ncbi.nlm.nih.gov/42448807/) · [DOI](https://doi.org/10.1038/s41746-026-02981-z)

边缘相关。基于BEIT-3构建的统一急诊基础模型ED-Foundation,联合图文对与纯文本、两阶段自监督学习,在9个下游数据集覆盖早期急诊分诊、病程结局预测、急诊决策支持三类场景取得SOTA且对模态缺失稳健。为通用急诊基础模型,急诊外科非核心,列为边缘。

> **要点**：统一急诊基础模型覆盖分诊/结局/决策,通用急诊导向,外科非核心,边缘相关。


### 3. 便携式射频脑扫描仪结合深度学习实现卒中类型检测

*Portable RF brain scanner enables stroke type detection using deep learning.*

**npj Digital Medicine** · 2026-07-13 · 诊断建模研究(测试队列) · [PMID 42443367](https://pubmed.ncbi.nlm.nih.gov/42443367/) · [DOI](https://doi.org/10.1038/s41746-026-02996-6)

边缘相关。基于16天线射频阵列的无创便携脑扫描仪+深度学习(掩码自编码自监督+监督对比学习)区分卒中类型,测试队列中出血vs非出血敏感度92%/特异度85%,缺血vs非缺血敏感度95%/特异度80%。属卒中类型诊断设备,结论可外推至取栓/溶栓等介入决策但本身无外科动作,列为边缘。

> **要点**：便携RF+深度学习区分卒中类型(出血敏感度92%),可外推介入决策,边缘相关。


### 4. 自由活动啮齿动物的脊髓表面环形记录

*Surface circumferential spinal cord recording in freely moving rodents.*

**Nature Communications** · 2026-07-13 · 器械开发+大鼠/猪跨物种验证 · [PMID 42443176](https://pubmed.ncbi.nlm.nih.gov/42443176/) · [DOI](https://doi.org/10.1038/s41467-026-75128-z)

边缘相关：提出贴合脊髓、不穿透神经组织的超薄环形电极阵列，同时解码运动意图、分类感觉与内脏感觉输入。自由活动大鼠中深度学习解码器运动意图R²=0.97，8种感觉模态分类准确率94.4%，并在麻醉猪中跨物种验证。属神经界面器械+DL解码，外科为植入。

> **要点**：环形脊髓界面+DL多功能解码，运动R²0.97、感觉94.4%


### 5. 经扩展预训练的组织病理基础模型识别乳腺癌预后性RNA剪接原型

*Prognostic RNA-splicing archetypes in breast cancer identified by extended pre-training of histopathology foundation models*

**Nature Communications** · 2026-07-07 · 基础模型方法学与多队列分析 · [DOI](https://doi.org/10.1038/s41467-026-75217-z)

将预训练组织病理基础模型（hFM）特化到浸润性肿瘤组织，系统评估其表征的生物学概念，并证明扩展预训练可将通用模型转为肿瘤特化模型，发现跨患者具一致形态与分子身份的复发性肿瘤原型。识别HER2阳性与三阴性乳腺癌等主导原型，其中RNA剪接相关原型持续预测更差预后。属数字病理组学预后/发现研究，无明确外科动作，边缘相关。

> **要点**：肿瘤特化病理基础模型从H&E发现预后性RNA剪接原型。


### 6. 肺腺癌脑转移EGFR突变状态的放射基因组学建模:具生物可解释性的多中心研究

*Radiogenomic modeling of EGFR mutation status in brain metastases from lung adenocarcinoma: a multicenter study with biological interpretability.*

**npj Digital Medicine** · 2026-07-06 · 多中心放射基因组学研究 · [PMID 42410125](https://pubmed.ncbi.nlm.nih.gov/42410125/) · [DOI](https://doi.org/10.1038/s41746-026-02931-9)

边缘相关。多中心放射基因组学研究,分析3机构421例肺腺癌脑转移共1303个病灶,从T1/T2/增强T1提取3435个影像组学特征,用自适应LightGBM四任务预测EGFR突变状态,内部AUC达0.95,94个病理确认病灶验证准确率83.0%、敏感度84.7%、特异度80.0%;SHAP/LIME显示形状特征(球形度)最重要。目的为指导靶向治疗,外科成分弱,列为边缘。

> **要点**：影像组学无创预测肺腺癌脑转移EGFR突变(准确率83%)指导靶向治疗,外科成分弱,边缘相关。


### 7. BoneCoT：临床思维链引导的全身骨骼基础模型多中心验证（骨转移）

*BoneCoT: multicentre validation of a whole-body skeleton foundation model for bone metastases guided by clinician-derived chain of thought.*

**Nature Biomedical Engineering** · 2026-07-02 · 多中心验证（基础模型开发） · [PMID 42393341](https://pubmed.ncbi.nlm.nih.gov/42393341/) · [DOI](https://doi.org/10.1038/s41551-026-01736-1)

边缘相关：影像诊断基础模型。BoneCoT以2930万张CT图像(30,267例、12个骨骼部位)预训练，经临床思维链(CoT)微调，覆盖诊断、并发症、肿瘤类型与生物标志物等26项任务。在10家医院多中心队列中AUROC较SOTA高20%，区分原发与转移病灶AUROC提升40%、超过资深放射科医生。属可外推至外科决策的诊断影像AI，列为边缘。

> **要点**：CoT引导的骨骼基础模型骨转移诊断显著超越现有方法与资深医生。


### 8. 用生理MRI与机器学习空间定位疑似复发胶质瘤患者的肿瘤复发区域

*Spatially identifying regions of tumor recurrence in patients with suspected recurrent glioma using physiologic MRI and machine learning.*

**npj Digital Medicine** · 2026-06-25 · 机器学习开发与临床验证研究 · [PMID 42350576](https://pubmed.ncbi.nlm.nih.gov/42350576/) · [DOI](https://doi.org/10.1038/s41746-026-02823-y)

边缘相关。基于254个术中组织取样点周围的多参数MRI patch建立机器学习模型空间定位复发胶质瘤:区分复发肿瘤测试AUROC 0.74±0.08、正常脑组织0.99±0.01,不确定性与模型失败相关(p≤0.05);另一队列56例高级别胶质瘤复发预测图的体积与生存显著相关。属影像ML复发定位,结论可外推术后/再手术决策,外科动作非核心,列为边缘。

> **要点**：生理MRI+ML空间定位胶质瘤复发(AUROC 0.74),可外推手术/放疗决策,边缘相关。


### 9. TRUECAM：面向可信的不确定性感知非小细胞肺癌病理诊断框架

*Implementing trust in non-small cell lung cancer diagnosis with a conformalized uncertainty-aware AI framework.*

**Nature Biomedical Engineering** · 2026-06-23 · 方法学框架+多数据集验证 · [PMID 42337062](https://pubmed.ncbi.nlm.nih.gov/42337062/) · [DOI](https://doi.org/10.1038/s41551-026-01694-8)

边缘相关：可信AI方法学框架。TRUECAM针对全切片图像(WSI)非小细胞肺癌(NSCLC)分型，整合谱归一化神经高斯过程识别域外输入、模糊区块剔除与共形预测以控制错误率。在多个癌症数据集上（任务专用与基础模型），加装TRUECAM后在准确率、稳健性、可解释性、数据效率与公平性上均优于未加装版本。属数字病理AI方法学、外科动作不明确，列为边缘。

> **要点**：不确定性感知的共形预测框架提升病理AI的可信度与稳健性。


### 10. 基于潜在流匹配的冠脉造影视频帧插值

*Video frame interpolation for coronary angiography using latent flow matching.*

**npj Digital Medicine** · 2026-06-23 · 生成式AI方法开发与验证 · [PMID 42337305](https://pubmed.ncbi.nlm.nih.gov/42337305/) · [DOI](https://doi.org/10.1038/s41746-026-02923-9)

提出生成式AI模型Angio-FILM，用潜在流匹配从低帧率(7.5FPS)冠脉造影合成高时间分辨率(15FPS)视频以降低辐射；训练于357,933段视频。定量指标结果参差，但专家定性评价超越SOTA；视觉图灵测试(30名医师、600段)二分类准确率54%(p=0.107)、二选一49%(p=0.749)，最小管腔直径MAE仅0.180mm。

> **要点**：生成式帧插值降低造影辐射并保持解剖保真(过程影像增强技术，边缘相关)。


### 11. 多模态生存预测中缺失模态的处理(非小细胞肺癌)

*Handling missing modalities in multimodal survival prediction for non-small cell lung cancer.*

**npj Digital Medicine** · 2026-06-22 · 回顾性多模态深度学习方法研究 · [PMID 42332139](https://pubmed.ncbi.nlm.nih.gov/42332139/) · [DOI](https://doi.org/10.1038/s41746-026-02783-3)

针对不可切除II-III期NSCLC，提出缺失感知多模态生存框架，用基础模型(FM)提取CT、全切片病理(WSI)与结构化临床变量特征并做中间融合，可在模态自然缺失时不丢弃病例。三模态C-index达74.42，中间融合优于单模态及早/晚融合，各模态组合log-rank检验均显著。属非手术语境肿瘤多模态影像/病理AI，边缘相关。

> **要点**：缺失感知中间融合提升不可切除NSCLC预后分层(非手术,肿瘤多模态AI)。


### 12. 多模态大语言模型预警与诊断慢性眼部移植物抗宿主病(coGVHD)

*Development of a multimodal large language model for early warning and diagnosis of chronic ocular GVHD.*

**npj Digital Medicine** · 2026-06-22 · 多中心回顾性建模+内外部验证 · [PMID 42332126](https://pubmed.ncbi.nlm.nih.gov/42332126/) · [DOI](https://doi.org/10.1038/s41746-026-02916-8)

面向异基因造血干细胞移植(allo-HSCT)后慢性眼部GVHD，构建多任务多模态大模型GVHD-MLLM，纳入666例(预警)与805例/1574眼(诊断)。内部预警AUROC 93.44%、诊断98.98%、严重度分级98.24%；外部预警83.45%、三中心诊断均>96.0%；使用预警后就诊者病情更轻，初级眼科医师借助模型准确率提升。属移植后眼科并发症AI，边缘相关。

> **要点**：多模态LLM高精度预警诊断移植后眼部GVHD(移植并发症眼科AI)。


### 13. 高亲和力神经降压素受体NTSR1定义免疫冷、预后差的结直肠癌亚型

*Expression of the High Affinity Neurotensin Receptor Defines an Immune‑cold, Poor‑prognosis Colorectal Cancer Subtype.*

**Annals of Surgery** · 2026-06-22 · 转录组学+机器学习+体外3D模型(回顾性队列) · [PMID 42322125](https://pubmed.ncbi.nlm.nih.gov/42322125/) · [DOI](https://doi.org/10.1097/SLA.0000000000007131)

整合TCGA发现队列与肯塔基大学手术验证队列，用Random Forest机器学习识别NTS/NTSR1信号相关分子特征，并用3D肿瘤球共培养模型评估T细胞空间分布。高NTSR1表达是发现队列无进展间期与验证队列总生存的独立危险因素，上调PLXNB3/FLNC/AHNAK2机械结构网络、下调CDX2/SATB2；NTSR1拮抗剂SR48692显著逆转T细胞浸润受限。属分子机制研究，AI(随机森林)仅用于组学特征识别、外科成分弱。

> **要点**：外周相关：NTS/NTSR1轴构成机械性免疫屏障，随机森林用于组学分型、外科动作弱。


### 14. 迈向自主医疗人工智能智能体(MIRA)

*Towards autonomous medical artificial intelligence agents.*

**Nature** · 2026-06-17 · 基于真实病例的模拟研究 · [PMID 42310457](https://pubmed.ncbi.nlm.nih.gov/42310457/) · [DOI](https://doi.org/10.1038/s41586-026-10675-5)

边缘相关：在沙盒电子病历环境中构建自主AI智能体MIRA（基于LLM），可获取病史、开具与解读检验/影像/微生物学检查、生成鉴别诊断并制定治疗计划（含开药、安排手术、规划入院）。在真实病例模拟中，MIRA诊断准确性优于医生，并做出指南一致、用药安全的决策。属泛医学基础模型顺带涉及外科（安排手术），故列为边缘。

> **要点**：EHR集成的自主医疗AI智能体在模拟中诊断优于医生，外科仅为其众多动作之一。


### 15. 骨形态作为前交叉韧带(ACL)损伤的重要危险因素

*Bone morphology as a significant risk factor for anterior cruciate ligament injury.*

**npj Digital Medicine** · 2026-06-15 · 多中心回顾性深度学习 · [PMID 42298177](https://pubmed.ncbi.nlm.nih.gov/42298177/) · [DOI](https://doi.org/10.1038/s41746-026-02903-z)

基于5000例MRI构建深度学习模型ACL-P，用3D骨形态点云对ACL损伤易感性分类作为代理任务；外部平民集(n=7797)AUC 0.887(95%CI 0.879-0.895)、职业运动员集(n=269)AUC 0.907，急/慢性损伤期(0-365天)表现一致。骨科影像AI的损伤易感性研究，无明确外科动作，边缘相关。

> **要点**：3D骨形态与ACL损伤易感性相关(影像AI,非手术动作)。


### 16. 长期独立使用皮层内脑机接口实现语音与光标控制

*Long-term independent use of an intracortical brain-computer interface for speech and cursor control.*

**Nature Medicine** · 2026-06-15 · 单例长期临床演示 · [PMID 42297978](https://pubmed.ncbi.nlm.nih.gov/42297978/) · [DOI](https://doi.org/10.1038/s41591-026-04414-6)

报道一名ALS致重度构音障碍的瘫痪男性近2年在家独立使用皮层内多模态BCI（脑到文本语音与光标解码），累计居家逾3,800小时，交流183,060句、1,960,163词，平均56词/分；命题词测试语音解码准确率>99%（12.5万词表）。皮层内电极需神经外科植入，但研究聚焦解码与辅助沟通、外科成分弱，边缘相关。

> **要点**：皮层内BCI长期居家语音解码>99%准确，神经外科植入、外科成分弱。


### 17. 用无细胞DNA语言模型实现可泛化的癌症信号预测

*Toward generalizable prediction of cancer signal using a cell-free DNA language model.*

**Cell Reports Medicine** · 2026-06-12 · AI模型开发与多队列验证 · [PMID 42285091](https://pubmed.ncbi.nlm.nih.gov/42285091/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102866)

Fragmentia-AI为学习肿瘤来源cfDNA片段级序列模式的AI语言模型,用于早期检测、微小残留病(MRD)监测与治疗后风险分层,可在约常规深度0.1%-1%的超低测序输入下、部分不依赖panel地检测癌信号,并在多队列表现良好,应用含术后或免疫治疗后监测。属术后随访生物标志物ML、外科成分弱,故边缘相关。

> **要点**：cfDNA语言模型低成本泛化检测癌信号,可用于术后MRD监测(外科成分弱)


### 18. 机器学习引导设计用于多组织创伤与急救的力学自适应生物胶

*Machine learning-guided design of mechanoadaptive bioglues for multitissue trauma and first-aid applications.*

**Nature Biomedical Engineering** · 2026-06-11 · ML引导材料设计+实验验证 · [PMID 42277319](https://pubmed.ncbi.nlm.nih.gov/42277319/) · [DOI](https://doi.org/10.1038/s41551-026-01705-8)

边缘相关：机器学习引导的生物材料设计。以ML建立生物胶(TuneGlues)与不同组织的任务导向关系并优化，开发针对肺、肠、皮肤、骨损伤的4种代表性胶，展现良好粘附与术后愈合；并将ML力学数据库集成入急救装置以快速递送，缩短开放手术中多组织创伤的处理时间。AI用于材料设计而非手术任务本身，列为边缘。

> **要点**：ML引导设计的力学自适应生物胶提升多组织创伤与开放手术的处理效果。


### 19. AI辅助提升壶腹部病变的内镜诊断

*AI-assisted improvement of endoscopic diagnosis of ampullary lesions.*

**npj Digital Medicine** · 2026-06-10 · 回顾性读片者对比研究 · [PMID 42270861](https://pubmed.ncbi.nlm.nih.gov/42270861/) · [DOI](https://doi.org/10.1038/s41746-026-02893-y)

回顾性读片者对比研究，独立AI识别壶腹病变准确率84.2%、二分类AUC 83.2%-90.9%；AI辅助显著提升内镜fellow(63.5%→75.8%,P<0.001)与消化内镜医师(68.4%→76.5%,P=0.012)准确率，对胰胆专家无显著提升，且不损害敏感度。诊断性内镜AI，边缘相关。

> **要点**：AI辅助提升非胰胆内镜医师对壶腹病变诊断准确率(诊断性内镜AI)。


### 20. 用常规血液指标预测结直肠癌预后的人工智能

*Artificial intelligence for the prediction of prognosis in colorectal cancer patients using routine blood indices.*

**npj Digital Medicine** · 2026-06-05 · 多中心回顾性机器学习 · [PMID 42249119](https://pubmed.ncbi.nlm.nih.gov/42249119/) · [DOI](https://doi.org/10.1038/s41746-026-02781-5)

多中心回顾性ML：Union训练850例，Hefei(403)、Shihezi(217)验证，7种时间事件模型中随机生存森林(RSF)最优，Union 1/2/3年OS的AUC 0.768/0.775/0.731，外部Hefei 0.820/0.805/0.775；SHAP识别CEA、CA125、年龄、MPV等关键因子。肿瘤生物标志物ML预后，外科成分弱，边缘相关。

> **要点**：常规血液指标ML预测CRC生存(预后模型,外科成分弱)。


### 21. 以patch级对比学习增强基础模型迁移用于前列腺癌检测(ProViCNet)

*Enhancing foundation model transfer for prostate cancer detection with patch-level contrastive learning.*

**npj Digital Medicine** · 2026-06-05 · 多队列回顾性+读片者研究 · [PMID 42249085](https://pubmed.ncbi.nlm.nih.gov/42249085/) · [DOI](https://doi.org/10.1038/s41746-026-02831-y)

开发弱监督模型ProViCNet在前列腺MRI做patch级对比学习，4401例六队列训练验证；检测AUROC 0.875-0.966，读片者研究中优于放射科医师(0.907 vs 0.805,p<0.01)；结合PSA的虚拟筛查在PSA≥4人群将特异度自15%提升至38%(p<0.001)，支持MRI筛查、活检靶向与病灶治疗规划。诊断性影像AI，边缘相关。

> **要点**：前列腺MRI癌检测基础模型，服务活检与病灶治疗规划(诊断影像AI)。


### 22. 预测晚期肝癌PD-1治疗超进展的多模态深度学习模型(HOPE)

*A multimodal deep learning model predicting hyperprogressive disease for PD-1 blockade in advanced hepatocellular carcinoma.*

**npj Digital Medicine** · 2026-06-03 · 多中心回顾性多模态深度学习 · [PMID 42236582](https://pubmed.ncbi.nlm.nih.gov/42236582/) · [DOI](https://doi.org/10.1038/s41746-026-02834-9)

多中心回顾性纳入665例接受PD-1三联疗法的晚期肝细胞癌，构建Transformer多模态模型HOPE融合动脉/门脉期CT与临床因素预测超进展(HPD)：内部AUC 0.801、外部0.687，优于纯临床与纯影像基线，含Grad-CAM解释。晚期肝癌系统治疗影像AI，无外科动作，边缘相关。

> **要点**：多模态CT预测肝癌免疫治疗超进展(系统治疗影像AI,非手术)。


### 23. SurvGRN：用于膀胱癌生存预测的多特征融合框架

*SurvGRN: a multi-feature fusion framework for bladder cancer survival prediction*

**International Journal of Surgery** · 2026-06-03 · 多模态融合生存预测方法开发 · [DOI](https://doi.org/10.1097/js9.0000000000004874)

方法学研究，提出多特征融合框架SurvGRN，采用门控残差网络整合临床变量、转录组与数字病理切片(多示例学习提取病理特征，ResNet-50膀胱组织预训练)，经LSTM动态融合。在400例膀胱癌患者上，C-index较DeepMISL提升12.6%，较DeepGraphConv/Patch-GCN提升20.6%/7.1%，较Surformer/HVTSurv提升5.4%/4.0%，并能将患者显著分层为不同风险队列。

> **要点**：多源数据融合架构显著提升膀胱癌生存预测(生存预测为主、外科动作弱，列边缘)


### 24. 用Mamba架构深度学习预测乳腺癌病理完全缓解(pCR)

*Deep learning prediction of pathological complete response in breast cancer using Mamba architecture.*

**npj Digital Medicine** · 2026-06-02 · 多中心回顾性深度学习 · [PMID 42230774](https://pubmed.ncbi.nlm.nih.gov/42230774/) · [DOI](https://doi.org/10.1038/s41746-026-02849-2)

基于五家医院1646例乳腺癌穿刺活检开发Mamba模型MCEN预测新辅助化疗后pCR：训练/验证AUROC 0.923/0.78，四个外部测试集0.761-0.809；加入临床病理信息后训练/验证0.937/0.811、外部0.773-0.84。穿刺病理预测治疗反应，与手术间接相关，边缘相关。

> **要点**：穿刺病理Mamba模型预测乳腺癌新辅助pCR(治疗反应,外科成分间接)。


### 25. 读者来信：乳腺癌数字病理中的人工智能，实践新纪元？

*Letter to the Editor “Artificial Intelligence in digital pathology of breast cancer, new era of practice?”*

**International Journal of Surgery** · 2026-06-02 · 来信(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005170)

读者来信(无摘要、无数据)，针对乳腺癌数字病理AI应用发表评论。数字病理为标本分析，外科动作不明确，列边缘。

> **要点**：对乳腺癌数字病理AI的评论性来信(病理诊断为主，列边缘)


### 26. 具电极可扩展性与微创手术的高分辨率脑机接口

*High-resolution brain-computer interface with electrode scalability and minimally invasive surgery.*

**Nature Biomedical Engineering** · 2026-06-01 · 脑机接口器械（摘要缺失） · [PMID 41039114](https://pubmed.ncbi.nlm.nih.gov/41039114/) · [DOI](https://doi.org/10.1038/s41551-025-01502-9)

边缘相关：题为具电极可扩展性和微创手术的高分辨率脑机接口（本记录摘要缺失）。据标题属脑机接口/神经界面器械（微创植入），AI通常用于神经解码，与外科耦合较松。

> **要点**：微创可扩展高分辨率脑机接口（摘要缺失，据题判定）


### 27. 从供体肺到数字孪生

*From donor lungs to digital twins.*

**Nature Medicine** · 2026-05-29 · 新闻/评论 · [PMID 42215696](https://pubmed.ncbi.nlm.nih.gov/42215696/) · [DOI](https://doi.org/10.1038/d41591-026-00029-z)

Nature Medicine新闻评论，无摘要与数据，标题指向将数字孪生（计算/仿真建模）应用于供体肺（肺移植）评估。与移植外科及数字孪生建模脉络邻接，但为新闻性质、无具体方法与数字，归边缘。

> **要点**：数字孪生用于供肺评估的新闻，边缘相关


### 28. 多专家整合算法用于肾活检分诊(MEIA)

*Multi expert integrated algorithm for kidney biopsy triage.*

**npj Digital Medicine** · 2026-05-25 · 多中心回顾性建模+外部验证 · [PMID 42185463](https://pubmed.ncbi.nlm.nih.gov/42185463/) · [DOI](https://doi.org/10.1038/s41746-026-02724-0)

为保留并整合不同专家决策模式，构建多专家整合算法MEIA用于肾活检分诊，含9598例三队列(开发8228例)，三名肾科医师各自标注训练专家模型再多数投票整合。内部准确率95.3%、F1 84.4%，外部AUC 0.933，病理确诊队列中MEIA推荐病例均见组织学异常。经皮活检指征决策支持，外科/介入成分弱，边缘相关。

> **要点**：整合专家变异的肾活检分诊模型(介入决策支持,外科成分弱)。


### 29. CNet-Cox：用于乳腺癌预后的可解释网络生物标志物发现与生存风险评分

*CNet-Cox for interpretable network biomarker discovery and survival risk scoring in precise breast cancer prognosis.*

**npj Digital Medicine** · 2026-05-25 · 计算方法开发与多数据集验证(组学预后) · [PMID 42185445](https://pubmed.ncbi.nlm.nih.gov/42185445/) · [DOI](https://doi.org/10.1038/s41746-026-02756-6)

提出网络正则化Cox框架CNet-Cox，将基因调控网络连通性纳入稀疏特征选择。乳腺癌中(TCGA n=1080)识别68个相连预后标志物，内部测试C指数0.913，优于常规正则化Cox；衍生六基因风险评分在7个转录组数据集(GEO n=1602)与空间转录组(4992点)验证，风险分层log-rank p<0.05，与MammaPrint一致性Pearson r=0.993。

> **要点**：网络感知生存模型改进乳腺癌组学预后分层(无直接外科动作，边缘相关)。


### 30. AI辅助前列腺活检报告的评估(Articulate Pro前瞻研究)

*An evaluation of artificial intelligence assisted prostate biopsy reporting in the Articulate Pro study.*

**npj Digital Medicine** · 2026-05-22 · 多中心前瞻性临床评估 · [PMID 42174106](https://pubmed.ncbi.nlm.nih.gov/42174106/) · [DOI](https://doi.org/10.1038/s41746-026-02592-8)

英国三家NHS中心前瞻研究评估商用AI辅助前列腺活检病理报告，1613例中1049例AI辅助；二次阅片使21/386(5.4%)患者初始诊断或分级组改变，其中5例(1.3%)可能影响临床管理；并发阅片周转时间显著缩短30.1h(p<0.0001)，各站点免疫组化需求显著下降(OR 0.50/0.43/0.33)。数字病理诊断，边缘相关。

> **要点**：AI辅助前列腺活检病理报告提升准确率、缩短周转(数字病理诊断)。


### 31. 基于多模态数据的乳腺癌无创诊断深度学习系统(BINDS)

*A deep learning system for non-invasive breast cancer diagnosis with multimodal data.*

**Nature Biomedical Engineering** · 2026-05-19 · 深度学习系统开发与多中心验证 · [PMID 42157015](https://pubmed.ncbi.nlm.nih.gov/42157015/) · [DOI](https://doi.org/10.1038/s41551-026-01654-2)

边缘相关：多模态影像诊断AI。BINDS融合超声、钼靶、MRI进行乳腺癌风险评估与亚型分类，采用两阶段流程并引入影像-病理对齐机制。基于27,048名受试者(8中心+7个公开数据集)开发验证，AUROC 0.973，可协助放射科医生将良性病变活检减少最多32.4%。属可外推至外科/穿刺决策的诊断影像AI，列为边缘。

> **要点**：多模态DL无创诊断乳腺癌(AUROC 0.973)，最多减少32.4%良性活检。


### 32. 人工智能整合多体液组学与临床表型实现子宫内膜癌风险分层

*Artificial intelligence-driven integration of multi-biofluid omics and clinical phenotype enables stratification of endometrial cancer.*

**Cell Reports Medicine** · 2026-05-14 · 多中心诊断模型开发与外部验证 · [PMID 42140194](https://pubmed.ncbi.nlm.nih.gov/42140194/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102805)

基于AI的平台整合多体液组学(血浆、宫颈/宫腔分泌物)与临床数据,用于子宫内膜癌(EC)风险分层。两中心队列(建模531例、外部验证204例,共1179份样本)。外部验证中微创筛查敏感度达95.65%,EC确诊AUC 0.94,并具高危亚型识别潜力。为诊断/筛查组学ML,无明确外科动作。

> **要点**：AI多组学平台无创筛查并确诊子宫内膜癌(AUC 0.94)


### 33. 面向数字病理的可扩展联邦学习深度特征提示（FedDFP）

*Flexible and scalable federated learning with deep feature prompts for digital pathology.*

**npj Digital Medicine** · 2026-05-14 · 方法学开发与多数据集验证 · [PMID 42135461](https://pubmed.ncbi.nlm.nih.gov/42135461/) · [DOI](https://doi.org/10.1038/s41746-026-02710-6)

提出FedDFP联邦学习框架，仅共享作用于全切片图像patch嵌入的轻量化client端可学习prompt，通信开销较标准FL降低超99.9%。在TCGA-IDH、CAMELYON16/17上较local-only训练AUC提升0.11-0.13、较最强联邦方法提升达0.10，收敛快2-4倍。属数字病理通用方法，无明确外科动作，边缘相关。

> **要点**：高效联邦学习用于数字病理分类，通信降99.9%。


### 34. 面向全切片图像形态学透明AI预测的人在环解释框架（MorphoXAI）

*A human-in-the-loop explanation framework for morphologically transparent AI predictions from whole-slide images.*

**npj Digital Medicine** · 2026-05-14 · 方法学开发与人评验证 · [PMID 42135447](https://pubmed.ncbi.nlm.nih.gov/42135447/) · [DOI](https://doi.org/10.1038/s41746-026-02741-z)

提出MorphoXAI人在环解释框架，为全切片图像深度学习模型提供全局与局部可解释性，揭示模型依赖的组织形态学模式并结合病理专家解读。多组织类型任务验证，人评显示解释易懂、富含诊断特征、利于决策。属数字病理可解释性方法，无明确外科动作，边缘相关。

> **要点**：数字病理深度学习可解释性框架，增强病理-AI协作。


### 35. 具记忆遗传回路的磁控医用微机器人

*Magnetic medical microrobots with memory-capable genetic circuits.*

**Science Advances** · 2026-05-13 · 临床前实验研究 · [PMID 42127204](https://pubmed.ncbi.nlm.nih.gov/42127204/) · [DOI](https://doi.org/10.1126/sciadv.aeb2528)

磁控益生菌微机器人集成记忆遗传回路，经一次磁热触发进入治疗态持续降解纤维蛋白软化肿瘤，记忆维持≥12天；较无记忆组肿瘤基质硬度降低6.70倍、体内抗癌效率从21.86%提升至87.52%。为医用微机器人介入，但自主性源于基因回路而非AI，归边缘。

> **要点**：磁控治疗微机器人，无AI自主成分，边缘


### 36. 个体化机器学习指导的新诊断胶质母细胞瘤放疗剂量递增前瞻性初步研究

*Personalized machine learning-guided radiation dose escalation in newly diagnosed glioblastoma: prospective pilot study.*

**Nature Communications** · 2026-05-13 · 前瞻性初步研究（20例，NCT03477513） · [PMID 42129213](https://pubmed.ncbi.nlm.nih.gov/42129213/) · [DOI](https://doi.org/10.1038/s41467-026-72545-y)

边缘相关：前瞻性初步研究（20例IDH野生型胶质母细胞瘤，全切术后）评估机器学习肿瘤浸润图指导的个体化精准放疗(PPRT)。中位无进展生存24.4 vs 11.6个月(HR 0.28)、总生存35.4 vs 17.7个月(HR 0.34)；放射性坏死47% vs 12%。属放疗AI，外科(切除)仅为背景。

> **要点**：ML浸润图指导GBM放疗剂量，外科成分弱


### 37. 外科创新与技术(委员会综述)

*Surgical innovation and technology.*

**British Journal of Surgery** · 2026-05-07 · 综述/委员会报告(无数据) · [PMID 42149732](https://pubmed.ncbi.nlm.nih.gov/42149732/) · [DOI](https://doi.org/10.1093/bjs/znaf224)

BJS委员会型综述,跨多外科专科与科学领域,评述外科创新:含转化基因组学(ctDNA)、微生物组/蛋白组、微纳米机器人、分子影像引导、智能半自动器械,以及人工智能在手术写作/培训模拟/诊断/机器人中的广泛影响。属涵盖AI但更宽泛的外科技术综述、无量化数据,故边缘相关。

> **要点**：外科未来趋向更精准个体化;AI是多项创新之一,需与工程/数据/产业协作


### 38. AI影像与液体活检联合临床评估鉴别肺结节良恶性的诊断性网状meta分析

*Diagnostic performance of artificial intelligence–based imaging and liquid biopsy combined with clinical evaluation for distinguishing benign and malignant pulmonary nodules: a diagnostic network meta-analysis*

**International Journal of Surgery** · 2026-05-06 · 诊断性网状meta分析 · [DOI](https://doi.org/10.1097/js9.0000000000005144)

诊断性网状meta分析，系统评价2015-2024年20项比较研究，采用贝叶斯分层建模并以GRADE评估证据等级。CT-Deep联合临床信息敏感度最高(97.1%，可信区间90.8%-99.6%)但特异度较低(67.4%)；单独液体活检更均衡(敏感度63.1%、特异度82.8%)；临床加液体活检混合策略SROC曲线下面积最优(AUC 0.903)；研究间异质性显著(I2>50%)。

> **要点**：AI影像适合高敏感筛查、液体活检偏高特异度、联合策略最优(诊断为主，列边缘)


### 39. 造血干细胞移植后AI引导的肠外营养治疗

*AI Guided Parenteral Nutrition Therapy After Hematopoietic Stem Cell Transplantation.*

**npj Digital Medicine** · 2026-05-06 · 回顾性建模+强化学习策略评估 · [PMID 42092179](https://pubmed.ncbi.nlm.nih.gov/42092179/) · [DOI](https://doi.org/10.1038/s41746-026-02652-z)

基于Stanford 6402例移植（其中1473例接受TPN、共27,447患者日）真实数据，构建30种标准化TPN方案并训练模型推荐次日剂量调整（Pearson r≈0.71），强化学习策略的复合评分高于现行临床策略。HSCT为细胞移植且聚焦营养支持，外科成分弱，边缘相关。

> **要点**：AI引导移植后肠外营养，可行但需前瞻验证。


### 40. AI与医生预测胶质瘤IDH突变状态的性能比较

*Comparing artificial intelligence and physician performance in predicting IDH mutation status in glioma.*

**npj Digital Medicine** · 2026-05-05 · AI-医生对比诊断研究+外部验证 · [PMID 42086700](https://pubmed.ncbi.nlm.nih.gov/42086700/) · [DOI](https://doi.org/10.1038/s41746-026-02695-2)

比较GliomaDepth-IDH（ResNet34）、GliomaVista-IDH（ViT）与18名医生用MRI预测胶质瘤IDH突变。BraTS数据集上ViT模型AUC 0.97显著优于医生；但日本外部队列降至0.75-0.82且校准差（Brier 0.32），高水平医生AUC 0.88且校准更优（Brier 0.19）。属影像分子状态预测，无直接外科动作，边缘相关。

> **要点**：影像预测胶质瘤IDH，外部泛化下降，医生校准更佳。


### 41. 多模态超声时空Transformer用于乳腺癌无创分子分型（MUST-Sub）

*Noninvasive molecular subtyping of breast cancer using multimodal ultrasound spatiotemporal transformer.*

**npj Digital Medicine** · 2026-05-04 · 多队列回顾/前瞻验证 · [PMID 42082579](https://pubmed.ncbi.nlm.nih.gov/42082579/) · [DOI](https://doi.org/10.1038/s41746-026-02699-y)

提出MUST-Sub融合B超形态与超声造影血流动力学时空特征，分型Luminal/HER2/三阴。内部、前瞻、多中心macro-AUC分别0.94/0.90/0.92，优于仅B超基线；形态学biomarker与肿瘤大小负相关、血流biomarker与Ki-67正相关（均p<0.05）。属无创影像分子分型，主要指导系统治疗，边缘相关。

> **要点**：多模态超声无创预测乳腺癌分子分型，替代活检潜力。


### 42. 面向癌症病理自主科学发现的智能体框架

*An agentic framework for autonomous scientific discovery in cancer pathology.*

**Nature Medicine** · 2026-04-29 · 智能体方法学+多队列回顾性评估 · [PMID 42056496](https://pubmed.ncbi.nlm.nih.gov/42056496/) · [DOI](https://doi.org/10.1038/s41591-026-04357-y)

提出基础型智能体AI系统SPARK，以语言为通用接口自主生成肿瘤分析的生物学驱动概念，无需额外训练即处理复杂病理数据。在5种癌型（肺腺癌、肺鳞癌、结直肠癌、乳腺癌、口咽鳞癌）18个队列逾5,400例患者及一个空间生物学乳腺癌数据集（n=625）评估，产出与预后、病理变量及预测性生物标志物相关的概念。属数字病理发现/预后智能体，无明确外科动作，边缘相关。

> **要点**：病理智能体SPARK自主生成预后相关概念（5,400+例），无明确外科动作。


### 43. 基于MRI影像组学-临床模型无创鉴别鼻咽病变的多中心研究

*Noninvasive identification of nasopharyngeal lesions by MRI-based radiomic-clinical model: a multicenter study*

**International Journal of Surgery** · 2026-04-28 · 多中心回顾性影像组学诊断建模 · [DOI](https://doi.org/10.1097/js9.0000000000005288)

多中心回顾性研究，纳入3家医院350例患者，采用利他海鸥优化算法(AltSOA)加SVM从多序列MRI(T1WI、T2WI、CE-T1WI)提取并筛选影像组学特征以鉴别5类鼻咽病变。T1WI+CE-T1WI影像组学-临床模型性能最佳(内部测试AUC 0.909，95%CI 0.868-0.951；外部AUC 0.825，95%CI 0.736-0.900)，SHAP揭示主要贡献特征。

> **要点**：MRI影像组学-临床模型无创鉴别鼻咽病变、减少不必要活检(诊断为主，列边缘)


### 44. 用EndoStyle进行消化内镜图像风格迁移以改进AI预测模型

*Gastrointestinal endoscopic image style transfer using EndoStyle to improve artificial intelligence prediction models.*

**npj Digital Medicine** · 2026-04-28 · 方法学开发与多中心验证 · [PMID 42050035](https://pubmed.ncbi.nlm.nih.gov/42050035/) · [DOI](https://doi.org/10.1038/s41746-026-02693-4)

开发基于StarGANv2的EndoStyle，迁移模拟5种内镜处理器的视觉特征。FID、LPIPS示高保真；用合成图增强息肉检测模型训练后显著提升精确度与特异度，两评估集假阳性降低超40%。属内镜图像方法学、诊断性息肉检测，边缘相关。

> **要点**：风格迁移提升内镜AI跨处理器泛化，降假阳性>40%。


### 45. 面向微创经耳道内耳介入的交互感知灵巧机器人

*Interaction-aware dexterous robot for minimally invasive transcanal inner ear interventions.*

**Nature Communications** · 2026-04-24 · 工程样机开发与离体/在体验证 · [PMID 42031753](https://pubmed.ncbi.nlm.nih.gov/42031753/) · [DOI](https://doi.org/10.1038/s41467-026-72398-5)

提出双段连续体机器人整合导管、内镜与器械功能，用于内耳靶向给药与微采样。由拮抗式缆绳驱动，最小弯曲半径1.9 mm；微针末端定位精度17.9±4.1 μm；光纤布拉格光栅传感器测量轴向力以估计器械-组织交互。在尸体与活体动物验证可行性。属机械/遥操作手术机器人，无AI自主成分，边缘相关。

> **要点**：内耳介入连续体机器人（定位精度17.9 μm），力觉感知但无AI自主。


### 46. 考虑区域风险异质性的甲状腺乳头状癌发生与淋巴结转移预测模型

*Predictive models for the occurrence and lymph node metastasis of papillary thyroid carcinoma with regional risk heterogeneity.*

**npj Digital Medicine** · 2026-04-18 · 转录组学机器学习建模(公共数据) · [PMID 42000882](https://pubmed.ncbi.nlm.nih.gov/42000882/) · [DOI](https://doi.org/10.1038/s41746-026-02649-8)

基于转录组学开发可解释AI预测甲状腺乳头状癌(PTC)发生与颈淋巴结转移。GEO 419样本(正常158、PTC 203、转移58)，深度神经网络(DNN)表现最佳：诊断模型AUC 0.987、准确率0.945，转移预测AUC 0.998、准确率0.987；SHAP与KAN识别SYT1/REN/CNTN5/ADAM12等诊断关键特征、COL9A1/CYP4F3/GAD1为转移关键预测因子。作者声明为研究原型、未经前瞻验证。

> **要点**：转录组DNN预测PTC诊断与淋巴结转移(组学研究原型，边缘相关)。


### 47. 血浆细胞外囊泡多组学与多光谱联合分析用于胶质瘤液体活检诊断

*Combined multi-omics and multi-spectral profiling of plasma extracellular vesicles reveals liquid biopsy biomarkers for glioma diagnosis.*

**Cell Reports Medicine** · 2026-04-17 · 多队列诊断标志物开发与验证 · [PMID 41999751](https://pubmed.ncbi.nlm.nih.gov/41999751/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102744)

联合多光谱(FTIR/Raman)与多组学(蛋白质组/miRNA)分析血浆小细胞外囊泡(sEV)用于胶质瘤诊断,纳入206份样本(159人)、3个独立队列。ML模型AUC 0.931-0.971,外部验证中蛋白质组与多模态特征在纵向队列达100%准确率,发现45个蛋白与20个miRNA一致改变。属神经外科疾病的诊断组学ML,无外科动作。

> **要点**：血浆sEV多模态特征用于胶质瘤液体活检诊断(AUC 0.93-0.97)


### 48. 用ClarityDX Prostate模型（含/不含DRE与MRI）预测有临床意义前列腺癌

*Predicting clinically significant prostate cancer with or without digital rectal exam and MRI data using ClarityDX Prostate models.*

**npj Digital Medicine** · 2026-04-17 · 多中心预后建模与验证 · [PMID 41998222](https://pubmed.ncbi.nlm.nih.gov/41998222/) · [DOI](https://doi.org/10.1038/s41746-026-02642-1)

用校准随机森林集成，基于总/游离PSA、既往阴性活检与年龄预测有临床意义前列腺癌（csPCa），跨加拿大/美国/捷克六机构。各模型验证集ROC AUC≥0.80，加DRE达0.82，含MRI达0.87（不含DRE）与0.88（含DRE）。属前列腺癌活检分诊风险模型，外科成分弱，边缘相关。

> **要点**：随机森林预测csPCa以优化活检决策。


### 49. 用于慢性消化不良人群胃癌分诊的新型血液生物标志物开发与验证

*Development and validation of a novel blood-based biomarker for gastric cancer triage in chronic dyspepsia.*

**npj Digital Medicine** · 2026-04-17 · 大样本回顾性开发与验证 · [PMID 41998063](https://pubmed.ncbi.nlm.nih.gov/41998063/) · [DOI](https://doi.org/10.1038/s41746-026-02618-1)

利用香港20年territory-wide数据（训练210,463人/3071例；验证90,479人/2066例）开发ML整合的RBT-GC，将验证队列（基线2.3%）分为低（0.3%）、中（1.9%）、高（14.0%）风险；检出较CEA多12倍、CA19.9多30倍，高危组内镜需检数从44降至7。属胃癌内镜分诊，外科成分弱，边缘相关。

> **要点**：ML重构常规血检为胃癌内镜分诊工具，NNS由44降至7。


### 50. 猕猴虚拟现实导航的皮层内脑机接口

*Intracortical brain-computer interface for navigation in virtual reality in macaque monkeys.*

**Science Advances** · 2026-04-15 · 动物实验（猕猴） · [PMID 41984955](https://pubmed.ncbi.nlm.nih.gov/41984955/) · [DOI](https://doi.org/10.1126/sciadv.adw3876)

皮层内脑机接口（BCI）利用初级运动、背/腹侧运动前皮层神经信号实时解码三维速度，在沉浸式VR中实现连续导航与避障，无需在线重训练。BCI经神经外科植入且用ML解码，但研究聚焦解码与导航而非手术，归边缘。

> **要点**：皮层内BCI+ML导航解码，植入邻接，边缘


### 51. 统一多模态学习用于卒中分诊：急性缺血性卒中联合检测、评分与分割

*Unified multimodal learning for stroke triage: joint detection, scoring, and segmentation of acute ischemic stroke.*

**npj Digital Medicine** · 2026-04-13 · 多中心多任务深度学习开发与验证 · [PMID 41975201](https://pubmed.ncbi.nlm.nih.gov/41975201/) · [DOI](https://doi.org/10.1038/s41746-025-02255-0)

提出统一多模态框架，在单一编码-解码架构下融合NCCT、CTA、CTP，联合完成大血管闭塞检测、侧支评分与梗死分割。较SOTA基线LVO检测AUC提升达+0.05、侧支评分二次加权κ+0.11、梗死Dice+5%，PACS部署推理<1分钟。属卒中影像分诊，可外推至介入决策，边缘相关。

> **要点**：统一多模态影像加速卒中分诊，减少误诊与转运。


### 52. 图式化视觉-语言建模用于综合肺结节分析与风险分层（VITALIS）

*Graphicalized vision-language modeling for comprehensive lung nodule analysis and risk stratification.*

**npj Digital Medicine** · 2026-04-11 · 多队列多任务深度学习 · [PMID 41965884](https://pubmed.ncbi.nlm.nih.gov/41965884/) · [DOI](https://doi.org/10.1038/s41746-026-02602-9)

提出VITALIS多模态视觉-语言框架，用图感知Transformer融合CT/PET-CT与结构化放射文本，经上下文调制Neural ODE的连续时间隐风险过程，联合完成结节检测、恶性分类、生存风险与计数。三个公开队列上实现准确勾画、低假阳定位与校准的生存估计。属肺癌诊断-预后影像AI，可外推至外科决策，边缘相关。

> **要点**：图式VL模型统一肺结节诊断与预后建模。


### 53. ChatGPT用于肥胖管理：证据、挑战与临床意义综述

*ChatGPT for obesity management: a review of evidence, potential challenges, and clinical implications.*

**The Lancet Digital Health** · 2026-04-10 · 综述（主题综合，37项研究） · [PMID 41966942](https://pubmed.ncbi.nlm.nih.gov/41966942/) · [DOI](https://doi.org/10.1016/j.landig.2026.100980)

主题综合综述纳入37项研究，ChatGPT在12项生活方式/营养研究中9项（75%）、10项减重手术研究中5项（50%）显示高准确性；仅10/37（27%）为高可信度。涵盖含手术指导在内的8个应用领域。以肥胖管理为主体、减重外科为其中一部分，归边缘。

> **要点**：ChatGPT肥胖管理综述，含减重外科子集，边缘


### 54. 咬合激活的自主压电种植体用于自适应预防种植体周围炎

*Occlusion-activated autonomous piezoelectric implants for adaptive prevention of peri-implantitis.*

**Nature Communications** · 2026-04-09 · 器械/材料开发（体外+体内） · [PMID 41951599](https://pubmed.ncbi.nlm.nih.gov/41951599/) · [DOI](https://doi.org/10.1038/s41467-026-71556-z)

边缘相关：提出经生理咬合激活、无需外部干预的自主压电牙种植体，经百万次加载循环与30天仍稳定输出，集成机器学习实现患者特异的咬合机械自适应电压预测与实时调控，并具抗菌/免疫调节/促成骨三模治疗。属外科植入器械，ML用于器件电压而非手术辅助。

> **要点**：压电牙种植体+ML电压预测，外科成分为植入


### 55. 肺腺癌生存的5mC甲基化预后模型开发与验证(MethPro-LUAD)

*Development and validation of a 5mC-based prognostic model for lung adenocarcinoma survival.*

**Cell Reports Medicine** · 2026-04-01 · 预后模型开发与多队列外部验证 · [PMID 41928513](https://pubmed.ncbi.nlm.nih.gov/41928513/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102727)

基于8个5-甲基胞嘧啶特征构建LUAD预后模型MethPro-LUAD,TCGA训练N=269/测试N=180,两家医院(北京195、南京88)与两个GEO集(82、155)外部验证。高危组各队列总生存显著更短,并在年龄/性别/分期/EGFR等亚组稳健,优于既往模型。为预后组学ML,支持术后个体化治疗与随访,外科动作弱。

> **要点**：8特征甲基化模型稳健分层LUAD生存,助力术后个体化管理


### 56. AI辅助结直肠病变检测在私立诊所的随机对照研究（EndoMind）

*Artificial intelligence assisted colorectal lesion detection in private practices a randomized controlled study.*

**npj Digital Medicine** · 2026-04-01 · 多中心随机对照试验（NCT05006092） · [PMID 41922731](https://pubmed.ncbi.nlm.nih.gov/41922731/) · [DOI](https://doi.org/10.1038/s41746-026-02576-8)

多中心RCT评估实时息肉检测系统EndoMind在筛查/监测结肠镜中的效果，933人随机、914人纳入意向性分析（CAC 452 vs TC 462）。腺瘤检出率ADR在AI辅助组34.5% vs 传统组32.9%（p=0.656），差异无统计学意义。属内镜筛查场景实时检测，介入/操作邻接但外科动作弱，列为边缘。

> **要点**：实时CADe未显著提高结肠镜腺瘤检出率。


### 57. 面向自动内镜报告的领域专用多模态大语言模型（Report-Angel）

*Domain specific multimodal large language model for automated endoscopy reporting with multicenter prospective validation.*

**npj Digital Medicine** · 2026-03-28 · 多中心前瞻性验证（回顾+前瞻队列） · [PMID 41904204](https://pubmed.ncbi.nlm.nih.gov/41904204/) · [DOI](https://doi.org/10.1038/s41746-026-02569-7)

基于多模态LLM与传统深度学习构建Report-Angel，用20,617对图文训练自动生成上消化道内镜报告。前瞻内/外部队列临床可接受报告率79.3%/83.3%，病例级完整性88.51%、准确率78.93%，每病灶1.5秒；病灶级准确率83.94-91.92%。属内镜（操作）报告生成，外科动作弱，列为边缘。

> **要点**：多模态LLM生成专家级内镜报告草稿。


### 58. 扩展现实(XR)在临床神经病学中的应用:从跨学科创新到临床实践(综述)

*Extended reality in clinical neurology: From interdisciplinary innovations to clinical practice.*

**Cell Reports Medicine** · 2026-03-27 · 叙述性综述 · [PMID 41903546](https://pubmed.ncbi.nlm.nih.gov/41903546/) · [DOI](https://doi.org/10.1016/j.xcrm.2026.102696)

综述XR(含VR/AR/MR)在神经病学的技术基础与临床应用,涉及认知/运动/感觉功能评估、神经外科培训与术中XR引导(改善空间理解与决策支持)、卒中及神经疾病沉浸式康复。属技术综述,无量化数据;术中XR引导仅为其中一节,XR本身非严格AI。

> **要点**：XR有望重塑神经外科培训与术中引导,但为宽泛综述、非AI专论


### 59. 基础模型在肌骨MRI中用于生物标志物保真与结局预测的临床效用

*Clinical utility of foundation models in musculoskeletal MRI for biomarker fidelity and predictive outcomes.*

**npj Digital Medicine** · 2026-03-24 · 基础模型开发与多任务评估 · [PMID 41876760](https://pubmed.ncbi.nlm.nih.gov/41876760/) · [DOI](https://doi.org/10.1038/s41746-026-02520-w)

将SAM、SAM2、MedSAM等可提示基础分割模型在异质肌骨数据上微调并联合自动检测实现全自动测量，与专家标注高度一致；构建三阶段膝关节分诊级联并用48个月landmark模型预测膝关节置换与骨关节炎发生，校准与净获益良好。属通用肌骨影像基础模型，仅将膝关节置换作为下游预测之一，外科成分较弱，列为边缘。

> **要点**：肌骨MRI基础模型顺带预测膝置换需求，边缘相关。


### 60. 深度学习提升儿童髋部骨折检测：多中心验证与临床阅片研究

*Improving pediatric hip fracture detection using deep learning: multicenter validation and clinical reader study*

**International Journal of Surgery** · 2026-03-19 · 回顾性多中心+多阅片者研究（n=794片） · [DOI](https://doi.org/10.1097/js9.0000000000005138)

回顾性多中心研究，纳入2013–2024年4家医院640例8岁以下儿童794张髋部X线片，训练YOLOv11目标检测模型（712张）并外部验证（82张）自动定位诊断股骨颈骨折。内部/外部AUROC 0.911/0.873，敏感度/特异度84.9%/85.5%与80.8%/91.1%；AI辅助显著提升初级阅片者准确率（ΔAUROC +0.083，P=0.007）与一致性（κ 0.49→0.61），平均推理56.2ms。属创伤影像诊断AI（结论可外推至外科固定决策）。

> **要点**：YOLOv11实时检测儿童股骨颈骨折并提升初级医师诊断，属影像AI边缘话题。


### 61. 评论：基于CT内脏脂肪组织影像组学特征预测NMIBC早期复发的多中心队列研究

*A commentary on “CT-based radiomics signature of visceral adipose tissue for prediction of early recurrence in patients with NMIBC: a multicentre cohort study”*

**International Journal of Surgery** · 2026-03-18 · 评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005108)

评论文章(无摘要、无数据)，针对一项利用CT内脏脂肪组织影像组学预测非肌层浸润性膀胱癌(NMIBC)早期复发的多中心研究进行讨论。属影像组学复发预测的评论，外科动作较弱，列边缘。

> **要点**：对NMIBC复发影像组学模型的评论(复发预测为主，列边缘)


### 62. 关于“深度学习提取CT体成分作为局部晚期胃癌预后生物标志物”临床转化的读者来信

*Letter to the Editor: clinical translation considerations regarding deep learning-derived CT body composition as a prognostic biomarker for locally advanced gastric cancer*

**International Journal of Surgery** · 2026-03-18 · 读者来信（无数据） · [DOI](https://doi.org/10.1097/js9.0000000000005122)

读者来信（Letter），无原始数据，就一项以深度学习从CT提取体成分（body composition）作为局部晚期胃癌预后生物标志物的研究，讨论其临床转化考量。属深度学习影像生物标志物用于预后，外科动作间接。

> **要点**：DL-CT体成分胃癌预后标志物的临床转化来信，属影像AI边缘话题。


### 63. 评论：AI辅助临床影像检测口腔潜在恶性病变与口腔癌诊断准确性的系统综述与meta分析

*Comment on “Diagnostic accuracy of artificial intelligence assisted clinical imaging in the detection of oral potentially malignant disorders and oral cancer: a systematic review and meta-analysis”*

**International Journal of Surgery** · 2026-03-17 · 评论(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000005051)

评论文章(无摘要、无数据)，针对一项关于AI辅助临床影像检测口腔潜在恶性病变(OPMD)与口腔癌诊断准确性的系统综述与meta分析进行讨论。属诊断性影像AI的评论，外科动作较弱，列边缘。

> **要点**：对口腔癌AI影像诊断meta分析的评论(诊断筛查为主，列边缘)


### 64. 机器学习驱动的仿生纤毛设计实现声学微机器人混合操作

*Machine learning-driven design of engineered cilia enables hybrid operations in acoustic microrobots.*

**Nature Communications** · 2026-03-12 · 方法学开发(ML+有限元仿真) · [PMID 41820370](https://pubmed.ncbi.nlm.nih.gov/41820370/) · [DOI](https://doi.org/10.1038/s41467-026-70048-4)

面向精准医疗微创介入,提出可几何调控纤毛的声学微机器人,采用自增强机器学习结合有限元分析优化几何-共振关系,预测时间缩短>10⁵倍、内存节省>20倍,峰值幅度精度>90%、共振频率精度>98%。属微机器人执行器设计,与外科自主操作邻接但非直接手术AI。

> **要点**：ML加速声学微机器人设计,潜在用于微创介入(边缘相关)


### 65. 病灶周围神经调控替代脊髓损伤患者丧失的感觉运动功能

*Perilesional neuromodulation replaces lost sensorimotor function in persons with spinal cord injury.*

**Nature Biomedical Engineering** · 2026-03-11 · 首次人体研究（3例） · [PMID 41813803](https://pubmed.ncbi.nlm.nih.gov/41813803/) · [DOI](https://doi.org/10.1038/s41551-026-01627-5)

边缘相关：在3例运动完全性慢性脊髓损伤者中，用病灶周围硬膜外电刺激(EES)实现下肢运动激活与体感反馈同步，借助深度学习方法与患者自主控制确定运动/感觉EES参数，使患者能准确报告腿部位置并在功能任务中意向性控制运动与感觉反馈。属神经调控，外科为EES植入。

> **要点**：病灶周围EES+深度学习参数化恢复脊髓损伤感觉运动


### 66. 片段组学液体活检实现乳腺癌早期检测、分子分型与淋巴结评估

*Fragmentomic liquid biopsy enables early breast cancer detection, molecular subtyping and lymph node assessment.*

**Nature Communications** · 2026-03-06 · 多中心病例对照研究 · [PMID 41792156](https://pubmed.ncbi.nlm.nih.gov/41792156/) · [DOI](https://doi.org/10.1038/s41467-026-70204-w)

多中心病例对照研究纳入503例乳腺癌与289例良性对照,基于全基因组cfDNA片段组学特征构建机器学习模型TuFEst,早期检测敏感度95%、特异度78.3%,并可无创分子分型(TuFEst-MS)与淋巴结状态预测(TuFEst-LN);配对肿瘤转录组(n=79)显示高癌症评分反映侵袭性。淋巴结/分型信息可外推至外科决策,但主体为诊断性液体活检。

> **要点**：cfDNA片段组学一体化液体活检,淋巴结/分型可辅助外科决策(边缘相关)


### 67. 行星际太空任务中的外科手术

*Surgery for interplanetary space missions.*

**British Journal of Surgery** · 2026-03-04 · 叙述性综述(无数据) · [PMID 41823369](https://pubmed.ncbi.nlm.nih.gov/41823369/) · [DOI](https://doi.org/10.1093/bjs/znag005)

综述太空外科研究,聚焦手术机器人:抛物线飞行与模拟环境显示在约束操作者/患者/器械时减重力对手术技能影响有限;理想太空手术机器人应紧凑多功能、含AI驱动决策支持、可变自主与人在回路控制,并借云/边缘计算缓解通信延迟。属太空情境的机器人+AI自主综述,故边缘相关。

> **要点**：自主/半自主手术机器人是未来深空探索关键能力,但尚未成熟


### 68. 从术野视频标注中识别非技术技能的新指标

*Identifying novel indicators of non-technical skills derived from operative video annotation.*

**British Journal of Surgery** · 2026-03-04 · 视频标注+多元线性回归(横断面) · [PMID 41709739](https://pubmed.ncbi.nlm.nih.gov/41709739/) · [DOI](https://doi.org/10.1093/bjs/znag015)

对40个开源腹腔镜阑尾切除视频进行时空标注(共10,385事件、87,374数据点),12名专家用NOTSS评定决策与情境意识(各1-4分),多元线性回归寻找预测非技术技能(NTS)的视频指标。认知NOTSS均分5.6(满分8),决策与情境意识高度相关(r=0.8,P<0.001);最终模型解释39.6%方差,识别5项预测因子(灵巧度指数、末期操作事件、电凝、掉落动作、指向小肠的操作)。方法为人工标注+线性回归,属外科视频技能评估邻接研究,故边缘相关。

> **要点**：静默术野视频的手势特征可反映外科医生认知非技术技能,为自动化评估奠基


### 69. 利益相关方共建的外科赛博计量学(sabermetrics)培训落地框架

*Development of a stakeholder-informed framework for the implementation of surgical sabermetrics to enhance training and education.*

**British Journal of Surgery** · 2026-03-04 · 定性利益相关方研究(工作坊/概念图) · [PMID 41664835](https://pubmed.ncbi.nlm.nih.gov/41664835/) · [DOI](https://doi.org/10.1093/bjs/znag009)

在两场国际外科会议(2025年爱丁堡)开展结构化工作坊,54名来自13国的外科师生通过引导讨论、互动投票与概念图共建,形成将数据驱动的外科表现指标(视频/可穿戴/数据分析)整合入培训课程的落地框架:技术技能优先实时视频反馈、非技术/认知技能用仪表盘、表现指标用结构化报告。为定性框架、无AI模型,属外科数据科学邻接,故边缘相关。

> **要点**：提出外科sabermetrics培训落地框架,规范交付/权限/多模态数据整合


### 70. 生成扩散AI结合非对比MRI无造影剂识别胶质瘤血脑屏障状态

*Contrast-free identification of glioma blood-brain barrier status via generative diffusion AI and non-contrast MRI.*

**Nature Communications** · 2026-03-03 · 多中心诊断建模 · [PMID 41776178](https://pubmed.ncbi.nlm.nih.gov/41776178/) · [DOI](https://doi.org/10.1038/s41467-026-69578-8)

针对胶质瘤术前诊断,提出无造影剂血脑屏障(BBB)状态识别模型CBSI,基于非对比MRI与生成扩散网络。多中心1535例训练验证,外部测试AUC 81.31%,优于仅用非对比MR的模型(AUC 72.76%),接近T1Gd模型(88.68%),并显著改善胶质瘤分割与分级。属术前影像AI,未直接给出外科动作。

> **要点**：生成扩散AI合成增强影像判定BBB,规避钆造影剂(边缘相关)


### 71. 可解释机器学习诊断标准用于儿童腹腔脓毒症的开发与多中心验证（ABSeD）

*Development and multicenter validation of an explainable machine learning diagnostic criteria for pediatric abdominal sepsis.*

**npj Digital Medicine** · 2026-03-03 · 多中心回顾开发+前瞻外部验证 · [PMID 41775847](https://pubmed.ncbi.nlm.nih.gov/41775847/) · [DOI](https://doi.org/10.1038/s41746-026-02500-0)

用浙大儿院6566例回顾数据开发可解释ML模型ABSeD诊断儿童腹腔脓毒症(PAS)，PAS状态经共识或腹腔镜手术记录确定，7家医院308例前瞻数据外部验证。整合9项常规变量，训练集AUC 0.934(准确率0.870)、外部验证AUC 0.928(准确率0.873)。腹腔脓毒症与急诊外科邻接但AI任务为脓毒症诊断，外科成分较弱，列为边缘。

> **要点**：可解释ML早期识别儿童腹腔脓毒症，外科关联间接，边缘。


### 72. 关于「AI预测口腔潜在恶性病变切除后复发与恶性进展」一文的评论

*Comment on "Artificial Intelligence for predicting post-excision recurrence and malignant progression in oral potentially malignant disorders: a retrospective cohort study".*

**International Journal of Surgery** · 2026-02-25 · 评论/来信 · [PMID 41738603](https://pubmed.ncbi.nlm.nih.gov/41738603/) · [DOI](https://doi.org/10.1097/JS9.0000000000004994)

读者评论(无摘要正文),针对一项用AI预测口腔潜在恶性病变切除术后复发/恶性进展的回顾队列研究。属外科AI(切除术后复发预测)相关学术讨论,本身无原始数据。

> **要点**：针对切除术后AI复发预测研究的评论,无独立数据


### 73. 整合多组学精化甲状腺癌分子亚型并提升癌症进展预测：回顾性队列研究

*Integrative multi-omics refines the molecular subtypes of thyroid cancers and enhances cancer-progression prediction: a retrospective cohort study.*

**International Journal of Surgery** · 2026-02-23 · 回顾性多组学队列研究 · [PMID 41728981](https://pubmed.ncbi.nlm.nih.gov/41728981/) · [DOI](https://doi.org/10.1097/JS9.0000000000004979)

单中心回顾研究，整合转录组与蛋白组构建新基因集（NPF genes）与决策树分类系统，将甲状腺癌分为BRAFV600E样、RAS样、NT样亚型，分类准确率0.92（95%CI 0.88–0.95）、Kappa 0.88，并经IHC（MATN2、FN1、PLSCR4）及TCGA等外部数据集验证，高NP/NF评分预示更差预后。属外科肿瘤多组学分子分型（无明确外科动作）。

> **要点**：多组学决策树精化甲状腺癌分子分型与进展预测（外科邻接）。


### 74. 关于「多组学整合机器学习与空间-细胞分析鉴定SASH1为头颈鳞癌预后标志物」一文的评论

*Comments on "A multi-omics pipeline integrating machine learning and spatial-cellular analysis identifies SASH1 as a prognostic biomarker and therapeutic target in head and neck squamous cell carcinoma".*

**International Journal of Surgery** · 2026-02-23 · 评论/来信 · [PMID 41729716](https://pubmed.ncbi.nlm.nih.gov/41729716/) · [DOI](https://doi.org/10.1097/JS9.0000000000004222)

读者评论(无摘要正文),针对一项用多组学ML与空间-细胞分析鉴定SASH1为头颈鳞癌(HNSCC)预后与治疗靶点的研究。属外科相关肿瘤组学ML的学术讨论,本身无原始数据。

> **要点**：针对头颈鳞癌组学ML标志物研究的评论,无独立数据


### 75. GRP75所致耐药肝癌的智能识别与靶向干预:基于影像组学、机器学习与分子药理学

*Intelligent identification and targeted intervention of GRP75-caused drug resistant hepatocellular carcinoma, a study based on radiomics, machine learning, and molecular pharmacology.*

**International Journal of Surgery** · 2026-02-19 · 影像组学AI建模+分子药理实验 · [PMID 41711200](https://pubmed.ncbi.nlm.nih.gov/41711200/) · [DOI](https://doi.org/10.1097/JS9.0000000000004913)

整合影像组学与AI算法构建术前影像风险分层模型,识别GRP75相关不良预后的肝癌患者;并结合中药数据库与分子对接筛得GRP75靶向单体黄芩苷,逆转顺铂/索拉非尼耐药。术前影像组学AI仅为其中一环,未报告判别指标,余为分子机制验证。

> **要点**：术前影像组学AI分层GRP75相关肝癌预后并指向黄芩苷靶向逆转耐药


### 76. 生成式人工智能在医疗中的应用:文献计量分析

*Generative artificial intelligence in healthcare: a bibliometric analysis.*

**International Journal of Surgery** · 2026-02-18 · 文献计量分析 · [PMID 41706636](https://pubmed.ncbi.nlm.nih.gov/41706636/) · [DOI](https://doi.org/10.1097/JS9.0000000000004041)

文献计量分析1987篇生成式AI医疗文献,2023年起激增(2023年496篇、2024年1478篇);美国产出与被引最高(841篇/8740次);主题涵盖临床诊断、决策支持、医学与患者教育、心理健康,多个聚类凸显生成式AI在外科的潜在影响。外科为被强调的分支之一。

> **要点**：生成式AI医疗研究快速增长,外科为被强调的应用分支


### 77. 跨模态域泛化学习桥接乳腺X线与病理的乳腺癌诊断框架

*Bridging radiology and pathology: domain-generalized cross-modal learning for clinical.*

**npj Digital Medicine** · 2026-02-16 · 方法学/模型开发研究（多公开数据集验证） · [PMID 41699055](https://pubmed.ncbi.nlm.nih.gov/41699055/) · [DOI](https://doi.org/10.1038/s41746-026-02423-w)

提出统一跨模态框架，用共享ViT编码器加模态适配器、弱监督患者级对比对齐、MixStyle加不变风险最小化域泛化及因果测试时自适应，联合完成乳腺癌分类、病灶定位与病理分级。在CBIS-DDSM、INbreast、BACH、CAMELYON16/17四个公开数据集上、留一域外验证平均AUC 0.90，域间差距0.03（对照基线0.06-0.10）。属诊断影像/病理AI，无明确外科动作。

> **要点**：跨乳腺X线与病理的域泛化AI诊断，留一域外AUC 0.90。


### 78. 解剖引导视觉提示微调的跨模态乳腺癌理解

*Anatomy-guided visual prompt tuning for cross-modal breast cancer understanding.*

**npj Digital Medicine** · 2026-02-13 · 方法学/模型开发研究 · [PMID 41688744](https://pubmed.ncbi.nlm.nih.gov/41688744/) · [DOI](https://doi.org/10.1038/s41746-026-02417-8)

提出A-VPT框架，在冻结ViT主干的提示空间注入腺体/脂肪/导管解剖先验并跨模态对比对齐，融合乳腺X线、超声与MRI。在INbreast、BUSI、Duke-Breast-MRI三个数据集上以低于2%的可调参数实现病灶分类与分割的SOTA。属诊断影像AI方法，无明确外科动作。

> **要点**：解剖先验提示微调的乳腺影像诊断，参数低于2%达SOTA。


### 79. 机器人辅助胸腔镜手术全球研究趋势:2000-2025多维分析

*Global research trends in robotic-assisted thoracoscopic surgery: a multidimensional analysis from 2000 to 2025.*

**International Journal of Surgery** · 2026-02-12 · 文献计量分析 · [PMID 41677330](https://pubmed.ncbi.nlm.nih.gov/41677330/) · [DOI](https://doi.org/10.1097/JS9.0000000000004939)

文献计量分析3025篇机器人辅助胸腔镜手术(RATS)文献(79国、2925机构、13408名研究者),呈三阶段增长,美国领先(1061篇/22079次引用);热点为肺切除、食管与纵隔手术,未来聚焦AI整合、机器人支气管镜与图像引导导航。属外科机器人文献计量,机器人为遥操作、AI仅为未来方向。

> **要点**：RATS研究快速增长且存全球不均衡,AI整合为未来方向(本文AI成分弱)


### 80. 文本引导闭环框架用于肺癌病灶分割与量化

*Closed loop text guided framework for lung cancer lesion segmentation and quantification.*

**npj Digital Medicine** · 2026-02-12 · 方法学/模型开发研究 · [PMID 41680279](https://pubmed.ncbi.nlm.nih.gov/41680279/) · [DOI](https://doi.org/10.1038/s41746-026-02422-x)

提出BiomedLoop，用微调Grounding DINO定位加SEEM精修(含不确定性感知特征调制)，将掩膜几何描述转为伪文本提示微调定位路径，并输出符合TID 1500的结构化报告。在5个公开基准上Dice更高、Hausdorff距离更低，优于CNN与SAM变体。属诊断分割/报告，无明确外科动作。

> **要点**：文本引导肺癌分割与结构化报告，Dice优于SAM。


### 81. 预测心内膜心肌活检诊断产出的机器学习评分

*Derivation and validation of a machine learning-driven score to predict the diagnostic yield of endomyocardial biopsy.*

**npj Digital Medicine** · 2026-02-09 · 回顾性队列加外部验证 · [PMID 41663558](https://pubmed.ncbi.nlm.nih.gov/41663558/) · [DOI](https://doi.org/10.1038/s41746-026-02421-y)

回顾性分析775例接受心内膜心肌活检(EMB)的心衰患者，随机森林构建0-100分评分预测EMB是否获确定性诊断(阳性率19.9%，最常为淀粉样变占50%)。交叉验证AUC 0.92(95%CI 0.89-0.96)、测试集0.91、外部验证0.82(n=171)，右室LGE为最强预测因子。属侵入性操作决策支持，外科成分弱。

> **要点**：无创预测心肌活检产出以辅助操作决策，AUC 0.92。


### 82. 对“食管鳞癌颈部淋巴结转移预测建模”评论的回应

*Response to commentary on predictive modeling for cervical lymph node metastasis in esophageal squamous cell carcinoma.*

**International Journal of Surgery** · 2026-02-03 · 回应/来信(无原始数据) · [PMID 41632005](https://pubmed.ncbi.nlm.nih.gov/41632005/) · [DOI](https://doi.org/10.1097/JS9.0000000000004815)

针对食管鳞癌(ESCC)颈部淋巴结转移预测建模一文评论的作者回应，无独立数据，且原文AI/ML属性未明确。与外科预测建模主题邻接，列为边缘。

> **要点**：ESCC颈部淋巴结转移预测建模的评论回应，边缘相关。


### 83. 域对齐证据引导的脑肿瘤MRI联合分割与分类框架

*DARE-FUSE: domain aligned evidence guided learning for joint brain tumor MRI segmentation and classification.*

**npj Digital Medicine** · 2026-02-02 · 方法学/模型开发研究 · [PMID 41629595](https://pubmed.ncbi.nlm.nih.gov/41629595/) · [DOI](https://doi.org/10.1038/s41746-026-02365-3)

提出DARE-FUSE，用双编码器加域对齐精修器学习共享表征，分割分支输出像素不确定性、分类分支产生多尺度Grad-CAM++证据，并借生成式无肿瘤重建的差异先验抑制幻觉。在BraTS分割与多个分类数据集上表现领先，标签削减时退化平滑。虽提及服务手术/放疗/随访，但为通用分割分类方法，无整合式外科动作。

> **要点**：证据引导脑肿瘤分割分类，支持术前边界评估与随访。


### 84. 利用循环祖细胞早期检测异位骨化中的异常细胞命运与修复

*Early detection of aberrant cell fate and repair using circulating progenitor cells in patients with heterotopic ossification.*

**Nature Communications** · 2026-01-31 · 转化研究(人+小鼠模型) · [PMID 41620424](https://pubmed.ncbi.nlm.nih.gov/41620424/) · [DOI](https://doi.org/10.1038/s41467-026-68857-8)

异位骨化(HO)是关节置换术、创伤、烧伤后并发症。经微流控iChip分离循环间充质祖细胞(cMPCs),伤后6小时即出现HO相关基因表达(早于影像检测41天);基于cMPCs RNA测序构建液体活检HO风险预测模型,人群中敏感度达90%、特异度100%,并能反映预防性治疗后风险下降。属术后并发症生物标志物模型,外科成分弱、AI表述有限。

> **要点**：循环祖细胞液体活检早期预测术后异位骨化(敏感度90%/特异度100%,边缘相关)


### 85. 上下文与频率引导的Mamba医学图像分割网络

*CFG-MambaNet: Contextual and Frequency-Guided Mamba Network for medical image segmentation.*

**npj Digital Medicine** · 2026-01-31 · 方法学/模型开发研究 · [PMID 41620524](https://pubmed.ncbi.nlm.nih.gov/41620524/) · [DOI](https://doi.org/10.1038/s41746-026-02393-z)

提出CFG-MambaNet，用可变尺度Mamba状态空间块以线性复杂度建模长程依赖、频率引导模块分离低频结构与高频边界、自适应上下文聚合，配合复合损失与深监督。在ACDC、Kvasir-SEG、ISIC、SEED四数据集(心脏MRI/内镜/皮肤镜/病理)验证。为通用分割方法，无外科语境。

> **要点**：Mamba通用医学图像分割网络，四数据集验证。


### 86. 数字化辅助手术下颌成釉细胞瘤切除的更小安全外科边界

*Smaller safe surgical margin for resecting mandibular ameloblastomas in digitally assisted surgery.*

**International Journal of Surgery** · 2026-01-28 · 回顾性临床研究 · [PMID 41601351](https://pubmed.ncbi.nlm.nih.gov/41601351/) · [DOI](https://doi.org/10.1097/JS9.0000000000004858)

回顾性研究（23例），采用3D虚拟手术规划与数字化手术导板行下颌成釉细胞瘤节段性切除并评估安全骨边界。Cohort 1计划与实测边界平均偏差1.05mm（P>0.05）、边缘均阴性；Cohort 2预设6mm边界者阳性率4.0%（1/25）。属数字化虚拟手术规划（计算机辅助，无明确AI/ML成分）。

> **要点**：数字化虚拟规划实现下颌成釉细胞瘤毫米级精准切除（外科邻接）。


### 87. 来信：人工智能预测新辅助化疗结局的临床视角

*Letter to the Editor: clinical perspective of the artificial intelligence predicting outcomes of neoadjuvant chemotherapy.*

**International Journal of Surgery** · 2026-01-28 · 来信(无原始数据) · [PMID 41601362](https://pubmed.ncbi.nlm.nih.gov/41601362/) · [DOI](https://doi.org/10.1097/JS9.0000000000004871)

针对AI预测新辅助化疗结局一文的来信评论，无独立数据。属预测新辅助(系统)治疗反应的临床AI，与外科决策间接相关，列为边缘。

> **要点**：关于AI预测新辅助化疗结局的来信，边缘相关。


### 88. 评“深度学习增强MRI影像组学预测头颈鳞癌对新辅助化免疫治疗的病理反应”

*Commentary on "Deep learning enhanced MRI radiomics in predicting pathologic response of head and neck squamous carcinoma to neoadjuvant chemoimmunotherapy: a retrospective analysis".*

**International Journal of Surgery** · 2026-01-28 · 评论(无原始数据) · [PMID 41601333](https://pubmed.ncbi.nlm.nih.gov/41601333/) · [DOI](https://doi.org/10.1097/JS9.0000000000004865)

针对一项DL增强MRI影像组学预测HNSCC新辅助化免疫治疗病理反应研究的评论，无独立数据。属预测系统治疗反应的影像AI，外科动作间接，列为边缘。

> **要点**：关于DL影像组学预测HNSCC新辅助反应的评论，边缘相关。


### 89. 提示-Mamba滤波网络用于腹部CT肝细胞癌病灶分割

*Prompt-mamba filtering networks for accurate hepatocellular carcinoma lesion segmentation in abdominal CT.*

**npj Digital Medicine** · 2026-01-27 · 方法学/模型开发研究 · [PMID 41593314](https://pubmed.ncbi.nlm.nih.gov/41593314/) · [DOI](https://doi.org/10.1038/s41746-026-02371-5)

提出Prompt-Mamba-AF，用解剖感知提示引导肝区特征、Mamba状态空间以线性复杂度建模体积长程依赖、结构感知滤波保持边界拓扑一致。在LiTS、3DIRCADb、CHAOS上Dice与边界精度领先，参数仅27.6M，小结节敏感度与跨域泛化提升。虽述服务手术规划，但本质为通用分割方法。

> **要点**：提示-Mamba肝癌CT分割，27.6M参数达SOTA。


### 90. 个体化机器人导航结合多模态影像的双束后交叉韧带重建新方法

*A novel approach to double-bundle posterior cruciate ligament reconstruction: leveraging individualized robotic navigation and multimodal imaging for superior precision and feasibility.*

**International Journal of Surgery** · 2026-01-26 · 技术方法/初步研究（摘要缺失） · [PMID 41586624](https://pubmed.ncbi.nlm.nih.gov/41586624/) · [DOI](https://doi.org/10.1097/JS9.0000000000004793)

介绍一种利用个体化机器人导航与多模态影像提高双束后交叉韧带（PCL）重建精度与可行性的新方法。属影像引导机器人导航（未见明确AI自主成分）。（仅标题、无摘要。）

> **要点**：机器人导航+多模态影像提升PCL重建精度（外科邻接）。


### 91. 评“TEVAR治疗B型主动脉夹层30天死亡率预测模型的回顾队列开发与内部验证”

*A commentary on "Retrospective cohort development and internal validation of a prediction model for 30-day mortality after TEVAR in Type B aortic dissection".*

**International Journal of Surgery** · 2026-01-26 · 评论(无原始数据) · [PMID 41586620](https://pubmed.ncbi.nlm.nih.gov/41586620/) · [DOI](https://doi.org/10.1097/JS9.0000000000004656)

针对一项TEVAR术后30天死亡率预测模型(回顾队列开发+内部验证)的评论，无独立数据，原文AI/ML属性未明确。与外科结局预测建模邻接，列为边缘。

> **要点**：关于TEVAR术后死亡率预测模型的评论，边缘相关。


### 92. 解剖约束注意力多模态深度学习从全景片筛查MRI可检出的颞下颌关节异常

*Multimodal deep learning with anatomically constrained attention for screening MRI-detectable TMJ abnormalities from panoramic images.*

**npj Digital Medicine** · 2026-01-23 · 回顾性诊断建模 · [PMID 41577795](https://pubmed.ncbi.nlm.nih.gov/41577795/) · [DOI](https://doi.org/10.1038/s41746-026-02378-y)

开发可解释深度学习框架，融合张口/闭口TMJ全景片与结构化临床元数据、解剖引导注意力与集成学习。在1355例(2710关节)中最佳集成模型AUC 0.86，Grad-CAM聚焦髁突区，消融证实临床元数据与空间注意力的增益，可用于分诊TMJ患者转MRI。属颌面影像诊断筛查/分诊，外科动作弱。

> **要点**：全景片筛查TMJ异常AUC 0.86，用于MRI转诊分诊。


### 93. 脑深部电刺激期间个性化有监督与无监督颅内睡眠解码

*Personalized supervised and unsupervised intracranial sleep decoding during deep brain stimulation.*

**npj Digital Medicine** · 2026-01-22 · 机器学习分类(颅内电生理) · [PMID 41571940](https://pubmed.ncbi.nlm.nih.gov/41571940/) · [DOI](https://doi.org/10.1038/s41746-026-02368-0)

分析5名帕金森病(PD)患者慢性刺激期间283小时多夜颅内皮层-基底节记录(同步头皮EEG睡眠分期)，评估个性化ML睡眠分期以支撑自适应DBS(aDBS)。五期分类平均准确率80.2%(±0.9% SEM)；限制为DBS设备可实现算法(线性模型二分类NREM)时平均85.9%(±0.4%)；无监督聚类标签训练的线性模型区分NREM达83.5%(±5.6%)。

> **要点**：个性化ML从颅内信号解码睡眠分期以支撑自适应DBS(程控相关，边缘)。


### 94. 对《多模态放射病理组学预测胃癌预后与免疫治疗反应》的评论

*Comment on "Multimodal radiopathomics approach for predictions of prognosis and immunotherapy response in patients with gastric cancer: a multicohort retrospective study".*

**International Journal of Surgery** · 2026-01-21 · 评论（无数据） · [PMID 41563879](https://pubmed.ncbi.nlm.nih.gov/41563879/) · [DOI](https://doi.org/10.1097/JS9.0000000000004852)

针对一项多模态放射病理组学（radiopathomics）预测胃癌预后与免疫治疗反应的多队列回顾研究的评论。属影像/病理组学预后预测的外科邻接主题。（仅标题、无摘要。）

> **要点**：评论放射病理组学预测胃癌预后（外科邻接）。


### 95. 评“预测活体供肾移植后早期肾功能的术前列线图与网络化临床决策支持系统”

*Commentary on "A preoperative nomogram and web-based clinical decision support system for predicting early renal function after living donor kidney transplantation".*

**International Journal of Surgery** · 2026-01-21 · 评论(无原始数据) · [PMID 41563315](https://pubmed.ncbi.nlm.nih.gov/41563315/) · [DOI](https://doi.org/10.1097/JS9.0000000000004670)

针对一项活体供肾移植术前列线图+网络化临床决策支持系统研究的评论，无独立数据，原文以列线图/CDS为主、ML属性未明确。与移植外科预测建模邻接，列为边缘。

> **要点**：关于活体供肾移植术前列线图/CDS的评论，边缘相关。


### 96. 多组学整合干性相关病理特征指导葡萄膜黑色素瘤预后与治疗

*Multi-omics integrative analysis of stemness-associated pathological signatures to guide prognosis and therapeutic strategies in uveal melanoma.*

**International Journal of Surgery** · 2026-01-21 · 多组学+病理组学ML(单队列) · [PMID 41563241](https://pubmed.ncbi.nlm.nih.gov/41563241/) · [DOI](https://doi.org/10.1097/JS9.0000000000004914)

整合scRNA-seq、bulk转录组与病理全切片图像，经CytoTRACE/hdWGCNA识别高干性亚群，构建基于病理组学的预后评分(IPS)并对比7种生存模型，分层预后与免疫治疗反应。仅单一TCGA-UVM队列内部验证，侧重分子预后/免疫治疗、外科动作弱，列为边缘。

> **要点**：病理组学IPS用于葡萄膜黑色素瘤预后分层，外科成分弱，边缘。


### 97. 就“基于深度学习算法辅助诊断男性神经源性下尿路功能障碍”致编辑的来信

*Letter to the Editor on "Research on the auxiliary diagnosis of male neurogenic lower urinary tract dysfunction based on a deep-learning algorithm".*

**International Journal of Surgery** · 2026-01-21 · 来信(无原始数据) · [PMID 41563027](https://pubmed.ncbi.nlm.nih.gov/41563027/) · [DOI](https://doi.org/10.1097/JS9.0000000000004903)

针对一项深度学习辅助诊断男性神经源性下尿路功能障碍(NLUTD)研究的来信，无独立数据。属功能障碍的临床诊断AI，外科动作弱，列为边缘。

> **要点**：关于DL辅助诊断男性神经源性下尿路功能障碍的来信，边缘相关。


### 98. PrysmNet：显著性与多模态引导的可复现跨域息肉分割系统

*PrysmNet a polyp refining system using salience and multimodal guidance for reproducible cross domain segmentation.*

**npj Digital Medicine** · 2026-01-21 · 方法学/模型开发研究 · [PMID 41565973](https://pubmed.ncbi.nlm.nih.gov/41565973/) · [DOI](https://doi.org/10.1038/s41746-026-02345-7)

提出基于ViT的Prysm-Net，含生物启发显著性模块动态锐化边界，训练期用SAM基础模型蒸馏(输出/边界/特征三级)与门控交叉注意力多模态引导，推理期关闭辅助保持轻量。在域内与跨域数据集上分割精度与泛化优于SOTA。属结肠镜息肉分割方法，无整合式外科动作。

> **要点**：跨域息肉分割ViT框架，推理轻量。


### 99. 对《多模态放射病理组学预测胃癌预后与免疫治疗反应》的评论

*A commentary on "Multimodal radiopathomics approach for predictions of prognosis and immunotherapy response in patients with gastric cancer: a multicohort retrospective study".*

**International Journal of Surgery** · 2026-01-20 · 评论（无数据） · [PMID 41556192](https://pubmed.ncbi.nlm.nih.gov/41556192/) · [DOI](https://doi.org/10.1097/JS9.0000000000004630)

针对同一项多模态放射病理组学预测胃癌预后与免疫治疗反应研究的另一篇评论。属影像/病理组学预后预测的外科邻接主题。（仅标题、无摘要。）

> **要点**：评论放射病理组学预测胃癌预后（外科邻接）。


### 100. 临床引导模型还是基础模型？从电子病历预测颈椎病性脊髓病

*Clinically-guided models or foundation models? predicting cervical spondylotic myelopathy from electronic health records.*

**npj Digital Medicine** · 2026-01-20 · 回顾性建模加外部验证 · [PMID 41559180](https://pubmed.ncbi.nlm.nih.gov/41559180/) · [DOI](https://doi.org/10.1038/s41746-026-02337-7)

用约200万患者的MarketScan理赔与机构EHR，比较从计数前馈网络、临床Mamba、CoreBEHRT/CEHRBERT到大型基础模型(clmbr)预测颈椎病性脊髓病(CSM)发病(提前至30个月)。大型基础模型内部验证更强，但临床引导模型跨系统外部验证泛化更稳。属EHR疾病发病预测，外科(减压手术)关联弱。

> **要点**：EHR预测CSM发病，临床模型泛化优于基础模型。


### 101. 人工智能在消化内镜中的应用：全球临床试验分析

*Artificial intelligence in gastrointestinal endoscopy: a global clinical trial analysis.*

**International Journal of Surgery** · 2026-01-19 · 临床试验文献分析/综述（摘要缺失） · [PMID 41556172](https://pubmed.ncbi.nlm.nih.gov/41556172/) · [DOI](https://doi.org/10.1097/JS9.0000000000004926)

本文梳理并分析全球范围内人工智能（AI）应用于消化内镜（GI endoscopy）的临床试验（摘要缺失，具体试验数与结局指标未获取）。消化内镜属操作/介入范畴，但AI多用于息肉/病变的实时检出与识别，偏诊断辅助，与外科手术决策为技术邻接。

> **要点**：概览AI消化内镜临床试验格局，属操作邻接的诊断辅助方向。


### 102. 多中心可解释AI从PET生物标志物诊断冠心病

*Multicenter evaluation of interpretable AI for coronary artery disease diagnosis from PET biomarkers.*

**npj Digital Medicine** · 2026-01-14 · 多中心回顾加外部验证 · [PMID 41535345](https://pubmed.ncbi.nlm.nih.gov/41535345/) · [DOI](https://doi.org/10.1038/s41746-026-02338-6)

从4中心17348例心脏PET/CT中选1664例(有ICA、无既往CAD)，用CAC、静息/负荷LVEF、MBF、MFR、TPD等10项影像参数训练XGBoost。测试队列(n=1278,CAD患病率53%)AUC 0.83(95%CI 0.81-0.85)，优于经验医师(0.80,p=0.02)及单一标志物(缺血TPD 0.79、MFR 0.75)，跨性别/BMI/年龄稳定。属心脏影像诊断，可外推至血运重建决策。

> **要点**：PET多参数AI诊断冠心病AUC 0.83，优于医师。


### 103. 超弹性碲基热电涂层用于三模态微传感触觉内窥镜

*Superelastic Tellurium Thermoelectric Coatings for Advanced Trimodal Microsensing.*

**Nature Communications** · 2026-01-13 · 器件研发+动物实验 · [PMID 41530175](https://pubmed.ncbi.nlm.nih.gov/41530175/) · [DOI](https://doi.org/10.1038/s41467-026-68317-3)

报道碲基超弹性热电视觉-触觉传感器,结合深度神经网络实现内窥镜下同时视觉成像、热成像与微结构力反馈;在活兔临床内窥触诊实验中实现炎症组织的触觉诊断(含温度分布),尤其在视觉难辨情形。属传感器材料+DNN的智能内窥镜,内镜介入邻接但非直接手术AI。

> **要点**：热电触觉内窥镜+DNN辅助内镜炎症诊断(边缘相关)


### 104. 对《基于CT的瘤内与瘤周异质性预测食管鳞癌新辅助化免疫治疗后病理反应》的评论

*Commentary on "Intratumoral and peritumoral heterogeneity based on CT to predict the pathological response after neoadjuvant chemoimmunotherapy in esophageal squamous cell carcinoma".*

**International Journal of Surgery** · 2026-01-13 · 评论（无数据） · [PMID 41537386](https://pubmed.ncbi.nlm.nih.gov/41537386/) · [DOI](https://doi.org/10.1097/JS9.0000000000004664)

针对一项CT影像组学（瘤内与瘤周异质性）预测食管鳞癌（ESCC）新辅助化免疫治疗后病理反应研究的评论。反应预测可影响手术时机，属外科邻接。（仅标题、无摘要。）

> **要点**：评论CT影像组学预测ESCC新辅助反应（外科邻接）。


### 105. 来信：如何衡量AI辅助支气管镜诊断的真正价值

*Letter to the Editor: Measuring what matters in AI-assisted bronchoscopic diagnosis.*

**International Journal of Surgery** · 2026-01-13 · 评论/来信（Letter） · [PMID 41549827](https://pubmed.ncbi.nlm.nih.gov/41549827/) · [DOI](https://doi.org/10.1097/JS9.0000000000004791)

本文为关于「AI辅助支气管镜诊断」的来信/评论（摘要缺失，无数据），探讨评价AI支气管镜诊断时应衡量何种指标的方法学问题。支气管镜属操作/介入但此处偏诊断，与外科为技术邻接。

> **要点**：讨论AI支气管镜诊断的评价指标，属诊断-操作邻接议题。


### 106. 来信：临床决策支持系统在真实世界围手术期照护中的结局（系统综述）

*Letter to Editor About "Outcomes of clinical decision support systems in real-world perioperative care: a systematic review and meta-analysis".*

**International Journal of Surgery** · 2026-01-13 · 评论/来信（Letter） · [PMID 41537341](https://pubmed.ncbi.nlm.nih.gov/41537341/) · [DOI](https://doi.org/10.1097/JS9.0000000000004747)

针对「临床决策支持系统（CDSS）在真实世界围手术期照护结局的系统综述与荟萃分析」的来信（摘要缺失，无数据）。围手术期CDSS与手术+AI/决策支持邻接，但CDSS未必基于ML，归边缘。

> **要点**：围手术期决策支持系统评述，属AI/决策支持邻接议题。


### 107. 评述：33579例泌尿系结石成分/共病/季节规律与机器学习尿脓毒症预测

*Commentary on "Clinical management implications from 33 579 urinary stones: Novel patterns in composition, comorbidities, seasonal variation, and machine learning-based urosepsis prediction".*

**International Journal of Surgery** · 2026-01-13 · 评论/来信（Commentary） · [PMID 41532477](https://pubmed.ncbi.nlm.nih.gov/41532477/) · [DOI](https://doi.org/10.1097/JS9.0000000000004787)

针对「33579例泌尿系结石在成分、共病、季节变化及机器学习尿脓毒症预测中新模式」研究的评论（摘要缺失，无原始数据）。含ML尿脓毒症（围术期并发症）预测成分，但整体偏结石流行病学，与外科为邻接，归边缘。

> **要点**：结石流行病学与ML尿脓毒症预测评述，外科邻接。


### 108. 人工智能与肺结节研究的交汇：现状与前景（综述）

*The intersection of artificial intelligence and lung nodule research: current applications and future prospects.*

**International Journal of Surgery** · 2026-01-13 · 文献计量/叙述性综述 · [PMID 41428992](https://pubmed.ncbi.nlm.nih.gov/41428992/) · [DOI](https://doi.org/10.1097/JS9.0000000000004595)

综述性文章，通过文献计量梳理AI贯穿肺结节全流程管理（检出、诊断、个体化治疗规划）的应用与挑战，无具体统计数据。AI肺结节以诊断影像为主、可外推至胸外科切除决策，属技术邻接，归边缘。

> **要点**：AI肺结节管理综述，诊断影像为主、外科决策邻接。


### 109. 结构感知多任务学习与域泛化的脊柱CT椎体分析

*Structure-aware multi-task learning with domain generalization for robust vertebrae analysis in spinal CT.*

**npj Digital Medicine** · 2026-01-10 · 方法学/模型开发研究 · [PMID 41520072](https://pubmed.ncbi.nlm.nih.gov/41520072/) · [DOI](https://doi.org/10.1038/s41746-025-02288-5)

提出VertebraFormer统一多任务框架(Transformer编码器加任务专用解码器加动态调制单元)，并构建含4个公私数据集的MultiSpine基准，联合完成椎体分割、编号与病灶定位。在域内与跨域设置下精度与鲁棒性均优于基线，经消融/扰动/效率分析验证。属脊柱影像分析方法，可外推至脊柱外科。

> **要点**：多任务脊柱CT分割/编号/定位，跨域鲁棒。


### 110. 对“双层光谱探测器CT评分系统无创评估胃癌TP53表达及辅助化疗反应”的评论

*Comments on "Dual-layer spectral detector CT-based scoring system for noninvasive TP53 expression assessment and adjuvant chemotherapy response prediction in gastric cancer: a multicenter cross-sectional study".*

**International Journal of Surgery** · 2026-01-07 · 评论/通讯（无数据） · [PMID 41427556](https://pubmed.ncbi.nlm.nih.gov/41427556/) · [DOI](https://doi.org/10.1097/JS9.0000000000004524)

评论（Comments），无原始数据，讨论一项基于双层光谱CT的评分系统、无创评估胃癌TP53表达并预测辅助化疗反应的多中心横断面研究。属影像定量评分预测分子/化疗反应，外科动作间接。

> **要点**：胃癌光谱CT评分预测TP53/化疗反应的评论，属影像边缘话题。


### 111. 条件StyleGAN增强训练改善息肉检测泛化

*Improving generalization of polyp detection via conditional StyleGAN augmented training.*

**npj Digital Medicine** · 2026-01-07 · 方法学/模型开发研究 · [PMID 41501444](https://pubmed.ncbi.nlm.nih.gov/41501444/) · [DOI](https://doi.org/10.1038/s41746-025-02293-8)

用条件StyleGAN从15万余聚合图像合成高分辨结直肠肿瘤图像，训练YOLOv5检测模型；混合增强使内部测试mAP由0.86升至0.93，扁平/凹陷病灶召回由0.72升至0.87，并缩小外部验证泛化差距。属结肠镜计算机辅助检出(CADe)方法(仅静态图像)。

> **要点**：生成增强提升息肉检测mAP至0.93、扁平病灶召回0.87。


### 112. EvoMDT：多癌种结构化临床决策的自进化多智能体系统

*EvoMDT: a self-evolving multi-agent system for structured clinical decision-making in multi-cancer.*

**npj Digital Medicine** · 2026-01-07 · 多智能体系统开发加基准与医师评估 · [PMID 41501128](https://pubmed.ncbi.nlm.nih.gov/41501128/) · [DOI](https://doi.org/10.1038/s41746-025-02304-8)

EvoMDT用自进化循环基于专家反馈与结局信号更新提示、共识权重与检索范围，智能体对病灶级数据结构化推理并生成可溯源循证建议。在6个肿瘤QA基准与4个真实数据集(乳腺/肝/肺/淋巴瘤)加单盲医师评估中，优于Llama-3-70B、Claude-3、Med-PaLM 2等(BERTScore 0.62-0.68)，决策质量媲美人类MDT且响应时间缩短30-40%。属泛肿瘤MDT决策支持，外科为其一环。

> **要点**：自进化多智能体MDT决策媲美人类，提速30-40%。


### 113. 机器人辅助手术培训的全球研究图景：35年文献计量与可视化分析

*Global research landscape of robot-assisted surgical training: a 35-year bibliometric and visualization analysis.*

**International Journal of Surgery** · 2026-01-07 · 文献计量学与可视化分析 · [PMID 41524090](https://pubmed.ncbi.nlm.nih.gov/41524090/) · [DOI](https://doi.org/10.1097/JS9.0000000000004716)

用CiteSpace/VOSviewer分析Web of Science 1990–2025年592篇机器人辅助手术（RAS）培训文献，识别技术验证（1998–2010）、方法创新（2011–2020）、标准化/AI整合（2020–2025）三阶段；美国占47.13%，并指出AI整合为三大挑战之一。属外科机器人培训文献计量，AI为邻接主题，归边缘。

> **要点**：RAS培训研究图景，AI整合为未来方向，外科机器人邻接。


### 114. 医学数字孪生：引领青光眼诊疗范式变革及其拓展

*Medical digital twins: pioneering a paradigm shift in glaucoma care and beyond.*

**International Journal of Surgery** · 2026-01-07 · 述评/观点（摘要缺失） · [PMID 41504514](https://pubmed.ncbi.nlm.nih.gov/41504514/) · [DOI](https://doi.org/10.1097/JS9.0000000000004660)

述评/观点性文章，探讨医学数字孪生（digital twin）在青光眼诊疗及更广领域的范式变革（摘要缺失，无数据）。应用主体为眼科，但数字孪生方法与手术规划高度邻接、可外推，归边缘。

> **要点**：数字孪生范式，眼科语境但方法可外推至外科规划。


### 115. 医学整体AI(xHAIM)：提升性能与可解释性

*Holistic AI in medicine; improved performance and explainability.*

**npj Digital Medicine** · 2026-01-06 · 方法学/框架开发 · [PMID 41495177](https://pubmed.ncbi.nlm.nih.gov/41495177/) · [DOI](https://doi.org/10.1038/s41746-025-02298-3)

在HAIM多模态框架上引入生成式AI的xHAIM，通过识别任务相关数据、生成患者摘要、改进预测并链接患者特异医学知识提供临床解释。在HAIM-MIMIC-MM数据集上跨胸部病理与手术相关(operative)任务平均AUC由79.9%升至91.3%，将黑箱预测转为可解释决策支持。属泛医学多模态框架，顺带涉及手术任务。

> **要点**：生成式可解释多模态框架，AUC 79.9%升至91.3%。


### 116. 拓扑保持嵌入网络用于儿科X线PICC分割

*Topology preserving embedded network for PICC segmentation in pediatric X ray images.*

**npj Digital Medicine** · 2026-01-03 · 回顾性多中心加内外部验证 · [PMID 41484168](https://pubmed.ncbi.nlm.nih.gov/41484168/) · [DOI](https://doi.org/10.1038/s41746-025-02248-z)

回顾性收集3中心1184例PICC患者(含280例儿科:210新生儿、46婴儿、24幼儿)，提出拓扑保持网络TopNet维持导管连续性并精确定位尖端，内外部验证分割与尖端定位均优于现有(多为成人开发)方法。属导管置入(操作)后影像验证，外科成分弱。

> **要点**：儿科PICC导管分割与尖端定位拓扑保持网络。


### 117. 通过脂肪组织-微生物组互作对代谢型肥胖的多组学定义

*Multi-omic definition of metabolic obesity through adipose tissue-microbiome interactions.*

**Nature Medicine** · 2026-01-02 · 多组学队列研究 · [PMID 41482560](https://pubmed.ncbi.nlm.nih.gov/41482560/) · [DOI](https://doi.org/10.1038/s41591-025-04009-7)

对1,408人深度多组学表型定义代谢组指标metBMI，外部队列（n=466）解释52%的BMI方差；高于预期metBMI者脂肪肝、糖尿病、内脏脂肪等风险高2–5倍，且在减重手术（n=75）中减重少30%。含减重手术结局预测但外科成分弱，边缘相关。

> **要点**：多组学metBMI优于BMI分层，含减重手术减重预测，外科成分弱。


### 118. 放射学中大型推理模型对结论进行推理的诊断与解读增益

*Diagnostic and interpretive gains from reasoning over conclusions with a large reasoning model in radiology.*

**npj Digital Medicine** · 2025-12-31 · 多中心多阅片者比较研究 · [PMID 41476119](https://pubmed.ncbi.nlm.nih.gov/41476119/) · [DOI](https://doi.org/10.1038/s41746-025-02285-8)

研究900例来自三家中国医院的多中心肿瘤影像病例，比较大型推理模型(LRM)的推理过程与仅结论格式及两个非推理模型；三名高年资放射科医师评估诊断错误，6名医师人在环研究，并以英文MIMIC-Cancer-90队列测试跨语言泛化。推理过程漏诊/误分类最少，全面性、可解释性、无偏性评分最高(但简洁性下降)，改善在各癌种、模态、机构、语言间一致。

> **要点**：推理型LLM提升肿瘤影像解读完整性(可外推至分期决策，边缘相关)。


### 119. 血浆游离DNA甲基化组用于肝细胞癌检出与肝切除/移植术后监测

*Plasma Cell-free DNA Methylomes for Hepatocellular Carcinoma Detection and Monitoring After Liver Resection or Transplantation.*

**Annals of Surgery** · 2025-12-31 · 回顾性队列+机器学习(液体活检组学) · [PMID 41469893](https://pubmed.ncbi.nlm.nih.gov/41469893/) · [DOI](https://doi.org/10.1097/SLA.0000000000007003)

236份cfDNA样本来自89例肝切除(32)或移植(57)HCC患者及35健康对照，用cfMeDIP-seq加机器学习构建HCC分类器并给出HCC甲基化评分(HMS)。发现队列敏感度97%、特异度99%，验证队列准确率97%；基线HMS>0.9与更高复发风险相关(HR 3.43, 95%CI 1.30-9.06, P=0.013)。属术后随访液体活检生物标志物ML、外科成分较弱。

> **要点**：外周相关：cfDNA甲基化组ML检出HCC并预测术后复发，外科动作弱。


### 120. GLANCE：全局-局部持续交换与共识融合的肺结节稳健分割

*GLANCE: continuous global-local exchange with consensus fusion for robust nodule segmentation.*

**npj Digital Medicine** · 2025-12-30 · 深度学习方法开发（公开数据集基准） · [PMID 41469800](https://pubmed.ncbi.nlm.nih.gov/41469800/) · [DOI](https://doi.org/10.1038/s41746-025-02251-4)

提出双流架构GLANCE（全局上下文Transformer+多感受野分组空洞混合器+跨尺度共识融合+金字塔细化解码器），同时完成肺结节分割与中心热图检测。在LIDC-IDRI、LNDb、LUNA16、Tianchi四个公开数据集上取得分割与检测的SOTA，消融证实持续融合策略是关键。属肺癌早诊CT影像分割方法学，无明确外科动作，外科关联为间接外推。

> **要点**：肺结节分割/检测新SOTA，属诊断影像方法、外科关联间接。


### 121. ScarElastic：以连续弹性场建模的LGE-CMR心肌瘢痕勾画

*ScarElastic: continuous elasticity field modeling for myocardial scar delineation in LGE-CMR.*

**npj Digital Medicine** · 2025-12-28 · 深度学习分割方法开发（公开基准） · [PMID 41457104](https://pubmed.ncbi.nlm.nih.gov/41457104/) · [DOI](https://doi.org/10.1038/s41746-025-02163-3)

提出将心肌瘢痕建模为连续弹性场的框架ScarElastic，克服二值分割难以刻画弥漫/斑片纤维化的问题。在STACOM-LGE 2018、MyoPS 2020、MS-CMRSeg 2019三个公开基准上优于SOTA，Dice最高提升+3.1%、HD95降低1.8 mm、结构连续性+0.06，肥厚型心肌病复杂瘢痕更明显。属心脏影像分割方法，外科/介入关联为间接外推。

> **要点**：心肌瘢痕连续弹性场分割优于SOTA（Dice+3.1%），间接关联心律失常消融/外科规划。


### 122. 整合HSP90α的人工智能个体化预测不可切除肝癌TACE获益与生存

*Artificial intelligence-based personalized treatment strategies for unresectable hepatocellular carcinoma: integrating HSP90α for prognosis and survival prediction.*

**npj Digital Medicine** · 2025-12-27 · 多中心回顾性机器学习预后建模 · [PMID 41454159](https://pubmed.ncbi.nlm.nih.gov/41454159/) · [DOI](https://doi.org/10.1038/s41746-025-02281-y)

回顾7家中国三甲医院2016-2021年2555例不可切除HCC接受TACE者，用8种AI模型识别HSP90α、BCLC分期、肿瘤大小为TACE获益关键因子，三变量列线图验证集AUC 0.901；101种机器学习组合中StepCox[forward]+随机生存森林最优，训练/内部/外部C指数0.84/0.70/0.78。属介入（TACE）患者选择与预后建模，患者不可切除、外科成分弱，列边缘。

> **要点**：AI+HSP90α预测不可切除HCC的TACE获益（列线图AUC 0.901），偏介入/预后。


### 123. 商用深度学习颅内出血检测模型的真实世界性能评估

*Real-world performance evaluation of a commercial deep learning model for intracranial hemorrhage detection.*

**npj Digital Medicine** · 2025-12-24 · 真实世界回顾性外部验证（含LLM抽标） · [PMID 41444826](https://pubmed.ncbi.nlm.nih.gov/41444826/) · [DOI](https://doi.org/10.1038/s41746-025-02244-3)

回顾17家院区74,142例患者的101,944例平扫头颅CT，用GPT-4o零样本抽取放射报告标注参考标准（对500例人工标注准确率96%、κ=0.85）。商用模型Aidoc敏感度82.2%、特异度97.6%、准确率96.6%；对急性（86.2%）、大出血（95.0%）、多腔室（93.6%）敏感度高，但亚急性（45.5%）、慢性（54.8%）、小出血（74.8%）及门诊场景（72.2%）明显偏低。属急诊影像分诊AI，外科（血肿清除）关联为外推。

> **要点**：真实世界Aidoc颅内出血检测敏感度82.2%，对细微/慢性出血明显不足。


### 124. 无需钆对比剂的深度学习非增强MRI诊断鼻咽癌端到端方案

*Deep learning-based non-contrast MRI model for nasopharyngeal carcinoma diagnosis: an end-to-end gadolinium-free solution.*

**npj Digital Medicine** · 2025-12-22 · 多中心回顾性深度学习+多阅片者研究 · [PMID 41430426](https://pubmed.ncbi.nlm.nih.gov/41430426/) · [DOI](https://doi.org/10.1038/s41746-025-02247-0)

构建知识蒸馏模态融合模型，仅用非增强MRI诊断鼻咽癌（NPC）。854例训练，内部257例AUC=0.95、外部277例AUC=0.86，优于非增强基线（0.95 vs 0.93；0.86 vs 0.82）并超越3种虚拟增强方法；13名医师多阅片研究显示AI辅助下仅用非增强MRI诊断不劣于增强影像（AUC 0.90 vs 0.93，p<0.01）。属诊断/随访影像AI，NPC以放疗为主、外科关联弱，列边缘。

> **要点**：非增强MRI+AI诊断鼻咽癌不劣于增强影像（AUC 0.90 vs 0.93），偏诊断影像。


### 125. 局部与全局整合Ki67分析用于高级别神经内分泌肿瘤的预后分层与治疗指导：多中心验证研究

*Integrated local and global Ki67 profiling for prognostic stratification and therapeutic guidance in high-grade neuroendocrine neoplasms: a multicenter validation study.*

**International Journal of Surgery** · 2025-12-19 · 多中心验证研究（数字病理） · [PMID 41417992](https://pubmed.ncbi.nlm.nih.gov/41417992/) · [DOI](https://doi.org/10.1097/JS9.0000000000004574)

多中心验证研究（N=349），基于Ki67染色全切片图像构建整合局部热点与全局异质性的数字病理评分IL-GKi67。高分与更差总生存显著相关（HR=4.169，P=0.009），而传统热点法失效（P=0.128）；低分患者显著获益于辅助化疗（HR=0.069，P=0.002；NEC亚组HR=0.061，P<0.001），并可作为TP53突变的形态学替代（P<0.001）。属数字病理定量评分（非明确训练AI模型），主要指导系统治疗。

> **要点**：数字病理Ki67评分改善神经内分泌肿瘤预后分层与化疗决策（外科邻接）。


### 126. 肾盂成形术失败后微创手术的疗效与危险因素：前瞻性多中心队列研究

*Clinical efficacy and risk factors of minimally invasive surgery for failed pyeloplasty: a prospective multicenter cohort study.*

**International Journal of Surgery** · 2025-12-19 · 前瞻性多中心队列研究 · [PMID 41417977](https://pubmed.ncbi.nlm.nih.gov/41417977/) · [DOI](https://doi.org/10.1097/JS9.0000000000004448)

前瞻性多中心队列（124例），评估肾盂成形失败后二次手术疗效并用LASSO+多因素logistic回归建列线图预测再次手术失败。总失败率13.7%，球囊扩张失败率最高（22.2%）；独立预测因素为既往肾盂成形次数（OR=19.01）、术前DJ管留置（OR=6.21）、患侧肾实质厚度（OR=0.08）；列线图AUC=0.841。属外科结局的LASSO列线图预测（轻量ML）。

> **要点**：LASSO列线图预测肾盂成形失败后再手术失败风险（外科邻接）。


### 127. SEEG引导射频热凝治疗脑室旁结节样灰质异位相关难治性癫痫：多中心回顾性队列研究

*Stereoelectroencephalography-guided radiofrequency thermocoagulation for refractory epilepsy associated with periventricular nodular heterotopia: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2025-12-17 · 多中心回顾性队列研究 · [PMID 41405277](https://pubmed.ncbi.nlm.nih.gov/41405277/) · [DOI](https://doi.org/10.1097/JS9.0000000000004459)

多中心回顾队列（47例），评估SEEG引导射频热凝（RFTC）治疗脑室旁结节样异位（PNH）相关难治癫痫的疗效，用LASSO+Cox建列线图预测手术结局。癫痫无发作率61.7%、有效率72.3%；无发作与有效预测模型C-index均为0.94，并经外部验证。属外科/介入结局的LASSO-Cox列线图预测。

> **要点**：LASSO-Cox列线图预测SEEG引导RFTC治疗癫痫的手术结局（外科邻接）。


### 128. 胆囊癌微创手术的结局与安全性:国际多中心队列研究

*Outcomes and safety of minimally invasive surgery in gallbladder cancer: international, multicenter cohort study.*

**International Journal of Surgery** · 2025-12-17 · 多中心回顾性队列 · [PMID 41403280](https://pubmed.ncbi.nlm.nih.gov/41403280/) · [DOI](https://doi.org/10.1097/JS9.0000000000004129)

回顾性多中心队列(218例胆囊癌根治术,2009-2022)比较微创(腹腔镜/机器人)与开放手术。MIS占41.8%、中转率4.6%,较开放显著缩短手术时间(210 vs 287分钟,p=0.012)、减少出血(200 vs 300mL,p<0.001)、缩短住院(6 vs 9天,p<0.001),淋巴结清扫(10 vs 6,p=0.006)与R0率(83.5% vs 66.1%,p=0.013)更高,机器人组胆漏率最低(2.9% vs 21.4% vs 6.5%,p=0.002)。研究含机器人手术但纯属机械平台、无AI自主成分,边缘相关。

> **要点**：胆囊癌机器人/腹腔镜MIS安全有效,但无AI成分,作为手术机器人议题边缘收录。


### 129. 脑机接口结合功能性电刺激用于中枢神经损伤患者运动康复

*Brain-computer interface and functional electrical stimulation: a novel approach to motor rehabilitation in CNS injury patients.*

**International Journal of Surgery** · 2025-12-16 · 叙述性综述 · [PMID 41399276](https://pubmed.ncbi.nlm.nih.gov/41399276/) · [DOI](https://doi.org/10.1097/JS9.0000000000004392)

综述，系统梳理脑机接口（BCI）联合功能性电刺激（FES）用于卒中、脊髓损伤后运动康复的闭环范式、刺激参数、机制与伦理。BCI神经解码属AI范畴、BCI植入涉及神经外科，但本文聚焦康复而非手术，且仅引用试点/临床前证据，无汇总统计数字。

> **要点**：BCI-FES运动康复综述，AI（神经解码）在场但外科成分弱。


### 130. 食管平滑肌瘤形态学分类与机器人经胸腔镜孔道摘除术（边缘：机器人无AI）

*Proposed morphological classification and robotic portal enucleation of esophageal leiomyoma: a multicenter study.*

**International Journal of Surgery** · 2025-12-16 · 回顾性多中心外科研究（39例） · [PMID 41405266](https://pubmed.ncbi.nlm.nih.gov/41405266/) · [DOI](https://doi.org/10.1097/JS9.0000000000004147)

回顾性多中心研究纳入39例，用da Vinci Si/Xi行机器人孔道摘除，提出ICOS形态学分类（I型38.4%、C型25.6%、O型23.0%、S型12.8%）；全部成功摘除无中转，中位手术119分钟、失血60mL、住院5天，并发症15.4%，中位随访52个月无复发。为遥操作机器人手术、无AI自主成分，归边缘。

> **要点**：机器人食管平滑肌瘤摘除，属无AI自主的机械遥操作，边缘。


### 131. 评论「医学中大语言模型ChatGPT的当前关切与未来方向:机器学习驱动的全球文献计量分析」

*Commentary on "Current concerns and future directions of large language model ChatGPT in medicine: a machine-learning-driven global-scale bibliometric analysis".*

**International Journal of Surgery** · 2025-12-16 · 评论/来信(无数据) · [PMID 41399866](https://pubmed.ncbi.nlm.nih.gov/41399866/) · [DOI](https://doi.org/10.1097/JS9.0000000000004381)

针对一篇关于ChatGPT在医学中应用的文献计量分析论文的评论(commentary),无原始数据。属泛医学LLM议题,发表于外科期刊但缺乏明确外科动作,边缘相关。

> **要点**：泛医学LLM文献计量评论,外科关联弱,边缘收录。


### 132. 关于DeepSeek-R1回答AAOS髋骨关节炎指南相关问题质量评估的来信

*Letter to the editor about the quality assessment of deepseek-R1's responses to guideline-related questions on hip osteoarthritis from AAOS.*

**International Journal of Surgery** · 2025-12-16 · 来信(无数据) · [PMID 41399862](https://pubmed.ncbi.nlm.nih.gov/41399862/) · [DOI](https://doi.org/10.1097/JS9.0000000000004512)

针对DeepSeek-R1就AAOS髋骨关节炎(骨科)指南问题作答质量评估的来信(letter),无原始数据。为LLM指南问答在骨科语境的评价,非直接外科动作,边缘相关。

> **要点**：LLM骨科指南问答评价的来信,边缘收录。


### 133. TB-MIL：基于组织病理图像的深度学习识别膀胱癌肿瘤突变负荷(TMB)状态

*TB-MIL: deep learning-based identification of TMB status in bladder cancer from histopathological images*

**International Journal of Surgery** · 2025-12-12 · 回顾性深度学习诊断建模 · [DOI](https://doi.org/10.1097/js9.0000000000004403)

回顾性研究，分析TCGA数据库354例及本院39例膀胱癌患者的病理切片，构建多示例学习模型TB-MIL预测TMB高/低状态。模型内部测试集AUC 0.823、外部测试集AUC 0.804，在不同T分期与转移状态间表现稳定，同一患者多切片预测一致性高；注意力与GradCAM可视化显示模型关注肿瘤与非肿瘤组织交界处。

> **要点**：数字病理深度学习无创预测膀胱癌TMB以辅助免疫治疗(外科动作弱，列边缘)


### 134. CoreFormer：结构核先验与测地隐式场的高保真肺结节分割

*CoreFormer high fidelity pulmonary nodule segmentation with structural core priors and geodesic implicit fields.*

**npj Digital Medicine** · 2025-12-12 · 深度学习分割方法开发（公开数据集） · [PMID 41388190](https://pubmed.ncbi.nlm.nih.gov/41388190/) · [DOI](https://doi.org/10.1038/s41746-025-02221-w)

提出CoreFormer，以结构核锚定与测地形状解码建模肺结节，基于Swin Transformer主干与双分支解码器（结构核预测器+上下文感知形状解码器）并加特征流形正则化。在LIDC-IDRI、LNDb、Tianchi-Lung、NSCLC-Radiomics四个公开数据集上取得边界精度与拓扑保真度SOTA。属肺癌早诊影像分割方法，外科关联为外推。

> **要点**：肺结节分割拓扑保真SOTA，属诊断影像方法、外科关联间接。


### 135. 关于「AI辅助临床影像检测口腔潜在恶性病变与口腔癌诊断准确性:系统综述与荟萃分析」的评论

*A commentary on "Diagnostic accuracy of Artificial Intelligence assisted clinical imaging in the detection of oral potentially malignant disorders and oral cancer: a systematic review and meta-analysis".*

**International Journal of Surgery** · 2025-12-11 · 评论/来信(无数据) · [PMID 41376448](https://pubmed.ncbi.nlm.nih.gov/41376448/) · [DOI](https://doi.org/10.1097/JS9.0000000000004389)

针对一篇AI辅助临床影像检测口腔潜在恶性病变及口腔癌准确性的系统综述/荟萃分析的评论,无原始数据。属诊断/筛查性影像AI,与外科动作关联间接,边缘相关。

> **要点**：AI口腔癌影像检测荟萃分析的评论,偏筛查诊断,边缘收录。


### 136. 基于CT的在线计算器预测可切除肝癌预后及术后辅助TACE获益（多中心）

*Development and validation of a CT-based online calculator for prognosis and postoperative adjuvant transcatheter arterial chemoembolization benefit prediction in resected hepatocellular carcinoma: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2025-12-10 · 多中心回顾性队列（n=1770） · [PMID 41376483](https://pubmed.ncbi.nlm.nih.gov/41376483/) · [DOI](https://doi.org/10.1097/JS9.0000000000004456)

多中心回顾队列，纳入1770例行术前增强CT并接受单纯手术切除或术后辅助TACE（PA-TACE）的肝癌患者（开发1040、内部验证448、外部236、RNA测序46）。整合CT影像特征与临床病理构建列线图，5年OS预测C-index≥0.694、Brier≤0.176，优于常用分期系统；虚拟孪生（virtual-twin）分析显示611/1724（35.4%）被推荐PA-TACE、其5年OS概率与限制平均生存时间分别提高19.4%与22.5个月。方法以列线图+虚拟孪生为主（非明确ML/DL）。

> **要点**：CT列线图+虚拟孪生在线工具量化肝癌切除后辅助TACE获益，方法偏传统建模。


### 137. 关于「经数字远程医疗的计算机辅助术前规划治疗四肢关节周围骨折:多中心队列」的评论

*Comment on "Computer-assisted preoperative planning via digital telemedicine for the treatment of periarticular fractures of the extremities: a multicenter cohort study".*

**International Journal of Surgery** · 2025-12-10 · 评论/来信(无数据) · [PMID 41376559](https://pubmed.ncbi.nlm.nih.gov/41376559/) · [DOI](https://doi.org/10.1097/JS9.0000000000004463)

针对一篇计算机辅助术前规划(经数字远程医疗)治疗四肢关节周围骨折论文的评论,无原始数据。涉及计算机辅助外科规划,但「计算机辅助」是否含AI成分不明确,边缘相关。

> **要点**：计算机辅助术前规划评论,AI成分不明,边缘收录。


### 138. 关于「生成式大语言模型用于良性前列腺增生临床决策支持的真实世界可行性」的评论

*Commentary on "Real-world feasibility of generative large language models for clinical decision support in benign prostatic hyperplasia".*

**International Journal of Surgery** · 2025-12-10 · 评论/来信(无数据) · [PMID 41376556](https://pubmed.ncbi.nlm.nih.gov/41376556/) · [DOI](https://doi.org/10.1097/JS9.0000000000004455)

针对一篇生成式LLM用于良性前列腺增生(BPH)临床决策支持真实世界可行性研究的评论,无原始数据。为LLM在泌尿科条件下的临床决策支持,非明确外科操作,边缘相关。

> **要点**：生成式LLM用于BPH决策支持的评论,外科动作不明确,边缘收录。


### 139. 关于「基于无监督机器学习CT影像组学亚型无创预测NSCLC免疫治疗疗效」的评论

*Comment on "Non-invasive Prediction of NSCLC immunotherapy efficacy and tumor microenvironment through unsupervised machine learning-driven CT Radiomic Subtypes: a Multi-cohort Study".*

**International Journal of Surgery** · 2025-12-10 · 评论/来信(无数据) · [PMID 41376552](https://pubmed.ncbi.nlm.nih.gov/41376552/) · [DOI](https://doi.org/10.1097/JS9.0000000000004457)

针对一篇用无监督ML的CT影像组学亚型无创预测非小细胞肺癌免疫治疗疗效多队列研究的评论,无原始数据。属非手术语境的影像组学AI(预测免疫治疗疗效),边缘相关。

> **要点**：ML影像组学预测NSCLC免疫疗效的评论,非外科语境,边缘收录。


### 140. 光学与电磁一体化手术导航系统的创新设计与精度：体模与在体研究

*Innovative design and accuracy of optical and electromagnetic integrated surgical navigation system: phantom and in-vivo studies.*

**International Journal of Surgery** · 2025-12-08 · 体模+动物在体验证研究 · [PMID 41346264](https://pubmed.ncbi.nlm.nih.gov/41346264/) · [DOI](https://doi.org/10.1097/JS9.0000000000004117)

工程/精度研究，开发光学与电磁一体化手术导航系统。体模研究技术误差0.5±0.1mm，在体电磁导航应用精度1.82±0.05mm，光学导航与对照组无显著差异。属手术导航工程系统，无明确AI/ML成分。

> **要点**：光电磁一体化导航系统兼具高精度（外科邻接，非AI）。


### 141. 食管癌个体化新辅助免疫化疗的多模态协同模型(eSPARK)

*A multimodal synergistic model for personalized neoadjuvant immunochemotherapy in esophageal cancer.*

**Cell Reports Medicine** · 2025-12-08 · 多中心多模态预测模型开发 · [PMID 41365302](https://pubmed.ncbi.nlm.nih.gov/41365302/) · [DOI](https://doi.org/10.1016/j.xcrm.2025.102479)

eSPARK多模态框架整合治疗前配对CT影像与病理切片,预测局部晚期食管癌新辅助免疫化疗(nICT)后的病理完全缓解(pCR)。基于三地344例患者构建,优于单模态模型并跨多中心稳健;可解释模块识别出中性粒/淋巴比(NLR)等与反应相关的标志物。为疗效预测,服务食管癌新辅助-手术路径。

> **要点**：多模态AI预测食管癌新辅助免疫化疗pCR,辅助个体化决策


### 142. MIRACQ：打破手术室信息壁垒的多通道机器人系统

*MIRACQ: a multi-channel robotic system to break down information barriers in the operating room.*

**International Journal of Surgery** · 2025-12-08 · 原始研究/技术报告（摘要缺失） · [PMID 41363255](https://pubmed.ncbi.nlm.nih.gov/41363255/) · [DOI](https://doi.org/10.1097/JS9.0000000000004280)

本文（无摘要）介绍MIRACQ——一种旨在打破手术室信息壁垒的多通道机器人系统。属手术室机器人/信息集成系统，但因缺摘要、AI自主/智能成分不明确，归为边缘相关。

> **要点**：手术室多通道机器人信息系统，AI成分待确认。


### 143. 用隐马尔可夫模型对光标式皮层内脑机接口进行长期无监督再校准

*Long-term unsupervised recalibration of cursor-based intracortical brain-computer interfaces using a hidden Markov model.*

**Nature Biomedical Engineering** · 2025-12-08 · 仿真+人体闭环+五年离线数据 · [PMID 41361599](https://pubmed.ncbi.nlm.nih.gov/41361599/) · [DOI](https://doi.org/10.1038/s41551-025-01536-z)

边缘相关：提出隐马尔可夫模型推断用户目标并据以重训练iBCI，实现对神经活动漂移的无监督自适应。在两月闭环仿真、一月人体闭环及跨五年离线数据上优于分布对齐方法，后者随时间累积复合误差。属iBCI解码算法，外科为皮层电极植入。

> **要点**：HMM目标推断实现iBCI长期无监督再校准


### 144. 解剖引导掩码自编码器与域自适应提示（AMAP）用于脑动脉瘤检测与分割

*Anatomically-guided Masked Autoencoder with Domain-Adaptive Prompting (AMAP) for multimodal cerebral aneurysm detection and segmentation.*

**npj Digital Medicine** · 2025-12-08 · 深度学习检测/分割方法开发（多数据集） · [PMID 41361567](https://pubmed.ncbi.nlm.nih.gov/41361567/) · [DOI](https://doi.org/10.1038/s41746-025-02188-8)

提出AMAP框架（解剖引导MAE预训练、域自适应提示、边界感知对比学习+GS-EMA），用于多模态脑动脉瘤（尤其<5 mm小动脉瘤）检测与分割。在ADAM、IntrA、CQ500三个公开数据集及未见域上，较CNN/Transformer/基础模型基线Dice提高3-5%、每例假阳性减少约20%、校准改善。服务破裂风险评估与治疗规划，属影像检测方法、外科/介入关联为外推。

> **要点**：AMAP脑动脉瘤检测Dice+3-5%、假阳性-20%，间接服务夹闭/栓塞规划。


### 145. STD-Net：时空解耦网络用于多期相肝脏病灶分割与表征

*STD-Net: a spatio-temporal decoupling network for multiphasic liver lesion segmentation and characterization.*

**npj Digital Medicine** · 2025-12-08 · 深度学习分割方法开发（公开数据集） · [PMID 41361359](https://pubmed.ncbi.nlm.nih.gov/41361359/) · [DOI](https://doi.org/10.1038/s41746-025-02181-1)

提出时空解耦网络STD-Net，以共享权重3D编码器学解剖表征、Transformer时间模块建模多期相增强动态（动脉期强化、静脉期廓清），分离空间外观与时间变化。在TCGA-LIHC、LiTS、MSD数据集上分割与表征均优于SOTA，Dice更高、HD95更低、分类准确率更优，尤其小/低对比病灶更稳健。属HCC诊断影像方法，外科关联为外推。

> **要点**：多期相肝病灶时空解耦分割优于SOTA，属诊断影像方法、外科关联间接。


### 146. 「解码黑箱:对深度学习影像组学预测头颈癌新辅助应答的批判性评价」来信

*Letter to the Editor "Decoding the black box: critical appraisal of deep learning radiomics for predicting neoadjuvant response in head and neck cancer".*

**International Journal of Surgery** · 2025-12-08 · 来信(无数据) · [PMID 41363136](https://pubmed.ncbi.nlm.nih.gov/41363136/) · [DOI](https://doi.org/10.1097/JS9.0000000000004288)

针对一篇深度学习影像组学预测头颈癌新辅助治疗应答论文的批判性来信,无原始数据。属预测治疗应答的影像组学,非直接外科动作,边缘相关。

> **要点**：DL影像组学预测新辅助应答的批判来信,边缘收录。


### 147. 肿瘤免疫治疗中的影像组学:从有前景模型走向临床现实(通讯)

*Radiomics in cancer immunotherapy: moving from promising models to clinical reality: correspondence.*

**International Journal of Surgery** · 2025-12-08 · 通讯/观点(无数据) · [PMID 41363126](https://pubmed.ncbi.nlm.nih.gov/41363126/) · [DOI](https://doi.org/10.1097/JS9.0000000000004379)

关于影像组学在肿瘤免疫治疗中临床转化的通讯/观点,无原始数据。属非手术语境的影像组学AI,边缘相关。

> **要点**：免疫治疗影像组学临床转化观点,非外科语境,边缘收录。


### 148. 关于「医学中大语言模型ChatGPT的当前关切与未来方向:机器学习驱动的全球文献计量分析」的来信

*Letter to the Editor "Current concerns and future directions of large language model ChatGPT in medicine: a machine-learning-driven global-scale bibliometric analysis".*

**International Journal of Surgery** · 2025-12-08 · 来信(无数据) · [PMID 41363112](https://pubmed.ncbi.nlm.nih.gov/41363112/) · [DOI](https://doi.org/10.1097/JS9.0000000000004218)

针对同一篇ChatGPT医学应用文献计量分析的来信,无原始数据。属泛医学LLM议题,外科关联弱,边缘相关。

> **要点**：泛医学LLM文献计量来信,边缘收录。


### 149. 不确定性感知与因果测试时自适应基础模型用于结直肠癌病理诊断

*Uncertainty-aware and causal test-time adaptive foundation model for robust colorectal cancer pathology diagnosis.*

**npj Digital Medicine** · 2025-12-06 · 计算病理基础模型方法开发（多数据集） · [PMID 41353286](https://pubmed.ncbi.nlm.nih.gov/41353286/) · [DOI](https://doi.org/10.1038/s41746-025-02149-1)

提出UAD-FM基础模型，整合认知-偶然不确定性分解、基于do-干预的因果测试时自适应与事后校准，用于稳健结直肠癌H&E病理诊断。在TCGA-COAD/READ、CRAG、DigestPath 2019、NCT-CRC-HE-100K、LC25000五个公开数据集上准确率、校准与域稳健性优于现有基础模型，并输出可解释不确定性图。属泛病理基础模型稳健性方法（诊断导向），外科关联间接。

> **要点**：不确定性/因果自适应病理基础模型提升CRC诊断稳健性，属诊断方法、外科关联间接。


### 150. 优化肺腺癌预后建模中计算病理与多转录组学整合的思考：评论

*Perspectives on optimizing computational pathology and multi-transcriptomics integration in lung adenocarcinoma prognostic modeling: a commentary.*

**International Journal of Surgery** · 2025-12-05 · 评论（无数据） · [PMID 41347943](https://pubmed.ncbi.nlm.nih.gov/41347943/) · [DOI](https://doi.org/10.1097/JS9.0000000000004241)

评论类文章，探讨在肺腺癌预后建模中如何优化计算病理（computational pathology）与多转录组学的整合。属组学/计算病理预后建模的外科邻接主题，无原始数据。

> **要点**：评论计算病理+多组学整合用于肺腺癌预后（外科邻接）。


### 151. 关于「人工智能工具传播结直肠癌筛查指南的比较分析:早筛教育新视角」的来信

*Letter to Editor: Comparative analysis of artificial intelligence tools for the dissemination of colorectal cancer screening guidelines: a novel perspective on early screening education.*

**International Journal of Surgery** · 2025-12-05 · 来信(无数据) · [PMID 41347956](https://pubmed.ncbi.nlm.nih.gov/41347956/) · [DOI](https://doi.org/10.1097/JS9.0000000000004173)

针对一篇比较AI(LLM)工具传播结直肠癌筛查指南论文的来信,无原始数据。属AI用于筛查/患教信息,非直接外科动作,边缘相关。

> **要点**：AI工具传播CRC筛查指南的来信,偏患教,边缘收录。


### 152. 「用于预测HNSCC新辅助化学免疫治疗应答的精细化且合乎伦理的影像组学」来信

*Granular and ethical radiomics for predicting HNSCC NACI response--Letter to the editor.*

**International Journal of Surgery** · 2025-12-05 · 来信(无数据) · [PMID 41347938](https://pubmed.ncbi.nlm.nih.gov/41347938/) · [DOI](https://doi.org/10.1097/JS9.0000000000004176)

针对一篇影像组学预测头颈鳞癌(HNSCC)新辅助化学免疫治疗(NACI)应答论文的来信,无原始数据。属预测治疗应答的影像组学,非直接外科动作,边缘相关。

> **要点**：影像组学预测HNSCC新辅助应答的来信,边缘收录。


### 153. 医疗场景中的大语言模型ChatGPT:全球规模横断面、基于机器学习的信息学研究

*Large language model ChatGPT in healthcare scenarios: a global-scale, cross-sectional, machine learning-based informatics study.*

**International Journal of Surgery** · 2025-12-04 · 横断面信息学研究(无摘要) · [PMID 41344376](https://pubmed.ncbi.nlm.nih.gov/41344376/) · [DOI](https://doi.org/10.1097/JS9.0000000000004413)

(无摘要)题示为ChatGPT在医疗场景应用的全球横断面、基于ML的信息学研究;属泛医学LLM信息学议题,缺乏明确外科动作,边缘相关,具体数据因无摘要未提供。

> **要点**：泛医学ChatGPT信息学研究,外科关联弱,边缘收录。


### 154. 早发NSCLC的50岁年龄阈值:SEER-TCGA回顾分析揭示基于年龄治疗应答的预后悖论

*50-Year age threshold for early-onset NSCLC: A SEER-TCGA retrospective analysis reveals a prognostic paradox based on age treatment response.*

**International Journal of Surgery** · 2025-12-04 · 回顾性数据库分析(含随机生存森林) · [PMID 41342688](https://pubmed.ncbi.nlm.nih.gov/41342688/) · [DOI](https://doi.org/10.1097/JS9.0000000000003770)

SEER 161,410例NSCLC(早发6396例)以X-tile、随机生存森林(RSF)、限制立方样条与倾向评分匹配确定早发阈值50岁;RSF列手术(重要性0.2584)与年龄(0.0616)为首要预后因素,手术保护效应随年龄下降。以RSF等ML分析预后、手术为关键变量,非AI辅助外科,边缘相关。

> **要点**：RSF分析NSCLC预后,手术为关键因素但非AI辅助外科,边缘收录。


### 155. 促进疾病诊断与医学影像的肺CT视觉基础模型LCTfound

*A lung CT vision foundation model facilitating disease diagnosis and medical imaging.*

**Nature Communications** · 2025-12-03 · 基础模型开发+多中心评估 · [PMID 41339572](https://pubmed.ncbi.nlm.nih.gov/41339572/) · [DOI](https://doi.org/10.1038/s41467-025-66620-z)

基于105,184例CT的扩散预训练视觉基础模型LCTfound,联合编码影像与临床信息,支持8类任务(CT增强、虚拟CTA、稀疏视图重建、病灶分割、诊断、预后、癌症病理反应预测及三维手术导航),多中心评估中持续优于主流基线。属泛医学基础模型顺带涉及外科(三维手术导航),归边缘相关。

> **要点**：肺CT基础模型涵盖三维手术导航等8任务(泛基础模型,边缘相关)


### 156. 评论：从可行性到精准适应证——增强现实与荧光引导在保实质肝切除中的情境化价值

*Commentary: from feasibility to precision indication: context-dependent value of augmented reality and fluorescence guidance in parenchyma-sparing hepatectomy.*

**International Journal of Surgery** · 2025-12-03 · 评论（无数据） · [PMID 41342518](https://pubmed.ncbi.nlm.nih.gov/41342518/) · [DOI](https://doi.org/10.1097/JS9.0000000000004207)

评论类文章，讨论增强现实（AR）与荧光引导在保留实质肝切除术中的情境依赖价值，主张从可行性走向精准适应证。属术中引导技术评论（含AR/荧光，非纯AI），无原始数据。

> **要点**：评论AR与荧光引导在肝切除中的情境化价值（外科邻接）。


### 157. 影像组学与AI整合用于肝癌个体化治疗的文献计量分析

*Bibliometric analysis of application of radiomics and artificial intelligence integration in personalized treatment of hepatocellular carcinoma.*

**International Journal of Surgery** · 2025-12-03 · 文献计量分析 · [PMID 41627427](https://pubmed.ncbi.nlm.nih.gov/41627427/) · [DOI](https://doi.org/10.1097/JS9.0000000000004177)

文献计量学研究，检索WoSCC近14年615篇文献，用VOSviewer/CiteSpace/bibliometrix分析放射组学与AI在HCC个体化治疗中的研究趋势；中美产出最多，生物标志物、准确性、体部放疗为近年爆发关键词。属领域计量综述，外科成分弥散，列为边缘。

> **要点**：HCC放射组学+AI的文献计量趋势，边缘相关。


### 158. 社交辅助机器人对患者参与度与照护质量影响的随机试点研究

*A randomized pilot study evaluating socially assistive robot effects on patient engagement and care quality.*

**npj Digital Medicine** · 2025-12-02 · 随机对照试点研究 · [PMID 41331089](https://pubmed.ncbi.nlm.nih.gov/41331089/) · [DOI](https://doi.org/10.1038/s41746-025-02117-9)

在外科病房开展随机外部试点(N=229)，评估社交辅助机器人(SAR，标准照护+SAR vs 仅标准照护)对患者参与度、感知照护质量(共同主要结局)及健康相关生活质量的影响。SAR采用预设对话流提供标准化患教、支持与基础分诊；总体对参与度/质量影响有限，但对疼痛管理有正向作用，无明显负面效应，留存率高。

> **要点**：外科病房社交机器人(预设对话、无AI自主成分)可行，疼痛管理获益(边缘相关)。


### 159. 基于基因表达谱预测黑色素瘤前哨淋巴结状态(CP-GEP，MERLIN_001)

*Gene Expression Profile-Based Test to Predict Melanoma Sentinel Node Status: The MERLIN_001 Study.*

**JAMA Surgery** · 2025-12-01 · 前瞻性多中心盲法预后研究 · [PMID 41123931](https://pubmed.ncbi.nlm.nih.gov/41123931/) · [DOI](https://doi.org/10.1001/jamasurg.2025.4399)

边缘相关：前瞻性多中心盲法预后研究，1761例皮肤黑色素瘤用临床病理+基因表达谱(CP-GEP)计算预测模型判定前哨淋巴结(SLN)转移风险以指导是否行SLNB。37.0%被判为低危，其中SLN阳性7.1%、阴性预测值92.9%；高危组阳性率23.8%，约为低危3倍。属组学/计算预测模型辅助外科决策，AI/ML框架非重点，列为边缘。

> **要点**：CP-GEP可识别<10% SLN转移风险者以安全豁免SLNB，辅助医患共同决策。


### 160. 语音处理与大模型增强临床文书：眼科LAOS系统研究

*Enhancing clinical documentation with voice processing and large language models: a study on the LAOS system.*

**npj Digital Medicine** · 2025-11-28 · LLM+语音的临床文书系统研究 · [PMID 41315671](https://pubmed.ncbi.nlm.nih.gov/41315671/) · [DOI](https://doi.org/10.1038/s41746-025-02170-4)

构建基于LLM的眼科辅助系统LAOS，结合语音识别、检索增强生成（RAG）与LoRA，将临床对话转为结构化文书，评估入院记录、手术记录、出院小结三类任务。通过BLEU、ROUGE-L、BERT Score及执业医师验证，显示在完整性、准确性与效率上显著提升。含手术记录生成但外科成分为附带，列边缘。

> **要点**：眼科语音+LLM文书系统（含手术记录），外科成分附带，列边缘。


### 161. 住院姑息治疗与老年外科患者术后医疗资源利用

*Inpatient Palliative Care and Post-operative Healthcare Utilization Among Older Surgical Patients.*

**Annals of Surgery** · 2025-11-27 · 回顾性多中心队列(NLP辅助) · [PMID 41299808](https://pubmed.ncbi.nlm.nih.gov/41299808/) · [DOI](https://doi.org/10.1097/SLA.0000000000006990)

回顾性多中心研究，用自然语言处理(NLP)从EHR识别1082例接受五类大择期手术的重症老年患者的五项姑息治疗流程记录，并用Medicare数据评估术后一年资源利用。54.1%有代理决策人记录；有代码状态限制者术后在家天数显著更少(314.9对338.6天, P=0.004)。NLP仅作数据抽取工具、AI成分从属。

> **要点**：外周相关：NLP仅作数据抽取工具，研究本质为姑息治疗结局流行病学。


### 162. 评估肾移植排斥表型谱的连续性指数

*Continuous indices to assess the phenotypic spectrum of kidney transplant rejection.*

**Nature Communications** · 2025-11-26 · 多中心队列研究（指数构建与验证） · [PMID 41298371](https://pubmed.ncbi.nlm.nih.gov/41298371/) · [DOI](https://doi.org/10.1038/s41467-025-65153-9)

多中心队列研究，纳入全球10个中心8873例患者的19,500份活检，基于组织学病变评分构建量化抗体介导排斥/微血管炎症与T细胞介导排斥/小管间质炎症的两类连续指数，并计算总体活动性与慢性化指数。这些指数对主要排斥诊断类别判别力优异（AUC 0.95–0.99），在推导集与验证集表现一致，且在同一诊断类别内也与移植物失功相关。为Banff二分类之外提供反映排斥连续谱的可解释全局评估工具（属统计学指数构建，AI成分弱）。

> **要点**：连续性指数以AUC 0.95–0.99刻画肾移植排斥连续谱，优于二分类阈值。


### 163. 肺癌计算机辅助诊断系统研究进展（综述）

*Research progress in computer-aided diagnosis systems for lung cancer.*

**npj Digital Medicine** · 2025-11-26 · 临床导向叙述性综述 · [PMID 41299062](https://pubmed.ncbi.nlm.nih.gov/41299062/) · [DOI](https://doi.org/10.1038/s41746-025-02101-3)

临床导向综述，梳理经典影像、机器学习与深度学习的肺癌CAD，聚焦多模态CT/PET-临床融合、小数据策略、可解释AI与隐私保护多中心学习。所述系统AUC≥0.95、假阳性<0.1/CT、早诊提升约20-30%、预后C指数约0.85-0.90。属诊断CAD综述，肺癌为外科疾病但内容偏诊断，列边缘。

> **要点**：肺癌CAD综述（AUC≥0.95、早诊+20-30%），偏诊断影像、外科关联间接。


### 164. 宫腔镜形态学在子宫内膜癌诊断与生育力保护中的应用(综述)

*Application of hysteroscopic morphology in endometrial cancer diagnosis and fertility preservation: scientific insights and clinical artistry.*

**International Journal of Surgery** · 2025-11-25 · 叙述性综述 · [PMID 41731877](https://pubmed.ncbi.nlm.nih.gov/41731877/) · [DOI](https://doi.org/10.1097/JS9.0000000000003847)

综述宫腔镜形态学(表面结构与异型血管,如肾小球型、脑回型)在子宫内膜癌诊断、分期与保育治疗中的意义,并述及窄带成像、5-ALA光动力诊断及AI宫腔镜图像分析辅助病灶分类与生育结局预测。属临床综述,AI仅为其中一项进展,无量化数据。

> **要点**：宫腔镜形态学结合分子分型与AI图像分析用于EC个体化诊治,AI为辅助成分


### 165. DRG支付下PTED与UBE治疗腰椎间盘突出的成本差异

*Analysis of cost differences between comparing Percutaneous Transforaminal Endoscopic Discectomy (PTED) and Unilateral Biportal Endoscopy (UBE) in the treatment of lumbar disc herniation under Diagnosis-Related Group (DRG) payment: a retrospective cohort study.*

**International Journal of Surgery** · 2025-11-25 · 回顾性队列/卫生经济学（含ML费用建模） · [PMID 41287888](https://pubmed.ncbi.nlm.nih.gov/41287888/) · [DOI](https://doi.org/10.1097/JS9.0000000000004064)

回顾性队列364例腰椎间盘突出患者，倾向评分匹配后比较经皮椎间孔镜（PTED）与单侧双通道内镜（UBE），并用LASSO和Elastic Net回归识别住院费用影响因素。两组复发率（13.8% vs 12.9%，p=0.806）、再手术率无差异，但PTED总费用显著更低（中位25,794元 vs 33,247元，p<0.001）。

> **要点**：脊柱手术卫生经济研究、ML仅用于费用因素，列边缘。


### 166. 人工智能在肿瘤影像筛查中的应用（综述）

*Artificial intelligence in oncological imaging screening.*

**International Journal of Surgery** · 2025-11-25 · 综述 · [PMID 41287865](https://pubmed.ncbi.nlm.nih.gov/41287865/) · [DOI](https://doi.org/10.1097/JS9.0000000000003858)

综述类文章，系统梳理AI在超声、X线、CT、MRI和内镜等多模态肿瘤影像早筛中的进展与临床应用，讨论数据偏倚、监管框架、可解释性等挑战。为非手术语境的临床影像AI，结论可外推至外科决策，无原始数据。

> **要点**：非手术影像AI综述、可外推外科，列边缘。


### 167. 单孔肋缘下与多孔肋间入路机器人肺叶切除治疗NSCLC对比

*Subcostal single-port versus intercostal multi-port robotic lobectomy for non-small cell lung cancer: a retrospective propensity score-matched cohort study.*

**International Journal of Surgery** · 2025-11-24 · 回顾性倾向匹配队列 · [PMID 41287875](https://pubmed.ncbi.nlm.nih.gov/41287875/) · [DOI](https://doi.org/10.1097/JS9.0000000000004099)

回顾性倾向评分匹配队列，339例NSCLC机器人肺叶切除，匹配后每组112例。单孔（SP）组手术与操控台时间更短（175 vs 193.5 min；144 vs 167 min）、胸腔引流更少（667.5 vs 842.5 mL）、术后疼痛更低；3年无复发生存88.3% vs 81.1%（log-rank p=0.449）。使用da Vinci遥操作机器人，无AI自主成分。

> **要点**：手术机器人为遥操作、无AI成分，列边缘。


### 168. 结直肠癌全切片图像的多模态分析（系统综述）

*Multimodal analysis of whole slide images in colorectal cancer.*

**npj Digital Medicine** · 2025-11-24 · 系统综述（数字病理，PROSPERO 635831） · [PMID 41286436](https://pubmed.ncbi.nlm.nih.gov/41286436/) · [DOI](https://doi.org/10.1038/s41746-025-02095-y)

系统综述评述结直肠癌多模态数字病理（融合病理、放射、临床与组学）技术、性能及与基础模型的对比。2014.1-2024.8检索1601篇、22篇入选，用Newcastle-Ottawa评估质量，发现多模态多用于提升诊断准确率与生存预测、优于单模态，但多数未做外部验证，存在数据构建、异质性、时间对齐、模态权重与可解释性挑战。属数字病理综述，外科关联间接。

> **要点**：CRC多模态数字病理综述（22篇），多模态优于单模态但外部验证不足。


### 169. UltraFedFM：联邦自监督预训练的隐私保护超声基础模型

*From pretraining to privacy: federated ultrasound foundation model with self-supervised learning.*

**npj Digital Medicine** · 2025-11-21 · 多中心联邦学习基础模型开发 · [PMID 41272022](https://pubmed.ncbi.nlm.nih.gov/41272022/) · [DOI](https://doi.org/10.1038/s41746-025-02085-0)

跨9国16家机构、超100万张超声图像(19个器官、10种模态)联邦学习预训练的超声基础模型。疾病诊断平均AUROC 0.927，病灶分割DSC 0.878，诊断准确性超过中级超声医师(4-8年)、与专家级(10年以上)相当。属泛用诊断超声基础模型，无明确外科动作，边缘相关。

> **要点**：泛用超声诊断基础模型，术前/术中超声可外推，边缘相关。


### 170. 甘油三酯-葡萄糖体质指数（TyG-BMI）与甲状腺乳头状癌侵袭性及复发风险

*The triglyceride-glucose body mass index paradox: dual metabolic effects on tumor aggressiveness and recurrence risk in 11 317 papillary thyroid carcinoma patients.*

**International Journal of Surgery** · 2025-11-21 · 单中心回顾性队列（含ML特征加权） · [PMID 41287894](https://pubmed.ncbi.nlm.nih.gov/41287894/) · [DOI](https://doi.org/10.1097/JS9.0000000000003887)

单中心回顾性队列11317例PTC患者，用logistic回归、限制性立方样条分析TyG-BMI与肿瘤侵袭性/复发风险的线性与非线性关系，并用机器学习算法加权关键因子。高TyG-BMI与肿瘤>1cm（OR 1.35）、多灶性（OR 1.42）、腺外侵犯（OR 1.53）风险升高相关，与淋巴结转移（OR 0.36）及中高复发风险（OR 0.68）降低相关（均P<0.001），ML提示甘油三酯为主要贡献因子。

> **要点**：外科相关癌种的代谢标志物ML研究、外科动作弱，列边缘。


### 171. 基于高灵敏自体荧光系统的术中甲状旁腺实时探测

*Real-time detection of parathyroid glands during surgery using a highly sensitive autofluorescence-based system.*

**International Journal of Surgery** · 2025-11-20 · 前瞻性单中心临床验证研究 · [PMID 41295885](https://pubmed.ncbi.nlm.nih.gov/41295885/) · [DOI](https://doi.org/10.1097/JS9.0000000000004078)

前瞻性单中心临床验证（106例），设计激光诱导荧光探测系统实时识别甲状旁腺，采用创新算法克服无影灯等环境光干扰。以ICG稀释模拟自发荧光，最低可检浓度8×10⁻¹⁰ mol/L、检测限1.24×10⁻¹⁰ mol/L；100余例在体探测准确率98.3%（高于PTeye与肉眼的96%）。属术中荧光探测装置（算法为信号处理，非明确ML）。

> **要点**：自体荧光系统术中实时探测甲状旁腺准确率98.3%（外科邻接）。


### 172. PathOrchestra：覆盖100余项临床级任务的计算病理基础模型

*PathOrchestra: a comprehensive foundation model for computational pathology with over 100 diverse clinical-grade tasks.*

**npj Digital Medicine** · 2025-11-19 · 多中心自监督基础模型开发与多任务评估 · [PMID 41258399](https://pubmed.ncbi.nlm.nih.gov/41258399/) · [DOI](https://doi.org/10.1038/s41746-025-02027-w)

基于3中心21种组织、287,424张切片训练的病理基础模型，在61个私有加51个公开数据集的112项任务上评估(涵盖泛癌分类、亚型分型、生物标志物、基因表达预测、结构化报告)。在27,755张WSI与逾940万ROI图像上，47项任务准确率超0.950，并首次为结直肠癌和淋巴瘤生成结构化报告。属泛用计算病理基础模型，边缘相关。

> **要点**：泛癌数字病理基础模型，外科肿瘤病理可外推，边缘相关。


### 173. 人工智能在患者教育中的应用:文献计量分析

*Artificial intelligence in patient education: a bibliometric analysis.*

**International Journal of Surgery** · 2025-11-19 · 文献计量分析 · [PMID 41706663](https://pubmed.ncbi.nlm.nih.gov/41706663/) · [DOI](https://doi.org/10.1097/JS9.0000000000004075)

文献计量分析428篇(1995-2025)AI用于患者教育的文献。「外科」为最主要研究类别(21.03%,中心性0.51);2023年后指数增长(2024年189篇),美国产出最多(221篇/3033次引用);热点集中于生成式AI(ChatGPT/LLM)与可读性/健康素养。外科为突出子主题,但主题为患者教育AI。

> **要点**：AI患者教育以外科为最大类别,生成式AI为当前热点


### 174. 影像组学表型与肿瘤免疫生物学预测NSCLC免疫治疗（通讯）

*Radiomic phenotypes and tumor immunobiology: advancing NSCLC immunotherapy prediction through unsupervised learning and digital integration (correspondence).*

**International Journal of Surgery** · 2025-11-19 · 通讯/评论（无摘要） · [PMID 41255295](https://pubmed.ncbi.nlm.nih.gov/41255295/) · [DOI](https://doi.org/10.1097/JS9.0000000000004016)

通讯/评论类（无摘要），主题为通过无监督学习与数字化整合，用影像组学表型预测非小细胞肺癌免疫治疗响应。属影像组学AI，服务于免疫治疗而非明确外科动作，列边缘。

> **要点**：影像组学AI用于免疫治疗、外科动作不明，列边缘。


### 175. 连续与组件化面瘫测量对齐及临床可解释模型

*Continuous and componentized facial palsy measurement alignment and clinical interpretable model.*

**npj Digital Medicine** · 2025-11-19 · 模型开发与多中心验证 · [PMID 41258389](https://pubmed.ncbi.nlm.nih.gov/41258389/) · [DOI](https://doi.org/10.1038/s41746-025-02063-6)

基于274例前庭神经鞘瘤(VS)患者构建密集面部关键点对齐模型，提出改良House-Brackmann(H-B)标准对眼睑/口部连续、组件化测量。模型面瘫检测优于现有算法，眼睑/口部不对称系数与共识H-B分级相关r=0.892/0.890(P<0.001)；经ROC阈值转为分级，并在独立多中心post-VS队列验证。

> **要点**：面部关键点模型实现VS(术后)面瘫的连续可解释评估(评估任务，边缘相关)。


### 176. CartiSurface：膝关节MRI软骨厚度的隐式曲面重建

*CartiSurface: implicit surface reconstruction for anatomically-aware cartilage thickness mapping in knee MRI.*

**npj Digital Medicine** · 2025-11-18 · 方法学(隐式曲面重建)开发与数据集验证 · [PMID 41254235](https://pubmed.ncbi.nlm.nih.gov/41254235/) · [DOI](https://doi.org/10.1038/s41746-025-02040-z)

提出基于符号距离函数(SDF)的隐式曲面重建框架，在股骨与胫骨软骨下骨面间学习估计软骨厚度，无需体素级软骨标注即可生成平滑连续厚度图。在OAI数据集上于准确性、表面规整度与鲁棒性上优于现有方法，可用于骨关节炎早期检测与纵向监测。属膝关节影像分析(骨科邻接)，无明确外科动作，边缘相关。

> **要点**：膝OA软骨定量影像方法，骨科手术规划可外推，边缘相关。


### 177. 机器学习衍生甲基化签名整合转录组与肿瘤微环境解码肝癌预后

*Decoding hepatocellular carcinoma prognosis: a machine learning-derived methylation signature integrating transcriptomic and tumor microenvironment insights.*

**International Journal of Surgery** · 2025-11-18 · 多组学预后签名开发与多队列验证 · [PMID 41731861](https://pubmed.ncbi.nlm.nih.gov/41731861/) · [DOI](https://doi.org/10.1097/JS9.0000000000003942)

整合TCGA转录组、甲基化组与临床数据,用数百种ML算法组合开发并验证多维预后签名,得到10基因mrDEGs面板(含DCXR、LBP、S100A10等),预测总生存优于传统临床病理参数并在多个独立队列稳健,10对肝癌组织qPCR/WB验证。为预后组学ML,外科动作弱。

> **要点**：10基因甲基化ML签名稳健分层肝癌预后,支持个体化决策


### 178. 多模态AI整合肿瘤微环境预测皮肤黑色素瘤转移

*Multimodal AI and tumour microenvironment integration predicts metastasis in cutaneous melanoma*

**Nature Communications** · 2025-11-18 · 多队列回顾性预后模型开发验证 · [DOI](https://doi.org/10.1038/s41467-025-65051-0)

MelanoMAP多模态AI整合肿瘤微环境（TME）数字生物标志物与临床病理特征，基于逾3,500张组织切片改进局限期皮肤黑色素瘤预后判断。C-index达0.82，较传统AJCC分期（0.66）提升24%，在六个国际队列持续优于纯临床病理模型；SHAP分析识别TME数字标志物及年龄、核分裂计数、Breslow深度为转移风险关键因素。属数字病理预后模型，无明确外科动作，边缘相关。

> **要点**：数字病理多模态AI预测黑色素瘤转移（C-index 0.82 vs AJCC 0.66）。


### 179. 基于多维MRI特征的无创AI模型预测直肠癌三级淋巴结构、免疫治疗反应与预后

*A noninvasive AI model based on multi-dimensional MRI features for predicting tertiary lymphoid structures, immunotherapy response, and prognosis in rectal cancer.*

**International Journal of Surgery** · 2025-11-18 · 多队列（含前瞻）影像组学XGBoost建模 · [PMID 41499583](https://pubmed.ncbi.nlm.nih.gov/41499583/) · [DOI](https://doi.org/10.1097/JS9.0000000000003845)

纳入4队列606例直肠癌，用XGBoost整合影像组学、PCA/SVD降维特征与生境（habitat）异质性特征预测三级淋巴结构（TLS）：内部验证AUROC 0.88、外部0.81/0.84；预测免疫治疗病理完全缓解AUROC 0.74，高TLS评分组DFS更优。属无创影像组学，终点偏免疫治疗决策而非明确外科动作，归边缘。

> **要点**：MRI影像组学无创预测直肠癌TLS及免疫治疗反应，外科邻接。


### 180. 基于瘤内与瘤周影像组学无创预测NSCLC新辅助免疫化疗无应答者的多中心研究

*Non-invasive prediction of non-responders to neoadjuvant immunochemotherapy in NSCLC using intratumoral and peritumoral radiomics: a multicenter study*

**International Journal of Surgery** · 2025-11-17 · 多中心影像组学预测建模(摘要缺失) · [DOI](https://doi.org/10.1097/js9.0000000000004027)

多中心研究(摘要缺失)，题述利用瘤内与瘤周影像组学特征无创预测非小细胞肺癌(NSCLC)对新辅助免疫化疗的无应答者。属预测新辅助治疗反应的影像组学模型，与外科切除决策关联较间接。

> **要点**：影像组学预测NSCLC新辅助免疫化疗反应(治疗反应预测为主，列边缘)


### 181. 胰腺肿瘤术后胰瘘围手术期预测模型研究进展（综述）

*Research progress on perioperative prediction models for postoperative pancreatic fistula after pancreatic tumor surgery.*

**International Journal of Surgery** · 2025-11-17 · 综述 · [PMID 41247818](https://pubmed.ncbi.nlm.nih.gov/41247818/) · [DOI](https://doi.org/10.1097/JS9.0000000000003896)

综述类文章，系统回顾胰腺肿瘤术后胰瘘（POPF）的危险因素与预测模型研究进展，讨论现有模型局限并提出未来方向。聚焦外科并发症预测模型主题，但未明确涉及AI/ML方法，无原始数据。

> **要点**：外科并发症预测模型综述、AI不明确，列边缘。


### 182. 就「血浆蛋白质组学联合机器学习早期预测前列腺癌」的通讯评论

*Correspondence: comment on "Prospective cohort study integrating plasma proteomics and machine learning for early risk prediction of prostate cancer".*

**International Journal of Surgery** · 2025-11-14 · 通讯/评论（无摘要） · [PMID 41247995](https://pubmed.ncbi.nlm.nih.gov/41247995/) · [DOI](https://doi.org/10.1097/JS9.0000000000004046)

通讯/评论类（无摘要），针对一项整合血浆蛋白质组学与机器学习进行前列腺癌早期风险预测的前瞻队列研究。属外科相关癌种（前列腺癌）的生物标志物ML，无明确外科动作，列边缘。

> **要点**：前列腺癌蛋白质组学ML评论、外科动作弱，列边缘。


### 183. 人工智能在超声心动图中的应用：趋势、热点与方向（文献计量）

*Artificial intelligence in echocardiography: trends, hotspots and future directions.*

**International Journal of Surgery** · 2025-11-14 · 文献计量学分析 · [PMID 41247994](https://pubmed.ncbi.nlm.nih.gov/41247994/) · [DOI](https://doi.org/10.1097/JS9.0000000000004061)

文献计量分析1296篇文献（bibliometrix R），2019-2024年AI超声心动图年发文由45增至302篇，美中主导；热点为自动图像分析、诊断分类、预后预测与流程优化，主题从结构异常研究转向深度学习应用。属心脏影像AI，与心脏外科围手术期邻接。

> **要点**：心脏影像AI计量、与心外科邻接，列边缘。


### 184. 活体供肾移植术前预测早期肾功能的列线图与网页决策支持系统

*A preoperative nomogram and web-based clinical decision support system for predicting early renal function after living donor kidney transplantation: a retrospective multicenter cohort study.*

**International Journal of Surgery** · 2025-11-14 · 多中心回顾性队列（预测建模+CDSS） · [PMID 41247926](https://pubmed.ncbi.nlm.nih.gov/41247926/) · [DOI](https://doi.org/10.1097/JS9.0000000000004057)

回顾性多中心队列3335例活体肾移植受者（A/B院训练与内部集、C院外部验证），用供受者术前特征构建综合模型与基础参数模型，内部集MAE 0.15/RMSE 0.36、外部集MAE 0.14/RMSE 0.18；基础模型部署为列线图与手机计算器。以列线图回归为主、ML框架不明确。

> **要点**：移植术前预测CDSS但ML框架不明确，列边缘。


### 185. da Vinci单孔（SP）机器人辅助结直肠手术的初步探索

*Single-port robotic-assisted colorectal surgery using the da Vinci SP system: a preliminary noncomparative exploratory cohort study.*

**International Journal of Surgery** · 2025-11-13 · 前瞻性单臂探索队列 · [PMID 41247915](https://pubmed.ncbi.nlm.nih.gov/41247915/) · [DOI](https://doi.org/10.1097/JS9.0000000000003915)

前瞻非对照探索队列15例（NCT06141421）行SP机器人结直肠手术，全部无中转，中位手术119 min、失血10 mL、住院12天；3例Clavien-Dindo II级并发症，12例恶性均R0切除、中位清扫淋巴结13.5枚，12个月无复发/死亡。为遥操作手术机器人，无AI自主成分。

> **要点**：单孔机器人遥操作、无AI，列边缘。


### 186. 面向外科患者抗凝/抗血小板治疗的智能评估系统

*Intelligent evaluation system for anticoagulant and antiplatelet therapy in surgical patients.*

**International Journal of Surgery** · 2025-11-13 · 前后对照的质量改进/实施研究 · [PMID 41247863](https://pubmed.ncbi.nlm.nih.gov/41247863/) · [DOI](https://doi.org/10.1097/JS9.0000000000003980)

针对围手术期抗凝/抗血小板患者出血与血栓栓塞风险评估难题，开发整合医院信息系统、ICD-10编码及2018 EHRA指南的智能决策支持平台，自动给出停药/恢复建议并按肌酐清除率与体重计算撤药时点。实施前（2018-01至2021-09）有5例术后14天内缺血性卒中/心梗，2021-10上线至2025-03未再发生该类事件，评估与医嘱用时较原流程缩短3.16分钟。系统为规则/指南驱动的跨学科决策支持（非机器学习）。

> **要点**：规则驱动的围手术期抗凝管理决策支持系统，上线后严重缺血事件归零、耗时缩短。


### 187. 人工智能在前列腺癌中的应用图谱（全球文献计量）

*Mapping the application landscape of artificial intelligence in prostate cancer: a global bibliometric analysis.*

**International Journal of Surgery** · 2025-11-11 · 文献计量学分析 · [PMID 41231645](https://pubmed.ncbi.nlm.nih.gov/41231645/) · [DOI](https://doi.org/10.1097/JS9.0000000000003828)

文献计量分析2014-2024年2581篇文献（CiteSpace V.6.3.1），AI-前列腺癌研究2020年后指数增长，美中领先；研究从传统机器学习转向深度学习，聚焦数字病理与PI-RADS诊断。属外科相关癌种的AI计量分析。

> **要点**：前列腺癌AI研究计量、外科癌种邻接，列边缘。


### 188. 人工智能在黑色素瘤研究中的文献计量分析

*Artificial Intelligence in melanoma research: a bibliometric analysis.*

**International Journal of Surgery** · 2025-11-11 · 文献计量学分析 · [PMID 41217339](https://pubmed.ncbi.nlm.nih.gov/41217339/) · [DOI](https://doi.org/10.1097/JS9.0000000000003879)

文献计量分析1476篇AI-黑色素瘤文献（VOSviewer、CiteSpace、bibliometrix），2017年后发文激增、2024年达260篇，美中领先；两大热点为AI辅助诊断与AI整合免疫治疗。黑色素瘤为外科可切除肿瘤，属外科相关癌种的AI计量。

> **要点**：黑色素瘤AI研究计量、外科癌种邻接，列边缘。


### 189. 对“整合计算病理与多组学刻画肺腺癌异质性及预后建模”的评论

*A commentary on "Integrating computational pathology and multi-transcriptomics to characterize lung adenocarcinoma heterogeneity and prognostic modeling".*

**International Journal of Surgery** · 2025-11-11 · 评论/通讯（无数据） · [PMID 41231647](https://pubmed.ncbi.nlm.nih.gov/41231647/) · [DOI](https://doi.org/10.1097/JS9.0000000000004002)

评论（Commentary），无原始数据，针对一项将计算病理（computational pathology）与多转录组学结合、刻画肺腺癌异质性并构建预后模型的研究展开讨论。计算病理属数字病理AI范畴、肺腺癌为可切除肿瘤，但评论未涉及明确外科动作。

> **要点**：计算病理+多组学肺腺癌预后建模的评论，属数字病理AI边缘话题。


### 190. 深度学习自动检测胸部CT上透X线异物吸入

*Automated detection of radiolucent foreign body aspiration on chest CT using deep learning.*

**npj Digital Medicine** · 2025-11-10 · 多队列回顾性深度学习开发与盲法验证 · [PMID 41214229](https://pubmed.ncbi.nlm.nih.gov/41214229/) · [DOI](https://doi.org/10.1038/s41746-025-02097-w)

提出结合MedpSeg气道分割与卷积分类器的深度学习模型检测透X线异物吸入(FBA)，在3个独立队列准确率均大于90%。盲法独立评估中召回率71.4% vs 放射科医师35.7%、F1 74.1% vs 52.6%，有望减少漏诊。属诊断性影像AI(可外推至支气管镜取物操作)，边缘相关。

> **要点**：CT诊断异物吸入，指向支气管镜操作，边缘相关。


### 191. 基于CCTA用syngo.via规划冠脉搭桥移植物长度的可行性与准确性

*The feasibility and accuracy of planning the length of grafts of coronary artery bypass grafting using syngo.via based on CCTA.*

**International Journal of Surgery** · 2025-11-10 · 前瞻性验证研究 · [PMID 41208793](https://pubmed.ncbi.nlm.nih.gov/41208793/) · [DOI](https://doi.org/10.1097/JS9.0000000000003812)

前瞻纳入74例CABG患者、302支移植物，用西门子syngo.via「Define vessel」模块基于CCTA自动血管分割并测量移植物长度进行术前规划。术前与术中/术后测量强相关（r=0.86-0.99）、ICC 0.74-0.99，Bland-Altman偏差在临床可接受范围。为自动分割的术前规划工具，未明确AI/ML成分。

> **要点**：自动血管分割用于CABG术前规划、AI成分不明确，列边缘。


### 192. 整合可解释AI与数字孪生用于肿瘤治疗分层（通讯）

*Integrating explainable AI and digital twins for next-generation therapeutic stratification in oncology (Correspondence).*

**International Journal of Surgery** · 2025-11-10 · 通讯/评论（无摘要） · [PMID 41208618](https://pubmed.ncbi.nlm.nih.gov/41208618/) · [DOI](https://doi.org/10.1097/JS9.0000000000003729)

通讯/评论类（无摘要），主张整合可解释人工智能（XAI）与数字孪生实现下一代肿瘤治疗分层。数字孪生与手术规划邻接，但主题为泛化的肿瘤治疗分层、非明确外科动作，列边缘。

> **要点**：XAI+数字孪生用于肿瘤治疗分层、与手术规划邻接，列边缘。


### 193. 采用个体化机器人导航与多模态影像提升双束ACL重建的手术精度

*Improving surgical accuracy in double-bundle ACL reconstruction using individualized robotic navigation and multimodal imaging.*

**International Journal of Surgery** · 2025-11-10 · 原始研究（摘要缺失，类型不详） · [PMID 41208795](https://pubmed.ncbi.nlm.nih.gov/41208795/) · [DOI](https://doi.org/10.1097/JS9.0000000000003840)

本文（无摘要）报道在双束前交叉韧带（ACL）重建中，应用个体化机器人导航结合多模态影像以提高手术定位精度。属机器人导航/影像引导范畴，但因缺摘要且以机械式机器人导航为主、AI自主成分不明确，归为边缘相关。

> **要点**：机器人导航+多模态影像用于ACL重建，导航/AI成分待确认。


### 194. 机器人辅助导航系统用于肺结节术前定位的前瞻性单中心非劣效RCT

*The Effectiveness of Robotic-assisted Navigation System for Preoperative Lung Nodule Localization: a Prospective, Single-center, Non-inferiority, Randomized Clinical Study.*

**International Journal of Surgery** · 2025-11-10 · 前瞻性单中心非劣效RCT（n=100） · [PMID 41208787](https://pubmed.ncbi.nlm.nih.gov/41208787/) · [DOI](https://doi.org/10.1097/JS9.0000000000004033)

前瞻性单中心非劣效随机对照研究，纳入100例<20mm孤立肺结节患者，比较机器人辅助导航与传统CT引导手动穿刺定位，随后均行VATS切除。机器人组在定位偏差、CT扫描次数（均P<0.001）、首针成功率（100% vs 60%，P<0.001）、单次调整定位成功率（100% vs 80%，P=0.001）及总DLP（P<0.001）上均优于手动组，并发症无差异。系统为影像引导的机器人定位（机械定位为主，AI自主成分不明确）。

> **要点**：机器人辅助肺结节定位非劣于手动，首针成功率与辐射剂量更优。


### 195. Wnt信号与轴突导向分子串扰构建结直肠癌诊断预后新签名

*Crosstalk between the Wnt signaling pathway and axon guidance molecules reveals a novel signature for accurately predicting diagnosis, prognosis, and immune landscape in colorectal cancer.*

**International Journal of Surgery** · 2025-11-07 · 生物信息学+机器学习+体外实验 · [PMID 41208601](https://pubmed.ncbi.nlm.nih.gov/41208601/) · [DOI](https://doi.org/10.1097/JS9.0000000000003853)

利用小鼠肝转移模型与多队列RNA测序，用多种机器学习算法构建Wnt信号-轴突导向基因签名（WARGsSig），预测结直肠癌诊断、预后与免疫微环境；VAX2为最高风险基因，在TMA中高表达且预后差，体外敲低抑制增殖迁移侵袭。属外科相关癌种的组学ML研究、偏基础机制、外科动作弱。

> **要点**：结直肠癌组学ML预后签名、外科动作弱，列边缘。


### 196. 基于可解释多参数MRI影像组学的椎体转移癌原发灶无创溯源模型：多中心队列研究

*Explainable multiparameter MRI radiomics model for the noninvasive tracing of the origin of vertebral metastatic cancer: a multicenter cohort study.*

**International Journal of Surgery** · 2025-11-06 · 多中心回顾性诊断队列(影像组学) · [PMID 41202318](https://pubmed.ncbi.nlm.nih.gov/41202318/) · [DOI](https://doi.org/10.1097/JS9.0000000000003819)

多中心研究纳入5家医院1123例椎体压缩骨折患者，基于矢状位T1WI/T2WI/压脂T2WI手动三维分割提取3135个影像组学特征，经mRMR筛选后用SVM建模。模型鉴别椎体转移癌(VMC)在验证集及两个外部测试集的AUC分别为0.99、0.87、0.90，并能准确预测肺、乳腺、前列腺原发；SHAP显示wavelet特征贡献最大。属纯诊断影像组学，旨在减少有创活检，无直接外科动作，列为边缘相关。

> **要点**：无创MRI影像组学可鉴别椎体转移癌并溯源原发灶(AUC≤0.99)，减少有创活检。


### 197. 重思乳腺癌新辅助治疗反应的AI预测：迈向机制导向与亚型感知建模(致编辑信)

*Rethinking AI-based prediction of NAT response in breast cancer: toward mechanistic and subtype-aware modeling - Letter to the Editor.*

**International Journal of Surgery** · 2025-11-06 · 评论/致编辑信(无数据) · [PMID 41202316](https://pubmed.ncbi.nlm.nih.gov/41202316/) · [DOI](https://doi.org/10.1097/JS9.0000000000003807)

致编辑信(无摘要数据)，评论乳腺癌新辅助治疗(NAT)反应的AI预测研究，主张从单纯数据驱动转向融入机制与分子亚型信息的建模思路。涉及AI预测新辅助反应，属术前肿瘤治疗决策范畴，与外科决策间接相关，列为边缘相关。

> **要点**：呼吁乳腺癌NAT反应AI预测应纳入机制与亚型信息以提升可靠性。


### 198. 肝脏外科的影像引导导航

*Image-guided navigation in liver surgery.*

**British Journal of Surgery** · 2025-11-06 · 综述/文章(无数据,类型不详) · [PMID 41251617](https://pubmed.ncbi.nlm.nih.gov/41251617/) · [DOI](https://doi.org/10.1093/bjs/znaf254)

文章(无摘要),主题为肝脏外科中的影像引导导航(image-guided navigation)技术。属术中导航技术、与手术AI脉络邻接,但标题未明确AI成分(可为常规配准/追踪或含三维重建/AR),故列为边缘相关。

> **要点**：影像引导导航服务肝切除术中定位,是外科AI/术中引导的邻接技术


### 199. 快速蒸发电离质谱(REIMS)在外科中的应用:系统综述

*Rapid evaporative ionization mass spectrometry in surgery: a systematic review.*

**British Journal of Surgery** · 2025-11-06 · 系统综述 · [PMID 41218978](https://pubmed.ncbi.nlm.nih.gov/41218978/) · [DOI](https://doi.org/10.1093/bjs/znaf228)

系统综述(PROSPERO CRD42024546741),检索4库、纳入26项研究,评估REIMS(iKnife)在术中实时组织识别中的应用,覆盖7国8个外科专科,23项用于识别癌组织,报告准确率/敏感度/特异度等定性定量结局,但多为离体数据、在体证据有限。REIMS依赖谱型模式识别(ML)进行组织分类,但本综述聚焦质谱技术本身、AI成分为隐含背景,故边缘相关。

> **要点**：REIMS实时术中组织识别前景可期,但多为离体、需更多在体大样本验证


### 200. 评'深度学习助力预后生物标志物及其配体发现以改善肝癌治疗'(致编辑信)

*Letter to editor on "Deep learning facilitated discovery of prognosis biomarkers and their ligands to improve liver cancer treatment".*

**International Journal of Surgery** · 2025-11-05 · 评论/致编辑信(无数据) · [PMID 41190371](https://pubmed.ncbi.nlm.nih.gov/41190371/) · [DOI](https://doi.org/10.1097/JS9.0000000000003656)

致编辑信(无摘要数据)，评论一项利用深度学习发现肝癌预后生物标志物及其配体的研究。属深度学习驱动的生物标志物/药物靶点发现，外科成分较弱，列为边缘相关。

> **要点**：DL用于肝癌预后标志物与配体发现，外科关联弱，边缘收录。


### 201. 鉴定RCN3阳性癌相关成纤维细胞为结直肠癌新驱动因素：基于TGF-β通路的风险特征

*Identification of RCN3-positive cancer-associated fibroblasts as novel drivers of colorectal cancer through a TGF-β pathway-based risk signature.*

**International Journal of Surgery** · 2025-11-04 · 多组学整合＋机器学习生物标志物研究(含体内外验证) · [PMID 41186513](https://pubmed.ncbi.nlm.nih.gov/41186513/) · [DOI](https://doi.org/10.1097/JS9.0000000000003825)

整合3000例结直肠癌的bulk、单细胞、空间转录组及蛋白组，用机器学习构建12基因TGF-β相关风险特征(TGFRS)并以SHAP解释。TGFRS在预后与免疫治疗反应预测上优于139个已发表特征且多因素显著；RCN3权重最大且局限于癌相关成纤维细胞(CAF)，RCN3⁺CAF经RELB形成TGF-β正反馈并促进EMT/M2极化，dasatinib敏感性最高。属外科肿瘤的组学＋ML预后标志物研究，外科动作弱，列为边缘相关。

> **要点**：ML构建的TGFRS及RCN3⁺CAF为CRC预后/免疫治疗标志与潜在靶点；外科成分弱。


### 202. 临床可穿戴深度学习院内持续恶化预测模型的开发与验证

*Development and validation of a clinical wearable deep learning based continuous inhospital deterioration prediction model.*

**Nature Communications** · 2025-11-03 · 开发与验证研究 · [PMID 41184270](https://pubmed.ncbi.nlm.nih.gov/41184270/) · [DOI](https://doi.org/10.1038/s41467-025-65219-8)

基于888例非ICU内科-外科病房住院(含135例结局)的两款临床级可穿戴设备数据,训练循环神经网络(RNN)预测未来24小时临床警报与不良结局:警报预测ROC曲线下面积0.89±0.3、PR曲线0.58±0.14,不良结局准确率81.8%(11例事件),最长可提前17小时,并可跨不同可穿戴设备迁移。属通用病房恶化预警、非手术特异,归边缘相关。

> **要点**：可穿戴RNN持续预测住院恶化(提前17h、AUROC 0.89),内外科病房场景(边缘相关)


### 203. 电生理特征预测脑深部电刺激电极触点的治疗窗

*Electrophysiological signatures predict the therapeutic window of deep brain stimulation electrode contacts.*

**npj Digital Medicine** · 2025-10-29 · 机器学习建模(电生理) · [PMID 41162751](https://pubmed.ncbi.nlm.nih.gov/41162751/) · [DOI](https://doi.org/10.1038/s41746-025-02089-w)

对帕金森病脑深部电刺激(DBS)患者，用树学习结合静息态脑磁图与丘脑底核(STN)局部场电位预测各触点治疗窗。模型在原始队列(r=0.45，p<0.001，N=45)与独立队列(r=0.30，p<0.001，N=8)成功预测，主要依赖>35Hz快速STN活动与STN-皮层相干，并能排序触点以更快找到最优触点。

> **要点**：电生理+ML辅助DBS触点选择(属术后程控优化，边缘相关)。


### 204. 掌握机器人肝切除：当可及性决定成败——法国FRIES-ACHBPT-2024队列

*Mastering Robotic Liver Resection: When Access Defines Success - Insights from the French FRIES-ACHBPT-2024 Cohort.*

**Annals of Surgery** · 2025-10-29 · 回顾性多中心队列(学习曲线CUSUM) · [PMID 41159659](https://pubmed.ncbi.nlm.nih.gov/41159659/) · [DOI](https://doi.org/10.1097/SLA.0000000000006968)

回顾性多中心纳入法国10家肝胆中心2010-2024年650例机器人肝切除(RLR)，用累积和(CUSUM)分析学习曲线。转化率10.8%，出血随IMM分级升高(184/381/753mL)，转化与出血学习曲线拐点分别在41与58例；高频接触(每周≥1次)者更早达熟练(35对47例)。机器人为遥操作、无AI自主成分。

> **要点**：外周相关：遥操作机器人肝切除学习曲线，无AI自主成分。


### 205. 深度学习增强的MRI影像组学预测头颈鳞癌对新辅助化学免疫治疗的病理反应：回顾性分析

*Deep learning enhanced MRI radiomics in predicting pathological response of head and neck squamous carcinoma to neoadjuvant chemoimmunotherapy: a retrospective analysis.*

**International Journal of Surgery** · 2025-10-28 · 回顾性影像组学＋深度学习预测研究 · [PMID 41147765](https://pubmed.ncbi.nlm.nih.gov/41147765/) · [DOI](https://doi.org/10.1097/JS9.0000000000003710)

回顾纳入接受2-3周期化疗联合PD-1抑制剂新辅助(NACI)后行根治手术的头颈鳞癌(HNSCC)患者，联合传统影像组学与深度学习从MRI提取特征(7个特征中3个为DL特征)，经Spearman与LASSO筛选后用logistic回归预测病理完全缓解。整合DL＋影像组学＋临床特征使训练/测试/外部验证AUC达0.781、0.759、0.740。预测的是新辅助治疗反应(术前，服务外科时机)，属非手术动作的影像AI，列为边缘相关。

> **要点**：DL增强MRI影像组学预测HNSCC新辅助化免治疗病理反应(AUC~0.74-0.78)，间接指导外科。


### 206. 大规模定量研究人类TCR-HLA交叉反应

*Quantitative and large-scale investigation of human TCR-HLA cross-reactivity.*

**Science Advances** · 2025-10-24 · 计算免疫遗传学研究 · [PMID 41134880](https://pubmed.ncbi.nlm.nih.gov/41134880/) · [DOI](https://doi.org/10.1126/sciadv.adx1751)

构建TCR-HLA相似性网络THNet，基于>900万显著关联的HLA-TCR对刻画交叉反应，可提示不同移植情境下的最优HLA错配供体候选以支持供者选择。以TCR-HLA交叉反应生物学为核心、移植配型为应用之一，方法为相似性网络，归边缘。

> **要点**：THNet网络辅助移植HLA配型，边缘


### 207. 再神经化肌肉内植入微电极阵列分离转移多功能神经的神经驱动

*Implanted microelectrode arrays in reinnervated muscles allow separation of neural drives from transferred polyfunctional nerves.*

**Nature Biomedical Engineering** · 2025-10-24 · 神经界面+上肢截肢者验证 · [PMID 41136604](https://pubmed.ncbi.nlm.nih.gov/41136604/) · [DOI](https://doi.org/10.1038/s41551-025-01537-y)

边缘相关：结合定向肌肉再神经化(TMR)手术与单点植入高密度微电极阵列，用数学源分离将重定向入单块肌肉的神经信号解卷积为运动单位放电序列。在上肢截肢者中从4块再神经化肌肉提取多路神经指令，无需外科分割神经。外科成分强但计算为经典源分离而非ML/DL。

> **要点**：TMR手术+源分离解码多路神经指令，计算方法非深度学习


### 208. 基于多参数MRI与肿瘤内异质性生境影像术前预测胶质瘤Ki-67表达及风险分层：多中心研究

*Preoperative prediction of Ki-67 expression and risk stratification in gliomas using multiparametric MRI and intratumor heterogeneity-based habitat imaging: a multicenter study.*

**International Journal of Surgery** · 2025-10-22 · 多中心影像组学研究 · [PMID 41133387](https://pubmed.ncbi.nlm.nih.gov/41133387/) · [DOI](https://doi.org/10.1097/JS9.0000000000003766)

多中心研究（205例胶质瘤），用K-means将肿瘤分为三个生境，弹性网/logistic模型术前无创预测Ki-67增殖指数，训练/交叉验证/两测试集AUC 0.924/0.875/0.881/0.869；高危组PFS（中位6.3 vs 52.4月）与OS（13.2 vs 76.4月）显著更差（HR≈4.3–4.5，P<0.001）。属术前诊断影像组学，无明确外科动作。

> **要点**：MRI生境影像组学术前预测胶质瘤Ki-67与预后（外科邻接）。


### 209. 大语言模型ChatGPT在医学中的现状关切与未来方向：机器学习驱动的全球尺度文献计量分析

*Current concerns and future directions of large language model ChatGPT in medicine: a machine-learning-driven global-scale bibliometric analysis.*

**International Journal of Surgery** · 2025-10-22 · 文献计量分析＋机器学习(聚类) · [PMID 41133425](https://pubmed.ncbi.nlm.nih.gov/41133425/) · [DOI](https://doi.org/10.1097/JS9.0000000000003668)

机器学习驱动的文献计量分析，揭示ChatGPT在医学各学科与地区的发展格局(月增长率26.97%，国际合著25.09%)。外科(OR 0.761,95%CI 0.608-0.954,P=0.018)等学科相对欠发展；无监督层次聚类将关切分为6簇，Walktrap算法显示医学教育与临床决策支持高相关但欠发展。为LLM在整个医学领域的文献计量研究，外科仅为其中一学科，列为边缘相关。

> **要点**：LLM医学应用文献计量显示外科等领域待发展；外科为子主题，边缘收录。


### 210. 简化机器学习模型早期预测烧伤患者脓毒症风险

*Streamlined machine learning model for early sepsis risk prediction in burn patients.*

**npj Digital Medicine** · 2025-10-21 · 多中心回顾性ML建模 · [PMID 41120704](https://pubmed.ncbi.nlm.nih.gov/41120704/) · [DOI](https://doi.org/10.1038/s41746-025-02078-z)

基于德国烧伤登记11中心6629例开发简化ML模型，仅用6个入院变量(年龄、烧伤面积、深/全层烧伤、吸入性损伤、高血压)。随机森林AUROC 0.91、敏感度0.81、特异度0.85、阴性预测值0.98，可在ICU入院即刻风险分层。烧伤为外科专科但本研究外科成分弱(脓毒症预测)，边缘相关。

> **要点**：入院变量早期预测烧伤脓毒症，外科成分弱，边缘相关。


### 211. 对“基于CT瘤内与瘤周异质性预测食管鳞癌新辅助化免后病理反应”的读者来信

*Letter to the Editor - intratumoral and peritumoral heterogeneity based on CT to predict the pathological response after neoadjuvant chemoimmunotherapy in esophageal squamous cell carcinoma.*

**International Journal of Surgery** · 2025-10-21 · 读者来信（无数据） · [PMID 41133394](https://pubmed.ncbi.nlm.nih.gov/41133394/) · [DOI](https://doi.org/10.1097/JS9.0000000000003660)

读者来信（Letter），无原始数据，讨论一项利用CT瘤内/瘤周异质性（影像组学）预测食管鳞癌新辅助化学免疫治疗后病理反应的研究。食管鳞癌为外科疾病，但模型聚焦新辅助治疗反应预测，属影像组学边缘话题。

> **要点**：食管鳞癌CT影像组学预测新辅助反应的来信讨论。


### 212. 评'整合临床-病理-MRI特征构建新辅助治疗后腋窝淋巴结病理完全缓解预测模型'(致编辑信)

*Letter to the Editor about "Integrating clinical-pathological-MRI features to construct a prediction model for pathological complete remission of axillary lymph nodes after neoadjuvant therapy: a retrospective study".*

**International Journal of Surgery** · 2025-10-17 · 评论/致编辑信(无数据) · [PMID 41133424](https://pubmed.ncbi.nlm.nih.gov/41133424/) · [DOI](https://doi.org/10.1097/JS9.0000000000003661)

致编辑信(无摘要数据)，评论一项整合临床-病理-MRI特征预测(乳腺癌)新辅助治疗后腋窝淋巴结病理完全缓解(pCR)的研究。预测的是新辅助治疗反应，间接关系腋窝手术决策，外科动作非直接，列为边缘相关。

> **要点**：评论腋窝淋巴结pCR预测模型；新辅助反应预测，间接关联外科，边缘收录。


### 213. 基于深度学习的多模态乳腺癌HER2状态评估用于预测新辅助治疗反应

*Deep-learning-based HER2 status assessment from multimodal breast cancer data predicts neoadjuvant therapy response.*

**Nature Biomedical Engineering** · 2025-10-17 · 多中心回顾性诊断建模（4中心/6,991例） · [PMID 41107520](https://pubmed.ncbi.nlm.nih.gov/41107520/) · [DOI](https://doi.org/10.1038/s41551-025-01495-5)

边缘相关：提出深度学习HER2多模态对齐预测(MAP)模型，利用治疗前多模态乳腺影像评估HER2状态并预测新辅助治疗反应。采用4中心6,991例、14,472张图像的大规模数据集，效果优于穿刺活检；属服务新辅助化疗决策的诊断影像AI，外科动作不明确。

> **要点**：多模态影像预测HER2与新辅助治疗反应，外科成分弱


### 214. 非ST段抬高型急性冠脉综合征GRACE评分的扩展:十国开发与验证研究

*Extension of the GRACE score for non-ST-elevation acute coronary syndrome: a development and validation study in ten countries.*

**The Lancet Digital Health** · 2025-10-16 · 多国开发与验证研究 · [PMID 41107201](https://pubmed.ncbi.nlm.nih.gov/41107201/) · [DOI](https://doi.org/10.1016/j.landig.2025.100907)

边缘相关。十国609,063例NSTE-ACS的机器学习预后模型,院内死亡AUC 0.90、1年死亡时间依赖AUC 0.84,并建立预测早期有创处理(冠脉造影/血运重建)个体化获益的模型:高获益者接受早期有创处理时复合结局风险降低(HR 0.60,95%CI 0.41-0.88,pinteraction=0.014)。以心脏死亡风险评分为主、涉及冠脉介入决策,外科/介入非核心,列为边缘。

> **要点**：GRACE 3.0 ML模型判别优异并识别早期有创处理获益者,但以死亡风险评分为主,介入为辅,边缘相关。


### 215. 整合机器学习与空间-细胞分析的多组学流程鉴定SASH1为头颈鳞癌预后标志与治疗靶点

*A multi-omics pipeline integrating machine learning and spatial-cellular analysis identifies SASH1 as a prognostic biomarker and therapeutic target in head and neck squamous cell carcinoma.*

**International Journal of Surgery** · 2025-10-16 · 多组学整合＋机器学习生物标志物研究 · [PMID 41099090](https://pubmed.ncbi.nlm.nih.gov/41099090/) · [DOI](https://doi.org/10.1097/JS9.0000000000003647)

整合多套GEO与TCGA-HNSC数据，用LASSO、SVM-RFE、XGBoost、Boruta四种ML从159个共识差异基因中筛出COL1A1、EMP1、MYH11、SASH1四个核心基因，经单细胞/空间转录组与Western blot验证。SASH1在恶性细胞特异性下调、与COL1A1高表达纤维基质区空间互斥，低表达与更差总生存显著相关(P<0.05)，并与ATR/Aurora激酶抑制剂敏感性相关。属外科肿瘤(HNSCC)的组学＋ML预后标志物研究，外科动作弱，列为边缘相关。

> **要点**：ML多组学流程鉴定SASH1为HNSCC预后标志与潜在靶点；外科成分弱，边缘收录。


### 216. 就「预测早期口腔舌鳞癌隐匿淋巴结转移的可解释机器学习模型」致编辑的信

*Letter to the Editor regarding the article 'Development and validation of an explainable machine learning model for predicting occult lymph node metastasis in early-stage oral tongue squamous cell carcinoma: A multi-center study'.*

**International Journal of Surgery** · 2025-10-15 · 评论/来信 · [PMID 41731886](https://pubmed.ncbi.nlm.nih.gov/41731886/) · [DOI](https://doi.org/10.1097/JS9.0000000000003618)

读者来信(无摘要正文),针对一项预测早期口腔舌鳞癌隐匿淋巴结转移的可解释ML多中心研究。涉及外科AI(淋巴结转移预测服务颈清扫决策)的学术讨论,本身无原始数据。

> **要点**：针对口腔癌淋巴结转移ML预测研究的来信,无独立数据


### 217. 证据深度学习从H&E病理图像筛查ALK表达

*Evidential deep learning-based ALK-expression screening using H&E-stained histopathological images.*

**npj Digital Medicine** · 2025-10-14 · 回顾性深度学习开发 · [PMID 41087669](https://pubmed.ncbi.nlm.nih.gov/41087669/) · [DOI](https://doi.org/10.1038/s41746-025-01981-9)

开发可病理解释的证据式深度学习算法，从H&E染色病理图像筛查非小细胞肺癌ALK重排以指导靶向治疗。在切除与活检数据集上准确率均超95%，可减少不必要检测费用。属分子分型诊断病理AI(服务靶向治疗而非明确外科动作)，边缘相关。

> **要点**：H&E预测ALK重排服务靶向治疗，边缘相关。


### 218. 对“无创影像评估肿瘤浸润淋巴细胞与膀胱癌生存及BCG免疫治疗反应”的评论

*Comment on "Correlation of noninvasive imaging of tumour-infiltrating lymphocytes with survival and BCG immunotherapy response in patients with bladder cancer: a multicentre cohort study".*

**International Journal of Surgery** · 2025-10-14 · 评论/通讯（无数据） · [PMID 41159414](https://pubmed.ncbi.nlm.nih.gov/41159414/) · [DOI](https://doi.org/10.1097/JS9.0000000000003680)

评论（Comment），无原始数据，针对一项以无创影像（影像组学）评估膀胱癌肿瘤浸润淋巴细胞（TIL）、并关联生存与BCG免疫治疗反应的多中心队列研究。属诊断性影像AI+免疫治疗反应，无明确外科动作。

> **要点**：膀胱癌TIL影像评估与BCG反应的评论，属影像AI边缘话题。


### 219. 基于影像组学的子宫内膜癌孕激素抵抗预后模型：细胞外基质与III型胶原的启示

*Radiomics-based prognostic model for progesterone resistance in endometrial cancer: insights into extracellular matrix and type III collagen.*

**International Journal of Surgery** · 2025-10-13 · 回顾性影像组学预测研究＋实验验证 · [PMID 41091954](https://pubmed.ncbi.nlm.nih.gov/41091954/) · [DOI](https://doi.org/10.1097/JS9.0000000000003629)

构建影像组学模型预测保留生育功能子宫内膜癌患者的孕激素抵抗，训练集AUC 0.841，验证集与全队列AUC分别0.873、0.852；预测抵抗(PR)亚组与更高III型胶原含量、ECM硬度及细胞硬度相关，补充COL III可提高对孕激素的敏感性。系保留生育功能的非手术(孕激素)治疗语境影像AI，外科动作弱/相反，列为边缘相关。

> **要点**：影像组学预测子宫内膜癌孕激素抵抗(AUC 0.84-0.87)；非手术治疗语境，边缘收录。


### 220. 评'DeepSeek辅助LI-RADS分类:AI驱动的肝细胞癌诊断精准化'(评论)

*Comment on "DeepSeek-assisted LI-RADS classification: AI-driven precision in hepatocellular carcinoma diagnosis.*

**International Journal of Surgery** · 2025-10-06 · 评论(无数据) · [PMID 41056037](https://pubmed.ncbi.nlm.nih.gov/41056037/) · [DOI](https://doi.org/10.1097/JS9.0000000000003579)

评论文章(无摘要数据)，讨论用大语言模型DeepSeek辅助LI-RADS影像分类以提升肝细胞癌诊断精准度。属诊断影像分类的AI/LLM应用，外科动作弱，列为边缘相关。

> **要点**：评论DeepSeek辅助LI-RADS的HCC影像诊断；诊断性AI，外科关联弱，边缘收录。


### 221. 微创植入可扩展高密度皮层微电极阵列用于多模态神经解码与刺激

*Minimally invasive implantation of scalable high-density cortical microelectrode arrays for multimodal neural decoding and stimulation.*

**Nature Biomedical Engineering** · 2025-10-02 · 器械开发+动物/尸体+5例患者术中试点 · [PMID 41039113](https://pubmed.ncbi.nlm.nih.gov/41039113/) · [DOI](https://doi.org/10.1038/s41551-025-01501-w)

边缘相关：报道1,024通道薄膜皮层微电极阵列及避开开颅的微创植入（猪与尸体验证），可同电极记录与刺激，实现对体感、视觉、意向性行走活动的神经解码及亚毫米级神经调控，含5例神经外科患者术中试点。属脑机接口/神经界面器械，AI(解码)与外科(植入)耦合较松。

> **要点**：微创可扩展皮层脑机接口，AI用于神经解码而非辅助手术


### 222. 通过分布式脑记录的迁移学习实现可靠语音解码

*Transfer learning via distributed brain recordings enables reliable speech decoding.*

**Nature Communications** · 2025-10-01 · 队列神经解码建模 · [PMID 41034198](https://pubmed.ncbi.nlm.nih.gov/41034198/) · [DOI](https://doi.org/10.1038/s41467-025-63825-0)

利用微创立体脑电(sEEG)记录构建序列到序列语音脑机接口模型,可在发音前及发音中解码变长音素序列;提出跨被试迁移学习框架分离共享潜流形并保留个体化初始化,群体解码器显著优于单被试模型,在电极覆盖不足时仍鲁棒。依赖神经外科植入电极但主体为神经解码,归边缘相关。

> **要点**：迁移学习提升颅内电极语音解码鲁棒性(神经外科电极,边缘相关)


### 223. 病理基础模型作为弱监督计算病理特征提取器的基准评测

*Benchmarking foundation models as feature extractors for weakly supervised computational pathology.*

**Nature Biomedical Engineering** · 2025-10-01 · 基准评测研究（13队列/6,818例） · [PMID 41034516](https://pubmed.ncbi.nlm.nih.gov/41034516/) · [DOI](https://doi.org/10.1038/s41551-025-01516-3)

边缘相关：在13个队列、6,818例患者、9,528张肺/结直肠/胃/乳腺癌切片上基准评测19个组织病理基础模型。视觉-语言模型CONCH整体最佳、Virchow2次之；CONCH+Virchow2集成在55%任务中优于单模型，并提示数据多样性比数据量更重要。属通用病理FM评测，无明确外科决策。

> **要点**：病理基础模型横评，数据多样性优于数据量


### 224. IIIA期NSCLC新辅助化学免疫治疗后的肿瘤免疫动态与长期临床结局

*Tumor immune dynamics and long-term clinical outcome of stage IIIA NSCLC patients treated with neoadjuvant chemoimmunotherapy.*

**Nature Communications** · 2025-09-30 · II期临床试验二次分析(生物标志物) · [PMID 41027867](https://pubmed.ncbi.nlm.nih.gov/41027867/) · [DOI](https://doi.org/10.1038/s41467-025-63696-5)

SAKK 16/14 II期多中心试验二次分析，可切除IIIA期NSCLC围手术期新辅助化疗+anti-PD-L1；中位随访5.4年,中位无事件生存(EFS)4.0年,中位总生存未达到。借助计算机辅助空间图像分析发现瘤内CD8+T细胞定位重要、治疗前活检中更大三级淋巴结构与更优EFS相关,瘤内TCR多样性与应答相关。AI成分(空间图像分析)较弱,外科/围手术期背景强,列为边缘相关。

> **要点**：围手术期免疫治疗试验,仅辅以计算机图像分析,AI成分弱。


### 225. 面向医疗的AI智能体基础架构(综述)

*A foundational architecture for AI agents in healthcare.*

**Cell Reports Medicine** · 2025-09-26 · 叙述性综述 · [PMID 41015033](https://pubmed.ncbi.nlm.nih.gov/41015033/) · [DOI](https://doi.org/10.1016/j.xcrm.2025.102374)

综述提出医疗AI智能体的四要素框架(规划、行动、反思、记忆),讨论其在诊断、个体化治疗、指导机器人手术、实时监测等场景的应用与技术/伦理/监管挑战。属概念性综述,无量化数据;机器人手术仅为顺带提及的应用之一。

> **要点**：医疗AI智能体框架顺带涵盖机器人手术等外科应用


### 226. InfEHR:基于深度几何学习的电子病历临床表型解析

*InfEHR: Clinical phenotype resolution through deep geometric learning on electronic health records.*

**Nature Communications** · 2025-09-26 · 方法学开发+多中心回顾验证 · [PMID 41006287](https://pubmed.ncbi.nlm.nih.gov/41006287/) · [DOI](https://doi.org/10.1038/s41467-025-63366-6)

方法学研究,提出InfEHR框架将整份电子病历转为时序图并用深度几何学习,仅需少量标注即可推断临床概率;在Mount Sinai与UC Irvine数据上测试新生儿培养阴性脓毒症(患病率3%)与术后急性肾损伤(患病率21%)。术后AKI敏感度0.71 vs 医生启发式0.20、特异度0.93 vs 0.98。为泛EHR深度学习框架,外科(术后AKI)仅为验证任务之一,属边缘相关。

> **要点**：通用EHR几何深度学习框架,术后AKI预测仅为其验证任务之一。


### 227. 侵入性神经电生理与全脑连接组学用于脑植入患者神经解码

*Invasive neurophysiology and whole brain connectomics for neural decoding in patients with brain implants.*

**Nature Biomedical Engineering** · 2025-09-24 · 多队列侵入性神经解码平台（73例/123小时） · [PMID 40993190](https://pubmed.ncbi.nlm.nih.gov/40993190/) · [DOI](https://doi.org/10.1038/s41551-025-01467-9)

边缘相关：整合脑信号解码与MRI连接组学的平台，覆盖73名脑植入神经外科患者共123小时侵入记录（运动障碍/抑郁/癫痫）。连接组学指导的运动解码可跨美/欧/中队列泛化，揭示情绪解码网络，并改善癫痫响应性神经刺激的发作检测。属神经界面解码，外科为植入。

> **要点**：连接组学指导的跨队列神经解码，AI服务于神经调控解码


### 228. ChatGPT用于膝骨关节炎患者教育的初步研究：60例

*The effects of ChatGPT on patient education of knee osteoarthritis: a preliminary study of 60 cases.*

**International Journal of Surgery** · 2025-09-23 · 前瞻对照（准随机分组）研究 · [PMID 40402631](https://pubmed.ncbi.nlm.nih.gov/40402631/) · [DOI](https://doi.org/10.1097/JS9.0000000000002494)

纳入60例初诊膝骨关节炎(KOA)患者（排除既往膝手术史），分为医生教育(n=18)、自由ChatGPT教育(n=21)、结构化提纲监督ChatGPT教育(n=21)。监督组ChatGPT答案质量显著高于自由组(92.1比81.4,P=0.001)，其知识水平(95.3)与医生组(95.6)相当，而自由组更低(82.1,P<0.001)。属LLM患者教育、外科动作弱（且排除手术患者）。边缘相关。

> **要点**：结构化提纲下ChatGPT患者教育效果媲美医生；LLM教育，边缘相关。


### 229. 经数字远程医疗的计算机辅助术前规划治疗四肢关节周围骨折：多中心队列研究

*Computer-assisted preoperative planning via digital telemedicine for the treatment of periarticular fractures of the extremities: a multicenter cohort study.*

**International Journal of Surgery** · 2025-09-23 · 多中心回顾队列＋倾向性评分匹配 · [PMID 41187316](https://pubmed.ncbi.nlm.nih.gov/41187316/) · [DOI](https://doi.org/10.1097/JS9.0000000000003502)

多中心回顾队列(2010-2019)纳入11192例四肢关节周围骨折，7130例(63.7%)常规术前规划、4062例(36.3%)经远程医疗行计算机辅助术前规划。对23个基线变量倾向性评分匹配得4050对，计算机辅助规划组院内并发症显著更低[7.9%(318/4050) vs 10.9%(442/4050)，HR=0.72,95%CI 0.59-0.89,P=0.002]。系数字/计算机辅助手术规划技术，未明确采用AI/机器学习，列为边缘相关。

> **要点**：计算机辅助术前规划与更低院内并发症相关(HR 0.72)；属数字规划工具，非明确AI。


### 230. 基于多模态常规体检数据的人工智能辅助前列腺癌检测：亚洲多中心研究(勘误)

*Artificial intelligence-aided detection for prostate cancer with multimodal routine health check-up data: an asian multi-center study: erratum.*

**International Journal of Surgery** · 2025-09-23 · 勘误(无数据) · [PMID 41108059](https://pubmed.ncbi.nlm.nih.gov/41108059/) · [DOI](https://doi.org/10.1097/JS9.0000000000003516)

为一项'基于多模态常规体检数据AI辅助检测前列腺癌'亚洲多中心研究的勘误(无实质数据)。原研究属AI诊断/筛查性质(前列腺癌检测)，外科动作弱，列为边缘相关。

> **要点**：AI前列腺癌体检检测研究的勘误；诊断性AI，外科关联弱，边缘收录。


### 231. 大语言模型驱动的肺癌患者教育范式转变:多维度性能研究

*Transformation of lung cancer patient education paradigm driven by large language models: a multidimensional performance study.*

**International Journal of Surgery** · 2025-09-22 · 多维度性能评估研究(无摘要) · [PMID 40990661](https://pubmed.ncbi.nlm.nih.gov/40990661/) · [DOI](https://doi.org/10.1097/JS9.0000000000003503)

边缘相关:研究LLM用于肺癌患者教育的多维度表现(原文无摘要);涉及生成式AI,但外科手术动作不明确,故归边缘。

> **要点**：LLM在肺癌患者教育中的应用探索,外科关联较弱。


### 232. 自主神经功能对术后睡眠障碍的影响:前瞻性队列

*Autonomic function effects on postoperative sleep disorder: a prospective cohort study.*

**International Journal of Surgery** · 2025-09-16 · 前瞻性队列/预测模型 · [PMID 40956174](https://pubmed.ncbi.nlm.nih.gov/40956174/) · [DOI](https://doi.org/10.1097/JS9.0000000000002630)

边缘相关:前瞻性队列(51例胃肠癌根治术患者),用智能贴片连续监测120小时HRV;PSD组副交感张力更低、昼夜节律紊乱更久;HRV参数风险预测模型AUC 0.815、敏感度0.909、特异度0.621、约登指数0.530。为围手术期数字生物标志物+预测模型,ML框架不明确,归边缘。

> **要点**：HRV数字生物标志物可用于术后睡眠障碍早期识别,AI成分偏弱。


### 233. 利用大语言与视觉模型从大规模图文结肠镜记录中提取知识（EndoKED）

*Leveraging large language and vision models for knowledge extraction from large-scale image-text colonoscopy records.*

**Nature Biomedical Engineering** · 2025-09-16 · 数据挖掘范式+多中心（约100万图像）验证 · [PMID 40958005](https://pubmed.ncbi.nlm.nih.gov/40958005/) · [DOI](https://doi.org/10.1038/s41551-025-01500-x)

边缘相关：提出数据挖掘范式EndoKED，用大语言与视觉模型将约100万张原始结肠镜图文记录自动转化为像素级标注数据集。多中心数据上息肉检测（报告级/图像级）与像素级标注性能领先，预训练使息肉分割达SOTA，视觉骨干在光学活检上达专家水平。属诊断性内镜AI/数据挖掘，非手术辅助。

> **要点**：LLM+视觉从海量结肠镜记录蒸馏出高质量息肉检测/分割数据


### 234. 免疫治疗与外科的融合:借助大语言模型的文献计量分析

*The convergence of immunotherapy and surgery: a comprehensive bibliographic analysis leveraging large language models.*

**International Journal of Surgery** · 2025-09-12 · 文献计量学分析(LLM辅助) · [PMID 40956177](https://pubmed.ncbi.nlm.nih.gov/40956177/) · [DOI](https://doi.org/10.1097/JS9.0000000000003231)

边缘相关:对2015-2024年6973篇中筛选541篇免疫治疗+手术文献做文献计量,结合LLM文本嵌入与BERTopic主题建模、UMAP/t-SNE可视化;中美主导发文,聚为五类主题。LLM为文献分析工具,非临床外科AI应用,归边缘。

> **要点**：LLM辅助文献计量勾勒免疫治疗联合手术领域发展脉络。


### 235. 帕金森病状态依赖脑深部电刺激对运动速度的差异化调节

*Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson's disease.*

**Science Advances** · 2025-09-10 · 临床神经生理研究（n=24） · [PMID 40929271](https://pubmed.ncbi.nlm.nih.gov/40929271/) · [DOI](https://doi.org/10.1126/sciadv.adx6849)

24例帕金森病患者研究，在快/慢动作时给予STN-DBS触发，快动作时刺激更能提升后续运动速度至健康对照水平；并演示基于机器学习的脑信号解码可预测连续运动速度以支撑闭环算法。DBS为功能神经外科植入、ML解码为闭环组件，属神经调控与ML邻接，归边缘。

> **要点**：闭环DBS+ML解码，神经调控邻接，边缘


### 236. 远程机器人手术:二十年演进与新兴技术整合(综述)

*Telerobotic surgery: a comprehensive two-decade evolution and the integration of emerging technologies.*

**International Journal of Surgery** · 2025-09-10 · 叙述性综述 · [PMID 40928376](https://pubmed.ncbi.nlm.nih.gov/40928376/) · [DOI](https://doi.org/10.1097/JS9.0000000000003484)

边缘相关:综述远程机器人手术二十年发展,涵盖2001年跨大西洋胆囊切除、Hinotori平台、5G/XR/多控制台系统及6G/触觉反馈/AI辅助平台等前景。以远程操控与通信为主体,AI仅为新兴组件,归边缘。

> **要点**：远程机器人手术综述,AI自主成分尚属前瞻,主体为遥操作。


### 237. 关于“机器学习预测nmCRPC患者转移风险(肿瘤标志物预后研究)”的来信

*Letter to editor about "Development and validation of a machine learning-based risk model for metastatic disease in nmCRPC patients: a tumor marker prognostic study".*

**International Journal of Surgery** · 2025-09-10 · 读者来信(无数据) · [PMID 40928369](https://pubmed.ncbi.nlm.nih.gov/40928369/) · [DOI](https://doi.org/10.1097/JS9.0000000000003414)

边缘相关:针对一项ML预测非转移性去势抵抗性前列腺癌(nmCRPC)转移风险模型的读者来信(无摘要/无数据);为泌尿肿瘤ML预后议题,外科动作弱,归边缘。

> **要点**：就nmCRPC转移ML预测模型的评论。


### 238. 致编辑:机器学习预测nmCRPC患者转移风险的肿瘤标志物预后研究

*Letter to the editor: Development and validation of a machine learning-based risk model for metastatic disease in nmCRPC patients: a tumor marker prognostic study.*

**International Journal of Surgery** · 2025-09-10 · 读者来信(无数据) · [PMID 40928364](https://pubmed.ncbi.nlm.nih.gov/40928364/) · [DOI](https://doi.org/10.1097/JS9.0000000000003410)

边缘相关:同一议题的另一封读者来信(无摘要/无数据),评论nmCRPC转移ML预测模型;外科关联弱,归边缘。

> **要点**：就nmCRPC转移ML预测模型的又一评论。


### 239. 关于“人工智能预测重大创伤患者脓毒症:多中心验证队列”的读者来信

*Letter to editor about prediction of sepsis among patients with major trauma using artificial intelligence: a multicenter validated cohort study.*

**International Journal of Surgery** · 2025-09-09 · 读者来信(无数据) · [PMID 40932373](https://pubmed.ncbi.nlm.nih.gov/40932373/) · [DOI](https://doi.org/10.1097/JS9.0000000000003353)

边缘相关:针对一项AI预测创伤患者脓毒症研究的读者来信(无摘要/无数据);议题涉及创伤外科与AI,但脓毒症预测非直接外科动作,归边缘。

> **要点**：就创伤AI脓毒症预测模型的评论,外科关联间接。


### 240. 全端到端自动膀胱分割与形态特征风险评估预测上尿路功能障碍

*Fully end-to-end automated bladder segmentation and risk assessment based on bladder morphology features for predicting upper urinary tract dysfunction.*

**International Journal of Surgery** · 2025-09-09 · 回顾性影像AI分割+风险预测模型 · [PMID 40932342](https://pubmed.ncbi.nlm.nih.gov/40932342/) · [DOI](https://doi.org/10.1097/JS9.0000000000003431)

边缘相关:回顾性(604例神经源性膀胱)。基于36项形态特征+LASSO+SVM预测UUTD,训练AUC 0.860、测试0.830;FCN-ResNet101自动分割Dice 0.9848、mIoU 0.9705,自动与手动特征强相关(r>0.90)。为功能泌尿影像AI风险评估,无明确外科手术动作,归边缘。

> **要点**：端到端膀胱分割+形态学ML可客观评估UUTD风险(诊断性)。


### 241. 对“整合MRI生境与临床病理预测高级别浆液性卵巢癌铂敏感性”的评论

*A comment on "A multi-modal model integrating MRI habitat and clinicopathology to predict platinum sensitivity in patients with high-grade serous ovarian cancer: a diagnostic study".*

**International Journal of Surgery** · 2025-09-08 · 评论/通讯（无数据） · [PMID 40990505](https://pubmed.ncbi.nlm.nih.gov/40990505/) · [DOI](https://doi.org/10.1097/JS9.0000000000003387)

评论（Comment），无原始数据，讨论一项整合MRI生境（habitat）影像组学与临床病理的多模态模型、预测高级别浆液性卵巢癌铂类化疗敏感性的诊断研究。属影像组学预测化疗反应，无明确外科动作。

> **要点**：卵巢癌MRI生境模型预测铂敏感性的评论，属影像组学边缘话题。


### 242. 对“基于影像的替代分类用于伴微血管侵犯肝癌辅助HAIC风险分层”的评论

*Commentary on "Imaging-based surrogate classification for risk stratification of hepatocellular carcinoma with microvascular invasion to adjuvant hepatic arterial infusion chemotherapy: a multicenter retrospective study".*

**International Journal of Surgery** · 2025-09-08 · 评论/通讯（无数据） · [PMID 40919961](https://pubmed.ncbi.nlm.nih.gov/40919961/) · [DOI](https://doi.org/10.1097/JS9.0000000000003350)

评论（Commentary），无原始数据，讨论一项以影像替代分类对伴微血管侵犯（MVI）的肝细胞癌进行风险分层、指导术后辅助肝动脉灌注化疗（HAIC）的多中心回顾研究。属影像分类+辅助治疗决策，外科动作间接。

> **要点**：肝癌MVI影像分类指导辅助HAIC的评论，属影像AI边缘话题。


### 243. 将AI工具整合入动态数字健康生态以实现个体化癌症筛查

*Integrating AI tools into dynamic digital health ecosystems for personalized cancer screening.*

**International Journal of Surgery** · 2025-09-08 · 观点/评述(无摘要) · [PMID 40928743](https://pubmed.ncbi.nlm.nih.gov/40928743/) · [DOI](https://doi.org/10.1097/JS9.0000000000003404)

边缘相关:观点/短文(无摘要),探讨AI融入数字健康生态开展个体化癌症筛查;筛查处于外科肿瘤路径上游,无明确手术动作,归边缘。

> **要点**：AI个体化癌症筛查生态,外科关联为上游间接。


### 244. 人工智能用于口腔潜在恶性病变癌变风险评估:应用与挑战

*Artificial intelligence in cancer risk assessment of oral potentially malignant disorders: applications and challenges.*

**International Journal of Surgery** · 2025-09-08 · 综述/评述(无摘要) · [PMID 40928742](https://pubmed.ncbi.nlm.nih.gov/40928742/) · [DOI](https://doi.org/10.1097/JS9.0000000000003363)

边缘相关:综述/评述(无摘要),讨论AI用于OPMD癌变风险评估的应用与挑战;OPMD虽经手术管理,但本文为诊断/风险AI概览,归边缘。

> **要点**：AI用于口腔癌前病变风险评估的应用综述。


### 245. 评“DeepSeek-R1与GPT-4在复杂诊断挑战中表现相当”

*Commentary on "DeepSeek-R1 and GPT-4 are comparable in a complex diagnostic challenge: a historical control study".*

**International Journal of Surgery** · 2025-09-08 · 评论(无数据) · [PMID 40928738](https://pubmed.ncbi.nlm.nih.gov/40928738/) · [DOI](https://doi.org/10.1097/JS9.0000000000003335)

边缘相关:针对一项LLM(DeepSeek-R1、GPT-4)诊断能力对照研究的评论(无摘要/无数据);涉及LLM临床决策支持,外科语境不明确,归边缘。

> **要点**：就LLM诊断能力比较的评论,外科专属性弱。


### 246. 关于“可解释机器学习预测高级别浆液性卵巢癌无进展生存”的来信

*Letter to editor about "Utilizing explainable machine learning for progression-free survival prediction in high-grade serous ovarian cancer: insights from a prospective cohort study".*

**International Journal of Surgery** · 2025-09-08 · 读者来信(无数据) · [PMID 40928737](https://pubmed.ncbi.nlm.nih.gov/40928737/) · [DOI](https://doi.org/10.1097/JS9.0000000000003349)

边缘相关:针对一项ML预测卵巢癌PFS前瞻队列研究的读者来信(无摘要/无数据);涉及外科肿瘤ML预后,但为来信,归边缘。

> **要点**：就卵巢癌ML预后模型的评论。


### 247. 关于“预测转移性脊柱手术后手术部位感染的AI模型”临床适用性的通信

*Clinical applicability and generalizability of an AI-based model predicting surgical site infection after metastatic spine surgery: a correspondence.*

**International Journal of Surgery** · 2025-09-08 · 学术通信(无数据) · [PMID 40923252](https://pubmed.ncbi.nlm.nih.gov/40923252/) · [DOI](https://doi.org/10.1097/JS9.0000000000003445)

边缘相关:针对一项AI预测脊柱转移瘤术后手术部位感染(SSI)模型临床适用性与泛化性的学术通信(无摘要/无数据);议题为外科AI,但为评论,归边缘。

> **要点**：就脊柱手术SSI预测AI模型的适用性评论。


### 248. 评“整合临床-病理-MRI特征构建腋窝淋巴结新辅助后病理完全缓解预测模型”

*A commentary on "Integrating clinical-pathological-MRI features to construct a prediction model for pathological complete remission of axillary lymph nodes after neoadjuvant therapy: a retrospective study".*

**International Journal of Surgery** · 2025-09-05 · 评论(无数据) · [PMID 40919951](https://pubmed.ncbi.nlm.nih.gov/40919951/) · [DOI](https://doi.org/10.1097/JS9.0000000000003372)

边缘相关:针对一项预测乳腺癌腋窝淋巴结新辅助治疗后pCR预测模型的评论(无摘要/无数据);涉及外科肿瘤预测建模,为评论,归边缘。

> **要点**：就腋窝淋巴结pCR预测模型的评论。


### 249. 评张氏“人工智能重塑早期口腔癌筛查:从图像识别到风险预测”

*Commentary on "Artificial intelligence reshapes early oral cancer screening: from image recognition to risk prediction" by Zhang.*

**International Journal of Surgery** · 2025-09-05 · 评述(无数据) · [PMID 40910841](https://pubmed.ncbi.nlm.nih.gov/40910841/) · [DOI](https://doi.org/10.1097/JS9.0000000000003389)

边缘相关:针对一篇AI用于早期口腔癌筛查文章的评述(无摘要/无数据);口腔癌虽属外科肿瘤,但主题为筛查/图像识别AI,归边缘。

> **要点**：就口腔癌筛查AI的评述,外科为下游间接。


### 250. 生成式AI在肺腺癌病理中的应用:方法学与解读考量

*Generative AI in lung adenocarcinoma pathology: methodological and interpretive considerations.*

**International Journal of Surgery** · 2025-09-05 · 方法学评述(无摘要) · [PMID 40910782](https://pubmed.ncbi.nlm.nih.gov/40910782/) · [DOI](https://doi.org/10.1097/JS9.0000000000003440)

边缘相关:观点/评述(无摘要),讨论生成式AI用于肺腺癌数字病理的方法学与结果解读注意事项;为病理AI方法学评述,外科动作不明确,归边缘。

> **要点**：就肺腺癌生成式AI病理的方法学考量评述。


### 251. 面向开放世界医学图像分割的通用基础模型与数据库（MedSegX）

*A generalist foundation model and database for open-world medical image segmentation.*

**Nature Biomedical Engineering** · 2025-09-05 · 数据库构建+通用分割基础模型开发 · [PMID 40913057](https://pubmed.ncbi.nlm.nih.gov/40913057/) · [DOI](https://doi.org/10.1038/s41551-025-01497-3)

边缘相关：构建树状层次公开数据库MedSegDB（源自129个公共分割库+5个自有数据集），并提出含上下文自适应专家混合(ConMoAE)的通用分割基础模型MedSegX。分布内达SOTA，在分布外与真实临床场景下零样本/数据高效泛化优于其他基础模型。属泛医学分割FM，非外科专用。

> **要点**：通用医学分割FM，泛医学而非外科专用


### 252. 评ChatGPT辅助全膝关节置换知情同意对焦虑的影响:有效干预还是数字安慰剂?

*A commentary on the impact of ChatGPT-assisted total knee arthroplasty consent process on anxiety: a valid intervention or digital placebo?*

**International Journal of Surgery** · 2025-09-03 · 评论(无数据) · [PMID 40899842](https://pubmed.ncbi.nlm.nih.gov/40899842/) · [DOI](https://doi.org/10.1097/JS9.0000000000003439)

边缘相关:针对一项ChatGPT辅助TKA知情同意以缓解焦虑研究的评论(无摘要/无数据);涉及LLM+外科知情沟通,为评论,归边缘。

> **要点**：就ChatGPT用于TKA知情同意的评论。


### 253. SAT：文本提示驱动的大词表3D医学图像分割

*Large-vocabulary segmentation for medical images with text prompts.*

**npj Digital Medicine** · 2025-09-02 · 大规模分割模型开发与外部验证 · [PMID 40897901](https://pubmed.ncbi.nlm.nih.gov/40897901/) · [DOI](https://doi.org/10.1038/s41746-025-01964-w)

构建含6502个解剖术语的多模态知识树，汇集72个数据集、逾2.2万个3D扫描、497类别，训练文本提示分割模型。SAT-Pro(447M参数)在497类别上与72个专用nnU-Net(合计逾22亿参数)相当，较MedSAM在全部7个身体区域平均DSC提升7.1%，2个外部数据集提升3.7%。属通用医学分割基础模型(可服务手术规划)，边缘相关。

> **要点**：文本提示通用分割基础模型，手术规划可外推，边缘相关。


### 254. 外泌体液体活检用于胃癌早期检测：DESTINEX多中心研究

*Exosomal Liquid Biopsy for the Early Detection of Gastric Cancer: The DESTINEX Multicenter Study.*

**JAMA Surgery** · 2025-09-01 · 多中心回顾性病例对照(ML辅助生物标志物) · [PMID 40737022](https://pubmed.ncbi.nlm.nih.gov/40737022/) · [DOI](https://doi.org/10.1001/jamasurg.2025.2493)

多中心、基于人群的回顾性病例对照研究，分析日韩4家中心480例患者809份标本。经机器学习算法将panel精简为17个miRNA特征(8个游离加9个外泌体)，识别胃癌训练/验证集AUC分别为96.3%(95%CI 94.3%-98.4%)与95.3%；最终10-miRNA特征(Destinex)识别早期(pT1)胃癌AUC 96.8%(95%CI 93.5%-100%)。ML主要用于生物标志物筛选，以无创早诊为主、外科动作弱，列边缘。

> **要点**：外泌体miRNA特征可无创早期检测胃癌(诊断标志物为主，列边缘)


### 255. 基于深度学习算法的男性神经源性下尿路功能障碍辅助诊断

*Research on the auxiliary diagnosis of male neurogenic lower urinary tract dysfunction based on a deep-learning algorithm.*

**International Journal of Surgery** · 2025-08-29 · 回顾性深度学习诊断模型开发与测试 · [PMID 40891911](https://pubmed.ncbi.nlm.nih.gov/40891911/) · [DOI](https://doi.org/10.1097/JS9.0000000000003268)

边缘相关:用yolov5/yolov10对视频尿动力压力-流率曲线与膀胱尿道造影图像辅助诊断男性NLUTD(训练284例、测试100例)。yolov10x定性评估膀胱出口梗阻/逼尿肌收缩力mAP 0.89,yolov5x定位评估mAP 0.83。为功能泌尿诊断AI,无外科手术动作,归边缘。

> **要点**：YOLO模型辅助诊断男性NLUTD(诊断性,外科动作弱)。


### 256. 光声-超声双模成像辅助甲状腺结节更明智的活检决策

*Smarter biopsy decisions in thyroid nodules via dual-modal photoacoustic and ultrasound imaging.*

**Science Advances** · 2025-08-27 · 前瞻性诊断研究（n=106） · [PMID 40864699](https://pubmed.ncbi.nlm.nih.gov/40864699/) · [DOI](https://doi.org/10.1126/sciadv.ady6173)

106例（29良性、45乳头状癌、32滤泡性肿瘤）光声+超声双模成像，三项PAI参数经支持向量机（SVM）构建ATAP评分，区分是否需FNAB敏感度97%、特异度38%，在29例良性中减少11例不必要活检。属诊断影像ML用于活检（诊断性操作）分诊，外科动作弱，归边缘。

> **要点**：双模成像+SVM减少不必要活检，边缘


### 257. 致编辑:机器学习预测择期内脏外科手术90天死亡率的多中心研究

*Letter to the editor: 90-day mortality prediction in elective visceral surgery using machine learning: a retrospective multicenter development, validation, and comparison study.*

**International Journal of Surgery** · 2025-08-27 · 读者来信(无数据) · [PMID 40865977](https://pubmed.ncbi.nlm.nih.gov/40865977/) · [DOI](https://doi.org/10.1097/JS9.0000000000003278)

边缘相关:针对一项ML预测择期内脏外科90天死亡多中心开发/验证/比较研究的读者来信(无摘要/无数据);议题为外科AI死亡预测,为来信,归边缘。

> **要点**：就内脏外科ML死亡预测模型的评论。


### 258. 关于「肺癌新辅助免疫化疗后主要病理缓解的多通道深度学习预测多中心诊断研究」的读者来信

*Letter to editor: Multichannel deep learning prediction of major pathological response after neoadjuvant immunochemotherapy in lung cancer: a multicenter diagnostic study.*

**International Journal of Surgery** · 2025-08-26 · 读者来信/评论（无数据） · [PMID 40865939](https://pubmed.ncbi.nlm.nih.gov/40865939/) · [DOI](https://doi.org/10.1097/JS9.0000000000003188)

读者来信，无原始数据。针对一项利用多通道深度学习预测非小细胞肺癌新辅助免疫化疗后主要病理缓解(MPR)的多中心诊断研究提出讨论。MPR评估依赖手术切除标本，模型旨在术前预测缓解以辅助外科治疗决策。

> **要点**：对肺癌新辅助DL预测MPR研究的学术通信，非原始研究。


### 259. 对“基于Gd-EOB-DTPA增强MRI分形分析预测肝癌VETC”的读者来信

*Letter to the Editor regarding "Fractal analysis based on Gd-EOB-DTPA-enhanced MRI for prediction of vessels that encapsulate tumor clusters in patients with hepatocellular carcinoma.".*

**International Journal of Surgery** · 2025-08-26 · 读者来信（无数据） · [PMID 40865962](https://pubmed.ncbi.nlm.nih.gov/40865962/) · [DOI](https://doi.org/10.1097/JS9.0000000000003282)

读者来信（Letter），无原始数据，讨论一项基于钆塞酸增强MRI分形分析（fractal analysis）预测肝细胞癌血管包绕肿瘤细胞簇（VETC）的研究。属定量影像分析预测病理特征，外科动作间接。

> **要点**：肝癌MRI分形分析预测VETC的来信，属定量影像边缘话题。


### 260. 提升胃癌多模态放射-病理组学的稳健性与临床转化

*Enhancing robustness and clinical translation of multimodal radiopathomics in gastric cancers.*

**International Journal of Surgery** · 2025-08-26 · 评述/观点（摘要缺失） · [PMID 40865945](https://pubmed.ncbi.nlm.nih.gov/40865945/) · [DOI](https://doi.org/10.1097/JS9.0000000000003262)

本文（无摘要）探讨提升胃癌多模态放射-病理组学（radiopathomics）稳健性与临床转化的问题，属放射组学+病理组学AI的评述性内容，胃癌虽为外科疾病但未涉及明确外科动作。

> **要点**：胃癌放射-病理组学稳健性评述，属影像/病理AI边缘话题。


### 261. 评“人工神经网络模型提升非肠型早期胃癌淋巴结转移高危人群临床评估准确性”

*Comment on "Artificial neural network model enhancing the accuracy of clinical evaluation for high-risk population of lymph node metastasis in non-intestinal type early gastric cancer: a multicenter real-world study in China".*

**International Journal of Surgery** · 2025-08-26 · 评论(无数据) · [PMID 40865952](https://pubmed.ncbi.nlm.nih.gov/40865952/) · [DOI](https://doi.org/10.1097/JS9.0000000000003238)

边缘相关:针对一项ANN模型预测非肠型早期胃癌淋巴结转移多中心真实世界研究的评论(无摘要/无数据);涉及胃癌外科ANN预测,为评论,归边缘。

> **要点**：就早期胃癌淋巴结转移ANN模型的评论。


### 262. 关于「人工智能直接从乳腺癌组织学预测多类分子特征与亚型多中心回顾性研究」的读者来信

*Letter to the Editor about Artificial intelligence predicts multiclass molecular signatures and subtypes directly from breast cancer histology: a multicenter retrospective study.*

**International Journal of Surgery** · 2025-08-25 · 读者来信/评论（无数据） · [PMID 40853118](https://pubmed.ncbi.nlm.nih.gov/40853118/) · [DOI](https://doi.org/10.1097/JS9.0000000000003303)

读者来信，无原始数据。针对一项利用AI从乳腺癌组织病理直接预测多类分子标签与分子亚型的多中心回顾性研究进行评论。属数字病理/病理组学范畴，外科动作不明确。

> **要点**：对乳腺癌病理组学分子分型AI研究的学术通信。


### 263. 面向专家级自主颈动脉超声的大规模学习型机器人系统

*Towards expert-level autonomous carotid ultrasonography with large-scale learning-based robotic system*

**Nature Communications** · 2025-08-23 · 机器人系统开发与临床验证 · [DOI](https://doi.org/10.1038/s41467-025-62865-w)

提出UltraBot全学习型自主颈动脉超声机器人，含统一模仿学习框架、24.7万样本大规模专家示范数据集、全解剖覆盖扫查协议与临床验证。成功率超过90%，达专家级精度，跨未见人群可重复性最高提升5.5倍。属具身AI自主医疗机器人，但为诊断超声而非手术，边缘相关。

> **要点**：学习型自主颈动脉超声机器人成功率>90%（诊断用，非手术）。


### 264. 贝叶斯重建快速扫描中红外光声信号实现快速无标记化学显微

*Bayesian reconstruction of rapidly scanned mid-infrared optoacoustic signals enables fast, label-free chemical microscopy.*

**Science Advances** · 2025-08-22 · 计算成像方法学 · [PMID 40845115](https://pubmed.ncbi.nlm.nih.gov/40845115/) · [DOI](https://doi.org/10.1126/sciadv.adu7319)

提出非数据驱动的贝叶斯光声显微重建BayROM，成像平均提速10倍，用于术中组织学快速评估（自体脂肪移植的脂肪移植物）。术中病理应用与外科邻接，但方法为贝叶斯模型重建（明确非机器学习），AI成分弱，归边缘。

> **要点**：贝叶斯重建加速术中组织学，非ML，边缘


### 265. 关于「整合瘤内瘤周影像组学与身体成分的可解释机器学习模型预测胰腺癌早期复发」的评论

*Comment on: "Interpretable machine learning model for predicting early recurrence of pancreatic cancer: integrating intratumoral and peritumoral radiomics with body composition".*

**International Journal of Surgery** · 2025-08-22 · 评论（无数据） · [PMID 40844929](https://pubmed.ncbi.nlm.nih.gov/40844929/) · [DOI](https://doi.org/10.1097/JS9.0000000000003323)

评论文章，无原始数据。针对本批次同期一项(uid 40717595)利用ML影像组学预测胰腺癌根治术后早期复发的研究提出讨论。

> **要点**：对胰腺癌术后复发ML影像组学模型的学术通信。


### 266. 关于提升乳腺癌腋窝pCR MRI预测模型真实世界适用性的评论

*Commentary: enhancing real-world applicability of MRI-based prediction models for axillary pCR in breast cancer.*

**International Journal of Surgery** · 2025-08-22 · 评论（无数据） · [PMID 40844920](https://pubmed.ncbi.nlm.nih.gov/40844920/) · [DOI](https://doi.org/10.1097/JS9.0000000000003275)

评论文章，无原始数据。讨论如何增强基于MRI预测乳腺癌新辅助后腋窝病理完全缓解(pCR)模型的真实世界适用性。腋窝pCR预测可辅助腋窝手术降级决策，本文为学术评论。

> **要点**：对乳腺癌腋窝pCR MRI预测模型临床落地的评论。


### 267. 应用威高手术机器人系统(WG-NST600S)开展胃肠外科手术：单中心前瞻性分析

*Robotic gastrointestinal surgery using the Weigao surgical robot system: a single-center prospective analysis.*

**International Journal of Surgery** · 2025-08-22 · 单中心前瞻性病例系列 · [PMID 40844905](https://pubmed.ncbi.nlm.nih.gov/40844905/) · [DOI](https://doi.org/10.1097/JS9.0000000000003224)

单中心前瞻性研究，纳入106例胃肠手术(含根治性胃切除、直肠癌根治、结肠切除等)。中位手术时间137–311分钟，出血10–25 mL，术后并发症6.25%–42.86%，全部完成无中转开腹。系国产遥操作手术机器人的临床可行性研究，无AI自主/智能成分。

> **要点**：国产威高手术机器人开展胃肠手术安全可行；属纯机械遥操作，无AI成分。


### 268. 关于「MRI影像组学预测腋窝淋巴结转移诊断准确性的系统综述与荟萃分析」的读者来信

*Letter to the Editor: A commentary on "The diagnostic accuracy of MRI radiomics in axillary lymph node metastasis prediction: a systematic review and meta-analysis".*

**International Journal of Surgery** · 2025-08-22 · 读者来信/评论（无数据） · [PMID 40844902](https://pubmed.ncbi.nlm.nih.gov/40844902/) · [DOI](https://doi.org/10.1097/JS9.0000000000003285)

读者来信，无原始数据。评论一项关于MRI影像组学预测乳腺癌腋窝淋巴结转移诊断准确性的系统综述与meta分析。属诊断影像组学范畴。

> **要点**：对腋窝淋巴结转移MRI影像组学meta分析的学术通信。


### 269. 关于「基于人工智能预测转移性脊柱疾病手术部位感染的多中心开发与验证研究」的读者来信

*Letter to editor about "Artificial intelligence-based prediction model for surgical site infection in metastatic spinal disease: a multicenter development and validation study".*

**International Journal of Surgery** · 2025-08-22 · 读者来信/评论（无数据） · [PMID 40844901](https://pubmed.ncbi.nlm.nih.gov/40844901/) · [DOI](https://doi.org/10.1097/JS9.0000000000003288)

读者来信，无原始数据。评论一项基于AI预测转移性脊柱疾病手术部位感染(SSI)的多中心开发与验证研究。

> **要点**：对脊柱手术SSI预测AI模型的学术通信。


### 270. 关于「深度学习临床-影像组学模型预测可转化肝癌ICI转化治疗应答」的来信

*Letter to editor "A deep learning-based clinical-radiomics model predicting the treatment response of immune checkpoint inhibitors (ICIs)-based conversion therapy in potentially convertible hepatocellular carcinoma patients: a tumor marker prognostic study".*

**International Journal of Surgery** · 2025-08-22 · 来信(无数据) · [PMID 41382402](https://pubmed.ncbi.nlm.nih.gov/41382402/) · [DOI](https://doi.org/10.1097/JS9.0000000000003203)

针对一篇用深度学习临床-影像组学预测肝细胞癌免疫检查点抑制剂(ICI)转化治疗应答的论文的来信,无原始数据。涉及DL影像组学预测治疗应答,虽转化治疗旨在使不可切除转为可切除,但与外科动作关联间接,边缘相关。

> **要点**：DL影像组学预测HCC转化治疗应答的来信,外科关联间接,边缘收录。


### 271. 深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后的预后评估：呼吁与商榷

*Deep learning-based radiomics and machine learning for IDH-wild-type glioblastoma after maximal safe surgical resection: a call for prognostic assessment.*

**International Journal of Surgery** · 2025-08-21 · 评论/来信（无数据） · [PMID 40844925](https://pubmed.ncbi.nlm.nih.gov/40844925/) · [DOI](https://doi.org/10.1097/JS9.0000000000003294)

评论/来信性质，无原始数据。就深度学习影像组学与ML用于IDH野生型胶质母细胞瘤最大安全手术切除后预后评估的相关研究提出呼吁与讨论。

> **要点**：对胶质母细胞瘤术后DL影像组学预后模型的学术商榷。


### 272. 预测袖状胃切除术后胃食管反流病的简易风险评分的开发与验证：多中心回顾性队列

*Development and validation of a simple risk score to predict gastroesophageal reflux disease after sleeve gastrectomy: a multicenter retrospective cohort study.*

**International Journal of Surgery** · 2025-08-20 · 多中心回顾性队列（含验证） · [PMID 40844871](https://pubmed.ncbi.nlm.nih.gov/40844871/) · [DOI](https://doi.org/10.1097/JS9.0000000000003245)

多中心回顾队列（851例），用LASSO+logistic建列线图预测腹腔镜袖状胃切除（LSG）术后GERD。术后GERD发生率27.3%，最终6变量模型训练集AUC 0.948、验证集0.912。属外科并发症的LASSO列线图预测（轻量ML）。

> **要点**：LASSO列线图预测袖状胃切除术后GERD风险（外科邻接）。


### 273. 关于「深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后预后评估多中心研究」的读者来信

*Letter to the Editor: deep learning-based radiomics and machine learning for prognostic assessment in IDH-wildtype glioblastoma after maximal safe surgical resection: a multicenter study.*

**International Journal of Surgery** · 2025-08-20 · 读者来信/评论（无数据） · [PMID 40839020](https://pubmed.ncbi.nlm.nih.gov/40839020/) · [DOI](https://doi.org/10.1097/JS9.0000000000003221)

读者来信，无原始数据。评论一项DL影像组学与ML用于IDH野生型胶质母细胞瘤最大安全手术切除后预后评估的多中心研究。

> **要点**：对胶质母细胞瘤术后DL影像组学预后模型的学术通信。


### 274. 基于非增强CT的急性主动脉综合征AI诊断

*AI-based diagnosis of acute aortic syndrome from noncontrast CT.*

**Nature Medicine** · 2025-08-20 · 多中心回顾+真实世界+前瞻研究 · [PMID 40835970](https://pubmed.ncbi.nlm.nih.gov/40835970/) · [DOI](https://doi.org/10.1038/s41591-025-03916-z)

开发AI预警系统iAorta从非增强CT识别急性主动脉综合征（AAS）。多中心回顾（n=20,750）平均AUC 0.958；大规模真实世界（n=137,525）敏感度0.913–0.942、特异度0.991–0.993；前瞻对比（n=13,846）将初诊误判患者到达正确诊断路径时间从平均219.7分缩短至61.6分。AAS常需急诊手术，但本研究为诊断影像AI、外科决策为下游，边缘相关。

> **要点**：非增强CT AI识别急性主动脉综合征（AUC 0.958），诊断为主、边缘相关。


### 275. 关于「DeepSeek-R1与GPT-4在复杂诊断挑战中表现相当的历史对照研究」的评论

*A commentary on "DeepSeek-R1 and GPT-4 are comparable in a complex diagnostic challenge: a historical control study".*

**International Journal of Surgery** · 2025-08-18 · 评论（无数据） · [PMID 40839101](https://pubmed.ncbi.nlm.nih.gov/40839101/) · [DOI](https://doi.org/10.1097/JS9.0000000000003237)

评论文章，无原始数据。评论一项比较大语言模型DeepSeek-R1与GPT-4在复杂临床诊断挑战中表现的历史对照研究。属LLM临床诊断范畴，外科关联较弱。

> **要点**：对LLM(DeepSeek-R1/GPT-4)临床诊断能力研究的学术通信。


### 276. GutGPT——用于消化道出血的生成式AI工具的可用性与采用随机试验

*Usability and adoption in a randomized trial of GutGPT a GenAI tool for gastrointestinal bleeding.*

**npj Digital Medicine** · 2025-08-18 · 基于模拟的随机对照试验 · [PMID 40825997](https://pubmed.ncbi.nlm.nih.gov/40825997/) · [DOI](https://doi.org/10.1038/s41746-025-01896-5)

基于模拟的随机试验评估生成式AI增强的临床决策支持系统GutGPT对急性上消化道出血管理的采用度，与AI仪表盘对照。106名临床学员(52 GutGPT/54对照)，主要结局为行为意向(UTAUT)。GutGPT组努力期望更高，但行为意向无显著差异；质性分析凸显信任与工作流顾虑。

> **要点**：GenAI决策支持(消化道出血、介入邻近)可用性不足以驱动采用(边缘相关)。


### 277. 每日简报：心理密码防止脑植入物读出私密想法

*Daily briefing: Mental password prevents brain implant from speaking people's private thoughts out loud.*

**Nature** · 2025-08-15 · 新闻简报（无数据） · [PMID 40858822](https://pubmed.ncbi.nlm.nih.gov/40858822/) · [DOI](https://doi.org/10.1038/d41586-025-02662-z)

边缘相关：新闻简报（无数据），报道可通过心理密码保护隐私的脑机接口(BCI)语音神经假体研究；BCI经神经外科植入、依赖AI解码神经活动，属手术+AI技术邻接的植入式神经技术。

> **要点**：带隐私保护的植入式BCI语音解码（神经外科+AI），列为边缘。


### 278. 人工智能在神经肿瘤学中的价值(综述)

*Value of artificial intelligence in neuro-oncology.*

**The Lancet Digital Health** · 2025-08-08 · 综述 · [PMID 40783350](https://pubmed.ncbi.nlm.nih.gov/40783350/) · [DOI](https://doi.org/10.1016/j.landig.2025.100876)

边缘相关。综述,讨论AI在神经肿瘤影像分析、分子基因表征、生物标志物发现、治疗靶点识别、个体化管理及神经康复中的机会与挑战(数据、转化、监管、伦理),外科仅为其中一环、非核心,列为边缘。

> **要点**：神经肿瘤学AI广谱综述,外科成分非核心,边缘相关。


### 279. 关于「机器学习可解释预测模型预测高出血风险PCI患者长期净不良临床事件」的评论

*Comments on "Development and validation of a machine learning-based explainable predictive model for long-term net adverse clinical events in patients with high bleeding risk undergoing percutaneous coronary intervention: results from a prospective cohort study".*

**International Journal of Surgery** · 2025-08-07 · 评论（无数据） · [PMID 40844281](https://pubmed.ncbi.nlm.nih.gov/40844281/) · [DOI](https://doi.org/10.1097/JS9.0000000000003137)

评论文章，无原始数据。评论一项基于ML的可解释预测模型预测高出血风险经皮冠状动脉介入(PCI)术后长期净不良临床事件的前瞻性队列研究。PCI属介入操作，本文为学术通信。

> **要点**：对PCI术后不良事件ML预测模型的学术通信。


### 280. 推进围手术期精准化：机器学习预测在产科镇痛中的实施路径（述评）

*Advancing perioperative precision: implementation pathways for machine learning predictions in obstetric analgesia.*

**International Journal of Surgery** · 2025-08-07 · 述评/观点（无数据） · [PMID 40773251](https://pubmed.ncbi.nlm.nih.gov/40773251/) · [DOI](https://doi.org/10.1097/JS9.0000000000003163)

述评/观点文章，无原始数据。探讨将机器学习预测应用于产科镇痛围手术期精准化管理的实施路径。属围手术期/麻醉镇痛范畴，直接外科动作较弱。

> **要点**：展望ML预测在产科围手术期镇痛管理中的落地路径。


### 281. 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」的评论

*Comment on "3D auto-segmentation of pancreas cancer and surrounding anatomical structures for surgical planning".*

**International Journal of Surgery** · 2025-08-07 · 评论（无数据） · [PMID 40773246](https://pubmed.ncbi.nlm.nih.gov/40773246/) · [DOI](https://doi.org/10.1097/JS9.0000000000003056)

评论文章，无原始数据。针对一项胰腺癌及周围解剖结构三维自动分割用于手术规划的研究进行讨论。底层主题为手术规划+AI自动分割，本文为学术通信。

> **要点**：对胰腺癌三维自动分割手术规划研究的学术通信。


### 282. 关于「基于人工智能预测转移性脊柱疾病手术部位感染的多中心开发与验证研究」的评论

*A commentary on "Artificial intelligence-based prediction model for surgical site infection in metastatic spinal disease: a multicenter development and validation study".*

**International Journal of Surgery** · 2025-08-06 · 评论（无数据） · [PMID 40844283](https://pubmed.ncbi.nlm.nih.gov/40844283/) · [DOI](https://doi.org/10.1097/JS9.0000000000003123)

评论文章，无原始数据。针对一项基于AI预测转移性脊柱疾病手术部位感染的多中心开发与验证研究进行讨论(与uid 40844901同一主题)。

> **要点**：对脊柱手术SSI预测AI模型的学术通信。


### 283. 关于「深度学习基于组织病理图像为平滑肌肉瘤分层分子亚型的概念验证诊断研究」的读者来信

*Letter to the Editor: deep learning algorithms from histopathological images stratify molecular subtypes for leiomyosarcoma: a proof-and-concept diagnostic study.*

**International Journal of Surgery** · 2025-08-06 · 读者来信/评论（无数据） · [PMID 40844271](https://pubmed.ncbi.nlm.nih.gov/40844271/) · [DOI](https://doi.org/10.1097/JS9.0000000000003108)

读者来信，无原始数据。评论一项利用深度学习从组织病理图像对平滑肌肉瘤进行分子亚型分层的概念验证诊断研究。属数字病理范畴。

> **要点**：对平滑肌肉瘤病理组学DL分型研究的学术通信。


### 284. 人工智能重塑早期口腔癌筛查：从图像识别到风险预测（述评）

*Artificial intelligence reshapes early oral cancer screening: from image recognition to risk prediction.*

**International Journal of Surgery** · 2025-08-06 · 述评/观点（无数据） · [PMID 40793835](https://pubmed.ncbi.nlm.nih.gov/40793835/) · [DOI](https://doi.org/10.1097/JS9.0000000000003122)

述评/观点文章，无原始数据。论述AI在早期口腔癌筛查中的作用，从图像识别延伸到风险预测。属筛查/诊断范畴，外科动作不明确。

> **要点**：展望AI在早期口腔癌筛查中的应用。


### 285. 迈向临床稳健的透明细胞肾细胞癌核分级AI：验证、影像标准化与前瞻性转化的思考（述评）

*Towards clinically robust AI for CcRCC nuclear grading perspectives on validation, imaging standardization, and prospective translation.*

**International Journal of Surgery** · 2025-08-06 · 述评/观点（无数据） · [PMID 40773257](https://pubmed.ncbi.nlm.nih.gov/40773257/) · [DOI](https://doi.org/10.1097/JS9.0000000000003183)

述评/观点文章，无原始数据。讨论AI用于透明细胞肾细胞癌(CcRCC)病理核分级的验证、成像标准化与前瞻性临床转化问题。属数字病理/诊断范畴，直接外科动作不明确。

> **要点**：探讨CcRCC核分级AI的临床稳健性与转化路径。


### 286. 技术融合：迷走神经刺激与脑机接口推进卒中后失语康复

*Converging technologies: vagus nerve stimulation and brain-computer interfaces as catalysts for advancing post-stroke aphasia rehabilitation.*

**International Journal of Surgery** · 2025-08-06 · 综述/观点（摘要缺失） · [PMID 40773224](https://pubmed.ncbi.nlm.nih.gov/40773224/) · [DOI](https://doi.org/10.1097/JS9.0000000000003148)

本文（无摘要）探讨迷走神经刺激（VNS）与脑机接口（BCI）融合以推进卒中后失语康复。BCI神经解码属AI、VNS/BCI植入涉及神经外科，但本文聚焦康复而非手术，故归边缘相关。

> **要点**：VNS+BCI卒中后失语康复的观点，AI在场但外科成分弱。


### 287. 关于「基于无监督机器学习CT影像组学亚型无创预测NSCLC免疫治疗疗效与肿瘤微环境多队列研究」的读者来信

*Letter to Editor about "Non-invasive prediction of NSCLC immunotherapy efficacy and tumor microenvironment through unsupervised machine learning-driven CT radiomic subtypes: a multi-cohort study".*

**International Journal of Surgery** · 2025-08-05 · 读者来信/评论（无数据） · [PMID 40793848](https://pubmed.ncbi.nlm.nih.gov/40793848/) · [DOI](https://doi.org/10.1097/JS9.0000000000003104)

读者来信，无原始数据。评论一项利用无监督ML驱动的CT影像组学亚型无创预测非小细胞肺癌免疫治疗疗效及肿瘤微环境的多队列研究。属诊断影像组学范畴。

> **要点**：对NSCLC免疫治疗ML影像组学预测研究的学术通信。


### 288. 多模态深度学习预测宫颈癌根治性放疗预后(多中心)

*Multimodal deep learning model for prognostic prediction in cervical cancer receiving definitive radiotherapy: a multi-center study.*

**npj Digital Medicine** · 2025-08-04 · 多中心回顾性多模态建模 · [PMID 40760164](https://pubmed.ncbi.nlm.nih.gov/40760164/) · [DOI](https://doi.org/10.1038/s41746-025-01903-9)

开发多模态预后模型CerviPro，整合治疗前后CT影像、手工影像组学特征与临床变量，预测1018例局部晚期宫颈癌根治性放疗患者的无病生存。内部验证C-index 0.81、外部0.70与0.66，多模态融合优于单一特征模型。属放疗(非手术)肿瘤影像组学预后，边缘相关。

> **要点**：放疗宫颈癌影像组学预后，非手术治疗，边缘相关。


### 289. 带密码保护的读心脑植入物

*A mind-reading brain implant that comes with password protection.*

**Nature** · 2025-08-01 · 新闻报道（无数据） · [PMID 40813479](https://pubmed.ncbi.nlm.nih.gov/40813479/) · [DOI](https://doi.org/10.1038/d41586-025-02589-5)

边缘相关：新闻报道（无数据），介绍具密码保护的植入式脑机接口(BCI)语音神经假体；涉及神经外科植入与AI神经解码，属手术+AI邻接的植入式神经技术。

> **要点**：植入式BCI语音解码神经假体的科普报道，列为边缘。


### 290. 聊天机器人健康建议研究报告规范:CHART声明

*Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement.*

**British Journal of Surgery** · 2025-08-01 · 报告规范共识声明(Delphi) · [PMID 40747825](https://pubmed.ncbi.nlm.nih.gov/40747825/) · [DOI](https://doi.org/10.1093/bjs/znaf142)

共识声明:CHART为评价生成式AI聊天机器人总结临床证据/提供健康建议研究而制定的报告规范。经系统综述后,通过531名利益相关方改良Delphi、48名专家3次会议与试点形成,含12条目、39子条目。系面向通用医疗聊天机器人的报告方法学、非外科专属,故边缘相关。

> **要点**：CHART为生成式AI健康建议研究提供透明报告标准(通用医疗,非外科专属)


### 291. 从AI驱动的分子分型迈向优化的罕见肉瘤临床试验设计：数字健康视角（述评）

*Navigating the digital health landscape from artificial intelligence-driven molecular subtyping towards optimized rare sarcoma trial design.*

**International Journal of Surgery** · 2025-07-30 · 述评/观点（无数据） · [PMID 40773275](https://pubmed.ncbi.nlm.nih.gov/40773275/) · [DOI](https://doi.org/10.1097/JS9.0000000000003040)

述评/观点文章，无原始数据。探讨AI驱动的分子分型如何优化罕见肉瘤临床试验设计的数字健康路径。属分子分型/试验设计范畴，直接外科动作不明确。

> **要点**：展望AI分子分型在罕见肉瘤试验设计中的作用。


### 292. 偏倚风险与组学机遇：重新审视用于nmCRPC转移进展的机器学习模型（述评）

*Bias risks and omics opportunities: rethinking ML models for nmCRPC metastatic progression.*

**International Journal of Surgery** · 2025-07-30 · 述评/观点（无数据） · [PMID 40773221](https://pubmed.ncbi.nlm.nih.gov/40773221/) · [DOI](https://doi.org/10.1097/JS9.0000000000003106)

述评/观点文章，无原始数据。讨论用于非转移性去势抵抗性前列腺癌(nmCRPC)转移进展预测的ML模型的偏倚风险与组学机遇。属肿瘤预后ML范畴，直接外科动作较弱。

> **要点**：反思nmCRPC转移进展ML模型的偏倚与组学改进方向。


### 293. 关于「深度学习超声影像组学模型预测淋巴结结核耐药性多中心研究」的读者来信

*Assessment of robotic versus laparoscopic gastrectomy for gastric cancer patients with intraoperative technical complexity: a multicenter retrospective study.*

**International Journal of Surgery** · 2025-07-24 · 读者来信/评论（无数据） · [PMID 40705519](https://pubmed.ncbi.nlm.nih.gov/40705519/) · [DOI](https://doi.org/10.1097/JS9.0000000000002957)

读者来信，无原始数据。评论一项DL超声影像组学模型预测淋巴结结核耐药性的多中心研究。属诊断影像组学范畴，外科动作不明确。

> **要点**：对淋巴结结核耐药性DL超声影像组学研究的学术通信。


### 294. 活体肝移植术前肝体积测量方法的比较分析（外科视角）

*Optimizing accuracy: a comparative analysis of preoperative liver volumetry in living donor liver transplantation from a surgeon's perspective - a retrospective cohort study.*

**International Journal of Surgery** · 2025-07-24 · 回顾性诊断准确性/比较研究（n=109） · [PMID 40705516](https://pubmed.ncbi.nlm.nih.gov/40705516/) · [DOI](https://doi.org/10.1097/JS9.0000000000003112)

回顾性诊断准确性研究，纳入2011–2024年109例活体肝移植（LDLT），比较自动（Philips软件）、半自动（AnyVol）与手动CT体积测量预测实际移植物重量并推导干重校正系数（自动0.89、半自动0.82、手动0.88）。校正后半自动法R²最高（0.687，SE=91.939），自动法误差比最低（-0.93%±12.98%）。涉及自动/半自动体积测量软件，外科（移植规划）语境，但AI成分有限、以方法比较为主。

> **要点**：移植术前肝体积软件测量+校正系数比较，半自动法R²最高。


### 295. 关于「深度学习用于肾创伤检测：CT图像算法性能与外部验证实验研究」的评论

*Letter to the Editor: "Development and validation of a deep learning ultrasound radiomics model for predicting drug resistance in lymph node tuberculosis a multicenter study".*

**International Journal of Surgery** · 2025-07-23 · 评论（无数据） · [PMID 40705514](https://pubmed.ncbi.nlm.nih.gov/40705514/) · [DOI](https://doi.org/10.1097/JS9.0000000000003118)

评论文章，无原始数据。评论一项DL用于肾创伤CT检测的算法性能与外部验证研究。创伤检测可辅助外科处理决策，本文为学术通信。

> **要点**：对肾创伤DL检测研究的学术通信。


### 296. 关于「深度学习用于肾创伤检测：CT图像算法性能与外部验证实验研究」的评论

*Comments on "Deep learning for kidney trauma detection: CT image algorithm performance and external validation - experimental study".*

**International Journal of Surgery** · 2025-07-23 · 评论（无数据） · [PMID 40705511](https://pubmed.ncbi.nlm.nih.gov/40705511/) · [DOI](https://doi.org/10.1097/JS9.0000000000002703)

评论文章，无原始数据。针对同一项DL用于肾创伤CT检测算法性能与外部验证的研究提出评论(与uid 40705514同一底层主题)。创伤检测可辅助外科处理决策，本文为学术通信。

> **要点**：对肾创伤DL检测研究的学术通信。


### 297. 关于「肺癌新辅助免疫化疗后主要病理缓解的多通道深度学习预测多中心诊断研究」的读者来信

*Letter to the Editor: "Multichannel deep learning prediction of major pathological response after neoadjuvant immunochemotherapy in lung cancer: a multicenter diagnostic study".*

**International Journal of Surgery** · 2025-07-23 · 读者来信/评论（无数据） · [PMID 40705510](https://pubmed.ncbi.nlm.nih.gov/40705510/) · [DOI](https://doi.org/10.1097/JS9.0000000000003109)

读者来信，无原始数据。评论一项多通道DL预测肺癌新辅助免疫化疗后主要病理缓解(MPR)的多中心诊断研究(与uid 40865939同一底层主题)。

> **要点**：对肺癌新辅助DL预测MPR研究的学术通信。


### 298. 关于「重新审视IDH野生型胶质母细胞瘤影像组学——聚焦非增强肿瘤亚区」的读者来信

*Letter to the Editor: "Revisiting radiomics in IDH-wildtype glioblastoma-a focus on non-enhancing tumor subregions".*

**International Journal of Surgery** · 2025-07-23 · 读者来信/评论（无数据） · [PMID 40705505](https://pubmed.ncbi.nlm.nih.gov/40705505/) · [DOI](https://doi.org/10.1097/JS9.0000000000003110)

读者来信，无原始数据。评论一项关于IDH野生型胶质母细胞瘤影像组学(聚焦非增强肿瘤亚区)的研究。属诊断影像组学范畴。

> **要点**：对胶质母细胞瘤影像组学亚区研究的学术通信。


### 299. 乳腺癌及多原发恶性肿瘤的分子特征：基于非标记定量蛋白质组学的最新应用

*Molecular characterization of breast cancer and multiple primary malignancies: the latest application using unmarked quantitative proteomics.*

**International Journal of Surgery** · 2025-07-18 · 多组学+影像组学相关性研究 · [PMID 40694032](https://pubmed.ncbi.nlm.nih.gov/40694032/) · [DOI](https://doi.org/10.1097/JS9.0000000000002999)

整合定量蛋白质组学与影像组学，分析单原发乳腺癌与乳腺+肺多原发肿瘤患者。识别四种分子特征（Type I–IV）与三类免疫景观（Type I–III），影像组学与分子/免疫亚型强相关，高影像信息评分者肿瘤异质性高、免疫浸润低。以蛋白组学为主、影像组学为辅相关分析，未构建明确ML模型，AI成分较弱，边缘相关。

> **要点**：蛋白组学+影像组学刻画乳腺/肺多原发肿瘤分子分型（AI成分弱）。


### 300. 对“脑机接口：解锁神经系统疾病的创新”的评论

*A commentary on "Brain-computer interfaces: the innovative to unlocking neurological conditions".*

**International Journal of Surgery** · 2025-07-18 · 评论/通讯（无数据） · [PMID 40694018](https://pubmed.ncbi.nlm.nih.gov/40694018/) · [DOI](https://doi.org/10.1097/JS9.0000000000003094)

评论（Commentary），无原始数据，讨论脑机接口（BCI）在神经系统疾病中的创新应用。BCI神经解码属AI、植入涉及神经外科，但内容聚焦神经疾病而非明确手术操作，归边缘相关。

> **要点**：BCI解锁神经疾病的评论，AI相关但外科成分弱。


### 301. 深度学习检测结直肠癌全切片图像MSI-H状态的系统综述与荟萃分析

*Systematic review and meta-analysis of deep learning for MSI-H in colorectal cancer whole slide images.*

**npj Digital Medicine** · 2025-07-18 · 系统综述与荟萃分析(诊断准确性) · [PMID 40681867](https://pubmed.ncbi.nlm.nih.gov/40681867/) · [DOI](https://doi.org/10.1038/s41746-025-01848-z)

纳入19项研究、33,383个样本，用双变量随机效应模型汇总深度学习基于全切片图像(WSI)检测结直肠癌微卫星不稳定高(MSI-H)的诊断效能。患者层面内部验证敏感度0.88、特异度0.86；外部验证敏感度升至0.93但特异度降至0.71。Meta回归显示中心、参考标准、切片(tile)大小为异质性主要来源。

> **要点**：DL检测MSI-H敏感度优异，但外部特异度下降提示过拟合，需标准化提升泛化性(数字病理分子分型,边缘相关)。


### 302. HOTSPoT：用于肝穿刺活检病理研究的开源稳健自动分割模型

*Automating liver biopsy segmentation with a robust, open-source tool for pathology research: the HOTSPoT model.*

**npj Digital Medicine** · 2025-07-18 · 多机构模型开发与验证(数字病理分割) · [PMID 40681745](https://pubmed.ncbi.nlm.nih.gov/40681745/) · [DOI](https://doi.org/10.1038/s41746-025-01870-1)

基于transformer的开源模型HOTSPoT，用于H&E染色肝活检WSI中门管区(portal tract)自动分割；多机构223例、专家标注。训练/验证Dice 0.92、测试0.91，IoU 0.84-0.86，域漂移极小；自动门管区定量与人工一致性κ达0.90，门管区面积与纤维化分期相关r=0.87(p<0.001)。以TorchScript发布并可接入QuPath。

> **要点**：开源transformer实现肝活检门管区高精度自动分割(病理研究工具,外科成分弱,边缘相关)。


### 303. 多组学揭示骨关节炎年龄特异性血液生物标志物与衰老驱动的B细胞重塑

*Multi-omic profiling reveals age-specific blood biomarkers and aging-driven B cell remodeling in osteoarthritis.*

**International Journal of Surgery** · 2025-07-17 · 多组学+机器学习诊断/机制研究 · [PMID 40696927](https://pubmed.ncbi.nlm.nih.gov/40696927/) · [DOI](https://doi.org/10.1097/JS9.0000000000003076)

整合四种关节组织转录组与机器学习，识别出MAPK1、MAP3K8、ING1、LDLR、NUP153五个外周血标志物区分OA与对照（AUC=0.966）；老年膝OA精细模型AUC 0.8（vs 年轻0.7）。对217983个关节细胞行scRNA-seq揭示年龄特异性B细胞分化。OA虽经关节置换手术治疗，但本研究为诊断标志物与机制探索，外科成分弱，边缘相关。

> **要点**：ML血液标志物诊断OA（AUC 0.966）+衰老B细胞机制，非外科动作。


### 304. 基于常规实验室检查的机器学习识别脊柱感染中的金黄色葡萄球菌脊柱炎：多中心回顾研究

*Identification of Staphylococcus aureus spondylitis in patients with spinal infections using machine learning based on routine laboratory tests: a multicenter retrospective study.*

**International Journal of Surgery** · 2025-07-17 · 多中心回顾诊断建模 · [PMID 40679999](https://pubmed.ncbi.nlm.nih.gov/40679999/) · [DOI](https://doi.org/10.1097/JS9.0000000000003035)

多中心回顾研究，用XGBoost基于常规实验室指标预测脊柱感染中的金黄色葡萄球菌病因，AUC 0.812（95%CI 0.728–0.896），SHAP显示D-二聚体、单核细胞百分比、白蛋白、ALT为关键预测因子。用于指导靶向抗感染治疗而非明确外科动作，外科成分较弱，边缘相关。

> **要点**：XGBoost从常规化验预测脊柱感染金葡菌病因（AUC 0.812）。


### 305. 3D打印患者特异性骨植入物的临床转化：共识声明

*Clinical translation of 3D-printed patient-specific bone implants: a consensus statement.*

**International Journal of Surgery** · 2025-07-17 · 共识声明 · [PMID 40697079](https://pubmed.ncbi.nlm.nih.gov/40697079/) · [DOI](https://doi.org/10.1097/JS9.0000000000002944)

共识声明。由29位多学科专家(含临床、生物材料、工程、法规、卫生经济、AI专家等)就3D打印患者特异性骨植入物形成20条关键声明，覆盖基础研究、临床前研究与临床试验/实施，呼吁统一监管路径与创新试验设计。AI仅为专家组成成员之一，非核心主题。

> **要点**：3D打印骨植入物临床转化20条共识；AI为边缘参与，属数字骨科邻接。


### 306. Apple Vision Pro（AVP）在腹腔镜胃肠外科的初步应用

*Preliminary application of Apple Vision Pro (AVP) in laparoscopic gastrointestinal surgery.*

**International Journal of Surgery** · 2025-07-17 · 病例系列/可行性研究（n=22） · [PMID 40679982](https://pubmed.ncbi.nlm.nih.gov/40679982/) · [DOI](https://doi.org/10.1097/JS9.0000000000003066)

初步应用/可行性研究，首次将Apple Vision Pro（AVP，混合现实头显）用于22例腹腔镜胃肠手术（升结肠、乙状结肠、直肠恶性肿瘤），从手术安全、信息安全、医师安全三方面评估。全部顺利完成，术中视频信号传输流畅，平均手术时间189分钟，无明显并发症，术者佩戴无不适。AVP在此作为可视化显示设备，无AI/计算引导成分。

> **要点**：AVP混合现实头显用于腹腔镜手术可行安全，属AR显示边缘话题。


### 307. 人工智能斜视筛查模型的系统综述与荟萃分析：方法学洞见与未来方向

*Systematic review and meta-analysis of artificial intelligence models for strabismus screening: methodological insights and future directions.*

**International Journal of Surgery** · 2025-07-15 · 系统综述与荟萃分析 · [PMID 40696939](https://pubmed.ncbi.nlm.nih.gov/40696939/) · [DOI](https://doi.org/10.1097/JS9.0000000000002916)

系统综述与荟萃分析，纳入24项研究、至少8484例患者、40394次眼位测量。AI模型合并敏感度0.94（95%CI 0.91–0.97）、特异度0.94（0.91–0.96）；End-to-End与Step-by-Step模型性能相当；图像优于视频（敏感度0.96 vs 0.85，P=0.04）。属眼科筛查诊断AI，斜视虽可手术矫正但本研究为筛查而非外科决策，边缘相关。

> **要点**：AI斜视筛查敏感度/特异度均约0.94（筛查向，非手术）。


### 308. 关于「基于弹性成像的AI模型可预测伴淋巴结受累乳腺癌新辅助化疗后腋窝状态」的评论

*Comment on: "Elastography-based AI model can predict axillary status after neoadjuvant chemotherapy in breast cancer with nodal involvement".*

**International Journal of Surgery** · 2025-07-15 · 评论（无数据） · [PMID 40717592](https://pubmed.ncbi.nlm.nih.gov/40717592/) · [DOI](https://doi.org/10.1097/JS9.0000000000003009)

评论文章，无原始数据。评论一项基于弹性成像的AI模型预测伴淋巴结受累乳腺癌新辅助化疗后腋窝状态的研究。腋窝状态预测可辅助腋窝手术决策，本文为学术通信。

> **要点**：对乳腺癌腋窝状态弹性成像AI预测研究的学术通信。


### 309. 人工智能在肺结节中的应用进展：演变、趋势与未来方向（文献计量学分析）

*Advance in the use of artificial intelligence of pulmonary nodule: evolution, trends, and future directions.*

**International Journal of Surgery** · 2025-07-15 · 文献计量学分析 · [PMID 40717586](https://pubmed.ncbi.nlm.nih.gov/40717586/) · [DOI](https://doi.org/10.1097/JS9.0000000000003059)

文献计量学分析，检索Web of Science 2005–2024年AI用于肺结节的研究共1657篇，呈持续上升趋势(2014年后加速)；中国、美国、印度发文量领先，上海交通大学最多产。关键词聚焦深度卷积神经网络、结节检测、假阳性抑制、癌症诊断等。属诊断AI文献计量，直接外科动作不明确。

> **要点**：文献计量呈现AI肺结节研究20年格局(1657篇)与热点演变。


### 310. 致编辑信：评一项用于肝细胞癌早期检测的多模态人工智能模型

*Letter to the editor: commentary on a multimodal artificial intelligence model for early detection of hepatocellular carcinoma.*

**International Journal of Surgery** · 2025-07-08 · 评论信（无数据） · [PMID 40696997](https://pubmed.ncbi.nlm.nih.gov/40696997/) · [DOI](https://doi.org/10.1097/JS9.0000000000002982)

致编辑评论信，针对一项用于肝细胞癌（HCC）早期检测的多模态AI模型。属诊断/筛查性影像AI，HCC虽经外科（切除/移植/消融）治疗，但该模型面向早期检出而非明确外科动作，边缘相关。信件本身无原始数据。

> **要点**：评论多模态AI早期检出HCC，诊断向、外科动作弱。


### 311. 拓展基于病理组学AI模型预测口腔白斑与头颈鳞癌9p缺失的临床应用价值

*Expanding the clinical utility of a pathomics-based AI model for predicting 9p loss in oral leukoplakia and head and neck squamous cell carcinoma.*

**International Journal of Surgery** · 2025-07-08 · 评论/观点（无数据） · [PMID 40697021](https://pubmed.ncbi.nlm.nih.gov/40697021/) · [DOI](https://doi.org/10.1097/JS9.0000000000002956)

评论/观点性质，无原始数据。讨论如何拓展基于病理组学的AI模型预测口腔白斑与头颈鳞状细胞癌(HNSCC)9p染色体缺失的临床应用价值。属数字病理/分子预测范畴，直接外科动作不明确。

> **要点**：对口腔白斑/HNSCC 9p缺失病理组学AI模型临床应用的讨论。


### 312. 对“视网膜眼组学与主动脉瘤及主动脉不良事件发生风险（人群队列）”的读者来信

*Letter to the Editor: "Retinal oculomics and risk of incident aortic aneurysm and aortic adverse events: a population-based cohort study".*

**International Journal of Surgery** · 2025-07-08 · 读者来信（无数据） · [PMID 40674250](https://pubmed.ncbi.nlm.nih.gov/40674250/) · [DOI](https://doi.org/10.1097/JS9.0000000000003015)

读者来信（Letter），无原始数据，讨论一项基于视网膜眼组学（oculomics，视网膜影像深度学习）预测主动脉瘤及主动脉不良事件发生风险的人群队列研究。属影像AI风险预测，无明确外科动作。

> **要点**：视网膜眼组学预测主动脉瘤风险的来信，属影像AI边缘话题。


### 313. 评论：开发并验证基于机器学习的nmCRPC转移风险模型

*A commentary on "Development and validation of a machine learning-based risk model for metastasis in patients with nmCRPC".*

**International Journal of Surgery** · 2025-07-07 · 评论/述评（无数据） · [PMID 40638356](https://pubmed.ncbi.nlm.nih.gov/40638356/) · [DOI](https://doi.org/10.1097/JS9.0000000000002966)

评论文章，针对一项基于机器学习预测非转移性去势抵抗性前列腺癌（nmCRPC）转移风险的模型。nmCRPC以系统治疗为主，转移风险建模服务于内科治疗决策，外科动作弱，边缘相关。评论本身无原始数据。

> **要点**：评论ML预测nmCRPC转移风险（内科向，外科弱）。


### 314. 机器学习预测人工耳蜗植入结局的系统综述

*A systematic review of machine learning approaches in cochlear implant outcomes.*

**npj Digital Medicine** · 2025-07-05 · 系统综述 · [PMID 40617985](https://pubmed.ncbi.nlm.nih.gov/40617985/) · [DOI](https://doi.org/10.1038/s41746-025-01733-9)

系统综述20项研究，评估机器学习预测人工耳蜗(CI)植入结局的应用。影像学模型对语言/言语感知结局预测精度较高，神经功能测量可评估听神经状态，临床/听力学预测因子经数据挖掘广泛探索；ML言语增强算法在噪声环境改善言语识别，但仍缺乏可直接整合入CI编程的模型。

> **要点**：ML在CI(手术植入)结局预测有前景，但聚焦听力/程控、外科成分弱(边缘相关)。


### 315. 机器人远端胰腺切除的中转：国际多中心研究的预测因子与结局

*Conversion of Robotic Distal Pancreatectomy: Predictors and Outcomes in an International Multicenter Study.*

**Annals of Surgery** · 2025-07-03 · 回顾性国际多中心队列(logistic回归) · [PMID 40607707](https://pubmed.ncbi.nlm.nih.gov/40607707/) · [DOI](https://doi.org/10.1097/SLA.0000000000006821)

回顾性多中心纳入16国际中心2007-2024年2452例机器人远端胰切除(RDP)，75例(3.1%)中转开腹。中转组手术更长(300对180分钟)、出血更多(500对100mL)、重大并发症(41%对25%)与90天死亡(5%对3%)更高；多变量示病灶>51mm、BMI>28、既往腹部手术、超基准、年龄>62岁为中转危险因素。机器人为遥操作、无AI。

> **要点**：外周相关：遥操作机器人胰切除中转研究，无AI自主成分。


### 316. 脑植入物解码神经活动生成富表现力语音

*Brain implant decodes neural activity to produce expressive speech.*

**Nature** · 2025-07-02 · 新闻报道（无数据） · [PMID 40603664](https://pubmed.ncbi.nlm.nih.gov/40603664/) · [DOI](https://doi.org/10.1038/d41586-025-02042-7)

边缘相关：新闻报道（无数据），介绍通过AI解码神经活动、经外科植入的脑机接口(BCI)产生富表现力语音；属手术+AI邻接的植入式神经技术。

> **要点**：外科植入BCI+AI解码生成语音的科普报道，列为边缘。


### 317. 迈向临床可用的AI：确保口腔癌筛查中的问责与公平实施

*Toward clinically actionable AI: ensuring accountability and equitable implementation in oral cancer screening.*

**International Journal of Surgery** · 2025-07-02 · 观点/述评（无数据） · [PMID 40608057](https://pubmed.ncbi.nlm.nih.gov/40608057/) · [DOI](https://doi.org/10.1097/JS9.0000000000002943)

一篇观点/述评（无摘要），呼吁在口腔癌筛查AI中确保问责制与公平可及的实施。属AI治理/伦理观点，聚焦筛查而非明确外科动作，口腔癌虽经外科治疗但外科关联偏弱，边缘相关。无原始数据。

> **要点**：述评：口腔癌筛查AI的问责与公平实施。


### 318. 人工智能工具传播结直肠癌筛查指南的对比分析：早筛教育新视角

*Comparative analysis of artificial intelligence tools for the dissemination of colorectal cancer screening guidelines: a novel perspective on early screening education.*

**International Journal of Surgery** · 2025-07-02 · 对比评估研究 · [PMID 40607944](https://pubmed.ncbi.nlm.nih.gov/40607944/) · [DOI](https://doi.org/10.1097/JS9.0000000000002951)

对比评估ChatGPT-4o、Claude 3.5、DeepSeek三款AI工具依据CSCO 2024标准向非医学人群传播结直肠癌筛查指南的准确性、清晰度与严谨性。DeepSeek区域适配与逻辑严谨性更优，ChatGPT-4o起始年龄标准过时，Claude 3.5框架全面但缺实施细节。属LLM健康教育/筛查传播，非外科动作，边缘相关。

> **要点**：对比三款LLM传播CRC筛查指南（教育向，非手术）。


### 319. 深度学习超声影像组学模型预测淋巴结结核耐药：多中心研究

*Development and validation of a deep learning ultrasound radiomics model for predicting drug resistance in lymph node tuberculosis a multicenter study.*

**International Journal of Surgery** · 2025-07-02 · 多中心影像组学建模（诊断） · [PMID 40607926](https://pubmed.ncbi.nlm.nih.gov/40607926/) · [DOI](https://doi.org/10.1097/JS9.0000000000002850)

多中心研究，纳入234例颈部淋巴结结核（LNTB）患者，从超声图像提取851个影像组学特征选161个，构建集成学习+AdaBoost模型预测耐药。AUC训练0.998、内部验证0.798、外部A 0.846、外部B 0.831。属诊断性影像组学，结核以内科抗痨为主，外科动作弱，边缘相关。

> **要点**：超声影像组学预测淋巴结结核耐药（外部AUC 0.83–0.85）。


### 320. AI通过多模态临床信息整合实现肺癌分子表型与预后预测(LUCID)

*AI-enabled molecular phenotyping and prognostic predictions in lung cancer through multimodal clinical information integration.*

**Cell Reports Medicine** · 2025-07-02 · 回顾性多模态模型开发与外部验证 · [PMID 40609537](https://pubmed.ncbi.nlm.nih.gov/40609537/) · [DOI](https://doi.org/10.1016/j.xcrm.2025.102216)

LUCID多模态框架整合肺部CT、主诉、化验与人口学数据,非侵入预测EGFR突变状态与生存。回顾队列5175例,EGFR预测AUC 0.851-0.881,生存预测AUC 0.821-0.912,外部验证稳健并对缺失模态鲁棒。为诊断/预后模型,无明确外科动作但可外推至外科决策。

> **要点**：多模态AI无创预测肺癌EGFR状态与生存(AUC最高0.912)


### 321. 全膝关节置换术患者报告结局的高维项目反应理论分析

*High-dimensional item response theory analysis of patient-reported outcomes in total knee arthroplasty.*

**npj Digital Medicine** · 2025-07-01 · 贝叶斯潜变量建模与外部验证 · [PMID 40593233](https://pubmed.ncbi.nlm.nih.gov/40593233/) · [DOI](https://doi.org/10.1038/s41746-025-01783-z)

提出贝叶斯多维分层项目反应理论(MHIRT)模型改进全膝关节置换(TKA)的患者报告结局(PRO)评估，从OKS、EQ-5D-3L等量表解构疼痛、活动、自理、信心等潜在特质。基于大型NHS数据训练并在moveUP数字平台外部验证；术后结局预测中MHIRT衍生特征持续优于单维评分与传统多维IRT。

> **要点**：多维IRT提升TKA术后PRO测量与结局预测(方法偏心理测量学，边缘相关)。


### 322. 整合血浆蛋白质组学与机器学习的前列腺癌早期风险预测：前瞻队列研究

*Prospective cohort study integrating plasma proteomics and machine learning for early risk prediction of prostate cancer.*

**International Journal of Surgery** · 2025-06-28 · 前瞻队列蛋白组学+机器学习 · [PMID 40557500](https://pubmed.ncbi.nlm.nih.gov/40557500/) · [DOI](https://doi.org/10.1097/JS9.0000000000002805)

前瞻队列，在UK Biobank 23825名无前列腺癌男性中定量1463种血浆蛋白，用Cox回归与LightGBM前向选择建模。TSPAN1与GP2为最强预测因子，联合人口学变量预测整体PCa的AUC 0.728、5年风险0.760，两蛋白高表达组HR分别1.75、1.60；TSPAN1约诊断前9年、GP2前6年开始升高。属早期风险预测/筛查，外科动作弱，边缘相关。

> **要点**：蛋白组学+LightGBM早期预测前列腺癌风险（AUC 0.728，筛查向）。


### 323. 读者来信：关于基于全切片图像的透明细胞肾细胞癌核分级AI模型多中心诊断研究

*Letter to the editor regarding “an artificial intelligence model for nuclear grading of clear cell renal cell carcinoma using whole slide images: a retrospective, multicentre, diagnostic study”*

**International Journal of Surgery** · 2025-06-27 · 来信(无数据) · [DOI](https://doi.org/10.1097/js9.0000000000002884)

读者来信(无摘要、无数据)，针对一项利用全切片图像(WSI)对透明细胞肾细胞癌(ccRCC)进行核分级的AI模型多中心诊断研究发表评论。属数字病理分级的来信，外科动作不明确，列边缘。

> **要点**：对ccRCC核分级AI模型的评论性来信(病理分级为主，列边缘)


### 324. 血浆蛋白质组学预测未来主动脉瘤与主动脉夹层风险

*Plasma proteomics profiles predict the risk of future aortic aneurysm and aortic dissection.*

**International Journal of Surgery** · 2025-06-27 · 队列蛋白组学+机器学习建模 · [PMID 40576182](https://pubmed.ncbi.nlm.nih.gov/40576182/) · [DOI](https://doi.org/10.1097/JS9.0000000000002845)

基于UK Biobank 22416名参与者、Olink检测2911种蛋白，用Cox回归与机器学习（LightGBM）筛选。识别CST3、MMP12、MEGF9、CXCL17四蛋白panel，预测AA/AD的AUC 0.725，联合人口学因素提升至0.777（DeLong P<0.001）；CST3、MMP12、CXCL17在诊断前10年即升高。AA/AD为血管外科疾病，但本研究预测未来发病（筛查/预防），外科动作弱，边缘相关。

> **要点**：蛋白组学+ML预测未来AA/AD发病（AUC 0.777，筛查向）。


### 325. 采用远程优化神经解码器的运动响应式脑深部电刺激治疗帕金森病

*Movement-responsive deep brain stimulation for Parkinson's disease using a remotely optimized neural decoder.*

**Nature Biomedical Engineering** · 2025-06-27 · 概念验证临床研究（aDBS） · [PMID 40579487](https://pubmed.ncbi.nlm.nih.gov/40579487/) · [DOI](https://doi.org/10.1038/s41551-025-01438-0)

边缘相关：报道自适应DBS算法，用脑内解码运动信号在运动时定向增大刺激以缓解运动迟缓；相较反向对照提升优势手运动速度与自报疗效，相较常规DBS提高打字速度并减少异动症，并验证可在家远程优化aDBS参数的机器学习流程。属神经调控，外科为DBS植入。

> **要点**：运动响应式自适应DBS+ML远程调参，AI服务解码而非手术


### 326. 病理学遇见人工智能：对9PLP模型用于基因组改变与预后预测的思考

*Pathology meets artificial intelligence: reflections on the 9PLP model for genomic alteration and prognosis prediction.*

**International Journal of Surgery** · 2025-06-25 · 评论/观点(无数据) · [PMID 41108058](https://pubmed.ncbi.nlm.nih.gov/41108058/) · [DOI](https://doi.org/10.1097/JS9.0000000000002876)

评论/思考文章(无摘要数据)，围绕数字病理AI模型'9PLP'预测基因组改变与预后展开反思。属数字病理AI主题，但无明确外科动作，列为边缘相关。

> **要点**：反思数字病理AI模型9PLP用于基因组与预后预测；外科动作弱，边缘收录。


### 327. 无监督机器学习驱动的CT影像组学亚型无创预测NSCLC免疫治疗疗效与肿瘤微环境：多队列研究

*Non-invasive prediction of NSCLC immunotherapy efficacy and tumor microenvironment through unsupervised machine learning-driven CT radiomic subtypes: a multi-cohort study.*

**International Journal of Surgery** · 2025-06-24 · 多队列无监督机器学习研究 · [PMID 40552903](https://pubmed.ncbi.nlm.nih.gov/40552903/) · [DOI](https://doi.org/10.1097/JS9.0000000000002839)

多队列研究，纳入七个独立队列1539例NSCLC患者，对869例的1834个影像组学特征用K-means无监督聚类分两亚型、随机森林外推。Cluster 2较Cluster 1中位OS更长（35 vs 30个月，P=0.006）、PFS更长（19 vs 16个月，P=0.020）；影像亚型为OS独立预测因子（HR 0.738，95%CI 0.583–0.935，P=0.012），scRNA-seq示Cluster 2 T/B/NK细胞更多。聚焦免疫治疗疗效（内科向），外科动作弱，边缘相关。

> **要点**：无监督影像组学亚型预测NSCLC免疫治疗疗效（HR 0.738，内科向）。


### 328. 致编辑信：评AI驱动ccRCC预后建模中统计一致性、可泛化性与特征优化的关键洞见

*Letter to the Editor: "Critical insights on statistical consistency, generalizability, and feature optimization in AI-driven CcRCC prognostic modeling".*

**International Journal of Surgery** · 2025-06-24 · 评论信（无数据） · [PMID 40552861](https://pubmed.ncbi.nlm.nih.gov/40552861/) · [DOI](https://doi.org/10.1097/JS9.0000000000002777)

致编辑信，就AI驱动透明细胞肾细胞癌（ccRCC）预后建模中的统计一致性、可泛化性与特征优化提出方法学批评。属对预后建模方法学的评述，聚焦统计严谨性、外科动作弱，边缘相关。信件本身无原始数据。

> **要点**：评论ccRCC预后AI建模的统计方法学问题。


### 329. 基于非增强CT的胃癌大规模AI筛查

*AI-based large-scale screening of gastric cancer from noncontrast CT imaging.*

**Nature Medicine** · 2025-06-24 · 多中心开发验证+真实世界筛查 · [PMID 40555751](https://pubmed.ncbi.nlm.nih.gov/40555751/) · [DOI](https://doi.org/10.1038/s41591-025-03785-6)

开发深度学习系统GRAPE从非增强CT识别胃癌。两中心开发（3,470胃癌/3,250非胃癌），内部验证AUC 0.970、16中心外部AUC 0.927；阅片研究中显著优于放射科医师（敏感度+21.8%、特异度+14.0%）；78,593例真实世界机会性筛查检出率17.7%–24.5%。胃癌虽经外科治疗，但本研究为诊断筛查影像AI、无明确外科动作，边缘相关。

> **要点**：非增强CT AI筛查胃癌（外部AUC 0.927），诊断筛查、边缘相关。


### 330. 全景光声CT结合学习分类提升乳腺病变表征

*Panoramic photoacoustic computed tomography with learning-based classification enhances breast lesion characterization.*

**Nature Biomedical Engineering** · 2025-06-24 · 前瞻性诊断影像建模（39例/78乳腺） · [PMID 40555759](https://pubmed.ncbi.nlm.nih.gov/40555759/) · [DOI](https://doi.org/10.1038/s41551-025-01435-3)

边缘相关：提出基于全景光声CT(PACT)的乳腺病变表征流程，可不受乳腺密度影响显示血管。分析39例患者78个乳腺的PACT特征，学习分类器区分正常与可疑组织最大AUC达0.89（与常规影像标准相当），并用13个特征区分良恶性、构建学习分割模型。属诊断影像AI，无明确外科动作。

> **要点**：光声CT+学习分类无创表征乳腺病变，AUC 0.89


### 331. DeepSeek本地化部署技术弥合科研与实践鸿沟的优势

*The advantage of DeepSeek in local deployment technology bridges the gap between research and practice.*

**International Journal of Surgery** · 2025-06-21 · 评论/观点 · [PMID 40540613](https://pubmed.ncbi.nlm.nih.gov/40540613/) · [DOI](https://doi.org/10.1097/JS9.0000000000002784)

无摘要的评论性短文，讨论大语言模型DeepSeek本地化部署（规避数据隐私、便于落地）在弥合科研与临床实践差距上的优势。属泛LLM技术评论，外科专属应用与数据缺失，仅因刊载于外科期刊而相关。

> **要点**：DeepSeek本地部署LLM评论，外科专属性弱，边缘相关。


### 332. 关于「影像组学与机器学习预测IDH野生型胶质母细胞瘤全切术后总生存」的评述

*Commentary on "Radiomics and machine learning model for predicting overall survival in IDH wild-type glioblastoma after gross total resection: a multicenter study".*

**International Journal of Surgery** · 2025-06-20 · 评述/来信 · [PMID 40540543](https://pubmed.ncbi.nlm.nih.gov/40540543/) · [DOI](https://doi.org/10.1097/JS9.0000000000002823)

无摘要的学术评述(commentary)，对象为一篇用影像组学+机器学习预测IDH野生型GBM大体全切术后总生存的多中心研究。主题属外科AI预后建模，但本条为简短评论、无独立数据。边缘相关。

> **要点**：外科AI预后论文的简短评述，无数据，边缘相关。


### 333. MRI瘤内与瘤周生境影像组学预测口腔鳞癌新辅助化免疗效(pCR)

*Intratumoral and peritumoral habitat radiomics of MRI predicts pathologic complete response to neoadjuvant chemoimmunotherapy in oral squamous cell carcinoma.*

**International Journal of Surgery** · 2025-06-20 · 回顾性诊断/预测建模（含5折交叉验证） · [PMID 40540293](https://pubmed.ncbi.nlm.nih.gov/40540293/) · [DOI](https://doi.org/10.1097/JS9.0000000000002715)

回顾性纳入212例接受新辅助化学免疫治疗(NACI)的口腔鳞癌(OSCC)患者，其中56例(26.4%)达病理完全缓解(pCR)。用K-means在T1WI/T2WI/T1C上聚类生境成像，构建瘤内/瘤周生境模型：瘤内AUC 0.729–0.817、瘤周AUC 0.788–0.869；融合生境+3项临床特征的决策模型训练/测试AUC达0.913/0.843。属预测化免疗效的诊断性影像组学，无直接外科动作。

> **要点**：瘤内外生境影像组学预测OSCC新辅助pCR，融合模型AUC 0.913/0.843；边缘相关。


### 334. MRI影像组学预测乳腺癌腋窝淋巴结转移的诊断准确性：系统综述与荟萃分析

*The diagnostic accuracy of MRI radiomics in axillary lymph node metastasis prediction: a systematic review and meta-analysis.*

**International Journal of Surgery** · 2025-06-20 · 系统综述与荟萃分析 · [PMID 40540292](https://pubmed.ncbi.nlm.nih.gov/40540292/) · [DOI](https://doi.org/10.1097/JS9.0000000000002588)

系统综述+荟萃分析纳入20项研究、5072例乳腺癌患者，评价MRI影像组学诊断腋窝淋巴结转移(LNM)的准确性，总AUC=0.83(95%CI 0.80–0.86)；联合临床因素较单纯影像组学特异度更高(0.83比0.79)。属诊断性影像组学（虽与腋窝手术决策相关但无直接外科动作）。

> **要点**：MRI影像组学诊断乳腺LNM的荟萃AUC 0.83；诊断性，边缘相关。


### 335. 局部进展期胃癌新辅助化疗患者改良恶病质指数的开发与验证：多中心队列

*Development and validation of a novel modified cancer cachexia index in patients with locally advanced gastric cancer undergoing neoadjuvant chemotherapy: a multicenter cohort study.*

**International Journal of Surgery** · 2025-06-20 · 多中心队列（模型开发与验证） · [PMID 40503786](https://pubmed.ncbi.nlm.nih.gov/40503786/) · [DOI](https://doi.org/10.1097/JS9.0000000000002707)

多中心纳入600例接受新辅助化疗(NACT)的局部进展期胃癌(LAGC)患者，用随机森林构建改良恶病质指数mCXI=（L3皮下脂肪面积×白蛋白）/血小板。mCXI-high组3年OS 73.0%比58.9%(P=0.002)、复发率33.0%比52.6%(P<0.001)，优于传统CXI并为独立预后因素，可指导术后辅助化疗周期。ML仅用于指数构建、外科动作较弱。

> **要点**：随机森林构建的恶病质指数mCXI预测胃癌NACT后预后，优于传统CXI；ML角色弱，边缘相关。


### 336. 全机器人受体成人活体肝移植改善近期结局：比较研究

*Improved Short-term Outcomes With Fully Robotic Recipient Adult Living Donor Liver Transplantation: A Comparative Study.*

**Annals of Surgery** · 2025-06-20 · 回顾性比较研究 · [PMID 40539273](https://pubmed.ncbi.nlm.nih.gov/40539273/) · [DOI](https://doi.org/10.1097/SLA.0000000000006807)

比较453例开放与54例全机器人成人受体活体肝移植(LDLT)。机器人组中位出血更少(650对2000mL, P<0.001)、ICU与住院更短、感染更少(9.3%对42.8%)、综合并发症指数更低(15.0对20.9, P=0.045)，受体6月生存更优(100%对91.8%, P=0.040)。机器人为遥操作、无AI。

> **要点**：外周相关：遥操作机器人活体肝移植临床比较，无AI成分。


### 337. 致编辑信：ChatGPT对膝骨关节炎患者教育的效果——60例初步研究

*Letter to the Editor: The effects of ChatGPT on patient education of knee osteoarthritis: a preliminary study of 60 cases.*

**International Journal of Surgery** · 2025-06-19 · 评论信（无数据） · [PMID 40577835](https://pubmed.ncbi.nlm.nih.gov/40577835/) · [DOI](https://doi.org/10.1097/JS9.0000000000002706)

致编辑信，评论一项关于ChatGPT用于膝骨关节炎患者教育的60例初步研究。属LLM患者教育/沟通，膝OA虽经关节置换手术治疗，但本文聚焦教育而非外科动作，边缘相关。信件本身无原始数据。

> **要点**：评论ChatGPT用于膝OA患者教育（教育向，非手术）。


### 338. 儿童烟雾病术前出血风险分层：多中心倾向性评分匹配分析

*Preoperative hemorrhagic risk stratification in pediatric moyamoya disease: a multi-institutional propensity score-matched analysis.*

**International Journal of Surgery** · 2025-06-12 · 多中心回顾性研究（PSM） · [PMID 40505056](https://pubmed.ncbi.nlm.nih.gov/40505056/) · [DOI](https://doi.org/10.1097/JS9.0000000000002677)

多中心研究（1350例，PSM后392例，外验70例），用LASSO并对比六种备选模型构建列线图预测烟雾病（MMD）患儿术前出血风险；LASSO模型AUC训练91.5%、内验78.4%、外验91.2%，纳入发病年龄、脉络膜前动脉与后交通动脉分级等。属外科疾病围手术期风险的多模型对比预测。

> **要点**：LASSO列线图预测烟雾病患儿术前出血风险（外科邻接）。


### 339. 人工智能与多模态数据整合在肾细胞癌中的潜力与局限：综述

*Artificial intelligence and multi-modal data integration in renal cell carcinoma: A review of its potential and limitations.*

**International Journal of Surgery** · 2025-06-10 · 综述 · [PMID 40497793](https://pubmed.ncbi.nlm.nih.gov/40497793/) · [DOI](https://doi.org/10.1097/JS9.0000000000002603)

无摘要的综述，讨论AI与多模态数据整合在肾细胞癌(RCC)中的应用潜力与局限。属泛肿瘤AI综述，虽RCC涉及外科但本文以AI/多模态诊断为主、无明确外科动作或数据。边缘相关。

> **要点**：RCC的AI多模态综述，外科动作不明，边缘相关。


### 340. 关于「AI增强的外科医生——在手术室整合黑箱人工智能」的评论

*Comments on "The AI-enhanced surgeon - integrating black-box artificial intelligence in the operating room".*

**International Journal of Surgery** · 2025-06-10 · 评论/来信 · [PMID 40497780](https://pubmed.ncbi.nlm.nih.gov/40497780/) · [DOI](https://doi.org/10.1097/JS9.0000000000002671)

无摘要的读者评论，评论对象为一篇讨论手术室中整合黑箱AI、AI增强外科医生的观点文。主题属外科AI治理/伦理，但本条为简短评论、无独立数据。边缘相关。

> **要点**：手术室黑箱AI观点文的简短评论，无数据，边缘相关。


### 341. 基于钆塞酸增强MRI自动全肝评分（FAWLS）定量评估肝移植物功能

*Quantitative assessment of liver graft function using functional automated whole-liver score derived from gadoxetic acid-enhanced MRI: a prospective cohort study.*

**International Journal of Surgery** · 2025-06-05 · 前瞻性队列（n=172） · [PMID 40576423](https://pubmed.ncbi.nlm.nih.gov/40576423/) · [DOI](https://doi.org/10.1097/JS9.0000000000002566)

前瞻性队列研究，2021-07至2023-09纳入172例肝移植受者行3T MRI（含T1 mapping与MRS），以ALBI评分为参照评估自动全肝功能评分（FAWLS）。FAWLS与ALBI呈负相关（r=-0.72，P<0.001），识别ALBI>-2.6的AUC为0.83，优于肝体积（0.59，P<0.0001）、ΔT1（0.76，P=0.03）与FLIS（0.65，P=0.01），并可监测治疗反应。属移植后自动影像功能评分（AI/自动成分中等、偏随访监测）。

> **要点**：自动MRI全肝评分FAWLS无创评估移植肝功能，优于肝体积/FLIS。


### 342. 大语言模型从胸部CT报告中检测多种疾病的性能分析：比较研究

*Performance analysis of large language models in multi-disease detection from chest computed tomography reports: a comparative study.*

**International Journal of Surgery** · 2025-06-05 · 回顾性比较研究 · [PMID 40497825](https://pubmed.ncbi.nlm.nih.gov/40497825/) · [DOI](https://doi.org/10.1097/JS9.0000000000002582)

回顾性评估13489份胸部CT报告（13种胸部常见病），比较Claude-3.5-Sonnet、GPT-4、GPT-3.5-Turbo、Gemini-Pro、Qwen-Max五个LLM在选择题与开放题下的表现。GPT-4选择题参考答案准确率(RAAR)最高75.1%，Qwen-Max 66.0%、Claude-3.5 63.5%，显著优于GPT-3.5-Turbo(41.8%)与Gemini-Pro(40.8%)；微调可大幅提升GPT-3.5-Turbo。属放射报告的诊断性LLM，仅在结论外推至术前规划，非直接外科语境。

> **要点**：GPT-4解读胸部CT报告准确率75.1%；诊断性LLM可外推术前规划，边缘相关。


### 343. 致编辑信：评「AI的兴起——探索其缓解围手术期焦虑的潜力」

*Letter to the Editor: "The rise of AI: exploring its potential to ease perioperative anxiety".*

**International Journal of Surgery** · 2025-06-05 · 评论/来信 · [PMID 40474816](https://pubmed.ncbi.nlm.nih.gov/40474816/) · [DOI](https://doi.org/10.1097/JS9.0000000000002561)

无摘要的致编辑来信，评论对象为一篇探讨用AI缓解围手术期患者焦虑的观点文。主题属围手术期+AI，但本条为简短来信、无独立数据，且聚焦患者焦虑这一较软话题。边缘相关。

> **要点**：围手术期AI缓解焦虑观点文的来信，无数据，边缘相关。


### 344. 基于microRNA的1型糖尿病动态风险评分

*A microRNA-based dynamic risk score for type 1 diabetes.*

**Nature Medicine** · 2025-06-05 · 多中心生物标志物开发验证 · [PMID 40473952](https://pubmed.ncbi.nlm.nih.gov/40473952/) · [DOI](https://doi.org/10.1038/s41591-025-03730-7)

用多中心多族裔队列（n=2,204）识别50个与β细胞功能丢失相关miRNA，构建四情境miRNA动态风险评分（DRS）；生成式AI增强版在独立验证集（n=662）区分T1D的AUC 0.84，并准确预测胰岛移植1小时后外源胰岛素需求，基线miRNA特征区分imatinib应答者。含移植后功能预测但外科成分弱，边缘相关。

> **要点**：miRNA动态评分预测T1D（AUC 0.84）及胰岛移植后胰岛素需求，外科成分弱。


### 345. ChatGPT在医学教育中的应用：优势与局限综述

*A review of ChatGPT in medical education: exploring advantages and limitations.*

**International Journal of Surgery** · 2025-06-04 · 综述 · [PMID 40465793](https://pubmed.ncbi.nlm.nih.gov/40465793/) · [DOI](https://doi.org/10.1097/JS9.0000000000002505)

综述ChatGPT（生成式AI）在医学教育中的应用（个性化学习、自动评分、病例与试题生成、临床实习内容、翻译、写作辅助、患者咨询等）与局限（回答不准确/过时、伦理隐私、缺参考、削弱批判性思维、数据偏倚等）。为泛医学教育LLM综述、非外科专属，无数据。边缘相关。

> **要点**：ChatGPT医学教育综述，非外科专属，边缘相关。


### 346. 数字病理多模态AI预后模型在开始长期雄激素剥夺治疗的晚期前列腺癌中的外部验证:STAMPEDE四项3期RCT事后生物标志物研究

*External validation of a digital pathology-based multimodal artificial intelligence-derived prognostic model in patients with advanced prostate cancer starting long-term androgen deprivation therapy: a post-hoc ancillary biomarker study of four phase 3 randomised controlled trials of the STAMPEDE platform protocol.*

**The Lancet Digital Health** · 2025-06-03 · 事后生物标志物验证研究(4项3期RCT) · [PMID 40467357](https://pubmed.ncbi.nlm.nih.gov/40467357/) · [DOI](https://doi.org/10.1016/j.landig.2025.100885)

边缘相关。基于STAMPEDE平台4项3期试验3167例晚期前列腺癌(开始ADT)对已锁定的ArteraAI Prostate多模态AI(MMAI,融合数字化活检病理图像+临床变量)外部验证。MMAI(每升高1个SD)与前列腺癌特异性死亡强相关(HR 1.40,95%CI 1.30-1.51,p<0.0001);最高四分位组死亡风险最高(非转移HR 2.12、转移HR 1.62)。属数字病理预后生物标志物,队列为系统治疗晚期病例、外科成分弱,列为边缘。

> **要点**：数字病理多模态AI对晚期前列腺癌死亡有独立预后价值(HR 1.40),但为系统治疗人群,外科成分弱,边缘相关。


### 347. 基于Gd-EOB-DTPA增强MRI的分形分析预测肝癌血管包绕肿瘤簇(VETC)

*Fractal analysis based on Gd-EOB-DTPA-enhanced MRI for prediction of vessels that encapsulate tumor clusters in patients with hepatocellular carcinoma.*

**International Journal of Surgery** · 2025-05-29 · 回顾性双中心诊断建模 · [PMID 40441719](https://pubmed.ncbi.nlm.nih.gov/40441719/) · [DOI](https://doi.org/10.1097/JS9.0000000000002547)

回顾性双中心505例肝癌（训练253、内部108、外部144），从肝胆期用盒计数法提取分形维数(FD)与空隙度预测VETC。VETC阳性者FD与空隙度更高(P<0.001)；FD-空隙度模型内/外部测试AUC 0.78/0.79；加入分形参数后混合模型较临床-影像模型AUC由0.72/0.65升至0.80/0.84(均P<0.05)，并可分层RFS/OS。为定量影像（分形/影像组学邻近）+逻辑回归，无深度学习框架。边缘相关。

> **要点**：MRI分形分析预测肝癌VETC，混合模型AUC达0.84；定量影像+逻辑回归，边缘相关。


### 348. 整合MRI生境与临床病理的多模态模型预测高级别浆液性卵巢癌铂敏感性：诊断研究

*A multi-modal model integrating MRI habitat and clinicopathology to predict platinum sensitivity in patients with high-grade serous ovarian cancer: a diagnostic study.*

**International Journal of Surgery** · 2025-05-20 · 回顾性多中心诊断/预测建模 · [PMID 40391993](https://pubmed.ncbi.nlm.nih.gov/40391993/) · [DOI](https://doi.org/10.1097/JS9.0000000000002524)

回顾性纳入四家医院998例高级别浆液性卵巢癌(HGSOC)。用K-means聚类多参数MRI生境构建Habitat模型，用Vision Transformer(ViT)+多示例学习在H&E全切片上构建Pathology模型，逻辑回归构建Clinic模型；基于多头注意力(MHA)融合三者(CHP)。内部/外部验证CHP的AUC 0.789/0.807，高于各单模态与集成模型，IDI为正。预测铂化疗敏感性（治疗反应），无直接外科动作。

> **要点**：MRI生境+病理+临床多模态(MHA)预测卵巢癌铂敏感性AUC 0.807；治疗反应预测，边缘相关。


### 349. 变革医疗：人工智能对诊断、药物与伦理的影响——综合综述

*Transforming healthcare: the impact of artificial intelligence on diagnostics, pharmaceuticals, and ethical considerations - a comprehensive review.*

**International Journal of Surgery** · 2025-05-20 · 综述 · [PMID 40391953](https://pubmed.ncbi.nlm.nih.gov/40391953/) · [DOI](https://doi.org/10.1097/JS9.0000000000002481)

综合综述AI在医疗中的多维影响：预测分析早期识别疾病、基因组学个体化治疗、心血管与肿瘤诊断，并提及基于达芬奇手术系统的AI手术、骨科机器人（脊柱/关节置换实时引导）等。为泛医疗AI综述，非外科专属，无数据。边缘相关。

> **要点**：泛医疗AI综述，顺带涉及外科机器人，边缘相关。


### 350. ChatGPT与DeepSeek在骨质疏松性椎体压缩骨折中的应用洞见

*Insights into ChatGPT and DeepSeek application in osteoporotic vertebral compression fractures.*

**International Journal of Surgery** · 2025-05-16 · LLM应用探讨（摘要缺失） · [PMID 40387695](https://pubmed.ncbi.nlm.nih.gov/40387695/) · [DOI](https://doi.org/10.1097/JS9.0000000000002512)

探讨ChatGPT与DeepSeek两种大语言模型在骨质疏松性椎体压缩骨折（OVCF）诊疗/咨询中的应用。OVCF常经椎体成形等微创手术处理，但本文聚焦LLM的问答能力，外科动作不明确。（仅标题、无摘要。）

> **要点**：LLM在OVCF场景的问答/科普应用，属外科邻接。


### 351. 基于平扫CT与超声双模态深度学习诊断肝包虫病：大规模多中心诊断研究

*Deep learning diagnosis of hepatic echinococcosis based on dual-modality plain CT and ultrasound images: a large-scale, multicenter, diagnostic study.*

**International Journal of Surgery** · 2025-04-11 · 多中心诊断性研究（回顾+前瞻） · [PMID 40358633](https://pubmed.ncbi.nlm.nih.gov/40358633/) · [DOI](https://doi.org/10.1097/JS9.0000000000002486)

多中心诊断研究，纳入新疆8家医院18年间8979例数据，用EfficientNet3D与EfficientNet-B0融合CT与超声影像鉴别肝包虫病、肝囊肿、肝脓肿与正常肝。前瞻性测试集融合模型准确率0.816、敏感度0.849、特异度0.942、AUC 0.963；外院7中心准确率0.849、AUC 0.961，均优于单模态及医师。属面向低资源地区的诊断筛查影像AI，外科动作不明确。

> **要点**：CT+超声双模态深度学习显著提升肝包虫病诊断准确率（外科邻接）。


### 352. 全机器人左叶供肝切除比开放更安全

*Fully Robotic Left Lobe Donor Hepatectomy Is Safer Compared to Open.*

**Annals of Surgery** · 2025-03-26 · 回顾性比较研究(最大宗左叶供肝系列) · [PMID 40135361](https://pubmed.ncbi.nlm.nih.gov/40135361/) · [DOI](https://doi.org/10.1097/SLA.0000000000006705)

回顾性分析2011-2023年单中心339例活体供肝(72开放对267机器人左叶切除)。机器人组出血显著更少(77对316mL, P<0.001)、供者并发症更低(6%对18%, P=0.003)、住院更短(3对5天)；受体总并发症率也更低(40%对59%, P=0.033)。机器人为遥操作、无AI。

> **要点**：外周相关：遥操作机器人供肝切除临床比较，无AI成分。


### 353. 基于电子病历按Clavien-Dindo自动分级手术相关不良事件的算法

*Performance of an Algorithm Grading Surgery-Related Adverse Events According to the Clavien-Dindo Classification.*

**Annals of Surgery** · 2025-01-15 · 算法开发与验证(单中心EHR) · [PMID 39811956](https://pubmed.ncbi.nlm.nih.gov/39811956/) · [DOI](https://doi.org/10.1097/SLA.0000000000006629)

开发利用Karolinska医院EHR数据自动对术后30天内不良事件按Clavien-Dindo分级的算法,在1379例结直肠手术中应用,随机399例与外科医生(金标准)比较:算法vs外科医生kappa 0.77(校正后0.89),综合并发症指数ICC 0.89。当前为规则型自动化算法(机器学习为未来方向),属外科数据科学邻接技术,故边缘相关。

> **要点**：自动化EHR算法可较可靠地按C-D分级手术并发症,ML增强为后续方向


### 354. 机器人vs腹腔镜前外侧段小范围肝切除的倾向评分匹配国际多中心研究(10,517例)

*Propensity Score-matched Analysis Comparing Robotic Versus Laparoscopic Minor Liver Resections of the Anterolateral Segments: An International Multicenter Study of 10,517 Cases.*

**Annals of Surgery** · 2024-09-05 · 国际多中心倾向评分匹配队列 · [PMID 39234677](https://pubmed.ncbi.nlm.nih.gov/39234677/) · [DOI](https://doi.org/10.1097/SLA.0000000000006523)

国际68中心倾向评分匹配研究,比较机器人(RMLR)与腹腔镜(LMLR)前外侧段小肝切除,匹配后各1401例。RMLR中位失血更少(75 vs 100 mL,P<0.001)、输血更少(3.1% vs 5.4%)、大并发症更低(2.5% vs 4.6%,P=0.004)、中转开腹更低(1.2% vs 4.5%)、住院更短(4 vs 5天),30天再入院略高(3.5% vs 2.1%)。属遥操作机器人手术、无AI自主成分,故边缘相关。

> **要点**：机器人小肝切除较腹腔镜略优但差异微小;纯机器人手术无AI成分


### 355. 用手术室黑匣子(OR Black Box)技术评估原位超时核查与复盘模拟培训的质量改进结局

*Using OR Black Box Technology to Determine Quality Improvement Outcomes for In-situ Timeout and Debrief Simulation.*

**Annals of Surgery** · 2024-07-11 · 前瞻性多方法质量改进研究 · [PMID 38989569](https://pubmed.ncbi.nlm.nih.gov/38989569/) · [DOI](https://doi.org/10.1097/SLA.0000000000006438)

前瞻多方法QI研究:对OR团队实施15分钟原位模拟(30场、163名跨专业参与者),用OR Black Box分析1570例真实手术的超时/复盘评分。模拟组较未参加组复盘质量(84% vs 79%,P<0.001)、依从性(73% vs 66%)、参与度(80% vs 73%)显著更好,超时评分无差异。ORBB(AI赋能分析平台)在此为测量工具、研究主体为模拟QI,故边缘相关。

> **要点**：模拟培训改善手术安全复盘表现;AI黑匣子平台作为自动化测量手段


### 356. 胰头及钩突部肿瘤机器人剜除术的近远期结局

*Short-term and Long-term Outcomes of Robotic Enucleation of Tumors Located in the Pancreatic Head and Uncinate Process.*

**Annals of Surgery** · 2024-01-23 · 回顾性对比队列 · [PMID 38258584](https://pubmed.ncbi.nlm.nih.gov/38258584/) · [DOI](https://doi.org/10.1097/SLA.0000000000006198)

回顾比较92例机器人剜除(REn)与开放剜除(OEn)胰头/钩突良性及低度恶性肿瘤。REn较OEn手术更短(90 vs 120分钟,P<0.001)、失血更少(20 vs 100 mL)、临床相关胰瘘更低(43.5% vs 61.1%,P=0.040)、无中转开腹,中位随访50个月复发与胰腺内外分泌功能相当。属遥操作机器人手术、无AI成分,故边缘相关。

> **要点**：机器人胰腺剜除较开放更优且不增大并发症;纯机器人操作无AI



## 十六、【预印本】arXiv / medRxiv / bioRxiv（core 437 篇逐篇展开 + 边缘 104 篇紧凑目录）

> 预印本未经同行评议，作为二级来源单列并标注服务器。**核心（core）预印本按主题分类逐篇给出摘要级总结**（与期刊论文同格式；预印本多为方法/数据集/指标数字，个别无量化结果者已注明）；边缘预印本仍以紧凑目录列于末尾。仅收录 arXiv 与 medRxiv/bioRxiv；Research Square、Preprints.org、SSRN 等低选择性服务器不计入。


### （一）术中导航、引导与增强现实（65 篇）

#### 1. 优化手术室实时AI支持的人机界面：CVS Copilot

*Optimizing Human-Machine Interface for Real-Time AI Support in the Operating Room: the CVS Copilot*

**arXiv（预印本）** · 2026-06-25 · 混合方法用户中心设计研究(n=17) · [arXiv 2606.26886](https://arxiv.org/abs/2606.26886)

围绕腹腔镜胆囊切除术自动关键安全视野(CVS)评估的人机界面(HMI)设计，开展17名外科医生(住院医、主治、教授)参与的混合方法用户中心研究。16/17支持术中AI决策支持但拒绝自主决策；主治偏好决定性时刻的最简反馈(13/14)、住院医偏好带置信度的可选指导(3/3)；医生普遍青睐外科医生可控、最小侵入的可视化(16/17支持最简叠加、13/17支持按需解剖分割)。据此设计出角色自适应的CVS Copilot。

> **要点**：医生更接受可控、最简、按需的术中AI界面而非自主决策。


#### 2. LayersReg：可靠术中3D/2D配准的逐层渐进回归器

*LayersReg: A Layer-by-Layer Progressive Regressor for Reliable Intraoperative 3D/2D Registration*

**arXiv（预印本）** · 2026-06-25 · 方法开发+配准实验 · [arXiv 2606.26647](https://arxiv.org/abs/2606.26647)

针对传统迭代配准效率低、失败率高及学习式回归泛化受限的问题，提出LayersReg回归范式，赋予模型三维解剖感知并以逐层渐进方式搜索正确位姿(受经典迭代优化启发，在特征空间捕捉像素流趋势迭代收敛)。在大偏移与多模态条件下，X光/CT配准达0.68°/1.41mm、切片定位达0.73°/1.55mm，优于现有SOTA并满足术中精度与实时需求。

> **要点**：逐层渐进回归兼顾泛化与实时，实现高精度术中3D/2D配准。


#### 3. MeiBRD：元学习术中生物力学残差变形

*MeiBRD: Meta-Learning Intraoperative Biomechanical Residual Deformation*

**arXiv（预印本）** · 2026-06-16 · 方法开发+肝phantom实验 · [arXiv 2606.17379](https://arxiv.org/abs/2606.17379)

针对术中肝配准中软组织变形大而术中测量稀疏的难题，提出混合配准框架：不学完整变形场，而学修正线性生物力学预测的残差变形函数(以几何感知注意力的图神经扩散建模肝网格)，并将稀疏术中测量视为context样本、以前馈元学习器'学会学习'该残差函数。在可变形肝phantom数据上，配准精度与泛化优于刚性、生物力学与数据驱动基线，尤其在分布外几何与变形上(未给具体数值)。

> **要点**：元学习修正生物力学残差，实现数据高效、泛化更强的术中肝配准。


#### 4. 经结构化基础模型适配的几何一致内窥镜表征用于图像引导导航

*Geometry-Consistent Endoscopic Representations for Image-Guided Navigation via Structured Foundation Model Adaptation*

**arXiv（预印本）** · 2026-06-15 · 方法开发+多内镜数据集评测 · [arXiv 2606.17340](https://arxiv.org/abs/2606.17340)

针对单目内窥镜深度线索有限、纹理弱、非刚性变形与跨域外观差异导致位姿/深度估计与图像-解剖对齐困难，且基础模型表征几何一致性不足的问题，提出统一框架：合成数据流水线提供几何监督+层级感知几何-语义适配(在Transformer层级选择性插入低秩适配器并配层级训练目标)。在公开与自有数据上提升几何与语义表征质量、改善位姿与单目深度等下游导航任务，并在支气管镜上呈良好合成到真实迁移，可扩展至鼻窦内镜与结肠镜(未给具体数值)。

> **要点**：层级感知几何引导适配提升内窥镜导航所需的几何一致表征。


#### 5. 计算机辅助手术中部分到完整点云配准的逐点几何感知Transformer

*Point-Wise Geometry-Aware Transformer for Partial-to-Full Point Cloud Registration in Computer-Assisted Surgery*

**arXiv（预印本）** · 2026-06-11 · 方法开发+四类骨实验 · [arXiv 2606.13488](https://arxiv.org/abs/2606.13488)

针对部分到完整点云配准因重叠率变化、点密度波动与噪声而困难的问题，提出GAPR-Net粗到细框架(卷积+Transformer，交叉注意力融合局部与全局信息)，并设变换不变的逐点几何特征稳健刻画点与邻域的相对几何。在胫骨、股骨、骨盆、胸椎软骨四类骨上，总配准recall达94.2%、RMSE低至1.992mm、旋转与平移R²分别0.908与0.974。

> **要点**：逐点几何感知Transformer实现高精度部分点云配准，支撑手术导航。


#### 6. GeoCFNet：几何感知置信场网络用于机器人辅助内镜黏膜下剥离

*GeoCFNet: Geometry-Aware Confidence Field Network for Robot-Assisted Endoscopic Submucosal Dissection*

**arXiv（预印本）** · 2026-06-11 · 方法开发+实验评测 · [arXiv 2606.13032](https://arxiv.org/abs/2606.13032)

针对机器人辅助内镜黏膜下剥离(ESD)需稳定精准视觉引导以维持剥离通道与安全组织margin，而烟雾、镜面高光、组织变形、弱纹理与薄几何结构使置信场估计困难的问题，将剥离引导建模为几何感知置信场估计，提出基于预训练DINOv3骨干的GeoCFNet(含token区分融合模块、SegFormer解码器与几何感知空间正则GASR)。实验达RMSE 0.0480、PSNR 27.1995、SSIM 0.3397、CC 0.2466，实现准确且几何稳定的置信场估计。

> **要点**：DINOv3几何感知置信场为机器人ESD提供稳定剥离引导。


#### 7. 手术器械处理与组装的多相机AR引导系统：工作负荷与效率研究

*Multi-Camera AR Guidance System for Surgical Instrument Handling and Assembly: Investigating Workload and Efficiency*

**arXiv（预印本）** · 2026-06-03 · 技术评测+用户研究(n=29) · [arXiv 2606.04992](https://arxiv.org/abs/2606.04992)

针对洗手护士处理与组装陌生器械时认知负荷高的问题，提出无标记多相机6D位姿估计结合头显AR原位可视化的引导系统(位姿网络纯合成数据训练)，经注视选择与脚踏板切换装配步骤。技术评测优于SOTA 6D位姿估计；在膝关节置换手术仿真中对29名洗手护士与纸质手册对比，AR引导显著降低感知工作负荷，并将任务完成时间缩短21.3%(4.76分钟)，对不熟悉器械者获益更明显，错误频率相当。

> **要点**：无标记多相机AR引导降低洗手护士负荷并缩短器械组装时间21.3%。


#### 8. 神经外科医生需要看到什么：从超声合成术中MRI用于脑肿瘤手术脑移位补偿

*What neurosurgeons need to see: synthetic intra-operative MRI from ultrasound for brain-shift compensation in brain tumour surgery*

**arXiv（预印本）** · 2026-06-03 · 方法开发+ReMIND队列(14例) · [arXiv 2606.07658](https://arxiv.org/abs/2606.07658)

针对胶质瘤手术中硬膜打开后脑移位使神经导航退化、而术中MRI稀缺、术中超声(ioUS)受斑点对比与窄视野限制的问题，提出端到端流水线：融合术前MRI、由ioUS经ResViT-2.5D合成的MRI及以合成图像锚定的可变形配准(NiftyReg+SynthMorph两阶段)，在术前影像空间生成新的全脑MRI体。在术后ReMIND队列上合成图像与术中T2高度匹配；14例215个专家landmark中，合成锚定配准将平均目标配准误差从6.27mm降至5.86mm(与经典NiftyReg 5.85mm相当)且每例均得微分同胚形变场。

> **要点**：从超声合成术中MRI提供术后状态更新，补偿脑移位辅助手术导航。


#### 9. 脑肿瘤手术术中超声到MR合成的系统性基准评测

*A Systematic Benchmark of Intraoperative Ultrasound-to-MR Synthesis for Brain Tumour Surgery*

**arXiv（预印本）** · 2026-05-30 · 方法学基准评测研究 · [arXiv 2606.00630](https://arxiv.org/abs/2606.00630)

在公开ReMIND数据集(76例患者；153对ioUS/T2w、104对ioUS/FLAIR；患者级60/16训练/测试划分)上，对6种生成器(Pix2Pix、SwinPix2Pix、CycleGAN、CUT、ResViT、扩散模型SynDiff)×4种推理范式×2类目标共48组实验做统一评测。结果显示无单一架构全面占优，感知质量(LPIPS)与下游nnU-Net分割效用相关最强(r=-0.66, p<0.001)，而SSIM越高下游效用反而越差(r=-0.64, p<0.001)，SynDiff-2.5D下游分割保持最佳(U_Dice=0.55)。

> **要点**：术中US→MR合成应以感知/下游指标而非全局SSIM为准，SynDiff-2.5D下游最佳。


#### 10. 抗衰减交替优化的腹腔镜肝脏地标检测（A2ONet）

*Attenuation-Resilient Alternating Optimization for Laparoscopic Liver Landmark Detection*

**arXiv（预印本）** · 2026-05-26 · 方法开发+多数据集评测 · [arXiv 2605.26630](https://arxiv.org/abs/2605.26630)

针对腹腔镜肝脏手术中曝光不足与曲线几何不匹配问题，提出A2ONet：含光照场补偿(IFC)块增强暗区、轻量频率-方向选择滤波器(FOSF)抑制纹理干扰、以及交替分割-曲线优化(ASCO)解码器耦合分割与曲线建模。在L3D-2K、L3D、P2ILF数据集上较竞争方法一致提升(摘要未列具体数值)，为术中解剖引导提供更可靠基础。

> **要点**：A2ONet抗光照衰减，提升腹腔镜肝脏地标检测稳健性，服务术中解剖引导。


#### 11. SurgRFO：基础模型驱动的术中胸片遗留异物合成

*SurgRFO: Foundation Model Based Compositional Synthesis of Critical Retained Foreign Objects in Intraoperative Chest X-rays*

**arXiv（预印本）** · 2026-05-24 · 生成式数据合成方法+下游检测评测+盲法临床评价 · [arXiv 2605.24787](https://arxiv.org/abs/2605.24787)

针对术中胸片关键遗留异物(RFO)罕见、样本稀缺的问题，提出两阶段合成框架SurgRFO：先微调Roentgen胸片基础模型生成保留解剖与管线的无RFO背景，再用轻量生成器合成RFO并经条件泊松融合。合成数据增强Faster R-CNN、YOLOv8、RetinaNet后，在内外部测试集低FPPI下一致提升敏感度；盲法临床评价显示合成图像真实感媲美真实术中影像。

> **要点**：基础模型合成罕见术中遗留异物胸片，增强检测器在低误报下的敏感度，提升手术安全。


#### 12. 面向胶质瘤手术引导的术中荧光寿命成像数据中心框架

*A Data-Centric Framework for Intraoperative Fluorescence Lifetime Imaging for Glioma Surgical Guidance*

**arXiv（预印本）** · 2026-04-28 · 回顾性数据中心AI分类研究(31例/192切缘) · [arXiv 2604.26147](https://arxiv.org/abs/2604.26147)

提出数据中心AI(DC-AI)框架，整合置信学习(CL)、类别精化与靶向标签评估，构建用于胶质母细胞瘤(GBM)切缘的多类术中荧光寿命成像(FLIm)分类器。数据取自31例新诊IDH野生型GBM的192处组织切缘，初标为7类肿瘤细胞度，经CL量化点级置信、合并为低/中/高三类后训练，三分类准确率达96%；SHAP揭示类别特异的FLIm特征，并识别灰质构成、血污等低置信来源。

> **要点**：数据中心AI提升术中FLIm可靠性，GBM切缘三分类准确率96%，服务实时胶质瘤切缘评估。


#### 13. 基于视觉手部跟踪的无接触术中医学图像访问系统

*Touchless Intraoperative Image Access System Based on Vision-Based Hand Tracking*

**arXiv（预印本）** · 2026-04-27 · 系统开发+性能定量评估 · [arXiv 2604.24235](https://arxiv.org/abs/2604.24235)

面向术中无菌与流程连续需求，提出仅用单个RGB相机的无接触医学图像导航系统：用MediaPipe Hands实时2.5D手部关键点跟踪，将平移、旋转、缩放等直观手势映射为图像操作命令，无需额外硬件或用户特定训练，架构独立于可视化软件(集成于PyVista)。经帧级日志与延迟、稳定性、鲁棒性定量分析，展现实时、低延迟、稳定的交互。

> **要点**：单RGB相机+MediaPipe实现低成本无接触术中图像访问，满足无菌与实时交互。


#### 14. HyKey：微创手术中的高光谱关键点检测与匹配

*HyKey: Hyperspectral Keypoint Detection and Matching in Minimally Invasive Surgery*

**arXiv（预印本）** · 2026-04-19 · 方法学研究(高光谱深度学习) · [arXiv 2604.17446](https://arxiv.org/abs/2604.17446)

针对微创手术(MIS)中RGB关键点匹配因纹理差、光照复杂而失效的问题，提出HyKey——混合3D-2D卷积网络联合提取高光谱(HSI)空间-光谱特征，用于三维重建/工具跟踪/AR引导。在机器人采集的双相机RGB-HSI腹腔镜离体器官数据集上训练，匹配平均准确率96.62%、10度位姿估计平均准确率67.18%，优于SuperPoint、ALIKE等RGB基线。

> **要点**：高光谱信息在纹理稀疏手术场景中显著提升关键点匹配与位姿估计，助力单目3D重建。


#### 15. 面向腹腔镜手术的患者特异性可变形配准

*Towards Patient-Specific Deformable Registration in Laparoscopic Surgery*

**arXiv（预印本）** · 2026-04-14 · 方法学研究(非刚性点云配准) · [arXiv 2604.13186](https://arxiv.org/abs/2604.13186)

为将术前患者特异性3D模型实时配准到术中术野以提供解剖引导，提出首个患者特异性非刚性点云配准方法：Transformer编解码器+重叠估计+匹配模块预测稠密对应，再用基于物理的算法配准。在合成数据上达到45% Matching Score与92% Inlier Ratio，显著优于传统通用方法。

> **要点**：患者特异性可变形配准优于通用方法，有望改善术中解剖引导。


#### 16. SurgNavAR：面向光学透视头戴显示器的增强现实手术导航框架

*SurgNavAR: An Augmented Reality Surgical Navigation Framework for Optical See-Through Head Mounted Displays*

**arXiv（预印本）** · 2026-03-31 · 系统开发与体模验证(AR导航) · [arXiv 2603.29990](https://arxiv.org/abs/2603.29990)

提出可适配多种术式的HMD-AR手术导航框架:跟踪贴附于患者与器械的2D图案参考标记、支持pivot与参考标定、点匹配+手动定位实现图像到患者配准。在HoloLens 2与Magic Leap 2上以体模评估AR引导穿刺与肋骨骨折定位，工具尖端标定精度约1mm、配准精度约3mm、靶向精度小于5mm。已开源。

> **要点**：开源HMD-AR导航框架实现毫米级标定/配准与小于5mm靶向精度。


#### 17. 一体化增强现实引导头颈肿瘤切除

*All-in-One Augmented Reality Guided Head and Neck Tumor Resection*

**arXiv（预印本）** · 2026-03-31 · 体模可行性研究(AR引导) · [arXiv 2603.29495](https://arxiv.org/abs/2603.29495)

头颈鳞癌阳性切缘常见但术中再切除因切缘位置多靠口头传达而不精确。提出一体化AR系统:用HoloLens 2深度感知与全自动无标记表面配准，将切除标本上的阳性切缘重定位到瘤床并原位可视化。硅胶体模研究(6名医学学员)中无标记配准的靶配准误差与有标记基线相当(中位1.8mm对1.7mm，最大小于4mm)；切缘重定位误差由口头引导的中位14.2mm降至AR的3.2mm，全部AR定位误差小于5mm。

> **要点**：无标记AR切缘引导将头颈肿瘤再切除定位误差从14.2mm降至3.2mm。


#### 18. 内镜相机位姿恢复的策略式建模研究

*Investigating a Policy-Based Formulation for Endoscopic Camera Pose Recovery*

**arXiv（预印本）** · 2026-03-20 · 方法学研究(模仿学习/导航) · [arXiv 2603.20045](https://arxiv.org/abs/2603.20045)

面向内镜手术视觉导航中传统特征匹配/几何优化在低纹理、快速光照变化下退化，提出策略式(policy-based)相机位姿恢复:模仿专家在既往相机状态条件下预测短时相对运动，推理时不维护显式几何表示。在尸体鼻窦内镜上，oracle状态条件下短时运动预测的平移误差最低、旋转精度有竞争力，并对低纹理条件敏感性更低。

> **要点**：学习式运动策略为内镜相机位姿恢复提供对低纹理更鲁棒的替代方案。


#### 19. Patient4D：从单目手术室视频恢复时序一致的患者体表网格

*Patient4D: Temporally Consistent Patient Body Mesh Recovery from Monocular Operating Room Video*

**arXiv（预印本）** · 2026-03-17 · 方法学研究(手术AR，合成+公开数据集验证) · [arXiv 2603.17178](https://arxiv.org/abs/2603.17178)

针对手术AR场景中铺单遮挡与头戴相机视角持续移动导致人体网格恢复(HMR)性能下降的问题，提出Patient4D，利用"静止性先验"约束，结合图像基础模型与轻量几何机制(Pose Locking关键帧锚定、Rigid Fallback轮廓引导刚性对齐)保证跨帧时序一致。在4,680个合成手术序列及三个公开HMR视频基准上评估，铺单遮挡下平均IoU达0.75，将失败帧比例从最优基线的30.5%降至1.3%。

> **要点**：静止性先验显著提升手术AR中单目患者体表三维重建鲁棒性。


#### 20. 语音引导的具身智能体：视频导航颅底外科交互系统

*Speak, Segment, Track, Navigate: An Interactive System for Video-Guided Skull-Base Surgery*

**arXiv（预印本）** · 2026-03-17 · 系统开发与实验验证(对比光学追踪) · [arXiv 2603.16024](https://arxiv.org/abs/2603.16024)

提出纯基于术中视频的语音引导具身智能体框架，响应术者自然语言指令实时执行分割、器械追踪、术前3D模型配准、单目工具位姿估计与解剖叠加导航，无需外部光学追踪器与额外硬件。在颅底外科场景对比商用光学追踪系统，三次试验中相机系下工具尖端平均绝对位置误差2.32±1.10mm，帧间偏航/俯仰误差分别0.18±0.25°与0.21±0.30°，约2分钟内完成分割与配准。

> **要点**：语音驱动的纯视频具身智能体实现精准术中空间引导并大幅简化部署。


#### 21. 拓展视野：面向增强现实的设备无关手术器械多视图追踪框架

*Extend Your Horizon: A Device-Agnostic Surgical Tool Tracking Framework with Multi-View Optimization for Augmented Reality*

**arXiv（预印本）** · 2026-03-09 · 方法学研究(多视图传感融合) · [arXiv 2603.07981](https://arxiv.org/abs/2603.07981)

针对手术导航中器械常因设备、工具与人员遮挡而丢失视线的问题，提出通过动态场景图融合多种传感模态、实时估计追踪可靠性的框架，整合不同精度与运动特性的追踪系统以在遮挡下追踪器械。实验表明在遮挡情形下增强现实可视化的鲁棒性与一致性提升(摘要未给具体数值)。

> **要点**：多模态动态场景图融合提升遮挡下手术器械追踪与AR可视化鲁棒性。


#### 22. 虚拟术中CT(viCT)：内镜鼻窦手术中组织切除的序贯解剖更新

*Virtual Intraoperative CT (viCT): Sequential Anatomic Updates for Modeling Tissue Resection Throughout Endoscopic Sinus Surgery*

**arXiv（预印本）** · 2026-03-07 · 尸体可行性研究(NeRF重建+配准) · [arXiv 2603.06956](https://arxiv.org/abs/2603.06956)

针对图像引导鼻窦手术(ESS)仅参考静态术前CT、无法反映切除边界演变的问题，提出viCT：用深度监督NeRF+虚拟立体合成从单目内镜视频生成度量尺度3D重建，经3D Slicer刚性地标配准并体素化更新术前CT。四例尸体标本、四个手术阶段的可行性研究中与真值CT一致，Dice 0.88±0.05、Jaccard 0.79±0.07、HD95 0.69±0.28mm、Chamfer 0.09±0.05mm，表面误差亚毫米级。

> **要点**：viCT无需额外硬件即可在鼻窦手术中以CT格式更新演变解剖。


#### 23. 潜变量锚定对应约束的腹腔镜手术术前-术中肝脏配准

*Preoperative-to-intraoperative Liver Registration for Laparoscopic Surgery via Latent-Grounded Correspondence Constraints*

**arXiv（预印本）** · 2026-03-02 · 方法学研究(公开数据集) · [arXiv 2603.01720](https://arxiv.org/abs/2603.01720)

针对腹腔镜肝手术AR中现有配准缺乏可靠2D-3D几何对应显式建模、可解释性与稳定性不足的问题，提出对应驱动的可变形配准框架Land-Reg：以潜变量锚定的2D-3D地标对应作可解释中间表示，刚性配准用跨模态潜对齐模块与不确定性增强的重叠地标检测器，非刚性配准用形状约束监督(重投影一致性+局部等距正则)与渲染掩码对齐。在P2ILF数据集上刚性位姿与非刚性形变均优于对比方法。

> **要点**：潜变量锚定的地标对应提升腹腔镜肝手术术前-术中可变形配准。


#### 24. EndoDDC：基于扩散深度补全的内镜手术机器人导航稀疏到稠密重建

*EndoDDC: Learning Sparse to Dense Reconstruction for Endoscopic Robotic Navigation via Diffusion Depth Completion*

**arXiv（预印本）** · 2026-02-25 · 方法学研究（内镜深度补全，两公开数据集验证） · [arXiv 2602.21893](https://arxiv.org/abs/2602.21893)

针对内镜手术机器人导航中深度估计难题，提出EndoDDC深度补全方法，融合图像、稀疏深度与深度梯度特征并用扩散模型优化深度图，解决弱纹理与反光问题，为三维重建与安全器械引导奠基。在两个公开内镜数据集上，深度精度与鲁棒性均优于当前SOTA模型（摘要未给出具体数值）。

> **要点**：扩散深度补全提升内镜手术机器人导航的深度精度与鲁棒性。


#### 25. SurGo-R1：手术视频中操作安全区的上下文推理基准与建模

*SurGo-R1: Benchmarking and Modeling Contextual Reasoning for Operative Zone in Surgical Video*

**arXiv（预印本）** · 2026-02-25 · 方法学研究（基准构建+VLM推理模型） · [arXiv 2602.21706](https://arxiv.org/abs/2602.21706)

构建ResGo基准（腹腔镜帧标注Go Zone边界框与临床理由），并提出SurGo-R1模型，采用RLHF与先阶段后安全区的多轮架构，先识别手术阶段再据此生成推理与安全区坐标。在未见术式上达到76.6%阶段准确率、32.7 mIoU、54.8% hardcore准确率，较主流通用VLM提升6.6倍。

> **要点**：阶段条件化推理显著提升手术视频中安全操作区的定位能力。


#### 26. 多层级几何正则化的单目内镜组织三维重建

*Monocular Endoscopic Tissue 3D Reconstruction with Multi-Level Geometry Regularization*

**arXiv（预印本）** · 2026-02-24 · 方法学研究（三维重建，公开数据集对比） · [arXiv 2602.20718](https://arxiv.org/abs/2602.20718)

提出基于3D Gaussian Splatting的可变形内镜组织重建方法用于机器人辅助手术，先用符号距离场构建网格约束高斯重建，再引入局部刚性与全局非刚性约束保证物理合理形变，兼顾平滑表面与实时渲染。定量与定性对比显示在纹理与几何上均取得可靠重建质量（摘要未给出具体数值）。

> **要点**：表面感知与形变约束的高斯重建实现机器人手术中平滑实时的组织重建。


#### 27. Diff2DGS：基于2D高斯泼溅的遮挡手术场景可靠重建

*Diff2DGS: Reliable Reconstruction of Occluded Surgical Scenes via 2D Gaussian Splatting*

**arXiv（预印本）** · 2026-02-20 · 方法学研究（三维重建，多数据集对比） · [arXiv 2602.18314](https://arxiv.org/abs/2602.18314)

提出两阶段框架Diff2DGS重建被器械遮挡的可变形手术场景：先用带时序先验的扩散视频模块修复遮挡组织，再用带可学习形变模型的2D高斯泼溅(2DGS)捕捉动态形变与几何。在EndoNeRF达38.02 dB PSNR、StereoMIS达34.40 dB PSNR，并在SCARED上进行深度精度分析，外观与几何均优于SOTA。

> **要点**：扩散修复+2D高斯泼溅实现遮挡手术场景的高保真几何重建。


#### 28. 深度增强、免有限元的腹腔镜肝脏AR三维-二维配准

*Depth Augmented and FE Free 3D/2D Liver Registration for Laparoscopic Liver AR*

**arXiv（预印本）** · 2026-02-19 · 方法学研究（手术AR配准，公开数据集） · [arXiv 2602.17517](https://arxiv.org/abs/2602.17517)

提出深度增强、免有限元的3D-2D配准流程用于腹腔镜肝脏增强现实：以多类轮廓图与单目深度适配FoundationPose的RefineNet做刚性初始化，再用非刚性ICP构建患者特异统计形变模型并以L-BFGS-B优化。在公开临床腹腔镜肝脏数据集上，受控手动轮廓设置下平均目标配准误差(TRE)为14.73mm。

> **要点**：免有限元的统计形变建模为肝脏手术AR提供可行的配准替代方案。


#### 29. 任意相机运动下的单目手术四维重建（Local-EndoGS）

*4D Monocular Surgical Reconstruction under Arbitrary Camera Motions*

**arXiv（预印本）** · 2026-02-19 · 方法学研究（四维重建，多数据集对比） · [arXiv 2602.17473](https://arxiv.org/abs/2602.17473)

提出Local-EndoGS四维重建框架，针对任意相机运动的单目内镜序列，采用渐进式窗口化全局表示为每个观测窗口分配局部可变形模型，并用融合多视几何、跨窗口信息与单目深度先验的由粗到精策略克服初始化难题。在三个公开可变形内镜数据集上，外观与几何质量均持续优于SOTA方法。

> **要点**：窗口化表示实现大相机运动下长序列内镜的高质量四维重建。


#### 30. NRGS-SLAM：基于形变感知3D高斯泼溅的内镜单目非刚性SLAM

*NRGS-SLAM: Monocular Non-Rigid SLAM for Endoscopy via Deformation-Aware 3D Gaussian Splatting*

**arXiv（预印本）** · 2026-02-19 · 方法学研究（内镜SLAM，多数据集对比） · [arXiv 2602.17182](https://arxiv.org/abs/2602.17182)

提出NRGS-SLAM单目非刚性SLAM系统，为每个高斯基元赋予可学习形变概率并经贝叶斯自监督优化以解耦相机自运动与组织形变，配合形变感知跟踪与渐进式建图。在多个公开内镜数据集上，相机位姿估计RMSE最多降低50%，并获得比SOTA更高质量的照片级重建。

> **要点**：形变感知高斯地图解耦运动与形变，提升内镜SLAM定位与重建。


#### 31. NeRFscopy：面向内镜活体时变组织的神经辐射场

*NeRFscopy: Neural Radiance Fields for in-vivo Time-Varying Tissues from Endoscopy*

**arXiv（预印本）** · 2026-02-17 · 方法学研究（内镜三维重建/新视角合成） · [arXiv 2602.15775](https://arxiv.org/abs/2602.15775)

提出自监督NeRFscopy流程，从单目内镜视频进行新视角合成与可变形组织三维重建，采用规范辐射场加SE(3)参数化的时变形变场，无需模板或预训练模型仅从数据学习隐式三维模型，以辅助可视化、诊断与手术引导。在多个具挑战性的内镜场景中，新视角合成精度优于竞争方法（摘要未给出具体数值）。

> **要点**：无模板自监督NeRF实现内镜可变形组织的高质量三维重建。


#### 32. ARport：机器人手术无标记影像引导端口放置的增强现实系统

*ARport: An Augmented Reality System for Markerless Image-Guided Port Placement in Robotic Surgery*

**arXiv（预印本）** · 2026-02-15 · 系统研究（手术AR，人体模型实验） · [arXiv 2602.14153](https://arxiv.org/abs/2602.14153)

提出ARport增强现实系统，在光学透视头戴显示器(OST-HMD)上无需外部传感器或标记，从RGB-深度-位姿数据重建术野、用基础模型提取患者体表并做基于表面的无标记配准，将术前规划的套管布局原位可视化叠加到患者体表。全尺寸人体模型实验中准确叠加预规划套管位置，实现虚拟规划与真实解剖的一致空间对应。

> **要点**：无标记、无外部传感器的AR系统将术前端口规划原位叠加于患者体表。


#### 33. RGA-Net：基于互易注意力的机器人手术系统视觉增强框架

*RGA-Net: A Vision Enhancement Framework for Robotic Surgical Systems Using Reciprocal Attention Mechanisms*

**arXiv（预印本）** · 2026-02-14 · 方法学研究（手术视频图像复原/去烟） · [arXiv 2602.13726](https://arxiv.org/abs/2602.13726)

提出RGA-Net深度学习框架用于机器人手术工作流中的手术烟雾去除，采用层级编码-解码结构，含结合移位窗口注意力与频域处理的双流混合注意力(DHA)模块和分解式注意力(ADA)模块，经互易交叉门控实现编解码双向特征调制。在DesmokeData与LSD3K手术数据集上恢复视觉清晰度的性能优于现有方法，为机器人手术提供持续清晰的术中视觉。

> **要点**：互易注意力去烟为机器人手术提供持续清晰的术中视觉反馈。


#### 34. 从术前到术中MRI：预测癫痫外科颞叶切除的脑移位

*From Pre- to Intra-operative MRI: Predicting Brain Shift in Temporal Lobe Resection for Epilepsy Surgery*

**arXiv（预印本）** · 2026-02-03 · 方法学研究（脑移位预测，术中MRI验证） · [arXiv 2602.03785](https://arxiv.org/abs/2602.03785)

提出基于U-Net的NeuralShift模型，仅用术前MRI预测颞叶切除术患者的脑移位以更新神经导航，以切除侧与中线解剖标志的目标配准误差(TRE)和预测/术中掩膜的DICE评估。结果可预测脑整体形变（DICE 0.97）并具准确局部位移（标志TRE低至1.12mm），补偿颞叶切除中的大幅脑移位。

> **要点**：仅凭术前MRI即可高精度预测神经外科脑移位以支持导航。


#### 35. LiNUS：面向实时DBS手术的深部脑核团轻量化自动分割

*LiNUS: Lightweight Automatic Segmentation of Deep Brain Nuclei for Real-Time DBS Surgery*

**arXiv（预印本）** · 2026-01-21 · 方法学/DL分割 · [arXiv 2601.14793](https://arxiv.org/abs/2601.14793)

提出轻量深度学习框架LiNUS，在改进U-Net基础上引入谱归一化、双线性插值上采样与多尺度特征融合，自动分割深部脑刺激(DBS)手术中的丘脑底核(STN)。在清华DBS数据集(TT14)上Dice达0.679、每例推理仅0.05秒，显著优于人工与配准法；高分辨率数据进一步验证Dice达0.89，并开发了实时临床GUI。

> **要点**：轻量LiNUS以0.05s/例、Dice 0.679–0.89实时分割STN辅助DBS手术。


#### 36. End2Reg：学习任务特定分割用于脊柱手术无标记配准

*End2Reg: Learning Task-Specific Segmentation for Markerless Registration in Spine Surgery*

**arXiv（预印本）** · 2025-12-15 · 方法学/DL · [arXiv 2512.13402](https://arxiv.org/abs/2512.13402)

提出端到端深度学习框架End2Reg，联合优化分割与配准以实现脊柱手术无标记术中导航，无需分割标注与人工步骤——网络仅在配准目标引导下学习面向配准优化的任务特定分割掩码。在离体与活体基准上取得SOTA，中位目标配准误差(TRE)降低32%、平均均方根误差(RMSE)降低61%，且在部分遮挡下保持鲁棒。

> **要点**：End2Reg端到端联合分割-配准使脊柱手术无标记导航TRE降32%、RMSE降61%。


#### 37. 自监督对比嵌入自适应用于内镜图像匹配

*Self-Supervised Contrastive Embedding Adaptation for Endoscopic Image Matching*

**arXiv（预印本）** · 2025-12-11 · 方法学/DL(自监督) · [arXiv 2512.10379](https://arxiv.org/abs/2512.10379)

面向图像引导手术、增强现实与3D重建，提出建立内镜图像对像素级对应的深度学习流程与自监督优化框架：用新视角合成生成真值内点对应以挖掘三元组，在DINOv2骨干上增加一个Transformer层专门优化以经余弦相似度阈值直接匹配。在SCARED数据集上匹配精度更高、极线误差更低，超越SOTA。

> **要点**：自监督对比嵌入增强DINOv2实现内镜图像精确匹配，支撑图像引导手术与AR。


#### 38. G-SHARP：高斯散射硬件加速的实时手术场景重建流水线

*G-SHARP: Gaussian Surgical Hardware Accelerated Real-time Pipeline*

**arXiv（预印本）** · 2025-12-02 · 方法学/系统研究（三维重建/高斯散射） · [arXiv 2512.02482](https://arxiv.org/abs/2512.02482)

提出G-SHARP，首个原生基于Apache-2.0许可GSplat可微高斯光栅化器的手术场景重建流水线，面向微创手术可变形组织的快速高精度三维建模，支持原理化形变建模与遮挡处理，在EndoNeRF pulling基准上达SOTA重建质量与速度-精度权衡。并提供Holoscan SDK应用，将其部署于NVIDIA IGX Orin/Thor边缘硬件实现术中实时可视化。

> **要点**：基于商用兼容GSplat的实时手术场景重建，适配术中边缘硬件部署。


#### 39. Endo-G²T：几何引导且时序感知的时间嵌入4D高斯散射内镜场景重建

*Endo-G$^{2}$T: Geometry-Guided & Temporally Aware Time-Embedded 4DGS For Endoscopic Scenes*

**arXiv（预印本）** · 2025-11-26 · 方法学研究（4D重建/高斯散射） · [arXiv 2511.21367](https://arxiv.org/abs/2511.21367)

针对内镜视频强视角依赖效应（镜面反射、湿性反光、遮挡）导致的早期几何漂移，提出几何引导且时序感知的时间嵌入4DGS训练方案Endo-G²T，包含置信门控单目深度先验蒸馏、旋量式旋转参数化的时间嵌入高斯场与关键帧约束流式优化。在EndoNeRF与StereoMIS-P1数据集上于单目重建基线中取得SOTA。

> **要点**：几何先验+时序建模可稳定动态内镜手术场景的4D高斯重建。


#### 40. DeLightMono：解耦不均匀光照增强内镜自监督单目深度估计

*DeLightMono: Enhancing Self-Supervised Monocular Depth Estimation in Endoscopy by Decoupling Uneven Illumination*

**arXiv（预印本）** · 2025-11-25 · 方法学研究（自监督单目深度估计） · [arXiv 2511.20058](https://arxiv.org/abs/2511.20058)

针对内镜图像固有不均匀光照（尤其低强度区）导致的自监督单目深度估计性能下降，提出光照解耦框架DeLight-Mono，用设计的光照-反射-深度模型分解图像并以辅助网络与利用解耦分量的新型联合优化损失缓解光照影响。在两个公开数据集上经大量对比与消融验证有效。

> **要点**：解耦不均匀光照可提升内镜导航系统所需的自监督单目深度估计。


#### 41. AI显著提升结肠镜腺瘤检出率但不改变息肉检出率：一项倾向评分匹配研究

*Artificial Intelligence Significantly Improves Adenoma Detection Rate but Does Not Affect Polyp Detection Rate in Colonoscopy: A Propensity Score Matching Study*

**medRxiv/bioRxiv（预印本）** · 2025-11-11 · 回顾性倾向评分匹配队列 · [DOI](https://doi.org/10.1101/2025.11.09.25339868)

回顾性倾向评分匹配研究：纳入2022.8–2024.2某院824例结肠镜(AI CAD辅助393例、常规431例)，1:1最近邻匹配后786例分析。AI组腺瘤检出率(ADR)显著更高(41.5% vs 34.4%，校正OR=1.380，95%CI 1.012–1.885，P=0.042)；息肉检出率(PDR)升高但无统计学意义(53.2% vs 46.1%，OR=1.312，P=0.077)。

> **要点**：实时AI CAD辅助结肠镜可独立提升腺瘤检出率,支持其临床应用价值


#### 42. TiS-TSL：经时间可切换师生学习的图像标签监督手术视频立体匹配

*TiS-TSL: Image-Label Supervised Surgical Video Stereo Matching via Time-Switchable Teacher-Student Learning*

**arXiv（预印本）** · 2025-11-10 · 方法学研究（半监督立体匹配） · [arXiv 2511.06817](https://arxiv.org/abs/2511.06817)

针对微创手术立体匹配密集视差监督近乎不可得（仅少量术前图像级标注），提出时间可切换师生学习框架TiS-TSL，单一模型支持图像预测、前向与后向视频预测三模式，经图像到视频、视频到视频两阶段学习用双向时空一致性过滤噪声视频级伪标签、增强时序连贯以消除闪烁。在两个公开数据集上TEPE与EPE较图像基SOTA至少改善2.11%与4.54%。

> **要点**：时间可切换师生学习在极少标注下实现时序连贯的手术视频立体匹配，服务导航与AR。


#### 43. 用于超声导航切除的结直肠肝转移自动分割

*Automatic segmentation of colorectal liver metastases for ultrasound-based navigated resection*

**arXiv（预印本）** · 2025-11-07 · 回顾加前瞻性研究（深度学习分割） · [arXiv 2511.05253](https://arxiv.org/abs/2511.05253)

针对术中超声(iUS)勾画结直肠肝转移(CRLM)的低对比、噪声与操作者依赖，基于nnU-Net用85例85个跟踪三维iUS体积训练3D U-Net，比较全体积与肿瘤裁剪区两种变体。裁剪模型在各指标显著更优(AUC-ROC 0.898 vs 0.718)，中位DSC 0.74、召回0.79、Hausdorff距离17.1mm，执行约1分钟（约快4倍），前瞻性术中测试稳健，并集成入3D Slicer供术中实时使用。

> **要点**：裁剪区3D U-Net实现近实时、免配准的超声导航肝转移切除分割，接近专家精度。


#### 44. 经域不变特征学习与潜在一致性的内镜单目绝对深度估计

*Monocular absolute depth estimation from endoscopy via domain-invariant feature learning and latent consistency*

**arXiv（预印本）** · 2025-11-04 · 方法学研究（域适应单目深度估计） · [arXiv 2511.02247](https://arxiv.org/abs/2511.02247)

针对内镜手术场景难获绝对(度量)深度、真实图像监督受限，提出与图像翻译过程无关的潜在特征对齐方法，让深度网络输入翻译的合成帧与真实内镜帧并经对抗学习与方向性特征一致性学习域不变特征。在带人工对齐绝对深度图的中央气道体模内镜视频上，绝对与相对深度指标均优于SOTA且跨骨干与预训练权重稳定提升。

> **要点**：潜在特征对齐缩小域差，改善内镜绝对深度估计以引导自主医疗机器人。


#### 45. 手术引导的无标记增强现实配准：多解剖临床精度研究

*Markerless Augmented Reality Registration for Surgical Guidance: A Multi-Anatomy Clinical Accuracy Study*

**arXiv（预印本）** · 2025-11-03 · 临床精度研究（AR配准，术中在体） · [arXiv 2511.02086](https://arxiv.org/abs/2511.02086)

在HoloLens 2上开发仅用深度、无标记的AR配准流水线（深度偏差校正加人在环初始化加全局到局部配准），并在腓骨游离皮瓣采集与下颌重建手术中临床评估。术前验证AR描迹与CT距离高度吻合（腿中位|Δd|0.78mm、RMSE 0.97mm；足0.80mm、1.20mm）；术中7次靶点试验每点误差中位3.9mm（足3.2mm、耳4.3mm、小腿5.3mm，5mm覆盖率72–95%），足与小腿差异显著(p<0.001)。

> **要点**：无标记深度AR在活体手术中实现约3–4mm中位精度，提升无基准点AR引导的临床可用性。


#### 46. 基于术中超声成像的导航式肝肿瘤切除

*Navigated hepatic tumor resection using intraoperative ultrasound imaging*

**arXiv（预印本）** · 2025-10-31 · 前瞻性概念验证试点研究(25例) · [arXiv 2510.27596](https://arxiv.org/abs/2510.27596)

概念验证试点研究评估一种基于术中超声、无需与术前影像配准的开腹肝手术导航系统，纳入25例肝转移瘤切除(前5例优化流程)；血管自动分割、肿瘤用区域生长(n=15)或深度学习算法(n=5)半自动分割，配电磁传感器补偿器官运动。20例均成功建立导航，工作流5-10分钟内可用；16例可评估者分析78个夹子-肿瘤距离，中位导航精度3.2mm[IQR 2.8-4.8mm]，R0切除率15/16(93.8%)。

> **要点**：仅依赖术中超声、免配准的肝手术导航可行且精度达毫米级(中位3.2mm)。


#### 47. SpiderMass质谱整合临床与微生物组数据用于食管胃癌手术切缘界定与预后

*Transforming Esogastric Cancer Surgery Integrating SpiderMass Mass Spectrometry with Clinical and Microbiome Data for Margin Delineation and Prognosis*

**medRxiv/bioRxiv（预印本）** · 2025-10-14 · 概念验证/多组学+机器学习 · [DOI](https://doi.org/10.1101/2025.10.13.682035)

概念验证研究：将环境质谱技术SpiderMass与临床元数据、微生物组图谱及机器学习结合，针对食管胃癌(尤其难获清晰切缘的低黏附癌PCC)实现术中实时分子切缘界定，并识别与组织类型及预后相关的脂质组学与微生物组特征。研究为方法学演示，未报告具体样本量与准确率指标。

> **要点**：SpiderMass实时分子分析有望提升食管胃癌术中切缘判定与手术决策精度


#### 48. 物理信息神经网络用于实时形变感知的AR手术追踪

*Physics-Informed Neural Networks for Real-Time Deformation-Aware AR Surgical Tracking*

**medRxiv/bioRxiv（预印本）** · 2025-09-25 · 方法学/体模实验 · [DOI](https://doi.org/10.1101/2025.09.23.678071)

方法学/体模研究：提出将有限元弹性约束嵌入损失函数的物理信息神经网络(PINN)，用于实时基于深度的AR配准。在诱导形变达20mm的肝、脑体模上，平均配准误差1.1mm，优于传统ICP(2.9mm)与仅FEM(1.8mm)，GPU上帧率维持22fps。

> **要点**：将物理约束嵌入深度学习显著提升软组织形变下AR手术追踪的鲁棒性与精度


#### 49. 术中图像胆道检测的生成式数据增强

*Generative data augmentation for biliary tract detection on intraoperative images*

**arXiv（预印本）** · 2025-09-23 · 方法开发研究（深度学习检测+GAN增强） · [arXiv 2509.18958](https://arxiv.org/abs/2509.18958)

针对腹腔镜胆囊切除术中胆管损伤风险，利用深度学习从术中白光图像定位胆道以改善术中可视化。构建并标注图像数据库训练YOLO检测算法，除经典数据增强外提出用生成对抗网络（GAN）合成部分训练数据。文中讨论了实验结果与伦理考量（未给出具体量化指标）。

> **要点**：YOLO+GAN合成增强用于术中胆道定位，辅助避免腹腔镜胆囊切除术中胆管损伤。


#### 50. BridgeSplat：CT与非刚性高斯泼溅双向耦合的可变形术中导航

*BridgeSplat: Bidirectionally Coupled CT and Non-Rigid Gaussian Splatting for Deformable Intraoperative Surgical Navigation*

**arXiv（预印本）** · 2025-09-23 · 方法开发研究（动物手术+合成数据验证） · [arXiv 2509.18501](https://arxiv.org/abs/2509.18501)

提出BridgeSplat，将术中三维重建与术前CT耦合，把3D高斯绑定到CT网格并通过光度监督联合优化高斯参数与网格形变，将形变反传回更新CT，弥合手术视频与体数据鸿沟。在活体猪内脏手术及人肝仿真合成数据上验证，能从单目RGB数据获得合理的术前CT形变（未给出具体量化指标）。

> **要点**：CT与非刚性高斯泼溅双向耦合实现可变形术中导航，术前CT随术中形变更新。


#### 51. PERSEUS：语义内窥镜理解与SLAM的感知流水线

*PERSEUS: Perception with Semantic Endoscopic Understanding and SLAM*

**arXiv（预印本）** · 2025-09-16 · 方法开发研究（分割+SLAM） · [arXiv 2509.13541](https://arxiv.org/abs/2509.13541)

面向自然腔道手术，提出整合学习型分割、深度估计与三维重建的感知流水线，生成实时分割的手术场景地图，并用机器人位姿配准解决单目建图的尺度模糊以支持语义化实时重建。结果显示重建精度达亚毫米级（单侧Chamfer距离），位姿配准RMSE 0.9 mm，估计尺度在真值2%以内。

> **要点**：语义分割+单目SLAM实现自然腔道手术亚毫米级实时重建，配准RMSE 0.9 mm。


#### 52. SCOPE：语音引导的手术场景分割协作感知框架

*SCOPE: Speech-guided COllaborative PErception Framework for Surgical Scene Segmentation*

**arXiv（预印本）** · 2025-09-12 · 框架开发+离体/实时验证 · [arXiv 2509.10748](https://arxiv.org/abs/2509.10748)

提出语音引导协作感知框架SCOPE，融合大语言模型（LLM）的推理与开集视觉基础模型（VFM）的感知，支持术中视频流中手术器械与解剖的即时分割、标注与跟踪；协作感知代理生成VFM分割候选并结合临床医生的直观语音反馈引导分割，器械随后作为交互指针标注其他场景元素。在公开Cataract1k子集与自建离体颅底数据集及实时离体模拟实验中验证。

> **要点**：LLM+开集VFM的语音引导协作感知实现免手动、术中实时手术场景分割与跟踪。


#### 53. 基于球面相似性学习与可微LM优化的术中2D/3D配准

*Intraoperative 2D/3D Registration via Spherical Similarity Learning and Differentiable Levenberg-Marquardt Optimization*

**arXiv（预印本）** · 2025-09-08 · 方法开发研究（配准） · [arXiv 2509.06890](https://arxiv.org/abs/2509.06890)

面向术中2D/3D配准（将术前3D体与实时2D射线片对齐以定位器械与植入物），在非欧球面特征空间进行相似性学习以更好拟合流形结构：用CNN-Transformer编码器提取特征投影到球面，并以双不变SO(4)空间的黎曼距离近似测地距离；推理时以可微Levenberg-Marquardt优化替代梯度下降加速收敛。在真实与合成数据集上于患者特定与患者无关场景均取得更优精度。

> **要点**：球面相似性学习+可微LM优化提升术中2D/3D配准精度与收敛速度。


#### 54. 用于肿瘤检测的振动声学方案的概念化与可行性验证

*Conceptualization and Feasibility Testing of a Vibro-Acoustic Solution for Tumor Detection*

**medRxiv/bioRxiv（预印本）** · 2025-08-28 · 预印本·体模可行性研究 · [DOI](https://doi.org/10.1101/2025.08.23.671745)

针对机器人末端执行器或狭腔手术中无法直接触诊肿瘤的问题，提出低频振动声学传感结合小波多层感知机(MLP)神经网络，将术中肿瘤检测转化为二分类。基于健康组织加肿瘤模型体模共120次实验，18例(15%)作测试集，准确率83.3%，传感器无需直接接触且可集成于探头末端。

> **要点**：术中非接触振动声学加MLP实现83.3%肿瘤检测准确率，补充触诊缺失。


#### 55. ColorGS：带彩色高斯泼溅的高保真手术场景重建

*ColorGS: High-fidelity Surgical Scene Reconstruction with Colored Gaussian Splatting*

**arXiv（预印本）** · 2025-08-26 · 方法开发研究（三维重建） · [arXiv 2508.18696](https://arxiv.org/abs/2508.18696)

针对3D高斯泼溅在手术场景中固定颜色难表达复杂纹理、线性形变难建模全局形变的问题，提出ColorGS：以带可学习颜色参数的动态锚点自适应编码空变纹理（彩色高斯基元），并设计增强形变模型（EDM）结合时间感知高斯基函数与可学习时不变形变以捕获局部与全局形变。在DaVinci机器人手术视频及EndoNeRF、StereoMIS基准上达SOTA，PSNR 39.85（较此前3DGS方法高1.5）、SSIM 97.25%，并保持实时渲染。

> **要点**：ColorGS彩色高斯泼溅高保真重建可变形手术场景，PSNR 39.85、SSIM 97.25%，支持术中/AR。


#### 56. 融合尺度感知深度预测与感知先验的单目内镜位姿估计与组织重建

*Unifying Scale-Aware Depth Prediction and Perceptual Priors for Monocular Endoscope Pose Estimation and Tissue Reconstruction*

**arXiv（预印本）** · 2025-08-15 · 方法学/内镜三维重建与位姿估计 · [arXiv 2508.11282](https://arxiv.org/abs/2508.11282)

面向单目微创手术导航，提出统一框架整合尺度感知深度预测(MAPIS-Depth模块,结合Depth Pro与Depth Anything及L-BFGS-B优化)与时序约束感知精炼(RAFT光流+LPIPS融合)，并用WEMA-RTDL模块配准，最终经TSDF体素融合与marching cubes提取三维网格。在HEVD与SCARED数据集上经消融与对比实验验证，优于现有SOTA方法。

> **要点**：统一框架实现单目内镜尺度感知深度与组织三维重建以增强术中导航


#### 57. 脑肿瘤切除多模态图像配准挑战赛(ReMIND2Reg 2025)

*The Brain Resection Multimodal Image Registration (ReMIND2Reg) 2025 Challenge*

**arXiv（预印本）** · 2025-08-13 · 挑战赛/基准数据集(图像引导神经外科) · [arXiv 2508.09649](https://arxiv.org/abs/2508.09649)

针对脑肿瘤手术中因脑移位导致术中神经导航精度下降，该挑战赛提供迄今最大公开基准，含99例训练、5例验证与10例私有测试，配对3D ceT1 MRI、T2 MRI与切除后3D术中超声(iUS)体积。以目标配准误差(TRE)、最差地标错位稳健性(TRE30)与运行时间为评价指标，旨在推动术中多模态配准算法发展。

> **要点**：建立术中MRI-超声配准标准化基准以校正脑移位(99训练/5验证/10测试)


#### 58. EndoMatcher：面向机器人辅助手术的多域预训练可泛化内镜图像匹配器

*EndoMatcher: Generalizable Endoscopic Image Matcher via Multi-Domain Pre-training for Robot-Assisted Surgery*

**arXiv（预印本）** · 2025-08-07 · 方法学/多域预训练(内镜图像匹配,服务重建与导航) · [arXiv 2508.05205](https://arxiv.org/abs/2508.05205)

针对内镜图像弱纹理、大视角变化与标注稀缺，提出经大规模多域预训练的可泛化匹配器EndoMatcher，采用双分支ViT提取多尺度特征并用双交互块学习稳健对应，构建首个多域内镜匹配数据集Endo-Mix6(约120万真实与合成图像对,六个域)并用渐进多目标训练。零样本下在Hamlyn与Bladder数据集上内点匹配数分别提升140.69%与201.43%，在Gastro-Matching上匹配方向预测准确率(MDPA)提升9.40%，服务三维重建与导航。

> **要点**：多域预训练实现零样本可泛化内镜稠密匹配以支撑重建与导航(内点+140%/+201%)


#### 59. 超越僵化AI：面向术中手术辅助的自然人机共生

*Beyond Rigid AI: Towards Natural Human-Machine Symbiosis for Interoperative Surgical Assistance*

**arXiv（预印本）** · 2025-07-30 · 方法学/定量与定性评估(术中交互式辅助) · [arXiv 2507.23088](https://arxiv.org/abs/2507.23088)

针对当代AI术中辅助方案依赖任务专用预训练、固定类别与显式手动提示的僵化性，提出感知智能体(Perception Agent)，融合语音集成的提示工程大语言模型(LLM)、SAM与任意点跟踪基础模型，实现术中实时自然人机交互。通过记忆库与两种分割未见元素的新机制，可交互分割已知与未见的器械/幻影移植物/纱布并记忆新元素供未来手术；在公开数据集上定量表现与更费力的手动提示策略相当。

> **要点**：语音+LLM驱动感知智能体实现术中自然交互式实时分割辅助


#### 60. PIVOTS：面向肝脏导航的术前到术中体到面配准

*PIVOTS: Aligning unseen Structures using Preoperative to Intraoperative Volume-To-Surface Registration for Liver Navigation*

**arXiv（预印本）** · 2025-07-27 · 方法学/合成与真实数据验证(术中肝脏配准导航) · [arXiv 2507.20337](https://arxiv.org/abs/2507.20337)

为AR引导腹腔镜肝脏手术融合术前肿瘤与血管信息，提出直接以点云为输入预测形变的神经网络PIVOTS，其几何特征编码器实现多分辨率特征提取，解码器含新颖形变感知交叉注意力模块以实现术前术中信息交互与多层位移预测。在生物力学仿真管线生成的合成数据上训练并在合成与真实数据上验证，配准性能优于基线，对高噪声、大形变与不同术中可见度稳健。

> **要点**：体到面配准网络预测术中肝脏形变以增强AR腹腔镜导航


#### 61. 手术环境下面部关键点定位性能评估

*Evaluation of facial landmark localization performance in a surgical setting*

**arXiv（预印本）** · 2025-07-24 · 实验/体模(手术环境面部关键点定位) · [arXiv 2507.18248](https://arxiv.org/abs/2507.18248)

面部检测算法在神经外科、眼科与整形外科中用于患者识别与精确定位，但受可变光照与检测位姿影响。实验用自动调整位姿的机械臂在手术灯与体模固定条件下测试MediaPipe面部关键点检测算法，结果表明手术照明下改进的检测精度在较大偏航与俯仰角显著提升检测性能，而部分关键点的不精确检测导致标准差/离散度增大。

> **要点**：评估MediaPipe面部关键点在手术照明与大角度下的定位性能


#### 62. EndoControlMag：稳健的内镜血管运动放大

*EndoControlMag: Robust Endoscopic Vascular Motion Magnification with Periodic Reference Resetting and Hierarchical Tissue-aware Dual-Mask Control*

**arXiv（预印本）** · 2025-07-21 · 方法学/免训练视频处理(内镜手术可视化) · [arXiv 2507.15292](https://arxiv.org/abs/2507.15292)

为可视化内镜手术中细微血管运动以提升手术精度与决策，提出免训练、基于拉格朗日的掩码条件血管运动放大框架EndoControlMag，含周期性参考重置(PRR)防止误差累积并保持时序一致，以及分层组织感知放大(HTM)双掩码控制(运动软化或距离指数衰减)以适应复杂组织形变与不可靠光流。在含四种手术类型的EndoVMM24数据集及遮挡、器械干扰、视角变化等挑战场景下，定量指标、视觉评估与外科专家评价均显著优于现有方法。

> **要点**：免训练血管运动放大增强内镜手术细微血管可视化


#### 63. X-RAFT：神经外科蓝光与白光高光谱图像的跨模态非刚性配准

*X-RAFT: Cross-Modal Non-Rigid Registration of Blue and White Light Neurosurgical Hyperspectral Images*

**arXiv（预印本）** · 2025-07-10 · 方法学研究/深度学习(预印本) · [arXiv 2507.07747](https://arxiv.org/abs/2507.07747)

面向荧光引导神经外科的定量荧光测量需求，提出改进的RAFT光流模型X-RAFT，用于蓝光(荧光)与白光(反射)两种极端光照下高光谱图像的密集跨模态配准；采用各模态独立编码器并以流循环一致性自监督微调。相比朴素基线各项评估指标误差降低36.6%，相比现有跨模态方法CrossRAFT降低27.83%。

> **要点**：改进RAFT实现术中蓝/白光高光谱跨模态配准，误差较基线降36.6%。


#### 64. 眼科手术中眼球注视方向的稳定跟踪

*Stable Tracking of Eye Gaze Direction During Ophthalmic Surgery*

**arXiv（预印本）** · 2025-07-01 · 方法学研究/机器学习(预印本) · [arXiv 2507.00635](https://arxiv.org/abs/2507.00635)

针对眼科手术机器人术前导航仍依赖人工的问题，提出结合机器学习与传统算法的眼球定位与跟踪方法，无需关键点/人脸检测即可在变化光照与阴影下稳定检测虹膜并估计注视。真实世界实验显示眼球朝向估计的平均误差为0.58度，基于所算朝向的机械臂运动平均控制误差为2.08度。

> **要点**：ML+传统算法实现眼科手术注视跟踪，朝向误差0.58度、机械臂控制误差2.08度。


#### 65. 拓扑约束学习用于高效腹腔镜肝脏标志点检测

*Topology-Constrained Learning for Efficient Laparoscopic Liver Landmark Detection*

**arXiv（预印本）** · 2025-07-01 · 方法学研究/深度学习(预印本) · [arXiv 2507.00519](https://arxiv.org/abs/2507.00519)

提出拓扑约束学习框架TopoNet用于腹腔镜肝脏手术标志点检测，采用snake-CNN双路径编码器同时捕捉RGB纹理与深度拓扑结构，设计边界感知拓扑融合(BTF)模块自适应融合RGB-D特征，并嵌入含中心线约束与拓扑持续性损失的拓扑约束损失以保证预测与标签的同伦等价。在L3D与P2ILF数据集上实现优异的精度与计算复杂度，具腹腔镜肝脏手术临床应用潜力，为术中引导服务。

> **要点**：拓扑约束的snake-CNN实现腹腔镜肝脏术中标志点检测，服务术中引导。



### （二）手术视频理解与技能评估（142 篇）

#### 1. 手术中点追踪：2025红外手术纹身挑战赛(STIRC2025)

*Point Tracking in Surgery--The 2025 Surgical Tattoos in Infrared Challenge (STIRC2025)*

**arXiv（预印本）** · 2026-07-14 · 挑战赛/基准评测报告 · [arXiv 2607.12939](https://arxiv.org/abs/2607.12939)

介绍MICCAI EndoVis 2025框架下的手术点追踪挑战赛，基于STIR(surgical tattoos in infrared)数据集从准确率与效率(推理延迟)两方面评测算法，覆盖in vivo与ex vivo序列。共7支团队参赛，论文汇总各队方法与结果，数据集与基线代码已开源。

> **要点**：建立手术点追踪的标准化红外基准，服务分割/三维重建/自主操作等下游任务。


#### 2. 基于弱监督的手术视频高效标注主动学习框架

*Active Learning for Efficient Annotation of Surgical Videos with Weak Supervision*

**arXiv（预印本）** · 2026-07-14 · 方法学研究（弱监督/主动学习深度学习框架，手术器械分割） · [arXiv 2607.13237](https://arxiv.org/abs/2607.13237)

针对腹腔镜手术视频时空标注耗时且需专家的问题，提出人在回路的主动学习+双损失优化框架：用基础模型(foundation model)从视频生成时序一致的类激活图(CAM)，结合视频级器械存在标签的弱监督损失与人工修正掩码的图像级损失，迭代产生伪掩码引导专家精修。实验表明训练结束时较全手工标注减少约50%的手术视频标注工作量，无需大规模全标注数据集即可实现手术器械分割模型的可扩展开发。

> **要点**：人在回路主动学习+基础模型将腹腔镜手术器械标注工作量降低约50%。


#### 3. 面向开放词表内窥镜组合指代分割的属性检索方法

*Attribute Retrieving for Open-Vocabulary Endoscopic Compositional Referring Segmentation*

**arXiv（预印本）** · 2026-07-09 · 基准构建+方法开发 · [arXiv 2607.08397](https://arxiv.org/abs/2607.08397)

针对内窥镜指代图像分割标注稀缺、图文关系复杂的问题，构建大规模基准ReferEndoscopy并提出AR-ERIS框架，利用属性检索实现开放词表组合指代分割。方法在ReferEndoscopy上预训练，在仿真与真实内窥镜数据上均达SOTA并具强泛化(未给具体数值)。

> **要点**：属性检索驱动的开放词表内窥镜指代分割，提升细粒度文本线索理解。


#### 4. DeGenseGS：4D高斯溅射中几何与语义解耦的手术场景理解

*DeGenseGS: Geometrically and Semantically Decoupled Surgical Scene Understanding in 4D Gaussian Splatting*

**arXiv（预印本）** · 2026-07-06 · 方法开发+CholecSeg8k/EndoVis18实验 · [arXiv 2607.04761](https://arxiv.org/abs/2607.04761)

针对将视觉语言模型刚性耦合入可变形场导致语义与解剖错位的问题，提出DeGenseGS框架，独立建模语义演化与几何变形：以HexPlane时空模块用共享运动学隐变量同步语义突变、并显式解耦语义更新与几何变形，配合光栅化原生语义提取与角度对齐优化。在CholecSeg8k与EndoVis18上达SOTA(未给具体数值)，在剧烈组织变形下实现空间连续分割。

> **要点**：几何-语义解耦的4D GS实现自主手术交互所需的稳健场景理解。


#### 5. HyperVLP：双曲空间中增强的层级手术视频-语言预训练

*HyperVLP: Enhancing Hierarchical Surgical Video-Language Pre-training in Hyperbolic Space*

**arXiv（预印本）** · 2026-06-30 · 方法开发+多基准评测 · [arXiv 2606.31245](https://arxiv.org/abs/2606.31245)

针对手术视觉语言基础模型将叙述(动作)、小节标题(关键步骤)、摘要(全局背景)等多层级信号压入单一平坦嵌入、忽略跨层语义包含的问题，提出双曲空间手术视频-语言预训练框架，缓解程序背景引起的结构性假负例并强化父phase与子step的语义一致。在多个手术基准上跨术式、跨机构的零样本/少样本phase识别均取得一致提升(未给具体数值)。

> **要点**：双曲空间保留层级结构，提升跨机构手术阶段识别的零/少样本表现。


#### 6. 手术视频中稀疏功能性标志点定位的稠密结构先验

*Dense Structural Priors for Sparse Functional Landmark Localization in Surgical Videos*

**arXiv（预印本）** · 2026-06-30 · 方法开发+多数据集(7,867片段/60视频) · [arXiv 2606.31007](https://arxiv.org/abs/2606.31007)

利用SAM 3作为结构先验，以零样本点提示掩码为器械提供稠密上下文，配合轻量精修框架(粗多帧网络预测tip/anchor提示、与视觉及热图特征融合)实现动作感知的功能性标志点定位，无需人工像素级掩码标注。在来自YouTube、Cholec80、HeiChole、SurgVU、CRCD共60个手术视频的7,867个片段上评测，tip定位F1达72.4%、anchor达58.0%。

> **要点**：以SAM 3结构先验实现无像素标注的动作感知器械标志点定位。


#### 7. 挑战条件下稳健手术多任务学习的时序一致标签插值

*Temporally Consistent Label Interpolation for Robust Surgical Multi-Task Learning under Challenging Conditions*

**arXiv（预印本）** · 2026-06-25 · 方法开发+多基准评测 · [arXiv 2606.26634](https://arxiv.org/abs/2606.26634)

针对手术多任务学习中标注粒度失配(时序任务需密集帧级、像素级空间任务仅稀疏关键帧标注)的问题，提出FAROS流引导标签插值框架，结合零样本分割掩码传播与光流估计，在遮挡、烟雾、运动模糊下从稀疏关键帧生成时序一致的稠密伪标签。先在DAVIS 2017稀疏真值协议下验证传播稳健性，再在GraSP、MISAW、AutoLaparo上显著提升phase/step识别、anticipation、器械分割与动作识别的跨任务表现(未给具体数值)。

> **要点**：流引导稠密伪标签平衡时序与空间监督，增强手术场景多任务理解。


#### 8. SurgAtlas：含2,391小时开放与微创手术的大规模手术视频-语言数据集

*SurgAtlas: A Large-Scale Surgical Video-Language Dataset with 2,391 Hours of Open and Minimally Invasive Surgery*

**arXiv（预印本）** · 2026-06-24 · 大规模数据集构建+基础模型微调 · [arXiv 2606.25905](https://arxiv.org/abs/2606.25905)

发布迄今最大手术视频-语言数据集SurgAtlas，含15,291段视频(2,391小时)、覆盖18个外科专科与5,000+术式，全部源自公开YouTube，并首次大规模纳入开放手术(6,182段开放+9,000+微创)、首建开放手术视频理解标准基准。经LLM增强的自动多层流水线生成段级/步骤/phase描述与推理型问答，微调Qwen3-VL-8B在phase识别、triplet检测、推理问答等多基准达到有竞争力或SOTA表现。

> **要点**：首个大规模含开放手术的视频-语言数据集，支撑手术多模态基础模型。


#### 9. 机器人辅助手术中实时多模态活动感知的执行错误检测

*Real-Time Multimodal Activity-Aware Error Detection in Robot-Assisted Surgery*

**arXiv（预印本）** · 2026-06-22 · 方法开发+双数据集评测 · [arXiv 2606.23593](https://arxiv.org/abs/2606.23593)

提出统一的执行错误检测框架，融合视频、运动学与描述性文本提示，通过活动提示整合手势级活动、器械-物体交互与错误定义的层级语义，并引入基于手术活动标签预训练的活动感知视觉嵌入。在JIGSAWS与SAR-RARP50数据集上，F1较SOTA基线分别提升最高5%与16.6%。

> **要点**：融合视频/运动学/文本的多模态框架显著提升手术执行错误检测。


#### 10. 腹腔镜镜头导航自动化评估标准的专家共识

*Expert Consensus on Criteria for the Automated Assessment of Laparoscopic Camera Navigation*

**arXiv（预印本）** · 2026-06-22 · 专家共识调查(n=23)+CV就绪度分析 · [arXiv 2606.23131](https://arxiv.org/abs/2606.23131)

针对腹腔镜镜头导航(LCN)评估依赖人工、难以规模化的问题，构建含14个关键方面(取景构图、可见清晰度、方向稳定、运动动态、安全意识)的分类体系，逐项评估计算机视觉自动测量的技术就绪度，并对23名外科医生做5点Likert重要性调查。视野、聚焦与居中被评为最重要，作者据此绘制'临床重要性vs.CV技术就绪度'矩阵，为AI驱动的自动技能评估划定路线图。

> **要点**：对齐外科医生优先级与CV能力，规划腹腔镜镜头导航的自动技能评估。


#### 11. DBT-Bleed：关键帧选择双分支时序建模的手术出血检测

*DBT-Bleed: Dual-Branch Temporal Modeling with Key-Frame Selection for Surgical Bleeding Detection*

**arXiv（预印本）** · 2026-06-22 · 方法开发+MultiBypass/EndoPit-IAE评测 · [arXiv 2606.22829](https://arxiv.org/abs/2606.22829)

针对术中出血(IAE)易与残留血液混淆、长视频时序建模计算量大的问题，提出DBT-Bleed双分支多尺度时序框架(分离出血/正常表征、层级时序适配器)与HiRED分层熵驱动选帧策略。在MultiBypass数据集上出血检测F1、Recall、MCC分别较视频级基线提升6.53%、5.62%、9%；在新建神经外科数据集EndoPit-IAE(首个神经外科IAE标注集)上零样本迁移F1提升6%、MCC提升8%。

> **要点**：双分支时序建模+熵驱动选帧提升出血检测并具跨术式泛化。


#### 12. 基于基础表征上下文学习的手术解剖结构识别

*Surgical Anatomy Recognition with Context Learning using Foundation Representations*

**arXiv（预印本）** · 2026-06-20 · 数据集(120k帧)+模型开发 · [arXiv 2606.22124](https://arxiv.org/abs/2606.22124)

面向微创手术解剖结构识别，构建大规模片段级语义分割数据集ATLAS-120k(来自100个手术视频、14种术式、含腹腔镜与机器人手术的120,000+标注帧)，并提出视频语义分割模型ATLAS，利用基础模型嵌入结合轻量时序推理引入术式类型、手术phase与短时视觉记忆等上下文线索，实现时序一致且实时可行的解剖识别，数据集与模型已开源。

> **要点**：大规模数据集与上下文感知模型推进微创手术解剖结构识别。


#### 13. 经动作驱动数字孪生的手术室片段推理式文本到视频检索

*Reasoning Text-to-Video Retrieval for Operating Room Clips via Action-Driven Digital Twins*

**arXiv（预印本）** · 2026-06-15 · 方法开发+基准构建 · [arXiv 2606.17298](https://arxiv.org/abs/2606.17298)

面向手术室(OR)安全，提出文本到视频检索方法OR3，将片段转为动作驱动数字孪生(ActDTs，把并发的主体-动作-客体三元组归入不重叠时间区间)，并以LLM从查询想象假设ActDT做单编码器同模态匹配，再以证据接地精修修正想象结果。基于MM-OR构建含276条隐式查询、跨四类推理、覆盖386段机器人膝手术片段的基准，OR3达R@1 57.6、R@5 77.3，优于最强基线。

> **要点**：动作驱动数字孪生+LLM想象实现OR安全事件的推理式视频检索。


#### 14. 以对象token桥接机器人手术中的分割与视觉问答

*Object Tokens as a Bridge Between Segmentation and Visual Question Answering in Robotic Surgery*

**arXiv（预印本）** · 2026-06-14 · 方法开发+RAMIE/EndoVis18评测 · [arXiv 2606.15861](https://arxiv.org/abs/2606.15861)

针对机器人手术VQA多依赖边界框等粗粒度视觉grounding的问题，提出在单一框架内联合像素级分割与VQA：将VLM与基于SAM的解码器结合、以VLM生成的对象token表示场景元素，token既引导答案预测又投射至SAM解码器产生分割掩码，并经分割与问答双目标优化学习空间接地表征。在私有RAMIE(机器人辅助微创食管切除)与公开EndoVis18数据集上均稳定优于基线。

> **要点**：对象token统一分割与VQA，增强机器人手术细粒度场景理解。


#### 15. 手术视频中解剖感知目标检测的高斯空间先验

*Gaussian Spatial Priors for Anatomy-Aware Object Detection in Surgical Videos*

**arXiv（预印本）** · 2026-06-13 · 方法开发+5折交叉验证 · [arXiv 2606.15049](https://arxiv.org/abs/2606.15049)

面向腹股沟疝修补术中肌耻骨孔关键安全视野(CVMPO)等术中安全框架，针对腹壁下血管等小结构因视觉模糊、间歇可见而难检的问题，提出高斯空间先验(GSP)模块，将结构间受解剖约束的空间关系编码为紧凑参数化偏置注入DAB-DETR解码器自注意力(离线从标注估计、每层随迭代参考点重算)。在腹股沟疝修补视频上5折交叉验证，依赖类检测AP50较DAB-DETR提升33.5%、较YOLOv26提升53.9%，锚点检测提升6.0%，各折均显著(p=0.012，配对t检验)。

> **要点**：高斯空间先验编码解剖约束，大幅提升术中小结构检测。


#### 16. SurfSurg6D：无纹理手术器械6D位姿估计的几何一致稠密对应

*SurfSurg6D: Geometry Consistent Dense Correspondence for Textureless Surgical Instrument Pose Estimation*

**arXiv（预印本）** · 2026-05-25 · 数据集+方法开发，多数据集评测 · [arXiv 2605.25598](https://arxiv.org/abs/2605.25598)

针对手术器械位姿估计中高精度、遮挡、无纹理、缺深度、标注稀少等难题，构建合成数据集SynSurg6D并提出稠密对应框架SurfSurg6D。在SurgRIPE、EndoVis2018、SurgPose数据集上，SynSurg6D的引入丰富了位姿分布并提升已有方法，SurfSurg6D超越现有方法，实现仅用RGB的精确高效位姿估计（摘要未列具体数值）。

> **要点**：合成数据SynSurg6D+稠密对应框架提升无纹理手术器械RGB位姿估计，服务自主手术与技能评估。


#### 17. ExpOS：基于3D手部重建的可解释开放手术技能评估

*ExpOS: Explainable Open-Surgery Skills Assessment Using 3D Hand Reconstruction*

**arXiv（预印本）** · 2026-05-22 · 回顾性视频机器学习研究（221段视频） · [arXiv 2605.23653](https://arxiv.org/abs/2605.23653)

提出可解释开放手术技能评估框架ExpOS，直接从运动数据学习判别性时序模式并定位最具预测力的片段与行为。在221段医学生完成三项开放手术任务的视频上，提取手部姿态与器械检测得到运动学描述子，用时序卷积主干+注意力池化生成帧级重要性图并融合全局运动统计。框架与专家评分强相关，筋膜缝合任务表现最佳(r=0.778, R2=0.74)。

> **要点**：ExpOS弱监督时序重要性学习实现可解释技能评估，筋膜缝合与专家评分r=0.778。


#### 18. OSS：开放手术缝合技能视觉评估挑战赛(2024-2025)

*OSS: Open Suturing Skills Vision-Based Assessment Challenge 2024-2025*

**arXiv（预印本）** · 2026-05-21 · 挑战赛/基准报告 · [arXiv 2605.22200](https://arxiv.org/abs/2605.22200)

报告一项MICCAI挑战赛结果，聚焦开放手术技能的视觉评估：数据集为静态GoPro记录的干实验室开放缝合视频(附器械轨迹)，连办两年含技能四分类、预测八类OSATS评分、手/器械跟踪等任务。通用时空视频模型持续表现最强，OSATS细粒度预测仍具挑战但显著受益于更多训练数据，关键点跟踪因频繁遮挡与出画而困难。

> **要点**：开放手术缝合技能评估挑战赛，通用时空视频模型最优，细粒度OSATS与跟踪仍具挑战。


#### 19. SurgOnAir：层级感知的实时手术视频解说

*SurgOnAir: Hierarchy-Aware Real-Time Surgical Video Commentary*

**arXiv（预印本）** · 2026-05-20 · 方法+数据集开发 · [arXiv 2605.21132](https://arxiv.org/abs/2605.21132)

提出流式视觉-语言模型SurgOnAir，顺序处理帧、不访问未来信息，随视觉输入到达渐进生成解说token，实现细粒度帧到token的即时响应。基于自建层级数据集SurgOnAir-11k(动作/步骤/阶段三级监督)训练，生成多层级文本并用特殊过渡token显式标记工作流状态转换，实验显示其能统一多层级的实时手术流程理解并生成更优的层级感知解说。

> **要点**：流式VLM实现实时、层级感知的手术视频解说，可即时标记工作流转换。


#### 20. SurgicalMamba：状态重编程双路SSD的在线手术阶段识别

*SurgicalMamba: Dual-Path SSD with State Regramming for Online Surgical Phase Recognition*

**arXiv（预印本）** · 2026-05-14 · 方法开发+多基准评测 · [arXiv 2605.14889](https://arxiv.org/abs/2605.14889)

基于Mamba2结构化状态空间对偶(SSD)构建因果在线手术阶段识别模型SurgicalMamba，含分离长短期状态的双路SSD块、连续时间时间扭曲的强度调制步进、以及打开跨通道混合的每块Cayley旋转状态重编程，保持每帧O(d)成本。在7个公开SPR基准达SOTA：Cholec80准确率/Jaccard为94.6%/82.7%(较最强先前+0.7pp/+2.2pp)，AutoLaparo为89.5%/68.9%(+1.7pp/+2.0pp)，单GPU 238.74 fps。

> **要点**：SurgicalMamba以SSD兼顾在线SPR精度与效率，Cholec80达94.6%/82.7%、238.74fps。


#### 21. 面向统一手术场景理解：以MLLM桥接推理与定位（SurgMLLM）

*Towards Unified Surgical Scene Understanding:Bridging Reasoning and Grounding via MLLMs*

**arXiv（预印本）** · 2026-05-13 · 方法+数据集开发 · [arXiv 2605.13530](https://arxiv.org/abs/2605.13530)

提出统一手术场景理解框架SurgMLLM，微调多模态大语言模型联合建模阶段、器械-动作-目标(IVT)三元组与三元组-实体分割token，再将token时序聚合作为分割网络提示实现像素级定位，端到端联合语言推理与视觉定位损失训练。并构建CholecT45-Scene(为CholecT45扩充64,299帧像素级掩膜)，实验将三元组识别主指标AP_IVT由40.7%提升至46.0%，阶段识别与分割亦优于既有方法。

> **要点**：SurgMLLM统一推理与定位，AP_IVT由40.7%升至46.0%，提升上下文感知的手术场景理解。


#### 22. DenseTRF：面向手术场景稠密预测的纹理感知无监督表示适配

*DenseTRF: Texture-Aware Unsupervised Representation Adaptation for Surgical Scene Dense Prediction*

**arXiv（预印本）** · 2026-05-11 · 方法开发（自监督表示适配） · [arXiv 2605.11265](https://arxiv.org/abs/2605.11265)

针对手术计算机视觉稠密预测(分割、手术区域预测)因分布偏移泛化差的问题，提出自监督表示适配框架DenseTRF，利用槽注意力学习捕捉不变视觉结构的纹理感知表示，无监督适配到目标分布，并通过条件化稠密预测与模型融合实现。跨多种手术的实验显示较SOTA分割与测试分布适配方法提升跨分布泛化（摘要未列具体数值）。

> **要点**：DenseTRF以纹理感知槽注意力提升手术场景稠密预测的跨分布泛化。


#### 23. 稳定时序推理动力学以改进在线手术阶段识别

*Stabilizing Temporal Inference Dynamics for Online Surgical Phase Recognition*

**arXiv（预印本）** · 2026-05-11 · 方法开发（即插即用组件） · [arXiv 2605.16387](https://arxiv.org/abs/2605.16387)

指出在线手术阶段识别的时序不稳定源于早期误分类的错误级联与记忆缺失的逐帧决策，提出统一的训练-推理-评估框架：训练用时序错误级联(TEC)损失抑制误差起始与前向传播，推理用证据门控转换预测器(EGTP)仅在累积证据超阈时允许阶段切换，评估引入时序碎片化指数(TFI)。在Cholec80与AutoLaparo、3种主干上显著提升时序稳定性、减少预测碎片化，同时保持或略升逐帧性能。

> **要点**：以TEC损失+证据门控转换稳定在线SPR时序推理，减少碎片化而不损逐帧精度。


#### 24. 从关节运动学到路由视觉控制的动作条件手术视频生成

*From Articulated Kinematics to Routed Visual Control for Action-Conditioned Surgical Video Generation*

**arXiv（预印本）** · 2026-05-09 · 方法+基准开发 · [arXiv 2605.08712](https://arxiv.org/abs/2605.08712)

针对机器人手术中低维控制向量须精确支配复杂图像演化的难题，提出运动学到视觉的提升范式，将关节运动学转为五种图像对齐控制模态，并设计分层路由视觉控制框架按需激活最相关模态与运动尺度，配合运动学先验引导的路由损失与预算化训练/推理。构建含人机协同语义标注的新基准，实验在动作忠实度、视觉保真与跨域泛化上优于基线，高效变体大幅降低延迟。

> **要点**：分层路由视觉控制提升动作条件手术视频生成的动作忠实度与效率。


#### 25. OphEdit：无需训练的文本引导眼科手术视频编辑

*OphEdit: Training-Free Text-Guided Editing of Ophthalmic Surgical Videos*

**arXiv（预印本）** · 2026-05-08 · 方法开发（无训练视频编辑） · [arXiv 2605.07695](https://arxiv.org/abs/2605.07695)

提出首个无需训练的文本引导眼科手术视频编辑框架OphEdit，用确定性二阶ODE反演流水线捕获原视频的注意力Value张量，并在去噪阶段将其选择性注入条件CFG分支，从而严格保留眼部解剖几何、同时将文本语义修改映射到视频。临床评价显示其在器械替换、流程变化等复杂变换上较自然域视频编辑器具更优结构保真与时序一致，可低成本生成多样化带标注医学数据集。

> **要点**：OphEdit无需训练即可文本引导编辑眼科手术视频，保真生成合成数据集。


#### 26. 他们在手术室里看向哪里？——手术室注视跟随

*Where are they looking in the operating room?*

**arXiv（预印本）** · 2026-04-22 · 方法+数据集扩展 · [arXiv 2604.20574](https://arxiv.org/abs/2604.20574)

首次将注视跟随(推断个体注视方向)引入外科领域用于手术工作流分析，扩展4D-OR数据集并为Team-OR数据集补充注视跟随与团队沟通活动标注，提出仅用注视预测的热图法做临床角色与阶段识别、以自监督时空模型编码注视特征做团队沟通检测。在4D-OR与Team-OR上达SOTA：临床角色预测F1 0.92、手术阶段识别F1 0.95，团队沟通检测较此前最佳提升逾30%。

> **要点**：手术室注视跟随实现角色(F1 0.92)、阶段(F1 0.95)识别与团队沟通检测(+30%)。


#### 27. LLM生成文本能否赋能手术视觉-语言预训练？SurgLIME框架

*Can LLM-Generated Text Empower Surgical Vision-Language Pre-training?*

**arXiv（预印本）** · 2026-04-20 · 方法学研究/数据集与视觉-语言预训练框架 · [arXiv 2604.18134](https://arxiv.org/abs/2604.18134)

提出LIME大规模多模态数据集(来自开放手术视频、由LLM自动生成叙述文本，无需专家标注)与SurgLIME参数高效视觉-语言预训练框架(LoRA双编码器+置信度自适应降权噪声文本)。在AutoLaparo与Cholec80基准上，SurgLIME实现有竞争力的零样本跨模态对齐，同时保持视觉基础模型稳健的线性探测性能。

> **要点**：用LLM生成文本可低成本扩展手术视觉-语言预训练，且置信度加权可抑制幻觉噪声。


#### 28. 小切口白内障手术数据高效阶段分割：视觉基础模型的对照研究

*Data-Efficient Surgical Phase Segmentation in Small-Incision Cataract Surgery: A Controlled Study of Vision Foundation Models*

**arXiv（预印本）** · 2026-04-12 · 对照实验研究(手术阶段分割) · [arXiv 2604.10514](https://arxiv.org/abs/2604.10514)

在标签稀缺的手动小切口白内障手术(SICS)阶段分割中，固定同一时序模型(MS-TCN++)对比视觉编码器：有监督(ResNet-50、I3D)对比自监督基础模型(DINOv3、V-JEPA2)。数据集SICS-155(19个阶段)，DINOv3 ViT-7B取得最佳(83.4%准确率、87.0 edit score)，显示视觉基础模型对手术流程理解的强迁移性。

> **要点**：视觉基础模型特征在少标签手术视频中显著提升阶段分割，DINOv3最优。


#### 29. 机器人辅助手术器械分割的CNN与Transformer模型基准比较

*Benchmarking CNN- and Transformer-Based Models for Surgical Instrument Segmentation in Robotic-Assisted Surgery*

**arXiv（预印本）** · 2026-04-10 · 基准比较研究(器械分割) · [arXiv 2604.09151](https://arxiv.org/abs/2604.09151)

在SAR-RARP50数据集(真实根治性前列腺切除视频)上，对UNet、UNet++、DeepLabV3、Attention UNet、SegFormer五种架构进行多类语义分割基准比较，采用交叉熵+Dice复合损失应对类别不平衡。结果显示卷积模型(UNet、Attention UNet)基线稳健，DeepLabV3接近SegFormer，Transformer(SegFormer)全局上下文理解更强、泛化更好。

> **要点**：系统比较CNN与Transformer器械分割，DeepLabV3与SegFormer表现领先。


#### 30. 手术视频中器械交接的可解释视觉模型事件级检测

*Event-Level Detection of Surgical Instrument Handovers in Videos with Interpretable Vision Models*

**arXiv（预印本）** · 2026-04-08 · 方法学研究(时空事件检测) · [arXiv 2604.07577](https://arxiv.org/abs/2604.07577)

面向手术室器械交换监测，提出时空框架(ViT主干+单向LSTM+多任务)联合预测交接发生与交互方向，经峰值检测识别离散交接事件，并用Layer-CAM可解释归因。在肾移植手术数据集上，交接检测F1=0.84、方向分类平均F1=0.72，优于单任务变体与VideoMamba基线。

> **要点**：ViT+LSTM多任务框架实现器械交接事件检测(F1 0.84)与方向分类。


#### 31. UniSurgSAM：可靠手术视频分割的统一可提示模型

*UniSurgSAM: A Unified Promptable Model for Reliable Surgical Video Segmentation*

**arXiv（预印本）** · 2026-04-04 · 方法学研究(可提示视频分割) · [arXiv 2604.03645](https://arxiv.org/abs/2604.03645)

针对手术中需动态用视觉/文本/音频等异构提示指定目标，提出统一可提示视频目标分割模型UniSurgSAM：解耦两阶段框架(独立优化初始化与跟踪)，含存在感知解码抑制幻觉、边界感知长时跟踪防掩膜漂移、自适应状态转移实现失败恢复，并从4个公开手术数据集构建多模态多粒度基准。实验显示在所有提示模态与粒度上实时达到SOTA。

> **要点**：统一多模态可提示分割，抑制幻觉与掩膜漂移，实时SOTA。


#### 32. 解锁手术器械增量学习的正向迁移：自反思分层提示框架

*Unlocking Positive Transfer in Incrementally Learning Surgical Instruments: A Self-reflection Hierarchical Prompt Framework*

**arXiv（预印本）** · 2026-04-03 · 方法学研究(类增量分割) · [arXiv 2604.02877](https://arxiv.org/abs/2604.02877)

面向手术视频场景解析中器械类别增量分割，提出自反思分层提示框架，在冻结预训练模型上为新类自适应追加器械感知提示，用分层提示解析树实现正向前向迁移、用有向加权图传播的自反思精炼实现正向后向迁移以避免灾难性遗忘。适用于CNN与Transformer基础模型，在两个公开基准上分别较竞争方法提升大于5%与大于11%。

> **要点**：分层提示+自反思实现器械增量分割的双向正迁移，提升5%/11%以上。


#### 33. 面向单目腹腔镜视频免训练Agentic推理的4D表征

*A 4D Representation for Training-Free Agentic Reasoning from Monocular Laparoscopic Video*

**arXiv（预印本）** · 2026-04-01 · 方法学研究(免训练/Agentic) · [arXiv 2604.00867](https://arxiv.org/abs/2604.00867)

面向软组织手术AI的时空推理，提出基于显式4D表征的框架:用点跟踪、深度、分割构建时空一致的工具-组织语义4D模型，由多模态大模型(MLLM)作为智能体在其派生工具(如轨迹)上推理，无需微调。在新构建的134个临床相关问题数据集上，通用推理骨干+4D表征显著提升时空理解与4D grounding，展示可由2D MLLM与3D视觉模型组装出时空智能。

> **要点**：显式4D表征+MLLM智能体免训练实现手术视频时空推理与4D grounding。


#### 34. 为视觉-语言模型细粒度时空理解丰富手术视频数据集的方法

*An Approach to Enriching Surgical Video Datasets for Fine-Grained Spatial-Temporal Understanding of Vision-Language Models*

**arXiv（预印本）** · 2026-04-01 · 数据集构建与方法学研究 · [arXiv 2604.00784](https://arxiv.org/abs/2604.00784)

针对手术视觉-语言数据集缺乏细粒度交错时空动态，提出确定性生成流水线SurgSTU-Pipeline(时间与空间连续性过滤)，据此构建SurgSTU数据集:6711个视频片段、150k细粒度时空问答样本。评估显示通用VLM零样本吃力、经上下文学习可改善，在SurgSTU训练集微调的VLM在所有时空任务上表现最佳，验证数据集提升VLM手术视频时空理解的有效性。

> **要点**：确定性流水线构建150k时空QA数据集，微调VLM显著提升手术视频时空理解。


#### 35. 扩展手术基础模型的视频预训练：SurgRec

*Scaling Video Pretraining for Surgical Foundation Models*

**arXiv（预印本）** · 2026-03-31 · 方法学研究(基础模型预训练) · [arXiv 2603.29966](https://arxiv.org/abs/2603.29966)

提出可扩展可复现的手术视频预训练配方SurgRec(含SurgRec-MAE与SurgRec-JEPA两变体)，整理多源语料10,535个视频、2.145亿帧(涵盖内镜、腹腔镜、白内障、机器人手术)，并标准化跨16个下游数据集、四个临床域的可复现基准。相比SSL基线与视觉-语言模型持续取得更优性能；VLM在细粒度时序识别上不可靠且对提示措辞敏感。将全面开源。

> **要点**：大规模可复现手术视频预训练SurgRec在16个下游数据集上超越SSL与VLM基线。


#### 36. SurgTEMP：面向腹腔镜胆囊切除的时序感知手术视频问答

*SurgTEMP: Temporal-Aware Surgical Video Question Answering with Text-guided Visual Memory for Laparoscopic Cholecystectomy*

**arXiv（预印本）** · 2026-03-31 · 方法学研究+数据集(视频问答) · [arXiv 2603.29962](https://arxiv.org/abs/2603.29962)

提出多模态LLM框架SurgTEMP:查询引导的token选择构建分层视觉记忆(空间/时间记忆库)+手术能力递进(SCP)训练方案，建模变长手术视频。构建CholeVidQA-32K数据集(32K开放式问答、3855视频片段、约128小时腹腔镜胆囊切除)，按感知-评估-推理三层组织11类任务(器械/动作/解剖感知、CVS安全视野、术中难度、技能熟练度、不良事件等)。相比SOTA开源多模态与视频LLM(微调及零样本)取得显著提升。

> **要点**：分层视觉记忆+能力递进训练推进手术视频问答，并发布128小时CholeVidQA-32K。


#### 37. CoRe-DA：手术技能评估无监督域适应的对比回归

*CoRe-DA: Contrastive Regression for Unsupervised Domain Adaptation in Surgical Skill Assessment*

**arXiv（预印本）** · 2026-03-31 · 方法学研究+基准(UDA回归) · [arXiv 2603.29666](https://arxiv.org/abs/2603.29666)

面向基于视觉的手术技能评估(SSA)回归的跨任务/环境泛化差，建立首个SSA回归无监督域适应(UDA)基准(4数据集，涵盖干实验室/临床、开放/机器人手术)，评估8个代表模型，并提出对比回归适应框架CoRe-DA(相对分数监督+目标域自训练学习域不变表征)。不使用任何目标域标签，在干实验室与临床目标集上Spearman相关系数分别达0.46与0.41，优于SOTA。

> **要点**：首个SSA-UDA基准与CoRe-DA框架，无目标标签实现跨域技能评估(Spearman 0.46/0.41)。


#### 38. SHANDS：面向医学培训的手术手势与错误识别多视角数据集与基准

*SHANDS: A Multi-View Dataset and Benchmark for Surgical Hand-Gesture and Error Recognition Toward Medical Training*

**arXiv（预印本）** · 2026-03-27 · 数据集与基准(手势/错误识别) · [arXiv 2603.26400](https://arxiv.org/abs/2603.26400)

面向手术技能培训中专家评估昂贵难扩展，发布多视角视频数据集SHands:5台RGB相机采集线性切开与缝合，52名参与者(20专家、32学员)各完成3次标准化试验，帧级标注15个手势基元与8类学员错误类型的验证分类法。定义单视角/多视角/跨视角评估协议并基准SOTA深度模型，公开发布以支持稳健可扩展的手术培训AI。

> **要点**：发布含真实学员错误的多视角手术手势数据集与基准，支撑自动化技能评估。


#### 39. 基于多模态图像融合的眼科手术实时场景理解

*Towards Comprehensive Real-Time Scene Understanding in Ophthalmic Surgery through Multimodal Image Fusion*

**arXiv（预印本）** · 2026-03-26 · 方法学研究(多模态融合) · [arXiv 2603.25555](https://arxiv.org/abs/2603.25555)

面向眼科手术OPMI(手术显微镜)与实时术中OCT(iOCT)两种互补模态，提出多模态、时序、实时网络:交叉注意力融合OPMI(YoloNAS)与iOCT(CNN)特征、区域循环模块利用时序，联合器械检测、关键点定位与工具-组织距离估计。器械定位/关键点检测达95.79% mAP50，实时22.5ms/帧；近视网膜(小于1mm)距离估计精度由仅OPMI的284微米提升至多模态的33微米。

> **要点**：OPMI+iOCT融合实现实时器械跟踪与近视网膜工具-组织距离精度33微米。


#### 40. 未见手术器械的免训练检测与6D位姿估计

*Training-free Detection and 6D Pose Estimation of Unseen Surgical Instruments*

**arXiv（预印本）** · 2026-03-26 · 方法学研究(免训练6D位姿) · [arXiv 2603.25228](https://arxiv.org/abs/2603.25228)

面向计算机辅助介入中新/未见器械缺乏灵活性与标注，提出仅需带纹理CAD模型先验的免训练多视角6D位姿估计流水线:各视角生成掩膜提议并与渲染模板打分、跨视角匹配三角化为3D候选并用多视几何一致性过滤;再迭代精化位姿假设、以特征度量得分与跨视注意力评分，最后用遮挡感知轮廓配准精化。在真实手术MVPSP数据集上达到毫米级、与有监督方法相当，同时完全泛化到未见器械。

> **要点**：仅凭CAD先验免训练实现未见器械毫米级6D位姿估计，媲美有监督方法。


#### 41. SurgPhase：经交互式网页平台的高效垂体瘤手术阶段识别

*SurgPhase: Time efficient pituitary tumor surgery phase recognition via an interactive web platform*

**arXiv（预印本）** · 2026-03-26 · 方法学研究+平台(阶段识别) · [arXiv 2603.24897](https://arxiv.org/abs/2603.24897)

提出结合自监督表征学习、稳健时序建模与可扩展标注的垂体瘤手术(PTS)阶段识别框架:在251个未标注PTS视频上自监督预训练ResNet-50，在81个已标注手术上以focal loss、渐进解冻、动态采样微调，held-out测试达90%准确率，优于当前SOTA。核心贡献是供外科医生上传视频、获取自动阶段分析并扩充数据集的协作在线平台。

> **要点**：自监督+交互平台实现垂体瘤手术阶段识别90%准确率并促进数据众筹。


#### 42. CliPPER：面向事件识别的长时术中手术视频-语言预训练

*CliPPER: Contextual Video-Language Pretraining on Long-form Intraoperative Surgical Procedures for Event Recognition*

**arXiv（预印本）** · 2026-03-25 · 方法学研究(视频-语言预训练) · [arXiv 2603.24539](https://arxiv.org/abs/2603.24539)

面向术中手术领域标注稀缺、需精细时序理解，提出在手术讲座视频上训练的视频-语言预训练框架CliPPER，引入上下文视频-文本对比学习(VTC_CTX)、片段顺序预测(COP)、视频内循环一致对齐及帧-文本匹配(FTM)以增强长时多模态对齐。在多个公开手术基准上取得新SOTA，包括阶段、步骤、器械、三元组的零样本识别。已开源。

> **要点**：长时手术视频-语言预训练在阶段/步骤/器械/三元组零样本识别上创SOTA。


#### 43. 从视频时序映射手术的视觉-语言模型与平台(Halsted)

*A vision-language model and platform for temporally mapping surgery from video*

**arXiv（预印本）** · 2026-03-23 · 方法学研究+平台(VLM) · [arXiv 2603.22583](https://arxiv.org/abs/2603.22583)

面向手术映射对制定操作指南与自主机器人手术的基础意义，提出视觉-语言模型Halsted，训练于Halsted手术图谱(HSA，经迭代自标注生长、涵盖8个外科专科逾650,000个视频)，并公开子集HSA-27k。Halsted在映射手术活动上超越既往SOTA且更全面高效，配套Halsted网页平台可在数分钟内为全球外科医生自动映射其手术，弥合手术AI转化鸿沟、迈向自主机器人手术。

> **要点**：65万+视频训练的Halsted VLM超越SOTA映射手术活动，并经网页平台落地。


#### 44. CataractSAM-2：前节手术分割与可扩展真值标注的领域适配模型

*CataractSAM-2: A Domain-Adapted Model for Anterior Segment Surgery Segmentation and Scalable Ground-Truth Annotation*

**arXiv（预印本）** · 2026-03-23 · 方法学研究(领域适配分割+标注) · [arXiv 2603.21566](https://arxiv.org/abs/2603.21566)

提出Meta SAM 2的领域适配版CataractSAM-2，用于白内障眼科手术视频的高精度实时语义分割，服务机器人辅助与计算机引导手术的术中感知;并引入结合稀疏提示与视频掩膜传播的交互式标注框架，大幅降低标注时间、可扩展生成高质量真值。模型对青光眼小梁切除术展现强零样本泛化，证实跨术式效用。已开源模型与标注工具。

> **要点**：SAM 2领域适配实现白内障手术实时分割并零样本泛化至青光眼术式。


#### 45. 智慧手术室：基于AI的手术纱布计数系统

*Smart Operation Theatre: An AI-based System for Surgical Gauze Counting*

**arXiv（预印本）** · 2026-03-21 · 系统开发(目标检测) · [arXiv 2603.20752](https://arxiv.org/abs/2603.20752)

为预防纱布遗留体内(Gossypiboma)，与新加坡中央医院合作开发基于YOLOv5的实时视频纱布计数系统，跟踪标注为In与Out的两个托盘上的纱布以确保术终无遗留。整合的人-纱布检测模型用11,000张图像训练(此前2800张、两个独立模型)，帧率由8 FPS提升至15 FPS并支持人工计数调整，提升实际手术中的准确性与可靠性。

> **要点**：YOLOv5实时纱布计数系统预防手术纱布遗留，帧率提升至15 FPS。


#### 46. PanORama：手术室多视角一致的全景分割

*PanORama: Multiview Consistent Panoptic Segmentation in Operating Rooms*

**arXiv（预印本）** · 2026-03-20 · 方法学研究(多视角全景分割) · [arXiv 2603.19920](https://arxiv.org/abs/2603.19920)

面向手术室(OR)杂乱、动态、高遮挡环境的空间理解，提出首个设计上即多视角一致的OR全景分割PanORama:在主干内单次前向建模跨视角交互，使视图一致性自然涌现而非事后精化。在MM-OR与4D-OR数据集上全景质量(PQ)大于70%、超越既往SOTA;且免标定(无需相机参数)、可在任意多视角配置下泛化到未见视点。

> **要点**：免标定多视角一致全景分割提升手术室空间理解(PQ大于70%)。


#### 47. SCISSR：涂鸦条件的交互式手术分割与精化

*SCISSR: Scribble-Conditioned Interactive Surgical Segmentation and Refinement*

**arXiv（预印本）** · 2026-03-19 · 方法学研究(交互式分割) · [arXiv 2603.18544](https://arxiv.org/abs/2603.18544)

面向手术场景中不规则形状、细结构、高光、遮挡致点/框提示不足，提出涂鸦可提示框架SCISSR:轻量Scribble Encoder将手绘涂鸦转为稠密提示嵌入供掩膜解码器，经纠错笔画迭代精化;仅训练轻量新增模块(Scribble Encoder、空间门控融合、LoRA适配器)而冻结主干，可从SAM 2迁移至SAM 3等。在EndoVis 2018达95.41% Dice(5轮交互)、跨域CholecSeg8k达96.30% Dice(3轮)，优于迭代点提示。

> **要点**：涂鸦提示交互分割在EndoVis2018/CholecSeg8k达95-96% Dice，优于点提示。


#### 48. 通用基础手术动作识别赋能技能评估与视觉-语言模型手术规划

*Generalized Recognition of Basic Surgical Actions Enables Skill Assessment and Vision-Language-Model-based Surgical Planning*

**arXiv（预印本）** · 2026-03-13 · 数据集+基础模型开发与下游验证 · [arXiv 2603.12787](https://arxiv.org/abs/2603.12787)

构建迄今最大的基础手术动作(BSA)数据集，含6个专科10类基础动作、逾11,000段视频片段，并训练通用基础动作识别基础模型，实验证明其跨专科、跨术式与不同身体部位的稳健性。下游应用包括前列腺切除术技能评估及用大型视觉-语言模型进行胆囊/肾切除动作规划，多国外科医生评估其规划解释文本具临床相关性。

> **要点**：稳健的基础手术动作理解可驱动技能评估与VLM手术动作规划。


#### 49. TemporalDoRA：面向稳健手术视频问答的时序参数高效微调

*TemporalDoRA: Temporal PEFT for Robust Surgical Video Question Answering*

**arXiv（预印本）** · 2026-03-10 · 方法学研究(PEFT，新数据集) · [arXiv 2603.09696](https://arxiv.org/abs/2603.09696)

针对手术视频问答(VideoQA)需时序定位又要对提问措辞变化稳健的问题，提出TemporalDoRA：在视觉编码器低秩瓶颈内插入轻量时序多头注意力，并仅对可训练低秩分支做权重分解。构建含6,424个片段-问题对、带改写Out-of-Template问题的结肠镜VideoQA数据集REAL-Colon-VQA，并在改为短片段的EndoVis18-VQA上验证，均提升Out-of-Template表现；消融证实低秩分支内时序混合是主要增益来源。

> **要点**：低秩分支内引入时序注意力提升手术/内镜视频问答的措辞鲁棒性。


#### 50. SurgFed：语言引导的多任务联邦学习用于手术视频理解

*SurgFed: Language-guided Multi-Task Federated Learning for Surgical Video Understanding*

**arXiv（预印本）** · 2026-03-10 · 方法学研究(联邦学习，多公开数据集) · [arXiv 2603.09496](https://arxiv.org/abs/2603.09496)

针对机器人辅助微创手术视频理解中组织多样性与任务异质性两大挑战，提出多任务联邦学习框架SurgFed，含语言引导通道选择(LCS)与语言引导超聚合(LHA)以增强跨站点跨任务个性化。在覆盖4类术式的5个公开数据集上进行手术场景分割与深度估计，性能优于SOTA方法(摘要未给具体数值)。

> **要点**：语言引导的多任务联邦学习提升跨中心手术场景分割与深度估计。


#### 51. TopoOR：手术室的统一拓扑场景表示

*TopoOR: A Unified Topological Scene Representation for the Operating Room*

**arXiv（预印本）** · 2026-03-10 · 方法学研究(手术室多模态场景建模) · [arXiv 2603.09466](https://arxiv.org/abs/2603.09466)

针对手术室场景图仅建模成对(二元)关系的局限，提出TopoOR将手术室多模态建模为高阶拓扑结构，把实体交互提升为高阶拓扑胞元以原生保留成对与群组关系，并设计高阶注意力保留流形结构与模态特异特征(融合3D几何、音频、机器人运动学)。在无菌破坏检测、机器人阶段预测、下一动作预判等任务上优于传统图与基于LLM的基线。

> **要点**：高阶拓扑场景表示提升手术室多模态安全推理与工作流预测。


#### 52. 手术视频中的免训练时序目标追踪

*Training-free Temporal Object Tracking in Surgical Videos*

**arXiv（预印本）** · 2026-03-08 · 方法学研究(免训练，公开数据集) · [arXiv 2603.07839](https://arxiv.org/abs/2603.07839)

面向腹腔镜胆囊切除(LC)视频中关键解剖结构与器械的在线定位追踪，利用预训练文生图扩散模型的目标定位能力免训练提取特征，并借鉴QKV注意力的亲和矩阵实现跨帧时序连续追踪，规避昂贵像素级标注与标签不一致。在公开CholecSeg8K上达到逐像素分类accuracy 79.19%、平均Jaccard 56.20%、平均F-Score 79.48%，优于对比方法。

> **要点**：扩散模型特征免训练实现手术视频器械与解剖的时序追踪。


#### 53. TrajPred：VLM中面向器械-组织交互识别的轨迹条件联合嵌入预测

*TrajPred: Trajectory-Conditioned Joint Embedding Prediction for Surgical Instrument-Tissue Interaction Recognition in Vision-Language Models*

**arXiv（预印本）** · 2026-03-07 · 方法学研究(公开数据集) · [arXiv 2603.06999](https://arxiv.org/abs/2603.06999)

针对视觉-语言模型在机器人手术器械-组织交互识别中时序利用不足、细粒度动作对齐不佳的问题，提出TrajPred：编码器械轨迹以引入时序运动线索，并以轨迹为条件用预测模块生成更好捕捉细粒度动作的视觉语义嵌入，辅以提示微调与动词改写。在公开腹腔镜基准CholecT50上提升Average Precision与Top-K准确率，可视化显示视觉-文本嵌入对齐改善。

> **要点**：轨迹条件嵌入提升VLM对手术器械-组织交互的细粒度识别。


#### 54. 从阶段定位到智能手术叙事

*From Phase Grounding to Intelligent Surgical Narratives*

**arXiv（预印本）** · 2026-03-05 · 方法学研究(CLIP多模态对齐) · [arXiv 2603.05732](https://arxiv.org/abs/2603.05732)

为自动生成手术时间线与叙事(介于模糊术后报告与耗时人工标注之间)，提出基于CLIP的多模态框架：用CLIP视觉编码器提取手术视频帧表示、文本编码器嵌入手势描述句于共享空间并微调对齐，训练后预测帧的手势与阶段以构建结构化手术时间线，减少术者人工审片标注。

> **要点**：CLIP对齐视频手势与文本叙述自动构建手术时间线。


#### 55. Geometry OR Tracker：通用几何化手术室追踪

*Geometry OR Tracker: Universal Geometric Operating Room Tracking*

**arXiv（预印本）** · 2026-02-28 · 方法学研究(公开基准) · [arXiv 2603.00560](https://arxiv.org/abs/2603.00560)

针对手术室(OR)世界尺度多视图3D追踪中相机标定与RGB-D配准不可靠导致跨视图不一致、融合"重影"的问题，提出两阶段Geometry OR Tracker：先用多视图度量几何矫正模块将不精确标定校正为单一全局尺度一致设置，再在统一OR世界系做遮挡鲁棒的3D点追踪。在MM-OR基准上，矫正前端使跨视图深度不一致较原始标定降低逾30倍，消融揭示标定质量与追踪精度的关系。

> **要点**：几何矫正前端将跨视图深度不一致降低30倍以提升手术室世界系追踪。


#### 56. 面向手术机器人的免训练时序分割：多模态最优传输(TASOT)

*Multimodal Optimal Transport for Training-free Temporal Segmentation in Surgical Robotics*

**arXiv（预印本）** · 2026-02-27 · 方法学研究（免训练/zero-shot手术阶段识别） · [arXiv 2602.24138](https://arxiv.org/abs/2602.24138)

提出TASOT免标注手术时序分割框架，无需任务标注或手术领域预训练；用DINOv3提取视觉特征、视觉语言模型生成时序描述并经CLIP编码，融入统一的非平衡Gromov-Wasserstein最优传输目标。在3个公开手术数据集与4个基准上，较最强zero-shot基线大幅提升：Cholec80 +18.9 F1、AutoLaparo +33.7、StrasByPass70 +23.7、BernByPass70 +4.5。

> **要点**：无需标注和手术领域预训练即可实现细粒度手术流程理解。


#### 57. SurgAtt-Tracker：基于时序候选重排与运动感知细化的在线手术注意力跟踪

*SurgAtt-Tracker: Online Surgical Attention Tracking via Temporal Proposal Reranking and Motion-Aware Refinement*

**arXiv（预印本）** · 2026-02-24 · 方法学研究（手术视频注意力跟踪+大规模基准） · [arXiv 2602.20636](https://arxiv.org/abs/2602.20636)

将手术视野引导建模为时空学习问题，把术者注意力表示为稠密热图，通过候选级重排与运动感知细化利用时序一致性进行跟踪；并构建大规模基准SurgAtt-1.16M。在多个手术数据集上取得SOTA性能，在遮挡、多器械干扰与跨域场景下具强鲁棒性，可为机器人视野规划与自动控镜提供逐帧引导信号。

> **要点**：注意力热图跟踪为微创手术提供可解释的逐帧视野引导。


#### 58. 基于YOLOv10的手术视频手部定位与左右手分类多任务框架

*YOLOv10-Based Multi-Task Framework for Hand Localization and Laterality Classification in Surgical Videos*

**arXiv（预印本）** · 2026-02-21 · 方法学研究（手术视频目标检测） · [arXiv 2602.18959](https://arxiv.org/abs/2602.18959)

提出基于YOLOv10的多任务框架，在创伤手术第一人称视频中同时定位手部并分类左右手，训练于Trauma THOMPSON Challenge 2025 Task 2数据集。左手分类准确率67%、右手71%，mAP[0.5:0.95]为0.33，并保持实时推理，展现术中部署潜力。

> **要点**：YOLOv10实现创伤手术视频中实时手部定位与左右手识别。


#### 59. Cholec80-port：面向鲁棒手术场景理解的几何一致套管口分割数据集

*Cholec80-port: A Geometrically Consistent Trocar Port Segmentation Dataset for Robust Surgical Scene Understanding*

**arXiv（预印本）** · 2026-02-19 · 数据集构建与验证研究 · [arXiv 2602.17060](https://arxiv.org/abs/2602.17060)

针对套管口(trocar port)持续遮挡腹腔镜视野、干扰几何类下游任务（拼接、三维重建、SLAM）的问题，基于Cholec80构建高保真套管口分割数据集Cholec80-port，并制定排除中央开口的端口-套筒掩膜标注SOP，统一清洗现有公开数据集。实验证明几何一致标注较单纯增大数据量更能提升跨数据集鲁棒性。

> **要点**：几何一致的套管口标注显著提升手术场景理解的跨数据集鲁棒性。


#### 60. SurgFusion-Net：面向手术技能评估的多样化自适应多模态融合网络

*SurgFusion-Net: Diversified Adaptive Multimodal Fusion Network for Surgical Skill Assessment*

**arXiv（预印本）** · 2026-02-18 · 方法学研究（多模态技能评估，含新临床数据集） · [arXiv 2603.00108](https://arxiv.org/abs/2603.00108)

提出SurgFusion-Net与散度调控注意力(DRA)融合RGB、光流与器械分割三模态用于机器人手术技能评估，并贡献两个临床数据集RAH-skill（37段视频27.9万帧机器人辅助子宫切除）与RARP-skill（33段视频7.07万帧机器人辅助根治性前列腺切除）。在JIGSAWS上SCC较近期基线提升LOSO 0.02、LOUO 0.04，在RAH-skill与RARP-skill分别提升0.0538与0.0493。

> **要点**：多模态自适应融合提升真实临床机器人手术的技能评估精度。


#### 61. ZEN：跨术式术中理解的可泛化基础模型

*A generalizable foundation model for intraoperative understanding across surgical procedures*

**arXiv（预印本）** · 2026-02-14 · 方法学研究（手术视频基础模型，多任务基准） · [arXiv 2602.13633](https://arxiv.org/abs/2602.13633)

提出术中手术视频理解基础模型ZEN，基于自监督多教师蒸馏，在超21种术式、逾400万帧上训练。在20项下游任务及全微调、冻结骨干、少样本、零样本设置下，ZEN持续优于现有手术基础模型并展现稳健的跨术式泛化能力。

> **要点**：单一基础模型实现跨术式、跨机构的术中手术视频统一理解。


#### 62. 面向密集手术器械计数的Chain-of-Look空间推理

*Chain-of-Look Spatial Reasoning for Dense Surgical Instrument Counting*

**arXiv（预印本）** · 2026-02-11 · 方法学研究（视觉推理器械计数，含新数据集） · [arXiv 2602.11024](https://arxiv.org/abs/2602.11024)

提出Chain-of-Look视觉推理框架，模仿人类顺序计数、沿连贯空间轨迹强制视觉链以提升密集场景器械计数准确性，并设计邻近损失建模密排器械的空间约束；同时发布含1,464张高密度器械图的SurgCount-HD数据集。实验表明其在密集手术器械计数上优于CountGD、REC等计数方法及Qwen、ChatGPT等多模态大模型。

> **要点**：空间链式推理提升手术室密集器械计数以保障患者安全。


#### 63. 面向视频的腹腔镜技能分析与评估基准(LASANA)

*A benchmark for video-based laparoscopic skill analysis and assessment*

**arXiv（预印本）** · 2026-02-10 · 数据集/基准构建研究 · [arXiv 2602.09927](https://arxiv.org/abs/2602.09927)

构建LASANA数据集，含1270段四类基础腹腔镜训练任务的立体视频，每段由三名评分者聚合的结构化技能评分及任务特定错误的二元标签，多数来自腹腔镜培训课程以反映自然技能差异。为技能评估与错误识别提供预定义数据划分及深度学习基线结果。

> **要点**：LASANA为视频化腹腔镜技能评估与错误识别提供标准基准。


#### 64. 多任务仿真中基于学习的手术凝视感知模型的数据中心设计

*Data-centric Design of Learning-based Surgical Gaze Perception Models in Multi-Task Simulation*

**arXiv（预印本）** · 2026-02-09 · 数据中心的实证研究（手术凝视感知建模） · [arXiv 2602.09259](https://arxiv.org/abs/2602.09259)

在da Vinci SimNow模拟器四项训练任务上采集配对的主动-被动多任务手术凝视数据集（主动凝视经VR眼动记录，视频复用采集观察者被动凝视），量化技能与模态差异并评估被动凝视替代术者监督的可行性。结果显示MSI-Net预测稳定且可解释，SalGAN不稳定；被动凝视训练可恢复相当部分的中级主动注意，且新手被动标注可近似中级被动目标。

> **要点**：众包被动凝视可作为手术凝视监督的可扩展替代来源。


#### 65. 基础模型下VLM引导迭代细化的手术图像分割(IR-SIS)

*VLM-Guided Iterative Refinement for Surgical Image Segmentation with Foundation Models*

**arXiv（预印本）** · 2026-02-09 · 方法学研究（语言驱动手术分割，公开数据集） · [arXiv 2602.09252](https://arxiv.org/abs/2602.09252)

提出IR-SIS迭代细化系统，接受自然语言描述，用微调SAM3做初始分割、以视觉语言模型检测器械并评估分割质量，经智能体工作流自适应选择细化策略并支持临床医生自然语言反馈交互；并从EndoVis2017/2018构建多粒度语言标注数据集。实验在域内与分布外数据上均达SOTA，医生交互带来额外提升。

> **要点**：首个具自适应自细化能力的语言驱动手术图像分割框架。


#### 66. CauCLIP：因果启发视觉语言建模弥合手术视频理解的仿真-真实鸿沟

*CauCLIP: Bridging the Sim-to-Real Gap in Surgical Video Understanding via Causality-Inspired Vision-Language Modeling*

**arXiv（预印本）** · 2026-02-06 · 方法学研究（手术阶段识别，域泛化） · [arXiv 2602.06619](https://arxiv.org/abs/2602.06619)

提出因果启发的视觉语言框架CauCLIP，利用CLIP在无目标域数据下学习域不变表示用于手术阶段识别，结合频域增强扰动域特有属性并保留语义结构、以因果抑制损失削弱非因果偏差。在SurgVisDom硬适应基准上大幅优于所有对比方法。

> **要点**：因果引导的视觉语言模型提升手术视频理解的域泛化能力。


#### 67. SurgMotion：面向手术视频通用理解的视频原生基础模型

*SurgMotion: A Video-Native Foundation Model for Universal Understanding of Surgical Videos*

**arXiv（预印本）** · 2026-02-05 · 方法学研究（手术视频基础模型，多基准） · [arXiv 2602.05638](https://arxiv.org/abs/2602.05638)

提出SurgMotion视频原生基础模型，基于V-JEPA将学习范式由像素级重建转向潜在运动预测，含运动引导潜在掩码预测、时空亲和自蒸馏与时空特征多样性正则三项创新；并构建迄今最大手术视频数据集SurgMotion-15M（3,658小时、50个来源、13个解剖区）。在17个基准上显著超越SOTA：EgoSurgery工作流识别F1提升14.6%、PitVis提升10.3%、CholecT50动作三元组mAP-IVT达39.54%。

> **要点**：潜在运动预测范式确立通用手术视频理解的新标杆。


#### 68. 手术室多视角视频的自监督无标定匿名化

*Self-Supervised Uncalibrated Multi-View Video Anonymization in the Operating Room*

**arXiv（预印本）** · 2026-02-02 · 方法学研究（手术室视频人物检测/匿名化） · [arXiv 2602.02850](https://arxiv.org/abs/2602.02850)

提出自监督多视角手术室视频匿名化框架，无需标注或相机标定，通过时序与多视上下文找回漏检的低分假阴性、以其为伪标签迭代微调全身检测器，再做全身姿态估计与自微调。在4D-OR模拟手术数据集与自建真实手术数据集上召回率超97%，并用伪标签训练出性能相当的实时全身检测器。

> **要点**：免标注免标定的自监督框架实现手术室视频>97%召回的隐私匿名化。


#### 69. 评估大型视觉-语言模型用于手术器械检测

*Evaluating Large Vision-language Models for Surgical Tool Detection*

**arXiv（预印本）** · 2026-01-23 · 方法学/基准评估(VLM) · [arXiv 2601.16895](https://arxiv.org/abs/2601.16895)

在GraSP机器人手术数据集上评估Qwen2.5、LLaVA1.5、InternVL3.5三种视觉-语言模型(VLM)检测手术器械的能力，涵盖零样本与LoRA参数高效微调两种设置。结果显示Qwen2.5在两种配置下检测性能均最优；相比开集检测基线Grounding DINO，Qwen2.5零样本泛化更强、微调性能相当，其中Qwen2.5器械识别更优、Grounding DINO定位更准。

> **要点**：Qwen2.5在手术器械检测上优于其他VLM，零样本泛化超过Grounding DINO。


#### 70. 面向手术中3D手部姿态估计的多视角流程与基准数据集

*A Multi-View Pipeline and Benchmark Dataset for 3D Hand Pose Estimation in Surgery*

**arXiv（预印本）** · 2026-01-22 · 方法学+基准数据集 · [arXiv 2601.15918](https://arxiv.org/abs/2601.15918)

提出无需领域微调、仅用现成预训练模型的多视角3D手部姿态估计流程，服务于外科技能评估、机器人辅助介入与工作流分析。构建含>68,000帧、3,000个手工标注2D手姿及三角化3D真值的手术基准数据集(模拟手术室录制)。方法较基线2D平均关节误差降低31%、3D每关节位置误差降低76%。

> **要点**：训练无关的多视角流程将手术3D手姿误差降低76%，并发布手术手姿基准。


#### 71. CurConMix+：分层手术工作流理解的统一时空框架

*CurConMix+: A Unified Spatio-Temporal Framework for Hierarchical Surgical Workflow Understanding*

**arXiv（预印本）** · 2026-01-18 · 方法学/DL+基准 · [arXiv 2601.12312](https://arxiv.org/abs/2601.12312)

面向手术动作三元组(器械-动作-解剖目标)识别，提出课程引导对比学习+结构化难样本采样与特征mixup，其时序扩展CurConMix+集成多分辨率时序Transformer(MRTT)自适应融合多尺度时序特征。并发布分层标注的腹腔镜左外叶切除新基准LLS48。在CholecT45与LLS48上超越SOTA三元组识别，且细粒度特征可跨级迁移至阶段/步骤识别。

> **要点**：CurConMix+统一时空建模超越SOTA手术三元组识别并跨层级泛化。


#### 72. 动则显要：基于运动的指代式手术器械分割

*Where It Moves, It Matters: Referring Surgical Instrument Segmentation via Motion*

**arXiv（预印本）** · 2026-01-18 · 方法学/DL+数据集 · [arXiv 2601.12224](https://arxiv.org/abs/2601.12224)

提出运动引导框架SurgRef，将自由形式语言表达锚定到器械运动(关注工具如何运动而非外观)，从而在遮挡、歧义或不熟悉术语下仍能理解并分割器械。构建含密集时空掩码与运动中心表达的多机构视频数据集Ref-IMotion。SurgRef在多种术式上取得SOTA准确率与泛化性，为语言驱动手术视频分割设立新基准。

> **要点**：SurgRef以运动线索实现语言指代式手术器械分割，遮挡下仍SOTA。


#### 73. 机器人手术缝合的模型选择与实时技能评估

*Model selection and real-time skill assessment for suturing in robotic surgery*

**arXiv（预印本）** · 2026-01-17 · 方法学/多模态DL · [arXiv 2601.12012](https://arxiv.org/abs/2601.12012)

基于达芬奇系统的运动学与视觉数据，实时预测OSATS外科技能等级。评估多模态深度学习融合架构，用平均Spearman相关系数衡量，结果显示融合模型在实时预测上持续优于单模态基线；预测趋势与术者手势相关；按技能等级分层交叉验证表明高技能演示训练的模型性能更好且能泛化到同水平参与者。

> **要点**：运动学+视觉多模态融合实现机器人缝合技能的稳定实时评估。


#### 74. 基于动作识别的AI手术技能评估

*AI-Driven Evaluation of Surgical Skill via Action Recognition*

**arXiv（预印本）** · 2025-12-30 · 方法学/DL(58视频) · [arXiv 2512.24411](https://arxiv.org/abs/2512.24411)

提出面向显微吻合技能自动评估的AI框架，采用基于TimeSformer的视频Transformer(引入分层时序注意力与加权空间注意力)实现手术视频动作识别，并用基于YOLO的目标检测跟踪提取器械运动学细粒度特征，从五个技能维度评估。在58个专家标注视频上，帧级动作分割准确率87.7%(后处理后升至93.62%)，复现专家评估的平均分类准确率76%。

> **要点**：TimeSformer+YOLO框架实现显微吻合技能自动评估，动作分割准确率达93.62%。


#### 75. 基于运动学的显微吻合手术动作评估

*Kinematic-Based Assessment of Surgical Actions in Microanastomosis*

**arXiv（预印本）** · 2025-12-30 · 方法学/DL(58视频) · [arXiv 2512.23942](https://arxiv.org/abs/2512.23942)

提出可在边缘计算平台高效运行的显微吻合自动动作分割与技能评估AI框架，含基于YOLO+DeepSORT的器械尖端跟踪定位、基于自相似矩阵与无监督聚类的动作分割、以及监督分类的技能评估三个模块。在58个专家评分的显微吻合视频上，帧级动作分割准确率92.4%、整体技能分类准确率85.5%(复现专家评估)。

> **要点**：边缘可部署框架实现显微吻合动作分割(92.4%)与技能分类(85.5%)。


#### 76. 弥合离体到活体差距：镜面手术环境单目深度估计的合成先验

*Bridging the Ex-Vivo to In-Vivo Gap: Synthetic Priors for Monocular Depth Estimation in Specular Surgical Environments*

**arXiv（预印本）** · 2025-12-29 · 方法学/DL+数据集 · [arXiv 2512.23786](https://arxiv.org/abs/2512.23786)

针对自主机器人手术单目深度估计的离体到活体差距，利用Depth Anything V2的高保真合成先验并以动态向量低秩适配(DV-LoRA)高效迁移到医学域。在公开SCARED数据集上创SOTA，在新的物理分层评估协议下高镜面反射区将平方相对误差较强基线降低>17%；并发布首个真实手术验证数据集ROCAL-T 90(90条临床内镜序列、亚毫米级<1mm真值轨迹)。

> **要点**：合成先验+DV-LoRA使镜面手术区深度平方相对误差降>17%，并发布真实手术深度基准。


#### 77. 面向实时脊柱内镜实例分割的轻量多尺度注意力框架

*A Lightweight Multi-Scale Attention Framework for Real-Time Spinal Endoscopic Instance Segmentation*

**arXiv（预印本）** · 2025-12-26 · 方法学/DL(61例) · [arXiv 2512.21984](https://arxiv.org/abs/2512.21984)

提出轻量多尺度注意力框架LMSF-A，在骨干(C2f-Pro结合RepViT重参数化卷积与高效多尺度注意力EMA)、颈部(SSFF+TFE)、头部(轻量多任务共享头LMSH)协同设计，用于脊柱内镜手术中实时识别保护关键解剖。发布经临床审核的PELD数据集(61例患者、610张图像，含脂肪、骨、黄韧带、神经实例掩码)。模型仅1.8M参数、8.8 GFLOPs，各指标具竞争力并泛化到公开牙齿基准。

> **要点**：1.8M参数的LMSF-A实现脊柱内镜关键解剖实时实例分割以保护术中结构。


#### 78. 面向实时手术场景分割的脉冲驱动视频Transformer与脉冲感知预训练

*Toward Real-Time Surgical Scene Segmentation via a Spike-Driven Video Transformer with Spike-Informed Pretraining*

**arXiv（预印本）** · 2025-12-24 · 方法学/DL(SNN) · [arXiv 2512.21284](https://arxiv.org/abs/2512.21284)

提出首个脉冲驱动视频Transformer SpikeSurgSeg用于手术场景分割，保留脉冲神经网络(SNN)实时低能耗优势，采用基于MAE的脉冲感知预训练(以脉冲发放引导掩码)、逐层管状掩码及多光谱知识蒸馏(频域对齐ANN教师与SNN学生)。在EndoVis18与自建SurgBleed数据集上mIoU与SOTA ANN相当，同时推理延迟至少降低8倍、相对多数基础模型加速超20倍。

> **要点**：SpikeSurgSeg以SNN实现手术场景分割，精度媲美ANN且推理加速8–20倍。


#### 79. DSTED：解耦时序稳定化与判别增强的手术工作流识别

*DSTED: Decoupling Temporal Stabilization and Discriminative Enhancement for Surgical Workflow Recognition*

**arXiv（预印本）** · 2025-12-22 · 方法学/DL · [arXiv 2512.19387](https://arxiv.org/abs/2512.19387)

提出双通路框架DSTED，含可靠记忆传播(RMP，多准则可靠性筛选融合高置信历史特征)与不确定性感知原型检索(UPR，从高不确定样本构建类原型精化歧义帧)，并用置信驱动门动态平衡两通路。在AutoLaparo子宫切除数据集上准确率84.36%、F1 65.51%，较次优方法分别高3.51%、4.88%；消融显示RMP(+2.19%)与UPR(+1.93%)互补，显著降低时序抖动。

> **要点**：DSTED解耦时序一致性与阶段歧义，工作流识别准确率84.36%并降抖动。


#### 80. EndoStreamDepth：面向内镜视频流的时序一致单目深度估计

*EndoStreamDepth: Temporally Consistent Monocular Depth Estimation for Endoscopic Video Streams*

**arXiv（预印本）** · 2025-12-20 · 方法学/DL · [arXiv 2512.18159](https://arxiv.org/abs/2512.18159)

提出内镜视频流单目深度估计框架EndoStreamDepth，逐帧处理并用多级Mamba时序模块传播帧间信息，含内镜专用变换的单帧深度网络与多尺度监督的分层设计，实现锐利解剖边界、时序一致预测与实时吞吐。在两个公开结肠镜深度数据集上较SOTA显著提升，产出边界清晰、解剖对齐的深度图，支撑机器人手术自动化等下游任务。

> **要点**：EndoStreamDepth实现时序一致、实时的内镜单目深度估计支撑机器人手术。


#### 81. Endo-SemiS：面向内镜视频的鲁棒半监督图像分割

*Endo-SemiS: Towards Robust Semi-Supervised Image Segmentation for Endoscopic Video*

**arXiv（预印本）** · 2025-12-18 · 方法学/DL(半监督) · [arXiv 2512.16977](https://arxiv.org/abs/2512.16977)

提出半监督分割框架Endo-SemiS，用四策略高效利用未标注数据：双网络交叉监督、不确定性引导伪标签(选高置信区域)、联合伪标签监督(聚合双网可靠像素)与特征/图像级互学习，并加入利用内镜视频时空信息的校正网络。在输尿管镜肾结石激光碎石与结肠镜息肉筛查两项临床应用上，标注有限时显著优于SOTA分割方法。

> **要点**：Endo-SemiS以半监督在少标注下超越SOTA，应用于碎石与息肉内镜分割。


#### 82. ReMeDI：用SAM3在手术分割中精化记忆以消歧身份

*ReMeDI: Refined Memory for Disambiguation of Identities with SAM3 in Surgical Segmentation*

**arXiv（预印本）** · 2025-12-18 · 方法学/DL(免训练) · [arXiv 2512.16880](https://arxiv.org/abs/2512.16880)

针对SAM3在手术器械分割中记忆无差别更新、容量固定、遮挡后身份恢复弱的局限，提出免训练扩展ReMeDI-SAM3，含相关性感知记忆过滤(专设遮挡感知记忆存储遮挡前帧)、分段插值扩展有效记忆容量、及基于特征+时序投票的重识别模块。在EndoVis17/18与CholecSeg8k零样本设置下mcIoU较原始SAM3分别提升约5.8%、8%、2%，甚至超过此前基于训练的方法。

> **要点**：免训练ReMeDI-SAM3以记忆精化提升手术器械分割mcIoU最高8%，遮挡后可靠恢复。


#### 83. ProtoFlow：以学习型动态场景图原型进行可解释鲁棒手术工作流建模

*ProtoFlow: Interpretable and Robust Surgical Workflow Modeling with Learned Dynamic Scene Graph Prototypes*

**arXiv（预印本）** · 2025-12-16 · 方法学/DL(GNN原型) · [arXiv 2512.14092](https://arxiv.org/abs/2512.14092)

提出ProtoFlow框架，用图神经网络(GNN)编解码架构结合自监督预训练与基于原型的微调，学习动态场景图原型以可解释、鲁棒地建模复杂手术工作流。在细粒度CAT-SG数据集上整体准确率超过标准GNN基线，且在少样本(仅1个手术视频)下仍保持强性能；学习到的原型可识别不同手术子技术并对工作流偏差与罕见并发症提供可解释洞察。

> **要点**：ProtoFlow以场景图原型实现可解释、少样本鲁棒的手术工作流建模。


#### 84. LapFM：经分层概念演进预训练的腹腔镜分割基础模型

*LapFM: A Laparoscopic Segmentation Foundation Model via Hierarchical Concept Evolving Pre-training*

**arXiv（预印本）** · 2025-12-09 · 方法学/基础模型 · [arXiv 2512.08439](https://arxiv.org/abs/2512.08439)

提出腹腔镜分割基础模型LapFM，采用分层概念演进预训练：通过带父-子查询嵌入的分层掩码解码器建立腹腔镜概念层级(LCH)统一解剖、组织、器械实体，并以置信驱动演进标注迭代生成筛选伪标签，逐步纳入可靠样本，产出含11.4万图像-掩码对的大规模基准LapBench-114K。实验显示LapFM显著优于SOTA，树立通用腹腔镜分割新标准。

> **要点**：LapFM从海量无标注图像演进出通用腹腔镜分割能力并发布114K基准。


#### 85. DGGAN：退化引导生成对抗网络用于实时内镜视频增强

*DGGAN: Degradation Guided Generative Adversarial Network for Real-time Endoscopic Video Enhancement*

**arXiv（预印本）** · 2025-12-08 · 方法学/GAN · [arXiv 2512.07253](https://arxiv.org/abs/2512.07253)

提出退化感知框架DGGAN实时增强内镜手术视频，先用对比学习从图像提取退化表示并跨帧传播，再以融合机制调制图像特征引导单帧增强模型，并用退化-复原图像间的循环一致性约束提升鲁棒性与泛化。实验表明其在性能与效率间取得优于多个SOTA方法的平衡，适合临床实时应用。

> **要点**：DGGAN以退化引导实现实时内镜手术视频增强，兼顾质量与效率。


#### 86. 深度先验驱动的免训练腹腔镜手术场景分割

*See in Depth: Training-Free Surgical Scene Segmentation with Monocular Depth Priors*

**arXiv（预印本）** · 2025-12-05 · 方法学研究（免训练分割） · [arXiv 2512.05529](https://arxiv.org/abs/2512.05529)

提出免训练框架DepSeg，用预训练单目深度估计生成深度引导点提示，交由SAM2产生类别无关掩膜，再以模板匹配对掩膜分类。在CholecSeg8k上mIoU达35.9%，显著优于SAM2自动分割基线(14.7%)，且仅用10–20%模板仍保持竞争力。

> **要点**：深度引导提示+模板匹配可实现标注高效的腹腔镜手术场景分割。


#### 87. 重思手术烟雾：烟雾类型感知的腹腔镜视频去烟方法与数据集

*Rethinking Surgical Smoke: A Smoke-Type-Aware Laparoscopic Video Desmoking Method and Dataset*

**arXiv（预印本）** · 2025-12-02 · 方法学研究（视频去烟）+数据集 · [arXiv 2512.02780](https://arxiv.org/abs/2512.02780)

提出首个烟雾类型感知去烟网络STANet，区分扩散型与弥漫型两类烟雾，通过注意力加权掩膜聚合联合预测烟雾掩膜与类型，并嵌入粗到细解耦模块分离纠缠区域，同时构建首个带烟雾类型标注的大规模合成视频去烟数据集。实验显示其质量评价优于SOTA，并在多个下游手术任务上泛化更佳。

> **要点**：区分烟雾类型可改善腹腔镜视频去烟质量与下游手术任务表现。


#### 88. RobustSurg：面向分布外手术场景分割的域泛化

*RobustSurg: Tackling domain generalisation for out-of-distribution surgical scene segmentation*

**arXiv（预印本）** · 2025-12-01 · 方法学研究（域泛化分割）+数据集 · [arXiv 2512.02188](https://arxiv.org/abs/2512.02188)

针对手术场景分割跨中心、跨模态泛化难题，提出结合实例归一化、特征协方差映射与ResNet骨干中特征复原模块的RobustSurg，并发布新的多类多中心手术分割数据集。在CholecSeg8K训练、未见中心HeiCholSeg测试上mIoU较基线DeepLabv3+提升近23%、较SOTA提升10–32%；在EndoUDA息肉数据集较基线提升近22%、较近期SOTA提升近11%。

> **要点**：风格-内容解耦+特征复原显著提升手术场景分割的分布外泛化能力。


#### 89. 基于计算机视觉的手术元能力自动化视频分析

*Automated Video-Based Analysis of Surgical Meta-competencies Using Computer Vision*

**medRxiv/bioRxiv（预印本）** · 2025-11-27 · 多机构回顾性视频分析(预印本) · [DOI](https://doi.org/10.1101/2025.11.24.25340912)

多机构回顾性研究分析319段腹腔镜胆囊切除视频(切分为2862个片段)，按内部验证的视频评估量表在组织处理、精神运动技能、效率、分离质量、暴露质量五个元能力维度标注，训练纯视觉深度学习模型分级技能。暴露胆囊步骤的分离质量AUROC最高达91.5%(95%CI 84.5-96.5)，效率72.6%、暴露质量68.7%；肝胆三角分离步骤分离/暴露质量AUROC 63.8%/66.0%。

> **要点**：纯视觉DL对手术元能力自动评分，简单步骤表现优异(AUROC 91.5%)。


#### 90. CataractCompDetect：白内障手术术中并发症检测

*CataractCompDetect: Intraoperative Complication Detection in Cataract Surgery*

**arXiv（预印本）** · 2025-11-24 · 方法学研究（视频并发症检测）+数据集 · [arXiv 2511.18968](https://arxiv.org/abs/2511.18968)

提出结合阶段感知定位、SAM2跟踪、并发症特异风险评分与视觉-语言推理终分类的白内障术中并发症检测框架，并构建首个带术中并发症标注的白内障视频数据集CataComp（53台手术，含23台有临床并发症）。平均F1达70.63%，其中虹膜脱出81.8%、后囊破裂(PCR)60.87%、玻璃体脱失69.23%。

> **要点**：结构化外科先验加视觉语言推理可识别罕见但高危的白内障术中并发症。


#### 91. SAM2S：经语义长时跟踪的手术视频万物分割

*SAM2S: Segment Anything in Surgical Videos via Semantic Long-term Tracking*

**arXiv（预印本）** · 2025-11-20 · 方法学研究（视频分割基础模型）+基准 · [arXiv 2511.16618](https://arxiv.org/abs/2511.16618)

构建最大规模手术交互式视频目标分割基准SA-SV（8类手术、6.1万帧、1600条masklet），并提出增强SAM2的基础模型SAM2S，含可训练多样记忆机制DiveMem、时序语义学习与抗歧义学习。在SA-SV上微调使SAM2平均J&F提升12.99；SAM2S平均J&F达80.42，较原始与微调SAM2分别高17.10与4.11分，保持68 FPS实时推理与强零样本泛化。

> **要点**：面向手术视频的SAM2增强模型实现实时长时器械/组织分割。


#### 92. 用于手术场景分割的图神经网络

*Graph Neural Networks for Surgical Scene Segmentation*

**arXiv（预印本）** · 2025-11-20 · 方法学研究（GNN分割） · [arXiv 2511.16430](https://arxiv.org/abs/2511.16430)

针对腹腔镜胆囊切除中肝胆解剖识别的遮挡、长程依赖与细小结构难题，提出两种融合ViT编码器与图神经网络(GNN)的分割模型：静态k-NN图配GCNII实现稳定长程信息传播，动态可微图生成器(DGG)配GAT支持自适应拓扑学习。在Endoscapes-Seg50与CholecSeg8k上mIoU较SOTA提升达7–8%、mDice提升6%，对细小、罕见的安全关键结构预测更解剖一致。

> **要点**：ViT全局上下文加图关系推理提升手术场景分割精度与解剖一致性。


#### 93. 桥接视觉与语言的稳健情境感知手术点跟踪：VL-SurgPT数据集与基准

*Bridging Vision and Language for Robust Context-Aware Surgical Point Tracking: The VL-SurgPT Dataset and Benchmark*

**arXiv（预印本）** · 2025-11-15 · 数据集/基准加方法学研究 · [arXiv 2511.12026](https://arxiv.org/abs/2511.12026)

提出首个将视觉跟踪与点状态文本描述结合的大规模多模态手术点跟踪数据集VL-SurgPT，含908段在体视频（754段组织跟踪、跨5类挑战场景标注17171个点；154段器械跟踪、覆盖7类器械关键点），用8种SOTA跟踪方法建立基准，并提出文本引导跟踪TG-SurgPT。结果显示引入点状态信息在烟雾遮挡、镜面反光、组织形变等不利条件下显著提升跟踪精度与可靠性。

> **要点**：视觉-语言融合可提升手术复杂场景下的点跟踪稳健性。


#### 94. 腹腔镜手术阶段、关键点与器械识别视频数据集(PhaKIR)

*Video Dataset for Surgical Phase, Keypoint, and Instrument Recognition in Laparoscopic Surgery (PhaKIR)*

**arXiv（预印本）** · 2025-11-09 · 数据集研究 · [arXiv 2511.06549](https://arxiv.org/abs/2511.06549)

发布三中心8台完整腹腔镜胆囊切除视频数据集PhaKIR，提供三项互联任务的帧级标注：手术阶段识别(485,875帧)、器械关键点估计(19,435帧)与器械实例分割(19,435帧)，是首个联合提供阶段标签、器械位姿与像素级分割且保留完整手术时序的多机构数据集，曾作为MICCAI 2024 EndoVis下PhaKIR挑战赛基础。

> **要点**：首个联合阶段/关键点/器械分割且带完整时序的多中心腹腔镜手术数据集。


#### 95. EndoIR：经噪声感知路由扩散的退化无关一体化内镜图像复原

*EndoIR: Degradation-Agnostic All-in-One Endoscopic Image Restoration via Noise-Aware Routing Diffusion*

**arXiv（预印本）** · 2025-11-08 · 方法学研究（扩散图像复原） · [arXiv 2511.05873](https://arxiv.org/abs/2511.05873)

提出退化无关的一体化扩散复原框架EndoIR，用单一模型复原低光、烟雾、出血等多种共现内镜退化，含提取空间-频率联合特征的双域提示器、分离处理干净与退化输入的双流扩散架构（配矫正融合块）及噪声感知路由块。在SegSTRONG-C与CEC数据集上以更少参数达SOTA，下游分割实验证实其临床效用。

> **要点**：单模型退化无关地复原多种内镜退化，改善手术可视化与下游分割。


#### 96. SurgiATM：用于腹腔镜手术深度学习去烟的物理引导即插即用模型

*SurgiATM: A Physics-Guided Plug-and-Play Model for Deep Learning-Based Smoke Removal in Laparoscopic Surgery*

**arXiv（预印本）** · 2025-11-07 · 方法学研究（即插即用去烟） · [arXiv 2511.05059](https://arxiv.org/abs/2511.05059)

提出手术大气模型SurgiATM，统计上桥接基于物理的大气模型与数据驱动深度学习模型，作为轻量即插即用模块嵌入各类去烟架构末端，利用类拉普拉斯误差分布建模手术烟雾，仅引入两个超参数且无额外可训练权重。在胆囊切除、部分肾切除、膈肌分离等三个公开数据集、多种网络架构上普遍降低复原误差并相对提升泛化。

> **要点**：物理引导即插即用模块以近零开销普遍提升手术去烟精度与泛化。


#### 97. 从单一时间戳学习：腹腔镜胆囊切除术的复杂度估计

*Learning from Single Timestamps: Complexity Estimation in Laparoscopic Cholecystectomy*

**arXiv（预印本）** · 2025-11-06 · 方法学研究（弱监督视频分级） · [arXiv 2511.04525](https://arxiv.org/abs/2511.04525)

提出弱时序监督下从完整腹腔镜胆囊切除(LC)视频估计Parkland分级量表(PGS)炎症复杂度的框架STC-Net，联合时序定位、窗口提议与分级模块，并设计硬/软定位与背景感知分级损失。在1859段LC视频私有数据集上准确率62.11%、F1 61.42%，两指标较非定位基线高逾10%。

> **要点**：弱时序监督即可从完整LC视频自动估计炎症复杂度分级，辅助术后分析与手术培训。


#### 98. 用器械实例分割为手术动作三元组做空间定位：数据集与目标感知融合方法

*Grounding Surgical Action Triplets with Instrument Instance Segmentation: A Dataset and Target-Aware Fusion Approach*

**arXiv（预印本）** · 2025-11-01 · 数据集构建+方法学(深度学习) · [arXiv 2511.00643](https://arxiv.org/abs/2511.00643)

提出三元组分割(triplet segmentation)新任务，输出空间定位的<器械,动作,目标>；构建CholecTriplet-Seg数据集(超30,000标注帧，将器械实例掩膜与动作、解剖目标关联)，建立首个强监督实例级三元组定位基准，并提出TargetFusionNet(在Mask2Former上加入目标感知融合，将弱解剖先验与器械实例查询融合)。在识别、检测与三元组分割指标上均一致优于现有基线。

> **要点**：首个强监督实例级手术动作三元组空间定位基准与目标感知融合模型。


#### 99. 面向动态场景中手术动作空间映射的声源定位

*Sound Source Localization for Spatial Mapping of Surgical Actions in Dynamic Scenes*

**arXiv（预印本）** · 2025-10-28 · 方法学+手术室模拟实验验证 · [arXiv 2510.24332](https://arxiv.org/abs/2510.24332)

提出首个在动态手术场景中做空间声音定位的框架，将相控麦克风阵列的声学定位信息投影到RGB-D相机的动态点云上生成手术场景4D音视频表征，并用基于Transformer的声学事件检测模块识别工具-组织交互的时间片段并在场景中空间定位。在真实手术室模拟手术中由专家实验评估，成功实现声学事件的3D空间定位并与视觉场景元素关联。

> **要点**：首次将声学定位与视觉融合，实现动态手术场景的多模态时空理解。


#### 100. Cataract-LMM：手术视频分析深度学习的大规模多源多任务基准

*Cataract-LMM Large-Scale Multi-Source Multi-Task Benchmark for Deep Learning in Surgical Video Analysis*

**arXiv（预印本）** · 2025-10-18 · 数据集/基准(3,000视频) · [arXiv 2510.16371](https://arxiv.org/abs/2510.16371)

构建含3,000例白内障超声乳化手术视频(两中心、不同经验术者)的数据集，提供手术阶段、器械与解剖结构实例分割、器械-组织交互跟踪、基于ICO-OSCAR/GRASIS的技能评分四层标注；在工作流识别、场景分割、交互跟踪、自动技能评估四项任务上基准化深度学习，并建立训练于一中心、评估于留出中心的域适应基线。

> **要点**：多源多任务白内障手术视频基准，支撑可泛化多任务手术工作流模型。


#### 101. 通过渐进冻结微调的自适应迁移学习用于腹腔镜视频手术器械存在检测

*Adaptive transfer learning for surgical tool presence detection in laparoscopic videos through gradual freezing fine-tuning*

**arXiv（预印本）** · 2025-10-17 · 方法学(迁移学习) · [arXiv 2510.15372](https://arxiv.org/abs/2510.15372)

提出分阶段自适应微调(线性探测阶段+渐进冻结阶段动态减少可微调层)以将ImageNet预训练CNN迁移到外科域，仅需单次训练循环、降低网络复杂度。在Cholec80用ResNet-50与DenseNet-121检测胆囊切除内窥镜视频中的器械，达mAP 96.4%，优于现有方法；并在CATARACTS(眼科微创)数据集验证泛化性。

> **要点**：渐进冻结微调提升手术器械存在检测(Cholec80 mAP 96.4%)。


#### 102. 腹腔镜视频中的术后子宫内膜异位症分割

*Post-surgical Endometriosis Segmentation in Laparoscopic Videos*

**arXiv（预印本）** · 2025-10-14 · 演示系统(深度学习分割) · [arXiv 2510.13899](https://arxiv.org/abs/2510.13899)

演示论文，训练系统分割腹腔镜手术视频中一种常见的子宫内膜异位表现(深色内膜植入灶)，用多彩叠加标注识别的植入区域并给出检测摘要以辅助妇科医生识别并改进视频浏览。属外科腹腔镜视频病灶分割(深度学习)，未给出量化指标。

> **要点**：辅助妇科医生识别腹腔镜视频中子宫内膜异位深色植入灶的分割演示系统。


#### 103. 面向内窥镜视频未来事件预测的状态变化学习

*State-Change Learning for Prediction of Future Events in Endoscopic Videos*

**arXiv（预印本）** · 2025-10-14 · 方法学(深度学习)+基准(SFPBench) · [arXiv 2510.12904](https://arxiv.org/abs/2510.12904)

将手术未来预测重构为状态变化学习(分类当前与未来时刻的状态转移而非预测原始观测)，提出SurgFUTR教师-学生架构：用Sinkhorn-Knopp聚类将视频片段压缩为状态表征，学生网络在Action Dynamics(ActDyn)模块引导下仅由当前视频预测未来状态。建立含短期(三元组、事件)与长期(剩余手术时长、阶段/步骤转换)5项任务的SFPBench，在四数据集、三术式上一致改进，跨术式迁移验证泛化性。

> **要点**：以状态变化学习统一预测手术短/长期未来事件，跨术式可泛化。


#### 104. 用双预测视频扩散模型缓解手术数据不平衡

*Mitigating Surgical Data Imbalance with Dual-Prediction Video Diffusion Model*

**arXiv（预印本）** · 2025-10-07 · 方法学(视频扩散生成) · [arXiv 2510.07345](https://arxiv.org/abs/2510.07345)

针对手术视频数据集稀有动作/器械欠表示的不平衡问题，提出稀疏可控视频扩散框架SurgiFlowVid：双预测扩散模块联合去噪RGB帧与光流以增强运动建模，稀疏视觉编码器以轻量信号(稀疏分割掩膜/RGB帧)条件生成而免密集标注。在三个手术数据集的动作识别、器械存在检测、腹腔镜运动预测任务上，合成数据较基线一致带来10-20%增益。

> **要点**：可控视频扩散生成欠表示手术类别，缓解数据不平衡(下游+10-20%)。


#### 105. 从环境传感器为手术室工作流合成任意视角的自我中心回放(EgoSurg)

*Did you just see that? Arbitrary view synthesis for egocentric replay of operating room workflows from ambient sensors*

**arXiv（预印本）** · 2025-10-06 · 方法学(神经渲染+扩散) · [arXiv 2510.04802](https://arxiv.org/abs/2510.04802)

提出EgoSurg框架，首次仅从墙装固定相机视频、无需干预临床流程即可重建任意手术室人员的动态自我中心视角回放；将几何驱动的神经渲染与基于扩散的视角增强结合，实现任意时刻任意/自我中心视角的高保真合成。在多中心手术病例与对照研究中，以高视觉质量重建个体特异视野与任意视点，为沉浸式手术数据科学奠基。

> **要点**：从固定相机重建OR人员自我中心视角，为沉浸式手术数据科学奠基。


#### 106. 面向阑尾炎分类的手术视觉联邦学习：FedSurg EndoVis 2024挑战赛结果

*Federated Learning for Surgical Vision in Appendicitis Classification: Results of the FedSurg EndoVis 2024 Challenge*

**arXiv（预印本）** · 2025-10-06 · 基准/挑战赛(联邦学习) · [arXiv 2510.04772](https://arxiv.org/abs/2510.04772)

首个专注手术视觉联邦学习(FL)的国际基准FedSurg挑战赛，在多中心腹腔镜阑尾切除数据集(Appendix300子集)上评估对未见中心的泛化与中心特异适应。即使集中汇聚全部数据，未见中心F1仅26.31%，去中心化训练还带来额外可分离的性能损失；视频级时空模型一致优于帧级方法；朴素本地微调致分类器崩溃，结构化个性化FL+参数高效微调更可行。

> **要点**：首个手术视觉FL基准，揭示跨中心泛化难题(未见中心F1仅26.31%)。


#### 107. 基于Swarm Learning的去中心化隐私保护手术视频分析

*Decentralized, privacy-preserving surgical video analysis with Swarm Learning*

**medRxiv/bioRxiv（预印本）** · 2025-10-03 · 多中心方法学/弱监督深度学习 · [DOI](https://doi.org/10.1101/2025.10.02.25337106)

方法学研究：整合弱监督深度学习与去中心化Swarm Learning，利用来自6个国际中心的397例腹腔镜阑尾切除录像完成穿孔性阑尾炎二分类、腹腔镜分级与组织学炎症分级三项患者级任务。1.0 fps采样配合SurgTempoNet架构表现最佳，Swarm Learning在三项任务上均优于单中心训练、与集中式学习相当且外部验证泛化稳定。

> **要点**：弱监督+群体学习可在保护隐私前提下直接从手术视频预测患者级病理终点


#### 108. 当跟踪失效：分析SAM2在手术视频点式跟踪的失败模式

*When Tracking Fails: Analyzing Failure Modes of SAM2 for Point-Based Tracking in Surgical Videos*

**arXiv（预印本）** · 2025-10-02 · 分析/评估研究 · [arXiv 2510.02100](https://arxiv.org/abs/2510.02100)

系统分析视频对象分割模型SAM2在腹腔镜胆囊切除视频中点式跟踪的失败模式，针对胆囊、抓钳、L型电钩三类目标，比较点式跟踪与掩膜初始化的表现。结果显示点式跟踪对手术器械有竞争力，但对解剖目标(组织相似、边界模糊)持续欠佳；并给出选点与布点的可操作建议。

> **要点**：SAM2点式跟踪对手术器械可用但对解剖结构易失效，给出布点建议。


#### 109. 通过时空信息挖掘的Token合并用于手术视频理解

*Token Merging via Spatiotemporal Information Mining for Surgical Video Understanding*

**arXiv（预印本）** · 2025-09-28 · 方法学(免训练token合并) · [arXiv 2509.23672](https://arxiv.org/abs/2509.23672)

针对视觉Transformer处理海量时空token计算代价过高的问题，提出首个面向手术视频理解的时空信息挖掘token合并方法STIM-TM：时间分量用显著性加权合并连续帧对应token以保序，空间分量经时间稳定性分析优先合并静态token以保护动态区域。免训练运行，在多项手术视频任务上GFLOPs减少超65%且保持有竞争力的精度，并支持长序列手术视频高效训练。

> **要点**：时空token合并使手术视频理解GFLOPs降超65%且精度基本保持。


#### 110. 基于标签插值的手术视频理解

*Surgical Video Understanding with Label Interpolation*

**arXiv（预印本）** · 2025-09-23 · 方法开发研究（多任务学习） · [arXiv 2509.18802](https://arxiv.org/abs/2509.18802)

针对机器人辅助手术视频中长时标注（阶段/步骤逐帧可得）与短时标注（器械分割/动作检测仅关键帧）的时空不平衡，提出结合光流标签插值与多任务学习的框架，用关键帧估计的光流将标签传播到相邻未标注帧以丰富稀疏空间监督。该方法提升了手术场景理解的准确性与效率（未给出具体量化指标）。

> **要点**：光流标签插值缓解时空标注不平衡，提升多任务手术场景理解。


#### 111. MEJO：MLLM参与的手术三元组识别与任务间/内联合优化

*MEJO: MLLM-Engaged Surgical Triplet Recognition via Inter- and Intra-Task Joint Optimization*

**arXiv（预印本）** · 2025-09-16 · 方法开发研究（多任务学习+MLLM） · [arXiv 2509.12893](https://arxiv.org/abs/2509.12893)

针对手术三元组（器械-动作-目标）识别中的长尾分布与优化冲突，提出MLLM参与的联合优化框架MEJO。任务间用共享-特有解耦（S²D）方案并以MLLM驱动的概率提示池增强共享表示；任务内用协调梯度学习（CGL）重平衡头/尾类正负梯度。在CholecT45与CholecT50数据集上验证了框架优越性（未给出具体数值）。

> **要点**：MLLM驱动的任务间/内联合优化缓解手术三元组识别的长尾与优化冲突。


#### 112. 面向机器人辅助手术的显微手术器械分割（MISRA）

*Microsurgical Instrument Segmentation for Robot-Assisted Surgery*

**arXiv（预印本）** · 2025-09-15 · 方法开发+数据集 · [arXiv 2509.11727](https://arxiv.org/abs/2509.11727)

针对显微手术细小结构分割中的分辨率损失、低对比与类不平衡，提出MISRA框架：以亮度通道增强RGB输入、用跳跃注意力保留细长特征、并用迭代反馈模块（IFM）多次恢复连续性；同时发布带细粒度标注的显微手术数据集。实验显示平均类别IoU较对比方法提升5.37%，在器械接触与重叠处预测更稳定。

> **要点**：MISRA提升显微手术器械分割平均IoU 5.37%，细长结构与重叠处更稳健。


#### 113. 跨域预训练用于少样本手术技能评估

*Exploring Pre-training Across Domains for Few-Shot Surgical Skill Assessment*

**arXiv（预印本）** · 2025-09-11 · 方法研究（自监督预训练+少样本） · [arXiv 2509.09327](https://arxiv.org/abs/2509.09327)

将手术技能评估（SSA）建模为少样本任务，研究自监督预训练策略对下游少样本SSA性能的影响。对公开机器人手术数据集标注OSATS评分并评估多种预训练来源，量化域相似度与域差距的影响。结果显示小而域相关的数据集可优于大而不相关的数据集，1/2/5-shot设置下准确率分别达60.16%、66.03%、73.65%；纳入手术特定数据平均提升准确率+1.22%、F1 +2.28%，但用不相似的大规模来源反而可能降低性能。

> **要点**：域相关预训练优于大而不对齐来源，少样本手术技能评估5-shot准确率73.65%。


#### 114. FASL-Seg：手术场景的解剖与器械分割

*FASL-Seg: Anatomy and Tool Segmentation of Surgical Scenes*

**arXiv（预印本）** · 2025-09-07 · 方法开发研究（语义分割） · [arXiv 2509.06159](https://arxiv.org/abs/2509.06159)

提出特征自适应空间定位模型FASL-Seg，通过低层特征投影（LLFP）与高层特征投影（HLFP）双流在多细节层级捕获特征，兼顾高层语境与低层边缘，实现解剖与器械的精确分割。在EndoVis18解剖/部件分割上mIoU达72.71%（较SOTA提升5%），在EndoVis18与EndoVis17器械类型分割上mIoU分别达85.61%与72.78%，整体超越SOTA。

> **要点**：双流FASL-Seg兼顾解剖与器械分割，EndoVis18部件mIoU 72.71%（+5%）。


#### 115. 时序模型集成与前向-后向平滑用于手术阶段识别

*Ensembles of temporal models and forward-backward smoothing for surgical phase recognition*

**medRxiv/bioRxiv（预印本）** · 2025-09-05 · 方法学/时序模型集成 · [DOI](https://doi.org/10.1101/2025.09.02.25334297)

方法学研究：集成不同架构与时序参数的神经网络及机器学习模型识别手术阶段，以集成概率为先验经前向-后向平滑生成阶段后验。在三个数据集验证：机器人辅助腹股沟疝(5阶段)、机器人猪模型训练(7阶段)、腹腔镜胆囊切除Cholec80(7阶段)，以应对手术阶段时长差异大的问题。

> **要点**：多时序模型集成+平滑可稳健应对不同术式阶段时长的巨大差异


#### 116. 用深度学习实例分割识别腹腔镜手术器械

*Identifying Surgical Instruments in Laparoscopy Using Deep Learning Instance Segmentation*

**arXiv（预印本）** · 2025-08-29 · 方法评估研究（实例分割） · [arXiv 2508.21399](https://arxiv.org/abs/2508.21399)

研究从腹腔镜妇科手术视频中分割与识别手术器械，采用基于区域的全卷积网络进行实例感知的（1）器械分割（器械vs背景二分类）与（2）多类器械类型识别。评估显示即使训练样本量中等偏低，也能以较高精度定位与分割器械区域；但因手术器械间高度相似，判定具体器械类型仍很困难。

> **要点**：全卷积网络可高精度分割腹腔镜器械区域，但具体器械类型识别仍困难。


#### 117. 用低秩适配的视觉语言模型估计手术器械2D关键点

*Estimating 2D Keypoints of Surgical Tools Using Vision-Language Models with Low-Rank Adaptation*

**arXiv（预印本）** · 2025-08-28 · 方法开发研究（VLM+LoRA） · [arXiv 2508.20830](https://arxiv.org/abs/2508.20830)

提出用低秩适配（LoRA）微调视觉语言模型（VLM）进行手术器械2D关键点估计的流水线，借助预训练VLM的泛化能力规避CNN/Transformer在小规模医学数据上的过拟合。精心设计提示构建指令微调数据集以对齐视觉特征与语义关键点描述。实验表明仅微调两个epoch，适配后的VLM即超越基线模型，验证了LoRA在低资源场景的有效性。

> **要点**：LoRA微调VLM仅两epoch即超越基线，实现低资源手术器械2D关键点估计。


#### 118. 面向结局的显微外科吻合定量评估

*Quantitative Outcome-Oriented Assessment of Microsurgical Anastomosis*

**arXiv（预印本）** · 2025-08-26 · 方法开发研究（图像处理+三数据集） · [arXiv 2508.18836](https://arxiv.org/abs/2508.18836)

针对显微外科吻合评估依赖主观判断的偏倚问题，利用来自医院、涵盖不同水平参与者的三个数据集，提出用图像处理技术进行客观评估的定量框架，通过误差的几何建模配合检测与评分机制提升评估效率与可靠性。结果显示几何指标能有效复现专家评分者对所考虑误差的评分。

> **要点**：图像处理几何建模客观复现专家对显微外科吻合的评分，减少主观偏倚。


#### 119. 量子机器学习用于手术操作识别

*Surgical Procedure Recognition Using Quantum Machine Learning*

**medRxiv/bioRxiv（预印本）** · 2025-08-24 · 方法学/量子机器学习 · [DOI](https://doi.org/10.1101/2025.08.21.25334146)

方法学研究：用量子支持向量分类器(QSVC)从JIGSAWS数据集(缝合、打结、穿针，76个运动学特征)识别手术操作模式，借ZFeatureMap与Qiskit量子电路将数据嵌入高维Hilbert空间，并与经典SVC比较准确率/精确率/召回/F1。结果显示QSVM在特定任务上略优于经典对应方法。

> **要点**：量子SVC在机器人手术运动学操作识别的特定任务上较经典SVC略有优势


#### 120. 面向可泛化手术视频理解的数据高效学习

*Data-Efficient Learning for Generalizable Surgical Video Understanding*

**arXiv（预印本）** · 2025-08-13 · 博士论文/方法学(半监督手术视频分析) · [arXiv 2508.10215](https://arxiv.org/abs/2508.10215)

该博士研究针对手术视频理解中标注稀缺、时空复杂与跨机构域差异三大挑战，基准测试多种网络架构并提出DIST、SemiVT-Surge、ENCORE等半监督框架，利用大量无标注视频与动态伪标签在手术阶段/动作/事件识别上取得SOTA。并发布两个多任务数据集：最大的妇科腹腔镜数据集GynSurg与最大的白内障手术视频数据集Cataract-1K。

> **要点**：半监督学习以最小标注实现可泛化手术阶段/动作/事件识别


#### 121. Surg-InvNeRF：面向手术视觉三维跟踪与重建的可逆NeRF

*Surg-InvNeRF: Invertible NeRF for 3D tracking and reconstruction in surgical vision*

**arXiv（预印本）** · 2025-08-13 · 方法学/手术视觉点跟踪与重建 · [arXiv 2508.09681](https://arxiv.org/abs/2508.09681)

提出基于NeRF架构的测试时优化(TTO)方法用于长时程三维点跟踪，用新颖可逆神经辐射场(InvNeRF)参数化聚合函数以同时实现2D与3D跟踪，并引入多尺度HexPlanes加速推理。在STIR与SCARED数据集上评估，2D点跟踪平均精度较TTO现有SOTA提升近50%，3D点跟踪为首个TTO方法并超越前馈方法。

> **要点**：可逆NeRF实现手术场景长时程2D/3D点跟踪(平均精度提升约50%)


#### 122. Spatial-ORMLLM：用多模态大语言模型提升手术室空间关系理解

*Spatial-ORMLLM: Improve Spatial Relation Understanding in the Operating Room with Multimodal Large Language Model*

**arXiv（预印本）** · 2025-08-11 · 方法学/多模态大模型(OR空间场景理解) · [arXiv 2508.08199](https://arxiv.org/abs/2508.08199)

针对手术室(OR)缺乏多传感器且2D数据难捕捉细粒度空间，提出首个仅用RGB模态推断体积与语义线索的三维空间推理视觉语言大模型Spatial-ORMLLM，通过空间增强特征融合块将2D输入与算法提取的3D空间知识结合送入视觉塔，端到端实现OR三维场景推理而无需额外专家标注或传感器。在多个临床基准数据集上达到SOTA并稳健泛化到未见手术场景。

> **要点**：仅用RGB的MLLM实现手术室三维空间推理


#### 123. 用几何方法缓解手术室人员建模中的偏差

*Mitigating Biases in Surgical Operating Rooms with Geometry*

**arXiv（预印本）** · 2025-08-11 · 方法学/实验(OR人员建模去偏) · [arXiv 2508.08028](https://arxiv.org/abs/2508.08028)

通过对两个公开OR数据集的梯度显著性分析，揭示CNN模型在手术室人员建模中依赖手术袍下鞋履、眼镜等虚假视觉捷径，遂提出将人员编码为三维点云序列以解耦身份相关的形状与运动。实验显示在视觉多样性下降的真实临床场景中RGB模型准确率下降12%，而几何表征更稳健地捕捉生物特征。

> **要点**：三维几何表征比RGB更稳健建模手术室人员(RGB准确率降12%)


#### 124. TrackOR：通过稳健跟踪迈向个性化智能手术室

*TrackOR: Towards Personalized Intelligent Operating Rooms Through Robust Tracking*

**arXiv（预印本）** · 2025-08-11 · 方法学/手术室多人跟踪 · [arXiv 2508.07968](https://arxiv.org/abs/2508.07968)

提出TrackOR框架解决手术室长时程多人跟踪与重识别，利用三维几何签名实现SOTA在线跟踪性能(关联准确率较最强基线提升11%)，并支持离线恢复以生成可分析轨迹。工作表明利用三维几何信息可实现持久身份跟踪，为面向人员的个性化智能手术室系统与时序路径印记等应用奠定基础。

> **要点**：三维几何签名实现手术室持久多人跟踪(关联准确率+11%)


#### 125. 面向内镜立体图像无标记三维组织跟踪的任意点跟踪方法

*Tracking Any Point Methods for Markerless 3D Tissue Tracking in Endoscopic Stereo Images*

**arXiv（预印本）** · 2025-08-11 · 方法学/体模实验(内镜三维组织跟踪) · [arXiv 2508.07851](https://arxiv.org/abs/2508.07851)

提出利用2D任意点跟踪(TAP)网络的无标记三维组织跟踪方法，组合两个CoTracker模型分别做时序跟踪与立体匹配，从立体内镜图像估计三维运动。在腹腔镜临床装置与机械臂模拟组织运动下，于3D打印体模与鸡肉组织体模实验，鸡肉组织在10 mm/s速度下欧氏距离误差低至1.1 mm。

> **要点**：基于TAP网络实现微创手术无标记三维组织跟踪(误差低至1.1 mm)


#### 126. TSMS-SAM2：面向手术场景可提示视频目标分割与跟踪的多尺度时序采样与记忆分裂剪枝

*TSMS-SAM2: Multi-scale Temporal Sampling Augmentation and Memory-Splitting Pruning for Promptable Video Object Segmentation and Tracking in Surgical Scenarios*

**arXiv（预印本）** · 2025-08-07 · 方法学/手术视频分割 · [arXiv 2508.05829](https://arxiv.org/abs/2508.05829)

针对SAM2在手术视频中因快速运动与记忆冗余而性能受限，提出TSMS-SAM2，引入多时间尺度视频采样增强以提升对运动变化的稳健性，并用记忆分裂与剪枝机制组织和过滤历史帧特征。在EndoVis2017与EndoVis2018上分别取得最高平均Dice 95.24与86.73，优于此前基于SAM及任务专用方法。

> **要点**：多尺度时序采样+记忆剪枝提升手术视频可提示分割(Dice 95.24/86.73)


#### 127. F2PASeg：内镜手术中垂体解剖结构分割的特征融合

*F2PASeg: Feature Fusion for Pituitary Anatomy Segmentation in Endoscopic Surgery*

**arXiv（预印本）** · 2025-08-07 · 方法学/新数据集(内镜垂体手术解剖分割) · [arXiv 2508.05465](https://arxiv.org/abs/2508.05465)

针对垂体手术中解剖结构分割因遮挡、相机运动与出血导致特征不一致，构建新的垂体解剖分割数据集PAS(120段视频提取7845张时序连贯图像)并用模拟器械的数据增强缓解类别不平衡，提出F2PASeg通过特征融合模块结合高分辨率图像特征与深层语义嵌入，实时稳健分割关键解剖结构以提供手术风险区域早期预警。

> **要点**：特征融合实现内镜垂体手术关键解剖结构实时分割与风险预警


#### 128. 用分层类增量语义分割实现动态机器人辅助手术场景理解

*Dynamic Robot-Assisted Surgery with Hierarchical Class-Incremental Semantic Segmentation*

**arXiv（预印本）** · 2025-08-03 · 方法学/基准(机器人手术场景类增量分割) · [arXiv 2508.01713](https://arxiv.org/abs/2508.01713)

针对静态数据训练的分割模型难以适应动态手术环境，基于TOPICS提出增强变体TOPICS+用于机器人手术场景稳健分割，将Dice损失纳入分层损失以处理强类别不平衡、引入分层伪标签并设计手术专用标签分类法。提出六个面向机器人手术的类增量语义分割(CISS)基准，并在Syn-Mediverse合成数据集上提供含144+类的精细标签作为在线评测基准。

> **要点**：类增量语义分割使手术场景理解模型持续适应新类而不遗忘


#### 129. StepAL：面向白内障手术视频的步骤感知主动学习

*StepAL: Step-aware Active Learning for Cataract Surgical Videos*

**arXiv（预印本）** · 2025-07-29 · 方法学/主动学习(手术步骤识别) · [arXiv 2507.22059](https://arxiv.org/abs/2507.22059)

针对传统主动学习(AL)对长而未修剪手术视频步骤识别的步骤间依赖处理不佳，提出面向整段视频选择的StepAL框架，整合利用伪标签捕捉每视频预测步骤分布的步骤感知特征表示与熵加权聚类策略，优先标注既不确定又步骤组成多样的视频。在Cataract-1k与Cataract-101两个数据集上以更少标注视频取得更高步骤识别准确率，持续优于现有AL方法。

> **要点**：步骤感知主动学习以更少标注实现更优手术步骤识别


#### 130. SurgPIS：弱监督部件感知的手术器械实例分割

*SurgPIS: Surgical-instrument-level Instances and Part-level Semantics for Weakly-supervised Part-aware Instance Segmentation*

**arXiv（预印本）** · 2025-07-25 · 方法学/弱监督(手术器械分割) · [arXiv 2507.19592](https://arxiv.org/abs/2507.19592)

将手术器械分割统一为部件感知实例分割(PIS)问题，提出首个手术器械PIS模型SurgPIS，采用基于Transformer的掩码分类并引入由器械级对象查询派生的部件专用查询，显式关联部件与其父器械实例。针对缺乏同时含实例与部件标注的大规模数据，提出弱监督策略从仅标注IIS或PSS的分离数据集学习，并用师生法保持一致性；在多个数据集上于PIS、IIS、PSS及器械级语义分割均达SOTA。

> **要点**：统一部件感知实例分割实现SOTA手术器械分割


#### 131. 内镜手术阶段识别、器械关键点估计与器械实例分割的比较验证(PhaKIR 2024挑战赛)

*Comparative validation of surgical phase recognition, instrument keypoint estimation, and instrument instance segmentation in endoscopy: Results of the PhaKIR 2024 challenge*

**arXiv（预印本）** · 2025-07-22 · 挑战赛/多中心基准(手术视频) · [arXiv 2507.16559](https://arxiv.org/abs/2507.16559)

作为MICCAI 2024 EndoVis挑战赛的PhaKIR子挑战，引入来自三家医疗机构的13段完整腹腔镜胆囊切除视频的多中心数据集，统一标注手术阶段识别、器械关键点估计与器械实例分割三项相互关联任务，支持跨完整手术的时序信息整合。按BIAS指南报告结果，为RAMIS中时序感知、上下文驱动方法提供独特基准。

> **要点**：多中心多任务基准推动手术阶段、器械关键点与分割的时序上下文方法


#### 132. 迈向整体化手术场景图

*Towards Holistic Surgical Scene Graph*

**arXiv（预印本）** · 2025-07-21 · 方法学/新数据集(手术场景图) · [arXiv 2507.15541](https://arxiv.org/abs/2507.15541)

针对以往手术场景图对工具-动作-目标多样组合及操作工具的手部身份等方面探索不足，提出Endoscapes-SG201数据集(含工具-动作-目标组合与手部身份标注)与基于图的方法SSG-Com以学习并表示这些关键要素。在安全关键视图(critical view of safety)评估与动作三元组识别等下游任务上，证明整合这些场景图组件对手术场景理解的重要贡献。

> **要点**：整合工具-动作-目标与手部身份的场景图提升手术场景理解


#### 133. SurgX：面向可解释手术阶段识别的神经元-概念关联

*SurgX: Neuron-Concept Association for Explainable Surgical Phase Recognition*

**arXiv（预印本）** · 2025-07-21 · 方法学/可解释性(手术阶段识别) · [arXiv 2507.15418](https://arxiv.org/abs/2507.15418)

针对深度学习手术阶段识别模型不透明难以理解决策，提出基于概念的解释框架SurgX，通过为神经元选择代表性示例序列、构建针对手术视频数据集的概念集、将神经元与概念关联并识别对预测关键的神经元，增强模型可解释性。在两个手术阶段识别模型上验证方法并分析预测解释。

> **要点**：神经元-概念关联提升手术阶段识别模型的可解释性


#### 134. BleedOrigin：内镜黏膜下剥离术动态出血源定位

*BleedOrigin: Dynamic Bleeding Source Localization in Endoscopic Submucosal Dissection via Dual-Stage Detection and Tracking*

**arXiv（预印本）** · 2025-07-20 · 方法学/新数据集+检测跟踪框架(ESD出血源) · [arXiv 2507.15094](https://arxiv.org/abs/2507.15094)

针对内镜黏膜下剥离(ESD)术中出血需实时定位与持续监测出血源，而现有AI多聚焦出血区域分割却忽视出血源检测与时序跟踪，构建首个综合ESD出血源数据集BleedOrigin-Bench(44例手术106,222帧中1,771个专家标注出血源,另含39,755伪标注帧,覆盖8个解剖部位与6类挑战场景)并提出双阶段检测-跟踪框架BleedOrigin-Net。与YOLOv11/v12、多模态大模型及点跟踪方法比较，出血起始检测帧级准确率96.85%、初始源检测像素级准确率70.24%、点跟踪像素级准确率96.11%达SOTA。

> **要点**：双阶段检测-跟踪框架实现ESD术中出血源实时定位与跟踪(起始检测96.85%)


#### 135. 记忆增强SAM2用于免训练手术视频分割

*Memory-Augmented SAM2 for Training-Free Surgical Video Segmentation*

**arXiv（预印本）** · 2025-07-13 · 方法学/免训练(手术视频分割) · [arXiv 2507.09577](https://arxiv.org/abs/2507.09577)

针对SAM2贪婪选择记忆设计在手术视频快速器械运动、频繁遮挡与复杂器械-组织交互下性能下降，提出免训练视频目标分割策略MA-SAM2，具上下文感知与抗遮挡记忆模型，并用多目标单循环单提示推理提升多器械视频跟踪效率。在不增加参数或额外训练下，于EndoVis2017与EndoVis2018上分别较SAM2提升4.36%与6.1%。

> **要点**：记忆增强使SAM2免训练稳健分割手术视频(较SAM2提升4.36%/6.1%)


#### 136. Geo-RepNet：面向内镜黏膜下剥离术(ESD)手术阶段识别的几何感知表征学习

*Geo-RepNet: Geometry-Aware Representation Learning for Surgical Phase Recognition in Endoscopic Submucosal Dissection*

**arXiv（预印本）** · 2025-07-12 · 方法学研究/深度学习(预印本) · [arXiv 2507.09294](https://arxiv.org/abs/2507.09294)

针对ESD不同阶段视觉相似度高、RGB图像缺乏结构线索的难题，首次引入深度信息提出几何感知卷积框架Geo-RepNet，基于可重参数化RepVGG骨干，融合深度引导几何先验生成(DGPG)与几何增强多尺度注意力(GEMA)模块。作者构建了含九个阶段、帧级密集标注的真实ESD视频数据集，实验证明Geo-RepNet在复杂低纹理手术场景下达到SOTA性能，兼具鲁棒性与高计算效率(预印本，未给出具体数值)。

> **要点**：首次将深度几何信息引入ESD手术阶段识别，在自建九阶段数据集上达SOTA。


#### 137. 面向多任务手术计算机视觉的多模态表征模型适配(MML-SurgAdapt)

*Adaptation of Multi-modal Representation Models for Multi-task Surgical Computer Vision*

**arXiv（预印本）** · 2025-07-07 · 方法学研究/深度学习(预印本) · [arXiv 2507.05020](https://arxiv.org/abs/2507.05020)

提出基于视觉-语言模型(CLIP)的统一多任务框架MML-SurgAdapt，用自然语言监督处理腹腔镜胆囊切除术中的阶段识别、关键安全视野(CVS)评估等多任务，并采用单正例多标签(SPML)学习应对多任务整合时的部分标注问题。在Cholec80、Endoscapes2023与CholecT50合并数据集上，性能与各任务专用基准相当且能处理噪声标注，同时将所需标签量减少23%，优于现有SPML框架。

> **要点**：CLIP多任务框架整合多个手术数据集，标签需求减少23%且性能媲美专用模型。


#### 138. DARIL：模仿学习在手术动作规划中何时优于强化学习

*DARIL: When Imitation Learning outperforms Reinforcement Learning in Surgical Action Planning*

**arXiv（预印本）** · 2025-07-07 · 方法学对比研究/深度学习(预印本) · [arXiv 2507.05011](https://arxiv.org/abs/2507.05011)

在CholecT50上首次系统比较模仿学习(IL)与强化学习(RL)用于手术动作(器械-动词-目标三元组)规划；提出的双任务自回归模仿学习基线DARIL达到34.6%动作三元组识别mAP和33.6%下一帧预测mAP，10秒预测时程平滑退化至29.2%。三种RL变体均劣于DARIL(世界模型RL在10s跌至3.1% mAP，直接视频RL仅15.9%)，揭示在专家标注测试集上分布匹配系统性偏向IL。

> **要点**：手术动作规划中IL(DARIL 34.6% mAP)全面优于RL，挑战RL优越性假设。


#### 139. CLIP-RL：结合对比语言-视觉预训练与强化学习的手术场景分割

*CLIP-RL: Surgical Scene Segmentation Using Contrastive Language-Vision Pretraining & Reinforcement Learning*

**arXiv（预印本）** · 2025-07-06 · 方法学研究/深度学习(预印本) · [arXiv 2507.04317](https://arxiv.org/abs/2507.04317)

提出面向手术场景语义分割的CLIP-RL模型，将对比语言-图像预训练与强化学习及课程学习结合，在训练全流程中持续迭代精炼分割掩膜，对遮挡、纹理变化和动态光照具鲁棒性。在EndoVis 2018上取得平均IoU 81%(优于SOTA)，在EndoVis 2017上取得平均IoU 74.12%。

> **要点**：CLIP+强化学习+课程学习的手术场景分割，EndoVis2018平均IoU达81%。


#### 140. Surg-SegFormer：面向整体手术场景分割的双Transformer模型

*Surg-SegFormer: A Dual Transformer-Based Model for Holistic Surgical Scene Segmentation*

**arXiv（预印本）** · 2025-07-06 · 方法学研究/深度学习(预印本) · [arXiv 2507.04304](https://arxiv.org/abs/2507.04304)

针对机器人辅助手术中现有先进分割模型依赖人工提示、难以处理超一小时长视频的问题，提出无需提示的双Transformer模型Surg-SegFormer用于整体手术场景分割(解剖组织、器械、血管等)。在EndoVis2018数据集上取得平均IoU(mIoU) 0.80，在EndoVis2017上取得0.54，优于当前SOTA，可减轻带教负担、助力住院医师理解复杂手术环境。

> **要点**：无提示双Transformer整体手术场景分割，EndoVis2018 mIoU 0.80。


#### 141. CPKD：临床先验知识约束扩散模型用于ESD手术阶段识别

*CPKD: Clinical Prior Knowledge-Constrained Diffusion Models for Surgical Phase Recognition in Endoscopic Submucosal Dissection*

**arXiv（预印本）** · 2025-07-04 · 方法学研究/生成式扩散模型(预印本) · [arXiv 2507.03295](https://arxiv.org/abs/2507.03295)

提出临床先验知识约束扩散(CPKD)生成式框架用于内镜黏膜下剥离术(ESD)手术阶段识别，以去噪扩散原理从随机噪声出发、以视觉-时序特征为条件逐步重建阶段序列，并设计条件掩码策略捕捉位置先验、边界模糊与关系依赖三大领域特性，融入临床先验以纠正阶段逻辑错误。在ESD820、Cholec80及外部多中心数据上达到优于或相当于SOTA的性能。

> **要点**：扩散生成范式+临床先验用于ESD阶段识别，多数据集达SOTA。


#### 142. 面向手术视频无监督物体发现的未来槽预测

*Future Slot Prediction for Unsupervised Object Discovery in Surgical Video*

**arXiv（预印本）** · 2025-07-02 · 方法学研究/无监督深度学习(预印本) · [arXiv 2507.01882](https://arxiv.org/abs/2507.01882)

针对物体中心槽注意力(slot attention)在异质手术视频场景中难以解析出有意义槽表示的问题，提出动态时序槽Transformer(DTST)模块，同时进行时序推理并预测最优的未来槽初始化。该模型在多个手术数据库上达到SOTA性能，证明无监督物体中心方法可应用于真实手术视频等医疗场景。

> **要点**：动态时序槽Transformer实现手术视频无监督物体发现，多库达SOTA。



### （三）手术机器人与自主操作（58 篇）

#### 1. 面向手术机器人无标记实时追踪的立体可微渲染精简方法

*Streamlining stereo differentiable rendering for marker-free real-time tracking of surgical robots*

**arXiv（预印本）** · 2026-07-14 · 方法开发+序列实验评测 · [arXiv 2607.12604](https://arxiv.org/abs/2607.12604)

扩展markerless姿态估计框架roboreg实现在线动态追踪，结合序贯优化与CUDA并行加速。在38条无遮挡与5条遮挡位移序列上评测，实现1080p/30fps实时追踪(原14fps)，静态真值下精度1.7cm/0.6°，对27,460帧marker参考的平均3D误差1.2cm(遮挡1,242帧为1.53cm)；动态估计比FoundationPose高11%(遮挡下63%)、静态高250%，推理快6倍。

> **要点**：立体可微渲染实现与marker法相当、超越基础模型的无标记手术机器人实时追踪。


#### 2. SurgAM：多模态特征融合的手术可供性图预测以实现机器人自主

*SurgAM: Surgical Affordance Map Prediction with Multimodal Feature Fusion for Robot Autonomy*

**arXiv（预印本）** · 2026-07-05 · 方法开发+数据集+phantom验证 · [arXiv 2607.04378](https://arxiv.org/abs/2607.04378)

提出'手术可供性预测'任务(从视觉数据识别抽吸、夹闭、牵拉三种基本手术动作的可操作区域)，构建自适应特征融合框架融合自监督ViT编码器(语义)与大规模生成模型编码器(空间感知)，并设计层级提示学习与场景引导注意力解码器。基于公开数据集建标注新数据集，实验达SOTA，并在真实肺与前列腺phantom上验证可供性图能成功驱动自主手术动作。

> **要点**：可供性图桥接视觉理解与自主动作规划，驱动机器人执行基本手术动作。


#### 3. SurgVLA-Bench：面向腹腔镜手术机器人的视觉-语言-动作模型评测基准

*SurgVLA-Bench: Towards Evaluating Vision-Language-Action Models for Laparoscopic Surgical Robotics*

**arXiv（预印本）** · 2026-06-28 · 基准构建+多模型评测 · [arXiv 2606.29247](https://arxiv.org/abs/2606.29247)

提出首个面向腹腔镜手术机器人的VLA评测基准SurgVLA-Bench，基于SurRoL仿真平台构建从原子动作到完整术式的层级任务体系与多维(动作准确率+语义一致性)评测框架。系统评测自回归模型(OpenVLA)与flow matching模型(π0、π0.5、SmolVLA)，发现自回归模型语义理解更强、flow matching精度更高但泛化有权衡，且最佳模型在腔镜受限视野下仍远不理想。

> **要点**：首个手术机器人VLA基准，揭示现有VLA在腔镜受限视野下仍不足。


#### 4. BiliVLA：强化学习的场景感知视觉-语言-动作模型用于自主胆道内窥镜导航

*BiliVLA: Scene-Aware Vision-Language-Action Model with Reinforcement Learning for Autonomous Biliary Endoscopic Navigation*

**arXiv（预印本）** · 2026-06-22 · 方法开发+phantom实验 · [arXiv 2606.23531](https://arxiv.org/abs/2606.23531)

面向ERCP胆道插管的自主导航，提出场景感知VLA框架BiliVLA，将导航建模为指令条件视觉运动学习，联合预测目标类别、grounded边界框与连续内镜的3-DoF离散运动指令，并引入场景感知监督与安全恢复监督，结合grounding增强SFT与GRPO两阶段训练。在物理phantom三项ERCP子任务上取得总mIoU 0.9625、总动作精度91.96%、总成功率84.85%的最佳表现。

> **要点**：语义grounding+奖励优化的VLA实现稳健自主胆道内窥镜导航。


#### 5. 通过Sim-to-Real视觉运动学习克服手术机器人的不完美运动学

*Overcoming Imperfect Kinematics in Surgical Robotics Through Sim-to-Real Visuomotor Learning*

**arXiv（预印本）** · 2026-06-19 · 方法开发+dVRK实机部署 · [arXiv 2606.21396](https://arxiv.org/abs/2606.21396)

针对手术机器人内部传感器不可靠、运动学不准导致控制误差的问题，采用teacher-student学习框架训练策略，以闭环视觉反馈主动补偿硬件误差、融合不可靠内部读数与精确外部视觉数据实时纠正运动学误差，无需精确物理模型。策略在da Vinci Research Kit上成功部署，实验验证了用外部视觉克服内部传感缺陷的可行性(未给具体数值)。

> **要点**：视觉运动学习实时补偿运动学误差，为稳健手术自动化奠基。


#### 6. SurgVista：具合理器械-组织动力学的长时程手术世界模型

*SurgVista: Long-Horizon Surgical World Modeling with Plausible Instrument-Tissue Dynamics*

**arXiv（预印本）** · 2026-06-18 · 方法开发+SurgWorld-Bench基准 · [arXiv 2606.19889](https://arxiv.org/abs/2606.19889)

针对自主手术策略学习中专家示范昂贵、在体探索风险高的问题，提出手术世界模型SurgVista，以两项训练策略缓解现有方法的空间交互不一致与时序保真崩塌：变形一致性正则(从视频提取场景点轨迹、经隐空间对比学习强化物理一致的器械-组织动力学)与漂移适应训练(用在线预测残差与光度增强扰动条件帧以抑制长时程漂移)。并推出SurgWorld-Bench基准，实验显示在视觉质量、时序一致与交互保真上均超SOTA且随预测时程增长优势扩大(未给具体数值)。

> **要点**：长时程手术世界模型生成物理合理未来帧，支撑自主手术策略学习。


#### 7. 自监督掩码感知Transformer用于微创手术机器人容错FBG力觉传感

*Self-Supervised Mask-Aware Transformers for Fault-Tolerant FBG Force Sensing in Minimally Invasive Surgical Robotics*

**arXiv（预印本）** · 2026-06-17 · 方法开发+8通道FBG数据集评测 · [arXiv 2606.18628](https://arxiv.org/abs/2606.18628)

针对微创手术机器人导管级FBG传感器的非线性轴间耦合与光纤断裂通道丢失问题，提出统一的自监督掩码感知Transformer显式建模通道可用性以实现优雅降级：编码器经掩码通道重建预训练、力回归微调，并设并行不确定性头一次前向预测各轴置信。在8通道FBG数据集上，标称RMSE 0.0066N、4通道失效下降为0.0126N，优于255个逐模式神经网络组成的模型库(4通道丢失0.0154N)且免除逐模式标定。

> **要点**：单一掩码感知Transformer实现容错FBG力觉传感，优于255模型库。


#### 8. 腹腔镜胆囊切除phantom上自主夹闭定位的点云分割

*Point Cloud Segmentation for Autonomous Clip Positioning in Laparoscopic Cholecystectomy on a Phantom*

**arXiv（预印本）** · 2026-06-10 · 方法开发+phantom实机实验 · [arXiv 2606.12048](https://arxiv.org/abs/2606.12048)

展示首个在物理phantom上演示腹腔镜手术自主夹闭定位的机器人系统：对单相机无色点云分割后，以样条插值提取夹闭目标位置(可由操作者调整)，端执行器运动轨迹可视化以满足微创运动约束并保证可验证可解释。分割模型仅用60个手工标注真实点云训练，辅以128,000个合成点云预训练与两种数据增强。真实机器人实验以0.75mm所需精度、95%成功率定位目标，自主夹闭定位成功率100%。

> **要点**：数据高效点云分割实现可解释的腹腔镜自主夹闭定位(95%/100%成功率)。


#### 9. 手术机器人任务学习策略的对抗攻击

*Adversarial Attacks on Learned Policies for Surgical Robotic Tasks*

**arXiv（预印本）** · 2026-06-10 · 安全/对抗研究+560次物理实验 · [arXiv 2606.11535](https://arxiv.org/abs/2606.11535)

首次研究学习式手术机器人策略的对抗威胁，考察两类：破坏性攻击(不可感知视觉扰动中断策略执行)与操纵性攻击(将策略动作导向攻击者指定方向)，提出访问权限递增的三种攻击方法，并引入模仿光照变化等自然视觉变化的光度对抗攻击。在debridement与suturing两子任务、ACT/Diffusion Policy/Pi0三种端到端策略上，共560次phantom物理实验显示SOTA策略可被显著破坏，手术子任务成功率平均下降61%。

> **要点**：学习式手术机器人策略易受对抗攻击，子任务成功率平均降61%，警示安全风险。


#### 10. 面向远程手术的轴集成力感知与基于Transformer的动力学补偿

*Shaft-integrated Force Sensing with Transformer-based Dynamics Compensation for Telesurgery*

**arXiv（预印本）** · 2026-05-29 · 器械设计+Transformer估计方法+实验验证 · [arXiv 2605.31434](https://arxiv.org/abs/2605.31434)

将六轴商用力传感器集成到标准缆索驱动手术器械远端以测量末端执行器力，并用Transformer神经网络融合力传感与机器人状态、补偿缆索内力。该方法归一化误差低于6%，对未见工况的泛化优于纯近端数据驱动方法；高缆索力会致传感器饱和、降低轴向力可观测性，从而影响主轴与高负载性能。

> **要点**：Transformer动力学补偿使远程手术器械末端力估计归一化误差<6%，助力触觉反馈与自主。


#### 11. 开放手术机器人辅助的模仿学习：缝合跟随的多策略评测

*Imitation Learning for Robot Assistance in Open Surgery: A Multi-Policy Evaluation on Suture Following*

**arXiv（预印本）** · 2026-05-27 · 机器人模仿学习实验研究 · [arXiv 2605.28736](https://arxiv.org/abs/2605.28736)

首次评测通用模仿学习用于开放手术中外科医生-机器人协作的缝合跟随任务，采集160次遥操作演示(32,374帧)，在数据量、相机视角、背景变化三维度对ACT、Diffusion Policy、SmolVLA、π0四种策略(28个模型/32种配置)做基准。理想条件下四策略任务成功率50-75%，深度误差为主要失败模式；π0凭预训练视觉-语言骨干表现最强，在外科医生-机器人缝合试验中缝针完成率达92%。

> **要点**：π0模仿学习在开放手术协作缝合中达92%缝针完成率，确立该任务可行性。


#### 12. 面向可变形组织外科机器人暴露任务的学习型自适应控制

*Learning-Based Adaptive Control for Surgical Robotic Exposure Task on Deformable Tissues*

**arXiv（预印本）** · 2026-05-18 · 仿真+真实实验（方法开发） · [arXiv 2605.17927](https://arxiv.org/abs/2605.17927)

针对被覆盖组织牵拉暴露ROI的自主执行难题，提出基于学习的自适应控制框架：在线监测组织视觉边界优化控制输入，并借助仿真训练的深度形变估计模型确定最优抓取点、保证控制器收敛与安全。仿真与不同可变形材料的真实实验表明该框架对相似任务零样本适应，可完成从抓取选择到ROI完全暴露的自主牵拉。

> **要点**：学习型自适应控制实现外科机器人自主组织牵拉暴露，具零样本适应能力。


#### 13. 基于多模态术中信息统一力学表征的自主腹腔镜控制

*Autonomous Laparoscope Control through Unified Mechanics-Based Representation of Multimodal Intraoperative Information*

**arXiv（预印本）** · 2026-05-06 · 方法开发+假体与活体猪验证 · [arXiv 2605.04408](https://arxiv.org/abs/2605.04408)

提出基于统一力学建模的持镜机器人控制方法，将位置、力/力矩、图像等物理意义各异的术中多模态信号统一为操作空间中的等效力旋量，经任务优先级投影合成腹腔镜控制指令。以远心点(RCM)约束力旋量、顺应拖动力旋量与器械跟踪力旋量为例，在手术假体与活体猪实验中实现多任务操作(顺应操控与自主器械跟踪)，维持RCM约束并降低套管口持续受力。

> **要点**：统一力学力旋量表征实现自主持镜与器械跟踪，兼顾RCM约束与套管口减载。


#### 14. arg-VU：面向机器人手术视觉理解的物理感知3D几何可供性推理

*arg-VU: Affordance Reasoning with Physics-Aware 3D Geometry for Visual Understanding in Robotic Surgery*

**arXiv（预印本）** · 2026-03-26 · 方法学研究(具身/可供性推理) · [arXiv 2603.26814](https://arxiv.org/abs/2603.26814)

针对可变形软组织与工具运动动态耦合，提出物理感知可供性推理框架arg-VU:用3D高斯泼溅(3DGS)重建并转为时序跟踪表面，扩展位置动力学(XPBD)嵌入局部形变约束生成代表性几何点(RGP)与各向异性刚度度量，结合SE(3)工具位姿计算物理感知顺应能量与位置一致性得分。手术视频实验显示比运动学基线更稳定、物理一致且可解释的可供性预测，支持具身机器人交互。

> **要点**：物理感知几何表征使可变形手术环境的可供性推理更稳定可靠。


#### 15. PinPoint：经Stein变分牛顿与几何残差的机器人缝合单目针位姿估计

*PinPoint: Monocular Needle Pose Estimation for Robotic Suturing via Stein Variational Newton and Geometric Residuals*

**arXiv（预印本）** · 2026-03-24 · 方法学研究(变分位姿估计) · [arXiv 2603.23365](https://arxiv.org/abs/2603.23365)

面向自主机器人缝合中单目内镜下针位姿因深度歧义与旋转对称而病态(多模态分布)，提出概率变分推断框架PinPoint:结合单目图像观测与机器人抓持约束的解析几何似然(含闭式Jacobian)，在Stein变分牛顿推断中用二阶粒子传输移向高概率区、核排斥保持多模态多样性。真实序列上平移误差降80%(至1.00mm)、旋转误差降78%(至13.80度)；诱导旋转序列中84%时间保持双峰后验(约为粒子滤波基线3倍)；离体缝合遮挡时平均误差1.34mm/19.18度。

> **要点**：变分推断显式建模歧义，单目针位姿误差降80%并保持多模态后验，服务自主缝合。


#### 16. SutureFormer：在像素空间经目标条件离线强化学习学习手术轨迹

*SutureFormer: Learning Surgical Trajectories via Goal-conditioned Offline RL in Pixel Space*

**arXiv（预印本）** · 2026-03-19 · 方法学研究(离线RL/轨迹预测) · [arXiv 2603.26720](https://arxiv.org/abs/2603.26720)

面向机器人辅助缝合的针轨迹预测，将其建模为序贯决策(针尖作为在像素空间逐步移动的智能体)，提出目标条件离线强化学习框架SutureFormer:经三次样条插值把稀疏标注变稠密奖励，采用保守Q学习(CQL)+行为克隆正则实现稳定离线策略优化，自回归预测由离散方向与连续幅度组成的未来路点。在新肾脏创面缝合数据集(1,158条轨迹、50例患者)上，平均位移误差(ADE)较最强基线降低58.6%。

> **要点**：像素级序贯建模+离线RL将手术针轨迹预测ADE降低58.6%。


#### 17. 手术机器人关节空间路径规划：黎曼流形方法

*Surgical Robot, Path Planning, Joint Space, Riemannian Manifolds*

**arXiv（预印本）** · 2026-03-16 · 方法学研究(机器人运动规划) · [arXiv 2603.14852](https://arxiv.org/abs/2603.14852)

针对微创手术机器人绕固定穿刺口运动、常遇关节角度受限及腹腔非凹面导致路径搜索计算昂贵的问题，提出将位置映射到黎曼流形、在关节空间做路径规划的方法，定义边代价函数以缩小关节活动范围；因器官多为非凹面便于用梯度下降求最优路径。实验表明相较位置空间计算可减小关节角运动范围。

> **要点**：黎曼流形关节空间规划减小手术机器人关节活动范围以服务自主引导。


#### 18. 基于实时渲染与进化优化的手术器械追踪

*Real-time Rendering-based Surgical Instrument Tracking via Evolutionary Optimization*

**arXiv（预印本）** · 2026-03-12 · 方法学研究(渲染+进化优化位姿估计) · [arXiv 2603.11404](https://arxiv.org/abs/2603.11404)

针对机器人辅助微创手术中器械部分可见、结构特殊导致追踪困难的问题，将进化优化策略CMA-ES引入通用追踪流水线，联合估计器械位姿与关节构型，用批量渲染并行评估多个候选位姿以降低推理时间、提升收敛鲁棒性，并可推广到无关节角与双手追踪。合成与真实数据实验显示在精度与运行时间上均显著优于既有方法。

> **要点**：CMA-ES渲染式追踪提升手术机器人器械位姿估计精度与效率。


#### 19. SurgCalib：基于高斯泼溅的机器人辅助微创手术手眼标定

*SurgCalib: Gaussian Splatting-Based Hand-Eye Calibration for Robot-Assisted Minimally Invasive Surgery*

**arXiv（预印本）** · 2026-03-09 · 方法学研究(公开基准验证) · [arXiv 2603.08983](https://arxiv.org/abs/2603.08983)

面向da Vinci手术机器人手眼标定，提出无标记物、可用于手术室的SurgCalib框架：用原始运动学初始化器械位姿，在高斯泼溅可微渲染流水线中于RCM约束下两阶段优化，避免引入违反无菌的标记物。在公开dVRK基准SurgPose上，左右器械2D尖端重投影误差分别12.24px(2.06mm)与11.33px(1.9mm)，3D尖端欧氏误差分别5.98mm与4.75mm。

> **要点**：高斯泼溅可微渲染实现手术机器人无标记物手眼标定。


#### 20. 面向自主腹腔镜手术的开源机器人研究平台

*An Open-Source Robotics Research Platform for Autonomous Laparoscopic Surgery*

**arXiv（预印本）** · 2026-03-09 · 系统开发与体模/离体/活体验证 · [arXiv 2603.08490](https://arxiv.org/abs/2603.08490)

针对da Vinci研究套件因线驱机械限制难以训练可靠自主策略的问题，提出与机器人无关、基于闭式解析速度求解器的开源远程运动中心(RCM)控制器，可让任意工业机械臂(提供UR5e、Franka Panda实现)充当手术机器人并集成立体3D感知与ROS全栈平台(支持遥操作、演示记录与策略部署)。在体模、离体及活体猪腹腔镜抓肠回缩任务中RCM偏差始终亚毫米级，轨迹平滑度(SPARC、LDLJ)与JIGSAWS专家演示相当。

> **要点**：开源RCM平台为自主腹腔镜手术提供亚毫米精度的策略部署基础。


#### 21. SSP：联合行为与空间约束优化的安全保证手术策略

*SSP: Safety-guaranteed Surgical Policy via Joint Optimization of Behavioral and Spatial Constraints*

**arXiv（预印本）** · 2026-03-07 · 方法学研究(仿真+dVRK验证) · [arXiv 2603.07032](https://arxiv.org/abs/2603.07032)

针对数据驱动手术机器人策略(RL/IL)缺乏形式化安全保证的问题，提出SSP框架：用神经常微分方程(Neural ODE)学习不确定性感知动力学模型，据此构建鲁棒控制屏障函数(CBF)安全控制器，在行为约束与空间约束(手术禁区)下最小化改动策略动作。在SurRoL仿真与dVRK上，相比无约束基线实现近零约束违反率同时保持高任务成功率。

> **要点**：CBF安全控制器为数据驱动手术机器人策略提供近零违规的安全保证。


#### 22. ArthroCut：膝关节置换机器人骨切除的自主策略学习

*ArthroCut: Autonomous Policy Learning for Robotic Bone Resection in Knee Arthroplasty*

**arXiv（预印本）** · 2026-03-04 · 方法学研究(台架实验) · [arXiv 2603.03957](https://arxiv.org/abs/2603.03957)

提出自主策略学习框架ArthroCut，将膝关节置换机器人从辅助执行升级为情境感知动作生成：在自建时间同步多模态数据集(21例完整病例、23,205对RGB-D)上微调Qwen-VL主干，融合术前CT/MR、术中NDI追踪、RGB-D视频、机器人状态与文本意图，用术前影像token(PIT)与时间对齐手术token(TAST)在语法/安全约束解码下输出可解释动作。台架七次试验六项标准骨切除平均成功率86%，显著优于强基线。

> **要点**：术前几何与时间对齐术中感知融合驱动骨科机器人可解释自主骨切除(成功率86%)。


#### 23. 基于3D空间先验的手术机器人操作学习

*Learning Surgical Robotic Manipulation with 3D Spatial Priors*

**arXiv（预印本）** · 2026-03-04 · 方法学研究(真实机器人实验+新数据集) · [arXiv 2603.03798](https://arxiv.org/abs/2603.03798)

针对手术机器人操作需精细3D空间感知、而显式重建易误差累积、腕载相机干扰机械臂的问题，提出端到端视觉运动策略Spatial Surgical Transformer(SST)：直接挖掘内镜图像中的3D空间线索，构建含3万对立体内镜图像及精确3D几何的Surgical3D数据集，微调几何Transformer提取3D潜表示并经轻量多级空间特征连接器(MSFC)对齐到动作空间。真实机器人实验在打结、离体器官剥离等复杂任务上达SOTA且空间泛化强。

> **要点**：内嵌3D空间先验的端到端策略提升手术机器人复杂操作与空间泛化。


#### 24. "递剪刀"：无碰撞双臂手术辅助机器人器械递送

*Give me scissors: Collision-Free Dual-Arm Surgical Assistive Robot for Instrument Delivery*

**arXiv（预印本）** · 2026-03-03 · 方法学研究(机器人系统实验) · [arXiv 2603.02553](https://arxiv.org/abs/2603.02553)

面向器械护士频繁递送器械导致疲劳与分心的问题，提出无碰撞双臂手术辅助机器人：用视觉-语言模型零样本地依术者指令自动生成抓取与递送轨迹，并提出实时障碍最小距离感知融入统一二次规划框架，保证动态环境下反应式避障与自碰撞防护。实验验证器械递送成功率83.33%且全程平滑无碰撞。

> **要点**：VLM驱动的双臂机器人实现无碰撞手术器械自主递送(成功率83.33%)。


#### 25. 面向手术机器人抓持的无传感器高精度力调控：离线-在线混合强化学习

*Hybrid Offline-Online Reinforcement Learning for Sensorless, High-Precision Force Regulation in Surgical Robotic Grasping*

**arXiv（预印本）** · 2026-02-27 · 方法学研究（强化学习机器人力控，仿真+硬件实验） · [arXiv 2602.23870](https://arxiv.org/abs/2602.23870)

针对腱驱动手术器械抓持力调控难题，构建da Vinci Xi抓持机构的物理一致数字孪生，采用三阶段流程（CMA-ES专家轨迹、Implicit Q-Learning离线学习、TD3在线微调）实现无远端传感的力控。仿真中力误差控制在期望值1%以内，硬件实验平均力误差低于4%；策略约71k参数、以kHz频率运行，验证了sim-to-real迁移。

> **要点**：无需远端力传感即可实现手术机器人抓持的高精度力调控。


#### 26. 策略监督的自主腹腔镜控镜：事件驱动图挖掘

*Strategy-Supervised Autonomous Laparoscopic Camera Control via Event-Driven Graph Mining*

**arXiv（预印本）** · 2026-02-24 · 方法学研究（VLM+视觉伺服控制，离体实验） · [arXiv 2602.20500](https://arxiv.org/abs/2602.20500)

提出策略化自主控镜框架，离线将手术视频解析为控镜相关时序事件并构建属性事件图，挖掘可复用的控镜策略原语作为监督；在线由微调VLM预测策略与运动指令，经IBVS-RCM控制器在安全约束下执行。事件解析F1达0.86、策略聚类纯度0.81；离体硅胶与猪组织实验中优于初级医师，视野居中误差降低35.26%、画面抖动降低62.33%。

> **要点**：策略监督的VLM控镜在标准化评估中超越初级外科医师。


#### 27. 附着锚点：结直肠手术腹腔镜抓持点预测的新框架

*Attachment Anchors: A Novel Framework for Laparoscopic Grasping Point Prediction in Colorectal Surgery*

**arXiv（预印本）** · 2026-02-19 · 方法学研究（自主组织操作，90例手术数据集） · [arXiv 2602.17310](https://arxiv.org/abs/2602.17310)

提出附着锚点(attachment anchors)结构化表示，编码结直肠手术中组织与解剖附着的局部几何-力学关系，将手术场景归一化到一致局部参考系以降低抓持点预测不确定性。基于90例结直肠手术数据集实验表明，附着锚点较仅用图像的基线提升抓持点预测，在未见术式与未见术者等分布外场景增益尤为显著。

> **要点**：附着锚点作为中间表示提升结直肠手术自主抓持的泛化能力。


#### 28. 内镜连续体机械臂的无标记6D位姿估计与位置视觉伺服

*Markerless 6D Pose Estimation and Position-Based Visual Servoing for Endoscopic Continuum Manipulators*

**arXiv（预印本）** · 2026-02-18 · 方法学研究（机器人位姿估计+视觉伺服，真实验证） · [arXiv 2602.16365](https://arxiv.org/abs/2602.16365)

提出面向连续体机械臂的无标记立体6D位姿估计与位置视觉伺服统一框架，用光真实感仿真自动生成像素级标注、以立体多特征融合网络联合利用分割/关键点/热图/边界框，并用单次渲染细化与自监督sim-to-real适配。真实验证中1000样本平均平移误差0.83mm、旋转误差2.76°；闭环伺服平移误差2.07mm、旋转误差7.41°，较开环分别降低85%与59%。

> **要点**：首个无标记位姿驱动的连续体机械臂闭环视觉伺服框架。


#### 29. 腔内场景的实时单目二维/三维感知以控制柔性机器人内镜器械

*Real-time Monocular 2D and 3D Perception of Endoluminal Scenes for Controlling Flexible Robotic Endoscopic Instruments*

**arXiv（预印本）** · 2026-02-16 · 方法学研究（机器人感知+仿真，原型评估） · [arXiv 2602.14666](https://arxiv.org/abs/2602.14666)

面向腔内手术，构建连续体机器人系统的视觉感知平台，用单目内镜图像识别柔性器械的位置与朝向并测量其与组织距离，提出2D/3D学习感知算法并开发物理真实的柔性器械动力学仿真器以生成数据。模块级与系统级评估显示算法改善器械控制，轨迹跟随任务操作时间缩短逾70%。

> **要点**：单目感知使柔性机器人内镜器械控制的操作时间缩短70%以上。


#### 30. 面向内镜黏膜下剥离的解耦双段连续体机器人深度学习控制

*Deep-Learning-Based Control of a Decoupled Two-Segment Continuum Robot for Endoscopic Submucosal Dissection*

**arXiv（预印本）** · 2026-02-03 · 方法学研究（机器人深度学习控制，离体实验） · [arXiv 2602.03406](https://arxiv.org/abs/2602.03406)

研制带集成手术钳、6自由度尖端灵巧度的双段解耦连续体机器人DESectBot用于ESD，并提出基于GRU的尖端位置与朝向同步控制器处理段间非线性耦合，与雅可比逆运动学、MPC、FNN、LSTM对比。GRU取得最低轨迹跟踪RMSE（1.11mm/4.62°、0.81mm/2.59°），peg transfer任务100%成功（120/120）、平均11.8s，并完成离体ESD演示。

> **要点**：GRU控制显著提升ESD连续体机器人的精度与可靠性。


#### 31. 面向手术抓持与牵拉的监督式混合专家(MoE)

*Supervised Mixture-of-Experts for Surgical Grasping and Retraction*

**arXiv（预印本）** · 2026-01-29 · 方法学研究（手术机器人模仿学习，离体+活体演示） · [arXiv 2601.21971](https://arxiv.org/abs/2601.21971)

提出可叠加于任意自主策略之上的监督式混合专家(MoE)架构用于阶段结构化手术操作，使轻量动作解码策略Action Chunking Transformer(ACT)仅用不足150个演示、仅凭立体内镜图像即可学习复杂长时程操作。在肠管抓持与牵拉协作任务上，通用VLA模型完全失败、标准ACT仅中等成功，而MoE显著提升分布内成功率与分布外（新抓持点、低光照、部分遮挡）鲁棒性，并零样本迁移至离体猪组织，附活体猪手术初步演示。

> **要点**：监督式MoE使不足150演示即可学得鲁棒的手术抓持牵拉自主操作。


#### 32. 基于学习-仿真的多臂腹腔镜手术机器人碰撞感知最小距离估计

*Neural Minimum-Distance Estimation for Collision-Aware Operation of Multi-Arm Laparoscopy Surgical Robots Through Learning-from-Simulation*

**arXiv（预印本）** · 2026-01-21 · 仿真+ML建模 · [arXiv 2601.15459](https://arxiv.org/abs/2601.15459)

结合解析建模、实时仿真与机器学习，估计多臂手术机器人间最小距离并实现碰撞预警。用两台7自由度Kinova机械臂的3D仿真生成数据集训练深度残差神经网络，在保留验证集上达到R²=0.940、RMSE=42.0mm、MAE=28.7mm、近零偏差；当预测臂间距<0.2m(对应表面间隙约50mm)时触发预警。

> **要点**：深度残差网络以R²=0.940预测多臂手术机器人间距，作为早期碰撞预警层。


#### 33. 面向机器人腹腔镜手术安全触觉反馈的学习型力感知与阻抗匹配

*Learning-based Force Sensing and Impedance Matching for Safe Haptic Feedback in Robot-assisted Laparoscopic Surgery*

**arXiv（预印本）** · 2026-01-20 · 方法学/系统(力渲染) · [arXiv 2601.14445](https://arxiv.org/abs/2601.14445)

提出非线性阻抗匹配方法(NIMA)，在此前IMA基础上引入非线性动力学以实时精确渲染复杂工具-组织交互力。NIMA平均绝对误差为0.01N(标准差0.02N)，较IMA降低95%，并消除释放手柄时的触觉回冲(施加零力)，提升患者安全与操作者舒适度。

> **要点**：NIMA将机器人手术触觉力渲染误差较IMA降低95%并消除回冲。


#### 34. 基于合成数据的强化学习用于跟随领导者式机器人内镜导航

*Reinforcement Learning for Follow-the-Leader Robotic Endoscopic Navigation via Synthetic Data*

**arXiv（预印本）** · 2026-01-06 · 方法学/RL+仿真合成数据 · [arXiv 2601.02798](https://arxiv.org/abs/2601.02798)

提出基于单目深度估计引导的视觉强化学习框架，实现柔性连续体内镜机器人在肠道内的自主跟随领导者导航以减少与肠壁接触。在NVIDIA Omniverse构建逼真肠道仿真环境训练，用NVIDIA Replicator生成数千张合成腔内图像微调Depth Anything模型实现单目稠密3D感知，并设计几何感知奖惩机制。较原始Depth Anything，δ1深度精度提升39.2%，导航J-index较次优方法降低0.67。

> **要点**：视觉RL+合成数据实现自主内镜导航，深度精度提升39.2%、J-index降0.67。


#### 35. Cosmos-H-Surgical：通过世界建模从视频学习手术机器人策略

*Cosmos-H-Surgical: Learning Surgical Robot Policies from Videos via World Modeling*

**arXiv（预印本）** · 2025-12-29 · 方法学/DL(世界模型+VLA) · [arXiv 2512.23162](https://arxiv.org/abs/2512.23162)

针对手术机器人缺乏配对视频-动作数据的难题，基于先进物理AI世界模型与自建的手术动作-文本对齐(SATA)数据集构建Cosmos-H-Surgical，可生成多样、可泛化、逼真的手术视频；并首次用逆动力学模型从合成手术视频推断伪运动学，产生合成配对视频-动作数据。用增强数据训练的手术VLA策略在真实手术机器人平台上显著优于仅用真实演示训练的模型。

> **要点**：世界模型生成合成视频-动作数据，训练的手术VLA策略优于仅真实演示。


#### 36. SurgiPose：从单目视频估计手术器械运动学用于手术机器人学习

*SurgiPose: Estimating Surgical Tool Kinematics from Monocular Video for Surgical Robot Learning*

**arXiv（预印本）** · 2025-12-19 · 方法学/DL(可微渲染) · [arXiv 2512.18068](https://arxiv.org/abs/2512.18068)

提出基于可微渲染的SurgiPose，从单目手术视频估计器械轨迹与关节角(通过优化位姿参数最小化渲染图与真实图差异)，无需真值运动学，以支持从海量在线手术视频进行大规模机器人模仿学习。在dVRK Si上的组织提拉与取针两项任务中，用估计运动学训练的模仿学习策略成功率与用真值运动学训练者相当。

> **要点**：SurgiPose从单目视频估计器械运动学，训练的机器人策略媲美真值运动学。


#### 37. ProbeMDE：不确定性引导的主动本体感觉用于手术机器人单目深度估计

*ProbeMDE: Uncertainty-Guided Active Proprioception for Monocular Depth Estimation in Surgical Robotics*

**arXiv（预印本）** · 2025-12-12 · 方法学/DL(主动感知，体模实验) · [arXiv 2512.11773](https://arxiv.org/abs/2512.11773)

提出成本感知主动感知框架ProbeMDE，融合RGB图像与稀疏本体感觉测量(机器人在已知构型触碰环境)进行单目深度估计，用MDE模型集成的方差量化预测不确定性，并以Stein变分梯度下降(SVGD)选择信息量最大的触碰位置避免模式坍缩。在中央气道阻塞手术体模的仿真与物理实验中，以更少本体感觉测量取得高于基线的深度精度。

> **要点**：ProbeMDE用不确定性引导主动触碰以更少测量提升手术机器人单目深度精度。


#### 38. 看、规划、切割：OCT引导的MPC自主体积式机器人激光手术

*See, Plan, Cut: MPC-Based Autonomous Volumetric Robotic Laser Surgery with OCT Guidance*

**arXiv（预印本）** · 2025-11-21 · 方法学/系统研究（自主手术机器人，组织体模与离体猪组织） · [arXiv 2511.17777](https://arxiv.org/abs/2511.17777)

提出OCT引导的自主体积式软组织切除机器人平台RATS，融合宏观RGB-D、微观OCT与光纤耦合手术激光，经多级标定实现OCT-激光标定精度0.161±0.031mm；超高斯激光-组织交互模型刻画消融坑形态平均RMSE 0.231±0.121mm，优于高斯基线；基于采样的模型预测控制(MPC)直接在OCT体素上生成约束感知切除轨迹，闭环达0.842mm RMSE、交并比较前馈提升64.8%，并能探测并保留皮下结构。

> **要点**：OCT引导MPC实现亚毫米级自主体积式激光组织切除并保护关键结构。


#### 39. 用机器人柔性内镜推进开放腔体内的微创精准手术

*Advancing Minimally Invasive Precision Surgery in Open Cavities with Robotic Flexible Endoscopy*

**arXiv（预印本）** · 2025-11-18 · 系统/可行性研究（在体动物实验） · [arXiv 2511.14458](https://arxiv.org/abs/2511.14458)

提出结合磁驱动柔性内镜与遥操作/半自主导航的机器人平台，用于开放腔体内复杂微创手术（如胎儿镜激光凝固），可执行靶向激光消融并实时重建内镜场景马赛克以扩展持续视野、增强术中感知，在绵羊活体模型中在体验证。

> **要点**：磁驱柔性内镜加半自主导航与实时马赛克重建改善开放腔体微创手术。


#### 40. 前列腺中叶经尿道剜除的监督式自主切除与牵拉框架

*A Supervised Autonomous Resection and Retraction Framework for Transurethral Enucleation of the Prostatic Median Lobe*

**arXiv（预印本）** · 2025-11-11 · 可行性研究（半自主手术机器人，体模） · [arXiv 2511.08490](https://arxiv.org/abs/2511.08490)

面向双臂经尿道同心管机器人(Virtuoso)，提出基于模型的切除规划器与学习式牵拉网络PushCVAE协同的半自主组织切除框架：规划器直接在分割CT体积上生成左/中、右/中沟槽切除与中叶钝性分离三阶段剜除轨迹，PushCVAE经外科医生示范训练按阶段生成牵拉。在类组织水凝胶前列腺体模上以L3（监督）自主级执行，实现97.1%的靶体积切除。

> **要点**：图像引导规划加学习式牵拉实现经尿道机器人前列腺剜除的监督自主化。


#### 41. TumorMap：用于三维肿瘤映射与全自动肿瘤切除的激光手术平台

*TumorMap: A Laser-based Surgical Platform for 3D Tumor Mapping and Fully-Automated Tumor Resection*

**arXiv（预印本）** · 2025-11-07 · 系统/临床前研究（自主手术机器人，小鼠模型） · [arXiv 2511.05723](https://arxiv.org/abs/2511.05723)

提出集成三激光机制（OCT、激光诱导内源荧光、切割激光刀）与深度学习模型的手术机器人平台TumorMap，构建术中三维肿瘤边界并实现非接触全自动肿瘤切除。在小鼠骨肉瘤与软组织肉瘤模型中验证并建立评估传感器性能的组织病理工作流，以亚毫米级激光切除精度实现无需任何人工干预的多模态传感器引导自主肿瘤手术。

> **要点**：多模态激光加深度学习实现亚毫米级全自动非接触肿瘤切除。


#### 42. 用于眼内手术的高精度手术机器人系统

*High-Precision Surgical Robotic System for Intraocular Procedures*

**arXiv（预印本）** · 2025-11-03 · 系统/工程研究（手术机器人） · [arXiv 2511.01232](https://arxiv.org/abs/2511.01232)

设计并制造聚焦于工具尖精度、跟踪性能与平滑器械更换机制的新型眼内（白内障与玻璃体视网膜）手术机器人系统，经光学相干断层成像(OCT)系统外部评估。经机器人标定与精确坐标配准，工具尖定位精度达0.053±0.031mm，并在OCT引导、深度学习术前解剖建模与实时监督的自动白内障晶状体摘除中演示整体性能。

> **要点**：高精度眼内手术机器人结合OCT引导与深度学习建模实现自动晶状体摘除。


#### 43. STITCH 2.0：以EKF针位估计与缝线管理扩展增强缝合

*STITCH 2.0: Extending Augmented Suturing with EKF Needle Estimation and Thread Management*

**arXiv（预印本）** · 2025-10-29 · 机器人系统实验评估(15次试验) · [arXiv 2510.25768](https://arxiv.org/abs/2510.25768)

针对机器人自主缝合中针跟踪不准、缝线管理差的问题，提出STITCH 2.0增强灵巧流水线(含改进EKF针位姿估计、缝线解缠与自动3D缝合对齐等7项改进)。15次试验平均达74.4%创口闭合、每次4.87针，较前基线多66%缝针数、少38%时间；允许两次人工干预时平均6针、100%创口闭合。

> **要点**：自主缝合流水线显著提升创口闭合率与效率，人工少量干预可达100%闭合。


#### 44. 无标记的手术机器人本体感知：铺巾遮挡下的定位

*Localising under the drape: proprioception in the era of distributed surgical robotic system*

**arXiv（预印本）** · 2025-10-27 · 方法学(深度学习)+多中心数据(1.4M图像) · [arXiv 2510.23512](https://arxiv.org/abs/2510.23512)

提出无标记本体感知方法，仅用轻量立体RGB相机与基于Transformer的深度学习模型，在无菌铺巾遮挡下精确定位全铺巾手术机器人；基于迄今最大规模多中心手术机器人空间数据集(1.4M自标注图像，来自人体尸体与临床前在体研究)训练。相比现有系统免除标记物并将跟踪可见性提升25%，并演示在体呼吸补偿等潜在临床价值。

> **要点**：首个铺巾遮挡下手术机器人无标记本体感知，跟踪可见性提升25%。


#### 45. SutureBot：自主端到端缝合的精度框架与基准

*SutureBot: A Precision Framework & Benchmark For Autonomous End-to-End Suturing*

**arXiv（预印本）** · 2025-10-23 · 基准+机器人系统(1,890演示) · [arXiv 2510.20965](https://arxiv.org/abs/2510.20965)

在da Vinci Research Kit(dVRK)上提出自主缝合基准SutureBot(涵盖取针、组织插入、打结)，发布1,890条缝合演示的高保真数据集，并提出目标条件框架显式优化插入点精度，较仅任务基线提升59%-74%的瞄准精度。评测了π0、GR00T N1、OpenVLA-OFT、多任务ACT等前沿视觉-语言-动作(VLA)模型。

> **要点**：面向自主端到端缝合的可复现基准，目标条件框架显著提升插入点精度。


#### 46. Cosmos-Surg-dVRK：基于世界基础模型的手术机器人策略学习自动在线评估

*Cosmos-Surg-dVRK: World Foundation Model-based Automated Online Evaluation of Surgical Robot Policy Learning*

**arXiv（预印本）** · 2025-10-17 · 方法学(世界模型/视频分类) · [arXiv 2510.16240](https://arxiv.org/abs/2510.16240)

提出Cosmos世界基础模型(WFM)的手术微调版Cosmos-Surg-dVRK，结合训练好的视频分类器实现手术机器人策略的全自动在线评估与基准测试。在桌面缝合垫任务上，Cosmos在线rollout与真实dVRK Si平台策略结果强相关，且V-JEPA 2视频分类器与人工标注良好一致；离体猪胆囊切除初步实验也与真实评估对齐。

> **要点**：用世界基础模型对手术机器人策略做全自动在线评估，替代昂贵实机测试。


#### 47. 连续体机器人的形状感知全身控制及其在腔内手术机器人的应用

*Shape-Aware Whole-Body Control for Continuum Robots with Application in Endoluminal Surgical Robotics*

**arXiv（预印本）** · 2025-10-14 · 仿真+体模实机实验(学习增强控制) · [arXiv 2510.12332](https://arxiv.org/abs/2510.12332)

面向腔内(如支气管镜)导航，提出腱驱动连续体机器人的形状感知全身控制框架：将物理信息骨干模型与经增广神经ODE的残差学习结合以精确估形并高效计算雅可比，用基于采样的模型预测路径积分(MPPI)控制器联合优化尖端跟踪、骨干贴合与避障。仿真达毫米级精度，支气管镜体模实机验证提升管腔跟随精度、减少壁接触、增强适应性。

> **要点**：物理信息+神经ODE残差学习的连续体机器人全身控制提升腔内导航安全性。


#### 48. 医学视觉语言模型作为机器人手术的策略

*Medical Vision Language Models as Policies for Robotic Surgery*

**arXiv（预印本）** · 2025-10-07 · 强化学习+仿真(LapGym) · [arXiv 2510.06064](https://arxiv.org/abs/2510.06064)

针对视觉PPO在机器人腹腔镜手术任务中因高维视觉输入、稀疏奖励而难以学习的问题，提出将医学领域视觉语言模型MedFlamingo与PPO集成的方法。在LapGym五个腹腔镜手术任务环境(仅用内窥镜视觉观测)中，MedFlamingo PPO收敛更快、任务成功率均超70%，较标准视觉PPO与OpenFlamingo PPO基线提升66.67%-1114.29%。

> **要点**：医学VLM作高层规划显著提升机器人腹腔镜手术策略学习(成功率>70%)。


#### 49. 真实条件下高效的手术机器人器械位姿重建：统一特征检测

*Efficient Surgical Robotic Instrument Pose Reconstruction in Real World Conditions Using Unified Feature Detection*

**arXiv（预印本）** · 2025-10-03 · 方法学(深度学习位姿估计) · [arXiv 2510.03532](https://arxiv.org/abs/2510.03532)

针对微创手术(MIS)机器人运动链长、自由度部分可见导致相机-机器人标定困难的问题，提出通过共享编码统一检测几何基元(关键点与轴边缘)、经投影几何高效估计位姿的框架，单次推理同时检测关键点与边缘，在大规模合成数据(投影标注)上训练。在特征检测与位姿估计上均展现快速推理且最优精度，适合在线机器人控制。

> **要点**：统一关键点+边缘检测实现快速高精度手术机器人器械位姿在线估计。


#### 50. 基于热成像的自主机器人电外科（ThERMO）

*Towards Autonomous Robotic Electrosurgery via Thermal Imaging*

**arXiv（预印本）** · 2025-09-24 · 组织仿体实验研究（方法开发+对比验证） · [arXiv 2509.19725](https://arxiv.org/abs/2509.19725)

提出ThERMO框架，利用热成像反馈通过优化实时调节电刀切割速度，在减少热损伤的同时平衡切割力，实现自主电外科。在组织仿体实验中与恒定速度方法对比，ThERMO将切割成功率提升约3倍、峰值切割力降低约2倍，并能应对环境扰动、完成恒速方法会导致灾难性失败的切割任务。

> **要点**：热成像引导的速度优化使自主电外科切割成功率提升3倍、切割力降低2倍。


#### 51. 协作式机器人辅助手术中外科指令的功能可供性消歧

*Affordance-Based Disambiguation of Surgical Instructions for Collaborative Robot-Assisted Surgery*

**arXiv（预印本）** · 2025-09-18 · 框架开发+评估 · [arXiv 2509.14967](https://arxiv.org/abs/2509.14967)

提出机器人手术助手框架，通过将外科医生口头指令锚定到手术视野的视觉语境来消歧。系统采用两级功能可供性推理：先用多模态视觉语言模型分析手术场景，再基于工具能力知识库对指令推理；并用双集合共形预测提供统计严格的置信度以标记模糊指令保障患者安全。在胆囊切除视频的模糊指令数据集上实现约60%的消歧率。

> **要点**：视觉语言模型+共形预测消歧外科口头指令，消歧率60%，提升人机协作安全性。


#### 52. 基于深度强化学习的柔性机器人内窥镜在动态胃内的接触辅助导航

*Contact-Aided Navigation of Flexible Robotic Endoscope Using Deep Reinforcement Learning in Dynamic Stomach*

**arXiv（预印本）** · 2025-08-30 · 仿真（FEM）+深度强化学习 · [arXiv 2509.00319](https://arxiv.org/abs/2509.00319)

针对柔性机器人内窥镜（FRE）在动态胃内需借助与可变形胃壁接触到达目标的挑战，提出基于深度强化学习的接触辅助导航（CAN）策略，利用接触力反馈增强运动稳定与导航精度，训练环境基于可变形胃的有限元（FEM）仿真并用PPO算法训练。在静/动态胃环境均达100%成功率、平均误差1.6 mm（末端与目标误差<3 mm判定成功），在更强外扰的未见场景仍保持85%成功率。

> **要点**：深度RL接触辅助导航使柔性机器人内窥镜在动态胃内成功率100%、误差1.6 mm。


#### 53. VisionSafeEnhanced VPC：不确定性下带可见性约束的谨慎预测控制用于自主机器人手术

*VisionSafeEnhanced VPC: Cautious Predictive Control with Visibility Constraints under Uncertainty for Autonomous Robotic Surgery*

**arXiv（预印本）** · 2025-08-26 · 控制方法+仿真/机器人实验 · [arXiv 2508.18937](https://arxiv.org/abs/2508.18937)

面向机器人辅助微创手术中腹腔镜的自主控制，提出保障视野（FoV）安全的鲁棒、不确定性自适应视觉预测控制（VPC）框架：用高斯过程回归（GPR）对模型残差、随机不确定性与外扰做混合量化，据此构建带概率保证的安全轨迹优化（不确定性自适应控制屏障函数条件与机会约束）。在商用手术机器人（MicroPort MedBot Toumai）序贯多目标淋巴结清扫中验证，目标可见性>99.9%并降低跟踪误差。

> **要点**：GPR不确定性量化+安全VPC实现自主腹腔镜控制，目标可见性>99.9%。


#### 54. 面向手术机器人的世界模型视觉运动抓取(GASv2)

*Visuomotor Grasping with World Models for Surgical Robots*

**arXiv（预印本）** · 2025-08-15 · 方法学/仿真到真实机器人实验(体模+离体) · [arXiv 2508.11200](https://arxiv.org/abs/2508.11200)

针对机器人辅助手术(RAS)自动抓取，提出GASv2视觉运动学习框架，采用基于世界模型的架构、手术感知流水线与混合控制系统，仅用单对内镜立体相机，通过域随机化在仿真中训练并迁移到真实机器人。在体模与离体(ex vivo)手术场景中均达到65%成功率，可泛化到未见物体与夹持器并适应多种干扰。

> **要点**：世界模型驱动物体无关自主手术抓取实现sim-to-real迁移(成功率65%)


#### 55. 面向安全超声图像引导机器人脊柱手术的稳健亚高斯模型预测控制

*Robust-Sub-Gaussian Model Predictive Control for Safe Ultrasound-Image-Guided Robotic Spinal Surgery*

**arXiv（预印本）** · 2025-08-08 · 方法学/仿真验证(图像引导机器人手术控制) · [arXiv 2508.06744](https://arxiv.org/abs/2508.06744)

针对高维图像反馈下安全关键控制中估计误差分布复杂，提出用有界均值的亚高斯噪声刻画一般估计误差，并发展结合稳健集合方法与亚高斯方差代理传播的不确定性传播技术与MPC框架，为线性系统提供闭环安全保证。将其应用于含深度学习语义分割、图像配准、优化规划与底层控制的超声引导机器人脊柱手术流水线，并在整合真实解剖、机器人动力学、超声仿真与在体呼吸/钻孔力的仿真环境中验证。

> **要点**：亚高斯MPC为超声引导机器人脊柱手术提供闭环安全保证


#### 56. 认知负荷如何影响机器人辅助手术中的意图识别

*Unraveling the Connection: How Cognitive Workload Shapes Intent Recognition in Robot-Assisted Surgery*

**arXiv（预印本）** · 2025-08-03 · 研究项目描述/概念框架(无结果数值) · [arXiv 2508.01823](https://arxiv.org/abs/2508.01823)

该研究项目旨在构建智能自适应系统，监测机器人辅助手术中的认知负荷并改善学习结局，通过融合脑电、心率、肌电与眼动的多模态辅助框架实现对外科医生意图的语义理解与心理状态监测，从而在高认知负荷情境下提升意图识别、增强RAS效益与手术结局。为项目描述/概念框架，未报告结果数值。

> **要点**：多模态认知负荷监测以提升机器人辅助手术的意图识别


#### 57. 面向内镜经鼻介入的磁驱动可操控软吸引装置的学习建模

*Learning-Based Modeling of a Magnetically Steerable Soft Suction Device for Endoscopic Endonasal Interventions*

**arXiv（预印本）** · 2025-07-20 · 方法学/实验建模(磁驱动软手术机器人) · [arXiv 2507.15155](https://arxiv.org/abs/2507.15155)

提出面向内镜经鼻脑肿瘤切除的磁驱动可操控软吸引装置(外径4mm、内径2mm、长40mm,生物相容SIL 30材料3D打印,嵌入FBG传感器实时形状反馈)的学习建模框架，用四个Bezier控制点表示形变，在5097个实验样本上学习从磁场参数(0-14mT、0.2-1.0Hz、90-100mm)到Bezier控制点的映射。随机森林(RF)优于神经网络，控制点预测平均RMSE 0.087mm、形状重建误差0.064mm，实现亚毫米形状预测与实时推理。

> **要点**：学习建模将磁驱动输入映射到Bezier控制点实现软手术机器人亚毫米形状预测(RMSE 0.087mm)


#### 58. SonoGym：面向机器人超声挑战性手术任务的高性能仿真平台

*SonoGym: High Performance Simulation for Challenging Surgical Tasks with Robotic Ultrasound*

**arXiv（预印本）** · 2025-07-01 · 仿真平台/机器人学习(预印本) · [arXiv 2507.01152](https://arxiv.org/abs/2507.01152)

提出可扩展的机器人超声手术仿真平台SonoGym，支持数十到数百个环境的并行仿真，并通过基于物理和生成式两种方法从CT衍生的3D解剖模型实时逼真地仿真超声数据。平台集成常见机器人平台与骨科末端执行器，可训练深度强化学习(DRL)与模仿学习(IL，如视觉Transformer、扩散策略)智能体完成解剖重建与手术引导等骨科手术任务，并纳入子模块DRL与安全RL。结果展示多场景成功的策略学习，也揭示现有方法在临床相关环境中的局限。

> **要点**：高性能机器人超声手术仿真平台，支持训练DRL/IL自主手术智能体。



### （四）手术规划、数字孪生与三维建模（20 篇）

#### 1. ExtraGS：扩散引导3D高斯溅射增强内窥镜视野外推

*ExtraGS: Enhancing Endoscopic View Extrapolation via Diffusion-Guided 3D Gaussian Splatting*

**arXiv（预印本）** · 2026-07-14 · 方法开发+多数据集实验 · [arXiv 2607.12785](https://arxiv.org/abs/2607.12785)

针对机器人辅助微创手术内窥镜视野受限、外推易产生伪影的问题，提出ExtraGS框架，用不确定性引导的虚拟相机采样主动探索盲区，并以扩散模型精修生成伪观测、置信度加权微调避免污染可靠区域。在多个公开内窥镜数据集上显著减少外推伪影，达到内窥镜新视角合成的SOTA(未给具体数值)。

> **要点**：扩散引导3DGS扩展内窥镜视野，改善机器人手术的感知与安全。


#### 2. Track2Map：机器人手术中运动感知位姿优化的在线可变形SLAM

*Track2Map: Online Deformable SLAM with Motion-Aware Pose Optimization in Robotic Surgery*

**arXiv（预印本）** · 2026-07-09 · 方法开发+StereoMIS实验 · [arXiv 2607.08408](https://arxiv.org/abs/2607.08408)

针对现有手术3DGS重建多为离线且依赖机器人运动学轨迹先验的局限，提出Track2Map在线3DGS流水线，直接从手术视频联合优化相机轨迹与可变形三维场景，作为SLAM工作。采用track-anchored变形初始化与静止相机检测降低漂移，在StereoMIS上重建质量与轨迹精度均优于竞争SLAM方法及依赖轨迹先验的非SLAM方法(未给具体数值)。

> **要点**：无需运动学先验、在线联合优化轨迹与可变形场景的手术SLAM重建。


#### 3. 胃镜新视角合成：一个新的真实数据集与评测

*Gastroendoscopy View Synthesis: A New Real Dataset and Evaluation*

**arXiv（预印本）** · 2026-06-24 · 数据集构建+方法评测 · [arXiv 2606.25427](https://arxiv.org/abs/2606.25427)

面向胃镜的新视角合成(NVS)缺乏合适数据集，发布首个真实胃镜NVS数据集GastroNVS(含胃镜图像、相机位姿与点云)，用于扩展内窥镜视野、构建三维存档与操作训练的数字孪生。评测多种3DGS方法以评估数据集适用性并讨论未来挑战(未给具体数值)。

> **要点**：首个真实胃镜NVS数据集，推动内窥镜数字孪生与视野扩展。


#### 4. PINNOCHIO：正颌手术面部软组织形变的物理信息神经网络仿真

*PINNOCHIO: Physics-Informed Neural Network for Coupled Hyperelastic Interface-Volume Simulation in Orthognathic Surgery*

**arXiv（预印本）** · 2026-06-01 · 方法开发+临床队列验证（n=40） · [arXiv 2606.01572](https://arxiv.org/abs/2606.01572)

提出物理信息神经网络(PINN)框架PINNOCHIO，通过混合序贯分解将骨-软组织界面的不连续位移与连续体积超弹性形变解耦，实现稳定训练与sim-to-real适配。在40例临床队列上，其表面精度与物理合理性均优于现有基线，并较有限元法(FEM)大幅提速，未依赖体积真值。

> **要点**：PINN解耦界面与体积形变，在40例正颌手术规划中兼顾精度与效率、优于FEM。


#### 5. EndoGSim：MLLM引导高斯泼溅的物理感知4D动态内窥镜场景仿真

*EndoGSim: Physics-Aware 4D Dynamic Endoscopic Scene Simulations via MLLM-Guided Gaussian Splatting*

**arXiv（预印本）** · 2026-05-15 · 方法开发（重建+物理仿真） · [arXiv 2605.16022](https://arxiv.org/abs/2605.16022)

提出统一框架，通过多模态大语言模型(MLLM)引导的高斯泼溅实现内窥镜场景的物理感知重建与仿真：用4D高斯泼溅(4DGS)结合预训练分割与深度估计表征可变形组织与工具，并引入对象级材料场由MLLM初始化材料参数、经可微物质点法(MPM)在渲染图像与光流联合监督下细化。在开源与自有数据集上仿真保真度与物理精度优于SOTA方法。

> **要点**：MLLM引导4DGS+MPM实现物理感知的4D内窥镜场景重建与仿真，服务机器人辅助手术。


#### 6. EndoVGGT：面向手术3D重建的GNN增强深度估计

*EndoVGGT: GNN-Enhanced Depth Estimation for Surgical 3D Reconstruction*

**arXiv（预印本）** · 2026-03-25 · 方法学研究(深度估计/3D重建) · [arXiv 2603.24577](https://arxiv.org/abs/2603.24577)

面向可变形软组织3D重建中低纹理、镜面高光、器械遮挡导致的几何断裂，提出几何中心框架EndoVGGT，含形变感知图注意力(DeGAT)模块，动态构建特征空间语义图捕获相干组织区域的长程关联、跨遮挡传播结构线索。在SCARED上PSNR提升24.6%、SSIM提升9.1%，并对未见SCARED/EndoNeRF域展现强零样本跨数据集泛化。

> **要点**：形变感知图注意力提升手术3D重建保真度(PSNR+24.6%)与跨域泛化。


#### 7. Instrument-Splatting++：基于高斯泼溅的可控手术器械数字孪生

*Instrument-Splatting++: Towards Controllable Surgical Instrument Digital Twin Using Gaussian Splatting*

**arXiv（预印本）** · 2026-03-24 · 方法学研究(数字孪生/3DGS) · [arXiv 2603.22792](https://arxiv.org/abs/2603.22792)

面向机器人辅助手术Real2Sim，提出单目3D高斯泼溅框架Instrument-Splatting++，将手术器械重建为完全可控的高斯资产:部件级几何预训练注入CAD先验并赋部件语义渲染;语义感知位姿估计与跟踪(SAPET)从无位姿内镜视频恢复逐帧6-DoF位姿与关节角;鲁棒纹理学习(RTL)交替位姿精化与外观优化抑制位姿噪声。在EndoVis17/18、SAR-RARP及自建序列上光度质量与几何精度均优于SOTA，并使下游关键点检测受益于未见位姿数据增强。

> **要点**：高斯泼溅从无位姿视频构建可控器械数字孪生，助力Real2Sim与合成数据生成。


#### 8. SurgFormer：支持切除的软组织形变可扩展学习与实时推理

*SurgFormer: Scalable Learning of Organ Deformation with Resection Support and Real-Time Inference*

**arXiv（预印本）** · 2026-03-06 · 方法学研究(学习式生物力学仿真) · [arXiv 2603.06543](https://arxiv.org/abs/2603.06543)

提出多分辨率门控Transformer SurgFormer，在体积网格上做数据驱动软组织仿真，以求解器生成数据训练、近实时预测节点位移场，通过固定网格层级与多分支块(局部消息传递+粗粒度全局自注意力+逐点前馈,门控融合)兼顾局部与长程信息。将切除信息编码为可学习cut embedding，实现标准形变与拓扑改变(切割)的统一模型，并引入XFEM监督的胆囊切除与阑尾切除仿真数据集，兼具精度与效率。

> **要点**：门控Transformer实现支持切除的近实时手术软组织形变仿真。


#### 9. AutoFFS：面向面部女性化手术规划的对抗形变

*AutoFFS: Adversarial Deformations for Facial Feminization Surgery Planning*

**arXiv（预印本）** · 2026-03-02 · 方法学研究(对抗生成+人类感知研究) · [arXiv 2603.02288](https://arxiv.org/abs/2603.02288)

针对面部女性化手术(FFS)规划依赖主观评估、缺乏定量可复现解剖指导的问题，提出数据驱动框架AutoFFS：对预训练二元性别分类器集成做基于自由形变的定向对抗攻击，将个体颅骨形状向目标性别变换，生成反事实颅骨形态为术前规划提供定量基础。通过分类器评估、提出的形态Fréchet距离(MFD)与形态核距离(MKD)分布对齐评估及人类感知研究，验证生成形态具目标性别特征。

> **要点**：对抗形变生成反事实颅骨形态为面部女性化手术提供定量规划依据。


#### 10. 面向视觉皮层假体的感知感知手术规划与血管规避

*Percept-Aware Surgical Planning for Visual Cortical Prostheses with Vascular Avoidance*

**arXiv（预印本）** · 2026-02-27 · 方法学研究(仿真优化) · [arXiv 2603.00362](https://arxiv.org/abs/2603.00362)

针对高密度柔性神经接口下皮层视觉假体电极三维放置这一关键手术规划问题，提出感知感知框架：将电极坐标作为可学习参数，用可微的假体视觉前向模型端到端优化，目标在血管规避与灰质可行性约束下最小化任务级感知误差。在真实折叠皮层几何(FreeSurfer fsaverage)的模拟阅读与自然图像任务上，较基于覆盖的放置策略持续提升重建保真度，血管安全约束消除边界违规且不损感知性能。

> **要点**：可微感知模型驱动血管规避的皮层视觉假体电极放置手术规划。


#### 11. 从术前CT到乳突切除后网格构建：人工耳蜗手术乳突切除形状预测

*From Preoperative CT to Postmastoidectomy Mesh Construction: Mastoidectomy Shape Prediction for Cochlear Implant Surgery*

**arXiv（预印本）** · 2026-01-07 · 方法学/自监督+弱监督DL · [arXiv 2601.04405](https://arxiv.org/abs/2601.04405)

针对人工耳蜗(CI)手术中乳突切除术，提出混合自监督+弱监督学习框架，直接从乳突完整的术前CT预测乳突切除区域，无需人工标注真值。在预测复杂、无明确边界的乳突切除形状上达到平均Dice 0.72，超越SOTA，为从术前CT构建3D乳突切除后表面奠定基础，服务于CI手术规划。

> **要点**：自/弱监督框架从术前CT预测乳突切除形状(Dice 0.72)辅助人工耳蜗手术规划。


#### 12. PhysSFI-Net：正颌手术结局预测的物理引导骨-面交互几何学习

*PhysSFI-Net: Physics-informed Geometric Learning of Skeletal and Facial Interactions for Orthognathic Surgical Outcome Prediction*

**arXiv（预印本）** · 2026-01-05 · 方法学/DL(135例) · [arXiv 2601.02088](https://arxiv.org/abs/2601.02088)

提出物理引导几何深度学习框架PhysSFI-Net，含分层图模块(颅面与手术方案编码器+注意力)、LSTM序列预测器与生物力学启发的高分辨率面部重建模块，预测正颌手术后软组织变形。纳入135例接受正畸+正颌联合治疗患者训练验证，达到点云形状误差1.070±0.088mm、表面偏差误差1.296±0.349mm、标志点定位误差2.445±1.326mm，优于SOTA方法ACMT-Net。

> **要点**：PhysSFI-Net以亚2.5mm精度可解释预测正颌术后面部形态，优于ACMT-Net。


#### 13. NICE：用于正颌手术效果预测的神经隐式颅面模型

*NICE: Neural Implicit Craniofacial Model for Orthognathic Surgery Prediction*

**arXiv（预印本）** · 2025-12-05 · 方法学研究（隐式神经表示/深度学习） · [arXiv 2512.05920](https://arxiv.org/abs/2512.05920)

提出神经隐式颅面模型NICE，采用区域特异的隐式符号距离函数(SDF)解码器重建面部、上颌与下颌，并用共享手术潜码驱动区域特异形变解码器输出逐点位移场，预测正颌手术后软组织外观。大量实验证明其在唇、颏等关键面部区域预测精度优于当前SOTA方法，同时稳健保持解剖完整性。

> **要点**：隐式神经表示可高精度预测正颌术后面部外观，辅助手术规划与术前医患沟通。


#### 14. TwinOR：面向具身AI研究的动态手术室逼真数字孪生

*TwinOR: Photorealistic Digital Twins of Dynamic Operating Rooms for Embodied AI Research*

**arXiv（预印本）** · 2025-11-10 · 系统/方法学研究（数字孪生/真实到仿真） · [arXiv 2511.07412](https://arxiv.org/abs/2511.07412)

提出真实到仿真基础设施TwinOR，重建手术室静态几何并持续建模人员与设备运动，融合为可控的沉浸式三维环境以支持具身AI探索与训练。框架以厘米级精度重建完整手术室几何并保留跨手术流程的动态交互；FoundationStereo与ORB-SLAM3在TwinOR合成数据上的表现落于其真实室内数据集报告精度范围内，证明其传感器级真实度足以模拟真实感知与定位挑战。

> **要点**：手术室逼真动态数字孪生为具身手术AI提供安全可扩展的训练与评估环境。


#### 15. 从稀疏内窥镜视图高效重建与仿真手术场景

*Efficient 3D Scene Reconstruction and Simulation from Sparse Endoscopic Views*

**arXiv（预印本）** · 2025-09-21 · 方法开发研究（三维重建+物理仿真） · [arXiv 2509.17027](https://arxiv.org/abs/2509.17027)

提出基于高斯泼溅的框架，直接从内窥镜数据重建可交互手术场景用于仿真训练。针对内窥镜相机视角受限导致的过拟合，引入虚拟相机正则化自适应采样虚拟视点，并用基于深度的正则细化几何；提出稀疏控制节点物质点法（MPM）实现快速形变仿真。方法仅需几分钟即可重建场景，并能实时产生物理合理的形变（未给出具体量化指标）。

> **要点**：高斯泼溅+稀疏MPM从稀疏内窥镜视图数分钟重建并实时仿真可交互手术场景。


#### 16. 乳腺癌诊疗中的AI：以三维重建变革术前规划与患者教育

*Artificial Intelligence in Breast Cancer Care: Transforming Preoperative Planning and Patient Education with 3D Reconstruction*

**arXiv（预印本）** · 2025-09-10 · 回顾性研究（深度学习分割+人机协同） · [arXiv 2509.12242](https://arxiv.org/abs/2509.12242)

提出机器学习方法提升3D解剖重建的算法泛化性。对120例回顾性乳腺MRI（2018.01–2023.06）经匿名化与手动分割、共配准分割（全乳、纤维腺组织、肿瘤）、ITK-SNAP三维可视化处理，采用人机协同的U-Mamba优化分割。T1加权图像上全器官DSC 0.97(±0.013)、纤维腺组织0.96(±0.024)、肿瘤0.82(±0.12)；生成的3D重建改善了术前规划、术中导航与患者教育。

> **要点**：U-Mamba乳腺MRI三维重建（器官DSC 0.97）支持术前规划与患者教育。


#### 17. 沟通计算与临床策略以改进癫痫致痫网络的术前识别

*Bridging Computational and Clinical Strategies to Improve Presurgical Identification of Epileptogenic Networks*

**medRxiv/bioRxiv（预印本）** · 2025-08-26 · 计算建模+临床映射研究(预印本) · [DOI](https://doi.org/10.1101/2025.08.22.25334229)

分析20例术前评估患者(含皮层与皮层下植入)的发作间期立体定向脑电(sEEG)，构建个体化动态网络模型，比较四种网络脆弱性指标(外向/内向脆弱性、源影响、汇连接)与50Hz电刺激诱发放电的关联，并以移除临床凝固节点做虚拟热凝模拟预测切除后果。网络指标稳定区分SOZ与非SOZ触点、跨时间条件一致，仅用发作间期记录即可辅助个体化术前定位与手术规划。

> **要点**：iEEG网络模型+虚拟热凝仿真辅助癫痫外科切除规划。


#### 18. 用nnU-Net自动化手术规划：肝胆期MRI肝脏解剖勾画

*Automated surgical planning with nnU-Net: delineation of the anatomy in hepatobiliary phase MRI*

**arXiv（预印本）** · 2025-08-19 · 回顾性研究+前瞻临床整合（nnU-Net） · [arXiv 2508.14133](https://arxiv.org/abs/2508.14133)

开发并评估基于深度学习的肝脏解剖（实质、肿瘤、门静脉、肝静脉、胆道）自动分割方法以简化术前规划。对90例（2020.01–2023.10接受肝脏手术）肝胆期钆塞酸增强MRI手动分割，用nnU-Net v1在72例上训练（侧重细小结构与拓扑保持），18例测试集上肝实质DSC 0.97±0.01、肝静脉0.80±0.04、胆道0.79±0.07、肿瘤0.77±0.17、门静脉0.74±0.06，肿瘤检出率76.6±24.1%（中位每例1个假阳性）；前瞻临床使用中模型额外检出3个放射科医师初漏诊的肿瘤。

> **要点**：nnU-Net自动勾画肝脏解剖（实质DSC 0.97）实现常规术前3D规划，并检出漏诊肿瘤。


#### 19. 经导管主动脉瓣置换术前规划的语义分割

*Semantic Segmentation for Preoperative Planning in Transcatheter Aortic Valve Replacement*

**arXiv（预印本）** · 2025-07-22 · 方法学/术前规划分割(TAVR) · [arXiv 2507.16573](https://arxiv.org/abs/2507.16573)

针对经导管主动脉瓣置换(TAVR)术前规划，依据医学指南识别可由语义分割模型支持的任务，使CT扫描中相关解剖结构可测量。作者从粗粒度解剖信息派生细粒度TAVR相关伪标签训练分割模型并量化其定位结构的能力，并提出训练损失函数改进使Dice性能提升+1.27%；公开了细粒度TAVR相关伪标签与CT数据。

> **要点**：语义分割使TAVR术前规划相关解剖结构可测量(Dice+1.27%)


#### 20. 从单张图像构建手术神经辐射场(NeRF)

*Surgical Neural Radiance Fields from One Image*

**arXiv（预印本）** · 2025-07-01 · 方法学研究/三维重建(预印本，4例) · [arXiv 2507.00969](https://arxiv.org/abs/2507.00969)

针对NeRF依赖大量多视角数据、难以在术中受时间约束场景应用的问题，提出利用单张术中图像结合术前MRI数据高效训练NeRF：以术前MRI定义相机视点集，术中通过神经风格迁移(结合WTC2与STROTSS防过度风格化)将术中图像外观迁移到预构训练集，实现即时单图NeRF训练。在4例临床神经外科病例上评估，与基于真实显微镜图像训练的NeRF相比合成一致性强、结构相似度高、纹理保真良好。

> **要点**：单张术中图像+术前MRI即可训练NeRF重建手术场景，4例神经外科验证。



### （五）术前诊断、影像AI与可切除性评估（6 篇）

#### 1. 人工智能评估晚期卵巢癌诊断性腹腔镜中的腹膜癌病

*Artificial Intelligence for the Assessment of Peritoneal Carcinosis during Diagnostic Laparoscopy for Advanced Ovarian Cancer*

**arXiv（预印本）** · 2025-12-16 · 回顾性/DL(n=101开发、n=50验证) · [arXiv 2512.14797](https://arxiv.org/abs/2512.14797)

回顾性收集晚期卵巢癌诊断性腹腔镜(DL)视频并附Fagotti评分(FS)，训练深度学习模型自动识别FS相关帧、分割解剖结构与腹膜癌病(PC)、预测视频级FS与手术指征(ItS)以评估可切除性。分割模型基于7,311帧训练，解剖结构Dice 70±3%、PC 56±3%；解剖站分类F1 74±3%/73±4%，FS预测归一化RMSE 1.39±0.18/1.15±0.08，ItS的F1达80±8%/80±2%(开发集n=101、独立测试集n=50)。系首个从腹腔镜视频预测减瘤手术可行性的AI模型。

> **要点**：首个AI从诊断性腹腔镜视频自动估计Fagotti评分预测减瘤手术可行性(ItS F1 80%)。


#### 2. 用深度学习自动估计鼻窦内镜手术的解剖风险指标

*Automated Estimation of Anatomical Risk Metrics for Endoscopic Sinus Surgery Using Deep Learning*

**arXiv（预印本）** · 2025-11-10 · 方法学研究（深度学习标志定位） · [arXiv 2511.07199](https://arxiv.org/abs/2511.07199)

提出深度学习流水线，通过热图回归定位关键解剖标志，自动从冠状位CT/CBCT估计Keros、Gera与泰-马-新(TMS)等鼻窦手术解剖风险评分，替代耗时的手工测量。相关解剖测量的平均绝对误差为Keros 0.506mm、Gera 4.516°、TMS分类0.802mm/0.777mm。

> **要点**：自动化CT标志检测可快速量化鼻窦手术颅底解剖风险评分，辅助术前决策以降低脑脊液漏等风险。


#### 3. 联合高分辨MRSI与[18F]-FACBC PET提升胶质瘤术前诊断准确性

*Combined High-Resolution MRSI and [18F]-FACBC PET to Improve the Presurgical Diagnostic Accuracy in Gliomas*

**medRxiv/bioRxiv（预印本）** · 2025-10-08 · 前瞻性影像诊断研究(预印本) · [DOI](https://doi.org/10.1101/2025.10.01.25336990)

对10例胶质瘤(WHO 2–4级，24–80岁)术前行FACBC PET/MRI与2D磁共振波谱成像(MRSI)，术中取30处影像引导活检做ROC分析。深度学习增强的MRSI tCho/NAA区分胶质瘤与非肿瘤组织AUC 0.87，优于SUV(0.71)、TBR(0.68)、tCho/tCr(0.81)；TBR+tCho/NAA+tCr/NAA最佳AUC 0.91。IDH1判别以PET为佳，SUV+tCho/tCr组合AUC 0.96。深度学习增强影像服务活检靶向与肿瘤勾画等外科决策，核心相关。

> **要点**：DL增强MRSI+PET提升胶质瘤术前诊断与活检靶向(AUC 0.87–0.96)。


#### 4. 放射科医生-AI协作诊断小肠梗阻缺血：多中心开发与外部验证的多模态深度学习模型

*Radiologist-AI Collaboration for Ischemia Diagnosis in Small Bowel Obstruction: Multicentric Development and External Validation of a Multimodal Deep Learning Model*

**medRxiv/bioRxiv（预印本）** · 2025-09-08 · 多中心开发+外部验证/多模态深度学习 · [DOI](https://doi.org/10.1101/2025.09.05.25335014)

多中心开发+外部验证：自两中心整理1,350例CT(771例确诊小肠梗阻用于建模，缺血以影像后24h内手术确认为标签)，外部第三中心66例测试；两名放射科医生在有/无AI下阅片。图像+实验室(CRP、中性粒细胞)模型外部最佳(AUC 0.69[0.59–0.79]、敏感度0.89、特异度0.44)，加报告文本内部提升但外部不泛化(AUC 0.82→0.53)；AI辅助下住院医AUC 0.71→0.77达主治水平。

> **要点**：CT联合常规实验室的多模态AI提升小肠梗阻缺血检出并助力(尤其年轻)放射科医生在24h内决策


#### 5. 癌变过程的形态分子纵向内镜

*Morphomolecular Longitudinal Endoscopy of Carcinogenesis*

**medRxiv/bioRxiv（预印本）** · 2025-08-15 · 临床前方法学/多模态内镜+可解释AI · [DOI](https://doi.org/10.1101/2025.08.15.665660)

临床前平台研究：提出将拉曼光谱(RS)与光学相干断层成像(OCT)集成于微型前视光纤探头的无标记内镜平台，可同步视频级OCT与亚秒级RS采集，并用可解释AI融合框架学习生化与结构特征的联合时序表示以分类组织状态。在4NQO诱导的小鼠癌变模型中实时追踪上皮从增生经异型增生到瘤变的转变。

> **要点**：无标记RS+OCT内镜结合可解释AI可实时捕捉形态分子癌变轨迹,支持早期检测与实时监测(临床前)


#### 6. 中枢神经系统肿瘤的自动化标准化手术报告

*Automatic and standardized surgical reporting for central nervous system tumors*

**arXiv（预印本）** · 2025-08-12 · 多中心模型开发/分割与分类流水线 · [arXiv 2508.08916](https://arxiv.org/abs/2508.08916)

提出面向CNS肿瘤术后标准化报告的完整流水线，用Attention U-Net分割术前肿瘤核、术后强化残余肿瘤与切除腔，用DenseNet做MR序列分类与肿瘤类型识别，并按RANO 2.0指南生成报告。在2000-7000例多中心数据5折交叉验证下，体素级Dice分别为87%(肿瘤核)、66%(非强化核)、70%(强化残余)、77%(切除腔)，MR序列分类平衡准确率99.5%、肿瘤类型分类80%，已集成入开源Raidionics平台。

> **要点**：自动分割与分类实现符合RANO 2.0的CNS肿瘤术后标准化报告(切除腔Dice 77%)



### （六）数字病理与影像组学（外科肿瘤）（12 篇）

#### 1. 结直肠癌肝转移术后生存预测的自动化影像组学框架(基于术前MRI)

*An Automated Radiomics Framework for Postoperative Survival Prediction in Colorectal Liver Metastases using Preoperative MRI*

**arXiv（预印本）** · 2026-03-10 · 回顾性研究(影像组学+深度学习生存分析) · [arXiv 2603.10216](https://arxiv.org/abs/2603.10216)

回顾性纳入227例2013-2020年行根治性肝切除的结直肠癌肝转移(CRLM)患者(钆塞酸增强MRI)，构建"解剖感知分割+影像组学"自动框架：分割借助可提示基础模型(提出SAMONAI将SAM扩展至3D点提示)从部分标注学习，肝脏、脾脏分割Dice分别达0.96、0.93，CRLM分割Dice 0.78、检测F1 0.79；影像组学用自编码多示例网络SurvAMINN预测生存，C-index达0.69(以Cox回归对比)。

> **要点**：分割与影像组学结合实现CRLM术后生存自动化预测(C-index 0.69)。


#### 2. 用基础模型自主标注手术切缘

*Autonomous labeling of surgical resection margins using a foundation model*

**arXiv（预印本）** · 2025-11-27 · 方法学研究（数字病理/基础模型） · [arXiv 2511.22131](https://arxiv.org/abs/2511.22131)

提出虚拟墨染网络(VIN)，用冻结的基础模型作特征提取器加两层MLP对全切片图像做patch级分类，自主定位手术切面并识别电灼一致特征，减少对物理墨染的依赖。数据集含12个人扁桃体组织块的120张H&E切片（约2TB原始数据），在20张未见组织块切片盲测中区域级准确率约73.3%，误差多局限于不影响整片切缘连续性的小区域。

> **要点**：基础模型可实现无墨、可复现的手术切缘勾画，融入数字病理工作流。


#### 3. 自监督AI揭示肺腺癌中的致死性失黏附表型

*Self-supervised AI reveals a lethal discohesive phenotype in lung adenocarcinoma*

**medRxiv/bioRxiv（预印本）** · 2025-11-13 · 回顾性/自监督数字病理 · [DOI](https://doi.org/10.1101/2025.11.12.688049)

回顾性数字病理：用自监督学习(SSL)在逾1,000例患者、逾4,000张切片的高度表征肺腺癌(LUAD)切除队列上无监督发现并量化全谱组织学表型。构建LUAD形态词典，从头发现多种与预后强相关的间质形态，经多模态数据整合与外部验证提出上皮失黏附在免疫冷间质背景下致死，且两特征独立于现有预后体系。

> **要点**：自监督AI在真实诊断病理中发现独立于现有体系的致死性LUAD失黏附表型,具即时临床可转化性


#### 4. 深度学习桥接组织学与转录组预测肌层浸润性膀胱癌的分子亚型与结局

*Deep Learning Bridges Histology and Transcriptomics to Predict Molecular Subtypes and Outcomes in Muscle-Invasive Bladder Cancer*

**medRxiv/bioRxiv（预印本）** · 2025-10-24 · 多队列回顾性DL病理研究(预印本) · [DOI](https://doi.org/10.1101/2025.10.23.684013)

在VESPER试验297例新辅助化疗(NAC)患者的TURBT切片上训练深度学习模型，从组织学预测848个亚型相关基因表达，并在COBLAnCE(n=224)、Saint-Louis(n=30)、TCGA(n=315)独立验证，6例空间转录组佐证空间一致性。分子亚型预测ROC AUC 0.94、95%基因显著可预测；预测为basal/squamous特征者NAC后无进展与总生存显著更差(log-rank p=0.014与0.037)。膀胱癌为外科肿瘤，分子分型服务手术/新辅助决策。

> **要点**：组织学推断膀胱癌分子亚型并预后分层(AUC 0.94)，服务外科决策。


#### 5. 自监督AI揭示多重免疫荧光图像中隐藏的预后空间模式

*Self-Supervised AI Reveals a Hidden Landscape of Prognostic Spatial Patterns in Multiplex Immunofluorescence Images*

**medRxiv/bioRxiv（预印本）** · 2025-10-16 · 预印本·自监督数字病理 · [DOI](https://doi.org/10.1101/2025.10.16.682563)

提出自监督学习(SSL)框架，从多重免疫荧光(mIF)图像无监督提取整体组织架构特征，应用于两种癌症(肺腺癌、结直肠癌)超1,800例患者、7,000余幅mIF图像，预后性能优于传统基于分割的分析，并自主发现Ki67免疫逃逸表型、GLB1亚细胞模式、Treg介导免疫抑制促肿瘤出芽等可解释新模式。

> **要点**：自监督AI从mIF无偏发现外科肿瘤预后空间生物标志物，优于分割分析。


#### 6. 组织学与空间转录组整合揭示胶质母细胞瘤浸润区特定细胞组成为预后热点

*Histology and spatial transcriptomic integration revealed infiltration zone with specific cell composition as a prognostic hotspot in glioblastoma*

**medRxiv/bioRxiv（预印本）** · 2025-10-08 · 多队列可解释ML病理研究(预印本) · [DOI](https://doi.org/10.1101/2025.10.08.681087)

分析3队列共748例GBM(富集长生存者：98例OS>5年、196例OS≥3年)，提出可解释ML将HE切片分割为长生存、短生存与非信息三类区域，整合无监督学习、核分割、血管检测、病理注释及31例空间转录组发现可解释biomarker。组织学+临床OS预测模型AUC 0.85；富集恶性(间充质样)细胞的低浸润白质区预示预后差、血管生成区与长生存相关、PLIN2+巨噬细胞与预后差相关。GBM为神经外科肿瘤，biomarker独立于已知临床因素，核心相关。

> **要点**：可解释ML从GBM组织学发现空间预后biomarker(OS分类AUC 0.85)。


#### 7. 面向术中病理的临床级通用基础模型(CRISP)

*A Clinical-grade Universal Foundation Model for Intraoperative Pathology*

**arXiv（预印本）** · 2025-10-06 · 基础模型开发+前瞻验证(>2000例) · [arXiv 2510.04861](https://arxiv.org/abs/2510.04861)

基于8家医疗中心超100,000张冰冻切片开发术中病理基础模型CRISP，在超15,000张术中切片、近100项回顾诊断任务(良恶性判别、关键术中决策、泛癌检测等)上评估，跨机构、瘤种与解剖部位(含未见部位与罕见癌)稳健泛化。在超2,000例前瞻队列中保持高精度，直接指导手术决策达92.6%；人机协作降低诊断工作量35%、避免105项辅助检测、微转移检出准确率87.5%。

> **要点**：临床级术中病理基础模型92.6%病例直接指导手术决策，工作量降35%。


#### 8. 光学显微成像预测胶质母细胞瘤局部复发

*Optical Microscopy Predictions of Focal Recurrence in Glioblastoma*

**medRxiv/bioRxiv（预印本）** · 2025-09-27 · 回顾性队列/机器学习(随机森林) · [DOI](https://doi.org/10.1101/2025.09.24.25336541)

回顾性影像组学建模：对80例患者、367份切除腔切缘样本、133,454幅无标记光学全片图像用AI生成肿瘤浸润值(AI-infiltration)。复发肿瘤切缘样本浸润显著更高(p=0.026)；随机森林预测位点复发训练AUC 86.6%±10.0、验证AUC 80.3%(95%CI 0.641–0.965)，AI-infiltration为最强贡献因子，优于肿瘤分子特征。

> **要点**：AI量化手术切缘肿瘤浸润可预测胶质母细胞瘤局部复发位点,指导精准补充治疗


#### 9. 自监督基础模型用于术中肝脏大泡性脂肪变的定量诊断

*Diagnostic Performance of Self-Supervised Foundation Models for Intraoperative Quantification of Hepatic Macrovesicular Steatosis*

**medRxiv/bioRxiv（预印本）** · 2025-09-17 · 回顾性诊断准确性研究/自监督基础模型 · [DOI](https://doi.org/10.1101/2025.09.16.25335833)

回顾性诊断研究：对68名供者、131份冰冻肝活检数字全片，用自监督基础模型Prov-GigaPath与UNI提取嵌入训练片级分类器，与值班外科病理医生比较。二分类(<30% vs ≥30%)准确率Prov-GigaPath 96.4%、UNI 85.7%、病理医生84.0%(P=.22)；五分类分别57.1%、50.0%、58.7%(P=.70)，误分类多见于中间类别。

> **要点**：自监督病理基础模型在关键的30%脂肪变阈值上与外科病理医生相当,有望标准化术中供肝评估


#### 10. 肺神经内分泌肿瘤的临床相关形态-分子分类

*A clinically relevant morpho-molecular classification of lung neuroendocrine tumours*

**medRxiv/bioRxiv（预印本）** · 2025-07-18 · 预印本·多组学加数字病理 · [DOI](https://doi.org/10.1101/2025.07.18.25331556)

对300余例肺神经内分泌肿瘤(手术为主要治疗)开展全基因组测序、转录组、甲基化、空间组学多组学分析，确证四个分子群。深度学习模型仅凭形态学即可准确识别Ca A1、Ca A2、Ca B群，优于现有组织学标准，便于临床落地并提示DLL3/FGFR/TERT/BRAF等靶向机会。

> **要点**：深度学习凭形态学识别外科肺NET分子亚型，优于传统组织学。


#### 11. 面向真实世界的跨模态AI癌症分子病理诊断(CAMPaS)

*Towards real-world molecular pathology diagnosis of cancer with cross-modal AI*

**medRxiv（预印本）** · 2025-07-07 · 多队列回顾+前瞻验证的数字病理研究(预印本) · [DOI](https://doi.org/10.1101/2025.07.07.25330997)

临床AI原型CAMPaS从HE切片联合预测胶质瘤组织学、分子标志物与WHO 2021整合诊断，训练/验证于8个队列3367例患者(6043张切片，6回顾2前瞻)。训练AUC 0.895–0.916，前瞻队列AUC 0.946–0.955，跨设置稳健泛化，并可预后与治疗反应分层。胶质瘤为神经外科肿瘤，分子分型直接服务外科肿瘤学诊疗决策。

> **要点**：HE切片一体化预测胶质瘤组织学与分子分型，服务外科肿瘤诊疗。


#### 12. 面向肿瘤神经外科的智能组织病理学(综述)

*Intelligent Histology for Tumor Neurosurgery*

**arXiv（预印本）** · 2025-07-03 · 综述/观点(预印本) · [arXiv 2507.03037](https://arxiv.org/abs/2507.03037)

综述性文章，提出'智能组织病理学(Intelligent Histology)'概念，将AI与受激拉曼组织学(SRH)结合用于术中实时组织学分析；SRH可在数秒内生成手术标本高分辨数字图像，支持AI驱动的肿瘤组织学分析、分子分型与肿瘤浸润检测。文章回顾其在神经外科肿瘤、颅底、脊柱肿瘤、儿童及周围神经肿瘤等多亚专科的转化，并展望多机构数据构建AI基础模型、结合临床与影像的多模态学习及结局预测。

> **要点**：综述：AI+受激拉曼组织学(SRH)实现术中实时数字病理与分子分型。



### （七）术后结局、并发症与手术风险预测（23 篇）

#### 1. 基于术前肠道血供影像映射预测结直肠吻合口漏风险（研究方案）

*Predicting the risk of colorectal anastomotic leak based on preoperative mapping of the blood supply of the bowel*

**arXiv（预印本）** · 2026-06-01 · 研究方案/协议论文（无实验结果） · [arXiv 2606.02156](https://arxiv.org/abs/2606.02156)

这是一篇研究方案(protocol)论文，提出利用术前/术后增强CT构建AI驱动的结直肠癌术后吻合口漏风险评估系统，通过深度学习分析血管与组织特征输出可解释风险，并配套基于内容的医学图像检索(CBMIR)模块检索相似历史病例。文中未报告具体样本量或性能指标，重点论证该系统在现有医疗基础设施中的技术可行性与可复现工作流。

> **要点**：提出术前CT深度学习预测吻合口漏风险的可复现框架，尚处方案阶段无性能数据。


#### 2. 基于术前CT自动预测胰腺术后胰瘘

*Automated Prediction of Postoperative Pancreatic Fistula Using Preoperative Computed Tomography*

**arXiv（预印本）** · 2026-05-29 · 回顾性深度学习模型开发 · [arXiv 2605.31539](https://arxiv.org/abs/2605.31539)

提出从胰腺分割到分类的端到端深度学习流程，利用术前CT对胰腺切除术后胰瘘(POPF)做风险估计与分层，比较了自定义轻量3D CNN(CNN3D)、R(2+1)D ResNet-18与ResNet-MC3-18等多种3D架构。多架构评测显示具有良好预测性能，但摘要未给出具体准确率/AUC数值，定位为胰腺CT分类的方法学基准。

> **要点**：端到端3D CNN基于术前CT预测胰瘘并提供方法学基准（未报具体指标）。


#### 3. Neuro-Oracle：轨迹感知的可解释癫痫手术预后Agentic RAG框架

*Neuro-Oracle: A Trajectory-Aware Agentic RAG Framework for Interpretable Epilepsy Surgical Prognosis*

**arXiv（预印本）** · 2026-04-10 · 概念验证/回顾性建模(RAG+对比学习) · [arXiv 2604.14216](https://arxiv.org/abs/2604.14216)

预测药物难治性癫痫术后发作结局。三阶段框架：3D Siamese对比编码器将术前-术后MRI变化蒸馏为512维轨迹向量、最近邻检索相似历史手术轨迹、量化Llama-3-8B生成自然语言预后。在公开EPISURG数据集(N=268配对病例、五折交叉验证)上，轨迹分类器AUC 0.834-0.905，优于单时点ResNet-50基线(0.793)；Neuro-Oracle智能体AUC 0.867且审计下零幻觉，Siamese多样性集成AUC达0.905。作者声明为概念验证(采用代理标签)。

> **要点**：术前-术后轨迹表征优于单时点基线，LLM智能体在保持AUC同时给出零幻觉可解释预后。


#### 4. 基于OneFlorida+联盟多中心数据的联邦学习预测重大术后并发症

*Federated Learning with Multi-Partner OneFlorida+ Consortium Data for Predicting Major Postoperative Complications*

**arXiv（预印本）** · 2026-03-17 · 回顾性多中心队列，联邦学习建模 · [arXiv 2603.16723](https://arxiv.org/abs/2603.16723)

回顾性纵向多中心队列纳入5家机构358,644名成人、494,163例住院大手术(2012-2023)，开发并内外部验证联邦学习模型预测术后ICU入住、机械通气、急性肾损伤(AKI)及院内死亡。以AUROC与AUPRC评估，联邦模型在各结局与各中心表现与集中式(汇集数据)模型相当或更优，且优于各中心最佳本地模型，兼具泛化性与隐私保护。

> **要点**：联邦学习可在保护隐私前提下构建可泛化的术后并发症与死亡预测模型。


#### 5. PreSight：基于区域先验形态测量与患者特异加权的帕金森病手术术前结局预测

*PreSight: Preoperative Outcome Prediction for Parkinson's Disease via Region-Prior Morphometry and Patient-Specific Weighting*

**arXiv（预印本）** · 2026-03-02 · 双中心回顾性研究(多模态深度学习) · [arXiv 2603.01948](https://arxiv.org/abs/2603.01948)

针对帕金森病手术术前预测术后运动获益困难的问题，提出PreSight：融合临床先验、术前MRI与基于形变的形态测量(DBM)，并用患者特异加权模块自适应区域重要性，端到端输出校准的决策就绪预测与患者级解释。在真实两中心400例多模态队列上，应答者分类内部验证accuracy 88.89%、外部中心测试85.29%，概率校准与决策曲线净获益均更优。

> **要点**：术前多模态区域自适应模型可靠预测帕金森病手术运动获益(内部88.89%/外部85.29%)。


#### 6. 基于临床数据的机器学习预测慢性鼻窦炎手术结局

*Machine Learning Based Prediction of Surgical Outcomes in Chronic Rhinosinusitis from Clinical Data*

**arXiv（预印本）** · 2026-02-19 · 前瞻性队列的预测建模研究 · [arXiv 2602.17888](https://arxiv.org/abs/2602.17888)

在前瞻性观察性干预试验队列中，用监督ML以术前数据预测慢性鼻窦炎(CRS)手术获益（以SNOT-22为主要结局），识别术前可能不需手术的患者。最佳模型（含集成方法）分类准确率约85%；在30例混合难度的留出集上达80%准确率，超过专家临床医师平均的75.6%。

> **要点**：ML以术前数据预测CRS手术候选性，准确率超过专家医师。


#### 7. LLM增强的可干预多模态适配器用于肺癌手术术后并发症预测

*LLM Augmented Intervenable Multimodal Adaptor for Post-operative Complication Prediction in Lung Cancer Surgery*

**arXiv（预印本）** · 2026-01-20 · 回顾性队列/多模态DL · [arXiv 2601.14154](https://arxiv.org/abs/2601.14154)

提出深度学习架构MIRACLE，融合术前临床与影像数据、采用超球面嵌入空间融合异质输入，并加入可交互调整的干预式深度学习模块以提升可解释性，预测肺癌手术术后并发症风险。在Roswell Park的真实数据集POC-L(3,094例肺癌手术患者)上验证，性能优于传统机器学习模型与多种大语言模型(LLM)变体。

> **要点**：MIRACLE融合临床+影像并可干预，在3,094例肺癌手术患者上优于传统ML与LLM。


#### 8. 谁能从鼻窦手术获益？对比生成式AI与监督机器学习预测慢性鼻窦炎手术结局

*Who Benefits From Sinus Surgery? Comparing Generative AI and Supervised Machine Learning for Predicting Surgical Outcomes in Chronic Rhinosinusitis*

**arXiv（预印本）** · 2026-01-20 · 前瞻性队列/预测建模对比 · [arXiv 2601.13710](https://arxiv.org/abs/2601.13710)

在一项全部接受手术的前瞻性队列中，用术前临床数据预测慢性鼻窦炎(CRS)有临床意义的改善(6个月SNOT-22下降>8.9分即MCID)。对比监督ML(逻辑回归、树集成、自研MLP)与生成式AI(ChatGPT、Claude、Gemini、Perplexity)，最佳ML模型(MLP)达85%准确率且校准与决策曲线净获益更优，GenAI在判别与校准上表现较差但其解释与临床启发式/MLP特征重要性一致。

> **要点**：MLP以85%准确率预测鼻窦手术获益，优于零样本生成式AI；主张ML主导、GenAI做解释。


#### 9. 人工智能预测青少年特发性脊柱侧凸的健康相关生活质量

*Artificial Intelligence Predicts Health-Related Quality of Life for Adolescent Idiopathic Scoliosis*

**medRxiv/bioRxiv（预印本）** · 2025-11-17 · 前瞻性多中心机器学习建模(预印本) · [DOI](https://doi.org/10.1101/2025.11.16.25340349)

基于前瞻性纵向多中心数据库(Lenke 1或5型、随访两年)，用术前与术中变量构建机器学习模型预测青少年特发性脊柱侧凸(AIS)术后两年SRS-22评分变化(ΔSRS-22)。纳入1477例(女性84.6%)，各ΔSRS-22结局最低均方误差0.18-0.48，最佳0.5分/1分容差准确率分别达56.8%-83.1%、87.2%-97.3%，均优于均值估计基线。

> **要点**：ML用术前/术中变量预测脊柱侧凸术后HRQoL变化，支持手术规划与医患沟通。


#### 10. 可解释机器学习预测心血管手术后恢复质量

*An interpretable machine-learning model for predicting postoperative recovery quality after cardiovascular surgery: development, validation, and clinical applicability*

**medRxiv/bioRxiv（预印本）** · 2025-11-11 · 单中心回顾性队列/机器学习(XGBoost) · [DOI](https://doi.org/10.1101/2025.11.07.25339798)

单中心回顾性队列：分析2021.3–2025.9某院581例心血管术后患者，173例(29.8%)恢复不良(QoR-15低)。XGBoost表现最佳(AUC 0.982、准确率0.974、Hosmer-Lemeshow p=0.791、时序验证AUC 0.997)；SHAP识别女性、ASA分级高、术前乳酸>2mmol/L、手术时间长、衰弱mFI≥0.25五大预测因子，并据DCA分为三档风险。

> **要点**：可解释XGBoost用常规临床数据即可高精度预测心血管术后恢复质量


#### 11. 什么导致术后误吸？

*What Causes Postoperative Aspiration?*

**arXiv（预印本）** · 2025-10-18 · 回顾性ML建模+因果推断(826例) · [arXiv 2510.21779](https://arxiv.org/abs/2510.21779)

基于MIMIC-IV(超40万住院)识别826例术后7天内发生误吸的外科患者(平均62岁，男55.7%)及匹配对照，训练XGBoost、MLP、随机森林预测术后误吸，并用增广逆概率加权估计平均处理效应(ATE)。模型在留出测试集AUROC 0.86、敏感度77.3%；最大每日阿片剂量、住院时长、年龄为最重要预测因子；ATE识别阿片(0.25±0.06)与手术部位(颈0.20、头0.19)为显著致因；男性误吸风险为女性1.5倍、阿片剂量高27%。

> **要点**：ML可有效预测术后误吸(AUROC 0.86)，阿片剂量与手术部位为关键致因。


#### 12. 心脏手术风险评估：机器学习与实验室指标作为辅助工具

*Risk assessment in cardiac surgery: Exploring machine learning and laboratory indices as adjunctive tools*

**medRxiv/bioRxiv（预印本）** · 2025-10-13 · 回顾性数据库队列/机器学习比较 · [DOI](https://doi.org/10.1101/2025.10.10.25337755)

回顾性数据库队列：用MIMIC-IV识别11,261例心血管外科患者，以术前常规实验室值(电解质、eGFR、红细胞分布宽度等)与人口学估计全因1年术后死亡。所测模型中逻辑回归准确率最优(与次优模型双尾t检验p=0.0075)，准确率85.07%、敏感度82.89%、特异度85.19%，重要特征与文献一致。

> **要点**：术前常规实验室值结合机器学习可有效预测心血管术后1年死亡,肾功能与红细胞指标为关键因子


#### 13. BeatAI：基于可穿戴设备与AI的心脏术后房颤追踪

*BeatAI: BiomEtrics for Atrial Arrhythmia Tracking Using Artificial Intelligence*

**medRxiv/bioRxiv（预印本）** · 2025-10-07 · 前瞻性队列/深度学习 · [DOI](https://doi.org/10.1101/2025.10.05.25336766)

前瞻性监测试验：20例心脏术后患者佩戴14天贴片(VivaLNK VV-330)采集逐秒ECG，构建两条深度学习管线。日级多模态Transformer在162,217个降采样数据元上表现保守、假阴性极低；小时级预测模型基于5,607个窗口实现AUC 0.95、特异度0.98、NPV 0.98的房颤预测。

> **要点**：连续可穿戴ECG结合AI可实现心脏术后房颤的日级分层与提前一小时预警


#### 14. 多分支CNN利用颅内EEG高频振荡特征预测癫痫术后发作结局

*Multi-branch convolutional neural network using intracranial EEG high frequency oscillation features for predicting post-surgical seizure outcomes*

**medRxiv/bioRxiv（预印本）** · 2025-10-07 · 多中心回顾性队列/深度学习 · [DOI](https://doi.org/10.1101/2025.10.05.25337367)

多中心回顾性建模：对3家机构78例术前患者于非快速眼动睡眠30–200分钟内检测量化颅内EEG高频振荡(HFO 80–600Hz)，以3个神经解剖特征与37个HFO衍生特征训练三分支CNN(分支分别计算患者内、患者间差异及切除触点)。模型以5折交叉验证对无发作患者标注准确率达92%。

> **要点**：HFO三分支CNN可前瞻性评估拟定切除边界能否实现癫痫术后无发作


#### 15. 面向外科干预的因果机器学习（X-MultiTask）

*Causal Machine Learning for Surgical Interventions*

**arXiv（预印本）** · 2025-09-24 · 回顾性机器学习建模（两数据集验证） · [arXiv 2509.19705](https://arxiv.org/abs/2509.19705)

提出多任务元学习框架X-MultiTask估计外科决策的个体化治疗效应（ITE），将每种手术决策（前入路vs后入路、手术vs不手术）建模为独立任务并学习共享表示，训练目标引入逆概率加权（IPW）。公开脊柱融合数据集（1,017例）中前入路组平均AUC达0.84、后入路组0.77，治疗效应估计ε_NN-PEHE=0.2778、ε_ATE=0.0763均优于基线；私有AIS数据集（368例）预测PRO时ε_NN-PEHE=0.2551、ε_ATE=0.0902。

> **要点**：多任务因果ML为个体化外科决策提供稳健治疗效应估计，最高AUC 0.84。


#### 16. 虚拟患者集成方法预测个体化手术并发症

*A Virtual Patients Ensemble Approach for Predicting Surgical Complications*

**medRxiv/bioRxiv（预印本）** · 2025-09-22 · 回顾性验证/LLM智能体 · [DOI](https://doi.org/10.1101/2025.09.21.25336262)

方法学/回顾性验证：提出基于LLM的AI agent，用虚拟患者集成(VPE)从非结构化病例描述提取诊断、术式与危险因素，生成N个虚拟患者以捕捉不确定性并预测具体并发症。在PMC-Patients数据集1440份病例(186份符合纳入)上评估，正确识别32%的实际并发症，显著优于零假设基线与基线LLM预测。

> **要点**：LLM虚拟患者集成可生成个体化、可解释的具体手术并发症预测而非笼统风险等级


#### 17. 动态结构恢复参数提升黄斑裂孔手术视力结局预测

*Dynamic Structural Recovery Parameters Enhance Prediction of Visual Outcomes After Macular Hole Surgery*

**arXiv（预印本）** · 2025-09-11 · 回顾性纵向OCT+多模态深度学习 · [arXiv 2509.09227](https://arxiv.org/abs/2509.09227)

利用公开纵向OCT数据集（术前及术后2周、3月、6月、12月五个阶段），引入动态结构参数并整合入多模态深度学习框架预测特发性全层黄斑裂孔（iFTMH）术后视力恢复。分阶段分割模型平均Dice>0.89；基底直径、椭圆体带完整性、裂孔面积为BCVA显著预测因子（P<0.05）；纳入动态恢复率持续提升logistic回归AUC（3月随访尤著）；多模态DL优于logistic回归，各阶段AUC最高相差0.12。

> **要点**：动态结构参数+多模态DL提升黄斑裂孔术后视力预测，AUC较回归高最多0.12。


#### 18. 面部整形手术美学结局的自动化评估

*Automated Assessment of Aesthetic Outcomes in Facial Plastic Surgery*

**arXiv（预印本）** · 2025-08-18 · 回顾性研究（计算机视觉框架+最大配对数据集） · [arXiv 2508.13363](https://arxiv.org/abs/2508.13363)

提出可扩展、可解释的计算机视觉框架，用正面照片量化面部整形手术的美学结局，流水线含自动关键点检测、几何面部对称计算、深度学习年龄估计与鼻部形态分析。构建迄今最大配对术前后面部图像数据集（1,259例7,160张，含366例732张鼻整形子集）。鼻整形子集96.2%患者至少一项鼻测量改善，鼻翼宽/面宽比（77.0%）、鼻长/面高比（41.5%）、鼻翼宽/内眦比（39.3%）改善最显著（p<0.001）；989例正面队列71.3%在整体对称或感知年龄上显著改善（p<0.01）；身份一致性在FMR 0.01%下真匹配率达99.5%/99.6%。

> **要点**：CV框架量化面部整形美学结局，鼻整形96.2%改善、身份真匹配率99.5%。


#### 19. 预测心力衰竭近期死亡：基于EHR的深度学习模型外部验证

*Predicting Near-term Mortality in Heart Failure: External Validation of Electronic Health Record-Based Deep Learning Model*

**medRxiv/bioRxiv（预印本）** · 2025-08-15 · 深度学习模型外部验证 · [DOI](https://doi.org/10.1101/2025.08.13.25333636)

外部验证研究：此前52,265例单中心深度学习模型预测心衰住院患者1年重度失代偿/死亡(阳性类含VAD/移植手术转诊)，C统计量0.91。本研究在V-CHAMPS合成国家级、异构EHR数据集(75,086例心衰患者、380,441次住院、>7.2亿数据点，23%为阳性)外部验证，阳性类仅限死亡时C统计量0.79。

> **要点**：单中心构建的EHR深度学习模型跨异构系统仍保持相对准确,可辅助心衰高级(手术)治疗决策


#### 20. 评估术前MRI对根治性前列腺切除术后勃起功能障碍的预测价值

*Evaluating the Predictive Value of Preoperative MRI for Erectile Dysfunction Following Radical Prostatectomy*

**arXiv（预印本）** · 2025-08-05 · 回顾性预测建模比较(术后结局预测) · [arXiv 2508.03461](https://arxiv.org/abs/2508.03461)

为评估术前MRI对根治性前列腺切除术后12个月勃起功能障碍(ED)的附加预测价值，比较四种建模策略：仅临床基线、MRI手工解剖特征、直接在MRI切片上的深度学习、影像与临床多模态融合。影像模型最高AUC 0.569略优于手工解剖特征(0.554)，但均低于临床基线(0.663)，融合仅边际提升(0.586)；SHAP分析证实临床特征贡献最大。

> **要点**：术前MRI深度学习未超越临床特征预测前列腺术后ED(临床AUC 0.663)


#### 21. SurgeryLSTM：面向脊柱手术后住院时长精确可解释预测的时间感知神经模型

*SurgeryLSTM: A Time-Aware Neural Model for Accurate and Explainable Length of Stay Prediction After Spine Surgery*

**arXiv（预印本）** · 2025-07-15 · 预测建模比较(术后住院时长预测) · [arXiv 2507.11570](https://arxiv.org/abs/2507.11570)

为预测择期脊柱手术住院时长(LOS)并突出时序建模与可解释性优势，比较传统ML(线性回归、随机森林、SVM、XGBoost)与所提SurgeryLSTM(带注意力的掩码双向LSTM)，使用结构化围手术期EHR数据，以决定系数(R2)评估并用可解释AI识别关键预测因子。SurgeryLSTM达最高R2=0.86,优于XGBoost(R2=0.85)与基线；注意力机制动态识别术前临床序列中有影响的时段，关键预测因子包括骨疾病、慢性肾病与腰椎融合。

> **要点**：带注意力的BiLSTM实现脊柱术后LOS精确可解释预测(R2=0.86)


#### 22. 用AI驱动方法揭示脑肿瘤手术的神经影像生物标志物

*Uncovering Neuroimaging Biomarkers of Brain Tumor Surgery with AI-Driven Methods*

**arXiv（预印本）** · 2025-07-07 · 回顾性影像队列/可解释深度学习(预印本，n=49) · [arXiv 2507.04881](https://arxiv.org/abs/2507.04881)

构建融合可解释AI(XAI)与神经影像特征工程的框架，对脑肿瘤患者进行手术后生存评估；纳入49例术前+术后结构MRI这一稀缺数据资源。方法学核心是提出'全局解释优化器'以精炼深度学习模型中与生存相关的特征归因，提升可解释性与可靠性。临床发现术后生存与认知/感觉功能相关脑区的改变有关，提示保留决策与情绪调节相关区域对改善长期结局的重要性。

> **要点**：XAI+神经影像识别脑肿瘤术后生存生物标志物，强调保留认知/感觉功能区。


#### 23. 可解释机器学习用于PRK术后随访

*Explainable machine learning for post PKR surgery follow-up*

**medRxiv（预印本）** · 2025-07-05 · 方法学/可解释机器学习(迁移训练) · [DOI](https://doi.org/10.1101/2025.07.03.25330835)

方法学研究：针对光屈光性角膜切削术(PRK)后偶发的上皮下炎症/纤维化(视觉雾状混浊)，提出基于活体谱域OCT图像的机器学习纤维化检测算法。因该现象罕见，模型改用症状相似(但永久)的Fuchs角膜内皮营养不良角膜训练，再应用于PRK术后患者图像；模型输出(Fuchs分类概率)可作为角膜愈合的量化、可解释指标。研究为方法演示，未报告具体准确率。

> **要点**：以Fuchs营养不良迁移训练的可解释ML可量化监测PRK术后角膜愈合



### （八）分诊、急诊外科与围手术期流程（8 篇）

#### 1. 基于时间扩展交互图的手术团队动态实时可操作建模

*Actionable Real-Time Modeling of Surgical Team Dynamics via Time-Expanded Interaction Graphs*

**arXiv（预印本）** · 2026-05-05 · 方法开发（回顾性手术记录） · [arXiv 2605.04169](https://arxiv.org/abs/2605.04169)

针对现有外科AI偏重视觉工作流、缺乏术中团队交互结构化表征的问题，提出用时间扩展交互图建模手术团队动态：团队成员为时间索引节点、沟通交流为有向边，经时空扩展后用静态图神经网络高效推理，预测手术时长偏差衡量的流程效率，并做反事实分析找出改善结局的最小沟通结构变化与可解释行为变量。真实手术记录实验显示其改进对超时干预的早期识别并给出可操作解释。

> **要点**：时间扩展交互图+GNN实时建模手术团队动态，预测流程效率并给出可操作反事实解释。


#### 2. 部署与评估一款EHR集成、LLM驱动的手术患者分诊工具

*Deployment and Evaluation of an EHR-integrated, Large Language Model-Powered Tool to Triage Surgical Patients*

**arXiv（预印本）** · 2026-03-18 · 前瞻性部署评估研究(LLM) · [arXiv 2603.17234](https://arxiv.org/abs/2603.17234)

手术共管(SCM)受限于需人工识别合适患者。在斯坦福医疗开展前瞻非盲研究，LLM驱动、EHR集成的分诊工具(SCM Navigator)基于术前文档/结构化数据/临床标准给出SCM建议并经医师复核。部署以来分诊6,193例、1,582例(23%)获推荐会诊;以医师判断为参照，敏感度0.94(95%CI 0.91-0.96)、特异度0.74(0.71-0.77);事后审阅示多数分歧源于临床标准/流程/实践差异而非LLM误判(LLM误判仅占假阴性2/19=11%)。

> **要点**：LLM+人在环手术患者分诊敏感度0.94，可安全增强/自动化围手术期分流工作流。


#### 3. 无监督神经网络自动分类医疗转录中的手术紧急程度

*Unsupervised Neural Network for Automated Classification of Surgical Urgency Levels in Medical Transcriptions*

**arXiv（预印本）** · 2026-03-16 · 方法学研究(无监督+有监督NLP) · [arXiv 2604.06214](https://arxiv.org/abs/2604.06214)

提出无监督框架将手术转录文本自动分为即刻/急诊/择期三个紧急等级：用领域模型BioClinicalBERT生成语义嵌入，经K-means与Deep Embedding Clustering(DEC)聚类(DEC更优)，再用改良Delphi专家法验证，最终用BiLSTM+BioClinicalBERT嵌入构建分类器。交叉验证下accuracy、precision、recall、F1均表现稳健并对未见数据泛化良好(摘要未给具体数值)。

> **要点**：无监督语言模型框架可在缺乏标注下实现手术紧急程度实时分诊。


#### 4. PREBA：基于PCA加权检索增强LLM与贝叶斯平均的手术时长预测

*PREBA: Surgical Duration Prediction via PCA-Weighted Retrieval-Augmented LLMs and Bayesian Averaging Aggregation*

**arXiv（预印本）** · 2026-02-27 · 方法学研究（检索增强LLM，双中心真实数据集验证） · [arXiv 2603.13275](https://arxiv.org/abs/2603.13275)

提出PREBA检索增强框架，通过PCA加权检索最相似历史手术病例与统计先验构建证据式prompt，并用贝叶斯平均融合多轮LLM预测与群体先验，实现校准的手术时长估计，服务医院资源管理。在两个真实临床数据集、三种LLM（Qwen3、DeepSeek-R1、HuatuoGPT-o1）上，较zero-shot推理将MAE最多降低40%、R²由-0.13提升至0.62，达到与监督ML相当的精度。

> **要点**：检索增强让免训练LLM的手术时长预测达到监督学习水平。


#### 5. 不确定性下手术室日内排程的多智能体强化学习

*Multi-Agent Reinforcement Learning for Intraday Operating Rooms Scheduling under Uncertainty*

**arXiv（预印本）** · 2025-12-04 · 方法学研究（多智能体强化学习仿真） · [arXiv 2512.04918](https://arxiv.org/abs/2512.04918)

将日内手术排程建模为协作马尔可夫博弈，提出多智能体强化学习(MARL)框架，每间手术室为一智能体，采用集中训练分散执行、共享PPO策略并配套内轮序贯分配协议生成无冲突联合排程。在含6间手术室、8类手术、随机紧急/急诊到达的真实仿真中，学习策略在7项指标、3个评估子集上优于6种规则启发式，并给出相对事后MIP oracle的最优性差距。

> **要点**：MARL可实时、可解释地优化手术室排程，优先急诊、批处理同类手术、延后低价值择期。


#### 6. 可泛化的手术时长预测模型：多中心开发与时间验证

*Generalisable prediction model of surgical case duration: multicentre development and temporal validation*

**arXiv（预印本）** · 2025-11-12 · 回顾性多中心研究加时间外部验证（机器学习） · [arXiv 2511.08994](https://arxiv.org/abs/2511.08994)

基于日本两家综合医院常规围手术期数据（开发2021–2023，时间测试2024）预测对数手术时长，仅用术前易得变量（手术情境与患者因素），采用弹性网、GAM、随机森林、梯度提升树四种学习器经内-外交叉验证并堆叠泛化集成。共分析63,206台手术（开发45,647、时间测试17,559），2024测试队列校准良好（截距0.423、95%CI 0.372–0.474；斜率0.921、95%CI 0.911–0.932）。

> **要点**：仅用术前常规变量的堆叠ML模型可跨院、跨时准确且校准良好地预测手术时长以优化排程。


#### 7. ORB手术室物流机器人：通过移动操作自动化手术室物流

*ORB: Operating Room Bot, Automating Operating Room Logistics through Mobile Manipulation*

**arXiv（预印本）** · 2025-09-19 · 系统开发+实证验证 · [arXiv 2509.15600](https://arxiv.org/abs/2509.15600)

提出手术室机器人（ORB）框架，采用分层行为树架构集成物体识别、场景理解与GPU加速运动规划以自动化手术室物流。实时感知流水线融合YOLOv7、SAM2与Grounded DINO，并适配cuRobo并行轨迹优化实现无碰撞移动操作。实证显示手术室物资取送成功率80%、补货成功率96%。

> **要点**：融合YOLOv7/SAM2/cuRobo的移动操作机器人自动化手术室物流，取送/补货成功率80%/96%。


#### 8. 择期手术管理中预测准确性与重排灵活性的权衡

*Prediction accuracy versus rescheduling flexibility in elective surgery management*

**arXiv（预印本）** · 2025-07-21 · 仿真研究(择期手术排程与流程管理) · [arXiv 2507.15566](https://arxiv.org/abs/2507.15566)

住院床位是择期手术入院规划的关键下游资源，医院可用机器学习模型预测患者住院时长(LOS)以保障床位，但预测LOS与真实值可能不符导致排程不可行，需借助推迟入院、跨病房调配或转移已入院患者等操作灵活性重排。基于此前'模拟ML'方法，本文探讨LOS预测准确性与重排灵活性在各种纠正策略下的关系，考察LOS预测误差下最有效的患者重排策略以防止床位溢出并优化资源利用。

> **要点**：权衡LOS预测准确性与重排灵活性以防床位溢出



### （九）移植相关AI（7 篇）

#### 1. 用不平衡EHR多模态深度学习早期预测肝移植后GVHD

*Early GVHD Prediction in Liver Transplantation via Multi-Modal Deep Learning on Imbalanced EHR Data*

**arXiv（预印本）** · 2025-11-06 · 回顾性队列研究（多模态深度学习） · [arXiv 2511.11623](https://arxiv.org/abs/2511.11623)

基于Mayo Clinic 1992–2025年2100例肝移植患者（含42例移植物抗宿主病GVHD）的术前EHR（人口学、化验、诊断、用药四模态），提出动态融合多模态、处理不规则缺失记录并以AUC优化应对极端类不平衡的深度学习框架。其优于所有单模态与多模态ML基线，AUC 0.836、AUPRC 0.157、召回0.768、特异度0.803。

> **要点**：多模态深度学习在极不平衡EHR上实现肝移植后GVHD的早期预测。


#### 2. 机器学习结合术中激光散斑衬比成像评估活体供肾移植早期移植物功能

*Machine Learning-Driven Assessment of Early Graft Function in Living Donor Kidney Transplantation Using Intraoperative Laser Speckle Contrast Imaging*

**medRxiv/bioRxiv（预印本）** · 2025-10-08 · 前瞻性队列/机器学习 · [DOI](https://doi.org/10.1101/2025.10.07.25336974)

前瞻性队列：对110例活体供肾移植受者行术中激光散斑衬比成像(LSCI)，以术后1周eGFR分组(≥30 vs <30 mL/min/1.73m²)，其中15例(17%)为低eGFR。LSCI特征联合临床变量的ML模型较单用临床数据显著提升对低1周eGFR的预测，LSCI亦可实时检出血管并发症。

> **要点**：术中LSCI微循环特征结合ML兼具预测早期移植物功能与实时手术引导价值


#### 3. 拓扑Transformer早期识别肺移植后死亡高危个体

*Early Identification of High-Risk Individuals for Mortality after Lung Transplantation: A Retrospective Cohort Study with Topological Transformers*

**medRxiv/bioRxiv（预印本）** · 2025-10-03 · 回顾性队列/拓扑Transformer · [DOI](https://doi.org/10.1101/2025.10.01.25337124)

回顾性队列：提出整合静态与时变临床变量并纳入患者时间轨迹拓扑特征的Transformer模型预测肺移植后死亡。在留出测试集上准确率87.4%、敏感度84.1%、特异度89.6%，优于Lung Transplant Risk Index等基准；SHAP显示早期氧合趋势、免疫抑制负荷与炎症标志物等动态变量贡献最大。

> **要点**：拓扑特征+Transformer提升肺移植后死亡风险预测的准确性与可解释性


#### 4. 预测心脏移植排斥风险：整合临床与组织病理的个体化术后管理框架

*Predicting Rejection Risk in Heart Transplantation: An Integrated Clinical–Histopathologic Framework for Personalized Post-Transplant Care*

**medRxiv/bioRxiv（预印本）** · 2025-09-08 · 回顾性队列+XGBoost建模(预印本) · [DOI](https://doi.org/10.1101/2025.09.05.25335209)

回顾性纳入484例心脏移植受者、移植后6个月内1188次心内膜活检(EMB)，从数字化HE切片提取370个量化病理特征、聚合268个临床变量，用XGBoost比较四类数据源。全整合纵向模型AUROC 0.86、AUPRC 0.74；据此衍生简化的整合排斥风险指数IRRI(4临床+4形态)，高危者未来排斥HR 6.15(4.17–9.09)、低危者HR 0.52(0.33–0.84)，可提前90天分层。核心相关。

> **要点**：临床+活检形态学XGBoost预测心脏移植排斥(AUROC 0.86，HR 6.15)。


#### 5. GigaHeart：面向心脏移植的心脏专用CT基础模型

*A Cardiac-specific CT Foundation Model for Heart Transplantation*

**medRxiv/bioRxiv（预印本）** · 2025-08-19 · 预印本·基础模型开发与验证 · [DOI](https://doi.org/10.1101/2025.08.14.25333618)

基于56,607例患者的180,897个胸部CT体积预训练首个心脏专用基础模型GigaHeart，通过对比心脏区域与全胸引导模型聚焦心脏细粒度特征，用于心脏移植供受体心脏大小匹配。在8项心脏分类任务取得最佳表现；AI分割的总心脏容积回归实际心脏质量较传统预测心脏质量(PHM)R²提升33.3%，均方误差降低57%，扩大了可接受供心尺寸范围。

> **要点**：心脏专用CT基础模型显著优于PHM公式，改进移植心脏尺寸匹配。


#### 6. 高分辨多重抗体组学与可解释机器学习揭示肾移植排斥的新致病机制

*High-resolution multiplexed antibody-omics and interpretable machine learning unveil novel pathogenic mechanisms in kidney transplant rejection*

**medRxiv（预印本）** · 2025-07-27 · 多队列组学+可解释ML(预印本) · [DOI](https://doi.org/10.1101/2025.07.25.25332230)

建立样本节约的抗体生物物理画像技术，用可解释机器学习学习供者特异性抗体(DSA)反映的推定因果机制信号，成功区分发生与不发生抗体介导排斥(AbMR)的DSA阳性患者，跨两个地域独立队列稳定；揭示IgM反应与糖基化(唾液酸化/半乳糖化)的被低估作用，并由IgM+唾液酸化构建高敏高特异的晚期AbMR风险评分(鼠慢性排斥模型佐证血清IgM-DSA升高)。属移植排斥机制与风险分层，核心相关。

> **要点**：抗体组学+可解释ML分层肾移植抗体介导排斥风险。


#### 7. Transplant-Agents：评估移植后风险预测与排斥生物标志物可重复性的多智能体AI框架

*Transplant-Agents: A Multi-Agent Artificial Intelligence Framework for Reproducibility Assessment of Post-Transplant Risk Prediction and Rejection Biomarkers*

**bioRxiv（预印本）** · 2025-07-16 · 回顾性多数据集验证/多智能体LLM+ML · [DOI](https://doi.org/10.1101/2025.07.10.664265)

方法学研究：提出整合LLM与机器学习的多智能体框架，通过结构化迭代对话收敛于跨多次迭代可重复的最优生物标志物集。在ImmPort三项多中心临床试验数据集(肾、肝、心移植共683例)评估，AUROC分别为0.93、0.88、0.88，特征重要性分析确认标志物的稳定性与可解释性。

> **要点**：多智能体AI可自动、可重复地复现移植生物标志物并实现透明的排斥风险预测



### （十）麻醉、围手术期监测与外科ICU（10 篇）

#### 1. 基于Transformer多标签学习的术中不良事件早期预警

*Early Warning of Intraoperative Adverse Events via Transformer-Driven Multi-Label Learning*

**arXiv（预印本）** · 2026-03-05 · 方法学研究(多标签时序建模，自建数据集) · [arXiv 2603.05212](https://arxiv.org/abs/2603.05212)

针对术中不良事件预测忽视事件间依赖、异质数据利用不足与类别不平衡的问题，构建首个多标签术中不良事件数据集MuAE(覆盖6类关键事件)，提出Transformer多标签框架IAENet，含改进的时间感知FiLM(TAFiLM)融合静态协变量与动态变量并建模时序依赖，及带共现正则的标签约束重加权损失(LCRLoss)。在5/10/15分钟早期预警任务上平均F1较强基线分别提升+5.05%、+2.82%、+7.57%。

> **要点**：多标签Transformer实现术中多种不良事件早期预警(F1提升最高+7.57%)。


#### 2. 跨样本增强的测试时自适应用于个体化术中低血压预测

*Cross-Sample Augmented Test-Time Adaptation for Personalized Intraoperative Hypotension Prediction*

**arXiv（预印本）** · 2025-12-12 · 方法学/时序DL · [arXiv 2512.15762](https://arxiv.org/abs/2512.15762)

提出跨样本增强测试时自适应框架CSA-TTA，通过构建低血压/非低血压历史样本库，用K-Shape聚类+top-K语义相似检索的粗到细策略构建测试时训练数据，并结合自监督掩码重建与回溯序列预测信号，缓解术中低血压(IOH)事件稀少导致的测试时训练不可靠。在VitalDB与真实院内数据集上、结合TimesFM与UniTS等模型，微调下Recall/F1提升+1.33%/+1.13%，零样本下提升+7.46%/+5.07%。

> **要点**：CSA-TTA以跨样本增强测试时自适应个体化预测术中低血压，零样本F1提升5.07%。


#### 3. TECM*：强化学习方法的数据驱动评估及其在外科脓毒症肝素治疗策略中的应用

*TECM*: A Data-Driven Assessment to Reinforcement Learning Methods and Application to Heparin Treatment Strategy for Surgical Sepsis*

**arXiv（预印本）** · 2025-12-02 · 回顾性数据库研究（强化学习） · [arXiv 2512.10973](https://arxiv.org/abs/2512.10973)

基于MIMIC-IV与eICU数据库、针对腹部手术后脓毒症患者，提出将离散SOFA转为连续cxSOFA的强化学习框架优化个体化肝素治疗，并提出治疗效果比较矩阵(TECM)评估策略。对比Q-Learning、DQN、DDQN、BCQ、CQL，其中cxSOFA-CQL表现最佳，将死亡率从1.83%降至0.74%，平均住院日从11.11降至9.42天，TECM显示各模型结果一致稳健。

> **要点**：连续cxSOFA评分+CQL可可解释地优化外科脓毒症肝素治疗，降低死亡率与住院时长。


#### 4. 连续多模态AI结合可穿戴生命体征预测普通病房术后并发症

*Continuous Multimodal AI with Wearable Vital Signs Predicts Postoperative Complications in the General Ward*

**medRxiv/bioRxiv（预印本）** · 2025-11-27 · 前瞻性队列/多模态深度学习 · [DOI](https://doi.org/10.1101/2025.11.25.25340950)

前瞻性队列：纳入1,285例食管、胃、肝、胰、结直肠手术患者，整合基线、术中、ICU与病房数据及270,603小时遥测PPG生命体征，构建实时多模态AI预测术后腹腔内感染。感染检测AUROC中位0.90(0.89–0.91)，可提前9小时预测(AUROC 0.89)；连续可穿戴数据使AUROC提升8%、AUPRC提升109%，并优于传统早期预警评分。

> **要点**：连续可穿戴生命体征驱动的多模态AI可在普通病房提前预警术后并发症,优于传统预警评分


#### 5. VitalBench：术中长时生命体征预测的多中心严格基准

*VitalBench: A Rigorous Multi-Center Benchmark for Long-Term Vital Sign Prediction in Intraoperative Care*

**arXiv（预印本）** · 2025-11-14 · 基准数据集研究 · [arXiv 2511.13757](https://arxiv.org/abs/2511.13757)

提出面向术中生命体征预测的基准VitalBench，含两家独立医学中心逾4000台手术数据，设完整数据、不完整数据与跨中心泛化三条评估赛道，采用掩码损失技术实现稳健无偏评估，为术中医学时序预测模型开发与比较提供标准化统一平台。

> **要点**：多中心、三赛道的术中生命体征预测基准，强调稳健性与跨中心可迁移性。


#### 6. 用强化学习个体化血流动力学管理以预防心脏术后持续性急性肾损伤

*Personalized Hemodynamic Management Using Reinforcement Learning to Prevent Persistent Acute Kidney Injury After Cardiac Surgery*

**medRxiv/bioRxiv（预印本）** · 2025-10-25 · 多中心回顾性队列+RL建模(预印本) · [DOI](https://doi.org/10.1101/2025.10.23.25338698)

队列研究，在MIMIC-IV(n=6643)开发并内部验证强化学习(RL)模型指导术后72h内静脉补液、血管升压药与正性肌力药，外部验证于SICdb(n=2254)与Mount Sinai(n=846)，共9743例心脏术后ICU住院。RL累计回报高于临床医生，医生行为与模型推荐一致时持续性AKI校正OR为0.92(0.89–0.96，SICdb)与0.91(0.86–0.96，MSHS)；模型倾向更小补液量、适中升压、更多正性肌力药。

> **要点**：RL个体化围术期血流动力学管理降低心脏术后持续性AKI风险。


#### 7. 认知安全网：复杂临床情境下人类与AI诊断推理的比较

*The Cognitive Safety Net: Comparing Human and AI Diagnostic Reasoning during Complex Clinical Situations*

**medRxiv/bioRxiv（预印本）** · 2025-10-07 · 模拟RCT内的比较分析(预印本) · [DOI](https://doi.org/10.1101/2025.10.06.25335641)

在高仿真模拟RCT(Anticipamax，NCT06487208)中，比较34名有经验的麻醉住院医师与对话式LLM(ChatGPT-4)在多因素围术期休克中的诊断推理，采用Condorcet社会选择法排序诊断策略。AI给出穷尽、非层级分析并将脓毒性休克列入靠前假设，但系统性忽略住院医师一致识别的经验性风险(气体栓塞)；临床演变后双方均汇聚到脓毒性休克，而住院医师聚焦、适应性推理被评为策略上更优。

> **要点**：LLM作为认知安全网防止过早诊断收敛，与临床医师聚焦推理互补(围术期)。


#### 8. 用于连续术中低血压预测的自适应频域网络

*A Self-Adaptive Frequency Domain Network for Continuous Intraoperative Hypotension Prediction*

**arXiv（预印本）** · 2025-09-28 · 方法学(深度学习)+内外部验证 · [arXiv 2509.23720](https://arxiv.org/abs/2509.23720)

针对术中低血压(IOH)预测中现有方法难以兼顾时/频域信息、长短期依赖与生物信号噪声的问题，提出自适应频域网络SAFDNet：自适应谱块用傅里叶分析提取频域特征并以自适应阈值抑噪，交互注意力块捕获长短期依赖。在两个大规模真实数据集内外部验证中，IOH早期预警AUROC最高达97.3%，优于当前最优模型且对噪声不敏感。

> **要点**：自适应频域网络实现术中低血压早期预警(AUROC最高97.3%)。


#### 9. 基于EHR的患者级术中阿片类药物剂量预测的因果机器学习(OPIAID)

*Causal Machine Learning for Patient-Level Intraoperative Opioid Dose Prediction from Electronic Health Records*

**arXiv（预印本）** · 2025-08-12 · 方法学/算法框架(未报告具体数值) · [arXiv 2508.09059](https://arxiv.org/abs/2508.09059)

提出OPIAID算法，利用观察性电子健康记录(EHR)训练机器学习模型并采用因果机器学习方法，理解阿片剂量、患者与术中特征及疼痛与阿片相关不良事件(ORADE)结局间的关系，从而为个体患者推荐个性化阿片剂量以优化镇痛并减少不良事件。文中阐述算法方法、架构、关键假设及性能评估思路，未报告具体性能数值。

> **要点**：因果ML实现个体化术中阿片剂量推荐以平衡镇痛与不良事件


#### 10. 论证模型复杂度：迁移学习与经典模型在麻醉下术中伤害性刺激监测的对比

*Justifying model complexity: evaluating transfer learning against classical models for intraoperative nociception monitoring under anesthesia*

**medRxiv（预印本）** · 2025-07-03 · 回顾性基准/机器学习对比 · [DOI](https://doi.org/10.1101/2025.07.01.25330670)

回顾性基准研究：用101例成人手术(约18,500分钟内约50,000个标注伤害性刺激事件，30项生理+18项药物特征，5秒窗)的PhysioNet数据，以留一手术交叉验证比较L1逻辑回归、随机森林与时序卷积网络(TCN)迁移学习。含药物特征的随机森林判别最优(AUROC 0.716、AUPRC 0.399)，显著优于TCN(AUROC 0.649、AUPRC 0.311)；等渗校准使校准误差降>80%，各集成法均未超过单一随机森林。

> **要点**：在精选特征上可解释经典模型(随机森林)在术中伤害性刺激监测中匹敌或超越复杂深度学习



### （十一）大语言模型与生成式AI（外科应用）（27 篇）

#### 1. 用强化学习在数字孪生表征上训练LLM以完成推理密集的手术视频问答

*Training LLMs with Reinforcement Learning over Digital Twin Representations for Reasoning-Intensive Surgical VideoQA*

**arXiv（预印本）** · 2026-06-15 · 方法开发+基准(2000问答) · [arXiv 2606.17279](https://arxiv.org/abs/2606.17279)

针对手术视频问答需跨语义/空间/时序多步推理、而现有方法将视频压为离散token并耦合感知与推理限制多步推理的问题，提出RL框架训练LLM在手术基础模型构建的数字孪生表征上解耦感知与推理，引入帧/时窗/术式层级表征与概率不确定性，并设计融合格式校验、临床合理性与不确定性校准的奖励。构建结肠镜基准REAL-Colon-Reason(2000个问答、三种复杂度)，在其及REAL-Colon-VQA、EndoVis18-VQA上达SOTA。

> **要点**：在数字孪生表征上RL训练LLM，解耦感知与推理提升手术VideoQA。


#### 2. SurgiQ：评估大语言模型外科理解的大规模多域基准

*SurgiQ: A Large-Scale Multi-Domain Benchmark for Evaluating Surgical Understanding in Large Language Models*

**arXiv（预印本）** · 2026-06-06 · 基准构建(13,055题)+35个LLM评测 · [arXiv 2606.08071](https://arxiv.org/abs/2606.08071)

针对外科需程序推理、管理权衡、否定处理与手术决策选择而现有医学基准不足的问题，提出纯文本、源可溯的外科基准SurgiQ，含13,055道四选一多选题、覆盖六个外科域与四种题型(病例、推理、最佳选项、否定)，经多阶段生成-验证-专家审核构建。统一对数似然协议下评测35个开源LLM：较小模型多近25%随机基线，最佳模型达68.1%；通用模型(尤其Qwen2.5)优于多数生物医学模型，且强模型仍会在临床合理干扰项上自信犯错。

> **要点**：外科LLM基准显示最佳仅68.1%，现有医学专用化对外科覆盖不足。


#### 3. SURGENT：覆盖围手术期全流程的外科多智能体辅助系统

*SURGENT: A Surgical Multi-Agent Assistance System Across the Perioperative Workflow*

**arXiv（预印本）** · 2026-05-28 · 系统开发+多任务实验评估 · [arXiv 2605.29368](https://arxiv.org/abs/2605.29368)

提出外科多智能体系统SURGENT，融合Tree-of-Thought规划器、多科室协作智能体与结合临床指南和生物医学文献的检索增强推理，并设计管理长期病史与短期工作摘要的记忆机制。在病例分析、术式模拟、安全监测、并发症风险评估、康复指导五项围手术期任务上优于基线LLM与现有医学多智能体框架；消融显示以DeepSeek为可本地部署骨干可实现隐私保护部署。

> **要点**：多智能体+RAG+记忆设计的围手术期LLM助手，五项任务超越基线并支持本地隐私部署。


#### 4. RoboSurg-VQA：面向分割感知的手术视觉问答多模态基准

*RoboSurg-VQA: A Multimodal Benchmark for Surgical Segmentation-Aware Visual Question Answering*

**arXiv（预印本）** · 2026-05-21 · 基准/数据集构建 · [arXiv 2605.23068](https://arxiv.org/abs/2605.23068)

将多个公开手术分割数据集在统一schema下改造为分割感知的视觉问答(VQA)基准RoboSurg-VQA，每帧配一组关于流程情境、解剖(含区域)、成像模态/视角、伪影、图像质量与可见性等的封闭式问题。通过约束提示生成候选答案并经有效性/一致性自动校验与人工审核，报告了基准统计、基线与在遮挡、烟雾、出血等退化条件下的评测挑战（未列具体准确率）。

> **要点**：由分割数据集改造的分割感知手术VQA基准，评测退化条件下的多模态理解。


#### 5. SurgLQA：可扩展的长时程手术视频问答

*SurgLQA: Scalable Long-Horizon Surgical Video Question Answering*

**arXiv（预印本）** · 2026-05-18 · 方法+基准开发 · [arXiv 2605.17915](https://arxiv.org/abs/2605.17915)

提出统一的长时程手术视频问答框架SurgLQA，含忠实时序整合(FTC)构建紧凑长程表示并保留细粒度时序，及时序锚定多策略缩放(TMS)在测试时自适应调整推理容量。重构了长时长结肠镜VideoQA基准Colon-LQA并在其与REAL-Colon-VQA上实验，长程推理性能一致提升（摘要未列具体数值）。

> **要点**：SurgLQA以时序整合与测试时多策略缩放实现长时程手术视频问答的稳定推理增益。


#### 6. Hi-GaTA：面向手术视频报告生成的分层门控时序聚合适配器

*Hi-GaTA: Hierarchical Gated Temporal Aggregation Adapter for Surgical Video Report Generation*

**arXiv（预印本）** · 2026-05-11 · 方法+基准开发（214段视频） · [arXiv 2605.11208](https://arxiv.org/abs/2605.11208)

面向手术视频报告生成，构建214段高质量模拟手术视频配外科医生撰写评估报告的基准，并提出感知-对齐-推理框架：核心Hi-GaTA轻量时序适配器经短到长程时序聚合将长视频压缩为LLM兼容视觉前缀token，视觉端预训练在40,000分钟公开手术视频上的ViViT式编码器Sur40k，末端以LoRA微调LLM生成报告。实验取得最佳总体性能、稳定优于强MLLM基线。

> **要点**：Hi-GaTA时序适配器桥接长视频与LLM，实现优于强基线的手术视频评估报告生成。


#### 7. SurgCheck：视觉-语言模型在手术VQA中真的看图了吗？

*SurgCheck: Do Vision-Language Models Really Look at Images in Surgical VQA?*

**arXiv（预印本）** · 2026-05-03 · 诊断性基准研究 · [arXiv 2605.01911](https://arxiv.org/abs/2605.01911)

提出诊断基准SurgCheck量化手术视觉问答(VQA)中的语言捷径依赖：每帧配含实体名的原始问题与去除实体名但保留相同视觉内容和答案的低偏问题(辅以边界框、箭头、空间位置、释义四类锚定线索)，以性能差作为捷径依赖信号，并用LLM-as-a-judge评测零样本开放回答。在5个VLM上一致观察到低偏问题下性能下降，纯文本消融显示动作与目标预测很大程度由语言捷径而非视觉推理驱动。

> **要点**：SurgCheck揭示手术VQA强性能多靠语言捷径而非真正看图，呼吁偏差感知评测。


#### 8. Sum-of-Checks：用大型视觉-语言模型对手术安全的结构化推理

*Sum-of-Checks: Structured Reasoning for Surgical Safety with Large Vision-Language Models*

**arXiv（预印本）** · 2026-04-24 · 方法+基准评测(3个LVLM) · [arXiv 2604.22156](https://arxiv.org/abs/2604.22156)

针对腹腔镜胆囊切除术中关键安全视野(CVS)评估，提出Sum-of-Checks框架，将每条CVS标准分解为专家定义的推理检查，由大型视觉-语言模型(LVLM)对每项检查作二元判断与理由，再按固定加权聚合为标准级评分。在Endoscapes2023上用三种前沿LVLM评测，较最佳基线(直接提示/思维链/子问题分解)平均帧级mAP相对提升12-14%；观察性检查可靠而决策性解剖证据变异较大。

> **要点**：Sum-of-Checks将CVS拆为可核查项，使LVLM评估mAP相对提升12-14%并更可审计。


#### 9. SurgCoT：以思维链基准推进手术视频的时空推理

*SurgCoT: Advancing Spatiotemporal Reasoning in Surgical Videos through a Chain-of-Thought Benchmark*

**arXiv（预印本）** · 2026-04-22 · 基准研究(10个MLLM) · [arXiv 2604.20319](https://arxiv.org/abs/2604.20319)

提出统一基准SurgCoT评测多模态大语言模型(MLLM)在手术视频中的思维链(CoT)推理，覆盖7个外科专科、35种术式，评估因果动作排序、线索-动作对齐、可供性映射、微转变定位、异常起始追踪五个推理维度，采用问题-选项-知识-线索-答案结构化标注。对10个领先MLLM的评测显示：商用模型优于开源与医学专用模型、手术CoT推理存在显著差距、SurgCoT能有效评测并促进渐进时空推理。

> **要点**：SurgCoT基准揭示MLLM手术视频时空推理的显著差距，商用模型领先医学专用模型。


#### 10. SurgΣ：面向手术智能的大规模多模态数据与基础模型谱系

*Surg$Σ$: A Spectrum of Large-Scale Multimodal Data and Foundation Models for Surgical Intelligence*

**arXiv（预印本）** · 2026-03-17 · 数据集与多模态基础模型构建(方法学/资源) · [arXiv 2603.16822](https://arxiv.org/abs/2603.16822)

针对现有手术AI任务专用、跨术式跨机构泛化差的问题，构建SurgΣ多模态数据与基础模型体系。核心Surg-DB整合开源、院内及网络数据为统一schema，覆盖6个临床专科、18类实用手术任务(理解/推理/规划/生成)，含超过5.98M条对话及分层推理标注。基于该库训练的手术基础模型实证表明可提升跨任务泛化与可解释性。

> **要点**：以统一大规模多模态数据支撑通用手术多模态大模型。


#### 11. Surg-R1：可扩展可解释手术决策支持的分层推理基础模型

*Surg-R1: A Hierarchical Reasoning Foundation Model for Scalable and Interpretable Surgical Decision Support with Multi-Center Clinical Validation*

**arXiv（预印本）** · 2026-03-12 · 方法学研究(手术VLM，多中心外部验证) · [arXiv 2603.12430](https://arxiv.org/abs/2603.12430)

提出手术视觉-语言模型Surg-R1，采用感知定位/关系理解/情境推理三级推理层次、迄今最大的32万手术思维链数据集及"监督微调→GRPO→迭代自我改进"四阶段训练。在SurgBench(6个公开基准+来自5机构的6个多中心外部验证集)上，公开基准Arena Score达64.9%，超过Gemini 3.0 Pro(46.1%)与GPT-5.1(37.9%)，外部验证较最强手术基线提升15.2个百分点。

> **要点**：分层推理手术VLM在多任务与外部验证上优于通用与专用模型。


#### 12. SUREON：面向手术推理的基准与视觉-语言模型

*SUREON: A Benchmark and Vision-Language-Model for Surgical Reasoning*

**arXiv（预印本）** · 2026-03-06 · 数据集构建+VLM开发 · [arXiv 2603.06570](https://arxiv.org/abs/2603.06570)

从手术学术视频挖掘专家叙述的意图、理据与预判构建大规模视频问答数据集SUREON，定义12类问题(安全评估、决策理据、预测)，用多智能体流水线从134.7K片段、170种术式生成206.8K问答对及354例专家验证基准。训练SureonVLM(监督微调)与SureonVLM-R1(GRPO推理)两模型，在SUREON基准accuracy超84%，显著优于更大的通用领域模型并在标准手术感知任务上领先。

> **要点**：从手术讲解视频挖掘推理信号训练出优于通用大模型的手术推理VLM。


#### 13. 蒸馏专家外科知识：训练本地手术VLM用于完整结肠系膜切除术的解剖讲解

*Distilling Expert Surgical Knowledge: How to train local surgical VLMs for anatomy explanation in Complete Mesocolic Excision*

**arXiv（预印本）** · 2025-12-05 · 方法学研究（VLM知识蒸馏/微调） · [arXiv 2512.05740](https://arxiv.org/abs/2512.05740)

提出隐私保护框架，用教师LLM（仅凭文本上下文与二值分割掩膜、不接触敏感图像）生成专家监督数据集，经监督微调(SFT)与直接偏好优化(DPO)蒸馏出可本地部署的手术视觉大模型(VLM)，用于完整结肠系膜切除术(CME)中解剖标志识别与讲解。评估显示用所生成数据集微调后VLM相较基座模型的外科领域知识大幅提升。

> **要点**：数据高效且保护隐私地训练本地可部署手术VLM，提升术中解剖场景理解。


#### 14. SurgMLLMBench：面向手术场景理解的多模态大语言模型基准数据集

*SurgMLLMBench: A Multimodal Large Language Model Benchmark Dataset for Surgical Scene Understanding*

**arXiv（预印本）** · 2025-11-26 · 基准数据集/方法学研究（多模态LLM） · [arXiv 2511.21339](https://arxiv.org/abs/2511.21339)

提出统一多模态基准SurgMLLMBench，整合腹腔镜、机器人辅助与显微手术领域的像素级器械分割掩膜与结构化VQA标注（含新采集的显微人工血管吻合MAVIS数据集），支持超越传统VQA的交互式视觉对话评估。大量基线实验显示单一模型在各领域表现一致，并能有效泛化到未见数据集。

> **要点**：统一像素级分割加VQA的多模态基准，推动交互式手术AI推理研究。


#### 15. 用于多模态患者数据控制的语音交互手术智能体

*Voice-Interactive Surgical Agent for Multimodal Patient Data Control*

**arXiv（预印本）** · 2025-11-10 · 方法学研究（LLM多智能体） · [arXiv 2511.07392](https://arxiv.org/abs/2511.07392)

提出基于分层多智能体框架的语音交互手术智能体VISA，由编排智能体与三个LLM驱动的任务智能体组成，自主规划、精炼、校验与推理，以解释语音指令并执行检索临床信息、操作CT、导航手术视频内三维解剖模型等任务。构建240条分层指令数据集并提出多层编排评估指标MOEM，实验显示其阶段级准确率与工作流成功率高，并能纠正转录错误、消解语言歧义、解释多样自由表达。

> **要点**：LLM驱动语音智能体让术者免手操控多模态患者数据、契合机器人手术流程。


#### 16. SurgViVQA：面向手术场景理解的时序接地视频问答

*SurgViVQA: Temporally-Grounded Video Question Answering for Surgical Scene Understanding*

**arXiv（预印本）** · 2025-11-05 · 方法学研究（视频问答/LLM）+数据集 · [arXiv 2511.03325](https://arxiv.org/abs/2511.03325)

提出手术视频问答模型SurgViVQA，用掩码视频-文本编码器融合视频与问题特征以捕捉运动、器械-组织交互等时序线索，再由微调LLM解码答案，并构建含运动类问题与模板外改写问题的结肠镜视频数据集REAL-Colon-VQA。较图像基基准，关键词准确率在REAL-Colon-VQA上较PitVQA提升+11%、在EndoVis18-VQA上+9%，扰动研究证实更强泛化与稳健性。

> **要点**：时序接地的视频-语言问答提升动态手术场景的理解与稳健性。


#### 17. SurgAnt-ViVQA：经GRU驱动时序交叉注意力预判手术事件

*SurgAnt-ViVQA: Learning to Anticipate Surgical Events through GRU-Driven Temporal Cross-Attention*

**arXiv（预印本）** · 2025-11-05 · 方法学研究（视频语言模型/VQA）+数据集 · [arXiv 2511.03178](https://arxiv.org/abs/2511.03178)

面向经鼻蝶垂体手术的前瞻性推理，构建首个前瞻性手术VQA数据集PitVQA-Anticipation（33.5小时手术视频、734,769问答对，涵盖预测未来阶段、下一步、将用器械与剩余时长四任务），并提出用GRU门控时序交叉注意力适配LLM的视频语言模型SurgAnt-ViVQA。其在PitVQA-Anticipation与EndoVis上超越图像与视频基线；消融显示时序循环与门控融合贡献主要增益，8帧最利流畅度、32帧略降BLEU但改善时间数值估计。

> **要点**：时序循环加门控交叉注意力使手术VQA从回溯描述迈向前瞻预判。


#### 18. 何时该信任答案：面向更安全手术VQA的问题对齐语义最近邻熵

*When to Trust the Answer: Question-Aligned Semantic Nearest Neighbor Entropy for Safer Surgical VQA*

**arXiv（预印本）** · 2025-11-03 · 方法学研究（VQA不确定性/安全） · [arXiv 2511.01458](https://arxiv.org/abs/2511.01458)

针对手术VQA不确定性估计忽视条件问题的缺陷，提出问题对齐语义最近邻熵(QA-SNNE)，经双边门控按答案与问题的相关性加权样本间语义相似度（支持嵌入、蕴含、交叉编码器三种对齐策略），并构造仅改问法的模板外改写基准。在两个手术VQA基准、5个模型的零样本与PEFT设置下，模板内AUROC对部分模型提升（如Llama3.2 +15%、Qwen2.5 +21%），模板外改写下最高提升+8%。

> **要点**：将语义不确定性与问题相关性挂钩，为手术VQA提供模型无关的安全护栏。


#### 19. 诊断AI外科决策支持中的幻觉风险：面向脊柱外科的序贯验证框架

*Diagnosing Hallucination Risk in AI Surgical Decision-Support: A Sequential Framework for Sequential Validation*

**arXiv（预印本）** · 2025-11-01 · LLM评测/基准研究(6模型×30例) · [arXiv 2511.00588](https://arxiv.org/abs/2511.00588)

提出以临床医生为中心的框架，从诊断精度、推荐质量、推理稳健性等维度量化LLM幻觉风险，在30例专家验证的脊柱病例上评测6个主流LLM。DeepSeek-R1综合最佳(总分86.03±2.08)；推理增强变体未必更优——Claude-3.7-Sonnet扩展思考模式(80.79±1.83)反低于标准版(81.56±1.92)；复杂度放大时推荐质量下降7.4%，而合理性(+2.0%)、可读性(+1.7%)、诊断(+4.7%)略升，提示表面连贯与可执行指导之间存在背离。

> **要点**：脊柱外科LLM决策支持需安全验证框架，扩展思维链不足以保证临床可靠性。


#### 20. 考察大语言模型的外科胜任力：基于AfriMed-QA基准的全球健康研究

*Probing the Surgical Competence of LLMs: A global health study leveraging AfriMedQA benchmarks*

**medRxiv/bioRxiv（预印本）** · 2025-10-07 · LLM基准评测研究(预印本) · [DOI](https://doi.org/10.1101/2025.10.05.25337350)

在AfriMed-QA基准(20位非洲医学教授编写、覆盖32个专科的3900道专家多选题)评测40余个SOTA大模型，o1、GPT-4o、Claude 3.5等顶级模型平均准确率超82%，但在外科、病理、产科系统性低于内科学科，存在程序推理失败、忽略本地指南与自信错误；较小/生物医学模型幻觉与格式错误更高。凸显LLM在专科决策支持上的不均衡就绪度。

> **要点**：顶级LLM总体>82%但外科等程序性专科表现明显偏弱。


#### 21. 从镜到稿：胃肠内窥镜自动报告生成模型

*From Scope to Script: An Automated Report Generation Model for Gastrointestinal Endoscopy*

**arXiv（预印本）** · 2025-10-03 · 方法学(视觉-语言生成模型) · [arXiv 2510.03543](https://arxiv.org/abs/2510.03543)

提出用于胃肠内窥镜(EGD、结肠镜)的自动报告生成模型，采用基于Transformer的视觉编码器与文本解码器的两阶段训练框架：先在图文对上预训练学习通用视觉-语言特征，再在图像/报告对上微调生成有临床意义的发现，以减轻内镜医师文书负担与倦怠。

> **要点**：两阶段视觉-语言模型自动生成胃肠内镜报告，减轻文书负担。


#### 22. Surgical-MambaLLM：Mamba2增强的多模态大语言模型用于机器人手术VQLA

*Surgical-MambaLLM: Mamba2-enhanced Multimodal Large Language Model for VQLA in Robotic Surgery*

**arXiv（预印本）** · 2025-09-20 · 方法开发研究（多模态LLM） · [arXiv 2509.16618](https://arxiv.org/abs/2509.16618)

面向机器人手术视觉问答定位（Surgical-VQLA），首次将Mamba2与LLM结合，提出跨模态双向Mamba2融合（CBMI）模块实现多模态融合，并设计手术器械感知（SIP）扫描模式增强对手术场景的空间理解。在EndoVis17-VQLA与EndoVis18-VQLA数据集上显著优于现有最优方法（未给出具体数值）。

> **要点**：首个Mamba2+LLM框架，提升机器人手术视觉问答定位的跨模态与空间理解。


#### 23. EyePCR：眼科手术细粒度感知、知识理解与临床推理综合基准

*EyePCR: A Comprehensive Benchmark for Fine-Grained Perception, Knowledge Comprehension and Clinical Reasoning in Ophthalmic Surgery*

**arXiv（预印本）** · 2025-09-19 · 基准构建+模型开发 · [arXiv 2509.15596](https://arxiv.org/abs/2509.15596)

构建大规模眼科手术分析基准EyePCR，评估多模态大语言模型（MLLM）在感知、理解、推理三层认知能力，含超21万条VQA、1048个细粒度属性、超2.5万三元组知识图谱及四项临床推理任务。领域适配变体EyePCR-MLLM（基于Qwen2.5-VL-7B）在感知选择题上准确率最高，理解与推理优于开源模型，媲美GPT-4.1等商业模型。

> **要点**：首个眼科手术MLLM认知基准（21万VQA），领域适配模型媲美GPT-4.1。


#### 24. CardiacGPT：面向心脏外科术中引导与术后决策的实时LLM助手

*CardiacGPT™: A Real-Time AI Assistant for Intraoperative Guidance and Postoperative Decision Support in Cardiac Surgery*

**medRxiv/bioRxiv（预印本）** · 2025-09-04 · 回顾性、盲法多模型评价(可行性) · [DOI](https://doi.org/10.1101/2025.08.30.25334720)

回顾性可行性研究：对500例去标识心脏手术(CABG、瓣膜、联合)将结构化EHR与术中监测、手术记录格式化为提示，分别经GPT-5、Claude 3.5 Opus/Sonnet/Haiku处理，盲法交由外科与ICU医师按5分制评分。2,000次评估中GPT-5与Claude 3.5 Opus平均信任分最高(4.83、4.79)，高信任占比均>98%，评审者间ICC(2,1)=0.91(95%CI 0.88–0.94)。

> **要点**：新一代LLM在心脏外科术中/术后决策支持中获极高临床信任度,但尚需前瞻性结局验证


#### 25. SurgLLM：具空间聚焦与时间感知的多面手手术视频理解大模型

*SurgLLM: A Versatile Large Multimodal Model with Spatial Focus and Temporal Awareness for Surgical Video Understanding*

**arXiv（预印本）** · 2025-08-30 · 方法开发研究（多模态LLM） · [arXiv 2509.00357](https://arxiv.org/abs/2509.00357)

提出面向手术视频理解的多模态大模型SurgLLM：以器械中心的掩码视频重建（MV-Recon）及多模态对齐进行手术情境感知预训练（Surg-Pretrain）增强空间聚焦；以时间感知多模态微调（TM-Tuning）交错多模态嵌入增强时间推理；并用手术任务动态集成为查询分派最优可学习参数。在视频描述、通用VQA与时序VQA等多任务上显著超越现有最优方法。

> **要点**：SurgLLM以空间聚焦+时间感知在描述/VQA/时序VQA多任务超越SOTA。


#### 26. 基于LLM的协作手术机器人自然语言指令歧义检测

*LLM-based ambiguity detection in natural language instructions for collaborative surgical robots*

**arXiv（预印本）** · 2025-07-15 · 方法学/评估(LLM手术指令歧义检测) · [arXiv 2507.11525](https://arxiv.org/abs/2507.11525)

针对安全关键人机交互(尤其外科)中自然语言指令的歧义风险，提出用大语言模型(LLM)检测协作手术场景歧义的框架，采用配置不同提示技术的LLM评估器集成识别语言、上下文、程序与关键歧义并含思维链评估器；个体评估经保形预测综合，基于标注校准集给出非一致性得分。评估Llama 3.2 11B与Gemma 3 12B，区分歧义与非歧义手术指令的分类准确率超过60%。

> **要点**：LLM集成+保形预测在机器人动作前检测手术指令歧义(准确率>60%)


#### 27. SurgVisAgent：面向多样化手术视觉增强的多模态智能体模型

*SurgVisAgent: Multimodal Agentic Model for Versatile Surgical Visual Enhancement*

**arXiv（预印本）** · 2025-07-03 · 方法学研究/多模态大模型智能体(预印本) · [arXiv 2507.02252](https://arxiv.org/abs/2507.02252)

提出基于多模态大语言模型(MLLM)的端到端手术视觉智能体SurgVisAgent，可动态识别内镜图像的失真类别与严重程度，从而执行低光增强、过曝校正、运动模糊消除、去烟雾等多种增强任务；通过领域先验模型、上下文少样本学习与思维链(CoT)推理提供定制化增强。作者构建了模拟真实手术失真的综合基准，实验证明其超越传统单任务模型。

> **要点**：基于MLLM的智能体统一处理多种手术图像增强任务，优于单任务模型。



### （十二）外科教育、培训与模拟（10 篇）

#### 1. 评估外科反馈质量的多智能体LLM框架

*A Multi-Agent LLM Framework for Rating the Quality of Surgical Feedback*

**arXiv（预印本）** · 2026-05-25 · 方法开发+评估（4.2k反馈实例） · [arXiv 2605.25440](https://arxiv.org/abs/2605.25440)

提出两阶段LLM框架，用多智能体提示与外科领域知识注入自动发现少量可解释的反馈质量评分标准(如鼓励性、紧迫性、清晰度)，再以LLM-as-a-judge对术中实时反馈打分。在4.2k条带教反馈实例上，AI发现的标准在预测反馈有效性(受训者行为调整与带教认可)方面优于既有基于内容的框架。

> **要点**：多智能体LLM自动发现可解释标准，规模化评估手术室带教反馈质量，超越内容型方法。


#### 2. SWoMo：白内障手术仿真的神经-符号世界模型

*SWoMo: Neuro-Symbolic World Model for Cataract Surgery Simulation*

**arXiv（预印本）** · 2026-05-15 · 方法开发（世界模型/仿真） · [arXiv 2605.16530](https://arxiv.org/abs/2605.16530)

提出白内障手术仿真的神经-符号世界模型SWoMo，将运动生成与视觉真实感解耦：符号部分(规则模拟器+场景图)建模运动动力学与工具-组织交互，扩散模型生成含纹理与组织形变的真实外观；并用逆配对策略在模拟器中重建真实手术视频获得配对数据训练视频扩散实现sim-to-real。实验在定性定量上均优于既有工作，可泛化到未见交互几何、提升下游阶段检测并支持无监督风格迁移。

> **要点**：神经-符号世界模型解耦运动与外观，生成可泛化的白内障手术仿真，服务训练与自主智能体。


#### 3. 基于虚拟现实的患者特异性脊柱手术仿真：面向外科教育与规划的高保真系统

*Virtual-reality based patient-specific simulation of spine surgical procedures: A fast, highly automated and high-fidelity system for surgical education and planning*

**arXiv（预印本）** · 2026-04-29 · 系统开发+分割/配准验证(n=15)+定性反馈 · [arXiv 2604.26781](https://arxiv.org/abs/2604.26781)

提出基于VR的患者特异性脊柱手术仿真系统，用AI计算机视觉从CT/MRI自动生成三维解剖模型并仿真椎板切除、椎间盘切除、椎间孔切开等脊柱减压操作。分割用Dice系数(DSC)、配准用靶点配准误差(TRE)评估：15例中约2.5分钟/例高效生成，椎骨DSC 0.95±0.03、软组织0.895±0.02，平均TRE 1.73±0.42mm；医生与学员访谈反映空间理解与操作信心提升。

> **要点**：AI驱动VR患者特异性脊柱手术仿真，分割DSC达0.95、TRE 1.73mm，服务教育与术前规划。


#### 4. 自回归深度学习用于虚拟神经外科软组织动力学实时仿真

*Autoregressive deep learning for real-time simulation of soft tissue dynamics during virtual neurosurgery*

**arXiv（预印本）** · 2026-01-20 · 方法学/DL代理模型(仿真) · [arXiv 2601.13676](https://arxiv.org/abs/2601.13676)

提出基于Universal Physics Transformers的深度学习代理模型，直接在大规模网格数据上实时模拟手术器械与虚拟脑组织连续交互引起的瞬态脑变形。引入随机teacher forcing训练策略以抑制自回归误差累积，将最大预测误差从6.7mm降至3.5mm，可扩展至15万节点网格，消费级硬件上每步运行时间<10ms，并集成入交互式神经外科仿真环境。

> **要点**：DL代理模型实现<10ms实时脑变形仿真、误差降至3.5mm，奠定神经外科训练基础。


#### 5. 融合虚拟现实与大语言模型的手术室团队非技术技能训练与评估

*Integrating Virtual Reality and Large Language Models for Team-Based Non-Technical Skills Training and Evaluation in the Operating Room*

**arXiv（预印本）** · 2026-01-19 · 试点研究/系统开发 · [arXiv 2601.13406](https://arxiv.org/abs/2601.13406)

提出多用户VR平台VORTeX，结合沉浸式团队仿真与大语言模型(LLM)分析，训练评估手术室沟通、决策、团队协作与领导力。基于NOTSS框架用结构化提示自动分类行为并生成量化沟通结构的定向交互图。在2024 SAGES会议上12名外科专业人员完成试点，评价其直观、沉浸、有价值；LLM生成的沟通网络符合预期手术层级(外科医生为核心整合者)。

> **要点**：VR+LLM平台VORTeX实现手术团队非技术技能的自动化评估与复盘(12人试点)。


#### 6. 面向高保真感知优化触觉手术仿真的Koopman-贝叶斯框架

*A Koopman-Bayesian Framework for High-Fidelity, Perceptually Optimized Haptic Surgical Simulation*

**arXiv（预印本）** · 2026-01-04 · 方法学/仿真(计算建模) · [arXiv 2602.15834](https://arxiv.org/abs/2602.15834)

提出结合非线性动力学、感知心理物理与高频触觉渲染的统一框架，用Koopman算子将手术器械-软组织交互提升到增广状态空间以实现线性预测控制，并用基于Weber-Fechner与Stevens定律的贝叶斯校准模块按个体辨别阈塑造力信号。在触诊、切开、磨骨等仿真任务中平均渲染延迟4.3ms、力误差<2.8%、感知辨别提升20%，MANOVA与回归分析显示显著优于弹簧-阻尼与能量渲染法。

> **要点**：Koopman-贝叶斯触觉仿真延迟4.3ms、力误差<2.8%、感知提升20%，用于手术训练。


#### 7. 生成自然语言手术反馈：从结构化表示到领域接地评估

*Generating Natural-Language Surgical Feedback: From Structured Representation to Domain-Grounded Evaluation*

**arXiv（预印本）** · 2025-11-19 · 方法学研究（LLM反馈生成） · [arXiv 2511.15159](https://arxiv.org/abs/2511.15159)

提出结构感知流水线，从33台手术真实带教-学员转录中学习器械-动作-目标(IAT)本体并条件化反馈生成：视频到IAT识别任务上上下文注入与时序跟踪带来AUC提升（器械0.67→0.74、动作0.60→0.63、组织0.74→0.79）；用IAT三元组引导GPT-4o生成带教式反馈，1–5保真评分由纯视频2.17提升至2.44(+12.4%)，可接受生成(≥3分)占比由21%翻倍至42%，词错误率降15–31%、ROUGE升9–64%。

> **要点**：显式IAT结构接地可提升GPT-4o生成手术带教反馈的保真度与可审计性。


#### 8. 用AI辅助视觉反馈学习腹腔镜手术空间感知

*Learning Spatial Awareness for Laparoscopic Surgery with AI Assisted Visual Feedback*

**arXiv（预印本）** · 2025-11-04 · 系统/框架研究（AI辅助手术训练） · [arXiv 2511.02233](https://arxiv.org/abs/2511.02233)

针对腹腔镜单目二维视野限制空间感知，提出在NVIDIA Isaac Sim中开发的AI辅助训练框架，将标准二维腹腔镜画面与经混合现实(MR)界面同步呈现的三维视觉反馈耦合。学员用临床二维视图操作时，经验证的AI模块在后台持续定位器械并检测器械-组织交互，检测到空间误判时叠加三维反馈同时保留原始术野视角，覆盖导航、操作、转移、切割、缝合等任务。

> **要点**：AI检测空间误判并触发三维反馈，提升腹腔镜训练的深度与接触感知。


#### 9. 面向交互式神经外科教育与评估的多AI智能体框架：从病例梗概到虚拟对话

*A Multi-AI Agent Framework for Interactive Neurosurgical Education and Evaluation: From Vignettes to Virtual Conversations*

**medRxiv/bioRxiv（预印本）** · 2025-08-24 · 方法学/多智能体LLM教育评估 · [DOI](https://doi.org/10.1101/2025.08.20.25334084)

方法学/教育评估：将608道神经外科自评(SANS)一阶诊断题转为对话式会话，用患者AI、系统AI、临床AI三个专用智能体模拟真实临床交互，评估GPT-4o在传统梗概、纯患者对话、患者+系统AI三种形式下的诊断准确率，并以10名神经外科住院医作人类基准。GPT-4o从传统选择题89.0%显著降至对话形式60.9%。

> **要点**：对话形式使GPT-4o诊断准确率大幅下降,提示传统选择题高估LLM临床推理,该框架兼具严格评估与神经外科教学价值


#### 10. 用于外科技能习得的可解释AI个性化反馈

*Explainable AI for Automated User-specific Feedback in Surgical Skill Acquisition*

**arXiv（预印本）** · 2025-08-04 · 前瞻性人机对照用户研究(外科教育) · [arXiv 2508.02593](https://arxiv.org/abs/2508.02593)

通过基于仿真的训练框架，用可解释AI(XAI)分析视频提取与基本动作相关的手术技能代理，将学员表现与专家基准比较并高亮偏差以给出自动化个性化反馈。在医学生前瞻性用户研究中比较XAI引导反馈与传统视频教学对任务结局、认知负荷与感知的影响，结果显示干预后认知负荷与信心改善；两种反馈在缩小表现差距上无显著差异，但XAI组呈现更接近专家实践的趋势。

> **要点**：XAI个性化反馈改善外科技能训练的认知负荷与信心



### （十三）治理、监管、伦理与评价/基准方法（16 篇）

#### 1. 手术室质量保证的人工智能

*AI for Quality Assurance in the Operating Room*

**arXiv（预印本）** · 2026-06-16 · 综述/书章(无数据) · [arXiv 2606.30657](https://arxiv.org/abs/2606.30657)

该文为综述性书章，提出'AI赋能的手术质量保证'框架，主张利用手术数据支持手术室内持续评估与改进。回顾从系统级到术式特定的手术安全方法，阐述AI如何将术中视频转化为临床有意义信息(解剖、器械、workflow、动作、质量标准、不良事件、关键时刻识别)，并讨论落地前需解决的数据代表性、验证、workflow整合、监管、责任、隐私与公平获取等挑战。无实验数据。

> **要点**：AI应作为增强外科团队、放大专家评审的工具，推动手术走向学习型系统。


#### 2. 手术AI比较研究：数据、算力与扩展的潜力和局限

*A Comparative Study in Surgical AI: Potential and Limitations of Data, Compute, and Scaling*

**arXiv（预印本）** · 2026-03-28 · 实证比较/评述研究(手术AI评价) · [arXiv 2603.27341](https://arxiv.org/abs/2603.27341)

以神经外科手术工具检测为案例，评估2026年SOTA AI方法。发现即使数十亿参数模型与大量训练，当前视觉-语言模型在看似简单的工具检测上仍表现不足；扩展模型规模与训练时间仅带来边际收益，且部分障碍无法靠算力扩展消除、跨架构持续存在，提示数据/标注可用性并非唯一限制。讨论主要制约因素与潜在解决路径。

> **要点**：单纯扩展规模/算力难以攻克手术工具检测，当前手术AI存在结构性障碍。


#### 3. 影像引导神经外科脑变形数据驱动配准与建模：系统综述

*Data-Driven Registration and Modeling of Brain Deformation for Image-Guided Neurosurgery: A Systematic Review*

**arXiv（预印本）** · 2026-02-09 · 系统综述 · [arXiv 2602.10155](https://arxiv.org/abs/2602.10155)

系统综述2020-2025年脑变形配准与建模的数据驱动方法，检索PubMed、IEEE Xplore、Scopus、Web of Science，纳入46项研究，统一分析深度学习配准、形变场回归、合成驱动多模态对齐、切除感知架构与生物力学混合模型等策略及数据集、评价指标与验证协议。指出当前方法在分布外鲁棒性、标准化基准、可解释性与临床落地方面仍受限。

> **要点**：学习型脑变形配准精度可观但仍缺标准化基准与临床就绪性。


#### 4. 择期脊柱手术住院时长的预测建模：十年系统综述

*What Drives Length of Stay After Elective Spine Surgery? Insights from a Decade of Predictive Modeling*

**arXiv（预印本）** · 2026-01-24 · 系统综述(PRISMA) · [arXiv 2602.02517](https://arxiv.org/abs/2602.02517)

遵循PRISMA系统综述择期脊柱手术住院时长(LOS)的计算预测方法，检索PubMed、Google Scholar、ACM数字图书馆（2015.12-2024.12），从1,263篇筛出29项。机器学习模型持续优于传统统计模型，AUC介于0.94-0.99，KNN与朴素贝叶斯在部分研究中表现最佳；常见预测因子含年龄、合并症（高血压、糖尿病）、BMI、手术类型与时长、脊柱节段数，但外部验证与报告规范差异大。

> **要点**：ML预测脊柱手术住院时长AUC达0.94-0.99但缺标准化与外部验证。


#### 5. SurgGoal：以目标可满足性重思手术规划评估

*SurgGoal: Rethinking Surgical Planning Evaluation via Goal-Satisfiability*

**arXiv（预印本）** · 2026-01-15 · 基准/元评估方法 · [arXiv 2601.10455](https://arxiv.org/abs/2601.10455)

针对视觉-语言模型(VLM)在安全攸关的手术规划评估问题，提出以阶段-目标可满足性定义规划正确性(由专家手术规则判定)，并构建含有效术式变体与含顺序/内容错误的无效计划的多中心元评估基准。研究表明序列相似度指标会系统性误判(惩罚有效计划、漏检无效计划)，据此采用基于规则的目标可满足性作为高精度参考评估Video-LLM，揭示其感知错误与欠约束推理导致的失败。

> **要点**：SurgGoal揭示序列相似度误判手术规划，提出目标可满足性作为VLM评估基准。


#### 6. 不止分割：在机器人手术中对SAM 3的分割、3D感知与重建基准评测

*More than Segmentation: Benchmarking SAM 3 for Segmentation, 3D Perception, and Reconstruction in Robotic Surgery*

**arXiv（预印本）** · 2025-12-08 · 实证基准评估 · [arXiv 2512.07596](https://arxiv.org/abs/2512.07596)

实证评测SAM 3与SAM 3D在机器人辅助手术中的表现，基准包括点/框/语言提示的零样本分割、动态视频跟踪、以及SAM 3D的深度重建。在MICCAI EndoVis 2017/2018上SAM 3的图像与视频空间提示分割明显优于SAM/SAM 2；在SCARED、StereoMIS、EndoNeRF上SAM 3D展现强单目深度与逼真3D器械重建，但语言提示在手术域仍欠佳、复杂高动态场景仍有局限。

> **要点**：SAM 3空间提示分割优于SAM/SAM 2，但语言提示在手术域仍需领域训练。


#### 7. NeuroABench：神经外科解剖识别的多模态评估基准

*NeuroABench: A Multimodal Evaluation Benchmark for Neurosurgical Anatomy Identification*

**arXiv（预印本）** · 2025-12-07 · 基准评估 · [arXiv 2512.06921](https://arxiv.org/abs/2512.06921)

提出首个评估多模态大语言模型(MLLM)神经外科解剖理解的基准NeuroABench，含9小时标注神经外科视频、覆盖89种术式、评估68种临床解剖结构。对10余个SOTA MLLM的实验显示最佳模型解剖识别准确率仅40.87%；与4名神经外科学员对比中，最佳学员56%、最低28%、平均46.5%，最佳MLLM仅与最低分学员相当，仍显著落后于学员平均水平。

> **要点**：NeuroABench显示最佳MLLM神经外科解剖识别仅40.87%，落后于学员平均46.5%。


#### 8. 外科医生离手术世界模型还有多远？零样本手术视频生成的专家评估试点

*How Far Are Surgeons from Surgical World Models? A Pilot Study on Zero-shot Surgical Video Generation with Expert Assessment*

**arXiv（预印本）** · 2025-11-03 · 基准/专家评估研究（生成式AI评价） · [arXiv 2511.01775](https://arxiv.org/abs/2511.01775)

提出首个由专家策划的手术视频生成评估基准SurgVeo与四层手术合理性金字塔(SPP)，令先进Veo-3模型对腹腔镜与神经外科片段做零样本预测，由四位委员会认证外科医生按SPP评估。结果揭示明显合理性鸿沟：Veo-3视觉感知合理性优异，但在器械操作、环境反馈与手术意图合理性等高层严重失败，为发展具因果理解的手术世界模型指路。

> **要点**：手术视频生成模型视觉逼真却缺乏因果理解，为手术世界模型研发提供基准与路线图。


#### 9. 手术数字孪生综述

*A Comprehensive Survey on Surgical Digital Twin*

**arXiv（预印本）** · 2025-10-28 · 综述(survey) · [arXiv 2512.00019](https://arxiv.org/abs/2512.00019)

系统性综述手术数字孪生(SDT)，厘清术语与范围，按用途、模型保真度与数据源提出分类法，综合可变形配准与跟踪、实时仿真与协同仿真、AR/VR引导、边云协同、面向场景理解与预测的AI等进展，并对比非机器人孪生与机器人在环架构。指出验证与基准、安全保障与人因、生命周期数字线程集成、可扩展数据治理等开放问题，提出面向可信、合规SDT的研究议程。

> **要点**：全面梳理手术数字孪生的能力版图与走向临床的关键缺口。


#### 10. 术中代谢组学引导的儿童脑肿瘤精准手术：多模态分子影像与AI整合的系统综述

*Intraoperative Metabolomic-Guided Precision Surgery for Pediatric Brain Tumors: A Systematic Review of Multi-Modal Molecular Imaging Platforms and Artificial Intelligence Integration*

**medRxiv/bioRxiv（预印本）** · 2025-10-03 · 系统综述 · [DOI](https://doi.org/10.1101/2025.09.26.25336769)

系统综述：检索PubMed/Scopus/Web of Science/Embase(2010–2025)，2,847篇中75篇入选。儿童术中影像以MRI为主(21项)，代谢组学方法有限(16项)，质谱实时组织表征多见于成人；AI在15项研究中改善了儿童脑肿瘤分割与结局预测。指出四大缺口：缺儿童代谢组数据库、缺实时平台、神经发育整合不足、无多模态标准协议。

> **要点**：儿童脑肿瘤术中分子影像与AI整合尚处早期,亟需儿童专属平台与标准化协议


#### 11. 解码手术场景：手术中场景图的范围综述

*Decoding the Surgical Scene: A Scoping Review of Scene Graphs in Surgery*

**arXiv（预印本）** · 2025-09-25 · 范围综述(PRISMA-ScR，52项研究) · [arXiv 2509.20941](https://arxiv.org/abs/2509.20941)

遵循PRISMA-ScR的范围综述，系统梳理52项手术场景图(SG)研究。发现快速增长但存在数据鸿沟：内视视角研究(如内窥镜视频三元组识别)占81%且几乎全用真实2D视频，而外视手术室建模高度依赖仿真数据；方法上从图神经网络明显转向专用基础模型与生成式AI(2025年约占50%)；提出SG正演变为防止自主手术基础模型幻觉的神经符号护栏。指出无一项研究进入前瞻临床验证，提出验证三位一体评估框架。

> **要点**：首个手术场景图范围综述，指出其作为自主手术AI神经符号护栏的潜力与临床验证鸿沟。


#### 12. SAGES关键安全视野（CVS）挑战赛：AI辅助手术质量评估的全球基准

*The SAGES Critical View of Safety Challenge: A Global Benchmark for AI-Assisted Surgical Quality Assessment*

**arXiv（预印本）** · 2025-09-21 · 国际挑战赛/基准研究 · [arXiv 2509.17100](https://arxiv.org/abs/2509.17100)

首个由外科学会（SAGES）组织的AI竞赛，以腹腔镜胆囊切除术的关键安全视野（CVS）为例做手术质量评估。全球54家机构、24个国家协作，20名外科专家按共识协议标注1,000段视频，配套开发EndoGlacier多标注者工作流框架。13支国际团队参赛，评估性能相对提升最高17%、校准误差降低超80%、鲁棒性相对改善17%。

> **要点**：首个外科学会主办的AI质量评估挑战赛，建立CVS评估全球基准，性能相对提升达17%。


#### 13. 人工智能在癫痫MRI中的应用：系统综述与荟萃分析

*The Use of Artificial Intelligence In Magnetic Resonance Imaging of Epilepsy: A Systematic Review and Meta-Analysis*

**medRxiv/bioRxiv（预印本）** · 2025-09-20 · 系统综述与荟萃分析 · [DOI](https://doi.org/10.1101/2025.09.19.677393)

系统综述与荟萃分析(检索至2025.1.1)：纳入158项定性、127项荟萃研究。AI/ML在多模态MRI上区分癫痫与健康对照总体准确率88%[85–90]、颞叶癫痫定侧90%[87–93]、致痫灶定位82%[74–88]、预测术后无发作83%[78–87]；但PROBAST示受试者(64–87%)、预测因子(88–100%)、分析(83–100%)偏倚高。

> **要点**：AI/ML对癫痫诊断与术后预后准确率可观,但普遍高偏倚限制临床转化


#### 14. 基于深度学习的内镜深度估计：综述

*Endoscopic Depth Estimation Based on Deep Learning: A Survey*

**arXiv（预印本）** · 2025-07-28 · 综述/文献回顾(无实验数值) · [arXiv 2507.20881](https://arxiv.org/abs/2507.20881)

内镜深度估计是提升微创手术安全与精度的关键技术。本文系统综述近年基于深度学习的方法，从数据(公开数据集获取)、方法(单目与立体深度学习方法)、应用(具体临床场景下的挑战与解决方案)三个视角展开，并展望域适应、实时实现与深度信息与传感器融合等未来方向，为该领域临床转化提供起点。

> **要点**：系统综述深度学习内镜深度估计的数据、方法与临床应用


#### 15. 针对外科决策支持视觉-语言模型的提示注入攻击

*Prompt injection attacks on vision-language models for surgical decision support*

**medRxiv（预印本）** · 2025-07-23 · 观察性模型安全评估(预印本) · [DOI](https://doi.org/10.1101/2025.07.16.25331645)

系统评估四个视频视觉-语言模型(Gemini 1.5 Pro、Gemini 2.5 Pro、GPT-o4-mini-high、Qwen 2.5-VL)在11项外科决策支持任务(出血、异物、图像失真、安全关键视野、技能评估等)对文本与视觉提示注入的脆弱性。基线Gemini 2.5 Pro平均准确率最高0.82；文本与时变视觉注入均降低各模型准确率，持续性视觉注入危害更大；GPT-o4-mini-high最脆弱，全时长视觉注入使其准确率从0.67降至0.24。

> **要点**：视频VLM对提示注入高度脆弱，外科实时决策部署前需专门防护。


#### 16. 手术中的人机协作：迈向自主手术助手的进展与挑战

*Human-Robot collaboration in surgery: Advances and challenges towards autonomous surgical assistants*

**arXiv（预印本）** · 2025-07-15 · 系统综述(PRISMA,32项研究) · [arXiv 2507.11460](https://arxiv.org/abs/2507.11460)

该系统综述遵循PRISMA指南，在IEEE Xplore、Scopus与Web of Science检索，最终纳入32项研究，考察自主手术机器人助手(ASAR)在为外科医生提供有意义主动支持场景中的进展与挑战。识别出遥操作辅助与直接手动交互两类协作设置，发现研究以内镜引导应用为主并在自主工具操作上新兴进展，并指出机器人动作与外科医生偏好对齐、程序感知、无缝信息交换与共享工作空间技能习得等关键挑战。

> **要点**：系统综述自主手术机器人助手的进展与关键挑战



### （十四）模型开发与技术方法（外科语境）（33 篇）

#### 1. GEN-Guard：修正可部署联邦手术AI的泛化失效

*GEN-Guard: Correcting Generalization Failures for Deployable Federated Surgical AI*

**arXiv（预印本）** · 2026-06-18 · 方法开发+两多中心数据集评测 · [arXiv 2606.20303](https://arxiv.org/abs/2606.20303)

指出联邦学习(FL)按参与医院验证集选'最佳'全局模型会导致性能泄漏(过拟合内部联邦数据、对未见机构泛化差)。提出后处理框架GEN-Guard：以客户端阻断评估(CBE)检测泛化失效、以分歧感知蒸馏(DAD)做跨机构校正。在腹腔镜胆囊切除phase识别与结肠镜息肉分割两个多中心挑战上，标准评估下模型选择失败率(MSF)超80%，GEN-Guard将联邦内F1提升最多2分、未见机构最多3分、最差机构3–9分。

> **要点**：检测并纠正性能泄漏，提升联邦手术AI的跨机构可部署可靠性。


#### 2. 面向内窥镜视频的高斯过程先验变分自编码器

*Gaussian Process Prior Variational Autoencoder for Endoscopic Videos*

**arXiv（预印本）** · 2026-06-18 · 方法开发+C3VDv2评测 · [arXiv 2606.19908](https://arxiv.org/abs/2606.19908)

针对内窥镜视频受镜面反射、运动伪影与丢帧退化影响下游三维重建与导航的问题，提出GPVAE框架，用时序高斯过程先验替代标准分解隐先验以实现丢帧插值与不确定性感知重建，结合EndoVAE与GastroNet-5M预训练ViT编码器及两种可扩展GP近似。在C3VDv2结肠镜数据上图像重建RMSE平均降低21.9%(最高26.1%)、下游轨迹RMSE平均降12.7%，代价为每epoch训练时间增约27.3%，并提供逐帧不确定性置信信号。

> **要点**：高斯过程先验VAE提升内窥镜视频恢复质量并改善下游导航。


#### 3. SCARED-C：面向内窥镜深度估计的相机位姿修正数据集

*SCARED-C: Corrected Camera Poses for Endoscopic Depth Estimation*

**arXiv（预印本）** · 2026-05-15 · 数据集修正/构建 · [arXiv 2605.16628](https://arxiv.org/abs/2605.16628)

针对广泛使用的SCARED内窥镜深度估计基准中非关键帧依赖机器人运动学导致位姿误差、可靠标注仅35个关键帧的问题，提出修正版SCARED-C：用COLMAP(SfM)重估所有帧位姿并借关键帧真值深度做尺度恢复对齐到度量空间，将可靠RGB-D对从35扩展到17,135。经立体视差与单目深度实验验证，数据与代码公开。

> **要点**：SCARED-C用SfM重估位姿将可靠RGB-D对由35增至17,135，改善内窥镜深度估计基准。


#### 4. 可信的内镜图像超分辨率：定位不可靠重建区域

*Trustworthy Endoscopic Super-Resolution*

**arXiv（预印本）** · 2026-04-20 · 方法学研究(可信AI/保形预测) · [arXiv 2604.18001](https://arxiv.org/abs/2604.18001)

针对超分辨率(SR)在微创/机器人手术视频中可能引入幻觉结构与放大噪声的安全隐患，提出模型无关框架：用轻量误差预测网络在中间表示上估计逐像素重建误差，并基于保形风险控制构建保形失败掩膜(CFM)定位不可信区域，提供误差上限与漏检率的理论保证。在图像与视频SR上验证，可实时检测内镜与机器人手术场景中不可靠的SR重建。

> **要点**：首个模型无关、有理论保证的内镜SR安全性框架，实时定位不可信重建区域。


#### 5. 透过烟雾：改善视觉感知的手术去烟雾

*Seeing Through Smoke: Surgical Desmoking for Improved Visual Perception*

**arXiv（预印本）** · 2026-03-26 · 方法学研究(图像复原) · [arXiv 2603.25867](https://arxiv.org/abs/2603.25867)

电灼/封闭器械产生的手术烟雾严重降低内镜视觉。提出基于Transformer的去烟雾模型(物理启发去烟雾头，联合预测无烟图像与烟雾图)，用合成流水线生成8万+配对样本训练，并整理迄今最大的达芬奇机器人真实配对烟雾数据集(5,817对)。在公开基准与自建数据集上图像重建达SOTA，并评估对下游立体深度估计与器械分割的影响。

> **要点**：Transformer去烟雾在真实达芬奇数据上达SOTA，并利于下游深度/分割。


#### 6. PhySe-RPO：物理与语义引导相对策略优化的扩散手术去烟雾

*PhySe-RPO: Physics and Semantics Guided Relative Policy Optimization for Diffusion-Based Surgical Smoke Removal*

**arXiv（预印本）** · 2026-03-24 · 方法学研究(扩散+强化学习图像复原) · [arXiv 2603.22844](https://arxiv.org/abs/2603.22844)

针对去烟雾依赖稀缺配对监督且确定性复原难以强化探索，提出扩散复原框架PhySe-RPO，经物理与语义引导的相对策略优化把确定性复原转为随机策略，实现轨迹级探索与无critic的组相对更新;物理引导奖励约束光照/色彩一致性，基于CLIP手术概念的语义奖励促进无烟且解剖连贯的复原，结合无参考感知约束。在合成与真实机器人手术数据上产生物理一致、语义忠实、临床可解释的结果。

> **要点**：物理/语义引导的策略优化实现有限配对下稳健的扩散式手术去烟雾。


#### 7. Chain-of-Adaptation：基于强化学习的手术视觉-语言适配

*Chain-of-Adaptation: Surgical Vision-Language Adaptation with Reinforcement Learning*

**arXiv（预印本）** · 2026-03-20 · 方法学研究(VLM适配/RL) · [arXiv 2603.20116](https://arxiv.org/abs/2603.20116)

针对领域微调易改变预训练多模态先验致泛化下降，提出适配框架Chain-of-Adaptation(CoA):经强化学习引入结构化推理格式，在整合领域知识的同时保持模型固有推理与感知能力。在标准手术基准的分布内与分布外设置下，CoA较有监督微调取得更高准确率、更强泛化与更稳定行为;消融证实其有效保留核心视觉-语言能力。

> **要点**：强化学习结构化推理适配在整合手术领域知识时保留VLM泛化与核心能力。


#### 8. SAW：面向可控可扩展视频生成的手术动作世界模型

*SAW: Toward a Surgical Action World Model via Controllable and Scalable Video Generation*

**arXiv（预印本）** · 2026-03-13 · 方法学研究(生成式视频扩散模型) · [arXiv 2603.13024](https://arxiv.org/abs/2603.13024)

提出手术动作世界模型SAW，基于视频扩散、以四个轻量信号(语言提示、参考手术场景、组织可供性掩码、2D工具尖端轨迹)条件化生成手术动作视频，并用深度一致性损失保证几何合理而无需推理时深度。在12,044个腹腔镜片段上微调，达到SOTA时序一致性(CD-FVD 199.19 vs 546.82)；下游用生成视频增强罕见动作使夹闭动作识别F1从20.93%升至43.14%、切割从0.00%升至8.33%。

> **要点**：可控手术动作视频生成缓解数据稀缺并提升罕见动作识别。


#### 9. SurgCUT3R：手术场景感知的时序3D表示连续理解

*SurgCUT3R: Surgical Scene-Aware Continuous Understanding of Temporal 3D Representation*

**arXiv（预印本）** · 2026-03-07 · 方法学研究(公开数据集) · [arXiv 2603.06971](https://arxiv.org/abs/2603.06971)

针对单目内镜视频3D重建缺乏监督数据、长序列性能退化的问题，提出SurgCUT3R框架：用公开立体手术数据生成大规模度量尺度伪深度弥补数据缺口，采用伪真值+几何自校正混合监督增强鲁棒，并用全局稳定与局部精确两个专用模型的分层推理缓解长视频位姿漂移。在SCARED与StereoMIS上取得精度与效率平衡，位姿估计接近SOTA且显著更快。

> **要点**：领域自适应的分层3D重建为手术场景提供鲁棒高效的位姿估计。


#### 10. SurgSync：手术机器人的时间同步多模态数据采集框架与数据集

*SurgSync: Time-Synchronized Multi-Modal Data Collection Framework and Dataset for Surgical Robotics*

**arXiv（预印本）** · 2026-03-06 · 系统/数据集开发与用户研究 · [arXiv 2603.06919](https://arxiv.org/abs/2603.06919)

面向手术机器人自主化所需的大规模训练数据，提出SurgSync多模态采集框架(基于dVRK)：含在线/离线双模同步记录器、现代立体内镜及侧视相机与新型电容接触传感器提供接触真值，并配后处理工具箱(深度、光流、高斯热图运动学重投影)。通过不同熟练水平参与者对离体组织的用户研究，获得214个跨多种规范训练任务的有效实例，并用技能评估网络演示数据用途。

> **要点**：时间同步多模态采集框架为手术机器人自主化提供带接触真值的训练数据。


#### 11. 面向微创手术的置信度感知单目深度估计

*Confidence-aware Monocular Depth Estimation for Minimally Invasive Surgery*

**arXiv（预印本）** · 2026-03-03 · 方法学研究(内外部数据集验证) · [arXiv 2603.03571](https://arxiv.org/abs/2603.03571)

针对微创手术(MIS)内镜视频受烟雾、镜面反射、模糊与遮挡污染、且现有单目深度估计(MDE)不输出置信度的问题，提出置信度感知框架：用微调立体匹配集成捕获视差方差为像素级置信度、以置信度感知损失使可靠像素主导训练、并加两层卷积置信估计头在推理时输出逐像素置信。内外部数据集验证提升深度精度，内部临床内镜集(StereoKP)较基线密集深度精度提升约8%。

> **要点**：置信度感知框架提升微创手术单目深度估计精度与临床可靠性。


#### 12. 面向非刚性腹腔手术场景4D重建的Dresden数据集

*The Dresden Dataset for 4D Reconstruction of Non-Rigid Abdominal Surgical Scenes*

**arXiv（预印本）** · 2026-03-03 · 数据集/基准构建 · [arXiv 2603.02985](https://arxiv.org/abs/2603.02985)

提出D4D数据集，为形变腹腔软组织3D重建提供配对内镜视频与高质量结构光几何：用da Vinci Xi立体内镜与Zivid结构光相机从6次猪尸体采集，经光学追踪与人工迭代对齐配准，含整体/增量形变与移动相机三类序列。数据集含逾300,000帧、369个点云、98段整理录像，提供矫正立体图、器械掩码、立体深度与相机位姿，可作非刚性SLAM/4D重建/深度估计基准。

> **要点**：提供结构光真值的腹腔非刚性4D重建基准数据集。


#### 13. GroundedSurg：语言条件手术器械分割的多术式基准

*GroundedSurg: A Multi-Procedure Benchmark for Language-Conditioned Surgical Tool Segmentation*

**arXiv（预印本）** · 2026-03-01 · 基准/数据集构建与VLM评估 · [arXiv 2603.01108](https://arxiv.org/abs/2603.01108)

针对现有手术器械基准仅评估类别级分割、无法解析基于功能角色/空间关系/解剖交互的特定器械实例引用的问题，提出首个语言条件、实例级手术接地基准GroundedSurg：每个实例配自然语言描述与含边界框、点级锚点的结构化空间接地标注，覆盖眼科、腹腔镜、机器人与开放手术。联合评估语言引用消解与像素级定位，实验显示现代分割模型与VLM存在显著性能差距。

> **要点**：首个语言条件实例级手术器械接地基准，揭示VLM显著性能差距。


#### 14. 机器人手术器械分割的合成数据集生成与验证

*Synthetic Dataset Generation and Validation for Robotic Surgery Instrument Segmentation*

**arXiv（预印本）** · 2026-02-14 · 方法学研究（合成数据生成与验证） · [arXiv 2602.13844](https://arxiv.org/abs/2602.13844)

提出用于机器人手术器械分割的合成数据集生成与验证工作流，通过Autodesk Maya中全自动Python流水线对da Vinci机械臂三维重建进行动画渲染，生成含随机运动、光照变化与合成血液纹理及像素级真值掩膜的照片级标注视频。实验表明真实与合成数据均衡配比显著提升模型泛化，而过度依赖合成数据会引入可测量的域偏移。

> **要点**：真实-合成数据均衡配比最优提升手术器械分割的泛化能力。


#### 15. MiDAS：机器人辅助微创手术的多模态数据采集系统与数据集

*MiDAS: A Multimodal Data Acquisition System and Dataset for Robot-Assisted Minimally Invasive Surgery*

**arXiv（预印本）** · 2026-02-12 · 系统与数据集研究（多模态数据采集） · [arXiv 2602.12407](https://arxiv.org/abs/2602.12407)

提出开源、平台无关的MiDAS系统，无需专有机器人接口即可跨手术机器人平台进行时间同步的多模态数据采集，集成电磁与RGB-D手部跟踪、脚踏传感与手术视频。在开源Raven-II与临床da Vinci Xi上采集peg transfer与疝修补缝合数据；外部手/脚感知信号接近内部机器人运动学，手势识别性能与专有遥测相当。

> **要点**：非侵入式外部传感即可替代专有机器人遥测用于手术手势识别。


#### 16. 深度在手术视觉基础模型中的作用：RGB-D预训练的实证研究

*On the Role of Depth in Surgical Vision Foundation Models: An Empirical Study of RGB-D Pre-training*

**arXiv（预印本）** · 2026-01-26 · 实证研究（手术视觉基础模型预训练） · [arXiv 2601.18929](https://arxiv.org/abs/2601.18929)

大规模实证比较8个ViT类视觉基础模型在预训练域、学习目标与输入模态(RGB vs RGB-D)上的差异，用140万张配深度图的机器人手术图像预训练，并在8个手术数据集的检测、分割、深度、位姿任务上冻结与端到端微调评估。发现含显式几何标记化的模型(如MultiMAE)全面超越单模态基线，仅用25%标注即可超过用全量数据训练的纯RGB模型，且推理时无需改动。

> **要点**：几何感知的RGB-D预训练大幅提升手术视觉模型的数据效率。


#### 17. SAGS：用于动态手术内窥镜重建的自适应无混叠高斯溅射

*SAGS: Self-Adaptive Alias-Free Gaussian Splatting for Dynamic Surgical Endoscopic Reconstruction*

**arXiv（预印本）** · 2025-10-31 · 方法学(深度学习/3D重建) · [arXiv 2510.27318](https://arxiv.org/abs/2510.27318)

针对3D高斯溅射(3DGS)重建可变形内窥镜组织时的混叠与伪影问题，提出SAGS框架，引入注意力驱动的动态加权4D形变解码器，并结合3D平滑滤波与2D Mip滤波抑制伪影、更好捕获组织运动细节。在EndoNeRF与SCARED两个公开基准上，PSNR、SSIM、LPIPS所有指标均优于当前最优方法且可视化质量更好。

> **要点**：自适应无混叠高斯溅射提升动态手术组织重建质量与可视化。


#### 18. EndoWave：用于内窥镜重建的有理小波4D高斯溅射

*EndoWave: Rational-Wavelet 4D Gaussian Splatting for Endoscopic Reconstruction*

**arXiv（预印本）** · 2025-10-27 · 方法学(深度学习/3D重建) · [arXiv 2510.23087](https://arxiv.org/abs/2510.23087)

针对内窥镜场景光度不一致、非刚性组织运动与视角相关高光等挑战，提出EndoWave统一时空高斯溅射框架，引入基于光流的几何约束以增强时序一致性、多分辨率有理正交小波监督以分离细节。在EndoNeRF与StereoMIS两个真实手术数据集上，重建质量与视觉精度达到当前最优。

> **要点**：光流几何约束+有理小波监督提升内窥镜动态重建质量。


#### 19. EndoSfM3D：用自监督基础模型重建任意内窥镜手术场景的3D

*EndoSfM3D: Learning to 3D Reconstruct Any Endoscopic Surgery Scene using Self-supervised Foundation Model*

**arXiv（预印本）** · 2025-10-25 · 方法学(自监督深度学习) · [arXiv 2510.22359](https://arxiv.org/abs/2510.22359)

将内参估计整合进自监督单目深度估计框架，改造Depth Anything V2(DA2)做深度、位姿与内参联合预测，引入基于注意力的位姿网络与权重分解低秩适配(DoRA)高效微调，以适应免标定、连续变焦的真实术中场景。在SCARED与C3VD公开数据集上，自监督单目深度估计与3D重建性能优于近期最优方法。

> **要点**：联合估计内参的自监督内窥镜3D重建，适应免标定的真实术中场景。


#### 20. 癫痫发作嵌入图：用时空Transformer按发作期颅内EEG特征大规模比较患者

*The Seizure Embedding Map: A Spatio-Temporal Transformer for Comparing Patients by Ictal Intracranial EEG Features at Scale*

**medRxiv/bioRxiv（预印本）** · 2025-10-17 · 方法学/时空Transformer表示学习 · [DOI](https://doi.org/10.1101/2025.10.15.25338097)

方法学研究：设计时空Transformer，以卷积层token化多通道颅内EEG并用时空位置编码学习通道与植入解剖区域关系，提取发作起始特征。应用于102例耐药癫痫患者882次临床发作，无监督聚类得74个跨患者簇，10折交叉验证多分类逻辑回归验证准确率0.8159；时间更近的发作嵌入更相似。聚类未能按疗法/术后结局分层，但与起始解剖区显著相关。

> **要点**：iEEG发作时空嵌入可跨患者定量比较发作起始模式,为癫痫手术决策奠定量化基础


#### 21. 半脑生长作为全脑生长的生物标志物(基于AI分割)

*Hemi-brain growth as a biomarker for whole brain growth*

**medRxiv/bioRxiv（预印本）** · 2025-10-02 · 方法学/AI分割流水线(前瞻性试验数据) · [DOI](https://doi.org/10.1101/2025.09.28.25336850)

方法学/前瞻性试验数据：纳入ESTHI试验75例脑积水(分流或ETV)患儿术前/术后T2 MRI，针对金属分流伪影提出用无伪影半球的半脑生长曲线评估术后脑生长，并开发含脑/CSF分割模型与半脑掩膜生成器的自动AI流水线。术后半球体积比趋于正常并随时间稳定，AI流水线高精度生成半脑掩膜并完成分割。

> **要点**：AI半脑分割可在金属分流伪影下自动评估脑积水术后脑生长


#### 22. 面向应用对齐的合成手术图像生成（SAADi）

*Towards Application Aligned Synthetic Surgical Image Synthesis*

**arXiv（预印本）** · 2025-09-23 · 方法开发研究（扩散模型对齐） · [arXiv 2509.18796](https://arxiv.org/abs/2509.18796)

针对扩散模型合成手术图像时的数据记忆与样本非多样问题，提出Surgical Application-Aligned Diffusion（SAADi），构造「偏好/非偏好」合成图像对并对扩散模型轻量微调，使图像生成与下游目标显式对齐。在三个手术数据集上分类任务提升7–9%、分割任务提升2–10%，对代表性不足类别改善尤为显著，样本迭代优化进一步带来4–10%提升。

> **要点**：任务感知的扩散模型对齐缓解手术数据稀缺，分类/分割分别提升7–9%/2–10%。


#### 23. 内窥镜图像的零样本单目度量深度估计（含EndoSynth数据集）

*Zero-shot Monocular Metric Depth for Endoscopic Images*

**arXiv（预印本）** · 2025-09-23 · 基准评测+数据集构建 · [arXiv 2509.18642](https://arxiv.org/abs/2509.18642)

对最新（度量与相对）单目深度估计模型在真实未见内窥镜图像上做系统基准评测，考察其临床泛化性；并发布新合成数据集EndoSynth（内窥镜手术器械配对真值度量深度与分割掩膜）以弥合合成与真实数据鸿沟。实验表明用EndoSynth微调深度基础模型可显著提升多数未见真实数据上的精度（未给出具体数值）。

> **要点**：提供内窥镜深度估计基准与EndoSynth合成数据集，微调显著提升真实数据精度。


#### 24. 损失函数与可学习维纳滤波对腹腔镜图像去烟的影响（消融研究）

*Investigating the Impact of Various Loss Functions and Learnable Wiener Filter for Laparoscopic Image Desmoking*

**arXiv（预印本）** · 2025-09-11 · 消融研究（图像复原方法） · [arXiv 2509.09849](https://arxiv.org/abs/2509.09849)

对腹腔镜图像去烟框架ULW（U-Net骨干+MSE/SSIM/感知复合损失+可微可学习维纳滤波）做系统消融研究，分别去除可学习维纳滤波、选择性使用单个损失项以评估各组件贡献。在公开配对腹腔镜图像数据集上用SSIM、PSNR、MSE、CIEDE-2000定量指标及定性视觉对比进行基准评测（文中未列具体数值）。

> **要点**：系统消融验证维纳滤波与复合损失各组件对腹腔镜图像去烟的贡献。


#### 25. SurgLaVi：面向手术视觉-语言表示学习的大规模分层数据集

*SurgLaVi: Large-Scale Hierarchical Dataset for Surgical Vision-Language Representation Learning*

**arXiv（预印本）** · 2025-09-09 · 数据集构建+表示学习模型 · [arXiv 2509.10555](https://arxiv.org/abs/2509.10555)

发布迄今最大最多样的手术视觉-语言数据集SurgLaVi，含来自200+种术式的近24万clip-caption对，具粗/中/细三层结构；核心为全自动流水线生成细粒度转录并切分为连贯手术单元，并用双模态过滤去噪。开源衍生版SurgLaVi-β含11.3万对（较现有手术VLP数据集大4倍以上）。以CLIP式双编码器SurgCLIP为基线模型，在阶段、步骤、动作、工具识别上一致超越现有最优方法。

> **要点**：最大手术视觉-语言数据集（24万对）+SurgCLIP，全面提升阶段/步骤/动作/工具识别。


#### 26. 利用通用基础模型进行多模态手术数据分析

*Leveraging Generic Foundation Models for Multimodal Surgical Data Analysis*

**arXiv（预印本）** · 2025-09-08 · 方法研究（基础模型适配+多模态） · [arXiv 2509.06831](https://arxiv.org/abs/2509.06831)

以V-JEPA为单模态基础，研究迁移学习适配与手术室（OR）多模态数据整合对手术数据科学的作用。在自建肝脏手术视频上做住院时长与术后并发症预测，在公开HeiCo数据上做手术阶段识别；以预训练V-JEPA为基线，在未标注手术视频上微调做域适配，并训练独立编码器与V-JEPA嵌入构建共享表示以整合OR时序数据流。结果显示域内微调提升性能，HeiCo上纯视频基线即与EndoVis2017挑战赛顶尖提交相当，微调后进一步提升。

> **要点**：域适配V-JEPA+OR多模态数据整合提升手术数据科学多任务性能。


#### 27. Appendix300：面向计算建模任务的多机构腹腔镜阑尾切除视频数据集

*Appendix300: A multi-institutional laparoscopic appendectomy video dataset for computational modeling tasks*

**medRxiv/bioRxiv（预印本）** · 2025-09-07 · 多机构数据集资源(预印本) · [DOI](https://doi.org/10.1101/2025.09.05.25335174)

构建Appendix300数据集，含五家德国中心330段腹腔镜手术录像(325例阑尾切除+5例对照)及患者级临床元数据(人口学、病史、症状、实验室、组织病理)与标准化阑尾炎腹腔镜分级标注。为目前最大的带患者元数据公开手术视频集、首个腹腔镜阑尾切除数据集，支持阑尾炎严重度分类与穿孔检测，腹腔镜分级评者间加权Cohen's κ=0.615。

> **要点**：最大公开腹腔镜阑尾切除视频数据集，支持外科计算机视觉严重度/穿孔任务。


#### 28. 低频电刺激诱发发作的自动标注揭示致痫网络

*Automated annotation of low-frequency stimulation-induced seizures uncovers seizure generating networks*

**medRxiv/bioRxiv（预印本）** · 2025-09-03 · 回顾性多中心/深度学习 · [DOI](https://doi.org/10.1101/2025.08.29.25334082)

回顾性多中心：分析2个癫痫中心104例患者行颅内EEG及低频电刺激的441次发作，用新型深度学习算法量化自发与刺激诱发发作间的空间扩散与电学相似度并关联临床症状与解剖边界。无监督算法达专家级标注精度；再现患者习惯性症状的诱发发作与自发发作起始区一致且与术后无发作相关，非典型症状者起始于快速募集区(继发灶生物标志物)并与术后仍有发作相关。

> **要点**：深度学习自动标注刺激诱发发作可快速定位致痫组织,推动癫痫术前评估从被动记录转向刺激诱发标测


#### 29. EndoGMDE：面向多样内窥镜场景的低秩专家混合可泛化单目深度估计

*EndoGMDE: Generalizable Monocular Depth Estimation with Mixture of Low-Rank Experts for Diverse Endoscopic Scenes*

**arXiv（预印本）** · 2025-09-01 · 方法开发研究（自监督深度估计） · [arXiv 2509.01206](https://arxiv.org/abs/2509.01206)

提出自监督单目深度估计框架EndoGMDE应对内窥镜光照与场景多样性：设计逐块动态低秩专家混合模块，按输入特征自适应选择少量可训练参数的低秩专家加权推理以高效微调基础模型；并提出联合应对亮度不一致与反射干扰的自监督训练框架。在SCARED与SimCol数据集上超越现有最优，在C3VD、Hamlyn、SERV-CT上零样本泛化最佳，并支持三维重建与自运动估计。

> **要点**：低秩专家混合微调基础模型，实现多样内窥镜场景SOTA与最佳零样本深度估计。


#### 30. GLENDA：妇科腹腔镜子宫内膜异位症数据集

*GLENDA: Gynecologic Laparoscopy Endometriosis Dataset*

**arXiv（预印本）** · 2025-08-29 · 数据集构建 · [arXiv 2508.21398](https://arxiv.org/abs/2508.21398)

发布首个此类图像数据集GLENDA（Gynecologic Laparoscopy ENdometriosis DAtaset），含对常见病症子宫内膜异位症（子宫样组织异位）的区域标注，用于支持依赖样本数据的计算机视觉与机器学习方法（该类医学数据稀缺），与领域内顶尖医学专家合作构建。

> **要点**：首个妇科腹腔镜子宫内膜异位症区域标注数据集，支持手术视频CV/ML研究。


#### 31. ROBUST-MIPS：腹腔镜手术器械骨架位姿与实例分割联合数据集

*ROBUST-MIPS: A Combined Skeletal Pose and Instance Segmentation Dataset for Laparoscopic Surgical Instruments*

**arXiv（预印本）** · 2025-08-27 · 数据集构建+基准 · [arXiv 2508.21096](https://arxiv.org/abs/2508.21096)

由现有ROBUST-MIS数据集衍生，构建器械位姿与实例分割联合数据集ROBUST-MIPS，主张骨架位姿标注在语义丰富度与标注便捷性间取得平衡，可加速可用标注数据增长。用流行位姿估计方法搭建基准并观察到高质量结果，随数据集一并发布基准模型与自研工具位姿标注软件以促进采用。

> **要点**：ROBUST-MIPS提供腹腔镜器械位姿+实例分割联合标注，倡导高效骨架位姿标注。


#### 32. EndoUFM：利用基础模型进行内窥镜图像单目深度估计

*EndoUFM: Utilizing Foundation Models for Monocular depth estimation of endoscopic images*

**arXiv（预印本）** · 2025-08-25 · 方法开发研究（无监督深度估计） · [arXiv 2508.17916](https://arxiv.org/abs/2508.17916)

提出无监督单目深度估计框架EndoUFM，创新性地利用双基础模型应对内窥镜环境光照多变与纹理复杂：采用随机向量低秩适配（RVLoRA）的自适应微调策略增强适应性，用基于深度可分离卷积的残差块（Res-DSC）改善细粒度局部特征捕获，并引入掩码引导的平滑损失保持解剖结构内深度一致。在SCARED、Hamlyn、SERV-CT、EndoNeRF数据集上以高效模型规模达到SOTA性能。

> **要点**：EndoUFM以双基础模型+RVLoRA实现高效内窥镜单目深度估计SOTA，增强术中空间感知。


#### 33. 手术阶段识别的可迁移性估计指标分析

*Analysis of Transferability Estimation Metrics for Surgical Phase Recognition*

**arXiv（预印本）** · 2025-08-22 · 基准分析研究（方法学） · [arXiv 2508.16730](https://arxiv.org/abs/2508.16730)

将源无关可迁移性估计（SITE）形式化用于手术阶段识别模型选择，并首次在两个数据集（RAMIE、AutoLaparo）上系统基准评测LogME、H-Score、TransRate三种代表性指标。结果显示LogME（尤其按子集最小分聚合）与微调准确率最吻合，H-Score预测力弱，TransRate常颠倒真实模型排名；消融显示候选模型性能相近时可迁移性估计判别力下降。

> **要点**：LogME最能预测手术阶段识别微调准确率，为外科模型选择提供实证指南。



### （边缘预印本，104 篇 · 紧凑清单）

| 日期 | 服务器 | 分类 | 标题 | 链接 |
|---|---|---|---|---|
| 2026-06-30 | arXiv | FM | DOSE-I：内窥镜操作镇静的多模态生物信号数据集(技术报告) | [arXiv 2607.02570](https://arxiv.org/abs/2607.02570) |
| 2026-06-22 | arXiv | FM | RCM约束视觉伺服的统一基准：腹腔镜机器人建模-控制器交互与鲁棒性分析 | [arXiv 2607.00030](https://arxiv.org/abs/2607.00030) |
| 2026-06-18 | arXiv | FM | GIM-ENDO：胃肠上皮化生形态与病理的多模态内窥镜图像与视频数据集 | [arXiv 2606.20919](https://arxiv.org/abs/2606.20919) |
| 2026-06-18 | arXiv | FM | 轮廓约束可变形配准与参数表征用于头颈外科引导 | [arXiv 2606.19767](https://arxiv.org/abs/2606.19767) |
| 2026-06-11 | arXiv | FM | 基于EMG自适应各向异性虚拟夹具用于机器人辅助手术切除与分离 | [arXiv 2606.13340](https://arxiv.org/abs/2606.13340) |
| 2026-05-23 | arXiv | FM | 显微外科串联球面工具的几何工作空间分析与传动感知动力学 | [arXiv 2605.24760](https://arxiv.org/abs/2605.24760) |
| 2026-05-18 | arXiv | FM | 面向张腱驱动连续体机器人设计空间代理建模的神经算子 | [arXiv 2605.19104](https://arxiv.org/abs/2605.19104) |
| 2026-05-09 | arXiv | FM | VISTA：外科远程操作中网络损伤下实时视频流的基准 | [arXiv 2605.08886](https://arxiv.org/abs/2605.08886) |
| 2026-04-30 | arXiv | FM | 面向机器人手术训练的带触觉反馈框架的实验性模块化器械 | [arXiv 2604.27385](https://arxiv.org/abs/2604.27385) |
| 2026-04-27 | arXiv | FM | 影像组学与临床特征驱动预测颅底脑膜瘤CyberKnife放射外科后体积响应 | [arXiv 2604.24230](https://arxiv.org/abs/2604.24230) |
| 2026-04-26 | arXiv | FM | 触觉机器人手术训练中腕装力/力矩传感器的实时非接触力补偿 | [arXiv 2604.23696](https://arxiv.org/abs/2604.23696) |
| 2026-04-15 | arXiv | FM | 受线虫寄生虫启发的可变形细长微机器人用于血管介入手术 | [arXiv 2604.13513](https://arxiv.org/abs/2604.13513) |
| 2026-04-10 | arXiv | FM | Vision Transformer基于术前CT预测高级别浆液性卵巢癌化疗反应评分(CRS) | [arXiv 2604.09197](https://arxiv.org/abs/2604.09197) |
| 2026-04-07 | arXiv | FM | 如医生般类比推理：消化内镜诊断的基础模型RATNet | [arXiv 2604.05649](https://arxiv.org/abs/2604.05649) |
| 2026-04-07 | arXiv | FM | 一种新型手术机器人器械的控制架构与实验验证 | [arXiv 2604.05610](https://arxiv.org/abs/2604.05610) |
| 2026-04-03 | arXiv | FM | 微创手术中人形机器人的快速器械交换系统 | [arXiv 2604.02707](https://arxiv.org/abs/2604.02707) |
| 2026-04-02 | arXiv | FM | 面向真实消化内镜人机协作的领域自适应语音识别EndoASR多中心评估 | [arXiv 2604.01705](https://arxiv.org/abs/2604.01705) |
| 2026-03-26 | arXiv | FM | 聚焦-感知表征学习：内镜视频分析的认知启发分层框架 | [arXiv 2603.25778](https://arxiv.org/abs/2603.25778) |
| 2026-03-16 | arXiv | FM | 基于Vision Transformer的胶囊内镜视频罕见病变检测 | [arXiv 2603.18045](https://arxiv.org/abs/2603.18045) |
| 2026-03-15 | arXiv | FM | 溃疡性结肠炎内镜评分的多模态数据集与基准 | [arXiv 2603.14559](https://arxiv.org/abs/2603.14559) |
| 2026-03-07 | arXiv | FM | MedSteer：免训练激活引导的反事实内镜图像合成 | [arXiv 2603.07066](https://arxiv.org/abs/2603.07066) |
| 2026-03-06 | arXiv | FM | 网络服务质量对机器人远程手术影响的综合分析 | [arXiv 2603.06824](https://arxiv.org/abs/2603.06824) |
| 2026-02-27 | arXiv | FM | 人形机器人作为内镜手术的第一助手 | [arXiv 2602.24156](https://arxiv.org/abs/2602.24156) |
| 2026-02-06 | arXiv | FM | 面向颈椎手术的增强型R-CUBE机构优化 | [arXiv 2602.15886](https://arxiv.org/abs/2602.15886) |
| 2026-02-06 | arXiv | FM | 客观腹腔镜训练评估的集成运动跟踪装置(IMTD)：研制与验证 | [arXiv 2602.15885](https://arxiv.org/abs/2602.15885) |
| 2026-02-06 | arXiv | FM | 辅助颈椎手术的协同操作机器人系统初步实验反馈 | [arXiv 2602.06541](https://arxiv.org/abs/2602.06541) |
| 2026-02-03 | arXiv | FM | 内镜肺动脉血栓内膜切除的多功能机器人化手术剥离器：临床前研究 | [arXiv 2602.03147](https://arxiv.org/abs/2602.03147) |
| 2026-02-02 | arXiv | FM | 基于物理的多层角膜OCT数据生成用于AI诊断与手术引导 | [arXiv 2602.02755](https://arxiv.org/abs/2602.02755) |
| 2026-01-30 | arXiv | FM | EndoCaver：内镜图像联合去模糊-分割以应对雾/模糊/眩光 | [arXiv 2601.22537](https://arxiv.org/abs/2601.22537) |
| 2026-01-27 | arXiv | FM | 面向三维手术规划与可视化的协同扩展现实原型 | [arXiv 2601.19303](https://arxiv.org/abs/2601.19303) |
| 2026-01-23 | arXiv | FM | 精选内镜逆行胰胆管造影(ERCP)图像数据集 | [arXiv 2601.16759](https://arxiv.org/abs/2601.16759) |
| 2026-01-21 | arXiv | FM | 达芬奇手术机器人的实时手眼标定 | [arXiv 2601.14871](https://arxiv.org/abs/2601.14871) |
| 2026-01-14 | arXiv | FM | 无配对组级知识蒸馏用于白光内镜胃肠病变鲁棒分类 | [arXiv 2601.09209](https://arxiv.org/abs/2601.09209) |
| 2026-01-10 | arXiv | FM | 上呼吸消化道显微手术的机器人遥操作系统：设计与验证 | [arXiv 2601.06617](https://arxiv.org/abs/2601.06617) |
| 2026-01-09 | arXiv | FM | 基于深度学习的胰腺肿瘤分割模型在公开超声内镜数据集上的性能 | [arXiv 2601.05937](https://arxiv.org/abs/2601.05937) |
| 2025-12-22 | arXiv | FM | SlicerOrbitSurgerySim：预成型眶板虚拟配准与定量比较的开源平台 | [arXiv 2512.19534](https://arxiv.org/abs/2512.19534) |
| 2025-12-09 | arXiv | FM | 从多相机无影灯生成开放手术无干扰手术视频 | [arXiv 2512.08577](https://arxiv.org/abs/2512.08577) |
| 2025-12-03 | arXiv | FM | 用于观察等待策略随访内镜的直肠肿瘤再生长评估双交叉注意力孪生Transformer | [arXiv 2512.03883](https://arxiv.org/abs/2512.03883) |
| 2025-11-28 | medRxiv/bioRxiv | FM | 多重成像结合机器学习实现皮层发育畸形(结节性硬化)的自动化定量 | [DOI](https://doi.org/10.1101/2025.11.24.690101) |
| 2025-11-27 | medRxiv/bioRxiv | FM | 用人设驱动的大语言模型对儿科信任量表进行合成验证 | [DOI](https://doi.org/10.1101/2025.11.25.25340922) |
| 2025-11-24 | medRxiv/bioRxiv | FM | 利用口腔微生物组跨大洲预测食管鳞状细胞癌 | [DOI](https://doi.org/10.1101/2025.11.23.690048) |
| 2025-11-19 | medRxiv/bioRxiv | FM | 智能手机皮肤癌风险评估应用对医疗系统影响的随机对照试验(SPOT) | [DOI](https://doi.org/10.1101/2025.11.18.25340297) |
| 2025-11-17 | arXiv | FM | EndoSight AI：深度学习驱动的实时胃肠息肉检测与分割 | [arXiv 2511.12962](https://arxiv.org/abs/2511.12962) |
| 2025-11-17 | medRxiv/bioRxiv | FM | 面向智能手机的轻量多模态机器学习白内障检测与分级 | [DOI](https://doi.org/10.1101/2025.11.14.25340278) |
| 2025-11-13 | arXiv | FM | 基于专家共识的微创结直肠手术工作流视频评估工具ColoWorkflow的开发与验证 | [arXiv 2511.10766](https://arxiv.org/abs/2511.10766) |
| 2025-11-13 | medRxiv/bioRxiv | FM | 大语言模型在上消化道出血临床管理中的评估：来自真实世界患者数据的启示 | [DOI](https://doi.org/10.1101/2025.11.10.25339858) |
| 2025-11-13 | medRxiv/bioRxiv | FM | 基于ViT多示例学习框架从全切片图像预测TP53标志物与生存结局 | [DOI](https://doi.org/10.1101/2025.11.11.25340052) |
| 2025-11-13 | medRxiv/bioRxiv | FM | 基于组织病理的免疫与分子特征空间画像预测Barrett食管癌变风险 | [DOI](https://doi.org/10.1101/2025.11.11.25339952) |
| 2025-11-05 | arXiv | FM | 扩散引导的掩膜一致成对混合用于内镜图像分割 | [arXiv 2511.03219](https://arxiv.org/abs/2511.03219) |
| 2025-11-04 | arXiv | FM | 精准腹腔镜手术机器人臂的运动学与人机工程设计 | [arXiv 2511.02167](https://arxiv.org/abs/2511.02167) |
| 2025-11-03 | arXiv | FM | 可操控球囊心内镜的闭环控制用于机器人辅助经导管心脏介入 | [arXiv 2511.01199](https://arxiv.org/abs/2511.01199) |
| 2025-10-30 | medRxiv/bioRxiv | FM | 减重手术成人的膳食宏量营养素摄入与肠道微生物组 | [DOI](https://doi.org/10.1101/2025.10.28.25338397) |
| 2025-10-28 | medRxiv/bioRxiv | FM | 专家悖论：谁从LLM辅助的脑MRI鉴别诊断中获益? | [DOI](https://doi.org/10.1101/2025.10.28.25338816) |
| 2025-10-23 | medRxiv/bioRxiv | FM | Digital Registrar：基于本地大语言模型的多癌种隐私保护病理信息抽取框架 | [DOI](https://doi.org/10.1101/2025.10.21.25338475) |
| 2025-10-23 | arXiv | FM | Endoshare：面向外科医生的手术视频去标识与管理开源工具 | [arXiv 2510.20087](https://arxiv.org/abs/2510.20087) |
| 2025-10-22 | medRxiv/bioRxiv | FM | 面向出院后护理风险评估的机器学习决策支持系统 | [DOI](https://doi.org/10.1101/2025.10.20.25338376) |
| 2025-10-20 | arXiv | FM | 基于机器视觉的手术照明系统：设计与实现 | [arXiv 2510.17287](https://arxiv.org/abs/2510.17287) |
| 2025-10-20 | arXiv | FM | EndoCIL：内窥镜图像分类的类增量学习框架 | [arXiv 2510.17200](https://arxiv.org/abs/2510.17200) |
| 2025-10-18 | arXiv | FM | 使用MRI与增强现实的计算机导航脊柱手术 | [arXiv 2510.16347](https://arxiv.org/abs/2510.16347) |
| 2025-10-16 | arXiv | FM | 通过无损检测的实时手术器械缺陷检测 | [arXiv 2510.14525](https://arxiv.org/abs/2510.14525) |
| 2025-10-15 | arXiv | FM | 光计算-通信一体化实现远程手术低延迟高保真感知 | [arXiv 2510.14058](https://arxiv.org/abs/2510.14058) |
| 2025-10-14 | medRxiv/bioRxiv | FM | 机器学习预测并最大化乳腺癌患者对新辅助治疗的应答 | [DOI](https://doi.org/10.1101/2025.10.11.25337587) |
| 2025-10-05 | medRxiv/bioRxiv | FM | 基于Z评分的主动脉直径阈值用于胸主动脉夹层与动脉瘤早期检测 | [DOI](https://doi.org/10.1101/2025.10.03.25337259) |
| 2025-10-05 | medRxiv/bioRxiv | FM | 基于基础模型的乳腺癌最优新辅助治疗推荐 | [DOI](https://doi.org/10.1101/2025.10.03.25337255) |
| 2025-10-04 | arXiv | FM | 使用Magic Leap的手术刀混合现实引导：3D打印肝脏体模评估 | [arXiv 2510.03617](https://arxiv.org/abs/2510.03617) |
| 2025-10-03 | arXiv | FM | LapSurgie：人形机器人经遥操作手持腹腔镜实施手术 | [arXiv 2510.03529](https://arxiv.org/abs/2510.03529) |
| 2025-10-01 | arXiv | FM | 触及肿瘤边界：超声虚拟夹具用于保乳手术的试点研究 | [arXiv 2510.01452](https://arxiv.org/abs/2510.01452) |
| 2025-09-30 | medRxiv/bioRxiv | FM | 以病理概念学习评估肾癌基础模型 | [DOI](https://doi.org/10.1101/2025.09.29.25336908) |
| 2025-09-26 | medRxiv/bioRxiv | FM | HRDPath：从组织病理图像预测同源重组缺陷的可解释多模型深度学习架构 | [DOI](https://doi.org/10.1101/2025.09.24.678258) |
| 2025-09-25 | arXiv | FM | 手术器械的无监督缺陷检测 | [arXiv 2509.21561](https://arxiv.org/abs/2509.21561) |
| 2025-09-22 | arXiv | FM | 食管胃结合部腺癌内镜诊断AI基础模型的开发与验证 | [arXiv 2509.17660](https://arxiv.org/abs/2509.17660) |
| 2025-09-20 | medRxiv/bioRxiv | FM | 深度学习预测异基因造血干细胞动员成功 | [DOI](https://doi.org/10.1101/2025.09.17.676674) |
| 2025-09-20 | medRxiv/bioRxiv | FM | 心脏手术中外科应激的代谢轨迹 | [DOI](https://doi.org/10.1101/2025.09.16.676529) |
| 2025-09-19 | arXiv | FM | 磁性可重编程手术功能的微型软体机器人 | [arXiv 2509.15610](https://arxiv.org/abs/2509.15610) |
| 2025-09-17 | arXiv | FM | 手术机器人中符合远心点（RCM）约束的一致性动力学控制 | [arXiv 2509.14075](https://arxiv.org/abs/2509.14075) |
| 2025-09-16 | arXiv | FM | MEGAN：内镜视频稳健不确定性估计的专家混合网络 | [arXiv 2509.12772](https://arxiv.org/abs/2509.12772) |
| 2025-09-15 | medRxiv/bioRxiv | FM | CenSegNet：异质组织中中心体表型的通用高通量深度学习框架 | [DOI](https://doi.org/10.1101/2025.09.15.676250) |
| 2025-09-12 | arXiv | FM | 机器人化与增强现有内窥镜操作的模块化直观框架设计与开发 | [arXiv 2509.10735](https://arxiv.org/abs/2509.10735) |
| 2025-09-03 | arXiv | FM | 图像引导手术：技术、质量、创新与医学物理的机遇（综述） | [arXiv 2509.03420](https://arxiv.org/abs/2509.03420) |
| 2025-09-03 | arXiv | FM | 病灶感知的视觉-语言融合用于溃疡性结肠炎内镜检查自动图像描述 | [arXiv 2509.03011](https://arxiv.org/abs/2509.03011) |
| 2025-08-21 | medRxiv/bioRxiv | FM | 丘脑底核编码驱动帕金森病步态的自适应治疗 | [DOI](https://doi.org/10.1101/2025.08.20.25333478) |
| 2025-08-21 | medRxiv/bioRxiv | FM | 用于绘制人脑活动的微型四维功能超声 | [DOI](https://doi.org/10.1101/2025.08.19.25332261) |
| 2025-08-19 | medRxiv/bioRxiv | FM | 符号回归预测肾移植受者的霉酚酸剂量 | [DOI](https://doi.org/10.1101/2025.08.15.25333810) |
| 2025-08-18 | arXiv | FM | CLoE：面向内镜图像稳健MES分级的课程学习框架 | [arXiv 2508.13280](https://arxiv.org/abs/2508.13280) |
| 2025-08-14 | arXiv | FM | 基于表面描迹的AR手术导航：原位可视化与工具追踪引导在神经外科中的比较 | [arXiv 2508.10554](https://arxiv.org/abs/2508.10554) |
| 2025-08-10 | arXiv | FM | EndoCogniAgent：具自一致性验证的闭环智能体推理用于内镜诊断 | [arXiv 2508.07292](https://arxiv.org/abs/2508.07292) |
| 2025-08-09 | arXiv | FM | LLM评估的独立注意力辅助图神经网络用于内镜(息肉)图像分割 | [arXiv 2508.07028](https://arxiv.org/abs/2508.07028) |
| 2025-08-06 | arXiv | FM | ACM Multimedia 2025 ENT内镜分析大挑战赛(ENTRep) | [arXiv 2508.04801](https://arxiv.org/abs/2508.04801) |
| 2025-07-24 | arXiv | FM | TextSAM-EUS：用文本提示学习使SAM精确分割内镜超声中的胰腺肿瘤 | [arXiv 2507.18082](https://arxiv.org/abs/2507.18082) |
| 2025-07-23 | arXiv | FM | EndoGen：条件自回归内镜视频生成 | [arXiv 2507.17388](https://arxiv.org/abs/2507.17388) |
| 2025-07-22 | bioRxiv | FM | 对三维病理数据集做深度学习分诊以实现高效病理评估 | [DOI](https://doi.org/10.1101/2025.07.20.665804) |
| 2025-07-21 | medRxiv | FM | 用纵向临床数据动态预测骨髓增生异常综合征的死亡风险 | [DOI](https://doi.org/10.1101/2025.07.21.25331775) |
| 2025-07-18 | medRxiv/bioRxiv | FM | HiViTAlign：基于组织病理视觉Transformer对齐的术后组织碎片拼合 | [DOI](https://doi.org/10.1101/2025.07.14.664649) |
| 2025-07-18 | arXiv | FM | 面向微创胰腺手术的创新并联机器人设计分析 | [arXiv 2507.13787](https://arxiv.org/abs/2507.13787) |
| 2025-07-18 | arXiv | FM | 眼科手术遥操作手术机器人工具的控制模式 | [arXiv 2507.13654](https://arxiv.org/abs/2507.13654) |
| 2025-07-17 | medRxiv/bioRxiv | FM | MiroSCOPE：用于标注功能组织单元的AI驱动数字病理平台 | [DOI](https://doi.org/10.1101/2025.07.11.664228) |
| 2025-07-10 | arXiv | FM | 基于光学跟踪的人机协作下颌角劈开截骨术(MASO)手术系统 | [arXiv 2507.07794](https://arxiv.org/abs/2507.07794) |
| 2025-07-10 | arXiv | FM | 面向手术机器人培训的增强训练课程的实现与评估 | [arXiv 2507.07718](https://arxiv.org/abs/2507.07718) |
| 2025-07-09 | arXiv | FM | 腕戴式触觉反馈对遥操作机器人手术任务中力度准确性与速度的影响 | [arXiv 2507.07327](https://arxiv.org/abs/2507.07327) |
| 2025-07-08 | arXiv | FM | 运动链误差下缆驱动手术机械臂的稳定跟踪闭环控制 | [arXiv 2507.05663](https://arxiv.org/abs/2507.05663) |
| 2025-07-08 | medRxiv | FM | 整合生物信息学与机器学习识别BK多瘤病毒相关肾病的线粒体相关biomarker | [DOI](https://doi.org/10.1101/2025.07.07.25331061) |
| 2025-07-03 | medRxiv | FM | 人工智能在消化内镜中的应用：系统综述 | [DOI](https://doi.org/10.1101/2025.07.02.25330317) |
| 2025-07-02 | arXiv | FM | S3D：用于机器人脊柱固定手术的空间可转向钻孔框架 | [arXiv 2507.01779](https://arxiv.org/abs/2507.01779) |
| 2025-07-01 | arXiv | FM | 基于可调小波单元CNN的OCT分析用于分类视网膜前膜(ERM)手术类型 | [arXiv 2507.00743](https://arxiv.org/abs/2507.00743) |

## 附录一：完整清单（按时间倒序，共 1323 篇）

> 日期取文章电子发表日（ArticleDate/Electronic）。约 6%（78 篇）条目因期刊「提前印刷」或印刷卷期日期规范，电子日期落在窗口边界外（76 篇早于 2025-07-01、2 篇晚于 2026-07-14），但均由 PubMed `[dp]` / Crossref 窗口检索命中，故保留；个别条目（如 PMID 41143654）PubMed 标注了未来电子日期（2026-10-24），实际 2025 年已入库。

| 日期 | 来源 | 分类 | 相关性 | 标题 | 链接 |
|---|---|---|---|---|---|
| 2026-10-24 | International Journal of Surgery | DIAG | core | 基于超声与机器学习的胸段食管癌选择性颈淋巴结清扫无创评估方法 | PMID 41143654 |
| 2026-07-15 | International Journal of Surgery | FM | peripheral | 评估ChatGPT-5与DeepSeek R1对距骨骨软骨损伤患者科普信息的质量与可读性 | 10.1097/js9.0000000000005510 |
| 2026-07-14 | arXiv | VIDEO | core | 手术中点追踪：2025红外手术纹身挑战赛(STIRC2025) | 2607.12939v1 |
| 2026-07-14 | arXiv | PLANNING | core | ExtraGS：扩散引导3D高斯溅射增强内窥镜视野外推 | 2607.12785v2 |
| 2026-07-14 | arXiv | ROBOT | core | 面向手术机器人无标记实时追踪的立体可微渲染精简方法 | 2607.12604v1 |
| 2026-07-14 | arXiv | VIDEO | core | 基于弱监督的手术视频高效标注主动学习框架 | 2607.13237v1 |
| 2026-07-14 | npj Digital Medicine | FM | peripheral | 面向端到端急诊救治的统一多模态基础模型(ED-Foundation) | PMID 42448807 |
| 2026-07-14 | npj Digital Medicine | OUTCOME | core | Transformer-DAPT：PCI术后双联抗血小板治疗缺血与出血风险的AI动态评估 | PMID 42448824 |
| 2026-07-13 | npj Digital Medicine | FM | peripheral | 便携式射频脑扫描仪结合深度学习实现卒中类型检测 | PMID 42443367 |
| 2026-07-13 | npj Digital Medicine | ROBOT | core | 手术室中的人形机器人:外科具身AI分阶段整合框架(观点) | PMID 42443339 |
| 2026-07-13 | Nature Communications | FM | peripheral | 自由活动啮齿动物的脊髓表面环形记录 | PMID 42443176 |
| 2026-07-10 | npj Digital Medicine | INTRAOP | core | 用视频分割AI模型实现腹腔镜肝切除术中实时解剖识别 | PMID 42432115 |
| 2026-07-10 | npj Digital Medicine | DIAG | core | 基于超声图像评估小儿回结肠型肠套叠严重程度的视觉Transformer模型 | PMID 42432112 |
| 2026-07-10 | Nature Communications | DIAG | core | 基于对比增强超声与深度学习预测肝细胞癌微血管侵犯 | PMID 42431906 |
| 2026-07-09 | arXiv | PLANNING | core | Track2Map：机器人手术中运动感知位姿优化的在线可变形SLAM | 2607.08408v1 |
| 2026-07-09 | arXiv | VIDEO | core | 面向开放词表内窥镜组合指代分割的属性检索方法 | 2607.08397v1 |
| 2026-07-08 | JAMA Surgery | INTRAOP | core | 单次增强现实引导定位切除疑似早期肺癌的随机对照试验 | PMID 42418181 |
| 2026-07-08 | JAMA Surgery | INTRAOP | core | 增强现实、胸外科与改善患者体验（社论） | PMID 42418177 |
| 2026-07-08 | Nature | ROBOT | core | 类人机器人用于手术的在体可行性研究 | PMID 42420461 |
| 2026-07-07 | npj Digital Medicine | VIDEO | core | 基于智能手术流程识别的微创下颌下腺切除术技能评估 | PMID 42414567 |
| 2026-07-07 | npj Digital Medicine | GOV | core | 实体器官移植中AI工具的临床试验与评估:对临床、监管科学与罕见病的启示(观点) | PMID 42414473 |
| 2026-07-07 | Nature Communications | FM | peripheral | 经扩展预训练的组织病理基础模型识别乳腺癌预后性RNA剪接原型 | 10.1038/s41467-026-75217-z |
| 2026-07-06 | arXiv | VIDEO | core | DeGenseGS：4D高斯溅射中几何与语义解耦的手术场景理解 | 2607.04761v1 |
| 2026-07-06 | npj Digital Medicine | FM | peripheral | 肺腺癌脑转移EGFR突变状态的放射基因组学建模:具生物可解释性的多中心研究 | PMID 42410125 |
| 2026-07-05 | arXiv | ROBOT | core | SurgAM：多模态特征融合的手术可供性图预测以实现机器人自主 | 2607.04378v1 |
| 2026-07-04 | npj Digital Medicine | LLM | core | 用于术前/操作前患者准备的对话式人工智能:实施、验证与患者满意度 | PMID 42401677 |
| 2026-07-03 | npj Digital Medicine | GOV | core | 用人工智能从数字化组织病理切片预测新辅助治疗应答:一项系统综述 | PMID 42399484 |
| 2026-07-02 | Nature Biomedical Engineering | FM | peripheral | BoneCoT：临床思维链引导的全身骨骼基础模型多中心验证（骨转移） | PMID 42393341 |
| 2026-07-01 | JAMA Surgery | INTRAOP | core | 在多学科世界中增强现实——作者回复（通信） | PMID 42160089 |
| 2026-07-01 | JAMA Surgery | INTRAOP | core | 在多学科世界中增强现实（通信） | PMID 42160068 |
| 2026-07-01 | Science Advances | ROBOT | core | 迈向自主机器人辅助与微机器人手术 | PMID 42384805 |
| 2026-07-01 | npj Digital Medicine | PLANNING | core | 用于脊柱侧凸手术规划与术后预测的人工智能 | PMID 42386936 |
| 2026-06-30 | arXiv | FM | peripheral | DOSE-I：内窥镜操作镇静的多模态生物信号数据集(技术报告) | 2607.02570v1 |
| 2026-06-30 | arXiv | VIDEO | core | HyperVLP：双曲空间中增强的层级手术视频-语言预训练 | 2606.31245v1 |
| 2026-06-30 | arXiv | VIDEO | core | 手术视频中稀疏功能性标志点定位的稠密结构先验 | 2606.31007v1 |
| 2026-06-30 | npj Digital Medicine | INTRAOP | core | 用人工智能增强外科医生在盆腔淋巴结清扫中的解剖识别 | PMID 42380252 |
| 2026-06-30 | Annals of Surgery | GOV | core | 手术AI研究的门诊手术中心悖论：60%手术发生地仅占2%的AI研究 | PMID 42374614 |
| 2026-06-29 | npj Digital Medicine | INTRAOP | core | 用生成式AI将冰冻切片转换为FFPE图像以评估皮肤癌切除切缘 | PMID 42373874 |
| 2026-06-28 | arXiv | ROBOT | core | SurgVLA-Bench：面向腹腔镜手术机器人的视觉-语言-动作模型评测基准 | 2606.29247v1 |
| 2026-06-25 | arXiv | INTRAOP | core | 优化手术室实时AI支持的人机界面：CVS Copilot | 2606.26886v1 |
| 2026-06-25 | arXiv | INTRAOP | core | LayersReg：可靠术中3D/2D配准的逐层渐进回归器 | 2606.26647v1 |
| 2026-06-25 | arXiv | VIDEO | core | 挑战条件下稳健手术多任务学习的时序一致标签插值 | 2606.26634v1 |
| 2026-06-25 | NEJM AI | VIDEO | core | 基于群体学习的隐私保护手术视频分析——多国阑尾切除队列结果 | 10.1056/aioa2501116 |
| 2026-06-25 | npj Digital Medicine | FM | peripheral | 用生理MRI与机器学习空间定位疑似复发胶质瘤患者的肿瘤复发区域 | PMID 42350576 |
| 2026-06-24 | arXiv | VIDEO | core | SurgAtlas：含2,391小时开放与微创手术的大规模手术视频-语言数据集 | 2606.25905v1 |
| 2026-06-24 | arXiv | PLANNING | core | 胃镜新视角合成：一个新的真实数据集与评测 | 2606.25427v1 |
| 2026-06-24 | Science Translational Medicine | TRANSPLANT | core | 偏振敏感光学相干断层扫描评估人供肝活力 | PMID 42341084 |
| 2026-06-24 | npj Digital Medicine | PLANNING | core | 用基础模型从多平面MRI重建以进行子宫肌瘤分析 | PMID 42342992 |
| 2026-06-23 | npj Digital Medicine | VIDEO | core | 端到端AI系统：手术手势序列识别与临床结局预测(F2O) | PMID 42337001 |
| 2026-06-23 | Nature Biomedical Engineering | FM | peripheral | TRUECAM：面向可信的不确定性感知非小细胞肺癌病理诊断框架 | PMID 42337062 |
| 2026-06-23 | npj Digital Medicine | FM | peripheral | 基于潜在流匹配的冠脉造影视频帧插值 | PMID 42337305 |
| 2026-06-22 | npj Digital Medicine | FM | peripheral | 多模态生存预测中缺失模态的处理(非小细胞肺癌) | PMID 42332139 |
| 2026-06-22 | npj Digital Medicine | FM | peripheral | 多模态大语言模型预警与诊断慢性眼部移植物抗宿主病(coGVHD) | PMID 42332126 |
| 2026-06-22 | arXiv | VIDEO | core | 机器人辅助手术中实时多模态活动感知的执行错误检测 | 2606.23593v1 |
| 2026-06-22 | arXiv | ROBOT | core | BiliVLA：强化学习的场景感知视觉-语言-动作模型用于自主胆道内窥镜导航 | 2606.23531v4 |
| 2026-06-22 | arXiv | VIDEO | core | 腹腔镜镜头导航自动化评估标准的专家共识 | 2606.23131v1 |
| 2026-06-22 | arXiv | FM | peripheral | RCM约束视觉伺服的统一基准：腹腔镜机器人建模-控制器交互与鲁棒性分析 | 2607.00030v1 |
| 2026-06-22 | arXiv | VIDEO | core | DBT-Bleed：关键帧选择双分支时序建模的手术出血检测 | 2606.22829v1 |
| 2026-06-22 | Nature Medicine | TRANSPLANT | core | AI增强诊断促成心脏移植的一例报道 | PMID 42332144 |
| 2026-06-22 | Nature Communications | DIAG | core | 基于MRI的一体化智能诊断策略评估乳腺癌腋窝淋巴结状态 | PMID 42331837 |
| 2026-06-22 | Annals of Surgery | FM | peripheral | 高亲和力神经降压素受体NTSR1定义免疫冷、预后差的结直肠癌亚型 | PMID 42322125 |
| 2026-06-22 | Annals of Surgery | VIDEO | core | 远端胃切除手术质量的自动化评估：基于关键质量视野(CVQ)的计算机视觉模型 | PMID 42319158 |
| 2026-06-20 | arXiv | VIDEO | core | 基于基础表征上下文学习的手术解剖结构识别 | 2606.22124v1 |
| 2026-06-19 | arXiv | ROBOT | core | 通过Sim-to-Real视觉运动学习克服手术机器人的不完美运动学 | 2606.21396v1 |
| 2026-06-18 | arXiv | FM | peripheral | GIM-ENDO：胃肠上皮化生形态与病理的多模态内窥镜图像与视频数据集 | 2606.20919v2 |
| 2026-06-18 | arXiv | METHOD | core | GEN-Guard：修正可部署联邦手术AI的泛化失效 | 2606.20303v1 |
| 2026-06-18 | arXiv | METHOD | core | 面向内窥镜视频的高斯过程先验变分自编码器 | 2606.19908v1 |
| 2026-06-18 | arXiv | ROBOT | core | SurgVista：具合理器械-组织动力学的长时程手术世界模型 | 2606.19889v1 |
| 2026-06-18 | arXiv | FM | peripheral | 轮廓约束可变形配准与参数表征用于头颈外科引导 | 2606.19767v1 |
| 2026-06-17 | arXiv | ROBOT | core | 自监督掩码感知Transformer用于微创手术机器人容错FBG力觉传感 | 2606.18628v1 |
| 2026-06-17 | Nature | FM | peripheral | 迈向自主医疗人工智能智能体(MIRA) | PMID 42310457 |
| 2026-06-16 | npj Digital Medicine | VIDEO | core | 作者更正：面向智能手术的大规模自监督视频基础模型 | PMID 42303709 |
| 2026-06-16 | International Journal of Surgery | INTRAOP | core | SPaR-liver：基于几何形变图神经网络的稀疏点感知配准用于术中肝脏形变补偿 | 10.1097/js9.0000000000005304 |
| 2026-06-16 | arXiv | GOV | core | 手术室质量保证的人工智能 | 2606.30657v1 |
| 2026-06-16 | arXiv | INTRAOP | core | MeiBRD：元学习术中生物力学残差变形 | 2606.17379v1 |
| 2026-06-16 | Nature Communications | OUTCOME | core | 术前人工智能模型估计非转移性肾癌患者的癌症特异性死亡率 | PMID 42303642 |
| 2026-06-15 | npj Digital Medicine | FM | peripheral | 骨形态作为前交叉韧带(ACL)损伤的重要危险因素 | PMID 42298177 |
| 2026-06-15 | npj Digital Medicine | DIAG | core | 整合超声-CT-MR的卵巢癌术前多任务预测：达MDT诊断水平 | PMID 42298142 |
| 2026-06-15 | arXiv | INTRAOP | core | 经结构化基础模型适配的几何一致内窥镜表征用于图像引导导航 | 2606.17340v1 |
| 2026-06-15 | arXiv | VIDEO | core | 经动作驱动数字孪生的手术室片段推理式文本到视频检索 | 2606.17298v1 |
| 2026-06-15 | arXiv | LLM | core | 用强化学习在数字孪生表征上训练LLM以完成推理密集的手术视频问答 | 2606.17279v1 |
| 2026-06-15 | Nature Medicine | FM | peripheral | 长期独立使用皮层内脑机接口实现语音与光标控制 | PMID 42297978 |
| 2026-06-14 | arXiv | VIDEO | core | 以对象token桥接机器人手术中的分割与视觉问答 | 2606.15861v1 |
| 2026-06-13 | arXiv | VIDEO | core | 手术视频中解剖感知目标检测的高斯空间先验 | 2606.15049v1 |
| 2026-06-12 | Science Advances | ROBOT | core | 基于单端多模光纤的深度学习柔性机器人多模态形状感知 | PMID 42284416 |
| 2026-06-12 | Cell Reports Medicine | FM | peripheral | 用无细胞DNA语言模型实现可泛化的癌症信号预测 | PMID 42285091 |
| 2026-06-11 | npj Digital Medicine | ROBOT | core | 推理能力如何赋能内镜手术中的AI副驾机器人 | PMID 42277237 |
| 2026-06-11 | arXiv | INTRAOP | core | 计算机辅助手术中部分到完整点云配准的逐点几何感知Transformer | 2606.13488v1 |
| 2026-06-11 | arXiv | FM | peripheral | 基于EMG自适应各向异性虚拟夹具用于机器人辅助手术切除与分离 | 2606.13340v1 |
| 2026-06-11 | arXiv | INTRAOP | core | GeoCFNet：几何感知置信场网络用于机器人辅助内镜黏膜下剥离 | 2606.13032v1 |
| 2026-06-11 | Nature Biomedical Engineering | FM | peripheral | 机器学习引导设计用于多组织创伤与急救的力学自适应生物胶 | PMID 42277319 |
| 2026-06-10 | npj Digital Medicine | VIDEO | core | 可部署实时脊柱内镜实例分割(轻量多尺度注意力,EndoSeg-RT) | PMID 42270950 |
| 2026-06-10 | npj Digital Medicine | FM | peripheral | AI辅助提升壶腹部病变的内镜诊断 | PMID 42270861 |
| 2026-06-10 | arXiv | ROBOT | core | 腹腔镜胆囊切除phantom上自主夹闭定位的点云分割 | 2606.12048v1 |
| 2026-06-10 | arXiv | ROBOT | core | 手术机器人任务学习策略的对抗攻击 | 2606.11535v1 |
| 2026-06-10 | npj Digital Medicine | EDU | core | 面向医学临床技能培训的智能评估系统 | PMID 42271165 |
| 2026-06-06 | arXiv | LLM | core | SurgiQ：评估大语言模型外科理解的大规模多域基准 | 2606.08071v1 |
| 2026-06-05 | npj Digital Medicine | FM | peripheral | 用常规血液指标预测结直肠癌预后的人工智能 | PMID 42249119 |
| 2026-06-05 | npj Digital Medicine | FM | peripheral | 以patch级对比学习增强基础模型迁移用于前列腺癌检测(ProViCNet) | PMID 42249085 |
| 2026-06-05 | npj Digital Medicine | OUTCOME | core | 年龄、情绪负担与深部脑刺激(DBS)电极位置影响帕金森病生活质量 | PMID 42249056 |
| 2026-06-05 | The Lancet Digital Health | PATHOMICS | core | 深度学习基于H&E的脑膜瘤分子分类与结局预测 | PMID 42248714 |
| 2026-06-04 | The Lancet Digital Health | OUTCOME | core | 可解释机器学习术前预测轻型出血性疾病的决策支持工具MBD-Check | PMID 42243044 |
| 2026-06-04 | Annals of Surgery | DIAG | core | 预测局部进展期直肠癌全程新辅助治疗后的治疗反应 | PMID 42240534 |
| 2026-06-04 | Annals of Surgery | OUTCOME | core | 预测微创左侧胰腺切除术后的最佳恢复者：全国队列洞见 | PMID 42237086 |
| 2026-06-03 | npj Digital Medicine | FM | peripheral | 预测晚期肝癌PD-1治疗超进展的多模态深度学习模型(HOPE) | PMID 42236582 |
| 2026-06-03 | International Journal of Surgery | FM | peripheral | SurvGRN：用于膀胱癌生存预测的多特征融合框架 | 10.1097/js9.0000000000004874 |
| 2026-06-03 | arXiv | INTRAOP | core | 手术器械处理与组装的多相机AR引导系统：工作负荷与效率研究 | 2606.04992v1 |
| 2026-06-03 | arXiv | INTRAOP | core | 神经外科医生需要看到什么：从超声合成术中MRI用于脑肿瘤手术脑移位补偿 | 2606.07658v1 |
| 2026-06-02 | npj Digital Medicine | FM | peripheral | 用Mamba架构深度学习预测乳腺癌病理完全缓解(pCR) | PMID 42230774 |
| 2026-06-02 | International Journal of Surgery | FM | peripheral | 读者来信：乳腺癌数字病理中的人工智能，实践新纪元？ | 10.1097/js9.0000000000005170 |
| 2026-06-02 | International Journal of Surgery | GOV | core | 超越黑箱：STAS预测模型的可解释性危机与临床转化鸿沟 | 10.1097/js9.0000000000005150 |
| 2026-06-02 | International Journal of Surgery | OUTCOME | core | 可解释多模态深度学习预测BCG治疗非肌层浸润性膀胱癌复发 | 10.1097/js9.0000000000005386 |
| 2026-06-01 | JAMA Surgery | GOV | core | 为何外科医生必须主导外科人工智能的治理 | PMID 42054044 |
| 2026-06-01 | JAMA Surgery | OUTCOME | core | MySurgeryRisk模型预测术后并发症与死亡率 | PMID 42054034 |
| 2026-06-01 | arXiv | OUTCOME | core | 基于术前肠道血供影像映射预测结直肠吻合口漏风险（研究方案） | 2606.02156v1 |
| 2026-06-01 | arXiv | PLANNING | core | PINNOCHIO：正颌手术面部软组织形变的物理信息神经网络仿真 | 2606.01572v1 |
| 2026-06-01 | Nature Biomedical Engineering | FM | peripheral | 具电极可扩展性与微创手术的高分辨率脑机接口 | PMID 41039114 |
| 2026-05-30 | arXiv | INTRAOP | core | 脑肿瘤手术术中超声到MR合成的系统性基准评测 | 2606.00630v1 |
| 2026-05-29 | Nature Medicine | FM | peripheral | 从供体肺到数字孪生 | PMID 42215696 |
| 2026-05-29 | arXiv | OUTCOME | core | 基于术前CT自动预测胰腺术后胰瘘 | 2605.31539v1 |
| 2026-05-29 | arXiv | ROBOT | core | 面向远程手术的轴集成力感知与基于Transformer的动力学补偿 | 2605.31434v2 |
| 2026-05-28 | arXiv | LLM | core | SURGENT：覆盖围手术期全流程的外科多智能体辅助系统 | 2605.29368v1 |
| 2026-05-28 | International Journal of Surgery | OUTCOME | core | 机器学习预测可切除/交界可切除胰腺癌12个月生存以优化新辅助患者选择 | 10.1097/js9.0000000000005316 |
| 2026-05-28 | Nature Communications | OUTCOME | core | 多模态深度学习对根治性肾切除患者功能预后风险分层 | 10.1038/s41467-026-73813-7 |
| 2026-05-28 | Annals of Surgery | OUTCOME | core | 从行政数据推导Clavien-Dindo分级：肝胆手术中的开发与外部验证 | PMID 42204395 |
| 2026-05-27 | npj Digital Medicine | OUTCOME | core | 子宫内膜癌术后血栓栓塞风险的个体化预测：基于SHAP的可解释AI | PMID 42204240 |
| 2026-05-27 | arXiv | ROBOT | core | 开放手术机器人辅助的模仿学习：缝合跟随的多策略评测 | 2605.28736v1 |
| 2026-05-27 | Nature Communications | PATHOMICS | core | 用于肺癌病理图像STAS预测与半自动定位的扩散注意力专家模型 | PMID 42203800 |
| 2026-05-26 | npj Digital Medicine | LLM | core | 大语言模型流水线改善外科试验摘要的可行性与影响 | PMID 42191815 |
| 2026-05-26 | arXiv | INTRAOP | core | 抗衰减交替优化的腹腔镜肝脏地标检测（A2ONet） | 2605.26630v1 |
| 2026-05-25 | npj Digital Medicine | FM | peripheral | 多专家整合算法用于肾活检分诊(MEIA) | PMID 42185463 |
| 2026-05-25 | arXiv | VIDEO | core | SurfSurg6D：无纹理手术器械6D位姿估计的几何一致稠密对应 | 2605.25598v1 |
| 2026-05-25 | arXiv | EDU | core | 评估外科反馈质量的多智能体LLM框架 | 2605.25440v1 |
| 2026-05-25 | npj Digital Medicine | FM | peripheral | CNet-Cox：用于乳腺癌预后的可解释网络生物标志物发现与生存风险评分 | PMID 42185445 |
| 2026-05-25 | Nature Communications | OUTCOME | core | 机器学习模型指导直肠癌手术选择性使用临时转流回肠造口的随机对照试验 | PMID 42185305 |
| 2026-05-24 | arXiv | INTRAOP | core | SurgRFO：基础模型驱动的术中胸片遗留异物合成 | 2605.24787v1 |
| 2026-05-23 | npj Digital Medicine | METHOD | core | SurgWound-Bench：外科伤口诊断基准 | PMID 42177302 |
| 2026-05-23 | arXiv | FM | peripheral | 显微外科串联球面工具的几何工作空间分析与传动感知动力学 | 2605.24760v1 |
| 2026-05-22 | npj Digital Medicine | DIAG | core | 深度学习从造影预测临界冠脉病变的支架植入 | PMID 42174128 |
| 2026-05-22 | npj Digital Medicine | FM | peripheral | AI辅助前列腺活检报告的评估(Articulate Pro前瞻研究) | PMID 42174106 |
| 2026-05-22 | arXiv | VIDEO | core | ExpOS：基于3D手部重建的可解释开放手术技能评估 | 2605.23653v1 |
| 2026-05-21 | arXiv | LLM | core | RoboSurg-VQA：面向分割感知的手术视觉问答多模态基准 | 2605.23068v1 |
| 2026-05-21 | arXiv | VIDEO | core | OSS：开放手术缝合技能视觉评估挑战赛(2024-2025) | 2605.22200v1 |
| 2026-05-21 | International Journal of Surgery | DIAG | core | 基于CT的深度学习模型多中心验证以指导纯磨玻璃结节治疗决策 | 10.1097/js9.0000000000005183 |
| 2026-05-20 | npj Digital Medicine | EDU | core | AI驱动的腹腔镜培训定性技能评估：前瞻观察研究 | PMID 42162259 |
| 2026-05-20 | npj Digital Medicine | GOV | core | 优化手术AI落地：手术室基础设施与部署建议 | PMID 42162215 |
| 2026-05-20 | arXiv | VIDEO | core | SurgOnAir：层级感知的实时手术视频解说 | 2605.21132v1 |
| 2026-05-19 | Nature Biomedical Engineering | FM | peripheral | 基于多模态数据的乳腺癌无创诊断深度学习系统(BINDS) | PMID 42157015 |
| 2026-05-18 | arXiv | FM | peripheral | 面向张腱驱动连续体机器人设计空间代理建模的神经算子 | 2605.19104v1 |
| 2026-05-18 | arXiv | ROBOT | core | 面向可变形组织外科机器人暴露任务的学习型自适应控制 | 2605.17927v1 |
| 2026-05-18 | arXiv | LLM | core | SurgLQA：可扩展的长时程手术视频问答 | 2605.17915v1 |
| 2026-05-15 | arXiv | METHOD | core | SCARED-C：面向内窥镜深度估计的相机位姿修正数据集 | 2605.16628v1 |
| 2026-05-15 | arXiv | EDU | core | SWoMo：白内障手术仿真的神经-符号世界模型 | 2605.16530v2 |
| 2026-05-15 | arXiv | PLANNING | core | EndoGSim：MLLM引导高斯泼溅的物理感知4D动态内窥镜场景仿真 | 2605.16022v1 |
| 2026-05-14 | arXiv | VIDEO | core | SurgicalMamba：状态重编程双路SSD的在线手术阶段识别 | 2605.14889v3 |
| 2026-05-14 | Cell Reports Medicine | FM | peripheral | 人工智能整合多体液组学与临床表型实现子宫内膜癌风险分层 | PMID 42140194 |
| 2026-05-14 | npj Digital Medicine | TRANSPLANT | core | 肾移植中基于电子病历的AI风险预测随机试验（PRIMA-AI） | PMID 42135463 |
| 2026-05-14 | npj Digital Medicine | FM | peripheral | 面向数字病理的可扩展联邦学习深度特征提示（FedDFP） | PMID 42135461 |
| 2026-05-14 | npj Digital Medicine | FM | peripheral | 面向全切片图像形态学透明AI预测的人在环解释框架（MorphoXAI） | PMID 42135447 |
| 2026-05-13 | Science Advances | FM | peripheral | 具记忆遗传回路的磁控医用微机器人 | PMID 42127204 |
| 2026-05-13 | arXiv | VIDEO | core | 面向统一手术场景理解：以MLLM桥接推理与定位（SurgMLLM） | 2605.13530v1 |
| 2026-05-13 | Nature Communications | FM | peripheral | 个体化机器学习指导的新诊断胶质母细胞瘤放疗剂量递增前瞻性初步研究 | PMID 42129213 |
| 2026-05-11 | The Lancet Digital Health | PATHOMICS | core | 可解释深度学习经组织病理预测胶质瘤分子改变（GMAP） | PMID 42115062 |
| 2026-05-11 | arXiv | VIDEO | core | DenseTRF：面向手术场景稠密预测的纹理感知无监督表示适配 | 2605.11265v1 |
| 2026-05-11 | arXiv | LLM | core | Hi-GaTA：面向手术视频报告生成的分层门控时序聚合适配器 | 2605.11208v2 |
| 2026-05-11 | arXiv | VIDEO | core | 稳定时序推理动力学以改进在线手术阶段识别 | 2605.16387v1 |
| 2026-05-09 | arXiv | FM | peripheral | VISTA：外科远程操作中网络损伤下实时视频流的基准 | 2605.08886v1 |
| 2026-05-09 | arXiv | VIDEO | core | 从关节运动学到路由视觉控制的动作条件手术视频生成 | 2605.08712v1 |
| 2026-05-08 | arXiv | VIDEO | core | OphEdit：无需训练的文本引导眼科手术视频编辑 | 2605.07695v1 |
| 2026-05-07 | International Journal of Surgery | DIAG | core | 检测腹部CT游离气体以辅助手术决策的深度学习模型开发 | 10.1097/js9.0000000000005385 |
| 2026-05-07 | International Journal of Surgery | GOV | core | 外科AI设备的全球监管：美、欧、英、中跨境兼容性评估 | 10.1097/js9.0000000000005378 |
| 2026-05-07 | npj Digital Medicine | OUTCOME | core | 基于术中生命体征动态在手术结束时预测术后感染并发症 | PMID 42092125 |
| 2026-05-07 | British Journal of Surgery | FM | peripheral | 外科创新与技术(委员会综述) | PMID 42149732 |
| 2026-05-06 | International Journal of Surgery | INTRAOP | core | AI引导的计算机辅助介入(CAI)系统用于腹腔镜直肠癌手术 | 10.1097/js9.0000000000005382 |
| 2026-05-06 | International Journal of Surgery | FM | peripheral | AI影像与液体活检联合临床评估鉴别肺结节良恶性的诊断性网状meta分析 | 10.1097/js9.0000000000005144 |
| 2026-05-06 | arXiv | ROBOT | core | 基于多模态术中信息统一力学表征的自主腹腔镜控制 | 2605.04408v1 |
| 2026-05-06 | npj Digital Medicine | FM | peripheral | 造血干细胞移植后AI引导的肠外营养治疗 | PMID 42092179 |
| 2026-05-05 | arXiv | TRIAGE | core | 基于时间扩展交互图的手术团队动态实时可操作建模 | 2605.04169v1 |
| 2026-05-05 | npj Digital Medicine | DIAG | core | 种植体美学风险影像替代标志物的深度学习模型开发与临床验证 | PMID 42086729 |
| 2026-05-05 | npj Digital Medicine | FM | peripheral | AI与医生预测胶质瘤IDH突变状态的性能比较 | PMID 42086700 |
| 2026-05-05 | Annals of Surgery | OUTCOME | core | 预测退伍军人大手术后的迁延性恢复与长期独立性丧失 | PMID 42083088 |
| 2026-05-04 | npj Digital Medicine | DIAG | core | 肾肿瘤多分类的多模态深度学习模型（MPANet） | PMID 42082763 |
| 2026-05-04 | npj Digital Medicine | FM | peripheral | 多模态超声时空Transformer用于乳腺癌无创分子分型（MUST-Sub） | PMID 42082579 |
| 2026-05-03 | arXiv | LLM | core | SurgCheck：视觉-语言模型在手术VQA中真的看图了吗？ | 2605.01911v2 |
| 2026-05-01 | JAMA Surgery | OUTCOME | core | 面向CA19-9不产生型胰腺导管腺癌的AI衍生电子肿瘤标志物(e19-9) | PMID 41848749 |
| 2026-04-30 | arXiv | FM | peripheral | 面向机器人手术训练的带触觉反馈框架的实验性模块化器械 | 2604.27385v1 |
| 2026-04-30 | npj Digital Medicine | EDU | core | 用整合式合成数据赋能外科医生应对复杂临床场景（观点） | PMID 42062460 |
| 2026-04-30 | npj Digital Medicine | OUTCOME | core | 基于深度学习定量评估右上肺叶切除术后肺不张 | PMID 42062447 |
| 2026-04-29 | International Journal of Surgery | GOV | core | AI与数字标准时代的大语言外科 | 10.1097/js9.0000000000005360 |
| 2026-04-29 | arXiv | EDU | core | 基于虚拟现实的患者特异性脊柱手术仿真：面向外科教育与规划的高保真系统 | 2604.26781v1 |
| 2026-04-29 | Nature Medicine | FM | peripheral | 面向癌症病理自主科学发现的智能体框架 | PMID 42056496 |
| 2026-04-29 | npj Digital Medicine | DIAG | core | 可解释机器学习通过常规血液标志物鉴别坏死性筋膜炎与骨髓炎 | PMID 42056542 |
| 2026-04-29 | npj Digital Medicine | ANESTH | core | 用于消化内镜的强化学习自动麻醉系统多中心随机试验（AAS-GE） | PMID 42056274 |
| 2026-04-28 | International Journal of Surgery | FM | peripheral | 基于MRI影像组学-临床模型无创鉴别鼻咽病变的多中心研究 | 10.1097/js9.0000000000005288 |
| 2026-04-28 | International Journal of Surgery | PATHOMICS | core | 基于AI的肿瘤微环境分析预测胆囊癌预后：一项回顾性队列研究 | 10.1097/js9.0000000000005258 |
| 2026-04-28 | arXiv | INTRAOP | core | 面向胶质瘤手术引导的术中荧光寿命成像数据中心框架 | 2604.26147v1 |
| 2026-04-28 | npj Digital Medicine | OUTCOME | core | 引产后分娩方式预测机器学习模型的外部验证 | PMID 42050170 |
| 2026-04-28 | npj Digital Medicine | FM | peripheral | 用EndoStyle进行消化内镜图像风格迁移以改进AI预测模型 | PMID 42050035 |
| 2026-04-28 | npj Digital Medicine | DIAG | core | 深度学习自动评分药物诱导睡眠内镜用于阻塞性睡眠呼吸暂停 | PMID 42050026 |
| 2026-04-27 | arXiv | INTRAOP | core | 基于视觉手部跟踪的无接触术中医学图像访问系统 | 2604.24235v1 |
| 2026-04-27 | arXiv | FM | peripheral | 影像组学与临床特征驱动预测颅底脑膜瘤CyberKnife放射外科后体积响应 | 2604.24230v1 |
| 2026-04-27 | International Journal of Surgery | OUTCOME | core | 收缩压变异性与心脏术后房颤发生的关系：基于机器学习的回顾队列 | 10.1097/js9.0000000000005211 |
| 2026-04-26 | arXiv | FM | peripheral | 触觉机器人手术训练中腕装力/力矩传感器的实时非接触力补偿 | 2604.23696v1 |
| 2026-04-24 | arXiv | LLM | core | Sum-of-Checks：用大型视觉-语言模型对手术安全的结构化推理 | 2604.22156v1 |
| 2026-04-24 | Nature Communications | FM | peripheral | 面向微创经耳道内耳介入的交互感知灵巧机器人 | PMID 42031753 |
| 2026-04-24 | npj Digital Medicine | OUTCOME | core | 联邦模型堆叠改进全国网络中心心脏术后AKI的医院层面预测 | PMID 42032114 |
| 2026-04-24 | Annals of Surgery | INTRAOP | core | 手术室中的环境人工智能：从被动记录到预测性协调 | PMID 42026714 |
| 2026-04-22 | International Journal of Surgery | VIDEO | core | 可解释的全流程视频深度学习框架I3D-SAP用于基础操作要素的手术技能评估 | 10.1097/js9.0000000000005082 |
| 2026-04-22 | International Journal of Surgery | PLANNING | core | 衔接AI与数字孪生实现实时精准手术：将COFFEE组织病理分类器转化到临床工作流 | 10.1097/js9.0000000000005252 |
| 2026-04-22 | arXiv | VIDEO | core | 他们在手术室里看向哪里？——手术室注视跟随 | 2604.20574v1 |
| 2026-04-22 | arXiv | LLM | core | SurgCoT：以思维链基准推进手术视频的时空推理 | 2604.20319v1 |
| 2026-04-20 | International Journal of Surgery | GOV | core | 评论：人工智能在消化内镜应用中的临床试验版图 | 10.1097/js9.0000000000005098 |
| 2026-04-20 | International Journal of Surgery | GOV | core | 结肠镜中计算机辅助检测(CADe)结肠息肉降低癌症相关医疗费用：新加坡单中心成本效益分析 | 10.1097/js9.0000000000005080 |
| 2026-04-20 | arXiv | VIDEO | core | LLM生成文本能否赋能手术视觉-语言预训练？SurgLIME框架 | 2604.18134v2 |
| 2026-04-20 | arXiv | METHOD | core | 可信的内镜图像超分辨率：定位不可靠重建区域 | 2604.18001v1 |
| 2026-04-19 | arXiv | INTRAOP | core | HyKey：微创手术中的高光谱关键点检测与匹配 | 2604.17446v1 |
| 2026-04-18 | npj Digital Medicine | FM | peripheral | 考虑区域风险异质性的甲状腺乳头状癌发生与淋巴结转移预测模型 | PMID 42000882 |
| 2026-04-18 | npj Digital Medicine | INTRAOP | core | AI增强共聚焦激光显微内镜用于脑肿瘤快速术中诊断 | PMID 42000880 |
| 2026-04-17 | Cell Reports Medicine | FM | peripheral | 血浆细胞外囊泡多组学与多光谱联合分析用于胶质瘤液体活检诊断 | PMID 41999751 |
| 2026-04-17 | npj Digital Medicine | PLANNING | core | 用于容积血管造影中动脉瘤瘤颈勾画的可微中心线感知框架 | PMID 41998109 |
| 2026-04-17 | npj Digital Medicine | FM | peripheral | 用ClarityDX Prostate模型（含/不含DRE与MRI）预测有临床意义前列腺癌 | PMID 41998222 |
| 2026-04-17 | npj Digital Medicine | FM | peripheral | 用于慢性消化不良人群胃癌分诊的新型血液生物标志物开发与验证 | PMID 41998063 |
| 2026-04-16 | npj Digital Medicine | VIDEO | core | 鼻咽喉镜检查中实时AI辅助质控随机对照试验（ENDOVISTA-ENT） | PMID 41992031 |
| 2026-04-15 | Science Advances | FM | peripheral | 猕猴虚拟现实导航的皮层内脑机接口 | PMID 41984955 |
| 2026-04-15 | arXiv | FM | peripheral | 受线虫寄生虫启发的可变形细长微机器人用于血管介入手术 | 2604.13513v1 |
| 2026-04-15 | Nature Communications | PATHOMICS | core | 基于深度学习的数字活检预测胃癌早期复发 | PMID 41986314 |
| 2026-04-15 | npj Digital Medicine | VIDEO | core | 面向智能手术室的专用基础模型（ORQA） | PMID 41986551 |
| 2026-04-14 | arXiv | INTRAOP | core | 面向腹腔镜手术的患者特异性可变形配准 | 2604.13186v1 |
| 2026-04-13 | npj Digital Medicine | FM | peripheral | 统一多模态学习用于卒中分诊：急性缺血性卒中联合检测、评分与分割 | PMID 41975201 |
| 2026-04-12 | arXiv | VIDEO | core | 小切口白内障手术数据高效阶段分割：视觉基础模型的对照研究 | 2604.10514v1 |
| 2026-04-11 | npj Digital Medicine | FM | peripheral | 图式化视觉-语言建模用于综合肺结节分析与风险分层（VITALIS） | PMID 41965884 |
| 2026-04-10 | The Lancet Digital Health | FM | peripheral | ChatGPT用于肥胖管理：证据、挑战与临床意义综述 | PMID 41966942 |
| 2026-04-10 | arXiv | OUTCOME | core | Neuro-Oracle：轨迹感知的可解释癫痫手术预后Agentic RAG框架 | 2604.14216v1 |
| 2026-04-10 | arXiv | FM | peripheral | Vision Transformer基于术前CT预测高级别浆液性卵巢癌化疗反应评分(CRS) | 2604.09197v1 |
| 2026-04-10 | arXiv | VIDEO | core | 机器人辅助手术器械分割的CNN与Transformer模型基准比较 | 2604.09151v1 |
| 2026-04-09 | International Journal of Surgery | INTRAOP | core | 增强腹腔镜胆囊切除术解剖识别与安全性的AI导航系统：一项初步研究 | 10.1097/js9.0000000000005086 |
| 2026-04-09 | Nature Communications | FM | peripheral | 咬合激活的自主压电种植体用于自适应预防种植体周围炎 | PMID 41951599 |
| 2026-04-08 | arXiv | VIDEO | core | 手术视频中器械交接的可解释视觉模型事件级检测 | 2604.07577v1 |
| 2026-04-08 | npj Digital Medicine | OUTCOME | core | AI预后工具对结直肠癌肝转移临床医生表现的影响 | PMID 41951838 |
| 2026-04-07 | Nature Communications | OUTCOME | core | 基于术前T1加权MRI的深度表征学习预测迷走神经刺激(VNS)疗效 | PMID 41946715 |
| 2026-04-07 | arXiv | FM | peripheral | 如医生般类比推理：消化内镜诊断的基础模型RATNet | 2604.05649v1 |
| 2026-04-07 | arXiv | FM | peripheral | 一种新型手术机器人器械的控制架构与实验验证 | 2604.05610v1 |
| 2026-04-07 | The Lancet Digital Health | TRANSPLANT | core | AI是否应进入肝移植遴选委员会?(社论) | PMID 41951493 |
| 2026-04-07 | The Lancet Digital Health | TRANSPLANT | core | 基于多智能体大语言模型模拟肝移植遴选委员会的系统:一项回顾性队列研究 | PMID 41951492 |
| 2026-04-04 | arXiv | VIDEO | core | UniSurgSAM：可靠手术视频分割的统一可提示模型 | 2604.03645v1 |
| 2026-04-04 | npj Digital Medicine | ROBOT | core | HoloTrauma 3X：面向机器人辅助急诊颌面重建的三元AI协同推理系统 | PMID 41935194 |
| 2026-04-03 | arXiv | VIDEO | core | 解锁手术器械增量学习的正向迁移：自反思分层提示框架 | 2604.02877v1 |
| 2026-04-03 | arXiv | FM | peripheral | 微创手术中人形机器人的快速器械交换系统 | 2604.02707v1 |
| 2026-04-02 | arXiv | FM | peripheral | 面向真实消化内镜人机协作的领域自适应语音识别EndoASR多中心评估 | 2604.01705v1 |
| 2026-04-01 | arXiv | VIDEO | core | 面向单目腹腔镜视频免训练Agentic推理的4D表征 | 2604.00867v1 |
| 2026-04-01 | arXiv | VIDEO | core | 为视觉-语言模型细粒度时空理解丰富手术视频数据集的方法 | 2604.00784v2 |
| 2026-04-01 | Cell Reports Medicine | FM | peripheral | 肺腺癌生存的5mC甲基化预后模型开发与验证(MethPro-LUAD) | PMID 41928513 |
| 2026-04-01 | The Lancet Digital Health | INTRAOP | core | 基于智能手机拍摄手术切除标本图像的深度学习模型预测临床IA期肺腺癌病理浸润性(SuRImage):一项前瞻性多中心诊断研 | PMID 41927432 |
| 2026-04-01 | npj Digital Medicine | FM | peripheral | AI辅助结直肠病变检测在私立诊所的随机对照研究（EndoMind） | PMID 41922731 |
| 2026-04-01 | npj Digital Medicine | LLM | core | 大语言模型联合临床医生修订简化非英语手术知情同意书 | PMID 41922537 |
| 2026-04-01 | npj Digital Medicine | OUTCOME | core | 大语言模型与机器学习预测经皮椎体后凸成形术后并发症的比较 | PMID 41922526 |
| 2026-03-31 | arXiv | INTRAOP | core | SurgNavAR：面向光学透视头戴显示器的增强现实手术导航框架 | 2603.29990v1 |
| 2026-03-31 | arXiv | VIDEO | core | 扩展手术基础模型的视频预训练：SurgRec | 2603.29966v2 |
| 2026-03-31 | arXiv | VIDEO | core | SurgTEMP：面向腹腔镜胆囊切除的时序感知手术视频问答 | 2603.29962v3 |
| 2026-03-31 | arXiv | VIDEO | core | CoRe-DA：手术技能评估无监督域适应的对比回归 | 2603.29666v1 |
| 2026-03-31 | arXiv | INTRAOP | core | 一体化增强现实引导头颈肿瘤切除 | 2603.29495v2 |
| 2026-03-28 | arXiv | GOV | core | 手术AI比较研究：数据、算力与扩展的潜力和局限 | 2603.27341v3 |
| 2026-03-28 | npj Digital Medicine | FM | peripheral | 面向自动内镜报告的领域专用多模态大语言模型（Report-Angel） | PMID 41904204 |
| 2026-03-27 | arXiv | VIDEO | core | SHANDS：面向医学培训的手术手势与错误识别多视角数据集与基准 | 2603.26400v1 |
| 2026-03-27 | Cell Reports Medicine | FM | peripheral | 扩展现实(XR)在临床神经病学中的应用:从跨学科创新到临床实践(综述) | PMID 41903546 |
| 2026-03-26 | arXiv | METHOD | core | 透过烟雾：改善视觉感知的手术去烟雾 | 2603.25867v1 |
| 2026-03-26 | arXiv | ROBOT | core | arg-VU：面向机器人手术视觉理解的物理感知3D几何可供性推理 | 2603.26814v1 |
| 2026-03-26 | arXiv | VIDEO | core | 基于多模态图像融合的眼科手术实时场景理解 | 2603.25555v1 |
| 2026-03-26 | arXiv | FM | peripheral | 聚焦-感知表征学习：内镜视频分析的认知启发分层框架 | 2603.25778v1 |
| 2026-03-26 | arXiv | VIDEO | core | 未见手术器械的免训练检测与6D位姿估计 | 2603.25228v1 |
| 2026-03-26 | arXiv | VIDEO | core | SurgPhase：经交互式网页平台的高效垂体瘤手术阶段识别 | 2603.24897v1 |
| 2026-03-26 | Annals of Surgery | GOV | core | 苦涩的教训及其对外科人工智能的启示 | PMID 41881839 |
| 2026-03-25 | International Journal of Surgery | PLANNING | core | 拓展视野：将多通道深度学习预测器整合入患者特异性数字孪生以实现精准肺癌管理 | 10.1097/js9.0000000000005064 |
| 2026-03-25 | arXiv | PLANNING | core | EndoVGGT：面向手术3D重建的GNN增强深度估计 | 2603.24577v2 |
| 2026-03-25 | arXiv | VIDEO | core | CliPPER：面向事件识别的长时术中手术视频-语言预训练 | 2603.24539v1 |
| 2026-03-24 | arXiv | ROBOT | core | PinPoint：经Stein变分牛顿与几何残差的机器人缝合单目针位姿估计 | 2603.23365v1 |
| 2026-03-24 | arXiv | METHOD | core | PhySe-RPO：物理与语义引导相对策略优化的扩散手术去烟雾 | 2603.22844v4 |
| 2026-03-24 | arXiv | PLANNING | core | Instrument-Splatting++：基于高斯泼溅的可控手术器械数字孪生 | 2603.22792v2 |
| 2026-03-24 | npj Digital Medicine | FM | peripheral | 基础模型在肌骨MRI中用于生物标志物保真与结局预测的临床效用 | PMID 41876760 |
| 2026-03-23 | arXiv | VIDEO | core | 从视频时序映射手术的视觉-语言模型与平台(Halsted) | 2603.22583v1 |
| 2026-03-23 | arXiv | VIDEO | core | CataractSAM-2：前节手术分割与可扩展真值标注的领域适配模型 | 2603.21566v1 |
| 2026-03-21 | arXiv | VIDEO | core | 智慧手术室：基于AI的手术纱布计数系统 | 2603.20752v1 |
| 2026-03-20 | arXiv | METHOD | core | Chain-of-Adaptation：基于强化学习的手术视觉-语言适配 | 2603.20116v1 |
| 2026-03-20 | arXiv | INTRAOP | core | 内镜相机位姿恢复的策略式建模研究 | 2603.20045v1 |
| 2026-03-20 | arXiv | VIDEO | core | PanORama：手术室多视角一致的全景分割 | 2603.19920v1 |
| 2026-03-19 | arXiv | VIDEO | core | SCISSR：涂鸦条件的交互式手术分割与精化 | 2603.18544v1 |
| 2026-03-19 | arXiv | ROBOT | core | SutureFormer：在像素空间经目标条件离线强化学习学习手术轨迹 | 2603.26720v3 |
| 2026-03-19 | International Journal of Surgery | FM | peripheral | 深度学习提升儿童髋部骨折检测：多中心验证与临床阅片研究 | 10.1097/js9.0000000000005138 |
| 2026-03-18 | International Journal of Surgery | FM | peripheral | 评论：基于CT内脏脂肪组织影像组学特征预测NMIBC早期复发的多中心队列研究 | 10.1097/js9.0000000000005108 |
| 2026-03-18 | arXiv | TRIAGE | core | 部署与评估一款EHR集成、LLM驱动的手术患者分诊工具 | 2603.17234v1 |
| 2026-03-18 | International Journal of Surgery | FM | peripheral | 关于“深度学习提取CT体成分作为局部晚期胃癌预后生物标志物”临床转化的读者来信 | 10.1097/js9.0000000000005122 |
| 2026-03-17 | International Journal of Surgery | DIAG | core | 术前识别病理高危因素优化肺腺癌手术决策：深度学习模型的回顾性开发与前瞻性验证 | 10.1097/js9.0000000000005084 |
| 2026-03-17 | International Journal of Surgery | OUTCOME | core | 从预测到协作：将机器学习定位为术后感染预防中护理风险评估的决策支持工具 | 10.1097/js9.0000000000005065 |
| 2026-03-17 | International Journal of Surgery | FM | peripheral | 评论：AI辅助临床影像检测口腔潜在恶性病变与口腔癌诊断准确性的系统综述与meta分析 | 10.1097/js9.0000000000005051 |
| 2026-03-17 | arXiv | INTRAOP | core | Patient4D：从单目手术室视频恢复时序一致的患者体表网格 | 2603.17178v1 |
| 2026-03-17 | arXiv | LLM | core | SurgΣ：面向手术智能的大规模多模态数据与基础模型谱系 | 2603.16822v1 |
| 2026-03-17 | arXiv | OUTCOME | core | 基于OneFlorida+联盟多中心数据的联邦学习预测重大术后并发症 | 2603.16723v1 |
| 2026-03-17 | arXiv | INTRAOP | core | 语音引导的具身智能体：视频导航颅底外科交互系统 | 2603.16024v2 |
| 2026-03-17 | npj Digital Medicine | INTRAOP | core | AI驱动的无标记拉曼光谱组学用于术中脊柱肿瘤评估（SpineXtract） | PMID 41844881 |
| 2026-03-17 | npj Digital Medicine | PLANNING | core | 经极低剂量方案实时重建三维骨模型（SSR-KD） | PMID 41840145 |
| 2026-03-16 | arXiv | TRIAGE | core | 无监督神经网络自动分类医疗转录中的手术紧急程度 | 2604.06214v1 |
| 2026-03-16 | arXiv | FM | peripheral | 基于Vision Transformer的胶囊内镜视频罕见病变检测 | 2603.18045v1 |
| 2026-03-16 | arXiv | ROBOT | core | 手术机器人关节空间路径规划：黎曼流形方法 | 2603.14852v1 |
| 2026-03-16 | npj Digital Medicine | TRANSPLANT | core | 用离线强化学习进行肝移植供受体匹配 | PMID 41840109 |
| 2026-03-15 | arXiv | FM | peripheral | 溃疡性结肠炎内镜评分的多模态数据集与基准 | 2603.14559v1 |
| 2026-03-13 | arXiv | METHOD | core | SAW：面向可控可扩展视频生成的手术动作世界模型 | 2603.13024v1 |
| 2026-03-13 | arXiv | VIDEO | core | 通用基础手术动作识别赋能技能评估与视觉-语言模型手术规划 | 2603.12787v1 |
| 2026-03-12 | Nature Communications | FM | peripheral | 机器学习驱动的仿生纤毛设计实现声学微机器人混合操作 | PMID 41820370 |
| 2026-03-12 | arXiv | LLM | core | Surg-R1：可扩展可解释手术决策支持的分层推理基础模型 | 2603.12430v1 |
| 2026-03-12 | arXiv | ROBOT | core | 基于实时渲染与进化优化的手术器械追踪 | 2603.11404v3 |
| 2026-03-11 | Nature Biomedical Engineering | FM | peripheral | 病灶周围神经调控替代脊髓损伤患者丧失的感觉运动功能 | PMID 41813803 |
| 2026-03-10 | International Journal of Surgery | OUTCOME | core | 评论：预测踝关节骨折术后手术部位感染风险的机器学习模型构建效度验证 | 10.1097/js9.0000000000005030 |
| 2026-03-10 | Cell Reports Medicine | DIAG | core | 用于甲状腺结节术前诊断的靶向蛋白质组学检测(ThyroProt) | PMID 41812663 |
| 2026-03-10 | arXiv | PATHOMICS | core | 结直肠癌肝转移术后生存预测的自动化影像组学框架(基于术前MRI) | 2603.10216v1 |
| 2026-03-10 | arXiv | VIDEO | core | TemporalDoRA：面向稳健手术视频问答的时序参数高效微调 | 2603.09696v1 |
| 2026-03-10 | arXiv | VIDEO | core | SurgFed：语言引导的多任务联邦学习用于手术视频理解 | 2603.09496v1 |
| 2026-03-10 | arXiv | VIDEO | core | TopoOR：手术室的统一拓扑场景表示 | 2603.09466v1 |
| 2026-03-09 | arXiv | ROBOT | core | SurgCalib：基于高斯泼溅的机器人辅助微创手术手眼标定 | 2603.08983v1 |
| 2026-03-09 | arXiv | ROBOT | core | 面向自主腹腔镜手术的开源机器人研究平台 | 2603.08490v1 |
| 2026-03-09 | arXiv | INTRAOP | core | 拓展视野：面向增强现实的设备无关手术器械多视图追踪框架 | 2603.07981v1 |
| 2026-03-08 | arXiv | VIDEO | core | 手术视频中的免训练时序目标追踪 | 2603.07839v1 |
| 2026-03-07 | arXiv | FM | peripheral | MedSteer：免训练激活引导的反事实内镜图像合成 | 2603.07066v1 |
| 2026-03-07 | arXiv | ROBOT | core | SSP：联合行为与空间约束优化的安全保证手术策略 | 2603.07032v1 |
| 2026-03-07 | arXiv | VIDEO | core | TrajPred：VLM中面向器械-组织交互识别的轨迹条件联合嵌入预测 | 2603.06999v3 |
| 2026-03-07 | arXiv | METHOD | core | SurgCUT3R：手术场景感知的时序3D表示连续理解 | 2603.06971v1 |
| 2026-03-07 | arXiv | INTRAOP | core | 虚拟术中CT(viCT)：内镜鼻窦手术中组织切除的序贯解剖更新 | 2603.06956v1 |
| 2026-03-06 | Nature Communications | FM | peripheral | 片段组学液体活检实现乳腺癌早期检测、分子分型与淋巴结评估 | PMID 41792156 |
| 2026-03-06 | arXiv | METHOD | core | SurgSync：手术机器人的时间同步多模态数据采集框架与数据集 | 2603.06919v1 |
| 2026-03-06 | arXiv | FM | peripheral | 网络服务质量对机器人远程手术影响的综合分析 | 2603.06824v1 |
| 2026-03-06 | arXiv | LLM | core | SUREON：面向手术推理的基准与视觉-语言模型 | 2603.06570v1 |
| 2026-03-06 | arXiv | PLANNING | core | SurgFormer：支持切除的软组织形变可扩展学习与实时推理 | 2603.06543v1 |
| 2026-03-06 | npj Digital Medicine | OUTCOME | core | 三维时空心脏重建预测急性心梗患者主要不良心血管事件(MACE) | PMID 41792188 |
| 2026-03-06 | npj Digital Medicine | GOV | core | AI与医疗专业人员在外科与介入视频分析中的表现比较：系统综述与荟萃分析 | PMID 41786868 |
| 2026-03-05 | The Lancet Digital Health | PATHOMICS | core | 用于泛癌种淋巴结转移检测的人工智能病理模型(PanCAM):一项含回顾与前瞻验证的多中心诊断研究 | PMID 41792018 |
| 2026-03-05 | arXiv | VIDEO | core | 从阶段定位到智能手术叙事 | 2603.05732v1 |
| 2026-03-05 | arXiv | ANESTH | core | 基于Transformer多标签学习的术中不良事件早期预警 | 2603.05212v2 |
| 2026-03-05 | npj Digital Medicine | DIAG | core | AI超声诊断与分层滤泡性甲状腺肿瘤：多中心研究 | PMID 41781694 |
| 2026-03-04 | arXiv | ROBOT | core | ArthroCut：膝关节置换机器人骨切除的自主策略学习 | 2603.03957v1 |
| 2026-03-04 | arXiv | ROBOT | core | 基于3D空间先验的手术机器人操作学习 | 2603.03798v1 |
| 2026-03-04 | British Journal of Surgery | FM | peripheral | 行星际太空任务中的外科手术 | PMID 41823369 |
| 2026-03-04 | British Journal of Surgery | EDU | core | 用于合成手术培训视频的生成式AI | PMID 41746193 |
| 2026-03-04 | British Journal of Surgery | FM | peripheral | 从术野视频标注中识别非技术技能的新指标 | PMID 41709739 |
| 2026-03-04 | British Journal of Surgery | FM | peripheral | 利益相关方共建的外科赛博计量学(sabermetrics)培训落地框架 | PMID 41664835 |
| 2026-03-03 | International Journal of Surgery | INTRAOP | core | 全直肠系膜切除术(TME)的人工智能实时整体识别模型 | 10.1097/js9.0000000000003816 |
| 2026-03-03 | Nature Communications | FM | peripheral | 生成扩散AI结合非对比MRI无造影剂识别胶质瘤血脑屏障状态 | PMID 41776178 |
| 2026-03-03 | arXiv | METHOD | core | 面向微创手术的置信度感知单目深度估计 | 2603.03571v1 |
| 2026-03-03 | arXiv | METHOD | core | 面向非刚性腹腔手术场景4D重建的Dresden数据集 | 2603.02985v1 |
| 2026-03-03 | arXiv | ROBOT | core | "递剪刀"：无碰撞双臂手术辅助机器人器械递送 | 2603.02553v1 |
| 2026-03-03 | Nature Biomedical Engineering | VIDEO | core | 眼科手术视频基础模型OVFM用于术中识别与导航（离体猪眼验证） | PMID 41776035 |
| 2026-03-03 | npj Digital Medicine | FM | peripheral | 可解释机器学习诊断标准用于儿童腹腔脓毒症的开发与多中心验证（ABSeD） | PMID 41775847 |
| 2026-03-03 | npj Digital Medicine | DIAG | core | 域自适应深度对比网络用于MRI驱动的膀胱癌分类（DADCNet） | PMID 41775791 |
| 2026-03-03 | npj Digital Medicine | TRANSPLANT | core | 单倍体造血干细胞移植结局的可解释AI预后模型开发与刻画 | PMID 41772139 |
| 2026-03-02 | arXiv | OUTCOME | core | PreSight：基于区域先验形态测量与患者特异加权的帕金森病手术术前结局预测 | 2603.01948v1 |
| 2026-03-02 | arXiv | PLANNING | core | AutoFFS：面向面部女性化手术规划的对抗形变 | 2603.02288v2 |
| 2026-03-02 | arXiv | INTRAOP | core | 潜变量锚定对应约束的腹腔镜手术术前-术中肝脏配准 | 2603.01720v1 |
| 2026-03-01 | JAMA Surgery | GOV | core | 术中人工智能干预的期望与现实(OR Black Box) | PMID 41533394 |
| 2026-03-01 | JAMA Surgery | GOV | core | 抢先化解外科AI的幻灭低谷 | PMID 41533360 |
| 2026-03-01 | JAMA Surgery | LLM | core | 大语言模型用于预测手术病例时长的适用性 | PMID 41499138 |
| 2026-03-01 | JAMA Surgery | LLM | core | 大语言模型用于预测手术病例时长的适用性——作者回复 | PMID 41499103 |
| 2026-03-01 | arXiv | METHOD | core | GroundedSurg：语言条件手术器械分割的多术式基准 | 2603.01108v1 |
| 2026-02-28 | arXiv | VIDEO | core | Geometry OR Tracker：通用几何化手术室追踪 | 2603.00560v1 |
| 2026-02-27 | arXiv | VIDEO | core | 面向手术机器人的免训练时序分割：多模态最优传输(TASOT) | 2602.24138v2 |
| 2026-02-27 | arXiv | ROBOT | core | 面向手术机器人抓持的无传感器高精度力调控：离线-在线混合强化学习 | 2602.23870v1 |
| 2026-02-27 | arXiv | TRIAGE | core | PREBA：基于PCA加权检索增强LLM与贝叶斯平均的手术时长预测 | 2603.13275v3 |
| 2026-02-27 | arXiv | PLANNING | core | 面向视觉皮层假体的感知感知手术规划与血管规避 | 2603.00362v1 |
| 2026-02-27 | arXiv | FM | peripheral | 人形机器人作为内镜手术的第一助手 | 2602.24156v1 |
| 2026-02-27 | npj Digital Medicine | DIAG | core | 深度学习快速筛查与定位脊髓硬脊膜动静脉瘘以优化临床流程 | PMID 41760890 |
| 2026-02-25 | International Journal of Surgery | DIAG | core | AI辅助综合模型预测浅表食管鳞癌淋巴结转移:一项诊断研究 | PMID 41738619 |
| 2026-02-25 | International Journal of Surgery | FM | peripheral | 关于「AI预测口腔潜在恶性病变切除后复发与恶性进展」一文的评论 | PMID 41738603 |
| 2026-02-25 | International Journal of Surgery | OUTCOME | core | 基于炎症指标综合评估结肠癌术后异时性肝转移风险:多中心前瞻研究 | PMID 41738596 |
| 2026-02-25 | arXiv | INTRAOP | core | EndoDDC：基于扩散深度补全的内镜手术机器人导航稀疏到稠密重建 | 2602.21893v2 |
| 2026-02-25 | arXiv | INTRAOP | core | SurGo-R1：手术视频中操作安全区的上下文推理基准与建模 | 2602.21706v1 |
| 2026-02-24 | arXiv | INTRAOP | core | 多层级几何正则化的单目内镜组织三维重建 | 2602.20718v1 |
| 2026-02-24 | arXiv | VIDEO | core | SurgAtt-Tracker：基于时序候选重排与运动感知细化的在线手术注意力跟踪 | 2602.20636v1 |
| 2026-02-24 | arXiv | ROBOT | core | 策略监督的自主腹腔镜控镜：事件驱动图挖掘 | 2602.20500v1 |
| 2026-02-24 | npj Digital Medicine | PATHOMICS | core | 用深度学习从组织病理图像区分原发与转移性黏液性卵巢癌 | PMID 41735519 |
| 2026-02-23 | International Journal of Surgery | GOV | core | 机器人手术从基于结局的验证走向数据驱动的评价 | PMID 41729691 |
| 2026-02-23 | International Journal of Surgery | FM | peripheral | 整合多组学精化甲状腺癌分子亚型并提升癌症进展预测：回顾性队列研究 | PMID 41728981 |
| 2026-02-23 | International Journal of Surgery | FM | peripheral | 关于「多组学整合机器学习与空间-细胞分析鉴定SASH1为头颈鳞癌预后标志物」一文的评论 | PMID 41729716 |
| 2026-02-23 | The Lancet Digital Health | PATHOMICS | core | 用于高级别浆液性卵巢癌风险分层的端到端分割+影像组学预后模型:一项回顾性多队列研究 | PMID 41735102 |
| 2026-02-23 | Nature Machine Intelligence | INTRAOP | core | 合成X线驱动的微型医疗器械跟踪与控制 | PMID 41757246 |
| 2026-02-21 | arXiv | VIDEO | core | 基于YOLOv10的手术视频手部定位与左右手分类多任务框架 | 2602.18959v1 |
| 2026-02-20 | arXiv | INTRAOP | core | Diff2DGS：基于2D高斯泼溅的遮挡手术场景可靠重建 | 2602.18314v1 |
| 2026-02-20 | npj Digital Medicine | EDU | core | AI增强的显微外科培训：系统综述 | PMID 41721012 |
| 2026-02-19 | International Journal of Surgery | FM | peripheral | GRP75所致耐药肝癌的智能识别与靶向干预:基于影像组学、机器学习与分子药理学 | PMID 41711200 |
| 2026-02-19 | arXiv | OUTCOME | core | 基于临床数据的机器学习预测慢性鼻窦炎手术结局 | 2602.17888v1 |
| 2026-02-19 | arXiv | INTRAOP | core | 深度增强、免有限元的腹腔镜肝脏AR三维-二维配准 | 2602.17517v2 |
| 2026-02-19 | arXiv | INTRAOP | core | 任意相机运动下的单目手术四维重建（Local-EndoGS） | 2602.17473v1 |
| 2026-02-19 | arXiv | ROBOT | core | 附着锚点：结直肠手术腹腔镜抓持点预测的新框架 | 2602.17310v1 |
| 2026-02-19 | arXiv | INTRAOP | core | NRGS-SLAM：基于形变感知3D高斯泼溅的内镜单目非刚性SLAM | 2602.17182v1 |
| 2026-02-19 | arXiv | VIDEO | core | Cholec80-port：面向鲁棒手术场景理解的几何一致套管口分割数据集 | 2602.17060v1 |
| 2026-02-19 | npj Digital Medicine | LLM | core | 大语言模型用于阴道穹窿脱垂手术治疗的系统综述与荟萃分析 | PMID 41714807 |
| 2026-02-19 | Annals of Surgery | DIAG | core | 基于人工智能的自动化无创烧伤诊断系统：AMBUSH-AI | PMID 41709317 |
| 2026-02-18 | International Journal of Surgery | FM | peripheral | 生成式人工智能在医疗中的应用:文献计量分析 | PMID 41706636 |
| 2026-02-18 | International Journal of Surgery | OUTCOME | core | 预测穿孔性消化性溃疡术后不良事件的机器学习模型:二次队列研究 | PMID 41706610 |
| 2026-02-18 | arXiv | VIDEO | core | SurgFusion-Net：面向手术技能评估的多样化自适应多模态融合网络 | 2603.00108v1 |
| 2026-02-18 | arXiv | ROBOT | core | 内镜连续体机械臂的无标记6D位姿估计与位置视觉伺服 | 2602.16365v1 |
| 2026-02-18 | npj Digital Medicine | GOV | core | 计算机视觉在血管外科中的应用：系统综述与批判性评价 | PMID 41708923 |
| 2026-02-17 | arXiv | INTRAOP | core | NeRFscopy：面向内镜活体时变组织的神经辐射场 | 2602.15775v1 |
| 2026-02-16 | arXiv | ROBOT | core | 腔内场景的实时单目二维/三维感知以控制柔性机器人内镜器械 | 2602.14666v1 |
| 2026-02-16 | npj Digital Medicine | FM | peripheral | 跨模态域泛化学习桥接乳腺X线与病理的乳腺癌诊断框架 | PMID 41699055 |
| 2026-02-16 | npj Digital Medicine | OUTCOME | core | 融合结构化数据与临床文本的房颤消融术后复发预测深度学习模型 | PMID 41699044 |
| 2026-02-16 | npj Digital Medicine | OUTCOME | core | AI冠脉血运重建临床决策支持系统的卫生经济学仿真建模 | PMID 41699068 |
| 2026-02-15 | arXiv | INTRAOP | core | ARport：机器人手术无标记影像引导端口放置的增强现实系统 | 2602.14153v1 |
| 2026-02-14 | arXiv | METHOD | core | 机器人手术器械分割的合成数据集生成与验证 | 2602.13844v1 |
| 2026-02-14 | arXiv | INTRAOP | core | RGA-Net：基于互易注意力的机器人手术系统视觉增强框架 | 2602.13726v1 |
| 2026-02-14 | arXiv | VIDEO | core | ZEN：跨术式术中理解的可泛化基础模型 | 2602.13633v1 |
| 2026-02-13 | npj Digital Medicine | FM | peripheral | 解剖引导视觉提示微调的跨模态乳腺癌理解 | PMID 41688744 |
| 2026-02-12 | International Journal of Surgery | OUTCOME | core | 基于临床与影像特征预测创伤性脑损伤去骨瓣减压术后血肿扩大或再出血的可解释机器学习模型 | PMID 41677336 |
| 2026-02-12 | International Journal of Surgery | FM | peripheral | 机器人辅助胸腔镜手术全球研究趋势:2000-2025多维分析 | PMID 41677330 |
| 2026-02-12 | arXiv | METHOD | core | MiDAS：机器人辅助微创手术的多模态数据采集系统与数据集 | 2602.12407v2 |
| 2026-02-12 | npj Digital Medicine | FM | peripheral | 文本引导闭环框架用于肺癌病灶分割与量化 | PMID 41680279 |
| 2026-02-11 | arXiv | VIDEO | core | 面向密集手术器械计数的Chain-of-Look空间推理 | 2602.11024v1 |
| 2026-02-10 | arXiv | VIDEO | core | 面向视频的腹腔镜技能分析与评估基准(LASANA) | 2602.09927v1 |
| 2026-02-09 | arXiv | VIDEO | core | 多任务仿真中基于学习的手术凝视感知模型的数据中心设计 | 2602.09259v2 |
| 2026-02-09 | arXiv | VIDEO | core | 基础模型下VLM引导迭代细化的手术图像分割(IR-SIS) | 2602.09252v1 |
| 2026-02-09 | arXiv | GOV | core | 影像引导神经外科脑变形数据驱动配准与建模：系统综述 | 2602.10155v3 |
| 2026-02-09 | npj Digital Medicine | FM | peripheral | 预测心内膜心肌活检诊断产出的机器学习评分 | PMID 41663558 |
| 2026-02-07 | npj Digital Medicine | PLANNING | core | 几何深度学习快速预测左心室心脏激动：迈向心脏再同步治疗规划 | PMID 41654658 |
| 2026-02-06 | arXiv | VIDEO | core | CauCLIP：因果启发视觉语言建模弥合手术视频理解的仿真-真实鸿沟 | 2602.06619v1 |
| 2026-02-06 | arXiv | FM | peripheral | 面向颈椎手术的增强型R-CUBE机构优化 | 2602.15886v1 |
| 2026-02-06 | arXiv | FM | peripheral | 客观腹腔镜训练评估的集成运动跟踪装置(IMTD)：研制与验证 | 2602.15885v1 |
| 2026-02-06 | arXiv | FM | peripheral | 辅助颈椎手术的协同操作机器人系统初步实验反馈 | 2602.06541v1 |
| 2026-02-06 | npj Digital Medicine | PLANNING | core | 物理约束图神经网络实时预测颅内动脉瘤血流动力学 | PMID 41652107 |
| 2026-02-05 | arXiv | VIDEO | core | SurgMotion：面向手术视频通用理解的视频原生基础模型 | 2602.05638v3 |
| 2026-02-04 | npj Digital Medicine | VIDEO | core | 面向智能手术的大规模自监督手术视频基础模型 | PMID 41639385 |
| 2026-02-03 | International Journal of Surgery | DIAG | core | 评“基于超声的深度学习生境影像组学预测甲状腺癌术前进展与术后复发风险的多中心研究” | PMID 41632014 |
| 2026-02-03 | International Journal of Surgery | LLM | core | 大语言模型简化前列腺癌病理报告的比较评估：ChatGPT与Gemini | PMID 41632012 |
| 2026-02-03 | International Journal of Surgery | DIAG | core | 基于TabPFN与AI直方图特征的IA期肺腺癌亚型三分类：多中心回顾队列 | PMID 41632008 |
| 2026-02-03 | International Journal of Surgery | PLANNING | core | 数字孪生辅助手术：技术架构、跨手术阶段整合、实施挑战与未来方向（综述） | PMID 41632007 |
| 2026-02-03 | International Journal of Surgery | FM | peripheral | 对“食管鳞癌颈部淋巴结转移预测建模”评论的回应 | PMID 41632005 |
| 2026-02-03 | arXiv | INTRAOP | core | 从术前到术中MRI：预测癫痫外科颞叶切除的脑移位 | 2602.03785v1 |
| 2026-02-03 | arXiv | ROBOT | core | 面向内镜黏膜下剥离的解耦双段连续体机器人深度学习控制 | 2602.03406v1 |
| 2026-02-03 | arXiv | FM | peripheral | 内镜肺动脉血栓内膜切除的多功能机器人化手术剥离器：临床前研究 | 2602.03147v1 |
| 2026-02-02 | arXiv | VIDEO | core | 手术室多视角视频的自监督无标定匿名化 | 2602.02850v2 |
| 2026-02-02 | arXiv | FM | peripheral | 基于物理的多层角膜OCT数据生成用于AI诊断与手术引导 | 2602.02755v1 |
| 2026-02-02 | npj Digital Medicine | FM | peripheral | 域对齐证据引导的脑肿瘤MRI联合分割与分类框架 | PMID 41629595 |
| 2026-01-31 | Nature Communications | FM | peripheral | 利用循环祖细胞早期检测异位骨化中的异常细胞命运与修复 | PMID 41620424 |
| 2026-01-31 | npj Digital Medicine | FM | peripheral | 上下文与频率引导的Mamba医学图像分割网络 | PMID 41620524 |
| 2026-01-30 | arXiv | FM | peripheral | EndoCaver：内镜图像联合去模糊-分割以应对雾/模糊/眩光 | 2601.22537v1 |
| 2026-01-30 | The Lancet Digital Health | TRIAGE | core | AI预测创伤患者院前输血需求:一项多国注册库回顾性机器学习开发与验证研究 | PMID 41620321 |
| 2026-01-30 | npj Digital Medicine | PATHOMICS | core | 多模态AI解码ERS-CAF免疫调控轴及其泛癌预后与疗效预测价值 | PMID 41617967 |
| 2026-01-29 | International Journal of Surgery | DIAG | core | 整合自动体积体成分分析的可解释AI预测胃肠胰神经内分泌肿瘤病理分级：多中心队列 | PMID 41609392 |
| 2026-01-29 | International Journal of Surgery | OUTCOME | core | 深度学习分析创伤中REBOA与复苏性开胸术的生存结局：韩国全国队列 | PMID 41609386 |
| 2026-01-29 | arXiv | ROBOT | core | 面向手术抓持与牵拉的监督式混合专家(MoE) | 2601.21971v2 |
| 2026-01-28 | International Journal of Surgery | FM | peripheral | 数字化辅助手术下颌成釉细胞瘤切除的更小安全外科边界 | PMID 41601351 |
| 2026-01-28 | International Journal of Surgery | PATHOMICS | core | 基于机器学习的转录组标志预测T1期结直肠癌根治性切除后复发：多中心回顾队列(Tw1CE) | PMID 41604539 |
| 2026-01-28 | International Journal of Surgery | FM | peripheral | 来信：人工智能预测新辅助化疗结局的临床视角 | PMID 41601362 |
| 2026-01-28 | International Journal of Surgery | FM | peripheral | 评“深度学习增强MRI影像组学预测头颈鳞癌对新辅助化免疫治疗的病理反应” | PMID 41601333 |
| 2026-01-27 | arXiv | FM | peripheral | 面向三维手术规划与可视化的协同扩展现实原型 | 2601.19303v1 |
| 2026-01-27 | npj Digital Medicine | FM | peripheral | 提示-Mamba滤波网络用于腹部CT肝细胞癌病灶分割 | PMID 41593314 |
| 2026-01-26 | International Journal of Surgery | ROBOT | core | 胸外科自主手术机器人时代：即将到来了吗？ | PMID 41427538 |
| 2026-01-26 | International Journal of Surgery | FM | peripheral | 个体化机器人导航结合多模态影像的双束后交叉韧带重建新方法 | PMID 41586624 |
| 2026-01-26 | International Journal of Surgery | OUTCOME | core | 可解释多模态机器学习预测胰腺导管腺癌根治性切除后早期复发 | PMID 41586629 |
| 2026-01-26 | International Journal of Surgery | FM | peripheral | 评“TEVAR治疗B型主动脉夹层30天死亡率预测模型的回顾队列开发与内部验证” | PMID 41586620 |
| 2026-01-26 | International Journal of Surgery | OUTCOME | core | 评“MRI影像组学与临床特征模型预测腰椎间盘突出术后功能结局的多中心回顾研究” | PMID 41586605 |
| 2026-01-26 | International Journal of Surgery | OUTCOME | core | CT影像组学列线图预测肾癌部分肾切除术后早期肾功能下降：多中心开发/验证 | PMID 41586593 |
| 2026-01-26 | International Journal of Surgery | GOV | core | 就“机器学习预测结直肠手术后并发症作用的系统综述与meta分析”致编辑的来信 | PMID 41586587 |
| 2026-01-26 | International Journal of Surgery | GOV | core | 应对AI用于组织病理生长模式分类临床落地的实际挑战 | PMID 41586582 |
| 2026-01-26 | arXiv | METHOD | core | 深度在手术视觉基础模型中的作用：RGB-D预训练的实证研究 | 2601.18929v1 |
| 2026-01-26 | npj Digital Medicine | DIAG | core | 多模态数字活检术前预测胃癌隐匿性腹膜转移 | PMID 41588105 |
| 2026-01-26 | Nature Biomedical Engineering | METHOD | core | Xeno-learning：跨物种知识迁移用于深度学习光谱手术影像分析 | PMID 41588072 |
| 2026-01-24 | arXiv | GOV | core | 择期脊柱手术住院时长的预测建模：十年系统综述 | 2602.02517v1 |
| 2026-01-23 | International Journal of Surgery | OUTCOME | core | 深度学习衍生CT体成分在局部进展期胃癌中超越TNM的生存风险分层：多模态队列 | PMID 41570290 |
| 2026-01-23 | npj Digital Medicine | FM | peripheral | 解剖约束注意力多模态深度学习从全景片筛查MRI可检出的颞下颌关节异常 | PMID 41577795 |
| 2026-01-23 | arXiv | VIDEO | core | 评估大型视觉-语言模型用于手术器械检测 | 2601.16895v1 |
| 2026-01-23 | arXiv | FM | peripheral | 精选内镜逆行胰胆管造影(ERCP)图像数据集 | 2601.16759v1 |
| 2026-01-22 | npj Digital Medicine | FM | peripheral | 脑深部电刺激期间个性化有监督与无监督颅内睡眠解码 | PMID 41571940 |
| 2026-01-22 | arXiv | VIDEO | core | 面向手术中3D手部姿态估计的多视角流程与基准数据集 | 2601.15918v1 |
| 2026-01-21 | International Journal of Surgery | FM | peripheral | 对《多模态放射病理组学预测胃癌预后与免疫治疗反应》的评论 | PMID 41563879 |
| 2026-01-21 | International Journal of Surgery | DIAG | core | 基于影像预测肝细胞癌转化治疗的持久获益：对外科决策的意义 | PMID 41563037 |
| 2026-01-21 | International Journal of Surgery | LLM | core | 评“大语言模型能否辅助耐药癫痫术前致痫区定位？多源文本分析性能研究” | PMID 41563393 |
| 2026-01-21 | International Journal of Surgery | GOV | core | 机器学习预测胆囊癌转移中的一项关键方法学考量 | PMID 41563356 |
| 2026-01-21 | International Journal of Surgery | FM | peripheral | 评“预测活体供肾移植后早期肾功能的术前列线图与网络化临床决策支持系统” | PMID 41563315 |
| 2026-01-21 | International Journal of Surgery | FM | peripheral | 多组学整合干性相关病理特征指导葡萄膜黑色素瘤预后与治疗 | PMID 41563241 |
| 2026-01-21 | International Journal of Surgery | FM | peripheral | 就“基于深度学习算法辅助诊断男性神经源性下尿路功能障碍”致编辑的来信 | PMID 41563027 |
| 2026-01-21 | npj Digital Medicine | OUTCOME | core | 因果可解释机器学习用于颅骨成形术后风险预测与手术决策支持 | PMID 41566002 |
| 2026-01-21 | npj Digital Medicine | FM | peripheral | PrysmNet：显著性与多模态引导的可复现跨域息肉分割系统 | PMID 41565973 |
| 2026-01-21 | International Journal of Surgery | OUTCOME | core | 机器学习模型预测胰腺导管腺癌与腺鳞癌术后生存 | PMID 41417942 |
| 2026-01-21 | arXiv | ROBOT | core | 基于学习-仿真的多臂腹腔镜手术机器人碰撞感知最小距离估计 | 2601.15459v2 |
| 2026-01-21 | arXiv | FM | peripheral | 达芬奇手术机器人的实时手眼标定 | 2601.14871v2 |
| 2026-01-21 | arXiv | INTRAOP | core | LiNUS：面向实时DBS手术的深部脑核团轻量化自动分割 | 2601.14793v1 |
| 2026-01-20 | International Journal of Surgery | FM | peripheral | 对《多模态放射病理组学预测胃癌预后与免疫治疗反应》的评论 | PMID 41556192 |
| 2026-01-20 | International Journal of Surgery | OUTCOME | core | 评“多模态深度学习预测非心脏手术后主要不良心脑血管事件” | PMID 41563071 |
| 2026-01-20 | International Journal of Surgery | PATHOMICS | core | 评“内脏脂肪CT影像组学特征预测NMIBC早期复发的多中心队列研究” | PMID 41562639 |
| 2026-01-20 | International Journal of Surgery | OUTCOME | core | 评“33579例尿路结石：成分、共病、季节变化及基于机器学习的尿脓毒症预测的新模式” | PMID 41556911 |
| 2026-01-20 | npj Digital Medicine | FM | peripheral | 临床引导模型还是基础模型？从电子病历预测颈椎病性脊髓病 | PMID 41559180 |
| 2026-01-20 | International Journal of Surgery | INTRAOP | core | 语义分割深度学习模型提升微创子宫切除术中术者的器官识别 | PMID 41427529 |
| 2026-01-20 | arXiv | ROBOT | core | 面向机器人腹腔镜手术安全触觉反馈的学习型力感知与阻抗匹配 | 2601.14445v2 |
| 2026-01-20 | arXiv | OUTCOME | core | LLM增强的可干预多模态适配器用于肺癌手术术后并发症预测 | 2601.14154v1 |
| 2026-01-20 | arXiv | OUTCOME | core | 谁能从鼻窦手术获益？对比生成式AI与监督机器学习预测慢性鼻窦炎手术结局 | 2601.13710v2 |
| 2026-01-20 | arXiv | EDU | core | 自回归深度学习用于虚拟神经外科软组织动力学实时仿真 | 2601.13676v1 |
| 2026-01-19 | npj Digital Medicine | PATHOMICS | core | UroFusion-X：泌尿系肿瘤诊断、分型与预后的统一多模态深度学习框架 | PMID 41554842 |
| 2026-01-19 | International Journal of Surgery | FM | peripheral | 人工智能在消化内镜中的应用：全球临床试验分析 | PMID 41556172 |
| 2026-01-19 | International Journal of Surgery | DIAG | core | 基于CT深度学习影像组学与基因组学的上皮性卵巢癌术前分期预测模型 | PMID 41556167 |
| 2026-01-19 | arXiv | EDU | core | 融合虚拟现实与大语言模型的手术室团队非技术技能训练与评估 | 2601.13406v1 |
| 2026-01-18 | arXiv | VIDEO | core | CurConMix+：分层手术工作流理解的统一时空框架 | 2601.12312v1 |
| 2026-01-18 | arXiv | VIDEO | core | 动则显要：基于运动的指代式手术器械分割 | 2601.12224v1 |
| 2026-01-17 | npj Digital Medicine | LLM | core | 微信端GPT-4人工智能助手用于骨科术后护理的随机对照试验 | PMID 41548028 |
| 2026-01-17 | arXiv | VIDEO | core | 机器人手术缝合的模型选择与实时技能评估 | 2601.12012v1 |
| 2026-01-15 | arXiv | GOV | core | SurgGoal：以目标可满足性重思手术规划评估 | 2601.10455v1 |
| 2026-01-14 | npj Digital Medicine | FM | peripheral | 多中心可解释AI从PET生物标志物诊断冠心病 | PMID 41535345 |
| 2026-01-14 | arXiv | FM | peripheral | 无配对组级知识蒸馏用于白光内镜胃肠病变鲁棒分类 | 2601.09209v1 |
| 2026-01-13 | Nature Communications | FM | peripheral | 超弹性碲基热电涂层用于三模态微传感触觉内窥镜 | PMID 41530175 |
| 2026-01-13 | International Journal of Surgery | OUTCOME | core | 面向多模态外科风险评估的12导联心电图动态图表示 | PMID 41537399 |
| 2026-01-13 | International Journal of Surgery | FM | peripheral | 对《基于CT的瘤内与瘤周异质性预测食管鳞癌新辅助化免疫治疗后病理反应》的评论 | PMID 41537386 |
| 2026-01-13 | npj Digital Medicine | ROBOT | core | 预测性数字孪生同步增强远程机器人手术安全的时延补偿框架 | PMID 41530256 |
| 2026-01-13 | International Journal of Surgery | OUTCOME | core | 评述：机器学习模型预测胃腺癌全胃/近端胃切除术后吻合口漏的多中心前瞻验证 | PMID 41549839 |
| 2026-01-13 | International Journal of Surgery | DIAG | core | 来信：自监督学习融合平扫与增强CT术前识别坏疽性胆囊炎 | PMID 41549837 |
| 2026-01-13 | International Journal of Surgery | FM | peripheral | 来信：如何衡量AI辅助支气管镜诊断的真正价值 | PMID 41549827 |
| 2026-01-13 | International Journal of Surgery | PATHOMICS | core | 深度学习影像组学与机器学习拓展IDH野生型胶质母细胞瘤最大安全切除术后的预后评估 | PMID 41537390 |
| 2026-01-13 | International Journal of Surgery | FM | peripheral | 来信：临床决策支持系统在真实世界围手术期照护中的结局（系统综述） | PMID 41537341 |
| 2026-01-13 | International Journal of Surgery | PLANNING | core | 迈向数字孪生赋能的围手术期照护：拓展多模态深度学习用于心血管风险分层 | PMID 41537304 |
| 2026-01-13 | International Journal of Surgery | FM | peripheral | 评述：33579例泌尿系结石成分/共病/季节规律与机器学习尿脓毒症预测 | PMID 41532477 |
| 2026-01-13 | International Journal of Surgery | FM | peripheral | 人工智能与肺结节研究的交汇：现状与前景（综述） | PMID 41428992 |
| 2026-01-12 | International Journal of Surgery | TRANSPLANT | core | 深度学习增强的近红外高光谱成像定量评估肝缺血再灌注损伤与脂肪变 | PMID 41532427 |
| 2026-01-12 | International Journal of Surgery | OUTCOME | core | 血浆蛋白质组标志物预测炎症性肠病肠切除风险 | PMID 41427536 |
| 2026-01-10 | npj Digital Medicine | FM | peripheral | 结构感知多任务学习与域泛化的脊柱CT椎体分析 | PMID 41520072 |
| 2026-01-10 | npj Digital Medicine | TRANSPLANT | core | KT-LLM：证据锚定与序列文本的可审计肾移植建模框架 | PMID 41520040 |
| 2026-01-10 | npj Digital Medicine | DIAG | core | 深度学习对CTA上肾下腹主动脉瘤的容积分析 | PMID 41519965 |
| 2026-01-10 | arXiv | FM | peripheral | 上呼吸消化道显微手术的机器人遥操作系统：设计与验证 | 2601.06617v3 |
| 2026-01-09 | arXiv | FM | peripheral | 基于深度学习的胰腺肿瘤分割模型在公开超声内镜数据集上的性能 | 2601.05937v1 |
| 2026-01-08 | Nature Communications | OUTCOME | core | 围手术期替雷利珠单抗联合仑伐替尼治疗高复发风险可切除肝癌的单臂II期试验 | PMID 41501032 |
| 2026-01-07 | International Journal of Surgery | FM | peripheral | 对“双层光谱探测器CT评分系统无创评估胃癌TP53表达及辅助化疗反应”的评论 | PMID 41427556 |
| 2026-01-07 | npj Digital Medicine | FM | peripheral | 条件StyleGAN增强训练改善息肉检测泛化 | PMID 41501444 |
| 2026-01-07 | npj Digital Medicine | LLM | core | 大语言模型用于术前与出院教育有效性的系统综述 | PMID 41501337 |
| 2026-01-07 | npj Digital Medicine | FM | peripheral | EvoMDT：多癌种结构化临床决策的自进化多智能体系统 | PMID 41501128 |
| 2026-01-07 | International Journal of Surgery | DIAG | core | 融合临床-病理-内镜数据的深度学习模型改进早期胃癌淋巴结转移预测 | PMID 41536186 |
| 2026-01-07 | International Journal of Surgery | FM | peripheral | 机器人辅助手术培训的全球研究图景：35年文献计量与可视化分析 | PMID 41524090 |
| 2026-01-07 | International Journal of Surgery | FM | peripheral | 医学数字孪生：引领青光眼诊疗范式变革及其拓展 | PMID 41504514 |
| 2026-01-07 | International Journal of Surgery | PATHOMICS | core | 整合多组学与影像基因组学解析NNK相关胰腺癌肿瘤重塑与预后分层 | PMID 41504500 |
| 2026-01-07 | arXiv | PLANNING | core | 从术前CT到乳突切除后网格构建：人工耳蜗手术乳突切除形状预测 | 2601.04405v2 |
| 2026-01-06 | npj Digital Medicine | FM | peripheral | 医学整体AI(xHAIM)：提升性能与可解释性 | PMID 41495177 |
| 2026-01-06 | arXiv | ROBOT | core | 基于合成数据的强化学习用于跟随领导者式机器人内镜导航 | 2601.02798v1 |
| 2026-01-05 | arXiv | PLANNING | core | PhysSFI-Net：正颌手术结局预测的物理引导骨-面交互几何学习 | 2601.02088v2 |
| 2026-01-04 | arXiv | EDU | core | 面向高保真感知优化触觉手术仿真的Koopman-贝叶斯框架 | 2602.15834v1 |
| 2026-01-03 | npj Digital Medicine | FM | peripheral | 拓扑保持嵌入网络用于儿科X线PICC分割 | PMID 41484168 |
| 2026-01-02 | Nature Medicine | INTRAOP | core | 生成式AI低剂量数字减影血管造影用于术中辐射剂量降低（随机对照试验） | PMID 41482562 |
| 2026-01-02 | Nature Medicine | FM | peripheral | 通过脂肪组织-微生物组互作对代谢型肥胖的多组学定义 | PMID 41482560 |
| 2026-01-01 | JAMA Surgery | GOV | core | 负责任地发展外科人工智能 | PMID 41191350 |
| 2026-01-01 | NEJM AI | TRIAGE | core | 运用人工智能辅助外科出院的可行性案例研究 | 10.1056/aics2401132 |
| 2025-12-31 | npj Digital Medicine | PATHOMICS | core | 内镜-影像组学与临床数据的深度多模态状态空间融合用于结直肠癌生存预测 | PMID 41476131 |
| 2025-12-31 | npj Digital Medicine | FM | peripheral | 放射学中大型推理模型对结论进行推理的诊断与解读增益 | PMID 41476119 |
| 2025-12-31 | npj Digital Medicine | DIAG | core | 3D深度学习量化胰腺癌血管侵犯的临床验证研究（PAN-VIQ） | PMID 41476122 |
| 2025-12-31 | npj Digital Medicine | DIAG | core | 基于深度学习的CBCT上颌窦自动分割与骨移植分析（SA-ai） | PMID 41469515 |
| 2025-12-31 | Annals of Surgery | FM | peripheral | 血浆游离DNA甲基化组用于肝细胞癌检出与肝切除/移植术后监测 | PMID 41469893 |
| 2025-12-30 | arXiv | VIDEO | core | 基于动作识别的AI手术技能评估 | 2512.24411v1 |
| 2025-12-30 | arXiv | VIDEO | core | 基于运动学的显微吻合手术动作评估 | 2512.23942v1 |
| 2025-12-30 | npj Digital Medicine | FM | peripheral | GLANCE：全局-局部持续交换与共识融合的肺结节稳健分割 | PMID 41469800 |
| 2025-12-29 | arXiv | VIDEO | core | 弥合离体到活体差距：镜面手术环境单目深度估计的合成先验 | 2512.23786v2 |
| 2025-12-29 | arXiv | ROBOT | core | Cosmos-H-Surgical：通过世界建模从视频学习手术机器人策略 | 2512.23162v4 |
| 2025-12-29 | npj Digital Medicine | PATHOMICS | core | 可解释多模态深度学习提升肝内胆管癌术后风险分层（多中心） | PMID 41466129 |
| 2025-12-28 | npj Digital Medicine | FM | peripheral | ScarElastic：以连续弹性场建模的LGE-CMR心肌瘢痕勾画 | PMID 41457104 |
| 2025-12-27 | npj Digital Medicine | FM | peripheral | 整合HSP90α的人工智能个体化预测不可切除肝癌TACE获益与生存 | PMID 41454159 |
| 2025-12-26 | arXiv | VIDEO | core | 面向实时脊柱内镜实例分割的轻量多尺度注意力框架 | 2512.21984v1 |
| 2025-12-26 | npj Digital Medicine | INTRAOP | core | 云端实时人工智能检测结直肠肿瘤的随机对照试验（EAGLE） | PMID 41449203 |
| 2025-12-24 | arXiv | VIDEO | core | 面向实时手术场景分割的脉冲驱动视频Transformer与脉冲感知预训练 | 2512.21284v2 |
| 2025-12-24 | npj Digital Medicine | FM | peripheral | 商用深度学习颅内出血检测模型的真实世界性能评估 | PMID 41444826 |
| 2025-12-24 | British Journal of Surgery | GOV | core | 为何欧盟亟需制定安全落地手术AI的指南 | PMID 41604495 |
| 2025-12-22 | arXiv | FM | peripheral | SlicerOrbitSurgerySim：预成型眶板虚拟配准与定量比较的开源平台 | 2512.19534v1 |
| 2025-12-22 | arXiv | VIDEO | core | DSTED：解耦时序稳定化与判别增强的手术工作流识别 | 2512.19387v1 |
| 2025-12-22 | npj Digital Medicine | FM | peripheral | 无需钆对比剂的深度学习非增强MRI诊断鼻咽癌端到端方案 | PMID 41430426 |
| 2025-12-20 | arXiv | VIDEO | core | EndoStreamDepth：面向内镜视频流的时序一致单目深度估计 | 2512.18159v2 |
| 2025-12-20 | npj Digital Medicine | DIAG | core | 可解释深度学习从CT进行多中心胃癌T分期 | PMID 41422179 |
| 2025-12-20 | npj Digital Medicine | DIAG | core | 少样本视觉-语言三分类模型从胸部CT预测肺腺癌侵袭性 | PMID 41422131 |
| 2025-12-19 | International Journal of Surgery | FM | peripheral | 局部与全局整合Ki67分析用于高级别神经内分泌肿瘤的预后分层与治疗指导：多中心验证研究 | PMID 41417992 |
| 2025-12-19 | International Journal of Surgery | FM | peripheral | 肾盂成形术失败后微创手术的疗效与危险因素：前瞻性多中心队列研究 | PMID 41417977 |
| 2025-12-19 | International Journal of Surgery | DIAG | core | 深度卷积神经网络自动判读白细胞酯酶试纸辅助诊断假体周围关节感染 | PMID 41417979 |
| 2025-12-19 | International Journal of Surgery | OUTCOME | core | 2.5D深度学习模型优化前列腺癌术后生化复发预测与风险分层 | PMID 41417975 |
| 2025-12-19 | arXiv | ROBOT | core | SurgiPose：从单目视频估计手术器械运动学用于手术机器人学习 | 2512.18068v1 |
| 2025-12-18 | International Journal of Surgery | OUTCOME | core | 深度学习模型辅助下消融与亚肺叶切除治疗IA期非小细胞肺癌的多中心对比 | PMID 41418024 |
| 2025-12-18 | International Journal of Surgery | PATHOMICS | core | AI病理生物学Transformer预测结直肠癌卵巢转移的预后与靶向治疗获益 | PMID 41417976 |
| 2025-12-18 | arXiv | VIDEO | core | Endo-SemiS：面向内镜视频的鲁棒半监督图像分割 | 2512.16977v1 |
| 2025-12-18 | arXiv | VIDEO | core | ReMeDI：用SAM3在手术分割中精化记忆以消歧身份 | 2512.16880v2 |
| 2025-12-17 | International Journal of Surgery | FM | peripheral | SEEG引导射频热凝治疗脑室旁结节样灰质异位相关难治性癫痫：多中心回顾性队列研究 | PMID 41405277 |
| 2025-12-17 | International Journal of Surgery | PATHOMICS | core | 基于Transformer的多模态融合框架整合影像组学与病理组学预测胶质瘤术后认知改善 | PMID 41403361 |
| 2025-12-17 | npj Digital Medicine | GOV | core | 手术场景理解人工智能的系统综述与报告质量荟萃分析 | PMID 41407878 |
| 2025-12-17 | npj Digital Medicine | PATHOMICS | core | 快速多模态成像联合机器学习发现牛磺酸作为乳腺癌切缘评估标志物 | PMID 41402452 |
| 2025-12-17 | International Journal of Surgery | FM | peripheral | 胆囊癌微创手术的结局与安全性:国际多中心队列研究 | PMID 41403280 |
| 2025-12-16 | International Journal of Surgery | FM | peripheral | 脑机接口结合功能性电刺激用于中枢神经损伤患者运动康复 | PMID 41399276 |
| 2025-12-16 | International Journal of Surgery | ROBOT | core | 视网膜下注射的机器人手术技能增强：一种新型半自动系统 | PMID 41399130 |
| 2025-12-16 | International Journal of Surgery | DIAG | core | AI影像组学与深度学习模型革新桥本甲状腺炎背景下甲状腺结节诊断 | PMID 41405348 |
| 2025-12-16 | International Journal of Surgery | GOV | core | AI诊断胎盘植入谱系疾病及预测不良妊娠结局：诊断准确性系统综述与荟萃分析 | PMID 41405278 |
| 2025-12-16 | International Journal of Surgery | VIDEO | core | 来信：深度学习驱动的多层次粒度整合用于手术场景理解 | PMID 41405271 |
| 2025-12-16 | International Journal of Surgery | OUTCOME | core | 机器学习聚类多模态高维围手术期数据揭示心脏外科血流动力学驱动表型 | PMID 41405269 |
| 2025-12-16 | International Journal of Surgery | FM | peripheral | 食管平滑肌瘤形态学分类与机器人经胸腔镜孔道摘除术（边缘：机器人无AI） | PMID 41405266 |
| 2025-12-16 | arXiv | DIAG | core | 人工智能评估晚期卵巢癌诊断性腹腔镜中的腹膜癌病 | 2512.14797v1 |
| 2025-12-16 | arXiv | VIDEO | core | ProtoFlow：以学习型动态场景图原型进行可解释鲁棒手术工作流建模 | 2512.14092v1 |
| 2025-12-16 | npj Digital Medicine | OUTCOME | core | 不稳定骨盆骨折合并颅脑损伤的预后模型与SBP-风险U形关系 | PMID 41402560 |
| 2025-12-16 | International Journal of Surgery | FM | peripheral | 评论「医学中大语言模型ChatGPT的当前关切与未来方向:机器学习驱动的全球文献计量分析」 | PMID 41399866 |
| 2025-12-16 | International Journal of Surgery | FM | peripheral | 关于DeepSeek-R1回答AAOS髋骨关节炎指南相关问题质量评估的来信 | PMID 41399862 |
| 2025-12-16 | International Journal of Surgery | PLANNING | core | 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」的通讯 | PMID 41399324 |
| 2025-12-16 | International Journal of Surgery | VIDEO | core | 融合视频与运动学数据的多模态集成模型用于机器人手术技能自动评估 | PMID 41399175 |
| 2025-12-15 | arXiv | INTRAOP | core | End2Reg：学习任务特定分割用于脊柱手术无标记配准 | 2512.13402v2 |
| 2025-12-15 | npj Digital Medicine | PATHOMICS | core | 随机特征结合多示例学习：深度高斯过程预测结直肠癌MSI | PMID 41398439 |
| 2025-12-15 | npj Digital Medicine | PATHOMICS | core | AI从H&E切片判定结直肠癌MSI/MMR状态的多中心盲法验证 | PMID 41398057 |
| 2025-12-13 | npj Digital Medicine | GOV | core | AI纳入诊疗标准对患者知情同意的法律影响：来自外科的启示 | PMID 41390878 |
| 2025-12-13 | npj Digital Medicine | LLM | core | 隐私保护可本地部署的大模型检测围手术期并发症：LoRA微调策略 | PMID 41390570 |
| 2025-12-12 | International Journal of Surgery | FM | peripheral | TB-MIL：基于组织病理图像的深度学习识别膀胱癌肿瘤突变负荷(TMB)状态 | 10.1097/js9.0000000000004403 |
| 2025-12-12 | arXiv | ROBOT | core | ProbeMDE：不确定性引导的主动本体感觉用于手术机器人单目深度估计 | 2512.11773v4 |
| 2025-12-12 | arXiv | ANESTH | core | 跨样本增强的测试时自适应用于个体化术中低血压预测 | 2512.15762v1 |
| 2025-12-12 | npj Digital Medicine | FM | peripheral | CoreFormer：结构核先验与测地隐式场的高保真肺结节分割 | PMID 41388190 |
| 2025-12-12 | npj Digital Medicine | LLM | core | 大语言模型从非结构化病历检测术后谵妄的疗效：回顾性队列 | PMID 41388138 |
| 2025-12-11 | International Journal of Surgery | OUTCOME | core | 关于“隐私保护联邦学习预测结直肠手术90天死亡率（多中心）”的读者来信 | PMID 41376454 |
| 2025-12-11 | arXiv | INTRAOP | core | 自监督对比嵌入自适应用于内镜图像匹配 | 2512.10379v1 |
| 2025-12-11 | International Journal of Surgery | FM | peripheral | 关于「AI辅助临床影像检测口腔潜在恶性病变与口腔癌诊断准确性:系统综述与荟萃分析」的评论 | PMID 41376448 |
| 2025-12-11 | International Journal of Surgery | INTRAOP | core | 深度学习改进的虚拟支气管镜导航系统用于外周肺病变活检:单中心随机对照试验 | PMID 41376368 |
| 2025-12-11 | International Journal of Surgery | DIAG | core | 整合临床症状的纵向关节间隙影像组学模型提升全膝关节置换预测 | PMID 41376347 |
| 2025-12-11 | International Journal of Surgery | DIAG | core | 基于瘤内异质性评分的机器学习定量预测原发性肺腺癌气腔播散 | PMID 41376342 |
| 2025-12-10 | International Journal of Surgery | FM | peripheral | 基于CT的在线计算器预测可切除肝癌预后及术后辅助TACE获益（多中心） | PMID 41376483 |
| 2025-12-10 | The Lancet Digital Health | PATHOMICS | core | 乳腺癌标签高效计算病理肿瘤浸润淋巴细胞评估(ECTIL):2340例多中心验证 | PMID 41381302 |
| 2025-12-10 | International Journal of Surgery | FM | peripheral | 关于「经数字远程医疗的计算机辅助术前规划治疗四肢关节周围骨折:多中心队列」的评论 | PMID 41376559 |
| 2025-12-10 | International Journal of Surgery | FM | peripheral | 关于「生成式大语言模型用于良性前列腺增生临床决策支持的真实世界可行性」的评论 | PMID 41376556 |
| 2025-12-10 | International Journal of Surgery | FM | peripheral | 关于「基于无监督机器学习CT影像组学亚型无创预测NSCLC免疫治疗疗效」的评论 | PMID 41376552 |
| 2025-12-10 | International Journal of Surgery | GOV | core | 人工智能模型预测胰腺导管腺癌肝转移的诊断效能:系统综述与荟萃分析 | PMID 41376499 |
| 2025-12-10 | International Journal of Surgery | PLANNING | core | 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」临床适用性的来信 | PMID 41376482 |
| 2025-12-10 | International Journal of Surgery | DIAG | core | 基于超声的深度学习生境影像组学预测甲状腺癌术前局部进展与术后复发风险:多中心研究 | PMID 41363706 |
| 2025-12-09 | arXiv | FM | peripheral | 从多相机无影灯生成开放手术无干扰手术视频 | 2512.08577v1 |
| 2025-12-09 | arXiv | VIDEO | core | LapFM：经分层概念演进预训练的腹腔镜分割基础模型 | 2512.08439v1 |
| 2025-12-09 | International Journal of Surgery | OUTCOME | core | 提升术前风险分层:脊柱转移瘤手术ICU入住的可解释机器学习模型 | PMID 41376391 |
| 2025-12-08 | Nature Communications | DIAG | core | 外周血单细胞免疫特征驱动的小侵袭性肺结节精准诊断 | PMID 41360981 |
| 2025-12-08 | International Journal of Surgery | FM | peripheral | 光学与电磁一体化手术导航系统的创新设计与精度：体模与在体研究 | PMID 41346264 |
| 2025-12-08 | Cell Reports Medicine | FM | peripheral | 食管癌个体化新辅助免疫化疗的多模态协同模型(eSPARK) | PMID 41365302 |
| 2025-12-08 | International Journal of Surgery | FM | peripheral | MIRACQ：打破手术室信息壁垒的多通道机器人系统 | PMID 41363255 |
| 2025-12-08 | International Journal of Surgery | INTRAOP | core | 对“增强现实引导对比CT引导经皮肺结节定位（非劣效RCT）”的读者来信 | PMID 41363203 |
| 2025-12-08 | Nature Biomedical Engineering | FM | peripheral | 用隐马尔可夫模型对光标式皮层内脑机接口进行长期无监督再校准 | PMID 41361599 |
| 2025-12-08 | arXiv | GOV | core | 不止分割：在机器人手术中对SAM 3的分割、3D感知与重建基准评测 | 2512.07596v2 |
| 2025-12-08 | arXiv | VIDEO | core | DGGAN：退化引导生成对抗网络用于实时内镜视频增强 | 2512.07253v1 |
| 2025-12-08 | npj Digital Medicine | FM | peripheral | 解剖引导掩码自编码器与域自适应提示（AMAP）用于脑动脉瘤检测与分割 | PMID 41361567 |
| 2025-12-08 | npj Digital Medicine | FM | peripheral | STD-Net：时空解耦网络用于多期相肝脏病灶分割与表征 | PMID 41361359 |
| 2025-12-08 | International Journal of Surgery | LLM | core | 大语言模型能否辅助耐药癫痫术前致痫区定位?多源文本分析性能研究 | PMID 41363150 |
| 2025-12-08 | International Journal of Surgery | FM | peripheral | 「解码黑箱:对深度学习影像组学预测头颈癌新辅助应答的批判性评价」来信 | PMID 41363136 |
| 2025-12-08 | International Journal of Surgery | FM | peripheral | 肿瘤免疫治疗中的影像组学:从有前景模型走向临床现实(通讯) | PMID 41363126 |
| 2025-12-08 | International Journal of Surgery | FM | peripheral | 关于「医学中大语言模型ChatGPT的当前关切与未来方向:机器学习驱动的全球文献计量分析」的来信 | PMID 41363112 |
| 2025-12-08 | International Journal of Surgery | PATHOMICS | core | 关于「深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后预后评估:多中心研究」的评论 | PMID 41363102 |
| 2025-12-08 | International Journal of Surgery | OUTCOME | core | 关于「机器学习预测结直肠手术后并发症的系统综述与荟萃分析:进展几何?」的评论 | PMID 41363091 |
| 2025-12-08 | International Journal of Surgery | OUTCOME | core | 更具选择性的风险分层机器学习肺癌血栓预防方案:VATS肺段切除术后前瞻队列 | PMID 41351270 |
| 2025-12-07 | arXiv | GOV | core | NeuroABench：神经外科解剖识别的多模态评估基准 | 2512.06921v1 |
| 2025-12-06 | npj Digital Medicine | FM | peripheral | 不确定性感知与因果测试时自适应基础模型用于结直肠癌病理诊断 | PMID 41353286 |
| 2025-12-05 | International Journal of Surgery | FM | peripheral | 优化肺腺癌预后建模中计算病理与多转录组学整合的思考：评论 | PMID 41347943 |
| 2025-12-05 | International Journal of Surgery | OUTCOME | core | 多模态深度学习预测非心脏手术后主要不良心脑血管事件(MACCE)——通讯 | PMID 41677095 |
| 2025-12-05 | arXiv | PLANNING | core | NICE：用于正颌手术效果预测的神经隐式颅面模型 | 2512.05920v1 |
| 2025-12-05 | arXiv | LLM | core | 蒸馏专家外科知识：训练本地手术VLM用于完整结肠系膜切除术的解剖讲解 | 2512.05740v1 |
| 2025-12-05 | arXiv | VIDEO | core | 深度先验驱动的免训练腹腔镜手术场景分割 | 2512.05529v1 |
| 2025-12-05 | npj Digital Medicine | PATHOMICS | core | 病理-影像组学与临床数据深度多模态融合提升结直肠癌生存预测 | PMID 41350716 |
| 2025-12-05 | International Journal of Surgery | FM | peripheral | 关于「人工智能工具传播结直肠癌筛查指南的比较分析:早筛教育新视角」的来信 | PMID 41347956 |
| 2025-12-05 | International Journal of Surgery | OUTCOME | core | 关于「预测踝关节骨折手术后手术部位感染风险的机器学习模型构建验证」的评论 | PMID 41347940 |
| 2025-12-05 | International Journal of Surgery | FM | peripheral | 「用于预测HNSCC新辅助化学免疫治疗应答的精细化且合乎伦理的影像组学」来信 | PMID 41347938 |
| 2025-12-04 | arXiv | TRIAGE | core | 不确定性下手术室日内排程的多智能体强化学习 | 2512.04918v1 |
| 2025-12-04 | npj Digital Medicine | OUTCOME | core | 机器学习预测血液透析动静脉通路1年成功临床使用 | PMID 41345783 |
| 2025-12-04 | International Journal of Surgery | OUTCOME | core | 开发并验证预测食管癌术后静脉血栓栓塞的可解释机器学习模型 | PMID 41347287 |
| 2025-12-04 | International Journal of Surgery | FM | peripheral | 医疗场景中的大语言模型ChatGPT:全球规模横断面、基于机器学习的信息学研究 | PMID 41344376 |
| 2025-12-04 | International Journal of Surgery | FM | peripheral | 早发NSCLC的50岁年龄阈值:SEER-TCGA回顾分析揭示基于年龄治疗应答的预后悖论 | PMID 41342688 |
| 2025-12-04 | International Journal of Surgery | DIAG | core | 来信:构建兼具临床基础与生物可解释性的AI模型预测甲状腺乳头状癌淋巴结转移 | PMID 41342461 |
| 2025-12-03 | Nature Communications | FM | peripheral | 促进疾病诊断与医学影像的肺CT视觉基础模型LCTfound | PMID 41339572 |
| 2025-12-03 | International Journal of Surgery | FM | peripheral | 评论：从可行性到精准适应证——增强现实与荧光引导在保实质肝切除中的情境化价值 | PMID 41342518 |
| 2025-12-03 | International Journal of Surgery | FM | peripheral | 影像组学与AI整合用于肝癌个体化治疗的文献计量分析 | PMID 41627427 |
| 2025-12-03 | arXiv | FM | peripheral | 用于观察等待策略随访内镜的直肠肿瘤再生长评估双交叉注意力孪生Transformer | 2512.03883v3 |
| 2025-12-03 | npj Digital Medicine | OUTCOME | core | 整合肿瘤与身体成分CT的Transformer预后特征预测胃癌术后复发 | PMID 41339473 |
| 2025-12-03 | npj Digital Medicine | PATHOMICS | core | 临床知情的中间推理实现有限条件下可泛化的前列腺癌预后判定 | PMID 41339469 |
| 2025-12-03 | International Journal of Surgery | DIAG | core | 关于「基于超声与机器学习改进食管鳞癌颈部淋巴结转移预测」的来信 | PMID 41342648 |
| 2025-12-02 | International Journal of Surgery | OUTCOME | core | MRI影像组学联合临床特征预测腰椎间盘突出症术后功能结局的多中心回顾性研究 | 10.1097/js9.0000000000004135 |
| 2025-12-02 | arXiv | VIDEO | core | 重思手术烟雾：烟雾类型感知的腹腔镜视频去烟方法与数据集 | 2512.02780v1 |
| 2025-12-02 | arXiv | ANESTH | core | TECM*：强化学习方法的数据驱动评估及其在外科脓毒症肝素治疗策略中的应用 | 2512.10973v1 |
| 2025-12-02 | arXiv | INTRAOP | core | G-SHARP：高斯散射硬件加速的实时手术场景重建流水线 | 2512.02482v2 |
| 2025-12-02 | The Lancet Digital Health | DIAG | core | AI影像决策支持用于英格兰急性卒中治疗:一项前瞻性观察研究 | PMID 41339157 |
| 2025-12-02 | npj Digital Medicine | FM | peripheral | 社交辅助机器人对患者参与度与照护质量影响的随机试点研究 | PMID 41331089 |
| 2025-12-02 | npj Digital Medicine | DIAG | core | 基于侵袭弱监督的MRI影像组学识别评估侵袭性垂体神经内分泌肿瘤 | PMID 41331080 |
| 2025-12-01 | JAMA Surgery | FM | peripheral | 基于基因表达谱预测黑色素瘤前哨淋巴结状态(CP-GEP，MERLIN_001) | PMID 41123931 |
| 2025-12-01 | arXiv | VIDEO | core | RobustSurg：面向分布外手术场景分割的域泛化 | 2512.02188v1 |
| 2025-11-28 | npj Digital Medicine | FM | peripheral | 语音处理与大模型增强临床文书：眼科LAOS系统研究 | PMID 41315671 |
| 2025-11-28 | medRxiv/bioRxiv | FM | peripheral | 多重成像结合机器学习实现皮层发育畸形(结节性硬化)的自动化定量 | 10.1101/2025.11.24.690101 |
| 2025-11-28 | Annals of Surgery | OUTCOME | core | 胰十二指肠切除术后胰瘘：影像组学能否改进临床风险评分？ | PMID 41310921 |
| 2025-11-27 | arXiv | PATHOMICS | core | 用基础模型自主标注手术切缘 | 2511.22131v1 |
| 2025-11-27 | medRxiv/bioRxiv | ANESTH | core | 连续多模态AI结合可穿戴生命体征预测普通病房术后并发症 | 10.1101/2025.11.25.25340950 |
| 2025-11-27 | medRxiv/bioRxiv | VIDEO | core | 基于计算机视觉的手术元能力自动化视频分析 | 10.1101/2025.11.24.25340912 |
| 2025-11-27 | npj Digital Medicine | INTRAOP | core | 软性输尿管镜手术中实时肾结石检测AI系统的临床验证（AiFURS） | PMID 41309923 |
| 2025-11-27 | medRxiv/bioRxiv | FM | peripheral | 用人设驱动的大语言模型对儿科信任量表进行合成验证 | 10.1101/2025.11.25.25340922 |
| 2025-11-27 | Annals of Surgery | FM | peripheral | 住院姑息治疗与老年外科患者术后医疗资源利用 | PMID 41299808 |
| 2025-11-26 | NEJM AI | TRIAGE | core | AI引导的手术备血：Smart Match前瞻性验证 | PMID 42245984 |
| 2025-11-26 | Nature Communications | INTRAOP | core | 基于冰冻切片病理的AI增强弥漫中线胶质瘤活检术中决策 | PMID 41298469 |
| 2025-11-26 | arXiv | INTRAOP | core | Endo-G²T：几何引导且时序感知的时间嵌入4D高斯散射内镜场景重建 | 2511.21367v1 |
| 2025-11-26 | arXiv | LLM | core | SurgMLLMBench：面向手术场景理解的多模态大语言模型基准数据集 | 2511.21339v1 |
| 2025-11-26 | Nature Communications | FM | peripheral | 评估肾移植排斥表型谱的连续性指数 | PMID 41298371 |
| 2025-11-26 | npj Digital Medicine | FM | peripheral | 肺癌计算机辅助诊断系统研究进展（综述） | PMID 41299062 |
| 2025-11-25 | arXiv | INTRAOP | core | DeLightMono：解耦不均匀光照增强内镜自监督单目深度估计 | 2511.20058v1 |
| 2025-11-25 | International Journal of Surgery | FM | peripheral | 宫腔镜形态学在子宫内膜癌诊断与生育力保护中的应用(综述) | PMID 41731877 |
| 2025-11-25 | International Journal of Surgery | GOV | core | 人工智能在急诊外科中的应用:前景、陷阱与前行路径(范围综述) | PMID 41706695 |
| 2025-11-25 | International Journal of Surgery | FM | peripheral | DRG支付下PTED与UBE治疗腰椎间盘突出的成本差异 | PMID 41287888 |
| 2025-11-25 | International Journal of Surgery | FM | peripheral | 人工智能在肿瘤影像筛查中的应用（综述） | PMID 41287865 |
| 2025-11-24 | arXiv | VIDEO | core | CataractCompDetect：白内障手术术中并发症检测 | 2511.18968v1 |
| 2025-11-24 | International Journal of Surgery | FM | peripheral | 单孔肋缘下与多孔肋间入路机器人肺叶切除治疗NSCLC对比 | PMID 41287875 |
| 2025-11-24 | npj Digital Medicine | FM | peripheral | 结直肠癌全切片图像的多模态分析（系统综述） | PMID 41286436 |
| 2025-11-24 | medRxiv/bioRxiv | FM | peripheral | 利用口腔微生物组跨大洲预测食管鳞状细胞癌 | 10.1101/2025.11.23.690048 |
| 2025-11-21 | npj Digital Medicine | FM | peripheral | UltraFedFM：联邦自监督预训练的隐私保护超声基础模型 | PMID 41272022 |
| 2025-11-21 | arXiv | ROBOT | core | 看、规划、切割：OCT引导的MPC自主体积式机器人激光手术 | 2511.17777v2 |
| 2025-11-21 | International Journal of Surgery | FM | peripheral | 甘油三酯-葡萄糖体质指数（TyG-BMI）与甲状腺乳头状癌侵袭性及复发风险 | PMID 41287894 |
| 2025-11-21 | npj Digital Medicine | GOV | core | 构建有影响力的外科人工智能：一种外科式方法（评论） | PMID 41272076 |
| 2025-11-20 | International Journal of Surgery | FM | peripheral | 基于高灵敏自体荧光系统的术中甲状旁腺实时探测 | PMID 41295885 |
| 2025-11-20 | arXiv | VIDEO | core | SAM2S：经语义长时跟踪的手术视频万物分割 | 2511.16618v1 |
| 2025-11-20 | arXiv | VIDEO | core | 用于手术场景分割的图神经网络 | 2511.16430v1 |
| 2025-11-20 | npj Digital Medicine | DIAG | core | PlaqueCap：基于视觉-语言模型与提示注入的血管内超声动脉粥样斑块病灶级描述 | PMID 41266555 |
| 2025-11-19 | npj Digital Medicine | PATHOMICS | core | 基于增强CT深度学习识别增殖型肝癌并预测介入治疗生存获益 | PMID 41258471 |
| 2025-11-19 | npj Digital Medicine | FM | peripheral | PathOrchestra：覆盖100余项临床级任务的计算病理基础模型 | PMID 41258399 |
| 2025-11-19 | International Journal of Surgery | ROBOT | core | CBCT引导机器人人工耳蜗植入的精度、效率与流程标准化：临床前研究 | PMID 41255297 |
| 2025-11-19 | arXiv | EDU | core | 生成自然语言手术反馈：从结构化表示到领域接地评估 | 2511.15159v1 |
| 2025-11-19 | International Journal of Surgery | FM | peripheral | 人工智能在患者教育中的应用:文献计量分析 | PMID 41706663 |
| 2025-11-19 | International Journal of Surgery | OUTCOME | core | 机器学习动态预测结直肠癌术后静脉血栓栓塞（中国多中心） | PMID 41314804 |
| 2025-11-19 | International Journal of Surgery | FM | peripheral | 影像组学表型与肿瘤免疫生物学预测NSCLC免疫治疗（通讯） | PMID 41255295 |
| 2025-11-19 | Nature Communications | DIAG | core | 颞叶癫痫多尺度功能改变的个体化生物标志物 | PMID 41258102 |
| 2025-11-19 | npj Digital Medicine | TRIAGE | core | 预测创伤性脑损伤手术干预与输血需求的可解释多组学模型 | PMID 41258135 |
| 2025-11-19 | npj Digital Medicine | FM | peripheral | 连续与组件化面瘫测量对齐及临床可解释模型 | PMID 41258389 |
| 2025-11-19 | medRxiv/bioRxiv | FM | peripheral | 智能手机皮肤癌风险评估应用对医疗系统影响的随机对照试验(SPOT) | 10.1101/2025.11.18.25340297 |
| 2025-11-18 | Nature Communications | OUTCOME | core | 前额叶-终纹床核生理与神经心理生物标志物预测抑郁症治疗结局 | PMID 41253805 |
| 2025-11-18 | npj Digital Medicine | FM | peripheral | CartiSurface：膝关节MRI软骨厚度的隐式曲面重建 | PMID 41254235 |
| 2025-11-18 | npj Digital Medicine | VIDEO | core | 结肠镜退镜期合格黏膜观察时间自动评估AI系统 | PMID 41254127 |
| 2025-11-18 | npj Digital Medicine | PATHOMICS | core | 深度学习多光子显微成像从常规FFPE切片预测结直肠癌复发 | PMID 41254110 |
| 2025-11-18 | npj Digital Medicine | TRANSPLANT | core | 可解释机器学习纵向预测肾移植术后移植物丢失与死亡 | PMID 41254094 |
| 2025-11-18 | arXiv | ROBOT | core | 用机器人柔性内镜推进开放腔体内的微创精准手术 | 2511.14458v1 |
| 2025-11-18 | International Journal of Surgery | FM | peripheral | 机器学习衍生甲基化签名整合转录组与肿瘤微环境解码肝癌预后 | PMID 41731861 |
| 2025-11-18 | International Journal of Surgery | DIAG | core | 早期肺腺癌影像组学：是否应重新审视磨玻璃结节的PET-CT（致编辑信） | PMID 41255287 |
| 2025-11-18 | Nature Communications | FM | peripheral | 多模态AI整合肿瘤微环境预测皮肤黑色素瘤转移 | 10.1038/s41467-025-65051-0 |
| 2025-11-18 | International Journal of Surgery | FM | peripheral | 基于多维MRI特征的无创AI模型预测直肠癌三级淋巴结构、免疫治疗反应与预后 | PMID 41499583 |
| 2025-11-18 | Nature Biomedical Engineering | INTRAOP | core | 基于组织pH与PSA活性的无标记导航系统用于前列腺肿瘤原位恶性分级 | PMID 41254130 |
| 2025-11-17 | International Journal of Surgery | FM | peripheral | 基于瘤内与瘤周影像组学无创预测NSCLC新辅助免疫化疗无应答者的多中心研究 | 10.1097/js9.0000000000004027 |
| 2025-11-17 | npj Digital Medicine | OUTCOME | core | 基于术中脑电深度学习预测成人术后谵妄 | PMID 41249487 |
| 2025-11-17 | npj Digital Medicine | PATHOMICS | core | 多模态AI精准预测透明细胞肾癌术后预后(多中心) | PMID 41249481 |
| 2025-11-17 | npj Digital Medicine | TRANSPLANT | core | 大语言模型量化社会决定因素对肝移植决策的影响 | PMID 41249463 |
| 2025-11-17 | arXiv | FM | peripheral | EndoSight AI：深度学习驱动的实时胃肠息肉检测与分割 | 2511.12962v1 |
| 2025-11-17 | International Journal of Surgery | FM | peripheral | 胰腺肿瘤术后胰瘘围手术期预测模型研究进展（综述） | PMID 41247818 |
| 2025-11-17 | medRxiv/bioRxiv | OUTCOME | core | 人工智能预测青少年特发性脊柱侧凸的健康相关生活质量 | 10.1101/2025.11.16.25340349 |
| 2025-11-17 | medRxiv/bioRxiv | FM | peripheral | 面向智能手机的轻量多模态机器学习白内障检测与分级 | 10.1101/2025.11.14.25340278 |
| 2025-11-15 | arXiv | VIDEO | core | 桥接视觉与语言的稳健情境感知手术点跟踪：VL-SurgPT数据集与基准 | 2511.12026v1 |
| 2025-11-14 | arXiv | ANESTH | core | VitalBench：术中长时生命体征预测的多中心严格基准 | 2511.13757v1 |
| 2025-11-14 | International Journal of Surgery | FM | peripheral | 就「血浆蛋白质组学联合机器学习早期预测前列腺癌」的通讯评论 | PMID 41247995 |
| 2025-11-14 | International Journal of Surgery | FM | peripheral | 人工智能在超声心动图中的应用：趋势、热点与方向（文献计量） | PMID 41247994 |
| 2025-11-14 | International Journal of Surgery | FM | peripheral | 活体供肾移植术前预测早期肾功能的列线图与网页决策支持系统 | PMID 41247926 |
| 2025-11-14 | International Journal of Surgery | OUTCOME | core | 深度学习定量出血CT参数vs传统半定量评分预测aSAH延迟性脑缺血 | PMID 41247872 |
| 2025-11-13 | npj Digital Medicine | OUTCOME | core | LASSO动态预测系统预测OLIF术后融合器沉降 | PMID 41233509 |
| 2025-11-13 | arXiv | FM | peripheral | 基于专家共识的微创结直肠手术工作流视频评估工具ColoWorkflow的开发与验证 | 2511.10766v2 |
| 2025-11-13 | medRxiv/bioRxiv | FM | peripheral | 大语言模型在上消化道出血临床管理中的评估：来自真实世界患者数据的启示 | 10.1101/2025.11.10.25339858 |
| 2025-11-13 | medRxiv/bioRxiv | PATHOMICS | core | 自监督AI揭示肺腺癌中的致死性失黏附表型 | 10.1101/2025.11.12.688049 |
| 2025-11-13 | International Journal of Surgery | FM | peripheral | da Vinci单孔（SP）机器人辅助结直肠手术的初步探索 | PMID 41247915 |
| 2025-11-13 | International Journal of Surgery | LLM | core | DeepSeek-R1对AAOS髋骨关节炎指南问题回答的质量评估 | PMID 41231615 |
| 2025-11-13 | International Journal of Surgery | FM | peripheral | 面向外科患者抗凝/抗血小板治疗的智能评估系统 | PMID 41247863 |
| 2025-11-13 | The Lancet Digital Health | TRANSPLANT | core | 开发并验证减少循环死亡后捐献肝移植中无效获取的机器学习模型:一项美国多中心研究 | PMID 41238506 |
| 2025-11-13 | The Lancet Digital Health | TRANSPLANT | core | 用机器学习减少循环死亡后捐献的无效获取(评论) | PMID 41238507 |
| 2025-11-13 | medRxiv/bioRxiv | FM | peripheral | 基于ViT多示例学习框架从全切片图像预测TP53标志物与生存结局 | 10.1101/2025.11.11.25340052 |
| 2025-11-13 | medRxiv/bioRxiv | FM | peripheral | 基于组织病理的免疫与分子特征空间画像预测Barrett食管癌变风险 | 10.1101/2025.11.11.25339952 |
| 2025-11-12 | arXiv | TRIAGE | core | 可泛化的手术时长预测模型：多中心开发与时间验证 | 2511.08994v1 |
| 2025-11-12 | International Journal of Surgery | LLM | core | 生成式大语言模型用于良性前列腺增生临床决策支持的真实世界可行性 | PMID 41231618 |
| 2025-11-12 | International Journal of Surgery | OUTCOME | core | 就「预测踝关节骨折术后手术部位感染风险的机器学习模型」的构建效度通讯 | PMID 41222914 |
| 2025-11-12 | International Journal of Surgery | DIAG | core | 就「DeepSeek辅助LI-RADS分类：AI驱动的肝细胞癌诊断精准化」的评论 | PMID 41222909 |
| 2025-11-12 | International Journal of Surgery | OUTCOME | core | 就「预测食管癌术后静脉血栓栓塞的可解释机器学习模型」的致编辑信 | PMID 41222905 |
| 2025-11-12 | International Journal of Surgery | OUTCOME | core | 借助人工智能与个性化康复改善老年髋部骨折关节置换后长期结局 | PMID 41222904 |
| 2025-11-12 | International Journal of Surgery | OUTCOME | core | 关于“数据插补与域适应预测老年髋部骨折关节置换术后1年死亡率（多中心）”的读者来信 | PMID 41222917 |
| 2025-11-11 | arXiv | ROBOT | core | 前列腺中叶经尿道剜除的监督式自主切除与牵拉框架 | 2511.08490v1 |
| 2025-11-11 | medRxiv/bioRxiv | OUTCOME | core | 可解释机器学习预测心血管手术后恢复质量 | 10.1101/2025.11.07.25339798 |
| 2025-11-11 | medRxiv/bioRxiv | INTRAOP | core | AI显著提升结肠镜腺瘤检出率但不改变息肉检出率：一项倾向评分匹配研究 | 10.1101/2025.11.09.25339868 |
| 2025-11-11 | International Journal of Surgery | FM | peripheral | 人工智能在前列腺癌中的应用图谱（全球文献计量） | PMID 41231645 |
| 2025-11-11 | International Journal of Surgery | PATHOMICS | core | 预测乳腺癌新辅助化疗结局的基础模型（数字病理） | PMID 41231625 |
| 2025-11-11 | International Journal of Surgery | DIAG | core | 基于Transformer的深度学习术前预测喉鳞癌淋巴管血管侵犯 | PMID 41231622 |
| 2025-11-11 | International Journal of Surgery | OUTCOME | core | 就「集成学习预测重度腰椎间盘突出PLIF术中失血风险」的评论 | PMID 41217402 |
| 2025-11-11 | International Journal of Surgery | FM | peripheral | 人工智能在黑色素瘤研究中的文献计量分析 | PMID 41217339 |
| 2025-11-11 | International Journal of Surgery | FM | peripheral | 对“整合计算病理与多组学刻画肺腺癌异质性及预后建模”的评论 | PMID 41231647 |
| 2025-11-11 | International Journal of Surgery | LLM | core | “共识的海市蜃楼”：反思外科专家panel中AI驱动的Delphi模拟——读者来信 | 10.1097/js9.0000000000004069 |
| 2025-11-10 | npj Digital Medicine | FM | peripheral | 深度学习自动检测胸部CT上透X线异物吸入 | PMID 41214229 |
| 2025-11-10 | arXiv | PLANNING | core | TwinOR：面向具身AI研究的动态手术室逼真数字孪生 | 2511.07412v2 |
| 2025-11-10 | arXiv | LLM | core | 用于多模态患者数据控制的语音交互手术智能体 | 2511.07392v3 |
| 2025-11-10 | arXiv | DIAG | core | 用深度学习自动估计鼻窦内镜手术的解剖风险指标 | 2511.07199v1 |
| 2025-11-10 | arXiv | INTRAOP | core | TiS-TSL：经时间可切换师生学习的图像标签监督手术视频立体匹配 | 2511.06817v3 |
| 2025-11-10 | International Journal of Surgery | DIAG | core | 就「多通道深度学习预测肺癌MPR：算法卓越与临床落地间的转化陷阱」的致编辑信 | PMID 41208798 |
| 2025-11-10 | International Journal of Surgery | FM | peripheral | 基于CCTA用syngo.via规划冠脉搭桥移植物长度的可行性与准确性 | PMID 41208793 |
| 2025-11-10 | International Journal of Surgery | FM | peripheral | 整合可解释AI与数字孪生用于肿瘤治疗分层（通讯） | PMID 41208618 |
| 2025-11-10 | International Journal of Surgery | FM | peripheral | 采用个体化机器人导航与多模态影像提升双束ACL重建的手术精度 | PMID 41208795 |
| 2025-11-10 | International Journal of Surgery | FM | peripheral | 机器人辅助导航系统用于肺结节术前定位的前瞻性单中心非劣效RCT | PMID 41208787 |
| 2025-11-09 | arXiv | VIDEO | core | 腹腔镜手术阶段、关键点与器械识别视频数据集(PhaKIR) | 2511.06549v1 |
| 2025-11-08 | arXiv | VIDEO | core | EndoIR：经噪声感知路由扩散的退化无关一体化内镜图像复原 | 2511.05873v2 |
| 2025-11-07 | arXiv | ROBOT | core | TumorMap：用于三维肿瘤映射与全自动肿瘤切除的激光手术平台 | 2511.05723v1 |
| 2025-11-07 | arXiv | INTRAOP | core | 用于超声导航切除的结直肠肝转移自动分割 | 2511.05253v1 |
| 2025-11-07 | arXiv | VIDEO | core | SurgiATM：用于腹腔镜手术深度学习去烟的物理引导即插即用模型 | 2511.05059v2 |
| 2025-11-07 | International Journal of Surgery | FM | peripheral | Wnt信号与轴突导向分子串扰构建结直肠癌诊断预后新签名 | PMID 41208601 |
| 2025-11-06 | arXiv | TRANSPLANT | core | 用不平衡EHR多模态深度学习早期预测肝移植后GVHD | 2511.11623v1 |
| 2025-11-06 | arXiv | VIDEO | core | 从单一时间戳学习：腹腔镜胆囊切除术的复杂度估计 | 2511.04525v1 |
| 2025-11-06 | International Journal of Surgery | FM | peripheral | 基于可解释多参数MRI影像组学的椎体转移癌原发灶无创溯源模型：多中心队列研究 | PMID 41202318 |
| 2025-11-06 | International Journal of Surgery | FM | peripheral | 重思乳腺癌新辅助治疗反应的AI预测：迈向机制导向与亚型感知建模(致编辑信) | PMID 41202316 |
| 2025-11-06 | British Journal of Surgery | INTRAOP | core | 识别机器人胰十二指肠切除术中血管解剖的新型AI模型 | PMID 41236618 |
| 2025-11-06 | British Journal of Surgery | GOV | core | 弥合鸿沟:揭示外科采纳人工智能面临的隐性挑战 | PMID 41206573 |
| 2025-11-06 | British Journal of Surgery | FM | peripheral | 肝脏外科的影像引导导航 | PMID 41251617 |
| 2025-11-06 | British Journal of Surgery | FM | peripheral | 快速蒸发电离质谱(REIMS)在外科中的应用:系统综述 | PMID 41218978 |
| 2025-11-05 | arXiv | LLM | core | SurgViVQA：面向手术场景理解的时序接地视频问答 | 2511.03325v3 |
| 2025-11-05 | arXiv | FM | peripheral | 扩散引导的掩膜一致成对混合用于内镜图像分割 | 2511.03219v1 |
| 2025-11-05 | arXiv | LLM | core | SurgAnt-ViVQA：经GRU驱动时序交叉注意力预判手术事件 | 2511.03178v1 |
| 2025-11-05 | International Journal of Surgery | FM | peripheral | 评'深度学习助力预后生物标志物及其配体发现以改善肝癌治疗'(致编辑信) | PMID 41190371 |
| 2025-11-04 | arXiv | INTRAOP | core | 经域不变特征学习与潜在一致性的内镜单目绝对深度估计 | 2511.02247v1 |
| 2025-11-04 | arXiv | EDU | core | 用AI辅助视觉反馈学习腹腔镜手术空间感知 | 2511.02233v1 |
| 2025-11-04 | arXiv | FM | peripheral | 精准腹腔镜手术机器人臂的运动学与人机工程设计 | 2511.02167v1 |
| 2025-11-04 | International Journal of Surgery | OUTCOME | core | 整合MRI与临床数据预测脊柱转移瘤手术大量术中出血的术前预测工具：多中心研究 | PMID 41186592 |
| 2025-11-04 | International Journal of Surgery | OUTCOME | core | 评'多模态深度学习预测非心脏手术后主要心脑血管不良事件(MACCE)'(评论) | PMID 41186523 |
| 2025-11-04 | International Journal of Surgery | FM | peripheral | 鉴定RCN3阳性癌相关成纤维细胞为结直肠癌新驱动因素：基于TGF-β通路的风险特征 | PMID 41186513 |
| 2025-11-04 | International Journal of Surgery | OUTCOME | core | 评'集成学习预测重度腰椎间盘突出行PLIF患者术中出血风险：多中心队列研究'(致编辑信) | PMID 41186512 |
| 2025-11-03 | Nature Communications | FM | peripheral | 临床可穿戴深度学习院内持续恶化预测模型的开发与验证 | PMID 41184270 |
| 2025-11-03 | arXiv | INTRAOP | core | 手术引导的无标记增强现实配准：多解剖临床精度研究 | 2511.02086v2 |
| 2025-11-03 | arXiv | GOV | core | 外科医生离手术世界模型还有多远？零样本手术视频生成的专家评估试点 | 2511.01775v1 |
| 2025-11-03 | arXiv | LLM | core | 何时该信任答案：面向更安全手术VQA的问题对齐语义最近邻熵 | 2511.01458v2 |
| 2025-11-03 | arXiv | ROBOT | core | 用于眼内手术的高精度手术机器人系统 | 2511.01232v1 |
| 2025-11-03 | arXiv | FM | peripheral | 可操控球囊心内镜的闭环控制用于机器人辅助经导管心脏介入 | 2511.01199v1 |
| 2025-11-02 | International Journal of Surgery | OUTCOME | core | 视觉-语言基础模型驱动的手术切口高效识别与居家管理 | PMID 41186521 |
| 2025-11-01 | arXiv | VIDEO | core | 用器械实例分割为手术动作三元组做空间定位：数据集与目标感知融合方法 | 2511.00643v1 |
| 2025-11-01 | arXiv | LLM | core | 诊断AI外科决策支持中的幻觉风险：面向脊柱外科的序贯验证框架 | 2511.00588v2 |
| 2025-10-31 | arXiv | INTRAOP | core | 基于术中超声成像的导航式肝肿瘤切除 | 2510.27596v1 |
| 2025-10-31 | arXiv | METHOD | core | SAGS：用于动态手术内窥镜重建的自适应无混叠高斯溅射 | 2510.27318v1 |
| 2025-10-30 | medRxiv/bioRxiv | FM | peripheral | 减重手术成人的膳食宏量营养素摄入与肠道微生物组 | 10.1101/2025.10.28.25338397 |
| 2025-10-30 | International Journal of Surgery | OUTCOME | core | 跨越数据壁垒：迁移学习预测普通外科术后90天死亡率——多中心开发与比较研究 | PMID 41186562 |
| 2025-10-29 | arXiv | ROBOT | core | STITCH 2.0：以EKF针位估计与缝线管理扩展增强缝合 | 2510.25768v1 |
| 2025-10-29 | npj Digital Medicine | FM | peripheral | 电生理特征预测脑深部电刺激电极触点的治疗窗 | PMID 41162751 |
| 2025-10-29 | Annals of Surgery | FM | peripheral | 掌握机器人肝切除：当可及性决定成败——法国FRIES-ACHBPT-2024队列 | PMID 41159659 |
| 2025-10-28 | medRxiv/bioRxiv | FM | peripheral | 专家悖论：谁从LLM辅助的脑MRI鉴别诊断中获益? | 10.1101/2025.10.28.25338816 |
| 2025-10-28 | arXiv | GOV | core | 手术数字孪生综述 | 2512.00019v1 |
| 2025-10-28 | arXiv | VIDEO | core | 面向动态场景中手术动作空间映射的声源定位 | 2510.24332v3 |
| 2025-10-28 | International Journal of Surgery | OUTCOME | core | 机器学习驱动的同时性寡转移NSCLC根治性局部巩固治疗临床决策支持：基于SEER 17注册库(2018-2021)的人群 | PMID 41187318 |
| 2025-10-28 | International Journal of Surgery | FM | peripheral | 深度学习增强的MRI影像组学预测头颈鳞癌对新辅助化学免疫治疗的病理反应：回顾性分析 | PMID 41147765 |
| 2025-10-27 | arXiv | ROBOT | core | 无标记的手术机器人本体感知：铺巾遮挡下的定位 | 2510.23512v1 |
| 2025-10-27 | arXiv | METHOD | core | EndoWave：用于内窥镜重建的有理小波4D高斯溅射 | 2510.23087v1 |
| 2025-10-25 | arXiv | METHOD | core | EndoSfM3D：用自监督基础模型重建任意内窥镜手术场景的3D | 2510.22359v1 |
| 2025-10-25 | medRxiv/bioRxiv | ANESTH | core | 用强化学习个体化血流动力学管理以预防心脏术后持续性急性肾损伤 | 10.1101/2025.10.23.25338698 |
| 2025-10-24 | Science Advances | FM | peripheral | 大规模定量研究人类TCR-HLA交叉反应 | PMID 41134880 |
| 2025-10-24 | Nature Biomedical Engineering | FM | peripheral | 再神经化肌肉内植入微电极阵列分离转移多功能神经的神经驱动 | PMID 41136604 |
| 2025-10-24 | medRxiv/bioRxiv | PATHOMICS | core | 深度学习桥接组织学与转录组预测肌层浸润性膀胱癌的分子亚型与结局 | 10.1101/2025.10.23.684013 |
| 2025-10-23 | medRxiv/bioRxiv | FM | peripheral | Digital Registrar：基于本地大语言模型的多癌种隐私保护病理信息抽取框架 | 10.1101/2025.10.21.25338475 |
| 2025-10-23 | arXiv | ROBOT | core | SutureBot：自主端到端缝合的精度框架与基准 | 2510.20965v1 |
| 2025-10-23 | arXiv | FM | peripheral | Endoshare：面向外科医生的手术视频去标识与管理开源工具 | 2510.20087v2 |
| 2025-10-23 | International Journal of Surgery | OUTCOME | core | 关于“隐私保护联邦学习预测结直肠手术90天死亡率（多中心）”的读者来信 | PMID 41133392 |
| 2025-10-22 | International Journal of Surgery | FM | peripheral | 基于多参数MRI与肿瘤内异质性生境影像术前预测胶质瘤Ki-67表达及风险分层：多中心研究 | PMID 41133387 |
| 2025-10-22 | International Journal of Surgery | FM | peripheral | 大语言模型ChatGPT在医学中的现状关切与未来方向：机器学习驱动的全球尺度文献计量分析 | PMID 41133425 |
| 2025-10-22 | medRxiv/bioRxiv | FM | peripheral | 面向出院后护理风险评估的机器学习决策支持系统 | 10.1101/2025.10.20.25338376 |
| 2025-10-21 | npj Digital Medicine | FM | peripheral | 简化机器学习模型早期预测烧伤患者脓毒症风险 | PMID 41120704 |
| 2025-10-21 | International Journal of Surgery | FM | peripheral | 对“基于CT瘤内与瘤周异质性预测食管鳞癌新辅助化免后病理反应”的读者来信 | PMID 41133394 |
| 2025-10-20 | arXiv | FM | peripheral | 基于机器视觉的手术照明系统：设计与实现 | 2510.17287v1 |
| 2025-10-20 | arXiv | FM | peripheral | EndoCIL：内窥镜图像分类的类增量学习框架 | 2510.17200v1 |
| 2025-10-18 | arXiv | VIDEO | core | Cataract-LMM：手术视频分析深度学习的大规模多源多任务基准 | 2510.16371v3 |
| 2025-10-18 | arXiv | OUTCOME | core | 什么导致术后误吸？ | 2510.21779v2 |
| 2025-10-18 | arXiv | FM | peripheral | 使用MRI与增强现实的计算机导航脊柱手术 | 2510.16347v2 |
| 2025-10-17 | npj Digital Medicine | OUTCOME | core | 机器学习与规则模型半自动监测手术部位感染 | PMID 41107441 |
| 2025-10-17 | medRxiv/bioRxiv | METHOD | core | 癫痫发作嵌入图：用时空Transformer按发作期颅内EEG特征大规模比较患者 | 10.1101/2025.10.15.25338097 |
| 2025-10-17 | arXiv | ROBOT | core | Cosmos-Surg-dVRK：基于世界基础模型的手术机器人策略学习自动在线评估 | 2510.16240v2 |
| 2025-10-17 | arXiv | VIDEO | core | 通过渐进冻结微调的自适应迁移学习用于腹腔镜视频手术器械存在检测 | 2510.15372v1 |
| 2025-10-17 | International Journal of Surgery | FM | peripheral | 评'整合临床-病理-MRI特征构建新辅助治疗后腋窝淋巴结病理完全缓解预测模型'(致编辑信) | PMID 41133424 |
| 2025-10-17 | Nature Biomedical Engineering | FM | peripheral | 基于深度学习的多模态乳腺癌HER2状态评估用于预测新辅助治疗反应 | PMID 41107520 |
| 2025-10-16 | npj Digital Medicine | OUTCOME | core | PreOpNet预测非心脏大手术30天死亡的外部验证 | PMID 41102258 |
| 2025-10-16 | arXiv | FM | peripheral | 通过无损检测的实时手术器械缺陷检测 | 2510.14525v1 |
| 2025-10-16 | The Lancet Digital Health | FM | peripheral | 非ST段抬高型急性冠脉综合征GRACE评分的扩展:十国开发与验证研究 | PMID 41107201 |
| 2025-10-16 | International Journal of Surgery | FM | peripheral | 整合机器学习与空间-细胞分析的多组学流程鉴定SASH1为头颈鳞癌预后标志与治疗靶点 | PMID 41099090 |
| 2025-10-16 | medRxiv/bioRxiv | PATHOMICS | core | 自监督AI揭示多重免疫荧光图像中隐藏的预后空间模式 | 10.1101/2025.10.16.682563 |
| 2025-10-15 | International Journal of Surgery | FM | peripheral | 就「预测早期口腔舌鳞癌隐匿淋巴结转移的可解释机器学习模型」致编辑的信 | PMID 41731886 |
| 2025-10-15 | arXiv | FM | peripheral | 光计算-通信一体化实现远程手术低延迟高保真感知 | 2510.14058v1 |
| 2025-10-15 | International Journal of Surgery | LLM | core | Delphi情境下AI与专家的比较：用大语言模型模拟医学共识 | PMID 41092428 |
| 2025-10-14 | npj Digital Medicine | FM | peripheral | 证据深度学习从H&E病理图像筛查ALK表达 | PMID 41087669 |
| 2025-10-14 | medRxiv/bioRxiv | INTRAOP | core | SpiderMass质谱整合临床与微生物组数据用于食管胃癌手术切缘界定与预后 | 10.1101/2025.10.13.682035 |
| 2025-10-14 | arXiv | VIDEO | core | 腹腔镜视频中的术后子宫内膜异位症分割 | 2510.13899v1 |
| 2025-10-14 | arXiv | VIDEO | core | 面向内窥镜视频未来事件预测的状态变化学习 | 2510.12904v1 |
| 2025-10-14 | arXiv | ROBOT | core | 连续体机器人的形状感知全身控制及其在腔内手术机器人的应用 | 2510.12332v1 |
| 2025-10-14 | International Journal of Surgery | FM | peripheral | 对“无创影像评估肿瘤浸润淋巴细胞与膀胱癌生存及BCG免疫治疗反应”的评论 | PMID 41159414 |
| 2025-10-14 | International Journal of Surgery | OUTCOME | core | 预测伴微血管侵犯肝细胞癌根治性肝切除术后复发的新列线图 | PMID 41092419 |
| 2025-10-14 | International Journal of Surgery | PATHOMICS | core | 评'AI驱动的copilot用于可切除结直肠癌肝转移组织学生长模式的精准诊断与外科评估：前瞻研究'(致编辑信) | PMID 41092366 |
| 2025-10-14 | International Journal of Surgery | DIAG | core | 评'基于AI的多模态多任务分析揭示肿瘤分子异质性并预测甲状腺乳头状癌术前淋巴结转移与预后:回顾研究'(致编辑信) | PMID 41092359 |
| 2025-10-14 | International Journal of Surgery | OUTCOME | core | 推进胃切除术后死亡预测：基于NSQIP数据的机器学习方法 | PMID 41091961 |
| 2025-10-14 | medRxiv/bioRxiv | FM | peripheral | 机器学习预测并最大化乳腺癌患者对新辅助治疗的应答 | 10.1101/2025.10.11.25337587 |
| 2025-10-13 | medRxiv/bioRxiv | OUTCOME | core | 心脏手术风险评估：机器学习与实验室指标作为辅助工具 | 10.1101/2025.10.10.25337755 |
| 2025-10-13 | International Journal of Surgery | FM | peripheral | 基于影像组学的子宫内膜癌孕激素抵抗预后模型：细胞外基质与III型胶原的启示 | PMID 41091954 |
| 2025-10-13 | International Journal of Surgery | GOV | core | 从像素到实践:将深度学习框架推向外科的临床转化(通讯) | PMID 41085664 |
| 2025-10-10 | International Journal of Surgery | INTRAOP | core | 人工智能辅助近红外荧光成像术中评估乳腺癌转移性前哨淋巴结 | PMID 41085673 |
| 2025-10-08 | medRxiv/bioRxiv | TRANSPLANT | core | 机器学习结合术中激光散斑衬比成像评估活体供肾移植早期移植物功能 | 10.1101/2025.10.07.25336974 |
| 2025-10-08 | medRxiv/bioRxiv | DIAG | core | 联合高分辨MRSI与[18F]-FACBC PET提升胶质瘤术前诊断准确性 | 10.1101/2025.10.01.25336990 |
| 2025-10-08 | medRxiv/bioRxiv | PATHOMICS | core | 组织学与空间转录组整合揭示胶质母细胞瘤浸润区特定细胞组成为预后热点 | 10.1101/2025.10.08.681087 |
| 2025-10-07 | Nature Communications | PATHOMICS | core | 自监督学习从3446张全切片图像发现切除间皮瘤的组织形态学图谱 | PMID 41057342 |
| 2025-10-07 | medRxiv/bioRxiv | OUTCOME | core | BeatAI：基于可穿戴设备与AI的心脏术后房颤追踪 | 10.1101/2025.10.05.25336766 |
| 2025-10-07 | medRxiv/bioRxiv | OUTCOME | core | 多分支CNN利用颅内EEG高频振荡特征预测癫痫术后发作结局 | 10.1101/2025.10.05.25337367 |
| 2025-10-07 | arXiv | VIDEO | core | 用双预测视频扩散模型缓解手术数据不平衡 | 2510.07345v1 |
| 2025-10-07 | arXiv | ROBOT | core | 医学视觉语言模型作为机器人手术的策略 | 2510.06064v1 |
| 2025-10-07 | International Journal of Surgery | OUTCOME | core | 人工智能预测口腔潜在恶性病变手术切除后复发与恶性进展 | PMID 41056008 |
| 2025-10-07 | medRxiv/bioRxiv | ANESTH | core | 认知安全网：复杂临床情境下人类与AI诊断推理的比较 | 10.1101/2025.10.06.25335641 |
| 2025-10-07 | medRxiv/bioRxiv | LLM | core | 考察大语言模型的外科胜任力：基于AfriMed-QA基准的全球健康研究 | 10.1101/2025.10.05.25337350 |
| 2025-10-06 | arXiv | PATHOMICS | core | 面向术中病理的临床级通用基础模型(CRISP) | 2510.04861v2 |
| 2025-10-06 | arXiv | VIDEO | core | 从环境传感器为手术室工作流合成任意视角的自我中心回放(EgoSurg) | 2510.04802v1 |
| 2025-10-06 | arXiv | VIDEO | core | 面向阑尾炎分类的手术视觉联邦学习：FedSurg EndoVis 2024挑战赛结果 | 2510.04772v2 |
| 2025-10-06 | International Journal of Surgery | OUTCOME | core | 预测踝关节骨折术后手术部位感染风险的机器学习模型构建与验证 | PMID 41071942 |
| 2025-10-06 | International Journal of Surgery | FM | peripheral | 评'DeepSeek辅助LI-RADS分类:AI驱动的肝细胞癌诊断精准化'(评论) | PMID 41056037 |
| 2025-10-05 | medRxiv/bioRxiv | FM | peripheral | 基于Z评分的主动脉直径阈值用于胸主动脉夹层与动脉瘤早期检测 | 10.1101/2025.10.03.25337259 |
| 2025-10-05 | medRxiv/bioRxiv | FM | peripheral | 基于基础模型的乳腺癌最优新辅助治疗推荐 | 10.1101/2025.10.03.25337255 |
| 2025-10-04 | arXiv | FM | peripheral | 使用Magic Leap的手术刀混合现实引导：3D打印肝脏体模评估 | 2510.03617v1 |
| 2025-10-03 | medRxiv/bioRxiv | VIDEO | core | 基于Swarm Learning的去中心化隐私保护手术视频分析 | 10.1101/2025.10.02.25337106 |
| 2025-10-03 | medRxiv/bioRxiv | GOV | core | 术中代谢组学引导的儿童脑肿瘤精准手术：多模态分子影像与AI整合的系统综述 | 10.1101/2025.09.26.25336769 |
| 2025-10-03 | medRxiv/bioRxiv | TRANSPLANT | core | 拓扑Transformer早期识别肺移植后死亡高危个体 | 10.1101/2025.10.01.25337124 |
| 2025-10-03 | arXiv | LLM | core | 从镜到稿：胃肠内窥镜自动报告生成模型 | 2510.03543v1 |
| 2025-10-03 | arXiv | ROBOT | core | 真实条件下高效的手术机器人器械位姿重建：统一特征检测 | 2510.03532v1 |
| 2025-10-03 | arXiv | FM | peripheral | LapSurgie：人形机器人经遥操作手持腹腔镜实施手术 | 2510.03529v3 |
| 2025-10-03 | International Journal of Surgery | PATHOMICS | core | 深度学习用于上尿路上皮癌预后分层与生物标志物探索：多中心回顾队列 | PMID 41056040 |
| 2025-10-02 | medRxiv/bioRxiv | METHOD | core | 半脑生长作为全脑生长的生物标志物(基于AI分割) | 10.1101/2025.09.28.25336850 |
| 2025-10-02 | arXiv | VIDEO | core | 当跟踪失效：分析SAM2在手术视频点式跟踪的失败模式 | 2510.02100v1 |
| 2025-10-02 | Nature Biomedical Engineering | FM | peripheral | 微创植入可扩展高密度皮层微电极阵列用于多模态神经解码与刺激 | PMID 41039113 |
| 2025-10-01 | Nature Communications | FM | peripheral | 通过分布式脑记录的迁移学习实现可靠语音解码 | PMID 41034198 |
| 2025-10-01 | npj Digital Medicine | DIAG | core | 机器学习术前鉴别黄色肉芽肿性胆囊炎与胆囊癌(多中心) | PMID 41034367 |
| 2025-10-01 | arXiv | FM | peripheral | 触及肿瘤边界：超声虚拟夹具用于保乳手术的试点研究 | 2510.01452v1 |
| 2025-10-01 | Nature Biomedical Engineering | FM | peripheral | 病理基础模型作为弱监督计算病理特征提取器的基准评测 | PMID 41034516 |
| 2025-09-30 | npj Digital Medicine | OUTCOME | core | 多中心验证可解释多任务模型预测多种术后结局 | PMID 41028168 |
| 2025-09-30 | International Journal of Surgery | DIAG | core | 基于[18F]FDG PET/CT影像组学机器学习模型无创预测可切除早期肺腺癌浸润性及高危病理特征：前瞻队列 | PMID 41572551 |
| 2025-09-30 | medRxiv/bioRxiv | FM | peripheral | 以病理概念学习评估肾癌基础模型 | 10.1101/2025.09.29.25336908 |
| 2025-09-30 | Nature Communications | FM | peripheral | IIIA期NSCLC新辅助化学免疫治疗后的肿瘤免疫动态与长期临床结局 | PMID 41027867 |
| 2025-09-28 | arXiv | ANESTH | core | 用于连续术中低血压预测的自适应频域网络 | 2509.23720v1 |
| 2025-09-28 | arXiv | VIDEO | core | 通过时空信息挖掘的Token合并用于手术视频理解 | 2509.23672v1 |
| 2025-09-27 | medRxiv/bioRxiv | PATHOMICS | core | 光学显微成像预测胶质母细胞瘤局部复发 | 10.1101/2025.09.24.25336541 |
| 2025-09-26 | npj Digital Medicine | GOV | core | SHAP与临床友好解释对临床决策行为影响的比较 | PMID 41006498 |
| 2025-09-26 | medRxiv/bioRxiv | FM | peripheral | HRDPath：从组织病理图像预测同源重组缺陷的可解释多模型深度学习架构 | 10.1101/2025.09.24.678258 |
| 2025-09-26 | Cell Reports Medicine | FM | peripheral | 面向医疗的AI智能体基础架构(综述) | PMID 41015033 |
| 2025-09-26 | Nature Communications | FM | peripheral | InfEHR:基于深度几何学习的电子病历临床表型解析 | PMID 41006287 |
| 2025-09-25 | medRxiv/bioRxiv | INTRAOP | core | 物理信息神经网络用于实时形变感知的AR手术追踪 | 10.1101/2025.09.23.678071 |
| 2025-09-25 | arXiv | FM | peripheral | 手术器械的无监督缺陷检测 | 2509.21561v2 |
| 2025-09-25 | arXiv | GOV | core | 解码手术场景：手术中场景图的范围综述 | 2509.20941v2 |
| 2025-09-25 | Nature Communications | TRANSPLANT | core | 自主人工智能处方药物预防HLA半相合移植的重度急性移植物抗宿主病 | PMID 40998766 |
| 2025-09-24 | arXiv | ROBOT | core | 基于热成像的自主机器人电外科（ThERMO） | 2509.19725v1 |
| 2025-09-24 | arXiv | OUTCOME | core | 面向外科干预的因果机器学习（X-MultiTask） | 2509.19705v1 |
| 2025-09-24 | Nature Communications | DIAG | core | 基于深度学习的窄带成像内镜细胞学分类预测结直肠病变 | PMID 40993107 |
| 2025-09-24 | The Lancet Digital Health | OUTCOME | core | 用于实时检测心脏手术相关急性肾损伤的因果深度学习:七个时序队列的推导与验证 | PMID 40998651 |
| 2025-09-24 | International Journal of Surgery | PATHOMICS | core | 基于可解释AI的乳腺癌新辅助治疗反应预测(数字病理) | PMID 40990507 |
| 2025-09-24 | Nature Biomedical Engineering | FM | peripheral | 侵入性神经电生理与全脑连接组学用于脑植入患者神经解码 | PMID 40993190 |
| 2025-09-23 | arXiv | INTRAOP | core | 术中图像胆道检测的生成式数据增强 | 2509.18958v1 |
| 2025-09-23 | arXiv | VIDEO | core | 基于标签插值的手术视频理解 | 2509.18802v2 |
| 2025-09-23 | arXiv | METHOD | core | 面向应用对齐的合成手术图像生成（SAADi） | 2509.18796v1 |
| 2025-09-23 | arXiv | METHOD | core | 内窥镜图像的零样本单目度量深度估计（含EndoSynth数据集） | 2509.18642v1 |
| 2025-09-23 | arXiv | INTRAOP | core | BridgeSplat：CT与非刚性高斯泼溅双向耦合的可变形术中导航 | 2509.18501v1 |
| 2025-09-23 | International Journal of Surgery | FM | peripheral | ChatGPT用于膝骨关节炎患者教育的初步研究：60例 | PMID 40402631 |
| 2025-09-23 | International Journal of Surgery | FM | peripheral | 经数字远程医疗的计算机辅助术前规划治疗四肢关节周围骨折：多中心队列研究 | PMID 41187316 |
| 2025-09-23 | International Journal of Surgery | FM | peripheral | 基于多模态常规体检数据的人工智能辅助前列腺癌检测：亚洲多中心研究(勘误) | PMID 41108059 |
| 2025-09-23 | International Journal of Surgery | OUTCOME | core | 可解释机器学习模型识别TACE术后高危肝癌早期复发 | PMID 40990650 |
| 2025-09-22 | medRxiv/bioRxiv | OUTCOME | core | 虚拟患者集成方法预测个体化手术并发症 | 10.1101/2025.09.21.25336262 |
| 2025-09-22 | arXiv | FM | peripheral | 食管胃结合部腺癌内镜诊断AI基础模型的开发与验证 | 2509.17660v2 |
| 2025-09-22 | International Journal of Surgery | INTRAOP | core | 基于深度学习的纵隔超声内镜导航系统用于质量控制:单中心随机对照试验 | PMID 40990678 |
| 2025-09-22 | International Journal of Surgery | FM | peripheral | 大语言模型驱动的肺癌患者教育范式转变:多维度性能研究 | PMID 40990661 |
| 2025-09-21 | arXiv | GOV | core | SAGES关键安全视野（CVS）挑战赛：AI辅助手术质量评估的全球基准 | 2509.17100v2 |
| 2025-09-21 | arXiv | PLANNING | core | 从稀疏内窥镜视图高效重建与仿真手术场景 | 2509.17027v1 |
| 2025-09-20 | medRxiv/bioRxiv | FM | peripheral | 深度学习预测异基因造血干细胞动员成功 | 10.1101/2025.09.17.676674 |
| 2025-09-20 | medRxiv/bioRxiv | GOV | core | 人工智能在癫痫MRI中的应用：系统综述与荟萃分析 | 10.1101/2025.09.19.677393 |
| 2025-09-20 | medRxiv/bioRxiv | FM | peripheral | 心脏手术中外科应激的代谢轨迹 | 10.1101/2025.09.16.676529 |
| 2025-09-20 | arXiv | LLM | core | Surgical-MambaLLM：Mamba2增强的多模态大语言模型用于机器人手术VQLA | 2509.16618v1 |
| 2025-09-19 | arXiv | FM | peripheral | 磁性可重编程手术功能的微型软体机器人 | 2509.15610v1 |
| 2025-09-19 | arXiv | TRIAGE | core | ORB手术室物流机器人：通过移动操作自动化手术室物流 | 2509.15600v1 |
| 2025-09-19 | arXiv | LLM | core | EyePCR：眼科手术细粒度感知、知识理解与临床推理综合基准 | 2509.15596v2 |
| 2025-09-19 | International Journal of Surgery | PATHOMICS | core | 基于CT瘤内与瘤周异质性预测食管鳞癌新辅助化免治疗后病理反应 | PMID 40968727 |
| 2025-09-18 | arXiv | ROBOT | core | 协作式机器人辅助手术中外科指令的功能可供性消歧 | 2509.14967v2 |
| 2025-09-18 | Nature Medicine | OUTCOME | core | 结直肠癌手术患者决策支持AI预测模型的临床落地 | PMID 40968272 |
| 2025-09-17 | medRxiv/bioRxiv | PATHOMICS | core | 自监督基础模型用于术中肝脏大泡性脂肪变的定量诊断 | 10.1101/2025.09.16.25335833 |
| 2025-09-17 | arXiv | FM | peripheral | 手术机器人中符合远心点（RCM）约束的一致性动力学控制 | 2509.14075v2 |
| 2025-09-17 | International Journal of Surgery | TRANSPLANT | core | 多模态深度学习预测活体供肾移植受者肾功能结局 | PMID 40961229 |
| 2025-09-16 | arXiv | INTRAOP | core | PERSEUS：语义内窥镜理解与SLAM的感知流水线 | 2509.13541v2 |
| 2025-09-16 | arXiv | VIDEO | core | MEJO：MLLM参与的手术三元组识别与任务间/内联合优化 | 2509.12893v1 |
| 2025-09-16 | arXiv | FM | peripheral | MEGAN：内镜视频稳健不确定性估计的专家混合网络 | 2509.12772v1 |
| 2025-09-16 | International Journal of Surgery | FM | peripheral | 自主神经功能对术后睡眠障碍的影响:前瞻性队列 | PMID 40956174 |
| 2025-09-16 | Nature Biomedical Engineering | FM | peripheral | 利用大语言与视觉模型从大规模图文结肠镜记录中提取知识（EndoKED） | PMID 40958005 |
| 2025-09-15 | arXiv | VIDEO | core | 面向机器人辅助手术的显微手术器械分割（MISRA） | 2509.11727v1 |
| 2025-09-15 | medRxiv/bioRxiv | FM | peripheral | CenSegNet：异质组织中中心体表型的通用高通量深度学习框架 | 10.1101/2025.09.15.676250 |
| 2025-09-12 | arXiv | INTRAOP | core | SCOPE：语音引导的手术场景分割协作感知框架 | 2509.10748v1 |
| 2025-09-12 | arXiv | FM | peripheral | 机器人化与增强现有内窥镜操作的模块化直观框架设计与开发 | 2509.10735v1 |
| 2025-09-12 | International Journal of Surgery | FM | peripheral | 免疫治疗与外科的融合:借助大语言模型的文献计量分析 | PMID 40956177 |
| 2025-09-11 | arXiv | METHOD | core | 损失函数与可学习维纳滤波对腹腔镜图像去烟的影响（消融研究） | 2509.09849v1 |
| 2025-09-11 | arXiv | VIDEO | core | 跨域预训练用于少样本手术技能评估 | 2509.09327v1 |
| 2025-09-11 | arXiv | OUTCOME | core | 动态结构恢复参数提升黄斑裂孔手术视力结局预测 | 2509.09227v1 |
| 2025-09-10 | Science Advances | FM | peripheral | 帕金森病状态依赖脑深部电刺激对运动速度的差异化调节 | PMID 40929271 |
| 2025-09-10 | arXiv | PLANNING | core | 乳腺癌诊疗中的AI：以三维重建变革术前规划与患者教育 | 2509.12242v1 |
| 2025-09-10 | International Journal of Surgery | OUTCOME | core | 术前脑脊液sTREM2浓度与膝/髋关节置换术后谵妄及3年死亡的关联 | PMID 40928387 |
| 2025-09-10 | International Journal of Surgery | LLM | core | T1结直肠癌内镜切除后手术决策的指南依从性:大语言模型vs临床医生 | PMID 40928382 |
| 2025-09-10 | International Journal of Surgery | FM | peripheral | 远程机器人手术:二十年演进与新兴技术整合(综述) | PMID 40928376 |
| 2025-09-10 | International Journal of Surgery | FM | peripheral | 关于“机器学习预测nmCRPC患者转移风险(肿瘤标志物预后研究)”的来信 | PMID 40928369 |
| 2025-09-10 | International Journal of Surgery | FM | peripheral | 致编辑:机器学习预测nmCRPC患者转移风险的肿瘤标志物预后研究 | PMID 40928364 |
| 2025-09-09 | arXiv | METHOD | core | SurgLaVi：面向手术视觉-语言表示学习的大规模分层数据集 | 2509.10555v2 |
| 2025-09-09 | International Journal of Surgery | FM | peripheral | 关于“人工智能预测重大创伤患者脓毒症:多中心验证队列”的读者来信 | PMID 40932373 |
| 2025-09-09 | International Journal of Surgery | FM | peripheral | 全端到端自动膀胱分割与形态特征风险评估预测上尿路功能障碍 | PMID 40932342 |
| 2025-09-09 | International Journal of Surgery | INTRAOP | core | 多模态机器学习用于分期腹腔镜:结合图像与形态学判别腹膜转移 | PMID 40928288 |
| 2025-09-08 | medRxiv/bioRxiv | DIAG | core | 放射科医生-AI协作诊断小肠梗阻缺血：多中心开发与外部验证的多模态深度学习模型 | 10.1101/2025.09.05.25335014 |
| 2025-09-08 | arXiv | INTRAOP | core | 基于球面相似性学习与可微LM优化的术中2D/3D配准 | 2509.06890v3 |
| 2025-09-08 | arXiv | METHOD | core | 利用通用基础模型进行多模态手术数据分析 | 2509.06831v1 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 对“整合MRI生境与临床病理预测高级别浆液性卵巢癌铂敏感性”的评论 | PMID 40990505 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 对“基于影像的替代分类用于伴微血管侵犯肝癌辅助HAIC风险分层”的评论 | PMID 40919961 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 将AI工具整合入动态数字健康生态以实现个体化癌症筛查 | PMID 40928743 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 人工智能用于口腔潜在恶性病变癌变风险评估:应用与挑战 | PMID 40928742 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 评“DeepSeek-R1与GPT-4在复杂诊断挑战中表现相当” | PMID 40928738 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 关于“可解释机器学习预测高级别浆液性卵巢癌无进展生存”的来信 | PMID 40928737 |
| 2025-09-08 | International Journal of Surgery | FM | peripheral | 关于“预测转移性脊柱手术后手术部位感染的AI模型”临床适用性的通信 | PMID 40923252 |
| 2025-09-08 | medRxiv/bioRxiv | TRANSPLANT | core | 预测心脏移植排斥风险：整合临床与组织病理的个体化术后管理框架 | 10.1101/2025.09.05.25335209 |
| 2025-09-07 | arXiv | VIDEO | core | FASL-Seg：手术场景的解剖与器械分割 | 2509.06159v3 |
| 2025-09-07 | medRxiv/bioRxiv | METHOD | core | Appendix300：面向计算建模任务的多机构腹腔镜阑尾切除视频数据集 | 10.1101/2025.09.05.25335174 |
| 2025-09-05 | medRxiv/bioRxiv | VIDEO | core | 时序模型集成与前向-后向平滑用于手术阶段识别 | 10.1101/2025.09.02.25334297 |
| 2025-09-05 | International Journal of Surgery | FM | peripheral | 评“整合临床-病理-MRI特征构建腋窝淋巴结新辅助后病理完全缓解预测模型” | PMID 40919951 |
| 2025-09-05 | International Journal of Surgery | FM | peripheral | 评张氏“人工智能重塑早期口腔癌筛查:从图像识别到风险预测” | PMID 40910841 |
| 2025-09-05 | International Journal of Surgery | FM | peripheral | 生成式AI在肺腺癌病理中的应用:方法学与解读考量 | PMID 40910782 |
| 2025-09-05 | Nature Biomedical Engineering | FM | peripheral | 面向开放世界医学图像分割的通用基础模型与数据库（MedSegX） | PMID 40913057 |
| 2025-09-04 | medRxiv/bioRxiv | LLM | core | CardiacGPT：面向心脏外科术中引导与术后决策的实时LLM助手 | 10.1101/2025.08.30.25334720 |
| 2025-09-04 | International Journal of Surgery | LLM | core | 从算法到手术室:大语言模型能否通过中国麻醉主治医师考试?横断面评估 | PMID 40905848 |
| 2025-09-03 | medRxiv/bioRxiv | METHOD | core | 低频电刺激诱发发作的自动标注揭示致痫网络 | 10.1101/2025.08.29.25334082 |
| 2025-09-03 | arXiv | FM | peripheral | 图像引导手术：技术、质量、创新与医学物理的机遇（综述） | 2509.03420v1 |
| 2025-09-03 | arXiv | FM | peripheral | 病灶感知的视觉-语言融合用于溃疡性结肠炎内镜检查自动图像描述 | 2509.03011v1 |
| 2025-09-03 | International Journal of Surgery | FM | peripheral | 评ChatGPT辅助全膝关节置换知情同意对焦虑的影响:有效干预还是数字安慰剂? | PMID 40899842 |
| 2025-09-03 | International Journal of Surgery | VIDEO | core | 深度学习多层级粒度融合用于手术场景理解:实验研究 | PMID 40899800 |
| 2025-09-02 | npj Digital Medicine | FM | peripheral | SAT：文本提示驱动的大词表3D医学图像分割 | PMID 40897901 |
| 2025-09-02 | International Journal of Surgery | OUTCOME | core | 数据插补与域自适应预测老年髋部骨折关节置换术后1年死亡(多中心) | PMID 40990498 |
| 2025-09-01 | JAMA Surgery | EDU | core | 需要智能、以人为中心的交付以最大化AI价值 | PMID 40768222 |
| 2025-09-01 | JAMA Surgery | EDU | core | AI增强的人类指导与手术模拟表现：一项随机对照试验 | PMID 40768205 |
| 2025-09-01 | JAMA Surgery | FM | peripheral | 外泌体液体活检用于胃癌早期检测：DESTINEX多中心研究 | PMID 40737022 |
| 2025-09-01 | arXiv | METHOD | core | EndoGMDE：面向多样内窥镜场景的低秩专家混合可泛化单目深度估计 | 2509.01206v3 |
| 2025-08-30 | arXiv | LLM | core | SurgLLM：具空间聚焦与时间感知的多面手手术视频理解大模型 | 2509.00357v1 |
| 2025-08-30 | arXiv | ROBOT | core | 基于深度强化学习的柔性机器人内窥镜在动态胃内的接触辅助导航 | 2509.00319v1 |
| 2025-08-29 | Science Advances | PATHOMICS | core | 放射转录组学补充甲状腺乳头状癌的无创风险分层 | PMID 40880461 |
| 2025-08-29 | arXiv | VIDEO | core | 用深度学习实例分割识别腹腔镜手术器械 | 2508.21399v1 |
| 2025-08-29 | arXiv | METHOD | core | GLENDA：妇科腹腔镜子宫内膜异位症数据集 | 2508.21398v1 |
| 2025-08-29 | International Journal of Surgery | FM | peripheral | 基于深度学习算法的男性神经源性下尿路功能障碍辅助诊断 | PMID 40891911 |
| 2025-08-28 | arXiv | VIDEO | core | 用低秩适配的视觉语言模型估计手术器械2D关键点 | 2508.20830v1 |
| 2025-08-28 | medRxiv/bioRxiv | INTRAOP | core | 用于肿瘤检测的振动声学方案的概念化与可行性验证 | 10.1101/2025.08.23.671745 |
| 2025-08-27 | npj Digital Medicine | TRIAGE | core | NLP预测择期神经外科非计划ICU入住 | PMID 40858789 |
| 2025-08-27 | Science Advances | FM | peripheral | 光声-超声双模成像辅助甲状腺结节更明智的活检决策 | PMID 40864699 |
| 2025-08-27 | arXiv | METHOD | core | ROBUST-MIPS：腹腔镜手术器械骨架位姿与实例分割联合数据集 | 2508.21096v2 |
| 2025-08-27 | International Journal of Surgery | FM | peripheral | 致编辑:机器学习预测择期内脏外科手术90天死亡率的多中心研究 | PMID 40865977 |
| 2025-08-27 | International Journal of Surgery | OUTCOME | core | 细菌胞外囊泡作为脊柱手术后谵妄状态的预测性生物标志物 | PMID 40865967 |
| 2025-08-27 | International Journal of Surgery | OUTCOME | core | 多模态深度学习预测非心脏手术后主要不良心脑血管事件(MACCE) | PMID 40865965 |
| 2025-08-26 | npj Digital Medicine | OUTCOME | core | 表格基础模型预测手术出院后阿片类药物用量(多国) | PMID 40858986 |
| 2025-08-26 | International Journal of Surgery | FM | peripheral | 关于「肺癌新辅助免疫化疗后主要病理缓解的多通道深度学习预测多中心诊断研究」的读者来信 | PMID 40865939 |
| 2025-08-26 | International Journal of Surgery | OUTCOME | core | 输尿管上尿路尿路上皮癌节段性输尿管切除术对比根治性肾输尿管切除术的疗效与预后：多中心队列研究 | PMID 40865937 |
| 2025-08-26 | arXiv | ROBOT | core | VisionSafeEnhanced VPC：不确定性下带可见性约束的谨慎预测控制用于自主机器人手术 | 2508.18937v1 |
| 2025-08-26 | arXiv | VIDEO | core | 面向结局的显微外科吻合定量评估 | 2508.18836v1 |
| 2025-08-26 | arXiv | INTRAOP | core | ColorGS：带彩色高斯泼溅的高保真手术场景重建 | 2508.18696v1 |
| 2025-08-26 | International Journal of Surgery | FM | peripheral | 对“基于Gd-EOB-DTPA增强MRI分形分析预测肝癌VETC”的读者来信 | PMID 40865962 |
| 2025-08-26 | International Journal of Surgery | FM | peripheral | 提升胃癌多模态放射-病理组学的稳健性与临床转化 | PMID 40865945 |
| 2025-08-26 | International Journal of Surgery | OUTCOME | core | 隐私保护的联邦学习预测结直肠手术后90天死亡率(多中心) | PMID 40865959 |
| 2025-08-26 | International Journal of Surgery | FM | peripheral | 评“人工神经网络模型提升非肠型早期胃癌淋巴结转移高危人群临床评估准确性” | PMID 40865952 |
| 2025-08-26 | medRxiv/bioRxiv | PLANNING | core | 沟通计算与临床策略以改进癫痫致痫网络的术前识别 | 10.1101/2025.08.22.25334229 |
| 2025-08-25 | International Journal of Surgery | FM | peripheral | 关于「人工智能直接从乳腺癌组织学预测多类分子特征与亚型多中心回顾性研究」的读者来信 | PMID 40853118 |
| 2025-08-25 | arXiv | METHOD | core | EndoUFM：利用基础模型进行内窥镜图像单目深度估计 | 2508.17916v2 |
| 2025-08-25 | International Journal of Surgery | INTRAOP | core | 对“增强现实导航联合荧光成像行腹腔镜保实质肝切除治疗结直肠肝转移”的评论 | PMID 40865975 |
| 2025-08-24 | npj Digital Medicine | OUTCOME | core | 基于入院3天内术前/术后平扫CT预测动脉瘤性蛛网膜下腔出血功能结局 | PMID 40849351 |
| 2025-08-24 | medRxiv/bioRxiv | VIDEO | core | 量子机器学习用于手术操作识别 | 10.1101/2025.08.21.25334146 |
| 2025-08-24 | medRxiv/bioRxiv | EDU | core | 面向交互式神经外科教育与评估的多AI智能体框架：从病例梗概到虚拟对话 | 10.1101/2025.08.20.25334084 |
| 2025-08-23 | Nature Communications | FM | peripheral | 面向专家级自主颈动脉超声的大规模学习型机器人系统 | 10.1038/s41467-025-62865-w |
| 2025-08-22 | International Journal of Surgery | PATHOMICS | core | 评论：基于AI的多模态预测透明细胞肾细胞癌核分级状态与预后（多中心队列） | PMID 40696981 |
| 2025-08-22 | Science Advances | FM | peripheral | 贝叶斯重建快速扫描中红外光声信号实现快速无标记化学显微 | PMID 40845115 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 关于「整合瘤内瘤周影像组学与身体成分的可解释机器学习模型预测胰腺癌早期复发」的评论 | PMID 40844929 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 关于提升乳腺癌腋窝pCR MRI预测模型真实世界适用性的评论 | PMID 40844920 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 应用威高手术机器人系统(WG-NST600S)开展胃肠外科手术：单中心前瞻性分析 | PMID 40844905 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 关于「MRI影像组学预测腋窝淋巴结转移诊断准确性的系统综述与荟萃分析」的读者来信 | PMID 40844902 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 关于「基于人工智能预测转移性脊柱疾病手术部位感染的多中心开发与验证研究」的读者来信 | PMID 40844901 |
| 2025-08-22 | arXiv | METHOD | core | 手术阶段识别的可迁移性估计指标分析 | 2508.16730v1 |
| 2025-08-22 | International Journal of Surgery | FM | peripheral | 关于「深度学习临床-影像组学模型预测可转化肝癌ICI转化治疗应答」的来信 | PMID 41382402 |
| 2025-08-21 | International Journal of Surgery | FM | peripheral | 深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后的预后评估：呼吁与商榷 | PMID 40844925 |
| 2025-08-21 | medRxiv/bioRxiv | FM | peripheral | 丘脑底核编码驱动帕金森病步态的自适应治疗 | 10.1101/2025.08.20.25333478 |
| 2025-08-21 | medRxiv/bioRxiv | FM | peripheral | 用于绘制人脑活动的微型四维功能超声 | 10.1101/2025.08.19.25332261 |
| 2025-08-20 | International Journal of Surgery | FM | peripheral | 预测袖状胃切除术后胃食管反流病的简易风险评分的开发与验证：多中心回顾性队列 | PMID 40844871 |
| 2025-08-20 | International Journal of Surgery | FM | peripheral | 关于「深度学习影像组学与机器学习用于IDH野生型胶质母细胞瘤最大安全切除术后预后评估多中心研究」的读者来信 | PMID 40839020 |
| 2025-08-20 | Nature Medicine | FM | peripheral | 基于非增强CT的急性主动脉综合征AI诊断 | PMID 40835970 |
| 2025-08-19 | arXiv | PLANNING | core | 用nnU-Net自动化手术规划：肝胆期MRI肝脏解剖勾画 | 2508.14133v1 |
| 2025-08-19 | The Lancet Digital Health | PATHOMICS | core | 用深度学习评估结直肠癌基因型-表型关联:一项多中心队列研究 | PMID 40829965 |
| 2025-08-19 | medRxiv/bioRxiv | TRANSPLANT | core | GigaHeart：面向心脏移植的心脏专用CT基础模型 | 10.1101/2025.08.14.25333618 |
| 2025-08-19 | medRxiv/bioRxiv | FM | peripheral | 符号回归预测肾移植受者的霉酚酸剂量 | 10.1101/2025.08.15.25333810 |
| 2025-08-18 | International Journal of Surgery | FM | peripheral | 关于「DeepSeek-R1与GPT-4在复杂诊断挑战中表现相当的历史对照研究」的评论 | PMID 40839101 |
| 2025-08-18 | arXiv | OUTCOME | core | 面部整形手术美学结局的自动化评估 | 2508.13363v1 |
| 2025-08-18 | arXiv | FM | peripheral | CLoE：面向内镜图像稳健MES分级的课程学习框架 | 2508.13280v1 |
| 2025-08-18 | npj Digital Medicine | FM | peripheral | GutGPT——用于消化道出血的生成式AI工具的可用性与采用随机试验 | PMID 40825997 |
| 2025-08-15 | Nature | FM | peripheral | 每日简报：心理密码防止脑植入物读出私密想法 | PMID 40858822 |
| 2025-08-15 | medRxiv/bioRxiv | OUTCOME | core | 预测心力衰竭近期死亡：基于EHR的深度学习模型外部验证 | 10.1101/2025.08.13.25333636 |
| 2025-08-15 | medRxiv/bioRxiv | DIAG | core | 癌变过程的形态分子纵向内镜 | 10.1101/2025.08.15.665660 |
| 2025-08-15 | arXiv | INTRAOP | core | 融合尺度感知深度预测与感知先验的单目内镜位姿估计与组织重建 | 2508.11282v1 |
| 2025-08-15 | arXiv | ROBOT | core | 面向手术机器人的世界模型视觉运动抓取(GASv2) | 2508.11200v1 |
| 2025-08-14 | arXiv | FM | peripheral | 基于表面描迹的AR手术导航：原位可视化与工具追踪引导在神经外科中的比较 | 2508.10554v2 |
| 2025-08-14 | Nature Communications | PATHOMICS | core | HIBRID:结合深度学习组织学与ctDNA的结直肠癌风险分层 | PMID 40813777 |
| 2025-08-13 | JAMA Surgery | LLM | core | 使用大语言模型增强手术说明书 | PMID 40802263 |
| 2025-08-13 | npj Digital Medicine | DIAG | core | 不同AI辅助水平对创伤骨盆X线判读的比较 | PMID 40804461 |
| 2025-08-13 | arXiv | VIDEO | core | 面向可泛化手术视频理解的数据高效学习 | 2508.10215v2 |
| 2025-08-13 | arXiv | VIDEO | core | Surg-InvNeRF：面向手术视觉三维跟踪与重建的可逆NeRF | 2508.09681v1 |
| 2025-08-13 | arXiv | INTRAOP | core | 脑肿瘤切除多模态图像配准挑战赛(ReMIND2Reg 2025) | 2508.09649v2 |
| 2025-08-12 | arXiv | ANESTH | core | 基于EHR的患者级术中阿片类药物剂量预测的因果机器学习(OPIAID) | 2508.09059v1 |
| 2025-08-12 | arXiv | DIAG | core | 中枢神经系统肿瘤的自动化标准化手术报告 | 2508.08916v1 |
| 2025-08-11 | arXiv | VIDEO | core | Spatial-ORMLLM：用多模态大语言模型提升手术室空间关系理解 | 2508.08199v1 |
| 2025-08-11 | arXiv | VIDEO | core | 用几何方法缓解手术室人员建模中的偏差 | 2508.08028v2 |
| 2025-08-11 | arXiv | VIDEO | core | TrackOR：通过稳健跟踪迈向个性化智能手术室 | 2508.07968v1 |
| 2025-08-11 | arXiv | VIDEO | core | 面向内镜立体图像无标记三维组织跟踪的任意点跟踪方法 | 2508.07851v1 |
| 2025-08-10 | npj Digital Medicine | TRIAGE | core | 多模态机器学习支持脊柱手术风险分层的捆绑支付 | PMID 40783461 |
| 2025-08-10 | arXiv | FM | peripheral | EndoCogniAgent：具自一致性验证的闭环智能体推理用于内镜诊断 | 2508.07292v3 |
| 2025-08-09 | arXiv | FM | peripheral | LLM评估的独立注意力辅助图神经网络用于内镜(息肉)图像分割 | 2508.07028v1 |
| 2025-08-08 | International Journal of Surgery | LLM | core | GPT-4对比放射科医师在不同报告质量下的纵隔肿瘤分类：一项队列研究 | PMID 40788014 |
| 2025-08-08 | International Journal of Surgery | OUTCOME | core | 33579例泌尿系结石的临床管理启示：成分、共病、季节变化新模式与基于机器学习的尿脓毒症预测 | PMID 40787982 |
| 2025-08-08 | arXiv | ROBOT | core | 面向安全超声图像引导机器人脊柱手术的稳健亚高斯模型预测控制 | 2508.06744v1 |
| 2025-08-08 | The Lancet Digital Health | FM | peripheral | 人工智能在神经肿瘤学中的价值(综述) | PMID 40783350 |
| 2025-08-07 | International Journal of Surgery | FM | peripheral | 关于「机器学习可解释预测模型预测高出血风险PCI患者长期净不良临床事件」的评论 | PMID 40844281 |
| 2025-08-07 | International Journal of Surgery | GOV | core | 深度学习的前景：为多模态AI在肺癌精准外科中的临床转化指明方向（述评） | PMID 40793836 |
| 2025-08-07 | International Journal of Surgery | FM | peripheral | 推进围手术期精准化：机器学习预测在产科镇痛中的实施路径（述评） | PMID 40773251 |
| 2025-08-07 | International Journal of Surgery | FM | peripheral | 关于「胰腺癌及周围解剖结构三维自动分割用于手术规划」的评论 | PMID 40773246 |
| 2025-08-07 | arXiv | VIDEO | core | TSMS-SAM2：面向手术场景可提示视频目标分割与跟踪的多尺度时序采样与记忆分裂剪枝 | 2508.05829v1 |
| 2025-08-07 | arXiv | VIDEO | core | F2PASeg：内镜手术中垂体解剖结构分割的特征融合 | 2508.05465v1 |
| 2025-08-07 | arXiv | INTRAOP | core | EndoMatcher：面向机器人辅助手术的多域预训练可泛化内镜图像匹配器 | 2508.05205v1 |
| 2025-08-06 | International Journal of Surgery | FM | peripheral | 关于「基于人工智能预测转移性脊柱疾病手术部位感染的多中心开发与验证研究」的评论 | PMID 40844283 |
| 2025-08-06 | International Journal of Surgery | FM | peripheral | 关于「深度学习基于组织病理图像为平滑肌肉瘤分层分子亚型的概念验证诊断研究」的读者来信 | PMID 40844271 |
| 2025-08-06 | International Journal of Surgery | GOV | core | 人工智能辅助结直肠癌肝转移诊疗是未来的前景与方向（述评） | PMID 40793852 |
| 2025-08-06 | International Journal of Surgery | FM | peripheral | 人工智能重塑早期口腔癌筛查：从图像识别到风险预测（述评） | PMID 40793835 |
| 2025-08-06 | International Journal of Surgery | FM | peripheral | 迈向临床稳健的透明细胞肾细胞癌核分级AI：验证、影像标准化与前瞻性转化的思考（述评） | PMID 40773257 |
| 2025-08-06 | arXiv | FM | peripheral | ACM Multimedia 2025 ENT内镜分析大挑战赛(ENTRep) | 2508.04801v1 |
| 2025-08-06 | International Journal of Surgery | FM | peripheral | 技术融合：迷走神经刺激与脑机接口推进卒中后失语康复 | PMID 40773224 |
| 2025-08-06 | Annals of Surgery | METHOD | core | 人工智能生成合成数据以优化外科试验设计 | PMID 40767615 |
| 2025-08-06 | Annals of Surgery | GOV | core | 应用人工智能：下一个前沿 | PMID 40767572 |
| 2025-08-05 | International Journal of Surgery | FM | peripheral | 关于「基于无监督机器学习CT影像组学亚型无创预测NSCLC免疫治疗疗效与肿瘤微环境多队列研究」的读者来信 | PMID 40793848 |
| 2025-08-05 | International Journal of Surgery | PATHOMICS | core | 基于CT内脏脂肪影像组学预测非肌层浸润性膀胱癌TURBT术后早期复发：多中心队列研究 | PMID 40787990 |
| 2025-08-05 | arXiv | OUTCOME | core | 评估术前MRI对根治性前列腺切除术后勃起功能障碍的预测价值 | 2508.03461v2 |
| 2025-08-05 | International Journal of Surgery | INTRAOP | core | 对“DeepGuide：一种用于术中膜结构可视化的波长特异性导航系统”的评论 | PMID 41382400 |
| 2025-08-04 | npj Digital Medicine | FM | peripheral | 多模态深度学习预测宫颈癌根治性放疗预后(多中心) | PMID 40760164 |
| 2025-08-04 | arXiv | EDU | core | 用于外科技能习得的可解释AI个性化反馈 | 2508.02593v1 |
| 2025-08-04 | Nature Communications | METHOD | core | 头颈癌精准肿瘤学多模态数据集HANCOCK | PMID 40759646 |
| 2025-08-03 | arXiv | ROBOT | core | 认知负荷如何影响机器人辅助手术中的意图识别 | 2508.01823v1 |
| 2025-08-03 | arXiv | VIDEO | core | 用分层类增量语义分割实现动态机器人辅助手术场景理解 | 2508.01713v2 |
| 2025-08-02 | npj Digital Medicine | INTRAOP | core | 手术特征数字化经手术引导与机器人化提升手术精度 | PMID 40753134 |
| 2025-08-01 | JAMA Surgery | LLM | core | 大语言模型用于外科工作流优化 | PMID 40632543 |
| 2025-08-01 | JAMA Surgery | TRIAGE | core | 应用大语言模型预测外科手术时长 | PMID 40632526 |
| 2025-08-01 | JAMA Surgery | PATHOMICS | core | AI驱动的空间分析评估可切除胰腺癌免疫表型 | PMID 40560550 |
| 2025-08-01 | Nature | FM | peripheral | 带密码保护的读心脑植入物 | PMID 40813479 |
| 2025-08-01 | Nature Communications | DIAG | core | 可解释多模态深度学习基于超声预测甲状腺癌侧颈淋巴结转移 | PMID 40750786 |
| 2025-08-01 | British Journal of Surgery | FM | peripheral | 聊天机器人健康建议研究报告规范:CHART声明 | PMID 40747825 |
| 2025-08-01 | Annals of Surgery | DIAG | core | 定义无功能胰腺神经内分泌肿瘤(NF-PanNET)的生物学交界可切除性：术前早期复发风险预测模型 | PMID 40747911 |
| 2025-07-30 | International Journal of Surgery | FM | peripheral | 从AI驱动的分子分型迈向优化的罕见肉瘤临床试验设计：数字健康视角（述评） | PMID 40773275 |
| 2025-07-30 | International Journal of Surgery | FM | peripheral | 偏倚风险与组学机遇：重新审视用于nmCRPC转移进展的机器学习模型（述评） | PMID 40773221 |
| 2025-07-30 | arXiv | INTRAOP | core | 超越僵化AI：面向术中手术辅助的自然人机共生 | 2507.23088v1 |
| 2025-07-29 | International Journal of Surgery | GOV | core | 机器学习预测结直肠手术后并发症的系统综述与荟萃分析：机器学习走到哪一步了？ | PMID 40844287 |
| 2025-07-29 | arXiv | VIDEO | core | StepAL：面向白内障手术视频的步骤感知主动学习 | 2507.22059v1 |
| 2025-07-28 | International Journal of Surgery | DIAG | core | 自监督学习模型融合平扫与增强CT术前识别坏疽性胆囊炎：多中心回顾性队列研究 | PMID 40844296 |
| 2025-07-28 | arXiv | GOV | core | 基于深度学习的内镜深度估计：综述 | 2507.20881v2 |
| 2025-07-27 | arXiv | INTRAOP | core | PIVOTS：面向肝脏导航的术前到术中体到面配准 | 2507.20337v1 |
| 2025-07-27 | medRxiv | TRANSPLANT | core | 高分辨多重抗体组学与可解释机器学习揭示肾移植排斥的新致病机制 | 10.1101/2025.07.25.25332230 |
| 2025-07-25 | arXiv | VIDEO | core | SurgPIS：弱监督部件感知的手术器械实例分割 | 2507.19592v1 |
| 2025-07-24 | npj Digital Medicine | OUTCOME | core | 机器学习预测主髂动脉腔内血运重建术后结局 | PMID 40707760 |
| 2025-07-24 | International Journal of Surgery | FM | peripheral | 关于「深度学习超声影像组学模型预测淋巴结结核耐药性多中心研究」的读者来信 | PMID 40705519 |
| 2025-07-24 | International Journal of Surgery | PATHOMICS | core | 多模态放射-病理组学预测胃癌预后与免疫治疗反应：多队列回顾性研究 | PMID 40705499 |
| 2025-07-24 | arXiv | INTRAOP | core | 手术环境下面部关键点定位性能评估 | 2507.18248v1 |
| 2025-07-24 | arXiv | FM | peripheral | TextSAM-EUS：用文本提示学习使SAM精确分割内镜超声中的胰腺肿瘤 | 2507.18082v3 |
| 2025-07-24 | International Journal of Surgery | FM | peripheral | 活体肝移植术前肝体积测量方法的比较分析（外科视角） | PMID 40705516 |
| 2025-07-23 | International Journal of Surgery | FM | peripheral | 关于「深度学习用于肾创伤检测：CT图像算法性能与外部验证实验研究」的评论 | PMID 40705514 |
| 2025-07-23 | International Journal of Surgery | FM | peripheral | 关于「深度学习用于肾创伤检测：CT图像算法性能与外部验证实验研究」的评论 | PMID 40705511 |
| 2025-07-23 | International Journal of Surgery | FM | peripheral | 关于「肺癌新辅助免疫化疗后主要病理缓解的多通道深度学习预测多中心诊断研究」的读者来信 | PMID 40705510 |
| 2025-07-23 | International Journal of Surgery | FM | peripheral | 关于「重新审视IDH野生型胶质母细胞瘤影像组学——聚焦非增强肿瘤亚区」的读者来信 | PMID 40705505 |
| 2025-07-23 | arXiv | FM | peripheral | EndoGen：条件自回归内镜视频生成 | 2507.17388v1 |
| 2025-07-23 | medRxiv | GOV | core | 针对外科决策支持视觉-语言模型的提示注入攻击 | 10.1101/2025.07.16.25331645 |
| 2025-07-23 | Annals of Surgery | OUTCOME | core | Super Learner提升结直肠手术术后并发症预测 | PMID 40698768 |
| 2025-07-22 | arXiv | PLANNING | core | 经导管主动脉瓣置换术前规划的语义分割 | 2507.16573v1 |
| 2025-07-22 | arXiv | VIDEO | core | 内镜手术阶段识别、器械关键点估计与器械实例分割的比较验证(PhaKIR 2024挑战赛) | 2507.16559v3 |
| 2025-07-22 | bioRxiv | FM | peripheral | 对三维病理数据集做深度学习分诊以实现高效病理评估 | 10.1101/2025.07.20.665804 |
| 2025-07-21 | npj Digital Medicine | LLM | core | 大语言模型在围手术期医学的临床与经济影响(随机交叉试验) | PMID 40691284 |
| 2025-07-21 | arXiv | TRIAGE | core | 择期手术管理中预测准确性与重排灵活性的权衡 | 2507.15566v2 |
| 2025-07-21 | arXiv | VIDEO | core | 迈向整体化手术场景图 | 2507.15541v2 |
| 2025-07-21 | arXiv | VIDEO | core | SurgX：面向可解释手术阶段识别的神经元-概念关联 | 2507.15418v1 |
| 2025-07-21 | arXiv | INTRAOP | core | EndoControlMag：稳健的内镜血管运动放大 | 2507.15292v4 |
| 2025-07-21 | Cell Reports Medicine | DIAG | core | 深度学习基于支气管内超声多模态视频检测与诊断胸内淋巴结病变 | PMID 40695290 |
| 2025-07-21 | medRxiv | FM | peripheral | 用纵向临床数据动态预测骨髓增生异常综合征的死亡风险 | 10.1101/2025.07.21.25331775 |
| 2025-07-21 | Annals of Surgery | DIAG | core | 基于超声图像术前诊断滤泡性甲状腺肿瘤的无创深度学习系统：多中心回顾研究 | PMID 40689491 |
| 2025-07-20 | npj Digital Medicine | INTRAOP | core | 端到端多功能AI平台用于术中冰冻诊断 | PMID 40685437 |
| 2025-07-20 | arXiv | ROBOT | core | 面向内镜经鼻介入的磁驱动可操控软吸引装置的学习建模 | 2507.15155v3 |
| 2025-07-20 | arXiv | VIDEO | core | BleedOrigin：内镜黏膜下剥离术动态出血源定位 | 2507.15094v1 |
| 2025-07-18 | International Journal of Surgery | FM | peripheral | 乳腺癌及多原发恶性肿瘤的分子特征：基于非标记定量蛋白质组学的最新应用 | PMID 40694032 |
| 2025-07-18 | International Journal of Surgery | DIAG | core | 整合临床-病理-MRI特征预测乳腺癌新辅助治疗后腋窝淋巴结病理完全缓解 | PMID 40694024 |
| 2025-07-18 | International Journal of Surgery | DIAG | core | 致编辑信：机器学习模型检测甲状腺乳头状癌淋巴结转移的临床表现（多中心研究） | PMID 40679989 |
| 2025-07-18 | medRxiv/bioRxiv | FM | peripheral | HiViTAlign：基于组织病理视觉Transformer对齐的术后组织碎片拼合 | 10.1101/2025.07.14.664649 |
| 2025-07-18 | arXiv | FM | peripheral | 面向微创胰腺手术的创新并联机器人设计分析 | 2507.13787v1 |
| 2025-07-18 | arXiv | FM | peripheral | 眼科手术遥操作手术机器人工具的控制模式 | 2507.13654v2 |
| 2025-07-18 | International Journal of Surgery | FM | peripheral | 对“脑机接口：解锁神经系统疾病的创新”的评论 | PMID 40694018 |
| 2025-07-18 | npj Digital Medicine | FM | peripheral | 深度学习检测结直肠癌全切片图像MSI-H状态的系统综述与荟萃分析 | PMID 40681867 |
| 2025-07-18 | npj Digital Medicine | FM | peripheral | HOTSPoT：用于肝穿刺活检病理研究的开源稳健自动分割模型 | PMID 40681745 |
| 2025-07-18 | medRxiv/bioRxiv | PATHOMICS | core | 肺神经内分泌肿瘤的临床相关形态-分子分类 | 10.1101/2025.07.18.25331556 |
| 2025-07-17 | International Journal of Surgery | OUTCOME | core | 机器学习模型预测胃腺癌全胃/近端胃切除术吻合口漏的前瞻性多中心验证 | PMID 40696942 |
| 2025-07-17 | International Journal of Surgery | FM | peripheral | 多组学揭示骨关节炎年龄特异性血液生物标志物与衰老驱动的B细胞重塑 | PMID 40696927 |
| 2025-07-17 | International Journal of Surgery | FM | peripheral | 基于常规实验室检查的机器学习识别脊柱感染中的金黄色葡萄球菌脊柱炎：多中心回顾研究 | PMID 40679999 |
| 2025-07-17 | International Journal of Surgery | OUTCOME | core | 基于机器学习的胆囊癌远处转移预测系统：回顾队列研究 | PMID 40679985 |
| 2025-07-17 | International Journal of Surgery | VIDEO | core | 视觉-语言模型用于腹腔镜手术视频自动分析与记录：概念验证研究 | PMID 40679978 |
| 2025-07-17 | International Journal of Surgery | OUTCOME | core | 迈向精准胆囊切除：增强预测模型以改善长期疗效 | PMID 40679971 |
| 2025-07-17 | International Journal of Surgery | FM | peripheral | 3D打印患者特异性骨植入物的临床转化：共识声明 | PMID 40697079 |
| 2025-07-17 | International Journal of Surgery | DIAG | core | 计算机辅助诊断模型评估胰腺导管腺癌血管侵犯与R0切除 | PMID 40697063 |
| 2025-07-17 | medRxiv/bioRxiv | FM | peripheral | MiroSCOPE：用于标注功能组织单元的AI驱动数字病理平台 | 10.1101/2025.07.11.664228 |
| 2025-07-17 | International Journal of Surgery | FM | peripheral | Apple Vision Pro（AVP）在腹腔镜胃肠外科的初步应用 | PMID 40679982 |
| 2025-07-16 | International Journal of Surgery | INTRAOP | core | 评论：AI病灶标注系统辅助内镜黏膜下剥离术（ESD）治疗食管病变（低手术量中心前瞻队列） | PMID 40697009 |
| 2025-07-16 | bioRxiv | TRANSPLANT | core | Transplant-Agents：评估移植后风险预测与排斥生物标志物可重复性的多智能体AI框架 | 10.1101/2025.07.10.664265 |
| 2025-07-15 | International Journal of Surgery | FM | peripheral | 人工智能斜视筛查模型的系统综述与荟萃分析：方法学洞见与未来方向 | PMID 40696939 |
| 2025-07-15 | International Journal of Surgery | PATHOMICS | core | 可解释机器学习整合瘤内瘤周影像组学与身体成分预测胰腺癌根治术后早期复发 | PMID 40717595 |
| 2025-07-15 | International Journal of Surgery | FM | peripheral | 关于「基于弹性成像的AI模型可预测伴淋巴结受累乳腺癌新辅助化疗后腋窝状态」的评论 | PMID 40717592 |
| 2025-07-15 | International Journal of Surgery | FM | peripheral | 人工智能在肺结节中的应用进展：演变、趋势与未来方向（文献计量学分析） | PMID 40717586 |
| 2025-07-15 | International Journal of Surgery | DIAG | core | 基于术前临床特征与实验室指标预测中枢恶性肿瘤诊断的列线图：一项诊断研究 | PMID 40717568 |
| 2025-07-15 | arXiv | LLM | core | 基于LLM的协作手术机器人自然语言指令歧义检测 | 2507.11525v1 |
| 2025-07-15 | arXiv | GOV | core | 手术中的人机协作：迈向自主手术助手的进展与挑战 | 2507.11460v1 |
| 2025-07-15 | arXiv | OUTCOME | core | SurgeryLSTM：面向脊柱手术后住院时长精确可解释预测的时间感知神经模型 | 2507.11570v1 |
| 2025-07-14 | Nature Medicine | TRANSPLANT | core | 以AI、新兴技术与异种移植重塑移植医学 | PMID 40659768 |
| 2025-07-13 | arXiv | VIDEO | core | 记忆增强SAM2用于免训练手术视频分割 | 2507.09577v2 |
| 2025-07-12 | arXiv | VIDEO | core | Geo-RepNet：面向内镜黏膜下剥离术(ESD)手术阶段识别的几何感知表征学习 | 2507.09294v1 |
| 2025-07-10 | arXiv | FM | peripheral | 基于光学跟踪的人机协作下颌角劈开截骨术(MASO)手术系统 | 2507.07794v1 |
| 2025-07-10 | arXiv | INTRAOP | core | X-RAFT：神经外科蓝光与白光高光谱图像的跨模态非刚性配准 | 2507.07747v1 |
| 2025-07-10 | arXiv | FM | peripheral | 面向手术机器人培训的增强训练课程的实现与评估 | 2507.07718v1 |
| 2025-07-10 | Nature Communications | OUTCOME | core | 基因组测序对预测先天性心脏手术后结局至关重要 | PMID 40640177 |
| 2025-07-10 | npj Digital Medicine | OUTCOME | core | 机器学习基于真实世界临床数据改进内镜不良事件记录 | PMID 40640575 |
| 2025-07-10 | npj Digital Medicine | DIAG | core | 常规全乳X线摄影深度学习提升早期乳腺癌淋巴结转移预测 | PMID 40640522 |
| 2025-07-09 | International Journal of Surgery | PATHOMICS | core | 评估生成式AI模型对肺腺癌可解释病理特征提取：分级评估与预后模型构建 | PMID 40697010 |
| 2025-07-09 | Science Advances | OUTCOME | core | 消费级可穿戴设备生物节律预测儿童术后并发症 | PMID 40632861 |
| 2025-07-09 | arXiv | FM | peripheral | 腕戴式触觉反馈对遥操作机器人手术任务中力度准确性与速度的影响 | 2507.07327v1 |
| 2025-07-09 | npj Digital Medicine | PATHOMICS | core | 基于元学习优化Transformer的乳腺癌淋巴结微转移病理识别(MetaTrans) | PMID 40634485 |
| 2025-07-08 | International Journal of Surgery | FM | peripheral | 致编辑信：评一项用于肝细胞癌早期检测的多模态人工智能模型 | PMID 40696997 |
| 2025-07-08 | International Journal of Surgery | PATHOMICS | core | 人工智能在乳腺癌数字病理中的应用：实践新纪元？ | PMID 40696940 |
| 2025-07-08 | International Journal of Surgery | FM | peripheral | 拓展基于病理组学AI模型预测口腔白斑与头颈鳞癌9p缺失的临床应用价值 | PMID 40697021 |
| 2025-07-08 | arXiv | FM | peripheral | 运动链误差下缆驱动手术机械臂的稳定跟踪闭环控制 | 2507.05663v1 |
| 2025-07-08 | International Journal of Surgery | FM | peripheral | 对“视网膜眼组学与主动脉瘤及主动脉不良事件发生风险（人群队列）”的读者来信 | PMID 40674250 |
| 2025-07-08 | medRxiv | FM | peripheral | 整合生物信息学与机器学习识别BK多瘤病毒相关肾病的线粒体相关biomarker | 10.1101/2025.07.07.25331061 |
| 2025-07-07 | International Journal of Surgery | PATHOMICS | core | 致编辑信：评「基于组织病理图像深度学习预测NSCLC手术结局——Sr-PPS模型的开发与多组学验证」 | PMID 40643594 |
| 2025-07-07 | International Journal of Surgery | FM | peripheral | 评论：开发并验证基于机器学习的nmCRPC转移风险模型 | PMID 40638356 |
| 2025-07-07 | International Journal of Surgery | GOV | core | 人工智能、机器人与导航辅助技术在骨质疏松性椎体压缩骨折诊疗与预后中的作用与潜力（综述） | PMID 40844278 |
| 2025-07-07 | arXiv | VIDEO | core | 面向多任务手术计算机视觉的多模态表征模型适配(MML-SurgAdapt) | 2507.05020v2 |
| 2025-07-07 | arXiv | VIDEO | core | DARIL：模仿学习在手术动作规划中何时优于强化学习 | 2507.05011v3 |
| 2025-07-07 | arXiv | OUTCOME | core | 用AI驱动方法揭示脑肿瘤手术的神经影像生物标志物 | 2507.04881v2 |
| 2025-07-07 | medRxiv | PATHOMICS | core | 面向真实世界的跨模态AI癌症分子病理诊断(CAMPaS) | 10.1101/2025.07.07.25330997 |
| 2025-07-06 | arXiv | VIDEO | core | CLIP-RL：结合对比语言-视觉预训练与强化学习的手术场景分割 | 2507.04317v1 |
| 2025-07-06 | arXiv | VIDEO | core | Surg-SegFormer：面向整体手术场景分割的双Transformer模型 | 2507.04304v1 |
| 2025-07-05 | medRxiv | OUTCOME | core | 可解释机器学习用于PRK术后随访 | 10.1101/2025.07.03.25330835 |
| 2025-07-05 | npj Digital Medicine | FM | peripheral | 机器学习预测人工耳蜗植入结局的系统综述 | PMID 40617985 |
| 2025-07-04 | International Journal of Surgery | PATHOMICS | core | AI副驾用于可切除结直肠癌肝转移组织学生长模式的精准诊断与外科评估：前瞻研究 | PMID 40638258 |
| 2025-07-04 | International Journal of Surgery | PATHOMICS | core | 组织病理图像深度学习分层平滑肌肉瘤分子亚型：概念验证诊断研究 | PMID 40557542 |
| 2025-07-04 | arXiv | VIDEO | core | CPKD：临床先验知识约束扩散模型用于ESD手术阶段识别 | 2507.03295v2 |
| 2025-07-03 | medRxiv | ANESTH | core | 论证模型复杂度：迁移学习与经典模型在麻醉下术中伤害性刺激监测的对比 | 10.1101/2025.07.01.25330670 |
| 2025-07-03 | arXiv | PATHOMICS | core | 面向肿瘤神经外科的智能组织病理学(综述) | 2507.03037v1 |
| 2025-07-03 | arXiv | LLM | core | SurgVisAgent：面向多样化手术视觉增强的多模态智能体模型 | 2507.02252v1 |
| 2025-07-03 | medRxiv | FM | peripheral | 人工智能在消化内镜中的应用：系统综述 | 10.1101/2025.07.02.25330317 |
| 2025-07-03 | British Journal of Surgery | VIDEO | core | 基于人工智能的机器人胰十二指肠切除术自动手术阶段识别 | PMID 40728177 |
| 2025-07-03 | Annals of Surgery | FM | peripheral | 机器人远端胰腺切除的中转：国际多中心研究的预测因子与结局 | PMID 40607707 |
| 2025-07-03 | Annals of Surgery | OUTCOME | core | 基于图像的人工智能手术部位感染检测 | PMID 40607706 |
| 2025-07-02 | Nature | FM | peripheral | 脑植入物解码神经活动生成富表现力语音 | PMID 40603664 |
| 2025-07-02 | International Journal of Surgery | FM | peripheral | 迈向临床可用的AI：确保口腔癌筛查中的问责与公平实施 | PMID 40608057 |
| 2025-07-02 | International Journal of Surgery | DIAG | core | 多通道深度学习预测肺癌新辅助免疫化疗后主要病理缓解：多中心诊断研究 | PMID 40607969 |
| 2025-07-02 | International Journal of Surgery | OUTCOME | core | 自动化机器学习模型用于中期肝细胞癌TACE后预后风险分层 | PMID 40607968 |
| 2025-07-02 | International Journal of Surgery | OUTCOME | core | 个体化结构网络偏离预测内侧颞叶癫痫手术结局：多中心验证研究 | PMID 40607947 |
| 2025-07-02 | International Journal of Surgery | FM | peripheral | 人工智能工具传播结直肠癌筛查指南的对比分析：早筛教育新视角 | PMID 40607944 |
| 2025-07-02 | International Journal of Surgery | FM | peripheral | 深度学习超声影像组学模型预测淋巴结结核耐药：多中心研究 | PMID 40607926 |
| 2025-07-02 | arXiv | VIDEO | core | 面向手术视频无监督物体发现的未来槽预测 | 2507.01882v2 |
| 2025-07-02 | arXiv | FM | peripheral | S3D：用于机器人脊柱固定手术的空间可转向钻孔框架 | 2507.01779v1 |
| 2025-07-02 | Cell Reports Medicine | FM | peripheral | AI通过多模态临床信息整合实现肺癌分子表型与预后预测(LUCID) | PMID 40609537 |
| 2025-07-01 | JAMA Surgery | INTRAOP | core | 用于手术的可穿戴术中增强现实(AR) | PMID 40072453 |
| 2025-07-01 | arXiv | ROBOT | core | SonoGym：面向机器人超声挑战性手术任务的高性能仿真平台 | 2507.01152v1 |
| 2025-07-01 | arXiv | PLANNING | core | 从单张图像构建手术神经辐射场(NeRF) | 2507.00969v1 |
| 2025-07-01 | arXiv | FM | peripheral | 基于可调小波单元CNN的OCT分析用于分类视网膜前膜(ERM)手术类型 | 2507.00743v1 |
| 2025-07-01 | arXiv | INTRAOP | core | 眼科手术中眼球注视方向的稳定跟踪 | 2507.00635v1 |
| 2025-07-01 | arXiv | INTRAOP | core | 拓扑约束学习用于高效腹腔镜肝脏标志点检测 | 2507.00519v1 |
| 2025-07-01 | Nature Communications | OUTCOME | core | 皮层与皮层下区域边界复杂度预测帕金森病脑深部电刺激结局 | PMID 40595525 |
| 2025-07-01 | npj Digital Medicine | FM | peripheral | 全膝关节置换术患者报告结局的高维项目反应理论分析 | PMID 40593233 |
| 2025-06-28 | International Journal of Surgery | FM | peripheral | 整合血浆蛋白质组学与机器学习的前列腺癌早期风险预测：前瞻队列研究 | PMID 40557500 |
| 2025-06-27 | International Journal of Surgery | FM | peripheral | 读者来信：关于基于全切片图像的透明细胞肾细胞癌核分级AI模型多中心诊断研究 | 10.1097/js9.0000000000002884 |
| 2025-06-27 | International Journal of Surgery | PATHOMICS | core | 致编辑信：基于全切片图像的AI模型用于透明细胞肾细胞癌核分级（回顾多中心诊断研究） | PMID 40576191 |
| 2025-06-27 | International Journal of Surgery | FM | peripheral | 血浆蛋白质组学预测未来主动脉瘤与主动脉夹层风险 | PMID 40576182 |
| 2025-06-27 | International Journal of Surgery | OUTCOME | core | 基于人工智能的转移性脊柱疾病手术部位感染预测模型：多中心开发与验证 | PMID 40576176 |
| 2025-06-27 | International Journal of Surgery | PLANNING | core | 胰腺癌及周围解剖结构三维自动分割用于手术规划 | PMID 40576127 |
| 2025-06-27 | Nature Biomedical Engineering | FM | peripheral | 采用远程优化神经解码器的运动响应式脑深部电刺激治疗帕金森病 | PMID 40579487 |
| 2025-06-25 | International Journal of Surgery | FM | peripheral | 病理学遇见人工智能：对9PLP模型用于基因组改变与预后预测的思考 | PMID 41108058 |
| 2025-06-24 | International Journal of Surgery | DIAG | core | 致编辑信：评「影像组学用于结直肠癌淋巴结转移术前预测的系统综述与荟萃分析」 | PMID 40557452 |
| 2025-06-24 | International Journal of Surgery | PATHOMICS | core | 致编辑信：评「评估生成式AI模型对肺腺癌分级评估与预后模型构建的可解释病理特征提取」 | PMID 40557444 |
| 2025-06-24 | International Journal of Surgery | OUTCOME | core | 术前血浆神经酰胺作为临床相关肝切除术后肝衰竭新型预测标志物的前瞻多中心验证 | PMID 40557443 |
| 2025-06-24 | International Journal of Surgery | FM | peripheral | 无监督机器学习驱动的CT影像组学亚型无创预测NSCLC免疫治疗疗效与肿瘤微环境：多队列研究 | PMID 40552903 |
| 2025-06-24 | International Journal of Surgery | FM | peripheral | 致编辑信：评AI驱动ccRCC预后建模中统计一致性、可泛化性与特征优化的关键洞见 | PMID 40552861 |
| 2025-06-24 | Nature Medicine | FM | peripheral | 基于非增强CT的胃癌大规模AI筛查 | PMID 40555751 |
| 2025-06-24 | Nature Biomedical Engineering | FM | peripheral | 全景光声CT结合学习分类提升乳腺病变表征 | PMID 40555759 |
| 2025-06-23 | International Journal of Surgery | OUTCOME | core | 高出血风险经皮冠脉介入(PCI)患者长期净不良临床事件的可解释机器学习预测模型：前瞻队列 | PMID 40549441 |
| 2025-06-23 | International Journal of Surgery | EDU | core | 人工智能增强的外科带教(coaching)模式：SmartCoach用于腹腔镜胰十二指肠切除 | PMID 40549435 |
| 2025-06-23 | Annals of Surgery | OUTCOME | core | 肝门部胆管癌移植后肿瘤复发风险评估(PRETREAT)评分的开发与验证 | PMID 40548581 |
| 2025-06-21 | International Journal of Surgery | FM | peripheral | DeepSeek本地化部署技术弥合科研与实践鸿沟的优势 | PMID 40540613 |
| 2025-06-20 | International Journal of Surgery | LLM | core | DeepSeek辅助LI-RADS分类：AI驱动的肝细胞癌诊断精准化 | PMID 40552875 |
| 2025-06-20 | International Journal of Surgery | INTRAOP | core | AI病灶标注系统辅助内镜黏膜下剥离(ESD)治疗食管病变（低容量中心）：前瞻队列 | PMID 40540547 |
| 2025-06-20 | International Journal of Surgery | FM | peripheral | 关于「影像组学与机器学习预测IDH野生型胶质母细胞瘤全切术后总生存」的评述 | PMID 40540543 |
| 2025-06-20 | International Journal of Surgery | FM | peripheral | MRI瘤内与瘤周生境影像组学预测口腔鳞癌新辅助化免疗效(pCR) | PMID 40540293 |
| 2025-06-20 | International Journal of Surgery | FM | peripheral | MRI影像组学预测乳腺癌腋窝淋巴结转移的诊断准确性：系统综述与荟萃分析 | PMID 40540292 |
| 2025-06-20 | International Journal of Surgery | FM | peripheral | 局部进展期胃癌新辅助化疗患者改良恶病质指数的开发与验证：多中心队列 | PMID 40503786 |
| 2025-06-20 | Annals of Surgery | FM | peripheral | 全机器人受体成人活体肝移植改善近期结局：比较研究 | PMID 40539273 |
| 2025-06-20 | Annals of Surgery | OUTCOME | core | 用全基因组测序衍生多基因风险评分预测垂直袖状胃切除术后减重(All of Us队列) | PMID 40539265 |
| 2025-06-19 | International Journal of Surgery | FM | peripheral | 致编辑信：ChatGPT对膝骨关节炎患者教育的效果——60例初步研究 | PMID 40577835 |
| 2025-06-19 | International Journal of Surgery | OUTCOME | core | 集成学习预测重度腰椎间盘突出PLIF手术术中出血风险：多中心队列(IBLED-LDH) | PMID 40540437 |
| 2025-06-19 | npj Digital Medicine | VIDEO | core | 作为外科可解释AI的液态白盒模型 | 10.1038/s41746-025-01769-x |
| 2025-06-18 | International Journal of Surgery | VIDEO | core | 对“腹腔镜手术器械自动识别智能平台的开发与应用（多中心）”的读者来信 | PMID 40549418 |
| 2025-06-18 | International Journal of Surgery | INTRAOP | core | 机器人辅助微创食管切除术(RAMIE)中喉返神经过度牵拉的实时AI预警：概念验证 | PMID 40540442 |
| 2025-06-16 | Annals of Surgery | LLM | core | 乳腺外科CPT编码的开放架构AI模型：开发、验证与前瞻测试 | PMID 40518998 |
| 2025-06-14 | International Journal of Surgery | PLANNING | core | 对“复杂胰腺手术中虚拟3D模型、AR系统与虚拟腹腔镜仿真：现状、前景与挑战”的读者来信 | PMID 40540449 |
| 2025-06-13 | Annals of Surgery | GOV | core | 外科结局报告中的人工智能：下一个利器，还是垃圾进垃圾出的人工智能？ | PMID 40511870 |
| 2025-06-12 | International Journal of Surgery | FM | peripheral | 儿童烟雾病术前出血风险分层：多中心倾向性评分匹配分析 | PMID 40505056 |
| 2025-06-12 | International Journal of Surgery | VIDEO | core | 妇科腹腔镜手术器械的实时自动检测及其在手术技能评估中的应用：横断面研究 | PMID 40503769 |
| 2025-06-10 | International Journal of Surgery | FM | peripheral | 人工智能与多模态数据整合在肾细胞癌中的潜力与局限：综述 | PMID 40497793 |
| 2025-06-10 | International Journal of Surgery | FM | peripheral | 关于「AI增强的外科医生——在手术室整合黑箱人工智能」的评论 | PMID 40497780 |
| 2025-06-05 | International Journal of Surgery | FM | peripheral | 基于钆塞酸增强MRI自动全肝评分（FAWLS）定量评估肝移植物功能 | PMID 40576423 |
| 2025-06-05 | International Journal of Surgery | FM | peripheral | 大语言模型从胸部CT报告中检测多种疾病的性能分析：比较研究 | PMID 40497825 |
| 2025-06-05 | International Journal of Surgery | DIAG | core | 可解释机器学习预测早期口腔舌鳞癌隐匿性淋巴结转移：多中心研究 | PMID 40479496 |
| 2025-06-05 | International Journal of Surgery | FM | peripheral | 致编辑信：评「AI的兴起——探索其缓解围手术期焦虑的潜力」 | PMID 40474816 |
| 2025-06-05 | International Journal of Surgery | PATHOMICS | core | 整合计算病理与多组学刻画肺腺癌异质性并构建预后模型 | PMID 40474806 |
| 2025-06-05 | Nature Medicine | FM | peripheral | 基于microRNA的1型糖尿病动态风险评分 | PMID 40473952 |
| 2025-06-04 | International Journal of Surgery | FM | peripheral | ChatGPT在医学教育中的应用：优势与局限综述 | PMID 40465793 |
| 2025-06-03 | The Lancet Digital Health | FM | peripheral | 数字病理多模态AI预后模型在开始长期雄激素剥夺治疗的晚期前列腺癌中的外部验证:STAMPEDE四项3期RCT事后生物标志 | PMID 40467357 |
| 2025-05-29 | International Journal of Surgery | FM | peripheral | 基于Gd-EOB-DTPA增强MRI的分形分析预测肝癌血管包绕肿瘤簇(VETC) | PMID 40441719 |
| 2025-05-29 | International Journal of Surgery | PATHOMICS | core | 基于组织病理图像深度学习预测非小细胞肺癌手术预后：Sr-PPS模型的开发与多组学验证 | PMID 40440686 |
| 2025-05-28 | International Journal of Surgery | PATHOMICS | core | 基于分子分型预测胃癌血行转移风险 | PMID 40434726 |
| 2025-05-23 | International Journal of Surgery | VIDEO | core | 腹腔镜手术器械自动识别智能平台的开发与应用：多中心回顾研究 | PMID 40405782 |
| 2025-05-20 | International Journal of Surgery | FM | peripheral | 整合MRI生境与临床病理的多模态模型预测高级别浆液性卵巢癌铂敏感性：诊断研究 | PMID 40391993 |
| 2025-05-20 | International Journal of Surgery | PATHOMICS | core | 基于深度学习影像组学与机器学习评估IDH野生型胶质母细胞瘤最大安全切除术后预后：多中心研究 | PMID 40391963 |
| 2025-05-20 | International Journal of Surgery | FM | peripheral | 变革医疗：人工智能对诊断、药物与伦理的影响——综合综述 | PMID 40391953 |
| 2025-05-16 | International Journal of Surgery | DIAG | core | 人工智能辅助CT影像组学预测甲状腺乳头状癌颈侧区淋巴结转移 | PMID 40387731 |
| 2025-05-16 | International Journal of Surgery | LLM | core | 多模态大语言模型在喉癌手术中的应用——迈向精准但挑战犹存 | PMID 40387726 |
| 2025-05-16 | International Journal of Surgery | FM | peripheral | ChatGPT与DeepSeek在骨质疏松性椎体压缩骨折中的应用洞见 | PMID 40387695 |
| 2025-05-16 | International Journal of Surgery | LLM | core | AI讲解胃癌手术：可读性与可靠性的权衡 | PMID 40387693 |
| 2025-05-16 | International Journal of Surgery | DIAG | core | 基于CT影像组学评估胰腺神经内分泌瘤假包膜以预测预后并指导手术策略：队列研究 | PMID 40395025 |
| 2025-05-12 | International Journal of Surgery | GOV | core | 对《外科中的人工智能：演进、趋势与未来方向》的评论 | PMID 40359568 |
| 2025-05-12 | International Journal of Surgery | DIAG | core | 对《人工神经网络模型提升非肠型早期胃癌淋巴结转移高危人群临床评估准确性》的评论 | PMID 40359559 |
| 2025-05-12 | International Journal of Surgery | PATHOMICS | core | 基于全切片图像的透明细胞肾细胞癌AI核分级：回顾性多中心诊断研究 | PMID 40358632 |
| 2025-04-11 | International Journal of Surgery | FM | peripheral | 基于平扫CT与超声双模态深度学习诊断肝包虫病：大规模多中心诊断研究 | PMID 40358633 |
| 2025-03-26 | Annals of Surgery | FM | peripheral | 全机器人左叶供肝切除比开放更安全 | PMID 40135361 |
| 2025-03-05 | Annals of Surgery | OUTCOME | core | 机器学习准确预测乳房重建术后1年的患者报告结局 | PMID 40040622 |
| 2025-02-18 | Annals of Surgery | OUTCOME | core | 腹部手术后身体功能恢复的纵向聚类分析 | PMID 39963795 |
| 2025-02-07 | Annals of Surgery | OUTCOME | core | 以主要CPT码对比多CPT码表示手术风险时ACS NSQIP风险计算器的准确性 | PMID 39917834 |
| 2025-01-15 | Annals of Surgery | FM | peripheral | 基于电子病历按Clavien-Dindo自动分级手术相关不良事件的算法 | PMID 39811956 |
| 2024-10-30 | Annals of Surgery | VIDEO | core | AI辅助手术场景识别:与医护人员的对比研究 | PMID 39474680 |
| 2024-09-24 | Annals of Surgery | OUTCOME | core | 面向行政数据库的外科专用合并症评分(CORE score)开发 | PMID 39315437 |
| 2024-09-05 | Annals of Surgery | FM | peripheral | 机器人vs腹腔镜前外侧段小范围肝切除的倾向评分匹配国际多中心研究(10,517例) | PMID 39234677 |
| 2024-08-23 | Annals of Surgery | DIAG | core | 预测胰腺导管腺癌肠系膜上动脉(SMA)切缘状态的计算机视觉算法 | PMID 39176476 |
| 2024-07-25 | Annals of Surgery | EDU | core | 普通外科Milestones评估对毕业后执业结局的预测价值 | PMID 39051106 |
| 2024-07-11 | Annals of Surgery | FM | peripheral | 用手术室黑匣子(OR Black Box)技术评估原位超时核查与复盘模拟培训的质量改进结局 | PMID 38989569 |
| 2024-05-10 | Annals of Surgery | TRIAGE | core | 预测急诊普外科转院"未见"患者死亡的风险计算器开发与验证 | PMID 38726671 |
| 2024-01-23 | Annals of Surgery | FM | peripheral | 胰头及钩突部肿瘤机器人剜除术的近远期结局 | PMID 38258584 |