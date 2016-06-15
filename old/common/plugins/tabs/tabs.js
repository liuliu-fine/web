/**
 * Required:jQuery JavaScript Library v1.4.2
 * 
 * @license jQuery Tools 1.2.1 Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 * 
 * Since: November 2008 Date: Tue May 11 09:22:32 2010 +0000
 */
(function($) {

	// static constructs
	$.tools = $.tools || {
		version : '1.2.1'
	};

	$.tools.tabs = {

		conf : {
			tabs : 'a',
			current : 'current',
			onBeforeClick : null,
			onClick : null,
			effect : 'default',
			initialIndex : 0,
			event : 'click',
			rotate : false,
			sets : null, // wzw add by 2010-05-16 12:48
			cache : true, // wzw add by 2010-05-15 16:20

			// 1.2
			history : false
		},

		addEffect : function(name, fn) {
			effects[name] = fn;
		}

	};

	var effects = {

		// simple "toggle" effect
		'default' : function(i, done) {
			this.getPanes().hide().eq(i).show();
			done.call();
		},

		/*
		 * configuration: - fadeOutSpeed (positive value does "crossfading") -
		 * fadeInSpeed
		 */
		fade : function(i, done) {

			var conf = this.getConf(), speed = conf.fadeOutSpeed, panes = this
					.getPanes();

			if (speed) {
				panes.fadeOut(speed);
			} else {
				panes.hide();
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);
		},

		// for basic accordions
		slide : function(i, done) {
			this.getPanes().slideUp(200);
			this.getPanes().eq(i).slideDown(400, done);
		},

		/**
		 * AJAX effect
		 */
		ajax : function(i, done) {
			this.getPanes().eq(0).show();
			
			var conf = this.getConf();
			var src = this.getTabs().eq(i).attr("href");
			if (!conf.cache) {
				if (src.indexOf("?") == -1) {
					src = src + "?";
				}
				src += "&rnd=" + Math.random();
			}
			this.getPanes().eq(0).load(src, done);
		},

		// wzw add by 2010-05-16 10:10
		iframe : function(i, done) {
			this.getPanes().eq(0).show();
			
			var conf = this.getConf();
			var src = this.getTabs().eq(i).attr("href");
			if (!conf.cache) {
				if (src.indexOf("?") == -1) {
					src = src + "?";
				}
				src += "&rnd=" + Math.random();
			}
			var iframes = this.getPanes().eq(0).find("iframe");
			if (iframes.length == 0) {
				this
						.getPanes()
						.eq(0)
						.append(
								"<iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"100%\" height=\"100%\" src=\""
										+ src + "\"></iframe>");
			} else {
				iframes[0].src = src;
			}
			done.call();
		},

		// wzw add by 2010-05-16 11:25
		iframes : function(i, done) {
			this.getPanes().hide().eq(i).show();

			var conf = this.getConf();
			var src = this.getTabs().eq(i).attr("href");
			var iframes = this.getPanes().eq(i).find("iframe");
			if (iframes.length == 0) {
				this
						.getPanes()
						.eq(i)
						.append(
								"<iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"100%\" height=\"100%\" src=\""
										+ src + "\"></iframe>");
			} else {
				if (!conf.cache) {
					if (src.indexOf("?") == -1) {
						src = src + "?";
					}
					src += "&rnd=" + Math.random();
					iframes[0].src = src;
				}
			}
			done.call();
		},

		// wzw add by 2010-05-16 12:58
		complex : function(i, done) {
			this.getPanes().hide().eq(i).show();

			var set = this.getConf().sets[i];
			var src = this.getTabs().eq(i).attr("href");
			if (set.fill == null || set.fill == "" || set.fill == 'default') {
			} else if (set.fill == 'ajax') {
				if (set.cache != null && set.cache == false) {
					if (src.indexOf("?") == -1) {
						src = src + "?";
					}
					src += "&rnd=" + Math.random();
				}
				this.getPanes().eq(i).load(src, done);
			} else if (set.fill == 'iframe') {
				var iframes = this.getPanes().eq(i).find("iframe");
				if (iframes.length == 0) {
					this
							.getPanes()
							.eq(i)
							.append(
									"<iframe frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" width=\"100%\" height=\"100%\" src=\""
											+ src + "\"></iframe>");
				} else {
					if (set.cache != null && set.cache == false) {
						if (src.indexOf("?") == -1) {
							src = src + "?";
						}
						src += "&rnd=" + Math.random();
						iframes[0].src = src;
					}
				}
			}
			done.call();
		}
	};

	var w;

	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	 */
	$.tools.tabs.addEffect("horizontal", function(i, done) {

		// store original width of a pane into memory
			if (!w) {
				w = this.getPanes().eq(0).width();
			}

			// set current pane's width to zero
			this.getCurrentPane().animate( {
				width : 0
			}, function() {
				$(this).hide();
			});

			// grow opened pane to it's original width
			this.getPanes().eq(i).animate( {
				width : w
			}, function() {
				$(this).show();
				done.call();
			});

		});

	function Tabs(root, paneSelector, conf) {

		var self = this, trigger = root.add(this), tabs = root.find(conf.tabs), panes = paneSelector.jquery ? paneSelector
				: root.children(paneSelector), current;

		// make sure tabs and panes are found
		if (!tabs.length) {
			tabs = root.children();
		}
		if (!panes.length) {
			panes = root.parent().find(paneSelector);
		}
		if (!panes.length) {
			panes = $(paneSelector);
		}

		// public methods
		$.extend(this, {
			click : function(i, e) {

				tabs.eq(i).blur();

				var tab = tabs.eq(i);

				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}

				if (conf.rotate) {
					var last = tabs.length - 1;
					if (i < 0) {
						return self.click(last, e);
					}
					if (i > last) {
						return self.click(0, e);
					}
				}

				if (!tab.length) {
					if (current >= 0) {
						return self;
					}
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}

				// current tab is being clicked
			if (i === current) {
				return self;
			}

			// possibility to cancel click action
			e = e || $.Event();
			e.type = "onBeforeClick";
			trigger.trigger(e, [ i ]);
			if (e.isDefaultPrevented()) {
				return;
			}

			// call the effect
			effects[conf.effect].call(self, i, function() {

				// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [ i ]);
				});

			// default behaviour
			current = i;
			tabs.removeClass(conf.current);
			tab.addClass(conf.current);

			return self;
		},

		getConf : function() {
			return conf;
		},

		getTabs : function() {
			return tabs;
		},

		getPanes : function() {
			return panes;
		},

		getCurrentPane : function() {
			return panes.eq(current);
		},

		getCurrentTab : function() {
			return tabs.eq(current);
		},

		getIndex : function() {
			return current;
		},

		next : function() {
			return self.click(current + 1);
		},

		prev : function() {
			return self.click(current - 1);
		}

		});

		// callbacks
		$.each("onBeforeClick,onClick".split(","), function(i, name) {

			// configuration
				if ($.isFunction(conf[name])) {
					$(self).bind(name, conf[name]);
				}

				// API
				self[name] = function(fn) {
					$(self).bind(name, fn);
					return self;
				};
			});

		if (conf.history && $.fn.history) {
			$.tools.history.init(tabs);
			conf.event = 'history';
		}

		// setup click actions for each tab
		tabs.each(function(i) {
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});
		});

		// cross tab anchor link
		panes.find("a[href^=#]").click(function(e) {
			self.click($(this).attr("href"), e);
		});

		// open initial tab
		if (location.hash) {
			self.click(location.hash);
		} else {
			if (conf.initialIndex == 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		}

	}

	// jQuery plugin implementation
	$.fn.tabs = function(paneSelector, conf) {

		// return existing instance
		var el = this.data("tabs");
		if (el) {
			return el;
		}

		if ($.isFunction(conf)) {
			conf = {
				onBeforeClick : conf
			};
		}

		// setup conf
		conf = $.extend( {}, $.tools.tabs.conf, conf);

		this.each(function() {
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("tabs", el);
		});

		return conf.api ? el : this;
	};

})(jQuery);
