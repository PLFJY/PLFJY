// Clash Verge Rev Global extended script
// Remote rule provider could be found at https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash
// You just need to edit the User Configuration Region
/*
|--------------------------------------------------------------------------
| 🚀 User Configuration Region
|--------------------------------------------------------------------------
*/

// 1) 内置分组名称
// "当前选择" 分组的名称
const currentSelectName = "🚀当前选择";

// "自动选择" 分组的名称
const autoSelectName = "♻️自动选择";

// "故障转移" 分组的名称
const fallbackSelectName = "🛡️故障转移";

// 2) 内置分组检测配置
// 内置策略组检测配置
const builtInPolicyOptions = {
  url: "https://www.gstatic.com/generate_204",
  interval: 600,
  tolerance: 50
};

// 3) 附加的 Remote Providers
const extraRemoteRuleProviders = [
  {
    id: "telegram",
    url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml",
    target: currentSelectName
  },
  {
    id: "steam_download",
    url: "https://cdn.jsdelivr.net/gh/Femoon/clash-rules/steam.yaml",
    target: "DIRECT"
  },
  {
    id: "mozilla",
    url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Mozilla/Mozilla.yaml",
    target: "DIRECT"
  }
];

// 4) 自定义代理分组
// 原全局“按节点名称关键字剔除 / 按 server 域名关键字剔除”功能已移除；
// 现在改为在 customProxyGroups 的每个分组内单独配置。
const customProxyGroups = [
  {
    name: "💬 国外AI(Except Gemini)",
    type: "fallback", //可选，默认 select
    /**
     * 按节点名称关键字剔除
     * - 为空数组：不剔除
     * - 有值时：只要节点名称包含任一关键字，就从本分组中剔除
     */
    excludeProxyNames: ["香港", "剩余", "到期"],
    /**
     * 按 server 域名关键字剔除
     * - 为空数组：不剔除
     * - 有值时：只要 server 包含任一关键字，就从本分组中剔除
     */
    excludeProxyServers: [],
    rules: [
      "DOMAIN-SUFFIX,grok.com",
      "PROCESS-NAME,codex",
      "DOMAIN-SUFFIX,x.ai",
      "PROCESS-NAME,codex.exe"
    ], // 本地 rules
    remoteRuleProviders: [
      {
        id: "copilot",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Copilot/Copilot.yaml",
        // behavior: "classical", //可选，默认classical
        // path: ./rules/copilot.yaml // 可选, 默认./rules/${rp.id}.yaml
        // interval: 86400 // 可选, 默认86400
        // target: "Copilot" // 可选, 默认使用 group.name
      },
      {
        id: "chatgpt",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
      },
      {
        id: "claude",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml"
      }
    ]
  },
  {
    name: "🔯Gemini",
    type: "select",
    remoteRuleProviders: [
      {
        id: "gemini",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml"
      }
    ]
  },
  {
    name: "Secrete",
    type: "url-test",
    rules: ["DOMAIN-SUFFIX,hanime1.me"],
    excludeProxyNames: ["日本", "英国"],
    remoteRuleProviders: [
      {
        id: "twitter",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Twitter/Twitter.yaml"
      }
    ]
  },
  {
    name: "🇯🇵 Japan",
    type: "fallback",
    rules: ["GEOIP,JP"],
    /**
     * 按节点名称关键字筛选
     * - 为空数组：不启用名称筛选
     * - 有值时：进入筛选模式，仅保留名称命中的节点
     */
    includeProxyNames: ["日本"],
    /**
     * 按 server 域名关键字筛选
     * - 为空数组：不启用 server 筛选
     * - 有值时：进入筛选模式，仅保留 server 命中的节点
     */
    includeProxyServers: ["jp"],
    remoteRuleProviders: [
      {
        id: "niconico",
        url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Niconico/Niconico.yaml"
      }
    ]
  },
  {
    name: "🪟 微软服务",
    type: "select",
    proxies: ["DIRECT"],
    remoteRuleProviders:
      [
        {
          id: "microsoft",
          url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml"
        }
      ]
  },
  {
    name: "🍎 苹果服务",
    type: "select",
    proxies: ["DIRECT"],
    remoteRuleProviders:
      [
        {
          id: "apple",
          url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple.yaml"
        },
        {
          id: "icloud",
          url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/iCloud/iCloud.yaml"
        },
        {
          id: "appleid",
          url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/AppleID/AppleID.yaml"
        }
      ]
  }
];

