import "./chunk-DC5AMYBS.js";

// node_modules/@pandatix/js-cvss/dist/errors.js
var InvalidMetric = class extends Error {
  constructor(version, metric) {
    super("invalid CVSS v" + version + " metric " + metric);
    this.version = version;
    this.metric = metric;
  }
};
var InvalidMetricValue = class extends Error {
  constructor(version, metric, value) {
    super("invalid CVSS v" + version + " value " + value + " for metric " + metric);
    this.version = version;
    this.metric = metric;
    this.value = value;
  }
};

// node_modules/@pandatix/js-cvss/dist/cvss20.js
var re = /^(AV:[LAN])\/(AC:[LMH])\/(Au:[MSN])\/(C:[NPC])\/(I:[NPC])\/(A:[NPC])(?:\/(E:(?:ND|U|POC|F|H))\/(RL:(?:ND|OF|TF|W|U))\/(RC:(?:ND|UC|UR|C)))?(?:\/(CDP:(?:ND|N|L|LM|MH|H))\/(TD:(?:ND|N|L|M|H))\/(CR:(?:ND|L|M|H))\/(IR:(?:ND|L|M|H))\/(AR:(?:ND|L|M|H)))?$/g;
var CVSS20 = class _CVSS20 {
  /**
   * Construct a CVSS v2.0 object, and parse the vector if provided.
   * If not, the Base metrics is set to the default values (score = 0).
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  constructor(vector = "AV:L/AC:L/Au:M/C:N/I:N/A:N") {
    this._metrics = {
      // Set default values of non-mandatory metrics : Not Defined (ND)
      // => Temporal
      "E": "ND",
      "RL": "ND",
      "RC": "ND",
      // => Environmental
      "CDP": "ND",
      "TD": "ND",
      "CR": "ND",
      "IR": "ND",
      "AR": "ND"
    };
    this.parse(vector);
  }
  /**
   * Parse the provided vector.
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  parse(vector) {
    let matches = vector.matchAll(re).next().value;
    if (matches == void 0) {
      throw new Error("invalid CVSS v2.0 vector");
    }
    matches.shift();
    for (let match of matches) {
      if (match == void 0) {
        continue;
      }
      const pts = match.split(":");
      this._metrics[pts[0]] = pts[1];
    }
  }
  /**
   * Return the vector string representation of the CVSS v2.0 object.
   *
   * @return The vector string representation.
   */
  Vector() {
    let vector = "";
    const app = (metric) => {
      vector += "/" + metric + ":" + this._metrics[metric];
    };
    const def = (metric) => {
      this._metrics[metric] != "ND";
    };
    ["AV", "AC", "Au", "C", "I", "A"].forEach(app);
    if (["E", "RL", "RC"].some(def)) {
      ["E", "RL", "RC"].forEach(app);
    }
    if (["CDP", "TD", "CR", "IR", "AR"].some(def)) {
      ["CDP", "TD", "CR", "IR", "AR"].forEach(app);
    }
    return vector.slice(1);
  }
  /**
   * Get the metric value given its value (e.g. 'AV').
   *
   * @param metric The metric to get the value of.
   * @return The corresponding metric value.
   * @throws Metric does not exist.
   */
  Get(metric) {
    const v = this._metrics[metric];
    if (v == void 0) {
      throw new InvalidMetric("2.0", metric);
    }
    return v;
  }
  /**
   * Set the metric value given its key and value (e.g. 'AV' and 'L').
   *
   * @param metric The metric to set the value of.
   * @param value The corresponding metric value.
   * @throws Metric does not exist or has an invalid value.
   */
  Set(metric, value) {
    const values = metrics[metric];
    if (values == void 0) {
      throw new InvalidMetric("2.0", metric);
    }
    if (!values.includes(value)) {
      throw new InvalidMetricValue("2.0", metric, value);
    }
    this._metrics[metric] = value;
  }
  /**
   * Compute the CVSS v2.0 Impact score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 20.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Impact() {
    const c = scores["CIA"][this._metrics["C"]];
    const i = scores["CIA"][this._metrics["I"]];
    const a = scores["CIA"][this._metrics["A"]];
    return 10.41 * (1 - (1 - c) * (1 - i) * (1 - a));
  }
  /**
   * Compute the CVSS v2.0 Exploitability score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 20.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Exploitability() {
    const av = scores["AV"][this._metrics["AV"]];
    const ac = scores["AC"][this._metrics["AC"]];
    const au = scores["Au"][this._metrics["Au"]];
    return 20 * av * ac * au;
  }
  /**
   * Compute the CVSS v2.0 Base score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 20.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  BaseScore() {
    const impact = this.Impact();
    let fimpact = 0;
    if (impact != 0) {
      fimpact = 1.176;
    }
    const exploitability = this.Exploitability();
    return _CVSS20.roundTo1Decimal((0.6 * impact + 0.4 * exploitability - 1.5) * fimpact);
  }
  /**
   * Compute the CVSS v2.0 Temporal score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 20.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  TemporalScore() {
    const e = scores["E"][this._metrics["E"]];
    const rl = scores["RL"][this._metrics["RL"]];
    const rc = scores["RC"][this._metrics["RC"]];
    return _CVSS20.roundTo1Decimal(this.BaseScore() * e * rl * rc);
  }
  /**
   * Compute the CVSS v2.0 Environmental score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 20.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  EnvironmentalScore() {
    const c = scores["CIA"][this._metrics["C"]];
    const i = scores["CIA"][this._metrics["I"]];
    const a = scores["CIA"][this._metrics["A"]];
    const cr = scores["CIAR"][this._metrics["CR"]];
    const ir = scores["CIAR"][this._metrics["IR"]];
    const ar = scores["CIAR"][this._metrics["AR"]];
    const adujstedImpact = Math.min(10, 10.41 * (1 - (1 - c * cr) * (1 - i * ir) * (1 - a * ar)));
    let fimpacBase = 0;
    if (adujstedImpact != 0) {
      fimpacBase = 1.176;
    }
    const expltBase = this.Exploitability();
    const e = scores["E"][this._metrics["E"]];
    const rl = scores["RL"][this._metrics["RL"]];
    const rc = scores["RC"][this._metrics["RC"]];
    const recBase = _CVSS20.roundTo1Decimal((0.6 * adujstedImpact + 0.4 * expltBase - 1.5) * fimpacBase);
    const adjustedTemporal = _CVSS20.roundTo1Decimal(recBase * e * rl * rc);
    const cdp = scores["CDP"][this._metrics["CDP"]];
    const td = scores["TD"][this._metrics["TD"]];
    return _CVSS20.roundTo1Decimal((adjustedTemporal + (10 - adjustedTemporal) * cdp) * td);
  }
  static roundTo1Decimal(x) {
    return Math.round(x * 10) / 10;
  }
};
var metrics = {
  // Base
  "AV": ["L", "A", "N"],
  "AC": ["L", "M", "H"],
  "Au": ["M", "S", "N"],
  "C": ["N", "P", "C"],
  "I": ["N", "P", "C"],
  "A": ["N", "P", "C"],
  // Temporal
  "E": ["ND", "U", "POC", "F", "H"],
  "RL": ["ND", "OF", "TF", "W", "U"],
  "RC": ["ND", "UC", "UR", "C"],
  // Environmental
  "CDP": ["ND", "N", "L", "LM", "MH", "H"],
  "TD": ["ND", "N", "L", "M", "H"],
  "CR": ["ND", "L", "M", "H"],
  "IR": ["ND", "L", "M", "H"],
  "AR": ["ND", "L", "M", "H"]
};
var scores = {
  "AV": {
    "L": 0.395,
    "A": 0.646,
    "N": 1
  },
  "AC": {
    "H": 0.35,
    "M": 0.61,
    "L": 0.71
  },
  "Au": {
    "M": 0.45,
    "S": 0.56,
    "N": 0.704
  },
  "CIA": {
    "N": 0,
    "P": 0.275,
    "C": 0.66
  },
  "E": {
    "U": 0.85,
    "POC": 0.9,
    "F": 0.95,
    "H": 1,
    "ND": 1
  },
  "RL": {
    "OF": 0.87,
    "TF": 0.9,
    "W": 0.95,
    "U": 1,
    "ND": 1
  },
  "RC": {
    "UC": 0.9,
    "UR": 0.95,
    "C": 1,
    "ND": 1
  },
  "CDP": {
    "N": 0,
    "ND": 0,
    "L": 0.1,
    "LM": 0.3,
    "MH": 0.4,
    "H": 0.5
  },
  "TD": {
    "N": 0,
    "L": 0.25,
    "M": 0.75,
    "H": 1,
    "ND": 1
  },
  "CIAR": {
    "L": 0.5,
    "M": 1,
    "ND": 1,
    "H": 0.51
  }
};

// node_modules/@pandatix/js-cvss/dist/cvss30.js
var cvss30header = "CVSS:3.0/";
var CVSS30 = class _CVSS30 {
  /**
   * Construct a CVSS v3.0 object, and parse the vector if provided.
   * If not, the Base metrics is set to the default values (score = 0).
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  constructor(vector = "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N") {
    this._metrics = {
      // Set default values of non-mandatory metrics : Not Defined (X)
      // => Temporal
      "E": "X",
      "RL": "X",
      "RC": "X",
      // => Environmental
      "CR": "X",
      "IR": "X",
      "AR": "X",
      "MAV": "X",
      "MAC": "X",
      "MPR": "X",
      "MUI": "X",
      "MS": "X",
      "MC": "X",
      "MI": "X",
      "MA": "X"
    };
    this.parse(vector);
  }
  /**
   * Parse the provided vector.
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  parse(vector) {
    if (!vector.startsWith(cvss30header)) {
      throw new Error("invalid vector");
    }
    vector = vector.substring(cvss30header.length);
    let kvm = {};
    let metrics2 = vector.split("/");
    for (let metric of metrics2) {
      let pts = metric.split(":");
      if (pts.length != 2) {
        throw new Error("invalid vector");
      }
      if (kvm[pts[0]] != void 0) {
        throw new Error("metric " + pts[0] + " already defined");
      }
      kvm[pts[0]] = pts[1];
      this.Set(pts[0], pts[1]);
    }
    if (["AV", "AC", "AT", "PR", "UI", "S", "C", "I", "A"].some((metric) => {
      this._metrics[metric] == void 0;
    })) {
      throw new Error("all mandatory metrics are not provided");
    }
  }
  /**
   * Return the vector string representation of the CVSS v3.0 object.
   *
   * @return The vector string representation.
   */
  Vector() {
    let vector = "CVSS:3.0";
    for (let metric in Object.entries(this._metrics)) {
      let value = this.Get(metric);
      if (value == "X") {
        continue;
      }
      vector += "/" + metric + ":" + value;
    }
    return vector;
  }
  /**
   * Get the metric value given its value (e.g. 'AV').
   *
   * @param metric The metric to get the value of.
   * @return The corresponding metric value.
   * @throws Metric does not exist.
   */
  Get(metric) {
    const v = this._metrics[metric];
    if (v == void 0) {
      throw new InvalidMetric("3.0", metric);
    }
    return v;
  }
  /**
   * Set the metric value given its key and value (e.g. 'AV' and 'L').
   *
   * @param metric The metric to set the value of.
   * @param value The corresponding metric value.
   * @throws Metric does not exist or has an invalid value.
   */
  Set(metric, value) {
    if (metricValues[metric] == void 0) {
      throw new InvalidMetric("3.0", metric);
    }
    if (!metricValues[metric].includes(value)) {
      throw new InvalidMetricValue("3.0", metric, value);
    }
    this._metrics[metric] = value;
  }
  /**
   * Compute the CVSS v3.0 Impact of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 30.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Impact() {
    const c = scores2["CIA"][this._metrics["C"]];
    const i = scores2["CIA"][this._metrics["I"]];
    const a = scores2["CIA"][this._metrics["A"]];
    const iss = 1 - (1 - c) * (1 - i) * (1 - a);
    if (this._metrics["S"] == "U") {
      return 6.42 * iss;
    }
    return 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
  }
  /**
   * Compute the CVSS v3.0 Exploitability of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 30.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Exploitability() {
    const av = scores2["AV"][this._metrics["AV"]];
    const ac = scores2["AC"][this._metrics["AC"]];
    const pr = scores2["PR"][this._metrics["PR"]][this._metrics["S"]];
    const ui = scores2["UI"][this._metrics["UI"]];
    return 8.22 * av * ac * pr * ui;
  }
  /**
   * Compute the CVSS v3.0 Base Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 30.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  BaseScore() {
    const impact = this.Impact();
    const exploitability = this.Exploitability();
    if (impact <= 0) {
      return 0;
    }
    if (this._metrics["S"] == "U") {
      return _CVSS30.roundup(Math.min(impact + exploitability, 10));
    }
    return _CVSS30.roundup(Math.min(1.08 * (impact + exploitability), 10));
  }
  /**
   * Compute the CVSS v3.0 Temporal Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 30.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  TemporalScore() {
    const e = scores2["E"][this._metrics["E"]];
    const rl = scores2["RL"][this._metrics["RL"]];
    const rc = scores2["RC"][this._metrics["RC"]];
    return _CVSS30.roundup(this.BaseScore() * e * rl * rc);
  }
  /**
   * Compute the CVSS v3.0 Environmental Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 30.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  EnvironmentalScore() {
    const mav = scores2["AV"][this.getReal("AV")];
    const mac = scores2["AC"][this.getReal("AC")];
    const mpr = scores2["PR"][this.getReal("PR")][this._metrics["S"]];
    const mui = scores2["UI"][this.getReal("UI")];
    const s = this.getReal("S");
    const c = scores2["CIA"][this.getReal("C")];
    const i = scores2["CIA"][this.getReal("I")];
    const a = scores2["CIA"][this.getReal("A")];
    const cr = scores2["CIAR"][this._metrics["CR"]];
    const ir = scores2["CIAR"][this._metrics["IR"]];
    const ar = scores2["CIAR"][this._metrics["AR"]];
    const e = scores2["E"][this._metrics["E"]];
    const rl = scores2["RL"][this._metrics["RL"]];
    const rc = scores2["RC"][this._metrics["RC"]];
    const miss = Math.min(1 - (1 - cr * c) * (1 - ir * i) * (1 - ar * a), 0.915);
    let modifiedImpact;
    if (s == "U") {
      modifiedImpact = 6.42 * miss;
    } else {
      modifiedImpact = 7.52 * (miss - 0.029) - 3.25 * Math.pow(miss - 0.02, 15);
    }
    let modifiedExploitability = 8.22 * mav * mac * mpr * mui;
    if (modifiedImpact <= 0) {
      return 0;
    }
    if (s == "U") {
      return _CVSS30.roundup(_CVSS30.roundup(Math.min(modifiedImpact + modifiedExploitability, 10)) * e * rl * rc);
    }
    return _CVSS30.roundup(_CVSS30.roundup(Math.min(1.08 * (modifiedImpact + modifiedExploitability), 10)) * e * rl * rc);
  }
  getReal(metric) {
    if (["AV", "AC", "PR", "UI", "S", "C", "I", "A"].includes(metric)) {
      const v = this.Get("M" + metric);
      if (v != "X") {
        return v;
      }
      return this.Get(metric);
    }
    return this.Get(metric);
  }
  static roundup(x) {
    let bx = Math.round(x * 1e5);
    if (bx % 1e3 == 0) {
      return bx / 1e5;
    }
    return (Math.floor(bx / 1e4) + 1) / 10;
  }
  /**
   * Give the corresponding rating of the provided score.
   *
   * @param score The score to rate.
   * @return The rating.
   * @throws When the score is out of bounds.
   */
  static Rating(score) {
    if (score < 0 || score > 10) {
      throw new Error("score out of bounds");
    }
    if (score >= 9) {
      return "CRITICAL";
    }
    if (score >= 7) {
      return "HIGH";
    }
    if (score >= 4) {
      return "MEDIUM";
    }
    if (score >= 0.1) {
      return "LOW";
    }
    return "NONE";
  }
};
var metricValues = {
  "AV": ["N", "A", "L", "P"],
  "AC": ["L", "H"],
  "PR": ["N", "L", "H"],
  "UI": ["N", "R"],
  "S": ["U", "C"],
  "C": ["H", "L", "N"],
  "I": ["H", "L", "N"],
  "A": ["H", "L", "N"],
  "E": ["X", "H", "F", "P", "U"],
  "RL": ["X", "U", "W", "T", "O"],
  "RC": ["X", "C", "R", "U"],
  "CR": ["X", "H", "M", "L"],
  "IR": ["X", "H", "M", "L"],
  "AR": ["X", "H", "M", "L"],
  "MAV": ["X", "N", "A", "L", "P"],
  "MAC": ["X", "L", "H"],
  "MPR": ["X", "N", "L", "H"],
  "MUI": ["X", "N", "R"],
  "MS": ["X", "U", "C"],
  "MC": ["X", "H", "L", "N"],
  "MI": ["X", "H", "L", "N"],
  "MA": ["X", "H", "L", "N"]
};
var scores2 = {
  "AV": {
    "N": 0.85,
    "A": 0.62,
    "L": 0.55,
    "P": 0.2
  },
  "AC": {
    "L": 0.77,
    "H": 0.44
  },
  "PR": {
    "N": {
      "U": 0.85,
      "C": 0.85
    },
    "L": {
      "U": 0.62,
      "C": 0.68
    },
    "H": {
      "U": 0.27,
      "C": 0.5
    }
  },
  "UI": {
    "N": 0.85,
    "R": 0.62
  },
  "CIA": {
    "H": 0.56,
    "L": 0.22,
    "N": 0
  },
  "E": {
    "X": 1,
    "H": 1,
    "F": 0.97,
    "P": 0.94,
    "U": 0.91
  },
  "RL": {
    "X": 1,
    "U": 1,
    "W": 0.97,
    "T": 0.96,
    "O": 0.95
  },
  "RC": {
    "X": 1,
    "C": 1,
    "R": 0.96,
    "U": 0.92
  },
  "CIAR": {
    "X": 1,
    "M": 1,
    "H": 1.5,
    "L": 0.5
  }
};

