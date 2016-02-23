function progress(a, b) {
    var c = a * b.width() / 100;
    b.find(".progressbar-value").animate({
        width: c
    }, 1200)
}

function body_sizer() {
    if ($("body").hasClass("fixed-sidebar")) {
        var a = $(window).height(),
            b = $("#page-header").height(),
            c = a - b;
        $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $("#page-content").css("min-height", c)
    } else {
        var a = $(document).height(),
            b = $("#page-header").height(),
            c = a - b;
        $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $("#page-content").css("min-height", c)
    }
}

function pageTransitions() {
    var a = [".pt-page-moveFromLeft", "pt-page-moveFromRight", "pt-page-moveFromTop", "pt-page-moveFromBottom", "pt-page-fade", "pt-page-moveFromLeftFade", "pt-page-moveFromRightFade", "pt-page-moveFromTopFade", "pt-page-moveFromBottomFade", "pt-page-scaleUp", "pt-page-scaleUpCenter", "pt-page-flipInLeft", "pt-page-flipInRight", "pt-page-flipInBottom", "pt-page-flipInTop", "pt-page-rotatePullRight", "pt-page-rotatePullLeft", "pt-page-rotatePullTop", "pt-page-rotatePullBottom", "pt-page-rotateUnfoldLeft", "pt-page-rotateUnfoldRight", "pt-page-rotateUnfoldTop", "pt-page-rotateUnfoldBottom"];
    for (var b in a) {
        var c = a[b];
        if ($(".add-transition").hasClass(c)) return $(".add-transition").addClass(c + "-init page-transition"), void setTimeout(function() {
            $(".add-transition").removeClass(c + " " + c + "-init page-transition")
        }, 1200)
    }
}

function swither_resizer() {
    var a = $(window).height();
    $("#theme-switcher-wrapper").height(a / 1.4)
}

function currency(a, b, c) {
    if (null != a) {
        var d;
        return d = "roundHalfUp" == ErpSetting.priceRoundType ? (Math.round(a * Math.pow(10, ErpSetting.priceScale)) / Math.pow(10, ErpSetting.priceScale)).toFixed(ErpSetting.priceScale) : "roundUp" == ErpSetting.priceRoundType ? (Math.ceil(a * Math.pow(10, ErpSetting.priceScale)) / Math.pow(10, ErpSetting.priceScale)).toFixed(ErpSetting.priceScale) : (Math.floor(a * Math.pow(10, ErpSetting.priceScale)) / Math.pow(10, ErpSetting.priceScale)).toFixed(ErpSetting.priceScale), b && (d = ErpSetting.currencySign + d), c && (d += ErpSetting.currencyUnit), d
    }
}

function format_number(a) {
    if (a += "", a = a.replace(/[ ]/g, ""), "" != a && !isNaN(a)) {
        for (var b = /(-?\d+)(\d{3})/; b.test(a);) a = a.replace(b, "$1,$2");
        return a
    }
}

function format_thousands(a) {
    if (a += "", a = a.replace(/[ ]/g, ""), "" != a && !isNaN(a)) {
        a = parseFloat(a).toFixed(2);
        for (var b = a.indexOf("."), c = a.substring(0, b), d = a.substring(b + 1, a.length), e = /(-?\d+)(\d{3})/; e.test(c);) c = c.replace(e, "$1,$2");
        return a = c + "." + d
    }
}

function toFloat(a) {
    return 0 == a || null == a ? $.erp.formZero : parseFloat(a)
}

function formatToFloat(a) {
    return -1 != a.indexOf(",") ? a.replace(/,/g, "") : a
}

function isNumber(a) {
    return "number" == typeof a && isFinite(a)
}

function formatNumber() {
    if (num = this + "", num = num.replace(/[ ]/g, ""), "" != num && !isNaN(num)) {
        for (var a = /(-?\d+)(\d{3})/; a.test(num);) num = num.replace(a, "$1,$2");
        return num
    }
}

function monthFirstDay() {
    var a = new Date,
        b = new Date(a.getFullYear(), a.getMonth(), 1);
    return b.format("yyyy-MM-dd")
}

function monthLastDay() {
    var a = new Date,
        b = new Date(a.getFullYear(), a.getMonth() + 1, 1),
        c = new Date(b - 864e5);
    return c.format("yyyy-MM-dd")
}

function preMonthFirstDay() {
    var a = new Date,
        b = new Date(a.getFullYear(), a.getMonth() - 1, 1);
    return b.format("yyyy-MM-dd")
}