// 5) 需要前置的规则 (Prepend Rules)
const prependRule = [
  "PROCESS-NAME,qbittorrent.exe,DIRECT",
  `DOMAIN-SUFFIX,l2d.su,${currentSelectName}`,
  "DOMAIN-KEYWORD,ghproxy,DIRECT",
  "DOMAIN-KEYWORD,gh-proxy,DIRECT",
  "DST-PORT,25565,DIRECT",
  "DOMAIN-SUFFIX,crxsoso.com,DIRECT"/*,
  "DOMAIN-SUFFIX,collegeboard.org,DIRECT",
  "DOMAIN-SUFFIX,items-va.learnosity.com,DIRECT",
  "DOMAIN-SUFFIX,fast.wistia.net,DIRECT"*/
];

// 6) 需要追加的规则 (Append Rules, 会插在 MATCH 规则前)
const appendRule = [
  "GEOSITE,CN,DIRECT",
  "GEOIP,CN,DIRECT",
  "GEOSITE,PRIVATE,DIRECT",
  "GEOIP,LAN,DIRECT",
  "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
  "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
  "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
  "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve"
];

// 7) DNS 配置（使用驼峰写法，脚本会自动转为 Clash 所需的 kebab-case）
const userDNS = {
  enable: true,
  listen: ':53',
  enhancedMode: 'fake-ip',
  fakeIpRange: '198.18.0.1/16',
  fakeIpFilterMode: 'blacklist',
  preferH3: true,
  respectRules: true,
  useHosts: false,
  useSystemHosts: false,
  ipv6: false,

  fakeIpFilter: [
    '*.lan',
    '*.local',
    '*.arpa',
    'time.*.com',
    'ntp.*.com',
    '+.market.xiaomi.com',
    'localhost.ptlogin2.qq.com',
    '*.msftncsi.com',
    'www.msftconnecttest.com',
    'stun.*.*',
    'stun.*.*.*',
    '+.stun.playstation.net',
    '+.msftconnecttest.com',
    '+.msftncsi.com',
    'pc.plfjy.top'
  ],

  defaultNameserver: [
    '119.29.29.29',
    '223.5.5.5',
    '223.6.6.6',
  ],

  nameserver: [
    'https://dns.google/dns-query',
    'https://cloudflare-dns.com/dns-query',
    'https://dns.quad9.net/dns-query'
  ],

  proxyServerNameserver: [
    'https://doh.pub/dns-query',
    'https://sm2.doh.pub/dns-query',
  ],

  directNameserver: [
    'https://doh.pub/dns-query',
    '119.29.29.29',
    '223.6.6.6',
    'system',
  ],

  directNameserverFollowPolicy: true,

  fallback: [],

  fallbackFilter: {
    geoip: true,
    geoipCode: 'CN',
    ipcidr: [
      '240.0.0.0/4',
      '0.0.0.0/32'
    ],
    domain: [
      '+.google.com',
      '+.facebook.com',
      '+.youtube.com'
    ]
  }
};

