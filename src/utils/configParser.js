module.exports = {
  parse : function parse(code) {
    const configMap = {};
    let currentSegment;
  
    code.split`\n`.forEach((line = line.trim()) => {
      if (line) {
        if (line.includes("=")) {
          const [key, rawValue] = line.split("=").map((str) => str.trim());
          const value =
            rawValue.startsWith('"') && rawValue.endsWith('"')
              ? rawValue.slice(1, -1)
              : !isNaN(rawValue)
              ? +rawValue
              : rawValue.toLowerCase() === "true"
              ? true
              : rawValue.toLowerCase() === "false"
              ? false
              : rawValue;
  
          if (currentSegment) configMap[currentSegment][key] = value;
          else configMap[key] = value;
        } else (currentSegment = line), (configMap[currentSegment] = {});
      }
    });
  
    return configMap;
  }
} 