function preMonthLastDay() {
    var a = new Date,
        b = new Date(a.getFullYear(), a.getMonth(), 1),
        c = new Date(b - 864e5);
    return c.format("yyyy-MM-dd")
} + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.2.0", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this,
                e = this.tip(),
                f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i,
                i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(),
                k = e[0].offsetWidth,
                l = e[0].offsetHeight;
            if (i) {
                var m = g,
                    n = this.$element.parent(),
                    o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function() {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
            m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = window.SVGElement && c instanceof window.SVGElement,
            f = c.getBoundingClientRect ? c.getBoundingClientRect() : null,
            g = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = e ? {} : {
                width: d ? a(window).width() : b.outerWidth(),
                height: d ? a(window).height() : b.outerHeight()
            };
        return a.extend({}, f, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), $(document).on("ready", function() {
        $(".progressbar").each(function() {
            var a = $(this),
                b = $(this).attr("data-value");
            progress(b, a)
        })
    }), $(function() {
        $("#header-right, .updateEasyPieChart, .complete-user-profile, #progress-dropdown, .progress-box").hover(function() {
            $(".progressbar").each(function() {
                var a = $(this),
                    b = $(this).attr("data-value");
                progress(b, a)
            })
        })
    }), + function(a) {
        "use strict";

        function b(b) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.button"),
                    f = "object" == typeof b && b;
                e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
            })
        }
        var c = function(b, d) {
            this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
        };
        c.VERSION = "3.2.0", c.DEFAULTS = {
            loadingText: "loading..."
        }, c.prototype.setState = function(b) {
            var c = "disabled",
                d = this.$element,
                e = d.is("input") ? "val" : "html",
                f = d.data();
            b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function() {
                "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
            }, this), 0)
        }, c.prototype.toggle = function() {
            var a = !0,
                b = this.$element.closest('[data-toggle="buttons"]');
            if (b.length) {
                var c = this.$element.find("input");
                "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
            }
            a && this.$element.toggleClass("active")
        };
        var d = a.fn.button;
        a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
            return a.fn.button = d, this
        }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
            var d = a(c.target);
            d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
            a(b.target).closest(".btn").toggleClass("focus", "focus" == b.type)
        })
    }(jQuery), + function(a) {
        "use strict";

        function b(b) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("bs.collapse"),
                    f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
                !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
            })
        }
        var c = function(b, d) {
            this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
        };
        c.VERSION = "3.2.0", c.DEFAULTS = {
            toggle: !0
        }, c.prototype.dimension = function() {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height"
        }, c.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var c = a.Event("show.bs.collapse");
                if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                    var d = this.$parent && this.$parent.find("> .panel > .in");
                    if (d && d.length) {
                        var e = d.data("bs.collapse");
                        if (e && e.transitioning) return;
                        b.call(d, "hide"), e || d.data("bs.collapse", null)
                    }
                    var f = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                    var g = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return g.call(this);
                    var h = a.camelCase(["scroll", f].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
                }
            }
        }, c.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var b = a.Event("hide.bs.collapse");
                if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                    var c = this.dimension();
                    this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in"), this.transitioning = 1;
                    var d = function() {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                    return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
                }
            }
        }, c.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
        var d = a.fn.collapse;
        a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function() {
            return a.fn.collapse = d, this
        }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
            var d, e = a(this),
                f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
                g = a(f),
                h = g.data("bs.collapse"),
                i = h ? "toggle" : e.data(),
                j = e.attr("data-parent"),
                k = j && a(j);
            h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e.toggleClass("collapsed", g.hasClass("in"))), b.call(g, i)
        })
    }(jQuery),
    function(a) {
        var b = function() {
            var b = {
                    bcClass: "sf-breadcrumb",
                    menuClass: "sf-js-enabled",
                    anchorClass: "sf-with-ul",
                    menuArrowClass: "sf-arrows"
                },
                c = (function() {
                    a(window).load(function() {
                        a("body").children().on("click.superclick", function() {
                            var b = a(".sf-js-enabled");
                            b.superclick("reset")
                        })
                    })
                }(), function(a, c) {
                    var d = b.menuClass;
                    c.cssArrows && (d += " " + b.menuArrowClass), a.toggleClass(d)
                }),
                d = function(c, d) {
                    return c.find("li." + d.pathClass).slice(0, d.pathLevels).addClass(d.activeClass + " " + b.bcClass).filter(function() {
                        return a(this).children(".sidebar-submenu").hide().show().length
                    }).removeClass(d.pathClass)
                },
                e = function(a) {
                    a.children("a").toggleClass(b.anchorClass)
                },
                f = function(a) {
                    var b = a.css("ms-touch-action");
                    b = "pan-y" === b ? "auto" : "pan-y", a.css("ms-touch-action", b)
                },
                g = function(b) {
                    var c, d = a(this),
                        e = d.siblings(".sidebar-submenu");
                    return e.length ? (c = e.is(":hidden") ? h : i, a.proxy(c, d.parent("li"))(), !1) : void 0
                },
                h = function() {
                    var b = a(this);
                    l(b);
                    b.siblings().superclick("hide").end().superclick("show")
                },
                i = function() {
                    var b = a(this),
                        c = l(b);
                    a.proxy(j, b, c)()
                },
                j = function(b) {
                    b.retainPath = a.inArray(this[0], b.$path) > -1, this.superclick("hide"), this.parents("." + b.activeClass).length || (b.onIdle.call(k(this)), b.$path.length && a.proxy(h, b.$path)())
                },
                k = function(a) {
                    return a.closest("." + b.menuClass)
                },
                l = function(a) {
                    return k(a).data("sf-options")
                };
            return {
                hide: function(b) {
                    if (this.length) {
                        var c = this,
                            d = l(c);
                        if (!d) return this;
                        var e = d.retainPath === !0 ? d.$path : "",
                            f = c.find("li." + d.activeClass).add(this).not(e).removeClass(d.activeClass).children(".sidebar-submenu"),
                            g = d.speedOut;
                        b && (f.show(), g = 0), d.retainPath = !1, d.onBeforeHide.call(f), f.stop(!0, !0).animate(d.animationOut, g, function() {
                            var b = a(this);
                            d.onHide.call(b)
                        })
                    }
                    return this
                },
                show: function() {
                    var a = l(this);
                    if (!a) return this;
                    var b = this.addClass(a.activeClass),
                        c = b.children(".sidebar-submenu");
                    return a.onBeforeShow.call(c), c.stop(!0, !0).animate(a.animation, a.speed, function() {
                        a.onShow.call(c)
                    }), this
                },
                destroy: function() {
                    return this.each(function() {
                        var d = a(this),
                            g = d.data("sf-options"),
                            h = d.find("li:has(ul)");
                        return g ? (c(d, g), e(h), f(d), d.off(".superclick"), h.children(".sidebar-submenu").attr("style", function(a, b) {
                            return b.replace(/display[^;]+;?/g, "")
                        }), g.$path.removeClass(g.activeClass + " " + b.bcClass).addClass(g.pathClass), d.find("." + g.activeClass).removeClass(g.activeClass), g.onDestroy.call(d), void d.removeData("sf-options")) : !1
                    })
                },
                reset: function() {
                    return this.each(function() {
                        var b = a(this),
                            c = l(b),
                            d = a(b.find("." + c.activeClass).toArray().reverse());
                        d.children("a").trigger("click")
                    })
                },
                init: function(h) {
                    return this.each(function() {
                        var i = a(this);
                        if (i.data("sf-options")) return !1;
                        var j = a.extend({}, a.fn.superclick.defaults, h),
                            k = i.find("li:has(ul)");
                        j.$path = d(i, j), i.data("sf-options", j), c(i, j), e(k), f(i), i.on("click.superclick", "a", g), k.not("." + b.bcClass).superclick("hide", !0), j.onInit.call(this)
                    })
                }
            }
        }();
        a.fn.superclick = function(c, d) {
            return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? a.error("Method " + c + " does not exist on jQuery.fn.superclick") : b.init.apply(this, arguments)
        }, a.fn.superclick.defaults = {
            activeClass: "sfHover",
            pathClass: "overrideThisToUse",
            pathLevels: 1,
            animation: {
                opacity: "show"
            },
            animationOut: {
                opacity: "hide"
            },
            speed: "normal",
            speedOut: "fast",
            cssArrows: !0,
            onInit: a.noop,
            onBeforeShow: a.noop,
            onShow: a.noop,
            onBeforeHide: a.noop,
            onHide: a.noop,
            onIdle: a.noop,
            onDestroy: a.noop
        }
    }(jQuery),
    function(a) {
        a.fn.simpleCheckbox = function(b) {
            var c = {
                    newElementClass: "switch-toggle",
                    activeElementClass: "switch-on"
                },
                b = a.extend(c, b);
            this.each(function() {
                var c = a(this),
                    d = a("<div/>", {
                        id: "#" + c.attr("id"),
                        "class": b.newElementClass,
                        style: "display: block;"
                    }).insertAfter(this);
                if (c.is(":checked") && d.addClass(b.activeElementClass), c.hide(), a("[for=" + c.attr("id") + "]").length) {
                    var e = a("[for=" + c.attr("id") + "]");
                    e.click(function() {
                        return d.trigger("click"), !1
                    })
                }
                d.click(function() {
                    var c = a(this);
                    if (!c.hasClass("disabled")) return c.hasClass(b.activeElementClass) ? (c.removeClass(b.activeElementClass), a(c.attr("id")).attr("checked", !1)) : (c.addClass(b.activeElementClass), a(c.attr("id")).attr("checked", !0)), !1
                })
            })
        }
    }(jQuery),
    function(a) {
        jQuery.fn.extend({
            slimScroll: function(b) {
                var c = {
                        width: "auto",
                        height: "250px",
                        size: "7px",
                        color: "#000",
                        position: "right",
                        distance: "1px",
                        start: "top",
                        opacity: .4,
                        alwaysVisible: !1,
                        disableFadeOut: !1,
                        railVisible: !1,
                        railColor: "#333",
                        railOpacity: .2,
                        railDraggable: !0,
                        railClass: "slimScrollRail",
                        barClass: "slimScrollBar",
                        wrapperClass: "slimScrollDiv",
                        allowPageScroll: !1,
                        wheelStep: 20,
                        touchScrollStep: 200,
                        borderRadius: "7px",
                        railBorderRadius: "7px"
                    },
                    d = a.extend(c, b);
                return this.each(function() {
                    function c(b) {
                        if (j) {
                            var b = b || window.event,
                                c = 0;
                            b.wheelDelta && (c = -b.wheelDelta / 120), b.detail && (c = b.detail / 3);
                            var f = b.target || b.srcTarget || b.srcElement;
                            a(f).closest("." + d.wrapperClass).is(v.parent()) && e(c, !0), b.preventDefault && !u && b.preventDefault(), u || (b.returnValue = !1)
                        }
                    }

                    function e(a, b, c) {
                        u = !1;
                        var e = a,
                            f = v.outerHeight() - A.outerHeight();
                        if (b && (e = parseInt(A.css("top")) + a * parseInt(d.wheelStep) / 100 * A.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), A.css({
                                top: e + "px"
                            })), p = parseInt(A.css("top")) / (v.outerHeight() - A.outerHeight()), e = p * (v[0].scrollHeight - v.outerHeight()), c) {
                            e = a;
                            var g = e / v[0].scrollHeight * v.outerHeight();
                            g = Math.min(Math.max(g, 0), f), A.css({
                                top: g + "px"
                            })
                        }
                        v.scrollTop(e), v.trigger("slimscrolling", ~~e), h(), i()
                    }

                    function f() {
                        window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1), this.addEventListener("MozMousePixelScroll", c, !1)) : document.attachEvent("onmousewheel", c)
                    }

                    function g() {
                        o = Math.max(v.outerHeight() / v[0].scrollHeight * v.outerHeight(), s), A.css({
                            height: o + "px"
                        });
                        var a = o == v.outerHeight() ? "none" : "block";
                        A.css({
                            display: a
                        })
                    }

                    function h() {
                        if (g(), clearTimeout(m), p == ~~p) {
                            if (u = d.allowPageScroll, q != p) {
                                var a = 0 == ~~p ? "top" : "bottom";
                                v.trigger("slimscroll", a)
                            }
                        } else u = !1;
                        return q = p, o >= v.outerHeight() ? void(u = !0) : (A.stop(!0, !0).fadeIn("fast"), void(d.railVisible && z.stop(!0, !0).fadeIn("fast")))
                    }

                    function i() {
                        d.alwaysVisible || (m = setTimeout(function() {
                            d.disableFadeOut && j || k || l || (A.fadeOut("slow"), z.fadeOut("slow"))
                        }, 1e3))
                    }
                    var j, k, l, m, n, o, p, q, r = "<div></div>",
                        s = 30,
                        u = !1,
                        v = a(this);
                    if (v.parent().hasClass(d.wrapperClass)) {
                        var w = v.scrollTop();
                        if (A = v.parent().find("." + d.barClass), z = v.parent().find("." + d.railClass), g(), a.isPlainObject(b)) {
                            if ("height" in b && "auto" == b.height) {
                                v.parent().css("height", "auto"), v.css("height", "auto");
                                var x = v.parent().parent().height();
                                v.parent().css("height", x), v.css("height", x)
                            }
                            if ("scrollTo" in b) w = parseInt(d.scrollTo);
                            else if ("scrollBy" in b) w += parseInt(d.scrollBy);
                            else if ("destroy" in b) return A.remove(), z.remove(), void v.unwrap();
                            e(w, !1, !0)
                        }
                    } else {
                        d.height = "auto" == d.height ? v.parent().height() : d.height;
                        var y = a(r).addClass(d.wrapperClass).css({
                            position: "relative",
                            overflow: "hidden",
                            width: d.width,
                            height: d.height
                        });
                        v.css({
                            overflow: "hidden",
                            width: d.width,
                            height: d.height
                        });
                        var z = a(r).addClass(d.railClass).css({
                                width: d.size,
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                display: d.alwaysVisible && d.railVisible ? "block" : "none",
                                "border-radius": d.railBorderRadius,
                                background: d.railColor,
                                opacity: d.railOpacity,
                                zIndex: 90
                            }),
                            A = a(r).addClass(d.barClass).css({
                                background: d.color,
                                width: d.size,
                                position: "absolute",
                                top: 0,
                                opacity: d.opacity,
                                display: d.alwaysVisible ? "block" : "none",
                                "border-radius": d.borderRadius,
                                BorderRadius: d.borderRadius,
                                MozBorderRadius: d.borderRadius,
                                WebkitBorderRadius: d.borderRadius,
                                zIndex: 99
                            }),
                            B = "right" == d.position ? {
                                right: d.distance
                            } : {
                                left: d.distance
                            };
                        z.css(B), A.css(B), v.wrap(y), v.parent().append(A), v.parent().append(z), d.railDraggable && A.bind("mousedown", function(b) {
                            var c = a(document);
                            return l = !0, t = parseFloat(A.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                                currTop = t + a.pageY - pageY, A.css("top", currTop), e(0, A.position().top, !1)
                            }), c.bind("mouseup.slimscroll", function(a) {
                                l = !1, i(), c.unbind(".slimscroll")
                            }), !1
                        }).bind("selectstart.slimscroll", function(a) {
                            return a.stopPropagation(), a.preventDefault(), !1
                        }), z.hover(function() {
                            h()
                        }, function() {
                            i()
                        }), A.hover(function() {
                            k = !0
                        }, function() {
                            k = !1
                        }), v.hover(function() {
                            j = !0, h(), i()
                        }, function() {
                            j = !1, i()
                        }), v.bind("touchstart", function(a, b) {
                            a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                        }), v.bind("touchmove", function(a) {
                            if (u || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                                var b = (n - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
                                e(b, !0), n = a.originalEvent.touches[0].pageY
                            }
                        }), g(), "bottom" === d.start ? (A.css({
                            top: v.outerHeight() - A.outerHeight()
                        }), e(0, !0)) : "top" !== d.start && (e(a(d.start).position().top, null, !0), d.alwaysVisible || A.hide()), f()
                    }
                }), this
            }
        }), jQuery.fn.extend({
            slimscroll: jQuery.fn.slimScroll
        })
    }(jQuery), $(document).ready(function() {
        $(".switch-button").click(function(a) {
            a.preventDefault();
            var b = $(this).attr("switch-parent"),
                c = $(this).attr("switch-target");
            $(b).slideToggle(), $(c).slideToggle()
        }), $(".hidden-button").hover(function() {
            $(".btn-hide", this).fadeIn("fast")
        }, function() {
            $(".btn-hide", this).fadeOut("normal")
        }), $(".toggle-button").click(function(a) {
            a.preventDefault(), $(".glyph-icon", this).toggleClass("icon-rotate-180"), $(this).parents(".content-box:first").find(".content-box-wrapper").slideToggle()
        }), $(".remove-button").click(function(a) {
            a.preventDefault();
            var b = $(this).attr("data-animation"),
                c = $(this).parents(".content-box:first");
            $(c).addClass("animated"), $(c).addClass(b);
            window.setTimeout(function() {
                $(c).slideUp()
            }, 500), window.setTimeout(function() {
                $(c).removeClass(b).fadeIn()
            }, 2500)
        }), $(function() {
            "use strict";
            $(".infobox-close").click(function(a) {
                a.preventDefault(), $(this).parent().fadeOut()
            })
        })
    }), $(document).ready(function() {
        $(".overlay-button").click(function() {
            var a = $(this).attr("data-theme"),
                b = $(this).attr("data-opacity"),
                c = $(this).attr("data-style"),
                d = '<div id="loader-overlay" class="ui-front loader ui-widget-overlay ' + a + " opacity-" + b + '"><img src="../../assets/images/spinner/loader-' + c + '.gif" alt="" /></div>';
            $("#loader-overlay").length && $("#loader-overlay").remove(), $("body").append(d), $("#loader-overlay").fadeIn("fast"), setTimeout(function() {
                $("#loader-overlay").fadeOut("fast")
            }, 3e3)
        }), $(".refresh-button").click(function(a) {
            $(".glyph-icon", this).addClass("icon-spin"), a.preventDefault();
            var b = $(this).parents(".content-box"),
                c = $(this).attr("data-theme"),
                d = $(this).attr("data-opacity"),
                e = $(this).attr("data-style"),
                f = '<div id="refresh-overlay" class="ui-front loader ui-widget-overlay ' + c + " opacity-" + d + '"><img src="../../assets/images/spinner/loader-' + e + '.gif" alt="" /></div>';
            $("#refresh-overlay").length && $("#refresh-overlay").remove(), $(b).append(f), $("#refresh-overlay").fadeIn("fast"), setTimeout(function() {
                $("#refresh-overlay").fadeOut("fast"), $(".glyph-icon", this).removeClass("icon-spin")
            }, 1500)
        })
    }), $(function() {
        "use strict";
        $('a[href="#"]').click(function(a) {
            a.preventDefault()
        })
    }), $(function() {
        "use strict";
        $(".todo-box li input").on("click", function() {
            $(this).parent().toggleClass("todo-done")
        })
    }), $(function() {
        "use strict";
        var a = 0;
        $(".timeline-scroll .tl-row").each(function(b, c) {
            var d = $(c);
            a += d.outerWidth() + parseInt(d.css("margin-left"), 10) + parseInt(d.css("margin-right"), 10)
        }), $(".timeline-horizontal", this).width(a)
    }), $(function() {
        "use strict";
        $(".input-switch-alt").simpleCheckbox()
    }), $(function() {
        "use strict";
        $(".scrollable-slim").slimScroll({
            color: "#8da0aa",
            size: "10px",
            alwaysVisible: !0
        })
    }), $(function() {
        "use strict";
        $(".scrollable-slim-sidebar").slimScroll({
            color: "#8da0aa",
            size: "10px",
            height: "100%",
            alwaysVisible: !0
        })
    }), $(function() {
        "use strict";
        $(".scrollable-slim-box").slimScroll({
            color: "#8da0aa",
            size: "6px",
            alwaysVisible: !1
        })
    }), $(function() {
        "use strict";
        $(".loading-button").click(function() {
            var a = $(this);
            a.button("loading")
        })
    }), $(function() {
        "use strict";
        $(".tooltip-button").tooltip({
            container: "body"
        })
    }), $(function() {
        "use strict";
        $(".alert-close-btn").click(function() {
            $(this).parent().addClass("animated fadeOutDown")
        })
    }), $(function() {
        "use strict";
        $(".popover-button").popover({
            container: "body",
            html: !0,
            animation: !0,
            content: function() {
                var a = $(this).attr("data-id");
                return $(a).html()
            }
        }).click(function(a) {
            a.preventDefault()
        })
    }), $(function() {
        "use strict";
        $(".popover-button-default").popover({
            container: "body",
            html: !0,
            animation: !0
        }).click(function(a) {
            a.preventDefault()
        })
    });