/*
|--------------------------------------------------------------------------
| 📘 Reference
|--------------------------------------------------------------------------
|
| 用途：
| - 该脚本会保留机场下发的 proxies ；
| - 覆写机场下发的 proxy-groups / rules / rule-providers；
| - 按配置重新生成内置分组、自定义分组、远程规则提供者与最终 rules。
|
| 执行流程：
| 1) 确保配置对象基础结构存在
| 2) 注入 DNS 配置
| 3) 覆写机场下发的 proxy-groups / rules / rule-providers
| 4) 创建内置分组（当前选择 / 自动选择 / 故障转移）
| 5) 注入额外的远程规则提供者
| 6) 处理自定义分组（节点筛选 / 剔除、分组插入、分组规则生成）
| 7) 拼接最终规则列表
|
| 自定义分组特殊说明：
| - 每个 customProxyGroups 项都可以配置以下排除/筛选数组：
|   - includeProxyNames: 按节点名称关键字筛选
|   - includeProxyServers: 按 server 域名关键字筛选
|   - excludeProxyNames: 按节点名称关键字剔除
|   - excludeProxyServers: 按 server 域名关键字剔除
|
| - 执行顺序：
|   先 include 筛选，再 exclude 剔除。
|
| - include 行为：
|   - 只要 includeProxyNames / includeProxyServers 任一数组非空，
|     就进入“筛选模式”，仅保留命中的节点。
|   - 如果两个 include 数组都为空，则不过滤，默认所有节点先通过。
|   - 若筛选结果为空，则回退到全部真实节点，并强制改为 select，避免空 proxies 报错
|
| - exclude 行为：
|   - 在 include 通过后的节点中，
|     只要命中 excludeProxyNames / excludeProxyServers 任一关键字，就剔除。
|
| - proxies 行为：
|   - 若分组手动写了 proxies，则以手动配置为准，仅做去重；
|   - 若未手动写 proxies，则脚本会根据筛选 / 剔除逻辑自动生成。
|
| - select 分组特殊行为：
|   - 自动生成 proxies 的 select 分组会自动附加 ["DIRECT", "REJECT"]；
|   - url-test / fallback 等非 select 分组不会自动附加这两个选项。
|
*/

/*
|--------------------------------------------------------------------------
| ⚙️ Core Logic
|--------------------------------------------------------------------------
*/

let proxy_group_index = 3;

/**
 * 主函数，处理 Clash 配置
 * @param {object} config - 原始 Clash 配置对象
 * @returns {object} - 修改后的 Clash 配置对象
 */
function main(config) {
  // 1) 确保基础结构存在
  ensureConfigStructure(config);

  // 2) DNS 注入
  applyDNS(config);

  // 3) 直接覆写机场下发的 rules / rule-providers / proxy-groups，仅保留 proxies
  resetOverriddenSections(config);

  // 4) 初始化内置分组插入位置
  resetProxyGroupInsertIndex();

  // 5) 创建并插入内置分组：当前选择 / 自动选择 / 故障转移
  createBuiltInPolicyGroups(
    config,
    currentSelectName,
    autoSelectName,
    fallbackSelectName,
    customProxyGroups,
    builtInPolicyOptions
  );

  // 6) 附加的 Remote Providers
  const rulesFromExtraProviders = addRemoteProviders(extraRemoteRuleProviders, config);

  // 7) 处理自定义分组，并获取它们生成的规则
  const rulesFromCustomGroups = processCustomGroups(config, customProxyGroups);

  // 8) 最终拼接 rules
  config["rules"] = assembleFinalRules(
    [
      ...rulesFromCustomGroups,
      ...prependRule,
      ...rulesFromExtraProviders
    ],
    appendRule,
    currentSelectName
  );

  return config;
}

/**
 * 1) 确保 config 对象具有必要的数组/对象结构
 * @param {object} config
 */
function ensureConfigStructure(config) {
  config["proxies"] = config["proxies"] ?? [];
  config["proxy-groups"] = config["proxy-groups"] ?? [];
  config["rules"] = config["rules"] ?? [];
  config["rule-providers"] = config["rule-providers"] ?? {};
}