// node_modules/@pandatix/js-cvss/dist/cvss31.js
var cvss31header = "CVSS:3.1/";
var CVSS31 = class _CVSS31 {
  /**
   * Construct a CVSS v3.1 object, and parse the vector if provided.
   * If not, the Base metrics is set to the default values (score = 0).
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  constructor(vector = "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N") {
    this._metrics = {
      // Set default values of non-mandatory metrics : Not Defined (X)
      // => Temporal
      "E": "X",
      "RL": "X",
      "RC": "X",
      // => Environmental
      "CR": "X",
      "IR": "X",
      "AR": "X",
      "MAV": "X",
      "MAC": "X",
      "MPR": "X",
      "MUI": "X",
      "MS": "X",
      "MC": "X",
      "MI": "X",
      "MA": "X"
    };
    this.parse(vector);
  }
  /**
   * Parse the provided vector.
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  parse(vector) {
    if (!vector.startsWith(cvss31header)) {
      throw new Error("invalid vector");
    }
    vector = vector.substring(cvss31header.length);
    let kvm = {};
    let metrics2 = vector.split("/");
    for (let metric of metrics2) {
      let pts = metric.split(":");
      if (pts.length != 2) {
        throw new Error("invalid vector");
      }
      if (kvm[pts[0]] != void 0) {
        throw new Error("metric " + pts[0] + " already defined");
      }
      kvm[pts[0]] = pts[1];
      this.Set(pts[0], pts[1]);
    }
    if (["AV", "AC", "AT", "PR", "UI", "S", "C", "I", "A"].some((metric) => {
      this._metrics[metric] == void 0;
    })) {
      throw new Error("all mandatory metrics are not provided");
    }
  }
  /**
   * Return the vector string representation of the CVSS v3.1 object.
   *
   * @return The vector string representation.
   */
  Vector() {
    let vector = "CVSS:3.1";
    for (let metric in Object.entries(this._metrics)) {
      let value = this.Get(metric);
      if (value == "X") {
        continue;
      }
      vector += "/" + metric + ":" + value;
    }
    return vector;
  }
  /**
   * Get the metric value given its value (e.g. 'AV').
   *
   * @param metric The metric to get the value of.
   * @return The corresponding metric value.
   * @throws Metric does not exist.
   */
  Get(metric) {
    const v = this._metrics[metric];
    if (v == void 0) {
      throw new InvalidMetric("3.1", metric);
    }
    return v;
  }
  /**
   * Set the metric value given its key and value (e.g. 'AV' and 'L').
   *
   * @param metric The metric to set the value of.
   * @param value The corresponding metric value.
   * @throws Metric does not exist or has an invalid value.
   */
  Set(metric, value) {
    if (metricValues2[metric] == void 0) {
      throw new InvalidMetric("3.1", metric);
    }
    if (!metricValues2[metric].includes(value)) {
      throw new InvalidMetricValue("3.1", metric, value);
    }
    this._metrics[metric] = value;
  }
  /**
   * Compute the CVSS v3.1 Impact of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 31.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Impact() {
    const c = scores3["CIA"][this._metrics["C"]];
    const i = scores3["CIA"][this._metrics["I"]];
    const a = scores3["CIA"][this._metrics["A"]];
    const iss = 1 - (1 - c) * (1 - i) * (1 - a);
    if (this._metrics["S"] == "U") {
      return 6.42 * iss;
    }
    return 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
  }
  /**
   * Compute the CVSS v3.1 Exploitability of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 31.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Exploitability() {
    const av = scores3["AV"][this._metrics["AV"]];
    const ac = scores3["AC"][this._metrics["AC"]];
    const pr = scores3["PR"][this._metrics["PR"]][this._metrics["S"]];
    const ui = scores3["UI"][this._metrics["UI"]];
    return 8.22 * av * ac * pr * ui;
  }
  /**
   * Compute the CVSS v3.1 Base Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 31.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  BaseScore() {
    const impact = this.Impact();
    const exploitability = this.Exploitability();
    if (impact <= 0) {
      return 0;
    }
    if (this._metrics["S"] == "U") {
      return _CVSS31.roundup(Math.min(impact + exploitability, 10));
    }
    return _CVSS31.roundup(Math.min(1.08 * (impact + exploitability), 10));
  }
  /**
   * Compute the CVSS v3.1 Temporal Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 31.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  TemporalScore() {
    const e = scores3["E"][this._metrics["E"]];
    const rl = scores3["RL"][this._metrics["RL"]];
    const rc = scores3["RC"][this._metrics["RC"]];
    return _CVSS31.roundup(this.BaseScore() * e * rl * rc);
  }
  /**
   * Compute the CVSS v3.1 Environmental Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 31.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  EnvironmentalScore() {
    const mav = scores3["AV"][this.getReal("AV")];
    const mac = scores3["AC"][this.getReal("AC")];
    const mpr = scores3["PR"][this.getReal("PR")][this._metrics["S"]];
    const mui = scores3["UI"][this.getReal("UI")];
    const s = this.getReal("S");
    const c = scores3["CIA"][this.getReal("C")];
    const i = scores3["CIA"][this.getReal("I")];
    const a = scores3["CIA"][this.getReal("A")];
    const cr = scores3["CIAR"][this._metrics["CR"]];
    const ir = scores3["CIAR"][this._metrics["IR"]];
    const ar = scores3["CIAR"][this._metrics["AR"]];
    const e = scores3["E"][this._metrics["E"]];
    const rl = scores3["RL"][this._metrics["RL"]];
    const rc = scores3["RC"][this._metrics["RC"]];
    const miss = Math.min(1 - (1 - cr * c) * (1 - ir * i) * (1 - ar * a), 0.915);
    let modifiedImpact;
    if (s == "U") {
      modifiedImpact = 6.42 * miss;
    } else {
      modifiedImpact = 7.52 * (miss - 0.029) - 3.25 * Math.pow(miss * 0.9731 - 0.02, 13);
    }
    let modifiedExploitability = 8.22 * mav * mac * mpr * mui;
    if (modifiedImpact <= 0) {
      return 0;
    }
    if (s == "U") {
      return _CVSS31.roundup(_CVSS31.roundup(Math.min(modifiedImpact + modifiedExploitability, 10)) * e * rl * rc);
    }
    return _CVSS31.roundup(_CVSS31.roundup(Math.min(1.08 * (modifiedImpact + modifiedExploitability), 10)) * e * rl * rc);
  }
  getReal(metric) {
    if (["AV", "AC", "PR", "UI", "S", "C", "I", "A"].includes(metric)) {
      const v = this.Get("M" + metric);
      if (v != "X") {
        return v;
      }
      return this.Get(metric);
    }
    return this.Get(metric);
  }
  static roundup(x) {
    let bx = Math.round(x * 1e5);
    if (bx % 1e3 == 0) {
      return bx / 1e5;
    }
    return (Math.floor(bx / 1e4) + 1) / 10;
  }
  /**
   * Give the corresponding rating of the provided score.
   *
   * @param score The score to rate.
   * @return The rating.
   * @throws When the score is out of bounds.
   */
  static Rating(score) {
    if (score < 0 || score > 10) {
      throw new Error("score out of bounds");
    }
    if (score >= 9) {
      return "CRITICAL";
    }
    if (score >= 7) {
      return "HIGH";
    }
    if (score >= 4) {
      return "MEDIUM";
    }
    if (score >= 0.1) {
      return "LOW";
    }
    return "NONE";
  }
};
var metricValues2 = {
  "AV": ["N", "A", "L", "P"],
  "AC": ["L", "H"],
  "PR": ["N", "L", "H"],
  "UI": ["N", "R"],
  "S": ["U", "C"],
  "C": ["H", "L", "N"],
  "I": ["H", "L", "N"],
  "A": ["H", "L", "N"],
  "E": ["X", "H", "F", "P", "U"],
  "RL": ["X", "U", "W", "T", "O"],
  "RC": ["X", "C", "R", "U"],
  "CR": ["X", "H", "M", "L"],
  "IR": ["X", "H", "M", "L"],
  "AR": ["X", "H", "M", "L"],
  "MAV": ["X", "N", "A", "L", "P"],
  "MAC": ["X", "L", "H"],
  "MPR": ["X", "N", "L", "H"],
  "MUI": ["X", "N", "R"],
  "MS": ["X", "U", "C"],
  "MC": ["X", "H", "L", "N"],
  "MI": ["X", "H", "L", "N"],
  "MA": ["X", "H", "L", "N"]
};
var scores3 = {
  "AV": {
    "N": 0.85,
    "A": 0.62,
    "L": 0.55,
    "P": 0.2
  },
  "AC": {
    "L": 0.77,
    "H": 0.44
  },
  "PR": {
    "N": {
      "U": 0.85,
      "C": 0.85
    },
    "L": {
      "U": 0.62,
      "C": 0.68
    },
    "H": {
      "U": 0.27,
      "C": 0.5
    }
  },
  "UI": {
    "N": 0.85,
    "R": 0.62
  },
  "CIA": {
    "H": 0.56,
    "L": 0.22,
    "N": 0
  },
  "E": {
    "X": 1,
    "H": 1,
    "F": 0.97,
    "P": 0.94,
    "U": 0.91
  },
  "RL": {
    "X": 1,
    "U": 1,
    "W": 0.97,
    "T": 0.96,
    "O": 0.95
  },
  "RC": {
    "X": 1,
    "C": 1,
    "R": 0.96,
    "U": 0.92
  },
  "CIAR": {
    "X": 1,
    "M": 1,
    "H": 1.5,
    "L": 0.5
  }
};

