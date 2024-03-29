/*
 *  Sugar Library v1.1.2
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2011 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
(function () {
    var i = true, j = null, l = false;

    function m(a) {
        return function () {
            return a
        }
    }

    var p = Object, q = Array, r = RegExp, s = Date, t = String, v = Number, aa = p.defineProperty && p.defineProperties;

    function w(a, b, c, d) {
        var e = b ? a.prototype : a;
        ba(a, b, d);
        x(d, function (f, h) {
            if (typeof c === "function")y(e, f, ca(e[f], h, c)); else if (c === i || !e[f])y(e, f, h);
            a.SugarMethods[f] = {t:b, method:h}
        })
    }

    function ba(a) {
        if (!a.SugarMethods) {
            a.SugarMethods = {};
            y(a, "sugar", function () {
                var b = arguments, c = b.length === 0;
                a === p && c && da(Object.keys(Object.SugarMethods).remove("extended", "fromQueryString"), Object);
                x(a.SugarMethods, function (d, e) {
                    if (c || z(b, d))y(e.t ? a.prototype : a, d, e.method)
                })
            })
        }
    }

    function ca(a, b, c) {
        return function () {
            return a && (c === i || c.apply(this, arguments)) ? a.apply(this, arguments) : b.apply(this, arguments)
        }
    }

    function y(a, b, c) {
        if (aa)p.defineProperty(a, b, {value:c, configurable:i, enumerable:l, writable:i}); else a[b] = c
    }

    function x(a, b) {
        var c = 0, d;
        for (d in a)if (a.hasOwnProperty(d)) {
            b.call(a, d, a[d], c);
            c++
        }
    }

    function ea(a, b, c) {
        var d = p.prototype.toString.call(a).match(/\[object (\w+)\]/)[1];
        if (a === b)return a !== 0 || 1 / a === 1 / b; else if (a === j || A(a) || b === j || A(b))return l; else if (d == "RegExp")return a.ignoreCase == b.ignoreCase && a.multiline == b.multiline && a.source == b.source && a.global == b.global; else if (d == "Array" || d == "Object") {
            for (d = c.length; d--;)if (c[d] == a)return i;
            c.push(a);
            for (var e in a)if (a.hasOwnProperty(e))if (!b.hasOwnProperty(e) || !ea(a[e], b[e], c))return l;
            c.pop();
            return p.keys(a).length === p.keys(b).length && a.constructor === b.constructor && a.length === b.length
        } else return B(b, d) && a.valueOf() === b.valueOf()
    }

    function C(a, b, c, d) {
        return a === b ? i : p.isRegExp(b) ? r(b).test(a) : p.isFunction(b) ? b.apply(c, [a].concat(d)) : p.equal(b, a)
    }

    function D(a, b, c, d) {
        return A(b) ? a : p.isFunction(b) ? b.apply(c, d || []) : p.isFunction(a[b]) ? a[b].call(a) : a[b]
    }

    function E(a, b) {
        return Array.prototype.slice.call(a, b)
    }

    function F(a, b, c, d) {
        a = E(a);
        if (c !== l)a = G(a);
        I(a, b, d)
    }

    function fa(a, b, c) {
        var d = [], e = a.length, f = b[b.length - 1] !== l, h;
        F(b, function (g) {
            if (p.isBoolean(g))return l;
            if (f) {
                g %= e;
                if (g < 0)g = e + g
            }
            h = c ? a.charAt(g) || "" : a[g];
            d.push(h)
        });
        return d.length < 2 ? d[0] : d
    }

    function B(a, b) {
        return p.prototype.toString.call(a) === "[object " + b + "]"
    }

    function J(a) {
        return typeof a == "object"
    }

    function A(a) {
        return a === void 0
    }

    function K(a) {
        return a !== void 0
    }

    function L(a, b, c, d) {
        J(b) && x(b, function (e, f) {
            var h = a[e], g = K(h), k = p.isArray(f);
            if (c === i && (k || p.isObject(f))) {
                h || (h = k ? [] : {});
                L(h, f, c)
            } else if (g && p.isFunction(d))h = d.call(b, e, a[e], b[e]); else if (!g || g && d !== l)h = b[e];
            if (K(h))a[e] = h
        });
        return a
    }

    function ga(a, b, c, d) {
        var e = /^(.+?)(\[.*\])$/, f, h, g;
        if (d !== l && (h = b.match(e))) {
            g = h[1];
            b = h[2].replace(/^\[|\]$/g, "").split("][");
            I(b, function (k) {
                f = !k || k.match(/^\d+$/);
                if (!g && p.isArray(a))g = a.length;
                a[g] || (a[g] = f ? [] : {});
                a = a[g];
                g = k
            });
            if (!g && f)g = a.length.toString();
            ga(a, g, c)
        } else a[b] = c.match(/^[\d.]+$/) ? parseFloat(c) : c === "true" ? i : c === "false" ? l : c
    }

    function M(a) {
        var b = this;
        x(a, function (c, d) {
            b[c] = d
        })
    }

    M.prototype.constructor = p;
    function da(a, b) {
        var c = {};
        I(a, function (d) {
            c[d + (d === "equal" ? "s" : "")] = function () {
                return Object[d].apply(j, [this].concat(E(arguments)))
            }
        });
        w(b, i, l, c)
    }

    w(p, l, l, {extended:function (a) {
        return new M(a)
    }, isObject:function (a) {
        return a === j || A(a) ? l : B(a, "Object") && a.constructor === p
    }, isNaN:function (a) {
        return p.isNumber(a) && a.valueOf() !== a.valueOf()
    }, each:function (a, b) {
        b && x(a, function (c, d) {
            b.call(a, c, d, a)
        });
        return a
    }, merge:function (a, b, c) {
        return L(a, b, i, c)
    }, isEmpty:function (a) {
        if (!J(a) || a === j)return i;
        return p.keys(a).length == 0
    }, equal:function (a, b) {
        return ea(a, b, [])
    }, values:function (a, b) {
        var c = [];
        x(a, function (d, e) {
            c.push(e);
            b && b.call(a, e)
        });
        return c
    }, clone:function (a, b) {
        if (!J(a) || a === j)return a;
        var c = Object.isFunction(a.keys) ? Object.extended() : {};
        return L(c, a, b)
    }, fromQueryString:function (a, b) {
        var c = p.extended();
        a = a && a.toString ? a.toString() : "";
        a.replace(/^.*?\?/, "").unescapeURL().split("&").each(function (d) {
            d = d.split("=");
            d.length === 2 && ga(c, d[0], d[1], b)
        });
        return c
    }, tap:function (a, b) {
        D(a, b, a, [a]);
        return a
    }});
    w(p, l, function () {
        return arguments.length < 2
    }, {keys:function (a, b) {
        if (a === j || !J(a) && !p.isRegExp(a) && !p.isFunction(a))throw new TypeError("Object required");
        var c = [];
        x(a, function (d) {
            c.push(d);
            b && b.call(a, d)
        });
        return c
    }});
    function I(a, b, c, d, e) {
        var f, h;
        ha(b);
        if (c < 0)c = a.length + c;
        h = isNaN(c) ? 0 : parseInt(c >> 0);
        for (c = d === i ? a.length + h : a.length; h < c;) {
            f = h % a.length;
            if (!(f in a) && e === i)return ia(a, b, h, d); else if (b.call(a, a[f], f, a) === l)break;
            h++
        }
    }

    function z(a, b, c, d, e) {
        var f, h;
        I(a, function (g, k, n) {
            if (C(g, b, n, [k, n])) {
                f = g;
                h = k;
                return l
            }
        }, c, d);
        return e ? h : f
    }

    function N(a, b) {
        function c(e) {
            return D(e, b, a, [e]) === d
        }

        var d;
        return a.reduce(function (e, f, h) {
            d = D(f, b, a, [f, h, a]);
            if (e.none(b ? c : f))e.push(f);
            return e
        }, [])
    }

    function G(a, b, c) {
        b = b || Infinity;
        c = c || 0;
        var d = [];
        I(a, function (e) {
            if (q.isArray(e) && c < b)d = d.concat(G(e, b, c + 1)); else d.push(e)
        });
        return d
    }

    function ja(a, b, c, d) {
        var e = a.length, f = 0, h = K(c);
        ha(b);
        if (e == 0 && !h)throw new TypeError("Reduce called on empty array with no initial value"); else if (h)c = c; else {
            c = a[d ? e - 1 : f];
            f++
        }
        for (; f < e;) {
            h = d ? e - f - 1 : f;
            if (h in a)c = b.call(void 0, c, a[h], h, a);
            f++
        }
        return c
    }

    function ha(a) {
        if (!a || !a.call)throw new TypeError("Callback is not callable");
    }

    function O(a) {
        if (a.length === 0)throw new TypeError("First argument must be defined");
    }

    function ia(a, b, c) {
        var d = [], e;
        for (e in a)e in a && e >>> 0 == e && e != 4294967295 && e >= c && d.push(e.toNumber());
        d.sort().each(function (f) {
            return b.call(a, a[f], f, a)
        });
        return a
    }

    function P(a, b, c, d) {
        var e = c === "max", f = c === "min", h = e ? -Infinity : Infinity, g = [];
        x(a, function (k) {
            var n = a[k];
            k = D(n, b, a, d ? [n, k.toNumber(), a] : []);
            if (!A(k))if (k === h)g.push(n); else if (e && k > h || f && k < h) {
                g = [n];
                h = k
            }
        });
        return g
    }

    w(q, l, l, {create:function () {
        var a = [];
        F(arguments, function (b) {
            if (b && b.callee)b = E(b);
            a = a.concat(b)
        });
        return a
    }, isArray:function (a) {
        return B(a, "Array")
    }});
    w(q, i, function () {
        var a = arguments;
        return a.length === 0 || p.isFunction(a[0])
    }, {every:function (a, b) {
        var c = this.length, d = 0;
        for (O(arguments); d < c;) {
            if (d in this && !C(this[d], a, b, [d, this]))return l;
            d++
        }
        return i
    }, some:function (a, b) {
        var c = this.length, d = 0;
        for (O(arguments); d < c;) {
            if (d in this && C(this[d], a, b, [d, this]))return i;
            d++
        }
        return l
    }, map:function (a, b) {
        var c = this.length, d = 0, e, f = Array(c);
        for (O(arguments); d < c;) {
            if (d in this) {
                e = this[d];
                f[d] = D(e, a, b, [e, d, this])
            }
            d++
        }
        return f
    }, filter:function (a, b) {
        var c = this.length, d = 0, e = [];
        for (O(arguments); d < c;) {
            d in this && C(this[d], a, b, [d, this]) && e.push(this[d]);
            d++
        }
        return e
    }});
    w(q, i, l, {indexOf:function (a, b) {
        var c = this.length, d = isNaN(b) ? 0 : parseInt(b >> 0);
        if (p.isString(this))return this.indexOf(a, b);
        if (d < 0)d = Math.max(c + d, 0);
        if (c == 0 || d > c)return-1;
        for (; d < c;) {
            if (d in this && this[d] === a)return d;
            d++
        }
        return-1
    }, lastIndexOf:function (a, b) {
        var c = this.length, d = isNaN(b) ? c : parseInt(b >> 0);
        if (p.isString(this))return this.lastIndexOf(a, b);
        if (d < 0)d = c + d;
        if (c == 0 || d < 0)return-1;
        for (; d >= 0;) {
            if (d in this && this[d] === a)return d;
            d--
        }
        return-1
    }, forEach:function (a, b) {
        var c = this.length, d = 0;
        for (ha(a); d < c;) {
            d in this && a.call(b, this[d], d, this);
            d++
        }
    }, reduce:function (a, b) {
        return ja(this, a, b)
    }, reduceRight:function (a, b) {
        return ja(this, a, b, i)
    }, each:function (a, b, c) {
        I(this, a, b, c, i);
        return this
    }, find:function (a, b, c) {
        return z(this, a, b, c)
    }, findAll:function (a, b, c) {
        var d = [];
        I(this, function (e, f, h) {
            C(e, a, h, [f, h]) && d.push(e)
        }, b, c);
        return d
    }, findIndex:function (a, b, c) {
        a = z(this, a, b, c, i);
        return K(a) ? a : -1
    }, count:function (a) {
        if (A(a))return this.length;
        return this.findAll(a).length
    }, none:function () {
        return!this.any.apply(this, arguments)
    }, remove:function () {
        var a, b = this;
        F(arguments, function (c) {
            for (a = 0; a < b.length;)if (C(b[a], c, b, [a, b]))b.splice(a, 1); else a++
        }, l);
        return b
    }, removeAt:function (a, b) {
        if (A(a))return this;
        if (A(b))b = a;
        for (var c = 0; c <= b - a; c++)this.splice(a, 1);
        return this
    }, add:function (a, b) {
        if (!p.isNumber(v(b)) || isNaN(b) || b == -1)b = this.length; else if (b < -1)b += 1;
        q.prototype.splice.apply(this, [b, 0].concat(a));
        return this
    }, include:function (a, b) {
        return this.clone().add(a, b)
    }, exclude:function () {
        return q.prototype.remove.apply(this.clone(), arguments)
    }, clone:function () {
        return this.concat()
    }, unique:function (a) {
        return N(this, a)
    }, union:function () {
        var a = this;
        F(arguments, function (b) {
            a = a.concat(b)
        });
        return N(a)
    }, intersect:function () {
        var a = [], b = arguments;
        this.each(function (c) {
            F(b, function (d) {
                q.isArray(d) || (d = [d]);
                A(z(a, c)) && K(z(d, c)) && a.push(c)
            })
        });
        return a
    }, subtract:function () {
        var a = this.clone();
        F(arguments, function (b) {
            q.isArray(b) || (b = [b]);
            b.each(function (c) {
                a.remove(c)
            })
        });
        return a
    }, at:function () {
        return fa(this, arguments)
    }, first:function (a) {
        if (A(a))return this[0];
        if (a < 0)a = 0;
        return this.slice(0, a)
    }, last:function (a) {
        if (A(a))return this[this.length - 1];
        return this.slice(this.length - a < 0 ? 0 : this.length - a)
    }, from:function (a) {
        return this.slice(a)
    }, to:function (a) {
        if (A(a))a = this.length;
        return this.slice(0, a)
    }, min:function (a) {
        return N(P(this, a, "min", i))
    }, max:function (a) {
        return N(P(this, a, "max", i))
    }, least:function () {
        var a = G(P(this.groupBy.apply(this, arguments), "length", "min"));
        return a.length === this.length ? [] : N(a)
    }, most:function () {
        var a = G(P(this.groupBy.apply(this, arguments), "length", "max"));
        return a.length === this.length ? [] : N(a)
    }, sum:function (a) {
        a = a ? this.map(a) : this;
        return a.length > 0 ? a.reduce(function (b, c) {
            return b + c
        }) : 0
    }, average:function (a) {
        a = a ? this.map(a) : this;
        return a.length > 0 ? a.sum() / a.length : 0
    }, groupBy:function (a, b) {
        var c = this, d = p.extended(), e;
        I(c, function (f, h) {
            e = D(f, a, c, [f, h, c]);
            d[e] || (d[e] = []);
            d[e].push(f)
        });
        return d.each(b)
    }, inGroups:function (a, b) {
        var c = arguments.length > 1, d = this, e = [], f = (this.length / a).ceil();
        (0).upto(a - 1, function (h) {
            h = h * f;
            var g = d.slice(h, h + f);
            c && g.length < f && (f - g.length).times(function () {
                g = g.add(b)
            });
            e.push(g)
        });
        return e
    }, inGroupsOf:function (a, b) {
        if (this.length === 0 || a === 0)return this;
        if (A(a))a = 1;
        if (A(b))b = j;
        var c = [], d = j;
        this.each(function (e, f) {
            if (f % a === 0) {
                d && c.push(d);
                d = []
            }
            if (A(e))e = b;
            d.push(e)
        });
        if (!this.length.isMultipleOf(a)) {
            (a - this.length % a).times(function () {
                d.push(b)
            });
            this.length += a - this.length % a
        }
        d.length > 0 && c.push(d);
        return c
    }, compact:function (a) {
        var b = [];
        I(this, function (c) {
            if (p.isArray(c))b.push(c.compact()); else if (a && c)b.push(c); else if (!a && K(c) && c !== j && (!p.isNumber(c) || !isNaN(c)))b.push(c)
        });
        return b
    }, isEmpty:function () {
        return this.compact().length == 0
    }, flatten:function (a) {
        return G(this, a)
    }, sortBy:function (a, b) {
        var c = this.clone();
        c.sort(function (d, e) {
            var f = D(d, a, c, [d]), h = D(e, a, c, [e]), g = p.isNumber(f);
            return g && b ? h - f : g && !b ? f - h : f === h ? 0 : b ? f < h ? 1 : -1 : f < h ? -1 : 1
        });
        return c
    }, randomize:function () {
        for (var a = this.concat(), b, c, d = a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
        return a
    }, zip:function () {
        var a = E(arguments);
        return this.map(function (b, c) {
            return[b].concat(a.map(function (d) {
                return c in d ? d[c] : j
            }))
        })
    }, sample:function (a) {
        var b = [], c = this.clone(), d;
        for (a > 0 || (a = 1); b.length < a;) {
            d = Number.random(0, c.length - 1);
            b.push(c[d]);
            c.removeAt(d);
            if (c.length == 0)break
        }
        return arguments.length > 0 ? b : b[0]
    }});
    w(q, i, l, {all:q.prototype.every, any:q.prototype.some, has:q.prototype.some, insert:q.prototype.add});
    function Q(a, b, c) {
        c = Math[c || "round"];
        var d = Math.pow(10, (b || 0).abs());
        if (b < 0)d = 1 / d;
        return c(a * d) / d
    }

    function ka(a, b, c, d) {
        var e = [];
        a = parseInt(a);
        for (var f = d > 0; f && a <= b || !f && a >= b;) {
            e.push(a);
            c && c.call(this, a);
            a += d
        }
        return e
    }

    w(v, l, l, {random:function (a, b) {
        var c;
        if (arguments.length == 1) {
            b = a;
            a = 0
        }
        c = Math.min(a || 0, K(b) ? b : 1);
        return Q(Math.random() * (Math.max(a || 0, K(b) ? b : 1) - c) + c)
    }});
    w(v, i, l, {toNumber:function () {
        return parseFloat(this, 10)
    }, ceil:function (a) {
        return Q(this, a, "ceil")
    }, floor:function (a) {
        return Q(this, a, "floor")
    }, abs:function () {
        return Math.abs(this)
    }, pow:function (a) {
        if (A(a))a = 1;
        return Math.pow(this, a)
    }, round:function (a) {
        return Q(this, a, "round")
    }, chr:function () {
        return t.fromCharCode(this)
    }, isOdd:function () {
        return!this.isMultipleOf(2)
    }, isEven:function () {
        return this.isMultipleOf(2)
    }, isMultipleOf:function (a) {
        return this % a === 0
    }, upto:function (a, b, c) {
        return ka(this, a, b, c || 1)
    }, downto:function (a, b, c) {
        return ka(this, a, b, -(c || 1))
    }, times:function (a) {
        if (a)for (var b = 0; b < this; b++)a.call(this, b);
        return this.toNumber()
    }, ordinalize:function () {
        var a;
        if (this >= 11 && this <= 13)a = "th"; else switch (this % 10) {
            case 1:
                a = "st";
                break;
            case 2:
                a = "nd";
                break;
            case 3:
                a = "rd";
                break;
            default:
                a = "th"
        }
        return this.toString() + a
    }, pad:function (a, b, c) {
        c = c || 10;
        c = this.toNumber() === 0 ? "" : this.toString(c).replace(/^-/, "");
        c = R(c, "0", a - c.replace(/\.\d+$/, "").length, 0);
        if (b || this < 0)c = (this < 0 ? "-" : "+") + c;
        return c
    }, format:function (a, b, c) {
        var d, e, f = /(\d+)(\d{3})/;
        if (t(b).match(/\d/))throw new TypeError("Thousands separator cannot contain numbers.");
        d = p.isNumber(a) ? Q(this, a).toFixed(Math.max(a, 0)) : this.toString();
        b = b || ",";
        c = c || ".";
        e = d.split(".");
        d = e[0];
        for (e = e[1] || ""; d.match(f);)d = d.replace(f, "$1" + b + "$2");
        if (e.length > 0)d += c + R(e, "0", 0, a - e.length);
        return d
    }, hex:function (a) {
        return this.pad(a || 1, l, 16)
    }, compare:function (a) {
        return this - Number(a)
    }});
    function la(a, b) {
        function c() {
            return Q(this * b)
        }

        function d() {
            return S(arguments)[f](this)
        }

        function e() {
            return S(arguments)[f](-this)
        }

        var f = "add" + a.capitalize() + "s";
        y(v.prototype, a, c);
        y(v.prototype, a + "s", c);
        y(v.prototype, a + "Before", e);
        y(v.prototype, a + "sBefore", e);
        y(v.prototype, a + "Ago", e);
        y(v.prototype, a + "sAgo", e);
        y(v.prototype, a + "After", d);
        y(v.prototype, a + "sAfter", d);
        y(v.prototype, a + "FromNow", d);
        y(v.prototype, a + "sFromNow", d)
    }

    function T() {
        return"\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"
    }

    function ma(a, b, c, d) {
        var e = E(b).join("");
        e = e.replace(/all/, "").replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, "$1");
        return a.replace(c, function (f) {
            return d[f] && (!e || e.has(d[f].type)) ? d[f].to : f
        })
    }

    var na = [
        {type:"a", shift:65248, start:65, end:90},
        {type:"a", shift:65248, start:97, end:122},
        {type:"n", shift:65248, start:48, end:57},
        {type:"p", shift:65248, start:33, end:47},
        {type:"p", shift:65248, start:58, end:64},
        {type:"p", shift:65248, start:91, end:96},
        {type:"p", shift:65248, start:123, end:126}
    ], oa = {}, pa = {}, qa = /[\u0020-\u00A5]|[\uFF61-\uFF9F][\uff9e\uff9f]?/g, ra = /[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g, sa = /[\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c8\u30cf\u30d2\u30d5\u30d8\u30db]/, ta = /[\u30cf\u30d2\u30d5\u30d8\u30db\u30f2]/;

    function U(a, b, c) {
        oa[b] = {type:a, to:c};
        pa[c] = {type:a, to:b}
    }

    function R(a, b, c, d) {
        var e = String(b);
        if (e != b)e = "";
        p.isNumber(c) || (c = 1);
        p.isNumber(d) || (d = 1);
        return e.repeat(c) + a + e.repeat(d)
    }

    w(t, i, l, {escapeRegExp:function () {
        return r.escape(this)
    }, escapeURL:function (a) {
        return a ? encodeURIComponent(this) : encodeURI(this)
    }, unescapeURL:function (a) {
        return a ? decodeURI(this) : decodeURIComponent(this)
    }, escapeHTML:function () {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }, unescapeHTML:function () {
        return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    }, encodeBase64:function () {
        return btoa(this)
    }, decodeBase64:function () {
        return atob(this)
    }, capitalize:function (a) {
        return this.toLowerCase().replace(a ? /\b[a-z]/g : /^[a-z]/, function (b) {
            return b.toUpperCase()
        })
    }, pad:function (a, b) {
        return R(this, a, b, b)
    }, padLeft:function (a, b) {
        return R(this, a, b, 0)
    }, padRight:function (a, b) {
        return R(this, a, 0, b)
    }, repeat:function (a) {
        if (!p.isNumber(a) || a < 1)return"";
        for (var b = "", c = 0; c < a; c++)b += this;
        return b
    }, each:function (a, b) {
        if (p.isFunction(a)) {
            b = a;
            a = /./g
        } else if (a)if (p.isString(a))a = r(r.escape(a), "gi"); else {
            if (p.isRegExp(a))a = a.addFlag("g")
        } else a = /./g;
        var c = this.match(a) || [];
        if (b)for (var d = 0; d < c.length; d++)c[d] = b.call(this, c[d], d) || c[d];
        return c
    }, shift:function (a) {
        var b = "";
        a = a || 0;
        this.codes(function (c) {
            b += (c + a).chr()
        });
        return b
    }, codes:function (a) {
        for (var b = [], c = 0; c < this.length; c++) {
            var d = this.charCodeAt(c);
            b.push(d);
            a && a.call(this, d, c)
        }
        return b
    }, chars:function (a) {
        return this.trim().each(a)
    }, words:function (a) {
        return this.trim().each(/\S+/g, a)
    }, lines:function (a) {
        return this.trim().each(/^.*$/gm, a)
    }, paragraphs:function (a) {
        var b = this.trim().split(/[\r\n]{2,}/);
        return b = b.map(function (c) {
            if (a)var d = a.call(c);
            return d ? d : c
        })
    }, startsWith:function (a, b) {
        if (A(b))b = i;
        var c = p.isRegExp(a) ? a.source.replace("^", "") : r.escape(a);
        return r("^" + c, b ? "" : "i").test(this)
    }, endsWith:function (a, b) {
        if (A(b))b = i;
        var c = p.isRegExp(a) ? a.source.replace("$", "") : r.escape(a);
        return r(c + "$", b ? "" : "i").test(this)
    }, isBlank:function () {
        return this.trim().length === 0
    }, has:function (a) {
        return this.search(a) !== -1
    }, add:function (a, b) {
        return this.split("").add(a, b).join("")
    }, remove:function (a) {
        return this.replace(a, "")
    }, hankaku:function () {
        return ma(this, arguments, ra, pa)
    }, zenkaku:function () {
        return ma(this, arguments, qa, oa)
    }, hiragana:function (a) {
        var b = this;
        if (a !== l)b = b.zenkaku("k");
        return b.replace(/[\u30A1-\u30F6]/g, function (c) {
            return c.shift(-96)
        })
    }, katakana:function () {
        return this.replace(/[\u3041-\u3096]/g, function (a) {
            return a.shift(96)
        })
    }, toNumber:function (a) {
        var b = this.replace(/,/g, "");
        return b.match(/\./) ? parseFloat(b) : parseInt(b, a || 10)
    }, reverse:function () {
        return this.split("").reverse().join("")
    }, compact:function () {
        return this.replace(/[\r\n]/g, "").trim().replace(/([\s\u3000])+/g, "$1")
    }, at:function () {
        return fa(this, arguments, i)
    }, first:function (a) {
        a = A(a) ? 1 : a;
        return this.substr(0, a)
    }, last:function (a) {
        a = A(a) ? 1 : a;
        return this.substr(this.length - a < 0 ? 0 : this.length - a)
    }, from:function (a) {
        return this.slice(a)
    }, to:function (a) {
        if (A(a))a = this.length;
        return this.slice(0, a)
    }, toDate:function (a) {
        return S([this.toString(), a])
    }, dasherize:function () {
        return this.underscore().replace(/_/g, "-")
    }, underscore:function () {
        return this.replace(/[-\s]+/g, "_").replace(/(.)(?=[A-Z])/g,
            function (a) {
                return a != "_" ? a + "_" : a
            }).toLowerCase()
    }, camelize:function (a) {
        return this.underscore().replace(/(^|_)(.)/g, function (b, c, d, e) {
            return a !== l || e > 0 ? d.toUpperCase() : d
        })
    }, spacify:function () {
        return this.underscore().replace(/_/g, " ")
    }, stripTags:function () {
        var a = this;
        F(arguments.length > 0 ? arguments : [""], function (b) {
            a = a.replace(r("</?" + b.escapeRegExp() + "[^<>]*>", "gi"), "")
        });
        return a
    }, removeTags:function () {
        var a = this;
        F(arguments.length > 0 ? arguments : ["\\S+"], function (b) {
            b = r("<(" + b + ")[^<>]*(?:\\/>|>.*?<\\/\\1>)", "gi");
            a = a.replace(b, "")
        });
        return a
    }, truncate:function (a, b, c) {
        var d;
        b = A(b) ? "..." : String(b);
        a -= b.length;
        if (this.length <= a)return this.toString();
        d = b.match(/^(.)\1+$/) ? b.slice(0, 1) : "";
        for (d = r("[^" + T() + d + "][" + T() + d + "]"); a > 0 && !d.test(this.slice(a - 1, a + 1)) && c !== i;)a--;
        return this.slice(0, a) + (a > 0 ? b : "")
    }, assign:function () {
        var a = p.extended();
        F(arguments, function (b, c) {
            if (p.isObject(b))a.merge(b); else a[c + 1] = b
        });
        return this.replace(/\{(.+?)\}/g, function (b, c) {
            return a.hasOwnProperty(c) ? a[c] : b
        })
    }, compare:function (a, b) {
        var c = this;
        a = String(a);
        if (b === i)b = /\W/g;
        if (b) {
            a = a.remove(b);
            c = c.remove(b)
        }
        return c == a ? 0 : c < a ? -1 : 1
    }});
    w(t, i, function (a) {
        return!p.isRegExp(a)
    }, {split:function (a, b) {
        var c = [], d = 0;
        a = r(a).addFlag("g");
        var e, f, h, g;
        r.m || (e = RegExp("^" + a.source + "$(?!\\s)", a.getFlags()));
        if (A(b) || +b < 0)b = Infinity; else {
            b = (+b).floor();
            if (!b)return[]
        }
        for (; f = a.exec(this);) {
            h = f.index + f[0].length;
            if (h > d) {
                c.push(this.slice(d, f.index));
                !r.m && f.length > 1 && f[0].replace(e, function () {
                    for (var k = 1; k < arguments.length - 2; k++)if (A(arguments[k]))f[k] = void 0
                });
                f.length > 1 && f.index < this.length && q.prototype.push.apply(c, f.slice(1));
                g = f[0].length;
                d = h;
                if (c.length >= b)break
            }
            a.lastIndex === f.index && a.lastIndex++
        }
        if (d === this.length) {
            if (g || !a.test(""))c.push("")
        } else c.push(this.slice(d));
        return c.length > b ? c.slice(0, b) : c
    }});
    w(t, i, l, {insert:t.prototype.add});
    var ua = ["hour", "minute", "second", "millisecond", "meridian", "utc", "offset_sign", "offset_hours", "offset_minutes"], va = "(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?", wa = "\\s*(?:(?:t|at |\\s+)" + va + ")?", V = "\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d", ya = "\u5341\u767e\u5343\u4e07", za = r("[" + V + ya + "]", "g"), Aa = [], Ba, W, Ca = [
        {src:"(\\d{4})", to:["year"]},
        {src:"([+-])?(\\d{4})[-.]?({month})[-.]?(\\d{1,2})?", to:["year_sign", "year", "month", "date"]},
        {src:"(\\d{1,2})[-.\\/]({month})[-.\\/]?(\\d{2,4})?", to:["month", "date", "year"], k:i}
    ], Da = [
        {c:"f{1,4}|ms|milliseconds", b:function (a) {
            return a.getMilliseconds()
        }},
        {c:"ss?|seconds", b:function (a) {
            return a.getSeconds()
        }},
        {c:"mm?|minutes", b:function (a) {
            return a.getMinutes()
        }},
        {c:"hh?|hours|12hr", b:function (a) {
            a = a.getHours(void 0);
            return a === 0 ? 12 : a - (a / 13).floor() * 12
        }},
        {c:"HH?|24hr", b:function (a) {
            return a.getHours()
        }},
        {c:"dd?|date|day", b:function (a) {
            return a.getDate()
        }},
        {c:"dow|weekday", l:i, b:function (a, b, c) {
            return b.weekdays[a.getDay() + (c - 1) * 7]
        }},
        {c:"MM?", b:function (a) {
            return a.getMonth() + 1
        }},
        {c:"mon|month", l:i, b:function (a, b, c) {
            return b.months[a.getMonth() + (c - 1) * 12]
        }},
        {c:"y{2,4}|year", b:function (a) {
            return a.getFullYear()
        }},
        {c:"[Tt]{1,2}", b:function (a, b, c, d) {
            a = a.getHours(void 0) < 12 ? "am" : "pm";
            if (d.length === 1)a = a.first();
            if (d.first() === "T")a = a.toUpperCase();
            return a
        }},
        {c:"z{1,4}|tz|timezone", text:i, b:function (a, b, c, d) {
            a = a.getUTCOffset();
            if (d == "z" || d == "zz")a = a.replace(/(\d{2})(\d{2})/, function (e, f) {
                return f.toNumber().pad(d.length)
            });
            return a
        }},
        {c:"iso(tz|timezone)", b:function (a) {
            return a.getUTCOffset(i)
        }},
        {c:"ord", b:function (a) {
            return a.getDate().ordinalize()
        }}
    ], X = [
        {a:"year", method:"FullYear", e:function (a) {
            return(365 + (a ? a.isLeapYear() ? 1 : 0 : 0.25)) * 24 * 60 * 60 * 1E3
        }},
        {a:"month", method:"Month", e:function (a, b) {
            var c = 30.4375, d;
            if (a) {
                d = a.daysInMonth();
                if (b <= d.days())c = d
            }
            return c * 24 * 60 * 60 * 1E3
        }},
        {a:"week", method:"Week", e:m(6048E5)},
        {a:"day", method:"Date", e:m(864E5)},
        {a:"hour", method:"Hours", e:m(36E5)},
        {a:"minute", method:"Minutes", e:m(6E4)},
        {a:"second", method:"Seconds", e:m(1E3)},
        {a:"millisecond", method:"Milliseconds", e:m(1)}
    ], Ea = {}, Fa = {en:"2;;January,February,March,April,May,June,July,August,September,October,November,December;Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday;millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s;one,two,three,four,five,six,seven,eight,nine,ten;a,an,the;the,st|nd|rd|th,of;{num} {unit} {sign},{num} {unit=4-5} {sign} {day},{weekday?} {month} {date}{2} {year?} {time?},{date} {month} {year},{month} {year},{shift?} {weekday} {time?},{shift} week {weekday} {time?},{shift} {unit=5-7},{1} {edge} of {shift?} {unit=4-7?}{month?}{year?},{weekday} {3} {shift} week,{1} {date}{2} of {month},{1}{month?} {date?}{2} of {shift} {unit=6-7},{day} at {time?},{time} {day};{Month} {d}, {yyyy};,yesterday,today,tomorrow;,ago|before,,from now|after|from;,last,the|this,next;last day,end,,first day|beginning",
        ja:"1;\u6708;;\u65e5\u66dc\u65e5,\u6708\u66dc\u65e5,\u706b\u66dc\u65e5,\u6c34\u66dc\u65e5,\u6728\u66dc\u65e5,\u91d1\u66dc\u65e5,\u571f\u66dc\u65e5;\u30df\u30ea\u79d2,\u79d2,\u5206,\u6642\u9593,\u65e5,\u9031\u9593|\u9031,\u30f6\u6708|\u30f5\u6708|\u6708,\u5e74;;;;{num}{unit}{sign},{shift}{unit=5-7}{weekday?},{year}\u5e74{month?}\u6708?{date?}\u65e5?,{month}\u6708{date?}\u65e5?,{date}\u65e5;{yyyy}\u5e74{M}\u6708{d}\u65e5;\u4e00\u6628\u65e5,\u6628\u65e5,\u4eca\u65e5,\u660e\u65e5,\u660e\u5f8c\u65e5;,\u524d,,\u5f8c;,\u53bb|\u5148,,\u6765",
        ko:"1;\uc6d4;;\uc77c\uc694\uc77c,\uc6d4\uc694\uc77c,\ud654\uc694\uc77c,\uc218\uc694\uc77c,\ubaa9\uc694\uc77c,\uae08\uc694\uc77c,\ud1a0\uc694\uc77c;\ubc00\ub9ac\ucd08,\ucd08,\ubd84,\uc2dc\uac04,\uc77c,\uc8fc,\uac1c\uc6d4|\ub2ec,\ub144;\uc77c|\ud55c,\uc774,\uc0bc,\uc0ac,\uc624,\uc721,\uce60,\ud314,\uad6c,\uc2ed;;;{num}{unit} {sign},{shift} {unit=5-7},{shift} {unit=5?} {weekday},{year}\ub144{month?}\uc6d4?{date?}\uc77c?,{month}\uc6d4{date?}\uc77c?,{date}\uc77c;{yyyy}\ub144{M}\uc6d4{d}\uc77c;\uadf8\uc800\uaed8,\uc5b4\uc81c,\uc624\ub298,\ub0b4\uc77c,\ubaa8\ub808;,\uc804,,\ud6c4;,\uc9c0\ub09c|\uc791,\uc774\ubc88,\ub2e4\uc74c|\ub0b4",
        ru:"4;;\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c;\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430;\u043c\u0438\u043b\u043b\u0438\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u0441\u0435\u043a\u0443\u043d\u0434:\u0430|\u0443|\u044b|,\u043c\u0438\u043d\u0443\u0442:\u0430|\u0443|\u044b|,\u0447\u0430\u0441:||\u0430|\u043e\u0432,\u0434\u0435\u043d\u044c|\u0434\u0435\u043d\u044c|\u0434\u043d\u044f|\u0434\u043d\u0435\u0439,\u043d\u0435\u0434\u0435\u043b:\u044f|\u044e|\u0438|\u044c|\u0435,\u043c\u0435\u0441\u044f\u0446:||\u0430|\u0435\u0432|\u0435,\u0433\u043e\u0434|\u0433\u043e\u0434|\u0433\u043e\u0434\u0430|\u043b\u0435\u0442|\u0433\u043e\u0434\u0443;\u043e\u0434:\u0438\u043d|\u043d\u0443,\u0434\u0432:\u0430|\u0435,\u0442\u0440\u0438,\u0447\u0435\u0442\u044b\u0440\u0435,\u043f\u044f\u0442\u044c,\u0448\u0435\u0441\u0442\u044c,\u0441\u0435\u043c\u044c,\u0432\u043e\u0441\u0435\u043c\u044c,\u0434\u0435\u0432\u044f\u0442\u044c,\u0434\u0435\u0441\u044f\u0442\u044c;;\u0432|\u043d\u0430,\u0433\u043e\u0434\u0430;{num} {unit} {sign},{sign} {num} {unit},{date} {month} {year?} {2},{month} {year},{1} {shift} {unit=5-7};{d} {month} {yyyy} \u0433\u043e\u0434\u0430;\u043f\u043e\u0437\u0430\u0432\u0447\u0435\u0440\u0430,\u0432\u0447\u0435\u0440\u0430,\u0441\u0435\u0433\u043e\u0434\u043d\u044f,\u0437\u0430\u0432\u0442\u0440\u0430,\u043f\u043e\u0441\u043b\u0435\u0437\u0430\u0432\u0442\u0440\u0430;,\u043d\u0430\u0437\u0430\u0434,,\u0447\u0435\u0440\u0435\u0437;,\u043f\u0440\u043e\u0448\u043b\u043e:\u0439|\u043c,,\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435:\u0439|\u043c",
        es:"6;;enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre;domingo,lunes,martes,mi\u00e9rcoles|miercoles,jueves,viernes,s\u00e1bado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,d\u00eda|d\u00edas|dia|dias,semana:|s,mes:|es,a\u00f1o|a\u00f1os|ano|anos;uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez;;el,de;{sign} {num} {unit},{num} {unit} {sign},{date?} {2} {month} {2} {year?},{1} {unit=5-7} {shift},{1} {shift} {unit=5-7};{d} de {month} de {yyyy};anteayer,ayer,hoy,ma\u00f1ana|manana;,hace,,de ahora;,pasad:o|a,,pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
        pt:"6;;janeiro,fevereiro,mar\u00e7o,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro;domingo,segunda-feira,ter\u00e7a-feira,quarta-feira,quinta-feira,sexta-feira,s\u00e1bado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,m\u00eas|m\u00eases|mes|meses,ano:|s;um,dois,tr\u00eas|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas;;a,de;{num} {unit} {sign},{sign} {num} {unit},{date?} {2} {month} {2} {year?},{1} {unit=5-7} {shift},{1} {shift} {unit=5-7};{d} de {month} de {yyyy};anteontem,ontem,hoje,amanh:\u00e3|a;,atr\u00e1s|atras|h\u00e1|ha,,daqui a;,passad:o|a,,pr\u00f3ximo|pr\u00f3xima|proximo|proxima",
        fr:"2;;janvier,f\u00e9vrier|fevrier,mars,avril,mai,juin,juillet,ao\u00fbt,septembre,octobre,novembre,d\u00e9cembre|decembre;dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi;milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|n\u00e9e|nee;un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix;;l'|la|le;{sign} {num} {unit},{sign} {num} {unit},{1} {date?} {month} {year?},{1} {unit=5-7} {shift};{d} {month} {yyyy};,hier,aujourd'hui,demain;,il y a,,dans|d'ici;,derni:er|\u00e8re|ere,,prochain:|e",
        it:"2;;Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre;Domenica,Luned:\u00ec|i,Marted:\u00ec|i,Mercoled:\u00ec|i,Gioved:\u00ec|i,Venerd:\u00ec|i,Sabato;millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i;un:|'|a|o,due,tre,quattro,cinque,sei,sette,otto,nove,dieci;;l'|la|il;{num} {unit} {sign},{weekday?} {date?} {month} {year?},{1} {unit=5-7} {shift},{1} {shift} {unit=5-7};{d} {month} {yyyy};,ieri,oggi,domani,dopodomani;,fa,,da adesso;,scors:o|a,,prossim:o|a",
        de:"2;;Januar,Februar,M\u00e4rz|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember;Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag;Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en;ein:|e|er|em|en,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn;;der;{sign} {num} {unit},{num} {unit} {sign},{num} {unit} {sign},{sign} {num} {unit},{weekday?} {date?} {month} {year?},{shift} {unit=5-7};{d}. {Month} {yyyy};vorgestern,gestern,heute,morgen,\u00fcbermorgen|ubermorgen|uebermorgen;,vor:|her,,in;,letzte:|r|n|s,,n\u00e4chste:|r|n|s+naechste:|r|n|s",
        "zh-TW":"1;\u6708;;\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d;\u6beb\u79d2,\u79d2\u9418,\u5206\u9418,\u5c0f\u6642,\u5929,\u500b\u661f\u671f|\u9031,\u500b\u6708,\u5e74;;;\u65e5|\u865f;{num}{unit}{sign},\u661f\u671f{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}\u5e74{month?}\u6708?{date?}{1},{month}\u6708{date?}{1},{date}{1};{yyyy}\u5e74{M}\u6708{d}\u65e5;\u524d\u5929,\u6628\u5929,\u4eca\u5929,\u660e\u5929,\u5f8c\u5929;,\u524d,,\u5f8c;,\u4e0a|\u53bb,\u9019,\u4e0b|\u660e", "zh-CN":"1;\u6708;;\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d;\u6beb\u79d2,\u79d2\u949f,\u5206\u949f,\u5c0f\u65f6,\u5929,\u4e2a\u661f\u671f|\u5468,\u4e2a\u6708,\u5e74;;;\u65e5|\u53f7;{num}{unit}{sign},\u661f\u671f{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}\u5e74{month?}\u6708?{date?}{1},{month}\u6708{date?}{1},{date}{1};{yyyy}\u5e74{M}\u6708{d}\u65e5;\u524d\u5929,\u6628\u5929,\u4eca\u5929,\u660e\u5929,\u540e\u5929;,\u524d,,\u540e;,\u4e0a|\u53bb,\u8fd9,\u4e0b|\u660e"};

    function Ga(a) {
        var b = s.addFormat, c = a.code;
        if (!a.q) {
            b("(" + a.months.compact().join("|") + ")", ["month"], c);
            b("(" + a.weekdays.compact().join("|") + ")", ["weekday"], c);
            b("(" + a.modifiers.filter(
                function (d) {
                    return d.name === "day"
                }).map("text").join("|") + ")", ["day"], c);
            I(a.formats, function (d) {
                var e = [];
                d = d.replace(/\s+/g, "[-,. ]*");
                d = d.replace(/\{(.+?)\}/g, function (f, h) {
                    var g = h.match(/\?$/), k = h.match(/(\d)(?:-(\d))?/), n = h.match(/^\d+$/), o = h.replace(/[^a-z]+$/, ""), u, H;
                    if (o === "time") {
                        e = e.concat(ua);
                        return g ? wa : va
                    }
                    if (n)u = a.optionals[n[0] - 1]; else if (a[o])u = a[o]; else if (a[o + "s"]) {
                        u = a[o + "s"];
                        if (k) {
                            H = [];
                            I(u, function (Na, Oa) {
                                var xa = Oa % (a.units ? 8 : u.length);
                                if (xa >= k[1] && xa <= (k[2] || k[1]))H.push(Na)
                            });
                            u = H
                        }
                        u = u.compact().join("|")
                    }
                    if (n)return"(?:" + u + ")?"; else {
                        e.push(o);
                        return"(" + u + ")" + (g ? "?" : "")
                    }
                });
                b(d, e, c)
            });
            a.q = i
        }
    }

    function Y(a, b, c) {
        if (b && (!p.isString(a) || !a))a = Date.currentLocale;
        a && !Ea[a] && Ha(a, c);
        return Ea[a]
    }

    function Ha(a, b) {
        function c(f, h) {
            f = f.split("+").map(
                function (g) {
                    return g.replace(/(.+):(.+)$/, function (k, n, o) {
                        return o.split("|").map(
                            function (u) {
                                return n + u
                            }).join("|")
                    })
                }).join("|");
            return I(f.split("|"), h)
        }

        function d(f, h, g) {
            var k = [];
            if (b[f]) {
                I(b[f], function (n, o) {
                    c(n, function (u, H) {
                        k[H * g + o] = u.toLowerCase()
                    })
                });
                if (h)k = k.concat(b[f].map(function (n) {
                    return n.slice(0, 3).toLowerCase()
                }));
                return b[f] = k
            }
        }

        function e(f, h) {
            var g = "[0-9\uff10-\uff19]" + (f ? "{" + f + "," + h + "}" : "+");
            if (b.digits)g += "|[" + b.digits + "]+";
            return g
        }

        b = b || Ia(a);
        if (!b)throw Error("Invalid locale.");
        d("months", i, 12);
        d("weekdays", i, 7);
        d("units", l, 8);
        d("numbers", l, 10);
        b.code = a;
        b.date = e(1, 2);
        b.year = e(4, 4);
        b.num = function () {
            var f = [e()].concat(b.articles);
            b.digits || (f = f.concat(b.numbers));
            return f.compact().join("|")
        }();
        (function () {
            var f = [];
            b.i = {};
            I(b.modifiers, function (h) {
                c(h.text, function (g) {
                    b.i[g] = h;
                    f.push({name:h.name, text:g, value:h.value})
                })
            });
            f.groupBy("name", function (h, g) {
                g = g.map("text");
                if (h === "day")g = g.concat(b.weekdays);
                b[h] = g.join("|")
            });
            b.modifiers = f
        })();
        if (b.monthSuffix) {
            b.month = e(1, 2);
            b.months = (1).upto(12).map(function (f) {
                return f + b.monthSuffix
            })
        }
        Ea[a] = new Ja(b)
    }

    function Ia(a) {
        function b(e) {
            return!!(d[0] & Math.pow(2, e - 1))
        }

        if (a.slice(0, 3) == "en-")a = "en";
        if (!Fa[a])return j;
        var c = {modifiers:[]}, d = Fa[a].split(";");
        I(["months", "weekdays", "units", "numbers", "articles", "optionals", "formats"], function (e, f) {
            c[e] = d[f + 2] ? d[f + 2].split(",") : []
        });
        c.outputFormat = d[9];
        I(["day", "sign", "shift", "edge"], function (e, f) {
            d[f + 10] && I(d[f + 10].split(","), function (h, g) {
                h && c.modifiers.push({name:e, text:h, value:g - 2})
            })
        });
        if (b(1)) {
            c.digits = V + ya;
            if (c.numbers.length > 0)c.digits += c.numbers.join(""); else c.numbers = V.split("");
            c.monthSuffix = d[1]
        }
        c.capitalizeUnit = a == "de";
        c.hasPlural = b(2);
        c.pastRelativeFormat = c.formats[0];
        c.futureRelativeFormat = c.formats[b(3) ? 1 : 0];
        return c
    }

    function Ka(a) {
        a || (a = Date.currentLocale);
        return a != "en" && a != "en-US"
    }

    function Ja(a) {
        p.merge(this, a)
    }

    w(Ja, i, l, {getMonth:function (a) {
        return p.isNumber(a) ? a - 1 : z(this.months, r(a, "i"), 0, l, i) % 12
    }, o:function (a) {
        return z(this.weekdays, r(a, "i"), 0, l, i) % 7
    }, n:function (a) {
        var b;
        return p.isNumber(a) ? a : a && (b = this.numbers.indexOf(a)) !== -1 ? (b + 1) % 10 : 1
    }, s:function (a) {
        var b = this;
        return a.replace(this.numbers[9], "").each(
            function (c) {
                return b.n(c)
            }).join("")
    }, r:function (a) {
        return English.units[this.units.indexOf(a) % 8]
    }, w:function (a, b, c) {
        var d, e;
        d = c > 0 ? this.futureRelativeFormat : this.pastRelativeFormat;
        if (this.code == "ru") {
            e = a.toString().from(-1);
            switch (i) {
                case e == 1:
                    e = 1;
                    break;
                case e >= 2 && e <= 4:
                    e = 2;
                    break;
                default:
                    e = 3
            }
        } else e = this.hasPlural && a > 1 ? 1 : 0;
        e = this.units[e * 8 + b] || this.units[b];
        if (this.capitalizeUnit)e = e.capitalize();
        b = z(this.modifiers, function (f) {
            return f.name == "sign" && f.value == (c > 0 ? 1 : -1)
        });
        return d.assign({num:a, unit:e, sign:b.text})
    }});
    function Z(a) {
        var b;
        if (J(a[0]))return a; else if (a.length == 1 && p.isNumber(a[0]))return[a[0]];
        b = {};
        I(Ba, function (c, d) {
            b[c.a] = a[d]
        });
        return[b]
    }

    function La(a, b) {
        if (b != "date" && b != "month" && b != "year")return a;
        return a.replace(za, function (c) {
            return V.indexOf(c) + 1 || ""
        })
    }

    function Ma(a, b) {
        var c = {}, d, e;
        I(b, function (f, h) {
            d = a[h + 1];
            if (!(A(d) || d === "")) {
                d = La(d.hankaku("n"), f);
                if (f === "year")c.z = d;
                if (f === "millisecond")d *= Math.pow(10, 3 - d.length);
                e = parseFloat(d);
                c[f] = !isNaN(e) ? e : d.toLowerCase()
            }
        });
        return c
    }

    function Pa(a, b) {
        var c = new s, d = l, e, f, h, g, k, n, o;
        if (p.isDate(a))c = a; else if (p.isNumber(a))c = new s(a); else if (p.isObject(a)) {
            c = (new s).set(a, i);
            g = a
        } else if (p.isString(a)) {
            Ga(Y(b, i));
            f = Ka(b);
            a = a.trim().replace(/\.+$/, "").replace(/^now$/, "");
            I(Aa, function (u) {
                var H = a.match(u.v);
                if (H) {
                    h = u;
                    g = Ma(H, h.to);
                    e = Y(h.u, i);
                    if (h.k && !p.isString(g.month) && (p.isString(g.date) || f)) {
                        o = g.month;
                        g.month = g.date;
                        g.date = o
                    }
                    if (g.year && g.z.length === 2)g.year = Q((new s).getFullYear() / 100) * 100 - Q(g.year / 100) * 100 + g.year;
                    if (g.month) {
                        g.month = e.getMonth(g.month);
                        if (g.shift && !g.unit)g.unit = "year"
                    }
                    if (g.weekday && g.date)delete g.weekday; else if (g.weekday) {
                        g.weekday = e.o(g.weekday);
                        if (g.shift && !g.unit)g.unit = "week"
                    }
                    if (g.day && (o = e.i[g.day])) {
                        g.day = o.value;
                        c.resetTime();
                        d = i
                    } else if (g.day && (o = e.o(g.day)) > -1) {
                        delete g.day;
                        g.weekday = o
                    }
                    if (g.date && !p.isNumber(g.date))g.date = e.s(g.date);
                    if (g.meridian)if (g.meridian === "pm" && g.hour < 12)g.hour += 12;
                    if (g.offset_hours || g.offset_minutes) {
                        g.utc = i;
                        g.offset_minutes = g.offset_minutes || 0;
                        g.offset_minutes += g.offset_hours * 60;
                        if (g.offset_sign === "-")g.offset_minutes *= -1;
                        g.minute -= g.offset_minutes
                    }
                    if (g.unit) {
                        d = i;
                        n = e.n(g.num);
                        k = e.r(g.unit);
                        if (g.shift || g.edge) {
                            n *= (o = e.i[g.shift]) ? o.value : 0;
                            if (k === "month" && K(g.date)) {
                                c.set({day:g.date}, i);
                                delete g.date
                            }
                            if (k === "year" && K(g.month)) {
                                c.set({month:g.month, day:g.date}, i);
                                delete g.month;
                                delete g.date
                            }
                        }
                        if (g.sign && (o = e.i[g.sign]))n *= o.value;
                        if (K(g.weekday)) {
                            c.set({weekday:g.weekday}, i);
                            delete g.weekday
                        }
                        g[k] = (g[k] || 0) + n
                    }
                    if (g.year_sign === "-")g.year *= -1;
                    return l
                }
            });
            if (h)if (d)c.advance(g); else g.utc ? c.setUTC(g, i) : c.set(g, i); else c = a ? new s(a) : new s;
            if (g && g.edge) {
                o = e.i[g.edge];
                I(W.slice(4), function (u) {
                    if (K(g[u.a])) {
                        k = u.a;
                        return l
                    }
                });
                if (k === "year")g.f = "month"; else if (k === "month" || k === "week")g.f = "day";
                c[(o.value < 0 ? "endOf" : "beginningOf") + k.capitalize()]();
                o.value === -2 && c.resetTime()
            }
        }
        return{h:c, set:g}
    }

    function Qa(a, b, c, d) {
        var e, f = Y(d, i), h = r(/^[A-Z]/);
        if (a.isValid())if (Date[b])b = Date[b]; else {
            if (p.isFunction(b)) {
                e = Ra(a);
                b = b.apply(a, e.concat(f))
            }
        } else return"Invalid Date";
        if (!b && !c)b = f.outputFormat; else if (!b && c) {
            e = e || Ra(a);
            if (e[1] === 0) {
                e[1] = 1;
                e[0] = 1
            }
            return f.w(e[0], e[1], e[2])
        }
        I(Da, function (g) {
            b = b.replace(r("\\{(" + g.c + ")(\\d)?\\}", g.l ? "i" : ""), function (k, n, o) {
                k = g.b(a, f, o || 1, n);
                o = n.length;
                var u = n.match(/^(.)\1+$/);
                if (g.l) {
                    if (o === 3)k = k.to(3);
                    if (u || n.match(h))k = k.capitalize()
                } else if (u && !g.text)k = (p.isNumber(k) ? k.pad(o) : k.toString()).last(o);
                return k
            })
        });
        return b
    }

    function Sa(a, b, c) {
        var d = Pa(b), e = 0, f = b = 0, h;
        if (c > 0) {
            b = f = c;
            h = i
        }
        if (!d.h.isValid())return l;
        if (d.set && d.set.f) {
            I(X, function (k) {
                if (k.a === d.set.f)e = k.e(d.h, a - d.h) - 1
            });
            if (d.set.edge || d.set.shift)d.h["beginningOf" + d.set.f.capitalize()]();
            if (!h && d.set.sign && d.set.f != "millisecond") {
                b = 50;
                f = -50
            }
        }
        c = a.getTime();
        h = d.h.getTime();
        var g = h + e;
        if (d.set && d.set.f == "week" && (new Date(g + 1)).getHours() != 0)g -= s.DSTOffset;
        return c >= h - b && c <= g + f
    }

    function $(a, b, c, d, e) {
        if (p.isNumber(b) && e)b = {milliseconds:b}; else if (p.isNumber(b)) {
            a.setTime(b);
            return a
        }
        if (b.date)b.day = b.date;
        if (!e && A(b.day) && K(b.weekday)) {
            a["set" + (d ? "UTC" : "") + "Weekday"](b.weekday);
            b.day = a["get" + (d ? "UTC" : "") + "Date"](void 0);
            delete b.weekday
        }
        I(W, function (f) {
            if (K(b[f.a]) || K(b[f.a + "s"])) {
                b.f = f.a;
                return l
            } else if (c && f.a !== "week" && f.a !== "year")a["set" + (d ? "UTC" : "") + f.method](f.a === "day" ? 1 : 0)
        });
        I(X, function (f) {
            var h = f.a;
            f = f.method;
            var g = K(b[h]) ? b[h] : b[h + "s"];
            if (!A(g)) {
                if (e) {
                    if (h === "week") {
                        g = (b.day || 0) + g * 7;
                        f = "Date"
                    }
                    g = g * e + a["get" + f](void 0)
                }
                a["set" + (d ? "UTC" : "") + f](g);
                h === "month" && g % 12 != a.getMonth() && a.setDate(0)
            }
        });
        return a
    }

    function Ra(a) {
        var b;
        a = a.millisecondsFromNow();
        var c = a.abs(), d = c, e = 0;
        I(W.from(1), function (f, h) {
            b = Q(c / f.e(), 1).floor();
            if (b >= 1) {
                d = b;
                e = h + 1
            }
        });
        return[d, e, a]
    }

    function S(a) {
        var b;
        b = p.isNumber(a[1]) ? Z(a)[0] : a[0];
        return Pa(b, a[1]).h
    }

    w(s, l, l, {create:function () {
        return S(arguments)
    }, now:function () {
        return(new s).getTime()
    }, setLocale:function (a, b) {
        var c = Y(a, l, b);
        if (c) {
            Date.currentLocale = a;
            Ga(c);
            return c
        }
    }, getLocale:function (a) {
        return Y(a, i)
    }, addFormat:function (a, b, c, d) {
        Aa.push({k:d, u:c, v:r("^" + a + "$", "i"), to:b})
    }});
    w(s, i, l, {set:function () {
        var a = Z(arguments);
        return $(this, a[0], a[1])
    }, setUTC:function () {
        var a = Z(arguments);
        return $(this, a[0], a[1], i)
    }, setWeekday:function (a) {
        A(a) || this.setDate(this.getDate() + a - this.getDay())
    }, setUTCWeekday:function (a) {
        A(a) || this.setDate(this.getUTCDate() + a - this.getDay())
    }, setWeek:function (a) {
        if (!A(a)) {
            this.setMonth(0);
            this.setDate(a * 7 + 1)
        }
    }, setUTCWeek:function (a) {
        if (!A(a)) {
            this.setMonth(0);
            this.setUTCDate(a * 7 + 1)
        }
    }, getWeek:function () {
        return((this.getTime() - (new s(this.getFullYear(), 0, 1)).getTime() + 1) / 6048E5).ceil()
    }, getUTCWeek:function () {
        return((this.getTime() - (new s).setUTC(this.getUTCFullYear(), 0, 1, 0, 0, 0, 0).getTime() + 1) / 6048E5).ceil()
    }, getUTCOffset:function (a) {
        var b = this.j ? 0 : this.getTimezoneOffset(), c = a === i ? ":" : "";
        if (!b && a)return"Z";
        return Q(-b / 60).pad(2, i) + c + (b % 60).pad(2)
    }, toUTC:function () {
        if (this.j)return this;
        var a = this.clone().addMinutes(this.getTimezoneOffset());
        a.j = i;
        return a
    }, isUTC:function () {
        return this.j || this.getTimezoneOffset() === 0
    }, advance:function () {
        var a = Z(arguments);
        return $(this, a[0], l, l, 1, i)
    }, rewind:function () {
        var a = Z(arguments);
        return $(this, a[0], l, l, -1)
    }, isValid:function () {
        return!isNaN(this.getTime())
    }, isAfter:function (a, b) {
        return this.getTime() > s.create(a).getTime() - (b || 0)
    }, isBefore:function (a, b) {
        return this.getTime() < s.create(a).getTime() + (b || 0)
    }, isBetween:function (a, b, c) {
        var d = this.getTime();
        a = s.create(a).getTime();
        var e = s.create(b).getTime();
        b = Math.min(a, e);
        a = Math.max(a, e);
        c = c || 0;
        return b - c < d && a + c > d
    }, isLeapYear:function () {
        var a = this.getFullYear();
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }, daysInMonth:function () {
        return 32 - (new s(this.getFullYear(), this.getMonth(), 32)).getDate()
    }, format:function (a, b) {
        return Qa(this, a, l, b)
    }, relative:function (a, b) {
        if (p.isString(a)) {
            b = a;
            a = j
        }
        return Qa(this, a, i, b)
    }, is:function (a, b) {
        var c;
        if (p.isString(a)) {
            a = a.trim().toLowerCase();
            switch (i) {
                case a === "future":
                    return this.getTime() > (new s).getTime();
                case a === "past":
                    return this.getTime() < (new s).getTime();
                case a === "weekday":
                    return this.getDay() > 0 && this.getDay() < 6;
                case a === "weekend":
                    return this.getDay() === 0 || this.getDay() === 6;
                case (c = English.weekdays.indexOf(a) % 7) > -1:
                    return this.getDay() === c;
                case (c = English.months.indexOf(a) % 12) > -1:
                    return this.getMonth() === c
            }
        }
        return Sa(this, a, b)
    }, resetTime:function () {
        return this.set({hour:0, minute:0, second:0, millisecond:0})
    }, clone:function () {
        return new s(this.getTime())
    }, compare:function () {
        return this - S(arguments)
    }});
    w(s, i, l, {getWeekday:s.prototype.getDay, getUTCWeekday:s.prototype.getUTCDay});
    r.m = A(r("()??").exec("")[1]);
    function Ta(a, b) {
        var c = "";
        if (b == "g" || a.global)c += "g";
        if (b == "i" || a.ignoreCase)c += "i";
        if (b == "m" || a.multiline)c += "m";
        if (b == "y" || a.A)c += "y";
        return c
    }

    w(r, l, l, {escape:function (a) {
        return a.replace(/([/'*+?|()\[\]{}.^$])/g, "\\$1")
    }});
    w(r, i, l, {getFlags:function () {
        return Ta(this)
    }, setFlags:function (a) {
        return r(this.source, a)
    }, addFlag:function (a) {
        return this.setFlags(Ta(this, a))
    }, removeFlag:function (a) {
        return this.setFlags(Ta(this).replace(a, ""))
    }});
    function Ua(a, b, c, d, e) {
        if (!a.g)a.g = [];
        a.g.push(setTimeout(function () {
            a.g.removeAt(f);
            c.apply(d, e || [])
        }, b));
        var f = a.g.length
    }

    w(Function, i, l, {lazy:function (a, b) {
        function c() {
            if (!(h || f.length == 0)) {
                for (var n = Math.max(f.length - k, 0); f.length > n;)Function.prototype.apply.apply(e, f.shift());
                Ua(d, g, function () {
                    h = l;
                    c()
                });
                h = i
            }
        }

        function d() {
            if (!(h && f.length > b - 2)) {
                f.push([this, arguments]);
                c()
            }
        }

        var e = this, f = [], h = l, g, k;
        a = a || 1;
        b = b || Infinity;
        g = a.ceil();
        k = Q(g / a);
        return d
    }, delay:function (a) {
        p.isNumber(a) || (a = 0);
        var b = E(arguments, 1);
        Ua(this, a, this, this, b);
        return this
    }, debounce:function (a, b) {
        var c = this;
        return b === l ? this.lazy(a, 1) : function () {
            c.cancel();
            Ua(c, a, c, this, arguments)
        }
    }, cancel:function () {
        if (p.isArray(this.g))for (; this.g.length > 0;)clearTimeout(this.g.shift());
        return this
    }, after:function (a) {
        var b = this, c = 0, d = [];
        if (p.isNumber(a)) {
            if (a === 0) {
                b.call();
                return b
            }
        } else a = 1;
        return function () {
            var e;
            d.push(Array.create(arguments));
            c++;
            if (c == a) {
                e = b.call(this, d);
                c = 0;
                d = [];
                return e
            }
        }
    }, once:function () {
        var a = this;
        return function () {
            return a.hasOwnProperty("memo") ? a.memo : a.memo = a.apply(this, arguments)
        }
    }, fill:function () {
        var a = this, b = E(arguments);
        return function () {
            var c = E(arguments);
            I(b, function (d, e) {
                if (K(d) || e >= c.length)c.insert(d, e)
            });
            return a.apply(this, c)
        }
    }});
    (function () {
        var a = {};
        I(["Array", "Boolean", "Date", "Function", "Number", "String", "RegExp"], function (b) {
            a["is" + b] = function (c) {
                return B(c, b)
            }
        });
        w(Object, l, l, a)
    })();
    da(["keys", "values", "each", "merge", "isEmpty", "clone", "equal", "watch", "tap"], M);
    w(p, l, i, {watch:function (a, b, c) {
        if (aa) {
            var d = a[b];
            p.defineProperty(a, b, {get:function () {
                return d
            }, set:function (e) {
                d = c.call(a, b, d, e)
            }, enumerable:i, configurable:i})
        }
    }});
    (function (a) {
        if (!K(this.btoa)) {
            var b = /[^A-Za-z0-9\+\/\=]/g;
            btoa = function (c) {
                var d = "", e, f, h, g, k, n, o = 0;
                do {
                    e = c.charCodeAt(o++);
                    f = c.charCodeAt(o++);
                    h = c.charCodeAt(o++);
                    g = e >> 2;
                    e = (e & 3) << 4 | f >> 4;
                    k = (f & 15) << 2 | h >> 6;
                    n = h & 63;
                    if (isNaN(f))k = n = 64; else if (isNaN(h))n = 64;
                    d = d + a.charAt(g) + a.charAt(e) + a.charAt(k) + a.charAt(n)
                } while (o < c.length);
                return d
            };
            atob = function (c) {
                var d = "", e, f, h, g, k, n = 0;
                if (c.match(b))throw Error("String contains invalid base64 characters");
                c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do {
                    e = a.indexOf(c.charAt(n++));
                    f = a.indexOf(c.charAt(n++));
                    g = a.indexOf(c.charAt(n++));
                    k = a.indexOf(c.charAt(n++));
                    e = e << 2 | f >> 4;
                    f = (f & 15) << 4 | g >> 2;
                    h = (g & 3) << 6 | k;
                    d += e.chr();
                    if (g != 64)d += f.chr();
                    if (k != 64)d += h.chr()
                } while (n < c.length);
                return unescape(d)
            }
        }
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
    (function () {
        var a = T().match(/^\s+$/);
        try {
            t.prototype.trim.call([1])
        } catch (b) {
            a = l
        }
        var c = r("^[" + T() + "]+"), d = r("[" + T() + "]+$");
        w(t, i, !a, {trim:function () {
            return this.toString().trimLeft().trimRight()
        }, trimLeft:function () {
            return this.replace(c, "")
        }, trimRight:function () {
            return this.replace(d, "")
        }})
    })();
    (function () {
        var a;
        I(na, function (b) {
            b.start.upto(b.end, function (c) {
                U(b.type, c.chr(), (c + b.shift).chr())
            })
        });
        "\u30a2\u30a4\u30a6\u30a8\u30aa\u30a1\u30a3\u30a5\u30a7\u30a9\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c3\u30c6\u30c8\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d2\u30d5\u30d8\u30db\u30de\u30df\u30e0\u30e1\u30e2\u30e4\u30e3\u30e6\u30e5\u30e8\u30e7\u30e9\u30ea\u30eb\u30ec\u30ed\u30ef\u30f2\u30f3\u30fc\u30fb".each(function (b, c) {
            a = "\uff71\uff72\uff73\uff74\uff75\uff67\uff68\uff69\uff6a\uff6b\uff76\uff77\uff78\uff79\uff7a\uff7b\uff7c\uff7d\uff7e\uff7f\uff80\uff81\uff82\uff6f\uff83\uff84\uff85\uff86\uff87\uff88\uff89\uff8a\uff8b\uff8c\uff8d\uff8e\uff8f\uff90\uff91\uff92\uff93\uff94\uff6c\uff95\uff6d\uff96\uff6e\uff97\uff98\uff99\uff9a\uff9b\uff9c\uff66\uff9d\uff70\uff65".charAt(c);
            U("k", a, b);
            b.match(sa) && U("k", a + "\uff9e", b.shift(1));
            b.match(ta) && U("k", a + "\uff9f", b.shift(2))
        });
        "\u3002\u3001\u300c\u300d\uffe5\uffe0\uffe1".each(function (b, c) {
            U("p", "\uff61\uff64\uff62\uff63\u00a5\u00a2\u00a3".charAt(c), b)
        });
        U("k", "\uff73\uff9e", "\u30f4");
        U("k", "\uff66\uff9e", "\u30fa");
        U("s", " ", "\u3000")
    })();
    [
        {d:["Arabic"], source:"\u0600-\u06ff"},
        {d:["Cyrillic"], source:"\u0400-\u04ff"},
        {d:["Devanagari"], source:"\u0900-\u097f"},
        {d:["Greek"], source:"\u0370-\u03ff"},
        {d:["Hangul"], source:"\uac00-\ud7af\u1100-\u11ff"},
        {d:["Han", "Kanji"], source:"\u4e00-\u9fff\uf900-\ufaff"},
        {d:["Hebrew"], source:"\u0590-\u05ff"},
        {d:["Hiragana"], source:"\u3040-\u309f\u30fb-\u30fc"},
        {d:["Kana"], source:"\u3040-\u30ff\uff61-\uff9f"},
        {d:["Katakana"], source:"\u30a0-\u30ff\uff61-\uff9f"},
        {d:["Latin"], source:"\u0001-\u0080-\u00ff\u0100-\u017f\u0180-\u024f"},
        {d:["Thai"], source:"\u0e00-\u0e7f"}
    ].each(function (a) {
        var b = r("^[" + a.source + "\\s]+$"), c = r("[" + a.source + "]");
        a.d.each(function (d) {
            y(t.prototype, "is" + d, function () {
                return b.test(this.trim())
            });
            y(t.prototype, "has" + d, function () {
                return c.test(this)
            })
        })
    });
    English = s.setLocale("en");
    I(X, function (a, b) {
        var c = a.a, d = c.capitalize(), e = a.e();
        y(s.prototype, c + "sSince", function (f, h) {
            return Q((this.getTime() - s.create(f, h).getTime()) / e)
        });
        y(s.prototype, c + "sUntil", function (f, h) {
            return Q((s.create(f, h).getTime() - this.getTime()) / e)
        });
        y(s.prototype, c + "sAgo", s.prototype[c + "sUntil"]);
        y(s.prototype, c + "sFromNow", s.prototype[c + "sSince"]);
        y(s.prototype, "add" + d + "s", function (f) {
            var h = {};
            h[c] = f;
            return this.advance(h)
        });
        la(c, e);
        b < 3 && I(["Last", "This", "Next"], function (f) {
            y(s.prototype, "is" + f + d, function () {
                return this.is(f + " " + c)
            })
        });
        if (b < 4) {
            y(s.prototype, "beginningOf" + d, function () {
                var f = {};
                switch (c) {
                    case "year":
                        f.year = this.getFullYear();
                        break;
                    case "month":
                        f.month = this.getMonth();
                        break;
                    case "day":
                        f.day = this.getDate();
                        break;
                    case "week":
                        f.weekday = 0
                }
                return this.set(f, i)
            });
            y(s.prototype, "endOf" + d, function () {
                var f = {hours:23, minutes:59, seconds:59, milliseconds:999};
                switch (c) {
                    case "year":
                        f.month = 11;
                        f.day = 31;
                        break;
                    case "month":
                        f.day = this.daysInMonth();
                        break;
                    case "week":
                        f.weekday = 6
                }
                return this.set(f, i)
            })
        }
    });
    (function () {
        Ba = X.clone().removeAt(2);
        W = X.clone().reverse();
        var a = "\\d{1,2}|" + English.months.join("|");
        I(Ca, function (b) {
            s.addFormat(b.src.replace(/\{month\}/, a) + wa, b.to.concat(ua), "en", b.k)
        });
        s.addFormat(va, ua)
    })();
    (function () {
        var a = English.weekdays.slice(0, 7), b = English.months.slice(0, 12);
        I(["today", "yesterday", "tomorrow", "weekday", "weekend", "future", "past"].concat(a).concat(b), function (c) {
            y(s.prototype, "is" + c.capitalize(), function () {
                return this.is(c)
            })
        })
    })();
    w(s, l, i, {DSTOffset:((new s(2E3, 6, 1)).getTimezoneOffset() - (new s(2E3, 0, 1)).getTimezoneOffset()) * 60 * 1E3, INTERNATIONAL_TIME:"{h}:{mm}:{ss}", RFC1123:"{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}", RFC1036:"{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}", ISO8601_DATE:"{yyyy}-{MM}-{dd}", ISO8601_DATETIME:"{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"});
    (function () {
        var a = new s(s.UTC(1999, 11, 31));
        if (!a.toISOString || a.toISOString() !== "1999-12-31T00:00:00.000Z")w(s, i, i, {toISOString:function () {
            return Qa(this.toUTC(), s.ISO8601_DATETIME)
        }});
        if (!a.toJSON || a.toJSON() !== "1999-12-31T00:00:00.000Z")w(s, i, i, {toJSON:s.prototype.toISOString});
        w(s, i, l, {iso:s.prototype.toISOString})
    })();
    (function () {
        var a = l;
        if (Function.prototype.p) {
            a = function () {
            };
            var b = a.p();
            a = new b instanceof b && !(new a instanceof b)
        }
        w(Function, i, !a, {bind:function (c) {
            var d = this, e = E(arguments, 1), f, h;
            if (!p.isFunction(this))throw new TypeError("Function.prototype.bind called on a non-function");
            h = function () {
                return d.apply(d.prototype && this instanceof d ? this : c, e.concat(E(arguments)))
            };
            f = function () {
            };
            f.prototype = this.prototype;
            h.prototype = new f;
            return h
        }})
    })();
})();