/**
 * 2) 应用 DNS 配置（驼峰自动转 kebab-case）
 * @param {object} config
 */
function applyDNS(config) {
  if (!userDNS || typeof userDNS !== "object") return;
  config["dns"] = deepConvertKeysToKebabCase(userDNS);
}

/**
 * 3) 直接覆写机场下发的 rules / rule-providers / proxy-groups，仅保留 proxies
 * @param {object} config
 */
function resetOverriddenSections(config) {
  config["proxy-groups"] = [];
  config["rules"] = [];
  config["rule-providers"] = {};
}

/**
 * 4) 重置自定义分组插入位置
 * - 避免重复执行 main 时索引错乱
 */
function resetProxyGroupInsertIndex() {
  proxy_group_index = 3;
}

/**
 * 5) 创建并插入内置分组：当前选择 / 自动选择 / 故障转移
 * @param {object} config
 * @param {string} currentSelectName
 * @param {string} autoSelectName
 * @param {string} fallbackSelectName
 * @param {object[]} customProxyGroups
 * @param {object} builtInPolicyOptions
 */
function createBuiltInPolicyGroups(
  config,
  currentSelectName,
  autoSelectName,
  fallbackSelectName,
  customProxyGroups,
  builtInPolicyOptions
) {
  const proxyNames = getAllProxyNames(config);
  const customGroupNames = (customProxyGroups ?? [])
    .map(group => group && group.name)
    .filter(Boolean);

  /**
   * 当前选择分组默认可选项
   * - 当前选择本身是 select 分组；
   * - 因此默认额外附加 DIRECT / REJECT。
   */
  const currentGroupOptions = uniqueItems([
    autoSelectName,
    fallbackSelectName,
    ...customGroupNames,
    ...proxyNames,
    ...getDefaultSelectExtras()
  ]);

  const currentGroup = {
    name: currentSelectName,
    type: "select",
    proxies: currentGroupOptions
  };

  const autoGroup = {
    name: autoSelectName,
    type: "url-test",
    url: builtInPolicyOptions.url,
    interval: builtInPolicyOptions.interval,
    tolerance: builtInPolicyOptions.tolerance,
    proxies: proxyNames.slice()
  };

  const fallbackGroup = {
    name: fallbackSelectName,
    type: "fallback",
    url: builtInPolicyOptions.url,
    interval: builtInPolicyOptions.interval,
    proxies: proxyNames.slice()
  };

  config["proxy-groups"].push(currentGroup, autoGroup, fallbackGroup);
}

/**
 * 6) 处理自定义分组，将其添加到 config，并返回生成的规则
 * @param {object} config
 * @param {object[]} customProxyGroups - 用户定义的自定义分组
 * @returns {string[]} - 生成的规则数组（用于前置）
 */
function processCustomGroups(config, customProxyGroups) {
  const generatedRules = [];

  // 预存所有原始代理对象，供分组内筛选 / 剔除使用
  const allProxyObjects = Array.isArray(config["proxies"]) ? config["proxies"].slice() : [];

  for (let gi = 0; gi < customProxyGroups.length; gi++) {
    const originalGroup = customProxyGroups[gi];
    if (!originalGroup || !originalGroup.name) continue;

    // 先规范化分组对象，补齐默认 type
    const normalizedGroup = normalizeCustomProxyGroup(originalGroup);

    // 构造最终写入 Clash 的分组对象
    const outputGroup = buildOutputProxyGroup(normalizedGroup, allProxyObjects);

    // 插入到 proxy-groups 中
    config["proxy-groups"].splice(proxy_group_index, 0, outputGroup);
    proxy_group_index++;

    // 收集该分组对应的本地规则
    generatedRules.push(...buildRulesFromLocalRules(normalizedGroup));

    // 收集该分组对应的远程规则
    generatedRules.push(...buildRulesFromRemoteProviders(normalizedGroup, config));
  }

  return generatedRules;
}