// node_modules/@pandatix/js-cvss/dist/cvss40.js
var re2 = /^CVSS:4[.]0(\/AV:[NALP])(\/AC:[LH])(\/AT:[NP])(\/PR:[NLH])(\/UI:[NPA])(\/VC:[HLN])(\/VI:[HLN])(\/VA:[HLN])(\/SC:[HLN])(\/SI:[HLN])(\/SA:[HLN])(\/E:[XAPU])?(\/CR:[XHML])?(\/IR:[XHML])?(\/AR:[XHML])?(\/MAV:[XNALP])?(\/MAC:[XLH])?(\/MAT:[XNP])?(\/MPR:[XNLH])?(\/MUI:[XNPA])?(\/MVC:[XNLH])?(\/MVI:[XNLH])?(\/MVA:[XNLH])?(\/MSC:[XNLH])?(\/MSI:[XNLHS])?(\/MSA:[XNLHS])?(\/S:[XNP])?(\/AU:[XNY])?(\/R:[XAUI])?(\/V:[XDC])?(\/RE:[XLMH])?(\/U:(?:X|Clear|Green|Amber|Red))?$/g;
var CVSS40 = class _CVSS40 {
  /**
   * Construct a CVSS v4.0 object, and parse the vector if provided.
   * If not, the Base metrics is set to the default values (score = 0).
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  constructor(vector = "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N") {
    this._metrics = {
      // Set default values of non-mandatory metrics : Not Defined (X)
      // => Threat
      "E": "X",
      // => Environmental
      "CR": "X",
      "IR": "X",
      "AR": "X",
      "MAV": "X",
      "MAC": "X",
      "MAT": "X",
      "MPR": "X",
      "MUI": "X",
      "MVC": "X",
      "MVI": "X",
      "MVA": "X",
      "MSC": "X",
      "MSI": "X",
      "MSA": "X",
      // => Supplemental
      "S": "X",
      "AU": "X",
      "R": "X",
      "V": "X",
      "RE": "X",
      "U": "X"
    };
    this.parse(vector);
  }
  /**
   * Parse the provided vector.
   * Makes use of the regex for code simplicity, but we could use the
   * `metrics` constant to provide better accurate error messages.
   *
   * @param vector The vector to parse.
   * @throws When the vector is invalid.
   */
  parse(vector) {
    let matches = vector.matchAll(re2).next().value;
    if (matches == void 0) {
      throw new Error("invalid CVSS v4.0 vector");
    }
    matches.shift();
    for (let match of matches) {
      if (match == void 0) {
        continue;
      }
      match = match.slice(1);
      const pts = match.split(":");
      this._metrics[pts[0]] = pts[1];
    }
  }
  /**
   * Return the vector string representation of the CVSS v4.0 object.
   *
   * @return The vector string representation.
   */
  Vector() {
    let vector = "CVSS:4.0";
    for (const [om] of Object.entries(table23)) {
      const metric = this.Get(om);
      if (metric == void 0 || metric == "X") {
        continue;
      }
      vector = vector.concat("/", om, ":", metric);
    }
    return vector;
  }
  /**
   * Get the metric value given its value (e.g. 'AV').
   *
   * @param metric The metric to get the value of.
   * @return The corresponding metric value.
   * @throws Metric does not exist.
   */
  Get(metric) {
    const v = this._metrics[metric];
    if (v == void 0) {
      throw new InvalidMetric("4.0", metric);
    }
    return v;
  }
  /**
   * Set the metric value given its key and value (e.g. 'AV' and 'L').
   *
   * @param metric The metric to set the value of.
   * @param value The corresponding metric value.
   * @throws Metric does not exist or has an invalid value.
   */
  Set(metric, value) {
    const values = table23[metric];
    if (values == void 0) {
      throw new InvalidMetric("4.0", metric);
    }
    if (!values.includes(value)) {
      throw new InvalidMetricValue("4.0", metric, value);
    }
    this._metrics[metric] = value;
  }
  /**
   * Compute the CVSS v4.0 Score of the current object, given its metrics and their
   * corresponding values.
   *
   * The implementation internals are largely based upon https://github.com/pandatix/go-cvss
   * submodule 40.
   *
   * @return The score (between 0.0 and 10.0 both included).
   */
  Score() {
    if (["VC", "VI", "VA", "SC", "SI", "SA"].every((met) => this.getReal(met) == "N")) {
      return 0;
    }
    const mv = this.macrovector();
    const eq1 = Number(mv[0]);
    const eq2 = Number(mv[1]);
    const eq3 = Number(mv[2]);
    const eq4 = Number(mv[3]);
    const eq5 = Number(mv[4]);
    const eq6 = Number(mv[5]);
    const eqsv = mvs[mv];
    let lower = 0;
    let eq1nlm = NaN;
    if (eq1 < 2) {
      eq1nlm = mvs[String(eq1 + 1) + String(eq2) + String(eq3) + String(eq4) + String(eq5) + String(eq6)];
      lower++;
    }
    let eq2nlm = NaN;
    if (eq2 < 1) {
      eq2nlm = mvs[String(eq1) + String(eq2 + 1) + String(eq3) + String(eq4) + String(eq5) + String(eq6)];
      lower++;
    }
    let eq4nlm = NaN;
    if (eq4 < 2) {
      eq4nlm = mvs[String(eq1) + String(eq2) + String(eq3) + String(eq4 + 1) + String(eq5) + String(eq6)];
      lower++;
    }
    let eq5nlm = NaN;
    if (eq5 < 2) {
      eq5nlm = mvs[String(eq1) + String(eq2) + String(eq3) + String(eq4) + String(eq5 + 1) + String(eq6)];
      lower++;
    }
    let eq3eq6nlm = NaN;
    if (eq3 == 1 && eq6 == 1) {
      eq3eq6nlm = mvs[String(eq1) + String(eq2) + String(eq3 + 1) + String(eq4) + String(eq5) + String(eq6)];
      lower++;
    } else if (eq3 == 0 && eq6 == 1) {
      eq3eq6nlm = mvs[String(eq1) + String(eq2) + String(eq3 + 1) + String(eq4) + String(eq5) + String(eq6)];
      lower++;
    } else if (eq3 == 1 && eq6 == 0) {
      eq3eq6nlm = mvs[String(eq1) + String(eq2) + String(eq3) + String(eq4) + String(eq5) + String(eq6 + 1)];
      lower++;
    } else if (eq3 == 0 && eq6 == 0) {
      eq3eq6nlm = Math.max(mvs[String(eq1) + String(eq2) + String(eq3 + 1) + String(eq4) + String(eq5) + String(eq6)], mvs[String(eq1) + String(eq2) + String(eq3) + String(eq4) + String(eq5) + String(eq6 + 1)]);
      lower++;
    }
    const msd = (nlm) => {
      let msd2 = Math.abs(nlm - eqsv);
      if (isNaN(msd2)) {
        return 0;
      }
      return msd2;
    };
    let eq1msd = msd(eq1nlm);
    let eq2msd = msd(eq2nlm);
    let eq3eq6msd = msd(eq3eq6nlm);
    let eq4msd = msd(eq4nlm);
    let eq5msd = msd(eq5nlm);
    let eq1svdst = 0, eq2svdst = 0, eq3eq6svdst = 0, eq4svdst = 0, eq5svdst = 0;
    for (const eq1mx of highestSeverityVectors[1][eq1]) {
      for (const eq2mx of highestSeverityVectors[2][eq2]) {
        for (const eq3eq6mx of highestSeverityVectors[3][eq3][eq6]) {
          for (const eq4mx of highestSeverityVectors[4][eq4]) {
            const partial = [eq1mx, eq2mx, eq3eq6mx, eq4mx].join("/");
            const avsvdst = _CVSS40.severityDistance("AV", this.getReal("AV"), _CVSS40.getValue(partial, "AV"));
            const prsvdst = _CVSS40.severityDistance("PR", this.getReal("PR"), _CVSS40.getValue(partial, "PR"));
            const uisvdst = _CVSS40.severityDistance("UI", this.getReal("UI"), _CVSS40.getValue(partial, "UI"));
            const acsvdst = _CVSS40.severityDistance("AC", this.getReal("AC"), _CVSS40.getValue(partial, "AC"));
            const atsvdst = _CVSS40.severityDistance("AT", this.getReal("AT"), _CVSS40.getValue(partial, "AT"));
            const vcsvdst = _CVSS40.severityDistance("VC", this.getReal("VC"), _CVSS40.getValue(partial, "VC"));
            const visvdst = _CVSS40.severityDistance("VI", this.getReal("VI"), _CVSS40.getValue(partial, "VI"));
            const vasvdst = _CVSS40.severityDistance("VA", this.getReal("VA"), _CVSS40.getValue(partial, "VA"));
            const scsvdst = _CVSS40.severityDistance("SC", this.getReal("SC"), _CVSS40.getValue(partial, "SC"));
            const sisvdst = _CVSS40.severityDistance("SI", this.getReal("SI"), _CVSS40.getValue(partial, "SI"));
            const sasvdst = _CVSS40.severityDistance("SA", this.getReal("SA"), _CVSS40.getValue(partial, "SA"));
            const crsvdst = _CVSS40.severityDistance("CR", this.getReal("CR"), _CVSS40.getValue(partial, "CR"));
            const irsvdst = _CVSS40.severityDistance("IR", this.getReal("IR"), _CVSS40.getValue(partial, "IR"));
            const arsvdst = _CVSS40.severityDistance("AR", this.getReal("AR"), _CVSS40.getValue(partial, "AR"));
            if ([avsvdst, prsvdst, uisvdst, acsvdst, atsvdst, vcsvdst, visvdst, vasvdst, scsvdst, sisvdst, sasvdst, crsvdst, irsvdst, arsvdst].some((met) => met < 0)) {
              continue;
            }
            eq1svdst = avsvdst + prsvdst + uisvdst;
            eq2svdst = acsvdst + atsvdst;
            eq3eq6svdst = vcsvdst + visvdst + vasvdst + crsvdst + irsvdst + arsvdst;
            eq4svdst = scsvdst + sisvdst + sasvdst;
            eq5svdst = 0;
            break;
          }
        }
      }
    }
    const eq1prop = eq1svdst / (depth[1][eq1] + 1);
    const eq2prop = eq2svdst / (depth[2][eq2] + 1);
    const eq3eq6prop = eq3eq6svdst / (depth[3][eq3][eq6] + 1);
    const eq4prop = eq4svdst / (depth[4][eq4] + 1);
    const eq5prop = eq5svdst / (depth[5][eq5] + 1);
    eq1msd *= eq1prop;
    eq2msd *= eq2prop;
    eq3eq6msd *= eq3eq6prop;
    eq4msd *= eq4prop;
    eq5msd *= eq5prop;
    let mean = 0;
    if (lower != 0) {
      mean = (eq1msd + eq2msd + eq3eq6msd + eq4msd + eq5msd) / lower;
    }
    return _CVSS40.roundup(eqsv - mean);
  }
  /**
   * Gives the nomenclature of the current CVSS v4.0 object i.e. its structure
   * according to the Base, Threat and Environmental metric groups.
   *
   * @return The nomenclature string.
   */
  Nomenclature() {
    const isDefined = (metric) => this.Get(metric) != "X";
    const t = ["E"].some(isDefined);
    const e = ["CR", "IR", "AR", "MAV", "MAC", "MAT", "MPR", "MUI", "MVC", "MVI", "MVA", "MSC", "MSI", "MSA"].some(isDefined);
    if (t) {
      if (e) {
        return "CVSS-BTE";
      }
      return "CVSS-BT";
    }
    if (e) {
      return "CVSS-BE";
    }
    return "CVSS-B";
  }
  getReal(metric) {
    if (["AV", "AC", "AT", "PR", "UI", "VC", "VI", "VA", "SC", "SI", "SA"].includes(metric)) {
      const v2 = this.Get("M" + metric);
      if (v2 != "X") {
        return v2;
      }
      return this.Get(metric);
    }
    const v = this.Get(metric);
    if (v != "X") {
      return v;
    }
    switch (metric) {
      case "CR":
      case "IR":
      case "AR":
        return "H";
      case "E":
        return "A";
    }
  }
  macrovector() {
    const av = this.getReal("AV");
    const ac = this.getReal("AC");
    const at = this.getReal("AT");
    const pr = this.getReal("PR");
    const ui = this.getReal("UI");
    const vc = this.getReal("VC");
    const vi = this.getReal("VI");
    const va = this.getReal("VA");
    const sc = this.getReal("SC");
    const si = this.getReal("SI");
    const sa = this.getReal("SA");
    const e = this.getReal("E");
    const cr = this.getReal("CR");
    const ir = this.getReal("IR");
    const ar = this.getReal("AR");
    let eq1 = "0";
    if (av == "N" && pr == "N" && ui == "N") {
      eq1 = "0";
    } else if ((av == "N" || pr == "N" || ui == "N") && !(av == "N" && pr == "N" && ui == "N") && !(av == "P")) {
      eq1 = "1";
    } else if (av == "P" || !(av == "N" || pr == "N" || ui == "N")) {
      eq1 = "2";
    }
    let eq2 = "0";
    if (!(ac == "L" && at == "N")) {
      eq2 = "1";
    }
    let eq3 = "0";
    if (vc == "H" && vi == "H") {
      eq3 = "0";
    } else if (!(vc == "H" && vi == "H") && (vc == "H" || vi == "H" || va == "H")) {
      eq3 = "1";
    } else if (!(vc == "H" || vi == "H" || va == "H")) {
      eq3 = "2";
    }
    let eq4 = "0";
    if (si == "S" || sa == "S") {
      eq4 = "0";
    } else if (!(si == "S" || sa == "S") && (sc == "H" || si == "H" || sa == "H")) {
      eq4 = "1";
    } else if (!(si == "S" || sa == "S") && !(sc == "H" || si == "H" || sa == "H")) {
      eq4 = "2";
    }
    let eq5 = "0";
    if (e == "A" || e == "X") {
      eq5 = "0";
    } else if (e == "P") {
      eq5 = "1";
    } else if (e == "U") {
      eq5 = "2";
    }
    let eq6 = "0";
    const crh = cr == "H" || cr == "X";
    const irh = ir == "H" || ir == "X";
    const arh = ar == "H" || ar == "X";
    if (crh && vc == "H" || irh && vi == "H" || arh && va == "H") {
      eq6 = "0";
    } else if (!(crh && vc == "H") && !(irh && vi == "H") && !(arh && va == "H")) {
      eq6 = "1";
    }
    return eq1 + eq2 + eq3 + eq4 + eq5 + eq6;
  }
  static severityDistance(metric, vecVal, mxVal) {
    const values = sevIdx[metric];
    return values.indexOf(vecVal) - values.indexOf(mxVal);
  }
  static getValue(partial, metric) {
    const pts = partial.split("/");
    for (const pt of pts) {
      let pts2 = pt.split(":");
      if (pts2[0] == metric) {
        return pts2[1];
      }
    }
  }
  static roundup(score) {
    return +(score * 10).toFixed() / 10;
  }
  /**
   * Give the corresponding rating of the provided score.
   *
   * @param score The score to rate.
   * @return The rating.
   * @throws When the score is out of bounds.
   */
  static Rating(score) {
    if (score < 0 || score > 10) {
      throw new Error("score out of bounds");
    }
    if (score >= 9) {
      return "CRITICAL";
    }
    if (score >= 7) {
      return "HIGH";
    }
    if (score >= 4) {
      return "MEDIUM";
    }
    if (score >= 0.1) {
      return "LOW";
    }
    return "NONE";
  }
};
var table23 = {
  // Base (11 metrics)
  "AV": ["N", "A", "L", "P"],
  "AC": ["L", "H"],
  "AT": ["N", "P"],
  "PR": ["N", "L", "H"],
  "UI": ["N", "P", "A"],
  "VC": ["H", "L", "N"],
  "VI": ["H", "L", "N"],
  "VA": ["H", "L", "N"],
  "SC": ["H", "L", "N"],
  "SI": ["H", "L", "N"],
  "SA": ["H", "L", "N"],
  // Threat (1 metric)
  "E": ["X", "A", "P", "U"],
  // Environmental (14 metrics)
  "CR": ["X", "H", "M", "L"],
  "IR": ["X", "H", "M", "L"],
  "AR": ["X", "H", "M", "L"],
  "MAV": ["X", "N", "A", "L", "P"],
  "MAC": ["X", "L", "H"],
  "MAT": ["X", "N", "P"],
  "MPR": ["X", "N", "L", "H"],
  "MUI": ["X", "N", "P", "A"],
  "MVC": ["X", "H", "L", "N"],
  "MVI": ["X", "H", "L", "N"],
  "MVA": ["X", "H", "L", "N"],
  "MSC": ["X", "H", "L", "N"],
  "MSI": ["X", "S", "H", "L", "N"],
  "MSA": ["X", "S", "H", "L", "N"],
  // Supplemental (6 metrics)
  "S": ["X", "N", "P"],
  "AU": ["X", "N", "Y"],
  "R": ["X", "A", "U", "I"],
  "V": ["X", "D", "C"],
  "RE": ["X", "L", "M", "H"],
  "U": ["X", "Clear", "Green", "Amber", "Red"]
};
var highestSeverityVectors = {
  // EQ1 - Table 24
  1: {
    0: ["AV:N/PR:N/UI:N"],
    1: ["AV:A/PR:N/UI:N", "AV:N/PR:L/UI:N", "AV:N/PR:N/UI:P"],
    2: ["AV:P/PR:N/UI:N", "AV:A/PR:L/UI:P"]
  },
  // EQ2 - Table 25
  2: {
    0: ["AC:L/AT:N"],
    1: ["AC:H/AT:N", "AC:L/AT:P"]
  },
  // EQ3-EQ6 - Table 30
  3: {
    0: {
      0: ["VC:H/VI:H/VA:H/CR:H/IR:H/AR:H"],
      1: ["VC:H/VI:H/VA:L/CR:M/IR:M/AR:H", "VC:H/VI:H/VA:H/CR:M/IR:M/AR:M"]
    },
    1: {
      0: ["VC:L/VI:H/VA:H/CR:H/IR:H/AR:H", "VC:H/VI:L/VA:H/CR:H/IR:H/AR:H"],
      1: ["VC:L/VI:H/VA:L/CR:H/IR:M/AR:H", "VC:L/VI:H/VA:H/CR:H/IR:M/AR:M", "VC:H/VI:L/VA:H/CR:M/IR:H/AR:M", "VC:H/VI:L/VA:L/CR:M/IR:H/AR:H", "VC:L/VI:L/VA:H/CR:H/IR:H/AR:M"]
    },
    2: {
      1: ["VC:L/VI:L/VA:L/CR:H/IR:H/AR:H"]
    }
  },
  // EQ4 - Table 27
  4: {
    0: ["SC:H/SI:S/SA:S"],
    1: ["SC:H/SI:H/SA:H"],
    2: ["SC:L/SI:L/SA:L"]
  },
  // EQ5 - Table 28 (useless in fact, is not involved in score computation due to only 1 dimension)
  5: {
    0: ["E:A"],
    1: ["E:P"],
    2: ["E:U"]
  }
};
var sevIdx = {
  // Base metrics
  "AV": ["N", "A", "L", "P"],
  "AC": ["L", "H"],
  "AT": ["N", "P"],
  "PR": ["N", "L", "H"],
  "UI": ["N", "P", "A"],
  "VC": ["H", "L", "N"],
  "VI": ["H", "L", "N"],
  "VA": ["H", "L", "N"],
  "SC": ["H", "L", "N"],
  "SI": ["S", "H", "L", "N"],
  "SA": ["S", "H", "L", "N"],
  // Threat metrics
  "E": ["A", "P", "U"],
  // Environmental metrics
  "CR": ["H", "M", "L"],
  "IR": ["H", "M", "L"],
  "AR": ["H", "M", "L"]
};
var depth = {
  // EQ1
  1: {
    0: 0,
    1: 3,
    2: 4
  },
  // EQ2
  2: {
    0: 0,
    1: 1
  },
  // EQ3-EQ6
  3: {
    0: {
      0: 6,
      1: 5
    },
    1: {
      0: 7,
      1: 7
    },
    2: {
      1: 9
    }
  },
  // EQ4
  4: {
    0: 5,
    1: 4,
    2: 3
  },
  // EQ5
  5: {
    0: 1,
    1: 1,
    2: 1
  }
};
var mvs = {
  "000000": 10,
  "000001": 9.9,
  "000010": 9.8,
  "000011": 9.5,
  "000020": 9.5,
  "000021": 9.2,
  "000100": 10,
  "000101": 9.6,
  "000110": 9.3,
  "000111": 8.7,
  "000120": 9.1,
  "000121": 8.1,
  "000200": 9.3,
  "000201": 9,
  "000210": 8.9,
  "000211": 8,
  "000220": 8.1,
  "000221": 6.8,
  "001000": 9.8,
  "001001": 9.5,
  "001010": 9.5,
  "001011": 9.2,
  "001020": 9,
  "001021": 8.4,
  "001100": 9.3,
  "001101": 9.2,
  "001110": 8.9,
  "001111": 8.1,
  "001120": 8.1,
  "001121": 6.5,
  "001200": 8.8,
  "001201": 8,
  "001210": 7.8,
  "001211": 7,
  "001220": 6.9,
  "001221": 4.8,
  "002001": 9.2,
  "002011": 8.2,
  "002021": 7.2,
  "002101": 7.9,
  "002111": 6.9,
  "002121": 5,
  "002201": 6.9,
  "002211": 5.5,
  "002221": 2.7,
  "010000": 9.9,
  "010001": 9.7,
  "010010": 9.5,
  "010011": 9.2,
  "010020": 9.2,
  "010021": 8.5,
  "010100": 9.5,
  "010101": 9.1,
  "010110": 9,
  "010111": 8.3,
  "010120": 8.4,
  "010121": 7.1,
  "010200": 9.2,
  "010201": 8.1,
  "010210": 8.2,
  "010211": 7.1,
  "010220": 7.2,
  "010221": 5.3,
  "011000": 9.5,
  "011001": 9.3,
  "011010": 9.2,
  "011011": 8.5,
  "011020": 8.5,
  "011021": 7.3,
  "011100": 9.2,
  "011101": 8.2,
  "011110": 8,
  "011111": 7.2,
  "011120": 7,
  "011121": 5.9,
  "011200": 8.4,
  "011201": 7,
  "011210": 7.1,
  "011211": 5.2,
  "011220": 5,
  "011221": 3,
  "012001": 8.6,
  "012011": 7.5,
  "012021": 5.2,
  "012101": 7.1,
  "012111": 5.2,
  "012121": 2.9,
  "012201": 6.3,
  "012211": 2.9,
  "012221": 1.7,
  "100000": 9.8,
  "100001": 9.5,
  "100010": 9.4,
  "100011": 8.7,
  "100020": 9.1,
  "100021": 8.1,
  "100100": 9.4,
  "100101": 8.9,
  "100110": 8.6,
  "100111": 7.4,
  "100120": 7.7,
  "100121": 6.4,
  "100200": 8.7,
  "100201": 7.5,
  "100210": 7.4,
  "100211": 6.3,
  "100220": 6.3,
  "100221": 4.9,
  "101000": 9.4,
  "101001": 8.9,
  "101010": 8.8,
  "101011": 7.7,
  "101020": 7.6,
  "101021": 6.7,
  "101100": 8.6,
  "101101": 7.6,
  "101110": 7.4,
  "101111": 5.8,
  "101120": 5.9,
  "101121": 5,
  "101200": 7.2,
  "101201": 5.7,
  "101210": 5.7,
  "101211": 5.2,
  "101220": 5.2,
  "101221": 2.5,
  "102001": 8.3,
  "102011": 7,
  "102021": 5.4,
  "102101": 6.5,
  "102111": 5.8,
  "102121": 2.6,
  "102201": 5.3,
  "102211": 2.1,
  "102221": 1.3,
  "110000": 9.5,
  "110001": 9,
  "110010": 8.8,
  "110011": 7.6,
  "110020": 7.6,
  "110021": 7,
  "110100": 9,
  "110101": 7.7,
  "110110": 7.5,
  "110111": 6.2,
  "110120": 6.1,
  "110121": 5.3,
  "110200": 7.7,
  "110201": 6.6,
  "110210": 6.8,
  "110211": 5.9,
  "110220": 5.2,
  "110221": 3,
  "111000": 8.9,
  "111001": 7.8,
  "111010": 7.6,
  "111011": 6.7,
  "111020": 6.2,
  "111021": 5.8,
  "111100": 7.4,
  "111101": 5.9,
  "111110": 5.7,
  "111111": 5.7,
  "111120": 4.7,
  "111121": 2.3,
  "111200": 6.1,
  "111201": 5.2,
  "111210": 5.7,
  "111211": 2.9,
  "111220": 2.4,
  "111221": 1.6,
  "112001": 7.1,
  "112011": 5.9,
  "112021": 3,
  "112101": 5.8,
  "112111": 2.6,
  "112121": 1.5,
  "112201": 2.3,
  "112211": 1.3,
  "112221": 0.6,
  "200000": 9.3,
  "200001": 8.7,
  "200010": 8.6,
  "200011": 7.2,
  "200020": 7.5,
  "200021": 5.8,
  "200100": 8.6,
  "200101": 7.4,
  "200110": 7.4,
  "200111": 6.1,
  "200120": 5.6,
  "200121": 3.4,
  "200200": 7,
  "200201": 5.4,
  "200210": 5.2,
  "200211": 4,
  "200220": 4,
  "200221": 2.2,
  "201000": 8.5,
  "201001": 7.5,
  "201010": 7.4,
  "201011": 5.5,
  "201020": 6.2,
  "201021": 5.1,
  "201100": 7.2,
  "201101": 5.7,
  "201110": 5.5,
  "201111": 4.1,
  "201120": 4.6,
  "201121": 1.9,
  "201200": 5.3,
  "201201": 3.6,
  "201210": 3.4,
  "201211": 1.9,
  "201220": 1.9,
  "201221": 0.8,
  "202001": 6.4,
  "202011": 5.1,
  "202021": 2,
  "202101": 4.7,
  "202111": 2.1,
  "202121": 1.1,
  "202201": 2.4,
  "202211": 0.9,
  "202221": 0.4,
  "210000": 8.8,
  "210001": 7.5,
  "210010": 7.3,
  "210011": 5.3,
  "210020": 6,
  "210021": 5,
  "210100": 7.3,
  "210101": 5.5,
  "210110": 5.9,
  "210111": 4,
  "210120": 4.1,
  "210121": 2,
  "210200": 5.4,
  "210201": 4.3,
  "210210": 4.5,
  "210211": 2.2,
  "210220": 2,
  "210221": 1.1,
  "211000": 7.5,
  "211001": 5.5,
  "211010": 5.8,
  "211011": 4.5,
  "211020": 4,
  "211021": 2.1,
  "211100": 6.1,
  "211101": 5.1,
  "211110": 4.8,
  "211111": 1.8,
  "211120": 2,
  "211121": 0.9,
  "211200": 4.6,
  "211201": 1.8,
  "211210": 1.7,
  "211211": 0.7,
  "211220": 0.8,
  "211221": 0.2,
  "212001": 5.3,
  "212011": 2.4,
  "212021": 1.4,
  "212101": 2.4,
  "212111": 1.2,
  "212121": 0.5,
  "212201": 1,
  "212211": 0.3,
  "212221": 0.1
};
export {
  CVSS20,
  CVSS30,
  CVSS31,
  CVSS40,
  InvalidMetric,
  InvalidMetricValue
};
//# sourceMappingURL=@pandatix_js-cvss.js.map
