Template.existing_block.rendered = function() {
  $('.preview-block').click(function() {
  	$('.existingBlockPreview').html($(this).find('.block-preview').html());
  });
}

Template.existing_block.events = {
  'click .add-existing-block': function(e) {
  	e.preventDefault();
    var page = utils.getCurrentPage();

    var label = Template[this.template].label || 'Single Block';
    //find the block by the (block)-id of the insert button
    block = Blocks.findOne(e.target.id);
    // Attach the block to the page
    if (!page.notFound) {
      PageBlocks.insert({page_id: page._id, block_id: block._id, label: label, zone: Session.get('block-zone'), added: Date.now()});
    }

    utils.closeModal('#existingBlockModal');
    $.pnotify({
      text: label + ' added to page.',
      type: 'success',
      icon: false,
      addclass: "stack-bottomright",
      stack: utils.pnotify_stack_bottomright
    });
  }
};

Template.existing_block.allBlocks = function() {
  return Blocks.find();
}