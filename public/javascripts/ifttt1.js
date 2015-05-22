/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-canvas-history-input-shiv-cssclasses-prefixes-css_filters
 */
function toggleFavoriteRecipe(a, b, c) {
    b.toString() == "true" ? unmark_recipe_as_favorite(a, c) : mark_recipe_as_favorite(a, c)
}

function mark_recipe_as_favorite(a, b) {
    $.ajax({
        success: b,
        type: "post",
        dataType: "json",
        url: "/favorite_recipes",
        data: {
            recipe_id: a
        }
    })
}

function unmark_recipe_as_favorite(a, b) {
    $.ajax({
        success: b,
        type: "delete",
        url: "/favorite_recipes/" + a,
        data: {
            recipe_id: a
        }
    })
}

function start_missing_profile_channels_poll(a) {
    channel_id_s = a.toString(), $.simple_poll(function(a) {
        channel_ids = $.cookie("user_channel_ids").split(","), in_array = !1;
        for (var b = 0; b < channel_ids.length; b++) channel_ids[b] == channel_id_s && (in_array = !0);
        in_array ? (markChannelActivationAsFinished(channel_id_s), makeSubmitButtonClickable()) : a()
    })
}

function setProfileProviderIfChecked(a) {
    if ($("#set_as_profile_provider").is(":checked")) {
        var b = $("input[name='user[profile_provider_channel_id]']").val();
        $.ajax({
            type: "POST",
            url: "/settings/update_profile/",
            data: {
                _method: "PUT",
                user: {
                    profile_provider_channel_id: b
                }
            },
            dataType: "json",
            success: function() {
                a && a(!0)
            },
            error: function() {
                a && a(!1)
            }
        })
    } else console.log("not checked"), a && a(!0)
}

function refresh_account_meta() {
    if ($("#statement_meta_full").length == 0) return;
    current_channel_sort_id = $("#current_channel_sort_hidden").val(), $.ajax({
        success: function(a) {
            $("#statement_meta_full").html(a)
        },
        type: "get",
        dataType: "html",
        url: "/myrecipes/personal/statement_meta_full?channel_id=" + current_channel_sort_id
    })
}

function onChangeProfileProvider(a) {
    $(a).submit(), console.log("submitting")
}

function dynamicForm(a, b, c) {
    "use strict";
    var d;
    d = $("<form />", {
        action: a,
        method: b,
        style: "display: none;"
    }), typeof c != "undefined" && $.each(c, function(a, b) {
        $("<input />", {
            type: "hidden",
            name: a,
            value: b
        }).appendTo(d)
    }), d.appendTo("body").submit()
}

function redirect_on_no_statements() {
    $(".personal-recipe-manage").length == 0 && (window.location.href = "/myrecipes/personal")
}

function statement_is_gray(a) {
    $("#statement_" + a + " .recipe-personal > span").each(function() {
        $(this).css({
            "background-color": $(this).data("gray")
        })
    }), $statement_wrapper = $("#statement_" + a + " .recipe-personal"), $statement_wrapper.attr("style", $statement_wrapper.data("gray"));
    var b = $("#statement_" + a + " .recipe_trigger").data("gray");
    $("#statement_" + a + " .js-arrow_trigger").attr("fill", b);
    var c = $("#statement_" + a + " .recipe_action").data("gray");
    $("#statement_" + a + " .js-arrow_action").attr("fill", c)
}

function statement_is_colored(a) {
    $("#statement_" + a + " .recipe-personal > span").each(function() {
        $(this).css({
            "background-color": $(this).data("color")
        })
    }), $statement_wrapper = $("#statement_" + a + " .recipe-personal"), $statement_wrapper.attr("style", $statement_wrapper.data("color"));
    var b = $("#statement_" + a + " .recipe_trigger").data("color");
    $("#statement_" + a + " .js-arrow_trigger").attr("fill", b);
    var c = $("#statement_" + a + " .recipe_action").data("color");
    $("#statement_" + a + " .js-arrow_action").attr("fill", c)
}

function toggle_statement_enabled(a) {
    $("#statement_" + a + "_enabled").val() == "true" ? ($("#statement_" + a + " .recipe-personal").removeClass("is-inactive"), statement_is_colored(a)) : ($("#statement_" + a + " .recipe-personal").addClass("is-inactive"), statement_is_gray(a))
}

function set_keyboard_init_focus(a) {
    $(a + " .btn-back").focus(), $(a + " .focus-here").focus()
}

function show_and_scroll_to(a, b, c) {
    var d = $.browser.msie ? $(window).height() : window.innerHeight,
        e = $(a),
        f = 300,
        g = 600,
        h = navigator.userAgent.toLowerCase().search("wosbrowser") == -1;
    e.fadeIn(f, "swing", function() {
        var f = !1,
            i = e.offset().top,
            j = 4,
            k = d - e.height();
        k < 0 && (k = 0), $("#create_cover").height(k);
        var l = function() {
            if (f) return;
            f = !0, $(".step_parent").each(function() {
                var b = $(this);
                parent_id = "#" + b.attr("id");
                if (parent_id == a) return !1;
                b.find(".btn-restart").show(), b.find(".btn-back").hide()
            }), set_keyboard_init_focus(a), b && (c ? setTimeout(b, c) : b())
        };
        h ? $("html,body").animate({
            scrollTop: i + j
        }, g, "swing", l) : ($(window).scrollTop(i + j), l())
    })
}

function restart_and_scroll_to(a) {
    var b = $.browser.msie ? $(window).height() : window.innerHeight,
        c = $(a),
        d = c.position().top,
        e = 300,
        f = 600,
        g = 0,
        h = navigator.userAgent.toLowerCase().search("wosbrowser") == -1,
        i = 0;
    $(".step_parent").each(function() {
        i += $(this).height()
    }), $("#statement_create").css({
        "min-height": i
    }), (a == "#trigger_channel_select" || a == "#action_channel_select" || a == "#trigger_select" || a == "#action_select") && c.find(".chosen").removeClass("chosen"), a != "#action_channel_select" && ($(".btn-restart", "#action_channel_select").hide(), $(".btn-back", "#action_channel_select").show(), $("#action_channel_select .is-dimmable").removeClass("fade")), a == "#trigger_select" ? $("#statement_live_trigger_attributes_trigger_id").val("-1").change() : a == "#action_select" && $("#statement_live_action_attributes_action_id").val("-1").change(), $(".btn-restart", a).hide(), $(".btn-back", a).show(), $(a).nextAll(".step_parent").fadeOut(e);
    var j = !1,
        k = function() {
            if (j) return;
            j = !0, set_keyboard_init_focus(a), c.find(".btn-back").fadeIn(e)
        };
    dim_in(a), h ? $("html,body").animate({
        scrollTop: d + g
    }, {
        duration: f,
        easing: "swing",
        complete: k
    }) : ($(window).scrollTop(d + g), k())
}

function restart_from_here(a) {
    restart_and_scroll_to(a)
}

function back_to(a) {
    restart_and_scroll_to(a)
}

function dim_out(a) {
    $(a + " .is-dimmable").addClass("fade")
}

function dim_in(a) {
    $(a + " .is-dimmable").removeClass("fade")
}

function choose_trigger_channel() {
    $("#special_create_helper").fadeOut(300), show_and_scroll_to("#trigger_channel_select", function() {
        dim_out("#start"), $(".channels-search_input").eq(0).focus()
    })
}

function onChooseTriggerChannelSuccess(a, b) {
    $("#ind_t_channel_" + b).addClass("chosen"), show_and_scroll_to("#trigger_select", function() {
        dim_out("#trigger_channel_select")
    })
}

function onChooseTriggerChannelMissing(a, b) {
    $("#ind_t_channel_" + b).addClass("chosen"), show_and_scroll_to("#trigger_channel_missing", function() {
        dim_out("#trigger_channel_select")
    })
}

function onCheckTriggerChannelSuccess(a, b) {
    show_and_scroll_to("#trigger_select")
}

function onChooseTriggerSuccess(a) {
    show_and_scroll_to("#live_trigger_fields_complete", function() {
        dim_out("#trigger_select")
    })
}

function onTriggerJunctionCompleteFields(a) {
    show_and_scroll_to("#live_trigger_fields_complete")
}

function onTriggerCreate() {
    show_and_scroll_to("#midway_statement_here", function() {
        dim_out("#live_trigger_fields_complete")
    })
}

function choose_action() {
    show_and_scroll_to("#action_channel_select", function() {
        dim_out("#midway_statement_here"), $(".channels-search_input").eq(1).focus()
    })
}

function onChooseActionChannelSuccess(a, b) {
    $("#ind_a_channel_" + b).addClass("chosen"), show_and_scroll_to("#action_select", function() {
        dim_out("#action_channel_select")
    })
}

function onChooseActionChannelMissing(a, b) {
    $("#ind_t_channel_" + b).addClass("chosen"), show_and_scroll_to("#action_channel_missing", function() {
        dim_out("#action_channel_select")
    })
}

function onCheckActionChannelSuccess(a, b) {
    show_and_scroll_to("#action_select")
}

function onChooseActionInit(a, b, c) {
    $("#statement_live_action_attributes_action_id").val(a).change(), $("#action_" + a).addClass("chosen")
}

function onChooseActionSuccess(a) {
    show_and_scroll_to("#live_action_fields_complete", function() {
        dim_out("#action_select")
    })
}

function onChooseActionFromTriggerSuccess(a) {
    $("#test_and_activate_from_trigger input").attr("disabled", !1), $("#channel_missing").empty()
}

function onActionCreate() {
    $("#statement_submit").removeAttr("disabled"), show_and_scroll_to("#test_and_activate", function() {
        dim_out("#live_action_fields_complete")
    }), IFTTT.recipes.bindRecipeDescriptionCounter()
}

function recipe_hide_fields() {
    try {
        closeMCE_instances()
    } catch (a) {}
    $("#shared_fields_container").hide("blind", {
        easing: "easeInOutCubic"
    }, 800, function() {}), $("#show_hide_fields_links .hide").fadeOut("fast", function() {
        $("#show_hide_fields_links .show").fadeIn("fast")
    })
}

function recipe_show_fields_start() {
    $("#shared_fields_container").show("blind", {
        easing: "easeInOutCubic"
    }, 600, function() {
        $("#show_hide_fields_links .show").fadeOut("fast", function() {
            $("#show_hide_fields_links .hide").fadeIn("fast")
        })
    })
}

function showAddinSelect(a) {
    $(".addin-select").hide(), a === 0 ? $(".addin-select").first().show() : $("#addin_select_" + a).show(), $(document).on("click", hideAllAddinSelectOnClickOff)
}

function hideAllAddinSelect() {
    $(".addin-select").hide(), $(document).off("click", hideAllAddinSelectOnClickOff)
}

function hideAllAddinSelectOnClickOff(a) {
    doNothing = !1, $.each($(a.target).parents().andSelf(), function(a, b) {
        if ($(b).hasClass("addin-select") || $(b).hasClass("action_field_addin-pop-button")) return doNothing = !0, !1
    });
    if (doNothing) return a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !0;
    $(".action_field_addin-pop-button.-js_visible").removeClass("-js_visible"), hideAllAddinSelect()
}

function onChannelPinSent() {
    $("form").attr("onKeypress", ""), $(".live_channel_fields :input").attr("readonly", "true"), $(".fieldWithErrors").removeClass("fieldWithErrors", 400), $(".validation-error").fadeOut(400), $("#errorExplanation").fadeOut(400), $("#send_pin").fadeOut("300", function() {
        $("#activate_pin").fadeIn("300"), $("#main_container").resize()
    })
}

function onChannelPinRestart() {
    $("form").attr("onKeypress", "return event.keyCode!=13"), $(".live_channel_fields :input").attr("readonly", ""), $(".fieldWithErrors").removeClass("fieldWithErrors", 400), $(".validation-error").fadeOut(400), $("#errorExplanation").fadeOut(400), $("#activate_pin").fadeOut("300", function() {
        $("#send_pin").fadeIn("300"), $("#main_container").resize()
    })
}

function onChannelPinMismatch() {
    $("form").attr("onKeypress", ""), $(".live_channel_fields :input").attr("readonly", "true")
}

function start_missing_recipe_channels_poll(a, b) {
    channel_id_s = a.toString(), $.simple_poll(function(a) {
        channel_ids = $.cookie("user_channel_ids").split(","), in_array = !1;
        for (var c = 0; c < channel_ids.length; c++) channel_ids[c] == channel_id_s && (in_array = !0);
        in_array ? (total_missing_channels -= 1, $("#missing_channel_" + channel_id_s + " .missing_activate").fadeOut("600", function() {
            total_missing_channels <= 0 && ($("#iftttMapFieldHolder").css({
                opacity: 0
            }), $(".-js-hide_witth_inactive_channels").not(".recipe-page_more-button").slideDown({
                duration: 600,
                ease: "easeInElastic",
                queue: !1,
                complete: function() {
                    $(".recipe-page_more-button").fadeIn(250), $(window).trigger("renderComponents"), setTimeout(function() {
                        $("#iftttMapFieldHolder").css({
                            opacity: 1
                        })
                    }, 250)
                }
            }), $(".-js-disabled").removeClass("-js-disabled")), $("#missing_channel_" + channel_id_s + " .done_message").fadeIn("600"), $.get(b + "?ajax=1", function(a) {}, "html").success(function(a) {
                window.replaceFormFromAjax(a)
            }).error(function(a) {}).complete(function(a) {})
        })) : a()
    })
}

function delete_statement(a) {
    setTimeout(function() {
        var b = $("#statement_" + a),
            c = b.nextAll(".personal-recipe-manage");
        b[0] == $(".personal-recipe-manage")[0] && c.first().addClass("first");
        var d = parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom"));
        c.animate({
            top: -b.height() - d
        }, 350), b.animate({
            opacity: 0
        }, 350, function() {
            b.remove(), c.css({
                top: "auto"
            }), redirect_on_no_statements()
        })
    }, 10)
}

function delete_statement_and_refresh(a) {
    delete_statement(a), refresh_account_meta()
}

function delete_locker_item(a) {
    setTimeout(function() {
        var b = $("#locker-item_" + a),
            c = b.nextAll(".locker_locker-item");
        b[0] == $(".locker_locker-item")[0] && c.first().addClass("first");
        var d = parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom"));
        c.animate({
            top: -b.height() - d
        }, 350), b.animate({
            opacity: 0
        }, 350, function() {
            b.remove(), c.css({
                top: "auto"
            }), redirect_on_no_locker_items()
        })
    }, 10)
}

function redirect_on_no_locker_items() {
    $(".locker_locker-item").length == 0 && (window.location.href = "/files")
}

function toggle_locker_public_private(a) {
    $("#locker_locker-item_#{item_id}_public").val() == "true" ? $("#locker-item_#{item_id}").addClass("is-public") : $("#locker-item_#{item_id}").removeClass("is-public")
}

function setProfileProviderIfCheckedInPopup() {
    if ($("#set_as_profile_provider").is(":checked")) {
        var a = $("#set_as_profile_provider").siblings("input[name='user[profile_provider_channel_id]']").val();
        $.get("/set_channel_as_profile_provider/" + a)
    } else console.log("not checked")
}

function localizeDatetime(a) {
    try {
        var b = parseInt(a),
            c = new Date(0);
        c.setUTCSeconds(b);
        var d = moment(c).format("MMMM D, YYYY [at] h:mm A");
        return d
    } catch (e) {
        return !1
    }
}

function sendToDc(a, b) {
    $.post("/api/v2/js_dc_receiver_6b3ed778f76cad3bf61202192254b089", {
        event_name: a,
        data: b
    })
}

function weShouldSendCollectionDataFromThisPage() {
    return $(".is-authenticated").length > 0 ? !0 : !1
}

function findIdsOfAllRecipesOnThePage() {
    var a = "";
    if (weShouldSendCollectionDataFromThisPage()) {
        var b = $("[data-recipe-collection]");
        b.each(function() {
            $(this).parents().hasClass("recipe-list") || (a.length > 0 && (a += ","), a += $(this).data("recipe-collection"))
        });
        if ($(".recipe-list__nav-tab").length > 0) {
            var c = $(".recipe-list__nav-tab.is-current").attr("id"),
                d = $("[data-recipe-collection]", ".recipe-list#" + c).data("recipe-collection");
            a.length > 0 && (a += ","), a += d
        }
    }
    return a
}

function sendRecipeCollectionsToRedis() {}

function handleEmptySearches() {
    var a = $('[action="/recipes/search"]');
    $(a).on("submit", function() {
        $(a).find('[name="q"]').val() == "" && event.preventDefault()
    })
}

function showFlashForResponseTo(a) {
    var b = function(a, b) {
        IFTTT.notifications.showNotification({
            message: a,
            isError: b == "error"
        })
    };
    return typeof a == "string" && (a = $(a)), a.on("ajax:success", function(a, c, d, e) {
        c.error !== undefined ? b(c.error, "error") : c.notice !== undefined && b(c.notice, "notice")
    }).on("ajax:error", function(a, c, d, e) {
        b("Something went wrong", "error")
    }), a
}
window.Modernizr = function(a, b, c) {
        function v(a) {
            j.cssText = a
        }

        function w(a, b) {
            return v(m.join(a + ";") + (b || ""))
        }

        function x(a, b) {
            return typeof a === b
        }

        function y(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function z(a, b, d) {
            for (var e in a) {
                var f = b[a[e]];
                if (f !== c) return d === !1 ? a[e] : x(f, "function") ? f.bind(d || b) : f
            }
            return !1
        }

        function A() {
            e.input = function(c) {
                for (var d = 0, e = c.length; d < e; d++) p[c[d]] = c[d] in k;
                return p.list && (p.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), p
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))
        }
        var d = "2.8.3",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            k = b.createElement("input"),
            l = {}.toString,
            m = " -webkit- -moz- -o- -ms- ".split(" "),
            n = {},
            o = {},
            p = {},
            q = [],
            r = q.slice,
            s, t = {}.hasOwnProperty,
            u;
        !x(t, "undefined") && !x(t.call, "undefined") ? u = function(a, b) {
            return t.call(a, b)
        } : u = function(a, b) {
            return b in a && x(a.constructor.prototype[b], "undefined")
        }, Function.prototype.bind || (Function.prototype.bind = function(b) {
            var c = this;
            if (typeof c != "function") throw new TypeError;
            var d = r.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var a = function() {};
                        a.prototype = c.prototype;
                        var f = new a,
                            g = c.apply(f, d.concat(r.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return c.apply(b, d.concat(r.call(arguments)))
                };
            return e
        }), n.canvas = function() {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d")
        }, n.history = function() {
            return !!a.history && !!history.pushState
        };
        for (var B in n) u(n, B) && (s = B.toLowerCase(), e[s] = n[B](), q.push((e[s] ? "" : "no-") + s));
        return e.input || A(), e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) u(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, v(""), i = k = null,
            function(a, b) {
                function l(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function m() {
                    var a = s.elements;
                    return typeof a == "string" ? a.split(" ") : a
                }

                function n(a) {
                    var b = j[a[h]];
                    return b || (b = {}, i++, a[h] = i, j[i] = b), b
                }

                function o(a, c, d) {
                    c || (c = b);
                    if (k) return c.createElement(a);
                    d || (d = n(c));
                    var g;
                    return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
                }

                function p(a, c) {
                    a || (a = b);
                    if (k) return a.createDocumentFragment();
                    c = c || n(a);
                    var d = c.frag.cloneNode(),
                        e = 0,
                        f = m(),
                        g = f.length;
                    for (; e < g; e++) d.createElement(f[e]);
                    return d
                }

                function q(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return s.shivMethods ? o(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(s, b.frag)
                }

                function r(a) {
                    a || (a = b);
                    var c = n(a);
                    return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
                }
                var c = "3.7.0",
                    d = a.html5 || {},
                    e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    g, h = "_html5shiv",
                    i = 0,
                    j = {},
                    k;
                (function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                        }()
                    } catch (c) {
                        g = !0, k = !0
                    }
                })();
                var s = {
                    elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: c,
                    shivCSS: d.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: d.shivMethods !== !1,
                    type: "default",
                    shivDocument: r,
                    createElement: o,
                    createDocumentFragment: p
                };
                a.html5 = s, r(b)
            }(this, b), e._version = d, e._prefixes = m, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + q.join(" ") : ""), e
    }(this, this.document), Modernizr.addTest("cssfilters", function() {
        var a = document.createElement("div");
        return a.style.cssText = Modernizr._prefixes.join("filter:blur(2px); "), !!a.style.length && (document.documentMode === undefined || document.documentMode > 9)
    }),
    function(a, b) {
        function c(a) {
            var b = ob[a] = {};
            return $.each(a.split(bb), function(a, c) {
                b[c] = !0
            }), b
        }

        function d(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(qb, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : pb.test(d) ? $.parseJSON(d) : d
                    } catch (f) {}
                    $.data(a, c, d)
                } else d = b
            }
            return d
        }

        function e(a) {
            var b;
            for (b in a) {
                if (b === "data" && $.isEmptyObject(a[b])) continue;
                if (b !== "toJSON") return !1
            }
            return !0
        }

        function f() {
            return !1
        }

        function g() {
            return !0
        }

        function h(a) {
            return !a || !a.parentNode || a.parentNode.nodeType === 11
        }

        function i(a, b) {
            do a = a[b]; while (a && a.nodeType !== 1);
            return a
        }

        function j(a, b, c) {
            b = b || 0;
            if ($.isFunction(b)) return $.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
            if (b.nodeType) return $.grep(a, function(a, d) {
                return a === b === c
            });
            if (typeof b == "string") {
                var d = $.grep(a, function(a) {
                    return a.nodeType === 1
                });
                if (Kb.test(b)) return $.filter(b, d, !c);
                b = $.filter(b, d)
            }
            return $.grep(a, function(a, d) {
                return $.inArray(a, b) >= 0 === c
            })
        }

        function k(a) {
            var b = Nb.split("|"),
                c = a.createDocumentFragment();
            if (c.createElement)
                while (b.length) c.createElement(b.pop());
            return c
        }

        function l(a, b) {
            return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
        }

        function m(a, b) {
            if (b.nodeType !== 1 || !$.hasData(a)) return;
            var c, d, e, f = $._data(a),
                g = $._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; d < e; d++) $.event.add(b, c, h[c][d])
            }
            g.data && (g.data = $.extend({}, g.data))
        }

        function n(a, b) {
            var c;
            if (b.nodeType !== 1) return;
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando)
        }

        function o(a) {
            return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
        }

        function p(a) {
            Xb.test(a.type) && (a.defaultChecked = a.checked)
        }

        function q(a, b) {
            if (b in a) return b;
            var c = b.charAt(0).toUpperCase() + b.slice(1),
                d = b,
                e = rc.length;
            while (e--) {
                b = rc[e] + c;
                if (b in a) return b
            }
            return d
        }

        function r(a, b) {
            return a = b || a, $.css(a, "display") === "none" || !$.contains(a.ownerDocument, a)
        }

        function s(a, b) {
            var c, d, e = [],
                f = 0,
                g = a.length;
            for (; f < g; f++) {
                c = a[f];
                if (!c.style) continue;
                e[f] = $._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cc(c, "display"), !e[f] && d !== "none" && $._data(c, "olddisplay", d))
            }
            for (f = 0; f < g; f++) {
                c = a[f];
                if (!c.style) continue;
                if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? e[f] || "" : "none"
            }
            return a
        }

        function t(a, b, c) {
            var d = kc.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function u(a, b, c, d) {
            var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0,
                f = 0;
            for (; e < 4; e += 2) c === "margin" && (f += $.css(a, c + qc[e], !0)), d ? (c === "content" && (f -= parseFloat(cc(a, "padding" + qc[e])) || 0), c !== "margin" && (f -= parseFloat(cc(a, "border" + qc[e] + "Width")) || 0)) : (f += parseFloat(cc(a, "padding" + qc[e])) || 0, c !== "padding" && (f += parseFloat(cc(a, "border" + qc[e] + "Width")) || 0));
            return f
        }

        function v(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight,
                e = !0,
                f = $.support.boxSizing && $.css(a, "boxSizing") === "border-box";
            if (d <= 0 || d == null) {
                d = cc(a, b);
                if (d < 0 || d == null) d = a.style[b];
                if (lc.test(d)) return d;
                e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
            }
            return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
        }

        function w(a) {
            if (nc[a]) return nc[a];
            var b = $("<" + a + ">").appendTo(P.body),
                c = b.css("display");
            b.remove();
            if (c === "none" || c === "") {
                dc = P.body.appendChild(dc || $.extend(P.createElement("iframe"), {
                    frameBorder: 0,
                    width: 0,
                    height: 0
                }));
                if (!ec || !dc.createElement) ec = (dc.contentWindow || dc.contentDocument).document, ec.write("<!doctype html><html><body>"), ec.close();
                b = ec.body.appendChild(ec.createElement(a)), c = cc(b, "display"), P.body.removeChild(dc)
            }
            return nc[a] = c, c
        }

        function x(a, b, c, d) {
            var e;
            if ($.isArray(b)) $.each(b, function(b, e) {
                c || uc.test(a) ? d(a, e) : x(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
            });
            else if (!c && $.type(b) === "object")
                for (e in b) x(a + "[" + e + "]", b[e], c, d);
            else d(a, b)
        }

        function y(a) {
            return function(b, c) {
                typeof b != "string" && (c = b, b = "*");
                var d, e, f, g = b.toLowerCase().split(bb),
                    h = 0,
                    i = g.length;
                if ($.isFunction(c))
                    for (; h < i; h++) d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
            }
        }

        function z(a, c, d, e, f, g) {
            f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
            var h, i = a[f],
                j = 0,
                k = i ? i.length : 0,
                l = a === Kc;
            for (; j < k && (l || !h); j++) h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
            return (l || !h) && !g["*"] && (h = z(a, c, d, e, "*", g)), h
        }

        function A(a, c) {
            var d, e, f = $.ajaxSettings.flatOptions || {};
            for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
            e && $.extend(!0, a, e)
        }

        function B(a, c, d) {
            var e, f, g, h, i = a.contents,
                j = a.dataTypes,
                k = a.responseFields;
            for (f in k) f in d && (c[k[f]] = d[f]);
            while (j[0] === "*") j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
            if (e)
                for (f in i)
                    if (i[f] && i[f].test(e)) {
                        j.unshift(f);
                        break
                    }
            if (j[0] in d) g = j[0];
            else {
                for (f in d) {
                    if (!j[0] || a.converters[f + " " + j[0]]) {
                        g = f;
                        break
                    }
                    h || (h = f)
                }
                g = g || h
            }
            if (g) return g !== j[0] && j.unshift(g), d[g]
        }

        function C(a, b) {
            var c, d, e, f, g = a.dataTypes.slice(),
                h = g[0],
                i = {},
                j = 0;
            a.dataFilter && (b = a.dataFilter(b, a.dataType));
            if (g[1])
                for (c in a.converters) i[c.toLowerCase()] = a.converters[c];
            for (; e = g[++j];)
                if (e !== "*") {
                    if (h !== "*" && h !== e) {
                        c = i[h + " " + e] || i["* " + e];
                        if (!c)
                            for (d in i) {
                                f = d.split(" ");
                                if (f[1] === e) {
                                    c = i[h + " " + f[0]] || i["* " + f[0]];
                                    if (c) {
                                        c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                                        break
                                    }
                                }
                            }
                        if (c !== !0)
                            if (c && a["throws"]) b = c(b);
                            else try {
                                b = c(b)
                            } catch (k) {
                                return {
                                    state: "parsererror",
                                    error: c ? k : "No conversion from " + h + " to " + e
                                }
                            }
                    }
                    h = e
                }
            return {
                state: "success",
                data: b
            }
        }

        function D() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {}
        }

        function E() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
        }

        function F() {
            return setTimeout(function() {
                Vc = b
            }, 0), Vc = $.now()
        }

        function G(a, b) {
            $.each(b, function(b, c) {
                var d = (_c[b] || []).concat(_c["*"]),
                    e = 0,
                    f = d.length;
                for (; e < f; e++)
                    if (d[e].call(a, b, c)) return
            })
        }

        function H(a, b, c) {
            var d, e = 0,
                f = 0,
                g = $c.length,
                h = $.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    var b = Vc || F(),
                        c = Math.max(0, j.startTime + j.duration - b),
                        d = c / j.duration || 0,
                        e = 1 - d,
                        f = 0,
                        g = j.tweens.length;
                    for (; f < g; f++) j.tweens[f].run(e);
                    return h.notifyWith(a, [j, e, c]), e < 1 && g ? c : (h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: $.extend({}, b),
                    opts: $.extend(!0, {
                        specialEasing: {}
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: Vc || F(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c, d) {
                        var e = $.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(e), e
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        for (; c < d; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            I(k, j.opts.specialEasing);
            for (; e < g; e++) {
                d = $c[e].call(j, a, k, j.opts);
                if (d) return d
            }
            return G(j, k), $.isFunction(j.opts.start) && j.opts.start.call(a, j), $.fx.timer($.extend(i, {
                anim: j,
                queue: j.opts.queue,
                elem: a
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function I(a, b) {
            var c, d, e, f, g;
            for (c in a) {
                d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d];
                if (g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
            }
        }

        function J(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m = this,
                n = a.style,
                o = {},
                p = [],
                q = a.nodeType && r(a);
            c.queue || (k = $._queueHooks(a, "fx"), k.unqueued == null && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
                k.unqueued || l()
            }), k.unqueued++, m.always(function() {
                m.always(function() {
                    k.unqueued--, $.queue(a, "fx").length || k.empty.fire()
                })
            })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], $.css(a, "display") === "inline" && $.css(a, "float") === "none" && (!$.support.inlineBlockNeedsLayout || w(a.nodeName) === "inline" ? n.display = "inline-block" : n.zoom = 1)), c.overflow && (n.overflow = "hidden", $.support.shrinkWrapBlocks || m.done(function() {
                n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
            }));
            for (d in b) {
                f = b[d];
                if (Xc.exec(f)) {
                    delete b[d], i = i || f === "toggle";
                    if (f === (q ? "hide" : "show")) continue;
                    p.push(d)
                }
            }
            g = p.length;
            if (g) {
                h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), "hidden" in h && (q = h.hidden), i && (h.hidden = !q), q ? $(a).show() : m.done(function() {
                    $(a).hide()
                }), m.done(function() {
                    var b;
                    $.removeData(a, "fxshow", !0);
                    for (b in o) $.style(a, b, o[b])
                });
                for (d = 0; d < g; d++) e = p[d], j = m.createTween(e, q ? h[e] : 0), o[e] = h[e] || $.style(a, e), e in h || (h[e] = j.start, q && (j.end = j.start, j.start = e === "width" || e === "height" ? 1 : 0))
            }
        }

        function K(a, b, c, d, e) {
            return new K.prototype.init(a, b, c, d, e)
        }

        function L(a, b) {
            var c, d = {
                    height: a
                },
                e = 0;
            b = b ? 1 : 0;
            for (; e < 4; e += 2 - b) c = qc[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }

        function M(a) {
            return $.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }
        var N, O, P = a.document,
            Q = a.location,
            R = a.navigator,
            S = a.jQuery,
            T = a.$,
            U = Array.prototype.push,
            V = Array.prototype.slice,
            W = Array.prototype.indexOf,
            X = Object.prototype.toString,
            Y = Object.prototype.hasOwnProperty,
            Z = String.prototype.trim,
            $ = function(a, b) {
                return new $.fn.init(a, b, N)
            },
            _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
            ab = /\S/,
            bb = /\s+/,
            cb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            db = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            eb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            fb = /^[\],:{}\s]*$/,
            gb = /(?:^|:|,)(?:\s*\[)+/g,
            hb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            ib = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
            jb = /^-ms-/,
            kb = /-([\da-z])/gi,
            lb = function(a, b) {
                return (b + "").toUpperCase()
            },
            mb = function() {
                P.addEventListener ? (P.removeEventListener("DOMContentLoaded", mb, !1), $.ready()) : P.readyState === "complete" && (P.detachEvent("onreadystatechange", mb), $.ready())
            },
            nb = {};
        $.fn = $.prototype = {
            constructor: $,
            init: function(a, c, d) {
                var e, f, g, h;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? e = [null, a, null] : e = db.exec(a);
                    if (e && (e[1] || !c)) {
                        if (e[1]) return c = c instanceof $ ? c[0] : c, h = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], h, !0), eb.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
                        f = P.getElementById(e[2]);
                        if (f && f.parentNode) {
                            if (f.id !== e[2]) return d.find(a);
                            this.length = 1, this[0] = f
                        }
                        return this.context = P, this.selector = a, this
                    }
                    return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
                }
                return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
            },
            selector: "",
            jquery: "1.8.3",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return V.call(this)
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            },
            pushStack: function(a, b, c) {
                var d = $.merge(this.constructor(), a);
                return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
            },
            each: function(a, b) {
                return $.each(this, a, b)
            },
            ready: function(a) {
                return $.ready.promise().done(a), this
            },
            eq: function(a) {
                return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
            },
            map: function(a) {
                return this.pushStack($.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: U,
            sort: [].sort,
            splice: [].splice
        }, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function() {
            var a, c, d, e, f, g, h = arguments[0] || {},
                i = 1,
                j = arguments.length,
                k = !1;
            typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !$.isFunction(h) && (h = {}), j === i && (h = this, --i);
            for (; i < j; i++)
                if ((a = arguments[i]) != null)
                    for (c in a) {
                        d = h[c], e = a[c];
                        if (h === e) continue;
                        k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e)
                    }
                return h
        }, $.extend({
            noConflict: function(b) {
                return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? $.readyWait++ : $.ready(!0)
            },
            ready: function(a) {
                if (a === !0 ? --$.readyWait : $.isReady) return;
                if (!P.body) return setTimeout($.ready, 1);
                $.isReady = !0;
                if (a !== !0 && --$.readyWait > 0) return;
                O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready")
            },
            isFunction: function(a) {
                return $.type(a) === "function"
            },
            isArray: Array.isArray || function(a) {
                return $.type(a) === "array"
            },
            isWindow: function(a) {
                return a != null && a == a.window
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return a == null ? String(a) : nb[X.call(a)] || "object"
            },
            isPlainObject: function(a) {
                if (!a || $.type(a) !== "object" || a.nodeType || $.isWindow(a)) return !1;
                try {
                    if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a);
                return d === b || Y.call(a, d)
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            error: function(a) {
                throw new Error(a)
            },
            parseHTML: function(a, b, c) {
                var d;
                return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || P, (d = eb.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes)))
            },
            parseJSON: function(b) {
                if (!b || typeof b != "string") return null;
                b = $.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (fb.test(b.replace(hb, "@").replace(ib, "]").replace(gb, ""))) return (new Function("return " + b))();
                $.error("Invalid JSON: " + b)
            },
            parseXML: function(c) {
                var d, e;
                if (!c || typeof c != "string") return null;
                try {
                    a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (f) {
                    d = b
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && $.error("Invalid XML: " + c), d
            },
            noop: function() {},
            globalEval: function(b) {
                b && ab.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b)
                })(b)
            },
            camelCase: function(a) {
                return a.replace(jb, "ms-").replace(kb, lb)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function(a, c, d) {
                var e, f = 0,
                    g = a.length,
                    h = g === b || $.isFunction(a);
                if (d) {
                    if (h) {
                        for (e in a)
                            if (c.apply(a[e], d) === !1) break
                    } else
                        for (; f < g;)
                            if (c.apply(a[f++], d) === !1) break
                } else if (h) {
                    for (e in a)
                        if (c.call(a[e], e, a[e]) === !1) break
                } else
                    for (; f < g;)
                        if (c.call(a[f], f, a[f++]) === !1) break; return a
            },
            trim: Z && !Z.call("ï»¿Â ") ? function(a) {
                return a == null ? "" : Z.call(a)
            } : function(a) {
                return a == null ? "" : (a + "").replace(cb, "")
            },
            makeArray: function(a, b) {
                var c, d = b || [];
                return a != null && (c = $.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (W) return W.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)
                        if (c in b && b[c] === a) return c
                }
                return -1
            },
            merge: function(a, c) {
                var d = c.length,
                    e = a.length,
                    f = 0;
                if (typeof d == "number")
                    for (; f < d; f++) a[e++] = c[f];
                else
                    while (c[f] !== b) a[e++] = c[f++];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                var d, e = [],
                    f = 0,
                    g = a.length;
                c = !!c;
                for (; f < g; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
                return e
            },
            map: function(a, c, d) {
                var e, f, g = [],
                    h = 0,
                    i = a.length,
                    j = a instanceof $ || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || $.isArray(a));
                if (j)
                    for (; h < i; h++) e = c(a[h], h, d), e != null && (g[g.length] = e);
                else
                    for (f in a) e = c(a[f], f, d), e != null && (g[g.length] = e);
                return g.concat.apply([], g)
            },
            guid: 1,
            proxy: function(a, c) {
                var d, e, f;
                return typeof c == "string" && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function() {
                    return a.apply(c, e.concat(V.call(arguments)))
                }, f.guid = a.guid = a.guid || $.guid++, f) : b
            },
            access: function(a, c, d, e, f, g, h) {
                var i, j = d == null,
                    k = 0,
                    l = a.length;
                if (d && typeof d == "object") {
                    for (k in d) $.access(a, c, k, d[k], 1, g, e);
                    f = 1
                } else if (e !== b) {
                    i = h === b && $.isFunction(e), j && (i ? (i = c, c = function(a, b, c) {
                        return i.call($(a), c)
                    }) : (c.call(a, e), c = null));
                    if (c)
                        for (; k < l; k++) c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                    f = 1
                }
                return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
            },
            now: function() {
                return (new Date).getTime()
            }
        }), $.ready.promise = function(b) {
            if (!O) {
                O = $.Deferred();
                if (P.readyState === "complete") setTimeout($.ready, 1);
                else if (P.addEventListener) P.addEventListener("DOMContentLoaded", mb, !1), a.addEventListener("load", $.ready, !1);
                else {
                    P.attachEvent("onreadystatechange", mb), a.attachEvent("onload", $.ready);
                    var c = !1;
                    try {
                        c = a.frameElement == null && P.documentElement
                    } catch (d) {}
                    c && c.doScroll && function e() {
                        if (!$.isReady) {
                            try {
                                c.doScroll("left")
                            } catch (a) {
                                return setTimeout(e, 50)
                            }
                            $.ready()
                        }
                    }()
                }
            }
            return O.promise(b)
        }, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            nb["[object " + b + "]"] = b.toLowerCase()
        }), N = $(P);
        var ob = {};
        $.Callbacks = function(a) {
            a = typeof a == "string" ? ob[a] || c(a) : $.extend({}, a);
            var d, e, f, g, h, i, j = [],
                k = !a.once && [],
                l = function(b) {
                    d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0;
                    for (; j && i < h; i++)
                        if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                            d = !1;
                            break
                        }
                    f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
                },
                m = {
                    add: function() {
                        if (j) {
                            var b = j.length;
                            (function c(b) {
                                $.each(b, function(b, d) {
                                    var e = $.type(d);
                                    e === "function" ? (!a.unique || !m.has(d)) && j.push(d) : d && d.length && e !== "string" && c(d)
                                })
                            })(arguments), f ? h = j.length : d && (g = b, l(d))
                        }
                        return this
                    },
                    remove: function() {
                        return j && $.each(arguments, function(a, b) {
                            var c;
                            while ((c = $.inArray(b, j, c)) > -1) j.splice(c, 1), f && (c <= h && h--, c <= i && i--)
                        }), this
                    },
                    has: function(a) {
                        return $.inArray(a, j) > -1
                    },
                    empty: function() {
                        return j = [], this
                    },
                    disable: function() {
                        return j = k = d = b, this
                    },
                    disabled: function() {
                        return !j
                    },
                    lock: function() {
                        return k = b, d || m.disable(), this
                    },
                    locked: function() {
                        return !k
                    },
                    fireWith: function(a, b) {
                        return b = b || [], b = [a, b.slice ? b.slice() : b], j && (!e || k) && (f ? k.push(b) : l(b)), this
                    },
                    fire: function() {
                        return m.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!e
                    }
                };
            return m
        }, $.extend({
            Deferred: function(a) {
                var b = [
                        ["resolve", "done", $.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", $.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", $.Callbacks("memory")]
                    ],
                    c = "pending",
                    d = {
                        state: function() {
                            return c
                        },
                        always: function() {
                            return e.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var a = arguments;
                            return $.Deferred(function(c) {
                                $.each(b, function(b, d) {
                                    var f = d[0],
                                        g = a[b];
                                    e[d[1]]($.isFunction(g) ? function() {
                                        var a = g.apply(this, arguments);
                                        a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                                    } : c[f])
                                }), a = null
                            }).promise()
                        },
                        promise: function(a) {
                            return a != null ? $.extend(a, d) : d
                        }
                    },
                    e = {};
                return d.pipe = d.then, $.each(b, function(a, f) {
                    var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function() {
                        c = h
                    }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },
            when: function(a) {
                var b = 0,
                    c = V.call(arguments),
                    d = c.length,
                    e = d !== 1 || a && $.isFunction(a.promise) ? d : 0,
                    f = e === 1 ? a : $.Deferred(),
                    g = function(a, b, c) {
                        return function(d) {
                            b[a] = this, c[a] = arguments.length > 1 ? V.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                        }
                    },
                    h, i, j;
                if (d > 1) {
                    h = new Array(d), i = new Array(d), j = new Array(d);
                    for (; b < d; b++) c[b] && $.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
                }
                return e || f.resolveWith(j, c), f.promise()
            }
        }), $.support = function() {
            var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
            m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0];
            if (!c || !d || !c.length) return {};
            e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b = {
                leadingWhitespace: m.firstChild.nodeType === 3,
                tbody: !m.getElementsByTagName("tbody").length,
                htmlSerialize: !!m.getElementsByTagName("link").length,
                style: /top/.test(d.getAttribute("style")),
                hrefNormalized: d.getAttribute("href") === "/a",
                opacity: /^0.5/.test(d.style.opacity),
                cssFloat: !!d.style.cssFloat,
                checkOn: g.value === "on",
                optSelected: f.selected,
                getSetAttribute: m.className !== "t",
                enctype: !!P.createElement("form").enctype,
                html5Clone: P.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                boxModel: P.compatMode === "CSS1Compat",
                submitBubbles: !0,
                changeBubbles: !0,
                focusinBubbles: !1,
                deleteExpando: !0,
                noCloneEvent: !0,
                inlineBlockNeedsLayout: !1,
                shrinkWrapBlocks: !1,
                reliableMarginRight: !0,
                boxSizingReliable: !0,
                pixelPosition: !1
            }, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
            try {
                delete m.test
            } catch (n) {
                b.deleteExpando = !1
            }!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
                b.noCloneEvent = !1
            }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = g.value === "t", g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m);
            if (m.attachEvent)
                for (j in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = typeof m[i] == "function"), b[j + "Bubbles"] = k;
            return $(function() {
                var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                    h = P.getElementsByTagName("body")[0];
                if (!h) return;
                c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && e[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = h.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || {
                    width: "4px"
                }).width === "4px", f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null
            }), h.removeChild(m), c = d = e = f = g = h = m = null, b
        }();
        var pb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            qb = /([A-Z])/g;
        $.extend({
            cache: {},
            deletedIds: [],
            uuid: 0,
            expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function(a) {
                return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a)
            },
            data: function(a, c, d, e) {
                if (!$.acceptData(a)) return;
                var f, g, h = $.expando,
                    i = typeof c == "string",
                    j = a.nodeType,
                    k = j ? $.cache : a,
                    l = j ? a[h] : a[h] && h;
                if ((!l || !k[l] || !e && !k[l].data) && i && d === b) return;
                l || (j ? a[h] = l = $.deletedIds.pop() || $.guid++ : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop));
                if (typeof c == "object" || typeof c == "function") e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c);
                return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[$.camelCase(c)])) : g = f, g
            },
            removeData: function(a, b, c) {
                if (!$.acceptData(a)) return;
                var d, f, g, h = a.nodeType,
                    i = h ? $.cache : a,
                    j = h ? a[$.expando] : $.expando;
                if (!i[j]) return;
                if (b) {
                    d = c ? i[j] : i[j].data;
                    if (d) {
                        $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (f = 0, g = b.length; f < g; f++) delete d[b[f]];
                        if (!(c ? e : $.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete i[j].data;
                    if (!e(i[j])) return
                }
                h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null
            },
            _data: function(a, b, c) {
                return $.data(a, b, c, !0)
            },
            acceptData: function(a) {
                var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
                return !b || b !== !0 && a.getAttribute("classid") === b
            }
        }), $.fn.extend({
            data: function(a, c) {
                var e, f, g, h, i, j = this[0],
                    k = 0,
                    l = null;
                if (a === b) {
                    if (this.length) {
                        l = $.data(j);
                        if (j.nodeType === 1 && !$._data(j, "parsedAttrs")) {
                            g = j.attributes;
                            for (i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") || (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
                            $._data(j, "parsedAttrs", !0)
                        }
                    }
                    return l
                }
                return typeof a == "object" ? this.each(function() {
                    $.data(this, a)
                }) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function(c) {
                    if (c === b) return l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l;
                    e[1] = c, this.each(function() {
                        var b = $(this);
                        b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
                    })
                }, null, c, arguments.length > 1, null, !1))
            },
            removeData: function(a) {
                return this.each(function() {
                    $.removeData(this, a)
                })
            }
        }), $.extend({
            queue: function(a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = $.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = $._queueHooks(a, b),
                    g = function() {
                        $.dequeue(a, b)
                    };
                e === "inprogress" && (e = c.shift(), d--), e && (b === "fx" && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return $._data(a, c) || $._data(a, c, {
                    empty: $.Callbacks("once memory").add(function() {
                        $.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
                    })
                })
            }
        }), $.fn.extend({
            queue: function(a, c) {
                var d = 2;
                return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function() {
                    var b = $.queue(this, a, c);
                    $._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && $.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    $.dequeue(this, a)
                })
            },
            delay: function(a, b) {
                return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function() {
                        clearTimeout(d)
                    }
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, c) {
                var d, e = 1,
                    f = $.Deferred(),
                    g = this,
                    h = this.length,
                    i = function() {
                        --e || f.resolveWith(g, [g])
                    };
                typeof a != "string" && (c = a, a = b), a = a || "fx";
                while (h--) d = $._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
                return i(), f.promise(c)
            }
        });
        var rb, sb, tb, ub = /[\t\r\n]/g,
            vb = /\r/g,
            wb = /^(?:button|input)$/i,
            xb = /^(?:button|input|object|select|textarea)$/i,
            yb = /^a(?:rea|)$/i,
            zb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            Ab = $.support.getSetAttribute;
        $.fn.extend({
            attr: function(a, b) {
                return $.access(this, $.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    $.removeAttr(this, a)
                })
            },
            prop: function(a, b) {
                return $.access(this, $.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return a = $.propFix[a] || a, this.each(function() {
                    try {
                        this[a] = b, delete this[a]
                    } catch (c) {}
                })
            },
            addClass: function(a) {
                var b, c, d, e, f, g, h;
                if ($.isFunction(a)) return this.each(function(b) {
                    $(this).addClass(a.call(this, b, this.className))
                });
                if (a && typeof a == "string") {
                    b = a.split(bb);
                    for (c = 0, d = this.length; c < d; c++) {
                        e = this[c];
                        if (e.nodeType === 1)
                            if (!e.className && b.length === 1) e.className = a;
                            else {
                                f = " " + e.className + " ";
                                for (g = 0, h = b.length; g < h; g++) f.indexOf(" " + b[g] + " ") < 0 && (f += b[g] + " ");
                                e.className = $.trim(f)
                            }
                    }
                }
                return this
            },
            removeClass: function(a) {
                var c, d, e, f, g, h, i;
                if ($.isFunction(a)) return this.each(function(b) {
                    $(this).removeClass(a.call(this, b, this.className))
                });
                if (a && typeof a == "string" || a === b) {
                    c = (a || "").split(bb);
                    for (h = 0, i = this.length; h < i; h++) {
                        e = this[h];
                        if (e.nodeType === 1 && e.className) {
                            d = (" " + e.className + " ").replace(ub, " ");
                            for (f = 0, g = c.length; f < g; f++)
                                while (d.indexOf(" " + c[f] + " ") >= 0) d = d.replace(" " + c[f] + " ", " ");
                            e.className = a ? $.trim(d) : ""
                        }
                    }
                }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a,
                    d = typeof b == "boolean";
                return $.isFunction(a) ? this.each(function(c) {
                    $(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function() {
                    if (c === "string") {
                        var e, f = 0,
                            g = $(this),
                            h = b,
                            i = a.split(bb);
                        while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
                    } else if (c === "undefined" || c === "boolean") this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || ""
                })
            },
            hasClass: function(a) {
                var b = " " + a + " ",
                    c = 0,
                    d = this.length;
                for (; c < d; c++)
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0) return !0;
                return !1
            },
            val: function(a) {
                var c, d, e, f = this[0];
                if (!arguments.length) {
                    if (f) return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(vb, "") : d == null ? "" : d);
                    return
                }
                return e = $.isFunction(a), this.each(function(d) {
                    var f, g = $(this);
                    if (this.nodeType !== 1) return;
                    e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : $.isArray(f) && (f = $.map(f, function(a) {
                        return a == null ? "" : a + ""
                    })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()];
                    if (!c || !("set" in c) || c.set(this, f, "value") === b) this.value = f
                })
            }
        }), $.extend({
            valHooks: {
                option: {
                    get: function(a) {
                        var b = a.attributes.value;
                        return !b || b.specified ? a.value : a.text
                    }
                },
                select: {
                    get: function(a) {
                        var b, c, d = a.options,
                            e = a.selectedIndex,
                            f = a.type === "select-one" || e < 0,
                            g = f ? null : [],
                            h = f ? e + 1 : d.length,
                            i = e < 0 ? h : f ? e : 0;
                        for (; i < h; i++) {
                            c = d[i];
                            if ((c.selected || i === e) && ($.support.optDisabled ? !c.disabled : c.getAttribute("disabled") === null) && (!c.parentNode.disabled || !$.nodeName(c.parentNode, "optgroup"))) {
                                b = $(c).val();
                                if (f) return b;
                                g.push(b)
                            }
                        }
                        return g
                    },
                    set: function(a, b) {
                        var c = $.makeArray(b);
                        return $(a).find("option").each(function() {
                            this.selected = $.inArray($(this).val(), c) >= 0
                        }), c.length || (a.selectedIndex = -1), c
                    }
                }
            },
            attrFn: {},
            attr: function(a, c, d, e) {
                var f, g, h, i = a.nodeType;
                if (!a || i === 3 || i === 8 || i === 2) return;
                if (e && $.isFunction($.fn[c])) return $(a)[c](d);
                if (typeof a.getAttribute == "undefined") return $.prop(a, c, d);
                h = i !== 1 || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (zb.test(c) ? sb : rb));
                if (d !== b) {
                    if (d === null) {
                        $.removeAttr(a, c);
                        return
                    }
                    return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d)
                }
                return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f)
            },
            removeAttr: function(a, b) {
                var c, d, e, f, g = 0;
                if (b && a.nodeType === 1) {
                    d = b.split(bb);
                    for (; g < d.length; g++) e = d[g], e && (c = $.propFix[e] || e, f = zb.test(e), f || $.attr(a, e, ""), a.removeAttribute(Ab ? e : c), f && c in a && (a[c] = !1))
                }
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (wb.test(a.nodeName) && a.parentNode) $.error("type property can't be changed");
                        else if (!$.support.radioValue && b === "radio" && $.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                },
                value: {
                    get: function(a, b) {
                        return rb && $.nodeName(a, "button") ? rb.get(a, b) : b in a ? a.value : null
                    },
                    set: function(a, b, c) {
                        if (rb && $.nodeName(a, "button")) return rb.set(a, b, c);
                        a.value = b
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function(a, c, d) {
                var e, f, g, h = a.nodeType;
                if (!a || h === 3 || h === 8 || h === 2) return;
                return g = h !== 1 || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c]
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        var c = a.getAttributeNode("tabindex");
                        return c && c.specified ? parseInt(c.value, 10) : xb.test(a.nodeName) || yb.test(a.nodeName) && a.href ? 0 : b
                    }
                }
            }
        }), sb = {
            get: function(a, c) {
                var d, e = $.prop(a, c);
                return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
            },
            set: function(a, b, c) {
                var d;
                return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
            }
        }, Ab || (tb = {
            name: !0,
            id: !0,
            coords: !0
        }, rb = $.valHooks.button = {
            get: function(a, c) {
                var d;
                return d = a.getAttributeNode(c), d && (tb[c] ? d.value !== "" : d.specified) ? d.value : b
            },
            set: function(a, b, c) {
                var d = a.getAttributeNode(c);
                return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
            }
        }, $.each(["width", "height"], function(a, b) {
            $.attrHooks[b] = $.extend($.attrHooks[b], {
                set: function(a, c) {
                    if (c === "") return a.setAttribute(b, "auto"), c
                }
            })
        }), $.attrHooks.contenteditable = {
            get: rb.get,
            set: function(a, b, c) {
                b === "" && (b = "false"), rb.set(a, b, c)
            }
        }), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function(a, c) {
            $.attrHooks[c] = $.extend($.attrHooks[c], {
                get: function(a) {
                    var d = a.getAttribute(c, 2);
                    return d === null ? b : d
                }
            })
        }), $.support.style || ($.attrHooks.style = {
            get: function(a) {
                return a.style.cssText.toLowerCase() || b
            },
            set: function(a, b) {
                return a.style.cssText = b + ""
            }
        }), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {
            get: function(a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }
        })), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function() {
            $.valHooks[this] = {
                get: function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        }), $.each(["radio", "checkbox"], function() {
            $.valHooks[this] = $.extend($.valHooks[this], {
                set: function(a, b) {
                    if ($.isArray(b)) return a.checked = $.inArray($(a).val(), b) >= 0
                }
            })
        });
        var Bb = /^(?:textarea|input|select)$/i,
            Cb = /^([^\.]*|)(?:\.(.+)|)$/,
            Db = /(?:^|\s)hover(\.\S+|)\b/,
            Eb = /^key/,
            Fb = /^(?:mouse|contextmenu)|click/,
            Gb = /^(?:focusinfocus|focusoutblur)$/,
            Hb = function(a) {
                return $.event.special.hover ? a : a.replace(Db, "mouseenter$1 mouseleave$1")
            };
        $.event = {
                add: function(a, c, d, e, f) {
                    var g, h, i, j, k, l, m, n, o, p, q;
                    if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = $._data(a))) return;
                    d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function(a) {
                        return typeof $ == "undefined" || !!a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
                    }, h.elem = a), c = $.trim(Hb(c)).split(" ");
                    for (j = 0; j < c.length; j++) {
                        k = Cb.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({
                            type: l,
                            origType: k[1],
                            data: e,
                            handler: d,
                            guid: d.guid,
                            selector: f,
                            needsContext: f && $.expr.match.needsContext.test(f),
                            namespace: m.join(".")
                        }, o), p = i[l];
                        if (!p) {
                            p = i[l] = [], p.delegateCount = 0;
                            if (!q.setup || q.setup.call(a, e, m, h) === !1) a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
                        }
                        q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0
                    }
                    a = null
                },
                global: {},
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
                    if (!q || !(m = q.events)) return;
                    b = $.trim(Hb(b || "")).split(" ");
                    for (f = 0; f < b.length; f++) {
                        g = Cb.exec(b[f]) || [], h = i = g[1], j = g[2];
                        if (!h) {
                            for (h in m) $.event.remove(a, h + b[f], c, d, !0);
                            continue
                        }
                        n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (l = 0; l < o.length; l++) p = o[l], (e || i === p.origType) && (!c || c.guid === p.guid) && (!j || j.test(p.namespace)) && (!d || d === p.selector || d === "**" && p.selector) && (o.splice(l--, 1), p.selector && o.delegateCount--, n.remove && n.remove.call(a, p));
                        o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h])
                    }
                    $.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
                },
                customEvent: {
                    getData: !0,
                    setData: !0,
                    changeData: !0
                },
                trigger: function(c, d, e, f) {
                    if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                        var g, h, i, j, k, l, m, n, o, p, q = c.type || c,
                            r = [];
                        if (Gb.test(q + $.event.triggered)) return;
                        q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort());
                        if ((!e || $.event.customEvent[q]) && !$.event.global[q]) return;
                        c = typeof c == "object" ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "";
                        if (!e) {
                            g = $.cache;
                            for (i in g) g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
                            return
                        }
                        c.result = b, c.target || (c.target = e), d = d != null ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {};
                        if (m.trigger && m.trigger.apply(e, d) === !1) return;
                        o = [
                            [e, m.bindType || q]
                        ];
                        if (!f && !m.noBubble && !$.isWindow(e)) {
                            p = m.delegateType || q, j = Gb.test(p + q) ? e : e.parentNode;
                            for (k = e; j; j = j.parentNode) o.push([j, p]), k = j;
                            k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
                        }
                        for (i = 0; i < o.length && !c.isPropagationStopped(); i++) j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply && n.apply(j, d) === !1 && c.preventDefault();
                        return c.type = q, !f && !c.isDefaultPrevented() && (!m._default || m._default.apply(e.ownerDocument, d) === !1) && (q !== "click" || !$.nodeName(e, "a")) && $.acceptData(e) && l && e[q] && (q !== "focus" && q !== "blur" || c.target.offsetWidth !== 0) && !$.isWindow(e) && (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, k && (e[l] = k)), c.result
                    }
                    return
                },
                dispatch: function(c) {
                    c = $.event.fix(c || a.event);
                    var d, e, f, g, h, i, j, k, l, m, n = ($._data(this, "events") || {})[c.type] || [],
                        o = n.delegateCount,
                        p = V.call(arguments),
                        q = !c.exclusive && !c.namespace,
                        r = $.event.special[c.type] || {},
                        s = [];
                    p[0] = c, c.delegateTarget = this;
                    if (r.preDispatch && r.preDispatch.call(this, c) === !1) return;
                    if (o && (!c.button || c.type !== "click"))
                        for (f = c.target; f != this; f = f.parentNode || this)
                            if (f.disabled !== !0 || c.type !== "click") {
                                h = {}, j = [];
                                for (d = 0; d < o; d++) k = n[d], l = k.selector, h[l] === b && (h[l] = k.needsContext ? $(l, this).index(f) >= 0 : $.find(l, this, null, [f]).length), h[l] && j.push(k);
                                j.length && s.push({
                                    elem: f,
                                    matches: j
                                })
                            }
                    n.length > o && s.push({
                        elem: this,
                        matches: n.slice(o)
                    });
                    for (d = 0; d < s.length && !c.isPropagationStopped(); d++) {
                        i = s[d], c.currentTarget = i.elem;
                        for (e = 0; e < i.matches.length && !c.isImmediatePropagationStopped(); e++) {
                            k = i.matches[e];
                            if (q || !c.namespace && !k.namespace || c.namespace_re && c.namespace_re.test(k.namespace)) c.data = k.data, c.handleObj = k, g = (($.event.special[k.origType] || {}).handle || k.handler).apply(i.elem, p), g !== b && (c.result = g, g === !1 && (c.preventDefault(), c.stopPropagation()))
                        }
                    }
                    return r.postDispatch && r.postDispatch.call(this, c), c.result
                },
                props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(a, b) {
                        return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(a, c) {
                        var d, e, f, g = c.button,
                            h = c.fromElement;
                        return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
                    }
                },
                fix: function(a) {
                    if (a[$.expando]) return a;
                    var b, c, d = a,
                        e = $.event.fixHooks[a.type] || {},
                        f = e.props ? this.props.concat(e.props) : this.props;
                    a = $.Event(d);
                    for (b = f.length; b;) c = f[--b], a[c] = d[c];
                    return a.target || (a.target = d.srcElement || P), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        delegateType: "focusin"
                    },
                    blur: {
                        delegateType: "focusout"
                    },
                    beforeunload: {
                        setup: function(a, b, c) {
                            $.isWindow(this) && (this.onbeforeunload = c)
                        },
                        teardown: function(a, b) {
                            this.onbeforeunload === b && (this.onbeforeunload = null)
                        }
                    }
                },
                simulate: function(a, b, c, d) {
                    var e = $.extend(new $.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                }
            }, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            } : function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c))
            }, $.Event = function(a, b) {
                if (!(this instanceof $.Event)) return new $.Event(a, b);
                a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0
            }, $.Event.prototype = {
                preventDefault: function() {
                    this.isDefaultPrevented = g;
                    var a = this.originalEvent;
                    if (!a) return;
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                },
                stopPropagation: function() {
                    this.isPropagationStopped = g;
                    var a = this.originalEvent;
                    if (!a) return;
                    a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = g, this.stopPropagation()
                },
                isDefaultPrevented: f,
                isPropagationStopped: f,
                isImmediatePropagationStopped: f
            }, $.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(a, b) {
                $.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj,
                            g = f.selector;
                        if (!e || e !== d && !$.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b;
                        return c
                    }
                }
            }), $.support.submitBubbles || ($.event.special.submit = {
                setup: function() {
                    if ($.nodeName(this, "form")) return !1;
                    $.event.add(this, "click._submit keypress._submit", function(a) {
                        var c = a.target,
                            d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
                        d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function(a) {
                            a._submit_bubble = !0
                        }), $._data(d, "_submit_attached", !0))
                    })
                },
                postDispatch: function(a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
                },
                teardown: function() {
                    if ($.nodeName(this, "form")) return !1;
                    $.event.remove(this, "._submit")
                }
            }), $.support.changeBubbles || ($.event.special.change = {
                setup: function() {
                    if (Bb.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") $.event.add(this, "propertychange._change", function(a) {
                            a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }), $.event.add(this, "click._change", function(a) {
                            this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
                        });
                        return !1
                    }
                    $.event.add(this, "beforeactivate._change", function(a) {
                        var b = a.target;
                        Bb.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function(a) {
                            this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate("change", this.parentNode, a, !0)
                        }), $._data(b, "_change_attached", !0))
                    })
                },
                handle: function(a) {
                    var b = a.target;
                    if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return $.event.remove(this, "._change"), !Bb.test(this.nodeName)
                }
            }), $.support.focusinBubbles || $.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = 0,
                    d = function(a) {
                        $.event.simulate(b, a.target, $.event.fix(a), !0)
                    };
                $.event.special[b] = {
                    setup: function() {
                        c++ === 0 && P.addEventListener(a, d, !0)
                    },
                    teardown: function() {
                        --c === 0 && P.removeEventListener(a, d, !0)
                    }
                }
            }), $.fn.extend({
                on: function(a, c, d, e, g) {
                    var h, i;
                    if (typeof a == "object") {
                        typeof c != "string" && (d = d || c, c = b);
                        for (i in a) this.on(i, c, d, a[i], g);
                        return this
                    }
                    d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
                    if (e === !1) e = f;
                    else if (!e) return this;
                    return g === 1 && (h = e, e = function(a) {
                        return $().off(a), h.apply(this, arguments)
                    }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function() {
                        $.event.add(this, a, e, d, c)
                    })
                },
                one: function(a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function(a, c, d) {
                    var e, g;
                    if (a && a.preventDefault && a.handleObj) return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
                    if (typeof a == "object") {
                        for (g in a) this.off(g, c, a[g]);
                        return this
                    }
                    if (c === !1 || typeof c == "function") d = c, c = b;
                    return d === !1 && (d = f), this.each(function() {
                        $.event.remove(this, a, d, c)
                    })
                },
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                live: function(a, b, c) {
                    return $(this.context).on(a, this.selector, b, c), this
                },
                die: function(a, b) {
                    return $(this.context).off(a, this.selector || "**", b), this
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return arguments.length === 1 ? this.off(a, "**") : this.off(b, a || "**", c)
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        $.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    if (this[0]) return $.event.trigger(a, b, this[0], !0)
                },
                toggle: function(a) {
                    var b = arguments,
                        c = a.guid || $.guid++,
                        d = 0,
                        e = function(c) {
                            var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
                            return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                        };
                    e.guid = c;
                    while (d < b.length) b[d++].guid = c;
                    return this.click(e)
                },
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                }
            }), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                $.fn[b] = function(a, c) {
                    return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }, Eb.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fb.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
            }),
            function(a, b) {
                function c(a, b, c, d) {
                    c = c || [], b = b || F;
                    var e, f, g, h, i = b.nodeType;
                    if (!a || typeof a != "string") return c;
                    if (i !== 1 && i !== 9) return [];
                    g = v(b);
                    if (!g && !d)
                        if (e = cb.exec(a))
                            if (h = e[1]) {
                                if (i === 9) {
                                    f = b.getElementById(h);
                                    if (!f || !f.parentNode) return c;
                                    if (f.id === h) return c.push(f), c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && w(b, f) && f.id === h) return c.push(f), c
                            } else {
                                if (e[2]) return K.apply(c, L.call(b.getElementsByTagName(a), 0)), c;
                                if ((h = e[3]) && ob && b.getElementsByClassName) return K.apply(c, L.call(b.getElementsByClassName(h), 0)), c
                            }
                    return p(a.replace(Z, "$1"), b, c, d, g)
                }

                function d(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return c === "input" && b.type === a
                    }
                }

                function e(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return (c === "input" || c === "button") && b.type === a
                    }
                }

                function f(a) {
                    return N(function(b) {
                        return b = +b, N(function(c, d) {
                            var e, f = a([], c.length, b),
                                g = f.length;
                            while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }

                function g(a, b, c) {
                    if (a === b) return c;
                    var d = a.nextSibling;
                    while (d) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }

                function h(a, b) {
                    var d, e, f, g, h, i, j, k = Q[D][a + " "];
                    if (k) return b ? 0 : k.slice(0);
                    h = a, i = [], j = t.preFilter;
                    while (h) {
                        if (!d || (e = _.exec(h))) e && (h = h.slice(e[0].length) || h), i.push(f = []);
                        d = !1;
                        if (e = ab.exec(h)) f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = e[0].replace(Z, " ");
                        for (g in t.filter)(e = jb[g].exec(h)) && (!j[g] || (e = j[g](e))) && (f.push(d = new E(e.shift())), h = h.slice(d.length), d.type = g, d.matches = e);
                        if (!d) break
                    }
                    return b ? h.length : h ? c.error(a) : Q(a, i).slice(0)
                }

                function i(a, b, c) {
                    var d = b.dir,
                        e = c && b.dir === "parentNode",
                        f = I++;
                    return b.first ? function(b, c, f) {
                        while (b = b[d])
                            if (e || b.nodeType === 1) return a(b, c, f)
                    } : function(b, c, g) {
                        if (!g) {
                            var h, i = H + " " + f + " ",
                                j = i + r;
                            while (b = b[d])
                                if (e || b.nodeType === 1) {
                                    if ((h = b[D]) === j) return b.sizset;
                                    if (typeof h == "string" && h.indexOf(i) === 0) {
                                        if (b.sizset) return b
                                    } else {
                                        b[D] = j;
                                        if (a(b, c, g)) return b.sizset = !0, b;
                                        b.sizset = !1
                                    }
                                }
                        } else
                            while (b = b[d])
                                if (e || b.nodeType === 1)
                                    if (a(b, c, g)) return b
                    }
                }

                function j(a) {
                    return a.length > 1 ? function(b, c, d) {
                        var e = a.length;
                        while (e--)
                            if (!a[e](b, c, d)) return !1;
                        return !0
                    } : a[0]
                }

                function k(a, b, c, d, e) {
                    var f, g = [],
                        h = 0,
                        i = a.length,
                        j = b != null;
                    for (; h < i; h++)
                        if (f = a[h])
                            if (!c || c(f, d, e)) g.push(f), j && b.push(h);
                    return g
                }

                function l(a, b, c, d, e, f) {
                    return d && !d[D] && (d = l(d)), e && !e[D] && (e = l(e, f)), N(function(f, g, h, i) {
                        var j, l, m, n = [],
                            p = [],
                            q = g.length,
                            r = f || o(b || "*", h.nodeType ? [h] : h, []),
                            s = a && (f || !b) ? k(r, n, a, h, i) : r,
                            t = c ? e || (f ? a : q || d) ? [] : g : s;
                        c && c(s, t, h, i);
                        if (d) {
                            j = k(t, p), d(j, [], h, i), l = j.length;
                            while (l--)
                                if (m = j[l]) t[p[l]] = !(s[p[l]] = m)
                        }
                        if (f) {
                            if (e || a) {
                                if (e) {
                                    j = [], l = t.length;
                                    while (l--)(m = t[l]) && j.push(s[l] = m);
                                    e(null, t = [], j, i)
                                }
                                l = t.length;
                                while (l--)(m = t[l]) && (j = e ? M.call(f, m) : n[l]) > -1 && (f[j] = !(g[j] = m))
                            }
                        } else t = k(t === g ? t.splice(q, t.length) : t), e ? e(null, g, t, i) : K.apply(g, t)
                    })
                }

                function m(a) {
                    var b, c, d, e = a.length,
                        f = t.relative[a[0].type],
                        g = f || t.relative[" "],
                        h = f ? 1 : 0,
                        k = i(function(a) {
                            return a === b
                        }, g, !0),
                        n = i(function(a) {
                            return M.call(b, a) > -1
                        }, g, !0),
                        o = [function(a, c, d) {
                            return !f && (d || c !== A) || ((b = c).nodeType ? k(a, c, d) : n(a, c, d))
                        }];
                    for (; h < e; h++)
                        if (c = t.relative[a[h].type]) o = [i(j(o), c)];
                        else {
                            c = t.filter[a[h].type].apply(null, a[h].matches);
                            if (c[D]) {
                                d = ++h;
                                for (; d < e; d++)
                                    if (t.relative[a[d].type]) break;
                                return l(h > 1 && j(o), h > 1 && a.slice(0, h - 1).join("").replace(Z, "$1"), c, h < d && m(a.slice(h, d)), d < e && m(a = a.slice(d)), d < e && a.join(""))
                            }
                            o.push(c)
                        }
                    return j(o)
                }

                function n(a, b) {
                    var d = b.length > 0,
                        e = a.length > 0,
                        f = function(g, h, i, j, l) {
                            var m, n, o, p = [],
                                q = 0,
                                s = "0",
                                u = g && [],
                                v = l != null,
                                w = A,
                                x = g || e && t.find.TAG("*", l && h.parentNode || h),
                                y = H += w == null ? 1 : Math.E;
                            v && (A = h !== F && h, r = f.el);
                            for (;
                                (m = x[s]) != null; s++) {
                                if (e && m) {
                                    for (n = 0; o = a[n]; n++)
                                        if (o(m, h, i)) {
                                            j.push(m);
                                            break
                                        }
                                    v && (H = y, r = ++f.el)
                                }
                                d && ((m = !o && m) && q--, g && u.push(m))
                            }
                            q += s;
                            if (d && s !== q) {
                                for (n = 0; o = b[n]; n++) o(u, p, h, i);
                                if (g) {
                                    if (q > 0)
                                        while (s--) !u[s] && !p[s] && (p[s] = J.call(j));
                                    p = k(p)
                                }
                                K.apply(j, p), v && !g && p.length > 0 && q + b.length > 1 && c.uniqueSort(j)
                            }
                            return v && (H = y, A = w), u
                        };
                    return f.el = 0, d ? N(f) : f
                }

                function o(a, b, d) {
                    var e = 0,
                        f = b.length;
                    for (; e < f; e++) c(a, b[e], d);
                    return d
                }

                function p(a, b, c, d, e) {
                    var f, g, i, j, k, l = h(a),
                        m = l.length;
                    if (!d && l.length === 1) {
                        g = l[0] = l[0].slice(0);
                        if (g.length > 2 && (i = g[0]).type === "ID" && b.nodeType === 9 && !e && t.relative[g[1].type]) {
                            b = t.find.ID(i.matches[0].replace(ib, ""), b, e)[0];
                            if (!b) return c;
                            a = a.slice(g.shift().length)
                        }
                        for (f = jb.POS.test(a) ? -1 : g.length - 1; f >= 0; f--) {
                            i = g[f];
                            if (t.relative[j = i.type]) break;
                            if (k = t.find[j])
                                if (d = k(i.matches[0].replace(ib, ""), eb.test(g[0].type) && b.parentNode || b, e)) {
                                    g.splice(f, 1), a = d.length && g.join("");
                                    if (!a) return K.apply(c, L.call(d, 0)), c;
                                    break
                                }
                        }
                    }
                    return x(a, l)(d, b, e, c, eb.test(a)), c
                }

                function q() {}
                var r, s, t, u, v, w, x, y, z, A, B = !0,
                    C = "undefined",
                    D = ("sizcache" + Math.random()).replace(".", ""),
                    E = String,
                    F = a.document,
                    G = F.documentElement,
                    H = 0,
                    I = 0,
                    J = [].pop,
                    K = [].push,
                    L = [].slice,
                    M = [].indexOf || function(a) {
                        var b = 0,
                            c = this.length;
                        for (; b < c; b++)
                            if (this[b] === a) return b;
                        return -1
                    },
                    N = function(a, b) {
                        return a[D] = b == null || b, a
                    },
                    O = function() {
                        var a = {},
                            b = [];
                        return N(function(c, d) {
                            return b.push(c) > t.cacheLength && delete a[b.shift()], a[c + " "] = d
                        }, a)
                    },
                    P = O(),
                    Q = O(),
                    R = O(),
                    S = "[\\x20\\t\\r\\n\\f]",
                    T = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                    U = T.replace("w", "w#"),
                    V = "([*^$|!~]?=)",
                    W = "\\[" + S + "*(" + T + ")" + S + "*(?:" + V + S + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + U + ")|)|)" + S + "*\\]",
                    X = ":(" + T + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + W + ")|[^:]|\\\\.)*|.*))\\)|)",
                    Y = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + S + "*((?:-\\d)?\\d*)" + S + "*\\)|)(?=[^-]|$)",
                    Z = new RegExp("^" + S + "+|((?:^|[^\\\\])(?:\\\\.)*)" + S + "+$", "g"),
                    _ = new RegExp("^" + S + "*," + S + "*"),
                    ab = new RegExp("^" + S + "*([\\x20\\t\\r\\n\\f>+~])" + S + "*"),
                    bb = new RegExp(X),
                    cb = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                    db = /^:not/,
                    eb = /[\x20\t\r\n\f]*[+~]/,
                    fb = /:not\($/,
                    gb = /h\d/i,
                    hb = /input|select|textarea|button/i,
                    ib = /\\(?!\\)/g,
                    jb = {
                        ID: new RegExp("^#(" + T + ")"),
                        CLASS: new RegExp("^\\.(" + T + ")"),
                        NAME: new RegExp("^\\[name=['\"]?(" + T + ")['\"]?\\]"),
                        TAG: new RegExp("^(" + T.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + W),
                        PSEUDO: new RegExp("^" + X),
                        POS: new RegExp(Y, "i"),
                        CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + S + "*(even|odd|(([+-]|)(\\d*)n|)" + S + "*(?:([+-]|)" + S + "*(\\d+)|))" + S + "*\\)|)", "i"),
                        needsContext: new RegExp("^" + S + "*[>+~]|" + Y, "i")
                    },
                    kb = function(a) {
                        var b = F.createElement("div");
                        try {
                            return a(b)
                        } catch (c) {
                            return !1
                        } finally {
                            b = null
                        }
                    },
                    lb = kb(function(a) {
                        return a.appendChild(F.createComment("")), !a.getElementsByTagName("*").length
                    }),
                    mb = kb(function(a) {
                        return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== C && a.firstChild.getAttribute("href") === "#"
                    }),
                    nb = kb(function(a) {
                        a.innerHTML = "<select></select>";
                        var b = typeof a.lastChild.getAttribute("multiple");
                        return b !== "boolean" && b !== "string"
                    }),
                    ob = kb(function(a) {
                        return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || !a.getElementsByClassName("e").length ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length === 2)
                    }),
                    pb = kb(function(a) {
                        a.id = D + 0, a.innerHTML = "<a name='" + D + "'></a><div name='" + D + "'></div>", G.insertBefore(a, G.firstChild);
                        var b = F.getElementsByName && F.getElementsByName(D).length === 2 + F.getElementsByName(D + 0).length;
                        return s = !F.getElementById(D), G.removeChild(a), b
                    });
                try {
                    L.call(G.childNodes, 0)[0].nodeType
                } catch (qb) {
                    L = function(a) {
                        var b, c = [];
                        for (; b = this[a]; a++) c.push(b);
                        return c
                    }
                }
                c.matches = function(a, b) {
                    return c(a, null, null, b)
                }, c.matchesSelector = function(a, b) {
                    return c(b, null, null, [a]).length > 0
                }, u = c.getText = function(a) {
                    var b, c = "",
                        d = 0,
                        e = a.nodeType;
                    if (e) {
                        if (e === 1 || e === 9 || e === 11) {
                            if (typeof a.textContent == "string") return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling) c += u(a)
                        } else if (e === 3 || e === 4) return a.nodeValue
                    } else
                        for (; b = a[d]; d++) c += u(b);
                    return c
                }, v = c.isXML = function(a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? b.nodeName !== "HTML" : !1
                }, w = c.contains = G.contains ? function(a, b) {
                    var c = a.nodeType === 9 ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d))
                } : G.compareDocumentPosition ? function(a, b) {
                    return b && !!(a.compareDocumentPosition(b) & 16)
                } : function(a, b) {
                    while (b = b.parentNode)
                        if (b === a) return !0;
                    return !1
                }, c.attr = function(a, b) {
                    var c, d = v(a);
                    return d || (b = b.toLowerCase()), (c = t.attrHandle[b]) ? c(a) : d || nb ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null)
                }, t = c.selectors = {
                    cacheLength: 50,
                    createPseudo: N,
                    match: jb,
                    attrHandle: mb ? {} : {
                        href: function(a) {
                            return a.getAttribute("href", 2)
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    },
                    find: {
                        ID: s ? function(a, b, c) {
                            if (typeof b.getElementById !== C && !c) {
                                var d = b.getElementById(a);
                                return d && d.parentNode ? [d] : []
                            }
                        } : function(a, c, d) {
                            if (typeof c.getElementById !== C && !d) {
                                var e = c.getElementById(a);
                                return e ? e.id === a || typeof e.getAttributeNode !== C && e.getAttributeNode("id").value === a ? [e] : b : []
                            }
                        },
                        TAG: lb ? function(a, b) {
                            if (typeof b.getElementsByTagName !== C) return b.getElementsByTagName(a)
                        } : function(a, b) {
                            var c = b.getElementsByTagName(a);
                            if (a === "*") {
                                var d, e = [],
                                    f = 0;
                                for (; d = c[f]; f++) d.nodeType === 1 && e.push(d);
                                return e
                            }
                            return c
                        },
                        NAME: pb && function(a, b) {
                            if (typeof b.getElementsByName !== C) return b.getElementsByName(name)
                        },
                        CLASS: ob && function(a, b, c) {
                            if (typeof b.getElementsByClassName !== C && !c) return b.getElementsByClassName(a)
                        }
                    },
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(a) {
                            return a[1] = a[1].replace(ib, ""), a[3] = (a[4] || a[5] || "").replace(ib, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                        },
                        CHILD: function(a) {
                            return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || c.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && c.error(a[0]), a
                        },
                        PSEUDO: function(a) {
                            var b, c;
                            if (jb.CHILD.test(a[0])) return null;
                            if (a[3]) a[2] = a[3];
                            else if (b = a[4]) bb.test(b) && (c = h(b, !0)) && (c = b.indexOf(")", b.length - c) - b.length) && (b = b.slice(0, c), a[0] = a[0].slice(0, c)), a[2] = b;
                            return a.slice(0, 3)
                        }
                    },
                    filter: {
                        ID: s ? function(a) {
                            return a = a.replace(ib, ""),
                                function(b) {
                                    return b.getAttribute("id") === a
                                }
                        } : function(a) {
                            return a = a.replace(ib, ""),
                                function(b) {
                                    var c = typeof b.getAttributeNode !== C && b.getAttributeNode("id");
                                    return c && c.value === a
                                }
                        },
                        TAG: function(a) {
                            return a === "*" ? function() {
                                return !0
                            } : (a = a.replace(ib, "").toLowerCase(), function(b) {
                                return b.nodeName && b.nodeName.toLowerCase() === a
                            })
                        },
                        CLASS: function(a) {
                            var b = P[D][a + " "];
                            return b || (b = new RegExp("(^|" + S + ")" + a + "(" + S + "|$)")) && P(a, function(a) {
                                return b.test(a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(a, b, d) {
                            return function(e, f) {
                                var g = c.attr(e, a);
                                return g == null ? b === "!=" : b ? (g += "", b === "=" ? g === d : b === "!=" ? g !== d : b === "^=" ? d && g.indexOf(d) === 0 : b === "*=" ? d && g.indexOf(d) > -1 : b === "$=" ? d && g.substr(g.length - d.length) === d : b === "~=" ? (" " + g + " ").indexOf(d) > -1 : b === "|=" ? g === d || g.substr(0, d.length + 1) === d + "-" : !1) : !0
                            }
                        },
                        CHILD: function(a, b, c, d) {
                            return a === "nth" ? function(a) {
                                var b, e, f = a.parentNode;
                                if (c === 1 && d === 0) return !0;
                                if (f) {
                                    e = 0;
                                    for (b = f.firstChild; b; b = b.nextSibling)
                                        if (b.nodeType === 1) {
                                            e++;
                                            if (a === b) break
                                        }
                                }
                                return e -= d, e === c || e % c === 0 && e / c >= 0
                            } : function(b) {
                                var c = b;
                                switch (a) {
                                    case "only":
                                    case "first":
                                        while (c = c.previousSibling)
                                            if (c.nodeType === 1) return !1;
                                        if (a === "first") return !0;
                                        c = b;
                                    case "last":
                                        while (c = c.nextSibling)
                                            if (c.nodeType === 1) return !1;
                                        return !0
                                }
                            }
                        },
                        PSEUDO: function(a, b) {
                            var d, e = t.pseudos[a] || t.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                            return e[D] ? e(b) : e.length > 1 ? (d = [a, a, "", b], t.setFilters.hasOwnProperty(a.toLowerCase()) ? N(function(a, c) {
                                var d, f = e(a, b),
                                    g = f.length;
                                while (g--) d = M.call(a, f[g]), a[d] = !(c[d] = f[g])
                            }) : function(a) {
                                return e(a, 0, d)
                            }) : e
                        }
                    },
                    pseudos: {
                        not: N(function(a) {
                            var b = [],
                                c = [],
                                d = x(a.replace(Z, "$1"));
                            return d[D] ? N(function(a, b, c, e) {
                                var f, g = d(a, null, e, []),
                                    h = a.length;
                                while (h--)
                                    if (f = g[h]) a[h] = !(b[h] = f)
                            }) : function(a, e, f) {
                                return b[0] = a, d(b, null, f, c), !c.pop()
                            }
                        }),
                        has: N(function(a) {
                            return function(b) {
                                return c(a, b).length > 0
                            }
                        }),
                        contains: N(function(a) {
                            return function(b) {
                                return (b.textContent || b.innerText || u(b)).indexOf(a) > -1
                            }
                        }),
                        enabled: function(a) {
                            return a.disabled === !1
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && !!a.checked || b === "option" && !!a.selected
                        },
                        selected: function(a) {
                            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                        },
                        parent: function(a) {
                            return !t.pseudos.empty(a)
                        },
                        empty: function(a) {
                            var b;
                            a = a.firstChild;
                            while (a) {
                                if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return !1;
                                a = a.nextSibling
                            }
                            return !0
                        },
                        header: function(a) {
                            return gb.test(a.nodeName)
                        },
                        text: function(a) {
                            var b, c;
                            return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b)
                        },
                        radio: d("radio"),
                        checkbox: d("checkbox"),
                        file: d("file"),
                        password: d("password"),
                        image: d("image"),
                        submit: e("submit"),
                        reset: e("reset"),
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && a.type === "button" || b === "button"
                        },
                        input: function(a) {
                            return hb.test(a.nodeName)
                        },
                        focus: function(a) {
                            var b = a.ownerDocument;
                            return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        active: function(a) {
                            return a === a.ownerDocument.activeElement
                        },
                        first: f(function() {
                            return [0]
                        }),
                        last: f(function(a, b) {
                            return [b - 1]
                        }),
                        eq: f(function(a, b, c) {
                            return [c < 0 ? c + b : c]
                        }),
                        even: f(function(a, b) {
                            for (var c = 0; c < b; c += 2) a.push(c);
                            return a
                        }),
                        odd: f(function(a, b) {
                            for (var c = 1; c < b; c += 2) a.push(c);
                            return a
                        }),
                        lt: f(function(a, b, c) {
                            for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                            return a
                        }),
                        gt: f(function(a, b, c) {
                            for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                            return a
                        })
                    }
                }, y = G.compareDocumentPosition ? function(a, b) {
                    return a === b ? (z = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
                } : function(a, b) {
                    if (a === b) return z = !0, 0;
                    if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                    var c, d, e = [],
                        f = [],
                        h = a.parentNode,
                        i = b.parentNode,
                        j = h;
                    if (h === i) return g(a, b);
                    if (!h) return -1;
                    if (!i) return 1;
                    while (j) e.unshift(j), j = j.parentNode;
                    j = i;
                    while (j) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; k < c && k < d; k++)
                        if (e[k] !== f[k]) return g(e[k], f[k]);
                    return k === c ? g(a, f[k], -1) : g(e[k], b, 1)
                }, [0, 0].sort(y), B = !z, c.uniqueSort = function(a) {
                    var b, c = [],
                        d = 1,
                        e = 0;
                    z = B, a.sort(y);
                    if (z) {
                        for (; b = a[d]; d++) b === a[d - 1] && (e = c.push(d));
                        while (e--) a.splice(c[e], 1)
                    }
                    return a
                }, c.error = function(a) {
                    throw new Error("Syntax error, unrecognized expression: " + a)
                }, x = c.compile = function(a, b) {
                    var c, d = [],
                        e = [],
                        f = R[D][a + " "];
                    if (!f) {
                        b || (b = h(a)), c = b.length;
                        while (c--) f = m(b[c]), f[D] ? d.push(f) : e.push(f);
                        f = R(a, n(e, d))
                    }
                    return f
                }, F.querySelectorAll && function() {
                    var a, b = p,
                        d = /'|\\/g,
                        e = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                        f = [":focus"],
                        g = [":active"],
                        i = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector;
                    kb(function(a) {
                        a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || f.push("\\[" + S + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || f.push(":checked")
                    }), kb(function(a) {
                        a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && f.push("[*^$]=" + S + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'/>", a.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled")
                    }), f = new RegExp(f.join("|")), p = function(a, c, e, g, i) {
                        if (!g && !i && !f.test(a)) {
                            var j, k, l = !0,
                                m = D,
                                n = c,
                                o = c.nodeType === 9 && a;
                            if (c.nodeType === 1 && c.nodeName.toLowerCase() !== "object") {
                                j = h(a), (l = c.getAttribute("id")) ? m = l.replace(d, "\\$&") : c.setAttribute("id", m), m = "[id='" + m + "'] ", k = j.length;
                                while (k--) j[k] = m + j[k].join("");
                                n = eb.test(a) && c.parentNode || c, o = j.join(",")
                            }
                            if (o) try {
                                return K.apply(e, L.call(n.querySelectorAll(o), 0)), e
                            } catch (p) {} finally {
                                l || c.removeAttribute("id")
                            }
                        }
                        return b(a, c, e, g, i)
                    }, i && (kb(function(b) {
                        a = i.call(b, "div");
                        try {
                            i.call(b, "[test!='']:sizzle"), g.push("!=", X)
                        } catch (c) {}
                    }), g = new RegExp(g.join("|")), c.matchesSelector = function(b, d) {
                        d = d.replace(e, "='$1']");
                        if (!v(b) && !g.test(d) && !f.test(d)) try {
                            var h = i.call(b, d);
                            if (h || a || b.document && b.document.nodeType !== 11) return h
                        } catch (j) {}
                        return c(d, null, null, [b]).length > 0
                    })
                }(), t.pseudos.nth = t.pseudos.eq, t.filters = q.prototype = t.pseudos, t.setFilters = new q, c.attr = $.attr, $.find = c, $.expr = c.selectors, $.expr[":"] = $.expr.pseudos, $.unique = c.uniqueSort, $.text = c.getText, $.isXMLDoc = c.isXML, $.contains = c.contains
            }(a);
        var Ib = /Until$/,
            Jb = /^(?:parents|prev(?:Until|All))/,
            Kb = /^.[^:#\[\.,]*$/,
            Lb = $.expr.match.needsContext,
            Mb = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        $.fn.extend({
            find: function(a) {
                var b, c, d, e, f, g, h = this;
                if (typeof a != "string") return $(a).filter(function() {
                    for (b = 0, c = h.length; b < c; b++)
                        if ($.contains(h[b], this)) return !0
                });
                g = this.pushStack("", "find", a);
                for (b = 0, c = this.length; b < c; b++) {
                    d = g.length, $.find(a, this[b], g);
                    if (b > 0)
                        for (e = d; e < g.length; e++)
                            for (f = 0; f < d; f++)
                                if (g[f] === g[e]) {
                                    g.splice(e--, 1);
                                    break
                                }
                }
                return g
            },
            has: function(a) {
                var b, c = $(a, this),
                    d = c.length;
                return this.filter(function() {
                    for (b = 0; b < d; b++)
                        if ($.contains(this, c[b])) return !0
                })
            },
            not: function(a) {
                return this.pushStack(j(this, a, !1), "not", a)
            },
            filter: function(a) {
                return this.pushStack(j(this, a, !0), "filter", a)
            },
            is: function(a) {
                return !!a && (typeof a == "string" ? Lb.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function(a, b) {
                var c, d = 0,
                    e = this.length,
                    f = [],
                    g = Lb.test(a) || typeof a != "string" ? $(a, b || this.context) : 0;
                for (; d < e; d++) {
                    c = this[d];
                    while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                        if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                            f.push(c);
                            break
                        }
                        c = c.parentNode
                    }
                }
                return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
            },
            index: function(a) {
                return a ? typeof a == "string" ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },
            add: function(a, b) {
                var c = typeof a == "string" ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a),
                    d = $.merge(this.get(), c);
                return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
            },
            addBack: function(a) {
                return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
            }
        }), $.fn.andSelf = $.fn.addBack, $.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && b.nodeType !== 11 ? b : null
            },
            parents: function(a) {
                return $.dir(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return $.dir(a, "parentNode", c)
            },
            next: function(a) {
                return i(a, "nextSibling")
            },
            prev: function(a) {
                return i(a, "previousSibling")
            },
            nextAll: function(a) {
                return $.dir(a, "nextSibling")
            },
            prevAll: function(a) {
                return $.dir(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return $.dir(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return $.dir(a, "previousSibling", c)
            },
            siblings: function(a) {
                return $.sibling((a.parentNode || {}).firstChild, a)
            },
            children: function(a) {
                return $.sibling(a.firstChild)
            },
            contents: function(a) {
                return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
            }
        }, function(a, b) {
            $.fn[a] = function(c, d) {
                var e = $.map(this, b, c);
                return Ib.test(a) || (d = c), d && typeof d == "string" && (e = $.filter(d, e)), e = this.length > 1 && !Mb[a] ? $.unique(e) : e, this.length > 1 && Jb.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
            }
        }), $.extend({
            filter: function(a, b, c) {
                return c && (a = ":not(" + a + ")"), b.length === 1 ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
            },
            dir: function(a, c, d) {
                var e = [],
                    f = a[c];
                while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !$(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c];
                return e
            },
            sibling: function(a, b) {
                var c = [];
                for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
                return c
            }
        });
        var Nb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Ob = / jQuery\d+="(?:null|\d+)"/g,
            Pb = /^\s+/,
            Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Rb = /<([\w:]+)/,
            Sb = /<tbody/i,
            Tb = /<|&#?\w+;/,
            Ub = /<(?:script|style|link)/i,
            Vb = /<(?:script|object|embed|option|style)/i,
            Wb = new RegExp("<(?:" + Nb + ")[\\s/>]", "i"),
            Xb = /^(?:checkbox|radio)$/,
            Yb = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Zb = /\/(java|ecma)script/i,
            $b = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
            _b = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            },
            ac = k(P),
            bc = ac.appendChild(P.createElement("div"));
        _b.optgroup = _b.option, _b.tbody = _b.tfoot = _b.colgroup = _b.caption = _b.thead, _b.th = _b.td, $.support.htmlSerialize || (_b._default = [1, "X<div>", "</div>"]), $.fn.extend({
                text: function(a) {
                    return $.access(this, function(a) {
                        return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
                    }, null, a, arguments.length)
                },
                wrapAll: function(a) {
                    if ($.isFunction(a)) return this.each(function(b) {
                        $(this).wrapAll(a.call(this, b))
                    });
                    if (this[0]) {
                        var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                            var a = this;
                            while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                            return a
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    return $.isFunction(a) ? this.each(function(b) {
                        $(this).wrapInner(a.call(this, b))
                    }) : this.each(function() {
                        var b = $(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = $.isFunction(a);
                    return this.each(function(c) {
                        $(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
                    }).end()
                },
                append: function() {
                    return this.domManip(arguments, !0, function(a) {
                        (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, !0, function(a) {
                        (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
                    })
                },
                before: function() {
                    if (!h(this[0])) return this.domManip(arguments, !1, function(a) {
                        this.parentNode.insertBefore(a, this)
                    });
                    if (arguments.length) {
                        var a = $.clean(arguments);
                        return this.pushStack($.merge(a, this), "before", this.selector)
                    }
                },
                after: function() {
                    if (!h(this[0])) return this.domManip(arguments, !1, function(a) {
                        this.parentNode.insertBefore(a, this.nextSibling)
                    });
                    if (arguments.length) {
                        var a = $.clean(arguments);
                        return this.pushStack($.merge(this, a), "after", this.selector)
                    }
                },
                remove: function(a, b) {
                    var c, d = 0;
                    for (;
                        (c = this[d]) != null; d++)
                        if (!a || $.filter(a, [c]).length) !b && c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c);
                    return this
                },
                empty: function() {
                    var a, b = 0;
                    for (;
                        (a = this[b]) != null; b++) {
                        a.nodeType === 1 && $.cleanData(a.getElementsByTagName("*"));
                        while (a.firstChild) a.removeChild(a.firstChild)
                    }
                    return this
                },
                clone: function(a, b) {
                    return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                        return $.clone(this, a, b)
                    })
                },
                html: function(a) {
                    return $.access(this, function(a) {
                        var c = this[0] || {},
                            d = 0,
                            e = this.length;
                        if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(Ob, "") : b;
                        if (typeof a == "string" && !Ub.test(a) && ($.support.htmlSerialize || !Wb.test(a)) && ($.support.leadingWhitespace || !Pb.test(a)) && !_b[(Rb.exec(a) || ["", ""])[1].toLowerCase()]) {
                            a = a.replace(Qb, "<$1></$2>");
                            try {
                                for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                                c = 0
                            } catch (f) {}
                        }
                        c && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function(a) {
                    return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function(b) {
                        var c = $(this),
                            d = c.html();
                        c.replaceWith(a.call(this, b, d))
                    }) : (typeof a != "string" && (a = $(a).detach()), this.each(function() {
                        var b = this.nextSibling,
                            c = this.parentNode;
                        $(this).remove(), b ? $(b).before(a) : $(c).append(a)
                    }))
                },
                detach: function(a) {
                    return this.remove(a, !0)
                },
                domManip: function(a, c, d) {
                    a = [].concat.apply([], a);
                    var e, f, g, h, i = 0,
                        j = a[0],
                        k = [],
                        m = this.length;
                    if (!$.support.checkClone && m > 1 && typeof j == "string" && Yb.test(j)) return this.each(function() {
                        $(this).domManip(a, c, d)
                    });
                    if ($.isFunction(j)) return this.each(function(e) {
                        var f = $(this);
                        a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
                    });
                    if (this[0]) {
                        e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f);
                        if (f) {
                            c = c && $.nodeName(f, "tr");
                            for (h = e.cacheable || m - 1; i < m; i++) d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0))
                        }
                        g = f = null, k.length && $.each(k, function(a, b) {
                            b.src ? $.ajax ? $.ajax({
                                url: b.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($b, "")), b.parentNode && b.parentNode.removeChild(b)
                        })
                    }
                    return this
                }
            }), $.buildFragment = function(a, c, d) {
                var e, f, g, h = a[0];
                return c = c || P, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, a.length === 1 && typeof h == "string" && h.length < 512 && c === P && h.charAt(0) === "<" && !Vb.test(h) && ($.support.checkClone || !Yb.test(h)) && ($.support.html5Clone || !Wb.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {
                    fragment: e,
                    cacheable: f
                }
            }, $.fragments = {}, $.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, b) {
                $.fn[a] = function(c) {
                    var d, e = 0,
                        f = [],
                        g = $(c),
                        h = g.length,
                        i = this.length === 1 && this[0].parentNode;
                    if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) return g[b](this[0]), this;
                    for (; e < h; e++) d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
                    return this.pushStack(f, a, g.selector)
                }
            }), $.extend({
                clone: function(a, b, c) {
                    var d, e, f, g;
                    $.support.html5Clone || $.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bc.innerHTML = a.outerHTML, bc.removeChild(g = bc.firstChild));
                    if ((!$.support.noCloneEvent || !$.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !$.isXMLDoc(a)) {
                        n(a, g), d = o(a), e = o(g);
                        for (f = 0; d[f]; ++f) e[f] && n(d[f], e[f])
                    }
                    if (b) {
                        m(a, g);
                        if (c) {
                            d = o(a), e = o(g);
                            for (f = 0; d[f]; ++f) m(d[f], e[f])
                        }
                    }
                    return d = e = null, g
                },
                clean: function(a, b, c, d) {
                    var e, f, g, h, i, j, l, m, n, o, q, r, s = b === P && ac,
                        t = [];
                    if (!b || typeof b.createDocumentFragment == "undefined") b = P;
                    for (e = 0;
                        (g = a[e]) != null; e++) {
                        typeof g == "number" && (g += "");
                        if (!g) continue;
                        if (typeof g == "string")
                            if (!Tb.test(g)) g = b.createTextNode(g);
                            else {
                                s = s || k(b), l = b.createElement("div"), s.appendChild(l), g = g.replace(Qb, "<$1></$2>"), h = (Rb.exec(g) || ["", ""])[1].toLowerCase(), i = _b[h] || _b._default, j = i[0], l.innerHTML = i[1] + g + i[2];
                                while (j--) l = l.lastChild;
                                if (!$.support.tbody) {
                                    m = Sb.test(g), n = h === "table" && !m ? l.firstChild && l.firstChild.childNodes : i[1] === "<table>" && !m ? l.childNodes : [];
                                    for (f = n.length - 1; f >= 0; --f) $.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f])
                                }!$.support.leadingWhitespace && Pb.test(g) && l.insertBefore(b.createTextNode(Pb.exec(g)[0]), l.firstChild), g = l.childNodes, l.parentNode.removeChild(l)
                            }
                        g.nodeType ? t.push(g) : $.merge(t, g)
                    }
                    l && (g = l = s = null);
                    if (!$.support.appendChecked)
                        for (e = 0;
                            (g = t[e]) != null; e++) $.nodeName(g, "input") ? p(g) : typeof g.getElementsByTagName != "undefined" && $.grep(g.getElementsByTagName("input"), p);
                    if (c) {
                        q = function(a) {
                            if (!a.type || Zb.test(a.type)) return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
                        };
                        for (e = 0;
                            (g = t[e]) != null; e++)
                            if (!$.nodeName(g, "script") || !q(g)) c.appendChild(g), typeof g.getElementsByTagName != "undefined" && (r = $.grep($.merge([], g.getElementsByTagName("script")), q), t.splice.apply(t, [e + 1, 0].concat(r)), e += r.length)
                    }
                    return t
                },
                cleanData: function(a, b) {
                    var c, d, e, f, g = 0,
                        h = $.expando,
                        i = $.cache,
                        j = $.support.deleteExpando,
                        k = $.event.special;
                    for (;
                        (e = a[g]) != null; g++)
                        if (b || $.acceptData(e)) {
                            d = e[h], c = d && i[d];
                            if (c) {
                                if (c.events)
                                    for (f in c.events) k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
                                i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
                            }
                        }
                }
            }),
            function() {
                var a, b;
                $.uaMatch = function(a) {
                    a = a.toLowerCase();
                    var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0), $.browser = b, $.sub = function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(c, d) {
                        return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(P);
                    return a
                }
            }();
        var cc, dc, ec, fc = /alpha\([^)]*\)/i,
            gc = /opacity=([^)]*)/,
            hc = /^(top|right|bottom|left)$/,
            ic = /^(none|table(?!-c[ea]).+)/,
            jc = /^margin/,
            kc = new RegExp("^(" + _ + ")(.*)$", "i"),
            lc = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"),
            mc = new RegExp("^([-+])=(" + _ + ")", "i"),
            nc = {
                BODY: "block"
            },
            oc = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            pc = {
                letterSpacing: 0,
                fontWeight: 400
            },
            qc = ["Top", "Right", "Bottom", "Left"],
            rc = ["Webkit", "O", "Moz", "ms"],
            sc = $.fn.toggle;
        $.fn.extend({
            css: function(a, c) {
                return $.access(this, function(a, c, d) {
                    return d !== b ? $.style(a, c, d) : $.css(a, c)
                }, a, c, arguments.length > 1)
            },
            show: function() {
                return s(this, !0)
            },
            hide: function() {
                return s(this)
            },
            toggle: function(a, b) {
                var c = typeof a == "boolean";
                return $.isFunction(a) && $.isFunction(b) ? sc.apply(this, arguments) : this.each(function() {
                    (c ? a : r(this)) ? $(this).show(): $(this).hide()
                })
            }
        }), $.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = cc(a, "opacity");
                            return c === "" ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": $.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(a, c, d, e) {
                if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
                var f, g, h, i = $.camelCase(c),
                    j = a.style;
                c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i];
                if (d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                g = typeof d, g === "string" && (f = mc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number");
                if (d == null || g === "number" && isNaN(d)) return;
                g === "number" && !$.cssNumber[i] && (d += "px");
                if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) try {
                    j[c] = d
                } catch (k) {}
            },
            css: function(a, c, d, e) {
                var f, g, h, i = $.camelCase(c);
                return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), f === "normal" && c in pc && (f = pc[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
            },
            swap: function(a, b, c) {
                var d, e, f = {};
                for (e in b) f[e] = a.style[e], a.style[e] = b[e];
                d = c.call(a);
                for (e in b) a.style[e] = f[e];
                return d
            }
        }), a.getComputedStyle ? cc = function(b, c) {
            var d, e, f, g, h = a.getComputedStyle(b, null),
                i = b.style;
            return h && (d = h.getPropertyValue(c) || h[c], d === "" && !$.contains(b.ownerDocument, b) && (d = $.style(b, c)), lc.test(d) && jc.test(c) && (e = i.width, f = i.minWidth, g = i.maxWidth, i.minWidth = i.maxWidth = i.width = d, d = h.width, i.width = e, i.minWidth = f, i.maxWidth = g)), d
        } : P.documentElement.currentStyle && (cc = function(a, b) {
            var c, d, e = a.currentStyle && a.currentStyle[b],
                f = a.style;
            return e == null && f && f[b] && (e = f[b]), lc.test(e) && !hc.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e
        }), $.each(["height", "width"], function(a, b) {
            $.cssHooks[b] = {
                get: function(a, c, d) {
                    if (c) return a.offsetWidth === 0 && ic.test(cc(a, "display")) ? $.swap(a, oc, function() {
                        return v(a, b, d)
                    }) : v(a, b, d)
                },
                set: function(a, c, d) {
                    return t(a, c, d ? u(a, b, d, $.support.boxSizing && $.css(a, "boxSizing") === "border-box") : 0)
                }
            }
        }), $.support.opacity || ($.cssHooks.opacity = {
            get: function(a, b) {
                return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            },
            set: function(a, b) {
                var c = a.style,
                    d = a.currentStyle,
                    e = $.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && $.trim(f.replace(fc, "")) === "" && c.removeAttribute) {
                    c.removeAttribute("filter");
                    if (d && !d.filter) return
                }
                c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e
            }
        }), $(function() {
            $.support.reliableMarginRight || ($.cssHooks.marginRight = {
                get: function(a, b) {
                    return $.swap(a, {
                        display: "inline-block"
                    }, function() {
                        if (b) return cc(a, "marginRight")
                    })
                }
            }), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function(a, b) {
                $.cssHooks[b] = {
                    get: function(a, c) {
                        if (c) {
                            var d = cc(a, b);
                            return lc.test(d) ? $(a).position()[b] + "px" : d
                        }
                    }
                }
            })
        }), $.expr && $.expr.filters && ($.expr.filters.hidden = function(a) {
            return a.offsetWidth === 0 && a.offsetHeight === 0 || !$.support.reliableHiddenOffsets && (a.style && a.style.display || cc(a, "display")) === "none"
        }, $.expr.filters.visible = function(a) {
            return !$.expr.filters.hidden(a)
        }), $.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(a, b) {
            $.cssHooks[a + b] = {
                expand: function(c) {
                    var d, e = typeof c == "string" ? c.split(" ") : [c],
                        f = {};
                    for (d = 0; d < 4; d++) f[a + qc[d] + b] = e[d] || e[d - 2] || e[0];
                    return f
                }
            }, jc.test(a) || ($.cssHooks[a + b].set = t)
        });
        var tc = /%20/g,
            uc = /\[\]$/,
            vc = /\r?\n/g,
            wc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
            xc = /^(?:select|textarea)/i;
        $.fn.extend({
            serialize: function() {
                return $.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? $.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || xc.test(this.nodeName) || wc.test(this.type))
                }).map(function(a, b) {
                    var c = $(this).val();
                    return c == null ? null : $.isArray(c) ? $.map(c, function(a, c) {
                        return {
                            name: b.name,
                            value: a.replace(vc, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(vc, "\r\n")
                    }
                }).get()
            }
        }), $.param = function(a, c) {
            var d, e = [],
                f = function(a, b) {
                    b = $.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional);
            if ($.isArray(a) || a.jquery && !$.isPlainObject(a)) $.each(a, function() {
                f(this.name, this.value)
            });
            else
                for (d in a) x(d, a[d], c, f);
            return e.join("&").replace(tc, "+")
        };
        var yc, zc, Ac = /#.*$/,
            Bc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            Cc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
            Dc = /^(?:GET|HEAD)$/,
            Ec = /^\/\//,
            Fc = /\?/,
            Gc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            Hc = /([?&])_=[^&]*/,
            Ic = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Jc = $.fn.load,
            Kc = {},
            Lc = {},
            Mc = ["*/"] + ["*"];
        try {
            zc = Q.href
        } catch (Nc) {
            zc = P.createElement("a"), zc.href = "", zc = zc.href
        }
        yc = Ic.exec(zc.toLowerCase()) || [], $.fn.load = function(a, c, d) {
            if (typeof a != "string" && Jc) return Jc.apply(this, arguments);
            if (!this.length) return this;
            var e, f, g, h = this,
                i = a.indexOf(" ");
            return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : c && typeof c == "object" && (f = "POST"), $.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: c,
                complete: function(a, b) {
                    d && h.each(d, g || [a.responseText, b, a])
                }
            }).done(function(a) {
                g = arguments, h.html(e ? $("<div>").append(a.replace(Gc, "")).find(e) : a)
            }), this
        }, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
            $.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), $.each(["get", "post"], function(a, c) {
            $[c] = function(a, d, e, f) {
                return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({
                    type: c,
                    url: a,
                    data: d,
                    success: e,
                    dataType: f
                })
            }
        }), $.extend({
            getScript: function(a, c) {
                return $.get(a, b, c, "script")
            },
            getJSON: function(a, b, c) {
                return $.get(a, b, c, "json")
            },
            ajaxSetup: function(a, b) {
                return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
            },
            ajaxSettings: {
                url: zc,
                isLocal: Cc.test(yc[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": Mc
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": a.String,
                    "text html": !0,
                    "text json": $.parseJSON,
                    "text xml": $.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: y(Kc),
            ajaxTransport: y(Lc),
            ajax: function(a, c) {
                function d(a, c, d, g) {
                    var j, l, s, t, v, x = c;
                    if (u === 2) return;
                    u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d));
                    if (a >= 200 && a < 300 || a === 304) m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), a === 304 ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s);
                    else {
                        s = x;
                        if (!x || a) x = "error", a < 0 && (a = 0)
                    }
                    w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop"))
                }
                typeof a == "object" && (c = a, a = b), c = c || {};
                var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c),
                    n = m.context || m,
                    o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event,
                    p = $.Deferred(),
                    q = $.Callbacks("once memory"),
                    r = m.statusCode || {},
                    s = {},
                    t = {},
                    u = 0,
                    v = "canceled",
                    w = {
                        readyState: 0,
                        setRequestHeader: function(a, b) {
                            if (!u) {
                                var c = a.toLowerCase();
                                a = t[c] = t[c] || a, s[a] = b
                            }
                            return this
                        },
                        getAllResponseHeaders: function() {
                            return u === 2 ? f : null
                        },
                        getResponseHeader: function(a) {
                            var c;
                            if (u === 2) {
                                if (!g) {
                                    g = {};
                                    while (c = Bc.exec(f)) g[c[1].toLowerCase()] = c[2]
                                }
                                c = g[a.toLowerCase()]
                            }
                            return c === b ? null : c
                        },
                        overrideMimeType: function(a) {
                            return u || (m.mimeType = a), this
                        },
                        abort: function(a) {
                            return a = a || v, h && h.abort(a), d(0, a), this
                        }
                    };
                p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function(a) {
                    if (a) {
                        var b;
                        if (u < 2)
                            for (b in a) r[b] = [r[b], a[b]];
                        else b = a[w.status], w.always(b)
                    }
                    return this
                }, m.url = ((a || m.url) + "").replace(Ac, "").replace(Ec, yc[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(bb), m.crossDomain == null && (j = Ic.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] === yc[1] && j[2] === yc[2] && (j[3] || (j[1] === "http:" ? 80 : 443)) == (yc[3] || (yc[1] === "http:" ? 80 : 443)))), m.data && m.processData && typeof m.data != "string" && (m.data = $.param(m.data, m.traditional)), z(Kc, m, c, w);
                if (u === 2) return w;
                k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Dc.test(m.type), k && $.active++ === 0 && $.event.trigger("ajaxStart");
                if (!m.hasContent) {
                    m.data && (m.url += (Fc.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url;
                    if (m.cache === !1) {
                        var x = $.now(),
                            y = m.url.replace(Hc, "$1_=" + x);
                        m.url = y + (y === m.url ? (Fc.test(m.url) ? "&" : "?") + "_=" + x : "")
                    }
                }(m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + (m.dataTypes[0] !== "*" ? ", " + Mc + "; q=0.01" : "") : m.accepts["*"]);
                for (l in m.headers) w.setRequestHeader(l, m.headers[l]);
                if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && u !== 2) {
                    v = "abort";
                    for (l in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) w[l](m[l]);
                    h = z(Lc, m, c, w);
                    if (!h) d(-1, "No Transport");
                    else {
                        w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                            w.abort("timeout")
                        }, m.timeout));
                        try {
                            u = 1, h.send(s, d)
                        } catch (A) {
                            if (!(u < 2)) throw A;
                            d(-1, A)
                        }
                    }
                    return w
                }
                return w.abort()
            },
            active: 0,
            lastModified: {},
            etag: {}
        });
        var Oc = [],
            Pc = /\?/,
            Qc = /(=)\?(?=&|$)|\?\?/,
            Rc = $.now();
        $.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = Oc.pop() || $.expando + "_" + Rc++;
                return this[a] = !0, a
            }
        }), $.ajaxPrefilter("json jsonp", function(c, d, e) {
            var f, g, h, i = c.data,
                j = c.url,
                k = c.jsonp !== !1,
                l = k && Qc.test(j),
                m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Qc.test(i);
            if (c.dataTypes[0] === "jsonp" || l || m) return f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Qc, "$1" + f) : m ? c.data = i.replace(Qc, "$1" + f) : k && (c.url += (Pc.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
                return h || $.error(f + " was not called"), h[0]
            }, c.dataTypes[0] = "json", a[f] = function() {
                h = arguments
            }, e.always(function() {
                a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Oc.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
            }), "script"
        }), $.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(a) {
                    return $.globalEval(a), a
                }
            }
        }), $.ajaxPrefilter("script", function(a) {
            a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), $.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
                return {
                    send: function(e, f) {
                        c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, e) {
                            if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
                        }, d.insertBefore(c, d.firstChild)
                    },
                    abort: function() {
                        c && c.onload(0, 1)
                    }
                }
            }
        });
        var Sc, Tc = a.ActiveXObject ? function() {
                for (var a in Sc) Sc[a](0, 1)
            } : !1,
            Uc = 0;
        $.ajaxSettings.xhr = a.ActiveXObject ? function() {
                return !this.isLocal && D() || E()
            } : D,
            function(a) {
                $.extend($.support, {
                    ajax: !!a,
                    cors: !!a && "withCredentials" in a
                })
            }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function(c) {
                if (!c.crossDomain || $.support.cors) {
                    var d;
                    return {
                        send: function(e, f) {
                            var g, h, i = c.xhr();
                            c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                            if (c.xhrFields)
                                for (h in c.xhrFields) i[h] = c.xhrFields[h];
                            c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                            try {
                                for (h in e) i.setRequestHeader(h, e[h])
                            } catch (j) {}
                            i.send(c.hasContent && c.data || null), d = function(a, e) {
                                var h, j, k, l, m;
                                try {
                                    if (d && (e || i.readyState === 4)) {
                                        d = b, g && (i.onreadystatechange = $.noop, Tc && delete Sc[g]);
                                        if (e) i.readyState !== 4 && i.abort();
                                        else {
                                            h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                                            try {
                                                l.text = i.responseText
                                            } catch (n) {}
                                            try {
                                                j = i.statusText
                                            } catch (n) {
                                                j = ""
                                            }!h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204)
                                        }
                                    }
                                } catch (o) {
                                    e || f(-1, o)
                                }
                                l && f(h, j, l, k)
                            }, c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++Uc, Tc && (Sc || (Sc = {}, $(a).unload(Tc)), Sc[g] = d), i.onreadystatechange = d) : d()
                        },
                        abort: function() {
                            d && d(0, 1)
                        }
                    }
                }
            });
        var Vc, Wc, Xc = /^(?:toggle|show|hide)$/,
            Yc = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"),
            Zc = /queueHooks$/,
            $c = [J],
            _c = {
                "*": [function(a, b) {
                    var c, d, e = this.createTween(a, b),
                        f = Yc.exec(b),
                        g = e.cur(),
                        h = +g || 0,
                        i = 1,
                        j = 20;
                    if (f) {
                        c = +f[2], d = f[3] || ($.cssNumber[a] ? "" : "px");
                        if (d !== "px" && h) {
                            h = $.css(e.elem, a, !0) || c || 1;
                            do i = i || ".5", h /= i, $.style(e.elem, a, h + d); while (i !== (i = e.cur() / g) && i !== 1 && --j)
                        }
                        e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
                    }
                    return e
                }]
            };
        $.Animation = $.extend(H, {
            tweener: function(a, b) {
                $.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                var c, d = 0,
                    e = a.length;
                for (; d < e; d++) c = a[d], _c[c] = _c[c] || [], _c[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? $c.unshift(a) : $c.push(a)
            }
        }), $.Tween = K, K.prototype = {
            constructor: K,
            init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
            },
            cur: function() {
                var a = K.propHooks[this.prop];
                return a && a.get ? a.get(this) : K.propHooks._default.get(this)
            },
            run: function(a) {
                var b, c = K.propHooks[this.prop];
                return this.options.duration ? this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
            }
        }, K.prototype.init.prototype = K.prototype, K.propHooks = {
            _default: {
                get: function(a) {
                    var b;
                    return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = $.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop]
                },
                set: function(a) {
                    $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (a.elem.style[$.cssProps[a.prop]] != null || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
            set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, $.each(["toggle", "show", "hide"], function(a, b) {
            var c = $.fn[b];
            $.fn[b] = function(d, e, f) {
                return d == null || typeof d == "boolean" || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
            }
        }), $.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(r).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = $.isEmptyObject(a),
                    f = $.speed(b, c, d),
                    g = function() {
                        var b = H(this, $.extend({}, a), f);
                        e && b.stop(!0)
                    };
                return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, c, d) {
                var e = function(a) {
                    var b = a.stop;
                    delete a.stop, b(d)
                };
                return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        c = a != null && a + "queueHooks",
                        f = $.timers,
                        g = $._data(this);
                    if (c) g[c] && g[c].stop && e(g[c]);
                    else
                        for (c in g) g[c] && g[c].stop && Zc.test(c) && e(g[c]);
                    for (c = f.length; c--;) f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                    (b || !d) && $.dequeue(this, a)
                })
            }
        }), $.each({
            slideDown: L("show"),
            slideUp: L("hide"),
            slideToggle: L("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            $.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), $.speed = function(a, b, c) {
            var d = a && typeof a == "object" ? $.extend({}, a) : {
                complete: c || !c && b || $.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !$.isFunction(b) && b
            };
            d.duration = $.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function() {
                $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
            }, d
        }, $.easing = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function() {
            var a, c = $.timers,
                d = 0;
            Vc = $.now();
            for (; d < c.length; d++) a = c[d], !a() && c[d] === a && c.splice(d--, 1);
            c.length || $.fx.stop(), Vc = b
        }, $.fx.timer = function(a) {
            a() && $.timers.push(a) && !Wc && (Wc = setInterval($.fx.tick, $.fx.interval))
        }, $.fx.interval = 13, $.fx.stop = function() {
            clearInterval(Wc), Wc = null
        }, $.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function(a) {
            return $.grep($.timers, function(b) {
                return a === b.elem
            }).length
        });
        var ad = /^(?:body|html)$/i;
        $.fn.offset = function(a) {
            if (arguments.length) return a === b ? this : this.each(function(b) {
                $.offset.setOffset(this, a, b)
            });
            var c, d, e, f, g, h, i, j = {
                    top: 0,
                    left: 0
                },
                k = this[0],
                l = k && k.ownerDocument;
            if (!l) return;
            return (d = l.body) === k ? $.offset.bodyOffset(k) : (c = l.documentElement, $.contains(c, k) ? (typeof k.getBoundingClientRect != "undefined" && (j = k.getBoundingClientRect()), e = M(l), f = c.clientTop || d.clientTop || 0, g = c.clientLeft || d.clientLeft || 0, h = e.pageYOffset || c.scrollTop, i = e.pageXOffset || c.scrollLeft, {
                top: j.top + h - f,
                left: j.left + i - g
            }) : j)
        }, $.offset = {
            bodyOffset: function(a) {
                var b = a.offsetTop,
                    c = a.offsetLeft;
                return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {
                    top: b,
                    left: c
                }
            },
            setOffset: function(a, b, c) {
                var d = $.css(a, "position");
                d === "static" && (a.style.position = "relative");
                var e = $(a),
                    f = e.offset(),
                    g = $.css(a, "top"),
                    h = $.css(a, "left"),
                    i = (d === "absolute" || d === "fixed") && $.inArray("auto", [g, h]) > -1,
                    j = {},
                    k = {},
                    l, m;
                i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), $.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
            }
        }, $.fn.extend({
            position: function() {
                if (!this[0]) return;
                var a = this[0],
                    b = this.offsetParent(),
                    c = this.offset(),
                    d = ad.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || P.body;
                    while (a && !ad.test(a.nodeName) && $.css(a, "position") === "static") a = a.offsetParent;
                    return a || P.body
                })
            }
        }), $.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(a, c) {
            var d = /Y/.test(c);
            $.fn[a] = function(e) {
                return $.access(this, function(a, e, f) {
                    var g = M(a);
                    if (f === b) return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
                    g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f
                }, a, e, arguments.length, null)
            }
        }), $.each({
            Height: "height",
            Width: "width"
        }, function(a, c) {
            $.each({
                padding: "inner" + a,
                content: c,
                "": "outer" + a
            }, function(d, e) {
                $.fn[e] = function(e, f) {
                    var g = arguments.length && (d || typeof e != "boolean"),
                        h = d || (e === !0 || f === !0 ? "margin" : "border");
                    return $.access(this, function(c, d, e) {
                        var f;
                        return $.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                    }, c, g ? e : b, g, null)
                }
            })
        }), a.jQuery = a.$ = $, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return $
        })
    }(window),
    function(a, b) {
        function c(b, c) {
            var e, f, g, h = b.nodeName.toLowerCase();
            return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b)
        }

        function d(b) {
            return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                return "hidden" === a.css(this, "visibility")
            }).length
        }
        var e = 0,
            f = /^ui-id-\d+$/;
        a.ui = a.ui || {}, a.extend(a.ui, {
            version: "1.10.3",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), a.fn.extend({
            focus: function(b) {
                return function(c, d) {
                    return "number" == typeof c ? this.each(function() {
                        var b = this;
                        setTimeout(function() {
                            a(b).focus(), d && d.call(b)
                        }, c)
                    }) : b.apply(this, arguments)
                }
            }(a.fn.focus),
            scrollParent: function() {
                var b;
                return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
            },
            zIndex: function(c) {
                if (c !== b) return this.css("zIndex", c);
                if (this.length)
                    for (var d, e, f = a(this[0]); f.length && f[0] !== document;) {
                        if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), !isNaN(e) && 0 !== e)) return e;
                        f = f.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    f.test(this.id) && a(this).removeAttr("id")
                })
            }
        }), a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
                return function(c) {
                    return !!a.data(c, b)
                }
            }) : function(b, c, d) {
                return !!a.data(b, d[3])
            },
            focusable: function(b) {
                return c(b, !isNaN(a.attr(b, "tabindex")))
            },
            tabbable: function(b) {
                var d = a.attr(b, "tabindex"),
                    e = isNaN(d);
                return (e || d >= 0) && c(b, !e)
            }
        }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
            function e(b, c, d, e) {
                return a.each(f, function() {
                    c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                }), c
            }
            var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
                g = d.toLowerCase(),
                h = {
                    innerWidth: a.fn.innerWidth,
                    innerHeight: a.fn.innerHeight,
                    outerWidth: a.fn.outerWidth,
                    outerHeight: a.fn.outerHeight
                };
            a.fn["inner" + d] = function(c) {
                return c === b ? h["inner" + d].call(this) : this.each(function() {
                    a(this).css(g, e(this, c) + "px")
                })
            }, a.fn["outer" + d] = function(b, c) {
                return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function() {
                    a(this).css(g, e(this, b, !0, c) + "px")
                })
            }
        }), a.fn.addBack || (a.fn.addBack = function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
            return function(c) {
                return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
            }
        }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
            disableSelection: function() {
                return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                    a.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), a.extend(a.ui, {
            plugin: {
                add: function(b, c, d) {
                    var e, f = a.ui[b].prototype;
                    for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
                },
                call: function(a, b, c) {
                    var d, e = a.plugins[b];
                    if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)
                        for (d = 0; e.length > d; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c)
                }
            },
            hasScroll: function(b, c) {
                if ("hidden" === a(b).css("overflow")) return !1;
                var d = c && "left" === c ? "scrollLeft" : "scrollTop",
                    e = !1;
                return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
            }
        })
    }(jQuery),
    function(a, b) {
        var c = 0,
            d = Array.prototype.slice,
            e = a.cleanData;
        a.cleanData = function(b) {
            for (var c, d = 0; null != (c = b[d]); d++) try {
                a(c).triggerHandler("remove")
            } catch (f) {}
            e(b)
        }, a.widget = function(c, d, e) {
            var f, g, h, i, j = {},
                k = c.split(".")[0];
            c = c.split(".")[1], f = k + "-" + c, e || (e = d, d = a.Widget), a.expr[":"][f.toLowerCase()] = function(b) {
                return !!a.data(b, f)
            }, a[k] = a[k] || {}, g = a[k][c], h = a[k][c] = function(a, c) {
                return this._createWidget ? (arguments.length && this._createWidget(a, c), b) : new h(a, c)
            }, a.extend(h, g, {
                version: e.version,
                _proto: a.extend({}, e),
                _childConstructors: []
            }), i = new d, i.options = a.widget.extend({}, i.options), a.each(e, function(c, e) {
                return a.isFunction(e) ? (j[c] = function() {
                    var a = function() {
                            return d.prototype[c].apply(this, arguments)
                        },
                        b = function(a) {
                            return d.prototype[c].apply(this, a)
                        };
                    return function() {
                        var c, d = this._super,
                            f = this._superApply;
                        return this._super = a, this._superApply = b, c = e.apply(this, arguments), this._super = d, this._superApply = f, c
                    }
                }(), b) : (j[c] = e, b)
            }), h.prototype = a.widget.extend(i, {
                widgetEventPrefix: g ? i.widgetEventPrefix : c
            }, j, {
                constructor: h,
                namespace: k,
                widgetName: c,
                widgetFullName: f
            }), g ? (a.each(g._childConstructors, function(b, c) {
                var d = c.prototype;
                a.widget(d.namespace + "." + d.widgetName, h, c._proto)
            }), delete g._childConstructors) : d._childConstructors.push(h), a.widget.bridge(c, h)
        }, a.widget.extend = function(c) {
            for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)
                for (e in g[h]) f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
            return c
        }, a.widget.bridge = function(c, e) {
            var f = e.prototype.widgetFullName || c;
            a.fn[c] = function(g) {
                var h = "string" == typeof g,
                    j = d.call(arguments, 1),
                    k = this;
                return g = !h && j.length ? a.widget.extend.apply(null, [g].concat(j)) : g, h ? this.each(function() {
                    var d, e = a.data(this, f);
                    return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, j), d !== e && d !== b ? (k = d && d.jquery ? k.pushStack(d.get()) : d, !1) : b) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'")
                }) : this.each(function() {
                    var b = a.data(this, f);
                    b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
                }), k
            }
        }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(b, d) {
                d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(a) {
                        a.target === d && this.destroy()
                    }
                }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: a.noop,
            _getCreateEventData: a.noop,
            _create: a.noop,
            _init: a.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: a.noop,
            widget: function() {
                return this.element
            },
            option: function(c, d) {
                var e, f, g, h = c;
                if (0 === arguments.length) return a.widget.extend({}, this.options);
                if ("string" == typeof c)
                    if (h = {}, e = c.split("."), c = e.shift(), e.length) {
                        for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; e.length - 1 > g; g++) f[e[g]] = f[e[g]] || {}, f = f[e[g]];
                        if (c = e.pop(), d === b) return f[c] === b ? null : f[c];
                        f[c] = d
                    } else {
                        if (d === b) return this.options[c] === b ? null : this.options[c];
                        h[c] = d
                    }
                return this._setOptions(h), this
            },
            _setOptions: function(a) {
                var b;
                for (b in a) this._setOption(b, a[b]);
                return this
            },
            _setOption: function(a, b) {
                return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(c, d, e) {
                var f, g = this;
                "boolean" != typeof c && (e = d, d = c, c = !1), e ? (d = f = a(d), this.bindings = this.bindings.add(d)) : (e = d, d = this.element, f = this.widget()), a.each(e, function(e, h) {
                    function j() {
                        return c || g.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof h ? g[h] : h).apply(g, arguments) : b
                    }
                    "string" != typeof h && (j.guid = h.guid = h.guid || j.guid || a.guid++);
                    var k = e.match(/^(\w+)\s*(.*)$/),
                        l = k[1] + g.eventNamespace,
                        m = k[2];
                    m ? f.delegate(m, l, j) : d.bind(l, j)
                })
            },
            _off: function(a, b) {
                b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
            },
            _delay: function(a, b) {
                function c() {
                    return ("string" == typeof a ? d[a] : a).apply(d, arguments)
                }
                var d = this;
                return setTimeout(c, b || 0)
            },
            _hoverable: function(b) {
                this.hoverable = this.hoverable.add(b), this._on(b, {
                    mouseenter: function(b) {
                        a(b.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(b) {
                        a(b.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(b) {
                this.focusable = this.focusable.add(b), this._on(b, {
                    focusin: function(b) {
                        a(b.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(b) {
                        a(b.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(b, c, d) {
                var e, f, g = this.options[b];
                if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                    for (e in f) e in c || (c[e] = f[e]);
                return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
            }
        }, a.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(b, c) {
            a.Widget.prototype["_" + b] = function(d, e, f) {
                "string" == typeof e && (e = {
                    effect: e
                });
                var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
                e = e || {}, "number" == typeof e && (e = {
                    duration: e
                }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                    a(this)[b](), f && f.call(d[0]), c()
                })
            }
        })
    }(jQuery),
    function(a) {
        var b = !1;
        a(document).mouseup(function() {
            b = !1
        }), a.widget("ui.mouse", {
            version: "1.10.3",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var b = this;
                this.element.bind("mousedown." + this.widgetName, function(a) {
                    return b._mouseDown(a)
                }).bind("click." + this.widgetName, function(c) {
                    return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : undefined
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(c) {
                if (!b) {
                    this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
                    var d = this,
                        f = 1 === c.which,
                        g = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
                    return f && !g && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        d.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                        return d._mouseMove(a)
                    }, this._mouseUpDelegate = function(a) {
                        return d._mouseUp(a)
                    }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
                }
            },
            _mouseMove: function(b) {
                return a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
            },
            _mouseUp: function(b) {
                return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
            },
            _mouseDistanceMet: function(a) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery),
    function(a, b) {
        function c(a, b, c) {
            return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
        }

        function d(b, c) {
            return parseInt(a.css(b, c), 10) || 0
        }

        function e(b) {
            var c = b[0];
            return 9 === c.nodeType ? {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : a.isWindow(c) ? {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: b.scrollTop(),
                    left: b.scrollLeft()
                }
            } : c.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: c.pageY,
                    left: c.pageX
                }
            } : {
                width: b.outerWidth(),
                height: b.outerHeight(),
                offset: b.offset()
            }
        }
        a.ui = a.ui || {};
        var f, g = Math.max,
            h = Math.abs,
            i = Math.round,
            j = /left|center|right/,
            k = /top|center|bottom/,
            l = /[\+\-]\d+(\.[\d]+)?%?/,
            m = /^\w+/,
            n = /%$/,
            o = a.fn.position;
        a.position = {
                scrollbarWidth: function() {
                    if (f !== b) return f;
                    var c, d, e = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        g = e.children()[0];
                    return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), f = c - d
                },
                getScrollInfo: function(b) {
                    var c = b.isWindow ? "" : b.element.css("overflow-x"),
                        d = b.isWindow ? "" : b.element.css("overflow-y"),
                        e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                        f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
                    return {
                        width: f ? a.position.scrollbarWidth() : 0,
                        height: e ? a.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(b) {
                    var c = a(b || window),
                        d = a.isWindow(c[0]);
                    return {
                        element: c,
                        isWindow: d,
                        offset: c.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: c.scrollLeft(),
                        scrollTop: c.scrollTop(),
                        width: d ? c.width() : c.outerWidth(),
                        height: d ? c.height() : c.outerHeight()
                    }
                }
            }, a.fn.position = function(b) {
                if (!b || !b.of) return o.apply(this, arguments);
                b = a.extend({}, b);
                var f, n, p, q, t, v, w = a(b.of),
                    x = a.position.getWithinInfo(b.within),
                    y = a.position.getScrollInfo(x),
                    z = (b.collision || "flip").split(" "),
                    A = {};
                return v = e(w), w[0].preventDefault && (b.at = "left top"), n = v.width, p = v.height, q = v.offset, t = a.extend({}, q), a.each(["my", "at"], function() {
                    var a, c, d = (b[this] || "").split(" ");
                    1 === d.length && (d = j.test(d[0]) ? d.concat(["center"]) : k.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), c = l.exec(d[1]), A[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [m.exec(d[0])[0], m.exec(d[1])[0]]
                }), 1 === z.length && (z[1] = z[0]), "right" === b.at[0] ? t.left += n : "center" === b.at[0] && (t.left += n / 2), "bottom" === b.at[1] ? t.top += p : "center" === b.at[1] && (t.top += p / 2), f = c(A.at, n, p), t.left += f[0], t.top += f[1], this.each(function() {
                    var e, j, k = a(this),
                        l = k.outerWidth(),
                        m = k.outerHeight(),
                        o = d(this, "marginLeft"),
                        u = d(this, "marginTop"),
                        v = l + o + d(this, "marginRight") + y.width,
                        B = m + u + d(this, "marginBottom") + y.height,
                        C = a.extend({}, t),
                        D = c(A.my, k.outerWidth(), k.outerHeight());
                    "right" === b.my[0] ? C.left -= l : "center" === b.my[0] && (C.left -= l / 2), "bottom" === b.my[1] ? C.top -= m : "center" === b.my[1] && (C.top -= m / 2), C.left += D[0], C.top += D[1], a.support.offsetFractions || (C.left = i(C.left), C.top = i(C.top)), e = {
                        marginLeft: o,
                        marginTop: u
                    }, a.each(["left", "top"], function(c, d) {
                        a.ui.position[z[c]] && a.ui.position[z[c]][d](C, {
                            targetWidth: n,
                            targetHeight: p,
                            elemWidth: l,
                            elemHeight: m,
                            collisionPosition: e,
                            collisionWidth: v,
                            collisionHeight: B,
                            offset: [f[0] + D[0], f[1] + D[1]],
                            my: b.my,
                            at: b.at,
                            within: x,
                            elem: k
                        })
                    }), b.using && (j = function(a) {
                        var c = q.left - C.left,
                            d = c + n - l,
                            e = q.top - C.top,
                            f = e + p - m,
                            i = {
                                target: {
                                    element: w,
                                    left: q.left,
                                    top: q.top,
                                    width: n,
                                    height: p
                                },
                                element: {
                                    element: k,
                                    left: C.left,
                                    top: C.top,
                                    width: l,
                                    height: m
                                },
                                horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
                                vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"
                            };
                        l > n && n > h(c + d) && (i.horizontal = "center"), m > p && p > h(e + f) && (i.vertical = "middle"), i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i)
                    }), k.offset(a.extend(C, {
                        using: j
                    }))
                })
            }, a.ui.position = {
                fit: {
                    left: function(a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollLeft : d.offset.left,
                            f = d.width,
                            h = a.left - b.collisionPosition.marginLeft,
                            i = e - h,
                            j = h + b.collisionWidth - f - e;
                        b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
                    },
                    top: function(a, b) {
                        var c, d = b.within,
                            e = d.isWindow ? d.scrollTop : d.offset.top,
                            f = b.within.height,
                            h = a.top - b.collisionPosition.marginTop,
                            i = e - h,
                            j = h + b.collisionHeight - f - e;
                        b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
                    }
                },
                flip: {
                    left: function(a, b) {
                        var c, d, e = b.within,
                            f = e.offset.left + e.scrollLeft,
                            g = e.width,
                            i = e.isWindow ? e.scrollLeft : e.offset.left,
                            j = a.left - b.collisionPosition.marginLeft,
                            k = j - i,
                            l = j + b.collisionWidth - g - i,
                            m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                            n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                            o = -2 * b.offset[0];
                        0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || h(k) > c) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || l > h(d)) && (a.left += m + n + o))
                    },
                    top: function(a, b) {
                        var c, d, e = b.within,
                            f = e.offset.top + e.scrollTop,
                            g = e.height,
                            i = e.isWindow ? e.scrollTop : e.offset.top,
                            j = a.top - b.collisionPosition.marginTop,
                            k = j - i,
                            l = j + b.collisionHeight - g - i,
                            m = "top" === b.my[1],
                            n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                            o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                            p = -2 * b.offset[1];
                        0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || h(k) > d) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || l > h(c)) && (a.top += n + o + p))
                    }
                },
                flipfit: {
                    left: function() {
                        a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var b, c, d, e, f, g = document.getElementsByTagName("body")[0],
                    h = document.createElement("div");
                b = document.createElement(g ? "div" : "body"), d = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, g && a.extend(d, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (f in d) b.style[f] = d[f];
                b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
            }()
    }(jQuery),
    function(a) {
        a.widget("ui.draggable", a.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
            },
            _mouseCapture: function(b) {
                var c = this.options;
                return this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                    a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(a(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function(b) {
                var c = this.options;
                return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.offset.scroll = !1, a.extend(this.offset, {
                    click: {
                        left: b.pageX - this.offset.left,
                        top: b.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
            },
            _mouseDrag: function(b, c) {
                if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), !c) {
                    var d = this._uiHash();
                    if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                    this.position = d.position
                }
                return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
            },
            _mouseStop: function(b) {
                var c = this,
                    d = !1;
                return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    c._trigger("stop", b) !== !1 && c._clear()
                }) : this._trigger("stop", b) !== !1 && this._clear(), !1) : !1
            },
            _mouseUp: function(b) {
                return a("div.ui-draggable-iframeFix").each(function() {
                    this.parentNode.removeChild(this)
                }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function(b) {
                return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _createHelper: function(b) {
                var c = this.options,
                    d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
                return d.parents("body").length || d.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] === this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), d
            },
            _adjustOffsetFromHelper: function(b) {
                "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                var b = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                    top: 0,
                    left: 0
                }), {
                    top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var a = this.element.position();
                    return {
                        top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var b, c, d, f = this.options;
                return f.containment ? "window" === f.containment ? (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === f.containment ? (this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : f.containment.constructor === Array ? (this.containment = f.containment, undefined) : ("parent" === f.containment && (f.containment = this.helper[0].parentNode), c = a(f.containment), d = c[0], d && (b = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c), undefined) : (this.containment = null, undefined)
            },
            _convertPositionTo: function(b, c) {
                c || (c = this.position);
                var d = "absolute" === b ? 1 : -1,
                    f = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: f.scrollTop(),
                    left: f.scrollLeft()
                }), {
                    top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * d,
                    left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * d
                }
            },
            _generatePosition: function(b) {
                var c, d, f, g, h = this.options,
                    i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    j = b.pageX,
                    k = b.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: i.scrollTop(),
                    left: i.scrollLeft()
                }), this.originalPosition && (this.containment && (this.relative_container ? (d = this.relative_container.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, b.pageX - this.offset.click.left < c[0] && (j = c[0] + this.offset.click.left), b.pageY - this.offset.click.top < c[1] && (k = c[1] + this.offset.click.top), b.pageX - this.offset.click.left > c[2] && (j = c[2] + this.offset.click.left), b.pageY - this.offset.click.top > c[3] && (k = c[3] + this.offset.click.top)), h.grid && (f = h.grid[1] ? this.originalPageY + Math.round((k - this.originalPageY) / h.grid[1]) * h.grid[1] : this.originalPageY, k = c ? f - this.offset.click.top >= c[1] || f - this.offset.click.top > c[3] ? f : f - this.offset.click.top >= c[1] ? f - h.grid[1] : f + h.grid[1] : f, g = h.grid[0] ? this.originalPageX + Math.round((j - this.originalPageX) / h.grid[0]) * h.grid[0] : this.originalPageX, j = c ? g - this.offset.click.left >= c[0] || g - this.offset.click.left > c[2] ? g : g - this.offset.click.left >= c[0] ? g - h.grid[0] : g + h.grid[0] : g)), {
                    top: k - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                    left: j - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function(b, c, d) {
                return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), "drag" === b && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), a.ui.plugin.add("draggable", "connectToSortable", {
            start: function(b, c) {
                var d = a(this).data("ui-draggable"),
                    f = d.options,
                    g = a.extend({}, c, {
                        item: d.element
                    });
                d.sortables = [], a(f.connectToSortable).each(function() {
                    var c = a.data(this, "ui-sortable");
                    c && !c.options.disabled && (d.sortables.push({
                        instance: c,
                        shouldRevert: c.options.revert
                    }), c.refreshPositions(), c._trigger("activate", b, g))
                })
            },
            stop: function(b, c) {
                var d = a(this).data("ui-draggable"),
                    f = a.extend({}, c, {
                        item: d.element
                    });
                a.each(d.sortables, function() {
                    this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" === d.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, f))
                })
            },
            drag: function(b, c) {
                var d = a(this).data("ui-draggable"),
                    f = this;
                a.each(d.sortables, function() {
                    var g = !1,
                        h = this;
                    this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (g = !0, a.each(d.sortables, function() {
                        return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this !== h && this.instance._intersectsWith(this.instance.containerCache) && a.contains(h.instance.element[0], this.instance.element[0]) && (g = !1), g
                    })), g ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(f).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                        return c.helper[0]
                    }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
                })
            }
        }), a.ui.plugin.add("draggable", "cursor", {
            start: function() {
                var b = a("body"),
                    c = a(this).data("ui-draggable").options;
                b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor)
            },
            stop: function() {
                var b = a(this).data("ui-draggable").options;
                b._cursor && a("body").css("cursor", b._cursor)
            }
        }), a.ui.plugin.add("draggable", "opacity", {
            start: function(b, c) {
                var d = a(c.helper),
                    f = a(this).data("ui-draggable").options;
                d.css("opacity") && (f._opacity = d.css("opacity")), d.css("opacity", f.opacity)
            },
            stop: function(b, c) {
                var d = a(this).data("ui-draggable").options;
                d._opacity && a(c.helper).css("opacity", d._opacity)
            }
        }), a.ui.plugin.add("draggable", "scroll", {
            start: function() {
                var b = a(this).data("ui-draggable");
                b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
            },
            drag: function(b) {
                var c = a(this).data("ui-draggable"),
                    d = c.options,
                    f = !1;
                c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (d.axis && "x" === d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = f = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = f = c.scrollParent[0].scrollTop - d.scrollSpeed)), d.axis && "y" === d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = f = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = f = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" === d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), d.axis && "y" === d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), f !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b)
            }
        }), a.ui.plugin.add("draggable", "snap", {
            start: function() {
                var b = a(this).data("ui-draggable"),
                    c = b.options;
                b.snapElements = [], a(c.snap.constructor !== String ? c.snap.items || ":data(ui-draggable)" : c.snap).each(function() {
                    var c = a(this),
                        d = c.offset();
                    this !== b.element[0] && b.snapElements.push({
                        item: this,
                        width: c.outerWidth(),
                        height: c.outerHeight(),
                        top: d.top,
                        left: d.left
                    })
                })
            },
            drag: function(b, c) {
                var d, f, g, h, i, j, k, l, m, n, o = a(this).data("ui-draggable"),
                    p = o.options,
                    q = p.snapTolerance,
                    r = c.offset.left,
                    s = r + o.helperProportions.width,
                    t = c.offset.top,
                    u = t + o.helperProportions.height;
                for (m = o.snapElements.length - 1; m >= 0; m--) i = o.snapElements[m].left, j = i + o.snapElements[m].width, k = o.snapElements[m].top, l = k + o.snapElements[m].height, i - q > s || r > j + q || k - q > u || t > l + q || !a.contains(o.snapElements[m].item.ownerDocument, o.snapElements[m].item) ? (o.snapElements[m].snapping && o.options.snap.release && o.options.snap.release.call(o.element, b, a.extend(o._uiHash(), {
                    snapItem: o.snapElements[m].item
                })), o.snapElements[m].snapping = !1) : ("inner" !== p.snapMode && (d = q >= Math.abs(k - u), f = q >= Math.abs(l - t), g = q >= Math.abs(i - s), h = q >= Math.abs(j - r), d && (c.position.top = o._convertPositionTo("relative", {
                    top: k - o.helperProportions.height,
                    left: 0
                }).top - o.margins.top), f && (c.position.top = o._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - o.margins.top), g && (c.position.left = o._convertPositionTo("relative", {
                    top: 0,
                    left: i - o.helperProportions.width
                }).left - o.margins.left), h && (c.position.left = o._convertPositionTo("relative", {
                    top: 0,
                    left: j
                }).left - o.margins.left)), n = d || f || g || h, "outer" !== p.snapMode && (d = q >= Math.abs(k - t), f = q >= Math.abs(l - u), g = q >= Math.abs(i - r), h = q >= Math.abs(j - s), d && (c.position.top = o._convertPositionTo("relative", {
                    top: k,
                    left: 0
                }).top - o.margins.top), f && (c.position.top = o._convertPositionTo("relative", {
                    top: l - o.helperProportions.height,
                    left: 0
                }).top - o.margins.top), g && (c.position.left = o._convertPositionTo("relative", {
                    top: 0,
                    left: i
                }).left - o.margins.left), h && (c.position.left = o._convertPositionTo("relative", {
                    top: 0,
                    left: j - o.helperProportions.width
                }).left - o.margins.left)), !o.snapElements[m].snapping && (d || f || g || h || n) && o.options.snap.snap && o.options.snap.snap.call(o.element, b, a.extend(o._uiHash(), {
                    snapItem: o.snapElements[m].item
                })), o.snapElements[m].snapping = d || f || g || h || n)
            }
        }), a.ui.plugin.add("draggable", "stack", {
            start: function() {
                var b, c = this.data("ui-draggable").options,
                    d = a.makeArray(a(c.stack)).sort(function(b, c) {
                        return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                    });
                d.length && (b = parseInt(a(d[0]).css("zIndex"), 10) || 0, a(d).each(function(c) {
                    a(this).css("zIndex", b + c)
                }), this.css("zIndex", b + d.length))
            }
        }), a.ui.plugin.add("draggable", "zIndex", {
            start: function(b, c) {
                var d = a(c.helper),
                    f = a(this).data("ui-draggable").options;
                d.css("zIndex") && (f._zIndex = d.css("zIndex")), d.css("zIndex", f.zIndex)
            },
            stop: function(b, c) {
                var d = a(this).data("ui-draggable").options;
                d._zIndex && a(c.helper).css("zIndex", d._zIndex)
            }
        })
    }(jQuery),
    function(a) {
        function b(a, b, c) {
            return a > b && b + c > a
        }
        a.widget("ui.droppable", {
            version: "1.10.3",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var b = this.options,
                    c = b.accept;
                this.isover = !1, this.isout = !0, this.accept = a.isFunction(c) ? c : function(a) {
                    return a.is(c)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
            },
            _destroy: function() {
                for (var b = 0, c = a.ui.ddmanager.droppables[this.options.scope]; c.length > b; b++) c[b] === this && c.splice(b, 1);
                this.element.removeClass("ui-droppable ui-droppable-disabled")
            },
            _setOption: function(b, c) {
                "accept" === b && (this.accept = a.isFunction(c) ? c : function(a) {
                    return a.is(c)
                }), a.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function(b) {
                var c = a.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
            },
            _deactivate: function(b) {
                var c = a.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
            },
            _over: function(b) {
                var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
            },
            _out: function(b) {
                var c = a.ui.ddmanager.current;
                c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
            },
            _drop: function(b, c) {
                var d = c || a.ui.ddmanager.current,
                    f = !1;
                return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var b = a.data(this, "ui-droppable");
                    return b.options.greedy && !b.options.disabled && b.options.scope === d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
                        offset: b.element.offset()
                    }), b.options.tolerance) ? (f = !0, !1) : undefined
                }), f ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
            },
            ui: function(a) {
                return {
                    draggable: a.currentItem || a.element,
                    helper: a.helper,
                    position: a.position,
                    offset: a.positionAbs
                }
            }
        }), a.ui.intersect = function(a, c, d) {
            if (!c.offset) return !1;
            var e, f, g = (a.positionAbs || a.position.absolute).left,
                h = g + a.helperProportions.width,
                i = (a.positionAbs || a.position.absolute).top,
                j = i + a.helperProportions.height,
                k = c.offset.left,
                l = k + c.proportions.width,
                m = c.offset.top,
                n = m + c.proportions.height;
            switch (d) {
                case "fit":
                    return g >= k && l >= h && i >= m && n >= j;
                case "intersect":
                    return g + a.helperProportions.width / 2 > k && l > h - a.helperProportions.width / 2 && i + a.helperProportions.height / 2 > m && n > j - a.helperProportions.height / 2;
                case "pointer":
                    return e = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, f = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, b(f, m, c.proportions.height) && b(e, k, c.proportions.width);
                case "touch":
                    return (i >= m && n >= i || j >= m && n >= j || m > i && j > n) && (g >= k && l >= g || h >= k && l >= h || k > g && h > l);
                default:
                    return !1
            }
        }, a.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(b, c) {
                var d, f, g = a.ui.ddmanager.droppables[b.options.scope] || [],
                    h = c ? c.type : null,
                    i = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
                a: for (d = 0; g.length > d; d++)
                    if (!(g[d].options.disabled || b && !g[d].accept.call(g[d].element[0], b.currentItem || b.element))) {
                        for (f = 0; i.length > f; f++)
                            if (i[f] === g[d].element[0]) {
                                g[d].proportions.height = 0;
                                continue a
                            }
                        g[d].visible = "none" !== g[d].element.css("display"), g[d].visible && ("mousedown" === h && g[d]._activate.call(g[d], c), g[d].offset = g[d].element.offset(), g[d].proportions = {
                            width: g[d].element[0].offsetWidth,
                            height: g[d].element[0].offsetHeight
                        })
                    }
            },
            drop: function(b, c) {
                var d = !1;
                return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
                }), d
            },
            dragStart: function(b, c) {
                b.element.parentsUntil("body").bind("scroll.droppable", function() {
                    b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
                })
            },
            drag: function(b, c) {
                b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var d, f, g, h = a.ui.intersect(b, this, this.options.tolerance),
                            j = !h && this.isover ? "isout" : h && !this.isover ? "isover" : null;
                        j && (this.options.greedy && (f = this.options.scope, g = this.element.parents(":data(ui-droppable)").filter(function() {
                            return a.data(this, "ui-droppable").options.scope === f
                        }), g.length && (d = a.data(g[0], "ui-droppable"), d.greedyChild = "isover" === j)), d && "isover" === j && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[j] = !0, this["isout" === j ? "isover" : "isout"] = !1, this["isover" === j ? "_over" : "_out"].call(this, c), d && "isout" === j && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
                    }
                })
            },
            dragStop: function(b, c) {
                b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
            }
        }
    }(jQuery),
    function(a) {
        function b(a) {
            return parseInt(a, 10) || 0
        }

        function c(a) {
            return !isNaN(parseInt(a, 10))
        }
        a.widget("ui.resizable", a.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _create: function() {
                var b, c, d, f, g, h = this,
                    i = this.options;
                if (this.element.addClass("ui-resizable"), a.extend(this, {
                        _aspectRatio: !!i.aspectRatio,
                        aspectRatio: i.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                        position: this.element.css("position"),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css("top"),
                        left: this.element.css("left")
                    })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css("marginLeft"),
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom")
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: "static",
                        zoom: 1,
                        display: "block"
                    })), this.originalElement.css({
                        margin: this.originalElement.css("margin")
                    }), this._proportionallyResize()), this.handles = i.handles || (a(".ui-resizable-handle", this.element).length ? {
                        n: ".ui-resizable-n",
                        e: ".ui-resizable-e",
                        s: ".ui-resizable-s",
                        w: ".ui-resizable-w",
                        se: ".ui-resizable-se",
                        sw: ".ui-resizable-sw",
                        ne: ".ui-resizable-ne",
                        nw: ".ui-resizable-nw"
                    } : "e,s,se"), this.handles.constructor === String)
                    for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; b.length > c; c++) d = a.trim(b[c]), g = "ui-resizable-" + d, f = a("<div class='ui-resizable-handle " + g + "'></div>"), f.css({
                        zIndex: i.zIndex
                    }), "se" === d && f.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(f);
                this._renderAxis = function(b) {
                    var c, d, f, g;
                    b = b || this.element;
                    for (c in this.handles) this.handles[c].constructor === String && (this.handles[c] = a(this.handles[c], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), g = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(f, g), this._proportionallyResize()), a(this.handles[c]).length
                }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                    h.resizing || (this.className && (f = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = f && f[1] ? f[1] : "se")
                }), i.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    i.disabled || (a(this).removeClass("ui-resizable-autohide"), h._handles.show())
                }).mouseleave(function() {
                    i.disabled || h.resizing || (a(this).addClass("ui-resizable-autohide"), h._handles.hide())
                })), this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var b, c = function(b) {
                    a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
                    position: b.css("position"),
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: b.css("top"),
                    left: b.css("left")
                }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
            },
            _mouseCapture: function(b) {
                var c, d, f = !1;
                for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (f = !0);
                return !this.options.disabled && f
            },
            _mouseStart: function(c) {
                var d, f, g, h = this.options,
                    i = this.element.position(),
                    j = this.element;
                return this.resizing = !0, /absolute/.test(j.css("position")) ? j.css({
                    position: "absolute",
                    top: j.css("top"),
                    left: j.css("left")
                }) : j.is(".ui-draggable") && j.css({
                    position: "absolute",
                    top: i.top,
                    left: i.left
                }), this._renderProxy(), d = b(this.helper.css("left")), f = b(this.helper.css("top")), h.containment && (d += a(h.containment).scrollLeft() || 0, f += a(h.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: d,
                    top: f
                }, this.size = this._helper ? {
                    width: j.outerWidth(),
                    height: j.outerHeight()
                } : {
                    width: j.width(),
                    height: j.height()
                }, this.originalSize = this._helper ? {
                    width: j.outerWidth(),
                    height: j.outerHeight()
                } : {
                    width: j.width(),
                    height: j.height()
                }, this.originalPosition = {
                    left: d,
                    top: f
                }, this.sizeDiff = {
                    width: j.outerWidth() - j.width(),
                    height: j.outerHeight() - j.height()
                }, this.originalMousePosition = {
                    left: c.pageX,
                    top: c.pageY
                }, this.aspectRatio = "number" == typeof h.aspectRatio ? h.aspectRatio : this.originalSize.width / this.originalSize.height || 1, g = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === g ? this.axis + "-resize" : g), j.addClass("ui-resizable-resizing"), this._propagate("start", c), !0
            },
            _mouseDrag: function(b) {
                var c, d = this.helper,
                    f = {},
                    g = this.originalMousePosition,
                    h = this.axis,
                    i = this.position.top,
                    j = this.position.left,
                    k = this.size.width,
                    l = this.size.height,
                    m = b.pageX - g.left || 0,
                    n = b.pageY - g.top || 0,
                    o = this._change[h];
                return o ? (c = o.apply(this, [b, m, n]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), this.position.top !== i && (f.top = this.position.top + "px"), this.position.left !== j && (f.left = this.position.left + "px"), this.size.width !== k && (f.width = this.size.width + "px"), this.size.height !== l && (f.height = this.size.height + "px"), d.css(f), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(f) || this._trigger("resize", b, this.ui()), !1) : !1
            },
            _mouseStop: function(b) {
                this.resizing = !1;
                var c, d, f, g, h, i, j, k = this.options,
                    l = this;
                return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), f = d && a.ui.hasScroll(c[0], "left") ? 0 : l.sizeDiff.height, g = d ? 0 : l.sizeDiff.width, h = {
                    width: l.helper.width() - g,
                    height: l.helper.height() - f
                }, i = parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left) || null, j = parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top) || null, k.animate || this.element.css(a.extend(h, {
                    top: j,
                    left: i
                })), l.helper.height(l.size.height), l.helper.width(l.size.width), this._helper && !k.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(a) {
                var b, d, e, f, g, h = this.options;
                g = {
                    minWidth: c(h.minWidth) ? h.minWidth : 0,
                    maxWidth: c(h.maxWidth) ? h.maxWidth : 1 / 0,
                    minHeight: c(h.minHeight) ? h.minHeight : 0,
                    maxHeight: c(h.maxHeight) ? h.maxHeight : 1 / 0
                }, (this._aspectRatio || a) && (b = g.minHeight * this.aspectRatio, e = g.minWidth / this.aspectRatio, d = g.maxHeight * this.aspectRatio, f = g.maxWidth / this.aspectRatio, b > g.minWidth && (g.minWidth = b), e > g.minHeight && (g.minHeight = e), g.maxWidth > d && (g.maxWidth = d), g.maxHeight > f && (g.maxHeight = f)), this._vBoundaries = g
            },
            _updateCache: function(a) {
                this.offset = this.helper.offset(), c(a.left) && (this.position.left = a.left), c(a.top) && (this.position.top = a.top), c(a.height) && (this.size.height = a.height), c(a.width) && (this.size.width = a.width)
            },
            _updateRatio: function(a) {
                var b = this.position,
                    d = this.size,
                    e = this.axis;
                return c(a.height) ? a.width = a.height * this.aspectRatio : c(a.width) && (a.height = a.width / this.aspectRatio), "sw" === e && (a.left = b.left + (d.width - a.width), a.top = null), "nw" === e && (a.top = b.top + (d.height - a.height), a.left = b.left + (d.width - a.width)), a
            },
            _respectSize: function(a) {
                var b = this._vBoundaries,
                    d = this.axis,
                    e = c(a.width) && b.maxWidth && b.maxWidth < a.width,
                    f = c(a.height) && b.maxHeight && b.maxHeight < a.height,
                    g = c(a.width) && b.minWidth && b.minWidth > a.width,
                    h = c(a.height) && b.minHeight && b.minHeight > a.height,
                    j = this.originalPosition.left + this.originalSize.width,
                    k = this.position.top + this.size.height,
                    l = /sw|nw|w/.test(d),
                    m = /nw|ne|n/.test(d);
                return g && (a.width = b.minWidth), h && (a.height = b.minHeight), e && (a.width = b.maxWidth), f && (a.height = b.maxHeight), g && l && (a.left = j - b.minWidth), e && l && (a.left = j - b.maxWidth), h && m && (a.top = k - b.minHeight), f && m && (a.top = k - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length) {
                    var a, b, c, d, e, f = this.helper || this.element;
                    for (a = 0; this._proportionallyResizeElements.length > a; a++) {
                        if (e = this._proportionallyResizeElements[a], !this.borderDif)
                            for (this.borderDif = [], c = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], d = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")], b = 0; c.length > b; b++) this.borderDif[b] = (parseInt(c[b], 10) || 0) + (parseInt(d[b], 10) || 0);
                        e.css({
                            height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
                }
            },
            _renderProxy: function() {
                var b = this.element,
                    c = this.options;
                this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++c.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(a, b) {
                    return {
                        width: this.originalSize.width + b
                    }
                },
                w: function(a, b) {
                    var c = this.originalSize,
                        d = this.originalPosition;
                    return {
                        left: d.left + b,
                        width: c.width - b
                    }
                },
                n: function(a, b, c) {
                    var d = this.originalSize,
                        e = this.originalPosition;
                    return {
                        top: e.top + c,
                        height: d.height - c
                    }
                },
                s: function(a, b, c) {
                    return {
                        height: this.originalSize.height + c
                    }
                },
                se: function(b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                sw: function(b, c, d) {
                    return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                },
                ne: function(b, c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
                },
                nw: function(b, c, d) {
                    return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
                }
            },
            _propagate: function(b, c) {
                a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), a.ui.plugin.add("resizable", "animate", {
            stop: function(b) {
                var c = a(this).data("ui-resizable"),
                    d = c.options,
                    f = c._proportionallyResizeElements,
                    g = f.length && /textarea/i.test(f[0].nodeName),
                    h = g && a.ui.hasScroll(f[0], "left") ? 0 : c.sizeDiff.height,
                    i = g ? 0 : c.sizeDiff.width,
                    j = {
                        width: c.size.width - i,
                        height: c.size.height - h
                    },
                    k = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
                    l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
                c.element.animate(a.extend(j, l && k ? {
                    top: l,
                    left: k
                } : {}), {
                    duration: d.animateDuration,
                    easing: d.animateEasing,
                    step: function() {
                        var d = {
                            width: parseInt(c.element.css("width"), 10),
                            height: parseInt(c.element.css("height"), 10),
                            top: parseInt(c.element.css("top"), 10),
                            left: parseInt(c.element.css("left"), 10)
                        };
                        f && f.length && a(f[0]).css({
                            width: d.width,
                            height: d.height
                        }), c._updateCache(d), c._propagate("resize", b)
                    }
                })
            }
        }), a.ui.plugin.add("resizable", "containment", {
            start: function() {
                var c, d, f, g, h, i, j, k = a(this).data("ui-resizable"),
                    l = k.options,
                    m = k.element,
                    n = l.containment,
                    o = n instanceof a ? n.get(0) : /parent/.test(n) ? m.parent().get(0) : n;
                o && (k.containerElement = a(o), /document/.test(n) || n === document ? (k.containerOffset = {
                    left: 0,
                    top: 0
                }, k.containerPosition = {
                    left: 0,
                    top: 0
                }, k.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                }) : (c = a(o), d = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, e) {
                    d[a] = b(c.css("padding" + e))
                }), k.containerOffset = c.offset(), k.containerPosition = c.position(), k.containerSize = {
                    height: c.innerHeight() - d[3],
                    width: c.innerWidth() - d[1]
                }, f = k.containerOffset, g = k.containerSize.height, h = k.containerSize.width, i = a.ui.hasScroll(o, "left") ? o.scrollWidth : h, j = a.ui.hasScroll(o) ? o.scrollHeight : g, k.parentData = {
                    element: o,
                    left: f.left,
                    top: f.top,
                    width: i,
                    height: j
                }))
            },
            resize: function(b) {
                var c, d, f, g, h = a(this).data("ui-resizable"),
                    i = h.options,
                    j = h.containerOffset,
                    k = h.position,
                    l = h._aspectRatio || b.shiftKey,
                    m = {
                        top: 0,
                        left: 0
                    },
                    n = h.containerElement;
                n[0] !== document && /static/.test(n.css("position")) && (m = j), k.left < (h._helper ? j.left : 0) && (h.size.width = h.size.width + (h._helper ? h.position.left - j.left : h.position.left - m.left), l && (h.size.height = h.size.width / h.aspectRatio), h.position.left = i.helper ? j.left : 0), k.top < (h._helper ? j.top : 0) && (h.size.height = h.size.height + (h._helper ? h.position.top - j.top : h.position.top), l && (h.size.width = h.size.height * h.aspectRatio), h.position.top = h._helper ? j.top : 0), h.offset.left = h.parentData.left + h.position.left, h.offset.top = h.parentData.top + h.position.top, c = Math.abs((h._helper ? h.offset.left - m.left : h.offset.left - m.left) + h.sizeDiff.width), d = Math.abs((h._helper ? h.offset.top - m.top : h.offset.top - j.top) + h.sizeDiff.height), f = h.containerElement.get(0) === h.element.parent().get(0), g = /relative|absolute/.test(h.containerElement.css("position")), f && g && (c -= h.parentData.left), c + h.size.width >= h.parentData.width && (h.size.width = h.parentData.width - c, l && (h.size.height = h.size.width / h.aspectRatio)), d + h.size.height >= h.parentData.height && (h.size.height = h.parentData.height - d, l && (h.size.width = h.size.height * h.aspectRatio))
            },
            stop: function() {
                var b = a(this).data("ui-resizable"),
                    c = b.options,
                    d = b.containerOffset,
                    f = b.containerPosition,
                    g = b.containerElement,
                    h = a(b.helper),
                    i = h.offset(),
                    j = h.outerWidth() - b.sizeDiff.width,
                    k = h.outerHeight() - b.sizeDiff.height;
                b._helper && !c.animate && /relative/.test(g.css("position")) && a(this).css({
                    left: i.left - f.left - d.left,
                    width: j,
                    height: k
                }), b._helper && !c.animate && /static/.test(g.css("position")) && a(this).css({
                    left: i.left - f.left - d.left,
                    width: j,
                    height: k
                })
            }
        }), a.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var b = a(this).data("ui-resizable"),
                    c = b.options,
                    d = function(b) {
                        a(b).each(function() {
                            var b = a(this);
                            b.data("ui-resizable-alsoresize", {
                                width: parseInt(b.width(), 10),
                                height: parseInt(b.height(), 10),
                                left: parseInt(b.css("left"), 10),
                                top: parseInt(b.css("top"), 10)
                            })
                        })
                    };
                "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function(a) {
                    d(a)
                })
            },
            resize: function(b, c) {
                var d = a(this).data("ui-resizable"),
                    f = d.options,
                    g = d.originalSize,
                    h = d.originalPosition,
                    i = {
                        height: d.size.height - g.height || 0,
                        width: d.size.width - g.width || 0,
                        top: d.position.top - h.top || 0,
                        left: d.position.left - h.left || 0
                    },
                    j = function(b, d) {
                        a(b).each(function() {
                            var b = a(this),
                                f = a(this).data("ui-resizable-alsoresize"),
                                g = {},
                                h = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            a.each(h, function(a, b) {
                                var c = (f[b] || 0) + (i[b] || 0);
                                c && c >= 0 && (g[b] = c || null)
                            }), b.css(g)
                        })
                    };
                "object" != typeof f.alsoResize || f.alsoResize.nodeType ? j(f.alsoResize) : a.each(f.alsoResize, function(a, b) {
                    j(a, b)
                })
            },
            stop: function() {
                a(this).removeData("resizable-alsoresize")
            }
        }), a.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var b = a(this).data("ui-resizable"),
                    c = b.options,
                    d = b.size;
                b.ghost = b.originalElement.clone(), b.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: d.height,
                    width: d.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
            },
            resize: function() {
                var b = a(this).data("ui-resizable");
                b.ghost && b.ghost.css({
                    position: "relative",
                    height: b.size.height,
                    width: b.size.width
                })
            },
            stop: function() {
                var b = a(this).data("ui-resizable");
                b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
            }
        }), a.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var b = a(this).data("ui-resizable"),
                    c = b.options,
                    d = b.size,
                    f = b.originalSize,
                    g = b.originalPosition,
                    h = b.axis,
                    i = "number" == typeof c.grid ? [c.grid, c.grid] : c.grid,
                    j = i[0] || 1,
                    k = i[1] || 1,
                    l = Math.round((d.width - f.width) / j) * j,
                    m = Math.round((d.height - f.height) / k) * k,
                    n = f.width + l,
                    o = f.height + m,
                    p = c.maxWidth && n > c.maxWidth,
                    q = c.maxHeight && o > c.maxHeight,
                    r = c.minWidth && c.minWidth > n,
                    s = c.minHeight && c.minHeight > o;
                c.grid = i, r && (n += j), s && (o += k), p && (n -= j), q && (o -= k), /^(se|s|e)$/.test(h) ? (b.size.width = n, b.size.height = o) : /^(ne)$/.test(h) ? (b.size.width = n, b.size.height = o, b.position.top = g.top - m) : /^(sw)$/.test(h) ? (b.size.width = n, b.size.height = o, b.position.left = g.left - l) : (b.size.width = n, b.size.height = o, b.position.top = g.top - m, b.position.left = g.left - l)
            }
        })
    }(jQuery),
    function(a) {
        a.widget("ui.selectable", a.ui.mouse, {
            version: "1.10.3",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var b, c = this;
                this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                    b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function() {
                        var b = a(this),
                            c = b.offset();
                        a.data(this, "selectable-item", {
                            element: this,
                            $element: b,
                            left: c.left,
                            top: c.top,
                            right: c.left + b.outerWidth(),
                            bottom: c.top + b.outerHeight(),
                            startselected: !1,
                            selected: b.hasClass("ui-selected"),
                            selecting: b.hasClass("ui-selecting"),
                            unselecting: b.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
            },
            _destroy: function() {
                this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
            },
            _mouseStart: function(b) {
                var c = this,
                    d = this.options;
                this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
                    left: b.pageX,
                    top: b.pageY,
                    width: 0,
                    height: 0
                }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                    var d = a.data(this, "selectable-item");
                    d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
                        unselecting: d.element
                    }))
                }), a(b.target).parents().addBack().each(function() {
                    var d, f = a.data(this, "selectable-item");
                    return f ? (d = !b.metaKey && !b.ctrlKey || !f.$element.hasClass("ui-selected"), f.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), f.unselecting = !d, f.selecting = d, f.selected = d, d ? c._trigger("selecting", b, {
                        selecting: f.element
                    }) : c._trigger("unselecting", b, {
                        unselecting: f.element
                    }), !1) : undefined
                }))
            },
            _mouseDrag: function(b) {
                if (this.dragged = !0, !this.options.disabled) {
                    var c, d = this,
                        f = this.options,
                        g = this.opos[0],
                        h = this.opos[1],
                        i = b.pageX,
                        j = b.pageY;
                    return g > i && (c = i, i = g, g = c), h > j && (c = j, j = h, h = c), this.helper.css({
                        left: g,
                        top: h,
                        width: i - g,
                        height: j - h
                    }), this.selectees.each(function() {
                        var c = a.data(this, "selectable-item"),
                            k = !1;
                        c && c.element !== d.element[0] && ("touch" === f.tolerance ? k = !(c.left > i || g > c.right || c.top > j || h > c.bottom) : "fit" === f.tolerance && (k = c.left > g && i > c.right && c.top > h && j > c.bottom), k ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
                            selecting: c.element
                        }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
                            unselecting: c.element
                        }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
                            unselecting: c.element
                        })))))
                    }), !1
                }
            },
            _mouseStop: function(b) {
                var c = this;
                return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function() {
                    var d = a.data(this, "selectable-item");
                    d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
                        unselected: d.element
                    })
                }), a(".ui-selecting", this.element[0]).each(function() {
                    var d = a.data(this, "selectable-item");
                    d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
                        selected: d.element
                    })
                }), this._trigger("stop", b), this.helper.remove(), !1
            }
        })
    }(jQuery),
    function(a) {
        function b(a, b, c) {
            return a > b && b + c > a
        }

        function c(a) {
            return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
        }
        a.widget("ui.sortable", a.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var a = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || c(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function(b, c) {
                "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(b, c) {
                var d = null,
                    f = !1,
                    g = this;
                return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function() {
                    return a.data(this, g.widgetName + "-item") === g ? (d = a(this), !1) : undefined
                }), a.data(b.target, g.widgetName + "-item") === g && (d = a(b.target)), d ? !this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function() {
                    this === b.target && (f = !0)
                }), f) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1 : !1)
            },
            _mouseStart: function(b, c, d) {
                var f, g, h = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, a.extend(this.offset, {
                        click: {
                            left: b.pageX - this.offset.left,
                            top: b.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, h.cursorAt && this._adjustOffsetFromHelper(h.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), h.containment && this._setContainment(), h.cursor && "auto" !== h.cursor && (g = this.document.find("body"), this.storedCursor = g.css("cursor"), g.css("cursor", h.cursor), this.storedStylesheet = a("<style>*{ cursor: " + h.cursor + " !important; }</style>").appendTo(g)), h.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", h.opacity)), h.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", h.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
                    for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", b, this._uiHash(this));
                return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !h.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
            },
            _mouseDrag: function(b) {
                var c, d, f, g, h = this.options,
                    i = !1;
                for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < h.scrollSensitivity ? this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop + h.scrollSpeed : b.pageY - this.overflowOffset.top < h.scrollSensitivity && (this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop - h.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < h.scrollSensitivity ? this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft + h.scrollSpeed : b.pageX - this.overflowOffset.left < h.scrollSensitivity && (this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft - h.scrollSpeed)) : (b.pageY - a(document).scrollTop() < h.scrollSensitivity ? i = a(document).scrollTop(a(document).scrollTop() - h.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < h.scrollSensitivity && (i = a(document).scrollTop(a(document).scrollTop() + h.scrollSpeed)), b.pageX - a(document).scrollLeft() < h.scrollSensitivity ? i = a(document).scrollLeft(a(document).scrollLeft() - h.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < h.scrollSensitivity && (i = a(document).scrollLeft(a(document).scrollLeft() + h.scrollSpeed))), i !== !1 && a.ui.ddmanager && !h.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)
                    if (d = this.items[c], f = d.item[0], g = this._intersectsWithPointer(d), g && d.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === g ? "next" : "prev"]()[0] !== f && !a.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], f) : !0)) {
                        if (this.direction = 1 === g ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
                        this._rearrange(b, d), this._trigger("change", b, this._uiHash());
                        break
                    }
                return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(b, c) {
                if (b) {
                    if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
                        var d = this,
                            f = this.placeholder.offset(),
                            g = this.options.axis,
                            h = {};
                        g && "x" !== g || (h.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), g && "y" !== g || (h.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(h, parseInt(this.options.revert, 10) || 500, function() {
                            d._clear(b)
                        })
                    } else this._clear(b, c);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(b) {
                var c = this._getItemsAsjQuery(b && b.connected),
                    d = [];
                return b = b || {}, a(c).each(function() {
                    var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                    c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
                }), !d.length && b.key && d.push(b.key + "="), d.join("&")
            },
            toArray: function(b) {
                var c = this._getItemsAsjQuery(b && b.connected),
                    d = [];
                return b = b || {}, c.each(function() {
                    d.push(a(b.item || this).attr(b.attribute || "id") || "")
                }), d
            },
            _intersectsWith: function(a) {
                var b = this.positionAbs.left,
                    c = b + this.helperProportions.width,
                    d = this.positionAbs.top,
                    e = d + this.helperProportions.height,
                    f = a.left,
                    g = f + a.width,
                    h = a.top,
                    i = h + a.height,
                    j = this.offset.click.top,
                    k = this.offset.click.left,
                    l = "x" === this.options.axis || d + j > h && i > d + j,
                    m = "y" === this.options.axis || b + k > f && g > b + k,
                    n = l && m;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : b + this.helperProportions.width / 2 > f && g > c - this.helperProportions.width / 2 && d + this.helperProportions.height / 2 > h && i > e - this.helperProportions.height / 2
            },
            _intersectsWithPointer: function(a) {
                var c = "x" === this.options.axis || b(this.positionAbs.top + this.offset.click.top, a.top, a.height),
                    d = "y" === this.options.axis || b(this.positionAbs.left + this.offset.click.left, a.left, a.width),
                    e = c && d,
                    f = this._getDragVerticalDirection(),
                    g = this._getDragHorizontalDirection();
                return e ? this.floating ? g && "right" === g || "down" === f ? 2 : 1 : f && ("down" === f ? 2 : 1) : !1
            },
            _intersectsWithSides: function(a) {
                var c = b(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
                    d = b(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
                    e = this._getDragVerticalDirection(),
                    f = this._getDragHorizontalDirection();
                return this.floating && f ? "right" === f && d || "left" === f && !d : e && ("down" === e && c || "up" === e && !c)
            },
            _getDragVerticalDirection: function() {
                var a = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== a && (a > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var a = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== a && (a > 0 ? "right" : "left")
            },
            refresh: function(a) {
                return this._refreshItems(a), this.refreshPositions(), this
            },
            _connectWith: function() {
                var a = this.options;
                return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
            },
            _getItemsAsjQuery: function(b) {
                var c, d, f, g, h = [],
                    i = [],
                    j = this._connectWith();
                if (j && b)
                    for (c = j.length - 1; c >= 0; c--)
                        for (f = a(j[c]), d = f.length - 1; d >= 0; d--) g = a.data(f[d], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
                for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), c = i.length - 1; c >= 0; c--) i[c][0].each(function() {
                    h.push(this)
                });
                return a(h)
            },
            _removeCurrentsFromItems: function() {
                var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = a.grep(this.items, function(a) {
                    for (var c = 0; b.length > c; c++)
                        if (b[c] === a.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(b) {
                this.items = [], this.containers = [this];
                var c, d, f, g, h, i, j, k, l = this.items,
                    m = [
                        [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                            item: this.currentItem
                        }) : a(this.options.items, this.element), this]
                    ],
                    n = this._connectWith();
                if (n && this.ready)
                    for (c = n.length - 1; c >= 0; c--)
                        for (f = a(n[c]), d = f.length - 1; d >= 0; d--) g = a.data(f[d], this.widgetFullName), g && g !== this && !g.options.disabled && (m.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {
                            item: this.currentItem
                        }) : a(g.options.items, g.element), g]), this.containers.push(g));
                for (c = m.length - 1; c >= 0; c--)
                    for (h = m[c][1], i = m[c][0], d = 0, k = i.length; k > d; d++) j = a(i[d]), j.data(this.widgetName + "-item", h), l.push({
                        item: j,
                        instance: h,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(b) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var c, d, f, g;
                for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (f = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = f.outerWidth(), d.height = f.outerHeight()), g = f.offset(), d.left = g.left, d.top = g.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (c = this.containers.length - 1; c >= 0; c--) g = this.containers[c].element.offset(), this.containers[c].containerCache.left = g.left, this.containers[c].containerCache.top = g.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
                return this
            },
            _createPlaceholder: function(b) {
                b = b || this;
                var c, d = b.options;
                d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
                    element: function() {
                        var d = b.currentItem[0].nodeName.toLowerCase(),
                            f = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === d ? b.currentItem.children().each(function() {
                            a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(f)
                        }) : "img" === d && f.attr("src", b.currentItem.attr("src")), c || f.css("visibility", "hidden"), f
                    },
                    update: function(a, e) {
                        (!c || d.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
            },
            _contactContainers: function(d) {
                var f, g, h, j, k, l, m, n, o, p, q = null,
                    r = null;
                for (f = this.containers.length - 1; f >= 0; f--)
                    if (!a.contains(this.currentItem[0], this.containers[f].element[0]))
                        if (this._intersectsWith(this.containers[f].containerCache)) {
                            if (q && a.contains(this.containers[f].element[0], q.element[0])) continue;
                            q = this.containers[f], r = f
                        } else this.containers[f].containerCache.over && (this.containers[f]._trigger("out", d, this._uiHash(this)), this.containers[f].containerCache.over = 0);
                if (q)
                    if (1 === this.containers.length) this.containers[r].containerCache.over || (this.containers[r]._trigger("over", d, this._uiHash(this)), this.containers[r].containerCache.over = 1);
                    else {
                        for (h = 1e4, j = null, p = q.floating || c(this.currentItem), k = p ? "left" : "top", l = p ? "width" : "height", m = this.positionAbs[k] + this.offset.click[k], g = this.items.length - 1; g >= 0; g--) a.contains(this.containers[r].element[0], this.items[g].item[0]) && this.items[g].item[0] !== this.currentItem[0] && (!p || b(this.positionAbs.top + this.offset.click.top, this.items[g].top, this.items[g].height)) && (n = this.items[g].item.offset()[k], o = !1, Math.abs(n - m) > Math.abs(n + this.items[g][l] - m) && (o = !0, n += this.items[g][l]), h > Math.abs(n - m) && (h = Math.abs(n - m), j = this.items[g], this.direction = o ? "up" : "down"));
                        if (!j && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[r]) return;
                        j ? this._rearrange(d, j, null, !0) : this._rearrange(d, null, this.containers[r].element, !0), this._trigger("change", d, this._uiHash()), this.containers[r]._trigger("change", d, this._uiHash(this)), this.currentContainer = this.containers[r], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", d, this._uiHash(this)), this.containers[r].containerCache.over = 1
                    }
            },
            _createHelper: function(b) {
                var c = this.options,
                    d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
                return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
            },
            _adjustOffsetFromHelper: function(b) {
                "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
                    left: +b[0],
                    top: +b[1] || 0
                }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var b = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
                    top: 0,
                    left: 0
                }), {
                    top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var a = this.currentItem.position();
                    return {
                        top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var b, c, d, f = this.options;
                "parent" === f.containment && (f.containment = this.helper[0].parentNode), ("document" === f.containment || "window" === f.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === f.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === f.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(f.containment) || (b = a(f.containment)[0], c = a(f.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(b, c) {
                c || (c = this.position);
                var d = "absolute" === b ? 1 : -1,
                    f = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    g = /(html|body)/i.test(f[0].tagName);
                return {
                    top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d,
                    left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d
                }
            },
            _generatePosition: function(b) {
                var c, d, f = this.options,
                    g = b.pageX,
                    h = b.pageY,
                    i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    j = /(html|body)/i.test(i[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (g = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (h = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (g = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (h = this.containment[3] + this.offset.click.top)), f.grid && (c = this.originalPageY + Math.round((h - this.originalPageY) / f.grid[1]) * f.grid[1], h = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - f.grid[1] : c + f.grid[1] : c, d = this.originalPageX +
                    Math.round((g - this.originalPageX) / f.grid[0]) * f.grid[0], g = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - f.grid[0] : d + f.grid[0] : d)), {
                    top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : j ? 0 : i.scrollTop()),
                    left: g - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : j ? 0 : i.scrollLeft())
                }
            },
            _rearrange: function(a, b, c, d) {
                c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var e = this.counter;
                this._delay(function() {
                    e === this.counter && this.refreshPositions(!d)
                })
            },
            _clear: function(a, b) {
                this.reverting = !1;
                var c, d = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (c in this._storedCSS)("auto" === this._storedCSS[c] || "static" === this._storedCSS[c]) && (this._storedCSS[c] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !b && d.push(function(a) {
                        this._trigger("receive", a, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || d.push(function(a) {
                        this._trigger("update", a, this._uiHash())
                    }), this !== this.currentContainer && (b || (d.push(function(a) {
                        this._trigger("remove", a, this._uiHash())
                    }), d.push(function(a) {
                        return function(b) {
                            a._trigger("receive", b, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), d.push(function(a) {
                        return function(b) {
                            a._trigger("update", b, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), c = this.containers.length - 1; c >= 0; c--) b || d.push(function(a) {
                    return function(b) {
                        a._trigger("deactivate", b, this._uiHash(this))
                    }
                }.call(this, this.containers[c])), this.containers[c].containerCache.over && (d.push(function(a) {
                    return function(b) {
                        a._trigger("out", b, this._uiHash(this))
                    }
                }.call(this, this.containers[c])), this.containers[c].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!b) {
                        for (this._trigger("beforeStop", a, this._uiHash()), c = 0; d.length > c; c++) d[c].call(this, a);
                        this._trigger("stop", a, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !b) {
                    for (c = 0; d.length > c; c++) d[c].call(this, a);
                    this._trigger("stop", a, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(b) {
                var c = b || this;
                return {
                    helper: c.helper,
                    placeholder: c.placeholder || a([]),
                    position: c.position,
                    originalPosition: c.originalPosition,
                    offset: c.positionAbs,
                    item: c.currentItem,
                    sender: b ? b.element : null
                }
            }
        })
    }(jQuery),
    function(a) {
        var b = 0,
            c = {},
            d = {};
        c.height = c.paddingTop = c.paddingBottom = c.borderTopWidth = c.borderBottomWidth = "hide", d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "show", a.widget("ui.accordion", {
            version: "1.10.3",
            options: {
                active: 0,
                animate: {},
                collapsible: !1,
                event: "click",
                header: "> li > :first-child,> :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            _create: function() {
                var b = this.options;
                this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), 0 > b.active && (b.active += this.headers.length), this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : a(),
                    content: this.active.length ? this.active.next() : a()
                }
            },
            _createIcons: function() {
                var b = this.options.icons;
                b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var a;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                }), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                    /^ui-accordion/.test(this.id) && this.removeAttribute("id")
                }), "content" !== this.options.heightStyle && a.css("height", "")
            },
            _setOption: function(a, b) {
                return "active" === a ? (this._activate(b), undefined) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), "disabled" === a && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b), undefined)
            },
            _keydown: function(b) {
                if (!b.altKey && !b.ctrlKey) {
                    var c = a.ui.keyCode,
                        d = this.headers.length,
                        f = this.headers.index(b.target),
                        g = !1;
                    switch (b.keyCode) {
                        case c.RIGHT:
                        case c.DOWN:
                            g = this.headers[(f + 1) % d];
                            break;
                        case c.LEFT:
                        case c.UP:
                            g = this.headers[(f - 1 + d) % d];
                            break;
                        case c.SPACE:
                        case c.ENTER:
                            this._eventHandler(b);
                            break;
                        case c.HOME:
                            g = this.headers[0];
                            break;
                        case c.END:
                            g = this.headers[d - 1]
                    }
                    g && (a(b.target).attr("tabIndex", -1), a(g).attr("tabIndex", 0), g.focus(), b.preventDefault())
                }
            },
            _panelKeyDown: function(b) {
                b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
            },
            refresh: function() {
                var b = this.options;
                this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
            },
            _processPanels: function() {
                this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
            },
            _refresh: function() {
                var c, d = this.options,
                    f = d.heightStyle,
                    g = this.element.parent(),
                    h = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++b);
                this.active = this._findActive(d.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(b) {
                    var c = a(this),
                        d = c.attr("id"),
                        f = c.next(),
                        g = f.attr("id");
                    d || (d = h + "-header-" + b, c.attr("id", d)), g || (g = h + "-panel-" + b, f.attr("id", g)), c.attr("aria-controls", g), f.attr("aria-labelledby", d)
                }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }).hide(), this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(d.event), "fill" === f ? (c = g.height(), this.element.siblings(":visible").each(function() {
                    var b = a(this),
                        d = b.css("position");
                    "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
                }), this.headers.each(function() {
                    c -= a(this).outerHeight(!0)
                }), this.headers.next().each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")) : "auto" === f && (c = 0, this.headers.next().each(function() {
                    c = Math.max(c, a(this).css("height", "").height())
                }).height(c))
            },
            _activate: function(b) {
                var c = this._findActive(b)[0];
                c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
                    target: c,
                    currentTarget: c,
                    preventDefault: a.noop
                }))
            },
            _findActive: function(b) {
                return "number" == typeof b ? this.headers.eq(b) : a()
            },
            _setupEvents: function(b) {
                var c = {
                    keydown: "_keydown"
                };
                b && a.each(b.split(" "), function(a, b) {
                    c[b] = "_eventHandler"
                }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }), this._hoverable(this.headers), this._focusable(this.headers)
            },
            _eventHandler: function(b) {
                var c = this.options,
                    d = this.active,
                    f = a(b.currentTarget),
                    g = f[0] === d[0],
                    h = g && c.collapsible,
                    i = h ? a() : f.next(),
                    j = d.next(),
                    k = {
                        oldHeader: d,
                        oldPanel: j,
                        newHeader: h ? a() : f,
                        newPanel: i
                    };
                b.preventDefault(), g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.headers.index(f), this.active = g ? a() : f, this._toggle(k), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), g || (f.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && f.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), f.next().addClass("ui-accordion-content-active")))
            },
            _toggle: function(b) {
                var c = b.newPanel,
                    d = this.prevShow.length ? this.prevShow : b.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), d.prev().attr("aria-selected", "false"), c.length && d.length ? d.prev().attr("tabIndex", -1) : c.length && this.headers.filter(function() {
                    return 0 === a(this).attr("tabIndex")
                }).attr("tabIndex", -1), c.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }).prev().attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _animate: function(a, b, e) {
                var f, g, h, j = this,
                    k = 0,
                    l = a.length && (!b.length || a.index() < b.index()),
                    m = this.options.animate || {},
                    n = l && m.down || m,
                    o = function() {
                        j._toggleComplete(e)
                    };
                return "number" == typeof n && (h = n), "string" == typeof n && (g = n), g = g || n.easing || m.easing, h = h || n.duration || m.duration, b.length ? a.length ? (f = a.show().outerHeight(), b.animate(c, {
                    duration: h,
                    easing: g,
                    step: function(a, b) {
                        b.now = Math.round(a)
                    }
                }), a.hide().animate(d, {
                    duration: h,
                    easing: g,
                    complete: o,
                    step: function(a, c) {
                        c.now = Math.round(a), "height" !== c.prop ? k += c.now : "content" !== j.options.heightStyle && (c.now = Math.round(f - b.outerHeight() - k), k = 0)
                    }
                }), undefined) : b.animate(c, h, g, o) : a.animate(d, h, g, o)
            },
            _toggleComplete: function(a) {
                var b = a.oldPanel;
                b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
            }
        })
    }(jQuery),
    function(a) {
        var b = 0;
        a.widget("ui.autocomplete", {
            version: "1.10.3",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            pending: 0,
            _create: function() {
                var b, c, d, f = this.element[0].nodeName.toLowerCase(),
                    g = "textarea" === f,
                    h = "input" === f;
                this.isMultiLine = g ? !0 : h ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[g || h ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(f) {
                        if (this.element.prop("readOnly")) return b = !0, d = !0, c = !0, undefined;
                        b = !1, d = !1, c = !1;
                        var g = a.ui.keyCode;
                        switch (f.keyCode) {
                            case g.PAGE_UP:
                                b = !0, this._move("previousPage", f);
                                break;
                            case g.PAGE_DOWN:
                                b = !0, this._move("nextPage", f);
                                break;
                            case g.UP:
                                b = !0, this._keyEvent("previous", f);
                                break;
                            case g.DOWN:
                                b = !0, this._keyEvent("next", f);
                                break;
                            case g.ENTER:
                            case g.NUMPAD_ENTER:
                                this.menu.active && (b = !0, f.preventDefault(), this.menu.select(f));
                                break;
                            case g.TAB:
                                this.menu.active && this.menu.select(f);
                                break;
                            case g.ESCAPE:
                                this.menu.element.is(":visible") && (this._value(this.term), this.close(f), f.preventDefault());
                                break;
                            default:
                                c = !0, this._searchTimeout(f)
                        }
                    },
                    keypress: function(d) {
                        if (b) return b = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && d.preventDefault(), undefined;
                        if (!c) {
                            var f = a.ui.keyCode;
                            switch (d.keyCode) {
                                case f.PAGE_UP:
                                    this._move("previousPage", d);
                                    break;
                                case f.PAGE_DOWN:
                                    this._move("nextPage", d);
                                    break;
                                case f.UP:
                                    this._keyEvent("previous", d);
                                    break;
                                case f.DOWN:
                                    this._keyEvent("next", d)
                            }
                        }
                    },
                    input: function(a) {
                        return d ? (d = !1, a.preventDefault(), undefined) : (this._searchTimeout(a), undefined)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(a) {
                        return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(a), this._change(a), undefined)
                    }
                }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().data("ui-menu"), this._on(this.menu.element, {
                    mousedown: function(b) {
                        b.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var c = this.menu.element[0];
                        a(b.target).closest(".ui-menu-item").length || this._delay(function() {
                            var b = this;
                            this.document.one("mousedown", function(d) {
                                d.target === b.element[0] || d.target === c || a.contains(c, d.target) || b.close()
                            })
                        })
                    },
                    menufocus: function(b, c) {
                        if (this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                            a(b.target).trigger(b.originalEvent)
                        }), undefined;
                        var d = c.item.data("ui-autocomplete-item");
                        !1 !== this._trigger("focus", b, {
                            item: d
                        }) ? b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(d.value) : this.liveRegion.text(d.value)
                    },
                    menuselect: function(a, b) {
                        var c = b.item.data("ui-autocomplete-item"),
                            d = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = d, this._delay(function() {
                            this.previous = d, this.selectedItem = c
                        })), !1 !== this._trigger("select", a, {
                            item: c
                        }) && this._value(c.value), this.term = this._value(), this.close(a), this.selectedItem = c
                    }
                }), this.liveRegion = a("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(a, b) {
                this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var b = this.options.appendTo;
                return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b || (b = this.element.closest(".ui-front")), b.length || (b = this.document[0].body), b
            },
            _initSource: function() {
                var b, c, d = this;
                a.isArray(this.options.source) ? (b = this.options.source, this.source = function(c, d) {
                    d(a.ui.autocomplete.filter(b, c.term))
                }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function(b, f) {
                    d.xhr && d.xhr.abort(), d.xhr = a.ajax({
                        url: c,
                        data: b,
                        dataType: "json",
                        success: function(a) {
                            f(a)
                        },
                        error: function() {
                            f([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(a) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, a))
                }, this.options.delay)
            },
            search: function(a, b) {
                return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : undefined
            },
            _search: function(a) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: a
                }, this._response())
            },
            _response: function() {
                var a = this,
                    c = ++b;
                return function(d) {
                    c === b && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function(a) {
                a && (a = this._normalize(a)), this._trigger("response", null, {
                    content: a
                }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
            },
            close: function(a) {
                this.cancelSearch = !0, this._close(a)
            },
            _close: function(a) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
            },
            _change: function(a) {
                this.previous !== this._value() && this._trigger("change", a, {
                    item: this.selectedItem
                })
            },
            _normalize: function(b) {
                return b.length && b[0].label && b[0].value ? b : a.map(b, function(b) {
                    return "string" == typeof b ? {
                        label: b,
                        value: b
                    } : a.extend({
                        label: b.label || b.value,
                        value: b.value || b.label
                    }, b)
                })
            },
            _suggest: function(b) {
                var c = this.menu.element.empty();
                this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var a = this.menu.element;
                a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(b, c) {
                var d = this;
                a.each(c, function(a, c) {
                    d._renderItemData(b, c)
                })
            },
            _renderItemData: function(a, b) {
                return this._renderItem(a, b).data("ui-autocomplete-item", b)
            },
            _renderItem: function(b, c) {
                return a("<li>").append(a("<a>").text(c.label)).appendTo(b)
            },
            _move: function(a, b) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[a](b), undefined) : (this.search(null, b), undefined)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(a, b) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, b), b.preventDefault())
            }
        }), a.extend(a.ui.autocomplete, {
            escapeRegex: function(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(b, c) {
                var d = RegExp(a.ui.autocomplete.escapeRegex(c), "i");
                return a.grep(b, function(a) {
                    return d.test(a.label || a.value || a)
                })
            }
        }), a.widget("ui.autocomplete", a.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(a) {
                        return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(a) {
                var b;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (b = a && a.length ? this.options.messages.results(a.length) : this.options.messages.noResults, this.liveRegion.text(b))
            }
        })
    }(jQuery),
    function(a) {
        var b, c, d, e, f = "ui-button ui-widget ui-state-default ui-corner-all",
            g = "ui-state-hover ui-state-active ",
            h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            i = function() {
                var b = a(this);
                setTimeout(function() {
                    b.find(":ui-button").button("refresh")
                }, 1)
            },
            j = function(b) {
                var c = b.name,
                    d = b.form,
                    e = a([]);
                return c && (c = c.replace(/'/g, "\\'"), e = d ? a(d).find("[name='" + c + "']") : a("[name='" + c + "']", b.ownerDocument).filter(function() {
                    return !this.form
                })), e
            };
        a.widget("ui.button", {
            version: "1.10.3",
            defaultElement: "<button>",
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, i), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
                var g = this,
                    h = this.options,
                    k = "checkbox" === this.type || "radio" === this.type,
                    m = k ? "" : "ui-state-active",
                    o = "ui-state-focus";
                null === h.label && (h.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(f).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                    h.disabled || this === b && a(this).addClass("ui-state-active")
                }).bind("mouseleave" + this.eventNamespace, function() {
                    h.disabled || a(this).removeClass(m)
                }).bind("click" + this.eventNamespace, function(a) {
                    h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
                }), this.element.bind("focus" + this.eventNamespace, function() {
                    g.buttonElement.addClass(o)
                }).bind("blur" + this.eventNamespace, function() {
                    g.buttonElement.removeClass(o)
                }), k && (this.element.bind("change" + this.eventNamespace, function() {
                    e || g.refresh()
                }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(a) {
                    h.disabled || (e = !1, c = a.pageX, d = a.pageY)
                }).bind("mouseup" + this.eventNamespace, function(a) {
                    h.disabled || (c !== a.pageX || d !== a.pageY) && (e = !0)
                })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    return h.disabled || e ? !1 : undefined
                }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                    if (h.disabled || e) return !1;
                    a(this).addClass("ui-state-active"), g.buttonElement.attr("aria-pressed", "true");
                    var b = g.element[0];
                    j(b).not(b).map(function() {
                        return a(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                    return h.disabled ? !1 : (a(this).addClass("ui-state-active"), b = this, g.document.one("mouseup", function() {
                        b = null
                    }), undefined)
                }).bind("mouseup" + this.eventNamespace, function() {
                    return h.disabled ? !1 : (a(this).removeClass("ui-state-active"), undefined)
                }).bind("keydown" + this.eventNamespace, function(b) {
                    return h.disabled ? !1 : ((b.keyCode === a.ui.keyCode.SPACE || b.keyCode === a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active"), undefined)
                }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                    a(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
                    b.keyCode === a.ui.keyCode.SPACE && a(this).click()
                })), this._setOption("disabled", h.disabled), this._resetButton()
            },
            _determineButtonType: function() {
                var a, b, c;
                this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), b = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible"), c = this.element.is(":checked"), c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)) : this.buttonElement = this.element
            },
            widget: function() {
                return this.buttonElement
            },
            _destroy: function() {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(f + " " + g + " " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
            },
            _setOption: function(a, b) {
                return this._super(a, b), "disabled" === a ? (b ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), undefined) : (this._resetButton(), undefined)
            },
            refresh: function() {
                var b = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
                b !== this.options.disabled && this._setOption("disabled", b), "radio" === this.type ? j(this.element[0]).each(function() {
                    a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function() {
                if ("input" === this.type) return this.options.label && this.element.val(this.options.label), undefined;
                var b = this.buttonElement.removeClass(h),
                    c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
                    d = this.options.icons,
                    e = d.primary && d.secondary,
                    f = [];
                d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", a.trim(c)))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
            }
        }), a.widget("ui.buttonset", {
            version: "1.10.3",
            options: {
                items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
            },
            _create: function() {
                this.element.addClass("ui-buttonset")
            },
            _init: function() {
                this.refresh()
            },
            _setOption: function(a, b) {
                "disabled" === a && this.buttons.button("option", a, b), this._super(a, b)
            },
            refresh: function() {
                var b = "rtl" === this.element.css("direction");
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                    return a(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            _destroy: function() {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                    return a(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
            }
        })
    }(jQuery),
    function(a, b) {
        function c() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, a.extend(this._defaults, this.regional[""]), this.dpDiv = d(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function d(b) {
            var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return b.delegate(c, "mouseout", function() {
                a(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover")
            }).delegate(c, "mouseover", function() {
                a.datepicker._isDisabledDatepicker(f.inline ? b.parent()[0] : f.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function e(b, c) {
            a.extend(b, c);
            for (var d in c) null == c[d] && (b[d] = c[d]);
            return b
        }
        a.extend(a.ui, {
            datepicker: {
                version: "1.10.3"
            }
        });
        var f, g = "datepicker";
        a.extend(c.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(a) {
                return e(this._defaults, a || {}), this
            },
            _attachDatepicker: function(b, c) {
                var d, e, f;
                d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
            },
            _newInst: function(b, c) {
                var e = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: e,
                    input: b,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: c,
                    dpDiv: c ? d(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(b, c) {
                var d = a(b);
                c.append = a([]), c.trigger = a([]), d.hasClass(this.markerClassName) || (this._attachments(d, c), d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(c), a.data(b, g, c), c.settings.disabled && this._disableDatepicker(b))
            },
            _attachments: function(b, c) {
                var d, e, f, g = this._get(c, "appendText"),
                    h = this._get(c, "isRTL");
                c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), ("focus" === d || "both" === d) && b.focus(this._showDatepicker), ("button" === d || "both" === d) && (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: f,
                    alt: e,
                    title: e
                }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
                    src: f,
                    alt: e,
                    title: e
                }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function() {
                    return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1
                }))
            },
            _autoSize: function(a) {
                if (this._get(a, "autoSize") && !a.inline) {
                    var b, c, d, e, f = new Date(2009, 11, 20),
                        g = this._get(a, "dateFormat");
                    g.match(/[DM]/) && (b = function(a) {
                        for (c = 0, d = 0, e = 0; a.length > e; e++) a[e].length > c && (c = a[e].length, d = e);
                        return d
                    }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
                }
            },
            _inlineDatepicker: function(b, c) {
                var d = a(b);
                d.hasClass(this.markerClassName) || (d.addClass(this.markerClassName).append(c.dpDiv), a.data(b, g, c), this._setDate(c, this._getDefaultDate(c), !0), this._updateDatepicker(c), this._updateAlternate(c), c.settings.disabled && this._disableDatepicker(b), c.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(b, c, d, f, h) {
                var i, j, k, l, m, n = this._dialogInst;
                return n || (this.uuid += 1, i = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + i + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), n = this._dialogInst = this._newInst(this._dialogInput, !1), n.settings = {}, a.data(this._dialogInput[0], g, n)), e(n.settings, f || {}), c = c && c.constructor === Date ? this._formatDate(n, c) : c, this._dialogInput.val(c), this._pos = h ? h.length ? h : [h.pageX, h.pageY] : null, this._pos || (j = document.documentElement.clientWidth, k = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, m = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [j / 2 - 100 + l, k / 2 - 150 +
                    m
                ]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), n.settings.onSelect = d, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], g, n), this
            },
            _destroyDatepicker: function(b) {
                var c, d = a(b),
                    e = a.data(b, g);
                d.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), a.removeData(b, g), "input" === c ? (e.append.remove(), e.trigger.remove(), d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === c || "span" === c) && d.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(b) {
                var c, d, e = a(b),
                    f = a.data(b, g);
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !1, f.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), d.children().removeClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
                    return a === b ? null : a
                }))
            },
            _disableDatepicker: function(b) {
                var c, d, e = a(b),
                    f = a.data(b, g);
                e.hasClass(this.markerClassName) && (c = b.nodeName.toLowerCase(), "input" === c ? (b.disabled = !0, f.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : ("div" === c || "span" === c) && (d = e.children("." + this._inlineClass), d.children().addClass("ui-state-disabled"), d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
                    return a === b ? null : a
                }), this._disabledInputs[this._disabledInputs.length] = b)
            },
            _isDisabledDatepicker: function(a) {
                if (!a) return !1;
                for (var b = 0; this._disabledInputs.length > b; b++)
                    if (this._disabledInputs[b] === a) return !0;
                return !1
            },
            _getInst: function(b) {
                try {
                    return a.data(b, g)
                } catch (c) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(c, d, f) {
                var g, h, i, j, k = this._getInst(c);
                return 2 === arguments.length && "string" == typeof d ? "defaults" === d ? a.extend({}, a.datepicker._defaults) : k ? "all" === d ? a.extend({}, k.settings) : this._get(k, d) : null : (g = d || {}, "string" == typeof d && (g = {}, g[d] = f), k && (this._curInst === k && this._hideDatepicker(), h = this._getDateDatepicker(c, !0), i = this._getMinMaxDate(k, "min"), j = this._getMinMaxDate(k, "max"), e(k.settings, g), null !== i && g.dateFormat !== b && g.minDate === b && (k.settings.minDate = this._formatDate(k, i)), null !== j && g.dateFormat !== b && g.maxDate === b && (k.settings.maxDate = this._formatDate(k, j)), "disabled" in g && (g.disabled ? this._disableDatepicker(c) : this._enableDatepicker(c)), this._attachments(a(c), k), this._autoSize(k), this._setDate(k, h), this._updateAlternate(k), this._updateDatepicker(k)), b)
            },
            _changeDatepicker: function(a, b, c) {
                this._optionDatepicker(a, b, c)
            },
            _refreshDatepicker: function(a) {
                var b = this._getInst(a);
                b && this._updateDatepicker(b)
            },
            _setDateDatepicker: function(a, b) {
                var c = this._getInst(a);
                c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
            },
            _getDateDatepicker: function(a, b) {
                var c = this._getInst(a);
                return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
            },
            _doKeyDown: function(b) {
                var c, d, e, f = a.datepicker._getInst(b.target),
                    g = !0,
                    h = f.dpDiv.is(".ui-datepicker-rtl");
                if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
                    case 9:
                        a.datepicker._hideDatepicker(), g = !1;
                        break;
                    case 13:
                        return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
                    case 27:
                        a.datepicker._hideDatepicker();
                        break;
                    case 33:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 34:
                        a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 35:
                        (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 36:
                        (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
                        break;
                    case 37:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 38:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    case 39:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                        break;
                    case 40:
                        (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
                        break;
                    default:
                        g = !1
                } else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
                g && (b.preventDefault(), b.stopPropagation())
            },
            _doKeyPress: function(c) {
                var d, e, f = a.datepicker._getInst(c.target);
                return a.datepicker._get(f, "constrainInput") ? (d = a.datepicker._possibleChars(a.datepicker._get(f, "dateFormat")), e = String.fromCharCode(null == c.charCode ? c.keyCode : c.charCode), c.ctrlKey || c.metaKey || " " > e || !d || d.indexOf(e) > -1) : b
            },
            _doKeyUp: function(b) {
                var c, d = a.datepicker._getInst(b.target);
                if (d.input.val() !== d.lastVal) try {
                    c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
                } catch (e) {}
                return !0
            },
            _showDatepicker: function(b) {
                if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
                    var c, d, f, g, h, i, j;
                    c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), d = a.datepicker._get(c, "beforeShow"), f = d ? d.apply(b, [b, c]) : {}, f !== !1 && (e(c.settings, f), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), g = !1, a(b).parents().each(function() {
                        return g |= "fixed" === a(this).css("position"), !g
                    }), h = {
                        left: a.datepicker._pos[0],
                        top: a.datepicker._pos[1]
                    }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), a.datepicker._updateDatepicker(c), h = a.datepicker._checkOffset(c, h, g), c.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : g ? "fixed" : "absolute",
                        display: "none",
                        left: h.left + "px",
                        top: h.top + "px"
                    }), c.inline || (i = a.datepicker._get(c, "showAnim"), j = a.datepicker._get(c, "duration"), c.dpDiv.zIndex(a(b).zIndex() + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[i] ? c.dpDiv.show(i, a.datepicker._get(c, "showOptions"), j) : c.dpDiv[i || "show"](i ? j : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c))
                }
            },
            _updateDatepicker: function(b) {
                this.maxRows = 4, f = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b), b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var c, d = this._getNumberOfMonths(b),
                    e = d[1],
                    g = 17;
                b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), e > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", g * e + "em"), b.dpDiv[(1 !== d[0] || 1 !== d[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function() {
                    c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(a) {
                return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
            },
            _checkOffset: function(b, c, d) {
                var e = b.dpDiv.outerWidth(),
                    f = b.dpDiv.outerHeight(),
                    g = b.input ? b.input.outerWidth() : 0,
                    h = b.input ? b.input.outerHeight() : 0,
                    i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
                    j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
                return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c
            },
            _findPos: function(b) {
                for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"];
                return c = a(b).offset(), [c.left, c.top]
            },
            _hideDatepicker: function(b) {
                var c, d, e, f, h = this._curInst;
                !h || b && h !== a.data(b, g) || this._datepickerShowing && (c = this._get(h, "showAnim"), d = this._get(h, "duration"), e = function() {
                    a.datepicker._tidyDialog(h)
                }, a.effects && (a.effects.effect[c] || a.effects[c]) ? h.dpDiv.hide(c, a.datepicker._get(h, "showOptions"), d, e) : h.dpDiv["slideDown" === c ? "slideUp" : "fadeIn" === c ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1, f = this._get(h, "onClose"), f && f.apply(h.input ? h.input[0] : null, [h.input ? h.input.val() : "", h]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(a) {
                a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(b) {
                if (a.datepicker._curInst) {
                    var c = a(b.target),
                        d = a.datepicker._getInst(c[0]);
                    (c[0].id !== a.datepicker._mainDivId && 0 === c.parents("#" + a.datepicker._mainDivId).length && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(b, c, d) {
                var e = a(b),
                    f = this._getInst(e[0]);
                this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
            },
            _gotoToday: function(b) {
                var c, d = a(b),
                    e = this._getInst(d[0]);
                this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
            },
            _selectMonthYear: function(b, c, d) {
                var e = a(b),
                    f = this._getInst(e[0]);
                f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
            },
            _selectDay: function(b, c, d, e) {
                var f, g = a(b);
                a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
            },
            _clearDate: function(b) {
                var c = a(b);
                this._selectDate(c, "")
            },
            _selectDate: function(b, c) {
                var d, e = a(b),
                    f = this._getInst(e[0]);
                c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(b) {
                var c, d, e, f = this._get(b, "altField");
                f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function() {
                    a(this).val(e)
                }))
            },
            noWeekends: function(a) {
                var b = a.getDay();
                return [b > 0 && 6 > b, ""]
            },
            iso8601Week: function(a) {
                var b, c = new Date(a.getTime());
                return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1
            },
            parseDate: function(c, d, e) {
                if (null == c || null == d) throw "Invalid arguments";
                if (d = "object" == typeof d ? "" + d : d + "", "" === d) return null;
                var f, g, h, i, j = 0,
                    k = (e ? e.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    l = "string" != typeof k ? k : (new Date).getFullYear() % 100 + parseInt(k, 10),
                    m = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort,
                    n = (e ? e.dayNames : null) || this._defaults.dayNames,
                    o = (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort,
                    p = (e ? e.monthNames : null) || this._defaults.monthNames,
                    q = -1,
                    r = -1,
                    s = -1,
                    u = -1,
                    v = !1,
                    w = function(a) {
                        var b = c.length > f + 1 && c.charAt(f + 1) === a;
                        return b && f++, b
                    },
                    x = function(a) {
                        var b = w(a),
                            c = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
                            e = RegExp("^\\d{1," + c + "}"),
                            f = d.substring(j).match(e);
                        if (!f) throw "Missing number at position " + j;
                        return j += f[0].length, parseInt(f[0], 10)
                    },
                    y = function(c, e, f) {
                        var g = -1,
                            h = a.map(w(c) ? f : e, function(a, b) {
                                return [
                                    [b, a]
                                ]
                            }).sort(function(a, b) {
                                return -(a[1].length - b[1].length)
                            });
                        if (a.each(h, function(a, c) {
                                var e = c[1];
                                return d.substr(j, e.length).toLowerCase() === e.toLowerCase() ? (g = c[0], j += e.length, !1) : b
                            }), -1 !== g) return g + 1;
                        throw "Unknown name at position " + j
                    },
                    z = function() {
                        if (d.charAt(j) !== c.charAt(f)) throw "Unexpected literal at position " + j;
                        j++
                    };
                for (f = 0; c.length > f; f++)
                    if (v) "'" !== c.charAt(f) || w("'") ? z() : v = !1;
                    else switch (c.charAt(f)) {
                        case "d":
                            s = x("d");
                            break;
                        case "D":
                            y("D", m, n);
                            break;
                        case "o":
                            u = x("o");
                            break;
                        case "m":
                            r = x("m");
                            break;
                        case "M":
                            r = y("M", o, p);
                            break;
                        case "y":
                            q = x("y");
                            break;
                        case "@":
                            i = new Date(x("@")), q = i.getFullYear(), r = i.getMonth() + 1, s = i.getDate();
                            break;
                        case "!":
                            i = new Date((x("!") - this._ticksTo1970) / 1e4), q = i.getFullYear(), r = i.getMonth() + 1, s = i.getDate();
                            break;
                        case "'":
                            w("'") ? z() : v = !0;
                            break;
                        default:
                            z()
                    }
                    if (d.length > j && (h = d.substr(j), !/^\s+/.test(h))) throw "Extra/unparsed characters found in date: " + h;
                if (-1 === q ? q = (new Date).getFullYear() : 100 > q && (q += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (l >= q ? 0 : -100)), u > -1)
                    for (r = 1, s = u;;) {
                        if (g = this._getDaysInMonth(q, r - 1), g >= s) break;
                        r++, s -= g
                    }
                if (i = this._daylightSavingAdjust(new Date(q, r - 1, s)), i.getFullYear() !== q || i.getMonth() + 1 !== r || i.getDate() !== s) throw "Invalid date";
                return i
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
            formatDate: function(a, b, c) {
                if (!b) return "";
                var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                    f = (c ? c.dayNames : null) || this._defaults.dayNames,
                    g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                    h = (c ? c.monthNames : null) || this._defaults.monthNames,
                    i = function(b) {
                        var c = a.length > d + 1 && a.charAt(d + 1) === b;
                        return c && d++, c
                    },
                    j = function(a, b, c) {
                        var d = "" + b;
                        if (i(a))
                            for (; c > d.length;) d = "0" + d;
                        return d
                    },
                    k = function(a, b, c, d) {
                        return i(a) ? d[b] : c[b]
                    },
                    l = "",
                    m = !1;
                if (b)
                    for (d = 0; a.length > d; d++)
                        if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
                        else switch (a.charAt(d)) {
                            case "d":
                                l += j("d", b.getDate(), 2);
                                break;
                            case "D":
                                l += k("D", b.getDay(), e, f);
                                break;
                            case "o":
                                l += j("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                l += j("m", b.getMonth() + 1, 2);
                                break;
                            case "M":
                                l += k("M", b.getMonth(), g, h);
                                break;
                            case "y":
                                l += i("y") ? b.getFullYear() : (10 > b.getYear() % 100 ? "0" : "") + b.getYear() % 100;
                                break;
                            case "@":
                                l += b.getTime();
                                break;
                            case "!":
                                l += 1e4 * b.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                i("'") ? l += "'" : m = !0;
                                break;
                            default:
                                l += a.charAt(d)
                        }
                        return l
            },
            _possibleChars: function(a) {
                var b, c = "",
                    d = !1,
                    e = function(c) {
                        var d = a.length > b + 1 && a.charAt(b + 1) === c;
                        return d && b++, d
                    };
                for (b = 0; a.length > b; b++)
                    if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
                    else switch (a.charAt(b)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            c += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            e("'") ? c += "'" : d = !0;
                            break;
                        default:
                            c += a.charAt(b)
                    }
                    return c
            },
            _get: function(a, c) {
                return a.settings[c] !== b ? a.settings[c] : this._defaults[c]
            },
            _setDateFromField: function(a, b) {
                if (a.input.val() !== a.lastVal) {
                    var c = this._get(a, "dateFormat"),
                        d = a.lastVal = a.input ? a.input.val() : null,
                        e = this._getDefaultDate(a),
                        f = e,
                        g = this._getFormatConfig(a);
                    try {
                        f = this.parseDate(c, d, g) || e
                    } catch (h) {
                        d = b ? "" : d
                    }
                    a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
                }
            },
            _getDefaultDate: function(a) {
                return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
            },
            _determineDate: function(b, c, d) {
                var e = function(a) {
                        var b = new Date;
                        return b.setDate(b.getDate() + a), b
                    },
                    f = function(c) {
                        try {
                            return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
                        } catch (d) {}
                        for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j;) {
                            switch (j[2] || "d") {
                                case "d":
                                case "D":
                                    h += parseInt(j[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    h += 7 * parseInt(j[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                                    break;
                                case "y":
                                case "Y":
                                    f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g))
                            }
                            j = i.exec(c)
                        }
                        return new Date(f, g, h)
                    },
                    g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
                return g = g && "Invalid Date" == "" + g ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g)
            },
            _daylightSavingAdjust: function(a) {
                return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
            },
            _setDate: function(a, b, c) {
                var d = !b,
                    e = a.selectedMonth,
                    f = a.selectedYear,
                    g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
                a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
            },
            _getDate: function(a) {
                var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return b
            },
            _attachHandlers: function(b) {
                var c = this._get(b, "stepMonths"),
                    d = "#" + b.id.replace(/\\\\/g, "\\");
                b.dpDiv.find("[data-handler]").map(function() {
                    var b = {
                        prev: function() {
                            a.datepicker._adjustDate(d, -c, "M")
                        },
                        next: function() {
                            a.datepicker._adjustDate(d, +c, "M")
                        },
                        hide: function() {
                            a.datepicker._hideDatepicker()
                        },
                        today: function() {
                            a.datepicker._gotoToday(d)
                        },
                        selectDay: function() {
                            return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return a.datepicker._selectMonthYear(d, this, "M"), !1
                        },
                        selectYear: function() {
                            return a.datepicker._selectMonthYear(d, this, "Y"), !1
                        }
                    };
                    a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
                    P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
                    Q = this._get(a, "isRTL"),
                    R = this._get(a, "showButtonPanel"),
                    S = this._get(a, "hideIfNoPrevNext"),
                    T = this._get(a, "navigationAsDateFormat"),
                    U = this._getNumberOfMonths(a),
                    V = this._get(a, "showCurrentAtPos"),
                    W = this._get(a, "stepMonths"),
                    X = 1 !== U[0] || 1 !== U[1],
                    Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                    Z = this._getMinMaxDate(a, "min"),
                    $ = this._getMinMaxDate(a, "max"),
                    _ = a.drawMonth - V,
                    ab = a.drawYear;
                if (0 > _ && (_ += 12, ab--), $)
                    for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && Z > b ? Z : b; this._daylightSavingAdjust(new Date(ab, _, 1)) > b;) _--, 0 > _ && (_ = 11, ab--);
                for (a.drawMonth = _, a.drawYear = ab, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ab, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, ab, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ab, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, ab, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; U[0] > w; w++) {
                    for (x = "", this.maxRows = 4, y = 0; U[1] > y; y++) {
                        if (z = this._daylightSavingAdjust(new Date(ab, _, a.selectedDay)), A = " ui-corner-all", B = "", X) {
                            if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
                                case 0:
                                    B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                                    break;
                                case U[1] - 1:
                                    B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                                    break;
                                default:
                                    B += " ui-datepicker-group-middle", A = ""
                            }
                            B += "'>"
                        }
                        for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ab, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; 7 > v; v++) D = (v + k) % 7, C += "<th" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + m[D] + "'>" + n[D] + "</span></th>";
                        for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ab, _), ab === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(ab, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X ? this.maxRows > G ? this.maxRows : G : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(ab, _, 1 - F)), J = 0; H > J; J++) {
                            for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; 7 > v; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && Z > I || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
                            B += K + "</tr>"
                        }
                        _++, _ > 11 && (_ = 0, ab++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
                    }
                    u += x
                }
                return u += j, a._keyEvent = !1, u
            },
            _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
                var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
                    r = this._get(a, "changeYear"),
                    s = this._get(a, "showMonthAfterYear"),
                    t = "<div class='ui-datepicker-title'>",
                    u = "";
                if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
                else {
                    for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; 12 > k; k++)(!i || k >= d.getMonth()) && (!j || e.getMonth() >= k) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
                    u += "</select>"
                }
                if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml)
                    if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
                    else {
                        for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function(a) {
                                var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
                                return isNaN(b) ? m : b
                            }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p >= o; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
                        a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
                    }
                return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>"
            },
            _adjustInstDate: function(a, b, c) {
                var d = a.drawYear + ("Y" === c ? b : 0),
                    e = a.drawMonth + ("M" === c ? b : 0),
                    f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
                    g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
                a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), ("M" === c || "Y" === c) && this._notifyChange(a)
            },
            _restrictMinMax: function(a, b) {
                var c = this._getMinMaxDate(a, "min"),
                    d = this._getMinMaxDate(a, "max"),
                    e = c && c > b ? c : b;
                return d && e > d ? d : e
            },
            _notifyChange: function(a) {
                var b = this._get(a, "onChangeMonthYear");
                b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
            },
            _getNumberOfMonths: function(a) {
                var b = this._get(a, "numberOfMonths");
                return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
            },
            _getMinMaxDate: function(a, b) {
                return this._determineDate(a, this._get(a, b + "Date"), null)
            },
            _getDaysInMonth: function(a, b) {
                return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
            },
            _getFirstDayOfMonth: function(a, b) {
                return (new Date(a, b, 1)).getDay()
            },
            _canAdjustMonth: function(a, b, c, d) {
                var e = this._getNumberOfMonths(a),
                    f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
                return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
            },
            _isInRange: function(a, b) {
                var c, d, e = this._getMinMaxDate(a, "min"),
                    f = this._getMinMaxDate(a, "max"),
                    g = null,
                    h = null,
                    i = this._get(a, "yearRange");
                return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || h >= b.getFullYear())
            },
            _getFormatConfig: function(a) {
                var b = this._get(a, "shortYearCutoff");
                return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                    shortYearCutoff: b,
                    dayNamesShort: this._get(a, "dayNamesShort"),
                    dayNames: this._get(a, "dayNames"),
                    monthNamesShort: this._get(a, "monthNamesShort"),
                    monthNames: this._get(a, "monthNames")
                }
            },
            _formatDate: function(a, b, c, d) {
                b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
                var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
                return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
            }
        }), a.fn.datepicker = function(b) {
            if (!this.length) return this;
            a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
            var c = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function() {
                "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
            }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
        }, a.datepicker = new c, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.10.3"
    }(jQuery),
    function(a) {
        var b = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            c = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        a.widget("ui.dialog", {
            version: "1.10.3",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(b) {
                        var c = a(this).css(b).offset().top;
                        0 > c && a(this).css("top", b.top - c)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                }, this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var b = this.options.appendTo;
                return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0)
            },
            _destroy: function() {
                var a, b = this.originalPosition;
                this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: a.noop,
            enable: a.noop,
            close: function(b) {
                var c = this;
                this._isOpen && this._trigger("beforeClose", b) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || a(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
                    c._trigger("close", b)
                }))
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(a, b) {
                var c = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
                return c && !b && this._trigger("focus", a), c
            },
            open: function() {
                var b = this;
                return this._isOpen ? (this._moveToTop() && this._focusTabbable(), undefined) : (this._isOpen = !0, this.opener = a(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                    b._focusTabbable(), b._trigger("focus")
                }), this._trigger("open"), undefined)
            },
            _focusTabbable: function() {
                var a = this.element.find("[autofocus]");
                a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), a.eq(0).focus()
            },
            _keepFocus: function(b) {
                function c() {
                    var b = this.document[0].activeElement,
                        c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
                    c || this._focusTabbable()
                }
                b.preventDefault(), c.call(this), this._delay(c)
            },
            _createWrapper: function() {
                this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                    keydown: function(b) {
                        if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), this.close(b), undefined;
                        if (b.keyCode === a.ui.keyCode.TAB) {
                            var c = this.uiDialog.find(":tabbable"),
                                d = c.filter(":first"),
                                f = c.filter(":last");
                            b.target !== f[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (f.focus(1), b.preventDefault()) : (d.focus(1), b.preventDefault())
                        }
                    },
                    mousedown: function(a) {
                        this._moveToTop(a) && this._focusTabbable()
                    }
                }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var b;
                this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                    mousedown: function(b) {
                        a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                    }
                }), this.uiDialogTitlebarClose = a("<button></button>").button({
                    label: this.options.closeText,
                    icons: {
                        primary: "ui-icon-closethick"
                    },
                    text: !1
                }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                    click: function(a) {
                        a.preventDefault(), this.close(a)
                    }
                }), b = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(b), this.uiDialog.attr({
                    "aria-labelledby": b.attr("id")
                })
            },
            _title: function(a) {
                this.options.title || a.html("&#160;"), a.text(this.options.title)
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
            },
            _createButtons: function() {
                var b = this,
                    c = this.options.buttons;
                return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), undefined) : (a.each(c, function(c, d) {
                    var f, g;
                    d = a.isFunction(d) ? {
                        click: d,
                        text: c
                    } : d, d = a.extend({
                        type: "button"
                    }, d), f = d.click, d.click = function() {
                        f.apply(b.element[0], arguments)
                    }, g = {
                        icons: d.icons,
                        text: d.showText
                    }, delete d.icons, delete d.showText, a("<button></button>", d).button(g).appendTo(b.uiButtonSet)
                }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), undefined)
            },
            _makeDraggable: function() {
                function b(a) {
                    return {
                        position: a.position,
                        offset: a.offset
                    }
                }
                var c = this,
                    d = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(d, f) {
                        a(this).addClass("ui-dialog-dragging"), c._blockFrames(), c._trigger("dragStart", d, b(f))
                    },
                    drag: function(a, d) {
                        c._trigger("drag", a, b(d))
                    },
                    stop: function(f, g) {
                        d.position = [g.position.left - c.document.scrollLeft(), g.position.top - c.document.scrollTop()], a(this).removeClass("ui-dialog-dragging"), c._unblockFrames(), c._trigger("dragStop", f, b(g))
                    }
                })
            },
            _makeResizable: function() {
                function b(a) {
                    return {
                        originalPosition: a.originalPosition,
                        originalSize: a.originalSize,
                        position: a.position,
                        size: a.size
                    }
                }
                var c = this,
                    d = this.options,
                    f = d.resizable,
                    g = this.uiDialog.css("position"),
                    h = "string" == typeof f ? f : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: d.maxWidth,
                    maxHeight: d.maxHeight,
                    minWidth: d.minWidth,
                    minHeight: this._minHeight(),
                    handles: h,
                    start: function(d, f) {
                        a(this).addClass("ui-dialog-resizing"), c._blockFrames(), c._trigger("resizeStart", d, b(f))
                    },
                    resize: function(a, d) {
                        c._trigger("resize", a, b(d))
                    },
                    stop: function(f, g) {
                        d.height = a(this).height(), d.width = a(this).width(), a(this).removeClass("ui-dialog-resizing"), c._unblockFrames(), c._trigger("resizeStop", f, b(g))
                    }
                }).css("position", g)
            },
            _minHeight: function() {
                var a = this.options;
                return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height)
            },
            _position: function() {
                var a = this.uiDialog.is(":visible");
                a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide()
            },
            _setOptions: function(d) {
                var f = this,
                    g = !1,
                    h = {};
                a.each(d, function(a, d) {
                    f._setOption(a, d), a in b && (g = !0), a in c && (h[a] = d)
                }), g && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", h)
            },
            _setOption: function(a, b) {
                var c, d, e = this.uiDialog;
                "dialogClass" === a && e.removeClass(this.options.dialogClass).addClass(b), "disabled" !== a && (this._super(a, b), "appendTo" === a && this.uiDialog.appendTo(this._appendTo()), "buttons" === a && this._createButtons(), "closeText" === a && this.uiDialogTitlebarClose.button({
                    label: "" + b
                }), "draggable" === a && (c = e.is(":data(ui-draggable)"), c && !b && e.draggable("destroy"), !c && b && this._makeDraggable()), "position" === a && this._position(), "resizable" === a && (d = e.is(":data(ui-resizable)"), d && !b && e.resizable("destroy"), d && "string" == typeof b && e.resizable("option", "handles", b), d || b === !1 || this._makeResizable()), "title" === a && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var a, b, c, d = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({
                    height: "auto",
                    width: d.width
                }).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", "auto" === d.height ? this.element.css({
                    minHeight: b,
                    maxHeight: c,
                    height: "auto"
                }) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var b = a(this);
                    return a("<div>").css({
                        position: "absolute",
                        width: b.outerWidth(),
                        height: b.outerHeight()
                    }).appendTo(b.parent()).offset(b.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
            },
            _allowInteraction: function(b) {
                return a(b.target).closest(".ui-dialog").length ? !0 : !!a(b.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var b = this,
                        c = this.widgetFullName;
                    a.ui.dialog.overlayInstances || this._delay(function() {
                        a.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(d) {
                            b._allowInteraction(d) || (d.preventDefault(), a(".ui-dialog:visible:last .ui-dialog-content").data(c)._focusTabbable())
                        })
                    }), this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }), a.ui.dialog.overlayInstances++
                }
            },
            _destroyOverlay: function() {
                this.options.modal && this.overlay && (a.ui.dialog.overlayInstances--, a.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
            }
        }), a.ui.dialog.overlayInstances = 0, a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, {
            _position: function() {
                var b, c = this.options.position,
                    d = [],
                    f = [0, 0];
                c ? (("string" == typeof c || "object" == typeof c && "0" in c) && (d = c.split ? c.split(" ") : [c[0], c[1]], 1 === d.length && (d[1] = d[0]), a.each(["left", "top"], function(a, b) {
                    +d[a] === d[a] && (f[a] = d[a], d[a] = b)
                }), c = {
                    my: d[0] + (0 > f[0] ? f[0] : "+" + f[0]) + " " + d[1] + (0 > f[1] ? f[1] : "+" + f[1]),
                    at: d.join(" ")
                }), c = a.extend({}, a.ui.dialog.prototype.options.position, c)) : c = a.ui.dialog.prototype.options.position, b = this.uiDialog.is(":visible"), b || this.uiDialog.show(), this.uiDialog.position(c), b || this.uiDialog.hide()
            }
        })
    }(jQuery),
    function(a) {
        a.widget("ui.menu", {
            version: "1.10.3",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }).bind("click" + this.eventNamespace, a.proxy(function(a) {
                    this.options.disabled && a.preventDefault()
                }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item > a": function(a) {
                        a.preventDefault()
                    },
                    "click .ui-state-disabled > a": function(a) {
                        a.preventDefault()
                    },
                    "click .ui-menu-item:has(a)": function(b) {
                        var c = a(b.target).closest(".ui-menu-item");
                        !this.mouseHandled && c.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(b), c.has(".ui-menu").length ? this.expand(b) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(b) {
                        var c = a(b.currentTarget);
                        c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c)
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(a, b) {
                        var c = this.active || this.element.children(".ui-menu-item").eq(0);
                        b || this.focus(a, c)
                    },
                    blur: function(b) {
                        this._delay(function() {
                            a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                        })
                    },
                    keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function(b) {
                        a(b.target).closest(".ui-menu").length || this.collapseAll(b), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var b = a(this);
                    b.data("ui-menu-submenu-carat") && b.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(b) {
                function c(a) {
                    return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }
                var d, f, g, h, i, j = !0;
                switch (b.keyCode) {
                    case a.ui.keyCode.PAGE_UP:
                        this.previousPage(b);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        this.nextPage(b);
                        break;
                    case a.ui.keyCode.HOME:
                        this._move("first", "first", b);
                        break;
                    case a.ui.keyCode.END:
                        this._move("last", "last", b);
                        break;
                    case a.ui.keyCode.UP:
                        this.previous(b);
                        break;
                    case a.ui.keyCode.DOWN:
                        this.next(b);
                        break;
                    case a.ui.keyCode.LEFT:
                        this.collapse(b);
                        break;
                    case a.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                        break;
                    case a.ui.keyCode.ENTER:
                    case a.ui.keyCode.SPACE:
                        this._activate(b);
                        break;
                    case a.ui.keyCode.ESCAPE:
                        this.collapse(b);
                        break;
                    default:
                        j = !1, f = this.previousFilter || "", g = String.fromCharCode(b.keyCode), h = !1, clearTimeout(this.filterTimer), g === f ? h = !0 : g = f + g, i = RegExp("^" + c(g), "i"), d = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return i.test(a(this).children("a").text())
                        }), d = h && -1 !== d.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : d, d.length || (g = String.fromCharCode(b.keyCode), i = RegExp("^" + c(g), "i"), d = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return i.test(a(this).children("a").text())
                        })), d.length ? (this.focus(b, d), d.length > 1 ? (this.previousFilter = g, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                j && b.preventDefault()
            },
            _activate: function(a) {
                this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a))
            },
            refresh: function() {
                var b, c = this.options.icons.submenu,
                    d = this.element.find(this.options.menus);
                d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var b = a(this),
                        d = b.prev("a"),
                        f = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
                    d.attr("aria-haspopup", "true").prepend(f), b.attr("aria-labelledby", d.attr("id"))
                }), b = d.add(this.element), b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), b.children(":not(.ui-menu-item)").each(function() {
                    var b = a(this);
                    /[^\-\u2014\u2013\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider")
                }), b.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(a, b) {
                "icons" === a && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu), this._super(a, b)
            },
            focus: function(a, b) {
                var c, d;
                this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), a && "keydown" === a.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay), c = b.children(".ui-menu"), c.length && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
                    item: b
                })
            },
            _scrollIntoView: function(b) {
                var c, d, f, g, h, i;
                this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, f = b.offset().top - this.activeMenu.offset().top - c - d, g = this.activeMenu.scrollTop(), h = this.activeMenu.height(), i = b.height(), 0 > f ? this.activeMenu.scrollTop(g + f) : f + i > h && this.activeMenu.scrollTop(g + f - h + i))
            },
            blur: function(a, b) {
                b || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
                    item: this.active
                }))
            },
            _startOpening: function(a) {
                clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(), this._open(a)
                }, this.delay))
            },
            _open: function(b) {
                var c = a.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
            },
            collapseAll: function(b, c) {
                clearTimeout(this.timer), this.timer = this._delay(function() {
                    var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                    d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d
                }, this.delay)
            },
            _close: function(a) {
                a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
            },
            collapse: function(a) {
                var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                b && b.length && (this._close(), this.focus(a, b))
            },
            expand: function(a) {
                var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
                b && b.length && (this._open(b.parent()), this._delay(function() {
                    this.focus(a, b)
                }))
            },
            next: function(a) {
                this._move("next", "first", a)
            },
            previous: function(a) {
                this._move("prev", "last", a)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(a, b, c) {
                var d;
                this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[b]()), this.focus(c, d)
            },
            nextPage: function(b) {
                var c, d, f;
                return this.active ? (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, f = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return c = a(this), 0 > c.offset().top - d - f
                }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(b), undefined)
            },
            previousPage: function(b) {
                var c, d, f;
                return this.active ? (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, f = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return c = a(this), c.offset().top - d + f > 0
                }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(b), undefined)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(b) {
                this.active = this.active || a(b.target).closest(".ui-menu-item");
                var c = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c)
            }
        })
    }(jQuery),
    function(a, b) {
        a.widget("ui.progressbar", {
            version: "1.10.3",
            options: {
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
            },
            _destroy: function() {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
            },
            value: function(a) {
                return a === b ? this.options.value : (this.options.value = this._constrainedValue(a), this._refreshValue(), b)
            },
            _constrainedValue: function(a) {
                return a === b && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, a))
            },
            _setOptions: function(a) {
                var b = a.value;
                delete a.value, this._super(a), this.options.value = this._constrainedValue(b), this._refreshValue()
            },
            _setOption: function(a, b) {
                "max" === a && (b = Math.max(this.min, b)), this._super(a, b)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var b = this.options.value,
                    c = this._percentage();
                this.valueDiv.toggle(this.indeterminate || b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(c.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": b
                }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, this._trigger("change")), b === this.options.max && this._trigger("complete")
            }
        })
    }(jQuery),
    function(a) {
        var b = 5;
        a.widget("ui.slider", a.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
            },
            _createHandles: function() {
                var b, c, d = this.options,
                    f = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    g = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    h = [];
                for (c = d.values && d.values.length || 1, f.length > c && (f.slice(c).remove(), f = f.slice(0, c)), b = f.length; c > b; b++) h.push(g);
                this.handles = f.add(a(h.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(b) {
                    a(this).data("ui-slider-handle-index", b)
                })
            },
            _createRange: function() {
                var b = this.options,
                    c = "";
                b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                    left: "",
                    bottom: ""
                }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : this.range = a([])
            },
            _setupEvents: function() {
                var a = this.handles.add(this.range).filter("a");
                this._off(a), this._on(a, this._handleEvents), this._hoverable(a), this._focusable(a)
            },
            _destroy: function() {
                this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
            },
            _mouseCapture: function(b) {
                var c, d, f, g, h, i, j, k, l = this,
                    m = this.options;
                return m.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), c = {
                    x: b.pageX,
                    y: b.pageY
                }, d = this._normValueFromMouse(c), f = this._valueMax() - this._valueMin() + 1, this.handles.each(function(b) {
                    var c = Math.abs(d - l.values(b));
                    (f > c || f === c && (b === l._lastChangedValue || l.values(b) === m.min)) && (f = c, g = a(this), h = b)
                }), i = this._start(b, h), i === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = h, g.addClass("ui-state-active").focus(), j = g.offset(), k = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = k ? {
                    left: 0,
                    top: 0
                } : {
                    left: b.pageX - j.left - g.width() / 2,
                    top: b.pageY - j.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(b, h, d), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(a) {
                var b = {
                        x: a.pageX,
                        y: a.pageY
                    },
                    c = this._normValueFromMouse(b);
                return this._slide(a, this._handleIndex, c), !1
            },
            _mouseStop: function(a) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(a) {
                var b, c, d, e, f;
                return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
            },
            _start: function(a, b) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
            },
            _slide: function(a, b, c) {
                var d, e, f;
                this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
                    handle: this.handles[b],
                    value: c,
                    values: e
                }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
                    handle: this.handles[b],
                    value: c
                }), f !== !1 && this.value(c))
            },
            _stop: function(a, b) {
                var c = {
                    handle: this.handles[b],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
            },
            _change: function(a, b) {
                if (!this._keySliding && !this._mouseSliding) {
                    var c = {
                        handle: this.handles[b],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)
                }
            },
            value: function(a) {
                return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0), undefined) : this._value()
            },
            values: function(b, c) {
                var d, f, g;
                if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b), undefined;
                if (!arguments.length) return this._values();
                if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
                for (d = this.options.values, f = arguments[0], g = 0; d.length > g; g += 1) d[g] = this._trimAlignValue(f[g]), this._change(null, g);
                this._refreshValue()
            },
            _setOption: function(b, c) {
                var d, f = 0;
                switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (f = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), b) {
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), d = 0; f > d; d += 1) this._change(null, d);
                        this._animateOff = !1;
                        break;
                    case "min":
                    case "max":
                        this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                        break;
                    case "range":
                        this._animateOff = !0, this._refresh(), this._animateOff = !1
                }
            },
            _value: function() {
                var a = this.options.value;
                return a = this._trimAlignValue(a)
            },
            _values: function(a) {
                var b, c, d;
                if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
                if (this.options.values && this.options.values.length) {
                    for (c = this.options.values.slice(), d = 0; c.length > d; d += 1) c[d] = this._trimAlignValue(c[d]);
                    return c
                }
                return []
            },
            _trimAlignValue: function(a) {
                if (this._valueMin() >= a) return this._valueMin();
                if (a >= this._valueMax()) return this._valueMax();
                var b = this.options.step > 0 ? this.options.step : 1,
                    c = (a - this._valueMin()) % b,
                    d = a - c;
                return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var b, c, d, f, g, h = this.options.range,
                    i = this.options,
                    j = this,
                    k = this._animateOff ? !1 : i.animate,
                    l = {};
                this.options.values && this.options.values.length ? this.handles.each(function(d) {
                    c = 100 * ((j.values(d) - j._valueMin()) / (j._valueMax() - j._valueMin())), l["horizontal" === j.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[k ? "animate" : "css"](l, i.animate), j.options.range === !0 && ("horizontal" === j.orientation ? (0 === d && j.range.stop(1, 1)[k ? "animate" : "css"]({
                        left: c + "%"
                    }, i.animate), 1 === d && j.range[k ? "animate" : "css"]({
                        width: c - b + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    })) : (0 === d && j.range.stop(1, 1)[k ? "animate" : "css"]({
                        bottom: c + "%"
                    }, i.animate), 1 === d && j.range[k ? "animate" : "css"]({
                        height: c - b + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    }))), b = c
                }) : (d = this.value(), f = this._valueMin(), g = this._valueMax(), c = g !== f ? 100 * ((d - f) / (g - f)) : 0, l["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[k ? "animate" : "css"](l, i.animate), "min" === h && "horizontal" === this.orientation && this.range.stop(1, 1)[k ? "animate" : "css"]({
                    width: c + "%"
                }, i.animate), "max" === h && "horizontal" === this.orientation && this.range[k ? "animate" : "css"]({
                    width: 100 - c + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                }), "min" === h && "vertical" === this.orientation && this.range.stop(1, 1)[k ? "animate" : "css"]({
                    height: c + "%"
                }, i.animate), "max" === h && "vertical" === this.orientation && this.range[k ? "animate" : "css"]({
                    height: 100 - c + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                }))
            },
            _handleEvents: {
                keydown: function(c) {
                    var d, f, g, h, i = a(c.target).data("ui-slider-handle-index");
                    switch (c.keyCode) {
                        case a.ui.keyCode.HOME:
                        case a.ui.keyCode.END:
                        case a.ui.keyCode.PAGE_UP:
                        case a.ui.keyCode.PAGE_DOWN:
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (c.preventDefault(), !this._keySliding && (this._keySliding = !0, a(c.target).addClass("ui-state-active"), d = this._start(c, i), d === !1)) return
                    }
                    switch (h = this.options.step, f = g = this.options.values && this.options.values.length ? this.values(i) : this.value(), c.keyCode) {
                        case a.ui.keyCode.HOME:
                            g = this._valueMin();
                            break;
                        case a.ui.keyCode.END:
                            g = this._valueMax();
                            break;
                        case a.ui.keyCode.PAGE_UP:
                            g = this._trimAlignValue(f + (this._valueMax() - this._valueMin()) / b);
                            break;
                        case a.ui.keyCode.PAGE_DOWN:
                            g = this._trimAlignValue(f - (this._valueMax() - this._valueMin()) / b);
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.RIGHT:
                            if (f === this._valueMax()) return;
                            g = this._trimAlignValue(f + h);
                            break;
                        case a.ui.keyCode.DOWN:
                        case a.ui.keyCode.LEFT:
                            if (f === this._valueMin()) return;
                            g = this._trimAlignValue(f - h)
                    }
                    this._slide(c, i, g)
                },
                click: function(a) {
                    a.preventDefault()
                },
                keyup: function(b) {
                    var c = a(b.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
                }
            }
        })
    }(jQuery),
    function(a) {
        function b(a) {
            return function() {
                var b = this.element.val();
                a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
            }
        }
        a.widget("ui.spinner", {
            version: "1.10.3",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var b = {},
                    c = this.element;
                return a.each(["min", "max", "step"], function(a, d) {
                    var e = c.attr(d);
                    void 0 !== e && e.length && (b[d] = e)
                }), b
            },
            _events: {
                keydown: function(a) {
                    this._start(a) && this._keydown(a) && a.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(a) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", a), void 0)
                },
                mousewheel: function(a, b) {
                    if (b) {
                        if (!this.spinning && !this._start(a)) return !1;
                        this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(a)
                        }, 100), a.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(b) {
                    function c() {
                        var a = this.element[0] === this.document[0].activeElement;
                        a || (this.element.focus(), this.previous = d, this._delay(function() {
                            this.previous = d
                        }))
                    }
                    var d;
                    d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), b.preventDefault(), c.call(this), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur, c.call(this)
                    }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(b) {
                    return a(b.currentTarget).hasClass("ui-state-active") ? this._start(b) === !1 ? !1 : (this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b), void 0) : void 0
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _draw: function() {
                var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * a.height()) && a.height() > 0 && a.height(a.height()), this.options.disabled && this.disable()
            },
            _keydown: function(b) {
                var c = this.options,
                    d = a.ui.keyCode;
                switch (b.keyCode) {
                    case d.UP:
                        return this._repeat(null, 1, b), !0;
                    case d.DOWN:
                        return this._repeat(null, -1, b), !0;
                    case d.PAGE_UP:
                        return this._repeat(null, c.page, b), !0;
                    case d.PAGE_DOWN:
                        return this._repeat(null, -c.page, b), !0
                }
                return !1
            },
            _uiSpinnerHtml: function() {
                return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
            },
            _buttonHtml: function() {
                return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
            },
            _start: function(a) {
                return this.spinning || this._trigger("start", a) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
            },
            _repeat: function(a, b, c) {
                a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                    this._repeat(40, b, c)
                }, a), this._spin(b * this.options.step, c)
            },
            _spin: function(a, b) {
                var c = this.value() || 0;
                this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, {
                    value: c
                }) === !1 || (this._value(c), this.counter++)
            },
            _increment: function(b) {
                var c = this.options.incremental;
                return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b *
                    b / 500 + 17 * b / 200 + 1) : 1
            },
            _precision: function() {
                var a = this._precisionOf(this.options.step);
                return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
            },
            _precisionOf: function(a) {
                var b = "" + a,
                    c = b.indexOf(".");
                return -1 === c ? 0 : b.length - c - 1
            },
            _adjustValue: function(a) {
                var b, c, d = this.options;
                return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && d.min > a ? d.min : a
            },
            _stop: function(a) {
                this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
            },
            _setOption: function(a, b) {
                if ("culture" === a || "numberFormat" === a) {
                    var c = this._parse(this.element.val());
                    return this.options[a] = b, this.element.val(this._format(c)), void 0
                }("max" === a || "min" === a || "step" === a) && "string" == typeof b && (b = this._parse(b)), "icons" === a && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)), this._super(a, b), "disabled" === a && (b ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
            },
            _setOptions: b(function(a) {
                this._super(a), this._value(this.element.val())
            }),
            _parse: function(a) {
                return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a
            },
            _format: function(a) {
                return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            _value: function(a, b) {
                var c;
                "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
            },
            _destroy: function() {
                this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
            },
            stepUp: b(function(a) {
                this._stepUp(a)
            }),
            _stepUp: function(a) {
                this._start() && (this._spin((a || 1) * this.options.step), this._stop())
            },
            stepDown: b(function(a) {
                this._stepDown(a)
            }),
            _stepDown: function(a) {
                this._start() && (this._spin((a || 1) * -this.options.step), this._stop())
            },
            pageUp: b(function(a) {
                this._stepUp((a || 1) * this.options.page)
            }),
            pageDown: b(function(a) {
                this._stepDown((a || 1) * this.options.page)
            }),
            value: function(a) {
                return arguments.length ? (b(this._value).call(this, a), void 0) : this._parse(this.element.val())
            },
            widget: function() {
                return this.uiSpinner
            }
        })
    }(jQuery),
    function(a, b) {
        function c() {
            return ++e
        }

        function d(a) {
            return a.hash.length > 1 && decodeURIComponent(a.href.replace(f, "")) === decodeURIComponent(location.href.replace(f, ""))
        }
        var e = 0,
            f = /#.*$/;
        a.widget("ui.tabs", {
            version: "1.10.3",
            delay: 300,
            options: {
                active: null,
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _create: function() {
                var b = this,
                    c = this.options;
                this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(b) {
                    a(this).is(".ui-state-disabled") && b.preventDefault()
                }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                    a(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(a) {
                    return b.tabs.index(a)
                }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(c.active) : a(), this._refresh(), this.active.length && this.load(c.active)
            },
            _initialActive: function() {
                var c = this.options.active,
                    d = this.options.collapsible,
                    e = location.hash.substring(1);
                return null === c && (e && this.tabs.each(function(d, f) {
                    return a(f).attr("aria-controls") === e ? (c = d, !1) : b
                }), null === c && (c = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === c || -1 === c) && (c = this.tabs.length ? 0 : !1)), c !== !1 && (c = this.tabs.index(this.tabs.eq(c)), -1 === c && (c = d ? !1 : 0)), !d && c === !1 && this.anchors.length && (c = 0), c
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : a()
                }
            },
            _tabKeydown: function(c) {
                var d = a(this.document[0].activeElement).closest("li"),
                    e = this.tabs.index(d),
                    f = !0;
                if (!this._handlePageNav(c)) {
                    switch (c.keyCode) {
                        case a.ui.keyCode.RIGHT:
                        case a.ui.keyCode.DOWN:
                            e++;
                            break;
                        case a.ui.keyCode.UP:
                        case a.ui.keyCode.LEFT:
                            f = !1, e--;
                            break;
                        case a.ui.keyCode.END:
                            e = this.anchors.length - 1;
                            break;
                        case a.ui.keyCode.HOME:
                            e = 0;
                            break;
                        case a.ui.keyCode.SPACE:
                            return c.preventDefault(), clearTimeout(this.activating), this._activate(e), b;
                        case a.ui.keyCode.ENTER:
                            return c.preventDefault(), clearTimeout(this.activating), this._activate(e === this.options.active ? !1 : e), b;
                        default:
                            return
                    }
                    c.preventDefault(), clearTimeout(this.activating), e = this._focusNextTab(e, f), c.ctrlKey || (d.attr("aria-selected", "false"), this.tabs.eq(e).attr("aria-selected", "true"), this.activating = this._delay(function() {
                        this.option("active", e)
                    }, this.delay))
                }
            },
            _panelKeydown: function(b) {
                this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.focus())
            },
            _handlePageNav: function(c) {
                return c.altKey && c.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : c.altKey && c.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : b
            },
            _findNextTab: function(b, c) {
                function d() {
                    return b > e && (b = 0), 0 > b && (b = e), b
                }
                for (var e = this.tabs.length - 1; - 1 !== a.inArray(d(), this.options.disabled);) b = c ? b + 1 : b - 1;
                return b
            },
            _focusNextTab: function(a, b) {
                return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a
            },
            _setOption: function(a, c) {
                return "active" === a ? (this._activate(c), b) : "disabled" === a ? (this._setupDisabled(c), b) : (this._super(a, c), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", c), c || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(c), "heightStyle" === a && this._setupHeightStyle(c), b)
            },
            _tabId: function(a) {
                return a.attr("aria-controls") || "ui-tabs-" + c()
            },
            _sanitizeSelector: function(a) {
                return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var b = this.options,
                    c = this.tablist.children(":has(a[href])");
                b.disabled = a.map(c.filter(".ui-state-disabled"), function(a) {
                    return c.index(a)
                }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
            },
            _refresh: function() {
                this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }), this._getPanelForTab(this.active).show().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var b = this;
                this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                    role: "tab",
                    tabIndex: -1
                }), this.anchors = this.tabs.map(function() {
                    return a("a", this)[0]
                }).addClass("ui-tabs-anchor").attr({
                    role: "presentation",
                    tabIndex: -1
                }), this.panels = a(), this.anchors.each(function(c, e) {
                    var f, g, h, i = a(e).uniqueId().attr("id"),
                        j = a(e).closest("li"),
                        k = j.attr("aria-controls");
                    d(e) ? (f = e.hash, g = b.element.find(b._sanitizeSelector(f))) : (h = b._tabId(j), f = "#" + h, g = b.element.find(f), g.length || (g = b._createPanel(h), g.insertAfter(b.panels[c - 1] || b.tablist)), g.attr("aria-live", "polite")), g.length && (b.panels = b.panels.add(g)), k && j.data("ui-tabs-aria-controls", k), j.attr({
                        "aria-controls": f.substring(1),
                        "aria-labelledby": i
                    }), g.attr("aria-labelledby", i)
                }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
            },
            _getList: function() {
                return this.element.find("ol,ul").eq(0)
            },
            _createPanel: function(b) {
                return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
            },
            _setupDisabled: function(b) {
                a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
                for (var c, d = 0; c = this.tabs[d]; d++) b === !0 || -1 !== a.inArray(d, b) ? a(c).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(c).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                this.options.disabled = b
            },
            _setupEvents: function(b) {
                var c = {
                    click: function(a) {
                        a.preventDefault()
                    }
                };
                b && a.each(b.split(" "), function(a, b) {
                    c[b] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, c), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(b) {
                var c, d = this.element.parent();
                "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var b = a(this),
                        d = b.css("position");
                    "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    c -= a(this).outerHeight(!0)
                }), this.panels.each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() {
                    c = Math.max(c, a(this).height("").height())
                }).height(c))
            },
            _eventHandler: function(b) {
                var c = this.options,
                    d = this.active,
                    e = a(b.currentTarget),
                    f = e.closest("li"),
                    g = f[0] === d[0],
                    h = g && c.collapsible,
                    i = h ? a() : this._getPanelForTab(f),
                    j = d.length ? this._getPanelForTab(d) : a(),
                    k = {
                        oldTab: d,
                        oldPanel: j,
                        newTab: h ? a() : f,
                        newPanel: i
                    };
                b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
            },
            _toggle: function(b, c) {
                function d() {
                    f.running = !1, f._trigger("activate", b, c)
                }

                function e() {
                    c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), g.length && f.options.show ? f._show(g, f.options.show, d) : (g.show(), d())
                }
                var f = this,
                    g = c.newPanel,
                    h = c.oldPanel;
                this.running = !0, h.length && this.options.hide ? this._hide(h, this.options.hide, function() {
                    c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), e()
                }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h.hide(), e()), h.attr({
                    "aria-expanded": "false",
                    "aria-hidden": "true"
                }), c.oldTab.attr("aria-selected", "false"), g.length && h.length ? c.oldTab.attr("tabIndex", -1) : g.length && this.tabs.filter(function() {
                    return 0 === a(this).attr("tabIndex")
                }).attr("tabIndex", -1), g.attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                }), c.newTab.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                })
            },
            _activate: function(b) {
                var c, d = this._findActive(b);
                d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: c,
                    currentTarget: c,
                    preventDefault: a.noop
                }))
            },
            _findActive: function(b) {
                return b === !1 ? a() : this.tabs.eq(b)
            },
            _getIndex: function(a) {
                return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }), this.tabs.each(function() {
                    var b = a(this),
                        c = b.data("ui-tabs-aria-controls");
                    c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
                }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
            },
            enable: function(c) {
                var d = this.options.disabled;
                d !== !1 && (c === b ? d = !1 : (c = this._getIndex(c), d = a.isArray(d) ? a.map(d, function(a) {
                    return a !== c ? a : null
                }) : a.map(this.tabs, function(a, b) {
                    return b !== c ? b : null
                })), this._setupDisabled(d))
            },
            disable: function(c) {
                var d = this.options.disabled;
                if (d !== !0) {
                    if (c === b) d = !0;
                    else {
                        if (c = this._getIndex(c), -1 !== a.inArray(c, d)) return;
                        d = a.isArray(d) ? a.merge([c], d).sort() : [c]
                    }
                    this._setupDisabled(d)
                }
            },
            load: function(b, c) {
                b = this._getIndex(b);
                var e = this,
                    f = this.tabs.eq(b),
                    g = f.find(".ui-tabs-anchor"),
                    h = this._getPanelForTab(f),
                    i = {
                        tab: f,
                        panel: h
                    };
                d(g[0]) || (this.xhr = a.ajax(this._ajaxSettings(g, c, i)), this.xhr && "canceled" !== this.xhr.statusText && (f.addClass("ui-tabs-loading"), h.attr("aria-busy", "true"), this.xhr.success(function(a) {
                    setTimeout(function() {
                        h.html(a), e._trigger("load", c, i)
                    }, 1)
                }).complete(function(a, b) {
                    setTimeout(function() {
                        "abort" === b && e.panels.stop(!1, !0), f.removeClass("ui-tabs-loading"), h.removeAttr("aria-busy"), a === e.xhr && delete e.xhr
                    }, 1)
                })))
            },
            _ajaxSettings: function(b, c, d) {
                var e = this;
                return {
                    url: b.attr("href"),
                    beforeSend: function(b, f) {
                        return e._trigger("beforeLoad", c, a.extend({
                            jqXHR: b,
                            ajaxSettings: f
                        }, d))
                    }
                }
            },
            _getPanelForTab: function(b) {
                var c = a(b).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + c))
            }
        })
    }(jQuery),
    function(a) {
        function b(b, c) {
            var d = (b.attr("aria-describedby") || "").split(/\s+/);
            d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")))
        }

        function c(b) {
            var c = b.data("ui-tooltip-id"),
                d = (b.attr("aria-describedby") || "").split(/\s+/),
                f = a.inArray(c, d); - 1 !== f && d.splice(f, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby")
        }
        var d = 0;
        a.widget("ui.tooltip", {
            version: "1.10.3",
            options: {
                content: function() {
                    var b = a(this).attr("title") || "";
                    return a("<a>").text(b).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                tooltipClass: null,
                track: !1,
                close: null,
                open: null
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
            },
            _setOption: function(b, c) {
                var d = this;
                return "disabled" === b ? (this[c ? "_disable" : "_enable"](), this.options[b] = c, void 0) : (this._super(b, c), "content" === b && a.each(this.tooltips, function(a, b) {
                    d._updateContent(b)
                }), void 0)
            },
            _disable: function() {
                var b = this;
                a.each(this.tooltips, function(c, d) {
                    var f = a.Event("blur");
                    f.target = f.currentTarget = d[0], b.close(f, !0)
                }), this.element.find(this.options.items).addBack().each(function() {
                    var b = a(this);
                    b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
                })
            },
            _enable: function() {
                this.element.find(this.options.items).addBack().each(function() {
                    var b = a(this);
                    b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
                })
            },
            open: function(b) {
                var c = this,
                    d = a(b ? b.target : this.element).closest(this.options.items);
                d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() {
                    var b, d = a(this);
                    d.data("ui-tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, c.close(b, !0)), d.attr("title") && (d.uniqueId(), c.parents[this.id] = {
                        element: this,
                        title: d.attr("title")
                    }, d.attr("title", ""))
                }), this._updateContent(d, b))
            },
            _updateContent: function(a, b) {
                var c, d = this.options.content,
                    e = this,
                    f = b ? b.type : null;
                return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function(c) {
                    a.data("ui-tooltip-open") && e._delay(function() {
                        b && (b.type = f), this._open(b, a, c)
                    })
                }), c && this._open(b, a, c), void 0)
            },
            _open: function(c, d, f) {
                function g(a) {
                    k.of = a, h.is(":hidden") || h.position(k)
                }
                var h, i, j, k = a.extend({}, this.options.position);
                if (f) {
                    if (h = this._find(d), h.length) return h.find(".ui-tooltip-content").html(f), void 0;
                    d.is("[title]") && (c && "mouseover" === c.type ? d.attr("title", "") : d.removeAttr("title")), h = this._tooltip(d), b(d, h.attr("id")), h.find(".ui-tooltip-content").html(f), this.options.track && c && /^mouse/.test(c.type) ? (this._on(this.document, {
                        mousemove: g
                    }), g(c)) : h.position(a.extend({
                        of: d
                    }, this.options.position)), h.hide(), this._show(h, this.options.show), this.options.show && this.options.show.delay && (j = this.delayedShow = setInterval(function() {
                        h.is(":visible") && (g(k.of), clearInterval(j))
                    }, a.fx.interval)), this._trigger("open", c, {
                        tooltip: h
                    }), i = {
                        keyup: function(b) {
                            if (b.keyCode === a.ui.keyCode.ESCAPE) {
                                var c = a.Event(b);
                                c.currentTarget = d[0], this.close(c, !0)
                            }
                        },
                        remove: function() {
                            this._removeTooltip(h)
                        }
                    }, c && "mouseover" !== c.type || (i.mouseleave = "close"), c && "focusin" !== c.type || (i.focusout = "close"), this._on(!0, d, i)
                }
            },
            close: function(b) {
                var d = this,
                    f = a(b ? b.currentTarget : this.element),
                    g = this._find(f);
                this.closing || (clearInterval(this.delayedShow), f.data("ui-tooltip-title") && f.attr("title", f.data("ui-tooltip-title")), c(f), g.stop(!0), this._hide(g, this.options.hide, function() {
                    d._removeTooltip(a(this))
                }), f.removeData("ui-tooltip-open"), this._off(f, "mouseleave focusout keyup"), f[0] !== this.element[0] && this._off(f, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function(b, c) {
                    a(c.element).attr("title", c.title), delete d.parents[b]
                }), this.closing = !0, this._trigger("close", b, {
                    tooltip: g
                }), this.closing = !1)
            },
            _tooltip: function(b) {
                var c = "ui-tooltip-" + d++,
                    f = a("<div>").attr({
                        id: c,
                        role: "tooltip"
                    }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
                return a("<div>").addClass("ui-tooltip-content").appendTo(f), f.appendTo(this.document[0].body), this.tooltips[c] = b, f
            },
            _find: function(b) {
                var c = b.data("ui-tooltip-id");
                return c ? a("#" + c) : a()
            },
            _removeTooltip: function(a) {
                a.remove(), delete this.tooltips[a.attr("id")]
            },
            _destroy: function() {
                var b = this;
                a.each(this.tooltips, function(c, d) {
                    var f = a.Event("blur");
                    f.target = f.currentTarget = d[0], b.close(f, !0), a("#" + c).remove(), d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), d.removeData("ui-tooltip-title"))
                })
            }
        })
    }(jQuery),
    function(a, b) {
        var c = "ui-effects-";
        a.effects = {
                effect: {}
            },
            function(a, b) {
                function c(a, b, c) {
                    var d = l[b.type] || {};
                    return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : a > d.max ? d.max : a)
                }

                function d(c) {
                    var d = j(),
                        e = d._rgba = [];
                    return c = c.toLowerCase(), o(i, function(a, f) {
                        var g, h = f.re.exec(c),
                            i = h && f.parse(h),
                            j = f.space || "rgba";
                        return i ? (g = d[j](i), d[k[j].cache] = g[k[j].cache], e = d._rgba = g._rgba, !1) : b
                    }), e.length ? ("0,0,0,0" === e.join() && a.extend(e, f.transparent), d) : f[c]
                }

                function e(a, b, c) {
                    return c = (c + 1) % 1, 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
                }
                var f, g = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    h = /^([\-+])=\s*(\d+\.?\d*)/,
                    i = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(a) {
                            return [a[1], a[2], a[3], a[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(a) {
                            return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(a) {
                            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(a) {
                            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(a) {
                            return [a[1], a[2] / 100, a[3] / 100, a[4]]
                        }
                    }],
                    j = a.Color = function(b, c, d, e) {
                        return new a.Color.fn.parse(b, c, d, e)
                    },
                    k = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    l = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    m = j.support = {},
                    n = a("<p>")[0],
                    o = a.each;
                n.style.cssText = "background-color:rgba(1,1,1,.5)", m.rgba = n.style.backgroundColor.indexOf("rgba") > -1, o(k, function(a, b) {
                    b.cache = "_" + a, b.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), j.fn = a.extend(j.prototype, {
                    parse: function(e, g, h, i) {
                        if (e === b) return this._rgba = [null, null, null, null], this;
                        (e.jquery || e.nodeType) && (e = a(e).css(g), g = b);
                        var l = this,
                            m = a.type(e),
                            n = this._rgba = [];
                        return g !== b && (e = [e, g, h, i], m = "array"), "string" === m ? this.parse(d(e) || f._default) : "array" === m ? (o(k.rgba.props, function(a, b) {
                            n[b.idx] = c(e[b.idx], b)
                        }), this) : "object" === m ? (e instanceof j ? o(k, function(a, b) {
                            e[b.cache] && (l[b.cache] = e[b.cache].slice())
                        }) : o(k, function(b, d) {
                            var f = d.cache;
                            o(d.props, function(a, b) {
                                if (!l[f] && d.to) {
                                    if ("alpha" === a || null == e[a]) return;
                                    l[f] = d.to(l._rgba)
                                }
                                l[f][b.idx] = c(e[a], b, !0)
                            }), l[f] && 0 > a.inArray(null, l[f].slice(0, 3)) && (l[f][3] = 1, d.from && (l._rgba = d.from(l[f])))
                        }), this) : b
                    },
                    is: function(a) {
                        var c = j(a),
                            d = !0,
                            e = this;
                        return o(k, function(a, f) {
                            var g, h = c[f.cache];
                            return h && (g = e[f.cache] || f.to && f.to(e._rgba) || [], o(f.props, function(a, c) {
                                return null != h[c.idx] ? d = h[c.idx] === g[c.idx] : b
                            })), d
                        }), d
                    },
                    _space: function() {
                        var a = [],
                            b = this;
                        return o(k, function(c, d) {
                            b[d.cache] && a.push(c)
                        }), a.pop()
                    },
                    transition: function(a, b) {
                        var d = j(a),
                            e = d._space(),
                            f = k[e],
                            g = 0 === this.alpha() ? j("transparent") : this,
                            h = g[f.cache] || f.to(g._rgba),
                            i = h.slice();
                        return d = d[f.cache], o(f.props, function(a, e) {
                            var f = e.idx,
                                g = h[f],
                                j = d[f],
                                k = l[e.type] || {};
                            null !== j && (null === g ? i[f] = j : (k.mod && (j - g > k.mod / 2 ? g += k.mod : g - j > k.mod / 2 && (g -= k.mod)), i[f] = c((j - g) * b + g, e)))
                        }), this[e](i)
                    },
                    blend: function(b) {
                        if (1 === this._rgba[3]) return this;
                        var c = this._rgba.slice(),
                            d = c.pop(),
                            e = j(b)._rgba;
                        return j(a.map(c, function(a, b) {
                            return (1 - d) * e[b] + d * a
                        }))
                    },
                    toRgbaString: function() {
                        var b = "rgba(",
                            c = a.map(this._rgba, function(a, b) {
                                return null == a ? b > 2 ? 1 : 0 : a
                            });
                        return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
                    },
                    toHslaString: function() {
                        var b = "hsla(",
                            c = a.map(this.hsla(), function(a, b) {
                                return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
                            });
                        return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
                    },
                    toHexString: function(b) {
                        var c = this._rgba.slice(),
                            d = c.pop();
                        return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) {
                            return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), j.fn.parse.prototype = j.fn, k.hsla.to = function(a) {
                    if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                    var b, c, d = a[0] / 255,
                        e = a[1] / 255,
                        f = a[2] / 255,
                        g = a[3],
                        h = Math.max(d, e, f),
                        i = Math.min(d, e, f),
                        j = h - i,
                        k = h + i,
                        l = .5 * k;
                    return b = i === h ? 0 : d === h ? 60 * (e - f) / j + 360 : e === h ? 60 * (f - d) / j + 120 : 60 * (d - e) / j + 240, c = 0 === j ? 0 : .5 >= l ? j / k : j / (2 - k), [Math.round(b) % 360, c, l, null == g ? 1 : g]
                }, k.hsla.from = function(a) {
                    if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
                    var b = a[0] / 360,
                        c = a[1],
                        d = a[2],
                        f = a[3],
                        g = .5 >= d ? d * (1 + c) : d + c - d * c,
                        h = 2 * d - g;
                    return [Math.round(255 * e(h, g, b + 1 / 3)), Math.round(255 * e(h, g, b)), Math.round(255 * e(h, g, b - 1 / 3)), f]
                }, o(k, function(d, e) {
                    var f = e.props,
                        g = e.cache,
                        i = e.to,
                        k = e.from;
                    j.fn[d] = function(d) {
                        if (i && !this[g] && (this[g] = i(this._rgba)), d === b) return this[g].slice();
                        var e, h = a.type(d),
                            l = "array" === h || "object" === h ? d : arguments,
                            m = this[g].slice();
                        return o(f, function(a, b) {
                            var d = l["object" === h ? a : b.idx];
                            null == d && (d = m[b.idx]), m[b.idx] = c(d, b)
                        }), k ? (e = j(k(m)), e[g] = m, e) : j(m)
                    }, o(f, function(b, c) {
                        j.fn[b] || (j.fn[b] = function(e) {
                            var f, g = a.type(e),
                                i = "alpha" === b ? this._hsla ? "hsla" : "rgba" : d,
                                j = this[i](),
                                k = j[c.idx];
                            return "undefined" === g ? k : ("function" === g && (e = e.call(this, k), g = a.type(e)), null == e && c.empty ? this : ("string" === g && (f = h.exec(e), f && (e = k + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), j[c.idx] = e, this[i](j)))
                        })
                    })
                }), j.hook = function(b) {
                    var c = b.split(" ");
                    o(c, function(b, c) {
                        a.cssHooks[c] = {
                            set: function(b, e) {
                                var f, g, h = "";
                                if ("transparent" !== e && ("string" !== a.type(e) || (f = d(e)))) {
                                    if (e = j(f || e), !m.rgba && 1 !== e._rgba[3]) {
                                        for (g = "backgroundColor" === c ? b.parentNode : b;
                                            ("" === h || "transparent" === h) && g && g.style;) try {
                                            h = a.css(g, "backgroundColor"), g = g.parentNode
                                        } catch (i) {}
                                        e = e.blend(h && "transparent" !== h ? h : "_default")
                                    }
                                    e = e.toRgbaString()
                                }
                                try {
                                    b.style[c] = e
                                } catch (i) {}
                            }
                        }, a.fx.step[c] = function(b) {
                            b.colorInit || (b.start = j(b.elem, c), b.end = j(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
                        }
                    })
                }, j.hook(g), a.cssHooks.borderColor = {
                    expand: function(a) {
                        var b = {};
                        return o(["Top", "Right", "Bottom", "Left"], function(c, d) {
                            b["border" + d + "Color"] = a
                        }), b
                    }
                }, f = a.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function c(b) {
                    var c, d, f = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
                        g = {};
                    if (f && f.length && f[0] && f[f[0]])
                        for (d = f.length; d--;) c = f[d], "string" == typeof f[c] && (g[a.camelCase(c)] = f[c]);
                    else
                        for (c in f) "string" == typeof f[c] && (g[c] = f[c]);
                    return g
                }

                function d(b, c) {
                    var d, f, h = {};
                    for (d in c) f = c[d], b[d] !== f && (g[d] || (a.fx.step[d] || !isNaN(parseFloat(f))) && (h[d] = f));
                    return h
                }
                var f = ["add", "remove", "toggle"],
                    g = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) {
                    a.fx.step[c] = function(a) {
                        ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (jQuery.style(a.elem, c, a.end), a.setAttr = !0)
                    }
                }), a.fn.addBack || (a.fn.addBack = function(a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }), a.effects.animateClass = function(b, g, h, j) {
                    var k = a.speed(g, h, j);
                    return this.queue(function() {
                        var g, h = a(this),
                            j = h.attr("class") || "",
                            m = k.children ? h.find("*").addBack() : h;
                        m = m.map(function() {
                            var b = a(this);
                            return {
                                el: b,
                                start: c(this)
                            }
                        }), g = function() {
                            a.each(f, function(a, c) {
                                b[c] && h[c + "Class"](b[c])
                            })
                        }, g(), m = m.map(function() {
                            return this.end = c(this.el[0]), this.diff = d(this.start, this.end), this
                        }), h.attr("class", j), m = m.map(function() {
                            var b = this,
                                c = a.Deferred(),
                                d = a.extend({}, k, {
                                    queue: !1,
                                    complete: function() {
                                        c.resolve(b)
                                    }
                                });
                            return this.el.animate(this.diff, d), c.promise()
                        }), a.when.apply(a, m.get()).done(function() {
                            g(), a.each(arguments, function() {
                                var b = this.el;
                                a.each(this.diff, function(a) {
                                    b.css(a, "")
                                })
                            }), k.complete.call(h[0])
                        })
                    })
                }, a.fn.extend({
                    addClass: function(b) {
                        return function(c, d, f, g) {
                            return d ? a.effects.animateClass.call(this, {
                                add: c
                            }, d, f, g) : b.apply(this, arguments)
                        }
                    }(a.fn.addClass),
                    removeClass: function(b) {
                        return function(c, d, f, g) {
                            return arguments.length > 1 ? a.effects.animateClass.call(this, {
                                remove: c
                            }, d, f, g) : b.apply(this, arguments)
                        }
                    }(a.fn.removeClass),
                    toggleClass: function(c) {
                        return function(d, f, g, h, j) {
                            return "boolean" == typeof f || f === b ? g ? a.effects.animateClass.call(this, f ? {
                                add: d
                            } : {
                                remove: d
                            }, g, h, j) : c.apply(this, arguments) : a.effects.animateClass.call(this, {
                                toggle: d
                            }, f, g, h)
                        }
                    }(a.fn.toggleClass),
                    switchClass: function(b, c, d, f, g) {
                        return a.effects.animateClass.call(this, {
                            add: c,
                            remove: b
                        }, d, f, g)
                    }
                })
            }(),
            function() {
                function d(b, c, d, f) {
                    return a.isPlainObject(b) && (c = b, b = b.effect), b = {
                        effect: b
                    }, null == c && (c = {}), a.isFunction(c) && (f = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (f = d, d = c, c = {}), a.isFunction(d) && (f = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = f || c.complete, b
                }

                function f(b) {
                    return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0
                }
                a.extend(a.effects, {
                    version: "1.10.3",
                    save: function(a, b) {
                        for (var d = 0; b.length > d; d++) null !== b[d] && a.data(c + b[d], a[0].style[b[d]])
                    },
                    restore: function(a, d) {
                        var e, f;
                        for (f = 0; d.length > f; f++) null !== d[f] && (e = a.data(c + d[f]), e === b && (e = ""), a.css(d[f], e))
                    },
                    setMode: function(a, b) {
                        return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
                    },
                    getBaseline: function(a, b) {
                        var c, d;
                        switch (a[0]) {
                            case "top":
                                c = 0;
                                break;
                            case "middle":
                                c = .5;
                                break;
                            case "bottom":
                                c = 1;
                                break;
                            default:
                                c = a[0] / b.height
                        }
                        switch (a[1]) {
                            case "left":
                                d = 0;
                                break;
                            case "center":
                                d = .5;
                                break;
                            case "right":
                                d = 1;
                                break;
                            default:
                                d = a[1] / b.width
                        }
                        return {
                            x: d,
                            y: c
                        }
                    },
                    createWrapper: function(b) {
                        if (b.parent().is(".ui-effects-wrapper")) return b.parent();
                        var c = {
                                width: b.outerWidth(!0),
                                height: b.outerHeight(!0),
                                "float": b.css("float")
                            },
                            d = a("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            f = {
                                width: b.width(),
                                height: b.height()
                            },
                            g = document.activeElement;
                        try {
                            g.id
                        } catch (h) {
                            g = document.body
                        }
                        return b.wrap(d), (b[0] === g || a.contains(b[0], g)) && a(g).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
                            position: "relative"
                        }), b.css({
                            position: "relative"
                        })) : (a.extend(c, {
                            position: b.css("position"),
                            zIndex: b.css("z-index")
                        }), a.each(["top", "left", "bottom", "right"], function(a, d) {
                            c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
                        }), b.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), b.css(f), d.css(c).show()
                    },
                    removeWrapper: function(b) {
                        var c = document.activeElement;
                        return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
                    },
                    setTransition: function(b, c, d, f) {
                        return f = f || {}, a.each(c, function(a, c) {
                            var e = b.cssUnit(c);
                            e[0] > 0 && (f[c] = e[0] * d + e[1])
                        }), f
                    }
                }), a.fn.extend({
                    effect: function() {
                        function b(b) {
                            function d() {
                                a.isFunction(g) && g.call(f[0]), a.isFunction(b) && b()
                            }
                            var f = a(this),
                                g = c.complete,
                                j = c.mode;
                            (f.is(":hidden") ? "hide" === j : "show" === j) ? (f[j](), d()) : h.call(f[0], c, d)
                        }
                        var c = d.apply(this, arguments),
                            f = c.mode,
                            g = c.queue,
                            h = a.effects.effect[c.effect];
                        return a.fx.off || !h ? f ? this[f](c.duration, c.complete) : this.each(function() {
                            c.complete && c.complete.call(this)
                        }) : g === !1 ? this.each(b) : this.queue(g || "fx", b)
                    },
                    show: function(a) {
                        return function(b) {
                            if (f(b)) return a.apply(this, arguments);
                            var c = d.apply(this, arguments);
                            return c.mode = "show", this.effect.call(this, c)
                        }
                    }(a.fn.show),
                    hide: function(a) {
                        return function(b) {
                            if (f(b)) return a.apply(this, arguments);
                            var c = d.apply(this, arguments);
                            return c.mode = "hide", this.effect.call(this, c)
                        }
                    }(a.fn.hide),
                    toggle: function(a) {
                        return function(b) {
                            if (f(b) || "boolean" == typeof b) return a.apply(this, arguments);
                            var c = d.apply(this, arguments);
                            return c.mode = "toggle", this.effect.call(this, c)
                        }
                    }(a.fn.toggle),
                    cssUnit: function(b) {
                        var c = this.css(b),
                            d = [];
                        return a.each(["em", "px", "%", "pt"], function(a, b) {
                            c.indexOf(b) > 0 && (d = [parseFloat(c), b])
                        }), d
                    }
                })
            }(),
            function() {
                var b = {};
                a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) {
                    b[c] = function(b) {
                        return Math.pow(b, a + 2)
                    }
                }), a.extend(b, {
                    Sine: function(a) {
                        return 1 - Math.cos(a * Math.PI / 2)
                    },
                    Circ: function(a) {
                        return 1 - Math.sqrt(1 - a * a)
                    },
                    Elastic: function(a) {
                        return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(a) {
                        return a * a * (3 * a - 2)
                    },
                    Bounce: function(a) {
                        for (var b, c = 4;
                            ((b = Math.pow(2, --c)) - 1) / 11 > a;);
                        return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
                    }
                }), a.each(b, function(b, c) {
                    a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
                        return 1 - c(1 - a)
                    }, a.easing["easeInOut" + b] = function(a) {
                        return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
                    }
                })
            }()
    }(jQuery),
    function(a) {
        var b = /up|down|vertical/,
            c = /up|left|vertical|horizontal/;
        a.effects.effect.blind = function(d, f) {
            var g, h, j, k = a(this),
                l = ["position", "top", "bottom", "left", "right", "height", "width"],
                m = a.effects.setMode(k, d.mode || "hide"),
                n = d.direction || "up",
                o = b.test(n),
                p = o ? "height" : "width",
                q = o ? "top" : "left",
                r = c.test(n),
                s = {},
                u = "show" === m;
            k.parent().is(".ui-effects-wrapper") ? a.effects.save(k.parent(), l) : a.effects.save(k, l), k.show(), g = a.effects.createWrapper(k).css({
                overflow: "hidden"
            }), h = g[p](), j = parseFloat(g.css(q)) || 0, s[p] = u ? h : 0, r || (k.css(o ? "bottom" : "right", 0).css(o ? "top" : "left", "auto").css({
                position: "absolute"
            }), s[q] = u ? j : h + j), u && (g.css(p, 0), r || g.css(q, j + h)), g.animate(s, {
                duration: d.duration,
                easing: d.easing,
                queue: !1,
                complete: function() {
                    "hide" === m && k.hide(), a.effects.restore(k, l), a.effects.removeWrapper(k), f()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.bounce = function(b, c) {
            var d, f, g, h = a(this),
                i = ["position", "top", "bottom", "left", "right", "height", "width"],
                j = a.effects.setMode(h, b.mode || "effect"),
                k = "hide" === j,
                l = "show" === j,
                m = b.direction || "up",
                n = b.distance,
                o = b.times || 5,
                p = 2 * o + (l || k ? 1 : 0),
                q =
                b.duration / p,
                r = b.easing,
                s = "up" === m || "down" === m ? "top" : "left",
                t = "up" === m || "left" === m,
                u = h.queue(),
                v = u.length;
            for ((l || k) && i.push("opacity"), a.effects.save(h, i), h.show(), a.effects.createWrapper(h), n || (n = h["top" === s ? "outerHeight" : "outerWidth"]() / 3), l && (g = {
                    opacity: 1
                }, g[s] = 0, h.css("opacity", 0).css(s, t ? 2 * -n : 2 * n).animate(g, q, r)), k && (n /= Math.pow(2, o - 1)), g = {}, g[s] = 0, d = 0; o > d; d++) f = {}, f[s] = (t ? "-=" : "+=") + n, h.animate(f, q, r).animate(g, q, r), n = k ? 2 * n : n / 2;
            k && (f = {
                opacity: 0
            }, f[s] = (t ? "-=" : "+=") + n, h.animate(f, q, r)), h.queue(function() {
                k && h.hide(), a.effects.restore(h, i), a.effects.removeWrapper(h), c()
            }), v > 1 && u.splice.apply(u, [1, 0].concat(u.splice(v, p + 1))), h.dequeue()
        }
    }(jQuery),
    function(a) {
        a.effects.effect.clip = function(b, c) {
            var d, f, g, h = a(this),
                i = ["position", "top", "bottom", "left", "right", "height", "width"],
                j = a.effects.setMode(h, b.mode || "hide"),
                k = "show" === j,
                l = b.direction || "vertical",
                m = "vertical" === l,
                n = m ? "height" : "width",
                o = m ? "top" : "left",
                p = {};
            a.effects.save(h, i), h.show(), d = a.effects.createWrapper(h).css({
                overflow: "hidden"
            }), f = "IMG" === h[0].tagName ? d : h, g = f[n](), k && (f.css(n, 0), f.css(o, g / 2)), p[n] = k ? g : 0, p[o] = k ? 0 : g / 2, f.animate(p, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function() {
                    k || h.hide(), a.effects.restore(h, i), a.effects.removeWrapper(h), c()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.drop = function(b, c) {
            var d, f = a(this),
                g = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                h = a.effects.setMode(f, b.mode || "hide"),
                i = "show" === h,
                j = b.direction || "left",
                k = "up" === j || "down" === j ? "top" : "left",
                l = "up" === j || "left" === j ? "pos" : "neg",
                m = {
                    opacity: i ? 1 : 0
                };
            a.effects.save(f, g), f.show(), a.effects.createWrapper(f), d = b.distance || f["top" === k ? "outerHeight" : "outerWidth"](!0) / 2, i && f.css("opacity", 0).css(k, "pos" === l ? -d : d), m[k] = (i ? "pos" === l ? "+=" : "-=" : "pos" === l ? "-=" : "+=") + d, f.animate(m, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function() {
                    "hide" === h && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.explode = function(b, c) {
            function d() {
                u.push(this), u.length === m * n && f()
            }

            function f() {
                o.css({
                    visibility: "visible"
                }), a(u).remove(), q || o.hide(), c()
            }
            var g, h, i, j, k, l, m = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
                n = m,
                o = a(this),
                p = a.effects.setMode(o, b.mode || "hide"),
                q = "show" === p,
                r = o.show().css("visibility", "hidden").offset(),
                s = Math.ceil(o.outerWidth() / n),
                t = Math.ceil(o.outerHeight() / m),
                u = [];
            for (g = 0; m > g; g++)
                for (j = r.top + g * t, l = g - (m - 1) / 2, h = 0; n > h; h++) i = r.left + h * s, k = h - (n - 1) / 2, o.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -h * s,
                    top: -g * t
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: s,
                    height: t,
                    left: i + (q ? k * s : 0),
                    top: j + (q ? l * t : 0),
                    opacity: q ? 0 : 1
                }).animate({
                    left: i + (q ? 0 : k * s),
                    top: j + (q ? 0 : l * t),
                    opacity: q ? 1 : 0
                }, b.duration || 500, b.easing, d)
        }
    }(jQuery),
    function(a) {
        a.effects.effect.fade = function(b, c) {
            var d = a(this),
                f = a.effects.setMode(d, b.mode || "toggle");
            d.animate({
                opacity: f
            }, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: c
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.fold = function(b, c) {
            var d, f, g = a(this),
                h = ["position", "top", "bottom", "left", "right", "height", "width"],
                i = a.effects.setMode(g, b.mode || "hide"),
                j = "show" === i,
                k = "hide" === i,
                l = b.size || 15,
                m = /([0-9]+)%/.exec(l),
                n = !!b.horizFirst,
                o = j !== n,
                p = o ? ["width", "height"] : ["height", "width"],
                q = b.duration / 2,
                r = {},
                s = {};
            a.effects.save(g, h), g.show(), d = a.effects.createWrapper(g).css({
                overflow: "hidden"
            }), f = o ? [d.width(), d.height()] : [d.height(), d.width()], m && (l = parseInt(m[1], 10) / 100 * f[k ? 0 : 1]), j && d.css(n ? {
                height: 0,
                width: l
            } : {
                height: l,
                width: 0
            }), r[p[0]] = j ? f[0] : l, s[p[1]] = j ? f[1] : 0, d.animate(r, q, b.easing).animate(s, q, b.easing, function() {
                k && g.hide(), a.effects.restore(g, h), a.effects.removeWrapper(g), c()
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.highlight = function(b, c) {
            var d = a(this),
                f = ["backgroundImage", "backgroundColor", "opacity"],
                g = a.effects.setMode(d, b.mode || "show"),
                h = {
                    backgroundColor: d.css("backgroundColor")
                };
            "hide" === g && (h.opacity = 0), a.effects.save(d, f), d.show().css({
                backgroundImage: "none",
                backgroundColor: b.color || "#ffff99"
            }).animate(h, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function() {
                    "hide" === g && d.hide(), a.effects.restore(d, f), c()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.pulsate = function(b, c) {
            var d, f = a(this),
                g = a.effects.setMode(f, b.mode || "show"),
                h = "show" === g,
                i = "hide" === g,
                j = h || "hide" === g,
                k = 2 * (b.times || 5) + (j ? 1 : 0),
                l = b.duration / k,
                m = 0,
                n = f.queue(),
                o = n.length;
            for ((h || !f.is(":visible")) && (f.css("opacity", 0).show(), m = 1), d = 1; k > d; d++) f.animate({
                opacity: m
            }, l, b.easing), m = 1 - m;
            f.animate({
                opacity: m
            }, l, b.easing), f.queue(function() {
                i && f.hide(), c()
            }), o > 1 && n.splice.apply(n, [1, 0].concat(n.splice(o, k + 1))), f.dequeue()
        }
    }(jQuery),
    function(a) {
        a.effects.effect.puff = function(b, c) {
            var d = a(this),
                f = a.effects.setMode(d, b.mode || "hide"),
                g = "hide" === f,
                h = parseInt(b.percent, 10) || 150,
                i = h / 100,
                j = {
                    height: d.height(),
                    width: d.width(),
                    outerHeight: d.outerHeight(),
                    outerWidth: d.outerWidth()
                };
            a.extend(b, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: f,
                complete: c,
                percent: g ? h : 100,
                from: g ? j : {
                    height: j.height * i,
                    width: j.width * i,
                    outerHeight: j.outerHeight * i,
                    outerWidth: j.outerWidth * i
                }
            }), d.effect(b)
        }, a.effects.effect.scale = function(b, c) {
            var d = a(this),
                f = a.extend(!0, {}, b),
                g = a.effects.setMode(d, b.mode || "effect"),
                h = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === g ? 0 : 100),
                i = b.direction || "both",
                j = b.origin,
                k = {
                    height: d.height(),
                    width: d.width(),
                    outerHeight: d.outerHeight(),
                    outerWidth: d.outerWidth()
                },
                l = {
                    y: "horizontal" !== i ? h / 100 : 1,
                    x: "vertical" !== i ? h / 100 : 1
                };
            f.effect = "size", f.queue = !1, f.complete = c, "effect" !== g && (f.origin = j || ["middle", "center"], f.restore = !0), f.from = b.from || ("show" === g ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : k), f.to = {
                height: k.height * l.y,
                width: k.width * l.x,
                outerHeight: k.outerHeight * l.y,
                outerWidth: k.outerWidth * l.x
            }, f.fade && ("show" === g && (f.from.opacity = 0, f.to.opacity = 1), "hide" === g && (f.from.opacity = 1, f.to.opacity = 0)), d.effect(f)
        }, a.effects.effect.size = function(b, c) {
            var d, f, g, h = a(this),
                i = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                j = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                k = ["width", "height", "overflow"],
                l = ["fontSize"],
                m = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                n = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                o = a.effects.setMode(h, b.mode || "effect"),
                p = b.restore || "effect" !== o,
                q = b.scale || "both",
                r = b.origin || ["middle", "center"],
                s = h.css("position"),
                t = p ? i : j,
                u = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === o && h.show(), d = {
                height: h.height(),
                width: h.width(),
                outerHeight: h.outerHeight(),
                outerWidth: h.outerWidth()
            }, "toggle" === b.mode && "show" === o ? (h.from = b.to || u, h.to = b.from || d) : (h.from = b.from || ("show" === o ? u : d), h.to = b.to || ("hide" === o ? u : d)), g = {
                from: {
                    y: h.from.height / d.height,
                    x: h.from.width / d.width
                },
                to: {
                    y: h.to.height / d.height,
                    x: h.to.width / d.width
                }
            }, ("box" === q || "both" === q) && (g.from.y !== g.to.y && (t = t.concat(m), h.from = a.effects.setTransition(h, m, g.from.y, h.from), h.to = a.effects.setTransition(h, m, g.to.y, h.to)), g.from.x !== g.to.x && (t = t.concat(n), h.from = a.effects.setTransition(h, n, g.from.x, h.from), h.to = a.effects.setTransition(h, n, g.to.x, h.to))), ("content" === q || "both" === q) && g.from.y !== g.to.y && (t = t.concat(l).concat(k), h.from = a.effects.setTransition(h, l, g.from.y, h.from), h.to = a.effects.setTransition(h, l, g.to.y, h.to)), a.effects.save(h, t), h.show(), a.effects.createWrapper(h), h.css("overflow", "hidden").css(h.from), r && (f = a.effects.getBaseline(r, d), h.from.top = (d.outerHeight - h.outerHeight()) * f.y, h.from.left = (d.outerWidth - h.outerWidth()) * f.x, h.to.top = (d.outerHeight - h.to.outerHeight) * f.y, h.to.left = (d.outerWidth - h.to.outerWidth) * f.x), h.css(h.from), ("content" === q || "both" === q) && (m = m.concat(["marginTop", "marginBottom"]).concat(l), n = n.concat(["marginLeft", "marginRight"]), k = i.concat(m).concat(n), h.find("*[width]").each(function() {
                var c = a(this),
                    d = {
                        height: c.height(),
                        width: c.width(),
                        outerHeight: c.outerHeight(),
                        outerWidth: c.outerWidth()
                    };
                p && a.effects.save(c, k), c.from = {
                    height: d.height * g.from.y,
                    width: d.width * g.from.x,
                    outerHeight: d.outerHeight * g.from.y,
                    outerWidth: d.outerWidth * g.from.x
                }, c.to = {
                    height: d.height * g.to.y,
                    width: d.width * g.to.x,
                    outerHeight: d.height * g.to.y,
                    outerWidth: d.width * g.to.x
                }, g.from.y !== g.to.y && (c.from = a.effects.setTransition(c, m, g.from.y, c.from), c.to = a.effects.setTransition(c, m, g.to.y, c.to)), g.from.x !== g.to.x && (c.from = a.effects.setTransition(c, n, g.from.x, c.from), c.to = a.effects.setTransition(c, n, g.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function() {
                    p && a.effects.restore(c, k)
                })
            })), h.animate(h.to, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function() {
                    0 === h.to.opacity && h.css("opacity", h.from.opacity), "hide" === o && h.hide(), a.effects.restore(h, t), p || ("static" === s ? h.css({
                        position: "relative",
                        top: h.to.top,
                        left: h.to.left
                    }) : a.each(["top", "left"], function(a, b) {
                        h.css(b, function(b, c) {
                            var d = parseInt(c, 10),
                                f = a ? h.to.left : h.to.top;
                            return "auto" === c ? f + "px" : d + f + "px"
                        })
                    })), a.effects.removeWrapper(h), c()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.shake = function(b, c) {
            var d, f = a(this),
                g = ["position", "top", "bottom", "left", "right", "height", "width"],
                h = a.effects.setMode(f, b.mode || "effect"),
                i = b.direction || "left",
                j = b.distance || 20,
                k = b.times || 3,
                l = 2 * k + 1,
                m = Math.round(b.duration / l),
                n = "up" === i || "down" === i ? "top" : "left",
                o = "up" === i || "left" === i,
                p = {},
                q = {},
                r = {},
                s = f.queue(),
                t = s.length;
            for (a.effects.save(f, g), f.show(), a.effects.createWrapper(f), p[n] = (o ? "-=" : "+=") + j, q[n] = (o ? "+=" : "-=") + 2 * j, r[n] = (o ? "-=" : "+=") + 2 * j, f.animate(p, m, b.easing), d = 1; k > d; d++) f.animate(q, m, b.easing).animate(r, m, b.easing);
            f.animate(q, m, b.easing).animate(p, m / 2, b.easing).queue(function() {
                "hide" === h && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
            }), t > 1 && s.splice.apply(s, [1, 0].concat(s.splice(t, l + 1))), f.dequeue()
        }
    }(jQuery),
    function(a) {
        a.effects.effect.slide = function(b, c) {
            var d, f = a(this),
                g = ["position", "top", "bottom", "left", "right", "width", "height"],
                h = a.effects.setMode(f, b.mode || "show"),
                i = "show" === h,
                j = b.direction || "left",
                k = "up" === j || "down" === j ? "top" : "left",
                l = "up" === j || "left" === j,
                m = {};
            a.effects.save(f, g), f.show(), d = b.distance || f["top" === k ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(f).css({
                overflow: "hidden"
            }), i && f.css(k, l ? isNaN(d) ? "-" + d : -d : d), m[k] = (i ? l ? "+=" : "-=" : l ? "-=" : "+=") + d, f.animate(m, {
                queue: !1,
                duration: b.duration,
                easing: b.easing,
                complete: function() {
                    "hide" === h && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), c()
                }
            })
        }
    }(jQuery),
    function(a) {
        a.effects.effect.transfer = function(b, c) {
            var d = a(this),
                f = a(b.to),
                g = "fixed" === f.css("position"),
                h = a("body"),
                i = g ? h.scrollTop() : 0,
                j = g ? h.scrollLeft() : 0,
                k = f.offset(),
                l = {
                    top: k.top - i,
                    left: k.left - j,
                    height: f.innerHeight(),
                    width: f.innerWidth()
                },
                m = d.offset(),
                n = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(b.className).css({
                    top: m.top - i,
                    left: m.left - j,
                    height: d.innerHeight(),
                    width: d.innerWidth(),
                    position: g ? "fixed" : "absolute"
                }).animate(l, b.duration, b.easing, function() {
                    n.remove(), c()
                })
        }
    }(jQuery), ! function(a, b, c) {
        ! function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : jQuery && !jQuery.fn.sparkline && a(jQuery)
        }(function(d) {
            "use strict";
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K = {},
                L = 0;
            e = function() {
                return {
                    common: {
                        type: "line",
                        lineColor: "#00f",
                        fillColor: "#cdf",
                        defaultPixelsPerValue: 3,
                        width: "auto",
                        height: "auto",
                        composite: !1,
                        tagValuesAttribute: "values",
                        tagOptionsPrefix: "spark",
                        enableTagOptions: !1,
                        enableHighlight: !0,
                        highlightLighten: 1.4,
                        tooltipSkipNull: !0,
                        tooltipPrefix: "",
                        tooltipSuffix: "",
                        disableHiddenCheck: !1,
                        numberFormatter: !1,
                        numberDigitGroupCount: 3,
                        numberDigitGroupSep: ",",
                        numberDecimalMark: ".",
                        disableTooltips: !1,
                        disableInteraction: !1
                    },
                    line: {
                        spotColor: "#f80",
                        highlightSpotColor: "#5f5",
                        highlightLineColor: "#f22",
                        spotRadius: 1.5,
                        minSpotColor: "#f80",
                        maxSpotColor: "#f80",
                        lineWidth: 1,
                        normalRangeMin: c,
                        normalRangeMax: c,
                        normalRangeColor: "#ccc",
                        drawNormalOnTop: !1,
                        chartRangeMin: c,
                        chartRangeMax: c,
                        chartRangeMinX: c,
                        chartRangeMaxX: c,
                        tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                    },
                    bar: {
                        barColor: "#3366cc",
                        negBarColor: "#f44",
                        stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        zeroColor: c,
                        nullColor: c,
                        zeroAxis: !0,
                        barWidth: 4,
                        barSpacing: 1,
                        chartRangeMax: c,
                        chartRangeMin: c,
                        chartRangeClip: !1,
                        colorMap: c,
                        tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                    },
                    tristate: {
                        barWidth: 4,
                        barSpacing: 1,
                        posBarColor: "#6f6",
                        negBarColor: "#f44",
                        zeroBarColor: "#999",
                        colorMap: {},
                        tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                        tooltipValueLookups: {
                            map: {
                                "-1": "Loss",
                                0: "Draw",
                                1: "Win"
                            }
                        }
                    },
                    discrete: {
                        lineHeight: "auto",
                        thresholdColor: c,
                        thresholdValue: 0,
                        chartRangeMax: c,
                        chartRangeMin: c,
                        chartRangeClip: !1,
                        tooltipFormat: new g("{{prefix}}{{value}}{{suffix}}")
                    },
                    bullet: {
                        targetColor: "#f33",
                        targetWidth: 3,
                        performanceColor: "#33f",
                        rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                        base: c,
                        tooltipFormat: new g("{{fieldkey:fields}} - {{value}}"),
                        tooltipValueLookups: {
                            fields: {
                                r: "Range",
                                p: "Performance",
                                t: "Target"
                            }
                        }
                    },
                    pie: {
                        offset: 0,
                        sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        borderWidth: 0,
                        borderColor: "#000",
                        tooltipFormat: new g('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                    },
                    box: {
                        raw: !1,
                        boxLineColor: "#000",
                        boxFillColor: "#cdf",
                        whiskerColor: "#000",
                        outlierLineColor: "#333",
                        outlierFillColor: "#fff",
                        medianColor: "#f00",
                        showOutliers: !0,
                        outlierIQR: 1.5,
                        spotRadius: 1.5,
                        target: c,
                        targetColor: "#4a2",
                        chartRangeMax: c,
                        chartRangeMin: c,
                        tooltipFormat: new g("{{field:fields}}: {{value}}"),
                        tooltipFormatFieldlistKey: "field",
                        tooltipValueLookups: {
                            fields: {
                                lq: "Lower Quartile",
                                med: "Median",
                                uq: "Upper Quartile",
                                lo: "Left Outlier",
                                ro: "Right Outlier",
                                lw: "Left Whisker",
                                rw: "Right Whisker"
                            }
                        }
                    }
                }
            }, D = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', f = function() {
                var a, b;
                return a = function() {
                    this.init.apply(this, arguments)
                }, arguments.length > 1 ? (arguments[0] ? (a.prototype = d.extend(new arguments[0], arguments[arguments.length - 1]), a._super = arguments[0].prototype) : a.prototype = arguments[arguments.length - 1], arguments.length > 2 && (b = Array.prototype.slice.call(arguments, 1, -1), b.unshift(a.prototype), d.extend.apply(d, b))) : a.prototype = arguments[0], a.prototype.cls = a, a
            }, d.SPFormatClass = g = f({
                fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
                precre: /(\w+)\.(\d+)/,
                init: function(a, b) {
                    this.format = a, this.fclass = b
                },
                render: function(a, b, d) {
                    var e, f, g, h, i, j = this,
                        k = a;
                    return this.format.replace(this.fre, function() {
                        var a;
                        return f = arguments[1], g = arguments[3], e = j.precre.exec(f), e ? (i = e[2], f = e[1]) : i = !1, h = k[f], h === c ? "" : g && b && b[g] ? (a = b[g], a.get ? b[g].get(h) || h : b[g][h] || h) : (m(h) && (h = d.get("numberFormatter") ? d.get("numberFormatter")(h) : r(h, i, d.get("numberDigitGroupCount"), d.get("numberDigitGroupSep"), d.get("numberDecimalMark"))), h)
                    })
                }
            }), d.spformat = function(a, b) {
                return new g(a, b)
            }, h = function(a, b, c) {
                return b > a ? b : a > c ? c : a
            }, i = function(a, c) {
                var d;
                return 2 === c ? (d = b.floor(a.length / 2), a.length % 2 ? a[d] : (a[d - 1] + a[d]) / 2) : a.length % 2 ? (d = (a.length * c + c) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1]) : (d = (a.length * c + 2) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1])
            }, j = function(a) {
                var b;
                switch (a) {
                    case "undefined":
                        a = c;
                        break;
                    case "null":
                        a = null;
                        break;
                    case "true":
                        a = !0;
                        break;
                    case "false":
                        a = !1;
                        break;
                    default:
                        b = parseFloat(a), a == b && (a = b)
                }
                return a
            }, k = function(a) {
                var b, c = [];
                for (b = a.length; b--;) c[b] = j(a[b]);
                return c
            }, l = function(a, b) {
                var c, d, e = [];
                for (c = 0, d = a.length; d > c; c++) a[c] !== b && e.push(a[c]);
                return e
            }, m = function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, r = function(a, b, c, e, f) {
                var g, h;
                for (a = (b === !1 ? parseFloat(a).toString() : a.toFixed(b)).split(""), g = (g = d.inArray(".", a)) < 0 ? a.length : g, g < a.length && (a[g] = f), h = g - c; h > 0; h -= c) a.splice(h, 0, e);
                return a.join("")
            }, n = function(a, b, c) {
                var d;
                for (d = b.length; d--;)
                    if ((!c || null !== b[d]) && b[d] !== a) return !1;
                return !0
            }, o = function(a) {
                var b, c = 0;
                for (b = a.length; b--;) c += "number" == typeof a[b] ? a[b] : 0;
                return c
            }, q = function(a) {
                return d.isArray(a) ? a : [a]
            }, p = function(b) {
                var c;
                a.createStyleSheet ? a.createStyleSheet().cssText = b : (c = a.createElement("style"), c.type = "text/css", a.getElementsByTagName("head")[0].appendChild(c), c["string" == typeof a.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = b)
            }, d.fn.simpledraw = function(b, e, f, g) {
                var h, i;
                if (f && (h = this.data("_jqs_vcanvas"))) return h;
                if (d.fn.sparkline.canvas === !1) return !1;
                if (d.fn.sparkline.canvas === c) {
                    var j = a.createElement("canvas");
                    if (j.getContext && j.getContext("2d")) d.fn.sparkline.canvas = function(a, b, c, d) {
                        return new H(a, b, c, d)
                    };
                    else {
                        if (!a.namespaces || a.namespaces.v) return d.fn.sparkline.canvas = !1, !1;
                        a.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), d.fn.sparkline.canvas = function(a, b, c) {
                            return new I(a, b, c)
                        }
                    }
                }
                return b === c && (b = d(this).innerWidth()), e === c && (e = d(this).innerHeight()), h = d.fn.sparkline.canvas(b, e, this, g), i = d(this).data("_jqs_mhandler"), i && i.registerCanvas(h), h
            }, d.fn.cleardraw = function() {
                var a = this.data("_jqs_vcanvas");
                a && a.reset()
            }, d.RangeMapClass = s = f({
                init: function(a) {
                    var b, c, d = [];
                    for (b in a) a.hasOwnProperty(b) && "string" == typeof b && b.indexOf(":") > -1 && (c = b.split(":"), c[0] = 0 === c[0].length ? -1 / 0 : parseFloat(c[0]), c[1] = 0 === c[1].length ? 1 / 0 : parseFloat(c[1]), c[2] = a[b], d.push(c));
                    this.map = a, this.rangelist = d || !1
                },
                get: function(a) {
                    var b, d, e, f = this.rangelist;
                    if ((e = this.map[a]) !== c) return e;
                    if (f)
                        for (b = f.length; b--;)
                            if (d = f[b], d[0] <= a && d[1] >= a) return d[2];
                    return c
                }
            }), d.range_map = function(a) {
                return new s(a)
            }, t = f({
                init: function(a, b) {
                    var c = d(a);
                    this.$el = c, this.options = b, this.currentPageX = 0, this.currentPageY = 0, this.el = a, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !b.get("disableTooltips"), this.highlightEnabled = !b.get("disableHighlight")
                },
                registerSparkline: function(a) {
                    this.splist.push(a), this.over && this.updateDisplay()
                },
                registerCanvas: function(a) {
                    var b = d(a.canvas);
                    this.canvas = a, this.$canvas = b, b.mouseenter(d.proxy(this.mouseenter, this)), b.mouseleave(d.proxy(this.mouseleave, this)), b.click(d.proxy(this.mouseclick, this))
                },
                reset: function(a) {
                    this.splist = [], this.tooltip && a && (this.tooltip.remove(), this.tooltip = c)
                },
                mouseclick: function(a) {
                    var b = d.Event("sparklineClick");
                    b.originalEvent = a, b.sparklines = this.splist, this.$el.trigger(b)
                },
                mouseenter: function(b) {
                    d(a.body).unbind("mousemove.jqs"), d(a.body).bind("mousemove.jqs", d.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, !this.tooltip && this.displayTooltips && (this.tooltip = new u(this.options), this.tooltip.updatePosition(b.pageX, b.pageY)), this.updateDisplay()
                },
                mouseleave: function() {
                    d(a.body).unbind("mousemove.jqs");
                    var b, c, e = this.splist,
                        f = e.length,
                        g = !1;
                    for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null), c = 0; f > c; c++) b = e[c], b.clearRegionHighlight() && (g = !0);
                    g && this.canvas.render()
                },
                mousemove: function(a) {
                    this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, this.tooltip && this.tooltip.updatePosition(a.pageX, a.pageY), this.updateDisplay()
                },
                updateDisplay: function() {
                    var a, b, c, e, f, g = this.splist,
                        h = g.length,
                        i = !1,
                        j = this.$canvas.offset(),
                        k = this.currentPageX - j.left,
                        l = this.currentPageY - j.top;
                    if (this.over) {
                        for (c = 0; h > c; c++) b = g[c], e = b.setRegionHighlight(this.currentEl, k, l), e && (i = !0);
                        if (i) {
                            if (f = d.Event("sparklineRegionChange"), f.sparklines = this.splist, this.$el.trigger(f), this.tooltip) {
                                for (a = "", c = 0; h > c; c++) b = g[c], a += b.getCurrentRegionTooltip();
                                this.tooltip.setContent(a)
                            }
                            this.disableHighlight || this.canvas.render()
                        }
                        null === e && this.mouseleave()
                    }
                }
            }), u = f({
                sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
                init: function(b) {
                    var c, e = b.get("tooltipClassname", "jqstooltip"),
                        f = this.sizeStyle;
                    this.container = b.get("tooltipContainer") || a.body, this.tooltipOffsetX = b.get("tooltipOffsetX", 10), this.tooltipOffsetY = b.get("tooltipOffsetY", 12), d("#jqssizetip").remove(), d("#jqstooltip").remove(), this.sizetip = d("<div/>", {
                        id: "jqssizetip",
                        style: f,
                        "class": e
                    }), this.tooltip = d("<div/>", {
                        id: "jqstooltip",
                        "class": e
                    }).appendTo(this.container), c = this.tooltip.offset(), this.offsetLeft = c.left, this.offsetTop = c.top, this.hidden = !0, d(window).unbind("resize.jqs scroll.jqs"), d(window).bind("resize.jqs scroll.jqs", d.proxy(this.updateWindowDims, this)), this.updateWindowDims()
                },
                updateWindowDims: function() {
                    this.scrollTop = d(window).scrollTop(), this.scrollLeft = d(window).scrollLeft(), this.scrollRight = this.scrollLeft + d(window).width(), this.updatePosition()
                },
                getSize: function(a) {
                    this.sizetip.html(a).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
                },
                setContent: function(a) {
                    return a ? (this.getSize(a), this.tooltip.html(a).css({
                        width: this.width,
                        height: this.height,
                        visibility: "visible"
                    }), this.hidden && (this.hidden = !1, this.updatePosition()), void 0) : (this.tooltip.css("visibility", "hidden"), this.hidden = !0, void 0)
                },
                updatePosition: function(a, b) {
                    if (a === c) {
                        if (this.mousex === c) return;
                        a = this.mousex - this.offsetLeft, b = this.mousey - this.offsetTop
                    } else this.mousex = a -= this.offsetLeft, this.mousey = b -= this.offsetTop;
                    this.height && this.width && !this.hidden && (b -= this.height + this.tooltipOffsetY, a += this.tooltipOffsetX, b < this.scrollTop && (b = this.scrollTop), a < this.scrollLeft ? a = this.scrollLeft : a + this.width > this.scrollRight && (a = this.scrollRight - this.width), this.tooltip.css({
                        left: a,
                        top: b
                    }))
                },
                remove: function() {
                    this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = c, d(window).unbind("resize.jqs scroll.jqs")
                }
            }), E = function() {
                p(D)
            }, d(E), J = [], d.fn.sparkline = function(b, e) {
                return this.each(function() {
                    var f, g, h = new d.fn.sparkline.options(this, e),
                        i = d(this);
                    if (f = function() {
                            var e, f, g, j, k, l, m;
                            return "html" === b || b === c ? (m = this.getAttribute(h.get("tagValuesAttribute")), (m === c || null === m) && (m = i.html()), e = m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : e = b, f = "auto" === h.get("width") ? e.length * h.get("defaultPixelsPerValue") : h.get("width"), "auto" === h.get("height") ? h.get("composite") && d.data(this, "_jqs_vcanvas") || (j = a.createElement("span"), j.innerHTML = "a", i.html(j), g = d(j).innerHeight() || d(j).height(), d(j).remove(), j = null) : g = h.get("height"), h.get("disableInteraction") ? k = !1 : (k = d.data(this, "_jqs_mhandler"), k ? h.get("composite") || k.reset() : (k = new t(this, h), d.data(this, "_jqs_mhandler", k))), h.get("composite") && !d.data(this, "_jqs_vcanvas") ? (d.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), d.data(this, "_jqs_errnotify", !0)), void 0) : (l = new(d.fn.sparkline[h.get("type")])(this, e, h, f, g), l.render(), k && k.registerSparkline(l), void 0)
                        }, d(this).html() && !h.get("disableHiddenCheck") && d(this).is(":hidden") || !d(this).parents("body").length) {
                        if (!h.get("composite") && d.data(this, "_jqs_pending"))
                            for (g = J.length; g; g--) J[g - 1][0] == this && J.splice(g - 1, 1);
                        J.push([this, f]), d.data(this, "_jqs_pending", !0)
                    } else f.call(this)
                })
            }, d.fn.sparkline.defaults = e(), d.sparkline_display_visible = function() {
                var a, b, c, e = [];
                for (b = 0, c = J.length; c > b; b++) a = J[b][0], d(a).is(":visible") && !d(a).parents().is(":hidden") ? (J[b][1].call(a), d.data(J[b][0], "_jqs_pending", !1), e.push(b)) : d(a).closest("html").length || d.data(a, "_jqs_pending") || (d.data(J[b][0], "_jqs_pending", !1), e.push(b));
                for (b = e.length; b; b--) J.splice(e[b - 1], 1)
            }, d.fn.sparkline.options = f({
                init: function(a, b) {
                    var c, e, f, g;
                    this.userOptions = b = b || {}, this.tag = a, this.tagValCache = {}, e = d.fn.sparkline.defaults, f = e.common, this.tagOptionsPrefix = b.enableTagOptions && (b.tagOptionsPrefix || f.tagOptionsPrefix), g = this.getTagSetting("type"), c = g === K ? e[b.type || f.type] : e[g], this.mergedOptions = d.extend({}, f, c, b)
                },
                getTagSetting: function(a) {
                    var b, d, e, f, g = this.tagOptionsPrefix;
                    if (g === !1 || g === c) return K;
                    if (this.tagValCache.hasOwnProperty(a)) b = this.tagValCache.key;
                    else {
                        if (b = this.tag.getAttribute(g + a), b === c || null === b) b = K;
                        else if ("[" === b.substr(0, 1))
                            for (b = b.substr(1, b.length - 2).split(","), d = b.length; d--;) b[d] = j(b[d].replace(/(^\s*)|(\s*$)/g, ""));
                        else if ("{" === b.substr(0, 1))
                            for (e = b.substr(1, b.length - 2).split(","), b = {}, d = e.length; d--;) f = e[d].split(":", 2), b[f[0].replace(/(^\s*)|(\s*$)/g, "")] = j(f[1].replace(/(^\s*)|(\s*$)/g, ""));
                        else b = j(b);
                        this.tagValCache.key = b
                    }
                    return b
                },
                get: function(a, b) {
                    var d, e = this.getTagSetting(a);
                    return e !== K ? e : (d = this.mergedOptions[a]) === c ? b : d
                }
            }), d.fn.sparkline._base = f({
                disabled: !1,
                init: function(a, b, e, f, g) {
                    this.el = a, this.$el = d(a), this.values = b, this.options = e, this.width = f, this.height = g, this.currentRegion = c
                },
                initTarget: function() {
                    var a = !this.options.get("disableInteraction");
                    (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), a)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
                },
                render: function() {
                    return this.disabled ? (this.el.innerHTML = "", !1) : !0
                },
                getRegion: function() {},
                setRegionHighlight: function(a, b, d) {
                    var e, f = this.currentRegion,
                        g = !this.options.get("disableHighlight");
                    return b > this.canvasWidth || d > this.canvasHeight || 0 > b || 0 > d ? null : (e = this.getRegion(a, b, d), f !== e ? (f !== c && g && this.removeHighlight(), this.currentRegion = e, e !== c && g && this.renderHighlight(), !0) : !1)
                },
                clearRegionHighlight: function() {
                    return this.currentRegion !== c ? (this.removeHighlight(), this.currentRegion = c, !0) : !1
                },
                renderHighlight: function() {
                    this.changeHighlight(!0)
                },
                removeHighlight: function() {
                    this.changeHighlight(!1)
                },
                changeHighlight: function() {},
                getCurrentRegionTooltip: function() {
                    var a, b, e, f, h, i, j, k, l, m, n, o, p, q, r = this.options,
                        s = "",
                        t = [];
                    if (this.currentRegion === c) return "";
                    if (a = this.getCurrentRegionFields(), n = r.get("tooltipFormatter")) return n(this, r, a);
                    if (r.get("tooltipChartTitle") && (s += '<div class="jqs jqstitle">' + r.get("tooltipChartTitle") + "</div>\n"), b = this.options.get("tooltipFormat"), !b) return "";
                    if (d.isArray(b) || (b = [b]), d.isArray(a) || (a = [a]), j = this.options.get("tooltipFormatFieldlist"), k = this.options.get("tooltipFormatFieldlistKey"), j && k) {
                        for (l = [], i = a.length; i--;) m = a[i][k], -1 != (q = d.inArray(m, j)) && (l[q] = a[i]);
                        a = l
                    }
                    for (e = b.length, p = a.length, i = 0; e > i; i++)
                        for (o = b[i], "string" == typeof o && (o = new g(o)), f = o.fclass || "jqsfield", q = 0; p > q; q++) a[q].isNull && r.get("tooltipSkipNull") || (d.extend(a[q], {
                            prefix: r.get("tooltipPrefix"),
                            suffix: r.get("tooltipSuffix")
                        }), h = o.render(a[q], r.get("tooltipValueLookups"), r), t.push('<div class="' + f + '">' + h + "</div>"));
                    return t.length ? s + t.join("\n") : ""
                },
                getCurrentRegionFields: function() {},
                calcHighlightColor: function(a, c) {
                    var d, e, f, g, i = c.get("highlightColor"),
                        j = c.get("highlightLighten");
                    if (i) return i;
                    if (j && (d = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a))) {
                        for (f = [], e = 4 === a.length ? 16 : 1, g = 0; 3 > g; g++) f[g] = h(b.round(parseInt(d[g + 1], 16) * e * j), 0, 255);
                        return "rgb(" + f.join(",") + ")"
                    }
                    return a
                }
            }), v = {
                changeHighlight: function(a) {
                    var b, c = this.currentRegion,
                        e = this.target,
                        f = this.regionShapes[c];
                    f && (b = this.renderRegion(c, a), d.isArray(b) || d.isArray(f) ? (e.replaceWithShapes(f, b), this.regionShapes[c] = d.map(b, function(a) {
                        return a.id
                    })) : (e.replaceWithShape(f, b), this.regionShapes[c] = b.id))
                },
                render: function() {
                    var a, b, c, e, f = this.values,
                        g = this.target,
                        h = this.regionShapes;
                    if (this.cls._super.render.call(this)) {
                        for (c = f.length; c--;)
                            if (a = this.renderRegion(c))
                                if (d.isArray(a)) {
                                    for (b = [], e = a.length; e--;) a[e].append(), b.push(a[e].id);
                                    h[c] = b
                                } else a.append(), h[c] = a.id;
                        else h[c] = null;
                        g.render()
                    }
                }
            }, d.fn.sparkline.line = w = f(d.fn.sparkline._base, {
                type: "line",
                init: function(a, b, c, d, e) {
                    w._super.init.call(this, a, b, c, d, e), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
                },
                getRegion: function(a, b) {
                    var d, e = this.regionMap;
                    for (d = e.length; d--;)
                        if (null !== e[d] && b >= e[d][0] && b <= e[d][1]) return e[d][2];
                    return c
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: null === this.yvalues[a],
                        x: this.xvalues[a],
                        y: this.yvalues[a],
                        color: this.options.get("lineColor"),
                        fillColor: this.options.get("fillColor"),
                        offset: a
                    }
                },
                renderHighlight: function() {
                    var a, b, d = this.currentRegion,
                        e = this.target,
                        f = this.vertices[d],
                        g = this.options,
                        h = g.get("spotRadius"),
                        i = g.get("highlightSpotColor"),
                        j = g.get("highlightLineColor");
                    f && (h && i && (a = e.drawCircle(f[0], f[1], h, c, i), this.highlightSpotId = a.id, e.insertAfterShape(this.lastShapeId, a)), j && (b = e.drawLine(f[0], this.canvasTop, f[0], this.canvasTop + this.canvasHeight, j), this.highlightLineId = b.id, e.insertAfterShape(this.lastShapeId, b)))
                },
                removeHighlight: function() {
                    var a = this.target;
                    this.highlightSpotId && (a.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (a.removeShapeId(this.highlightLineId), this.highlightLineId = null)
                },
                scanValues: function() {
                    var a, c, d, e, f, g = this.values,
                        h = g.length,
                        i = this.xvalues,
                        j = this.yvalues,
                        k = this.yminmax;
                    for (a = 0; h > a; a++) c = g[a], d = "string" == typeof g[a], e = "object" == typeof g[a] && g[a] instanceof Array, f = d && g[a].split(":"), d && 2 === f.length ? (i.push(Number(f[0])), j.push(Number(f[1])), k.push(Number(f[1]))) : e ? (i.push(c[0]), j.push(c[1]), k.push(c[1])) : (i.push(a), null === g[a] || "null" === g[a] ? j.push(null) : (j.push(Number(c)), k.push(Number(c))));
                    this.options.get("xvalues") && (i = this.options.get("xvalues")), this.maxy = this.maxyorg = b.max.apply(b, k), this.miny = this.minyorg = b.min.apply(b, k), this.maxx = b.max.apply(b, i), this.minx = b.min.apply(b, i), this.xvalues = i, this.yvalues = j, this.yminmax = k
                },
                processRangeOptions: function() {
                    var a = this.options,
                        b = a.get("normalRangeMin"),
                        d = a.get("normalRangeMax");
                    b !== c && (b < this.miny && (this.miny = b), d > this.maxy && (this.maxy = d)), a.get("chartRangeMin") !== c && (a.get("chartRangeClip") || a.get("chartRangeMin") < this.miny) && (this.miny = a.get("chartRangeMin")), a.get("chartRangeMax") !== c && (a.get("chartRangeClip") || a.get("chartRangeMax") > this.maxy) && (this.maxy = a.get("chartRangeMax")), a.get("chartRangeMinX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMinX") < this.minx) && (this.minx = a.get("chartRangeMinX")), a.get("chartRangeMaxX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMaxX") > this.maxx) && (this.maxx = a.get("chartRangeMaxX"))
                },
                drawNormalRange: function(a, d, e, f, g) {
                    var h = this.options.get("normalRangeMin"),
                        i = this.options.get("normalRangeMax"),
                        j = d + b.round(e - e * ((i - this.miny) / g)),
                        k = b.round(e * (i - h) / g);
                    this.target.drawRect(a, j, f, k, c, this.options.get("normalRangeColor")).append()
                },
                render: function() {
                    var a, e, f, g, h, i, j, k, l, m, n, o, p, q, r, t, u, v, x, y, z, A, B, C, D, E = this.options,
                        F = this.target,
                        G = this.canvasWidth,
                        H = this.canvasHeight,
                        I = this.vertices,
                        J = E.get("spotRadius"),
                        K = this.regionMap;
                    if (w._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), B = this.xvalues, C = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
                        for (g = h = 0, a = 0 === this.maxx - this.minx ? 1 : this.maxx - this.minx, e = 0 === this.maxy - this.miny ? 1 : this.maxy - this.miny, f = this.yvalues.length - 1, J && (4 * J > G || 4 * J > H) && (J = 0), J && (z = E.get("highlightSpotColor") && !E.get("disableInteraction"), (z || E.get("minSpotColor") || E.get("spotColor") && C[f] === this.miny) && (H -= b.ceil(J)), (z || E.get("maxSpotColor") || E.get("spotColor") && C[f] === this.maxy) && (H -= b.ceil(J), g += b.ceil(J)), (z || (E.get("minSpotColor") || E.get("maxSpotColor")) && (C[0] === this.miny || C[0] === this.maxy)) && (h += b.ceil(J), G -= b.ceil(J)), (z || E.get("spotColor") || E.get("minSpotColor") || E.get("maxSpotColor") && (C[f] === this.miny || C[f] === this.maxy)) && (G -= b.ceil(J))), H--, E.get("normalRangeMin") === c || E.get("drawNormalOnTop") || this.drawNormalRange(h, g, H, G, e), j = [], k = [j], q = r = null, t = C.length, D = 0; t > D; D++) l = B[D], n = B[D + 1], m = C[D], o = h + b.round((l - this.minx) * (G / a)), p = t - 1 > D ? h + b.round((n - this.minx) * (G / a)) : G, r = o + (p - o) / 2, K[D] = [q || 0, r, D], q = r, null === m ? D && (null !== C[D - 1] && (j = [], k.push(j)), I.push(null)) : (m < this.miny && (m = this.miny), m > this.maxy && (m = this.maxy), j.length || j.push([o, g + H]), i = [o, g + b.round(H - H * ((m - this.miny) / e))], j.push(i), I.push(i));
                        for (u = [], v = [], x = k.length, D = 0; x > D; D++) j = k[D], j.length && (E.get("fillColor") && (j.push([j[j.length - 1][0], g + H]), v.push(j.slice(0)), j.pop()), j.length > 2 && (j[0] = [j[0][0], j[1][1]]), u.push(j));
                        for (x = v.length, D = 0; x > D; D++) F.drawShape(v[D], E.get("fillColor"), E.get("fillColor")).append();
                        for (E.get("normalRangeMin") !== c && E.get("drawNormalOnTop") && this.drawNormalRange(h, g, H, G, e), x = u.length, D = 0; x > D; D++) F.drawShape(u[D], E.get("lineColor"), c, E.get("lineWidth")).append();
                        if (J && E.get("valueSpots"))
                            for (y = E.get("valueSpots"), y.get === c && (y = new s(y)), D = 0; t > D; D++) A = y.get(C[D]), A && F.drawCircle(h + b.round((B[D] - this.minx) * (G / a)), g + b.round(H - H * ((C[D] - this.miny) / e)), J, c, A).append();
                        J && E.get("spotColor") && null !== C[f] && F.drawCircle(h + b.round((B[B.length - 1] - this.minx) * (G / a)), g + b.round(H - H * ((C[f] - this.miny) / e)), J, c, E.get("spotColor")).append(), this.maxy !== this.minyorg && (J && E.get("minSpotColor") && (l = B[d.inArray(this.minyorg, C)], F.drawCircle(h + b.round((l - this.minx) * (G / a)), g + b.round(H - H * ((this.minyorg - this.miny) / e)), J, c, E.get("minSpotColor")).append()), J && E.get("maxSpotColor") && (l = B[d.inArray(this.maxyorg, C)], F.drawCircle(h + b.round((l - this.minx) * (G / a)), g + b.round(H - H * ((this.maxyorg - this.miny) / e)), J, c, E.get("maxSpotColor")).append())), this.lastShapeId = F.getLastShapeId(), this.canvasTop = g, F.render()
                    }
                }
            }), d.fn.sparkline.bar = x = f(d.fn.sparkline._base, v, {
                type: "bar",
                init: function(a, e, f, g, i) {
                    var m, n, o, p, q, r, t, u, v, w, y, z, A, B, C, D, E, F, G, H, I, J, K = parseInt(f.get("barWidth"), 10),
                        L = parseInt(f.get("barSpacing"), 10),
                        M = f.get("chartRangeMin"),
                        N = f.get("chartRangeMax"),
                        O = f.get("chartRangeClip"),
                        P = 1 / 0,
                        Q = -1 / 0;
                    for (x._super.init.call(this, a, e, f, g, i), r = 0, t = e.length; t > r; r++) H = e[r], m = "string" == typeof H && H.indexOf(":") > -1, (m || d.isArray(H)) && (C = !0, m && (H = e[r] = k(H.split(":"))), H = l(H, null), n = b.min.apply(b, H), o = b.max.apply(b, H), P > n && (P = n), o > Q && (Q = o));
                    this.stacked = C, this.regionShapes = {}, this.barWidth = K, this.barSpacing = L, this.totalBarWidth = K + L, this.width = g = e.length * K + (e.length - 1) * L, this.initTarget(), O && (A = M === c ? -1 / 0 : M, B = N === c ? 1 / 0 : N), q = [], p = C ? [] : q;
                    var R = [],
                        S = [];
                    for (r = 0, t = e.length; t > r; r++)
                        if (C)
                            for (D = e[r], e[r] = G = [], R[r] = 0, p[r] = S[r] = 0, E = 0, F = D.length; F > E; E++) H = G[E] = O ? h(D[E], A, B) : D[E], null !== H && (H > 0 && (R[r] += H), 0 > P && Q > 0 ? 0 > H ? S[r] += b.abs(H) : p[r] += H : p[r] += b.abs(H - (0 > H ? Q : P)), q.push(H));
                        else H = O ? h(e[r], A, B) : e[r], H = e[r] = j(H), null !== H && q.push(H);
                    this.max = z = b.max.apply(b, q), this.min = y = b.min.apply(b, q), this.stackMax = Q = C ? b.max.apply(b, R) : z, this.stackMin = P = C ? b.min.apply(b, q) : y, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < y) && (y = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > z) && (z = f.get("chartRangeMax")), this.zeroAxis = v = f.get("zeroAxis", !0), w = 0 >= y && z >= 0 && v ? 0 : 0 == v ? y : y > 0 ? y : z, this.xaxisOffset = w, u = C ? b.max.apply(b, p) + b.max.apply(b, S) : z - y, this.canvasHeightEf = v && 0 > y ? this.canvasHeight - 2 : this.canvasHeight - 1, w > y ? (J = C && z >= 0 ? Q : z, I = (J - w) / u * this.canvasHeight, I !== b.ceil(I) && (this.canvasHeightEf -= 2, I = b.ceil(I))) : I = this.canvasHeight, this.yoffset = I, d.isArray(f.get("colorMap")) ? (this.colorMapByIndex = f.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = f.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new s(this.colorMapByValue))), this.range = u
                },
                getRegion: function(a, d) {
                    var e = b.floor(d / this.totalBarWidth);
                    return 0 > e || e >= this.values.length ? c : e
                },
                getCurrentRegionFields: function() {
                    var a, b, c = this.currentRegion,
                        d = q(this.values[c]),
                        e = [];
                    for (b = d.length; b--;) a = d[b], e.push({
                        isNull: null === a,
                        value: a,
                        color: this.calcColor(b, a, c),
                        offset: c
                    });
                    return e
                },
                calcColor: function(a, b, e) {
                    var f, g, h = this.colorMapByIndex,
                        i = this.colorMapByValue,
                        j = this.options;
                    return f = this.stacked ? j.get("stackedBarColor") : 0 > b ? j.get("negBarColor") : j.get("barColor"), 0 === b && j.get("zeroColor") !== c && (f = j.get("zeroColor")), i && (g = i.get(b)) ? f = g : h && h.length > e && (f = h[e]), d.isArray(f) ? f[a % f.length] : f
                },
                renderRegion: function(a, e) {
                    var f, g, h, i, j, k, l, m, o, p, q = this.values[a],
                        r = this.options,
                        s = this.xaxisOffset,
                        t = [],
                        u = this.range,
                        v = this.stacked,
                        w = this.target,
                        x = a * this.totalBarWidth,
                        y = this.canvasHeightEf,
                        z = this.yoffset;
                    if (q = d.isArray(q) ? q : [q], l = q.length, m = q[0], i = n(null, q), p = n(s, q, !0), i) return r.get("nullColor") ? (h = e ? r.get("nullColor") : this.calcHighlightColor(r.get("nullColor"), r), f = z > 0 ? z - 1 : z, w.drawRect(x, f, this.barWidth - 1, 0, h, h)) : c;
                    for (j = z, k = 0; l > k; k++) {
                        if (m = q[k], v && m === s) {
                            if (!p || o) continue;
                            o = !0
                        }
                        g = u > 0 ? b.floor(y * (b.abs(m - s) / u)) + 1 : 1, s > m || m === s && 0 === z ? (f = j, j += g) : (f = z - g, z -= g), h = this.calcColor(k, m, a), e && (h = this.calcHighlightColor(h, r)), t.push(w.drawRect(x, f, this.barWidth - 1, g - 1, h, h))
                    }
                    return 1 === t.length ? t[0] : t
                }
            }), d.fn.sparkline.tristate = y = f(d.fn.sparkline._base, v, {
                type: "tristate",
                init: function(a, b, e, f, g) {
                    var h = parseInt(e.get("barWidth"), 10),
                        i = parseInt(e.get("barSpacing"), 10);
                    y._super.init.call(this, a, b, e, f, g), this.regionShapes = {}, this.barWidth = h, this.barSpacing = i, this.totalBarWidth = h + i, this.values = d.map(b, Number), this.width = f = b.length * h + (b.length - 1) * i, d.isArray(e.get("colorMap")) ? (this.colorMapByIndex = e.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = e.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new s(this.colorMapByValue))), this.initTarget()
                },
                getRegion: function(a, c) {
                    return b.floor(c / this.totalBarWidth)
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: this.values[a] === c,
                        value: this.values[a],
                        color: this.calcColor(this.values[a], a),
                        offset: a
                    }
                },
                calcColor: function(a, b) {
                    var c, d, e = this.values,
                        f = this.options,
                        g = this.colorMapByIndex,
                        h = this.colorMapByValue;
                    return c = h && (d = h.get(a)) ? d : g && g.length > b ? g[b] : e[b] < 0 ? f.get("negBarColor") : e[b] > 0 ? f.get("posBarColor") : f.get("zeroBarColor")
                },
                renderRegion: function(a, c) {
                    var d, e, f, g, h, i, j = this.values,
                        k = this.options,
                        l = this.target;
                    return d = l.pixelHeight, f = b.round(d / 2), g = a * this.totalBarWidth, j[a] < 0 ? (h = f, e = f - 1) : j[a] > 0 ? (h = 0, e = f - 1) : (h = f - 1, e = 2), i = this.calcColor(j[a], a), null !== i ? (c && (i = this.calcHighlightColor(i, k)), l.drawRect(g, h, this.barWidth - 1, e - 1, i, i)) : void 0
                }
            }), d.fn.sparkline.discrete = z = f(d.fn.sparkline._base, v, {
                type: "discrete",
                init: function(a, e, f, g, h) {
                    z._super.init.call(this, a, e, f, g, h), this.regionShapes = {}, this.values = e = d.map(e, Number), this.min = b.min.apply(b, e), this.max = b.max.apply(b, e), this.range = this.max - this.min, this.width = g = "auto" === f.get("width") ? 2 * e.length : this.width, this.interval = b.floor(g / e.length), this.itemWidth = g / e.length, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < this.min) && (this.min = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > this.max) && (this.max = f.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = "auto" === f.get("lineHeight") ? b.round(.3 * this.canvasHeight) : f.get("lineHeight"))
                },
                getRegion: function(a, c) {
                    return b.floor(c / this.itemWidth)
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: this.values[a] === c,
                        value: this.values[a],
                        offset: a
                    }
                },
                renderRegion: function(a, c) {
                    var d, e, f, g, i = this.values,
                        j = this.options,
                        k = this.min,
                        l = this.max,
                        m = this.range,
                        n = this.interval,
                        o = this.target,
                        p = this.canvasHeight,
                        q = this.lineHeight,
                        r = p - q;
                    return e = h(i[a], k, l), g = a * n, d = b.round(r - r * ((e - k) / m)), f = j.get("thresholdColor") && e < j.get("thresholdValue") ? j.get("thresholdColor") : j.get("lineColor"), c && (f = this.calcHighlightColor(f, j)), o.drawLine(g, d, g, d + q, f)
                }
            }), d.fn.sparkline.bullet = A = f(d.fn.sparkline._base, {
                type: "bullet",
                init: function(a, d, e, f, g) {
                    var h, i, j;
                    A._super.init.call(this, a, d, e, f, g), this.values = d = k(d), j = d.slice(), j[0] = null === j[0] ? j[2] : j[0], j[1] = null === d[1] ? j[2] : j[1], h = b.min.apply(b, d), i = b.max.apply(b, d), h = e.get("base") === c ? 0 > h ? h : 0 : e.get("base"), this.min = h, this.max = i, this.range = i - h, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = f = "auto" === e.get("width") ? "4.0em" : f, this.target = this.$el.simpledraw(f, g, e.get("composite")), d.length || (this.disabled = !0), this.initTarget()
                },
                getRegion: function(a, b, d) {
                    var e = this.target.getShapeAt(a, b, d);
                    return e !== c && this.shapes[e] !== c ? this.shapes[e] : c
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        fieldkey: a.substr(0, 1),
                        value: this.values[a.substr(1)],
                        region: a
                    }
                },
                changeHighlight: function(a) {
                    var b, c = this.currentRegion,
                        d = this.valueShapes[c];
                    switch (delete this.shapes[d], c.substr(0, 1)) {
                        case "r":
                            b = this.renderRange(c.substr(1), a);
                            break;
                        case "p":
                            b = this.renderPerformance(a);
                            break;
                        case "t":
                            b = this.renderTarget(a)
                    }
                    this.valueShapes[c] = b.id, this.shapes[b.id] = c, this.target.replaceWithShape(d, b)
                },
                renderRange: function(a, c) {
                    var d = this.values[a],
                        e = b.round(this.canvasWidth * ((d - this.min) / this.range)),
                        f = this.options.get("rangeColors")[a - 2];
                    return c && (f = this.calcHighlightColor(f, this.options)), this.target.drawRect(0, 0, e - 1, this.canvasHeight - 1, f, f)
                },
                renderPerformance: function(a) {
                    var c = this.values[1],
                        d = b.round(this.canvasWidth * ((c - this.min) / this.range)),
                        e = this.options.get("performanceColor");
                    return a && (e = this.calcHighlightColor(e, this.options)), this.target.drawRect(0, b.round(.3 * this.canvasHeight), d - 1, b.round(.4 * this.canvasHeight) - 1, e, e)
                },
                renderTarget: function(a) {
                    var c = this.values[0],
                        d = b.round(this.canvasWidth * ((c - this.min) / this.range) - this.options.get("targetWidth") / 2),
                        e = b.round(.1 * this.canvasHeight),
                        f = this.canvasHeight - 2 * e,
                        g = this.options.get("targetColor");
                    return a && (g = this.calcHighlightColor(g, this.options)), this.target.drawRect(d, e, this.options.get("targetWidth") - 1, f - 1, g, g)
                },
                render: function() {
                    var a, b, c = this.values.length,
                        d = this.target;
                    if (A._super.render.call(this)) {
                        for (a = 2; c > a; a++) b = this.renderRange(a).append(), this.shapes[b.id] = "r" + a, this.valueShapes["r" + a] = b.id;
                        null !== this.values[1] && (b = this.renderPerformance().append(), this.shapes[b.id] = "p1", this.valueShapes.p1 = b.id), null !== this.values[0] && (b = this.renderTarget().append(), this.shapes[b.id] = "t0", this.valueShapes.t0 = b.id), d.render()
                    }
                }
            }), d.fn.sparkline.pie = B = f(d.fn.sparkline._base, {
                type: "pie",
                init: function(a, c, e, f, g) {
                    var h, i = 0;
                    if (B._super.init.call(this, a, c, e, f, g), this.shapes = {}, this.valueShapes = {}, this.values = c = d.map(c, Number), "auto" === e.get("width") && (this.width = this.height), c.length > 0)
                        for (h = c.length; h--;) i += c[h];
                    this.total = i, this.initTarget(), this.radius = b.floor(b.min(this.canvasWidth, this.canvasHeight) / 2)
                },
                getRegion: function(a, b, d) {
                    var e = this.target.getShapeAt(a, b, d);
                    return e !== c && this.shapes[e] !== c ? this.shapes[e] : c
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: this.values[a] === c,
                        value: this.values[a],
                        percent: 100 * (this.values[a] / this.total),
                        color: this.options.get("sliceColors")[a % this.options.get("sliceColors").length],
                        offset: a
                    }
                },
                changeHighlight: function(a) {
                    var b = this.currentRegion,
                        c = this.renderSlice(b, a),
                        d = this.valueShapes[b];
                    delete this.shapes[d], this.target.replaceWithShape(d, c), this.valueShapes[b] = c.id, this.shapes[c.id] = b
                },
                renderSlice: function(a, d) {
                    var e, f, g, h, i, j = this.target,
                        k = this.options,
                        l = this.radius,
                        m = k.get("borderWidth"),
                        n = k.get("offset"),
                        o = 2 * b.PI,
                        p = this.values,
                        q = this.total,
                        r = n ? 2 * b.PI * (n / 360) : 0;
                    for (h = p.length, g = 0; h > g; g++) {
                        if (e = r, f = r, q > 0 && (f = r + o * (p[g] / q)), a === g) return i = k.get("sliceColors")[g % k.get("sliceColors").length], d && (i = this.calcHighlightColor(i, k)), j.drawPieSlice(l, l, l - m, e, f, c, i);
                        r = f
                    }
                },
                render: function() {
                    var a, d, e = this.target,
                        f = this.values,
                        g = this.options,
                        h = this.radius,
                        i = g.get("borderWidth");
                    if (B._super.render.call(this)) {
                        for (i && e.drawCircle(h, h, b.floor(h - i / 2), g.get("borderColor"), c, i).append(), d = f.length; d--;) f[d] && (a = this.renderSlice(d).append(), this.valueShapes[d] = a.id, this.shapes[a.id] = d);
                        e.render()
                    }
                }
            }), d.fn.sparkline.box = C = f(d.fn.sparkline._base, {
                type: "box",
                init: function(a, b, c, e, f) {
                    C._super.init.call(this, a, b, c, e, f), this.values = d.map(b, Number), this.width = "auto" === c.get("width") ? "4.0em" : e, this.initTarget(), this.values.length || (this.disabled = 1)
                },
                getRegion: function() {
                    return 1
                },
                getCurrentRegionFields: function() {
                    var a = [{
                        field: "lq",
                        value: this.quartiles[0]
                    }, {
                        field: "med",
                        value: this.quartiles[1]
                    }, {
                        field: "uq",
                        value: this.quartiles[2]
                    }];
                    return this.loutlier !== c && a.push({
                        field: "lo",
                        value: this.loutlier
                    }), this.routlier !== c && a.push({
                        field: "ro",
                        value: this.routlier
                    }), this.lwhisker !== c && a.push({
                        field: "lw",
                        value: this.lwhisker
                    }), this.rwhisker !== c && a.push({
                        field: "rw",
                        value: this.rwhisker
                    }), a
                },
                render: function() {
                    var a, d, e, f, g, h, j, k, l, m, n, o = this.target,
                        p = this.values,
                        q = p.length,
                        r = this.options,
                        s = this.canvasWidth,
                        t = this.canvasHeight,
                        u = r.get("chartRangeMin") === c ? b.min.apply(b, p) : r.get("chartRangeMin"),
                        v = r.get("chartRangeMax") === c ? b.max.apply(b, p) : r.get("chartRangeMax"),
                        w = 0;
                    if (C._super.render.call(this)) {
                        if (r.get("raw")) r.get("showOutliers") && p.length > 5 ? (d = p[0], a = p[1], f = p[2], g = p[3], h = p[4], j = p[5], k = p[6]) : (a = p[0], f = p[1], g = p[2], h = p[3], j = p[4]);
                        else if (p.sort(function(a, b) {
                                return a - b
                            }), f = i(p, 1), g = i(p, 2), h = i(p, 3), e = h - f, r.get("showOutliers")) {
                            for (a = j = c, l = 0; q > l; l++) a === c && p[l] > f - e * r.get("outlierIQR") && (a = p[l]), p[l] < h + e * r.get("outlierIQR") && (j = p[l]);
                            d = p[0], k = p[q - 1]
                        } else a = p[0], j = p[q - 1];
                        this.quartiles = [f, g, h], this.lwhisker = a, this.rwhisker = j, this.loutlier = d, this.routlier = k, n = s / (v - u + 1), r.get("showOutliers") && (w = b.ceil(r.get("spotRadius")), s -= 2 * b.ceil(r.get("spotRadius")), n = s / (v - u + 1), a > d && o.drawCircle((d - u) * n + w, t / 2, r.get("spotRadius"), r.get("outlierLineColor"), r.get("outlierFillColor")).append(), k > j && o.drawCircle((k - u) * n + w, t / 2, r.get("spotRadius"), r.get("outlierLineColor"), r.get("outlierFillColor")).append()), o.drawRect(b.round((f - u) * n + w), b.round(.1 * t), b.round((h - f) * n), b.round(.8 * t), r.get("boxLineColor"), r.get("boxFillColor")).append(), o.drawLine(b.round((a - u) * n + w), b.round(t / 2), b.round((f - u) * n + w), b.round(t / 2), r.get("lineColor")).append(), o.drawLine(b.round((a - u) * n + w), b.round(t / 4), b.round((a - u) * n + w), b.round(t - t / 4), r.get("whiskerColor")).append(), o.drawLine(b.round((j - u) * n + w), b.round(t / 2), b.round((h - u) * n + w), b.round(t / 2), r.get("lineColor")).append(), o.drawLine(b.round((j - u) * n + w), b.round(t / 4), b.round((j - u) * n + w), b.round(t - t / 4), r.get("whiskerColor")).append(), o.drawLine(b.round((g - u) * n + w), b.round(.1 * t), b.round((g - u) * n + w), b.round(.9 * t), r.get("medianColor")).append(), r.get("target") && (m = b.ceil(r.get("spotRadius")), o.drawLine(b.round((r.get("target") - u) * n + w), b.round(t / 2 - m), b.round((r.get("target") - u) * n + w), b.round(t / 2 + m), r.get("targetColor")).append(), o.drawLine(b.round((r.get("target") - u) * n + w - m), b.round(t / 2), b.round((r.get("target") - u) * n + w + m), b.round(t / 2), r.get("targetColor")).append()), o.render()
                    }
                }
            }), F = f({
                init: function(a, b, c, d) {
                    this.target = a, this.id = b, this.type = c, this.args = d
                },
                append: function() {
                    return this.target.appendShape(this), this
                }
            }), G = f({
                _pxregex: /(\d+)(px)?\s*$/i,
                init: function(a, b, c) {
                    a && (this.width = a, this.height = b, this.target = c, this.lastShapeId = null, c[0] && (c = c[0]), d.data(c, "_jqs_vcanvas", this))
                },
                drawLine: function(a, b, c, d, e, f) {
                    return this.drawShape([
                        [a, b],
                        [c, d]
                    ], e, f)
                },
                drawShape: function(a, b, c, d) {
                    return this._genShape("Shape", [a, b, c, d])
                },
                drawCircle: function(a, b, c, d, e, f) {
                    return this._genShape("Circle", [a, b, c, d, e, f])
                },
                drawPieSlice: function(a, b, c, d, e, f, g) {
                    return this._genShape("PieSlice", [a, b, c, d, e, f, g])
                },
                drawRect: function(a, b, c, d, e, f) {
                    return this._genShape("Rect", [a, b, c, d, e, f])
                },
                getElement: function() {
                    return this.canvas
                },
                getLastShapeId: function() {
                    return this.lastShapeId
                },
                reset: function() {
                    alert("reset not implemented")
                },
                _insert: function(a, b) {
                    d(b).html(a)
                },
                _calculatePixelDims: function(a, b, c) {
                    var e;
                    e = this._pxregex.exec(b), this.pixelHeight = e ? e[1] : d(c).height(), e = this._pxregex.exec(a), this.pixelWidth = e ? e[1] : d(c).width()
                },
                _genShape: function(a, b) {
                    var c = L++;
                    return b.unshift(c), new F(this, c, a, b)
                },
                appendShape: function() {
                    alert("appendShape not implemented")
                },
                replaceWithShape: function() {
                    alert("replaceWithShape not implemented")
                },
                insertAfterShape: function() {
                    alert("insertAfterShape not implemented")
                },
                removeShapeId: function() {
                    alert("removeShapeId not implemented")
                },
                getShapeAt: function() {
                    alert("getShapeAt not implemented")
                },
                render: function() {
                    alert("render not implemented")
                }
            }), H = f(G, {
                init: function(b, e, f, g) {
                    H._super.init.call(this, b, e, f), this.canvas = a.createElement("canvas"), f[0] && (f = f[0]), d.data(f, "_jqs_vcanvas", this), d(this.canvas).css({
                        display: "inline-block",
                        width: b,
                        height: e,
                        verticalAlign: "top"
                    }), this._insert(this.canvas, f), this._calculatePixelDims(b, e, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = g, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c, d(this.canvas).css({
                        width: this.pixelWidth,
                        height: this.pixelHeight
                    })
                },
                _getContext: function(a, b, d) {
                    var e = this.canvas.getContext("2d");
                    return a !== c && (e.strokeStyle = a), e.lineWidth = d === c ? 1 : d, b !== c && (e.fillStyle = b), e
                },
                reset: function() {
                    var a = this._getContext();
                    a.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c
                },
                _drawShape: function(a, b, d, e, f) {
                    var g, h, i = this._getContext(d, e, f);
                    for (i.beginPath(), i.moveTo(b[0][0] + .5, b[0][1] + .5), g = 1, h = b.length; h > g; g++) i.lineTo(b[g][0] + .5, b[g][1] + .5);
                    d !== c && i.stroke(), e !== c && i.fill(), this.targetX !== c && this.targetY !== c && i.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
                },
                _drawCircle: function(a, d, e, f, g, h, i) {
                    var j = this._getContext(g, h, i);
                    j.beginPath(), j.arc(d, e, f, 0, 2 * b.PI, !1), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a), g !== c && j.stroke(), h !== c && j.fill()
                },
                _drawPieSlice: function(a, b, d, e, f, g, h, i) {
                    var j = this._getContext(h, i);
                    j.beginPath(), j.moveTo(b, d), j.arc(b, d, e, f, g, !1), j.lineTo(b, d), j.closePath(), h !== c && j.stroke(), i && j.fill(), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
                },
                _drawRect: function(a, b, c, d, e, f, g) {
                    return this._drawShape(a, [
                        [b, c],
                        [b + d, c],
                        [b + d, c + e],
                        [b, c + e],
                        [b, c]
                    ], f, g)
                },
                appendShape: function(a) {
                    return this.shapes[a.id] = a, this.shapeseq.push(a.id), this.lastShapeId = a.id, a.id
                },
                replaceWithShape: function(a, b) {
                    var c, d = this.shapeseq;
                    for (this.shapes[b.id] = b, c = d.length; c--;) d[c] == a && (d[c] = b.id);
                    delete this.shapes[a]
                },
                replaceWithShapes: function(a, b) {
                    var c, d, e, f = this.shapeseq,
                        g = {};
                    for (d = a.length; d--;) g[a[d]] = !0;
                    for (d = f.length; d--;) c = f[d], g[c] && (f.splice(d, 1), delete this.shapes[c], e = d);
                    for (d = b.length; d--;) f.splice(e, 0, b[d].id), this.shapes[b[d].id] = b[d]
                },
                insertAfterShape: function(a, b) {
                    var c, d = this.shapeseq;
                    for (c = d.length; c--;)
                        if (d[c] === a) return d.splice(c + 1, 0, b.id), this.shapes[b.id] = b, void 0
                },
                removeShapeId: function(a) {
                    var b, c = this.shapeseq;
                    for (b = c.length; b--;)
                        if (c[b] === a) {
                            c.splice(b, 1);
                            break
                        }
                    delete this.shapes[a]
                },
                getShapeAt: function(a, b, c) {
                    return this.targetX = b, this.targetY = c, this.render(), this.currentTargetShapeId
                },
                render: function() {
                    var a, b, c, d = this.shapeseq,
                        e = this.shapes,
                        f = d.length,
                        g = this._getContext();
                    for (g.clearRect(0, 0, this.pixelWidth, this.pixelHeight), c = 0; f > c; c++) a = d[c], b = e[a], this["_draw" + b.type].apply(this, b.args);
                    this.interact || (this.shapes = {}, this.shapeseq = [])
                }
            }), I = f(G, {
                init: function(b, c, e) {
                    var f;
                    I._super.init.call(this, b, c, e), e[0] && (e = e[0]), d.data(e, "_jqs_vcanvas", this), this.canvas = a.createElement("span"), d(this.canvas).css({
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden",
                        width: b,
                        height: c,
                        margin: "0px",
                        padding: "0px",
                        verticalAlign: "top"
                    }), this._insert(this.canvas, e), this._calculatePixelDims(b, c, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, f = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", f), this.group = d(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
                },
                _drawShape: function(a, b, d, e, f) {
                    var g, h, i, j, k, l, m, n = [];
                    for (m = 0, l = b.length; l > m; m++) n[m] = "" + b[m][0] + "," + b[m][1];
                    return g = n.splice(0, 1), f = f === c ? 1 : f, h = d === c ? ' stroked="false" ' : ' strokeWeight="' + f + 'px" strokeColor="' + d + '" ', i = e === c ? ' filled="false"' : ' fillColor="' + e + '" filled="true" ', j = n[0] === n[n.length - 1] ? "x " : "", k = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + a + '" ' + h + i + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + g + " l " + n.join(", ") + " " + j + 'e">' + " </v:shape>"
                },
                _drawCircle: function(a, b, d, e, f, g, h) {
                    var i, j, k;
                    return b -= e, d -= e, i = f === c ? ' stroked="false" ' : ' strokeWeight="' + h + 'px" strokeColor="' + f + '" ', j = g === c ? ' filled="false"' : ' fillColor="' + g + '" filled="true" ', k = '<v:oval  id="jqsshape' + a + '" ' + i + j + ' style="position:absolute;top:' + d + "px; left:" + b + "px; width:" + 2 * e + "px; height:" + 2 * e + 'px"></v:oval>'
                },
                _drawPieSlice: function(a, d, e, f, g, h, i, j) {
                    var k, l, m, n, o, p, q, r;
                    if (g === h) return "";
                    if (h - g === 2 * b.PI && (g = 0, h = 2 * b.PI), l = d + b.round(b.cos(g) * f), m = e + b.round(b.sin(g) * f), n = d + b.round(b.cos(h) * f), o = e + b.round(b.sin(h) * f), l === n && m === o) {
                        if (h - g < b.PI) return "";
                        l = n = d + f, m = o = e
                    }
                    return l === n && m === o && h - g < b.PI ? "" : (k = [d - f, e - f, d + f, e + f, l, m, n, o], p = i === c ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + i + '" ', q = j === c ? ' filled="false"' : ' fillColor="' + j + '" filled="true" ', r = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + a + '" ' + p + q + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + d + "," + e + " wa " + k.join(", ") + ' x e">' + " </v:shape>")
                },
                _drawRect: function(a, b, c, d, e, f, g) {
                    return this._drawShape(a, [
                        [b, c],
                        [b, c + e],
                        [b + d, c + e],
                        [b + d, c],
                        [b, c]
                    ], f, g)
                },
                reset: function() {
                    this.group.innerHTML = ""
                },
                appendShape: function(a) {
                    var b = this["_draw" + a.type].apply(this, a.args);
                    return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", b) : this.prerender += b, this.lastShapeId = a.id, a.id
                },
                replaceWithShape: function(a, b) {
                    var c = d("#jqsshape" + a),
                        e = this["_draw" + b.type].apply(this, b.args);
                    c[0].outerHTML = e
                },
                replaceWithShapes: function(a, b) {
                    var c, e = d("#jqsshape" + a[0]),
                        f = "",
                        g = b.length;
                    for (c = 0; g > c; c++) f += this["_draw" + b[c].type].apply(this, b[c].args);
                    for (e[0].outerHTML = f, c = 1; c < a.length; c++) d("#jqsshape" + a[c]).remove()
                },
                insertAfterShape: function(a, b) {
                    var c = d("#jqsshape" + a),
                        e = this["_draw" + b.type].apply(this, b.args);
                    c[0].insertAdjacentHTML("afterEnd", e)
                },
                removeShapeId: function(a) {
                    var b = d("#jqsshape" + a);
                    this.group.removeChild(b[0])
                },
                getShapeAt: function(a) {
                    var b = a.id.substr(8);
                    return b
                },
                render: function() {
                    this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
                }
            })
        })
    }(document, Math),
    function() {
        function v(a) {
            function b(b, c, d, e, f, g) {
                for (; f >= 0 && f < g; f += a) {
                    var h = e ? e[f] : f;
                    d = c(d, b[h], h, b)
                }
                return d
            }
            return function(c, d, e, f) {
                d = p(d, f, 4);
                var g = !u(c) && o.keys(c),
                    h = (g || c).length,
                    i = a > 0 ? 0 : h - 1;
                return arguments.length < 3 && (e = c[g ? g[i] : i], i += a), b(c, d, e, g, i, h)
            }
        }

        function y(a) {
            return function(b, c, d) {
                c = q(c, d);
                var e = b != null && b.length,
                    f = a > 0 ? 0 : e - 1;
                for (; f >= 0 && f < e; f += a)
                    if (c(b[f], f, b)) return f;
                return -1
            }
        }

        function C(a, b) {
            var c = B.length,
                e = a.constructor,
                f = o.isFunction(e) && e.prototype || d,
                g = "constructor";
            o.has(a, g) && !o.contains(b, g) && b.push(g);
            while (c--) g = B[c], g in a && a[g] !== f[g] && !o.contains(b, g) && b.push(g)
        }
        var a = this,
            b = a._,
            c = Array.prototype,
            d = Object.prototype,
            e = Function.prototype,
            f = c.push,
            g = c.slice,
            h = d.toString,
            i = d.hasOwnProperty,
            j = Array.isArray,
            k = Object.keys,
            l = e.bind,
            m = Object.create,
            n = function() {},
            o = function(a) {
                if (a instanceof o) return a;
                if (!(this instanceof o)) return new o(a);
                this._wrapped = a
            };
        typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = o), exports._ = o) : a._ = o, o.VERSION = "1.8.2";
        var p = function(a, b, c) {
                if (b === void 0) return a;
                switch (c == null ? 3 : c) {
                    case 1:
                        return function(c) {
                            return a.call(b, c)
                        };
                    case 2:
                        return function(c, d) {
                            return a.call(b, c, d)
                        };
                    case 3:
                        return function(c, d, e) {
                            return a.call(b, c, d, e)
                        };
                    case 4:
                        return function(c, d, e, f) {
                            return a.call(b, c, d, e, f)
                        }
                }
                return function() {
                    return a.apply(b, arguments)
                }
            },
            q = function(a, b, c) {
                return a == null ? o.identity : o.isFunction(a) ? p(a, b, c) : o.isObject(a) ? o.matcher(a) : o.property(a)
            };
        o.iteratee = function(a, b) {
            return q(a, b, Infinity)
        };
        var r = function(a, b) {
                return function(c) {
                    var d = arguments.length;
                    if (d < 2 || c == null) return c;
                    for (var e = 1; e < d; e++) {
                        var f = arguments[e],
                            g = a(f),
                            h = g.length;
                        for (var i = 0; i < h; i++) {
                            var j = g[i];
                            if (!b || c[j] === void 0) c[j] = f[j]
                        }
                    }
                    return c
                }
            },
            s = function(a) {
                if (!o.isObject(a)) return {};
                if (m) return m(a);
                n.prototype = a;
                var b = new n;
                return n.prototype = null, b
            },
            t = Math.pow(2, 53) - 1,
            u = function(a) {
                var b = a && a.length;
                return typeof b == "number" && b >= 0 && b <= t
            };
        o.each = o.forEach = function(a, b, c) {
            b = p(b, c);
            var d, e;
            if (u(a))
                for (d = 0, e = a.length; d < e; d++) b(a[d], d, a);
            else {
                var f = o.keys(a);
                for (d = 0, e = f.length; d < e; d++) b(a[f[d]], f[d], a)
            }
            return a
        }, o.map = o.collect = function(a, b, c) {
            b = q(b, c);
            var d = !u(a) && o.keys(a),
                e = (d || a).length,
                f = Array(e);
            for (var g = 0; g < e; g++) {
                var h = d ? d[g] : g;
                f[g] = b(a[h], h, a)
            }
            return f
        }, o.reduce = o.foldl = o.inject = v(1), o.reduceRight = o.foldr = v(-1), o.find = o.detect = function(a, b, c) {
            var d;
            u(a) ? d = o.findIndex(a, b, c) : d = o.findKey(a, b, c);
            if (d !== void 0 && d !== -1) return a[d]
        }, o.filter = o.select = function(a, b, c) {
            var d = [];
            return b = q(b, c), o.each(a, function(a, c, e) {
                b(a, c, e) && d.push(a)
            }), d
        }, o.reject = function(a, b, c) {
            return o.filter(a, o.negate(q(b)), c)
        }, o.every = o.all = function(a, b, c) {
            b = q(b, c);
            var d = !u(a) && o.keys(a),
                e = (d || a).length;
            for (var f = 0; f < e; f++) {
                var g = d ? d[f] : f;
                if (!b(a[g], g, a)) return !1
            }
            return !0
        }, o.some = o.any = function(a, b, c) {
            b = q(b, c);
            var d = !u(a) && o.keys(a),
                e = (d || a).length;
            for (var f = 0; f < e; f++) {
                var g = d ? d[f] : f;
                if (b(a[g], g, a)) return !0
            }
            return !1
        }, o.contains = o.includes = o.include = function(a, b, c) {
            return u(a) || (a = o.values(a)), o.indexOf(a, b, typeof c == "number" && c) >= 0
        }, o.invoke = function(a, b) {
            var c = g.call(arguments, 2),
                d = o.isFunction(b);
            return o.map(a, function(a) {
                var e = d ? b : a[b];
                return e == null ? e : e.apply(a, c)
            })
        }, o.pluck = function(a, b) {
            return o.map(a, o.property(b))
        }, o.where = function(a, b) {
            return o.filter(a, o.matcher(b))
        }, o.findWhere = function(a, b) {
            return o.find(a, o.matcher(b))
        }, o.max = function(a, b, c) {
            var d = -Infinity,
                e = -Infinity,
                f, g;
            if (b == null && a != null) {
                a = u(a) ? a : o.values(a);
                for (var h = 0, i = a.length; h < i; h++) f = a[h], f > d && (d = f)
            } else b = q(b, c), o.each(a, function(a, c, f) {
                g = b(a, c, f);
                if (g > e || g === -Infinity && d === -Infinity) d = a, e = g
            });
            return d
        }, o.min = function(a, b, c) {
            var d = Infinity,
                e = Infinity,
                f, g;
            if (b == null && a != null) {
                a = u(a) ? a : o.values(a);
                for (var h = 0, i = a.length; h < i; h++) f = a[h], f < d && (d = f)
            } else b = q(b, c), o.each(a, function(a, c, f) {
                g = b(a, c, f);
                if (g < e || g === Infinity && d === Infinity) d = a, e = g
            });
            return d
        }, o.shuffle = function(a) {
            var b = u(a) ? a : o.values(a),
                c = b.length,
                d = Array(c);
            for (var e = 0, f; e < c; e++) f = o.random(0, e), f !== e && (d[e] = d[f]), d[f] = b[e];
            return d
        }, o.sample = function(a, b, c) {
            return b == null || c ? (u(a) || (a = o.values(a)), a[o.random(a.length - 1)]) : o.shuffle(a).slice(0, Math.max(0, b))
        }, o.sortBy = function(a, b, c) {
            return b = q(b, c), o.pluck(o.map(a, function(a, c, d) {
                return {
                    value: a,
                    index: c,
                    criteria: b(a, c, d)
                }
            }).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                if (c !== d) {
                    if (c > d || c === void 0) return 1;
                    if (c < d || d === void 0) return -1
                }
                return a.index - b.index
            }), "value")
        };
        var w = function(a) {
            return function(b, c, d) {
                var e = {};
                return c = q(c, d), o.each(b, function(d, f) {
                    var g = c(d, f, b);
                    a(e, d, g)
                }), e
            }
        };
        o.groupBy = w(function(a, b, c) {
            o.has(a, c) ? a[c].push(b) : a[c] = [b]
        }), o.indexBy = w(function(a, b, c) {
            a[c] = b
        }), o.countBy = w(function(a, b, c) {
            o.has(a, c) ? a[c]++ : a[c] = 1
        }), o.toArray = function(a) {
            return a ? o.isArray(a) ? g.call(a) : u(a) ? o.map(a, o.identity) : o.values(a) : []
        }, o.size = function(a) {
            return a == null ? 0 : u(a) ? a.length : o.keys(a).length
        }, o.partition = function(a, b, c) {
            b = q(b, c);
            var d = [],
                e = [];
            return o.each(a, function(a, c, f) {
                (b(a, c, f) ? d : e).push(a)
            }), [d, e]
        }, o.first = o.head = o.take = function(a, b, c) {
            return a == null ? void 0 : b == null || c ? a[0] : o.initial(a, a.length - b)
        }, o.initial = function(a, b, c) {
            return g.call(a, 0, Math.max(0, a.length - (b == null || c ? 1 : b)))
        }, o.last = function(a, b, c) {
            return a == null ? void 0 : b == null || c ? a[a.length - 1] : o.rest(a, Math.max(0, a.length - b))
        }, o.rest = o.tail = o.drop = function(a, b, c) {
            return g.call(a, b == null || c ? 1 : b)
        }, o.compact = function(a) {
            return o.filter(a, o.identity)
        };
        var x = function(a, b, c, d) {
            var e = [],
                f = 0;
            for (var g = d || 0, h = a && a.length; g < h; g++) {
                var i = a[g];
                if (u(i) && (o.isArray(i) || o.isArguments(i))) {
                    b || (i = x(i, b, c));
                    var j = 0,
                        k = i.length;
                    e.length += k;
                    while (j < k) e[f++] = i[j++]
                } else c || (e[f++] = i)
            }
            return e
        };
        o.flatten = function(a, b) {
            return x(a, b, !1)
        }, o.without = function(a) {
            return o.difference(a, g.call(arguments, 1))
        }, o.uniq = o.unique = function(a, b, c, d) {
            if (a == null) return [];
            o.isBoolean(b) || (d = c, c = b, b = !1), c != null && (c = q(c, d));
            var e = [],
                f = [];
            for (var g = 0, h = a.length; g < h; g++) {
                var i = a[g],
                    j = c ? c(i, g, a) : i;
                b ? ((!g || f !== j) && e.push(i), f = j) : c ? o.contains(f, j) || (f.push(j), e.push(i)) : o.contains(e, i) || e.push(i)
            }
            return e
        }, o.union = function() {
            return o.uniq(x(arguments, !0, !0))
        }, o.intersection = function(a) {
            if (a == null) return [];
            var b = [],
                c = arguments.length;
            for (var d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                if (o.contains(b, f)) continue;
                for (var g = 1; g < c; g++)
                    if (!o.contains(arguments[g], f)) break;
                g === c && b.push(f)
            }
            return b
        }, o.difference = function(a) {
            var b = x(arguments, !0, !0, 1);
            return o.filter(a, function(a) {
                return !o.contains(b, a)
            })
        }, o.zip = function() {
            return o.unzip(arguments)
        }, o.unzip = function(a) {
            var b = a && o.max(a, "length").length || 0,
                c = Array(b);
            for (var d = 0; d < b; d++) c[d] = o.pluck(a, d);
            return c
        }, o.object = function(a, b) {
            var c = {};
            for (var d = 0, e = a && a.length; d < e; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c
        }, o.indexOf = function(a, b, c) {
            var d = 0,
                e = a && a.length;
            if (typeof c == "number") d = c < 0 ? Math.max(0, e + c) : c;
            else if (c && e) return d = o.sortedIndex(a, b), a[d] === b ? d : -1;
            if (b !== b) return o.findIndex(g.call(a, d), o.isNaN);
            for (; d < e; d++)
                if (a[d] === b) return d;
            return -1
        }, o.lastIndexOf = function(a, b, c) {
            var d = a ? a.length : 0;
            typeof c == "number" && (d = c < 0 ? d + c + 1 : Math.min(d, c + 1));
            if (b !== b) return o.findLastIndex(g.call(a, 0, d), o.isNaN);
            while (--d >= 0)
                if (a[d] === b) return d;
            return -1
        }, o.findIndex = y(1), o.findLastIndex = y(-1), o.sortedIndex = function(a, b, c, d) {
            c = q(c, d, 1);
            var e = c(b),
                f = 0,
                g = a.length;
            while (f < g) {
                var h = Math.floor((f + g) / 2);
                c(a[h]) < e ? f = h + 1 : g = h
            }
            return f
        }, o.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = c || 1;
            var d = Math.max(Math.ceil((b - a) / c), 0),
                e = Array(d);
            for (var f = 0; f < d; f++, a += c) e[f] = a;
            return e
        };
        var z = function(a, b, c, d, e) {
            if (d instanceof b) {
                var f = s(a.prototype),
                    g = a.apply(f, e);
                return o.isObject(g) ? g : f
            }
            return a.apply(c, e)
        };
        o.bind = function(a, b) {
            if (l && a.bind === l) return l.apply(a, g.call(arguments, 1));
            if (!o.isFunction(a)) throw new TypeError("Bind must be called on a function");
            var c = g.call(arguments, 2),
                d = function() {
                    return z(a, d, b, this, c.concat(g.call(arguments)))
                };
            return d
        }, o.partial = function(a) {
            var b = g.call(arguments, 1),
                c = function() {
                    var d = 0,
                        e = b.length,
                        f = Array(e);
                    for (var g = 0; g < e; g++) f[g] = b[g] === o ? arguments[d++] : b[g];
                    while (d < arguments.length) f.push(arguments[d++]);
                    return z(a, c, this, this, f)
                };
            return c
        }, o.bindAll = function(a) {
            var b, c = arguments.length,
                d;
            if (c <= 1) throw new Error("bindAll must be passed function names");
            for (b = 1; b < c; b++) d = arguments[b], a[d] = o.bind(a[d], a);
            return a
        }, o.memoize = function(a, b) {
            var c = function(d) {
                var e = c.cache,
                    f = "" + (b ? b.apply(this, arguments) : d);
                return o.has(e, f) || (e[f] = a.apply(this, arguments)), e[f]
            };
            return c.cache = {}, c
        }, o.delay = function(a, b) {
            var c = g.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c)
            }, b)
        }, o.defer = o.partial(o.delay, o, 1), o.throttle = function(a, b, c) {
            var d, e, f, g = null,
                h = 0;
            c || (c = {});
            var i = function() {
                h = c.leading === !1 ? 0 : o.now(), g = null, f = a.apply(d, e), g || (d = e = null)
            };
            return function() {
                var j = o.now();
                !h && c.leading === !1 && (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, k <= 0 || k > b ? (g && (clearTimeout(g), g = null), h = j, f = a.apply(d, e), g || (d = e = null)) : !g && c.trailing !== !1 && (g = setTimeout(i, k)), f
            }
        }, o.debounce = function(a, b, c) {
            var d, e, f, g, h, i = function() {
                var j = o.now() - g;
                j < b && j >= 0 ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), d || (f = e = null)))
            };
            return function() {
                f = this, e = arguments, g = o.now();
                var j = c && !d;
                return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h
            }
        }, o.wrap = function(a, b) {
            return o.partial(b, a)
        }, o.negate = function(a) {
            return function() {
                return !a.apply(this, arguments)
            }
        }, o.compose = function() {
            var a = arguments,
                b = a.length - 1;
            return function() {
                var c = b,
                    d = a[b].apply(this, arguments);
                while (c--) d = a[c].call(this, d);
                return d
            }
        }, o.after = function(a, b) {
            return function() {
                if (--a < 1) return b.apply(this, arguments)
            }
        }, o.before = function(a, b) {
            var c;
            return function() {
                return --a > 0 && (c = b.apply(this, arguments)), a <= 1 && (b = null), c
            }
        }, o.once = o.partial(o.before, 2);
        var A = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            B = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        o.keys = function(a) {
            if (!o.isObject(a)) return [];
            if (k) return k(a);
            var b = [];
            for (var c in a) o.has(a, c) && b.push(c);
            return A && C(a, b), b
        }, o.allKeys = function(a) {
            if (!o.isObject(a)) return [];
            var b = [];
            for (var c in a) b.push(c);
            return A && C(a, b), b
        }, o.values = function(a) {
            var b = o.keys(a),
                c = b.length,
                d = Array(c);
            for (var e = 0; e < c; e++) d[e] = a[b[e]];
            return d
        }, o.mapObject = function(a, b, c) {
            b = q(b, c);
            var d = o.keys(a),
                e = d.length,
                f = {},
                g;
            for (var h = 0; h < e; h++) g = d[h], f[g] = b(a[g], g, a);
            return f
        }, o.pairs = function(a) {
            var b = o.keys(a),
                c = b.length,
                d = Array(c);
            for (var e = 0; e < c; e++) d[e] = [b[e], a[b[e]]];
            return d
        }, o.invert = function(a) {
            var b = {},
                c = o.keys(a);
            for (var d = 0, e = c.length; d < e; d++) b[a[c[d]]] = c[d];
            return b
        }, o.functions = o.methods = function(a) {
            var b = [];
            for (var c in a) o.isFunction(a[c]) && b.push(c);
            return b.sort()
        }, o.extend = r(o.allKeys), o.extendOwn = o.assign = r(o.keys), o.findKey = function(a, b, c) {
            b = q(b, c);
            var d = o.keys(a),
                e;
            for (var f = 0, g = d.length; f < g; f++) {
                e = d[f];
                if (b(a[e], e, a)) return e
            }
        }, o.pick = function(a, b, c) {
            var d = {},
                e = a,
                f, g;
            if (e == null) return d;
            o.isFunction(b) ? (g = o.allKeys(e), f = p(b, c)) : (g = x(arguments, !1, !1, 1), f = function(a, b, c) {
                return b in c
            }, e = Object(e));
            for (var h = 0, i = g.length; h < i; h++) {
                var j = g[h],
                    k = e[j];
                f(k, j, e) && (d[j] = k)
            }
            return d
        }, o.omit = function(a, b, c) {
            if (o.isFunction(b)) b = o.negate(b);
            else {
                var d = o.map(x(arguments, !1, !1, 1), String);
                b = function(a, b) {
                    return !o.contains(d, b)
                }
            }
            return o.pick(a, b, c)
        }, o.defaults = r(o.allKeys, !0), o.clone = function(a) {
            return o.isObject(a) ? o.isArray(a) ? a.slice() : o.extend({}, a) : a
        }, o.tap = function(a, b) {
            return b(a), a
        }, o.isMatch = function(a, b) {
            var c = o.keys(b),
                d = c.length;
            if (a == null) return !d;
            var e = Object(a);
            for (var f = 0; f < d; f++) {
                var g = c[f];
                if (b[g] !== e[g] || !(g in e)) return !1
            }
            return !0
        };
        var D = function(a, b, c, d) {
            if (a === b) return a !== 0 || 1 / a === 1 / b;
            if (a == null || b == null) return a === b;
            a instanceof o && (a = a._wrapped), b instanceof o && (b = b._wrapped);
            var e = h.call(a);
            if (e !== h.call(b)) return !1;
            switch (e) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    if (+a !== +a) return +b !== +b;
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a === +b
            }
            var f = e === "[object Array]";
            if (!f) {
                if (typeof a != "object" || typeof b != "object") return !1;
                var g = a.constructor,
                    i = b.constructor;
                if (g !== i && !(o.isFunction(g) && g instanceof g && o.isFunction(i) && i instanceof i) && "constructor" in a && "constructor" in b) return !1
            }
            c = c || [], d = d || [];
            var j = c.length;
            while (j--)
                if (c[j] === a) return d[j] === b;
            c.push(a), d.push(b);
            if (f) {
                j = a.length;
                if (j !== b.length) return !1;
                while (j--)
                    if (!D(a[j], b[j], c, d)) return !1
            } else {
                var k = o.keys(a),
                    l;
                j = k.length;
                if (o.keys(b).length !== j) return !1;
                while (j--) {
                    l = k[j];
                    if (!o.has(b, l) || !D(a[l], b[l], c, d)) return !1
                }
            }
            return c.pop(), d.pop(), !0
        };
        o.isEqual = function(a, b) {
            return D(a, b)
        }, o.isEmpty = function(a) {
            return a == null ? !0 : u(a) && (o.isArray(a) || o.isString(a) || o.isArguments(a)) ? a.length === 0 : o.keys(a).length === 0
        }, o.isElement = function(a) {
            return !!a && a.nodeType === 1
        }, o.isArray = j || function(a) {
            return h.call(a) === "[object Array]"
        }, o.isObject = function(a) {
            var b = typeof a;
            return b === "function" || b === "object" && !!a
        }, o.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(a) {
            o["is" + a] = function(b) {
                return h.call(b) === "[object " + a + "]"
            }
        }), o.isArguments(arguments) || (o.isArguments = function(a) {
            return o.has(a, "callee")
        }), typeof /./ != "function" && typeof Int8Array != "object" && (o.isFunction = function(a) {
            return typeof a == "function" || !1
        }), o.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        }, o.isNaN = function(a) {
            return o.isNumber(a) && a !== +a
        }, o.isBoolean = function(a) {
            return a === !0 || a === !1 || h.call(a) === "[object Boolean]"
        }, o.isNull = function(a) {
            return a === null
        }, o.isUndefined = function(a) {
            return a === void 0
        }, o.has = function(a, b) {
            return a != null && i.call(a, b)
        }, o.noConflict = function() {
            return a._ = b, this
        }, o.identity = function(a) {
            return a
        }, o.constant = function(a) {
            return function() {
                return a
            }
        }, o.noop = function() {}, o.property = function(a) {
            return function(b) {
                return b == null ? void 0 : b[a]
            }
        }, o.propertyOf = function(a) {
            return a == null ? function() {} : function(b) {
                return a[b]
            }
        }, o.matcher = o.matches = function(a) {
            return a = o.extendOwn({}, a),
                function(b) {
                    return o.isMatch(b, a)
                }
        }, o.times = function(a, b, c) {
            var d = Array(Math.max(0, a));
            b = p(b, c, 1);
            for (var e = 0; e < a; e++) d[e] = b(e);
            return d
        }, o.random = function(a, b) {
            return b == null && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
        }, o.now = Date.now || function() {
            return (new Date).getTime()
        };
        var E = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            F = o.invert(E),
            G = function(a) {
                var b = function(b) {
                        return a[b]
                    },
                    c = "(?:" + o.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return function(a) {
                    return a = a == null ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
                }
            };
        o.escape = G(E), o.unescape = G(F), o.result = function(a, b, c) {
            var d = a == null ? void 0 : a[b];
            return d === void 0 && (d = c), o.isFunction(d) ? d.call(a) : d
        };
        var H = 0;
        o.uniqueId = function(a) {
            var b = ++H + "";
            return a ? a + b : b
        }, o.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var I = /(.)^/,
            J = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            K = /\\|'|\r|\n|\u2028|\u2029/g,
            L = function(a) {
                return "\\" + J[a]
            };
        o.template = function(a, b, c) {
            !b && c && (b = c), b = o.defaults({}, b, o.templateSettings);
            var d = RegExp([(b.escape || I).source, (b.interpolate || I).source, (b.evaluate || I).source].join("|") + "|$", "g"),
                e = 0,
                f = "__p+='";
            a.replace(d, function(b, c, d, g, h) {
                return f += a.slice(e, h).replace(K, L), e = h + b.length, c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='"), b
            }), f += "';\n", b.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                var g = new Function(b.variable || "obj", "_", f)
            } catch (h) {
                throw h.source = f, h
            }
            var i = function(a) {
                    return g.call(this, a, o)
                },
                j = b.variable || "obj";
            return i.source = "function(" + j + "){\n" + f + "}", i
        }, o.chain = function(a) {
            var b = o(a);
            return b._chain = !0, b
        };
        var M = function(a, b) {
            return a._chain ? o(b).chain() : b
        };
        o.mixin = function(a) {
            o.each(o.functions(a), function(b) {
                var c = o[b] = a[b];
                o.prototype[b] = function() {
                    var a = [this._wrapped];
                    return f.apply(a, arguments), M(this, c.apply(o, a))
                }
            })
        }, o.mixin(o), o.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
            var b = c[a];
            o.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments), (a === "shift" || a === "splice") && c.length === 0 && delete c[0], M(this, c)
            }
        }), o.each(["concat", "join", "slice"], function(a) {
            var b = c[a];
            o.prototype[a] = function() {
                return M(this, b.apply(this._wrapped, arguments))
            }
        }), o.prototype.value = function() {
            return this._wrapped
        }, o.prototype.valueOf = o.prototype.toJSON = o.prototype.value, o.prototype.toString = function() {
            return "" + this._wrapped
        }, typeof define == "function" && define.amd && define("underscore", [], function() {
            return o
        })
    }.call(this);
var LZString = {
    _f: String.fromCharCode,
    _keyStrBase64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _keyStrUriSafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
    _getBaseValue: function(a, b) {
        LZString._baseReverseDic || (LZString._baseReverseDic = {});
        if (!LZString._baseReverseDic[a]) {
            LZString._baseReverseDic[a] = {};
            for (var c = 0; c < a.length; c++) LZString._baseReverseDic[a][a[c]] = c
        }
        return LZString._baseReverseDic[a][b]
    },
    compressToBase64: function(a) {
        if (a == null) return "";
        var b = LZString._compress(a, 6, function(a) {
            return LZString._keyStrBase64.charAt(a)
        });
        switch (b.length % 4) {
            default:
                case 0:
                return b;
            case 1:
                    return b + "===";
            case 2:
                    return b + "==";
            case 3:
                    return b + "="
        }
    },
    decompressFromBase64: function(a) {
        return a == null ? "" : a == "" ? null : LZString._decompress(a.length, 32, function(b) {
            return LZString._getBaseValue(LZString._keyStrBase64, a.charAt(b))
        })
    },
    compressToUTF16: function(a) {
        return a == null ? "" : LZString._compress(a, 15, function(a) {
            return String.fromCharCode(a + 32)
        }) + " "
    },
    decompressFromUTF16: function(a) {
        return a == null ? "" : a == "" ? null : LZString._decompress(a.length, 16384, function(b) {
            return a.charCodeAt(b) - 32
        })
    },
    compressToUint8Array: function(a) {
        var b = LZString.compress(a),
            c = new Uint8Array(b.length * 2);
        for (var d = 0, e = b.length; d < e; d++) {
            var f = b.charCodeAt(d);
            c[d * 2] = f >>> 8, c[d * 2 + 1] = f % 256
        }
        return c
    },
    decompressFromUint8Array: function(a) {
        if (a === null || a === undefined) return LZString.decompress(a);
        var b = new Array(a.length / 2);
        for (var c = 0, d = b.length; c < d; c++) b[c] = a[c * 2] * 256 + a[c * 2 + 1];
        var e = [];
        return b.forEach(function(a) {
            e.push(String.fromCharCode(a))
        }), LZString.decompress(e.join(""))
    },
    compressToEncodedURIComponent: function(a) {
        return a == null ? "" : LZString._compress(a, 6, function(a) {
            return LZString._keyStrUriSafe.charAt(a)
        })
    },
    decompressFromEncodedURIComponent: function(a) {
        return a == null ? "" : a == "" ? null : LZString._decompress(a.length, 32, function(b) {
            return LZString._getBaseValue(LZString._keyStrUriSafe, a.charAt(b))
        })
    },
    compress: function(a) {
        return LZString._compress(a, 16, function(a) {
            return String.fromCharCode(a)
        })
    },
    _compress: function(a, b, c) {
        if (a == null) return "";
        var d, e, f = {},
            g = {},
            h = "",
            i = "",
            j = "",
            k = 2,
            l = 3,
            m = 2,
            n = [],
            o = 0,
            p = 0,
            q, r = LZString._f;
        for (q = 0; q < a.length; q += 1) {
            h = a[q], Object.prototype.hasOwnProperty.call(f, h) || (f[h] = l++, g[h] = !0), i = j + h;
            if (Object.prototype.hasOwnProperty.call(f, i)) j = i;
            else {
                if (Object.prototype.hasOwnProperty.call(g, j)) {
                    if (j.charCodeAt(0) < 256) {
                        for (d = 0; d < m; d++) o <<= 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++;
                        e = j.charCodeAt(0);
                        for (d = 0; d < 8; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
                    } else {
                        e = 1;
                        for (d = 0; d < m; d++) o = o << 1 | e, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e = 0;
                        e = j.charCodeAt(0);
                        for (d = 0; d < 16; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
                    }
                    k--, k == 0 && (k = Math.pow(2, m), m++), delete g[j]
                } else {
                    e = f[j];
                    for (d = 0; d < m; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
                }
                k--, k == 0 && (k = Math.pow(2, m), m++), f[i] = l++, j = String(h)
            }
        }
        if (j !== "") {
            if (Object.prototype.hasOwnProperty.call(g, j)) {
                if (j.charCodeAt(0) < 256) {
                    for (d = 0; d < m; d++) o <<= 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++;
                    e = j.charCodeAt(0);
                    for (d = 0; d < 8; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
                } else {
                    e = 1;
                    for (d = 0; d < m; d++) o = o << 1 | e, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e = 0;
                    e = j.charCodeAt(0);
                    for (d = 0; d < 16; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
                }
                k--, k == 0 && (k = Math.pow(2, m), m++), delete g[j]
            } else {
                e = f[j];
                for (d = 0; d < m; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1
            }
            k--, k == 0 && (k = Math.pow(2, m), m++)
        }
        e = 2;
        for (d = 0; d < m; d++) o = o << 1 | e & 1, p == b - 1 ? (p = 0, n.push(c(o)), o = 0) : p++, e >>= 1;
        for (;;) {
            o <<= 1;
            if (p == b - 1) {
                n.push(c(o));
                break
            }
            p++
        }
        return n.join("")
    },
    decompress: function(a) {
        return a == null ? "" : a == "" ? null : LZString._decompress(a.length, 32768, function(b) {
            return a.charCodeAt(b)
        })
    },
    _decompress: function(a, b, c) {
        var d = [],
            e, f = 4,
            g = 4,
            h = 3,
            i = "",
            j = [],
            k, l, m, n, o, p, q, r = LZString._f,
            s = {
                val: c(0),
                position: b,
                index: 1
            };
        for (k = 0; k < 3; k += 1) d[k] = k;
        m = 0, o = Math.pow(2, 2), p = 1;
        while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
        switch (e = m) {
            case 0:
                m = 0, o = Math.pow(2, 8), p = 1;
                while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
                q = r(m);
                break;
            case 1:
                m = 0, o = Math.pow(2, 16), p = 1;
                while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
                q = r(m);
                break;
            case 2:
                return ""
        }
        d[3] = q, l = q, j.push(q);
        for (;;) {
            if (s.index > a) return "";
            m = 0, o = Math.pow(2, h), p = 1;
            while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
            switch (q = m) {
                case 0:
                    m = 0, o = Math.pow(2, 8), p = 1;
                    while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
                    d[g++] = r(m), q = g - 1, f--;
                    break;
                case 1:
                    m = 0, o = Math.pow(2, 16), p = 1;
                    while (p != o) n = s.val & s.position, s.position >>= 1, s.position == 0 && (s.position = b, s.val = c(s.index++)), m |= (n > 0 ? 1 : 0) * p, p <<= 1;
                    d[g++] = r(m), q = g - 1, f--;
                    break;
                case 2:
                    return j.join("")
            }
            f == 0 && (f = Math.pow(2, h), h++);
            if (d[q]) i = d[q];
            else {
                if (q !== g) return null;
                i = l + l[0]
            }
            j.push(i), d[g++] = l + i[0], f--, l = i, f == 0 && (f = Math.pow(2, h), h++)
        }
    }
};
typeof module != "undefined" && module != null && (module.exports = LZString),
    function() {
        var a, b, c = [].slice;
        a = {
            afterPageLoad: !0,
            onlyOnce: !1
        }, b = this, window.We = {
            abilities: {},
            accomplishments: {},
            can: function(b, c, d) {
                var e;
                return d == null && (d = {}), e = _.defaults({}, d, a), this.abilities[b] = {
                    func: c,
                    opts: e
                }
            },
            should: function() {
                var a, d, e, f, g, h = this;
                d = arguments[0], e = arguments[1], f = 3 <= arguments.length ? c.call(arguments, 2) : [], a = this.abilities[d];
                if (!a.opts.onlyOnce || !this.accomplishments.hasOwnProperty(d)) this.accomplishments[d] = !0, g = function() {
                    return h.abilities[d].func.apply(e || b, f)
                }, a.opts.afterPageLoad ? $(g) : g();
                return !0
            }
        }
    }.call(this), window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var a = window.styleMedia || window.media;
        if (!a) {
            var b = document.createElement("style"),
                c = document.getElementsByTagName("script")[0],
                d = null;
            b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
                matchMedium: function(a) {
                    var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                    return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, d.width === "1px"
                }
            }
        }
        return function(b) {
            return {
                matches: a.matchMedium(b || "all"),
                media: b || "all"
            }
        }
    }()),
    function(a, b, c) {
        function e(a) {
            var b, c, e, f, g, h = a || {};
            b = h.elements || d.getAllElements();
            for (var i = 0, j = b.length; i < j; i++) {
                c = b[i], e = c.parentNode, f = undefined, g = undefined;
                if (c.nodeName.toUpperCase() !== "IMG") continue;
                c[d.ns] || (c[d.ns] = {});
                if (!h.reevaluate && c[d.ns].evaluated) continue;
                if (e.nodeName.toUpperCase() === "PICTURE") {
                    d.removeVideoShim(e), f = d.getMatch(c, e);
                    if (f === !1) continue
                } else f = undefined;
                (e.nodeName.toUpperCase() === "PICTURE" || c.srcset && !d.srcsetSupported || !d.sizesSupported && c.srcset && c.srcset.indexOf("w") > -1) && d.dodgeSrcset(c), f ? (g = d.processSourceSet(f), d.applyBestCandidate(g, c)) : (g = d.processSourceSet(c), (c.srcset === undefined || c[d.ns].srcset) && d.applyBestCandidate(g, c)), c[d.ns].evaluated = !0
            }
        }

        function f() {
            function d() {
                var b;
                a._picturefillWorking || (a._picturefillWorking = !0, a.clearTimeout(b), b = a.setTimeout(function() {
                    e({
                        reevaluate: !0
                    }), a._picturefillWorking = !1
                }, 60))
            }
            e();
            var c = setInterval(function() {
                e();
                if (/^loaded|^i|^c/.test(b.readyState)) {
                    clearInterval(c);
                    return
                }
            }, 250);
            a.addEventListener ? a.addEventListener("resize", d, !1) : a.attachEvent && a.attachEvent("onresize", d)
        }
        "use strict";
        if (a.HTMLPictureElement) {
            a.picturefill = function() {};
            return
        }
        b.createElement("picture");
        var d = {};
        d.ns = "picturefill",
            function() {
                d.srcsetSupported = "srcset" in c, d.sizesSupported = "sizes" in c
            }(), d.trim = function(a) {
                return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
            }, d.endsWith = function(a, b) {
                return a.endsWith ? a.endsWith(b) : a.indexOf(b, a.length - b.length) !== -1
            }, d.restrictsMixedContent = function() {
                return a.location.protocol === "https:"
            }, d.matchesMedia = function(b) {
                return a.matchMedia && a.matchMedia(b).matches
            }, d.getDpr = function() {
                return a.devicePixelRatio || 1
            }, d.getWidthFromLength = function(a) {
                a = a && a.indexOf("%") > -1 == 0 && (parseFloat(a) > 0 || a.indexOf("calc(") > -1) ? a : "100vw", a = a.replace("vw", "%"), d.lengthEl || (d.lengthEl = b.createElement("div"), d.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden"), d.lengthEl.style.width = a, b.body.appendChild(d.lengthEl), d.lengthEl.className = "helper-from-picturefill-js", d.lengthEl.offsetWidth <= 0 && (d.lengthEl.style.width = b.documentElement.offsetWidth + "px");
                var c = d.lengthEl.offsetWidth;
                return b.body.removeChild(d.lengthEl), c
            }, d.types = {}, d.types["image/jpeg"] = !0, d.types["image/gif"] = !0, d.types["image/png"] = !0, d.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), d.types["image/webp"] = function() {
                var a = "image/webp";
                c.onerror = function() {
                    d.types[a] = !1, e()
                }, c.onload = function() {
                    d.types[a] = c.width === 1, e()
                }, c.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
            }, d.verifyTypeSupport = function(a) {
                var b = a.getAttribute("type");
                return b === null || b === "" ? !0 : typeof d.types[b] == "function" ? (d.types[b](), "pending") : d.types[b]
            }, d.parseSize = function(a) {
                var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
                return {
                    media: b && b[1],
                    length: b && b[2]
                }
            }, d.findWidthFromSourceSize = function(a) {
                var b = d.trim(a).split(/\s*,\s*/),
                    c;
                for (var e = 0, f = b.length; e < f; e++) {
                    var g = b[e],
                        h = d.parseSize(g),
                        i = h.length,
                        j = h.media;
                    if (!i) continue;
                    if (!j || d.matchesMedia(j)) {
                        c = i;
                        break
                    }
                }
                return d.getWidthFromLength(c)
            }, d.parseSrcset = function(a) {
                var b = [];
                while (a !== "") {
                    a = a.replace(/^\s+/g, "");
                    var c = a.search(/\s/g),
                        d, e = null;
                    if (c !== -1) {
                        d = a.slice(0, c);
                        var f = d.slice(-1);
                        if (f === "," || d === "") d = d.replace(/,+$/, ""), e = "";
                        a = a.slice(c + 1);
                        if (e === null) {
                            var g = a.indexOf(",");
                            g !== -1 ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "")
                        }
                    } else d = a, a = "";
                    (d || e) && b.push({
                        url: d,
                        descriptor: e
                    })
                }
                return b
            }, d.parseDescriptor = function(a, b) {
                var c = b || "100vw",
                    e = a && a.replace(/(^\s+|\s+$)/g, ""),
                    f = d.findWidthFromSourceSize(c),
                    g;
                if (e) {
                    var h = e.split(" ");
                    for (var i = h.length - 1; i >= 0; i--) {
                        var j = h[i],
                            k = j && j.slice(j.length - 1);
                        if (k !== "h" && k !== "w" || !!d.sizesSupported) {
                            if (k === "x") {
                                var l = j && parseFloat(j, 10);
                                g = l && !isNaN(l) ? l : 1
                            }
                        } else g = parseFloat(parseInt(j, 10) / f)
                    }
                }
                return g || 1
            }, d.getCandidatesFromSourceSet = function(a, b) {
                var c = d.parseSrcset(a),
                    e = [];
                for (var f = 0, g = c.length; f < g; f++) {
                    var h = c[f];
                    e.push({
                        url: h.url,
                        resolution: d.parseDescriptor(h.descriptor, b)
                    })
                }
                return e
            }, d.dodgeSrcset = function(a) {
                a.srcset && (a[d.ns].srcset = a.srcset, a.removeAttribute("srcset"))
            }, d.processSourceSet = function(a) {
                var b = a.getAttribute("srcset"),
                    c = a.getAttribute("sizes"),
                    e = [];
                return a.nodeName.toUpperCase() === "IMG" && a[d.ns] && a[d.ns].srcset && (b = a[d.ns].srcset), b && (e = d.getCandidatesFromSourceSet(b, c)), e
            }, d.applyBestCandidate = function(a, b) {
                var c, e, f;
                a.sort(d.ascendingSort), e = a.length, f = a[e - 1];
                for (var g = 0; g < e; g++) {
                    c = a[g];
                    if (c.resolution >= d.getDpr()) {
                        f = c;
                        break
                    }
                }
                if (f && !d.endsWith(b.src, f.url))
                    if (d.restrictsMixedContent() && f.url.substr(0, "http:".length).toLowerCase() === "http:") typeof console !== undefined && console.warn("Blocked mixed content image " + f.url);
                    else {
                        b.src = f.url, b.currentSrc = b.src;
                        var h = b.style || {},
                            i = "webkitBackfaceVisibility" in h,
                            j = h.zoom;
                        i && (h.zoom = ".999", i = b.offsetWidth, h.zoom = j)
                    }
            }, d.ascendingSort = function(a, b) {
                return a.resolution - b.resolution
            }, d.removeVideoShim = function(a) {
                var b = a.getElementsByTagName("video");
                if (b.length) {
                    var c = b[0],
                        d = c.getElementsByTagName("source");
                    while (d.length) a.insertBefore(d[0], c);
                    c.parentNode.removeChild(c)
                }
            }, d.getAllElements = function() {
                var a = [],
                    c = b.getElementsByTagName("img");
                for (var e = 0, f = c.length; e < f; e++) {
                    var g = c[e];
                    (g.parentNode.nodeName.toUpperCase() === "PICTURE" || g.getAttribute("srcset") !== null || g[d.ns] && g[d.ns].srcset !== null) && a.push(g)
                }
                return a
            }, d.getMatch = function(a, b) {
                var c = b.childNodes,
                    e;
                for (var f = 0, g = c.length; f < g; f++) {
                    var h = c[f];
                    if (h.nodeType !== 1) continue;
                    if (h === a) return e;
                    if (h.nodeName.toUpperCase() !== "SOURCE") continue;
                    h.getAttribute("src") !== null && typeof console !== undefined && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                    var i = h.getAttribute("media");
                    if (!h.getAttribute("srcset")) continue;
                    if (!i || d.matchesMedia(i)) {
                        var j = d.verifyTypeSupport(h);
                        if (j === !0) {
                            e = h;
                            break
                        }
                        if (j === "pending") return !1
                    }
                }
                return e
            }, f(), e._ = d, typeof module == "object" && typeof module.exports == "object" ? module.exports = e : typeof define == "function" && define.amd ? define(function() {
                return e
            }) : typeof a == "object" && (a.picturefill = e)
    }(this, this.document, new this.Image),
    function(a, b) {
        var c = function() {
            var b = a._data(document, "events");
            return b && b.click && a.grep(b.click, function(a) {
                return a.namespace === "rails"
            }).length
        };
        c() && a.error("jquery-ujs has already been loaded!");
        var d;
        a.rails = d = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input:file",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function(b) {
                var c = a('meta[name="csrf-token"]').attr("content");
                c && b.setRequestHeader("X-CSRF-Token", c)
            },
            fire: function(b, c, d) {
                var e = a.Event(c);
                return b.trigger(e, d), e.result !== !1
            },
            confirm: function(a) {
                return confirm(a)
            },
            ajax: function(b) {
                return a.ajax(b)
            },
            href: function(a) {
                return a.attr("href")
            },
            handleRemote: function(c) {
                var e, f, g, h, i, j, k, l;
                if (d.fire(c, "ajax:before")) {
                    h = c.data("cross-domain"), i = h === b ? null : h, j = c.data("with-credentials") || null, k = c.data("type") || a.ajaxSettings && a.ajaxSettings.dataType;
                    if (c.is("form")) {
                        e = c.attr("method"), f = c.attr("action"), g = c.serializeArray();
                        var m = c.data("ujs:submit-button");
                        m && (g.push(m), c.data("ujs:submit-button", null))
                    } else c.is(d.inputChangeSelector) ? (e = c.data("method"), f = c.data("url"), g = c.serialize(), c.data("params") && (g = g + "&" + c.data("params"))) : (e = c.data("method"), f = d.href(c), g = c.data("params") || null);
                    l = {
                        type: e || "GET",
                        data: g,
                        dataType: k,
                        beforeSend: function(a, e) {
                            return e.dataType === b && a.setRequestHeader("accept", "*/*;q=0.5, " + e.accepts.script), d.fire(c, "ajax:beforeSend", [a, e])
                        },
                        success: function(a, b, d) {
                            c.trigger("ajax:success", [a, b, d])
                        },
                        complete: function(a, b) {
                            c.trigger("ajax:complete", [a, b])
                        },
                        error: function(a, b, d) {
                            c.trigger("ajax:error", [a, b, d])
                        },
                        xhrFields: {
                            withCredentials: j
                        },
                        crossDomain: i
                    }, f && (l.url = f);
                    var n = d.ajax(l);
                    return c.trigger("ajax:send", n), n
                }
                return !1
            },
            handleMethod: function(c) {
                var e = d.href(c),
                    f = c.data("method"),
                    g = c.attr("target"),
                    h = a("meta[name=csrf-token]").attr("content"),
                    i = a("meta[name=csrf-param]").attr("content"),
                    j = a('<form method="post" action="' + e + '"></form>'),
                    k = '<input name="_method" value="' + f + '" type="hidden" />';
                i !== b && h !== b && (k += '<input name="' + i + '" value="' + h + '" type="hidden" />'), g && j.attr("target", g), j.hide().append(k).appendTo("body"), j.submit()
            },
            disableFormElements: function(b) {
                b.find(d.disableSelector).each(function() {
                    var b = a(this),
                        c = b.is("button") ? "html" : "val";
                    b.data("ujs:enable-with", b[c]()), b[c](b.data("disable-with")), b.prop("disabled", !0)
                })
            },
            enableFormElements: function(b) {
                b.find(d.enableSelector).each(function() {
                    var b = a(this),
                        c = b.is("button") ? "html" : "val";
                    b.data("ujs:enable-with") && b[c](b.data("ujs:enable-with")), b.prop("disabled", !1)
                })
            },
            allowAction: function(a) {
                var b = a.data("confirm"),
                    c = !1,
                    e;
                return b ? (d.fire(a, "confirm") && (c = d.confirm(b), e = d.fire(a, "confirm:complete", [c])), c && e) : !0
            },
            blankInputs: function(b, c, d) {
                var e = a(),
                    f, g, h = c || "input,textarea";
                return b.find(h).each(function() {
                    f = a(this), g = f.is(":checkbox,:radio") ? f.is(":checked") : f.val(), !g == !d && (e = e.add(f))
                }), e.length ? e : !1
            },
            nonBlankInputs: function(a, b) {
                return d.blankInputs(a, b, !0)
            },
            stopEverything: function(b) {
                return a(b.target).trigger("ujs:everythingStopped"), b.stopImmediatePropagation(), !1
            },
            callFormSubmitBindings: function(c, d) {
                var e = c.data("events"),
                    f = !0;
                return e !== b && e.submit !== b && a.each(e.submit, function(a, b) {
                    if (typeof b.handler == "function") return f = b.handler(d)
                }), f
            },
            disableElement: function(a) {
                a.data("ujs:enable-with", a.html()), a.html(a.data("disable-with")), a.bind("click.railsDisable", function(a) {
                    return d.stopEverything(a)
                })
            },
            enableElement: function(a) {
                a.data("ujs:enable-with") !== b && (a.html(a.data("ujs:enable-with")), a.data("ujs:enable-with", !1)), a.unbind("click.railsDisable")
            }
        }, d.fire(a(document), "rails:attachBindings") && (a.ajaxPrefilter(function(a, b, c) {
            a.crossDomain || d.CSRFProtection(c)
        }), a(document).delegate(d.linkDisableSelector, "ajax:complete", function() {
            d.enableElement(a(this))
        }), a(document).delegate(d.linkClickSelector, "click.rails", function(c) {
            var e = a(this),
                f = e.data("method"),
                g = e.data("params");
            if (!d.allowAction(e)) return d.stopEverything(c);
            e.is(d.linkDisableSelector) && d.disableElement(e);
            if (e.data("remote") !== b) {
                if ((c.metaKey || c.ctrlKey) && (!f || f === "GET") && !g) return !0;
                var h = d.handleRemote(e);
                return h === !1 ? d.enableElement(e) : h.error(function() {
                    d.enableElement(e)
                }), !1
            }
            if (e.data("method")) return d.handleMethod(e), !1
        }), a(document).delegate(d.inputChangeSelector, "change.rails", function(b) {
            var c = a(this);
            return d.allowAction(c) ? (d.handleRemote(c), !1) : d.stopEverything(b)
        }), a(document).delegate(d.formSubmitSelector, "submit.rails", function(c) {
            var e = a(this),
                f = e.data("remote") !== b,
                g = d.blankInputs(e, d.requiredInputSelector),
                h = d.nonBlankInputs(e, d.fileInputSelector);
            if (!d.allowAction(e)) return d.stopEverything(c);
            if (g && e.attr("novalidate") == b && d.fire(e, "ajax:aborted:required", [g])) return d.stopEverything(c);
            if (f) {
                if (h) {
                    setTimeout(function() {
                        d.disableFormElements(e)
                    }, 13);
                    var i = d.fire(e, "ajax:aborted:file", [h]);
                    return i || setTimeout(function() {
                        d.enableFormElements(e)
                    }, 13), i
                }
                return !a.support.submitBubbles && a().jquery < "1.7" && d.callFormSubmitBindings(e, c) === !1 ? d.stopEverything(c) : (d.handleRemote(e), !1)
            }
            setTimeout(function() {
                d.disableFormElements(e)
            }, 13)
        }), a(document).delegate(d.formInputClickSelector, "click.rails", function(b) {
            var c = a(this);
            if (!d.allowAction(c)) return d.stopEverything(b);
            var e = c.attr("name"),
                f = e ? {
                    name: e,
                    value: c.val()
                } : null;
            c.closest("form").data("ujs:submit-button", f)
        }), a(document).delegate(d.formSubmitSelector, "ajax:beforeSend.rails", function(b) {
            this == b.target && d.disableFormElements(a(this))
        }), a(document).delegate(d.formSubmitSelector, "ajax:complete.rails", function(b) {
            this == b.target && d.enableFormElements(a(this))
        }), a(function() {
            csrf_token = a("meta[name=csrf-token]").attr("content"), csrf_param = a("meta[name=csrf-param]").attr("content"), a('form input[name="' + csrf_param + '"]').val(csrf_token)
        }))
    }(jQuery),
    function() {
        var CACHE_EXPIRE_IN, DEFAULT_LOAD_OPTIONS, SUPPORT_LOCAL_STORAGE, SUPPORT_PUSH_STATE, TEMPLATES_DICTIONARY_PATH, VERSION, appendLoadedContent, appendPreloadedContent, cacheHistoryContentStore, cacheTemplate, ensureCurrentState, getCachedHistoryContentStore, getTemplate, hideSpinner, historyContentStore, isCachedContentIDValid, isHistoryStateAndContentValid, isHistoryStateValid, loadAndAppend, loadAndReplace, loadOptionsAddDefaults, loadResource, preloadContentForAppend, preloadedContent, prepareStateObj, processContent, pushHistory, renderContent, replaceContentFromHistory, showSpinner, storeTargetContent, templatesDictionary, updateHistory, updatePageTitle, updateTemplatesDictionary, wh;
        window.IFTTT || (window.IFTTT = {}), wh = window.history, VERSION = "0.0.5", TEMPLATES_DICTIONARY_PATH = "/api/ajax/templatesdictionary", CACHE_EXPIRE_IN = 3e5, DEFAULT_LOAD_OPTIONS = {
            additionalData: {},
            after: !1,
            before: !1,
            contentFromSelector: !1,
            data: {},
            dataType: "html",
            errorMessage: "Problem loading requested data",
            replacePageTileWith: !1,
            rewriteCurrentState: !1,
            silent: !1,
            templateName: !1,
            updateAddress: !1
        }, window.SUPPORT_PUSH_STATE = SUPPORT_PUSH_STATE = !!wh && !!wh.pushState, SUPPORT_LOCAL_STORAGE = function() {
            try {
                return localStorage.setItem("testStorage", "testStorage"), localStorage.removeItem("testStorage"), !0
            } catch (a) {
                return !1
            }
        }(), historyContentStore = {}, preloadedContent = {}, templatesDictionary = null, showSpinner = function() {}, hideSpinner = function() {}, processContent = function(a, b) {
            var c, d;
            return b.contentFromSelector ? (d = $.parseHTML(a), c = $(d).find(b.contentFromSelector).html(), c ? c : $("<div/>").append(a).find(b.contentFromSelector).html()) : a
        }, isCachedContentIDValid = function(a) {
            var b, c;
            return c = Number(a.replace("HCS_" + VERSION + "_", "")), b = Date.now() - c > CACHE_EXPIRE_IN, a.match("HCS_" + VERSION) && !b ? !0 : !1
        }, cacheHistoryContentStore = function() {
            if (SUPPORT_LOCAL_STORAGE) return _.each(historyContentStore, function(a, b) {
                return localStorage.setItem(b, LZString.compressToUTF16(JSON.stringify(historyContentStore[b])))
            })
        }, getCachedHistoryContentStore = function() {
            var a, b, c;
            if (SUPPORT_LOCAL_STORAGE) {
                a = {}, c = localStorage.length;
                while (c > 0) c -= 1, b = localStorage.key(c), isCachedContentIDValid(b) && (a[b] = JSON.parse(LZString.decompressFromUTF16(localStorage.getItem(b))))
            }
            return a || {}
        }, loadOptionsAddDefaults = function(a) {
            var b, c, d, e, f, g;
            d = _.clone(DEFAULT_LOAD_OPTIONS), b = function(b) {
                return d[b] = a[b]
            }, g = Object.keys(a);
            for (e = 0, f = g.length; e < f; e++) c = g[e], b(c);
            return d
        }, updatePageTitle = function(a) {
            if (a.replacePageTileWith) return $("head title").text(a.replacePageTileWith)
        }, renderContent = function(a, b, c) {
            var d;
            return d = function(c) {
                var d, e;
                return d = _.template(c), e = d({
                    content: a
                }), _.defer(b, e)
            }, c.templateName ? getTemplate(c.templateName, d) : b(a)
        }, loadResource = function(a, b, c) {
            var d;
            return d = function() {
                return IFTTT.notifications.showNotification({
                    message: c.errorMessage,
                    isError: !0
                })
            }, $.ajax({
                url: a,
                data: c.data,
                success: b,
                error: d,
                dataType: c.dataType
            })
        }, loadAndReplace = function(url, target, options, shouldPushHistory) {
            var onData, replace;
            return shouldPushHistory == null && (shouldPushHistory = !0), options = loadOptionsAddDefaults(options), options._contentFetchStrategy = "loadAndReplace", options._contentUrl = url, showSpinner(), replace = function(a) {
                return $(target).html(a), updatePageTitle(options), options.silent || (shouldPushHistory && options.rewriteCurrentState === !1 ? pushHistory(target, options) : updateHistory(target, options)), hideSpinner(), $(document).trigger("contentLoader.loadedAndReplaced")
            }, onData = function(data) {
                var content;
                content = processContent(data, options), renderContent(content, replace, options);
                if (options.after) return eval(options.after).call(this, options, data)
            }, options.silent || ensureCurrentState(target, options), options.before && eval(options.before).call(this, options), loadResource(url, onData, options), !0
        }, appendLoadedContent = function(target, options, shouldPushHistory, data) {
            var append, content;
            return append = function(content) {
                return $(target).append(content), updatePageTitle(options), options.after && eval(options.after).call(this, options, data), options.silent || (shouldPushHistory && options.rewriteCurrentState === !1 ? pushHistory(target, options) : updateHistory(target, options)), hideSpinner()
            }, options.silent || ensureCurrentState(target, options), options.before && eval(options.before).call(this, options), content = processContent(data, options), renderContent(content, append, options)
        }, loadAndAppend = function(a, b, c, d) {
            var e;
            return d == null && (d = !0), c = loadOptionsAddDefaults(c), c._contentUrl = a, c._contentFetchStrategy = "loadAndAppend", showSpinner(), e = function(a) {
                return appendLoadedContent(b, c, d, a), $(document).trigger("contentLoader.loadedAndAppended")
            }, loadResource(a, e, c), !0
        }, appendPreloadedContent = function(a, b) {
            var c;
            return c = preloadedContent[a], c === "loading" ? b("loading") : (appendLoadedContent(c.target, c.options, c.shouldPushHistory, c.data), preloadedContent[a] = "appended", b("appended"), $(document).trigger("contentLoader.appendedPreloaded"))
        }, preloadContentForAppend = function(a, b, c, d, e) {
            var f, g;
            return d == null && (d = !0), e == null && (e = !1), c = loadOptionsAddDefaults(c), g = _.uniqueId("HCS_preloaded_"), c._contentUrl = a, c._contentFetchStrategy = "loadAndAppend", f = function(f) {
                return preloadedContent[g] = {
                    data: f,
                    options: c,
                    shouldPushHistory: d,
                    target: b,
                    url: a
                }, e && e(g), $(document).trigger("contentLoader.preloaded")
            }, preloadedContent[g] = "loading", loadResource(a, f, c), g
        }, prepareStateObj = function(a, b) {
            var c;
            return c = {
                contentID: "HCS_" + VERSION + "_" + Date.now(),
                target: a,
                loadOptions: b
            }
        }, ensureCurrentState = function(a, b) {
            var c, d;
            if (SUPPORT_PUSH_STATE) return wh.state == null && (c = window.location.pathname, d = prepareStateObj(a, b), wh.replaceState(d, "", c)), storeTargetContent(wh.state.contentID, a)
        }, SUPPORT_PUSH_STATE && (window.onpopstate = function(a) {
            var b;
            if (((b = a.state) != null ? b.contentID : void 0) != null) return replaceContentFromHistory(a.state)
        }), isHistoryStateValid = function() {
            return SUPPORT_PUSH_STATE && wh.state != null && _.has(wh.state, "contentID") && isCachedContentIDValid(wh.state.contentID) ? !0 : !1
        }, isHistoryStateAndContentValid = function() {
            var a;
            if (isHistoryStateValid()) {
                a = historyContentStore[wh.state.contentID];
                if (a != null) return !0
            }
            return !1
        }, replaceContentFromHistory = function(state) {
            var content, options, target;
            options = state.loadOptions, target = state.target, content = historyContentStore[state.contentID];
            if (content != null) return options.before && eval(options.before).call(this, options), $(target).html(content), updatePageTitle(options), hideSpinner(), options.after && eval(options.after).call(this, options), $(document).trigger("contentLoader.replacedFromHistory");
            if (options._contentFetchStrategy === "loadAndReplace") return loadAndReplace(options._contentUrl, target, options, !1)
        }, pushHistory = function(a, b) {
            var c, d;
            if (SUPPORT_PUSH_STATE) return d = b.updateAddress ? b.updateAddress : "", c = prepareStateObj(a, b), wh.pushState(c, "", d), storeTargetContent(wh.state.contentID, a)
        }, updateHistory = function(a, b) {
            var c, d;
            if (SUPPORT_PUSH_STATE) return d = b.updateAddress ? b.updateAddress : "", c = prepareStateObj(a, b), wh.replaceState(c, "", d), storeTargetContent(wh.state.contentID, a)
        }, storeTargetContent = function(a, b) {
            var c;
            return c = $(b).html(), historyContentStore[wh.state.contentID] = c, cacheHistoryContentStore()
        }, cacheTemplate = function(a, b, c) {}, getTemplate = function(a, b) {
            var c, d;
            return d = loadOptionsAddDefaults({
                dataType: "html"
            }), c = function(a) {
                return b(a)
            }, templatesDictionary === null ? updateTemplatesDictionary(function() {
                return loadResource(templatesDictionary[a].url, c, d)
            }) : loadResource(templatesDictionary[a].url, c, d)
        }, updateTemplatesDictionary = function(a) {
            var b, c;
            return c = loadOptionsAddDefaults({
                dataType: "json"
            }), b = function(b) {
                templatesDictionary = b;
                if (typeof a !== void 0) return a()
            }, loadResource(TEMPLATES_DICTIONARY_PATH, b, c)
        }, $(function() {
            historyContentStore = getCachedHistoryContentStore(), cacheHistoryContentStore();
            if (SUPPORT_PUSH_STATE && wh.state != null && isHistoryStateValid()) return replaceContentFromHistory(wh.state)
        }), window.IFTTT.contentLoader = {
            isHistoryStateAndContentValid: isHistoryStateAndContentValid,
            isHistoryStateValid: isHistoryStateValid,
            loadAndAppend: loadAndAppend,
            loadAndReplace: loadAndReplace,
            preloadContentForAppend: preloadContentForAppend,
            appendPreloadedContent: appendPreloadedContent
        }
    }.call(this),
    function() {
        var a, b;
        window.IFTTT || (window.IFTTT = {}), b = function(a) {
            var b;
            if (!a.hasClass("-js_use_variant")) return a.addClass("is-using-gray-url"), b = a.prop("src"), b.length > 0 ? a.prop("src", b.replace(/_bw\.png|\.png/, "_bw.png")) : IFTTT.ClientLog.error("EmptySrcDetected", {
                imageClassName: a[0].className
            }, "(failed assumption)");
            a.addClass("is-using-gray-filter");
            if (!Modernizr.cssfilters && !$("html").attr("class").match(/ie[7-9]/)) return IFTTT.Filters.grayscaleImage(a[0]);
            b = a.prop("src");
            if (!(b.length > 0)) return IFTTT.ClientLog.error("EmptySrcDetected", {
                imageClassName: a[0].className
            }, "(failed assumption)")
        }, a = function(a) {
            var b;
            if (a.hasClass("-js_use_variant")) {
                a.removeClass("is-using-gray-filter");
                if (!Modernizr.cssfilters && !$("html").attr("class").match(/ie[7-9]/)) return IFTTT.Filters.off(a[0]);
                b = a.prop("src");
                if (b.length > 0) return a.prop("src", b.replace(/_bw\.png|\.png/, ".png"))
            } else {
                a.removeClass("is-using-gray-url"), b = a.prop("src");
                if (b.length > 0) return a.prop("src", b.replace(/_bw\.png|\.png/, ".png"))
            }
        }, IFTTT.Channel = {
            ensureIconsHaveCorrectColor: function() {
                return $(".channel.is-inactive img.channel-icon:not(.is-using-gray-url, .is-using-gray-filter), .recipe.is-inactive img.channel-icon:not(.is-using-gray-url, .is-using-gray-filter)").each(function() {
                    return b($(this)), !0
                }), $(".channel:not(.is-inactive) img.channel-icon.is-using-gray-url, .recipe:not(.is-inactive) img.channel-icon.is-using-gray-url, .channel:not(.is-inactive) img.channel-icon.is-using-gray-filter, .recipe:not(.is-inactive) img.channel-icon.is-using-gray-filter").each(function() {
                    return a($(this)), !0
                })
            }
        }
    }.call(this),
    function() {
        $(
            document).ready(function() {
            $(document).on("ajax:success", "a[ifttt-trigger-channel-button]", function(a, b, c) {
                var d;
                d = $(this).data("channel_id"), $("#trigger_select").html(b), onChooseTriggerChannelSuccess(b, d)
            }), $(document).on("ajax:error", "a[ifttt-trigger-channel-button]", function(a, b) {
                var c;
                c = $(this).data("channel_id"), $("#trigger_channel_missing").html(b.responseText), $("#trigger_channel_missing").css({
                    visibility: "visible"
                }), onChooseTriggerChannelMissing(b, c)
            }), $(document).on("ajax:success", "a[ifttt-action-channel-button]", function(a, b, c) {
                var d;
                d = $(this).data("channel_id"), $("#action_select").html(b), onChooseActionChannelSuccess(b, d)
            }), $(document).on("ajax:error", "a[ifttt-action-channel-button]", function(a, b) {
                var c;
                c = $(this).data("channel_id"), $("#action_channel_missing").html(b.responseText), $("#action_channel_missing").css({
                    visibility: "visible"
                }), onChooseActionChannelMissing(b, c)
            }), $(document).on("ajax:complete", "a[ifttt-trigger-channel-missing]", function(a, b, c) {
                var d;
                b.status === 412 ? $("#trigger_channel_missing").html(b.responseText) : (d = $(this).data("channel_id"), $("#trigger_select").html(b.responseText), onCheckTriggerChannelSuccess(b, d), $("#trigger_channel_missing").css({
                    visibility: "hidden"
                }))
            }), $(document).on("ajax:complete", "a[ifttt-action-channel-missing]", function(a, b, c) {
                var d;
                b.status === 412 ? $("#action_channel_missing").html(b.responseText) : (d = $(this).data("channel_id"), $("#action_select").html(b.responseText), onCheckActionChannelSuccess(b, d), $("#action_channel_missing").css({
                    visibility: "hidden"
                }))
            })
        })
    }.call(this),
    function() {
        We.can("trackSignup", function() {
            return _.each(document.cookie.split(";"), function(a) {
                var b;
                if (a.match("just_signed_up=")) return b = a.replace("just_signed_up=", ""), ga("send", "event", "goals", "sign_up", b), document.cookie = "" + a + ";path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT"
            })
        })
    }.call(this),
    function() {
        var a, b, c, d;
        window.IFTTT.Filters = a = {}, d = function(a, b) {
            var c;
            return c = b.getContext("2d"), c.drawImage(a, 0, 0), c.getImageData(0, 0, b.width, b.height)
        }, c = function(a) {
            var b, c, d, e, f, g;
            c = a.data, e = 0;
            while (e < c.length) f = c[e], d = c[e + 1], b = c[e + 2], g = .2126 * f + .7152 * d + .0722 * b, c[e] = c[e + 1] = c[e + 2] = g, e += 4;
            return a
        }, b = function(a, b) {
            var c;
            return c = new Image, c.onload = function() {
                var a, d;
                return a = c.height, d = c.width, b({
                    width: d,
                    height: a
                })
            }, c.src = $(a).attr("src")
        }, a.grayscaleImage = function(a) {
            var e;
            return $(a).parent().find("canvas.grayscaledImage").size() ? ($(a).css({
                display: "none"
            }), $(a).parent().find("canvas.grayscaledImage").css({
                display: "initial"
            }), a) : (e = function(b) {
                var e, f, g;
                return e = document.createElement("canvas"), e.className = "grayscaledImage", e.width = b.width, e.height = b.height, g = [d(a, e)], f = c.apply(null, g), $(a).parent().append(e), $(a).parent().find("canvas")[0].getContext("2d").putImageData(f, 0, 0), $(a).parent().find("canvas").width(a.width).height(a.height), $(a).css({
                    display: "none"
                }), a
            }, b(a, e), a)
        }, a.off = function(a) {
            return $(a).css({
                display: "block"
            }), $(a).parent().find("canvas.grayscaledImage").remove()
        }
    }.call(this),
    function() {
        var a, b, c, d;
        window.IFTTT || (window.IFTTT = {}), c = {}, a = function(a, b) {
            return c[a] = b
        }, b = function(a) {
            if (!_.has(c, a)) throw "Ingredients not found (" + a + ")";
            return c[a]
        }, d = function(a, b, d) {
            var e, f, g, h, i;
            return i = c[b][d], f = $(a).first(), h = f.find(".addin-select_inserter"), g = f.find(".addin-info"), e = f.find(".addin-info_ex-content"), i ? (h.text(window.addInButtonText || "Add Ingredient").removeClass("is-disabled").data("ingredientName", i.name), g.removeClass("is-not-applicable"), e.text(i.ex)) : (h.html(h.data("templateForDisabled")).addClass("is-disabled").data("ingredientName", ""), g.addClass("is-not-applicable"), e.text(""))
        }, window.IFTTT.Ingredients = {
            declareIngredientsForTrigger: a,
            updateFieldToShowIngredientFromTrigger: d,
            getIngredientsForTrigger: b
        }
    }.call(this),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M;
        G = this, this.iftttMap = k = {}, w = 100, E = 100, e = 0, d = "", L = null, s = null, z = "We can't find that place.", B = "The area is outside of the valid range", C = "Outside of the known world", t = {}, b = '<svg id=\'svgRadius\' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width=\'100%\' height=\'100%\'>\n	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >\n		<path d="M0,0 L0,400 L400,400 L400,0 L0,0 L0,0 L0,0 L0,0 Z M394,200 C394,153.08641 377.347811,110.062148 349.631761,76.5155445 C314.04872,33.4469918 260.229656,6 200,6 C92.8567533,6 6,92.8567533 6,200 C6,307.143246 92.8567533,394 200,394 C307.143246,394 394,307.143246 394,200 Z M394,200" id="Rectangle-1" fill-opacity="0.6" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n		<circle d="M200,397 C308.800101,397 397,308.800101 397,200 C397,91.1998989 308.800101,3 200,3 C91.1998989,3 3,91.1998989 3,200 C3,308.800101 91.1998989,397 200,397 Z M200,397" id="Oval-4" stroke="#20B2FF" stroke-width="6" sketch:type="MSShapeGroup" cx="200" cy="200" r="197"></circle>\n	</g>\n</svg>', K = '<svg id=\'svgRadius\' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  width=\'100%\' height=\'100%\'>\n	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >\n		<path d="M0,0 L0,340 L340,340 L340,0 L0,0 L0,0 L0,0 L0,0 Z M334.9,170 C334.9,130.123448 320.745639,93.5528262 297.186997,65.0382128 C266.941412,28.4299431 221.195208,5.1 170,5.1 C78.9282403,5.1 5.1,78.9282403 5.1,170 C5.1,261.071759 78.9282403,334.9 170,334.9 C261.071759,334.9 334.9,261.071759 334.9,170 Z M334.9,170" id="Rectangle-1" fill-opacity="0.6" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n		<circle d="M170,337 C262.231558,337 337,262.231558 337,170 C337,77.7684422 262.231558,3 170,3 C77.7684422,3 3,77.7684422 3,170 C3,262.231558 77.7684422,337 170,337 Z M170,337" id="Oval-4" stroke="#20B2FF" stroke-width="6" sketch:type="MSShapeGroup" cx="170" cy="170" r="167"></circle>\n	</g> \n</svg>', h = '<svg id=\'svgRadius\' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=\'100%\' height=\'100%\'>\n	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >\n		<path d="M0,0 L0,280 L280,280 L280,0 L0,0 L0,0 L0,0 L0,0 Z M275.8,140 C275.8,107.160487 264.143468,77.0435039 244.742232,53.5608811 C219.834104,23.4128943 182.160759,4.2 140,4.2 C64.9997273,4.2 4.2,64.9997273 4.2,140 C4.2,215.000272 64.9997273,275.8 140,275.8 C215.000272,275.8 275.8,215.000272 275.8,140 Z M275.8,140" id="Rectangle-1" fill-opacity="0.6" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n		<circle d="M140,277 C215.663014,277 277,215.663014 277,140 C277,64.3369855 215.663014,3 140,3 C64.3369855,3 3,64.3369855 3,140 C3,215.663014 64.3369855,277 140,277 Z M140,277" id="Oval-4" stroke="#20B2FF" stroke-width="6" sketch:type="MSShapeGroup" cx="140" cy="140" r="137"></circle>\n	</g>\n</svg>', q = null, v = 21, y = 2, u = v, x = y, M = o = Math.floor((v + y) / 2), r = {}, a = [], l = null, f = !1, g = !0, A = null, F = null, p = !1, J = !1, D = null, H = !1, i = !1, I = function() {
            if (!i && $("html").hasClass("is-webview") && IFTTT && IFTTT.WangSupport) return IFTTT.WangSupport.showActivityIndicator(), i = !0
        }, j = function() {
            if (i && $("html").hasClass("is-webview") && IFTTT && IFTTT.WangSupport) return IFTTT.WangSupport.hideActivityIndicator(), i = !1
        }, m = function() {
            k.isActivated = !0, D = !1;
            if ($(".mapField").val() !== "") try {
                D = $.parseJSON($(".mapField").val())
            } catch (a) {}
            return D !== !1 ? (r = D, c(new google.maps.LatLng(D.lat, D.lng))) : (H = !0, c(new google.maps.LatLng(37.78371, -122.408343)))
        }, c = function(c) {
            var f, i, m, n, p, q, w, E, G, J, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb;
            return s = $("#iftttMapField").data("mode"), S = new google.maps.Map($("#map")[0], {
                center: c,
                zoom: o,
                maxZoom: v,
                minZoom: y,
                disableDefaultUI: !0,
                scrollwheel: !1,
                draggable: !0,
                streetViewControl: !1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }), $(window).width() <= 640 && (hb = null, w = function() {
                hb != null && clearTimeout(hb), $("#lockLayer")[0].className = "show hide";
                if ($("#radiusHolder").hasClass("point")) return $(".radius_mask").addClass("unlock")
            }, q = function() {
                return hb !== null && clearTimeout(hb), hb = setTimeout(function() {
                    return $(".radius_mask").removeClass("unlock"), $("#lockLayer")[0].className = "show"
                }, 7e3)
            }, $("#lockLayer").addClass("show").on("click", w), $(window).on("scroll", q), google.maps.event.addListener(S, "dragend", q), google.maps.event.addListener(S, "dragstart", function() {
                if (hb != null) return clearTimeout(hb)
            }), $("#map").on("mapCentered", q), google.maps.InfoWindow.prototype.set = function() {}), R = S.getCenter(), google.maps.event.addListener(S, "center_changed", function() {
                S.getCenter().lat() > 85 || S.getCenter().lat() < -85 ? S.panTo(R) : R = S.getCenter()
            }), k.geocoder = O = new google.maps.Geocoder, k.placesLocator = ab = new google.maps.places.PlacesService(S), t = {
                url: "/images/triggers/location_field/location_marker_shadow.png",
                size: new google.maps.Size(34, 53),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 50)
            }, window.devicePixelRatio > 1 && (t = {
                url: "/images/triggers/location_field/location_marker_shadow@2x.png",
                size: new google.maps.Size(68, 106),
                scaledSize: new google.maps.Size(34, 53),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 52)
            }), bb = function() {
                if (!($("#google_watermark").children().size() > 1)) {
                    $("#google_watermark").prepend($("[src='https://maps.gstatic.com/mapfiles/api-3/images/google_white2.png']").parents().eq(2).attr("id", "gLogo")), $("#google_watermark .text").append($(".gm-style-cc"), $(".gmnoprint")), $("#google_watermark .text").append($("img[src='https://maps.gstatic.com/mapfiles/api-3/images/google_white2_hdpi.png']").css({
                        position: "relative",
                        top: "-7px"
                    }));
                    if ($("html").hasClass("is-webview")) return $("#google_watermark").on("click", "a", function(a) {
                        a.preventDefault();
                        if (IFTTT && IFTTT.WangSupport) return IFTTT.WangSupport.openInFullBrowser(this.href)
                    })
                }
            }, ob = k.updateRadiusStyle = function() {
                var a, c;
                return navigator.userAgent.match("Android ") || ($("#theRadius svg").remove(), a = $(window).width(), $("#iftttMapFieldHolder").width() === 300 && $(".recipe-page_shared").size() ? $("#theRadius").append(h) : a <= 720 && a > 420 ? $("#theRadius").append(K) : a <= 420 ? $("#theRadius").append(h) : $("#theRadius").append(b)), c = ($("#radiusHolder").width() - $("#radius").width()) / 2, $(".radius_mask_left").width(Math.ceil(c)), $(".radius_mask_right").width(Math.floor(c)), $("#mapHolder").hide(), $("#mapHolder").get(0).offsetHeight, $("#mapHolder").show()
            }, n = _.debounce(ob, 50), $(window).resize(n), $("#radiusHolder").removeClass("hidden"), ob(), !$("html").hasClass("is-webview") && !$("html").hasClass("is-android") && ($("#map").on("mouseenter", function() {
                return $(".radius_mask, #theRadius").addClass("hover")
            }), $("#map").on("mouseleave", function() {
                return $(".radius_mask, #theRadius").removeClass("hover")
            })), pb = function() {
                return M > u || M < x ? gb("OUT_OF_BOUND") : m()
            }, P = function() {
                var a, b, c, d, e;
                return a = S.getBounds(), b = a.getNorthEast(), e = a.getSouthWest(), c = google.maps.geometry.spherical.computeDistanceBetween(e, new google.maps.LatLng(b.lat(), e.lng())), d = Math.floor(c * $("#radius").height() / $("#map").height() * .5)
            }, E = function() {
                return setTimeout(bb, 1e3), j(), g ? (u = J($("#iftttMapField").data("min_radius")), x = J($("#iftttMapField").data("max_radius")), M = o = A ? J(A) : Math.floor((u + x) / 2), S.setZoom(M), g = !1) : (c = S.getCenter(), e = P(), r = {
                    lat: c.lat() % 90,
                    lng: c.lng() % 180,
                    radius: e,
                    address: d
                }), nb()
            }, T = google.maps.event.addListener(S, "bounds_changed", E), $("html").hasClass("is-webview") || (mb = function() {
                return $(window).one("resize", function() {
                    return google.maps.event.removeListener(T), T = null
                })
            }, mb(), $(window).on("resize", function() {
                return clearTimeout(F), F = setTimeout(function() {
                    return r.lat != null && S.setCenter(new google.maps.LatLng(r.lat, r.lng)), mb(), T = google.maps.event.addListener(S, "bounds_changed", E)
                }, 250)
            })), lb = function() {
                return $("#radiusHolder, #theRadius").toggleClass("mapDragged")
            }, google.maps.event.addListener(S, "dragend", lb), google.maps.event.addListener(S, "dragstart", lb), nb = function(a) {
                jb(), $(".mapField").val(JSON.stringify(r));
                if (a != null) return a()
            }, jb = function() {
                if ($("#searchLocation").size()) return $("#searchLocation").val().length > 0 ? r.description = $("#searchLocation").val() : r.description = ""
            }, k.storeAddress = ib = function(a) {
                return I(), k.geocoder.geocode({
                    location: c
                }, function(b, c) {
                    j();
                    if (c === "OK") return d = b[0].formatted_address, r.address = b[0].formatted_address, nb(a);
                    if (a != null) return a()
                }), null
            }, $("#iftttMapFieldHolder").parents("form").find("input[type=submit]").not("#locateBtn").on("click", function(a) {
                var b;
                if (!$("html").hasClass("is-webview") && a.originalEvent != null) return a.preventDefault(), b = function() {
                    if ($("#iftttMapFieldHolder").parents("form").hasClass("new_recipe") || $("#iftttMapFieldHolder").parents("form").hasClass("edit_recipe")) return $("#iftttMapFieldHolder").parents("form").submit()
                }, ib(b)
            }), Y = function(a) {
                var b;
                if (!$("html").hasClass("is-webview") && a.originalEvent != null) return a.preventDefault(), $("#validate_trigger_btn").off("click", Y), b = function() {
                    return $("#validate_trigger_btn").click(), $("#validate_trigger_btn").on("click", Y)
                }, ib(b)
            }, $("#validate_trigger_btn").on("click", Y), p = function(a) {
                a.preventDefault(), m(), $("#searchLocation").blur();
                if ($("#searchLocation").val().length > 0) return eb($("#searchLocation").val())
            }, $("#locateBtn").on("click", p), $("#searchLocation").on("keydown", function(a) {
                if (a.keyCode === 13) return p(a)
            }).on("click", function(a) {
                return $(this).select()
            }), f = function(a, b) {
                return j(), a.geometry.location.lat() > 85 || a.geometry.location.lat() < -85 ? gb("OUT_OF_WORLD") : ($("#map").trigger("mapCentered"), b || a.geometry.viewport != null && S.fitBounds(a.geometry.viewport), S.panTo(a.geometry.location), d = a.formatted_address)
            }, N = function(a) {
                return cb(), k.geocoder.geocode({
                    address: a
                }, V)
            }, Q = function() {
                var a, b, c;
                return a = function(a) {
                    if (a) return S.panTo(new google.maps.LatLng(a.coords.latitude, a.coords.longitude))
                }, $("html").hasClass("is-webview") ? typeof IFTTT != "undefined" && IFTTT !== null ? (c = IFTTT.WangSupport) != null ? c.getDeviceLocation(a) : void 0 : void 0 : typeof navigator != "undefined" && navigator !== null ? (b = navigator.geolocation) != null ? b.getCurrentPosition(a) : void 0 : void 0
            }, eb = function(a) {
                return cb(), I(), k.placesLocator.nearbySearch({
                    bounds: S.getBounds(),
                    name: a
                }, X)
            }, db = function(a) {
                return cb(), I(), k.placesLocator.nearbySearch({
                    bounds: S.getBounds(),
                    name: a
                }, W)
            }, G = function(a) {
                var b;
                return b = new google.maps.LatLngBounds, _.each(a, function(a) {
                    return b.extend(a.geometry.location)
                }), S.fitBounds(b)
            }, V = function(a, b) {
                if (b === "OK") return f(a[0]), Z([a[0]]);
                if (b === "ZERO_RESULTS") return gb(b)
            }, X = function(a, b) {
                if (b === "OK") return a.length === 1 ? f(a[0]) : G(a), Z(a);
                if (b === "ZERO_RESULTS") return db($("#searchLocation").val())
            }, W = function(a, b) {
                if (b === "OK") return a.length === 1 ? f(a[0]) : G(a), Z(a);
                if (b === "ZERO_RESULTS") return N($("#searchLocation").val())
            }, cb = function() {
                var b, c;
                b = function(a) {
                    return a.setMap(null), a = null
                }, c = [];
                while (a.length) c.push(b(a.pop()));
                return c
            }, Z = function(b) {
                var c, d, e, g, h;
                c = function(b) {
                    var c;
                    return c = new google.maps.Marker({
                        position: b.geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: t,
                        map: S,
                        title: b.name,
                        data: b
                    }), a.push(c), google.maps.event.addListener(c, "click", function() {
                        var a;
                        return this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1), l != null && (l.close(), l = null), this.data.formatted_address != null ? a = "<div class='infoWindowContent'>\n	<p class='title'>" + this.data.formatted_address + "</p>\n</div>" : a = "<div class='infoWindowContent'>\n	<p class='title'>" + this.title + "</p>\n	<p class='vicinity'>" + this.data.vicinity + "</p>\n</div>", l = new google.maps.InfoWindow({
                            content: a
                        }), $(window).width() < 768 || l.open(S, this), f(this.data, !0)
                    })
                }, h = [];
                for (e = 0, g = b.length; e < g; e++) d = b[e], h.push(c(d));
                return h
            }, kb = function(a) {
                return $("#radiusHolder").addClass(a)
            }, kb(s), $("#mapControlls").on("click", "button", function(a) {
                a.preventDefault();
                switch ($(a.currentTarget).attr("id")) {
                    case "zoomIn":
                        return qb();
                    case "zoomOut":
                        return rb()
                }
            }), qb = function() {
                return M += 1, S.setZoom(M), i
            }, rb = function() {
                return M -= 1, S.setZoom(M), i
            }, i = function() {
                M > y && $("#zoomOut").removeClass("max"), M < v && $("#zoomIn").removeClass("max"), M === v && $("#zoomIn").addClass("max");
                if (M === y) return $("#zoomOut").addClass("max")
            }, fb = function() {
                return M = S.getZoom(), i()
            }, google.maps.event.addListener(S, "zoom_changed", fb), J = function(a) {
                var b, c, d, e, f, g, h;
                d = o;
                if (L == null) {
                    L = [0, 0], f = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], c = function(a) {
                        return S.setZoom(a), L.push(P())
                    };
                    for (g = 0, h = f.length; g < h; g++) e = f[g], c(e)
                }
                return b = null, $.each(L, function() {
                    if (b === null || Math.abs(this - a) < Math.abs(b - a)) return b = this.valueOf()
                }), d = _.indexOf(L, b)
            }, gb = function(a) {
                var b;
                j();
                switch (a) {
                    case "ZERO_RESULTS":
                        b = z;
                        break;
                    case "OUT_OF_BOUND":
                        b = B;
                        break;
                    case "OUT_OF_WORLD":
                        b = C
                }
                if (!$("html").hasClass("is-webview")) return $("#iftttMapFieldHolder .validation-error").remove(), $("#iftttMapFieldHolder").parent().find(".trigger-field_label").append("<span class='validation-error locationField-error'>" + b + "</span>");
                if (IFTTT && IFTTT.WangSupport) return IFTTT.WangSupport.showAlert(b)
            }, m = function() {
                if (!$("html").hasClass("is-webview")) return $(".locationField-error").remove()
            }, $(".mapField").val() !== "" ? ($("#searchLocation").val(D.description), g = !0, A = D.radius, U = new google.maps.Marker({
                position: c,
                animation: google.maps.Animation.DROP,
                map: S,
                title: D.description,
                data: {
                    geometry: {
                        location: c
                    }
                },
                icon: t
            }), a.push(U), google.maps.event.addListener(U, "click", function() {
                return f(this.data, !0)
            })) : H && (H = !1, Q()), i(), ib(), $("#mapHolder").hide(), $("#mapHolder").get(0).offsetHeight, $("#mapHolder").show()
        }, k.initMap = n = function(a, c) {
            var d, e, f;
            if (p && !$("#mapHolder").size()) return navigator.userAgent.match("Android ") ? ($("html").addClass("is-android"), f = '<div id="theRadius">\n	<div id="radius_static"></div>\n	<div id="radius_dragged"></div>\n</div>  ') : f = "<div id=\"theRadius\" class='regularRadius'>\n	" + b + "\n</div>", $("html").hasClass("brwsr-ie9") ? (s = $("#iftttMapField").data("mode"), s !== "area" ? d = "/images/triggers/location_field/radius_" + s + ".png" : d = "/images/triggers/location_field/radius.png", e = '<svg class=\'radiusOverlay_svg\' width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">\n	<image xlink:href="' + d + '" x="0" y="0" height="100%" width="100%"/>\n</svg>') : e = "<div id='radiusOverlay'></div>", $("#iftttMapField").append('<div id="mapHolder">\n	<div id="map" ></div>\n	<div id="mapControlls">\n		<div id="zoomControls">\n			<button class="zoomBtn" id="zoomOut"></button>\n			<button class="zoomBtn max" id="zoomIn"></button>\n		</div>\n	</div>\n<div id="searchForm">\n	<input id="searchLocation" class=\'tf-text\' placeholder="Search" title="search" type="text">\n	<input id="locateBtn" name="locateBtn" type="submit" value="Search">\n</div>\n<div id="radiusHolder" class=\'hidden\'>\n	<div class=\'radius_mask radius_mask_top\'></div>\n	<div class=\'radius_mask radius_mask_left\'></div>\n	<div id="radius">\n		<div id="lockLayer" >\n			<p>tap to unlock</p>\n		</div>\n		' + f + "\n		" + e + "\n	</div>\n	<div class='radius_mask radius_mask_right'></div>\n	<div class='radius_mask radius_mask_bottom'></div>\n</div>\n</div>\n<div class='clear'></div>"), $("#iftttMapFieldHolder").after("<div id='google_watermark'><div class='text'></div></div>"), m(), $("#live_trigger_submit > .btn-primary").removeClass("is-disabled")
        }, k.onMapReady = function() {
            var a;
            return a = function() {
                p = !0;
                if (J) return n()
            }, $("html").hasClass("brwsr-ie8") ? setTimeout(a, 1e3) : a()
        }, $(window).on("renderComponents", function(a, b) {
            var c, d, e, f;
            return k.isActivated == null ? (J = !0, c = function(a) {
                var b;
                b = _.once(function() {
                    return $("#live_trigger_submit > .btn-primary").addClass("is-disabled"), $("#new_statement").off("DOMSubtreeModified", c)
                });
                if ($("#iftttMapFieldHolder").size() && $("#live_trigger_submit").size()) return b()
            }, $("#new_statement").on("DOMSubtreeModified", c), $("html").hasClass("brwsr-ie8") ? setTimeout(n, 1e3) : n()) : (f = !1, d = $("#statement_create").size() ? "scroll" : "DOMSubtreeModified", e = function() {
                if (!f) return k.updateRadiusStyle(), google.maps.event.trigger(map, "resize"), f = !0
            }, $(window).one(d, function() {
                return setTimeout(e, 250)
            }))
        })
    }.call(this),
    function() {
        window.IFTTT || (window.IFTTT = {}), IFTTT.Menu = {
            clickAnywhereToClose: function(a, b) {
                return $(document).on("click.ifttt-menu-dismiss", function(c) {
                    var d;
                    return d = !1, $(c.target).parents().andSelf().each(function(c, e) {
                        if (e === b[0] || e === a[0]) return d = !0, !1
                    }), d ? !0 : (a.trigger("click.ifttt-menu-toggle"), c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation())
                })
            },
            cleanUpClickAnywhere: function() {
                return $(document).off("click.ifttt-menu-dismiss")
            },
            wireUp: function() {
                return $(document).on("click.ifttt-menu-toggle", ".menu-toggle", function(a) {
                    var b, c;
                    return b = $(a.target).parents().andSelf().filter(".menu-toggle").first(), c = $(b.data("forMenu")), b.hasClass("is-for-opening") ? IFTTT.Menu.clickAnywhereToClose(b, c) : IFTTT.Menu.cleanUpClickAnywhere(), b.toggleClass("is-for-opening is-for-closing"), c.toggleClass("is-opened is-closed"), a.preventDefault()
                })
            }
        }
    }.call(this),
    function() {
        var a, b, c, d, e, f, g;
        c = 1, b = 2, a = 3, e = 0, f = function() {
            return $(".mop_input").each(function(a, b) {
                var c;
                return c = $(b), c.data("mop-placeholder", c.attr("placeholder")), c.prop("placeholder", ""), c.attr("placeholder", ""), c.addClass("mop-s mop-ph"), !0
            }), e = b
        }, g = function(a) {
            return a === "mobile" ? e = c : (f(), e = b)
        }, d = function(d, g) {
            var h;
            if (g !== "mobile") return e === a ? $(".mop-s:not(.mop-ph)").each(function(a, b) {
                return $(b).prop("placeholder", "").attr("placeholder", "").addClass("mop-ph"), !0
            }) : e !== b && e === c && f(), e = b;
            if (e !== c && e !== a) return e === b ? ($(".mop-ph").each(function(a, b) {
                var c, d;
                return c = $(b), d = c.data("mop-placeholder"), c.attr("placeholder", d), c.prop("placeholder", d), c.removeClass("mop-ph"), !0
            }), e = a) : (h = window.console) != null ? typeof h.error == "function" ? h.error("Unexpected mopState (xâ†’mob): ", e) : void 0 : void 0
        }, window.MOP = {
            sweep: g,
            crossover: d
        }
    }.call(this),
    function() {
        var a, b, c, d, e;
        window.IFTTT || (window.IFTTT = {}), c = _.template('<div class="notification-collector_inside <%= classes %>"> <div class="notification-collector_inside_2"> <p class="notification"><%= message %></p> </div> </div>'), d = void 0, b = function() {
            var a;
            return a = $(".l-page-header").outerHeight(!0), $(".l-page-tab-bar").size() && (a += $(".l-tab-bar-tabs").outerHeight(!0)), a < 70 && (a = 70, $(window).width() < 720 && (a = 26)), $(".notification-collector_inside").height(a)
        }, window.IFTTT.notifications = {
            resizeNotification: function() {
                $(".notification-collector").data("offset_top", 0), setTimeout(function() {
                    $(".l-notifications").css({
                        width: "100%"
                    }), $(".notification-collector").addClass("show")
                }, 250)
            },
            showNotification: function(a) {
                if ($(".notification").size() === 0) {
                    a.isError ? a.classes = "is-error" : a.classes = "", d && clearTimeout(d), window.IFTTT.notifications.resizeNotification(), $(".notification-collector").removeClass("show").append(c(a)), b(), setTimeout(function() {
                        $(".notification-collector").addClass("show"), $(".notification-collector_inside").last().addClass("show"), We.should("clearNotifications")
                    }, 150);
                    return
                }
                return {
                    showFlash: function() {
                        return b(), $(".notification-collector_inside").last().addClass("show")
                    }
                }
            }
        }, a = function() {
            return $(window).scrollTop() >= $(".l-site-header").outerHeight(!0) ? $(".notification-collector").addClass("fixed") : $(".notification-collector").removeClass("fixed")
        }, e = _.throttle(a, 50), We.can("clearNotifications", function() {
            var a;
            return a = function() {
                return $(".notification-collector_inside").first().removeClass("show"), setTimeout(function() {
                    return $(".notification-collector_inside").first().remove(), $(".notification-collector_inside").length > 0 ? We.should("clearNotifications") : $(".l-notifications").css({
                        width: "auto"
                    })
                }, 350)
            }, d = setTimeout(a, 3500)
        }), $(function() {
            return $(window).on("scroll", e)
        })
    }.call(this),
    function(a, b, c) {
        function j(a) {
            var b = {},
                d = /^jQuery\d+$/;
            return c.each(a.attributes, function(a, c) {
                c.specified && !d.test(c.name) && (b[c.name] = c.value)
            }), b
        }

        function k(a, d) {
            var e = this,
                f = c(e);
            if (e.value == f.attr("placeholder") && f.hasClass("placeholder"))
                if (f.data("placeholder-password")) {
                    f = f.hide().next().show().attr("id", f.removeAttr("id").data("placeholder-id"));
                    if (a === !0) return f[0].value = d;
                    f.focus()
                } else e.value = "", f.removeClass("placeholder"), e == b.activeElement && e.select()
        }

        function l() {
            var a, b = this,
                d = c(b),
                e = d,
                f = this.id;
            if (b.value == "") {
                if (b.type == "password") {
                    if (!d.data("placeholder-textinput")) {
                        try {
                            a = d.clone().attr({
                                type: "text"
                            })
                        } catch (g) {
                            a = c("<input>").attr(c.extend(j(this), {
                                type: "text"
                            }))
                        }
                        a.removeAttr("name").data({
                            "placeholder-password": !0,
                            "placeholder-id": f
                        }).bind("focus.placeholder", k), d.data({
                            "placeholder-textinput": a,
                            "placeholder-id": f
                        }).before(a)
                    }
                    d = d.removeAttr("id").hide().prev().attr("id", f).show()
                }
                d.addClass("placeholder"), d[0].value = d.attr("placeholder")
            } else d.removeClass("placeholder")
        }
        var d = "placeholder" in b.createElement("input"),
            e = "placeholder" in b.createElement("textarea"),
            f = c.fn,
            g = c.valHooks,
            h, i;
        d && e ? (i = f.placeholder = function() {
            return this
        }, i.input = i.textarea = !0) : (i = f.placeholder = function() {
            var a = this;
            return a.filter((d ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": k,
                "blur.placeholder": l
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), a
        }, i.input = d, i.textarea = e, h = {
            get: function(a) {
                var b = c(a);
                return b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value
            },
            set: function(a, d) {
                var e = c(a);
                return e.data("placeholder-enabled") ? (d == "" ? (a.value = d, a != b.activeElement && l.call(a)) : e.hasClass("placeholder") ? k.call(a, !0, d) || (a.value = d) : a.value = d, e) : a.value = d
            }
        }, d || (g.input = h), e || (g.textarea = h), c(function() {
            c(b).delegate("form", "submit.placeholder", function() {
                var a = c(".placeholder", this).each(k);
                setTimeout(function() {
                    a.each(l)
                }, 10)
            })
        }), c(a).bind("beforeunload.placeholder", function() {
            c(".placeholder").each(function() {
                this.value = ""
            })
        }))
    }(this, document, jQuery),
    function() {
        window.IFTTT || (window.IFTTT = {}), IFTTT.recipes || (IFTTT.recipes = {}), IFTTT.recipes.showEmbedCode = function() {
            var a, b;
            a = $("#recipe_text_area").val(), a.match(/<img src/) ? $(".recipe_embed-details").slideToggle() : (b = $(".recipe-page").attr("id").match(/\d+/)[0], $.get("/recipe_embed_img/", {
                id: b
            }, function(b) {
                var c;
                b.status === 200 ? (c = a.indexOf("<img") + 4, a = a.substr(0, c) + " src='" + b.locker_url + "' " + a.substr(c), $("#recipe_text_area").val(a)) : $("#recipe_text_area").val("Technical difficulties. Give us a sec."), $(".recipe_embed-details").slideToggle()
            })), setTimeout(function() {
                $(window).trigger("resize"), $(".recipe_embed-code").focus()
            }, 100)
        }
    }.call(this),
    function() {
        var a, b, c, d = [].slice;
        window.IFTTT || (window.IFTTT = {}), c = function() {
            var a, b, c, e, f, g, h;
            f = arguments[0], e = arguments[1], a = 3 <= arguments.length ? d.call(arguments, 2) : [], g = "/clientlog/" + f, b = {
                type: "POST",
                global: !1
            }, c = {
                userAgent: (h = window.navigator) != null ? h.userAgent : void 0,
                logItemCount: a.length
            }, $.each(a, function(a, b) {
                try {
                    if (window.JSON && window.JSON.stringify) try {
                        c["logItem" + a] = window.JSON.stringify(b);
                        if (typeof c["logItem" + a] == "undefined") throw "trySomethingElse";
                        return !0
                    } catch (d) {
                        null
                    }
                    return c["logItem" + a] = "" + b
                } catch (d) {
                    return c["logItem" + a] = "(Could not turn information item of type '" + typeof b + "' into JSON or a string.)"
                }
            });
            try {
                c.name = "" + e
            } catch (i) {
                c.name = "ClientLogCallLackedStringName"
            }
            return window.console && console.log("remote log", f, e, c), b.data = c, $.ajax(g, b), !0
        }, a = function() {
            var a, b;
            return b = arguments[0], a = 2 <= arguments.length ? d.call(arguments, 1) : [], c.apply(null, ["error", b].concat(d.call(a)))
        }, b = function() {
            var a, b;
            return b = arguments[0], a = 2 <= arguments.length ? d.call(arguments, 1) : [], c.apply(null, ["info", b].concat(d.call(a)))
        }, IFTTT.ClientLog = {
            error: a,
            info: b
        }
    }.call(this),
    function() {
        var a;
        a = function() {
            var a, b, c, d;
            return a = $(".report_module_content--bar_chart_entry"), b = parseInt($(".report_module_content--bar_chart_entry--bar").first().css("max-height")) - 10, c = 0, d = 0, a.each(function() {
                var a;
                a = parseInt($(this).data("weigth"));
                if (a > c) return c = a
            }), d = c, a.each(function() {
                var a;
                a = parseInt($(this).data("weigth"));
                if (a < d) return d = a
            }), a.each(function() {
                var a, d, e;
                return e = parseInt($(this).data("weigth")), d = b * e / c, a = b - d, $(this).css({
                    "padding-top": "" + a + "px"
                }), $(this).find(".report_module_content--bar_chart_entry--bar").height(d)
            })
        }, $(function() {
            if ($(".report_module_content--bar_chart_entry").size()) return a()
        })
    }.call(this),
    function(a) {
        a.simple_poll = function(b, c) {
            a.isFunction(b) && (c = b, b = 1e3),
                function d() {
                    setTimeout(function() {
                        c(d)
                    }, b), b *= 1.01
                }()
        }
    }($),
    function() {
        "strict mode";
        var a = {
            initialize: function() {
                var a = this,
                    b = _.escape(window.location.search);
                Object.defineProperty(a.tabState, "url", {
                    get: function() {
                        return a.Utils.buildTabURL(a.tabState.tab)
                    }
                }), Object.defineProperty(a.tabState, "urlForHistory", {
                    get: function() {
                        return a.tabState.url + b
                    }
                }), $("[data-tab-target-content]").on("click", function(b) {
                    var c = $(this).data("tab-target-content");
                    a.tabState.tab = c, a.activateTab(), a.pushHistory()
                }), window.onpopstate = a.popHistory.bind(this)
            },
            tabState: {
                tab: undefined,
                page: undefined
            },
            pushHistory: function() {
                window.history && window.history.pushState && window.history.pushState(this.tabState, null, this.tabState.urlForHistory)
            },
            popHistory: function(a) {
                a.state !== null && (this.tabState = a.state, this.activateTab())
            },
            activateTab: function() {
                tab = this.tabState.tab, $(".recipe-list__nav-tab").removeClass("is-current"), $('.recipe-list__nav-tab[data-tab-target-content="' + tab + '"]').addClass("is-current"), $(".recipe-list").hide().siblings("#" + tab).show();
                if (!window.history || !window.history.pushState) window.location.hash = a.tabState.tab;
                this.adjustPaginatedLinksForTabs(tab)
            },
            adjustPaginatedLinksForTabs: function(a) {
                var b = this,
                    c = function(a, c) {
                        var d = c.href.split("?")[1];
                        $(c).attr("href", [b.tabState.url, d].join("?"))
                    },
                    d = $(".pagination a");
                $.each(d, c)
            },
            initializeTabsOnUserShowPage: function() {
                this.initialize(), this.tabState.page = "users#show";
                var a = this.parseURLForInitialTabName();
                this.tabState.tab = a === undefined ? "shared" : a, this.activateTab(), this.pushHistory(), this.fancyScroll()
            },
            initializeTabsOnRecipeIndexPage: function() {
                this.initialize(), this.tabState.page = "recipes#index";
                var a = this.parseURLForInitialTabName();
                this.tabState.tab = a === undefined ? $(".is-current").data("tab-target-content") : a, this.activateTab(), this.pushHistory(), this.fancyScroll()
            },
            parseURLForInitialTabName: function() {
                var b = a.Utils.tabNameFromLegacyHashURL();
                return b === undefined && (b = this.PageSpecificURLhandlers[this.tabState.page].tabNameInURL()), b
            },
            fancyScroll: function() {
                var a = this.Utils.hashifyQueryString(_.escape(window.location.search));
                if (a.hasOwnProperty("channel")) {
                    var b = $(".recipe-list__header").offset().top - 25;
                    $(window).scrollTop(b)
                } else $(window).scrollTop(0)
            }
        };
        a.Utils = {
            hashifyQueryString: function(a) {
                a[0] === "?" && (a = a.slice(1));
                var b = {},
                    c = a.split("&"),
                    d, e, f;
                for (var g = 0; g < c.length; g++) d = c[g].split("="), e = d[0], f = d[1], b[e] = f;
                return b
            },
            tabNameFromLegacyHashURL: function() {
                var a = _.escape(window.location.hash.slice(1));
                return a === "" ? undefined : a
            },
            buildTabURL: function(b) {
                var c = a,
                    d = c.PageSpecificURLhandlers[c.tabState.page];
                return d.buildTabURL(b)
            },
            cleanedURL: function(a) {
                var b = a.split("?")[0].split("#")[0];
                return b = b.slice(-1) === "/" ? b.slice(0, -1) : b, b
            }
        }, a.PageSpecificURLhandlers = {}, a.PageSpecificURLhandlers["users#show"] = {
            TAB_MATCHER: /p\/\w+\/(\w+)/,
            tabNameInURL: function() {
                var b = a,
                    c = _.escape(b.Utils.cleanedURL(window.location.href)),
                    d = c.match(this.TAB_MATCHER);
                return d === null ? undefined : d[1]
            },
            buildTabURL: function(b) {
                var c = a,
                    d, e, f;
                return f = _.escape(c.Utils.cleanedURL(window.location.href)), e = f.match(this.TAB_MATCHER), e === null ? d = [f, b].join("/") : d = f.replace(/(\w+)$/, b), d
            }
        }, a.PageSpecificURLhandlers["recipes#index"] = {
            TAB_MATCHER: /recipes\/(\w+)/,
            tabNameInURL: function() {
                var b = a,
                    c = _.escape(b.Utils.cleanedURL(window.location.href)),
                    d = c.match(this.TAB_MATCHER);
                return d === null ? undefined : d[1]
            },
            buildTabURL: function(b) {
                var c = a,
                    d, e, f;
                return f = _.escape(c.Utils.cleanedURL(window.location.href)), e = f.match(this.TAB_MATCHER), e === null ? d = [f, b].join("/") : d = f.replace(/(\w+)$/, b), d
            }
        }, window.tabHandling = a
    }(),
    function() {
        var a, b, c;
        window.IFTTT || (window.IFTTT = {}), c = function(a, b) {
            var c;
            if (!(parseInt(a.css("min-height")) > 0)) return !1;
            a.removeClass(b.join(" ")), c = _.clone(b);
            while (c.length) {
                a.removeClass(b.join(" ")), a.addClass(c.pop());
                if (Math.ceil(a.height()) <= parseInt(a.css("min-height"))) return !0
            }
        }, b = function(a) {
            var b, c;
            if (!(parseInt(a.css("min-height")) > 0)) return !1;
            c = a.data("max_font_size") || 36, b = a.data("min_font_size") || 8, a.css("font-size", "" + c + "px");
            while (c >= b) {
                if (a.height() <= parseInt(a.css("min-height"))) return a.addClass("-js-text_sized"), !0;
                c -= 1, a.css("font-size", "" + c + "px")
            }
        }, window.IFTTT.text_sizer = function(a) {
            var d, e;
            return d = a ? $(a) : Error("A target is needed"), e = d.data("steps") ? d.data("steps").split(",") : !1, e ? d.size() === 1 ? c(d, e) : d.each(function() {
                return c($(this), e)
            }) : d.size() === 1 ? b(d) : d.each(function() {
                return b($(this))
            }), d
        }, window.IFTTT.bind_text_sizer = a = function(a) {
            var b;
            return a == null && (a = ".js-text_sizer"), setTimeout(function() {
                return window.IFTTT.text_sizer($(a))
            }, 100), typeof _ != "undefined" && _ !== null ? (b = _.throttle(function() {
                return window.IFTTT.text_sizer($(a))
            }, 500, {
                trailing: !1
            }), $(window).resize(b)) : $(window).resize(function() {
                return window.IFTTT.text_sizer($(a))
            })
        }, window.jQuery !== void 0 && $(function() {
            return a()
        })
    }.call(this),
    function() {
        var a, b, c, d, e, f, g, h;
        c = null, h = null, g = function() {
                return h.val() === "true"
            },
            a = function() {
                return h.val(g() ? "false" : "true")
            }, window.replaceFormFromAjax = function(a) {
                return c.html(a)
            }, b = function() {
                if (!g()) return f()
            }, f = function() {
                var b;
                return b = function() {
                    if (g() === !1) return $(".elastic").trigger("update"), $(window).trigger("resize"), setTimeout(function() {
                        return $(window).trigger("renderComponents", "showSharedRecipeHiddenFields"), $(".recipe-page_shared").removeClass("-js-simple_recipe")
                    }, 100), a()
                }, $(".simple-recipe-field_hidden-field, .t-or-a-fields-heading").slideDown({
                    duration: 450,
                    ease: "easeOutQuad",
                    complete: b
                })
            }, d = function() {
                return $(".recipe-page_shared").addClass("-js-simple_recipe"), $(".simple-recipe-field_hidden-field, .t-or-a-fields-heading").slideUp({
                    duration: 450,
                    ease: "easeOutQuad"
                }), a()
            }, e = function(a) {
                var b, c, e, h;
                return a.preventDefault(), e = $("#recipe_to_statement_container_parent").offset().top, h = Math.abs(e - window.scrollY) / 3 * 2, c = function() {
                    return g() ? typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(d) : d() : typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(f) : f()
                }, b = function() {
                    return window.scrollY > e ? $("body").animate({
                        scrollTop: e
                    }, h, "easeInCubic", c) : c()
                }, typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(b) : b()
            }, $(function() {
                c = $("#recipe_to_statement_container"), h = $("#showing_advanced_options"), $("body").on("click", ".recipe_page--toggle_hidden_fields", e);
                if ($("#iftttMapFieldHolder").size() && !$("#iftttMapFieldHolder").parents().hasClass("simple-recipe-field_hidden-field")) return $(window).trigger("renderComponents", "directRender")
            })
    }.call(this),
    function() {
        var a, b, c, d;
        b = ($(document).height() - $(window).height()) / 2, d = function() {
            return b = ($(document).height() - $(window).height()) / 2
        }, a = function() {
            return window.scrollY > b ? $(".l-page-footer").closest("body").addClass("-js_black_footer") : $(".l-page-footer").closest("body").removeClass("-js_black_footer")
        }, c = _.throttle(a, 50), $(function() {
            return $(window).scroll(c), $(window).resize(d), a()
        })
    }.call(this),
    function() {
        (function(a) {
            return a.extend(a.fn, {
                elastic: function() {
                    var b;
                    return b = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "width", "maxWidth", "left", "top", "right", "bottom", "fontSize", "fontFamily", "fontWeight", "boxSizing", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderTopStyle", "borderTopColor", "borderRightStyle", "borderRightColor", "borderBottomStyle", "borderBottomColor", "borderLeftStyle", "borderLeftColor"], this.each(function(c) {
                        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
                        if (this.type !== "textarea") return !1;
                        if (a("html").hasClass("brwsr-opera_mini")) return !1;
                        d = a(this);
                        if (d.data("elasticApplied")) return !0;
                        d.data("elasticApplied", !0), e = a("<div class='jq-elastic-twin' />").css({
                            position: "absolute",
                            display: "none",
                            "word-wrap": "break-word",
                            "white-space": "pre-wrap"
                        }), n = parseInt(d.css("font-size").replace(/px/, ""), 10), n > 8 ? f = n : f = 16, o = d.css("line-height"), o.match(/px/) ? j = o.replace(/px/, "") : o.match(/^\d+\.?\d*$/) ? j = Math.round(o * f) : o === "normal" ? (j = Math.round(1.15 * f), window.console && console.log("Elastic: Warning: 'normal' line-height on textarea may lead to incorrect sizes")) : j = Math.round(1.2 * f), j <= 5 && (j = Math.round(1.2 * f), d.css("lineHeight", "" + j + "px")), k < 0 && (k = Number.MAX_VALUE), d.after(e), e.css("lineHeight", "" + j + "px"), g = b.length, u = d.css("boxSizing") === "border-box", s = d.innerHeight() - d.height(), m = parseInt(d.css("min-height"), 10) || Math.max(1, d.prop("rows")) * j + (u ? s : 0), k = parseInt(d.css("max-height"), 10) || Number.MAX_VALUE;
                        for (v = 0, w = b.length; v < w; v++) l = b[v], e.css(l.toString(), d.css(l.toString()));
                        return e.css("top") !== "auto" && e.css("bottom", "auto"), q = _.throttle(function() {
                            return d.trigger("fauxresize")
                        }, 50), i = "", h = "", p = function() {
                            var a, b, c;
                            a = Math.floor(parseInt(u ? d.outerWidth() : d.width(), 10)), b = Math.floor(parseInt(u ? e.outerWidth() : e.width(), 10)), c = "" + b + " to " + a;
                            if (b !== a && i !== c) return e.css({
                                width: "" + a + "px"
                            }), e.css({
                                width: "" + a + "px !important"
                            }), i = c, t(!0)
                        }, t = function(a) {
                            var b, c, f, g, i, j, l;
                            l = d.val().replace(/&/g, "&amp;").replace(RegExp("  ", "g"), " &nbsp;").replace(/<|>/g, "&gt;").replace(/\n/g, "<br />");
                            if (a || l !== d.data("elasticLastUsedContent")) {
                                d.data("elasticLastUsedContent", l), e[0].innerHTML = l + "&nbsp;", g = Math.round(u ? e.innerHeight() : e.height()), b = Math.round(u ? d.innerHeight() : d.height()), c = d.css("overflow"), i = g > k ? "auto" : "hidden", j = Math.round(Math.max(g, m)), j = Math.round(Math.min(j, k)), f = "" + b + " with " + c + " to " + j + " with " + i;
                                if (j !== b || c !== i || h === f) return h = f, d.css({
                                    height: j + "px",
                                    overflow: i
                                }), q()
                            }
                        }, d.css({
                            overflow: "hidden"
                        }), d.bind("keyup change cut paste", function() {
                            return t()
                        }), r = _.throttle(p, 100), a(window).bind("resize", _.debounce(function(a) {
                            if (a.target === window) return r()
                        }, 200)), d.bind("resize", r), d.bind("update", _.throttle(t, 100)), d.bind("input paste", function(a) {
                            return setTimeout(t, 250)
                        }), t(!0)
                    })
                }
            })
        })(this.jQuery || this.Zepto)
    }.call(this),
    function() {
        $.fn.selectRange = function(a, b) {
            return this.each(function() {
                var c;
                if (this.setSelectionRange) return this.focus(), this.setSelectionRange(a, b);
                if (this.createTextRange) return c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()
            })
        }, $.fn.moveCursorTo = function(a) {
            return this.each(function() {
                var b, c;
                return b = void 0, c = $(this).val().length, a < 0 ? b = Math.max(0, c + 1 + a) : b = Math.min(c, a), $(this).selectRange(b, b)
            })
        }, $.fn.positionCaretAtEndIfNeverFocused = function() {
            return this.each(function() {
                var a;
                return a = $(this), a.data("previouslyFocused") ? !0 : a.moveCursorTo(-1)
            })
        }, $.fn.trackIfNeverFocused = function() {
            var a;
            return a = "focus.trackIfNeverFocused", this.each(function() {
                var b;
                return b = $(this), b.data("previouslyFocused") !== undefined ? !0 : (b.data("previouslyFocused", !1), b.bind(a, function() {
                    return $(this).unbind(a).data("previouslyFocused", !0)
                }))
            })
        }
    }.call(this), $(document).ready(function() {
        $(window).resize(function() {
            $(".action_field textarea").trigger("fauxresize")
        }), $("body").on("change", '[data-submit-on="change"]', function() {
            $(this).submit()
        }), $("body").on("click", ".shared-recipe-favorite, .shared-recipe-favorite .icon", function(a) {
            a.stopImmediatePropagation();
            var b;
            $(this).hasClass("icon") ? b = $(this).parent(".shared-recipe-favorite") : b = $(a.target);
            var c = parseInt(b.attr("data-recipe-id")),
                d = b.attr("data-favorite").toString() === "true",
                e = b.children("span");
            e.fadeOut("fast"), toggleFavoriteRecipe(c, d, function() {
                var a = b.parents(".shared-recipe-in-list");
                d ? (b.removeClass("favorite not-favorite").addClass("not-favorite"), e.removeClass("icon-heart-on").addClass("icon-heart-off").fadeIn("fast"), Recipe.markAsNotFavorite(c), b.data("favorite", !1), a.removeClass("is-favorite").addClass("is-not-favorite")) : (b.removeClass("favorite not-favorite").addClass("favorite"), e.removeClass("icon-heart-off").addClass("icon-heart-on").fadeIn("fast"), Recipe.markAsFavorite(c), b.data("favorite", !0), a.removeClass("is-not-favorite").addClass("is-favorite"))
            }), setTimeout(function() {
                e.fadeIn("fast")
            }, 2e3)
        }), $("body").on("click", ".recipe-desc__stats_item__favorites-count, .stats_item__favorites-count", function(a) {
            a.stopImmediatePropagation();
            var b = $(this).closest("[data-favoritable]"),
                c = b.data("recipe-id"),
                d = b.attr("data-favorite").toString() === "true";
            toggleFavoriteRecipe(c, d, function() {
                d ? Recipe.makeNotFavorite(c) : Recipe.makeFavorite(c)
            })
        }), $(".filter_sort input, .filter_sort select, .filter_advance input, .filter_advance select").change(function(a) {
            $("form").submit(), $('input[type="submit"]').attr("disabled", "disabled")
        }), handleEmptySearches()
    }), $(document).ready(function() {
        $(".recipe__share-button").on("click", function(a) {
            $(this).data("popup") && (a.preventDefault(), window.open($(this).attr("href"), "sharer", "width=626,height=436"))
        })
    }), $(document).ready(function() {
        $("body").on("click", "[data-track-event]", function() {
            var a = $(this).attr("data-track-event"),
                b = $(this).attr("data-track-data");
            sendToDc(a, b)
        })
    }), Recipe = {
        makeFavorite: function(a) {
            Recipe.markAsFavorite(a), Recipe.setButtonAsFavorite(a)
        },
        makeNotFavorite: function(a) {
            Recipe.markAsNotFavorite(a), Recipe.setButtonAsNotFavorite(a)
        },
        setAllDataFavoriteValues: function(a, b) {
            $("[data-recipe-id=" + a + "][data-favorite]").attr("data-favorite", b)
        },
        increaseFavoriteCount: function(a) {
            var b = Recipe.getFavoriteCount(a);
            Recipe.setFavoriteCounts(a, parseInt(b, 10) + 1)
        },
        decreaseFavoriteCount: function(a) {
            var b = Recipe.getFavoriteCount(a);
            Recipe.setFavoriteCounts(a, parseInt(b, 10) - 1)
        },
        setButtonAsFavorite: function(a) {
            $(".shared-recipe-favorite.btn-square-icon").removeClass("favorite not-favorite").addClass("favorite"), $(".icon-heart-on, .icon-heart-off").removeClass("icon-heart-on icon-heart-off").addClass("icon-heart-on"), $(".shared-recipe-favorite[data-recipe-id=" + a + "]").attr("data-favorite", !0)
        },
        setButtonAsNotFavorite: function(a) {
            $(".shared-recipe-favorite.btn-square-icon").removeClass("favorite not-favorite").addClass("not-favorite"), $(".icon-heart-on, .icon-heart-off").removeClass("icon-heart-on icon-heart-off").addClass("icon-heart-off"), $(".shared-recipe-favorite[data-recipe-id=" + a + "]").attr("data-favorite", !1)
        },
        markAsFavorite: function(a) {
            Recipe.setAllDataFavoriteValues(a, !0), Recipe.increaseFavoriteCount(a), $(".recipe-desc__stats_item__icon--favorites", ".recipe-desc__stats_item__favorites-count[data-recipe-id=" + a + "]").addClass("favorited"), $(".stats_item_icon--heart").addClass("favorited")
        },
        markAsNotFavorite: function(a) {
            Recipe.setAllDataFavoriteValues(a, !1), Recipe.decreaseFavoriteCount(a), $(".recipe-desc__stats_item__icon--favorites", ".recipe-desc__stats_item__favorites-count[data-recipe-id=" + a + "]").removeClass("favorited"), $(".stats_item_icon--heart").removeClass("favorited")
        },
        getFavoriteCount: function(a) {
            return $(".stats_item__favorites-count__number", "[data-recipe-id=" + a + "]").first().text()
        },
        setFavoriteCounts: function(a, b) {
            $(".stats_item__favorites-count__number", "[data-recipe-id=" + a + "]").text(b);
            var c = "favorite";
            b != 1 && (c += "s"), $(".recipe-desc__stats_item__favorites-count__label", "[data-recipe-id=" + a + "]").text(c)
        }
    },
    function() {
        var a;
        window.ifttt_js_debug = !1, $(document).on("click", ".shared-link-field", function(a) {
            return a.target.focus(), a.target.select()
        }), (a = IFTTT.Menu) != null && a.wireUp(), IFTTT.DoAfterHtmlInsert = function() {
            var a;
            return IFTTT.Channel.ensureIconsHaveCorrectColor(), $(".elastic").size() > 0 && $(".elastic").elastic(), typeof(a = $("input")).placeholder == "function" && a.placeholder(), !0
        }, $(document).on("ajaxComplete", IFTTT.DoAfterHtmlInsert), $(function() {
            return IFTTT.DoAfterHtmlInsert()
        })
    }.call(this), $.cookie = function(a, b, c) {
        if (arguments.length > 1 && String(b) !== "[object Object]") {
            c = $.extend({}, c);
            if (b === null || b === undefined) c.expires = -1;
            if (typeof c.expires == "number") {
                var d = c.expires,
                    e = c.expires = new Date;
                e.setDate(e.getDate() + d)
            }
            return b = String(b), document.cookie = [encodeURIComponent(a), "=", c.raw ? b : encodeURIComponent(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
        }
        c = b || {};
        var f, g = c.raw ? function(a) {
            return a
        } : decodeURIComponent;
        return (f = (new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)")).exec(document.cookie)) ? g(f[1]) : null
    },
    function(a) {
        a.fn.fitText = function(b, c) {
            var d = b || 1,
                e = a.extend({
                    minFontSize: Number.NEGATIVE_INFINITY,
                    maxFontSize: Number.POSITIVE_INFINITY
                }, c);
            return this.each(function() {
                var b = a(this),
                    c = function() {
                        b.css("font-size", Math.max(Math.min(b.width() / (d * 10), parseFloat(e.maxFontSize)), parseFloat(e.minFontSize)))
                    };
                c(), a(window).on("resize.fittext orientationchange.fittext", c)
            })
        }
    }(jQuery),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
        window.IFTTT || (window.IFTTT = {}), IFTTT.recipes || (IFTTT.recipes = {}), IFTTT.recipes.resizeRecipeVisual = u = function() {
            return $(".recipe-personal.recipe-small").not(".-is_do_statement").each(function() {
                var a, b, c, d, e, f, g;
                return a = $(this).find(".recipe_action"), $(this).find(".recipe_if").css({
                    "margin-left": ""
                }), a.css({
                    "padding-right": ""
                }), e = $(this).offset().left + $(this).outerWidth(!0), d = a.offset().left + a.outerWidth(!0), c = Math.floor((e - d) / 2), $(this).find(".recipe_if").css({
                    "margin-left": "" + c + "px"
                }), $(".brwsr-ie").size() > 0 || (b = 16, g = $(this).find(".recipe_trigger").outerWidth(!0) + $(this).find(".recipe_trigger").offset().left - $(this).offset().left, f = $(this).offset().left + $(this).outerWidth(!0) - $(this).find(".recipe_then").offset().left, $(this).parent().find(".t_and_a_trigger").css({
                    width: "" + (g - 2) + "px",
                    "margin-right": "" + b + "px"
                }), $(this).parent().find(".t_and_a_action").css({
                    width: "" + f + "px"
                })), $(this).addClass("-js-sized")
            }), $(".recipe-personal.recipe-small.-is_do_statement").each(function() {
                return $(this).addClass("-js-sized")
            })
        }, d = function() {
            var a, b, c;
            return b = $(".recipe-personal.recipe-small").size() > 0 ? !0 : !1, b && u(), a = function() {
                if (b) return u()
            }, c = _.throttle(a, 50, {
                leading: !1
            }), window.addEventListener("resize", c), !1
        }, b = function() {
            return $("body").on("focus", ".action_field textarea", function() {
                return $(this).parents().eq(1).find(".show-ingredient-btn, .action_field_addin-pop-button").addClass("-js_visible")
            }), $("html").hasClass("is-webview") ? $(".action_field textarea").off("blur").on("blur", function() {
                var a, b = this;
                return a = function() {
                    if (!$(document.activeElement).parent().hasClass("-js_visible")) return $(b).parents().eq(1).find(".show-ingredient-btn").removeClass("-js_visible")
                }, setTimeout(a, 150)
            }) : ($("body").on("blur", ".action_field textarea", function(a) {
                var b, c;
                return b = $(a.currentTarget), c = function() {
                    return IFTTT.recipes.shouldHideIngredientsButton && b.parents().eq(1).find(".action_field_addin-pop-button, .show-ingredient-btn").removeClass("-js_visible"), IFTTT.recipes.shouldHideIngredientsButton = !0
                }, IFTTT.recipes.hideIngredientsButtonTimeout != null && clearTimeout(IFTTT.recipes.hideIngredientsButtonTimeout), IFTTT.recipes.hideIngredientsButtonTimeout = setTimeout(c, 150)
            }), IFTTT.recipes.shouldHideIngredientsButton = !0, IFTTT.recipes.hideIngredientsButtonTimeout = null, $("body").on("click", ".action_field_addin-pop-button", function() {
                return IFTTT.recipes.shouldHideIngredientsButton = !1
            }))
        }, h = function() {
            var a, b, c;
            b = $(".recipe-desc_counter").data("maxchars"), a = $($(".recipe-desc_counter").data("target")).val().length, a <= b && a > 0 ? (c = b - a, $(".recipe-desc_counter-number").removeClass("red").text(c), $(".recipe-desc_counter-minus").remove()) : a > b ? (c = a - b, $(".recipe-desc_counter-number").addClass("red").text(c), $(".recipe-desc_counter-minus").size() || $(".recipe-desc_counter-number").parent().prepend('<span class="recipe-desc_counter-minus">-</span>')) : ($(".recipe-desc_counter-number").removeClass("red").text(b), $(".recipe-desc_counter-minus").remove())
        }, v = function() {
            return $(".recipe-page_desc-helptext").width($(".recipe-edit-desc").outerWidth())
        }, IFTTT.recipes.bindRecipeDescriptionCounter = function() {
            return $(".recipe-desc_counter").data("binded", !0), v(), $(window).on("resize orientationchange", v), $($(".recipe-desc_counter").data("target")).on("keyup onpaste", h), $($(".recipe-desc_counter").data("target")).on("focus", function() {
                return $(".recipe-desc_counter").addClass("show")
            }), $($(".recipe-desc_counter").data("target")).on("blur", function() {
                if (!$(".recipe-desc_counter-number").hasClass("red")) return $(".recipe-desc_counter").removeClass("show")
            }), h()
        }, IFTTT.recipes.ajaxForceRun = function(a, b) {
            return $.ajax({
                url: b,
                type: "GET",
                dataType: "json",
                success: function(b) {
                    if (b.error) return IFTTT.notifications.showNotification({
                        isError: !0,
                        message: b.error
                    });
                    IFTTT.notifications.showNotification({
                        isError: !1,
                        message: b.notice
                    });
                    if (b.notice.match(/Recipe checked/) && b.triggered_count > 0) return a.find(".personal-recipe-manage_stats_info .stat_item").last().text("run " + b.triggered_count + " times")
                },
                error: function() {
                    return IFTTT.notifications.showNotification({
                        isError: !0,
                        message: "Problem running Recipe"
                    })
                }
            })
        }, IFTTT.recipes.bindAjaxForceRun = function(a) {
            return a == null && (a = '.control_link a[title="Check Recipe now"]'), $(a).off().on("click", function(a) {
                var b;
                return a.preventDefault(), b = $(a.currentTarget).parents().eq(3), IFTTT.recipes.ajaxForceRun(b, a.currentTarget.href)
            })
        }, m = !1, l = function() {
            return m = !1, $(this).removeClass("-js_show_caption")
        }, w = function() {
            var a;
            return $(this).addClass("-js_show_caption"), a = this, m && clearTimeout(m), m = setTimeout(function() {
                return l.call(a)
            }, 3e3)
        }, e = function() {
            return $(".l-appviews").on("click", ".do_visual--trigger_icon.-js_has_caption", function(a) {
                return a.preventDefault, w.call(this)
            })
        }, g = function() {
            var a, b, c;
            return $(this).parents().eq(3).hasClass("recipe-tiny") || (a = $(this).attr("class").match(/(-do_icons)(_sm)*(-\w*)/), a ? (c = $(window).width() < 720 ? "_sm" : "", b = a[1] + c + a[3], a !== b && $(this).removeClass(a[0]).addClass(b)) : (a = $(this).attr("class").match(/(-do_icons)(_mid)*(-\w*)/), c = $(window).width() < 720 ? "_mid" : "", b = a[1] + c + a[3], a !== b && $(this).removeClass(a[0]).addClass(b))), $(this).addClass("-js-sized")
        }, IFTTT.recipes.bindDoIconResize = function() {
            var a;
            return a = _.throttle(function() {
                return $(".do_visual--trigger_icon").each(g)
            }, 200), $(window).on("resize", a), $(".do_visual--trigger_icon").each(g)
        }, r = function() {
            var a;
            return a = $("html").width() - $(window).width(), $(window).width() < $("html").width() ? $(".recipe-featured-star.-big").css({
                right: "-" + a + "px"
            }) : $(".recipe-featured-star.-big").css({
                right: ""
            })
        }, a = function() {
            if ($(".statement_do_manage--statement_visual").size()) return $(".statement_do_manage--statement_visual").on("click", function() {
                var a;
                return a = $(this).attr("id").match(/(\d+)$/), $("#do_statement_replace_id_" + a).click()
            })
        }, IFTTT.recipes.onRecipesLoaded = function(a, b) {
            return setTimeout(function() {
                return picturefill()
            }, 250), $(window).trigger("resize"), j(b) ? $(a.additionalData.buttonSelector).text($(a.additionalData.buttonSelector).data("default-text")).removeClass("is-disabled") : $(a.additionalData.buttonSelector).text($(a.additionalData.buttonSelector).data("default-text")).addClass("-hidden")
        }, j = function(a) {
            var b;
            return a ? a.indexOf("<body") >= 0 ? a.indexOf("load_more_btn") > 0 : (b = $("<div/>").append(a), b.find(".recipe-list .pagination").size() > 0) : !1
        }, IFTTT.recipes.beforeLoadingRecipes = function(a) {
            if (a) return $(a.additionalData.buttonSelector).data(a.additionalData.loadMoreBtnData)
        }, c = function() {
            return $(document).on("click", ".load_more_btn", p)
        }, IFTTT.recipes.onFirstRecipesLoad = function(a, b) {
            var d;
            return d = $(".load_more_btn"), j(b) ? (d.text(d.data("default-text")).removeClass("is-disabled"), d.removeClass("-hidden")) : d.text(d.data("default-text")).addClass("-hidden"), $(".do_visual--trigger_icon").not(".-js_no_sizing").size() && IFTTT.recipes.bindDoIconResize(), i() ? c() : t().html(f())
        }, s = function() {
            return $(".recipe-list .l-compact-shared-recipes")
        }, t = function() {
            return $(".recipe-list")
        }, k = function() {
            return _.any(s().children())
        }, o = function() {
            var a, b, c, d, e, f, g;
            return c = k(), c || s().append(q()), a = $(".load_more_btn"), a.addClass("-hidden"), f = window.location.search, b = e = "" + window.location.pathname + f + (f.length > 0 ? "&" : "?") + "page=1", g = a.data("cl-target"), d = {
                after: "IFTTT.recipes.onFirstRecipesLoad",
                contentFromSelector: a.data("cl-content-from-selector"),
                rewriteCurrentState: !1,
                silent: !0
            }, a.text(a.data("loading-text")).addClass("is-disabled"), c ? IFTTT.contentLoader.loadAndAppend(b, g, d, !1) : IFTTT.contentLoader.loadAndReplace(b, g, d, !1)
        }, p = function() {
            var a, b, c, d, e, f, g, h, i, j, k, l, m;
            return a = $(".load_more_btn"), e = a.data("current-page"), l = a.data("remaining-pages"), c = a.data("cl-content-from-selector"), m = a.data("cl-target"), f = a.data("has-next-page"), l > 0 || f ? (g = e + 1, k = window.location.search, j = "" + window.location.pathname + k + (k.length > 0 ? "&" : "?") + "page=", d = "" + j + g, i = "" + window.location.pathname + k, b = {
                "remaining-pages": l - 1,
                "current-page": g
            }, a.data(b), h = {
                after: "IFTTT.recipes.onRecipesLoaded",
                before: "IFTTT.recipes.beforeLoadingRecipes",
                contentFromSelector: c,
                rewriteCurrentState: !0,
                updateAddress: i,
                additionalData: {
                    loadMoreBtnData: b,
                    buttonSelector: ".load_more_btn"
                }
            }, n() && (h.silent = !0), a.text(a.data("loading-text")).addClass("is-disabled"), IFTTT.contentLoader.loadAndAppend(d, m, h)) : a.text(a.data("default-text")).addClass("-hidden")
        }, n = function() {
            return window.location.toString().indexOf("recipes/search") > 0
        }, i = function() {
            return k()
        }, q = function() {
            return '<section class="l-search_suggest-featured recipes-state" style="float: none; width: 100%; padding-top:100px;">\n  <h3 class="fill-with-short-text">\n    Loading...\n  </h3>\n</section>'
        }, f = function() {
            return '<section class="l-search_suggest-featured recipes-state" style="float: none; width: 100%; padding-top:100px;">\n  <h3 class="fill-with-short-text">\n    We couldn\'t find any Recipes that matched your search.\n  </h3>\n</section>'
        }, typeof window.recipesScriptsBinded == "undefined" && (window.recipesScriptsBinded = !0, $(function() {
            var f, g;
            $($(".recipe-desc_counter").data("target")).size() && !$(".recipe-desc_counter").data("binded") && IFTTT.recipes.bindRecipeDescriptionCounter(), $(".do_visual--trigger_icon").not(".-js_no_sizing").size() && IFTTT.recipes.bindDoIconResize(), $(window).resize(r), r(), a(), $('.control_link a[title="Check Recipe now"]').size() > 0 && IFTTT.recipes.bindAjaxForceRun(), d(), e(), $(".simple-recipe_hide-label-wrapper").size() > 0 && (g = function(a) {
                if ($(a.target).is(this)) return $(this).children("input[type=checkbox]").click()
            }, $(".simple-recipe_hide-label-wrapper").off("mouseup").on("mouseup", g)), b(), f = $(".load_more_btn");
            if (f.size() > 0) return !n() && IFTTT.contentLoader.isHistoryStateAndContentValid() === !1 ? o() : f.data("has-next-page") ? (f.removeClass("-hidden"), c()) : f.text(f.data("default-text")).addClass("-hidden")
        }))
    }.call(this),
    function(a) {
        function b(a, b, c) {
            switch (arguments.length) {
                case 2:
                    return null != a ? a : b;
                case 3:
                    return null != a ? a : null != b ? b : c;
                default:
                    throw new Error("Implement me")
            }
        }

        function c(a, b) {
            return zb.call(a, b)
        }

        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function e(a) {
            tb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
        }

        function f(a, b) {
            var c = !0;
            return m(function() {
                return c && (e(a), c = !1), b.apply(this, arguments)
            }, b)
        }

        function g(a, b) {
            qc[a] || (e(b), qc[a] = !0)
        }

        function h(a, b) {
            return function(c) {
                return p(a.call(this, c), b)
            }
        }

        function i(a, b) {
            return function(c) {
                return this.localeData().ordinal(a.call(this, c), b)
            }
        }

        function j() {}

        function k(a, b) {
            b !== !1 && F(a), n(this, a), this._d = new Date(+a._d)
        }

        function l(a) {
            var b = y(a),
                c = b.year || 0,
                d = b.quarter || 0,
                e = b.month || 0,
                f = b.week || 0,
                g = b.day || 0,
                h = b.hour || 0,
                i = b.minute || 0,
                j = b.second || 0,
                k = b.millisecond || 0;
            this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = tb.localeData(), this._bubble()
        }

        function m(a, b) {
            for (var d in b) c(b, d) && (a[d] = b[d]);
            return c(b, "toString") && (a.toString = b.toString), c(b, "valueOf") && (a.valueOf = b.valueOf), a
        }

        function n(a, b) {
            var c, d, e;
            if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), "undefined" != typeof b._locale && (a._locale = b._locale), Ib.length > 0)
                for (c in Ib) d = Ib[c], e = b[d], "undefined" != typeof e && (a[d] = e);
            return a
        }

        function o(a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        }

        function p(a, b, c) {
            for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;) d = "0" + d;
            return (e ? c ? "+" : "" : "-") + d
        }

        function q(a, b) {
            var c = {
                milliseconds: 0,
                months: 0
            };
            return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
        }

        function r(a, b) {
            var c;
            return b = K(b, a), a.isBefore(b) ? c = q(a, b) : (c = q(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
        }

        function s(a, b) {
            return function(c, d) {
                var e, f;
                return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = tb.duration(c, d), t(this, e, a), this
            }
        }

        function t(a, b, c, d) {
            var e = b._milliseconds,
                f = b._days,
                g = b._months;
            d = null == d ? !0 : d, e && a._d.setTime(+a._d + e * c), f && nb(a, "Date", mb(a, "Date") + f * c), g && lb(a, mb(a, "Month") + g * c), d && tb.updateOffset(a, f || g)
        }

        function u(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }

        function v(a) {
            return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
        }

        function w(a, b, c) {
            var d, e = Math.min(a.length, b.length),
                f = Math.abs(a.length - b.length),
                g = 0;
            for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && A(a[d]) !== A(b[d])) && g++;
            return g + f
        }

        function x(a) {
            if (a) {
                var b = a.toLowerCase().replace(/(.)s$/, "$1");
                a = jc[a] || kc[b] || b
            }
            return a
        }

        function y(a) {
            var b, d, e = {};
            for (d in a) c(a, d) && (b = x(d), b && (e[b] = a[d]));
            return e
        }

        function z(b) {
            var c, d;
            if (0 === b.indexOf("week")) c = 7, d = "day";
            else {
                if (0 !== b.indexOf("month")) return;
                c = 12, d = "month"
            }
            tb[b] = function(e, f) {
                var g, h, i = tb._locale[b],
                    j = [];
                if ("number" == typeof e && (f = e, e = a), h = function(a) {
                        var b = tb().utc().set(d, a);
                        return i.call(tb._locale, b, e || "")
                    }, null != f) return h(f);
                for (g = 0; c > g; g++) j.push(h(g));
                return j
            }
        }

        function A(a) {
            var b = +a,
                c = 0;
            return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
        }

        function B(a, b) {
            return (new Date(Date.UTC(a, b + 1, 0))).getUTCDate()
        }

        function C(a, b, c) {
            return hb(tb([a, 11, 31 + b - c]), b, c).week
        }

        function D(a) {
            return E(a) ? 366 : 365
        }

        function E(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
        }

        function F(a) {
            var b;
            a._a && -2 === a._pf.overflow && (b = a._a[Bb] < 0 || a._a[Bb] > 11 ? Bb : a._a[Cb] < 1 || a._a[Cb] > B(a._a[Ab], a._a[Bb]) ? Cb : a._a[Db] < 0 || a._a[Db] > 23 ? Db : a._a[Eb] < 0 || a._a[Eb] > 59 ? Eb : a._a[Fb] < 0 || a._a[Fb] > 59 ? Fb : a._a[Gb] < 0 || a._a[Gb] > 999 ? Gb : -1, a._pf._overflowDayOfYear && (Ab > b || b > Cb) && (b = Cb), a._pf.overflow = b)
        }

        function G(a) {
            return null == a._isValid && (a._isValid = !isNaN(a._d.getTime()) && a._pf.overflow < 0 && !a._pf.empty && !a._pf.invalidMonth && !a._pf.nullInput && !a._pf.invalidFormat && !a._pf.userInvalidated, a._strict && (a._isValid = a._isValid && 0 === a._pf.charsLeftOver && 0 === a._pf.unusedTokens.length)), a._isValid
        }

        function H(a) {
            return a ? a.toLowerCase().replace("_", "-") : a
        }

        function I(a) {
            for (var b, c, d, e, f = 0; f < a.length;) {
                for (e = H(a[f]).split("-"), b = e.length, c = H(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                    if (d = J(e.slice(0, b).join("-"))) return d;
                    if (c && c.length >= b && w(e, c, !0) >= b - 1) break;
                    b--
                }
                f++
            }
            return null
        }

        function J(a) {
            var b = null;
            if (!Hb[a] && Jb) try {
                b = tb.locale(), require("./locale/" + a), tb.locale(b)
            } catch (c) {}
            return Hb[a]
        }

        function K(a, b) {
            return b._isUTC ? tb(a).zone(b._offset || 0) : tb(a).local()
        }

        function L(a) {
            return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
        }

        function M(a) {
            var b, c, d = a.match(Nb);
            for (b = 0, c = d.length; c > b; b++) d[b] = pc[d[b]] ? pc[d[b]] : L(d[b]);
            return function(e) {
                var f = "";
                for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
                return f
            }
        }

        function N(a, b) {
            return a.isValid() ? (b = O(b, a.localeData()), lc[b] || (lc[b] = M(b)), lc[b](a)) : a.localeData().invalidDate()
        }

        function O(a, b) {
            function c(a) {
                return b.longDateFormat(a) || a
            }
            var d = 5;
            for (Ob.lastIndex = 0; d >= 0 && Ob.test(a);) a = a.replace(Ob, c), Ob.lastIndex = 0, d -= 1;
            return a
        }

        function P(a, b) {
            var c, d = b._strict;
            switch (a) {
                case "Q":
                    return Zb;
                case "DDDD":
                    return _b;
                case "YYYY":
                case "GGGG":
                case "gggg":
                    return d ? ac : Rb;
                case "Y":
                case "G":
                case "g":
                    return cc;
                case "YYYYYY":
                case "YYYYY":
                case "GGGGG":
                case "ggggg":
                    return d ? bc : Sb;
                case "S":
                    if (d) return Zb;
                case "SS":
                    if (d) return $b;
                case "SSS":
                    if (d) return _b;
                case "DDD":
                    return Qb;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                    return Ub;
                case "a":
                case "A":
                    return b._locale._meridiemParse;
                case "X":
                    return Xb;
                case "Z":
                case "ZZ":
                    return Vb;
                case "T":
                    return Wb;
                case "SSSS":
                    return Tb;
                case "MM":
                case "DD":
                case "YY":
                case "GG":
                case "gg":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "ww":
                case "WW":
                    return d ? $b : Pb;
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                case "w":
                case "W":
                case "e":
                case "E":
                    return Pb;
                case "Do":
                    return Yb;
                default:
                    return c = new RegExp(Y(X(a.replace("\\", "")), "i"))
            }
        }

        function Q(a) {
            a = a || "";
            var b = a.match(Vb) || [],
                c = b[b.length - 1] || [],
                d = (c + "").match(hc) || ["-", 0, 0],
                e = +(60 * d[1]) + A(d[2]);
            return "+" === d[0] ? -e : e
        }

        function R(a, b, c) {
            var d, e = c._a;
            switch (a) {
                case "Q":
                    null != b && (e[Bb] = 3 * (A(b) - 1));
                    break;
                case "M":
                case "MM":
                    null != b && (e[Bb] = A(b) - 1);
                    break;
                case "MMM":
                case "MMMM":
                    d = c._locale.monthsParse(b), null != d ? e[Bb] = d : c._pf.invalidMonth = b;
                    break;
                case "D":
                case "DD":
                    null != b && (e[Cb] = A(b));
                    break;
                case "Do":
                    null != b && (e[Cb] = A(parseInt(b, 10)));
                    break;
                case "DDD":
                case "DDDD":
                    null != b && (c._dayOfYear = A(b));
                    break;
                case "YY":
                    e[Ab] = tb.parseTwoDigitYear(b);
                    break;
                case "YYYY":
                case "YYYYY":
                case "YYYYYY":
                    e[Ab] = A(b);
                    break;
                case "a":
                case "A":
                    c._isPm = c._locale.isPM(b);
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    e[Db] = A(b);
                    break;
                case "m":
                case "mm":
                    e[Eb] = A(b);
                    break;
                case "s":
                case "ss":
                    e[Fb] = A(b);
                    break;
                case "S":
                case "SS":
                case "SSS":
                case "SSSS":
                    e[Gb] = A(1e3 * ("0." + b));
                    break;
                case "X":
                    c._d = new Date(1e3 * parseFloat(b));
                    break;
                case "Z":
                case "ZZ":
                    c._useUTC = !0, c._tzm = Q(b);
                    break;
                case "dd":
                case "ddd":
                case "dddd":
                    d = c._locale.weekdaysParse(b), null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
                    break;
                case "w":
                case "ww":
                case "W":
                case "WW":
                case "d":
                case "e":
                case "E":
                    a = a.substr(0, 1);
                case "gggg":
                case "GGGG":
                case "GGGGG":
                    a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = A(b));
                    break;
                case "gg":
                case "GG":
                    c._w = c._w || {}, c._w[a] = tb.parseTwoDigitYear(b)
            }
        }

        function S(a) {
            var c, d, e, f, g, h, i;
            c = a._w, null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[Ab], hb(tb(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[Ab], hb(tb(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, g > f && ++e) : f = null != c.e ? c.e + g : g), i = ib(d, e, f, h, g), a._a[Ab] = i.year, a._dayOfYear = i.dayOfYear
        }

        function T(a) {
            var c, d, e, f, g = [];
            if (!a._d) {
                for (e = V(a), a._w && null == a._a[Cb] && null == a._a[Bb] && S(a), a._dayOfYear && (f = b(a._a[Ab], e[Ab]), a._dayOfYear > D(f) && (a._pf._overflowDayOfYear = !0), d = db(f, 0, a._dayOfYear), a._a[Bb] = d.getUTCMonth(), a._a[Cb] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c) a._a[c] = g[c] = e[c];
                for (; 7 > c; c++) a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
                a._d = (a._useUTC ? db : cb).apply(null, g), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() + a._tzm)
            }
        }

        function U(a) {
            var b;
            a._d || (b = y(a._i), a._a = [b.year, b.month, b.day, b.hour, b.minute, b.second, b.millisecond], T(a))
        }

        function V(a) {
            var b = new Date;
            return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
        }

        function W(a) {
            if (a._f === tb.ISO_8601) return void $(a);
            a._a = [], a._pf.empty = !0;
            var b, c, d, e, f, g = "" + a._i,
                h = g.length,
                i = 0;
            for (d = O(a._f, a._locale).match(Nb) || [], b = 0; b < d.length; b++) e = d[b], c = (g.match(P(e, a)) || [])[0], c && (f = g.substr(0, g.indexOf(c)), f.length > 0 && a._pf.unusedInput.push(f), g = g.slice(g.indexOf(c) + c.length), i += c.length), pc[e] ? (c ? a._pf.empty = !1 : a._pf.unusedTokens.push(e), R(e, c, a)) : a._strict && !c && a._pf.unusedTokens.push(e);
            a._pf.charsLeftOver = h - i, g.length > 0 && a._pf.unusedInput.push(g), a._isPm && a._a[Db] < 12 && (a._a[Db] += 12), a._isPm === !1 && 12 === a._a[Db] && (a._a[Db] = 0), T(a), F(a)
        }

        function X(a) {
            return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
                return b || c || d || e
            })
        }

        function Y(a) {
            return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function Z(a) {
            var b, c, e, f, g;
            if (0 === a._f.length) return a._pf.invalidFormat = !0, void(a._d = new Date(NaN));
            for (f = 0; f < a._f.length; f++) g = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._pf = d(), b._f = a._f[f], W(b), G(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
            m(a, c || b)
        }

        function $(a) {
            var b, c, d = a._i,
                e = dc.exec(d);
            if (e) {
                for (a._pf.iso = !0, b = 0, c = fc.length; c > b; b++)
                    if (fc[b][1].exec(d)) {
                        a._f = fc[b][0] + (e[6] || " ");
                        break
                    }
                for (b = 0, c = gc.length; c > b; b++)
                    if (gc[b][1].exec(d)) {
                        a._f += gc[b][0];
                        break
                    }
                d.match(Vb) && (a._f += "Z"), W(a)
            } else a._isValid = !1
        }

        function _(a) {
            $(a), a._isValid === !1 && (delete a._isValid, tb.createFromInputFallback(a))
        }

        function ab(a, b) {
            var c, d = [];
            for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
            return d
        }

        function bb(b) {
            var c, d = b._i;
            d === a ? b._d = new Date : v(d) ? b._d = new Date(+d) : null !== (c = Kb.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? _(b) : u(d) ? (b._a = ab(d.slice(0), function(a) {
                return parseInt(a, 10)
            }), T(b)) : "object" == typeof d ? U(b) : "number" == typeof d ? b._d = new Date(d) : tb.createFromInputFallback(b)
        }

        function cb(a, b, c, d, e, f, g) {
            var h = new Date(a, b, c, d, e, f, g);
            return 1970 > a && h.setFullYear(a), h
        }

        function db(a) {
            var b = new Date(Date.UTC.apply(null, arguments));
            return 1970 > a && b.setUTCFullYear(a), b
        }

        function eb(a, b) {
            if ("string" == typeof a)
                if (isNaN(a)) {
                    if (a = b.weekdaysParse(a), "number" != typeof a) return null
                } else a = parseInt(a, 10);
            return a
        }

        function fb(a, b, c, d, e) {
            return e.relativeTime(b || 1, !!c, a, d)
        }

        function gb(a, b, c) {
            var d = tb.duration(a).abs(),
                e = yb(d.as("s")),
                f = yb(d.as("m")),
                g = yb(d.as("h")),
                h = yb(d.as("d")),
                i = yb(d.as("M")),
                j = yb(d.as("y")),
                k = e < mc.s && ["s", e] || 1 === f && ["m"] || f < mc.m && ["mm", f] || 1 === g && ["h"] || g < mc.h && ["hh", g] || 1 === h && ["d"] || h < mc.d && ["dd", h] || 1 === i && ["M"] || i < mc.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
            return k[2] = b, k[3] = +a > 0, k[4] = c, fb.apply({}, k)
        }

        function hb(a, b, c) {
            var d, e = c - b,
                f = c - a.day();
            return f > e && (f -= 7), e - 7 > f && (f += 7), d = tb(a).add(f, "d"), {
                week: Math.ceil(d.dayOfYear() / 7),
                year: d.year()
            }
        }

        function ib(a, b, c, d, e) {
            var f, g, h = db(a, 0, 1).getUTCDay();
            return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
                year: g > 0 ? a : a - 1,
                dayOfYear: g > 0 ? g : D(a - 1) + g
            }
        }

        function jb(b) {
            var c = b._i,
                d = b._f;
            return b._locale = b._locale || tb.localeData(b._l), null === c || d === a && "" ===
                c ? tb.invalid({
                    nullInput: !0
                }) : ("string" == typeof c && (b._i = c = b._locale.preparse(c)), tb.isMoment(c) ? new k(c, !0) : (d ? u(d) ? Z(b) : W(b) : bb(b), new k(b)))
        }

        function kb(a, b) {
            var c, d;
            if (1 === b.length && u(b[0]) && (b = b[0]), !b.length) return tb();
            for (c = b[0], d = 1; d < b.length; ++d) b[d][a](c) && (c = b[d]);
            return c
        }

        function lb(a, b) {
            var c;
            return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), B(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
        }

        function mb(a, b) {
            return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
        }

        function nb(a, b, c) {
            return "Month" === b ? lb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
        }

        function ob(a, b) {
            return function(c) {
                return null != c ? (nb(this, a, c), tb.updateOffset(this, b), this) : mb(this, a)
            }
        }

        function pb(a) {
            return 400 * a / 146097
        }

        function qb(a) {
            return 146097 * a / 400
        }

        function rb(a) {
            tb.duration.fn[a] = function() {
                return this._data[a]
            }
        }

        function sb(a) {
            "undefined" == typeof ender && (ub = xb.moment, xb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", tb) : tb)
        }
        for (var tb, ub, vb, wb = "2.8.3", xb = "undefined" != typeof global ? global : this, yb = Math.round, zb = Object.prototype.hasOwnProperty, Ab = 0, Bb = 1, Cb = 2, Db = 3, Eb = 4, Fb = 5, Gb = 6, Hb = {}, Ib = [], Jb = "undefined" != typeof module && module.exports, Kb = /^\/?Date\((\-?\d+)/i, Lb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Mb = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Nb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Ob = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Pb = /\d\d?/, Qb = /\d{1,3}/, Rb = /\d{1,4}/, Sb = /[+\-]?\d{1,6}/, Tb = /\d+/, Ub = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Vb = /Z|[\+\-]\d\d:?\d\d/gi, Wb = /T/i, Xb = /[\+\-]?\d+(\.\d{1,3})?/, Yb = /\d{1,2}/, Zb = /\d/, $b = /\d\d/, _b = /\d{3}/, ac = /\d{4}/, bc = /[+-]?\d{6}/, cc = /[+-]?\d+/, dc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ec = "YYYY-MM-DDTHH:mm:ssZ", fc = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ], gc = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ], hc = /([\+\-]|\d\d)/gi, ic = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
                Milliseconds: 1,
                Seconds: 1e3,
                Minutes: 6e4,
                Hours: 36e5,
                Days: 864e5,
                Months: 2592e6,
                Years: 31536e6
            }), jc = {
                ms: "millisecond",
                s: "second",
                m: "minute",
                h: "hour",
                d: "day",
                D: "date",
                w: "week",
                W: "isoWeek",
                M: "month",
                Q: "quarter",
                y: "year",
                DDD: "dayOfYear",
                e: "weekday",
                E: "isoWeekday",
                gg: "weekYear",
                GG: "isoWeekYear"
            }, kc = {
                dayofyear: "dayOfYear",
                isoweekday: "isoWeekday",
                isoweek: "isoWeek",
                weekyear: "weekYear",
                isoweekyear: "isoWeekYear"
            }, lc = {}, mc = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            }, nc = "DDD w W M D d".split(" "), oc = "M D H h m s w W".split(" "), pc = {
                M: function() {
                    return this.month() + 1
                },
                MMM: function(a) {
                    return this.localeData().monthsShort(this, a)
                },
                MMMM: function(a) {
                    return this.localeData().months(this, a)
                },
                D: function() {
                    return this.date()
                },
                DDD: function() {
                    return this.dayOfYear()
                },
                d: function() {
                    return this.day()
                },
                dd: function(a) {
                    return this.localeData().weekdaysMin(this, a)
                },
                ddd: function(a) {
                    return this.localeData().weekdaysShort(this, a)
                },
                dddd: function(a) {
                    return this.localeData().weekdays(this, a)
                },
                w: function() {
                    return this.week()
                },
                W: function() {
                    return this.isoWeek()
                },
                YY: function() {
                    return p(this.year() % 100, 2)
                },
                YYYY: function() {
                    return p(this.year(), 4)
                },
                YYYYY: function() {
                    return p(this.year(), 5)
                },
                YYYYYY: function() {
                    var a = this.year(),
                        b = a >= 0 ? "+" : "-";
                    return b + p(Math.abs(a), 6)
                },
                gg: function() {
                    return p(this.weekYear() % 100, 2)
                },
                gggg: function() {
                    return p(this.weekYear(), 4)
                },
                ggggg: function() {
                    return p(this.weekYear(), 5)
                },
                GG: function() {
                    return p(this.isoWeekYear() % 100, 2)
                },
                GGGG: function() {
                    return p(this.isoWeekYear(), 4)
                },
                GGGGG: function() {
                    return p(this.isoWeekYear(), 5)
                },
                e: function() {
                    return this.weekday()
                },
                E: function() {
                    return this.isoWeekday()
                },
                a: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !0)
                },
                A: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !1)
                },
                H: function() {
                    return this.hours()
                },
                h: function() {
                    return this.hours() % 12 || 12
                },
                m: function() {
                    return this.minutes()
                },
                s: function() {
                    return this.seconds()
                },
                S: function() {
                    return A(this.milliseconds() / 100)
                },
                SS: function() {
                    return p(A(this.milliseconds() / 10), 2)
                },
                SSS: function() {
                    return p(this.milliseconds(), 3)
                },
                SSSS: function() {
                    return p(this.milliseconds(), 3)
                },
                Z: function() {
                    var a = -this.zone(),
                        b = "+";
                    return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + ":" + p(A(a) % 60, 2)
                },
                ZZ: function() {
                    var a = -this.zone(),
                        b = "+";
                    return 0 > a && (a = -a, b = "-"), b + p(A(a / 60), 2) + p(A(a) % 60, 2)
                },
                z: function() {
                    return this.zoneAbbr()
                },
                zz: function() {
                    return this.zoneName()
                },
                X: function() {
                    return this.unix()
                },
                Q: function() {
                    return this.quarter()
                }
            }, qc = {}, rc = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; nc.length;) vb = nc.pop(), pc[vb + "o"] = i(pc[vb], vb);
        for (; oc.length;) vb = oc.pop(), pc[vb + vb] = h(pc[vb], 2);
        pc.DDDD = h(pc.DDD, 3), m(j.prototype, {
            set: function(a) {
                var b, c;
                for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function(a) {
                return this._months[a.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function(a) {
                return this._monthsShort[a.month()]
            },
            monthsParse: function(a) {
                var b, c, d;
                for (this._monthsParse || (this._monthsParse = []), b = 0; 12 > b; b++)
                    if (this._monthsParse[b] || (c = tb.utc([2e3, b]), d = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""), this._monthsParse[b] = new RegExp(d.replace(".", ""), "i")), this._monthsParse[b].test(a)) return b
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function(a) {
                return this._weekdays[a.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function(a) {
                return this._weekdaysShort[a.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function(a) {
                return this._weekdaysMin[a.day()]
            },
            weekdaysParse: function(a) {
                var b, c, d;
                for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
                    if (this._weekdaysParse[b] || (c = tb([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY LT",
                LLLL: "dddd, MMMM D, YYYY LT"
            },
            longDateFormat: function(a) {
                var b = this._longDateFormat[a];
                return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                    return a.slice(1)
                }), this._longDateFormat[a] = b), b
            },
            isPM: function(a) {
                return "p" === (a + "").toLowerCase().charAt(0)
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(a, b, c) {
                return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(a, b) {
                var c = this._calendar[a];
                return "function" == typeof c ? c.apply(b) : c
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(a, b, c, d) {
                var e = this._relativeTime[c];
                return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
            },
            pastFuture: function(a, b) {
                var c = this._relativeTime[a > 0 ? "future" : "past"];
                return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
            },
            ordinal: function(a) {
                return this._ordinal.replace("%d", a)
            },
            _ordinal: "%d",
            preparse: function(a) {
                return a
            },
            postformat: function(a) {
                return a
            },
            week: function(a) {
                return hb(a, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            },
            _invalidDate: "Invalid date",
            invalidDate: function() {
                return this._invalidDate
            }
        }), tb = function(b, c, e, f) {
            var g;
            return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._i = b, g._f = c, g._l = e, g._strict = f, g._isUTC = !1, g._pf = d(), jb(g)
        }, tb.suppressDeprecationWarnings = !1, tb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
            a._d = new Date(a._i)
        }), tb.min = function() {
            var a = [].slice.call(arguments, 0);
            return kb("isBefore", a)
        }, tb.max = function() {
            var a = [].slice.call(arguments, 0);
            return kb("isAfter", a)
        }, tb.utc = function(b, c, e, f) {
            var g;
            return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = b, g._f = c, g._strict = f, g._pf = d(), jb(g).utc()
        }, tb.unix = function(a) {
            return tb(1e3 * a)
        }, tb.duration = function(a, b) {
            var d, e, f, g, h = a,
                i = null;
            return tb.isDuration(a) ? h = {
                ms: a._milliseconds,
                d: a._days,
                M: a._months
            } : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Lb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, h = {
                y: 0,
                d: A(i[Cb]) * d,
                h: A(i[Db]) * d,
                m: A(i[Eb]) * d,
                s: A(i[Fb]) * d,
                ms: A(i[Gb]) * d
            }) : (i = Mb.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function(a) {
                var b = a && parseFloat(a.replace(",", "."));
                return (isNaN(b) ? 0 : b) * d
            }, h = {
                y: f(i[2]),
                M: f(i[3]),
                d: f(i[4]),
                h: f(i[5]),
                m: f(i[6]),
                s: f(i[7]),
                w: f(i[8])
            }) : "object" == typeof h && ("from" in h || "to" in h) && (g = r(tb(h.from), tb(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months), e = new l(h), tb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale), e
        }, tb.version = wb, tb.defaultFormat = ec, tb.ISO_8601 = function() {}, tb.momentProperties = Ib, tb.updateOffset = function() {}, tb.relativeTimeThreshold = function(b, c) {
            return mc[b] === a ? !1 : c === a ? mc[b] : (mc[b] = c, !0)
        }, tb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
            return tb.locale(a, b)
        }), tb.locale = function(a, b) {
            var c;
            return a && (c = "undefined" != typeof b ? tb.defineLocale(a, b) : tb.localeData(a), c && (tb.duration._locale = tb._locale = c)), tb._locale._abbr
        }, tb.defineLocale = function(a, b) {
            return null !== b ? (b.abbr = a, Hb[a] || (Hb[a] = new j), Hb[a].set(b), tb.locale(a), Hb[a]) : (delete Hb[a], null)
        }, tb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
            return tb.localeData(a)
        }), tb.localeData = function(a) {
            var b;
            if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return tb._locale;
            if (!u(a)) {
                if (b = J(a)) return b;
                a = [a]
            }
            return I(a)
        }, tb.isMoment = function(a) {
            return a instanceof k || null != a && c(a, "_isAMomentObject")
        }, tb.isDuration = function(a) {
            return a instanceof l
        };
        for (vb = rc.length - 1; vb >= 0; --vb) z(rc[vb]);
        tb.normalizeUnits = function(a) {
            return x(a)
        }, tb.invalid = function(a) {
            var b = tb.utc(NaN);
            return null != a ? m(b._pf, a) : b._pf.userInvalidated = !0, b
        }, tb.parseZone = function() {
            return tb.apply(null, arguments).parseZone()
        }, tb.parseTwoDigitYear = function(a) {
            return A(a) + (A(a) > 68 ? 1900 : 2e3)
        }, m(tb.fn = k.prototype, {
            clone: function() {
                return tb(this)
            },
            valueOf: function() {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function() {
                return Math.floor(+this / 1e3)
            },
            toString: function() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function() {
                var a = tb(this).utc();
                return 0 < a.year() && a.year() <= 9999 ? N(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function() {
                var a = this;
                return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
            },
            isValid: function() {
                return G(this)
            },
            isDSTShifted: function() {
                return this._a ? this.isValid() && w(this._a, (this._isUTC ? tb.utc(this._a) : tb(this._a)).toArray()) > 0 : !1
            },
            parsingFlags: function() {
                return m({}, this._pf)
            },
            invalidAt: function() {
                return this._pf.overflow
            },
            utc: function(a) {
                return this.zone(0, a)
            },
            local: function(a) {
                return this._isUTC && (this.zone(0, a), this._isUTC = !1, a && this.add(this._dateTzOffset(), "m")), this
            },
            format: function(a) {
                var b = N(this, a || tb.defaultFormat);
                return this.localeData().postformat(b)
            },
            add: s(1, "add"),
            subtract: s(-1, "subtract"),
            diff: function(a, b, c) {
                var d, e, f, g = K(a, this),
                    h = 6e4 * (this.zone() - g.zone());
                return b = x(b), "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + g.daysInMonth()), e = 12 * (this.year() - g.year()) + (this.month() - g.month()), f = this - tb(this).startOf("month") - (g - tb(g).startOf("month")), f -= 6e4 * (this.zone() - tb(this).startOf("month").zone() - (g.zone() - tb(g).startOf("month").zone())), e += f / d, "year" === b && (e /= 12)) : (d = this - g, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - h) / 864e5 : "week" === b ? (d - h) / 6048e5 : d), c ? e : o(e)
            },
            from: function(a, b) {
                return tb.duration({
                    to: this,
                    from: a
                }).locale(this.locale()).humanize(!b)
            },
            fromNow: function(a) {
                return this.from(tb(), a)
            },
            calendar: function(a) {
                var b = a || tb(),
                    c = K(b, this).startOf("day"),
                    d = this.diff(c, "days", !0),
                    e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
                return this.format(this.localeData().calendar(e, this))
            },
            isLeapYear: function() {
                return E(this.year())
            },
            isDST: function() {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function(a) {
                var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != a ? (a = eb(a, this.localeData()), this.add(a - b, "d")) : b
            },
            month: ob("Month", !0),
            startOf: function(a) {
                switch (a = x(a)) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
            },
            endOf: function(a) {
                return a = x(a), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms")
            },
            isAfter: function(a, b) {
                return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +this > +a) : +this.clone().startOf(b) > +tb(a).startOf(b)
            },
            isBefore: function(a, b) {
                return b = x("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +a > +this) : +this.clone().startOf(b) < +tb(a).startOf(b)
            },
            isSame: function(a, b) {
                return b = x(b || "millisecond"), "millisecond" === b ? (a = tb.isMoment(a) ? a : tb(a), +this === +a) : +this.clone().startOf(b) === +K(a, this).startOf(b)
            },
            min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
                return a = tb.apply(null, arguments), this > a ? this : a
            }),
            max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
                return a = tb.apply(null, arguments), a > this ? this : a
            }),
            zone: function(a, b) {
                var c, d = this._offset || 0;
                return null == a ? this._isUTC ? d : this._dateTzOffset() : ("string" == typeof a && (a = Q(a)), Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateTzOffset()), this._offset = a, this._isUTC = !0, null != c && this.subtract(c, "m"), d !== a && (!b || this._changeInProgress ? t(this, tb.duration(d - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, tb.updateOffset(this, !0), this._changeInProgress = null)), this)
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function() {
                return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
            },
            hasAlignedHourOffset: function(a) {
                return a = a ? tb(a).zone() : 0, (this.zone() - a) % 60 === 0
            },
            daysInMonth: function() {
                return B(this.year(), this.month())
            },
            dayOfYear: function(a) {
                var b = yb((tb(this).startOf("day") - tb(this).startOf("year")) / 864e5) + 1;
                return null == a ? b : this.add(a - b, "d")
            },
            quarter: function(a) {
                return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
            },
            weekYear: function(a) {
                var b = hb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                return null == a ? b : this.add(a - b, "y")
            },
            isoWeekYear: function(a) {
                var b = hb(this, 1, 4).year;
                return null == a ? b : this.add(a - b, "y")
            },
            week: function(a) {
                var b = this.localeData().week(this);
                return null == a ? b : this.add(7 * (a - b), "d")
            },
            isoWeek: function(a) {
                var b = hb(this, 1, 4).week;
                return null == a ? b : this.add(7 * (a - b), "d")
            },
            weekday: function(a) {
                var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == a ? b : this.add(a - b, "d")
            },
            isoWeekday: function(a) {
                return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
            },
            isoWeeksInYear: function() {
                return C(this.year(), 1, 4)
            },
            weeksInYear: function() {
                var a = this.localeData()._week;
                return C(this.year(), a.dow, a.doy)
            },
            get: function(a) {
                return a = x(a), this[a]()
            },
            set: function(a, b) {
                return a = x(a), "function" == typeof this[a] && this[a](b), this
            },
            locale: function(b) {
                var c;
                return b === a ? this._locale._abbr : (c = tb.localeData(b), null != c && (this._locale = c), this)
            },
            lang: f("moment().lang() is deprecated. Use moment().localeData() instead.", function(b) {
                return b === a ? this.localeData() : this.locale(b)
            }),
            localeData: function() {
                return this._locale
            },
            _dateTzOffset: function() {
                return 15 * Math.round(this._d.getTimezoneOffset() / 15)
            }
        }), tb.fn.millisecond = tb.fn.milliseconds = ob("Milliseconds", !1), tb.fn.second = tb.fn.seconds = ob("Seconds", !1), tb.fn.minute = tb.fn.minutes = ob("Minutes", !1), tb.fn.hour = tb.fn.hours = ob("Hours", !0), tb.fn.date = ob("Date", !0), tb.fn.dates = f("dates accessor is deprecated. Use date instead.", ob("Date", !0)), tb.fn.year = ob("FullYear", !0), tb.fn.years = f("years accessor is deprecated. Use year instead.", ob("FullYear", !0)), tb.fn.days = tb.fn.day, tb.fn.months = tb.fn.month, tb.fn.weeks = tb.fn.week, tb.fn.isoWeeks = tb.fn.isoWeek, tb.fn.quarters = tb.fn.quarter, tb.fn.toJSON = tb.fn.toISOString, m(tb.duration.fn = l.prototype, {
            _bubble: function() {
                var a, b, c, d = this._milliseconds,
                    e = this._days,
                    f = this._months,
                    g = this._data,
                    h = 0;
                g.milliseconds = d % 1e3, a = o(d / 1e3), g.seconds = a % 60, b = o(a / 60), g.minutes = b % 60, c = o(b / 60), g.hours = c % 24, e += o(c / 24), h = o(pb(e)), e -= o(qb(h)), f += o(e / 30), e %= 30, h += o(f / 12), f %= 12, g.days = e, g.months = f, g.years = h
            },
            abs: function() {
                return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
            },
            weeks: function() {
                return o(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12)
            },
            humanize: function(a) {
                var b = gb(this, !a, this.localeData());
                return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b)
            },
            add: function(a, b) {
                var c = tb.duration(a, b);
                return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, this._bubble(), this
            },
            subtract: function(a, b) {
                var c = tb.duration(a, b);
                return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
            },
            get: function(a) {
                return a = x(a), this[a.toLowerCase() + "s"]()
            },
            as: function(a) {
                var b, c;
                if (a = x(a), "month" === a || "year" === a) return b = this._days + this._milliseconds / 864e5, c = this._months + 12 * pb(b), "month" === a ? c : c / 12;
                switch (b = this._days + qb(this._months / 12), a) {
                    case "week":
                        return b / 7 + this._milliseconds / 6048e5;
                    case "day":
                        return b + this._milliseconds / 864e5;
                    case "hour":
                        return 24 * b + this._milliseconds / 36e5;
                    case "minute":
                        return 24 * b * 60 + this._milliseconds / 6e4;
                    case "second":
                        return 24 * b * 60 * 60 + this._milliseconds / 1e3;
                    case "millisecond":
                        return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
                    default:
                        throw new Error("Unknown unit " + a)
                }
            },
            lang: tb.fn.lang,
            locale: tb.fn.locale,
            toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
                return this.toISOString()
            }),
            toISOString: function() {
                var a = Math.abs(this.years()),
                    b = Math.abs(this.months()),
                    c = Math.abs(this.days()),
                    d = Math.abs(this.hours()),
                    e = Math.abs(this.minutes()),
                    f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
            },
            localeData: function() {
                return this._locale
            }
        }), tb.duration.fn.toString = tb.duration.fn.toISOString;
        for (vb in ic) c(ic, vb) && rb(vb.toLowerCase());
        tb.duration.fn.asMilliseconds = function() {
            return this.as("ms")
        }, tb.duration.fn.asSeconds = function() {
            return this.as("s")
        }, tb.duration.fn.asMinutes = function() {
            return this.as("m")
        }, tb.duration.fn.asHours = function() {
            return this.as("h")
        }, tb.duration.fn.asDays = function() {
            return this.as("d")
        }, tb.duration.fn.asWeeks = function() {
            return this.as("weeks")
        }, tb.duration.fn.asMonths = function() {
            return this.as("M")
        }, tb.duration.fn.asYears = function() {
            return this.as("y")
        }, tb.locale("en", {
            ordinal: function(a) {
                var b = a % 10,
                    c = 1 === A(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
                return a + c
            }
        }), Jb ? module.exports = tb : "function" == typeof define && define.amd ? (define("moment", function(a, b, c) {
            return c.config && c.config() && c.config().noGlobal === !0 && (xb.moment = ub), tb
        }), sb(!0)) : sb()
    }.call(this);