/**
 * 7) 拼接最终的规则列表
 * @param {string[]} prependRules - 所有要前置的规则
 * @param {string[]} appendRules - 所有要追加的规则
 * @param {string} currentSelectName - "当前选择" 分组名（用于 MATCH）
 * @returns {string[]} - 最终规则数组
 */
function assembleFinalRules(prependRules, appendRules, currentSelectName) {
  const finalRules = [];

  if (Array.isArray(prependRules) && prependRules.length > 0) {
    finalRules.push(...prependRules);
  }

  if (Array.isArray(appendRules) && appendRules.length > 0) {
    finalRules.push(...appendRules);
  }

  finalRules.push(`MATCH,${currentSelectName}`);

  return finalRules;
}

/**
 * 规范化自定义分组配置
 * - 补齐默认 type
 * - 保持原配置不被直接修改
 * @param {object} group - 原始分组配置
 * @returns {object} - 规范化后的分组配置
 */
function normalizeCustomProxyGroup(group) {
  const normalizedGroup = { ...group };

  // 若未填写 type，则默认使用 select
  normalizedGroup.type = normalizedGroup.type ?? "select";

  return normalizedGroup;
}

/**
 * 根据规范化后的分组配置构造最终输出到 Clash 的分组对象
 * @param {object} group - 规范化后的分组配置
 * @param {object[]} allProxyObjects - 所有原始代理对象
 * @returns {object} - 输出到 Clash 的 proxy-group 对象
 */
function buildOutputProxyGroup(group, allProxyObjects) {
  // 保持与原脚本语义一致的对象形态，同时剥离内部配置字段
  const outputGroup = { ...group };
  delete outputGroup.rules;
  delete outputGroup.remoteRuleProviders;
  delete outputGroup.excludeProxyNames;
  delete outputGroup.excludeProxyServers;
  delete outputGroup.includeProxyNames;
  delete outputGroup.includeProxyServers;

  // 若用户未手动指定 proxies，则按脚本逻辑自动生成
  if (outputGroup.proxies == null) {
    // 先基于原始代理对象执行本分组自己的筛选 / 剔除逻辑
    const filteredProxyNames = filterProxyNamesByGroupRules(group, allProxyObjects);

    // 若筛选结果为空，则回退到全部真实节点，并强制改为 select，避免空 proxies 报错
    if (filteredProxyNames.length === 0) {
      outputGroup.type = "select";
      outputGroup.proxies = buildGroupProxiesByType(
        outputGroup.type,
        getProxyNamesFromProxyObjects(allProxyObjects)
      );
    } else {
      // 筛选结果非空时，按原分组类型正常构造 proxies
      outputGroup.proxies = buildGroupProxiesByType(group.type, filteredProxyNames);
    }
  } else {
    // 若用户手动指定了 proxies，则仅做去重，保持用户意图优先
    outputGroup.proxies = uniqueItems(outputGroup.proxies);
  }

  return outputGroup;
}

/**
 * 从原始代理对象中提取节点名称
 * @param {object[]} proxyObjects - 所有原始代理对象
 * @returns {string[]} - 节点名称数组
 */
function getProxyNamesFromProxyObjects(proxyObjects) {
  const names = [];

  if (!Array.isArray(proxyObjects)) {
    return names;
  }

  for (let i = 0; i < proxyObjects.length; i++) {
    const proxy = proxyObjects[i];

    // 只提取存在 name 的真实节点
    if (proxy && proxy.name) {
      names.push(proxy.name);
    }
  }

  return uniqueItems(names);
}

/**
 * 根据分组类型构造最终 proxies
 * @param {string} groupType - 分组类型
 * @param {string[]} filteredProxyNames - 过滤后的真实节点名称
 * @returns {string[]} - 最终 proxies 数组
 */
