/*!
 * jquery accordion 1.0
 * 
 * Copyright 2011, Stefan Benicke (opusonline.at)
 * Dual licensed under the MIT or GPL Version 3 licenses. (LICENSES.txt)
 */
(function($) {
	
	var defaults = {
		speed: 250,
		onChange: function(header, panel) {}
	};
	
	$.fn.accordion = function(options) {
		
		options = $.extend({}, options, defaults);
		
		return this.each(function() {
			
			var activate = function() {
				var me = $(this);
				if (me.hasClass('active')) return;
				last_active_label.removeClass('active');
				last_active_label = me.addClass('active');
				last_active_box.slideUp(options.speed);
				last_active_box = me.next().slideDown(options.speed);
				options.onChange.call(container, me, last_active_box);
			},
			container = $(this),
			labels = $('.header', container).click(activate),
			last_active_label = labels.first().addClass('active'),
			boxes = $('.panel', container).hide(),
			last_active_box = boxes.first().show(),
			container_height = container.height(),
			labels_height = 0;
			labels.each(function() {
				var me = $(this);
				labels_height += me.outerHeight();
				labels_height += parseInt(me.css('margin-top'));
				labels_height += parseInt(me.css('margin-bottom'));
			});
			var padding_top = parseInt(last_active_box.css('padding-top')),
			padding_bottom = parseInt(last_active_box.css('padding-bottom')),
			margin_top = parseInt(last_active_box.css('margin-top')),
			margin_bottom = parseInt(last_active_box.css('margin-bottom')),
			box_height = container_height - labels_height - padding_top - padding_bottom - margin_top - margin_bottom;
			boxes.each(function() {
				$(this).height(box_height);
			});
		});
		
	};
	
})(jQuery);