var mUIColors = {
        "default": "#3498db",
        gray: "#d6dde2",
        primary: "#00bca4",
        success: "#2ecc71",
        warning: "#e67e22",
        danger: "#e74c3c",
        info: "#3498db"
    },
    getUIColor = function(a) {
        return mUIColors[a] ? mUIColors[a] : mUIColors["default"]
    };
document.getElementById("fullscreen-btn") && document.getElementById("fullscreen-btn").addEventListener("click", function() {
    screenfull.enabled && screenfull.request();
}), $(document).ready(function() {
    body_sizer(), $("div[id='#fixed-sidebar']").on("click", function() {
        if ($(this).hasClass("switch-on")) {
            var a = $(window).height(),
                b = $("#page-header").height(),
                c = a - b;
            $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $(".scroll-sidebar").slimscroll({
                height: "100%",
                color: "rgba(155, 164, 169, 0.68)",
                size: "6px"
            });
            var d = $("#page-header").attr("class");
            $("#header-logo").addClass(d)
        } else {
            var a = $(document).height(),
                b = $("#page-header").height(),
                c = a - b;
            $("#page-sidebar").css("height", c), $(".scroll-sidebar").css("height", c), $(".scroll-sidebar").slimScroll({
                destroy: !0
            }), $("#header-logo").removeClass("bg-gradient-9")
        }
    })
}), $(window).on("resize", function() {
    body_sizer()
}), $(document).ready(function() {
    pageTransitions(), $(function() {
        $("#sidebar-menu").superclick({
            animation: {
                height: "show"
            },
            animationOut: {
                height: "hide"
            }
        })
    })
}), $(document).on("ready", function() {
    $("#theme-switcher-wrapper .switch-toggle").on("click", this, function() {
        var a = $(this).prev().attr("data-toggletarget");
        $("body").toggleClass(a), (a = "closed-sidebar") && $("#close-sidebar .glyph-icon").toggleClass("icon-angle-right").toggleClass("icon-angle-left")
    }), $('.switch-toggle[id="#boxed-layout"]').click(function() {
        $("#boxed-layout").attr("checked") ? $(".boxed-bg-wrapper").slideDown() : $(".boxed-bg-wrapper").slideUp()
    })
}), $(function() {
    $(".theme-switcher").click(function() {
        $("#theme-options").toggleClass("active")
    })
}), $(function() {
    $(".set-adminheader-style").click(function() {
        $(".set-adminheader-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("#page-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("#page-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $("#page-header").addClass(a)
    })
}), $(function() {
    $(".set-sidebar-style").click(function() {
        $(".set-sidebar-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("#page-sidebar").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("#page-sidebar").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $("#page-sidebar").addClass(a)
    })
}), $(function() {
    $(".set-background-style").click(function() {
        $(".set-background-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)pattern-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)full-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $("body").removeClass(function(a, b) {
            return (b.match(/(^|\s)fixed-\S+/g) || []).join(" ")
        }), $("body").addClass(a)
    })
}), $(function() {
    $(".set-header-style").click(function() {
        $(".set-header-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".main-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".main-header").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".main-header").addClass(a)
    })
}), $(function() {
    $(".set-footer-style").click(function() {
        $(".set-footer-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".main-footer").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".main-footer").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".main-footer").addClass(a)
    })
}), $(function() {
    $(".set-topmenu-style").click(function() {
        $(".set-topmenu-style").removeClass("active"), $(this).addClass("active");
        var a = $(this).attr("data-header-bg");
        $(".top-bar").removeClass(function(a, b) {
            return (b.match(/(^|\s)bg-\S+/g) || []).join(" ")
        }), $(".top-bar").removeClass(function(a, b) {
            return (b.match(/(^|\s)font-\S+/g) || []).join(" ")
        }), $(".top-bar").addClass(a)
    })
}), $(function() {
    $(".scroll-switcher").slimscroll({
        height: "100%",
        color: "rgba(0,0,0,0.3)",
        size: "10px",
        alwaysVisible: !0
    })
}), $(document).on("ready", function() {
    swither_resizer()
}), $(window).on("resize", function() {
    swither_resizer()
}), Namespace = new Object, Namespace.register = function(fullNS) {
    for (var nsArray = fullNS.split("."), sEval = "", sNS = "", i = 0; i < nsArray.length; i++) 0 != i && (sNS += "."), sNS += nsArray[i], sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();";
    "" != sEval && eval(sEval)
};
var Erp1000 = {
        base: "",
        locale: "zh_CN"
    },
    ErpSetting = {
        priceScale: "2",
        priceRoundType: "roundHalfUp",
        currencySign: "￥",
        currencyUnit: "元",
        uploadImageExtension: "jpg,jpeg,bmp,gif,png",
        uploadFlashExtension: "swf,flv",
        uploadMediaExtension: "swf,flv,mp3,wav,avi,rm,rmvb",
        uploadFileExtension: "zip,rar,7z,doc,docx,xls,xlsx,ppt,pptx"
    },
    defaultImage = {
        AVATAR_EMPLOYEE_MALE: "defaults/default_employee_male.png",
        AVATAR_EMPLOYEE_FEMALE: "defaults/default_employee_female.png",
        GOODS: "defaults/default_goods.png",
        CUSTOM: "defaults/default_custom.png",
        PROVIDER: "defaults/default_provider.png",
        LOGO_LOGISTICS_COMPANY: "defaults/default_logistics.png",
        LOGO_COMPANY: "defaults/default_com_logo.png",
        REPOSITORY: "defaults/default_repository.png"
    };
! function(a) {
    a.startupCheckbox = function(a) {}, a.startSpin = function(b) {
        var c = new Spinner,
            d = b;
        d ? d.css("position", "relative") : d = a("body");
        var e = a("[role=spinner_container]", d);
        if (0 == e.length) {
            var f = "<div role='spinner_container'></div>";
            d.append(f)
        }
        return e = a("[role=spinner_container]", d).get(0), c.spin(e), c
    }, a.dataTableLanguage = {
        processing: "",
        lengthMenu: "每页显示 _MENU_ 条",
        zeroRecords: "没有数据！",
        emptyTable: "没有数据！",
        info: "",
        infoEmpty: "",
        infoFiltered: "数据表中共为 _MAX_ 条记录",
        paginate: {
            first: "首页",
            previous: "<",
            next: ">",
            last: "末页",
            redirect: "跳转至"
        }
    }, a.dataTableSetting = function(b) {
        var c = b.enableCheckbox,
            d = b.checkboxColIndex;
        (void 0 == c || "" === c) && (c = !0), d || (d = 0);
        var e = function(b, e) {
                if (c && 1 == c) {
                    var f = d,
                        g = b.closest(".dataTables_scrollBody").length,
                        h = null;
                    h = 0 == g ? b.find("thead") : b.closest(".dataTables_scrollBody").prev().find("thead"), h.find("th:eq(" + f + ') input[type="checkbox"]').uniform(), b.find("tbody tr:not([blank_row])").each(function(b, c) {
                        a(c).find("td:eq(" + f + ') input[type="checkbox"]').uniform()
                    }), b.find(".checker span").each(function(b, c) {
                        a(c).append('<i class="glyph-icon icon-check"></i>')
                    }), h.find(".checker span").each(function(b, c) {
                        a(c).append('<i class="glyph-icon icon-check"></i>')
                    }), h.find("th:eq(" + f + ') input[type="checkbox"]').prop("checked", !1), a.uniform.update(h.find("th:eq(" + f + ') input[type="checkbox"]')), h.off("click", "th:eq(" + f + ') input[type="checkbox"]'), h.on("click", "th:eq(" + f + ') input[type="checkbox"]', function() {
                        a.uniform.update(h.find("th:eq(" + f + ') input[type="checkbox"]:enabled'));
                        var c = this.checked;
                        b.find("tbody tr:not([blank_row])").each(function(b, d) {
                            a(d).find("td:eq(" + f + ') input[type="checkbox"]:enabled').prop("checked", c), a.uniform.update(a(d).find("td:eq(" + f + ') input[type="checkbox"]'))
                        })
                    }), b.on("click", 'tbody tr:not([blank_row]) td div.checker input[type="checkbox"]:enabled', function() {
                        var c = 0,
                            d = 0;
                        b.find("tbody tr:not([blank_row])").each(function(b, e) {
                            var g = a(e).find("td:eq(" + f + ") div.checker");
                            if (g) {
                                c++;
                                var h = a(g).find("span.checked");
                                h && h.html() && d++
                            }
                        }), h.find("th:eq(" + f + ') input[type="checkbox"]').prop("checked", c == d && c > 0 && this.checked ? !0 : !1), a.uniform.update(h.find("th:eq(" + f + ') input[type="checkbox"]'))
                    })
                }
            },
            f = function(b, e) {
                var f = b.closest(".dataTables_scrollBody").length,
                    g = null,
                    h = null;
                if (0 == f ? (g = b.find("thead"), h = b.find("tbody")) : (g = b.closest(".dataTables_scrollBody").prev().find("thead"), h = b.closest(".dataTables_scrollBody").prev().find("tbody")), c && 1 == c) {
                    var i = d;
                    0 == e.oFeatures.bAutoWidth ? (g.find("th:eq(" + i + ")").css({
                        width: "1%"
                    }), h.find("td:eq(" + i + ")").css({
                        width: "1%"
                    })) : (g.find("th:eq(" + i + ")").css({
                        width: "20px"
                    }), h.find("td:eq(" + i + ")").css({
                        width: "20px"
                    })), g.find("th:eq(" + i + ")").css({
                        overflow: "hidden",
                        padding: "0px 10px ",
                        "text-align": "center",
                        "vertical-align": "middle"
                    }), h.find("td:eq(" + i + ")").css({
                        overflow: "hidden",
                        padding: "0px 10px ",
                        "text-align": "center"
                    }), b.find("tbody tr:not([blank_row])").each(function(b, c) {
                        a(this).find("td:eq(" + i + ")").css({
                            padding: "0px 10px",
                            "text-align": "center",
                            width: "20px"
                        })
                    }), b.find("thead tr").each(function(b, c) {
                        a(this).find("th:eq(" + i + ")").css({
                            padding: "0px 10px",
                            "text-align": "center",
                            width: "20px",
                            "vertical-align": "middle"
                        })
                    }), b.DataTable().columns.adjust()
                }
            },
            g = b.fnDrawCallback,
            h = b.fnInitComplete,
            i = function(b, c, d) {
                var e = a(this),
                    f = null,
                    g = e.DataTable().ajax.url();
                g && a.ajax({
                    type: "POST",
                    url: g,
                    dataType: "json",
                    data: a.param(c, !0),
                    beforeSend: function() {
                        var b = e.closest("div.dataTables_wrapper");
                        f = a.startSpin(b), e.attr("load-status", "loading")
                    },
                    success: function(a) {
                        d(a), f && f.spin(), e.attr("load-status", "finish")
                    },
                    complete: function() {
                        f && f.spin(), e.attr("load-status", "finish")
                    },
                    error: function() {
                        f && f.spin(), e.attr("load-status", "finish")
                    }
                })
            },
            j = {
                language: a.dataTableLanguage,
                bDeferRender: !0,
                processing: !1,
                filter: !1,
                lengthChange: !0,
                bStateSave: !1,
                bDestroy: !0,
                order: [
                    [0, "desc"]
                ],
                dom: "<'top'>rt<'bottom'pil><'clear'>",
                fnServerData: i,
                fnDrawCallback: function(b) {
                    e(a(this), b), g && g.call(b);
                    var c = a(this);
                    f(c, b);
                    var d = c.parent().height(),
                        h = c.height(),
                        i = d - h,
                        j = c.find(" tbody tr:last").height(),
                        k = Math.floor(i / j),
                        l = c.find(" tbody tr:last");
                    l.find("td:eq(0)").hasClass("dataTables_empty") && (l.removeClass("odd").removeClass("even").addClass("blank_row"), l.attr("blank_row", "blank_row")), isNumber(k) || (k = 0);
                    for (var m = 0; k > m; m++) {
                        var n = c.find(" tbody tr:last").clone();
                        n.removeClass("odd").removeClass("even").addClass("blank_row"), n.attr("blank_row", "blank_row"), n.find("td").html(""), c.find(" tbody tr:last").after(n)
                    }
                    var o = c.find("tbody tr:not('.blank_row') td");
                    o.each(function(b, c) {
                        var d = a(this).text();
                        d.startWith("<") || d.endWith(">") || a(this).attr("title", d), a(this).hasClass("erp_format_thousands") && (isNaN(d) || a(this).text(format_thousands(d))), a(this).hasClass("erp_format_number") && (isNaN(d) || a(this).text(format_number(d)))
                    })
                },
                fnInitComplete: function(b, c) {
                    h && h.call(b, c);
                    var d = a(this);
                    f(d, b)
                }
            };
        if (b)
            for (var k in b) k + "" != "fnDrawCallback" && k + "" != "fnInitComplete" && (j[k] = b[k]);
        return j
    }, a.getContextPath = function() {
        return a("meta[name=contextPath]").attr("content")
    }, a.getRootRouter = function() {
        var a = document.location.href,
            b = a.indexOf("#");
        if (0 > b) return a + "#";
        var c = a.substr(0, b + 1);
        return c
    }, a.switchtRouter = function(b) {
        var c = a.getRootRouter();
        window.location.href = c + b
    }, a.getUrlParam = function(b) {
        var c = window.location.href;
        return a.extractParam(c, b)
    }, a.extractParam = function(a, b) {
        var c = a.indexOf("?");
        if (0 >= c) return null;
        var d = a.substr(c + 1).split("&");
        if (null == d || 0 == d.length) return null;
        d = [].concat(d);
        for (var e = [], f = 0; f < d.length; f++) {
            var g = d[f].split("=");
            g[0] == b && (2 != g.length ? e.push(null) : e.push(g[1]))
        }
        if (null == e || 0 == e.length) return null;
        if (1 == e.length) return decodeURI(e[0]);
        for (var f = 0; f < e.length; f++) e[f] = decodeURI(e[f]);
        return e
    }, a.fn.form2json = function() {
        var b = {},
            c = this.serializeArray();
        return a.each(c, function() {
            b[this.name] ? (b[this.name].push || (b[this.name] = [b[this.name]]), b[this.name].push(this.value || "")) : b[this.name] = this.value || ""
        }), b
    }, a.fn.getSelectedList = function() {
        var b = [];
        return a(this).find("tbody tr:not([blank_row]) div.checker span.checked :checkbox").each(function(c, d) {
            b.push(a(d).val())
        }), b
    }, a.fn.getUnSelectedList = function() {
        var b = [];
        return a(this).find("tbody tr:not([blank_row]) div.checker span").not(".checked").each(function(c, d) {
            b.push(a(d).find(":checkbox").val())
        }), b
    }, a.alert2 = function(b, c) {
        "string" == typeof b && b.constructor == String && (b = {
            type: "",
            content: b
        });
        var d = "bg-green";
        "error" == b.type ? d = "bg-danger" : "warn" == b.type && (d = "bg-warning"), a.jGrowl(b.content, {
            pool: 1,
            sticky: !1,
            header: "提示",
            position: "center",
            close: c
        })
    }, a.confirm2 = function(b, c, d, e) {
        var f = a('<div id="globalConfirmMessage"><div class="msgbody mrg10T mrg5L">' + c + '</div></div>"'),
            g = f.dialog({
                title: b,
                width: 350,
                modal: !0,
                close: function() {
                    a(this).remove()
                },
                open: function(a, b) {},
                buttons: [{
                    text: "确定",
                    click: function() {
                        a(this).dialog("close"), d && d()
                    }
                }, {
                    text: "取消",
                    click: function() {
                        a(this).dialog("close"), e && e()
                    },
                    "class": "mrg10L",
                    style: "background:#FFF;border-color:#CCC;color:#333"
                }]
            });
        return a(".ui-widget-overlay").addClass("bg-black opacity-30"), g
    }, a.confirm3 = function(b, c, d, e) {
        var f = a('<div id="globalConfirmMessage"><div class="msgbody mrg10T mrg5L">' + c + '</div></div>"');
        f.dialog({
            title: b,
            width: 300,
            modal: !0,
            close: function() {
                a(this).remove()
            },
            open: function(a, b) {},
            buttons: [{
                text: "确定",
                click: function() {
                    a(this).dialog("close"), d && d()
                }
            }]
        }), a(".ui-widget-overlay").addClass("bg-black opacity-30")
    }, a.formatSpecificationName = function(a) {
        if (!a) return "";
        for (var b = a.split(";"), c = [], d = 0; d < b.length; d++) {
            var e = b[d].split(":");
            4 == e.length && c.push(e[3])
        }
        return c.join(" ")
    }, a.formatCategoryName = function(a) {
        if (!a) return "";
        for (var b = a.split(","), c = [], d = 0; d < b.length; d++) {
            var e = b[d].split(":");
            2 == e.length && c.push(e[1])
        }
        return c.join("/")
    }, a.getShowViewer = function(b) {
        return a(b).closest("div.erp-view-item")
    }, a.go = function(b, c) {
        var d = c;
        return d ? (d.empty(), void a.get(a.getContextPath() + b, function(a) {
            d.html(a)
        })) : void a.alert2("请选择页面显示容器")
    }, a.open = function(b, c, d, e) {
        if (b) {
            if ("string" == typeof b && b.constructor == String) {
                if (!c) {
                    var f = a(".tab-item a[html-path^='" + b + "']");
                    c = f.text()
                }
                c || (c = a("#header-menu-list a[html-path^='" + b + "']").text());
                var g = a("div.erp-view-item[html-path^='" + b + "']").length;
                if (0 == g && !d && !e) return void ErpHome.createAppTab(b, null, c, !1);
                if (0 == g && 1 == e) return void ErpHome.createAppTab(b, null, c, !1);
                g > 0 && (ErpHome.showViewPage(b), d && d.call())
            } else {
                var h = b.closest("div[html-path]").attr("html-path"),
                    f = a(".tab-item a[html-path^='" + h + "']");
                c = f.text();
                var i = f.attr("menu-id"),
                    g = a("div.erp-view-item[html-path^='" + h + "']").length;
                if (0 == g && 1 == e) return void ErpHome.createAppTab(h, i, c, !1);
                g > 0 && (ErpHome.showViewPage(b), d && d.call())
            }
            "/production/admin-angular/pages/order/sales_create_order.hbs" != h && "/production/admin-angular/pages/order/purchase_create_order.hbs" != h && (a("#clickCusAdd").hide(), a("#clickCusName").hide(), a("#clickProName").hide(), a("#clickProAdd").hide())
        }
    }, a.close = function(b) {
        "fixed" == a(".menu-item a[html-path='" + b + "']").next().attr("fixed") ? a(".tab-item a[html-path='" + b + "']").next().trigger("click") : a(".tab-item a[html-path='" + b + "']").next().next().trigger("click")
    }, a.closeNoRefresh = function(b) {
        a(".tab-item a[html-path='" + b + "']").next().next().trigger("click")
    }, a.checkLogin = function() {
        var b = !1;
        return a.ajax({
            url: a.getContextPath() + "/login/check.jhtml",
            type: "GET",
            dataType: "json",
            cache: !1,
            async: !1,
            success: function(a) {
                b = a
            }
        }), b
    }, a.redirectLogin = function(b, c) {
        var d = a.getContextPath() + "/j_spring_cas_security_check";
        b && (d = b), c ? (a.alert2({
            type: "error",
            content: c
        }), setTimeout(function() {
            location.href = d
        }, 1e3)) : location.href = d
    };
    var b = null,
        c = !1;
    a.openLoginDialog = function() {
        null != b && b.remove(), 1 != c && (c = !0, a.get(a.getContextPath() + "/production/admin-angular/pages/system/login.hbs?_r=" + Math.random(), function(d) {
            var e = a("<div title='系统登录' html-path='" + a.getContextPath() + "/production/admin-angular/pages/system/login.hbs'>" + d + "</div>");
            e.find("form").attr("action", casLoginUrl + "?service=" + encodeURIComponent(casServiceUrl)), b = e.dialog({
                title: "系统登录",
                width: 500,
                height: 330,
                modal: !0,
                close: function() {
                    b = null, a(this).remove(), c = !1
                }
            }), a(".ui-widget-overlay").addClass("bg-black opacity-30")
        }))
    }, a.closeLoginDialog = function() {
        b && b.dialog("close")
    }, a.getLoginDialog = function() {
        return b
    }, a.getSession = function() {
        var b = {},
            c = {},
            d = {};
        return b.company = c, b.employee = d, c.name = a("#header-logo .logo-name span").text(), c.id = a("#login_employee_info").attr("companyid"), c.isValid = a("#login_employee_info").attr("isValid"), d.name = a("#login_employee_info").attr("employee-name"), d.id = a("#login_employee_info").attr("employee-id"), d.username = a("#login_employee_info").attr("username"), d.isEnableGuide = a("#login_employee_info").attr("isEnableGuide"), d.headUrl = a("#login_employee_info").attr("head-url"), b
    };
    var d = a("meta[name='_csrf']").attr("content"),
        e = a("meta[name='_csrf_header']").attr("content"),
        f = a("meta[name='_csrf_parameter']").attr("content");
    a.refreshCsrfToken = function(b) {
        d = b, a("meta[name='_csrf']").attr("content", b)
    }, a(document).ajaxSend(function(a, b, c) {
        b.setRequestHeader(e, d)
    });
    var g = !1,
        h = function() {
            if (1 != g) {
                g = !0;
                var b = "抱歉，您没有权限访问此页面.";
                a.jGrowl(b, {
                    pool: 1,
                    sticky: !1,
                    header: "提示",
                    position: "center",
                    close: function() {
                        g = !1
                    }
                })
            }
        };
    a(document).ajaxComplete(function(c, d, e) {
        var f = d.getResponseHeader("loginStatus"),
            g = d.getResponseHeader("accessDenied"),
            i = d.responseText;
        i || (i = ""), "accessDenied" == f ? b || a.openLoginDialog() : i.indexOf("CSRF") >= 0 && "accessDenied" == g ? b || a.openLoginDialog() : "accessDenied" == g && h()
    }), a.getScript = function(b, c, d) {
        d || (d = !0), a.ajax({
            type: "GET",
            url: b,
            async: !1,
            success: c,
            dataType: "script",
            ifModified: !0,
            cache: d
        })
    }, a.getUploadFileUrl = function() {
        return a.getContextPath() + "/os/file/uploadFile.do?" + f + "=" + d
    }, a.include = function(b) {
        for (var c = "string" == typeof b ? [b] : b, d = 0; d < c.length; d++) {
            var e = c[d].replace(/^\s|\s$/g, ""),
                f = e.split("."),
                g = f[f.length - 1].toLowerCase(),
                h = "css" == g,
                i = h ? "link" : "script",
                j = h ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ",
                k = (h ? "href" : "src") + "='" + e + "'";
            0 == a(i + "[" + k + "]").length && a("head").append("<" + i + j + k + "></" + i + ">")
        }
    }, a.erp || (a.erp = {}), a.erp.ajaxSubmit = function(b) {
        var c = {
            error: function(a, b, c) {},
            success: function(a, b) {},
            beforeSend: function(a) {}
        };
        b.error && (c.error = b.error), b.success && (c.success = b.success), b.beforeSend && (c.beforeSend = b.beforeSend);
        var d = null,
            e = a.extend(b, {
                error: function(e, f, g) {
                    c.error(e, f, g), b.viewer && a(":submit", b.viewer).prop("disabled", !1), d && d.spin()
                },
                success: function(e, f) {
                    c.success(e, f), b.viewer && a(":submit", b.viewer).prop("disabled", !1), d && d.spin()
                },
                beforeSend: function(e) {
                    c.beforeSend(e), b.viewer && a(":submit", b.viewer).prop("disabled", !0), d = a.startSpin(b.viewer)
                },
                complete: function(c, e) {
                    b.viewer && a(":submit", b.viewer).prop("disabled", !1), d && d.spin()
                }
            });
        a.ajax(e)
    }, a.erp.ajaxPost = function(b, c, d, e, f) {
        a.erp.ajaxSubmit({
            url: b,
            type: "POST",
            data: c,
            dataType: e,
            success: d,
            viewer: f
        })
    }, a.erp.supportPlaceholder = function(b) {
        b || (b = a("body")), i() || (a("[placeholder]:not(:password)", b).focus(function() {
            var b = a(this);
            b.val() == b.attr("placeholder") && (b.val(""), b.removeClass("placeholder"))
        }).blur(function() {
            var b = a(this);
            ("" == b.val() || b.val() == b.attr("placeholder")) && (b.addClass("placeholder"), b.val(b.attr("placeholder")))
        }).blur(), a(":password", b).each(function(b, c) {
            var d = a(c),
                e = d.attr("placeholder");
            d.after('<input type="text" value=' + e + ' class="placeholder" autocomplete="off" />');
            var f = d.next();
            f.show(), d.hide(), f.focus(function() {
                f.hide(), d.show(), d.focus()
            }), d.blur(function() {
                "" == d.val() && (f.show(), d.hide())
            })
        }))
    };
    var i = function() {
        return "placeholder" in document.createElement("input")
    };
    a.erp.ErpPageInfo = {}, a.erp.pageRegister = function(b, c) {
        if (b && ("string" != typeof b || b.constructor != String || (b = a("div.erp-view-item[html-path='" + b + "']"), 0 != b.length))) {
            b.hasClass("erp-view-item") || (b = b.closest("div.erp-view-item"));
            var d = b.attr("html-path"),
                e = a("#page-header .header-navlist-fls .tab-item a[html-path='" + d + "']").text(),
                f = a.erp.ErpPageInfo[d];
            return f ? f : (f = {}, f.name = e, f.$element = b, f.id = d, f.mngObj = c, a.erp.ErpPageInfo[d] = f, f)
        }
    }, a.erp.pageRemove = function(b) {
        if (b)
            if ("string" == typeof b && b.constructor == String) a.erp.ErpPageInfo[b] = void 0;
            else {
                b.hasClass("erp-view-item") || (b = b.closest("div.erp-view-item"));
                var c = b.attr("html-path");
                a.erp.ErpPageInfo[c] = void 0
            }
    }, a.erp.pageRefresh = function(b, c, d) {
        if (b) {
            var e = null;
            if ("string" == typeof b && b.constructor == String) {
                for (var f in a.erp.ErpPageInfo)
                    if (null != a.erp.ErpPageInfo[f] && null != a.erp.ErpPageInfo[f].id && a.erp.ErpPageInfo[f].id.startWith(b)) {
                        e = a.erp.ErpPageInfo[f];
                        break
                    }
            } else {
                b.hasClass("erp-view-item") || (b = b.closest("div.erp-view-item"));
                var g = b.attr("html-path");
                e = a.erp.ErpPageInfo[g]
            }
            e && (e.refresh = c, void 0 == d || null == d || 0 == d ? a(".header-nav-center .header-navlist .tab-item.nav-title-check").find("a[html-path='" + e.id + "']").trigger("click") : a(".header-nav-center .header-navlist .tab-item").find("a[html-path='" + e.id + "']").trigger("click"))
        }
    }, a.erp.ErpClickChain = [], a.erp.enClickQueue = function(b) {
        a.erp.touchClickQueue() != b && (10 == a.erp.ErpClickChain.length && a.erp.ErpClickChain.removeAt(0), a.erp.ErpClickChain.push(b))
    }, a.erp.deClickQueue = function() {
        return a.erp.ErpClickChain.pop()
    }, a.erp.touchClickQueue = function() {
        return a.erp.ErpClickChain[a.erp.ErpClickChain.length - 1]
    }, a.erp.getListScrollContentHeight = function(b) {
        var c = a("#page-content-body-wrapper").height(),
            d = 0;
        a(".page-header:visible", b).each(function(b, c) {
            d += a(c).outerHeight()
        });
        var e = 0;
        a(".page-buttons:visible", b).each(function(b, c) {
            e += a(c).outerHeight()
        });
        var f = c - d - e - 10 - 10 - 2 - 44 - 32 - 40;
        return 180 > f ? 180 : f
    }, a.erp.getContentViewHeight = function(b) {
        return a("#page-content-body-wrapper").height() - 40
    }, a.erp.setProcessMenu = function(a, b) {
        b.find(".progress-meun li:eq(" + a + ")").addClass("progress-user-blue").find("span").removeClass("progress-user-hui").addClass("progress-user")
    }, a.erp.setHitText = function(b, c) {
        var d = b + "  tbody";
        a(d).html("<div class='commodity-manage'><img src='../../assets-minified/images/info.png' class='notfind'/><span class='spl-rows'>" + c + "</span></div>")
    }, a.erp.emptyGoodsMessage = function(b, c) {
        var d = '没有找到商品，请到商品管理页<a html-path="/production/admin-angular/pages/goods/list.hbs"   href="javascript:void(0);" need-permission-auth="AUTH_BASE_INFORMATION_PRODUCT_MANAGE" tab-title="商品管理" title="商品管理" class="menu-item-link font-blue-erp">添加商品</a>';
        null != c && (d = c), a.erp.emptyGeneralMessage(b, d)
    }, a.erp.emptyGeneralMessage = function(a, b) {
        if (a) {
            var c = a.find("tbody td.dataTables_empty").html();
            if (null != c) {
                var d = a.parent().height(),
                    e = a.height(),
                    f = d - e,
                    g = a.find(" tbody tr:last").height(),
                    h = Math.floor(f / g),
                    i = a.find(" tbody tr:last");
                i.find("td:eq(0)").hasClass("dataTables_empty") && (i.removeClass("odd").removeClass("even").addClass("blank_row"), i.attr("blank_row", "blank_row")), isNumber(h) || (h = 0);
                for (var j = 0; h > j; j++) {
                    var k = a.find(" tbody tr:last").clone();
                    k.removeClass("odd").removeClass("even").addClass("blank_row"), k.attr("blank_row", "blank_row"), k.find("td").html(""), a.find(" tbody tr:last").after(k)
                }
                var l = a.find("tbody tr td").attr("colspan"),
                    m = "";
                m += "<td class='erp-emptyGeneralMessage' colspan=" + l + ">", m += "<img src='../../assets-minified/images/info.png' class='notfind'/><span class='spl-rows'>" + b + "</span>", m += "</td>";
                var n = a.find("tbody tr").size();
                n = Math.round(n / 2) - 1, a.find("tbody tr").eq(n).html(m), a.find("tbody tr").eq(0).remove()
            }
        }
    }, a.erp.setDefaultDate = function(b) {
        var c = a(".bootstrap-datepicker[name=endDate]", b).bsdatepicker({
            format: "yyyy-mm-dd",
            onRender: function(a) {
                var b = new Date,
                    c = new Date(b.getFullYear(), b.getMonth(), b.getDate(), 0, 0, 0, 0);
                return a.valueOf() < c.valueOf() ? "disabled" : ""
            }
        });
        c.bsdatepicker("setValue", function() {
            var a = new Date;
            return a.setDate(a.getDate() + 30), a.format("yyyy-MM-dd")
        }()), c.on("changeDate", function(a) {
            c.bsdatepicker("hide")
        })
    }, a.erp.initDate = function(b) {
        var c = a(".bootstrap-datepicker[name=startDate]", b).bsdatepicker({
            format: "yyyy-mm-dd",
            autoclose: !0,
            onRender: function(c) {
                var d = a(".bootstrap-datepicker[name=endDate]", b).val();
                if (!d) return "";
                var e = d.parseDate();
                return e && c.valueOf() > e.valueOf() ? "disabled" : ""
            }
        });
        c.bsdatepicker("setValue", a.erp.startDate()), c.on("changeDate", function(a) {
            if (d && d.date && a.date.valueOf() >= d.date.valueOf()) {
                var b = new Date(a.date);
                b.setDate(b.getDate() + 1), d.bsdatepicker("setValue", b)
            }
            d.bsdatepicker("fill"), c.bsdatepicker("hide")
        });
        var d = a(".bootstrap-datepicker[name=endDate]", b).bsdatepicker({
            format: "yyyy-mm-dd",
            autoclose: !0,
            onRender: function(c) {
                var d = a(".bootstrap-datepicker[name=startDate]", b).val();
                if (!d) return "";
                var e = d.parseDate();
                return e && c.valueOf() <= e.valueOf() ? "disabled" : ""
            }
        });
        d.bsdatepicker("setValue", a.erp.endDate()), d.on("changeDate", function(a) {
            if (c && c.date && a.date.valueOf() < c.date.valueOf()) {
                var b = new Date(a.date);
                b.setDate(b.getDate()), c.bsdatepicker("setValue", b)
            }
            c.bsdatepicker("fill"), d.bsdatepicker("hide")
        }), d.on("input", function() {
            c.bsdatepicker("fill")
        }), c.on("input", function() {
            d.bsdatepicker("fill")
        })
    }, a.erp.startDate = function() {
        var a = new Date;
        return a.setDate(a.getDate() - 30), a.format("yyyy-MM-dd")
    }, a.erp.endDate = function() {
        var a = new Date;
        return a.format("yyyy-MM-dd")
    }, a.erp.dateAdd = function(a) {
        if ("" != a) {
            var b = new Date(a.replace(/-/g, "/"));
            return b.setDate(b.getDate() + 1), b.format("yyyy-MM-dd")
        }
        return ""
    }, a.getImageDomain = function() {
        return a("meta[name=imageDomain]").attr("content")
    }, a.erp.IsNum = function(a) {
        var b = window.event ? a.keyCode : a.which;
        b >= 48 && 57 >= b || 8 == b || 0 == b || (window.event ? window.event.returnValue = !1 : a.preventDefault())
    }, a.erp.IsNaN = function(b) {
        isNaN(a(b).val()) && a(b).val(1)
    }, a.erp.IsDecimal = function(a) {
        var b = window.event ? a.keyCode : a.which;
        b >= 48 && 57 >= b || 8 == b || 0 == b || 46 == b || (window.event ? window.event.returnValue = !1 : a.preventDefault())
    }, a.erp.IsMoney = function(b) {
        var c = a(b).val();
        if (isNaN(c)) a(b).val(1);
        else {
            var d = "^[0-9]+[.][0-9]{0,2}$",
                e = new RegExp(d);
            e.test(c) || a(b).val(a.erp.toFixed(c, 2))
        }
    }, a.erp.toFixed = function(a, b) {
        var c = 1;
        if (isNaN(a)) return a;
        0 > a && (c = -1);
        var d = Math.pow(10, b);
        return Math.round(Math.abs(a) * d) / d * c
    }, a.erp.setCattaiWidth = function(b) {
        var c = 0;
        b.find(".purchase-opinion div:first").removeClass("mrg45L"), b.find(".sales-opinion div:first").removeClass("mrg45L"), b.find(".erp-cattai div:first").children("div").each(function() {
            c += a(this).width() + 45
        }), b.find(".erp-cattai div:first").siblings().each(function() {
            c += a(this).width() + 45
        });
        var d = c - 19,
            e = c - 220;
        b.find(".erp-cattai").css("width", d), b.find(".showline").css("width", e)
    }, a.erp.setCattaidWidth = function(b) {
        b.find(".purchase-opinion div:first").removeClass("mrg45L"), b.find(".sales-opinion div:first").removeClass("mrg45L");
        var c = 0;
        b.find(".erp-cattaid div:first").children("div").each(function() {
            c += a(this).width() + 45
        }), b.find(".erp-cattaid div:first").siblings().each(function() {
            c += a(this).width() + 45
        });
        var d = c - 19,
            e = c - 220;
        b.find(".erp-cattaid").css("width", d), b.find(".showline").css("width", e)
    }, a.createLocalImageURL = function(b) {
        if (b) {
            var c = a.getContextPath();
            return c.endWith("/") || (c += "/"), b.startWith("/") && (b = b.substring(1)), c + b
        }
    }, a.erp.getFileAccessUrl = function(b, c) {
        var d = a.getContextPath() + "/admin/fileStorage/getAccessUrl.do";
        a.getJSON(d, function(a) {
            c && c.call(this, a)
        })
    }, a.erp.priceLow = function(b, c) {
        a(b).parent().find("img").remove(), a(b).val() < c && a(b).before("<img src='../../assets-minified/images/low.png' width='18px' height='18px' style='vertical-align: bottom;' title='当前价格低于成本价'/>")
    }, a.erp.priceLowImg = "<img src='../../assets-minified/images/low.png' width='18px' height='18px' style='vertical-align: bottom;position:relative;top:8px' title='当前价格低于成本价'/>", a.erp.stockLow = function(b, c) {
        a(b).parent().find("img").remove(), c < a(b).val() && a(b).before("<img class='lack' src='../../assets-minified/images/lack.png' width='18px' height='18px' style='vertical-align: bottom;' title='当前库存数量少于销售数量'/>")
    }, a.erp.approvalResult = function(a, b, c, d, e) {
        var f = "",
            g = "",
            h = "",
            i = "";
        switch (b) {
            case "BACK":
                i = "审批驳回", g = "font-red", h = "icon-minus-circle";
                break;
            case "CANCEL":
                i = "订单撤回", g = "font-red", h = "icon-minus-circle";
                break;
            case "PASS":
                i = "订单通过", g = "font-green", h = "icon-check-circle"
        }
        return ("BACK" == b || "CANCEL" == b || "PASS" == b) && (f = "<div class='plan-hint  pad10A font-size-14 text-left font-black hide'><div style='white-space: nowrap;overflow: hidden;'>审核:<span class='font-normal'><span class='font-green'>" + i + "</span>(" + e + ")</span></div><div style='white-space: nowrap;overflow: hidden;'>时间:<span class='font-normal'>" + c + "</span></div><div style='white-space: nowrap;overflow: hidden;'>意见:<span class='font-normal'>" + (null == d ? "" : d) + "</span></div></div>"), "<div class='float-left " + g + " mrg45L'><i class='glyph-icon " + h + " bg-white erp-cursor  font-size-26 button-popover'></i><br/>" + a + f + "</div>"
    }, a.erp.setWidth = function(b) {
        b.find(".table thead th").each(function(c) {
            var d = a(this).width();
            b.find(".justbottom div:eq(" + c + ")").width(d)
        })
    }, a.erp.registerSearch = function() {
        document.onkeydown = function(b) {
            var c = document.all ? window.event : b;
            if (13 == c.keyCode) {
                var d = a("#page-content-body .show div:eq(0)").attr("id");
                a("#" + d).find(".search").trigger("click")
            }
        }
    }, a.erp.downLoad = function() {
        var b = a("#page-content-body .show div:eq(0)").attr("id"),
            c = a("#" + b).find(".changeastyle").attr("xls");
        a(".changeastyle", a("#" + b)).attr("href", a.getContextPath() + "/admin/export/downLoadTemplate.do?fileurl=" + c)
    };
    var j = null,
        k = !1;
    a.openPrintDialog = function(b) {
        b && (null != j && j.remove(), 1 != k && (k = !0, a.get(a.getContextPath() + "/production/admin-angular/pages/system/print.hbs?_r=" + Math.random(), function(c) {
            var e = a("<div title='单据导出' html-path='" + a.getContextPath() + "/production/admin-angular/pages/system/login.hbs'>" + c + "</div>");
            a("form", e).attr("action", b.split("?")[0]), a("form", e).append("<input name='" + f + "' type='hidden' value='" + d + "' />");
            var g = a.erp.getUrlParms(b);
            for (var h in g)
                if (a.isArray(g[h]))
                    for (var i = 0; i < g[h].length; i++) a("form", e).append("<input name='" + h + "' type='hidden' value='" + g[h][i] + "' />");
                else a("form", e).append("<input name='" + h + "' type='hidden' value='" + g[h] + "' />");
            var l = g.billType,
                m = encodeURI(a.getContextPath() + "/admin/export/findPrintSet.do");
            a.ajax({
                type: "post",
                url: m,
                dataType: "json",
                data: {
                    billType: l
                },
                async: !1,
                success: function(b) {
                    a.each(b, function(b, c) {
                        a.each(a("form[printSize='" + c.printSize + "']", e), function(b, d) {
                            a.each(a("input[name]", a(d)), function(b, d) {
                                var e = a(d).attr("name"),
                                    f = c[e];
                                f && a(d).val(f)
                            }), a("input[name=printSetId]", a(d)).val(c.id), a(".print-template-btn", a(d)).show()
                        })
                    })
                }
            }), j = e.dialog({
                title: "单据打印",
                width: 500,
                height: 200,
                modal: !0,
                close: function() {
                    j = null, a(this).remove(), k = !1
                }
            }), a(".ui-widget-overlay").addClass("bg-black opacity-30")
        })))
    }, a.erp.getUrlParms = function(b) {
        var c = new Object;
        if (!b) return c;
        var d = b.split("?");
        d.length > 1 && (b = d[1]);
        for (var e = b.split("&"), f = 0; f < e.length; f++) {
            var g = e[f].indexOf("=");
            if (-1 != g) {
                var h = e[f].substring(0, g),
                    i = e[f].substring(g + 1);
                c[h] ? a.isArray(c[h]) ? c[h].push(unescape(i)) : c[h] = [c[h], unescape(i)] : c[h] = unescape(i)
            }
        }
        return c
    };
    var l, m, n;
    a.erp.showProcess = function(b) {
        m = setTimeout(function() {
            var c = a(b).position().top + 25,
                d = a(b).position().left - 70;
            a(b).next().css("left", d), a(b).next().css("top", c), a(b).next().show()
        }, 500), a(b).next().on("mouseleave", function() {
            clearTimeout(m), a(this).hide()
        }), a(b).next().on("mouseenter", function() {
            clearTimeout(n)
        })
    }, a.erp.hideProcess = function(b) {
        clearTimeout(m), n = setTimeout(function() {
            a(b).next().hide()
        }, 500)
    }, a.erp.hideLogisticStatus = function() {
        clearTimeout(l);
        var b = a("#logisticsData");
        b.hide()
    }, a.erp.showLogisticStatus = function(b, c) {
        l = setTimeout(function() {
            var d = a("#logisticsData"),
                e = a(b).position().top + 92,
                f = a(b).position().left - 50;
            d.find(".erp-transport-hint").css("left", f), d.find(".erp-transport-hint").css("top", e), d.show(), a.getJSON(a.getContextPath() + "/admin/order/findLogisticsInformation.do?id=" + c, function(a) {
                if (d.find(".logisticsCompanyName").html(a.logisticsCompanyName), d.find(".logisticsNum").html(a.logisticsNum), a.Success) {
                    for (var b = "", c = a.Traces.length - 1; c >= 0; c--) {
                        var e = a.Traces[c],
                            f = '<li><span class="acceptStation">' + e.AcceptStation + '</span><p class="acceptTime">' + e.AcceptTime + "</p></li>";
                        b += f
                    }
                    d.find(".erp-transport-state").html("").append(b)
                } else d.find("ul.erp-transport-state").html("").append("<li>数据暂无更新请稍后查看</li>")
            })
        }, 500)
    }, a.erp.createLogisticStatus = function(a, b) {
        var c = "";
        return null == a.logisticsCompanyCode || null == a.logisticsNum || null == a.shippingMethodName ? c : c = "<a  onmouseout='$.erp.hideLogisticStatus()' onmouseover='$.erp.showLogisticStatus(this," + a.id + ")' class='menu-item-modal no-btn-confirm' cancel-text='关闭' href='javascript:void(0);' modal-id='show-logistics-information' modal-height='700' modal-title='物流详情' html-path='/production/admin-angular/pages/order/salesLogisticsInformation.hbs?id=" + a.id + "' ><i class='glyph-icon tooltip-button font-orange font-size-16 icon-truck mrg3R'></i><span class='sign-drop-down'>" + a.shippingMethodName + "</span></a>"
    }, a.erp.createOrderStatus = function(b, c, d, e) {
        var f = "",
            g = "";
        "sales" == b ? (f = "销售", g = "出库") : (f = "采购", g = "入库");
        for (var h = new Array, i = new Array, j = 0; j < d.erpOrderOpinions.length; j++) d.erpOrderOpinions[j].type == b && (h.push(d.erpOrderOpinions[j]), i.push(d.erpOrderOpinions[j].companyProcess));
        e = e.clone();
        var k = e.find(" li.processed"),
            l = e.find(" li.processing");
        e.find(".erp-order-status").html("");
        for (var j = 0; j < h.length; j++) {
            k = k.clone();
            var m = "";
            switch (h[j].approval) {
                case "BACK":
                    m = "审批驳回";
                    break;
                case "CANCEL":
                    m = "订单撤回";
                    break;
                case "PASS":
                    m = "订单通过"
            }
            "PASS" != h[j].approval ? (k.find("i").remove(), k.prepend('<i class="glyph-icon icon-minus-circle bg-white erp-cursor  font-size-20 erp-order-status-sign1 button-popover font-red"></i>'), k.find(".pro-title").css("color", "red"), k.find(".pro-approval").css("color", "red")) : (k.find("i").remove(), k.prepend("<i class='glyph-icon icon-check-circle bg-white erp-cursor font-green erp-order-status-sign1  font-size-20 button-popover'></i>"), k.find(".pro-title").css("color", "#2ecc71"), k.find(".pro-approval").css("color", "#2ecc71")), k.find(".pro-title").html(h[j].title), k.find(".pro-approval").html(m), k.find(".pro-operator-name").html(h[j].operatorName), k.find(".pro-operator-time").html(h[j].operatorTimeString), k.find(".pro-opinion").html(h[j].opinion), k.css("display", "block"), e.find(".erp-order-status").append(k)
        }
        for (var j = 0; 4 > j; j++) {
            l = l.clone(), 0 == j && (l.find(".pro-title").html(f + "开单"), l.attr("index", "commit")), 1 == j && (l.find(".pro-title").html(f + "总监审核"), l.attr("index", "director")), 2 == j && (l.find(".pro-title").html("财务确认"), l.attr("index", "finance")), 3 == j && (l.find(".pro-title").html("仓储" + g), l.attr("index", "repository")), l.css("display", "block");
            var n = !1; - 1 == a.inArray(l.attr("index"), i) && (n = !0), n && e.find(".erp-order-status").append(l)
        }
        var o = "";
        if ("saved" == c) o = "<span class='font-gray'>草稿</span>";
        else if ("disable" == c) o = "<span class='font-gray'>无法查看</span>";
        else if ("edit" == c) o = "<span class='font-blue'>编辑中</span>";
        else if ("waittingCheck" == c || "leaderWaittingCheck" == c || "confirmed" == c) {
            var p = "";
            if (0 == h.length) p = "待" + f + "审核";
            else {
                var q = h[h.length - 1].companyProcess;
                "commit" == q ? p = "待领导审批" : "director" == q ? p = "待财务审批" : "finance" == q && (p = "sales" == b ? "待出库" : "待入库")
            }
            o = "<span style='cursor:pointer'  class='font-blue sign-drop-down' onmouseout='$.erp.hideProcess(this)' onmouseover='$.erp.showProcess(this)'>" + p + "</span>" + e.html()
        } else "reject" == c ? o = "<span style='cursor:pointer' class='font-orange sign-drop-down' onmouseout='$.erp.hideProcess(this)' onmouseover='$.erp.showProcess(this)'>审核驳回</span>" + e.html() : "cancel" == c ? o = "<span style='cursor:pointer' class='font-orange sign-drop-down' onmouseout='$.erp.hideProcess(this)' onmouseover='$.erp.showProcess(this)'>订单撤回</span>" + e.html() : "complete" == c ? o = "<span style='cursor:pointer' class='font-green-alt sign-drop-down'  onmouseout='$.erp.hideProcess(this)'  onmouseover='$.erp.showProcess(this)'>订单完成</span>" + e.html() : "sync" == c && (o = "<span style='cursor:pointer' class='font-green-alt sign-drop-down' onmouseout='$.erp.hideProcess(this)'  onmouseover='$.erp.showProcess(this)'>订单完成(同步)</span>" + e.html());
        return o
    }, a.erp.formZero = function() {
        var a = 0;
        return a.toFixed(2)
    }, a.fn.serializeObject = function() {
        var b = {},
            c = this.serializeArray();
        return a.each(c, function() {
            b[this.name] ? (b[this.name].push || (b[this.name] = [b[this.name]]), b[this.name].push(this.value || "")) : b[this.name] = this.value || ""
        }), b
    }, a.fn.serializeTable = function() {
        var b = this,
            c = new Array;
        return b.find("tbody tr:not('.blank_row')").each(function() {
            var b = {},
                d = a(this).find("td");
            d.each(function() {
                var c = a.trim(a(this).attr("class")).split(" ")[0];
                if (null != c && "" != c) {
                    var d = a(this).html();
                    d.startWith("<input") ? b[c] = a(this).find("input").val() : b[c] = a(this).html()
                }
            }), c.push(b)
        }), c
    }, a.fn.serializeTableTr = function() {
        var b = this,
            c = b.find("td"),
            d = {};
        return c.each(function() {
            var b = a.trim(a(this).attr("class")).split(" ")[0];
            null != b && "" != b && (d[b] = a(this).html())
        }), d
    }, a.fn.exitGoods = function(b) {
        var c = !1;
        return a(this).find(" tbody tr").each(function() {
            var d = a(this).children("td.sn").html();
            return d == b ? c = !0 : void 0
        }), c
    }
}(jQuery), $.ajaxSetup({
    timeout: 6e4,
    cache: !1
}), $().ready(function() {
    var a = $("meta[name='_csrf_parameter']").attr("content"),
        b = $("meta[name='_csrf']").attr("content");
    $("form").submit(function() {
        var c = $(this);
        null != c.attr("method") && "post" == c.attr("method").toLowerCase() && 0 == c.find("input[name='" + a + "']").size() && null != b && c.append('<input type="hidden" name="' + a + '" value="' + b + '" />')
    })
}), Handlebars.registerHelper("currency", function(a) {
    return currency(a)
}), Handlebars.registerHelper("if_even", function(a, b) {
    return a % 2 == 0 ? b.fn(this) : b.inverse(this)
}), Handlebars.registerHelper("compare", function(a, b, c, d) {
    if (arguments.length < 3) throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    var e = {
        "==": function(a, b) {
            return a == b
        },
        "===": function(a, b) {
            return a === b
        },
        "!=": function(a, b) {
            return a != b
        },
        "!==": function(a, b) {
            return a !== b
        },
        "<": function(a, b) {
            return b > a
        },
        ">": function(a, b) {
            return a > b
        },
        "<=": function(a, b) {
            return b >= a
        },
        ">=": function(a, b) {
            return a >= b
        },
        "typeof": function(a, b) {
            return typeof a == b
        }
    };
    if (!e[b]) throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + b);
    var f = e[b](a, c);
    return f ? d.fn(this) : d.inverse(this)
}), Array.prototype.clear = function() {
    this.length = 0
}, Array.prototype.indexOf = function(a) {
    for (var b = 0, c = this.length; c > b; b++)
        if (this[b] === a) return b;
    return -1
}, Array.prototype.contains = function(a) {
    return -1 !== this.indexOf(a)
}, Array.prototype.insertAt = function(a, b) {
    0 > a && (a = 0), a > this.length && (a = this.length), this.length++;
    for (var c = this.length - 1; c > a; c--) this[c] = this[c - 1];
    this[a] = b
}, Array.prototype.last = function() {
    return this[this.length - 1]
}, Array.prototype.removeAt = function(a) {
    if (!(0 > a || a >= this.length))
        for (var b = (this[a], a), c = this.length - 2; c > b; b++) this[b] = this[b + 1]
}, Array.prototype.remove = function(a) {
    var b = this.indexOf(a);
    b >= 0 && this.removeAt(b)
}, String.prototype.replaceAll = function(a, b, c) {
    return RegExp.prototype.isPrototypeOf(a) ? this.replace(a, b) : this.replace(new RegExp(a, c ? "gi" : "g"), b)
}, String.prototype.endWith = function(a) {
    return null == a || "" == a || 0 == this.length || a.length > this.length ? !1 : this.substring(this.length - a.length) == a ? !0 : !1
}, String.prototype.startWith = function(a) {
    return null == a || "" == a || 0 == this.length || a.length > this.length ? !1 : this.substr(0, a.length) == a ? !0 : !1
}, String.prototype.encodeURI = function() {
    return encodeURI(this).replace(/\+/g, "%2B")
}, String.prototype.parseDate = function() {
    var a = this;
    if (!a) return null;
    var b = a.split(" "),
        c = b[0].split("-"),
        d = parseInt(c[0], 10),
        e = parseInt(c[1], 10) - 1,
        f = parseInt(c[2], 10),
        g = 0,
        h = 0,
        i = 0,
        j = 0;
    2 == b.length && (g = b[1].split("-"), h = parseInt(g[0], 10), i = parseInt(g[1], 10) - 1, j = parseInt(g[2], 10));
    var k = new Date(d, e, f, h, i, j);
    return k
};
var formatThousands = function() {
    var a = this + "";
    if (a += "", a = a.replace(/[ ]/g, ""), "" != a && !isNaN(a)) {
        a = parseFloat(a).toFixed(2);
        for (var b = a.indexOf("."), c = a.substring(0, b), d = a.substring(b + 1, a.length), e = /(-?\d+)(\d{3})/; e.test(c);) c = c.replace(e, "$1,$2");
        return a = c + "." + d
    }
};
String.prototype.formatThousands = formatThousands, Number.prototype.formatThousands = formatThousands, String.prototype.formatNumber = formatNumber, Number.prototype.formatNumber = formatNumber, String.prototype.thousandToFloat = function() {
    return -1 != this.indexOf(",") ? this.replace(/,/g, "") : this
}, Date.prototype.format = function(a) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var c in b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
}, Date.prototype.diffDays = function(a) {
    var b = this.getTime() - a.getTime();
    return Math.floor(b / 864e5)
};
var todayStart = function() {
        return (new Date).format("yyyy-MM-dd")
    },
    todayEnd = function() {
        var a = new Date;
        return new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1).format("yyyy-MM-dd")
    },
    yesterdayStart = function() {
        var a = new Date;
        return new Date(a.getFullYear(), a.getMonth(), a.getDate() - 1).format("yyyy-MM-dd")
    },
    yesterdayEnd = function() {
        var a = new Date;
        return new Date(a.getFullYear(), a.getMonth(), a.getDate()).format("yyyy-MM-dd")
    },
    addDate = function(a, b) {
        var c = new Date(a);
        c.setDate(c.getDate() + b);
        var d = c.getMonth() + 1,
            e = c.getDate();
        10 > d && (d = "0" + d), 10 > e && (e = "0" + e);
        var f = c.getFullYear() + "-" + d + "-" + e;
        return f
    };