function buildGroupProxiesByType(groupType, filteredProxyNames) {
  // 仅 select 分组自动附加 DIRECT / REJECT
  if (groupType === "select") {
    return uniqueItems([
      ...filteredProxyNames,
      ...getDefaultSelectExtras()
    ]);
  }

  // 非 select 分组只保留真实节点
  return uniqueItems(filteredProxyNames);
}

/**
 * 获取 select 分组的默认附加选项
 * @returns {string[]} - 默认附加选项
 */
function getDefaultSelectExtras() {
  return ["DIRECT", "REJECT"];
}

/**
 * 根据本地 rules 构造规则列表
 * @param {object} group - 规范化后的分组配置
 * @returns {string[]} - 生成的规则数组
 */
function buildRulesFromLocalRules(group) {
  const generatedRules = [];

  if (!Array.isArray(group.rules)) {
    return generatedRules;
  }

  for (let ri = 0; ri < group.rules.length; ri++) {
    const rule = group.rules[ri];

    // 将本地规则绑定到当前分组
    generatedRules.push(`${rule},${group.name}`);
  }

  return generatedRules;
}

/**
 * 根据远程规则提供者构造规则列表，并写入 rule-providers
 * @param {object} group - 规范化后的分组配置
 * @param {object} config - Clash 配置
 * @returns {string[]} - 生成的规则数组
 */
function buildRulesFromRemoteProviders(group, config) {
  const generatedRules = [];

  if (!Array.isArray(group.remoteRuleProviders)) {
    return generatedRules;
  }

  for (let rpi = 0; rpi < group.remoteRuleProviders.length; rpi++) {
    const provider = group.remoteRuleProviders[rpi];

    // 若 provider 未显式指定 target，则默认指向当前 group.name
    const remoteRule = addRemoteProvider(
      {
        ...provider,
        target: provider && provider.target != null ? provider.target : group.name
      },
      config
    );

    if (remoteRule) {
      generatedRules.push(remoteRule);
    }
  }

  return generatedRules;
}

/**
 * (Helper) 添加远程规则提供者到 config，并返回对应的 RULE-SET 字符串
 * @param {object} rp - 远程规则提供者配置
 * @param {object} config - Clash 配置
 * @returns {string | null} - RULE-SET 规则字符串，失败返回 null
 */
function addRemoteProvider(rp, config) {
  if (!rp || !rp.id || !rp.url || !rp.target) return null; // 检查无效 provider

  config["rule-providers"][rp.id] = {
    type: "http",
    behavior: rp.behavior ?? "classical",
    url: rp.url,
    path: rp.path ?? `./rules/${rp.id}.yaml`,
    interval: rp.interval ?? 86400
  };

  // 返回规则字符串，而不是修改全局变量
  return `RULE-SET,${rp.id},${rp.target}`;
}

/**
 * (Helper) 批量添加远程规则提供者
 * @param {object[]} providers
 * @param {object} config
 * @returns {string[]} - RULE-SET 规则字符串数组
 */
function addRemoteProviders(providers, config) {
  const generatedRules = [];

  for (let i = 0; i < providers.length; i++) {
    const rp = providers[i];
    const rule = addRemoteProvider(rp, config);
    if (rule) {
      generatedRules.push(rule);
    }
  }

  return generatedRules;
}

/**
 * (Helper) 获取所有节点名称
 * @param {object} config
 * @returns {string[]}
 */
function getAllProxyNames(config) {
  const names = [];

  for (let i = 0; i < config["proxies"].length; i++) {
    const proxyName = config["proxies"][i] && config["proxies"][i].name
      ? config["proxies"][i].name
      : null;

    if (proxyName) {
      names.push(proxyName);
    }
  }

  return uniqueItems(names);
}

/**
 * (Helper) 根据分组内的 include / exclude 配置筛选代理节点，并返回节点名称列表
 * @param {object} group - 当前自定义分组配置
 * @param {object[]} proxyObjects - 所有原始代理对象
 * @returns {string[]} - 过滤后的节点名称列表
 */
function filterProxyNamesByGroupRules(group, proxyObjects) {
  // 读取分组级的筛选 / 剔除配置；若未提供则回退为空数组
  const includeNameKeywords = Array.isArray(group.includeProxyNames) ? group.includeProxyNames : [];
  const includeServerKeywords = Array.isArray(group.includeProxyServers) ? group.includeProxyServers : [];
  const excludeNameKeywords = Array.isArray(group.excludeProxyNames) ? group.excludeProxyNames : [];
  const excludeServerKeywords = Array.isArray(group.excludeProxyServers) ? group.excludeProxyServers : [];

  // 只要任一 include 数组有值，就启用“筛选模式”
  const hasIncludeRules = includeNameKeywords.length > 0 || includeServerKeywords.length > 0;

  // 执行顺序：先 include 筛选，再 exclude 剔除
  const result = [];

  for (let i = 0; i < proxyObjects.length; i++) {
    const proxy = proxyObjects[i];
    if (!proxy) continue;

    // 读取节点名称与 server，供关键字匹配使用
    const proxyName = proxy.name ? String(proxy.name) : "";
    const proxyServer = proxy.server ? String(proxy.server) : "";

    // 默认在非筛选模式下先视为通过；若启用筛选模式，则默认不通过
    let included = !hasIncludeRules;

    if (hasIncludeRules) {
      // 名称命中 include 关键字则通过
      if (matchesAnyKeyword(proxyName, includeNameKeywords)) {
        included = true;
      }

      // server 命中 include 关键字也通过
      if (!included && matchesAnyKeyword(proxyServer, includeServerKeywords)) {
        included = true;
      }
    }

    // 如果筛选阶段没通过，直接跳过
    if (!included) {
      continue;
    }

    // 名称命中 exclude 关键字则剔除
    if (matchesAnyKeyword(proxyName, excludeNameKeywords)) {
      continue;
    }

    // server 命中 exclude 关键字也剔除
    if (matchesAnyKeyword(proxyServer, excludeServerKeywords)) {
      continue;
    }

    // 最终保留该节点名称
    if (proxyName) {
      result.push(proxyName);
    }
  }

  return uniqueItems(result);
}

/**
 * (Helper) 判断某个字符串是否命中任一关键字
 * @param {string} text - 待匹配文本
 * @param {string[]} keywords - 关键字数组
 * @returns {boolean} - 是否命中
 */
function matchesAnyKeyword(text, keywords) {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return false;
  }

  const sourceText = text == null ? "" : String(text);

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];

    // 跳过空关键字，避免误匹配
    if (keyword == null || keyword === "") {
      continue;
    }

    if (sourceText.includes(String(keyword))) {
      return true;
    }
  }

  return false;
}

/**
 * (Helper) 数组去重并过滤空值
 * @param {Array} arr
 * @returns {Array}
 */
function uniqueItems(arr) {
  const out = [];
  const seen = new Set();

  if (!Array.isArray(arr)) return out;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item == null || item === "") continue;

    if (!seen.has(item)) {
      seen.add(item);
      out.push(item);
    }
  }

  return out;
}

/**
 * (Helper) 深度将对象 key 从 camelCase 转为 kebab-case
 * @param {any} value
 * @returns {any}
 */
function deepConvertKeysToKebabCase(value) {
  if (Array.isArray(value)) {
    return value.map(item => deepConvertKeysToKebabCase(item));
  }

  if (value && typeof value === "object") {
    const out = {};
    const keys = Object.keys(value);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      // 递归转换对象键名
      out[camelToKebabCase(key)] = deepConvertKeysToKebabCase(value[key]);
    }

    return out;
  }

  return value;
}

/**
 * (Helper) camelCase -> kebab-case
 * @param {string} str
 * @returns {string}
 */
function camelToKebabCase(str) {
  return String(str)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}
