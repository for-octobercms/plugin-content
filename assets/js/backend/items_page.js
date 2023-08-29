var wd_items = wd_items || {

    // trimN: function(str)
    // {
    //     return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    // },

    select2Icons: function(selector)
    {
        var funSelectIcon = function(state)
        {
            if (!state.id)
                return state.text;
            return $('<span><i class="'+ state.id +'"></i>&nbsp;&nbsp;&nbsp;'+ state.text +'</span>');
        };
        $(selector).select2({
            templateResult: funSelectIcon,
            templateSelection: funSelectIcon
        });
    },

    select2CreateTmp: function(selector)
    {
        var funSelect = function(state)
        {
            if (!state.id)
                return state.text;
            return $('<span>'+ state.text +'&nbsp;&nbsp;<small class="br-a"><i>'+
                state.id.replace(/^(ready_|section_)/i,'') +'</i></small></span>');
        };
        $(selector).select2({
            templateResult: funSelect,
            templateSelection: funSelect
        });
    },

    addSubmenuControlPanels: function()
    {
        var btnClone = ''+
            '<button class="btn btn-primary btn-xs" ' +
                    'data-btn-type="clone">' +
                '<i class="icon-clone"></i>' +
            '</button>';

        $('#layout-sidenav ul li[data-submenu-slug]').each(function(i, el)
        {
            var $this = $(this),
                panelBtns = '';

            if ($this.data('submenu-clone'))
                panelBtns += btnClone;

            $(el).append('<span class="page-control">' + panelBtns + '</span>');
        });
    },

    popupChangePage: function()
    {
        var me = this;
        $('#layout-sidenav ul li[data-btn-type="create_new_page"] a').click(function(){
            me.show_changePageModalData('create', $(this).closest('li'));
        });
        this.select2Icons('#popupChangePage select[name="icon"]');
    },

    events: function()
    {
        var me = this;

        // create items type
        $('#createItemPopup').on('click', '#popupCreateItemTabs ul li a', function(){
            $('#popupCreateItemTabs input[name="formType"]').val($(this).data('form-type'));
        });
        this.select2CreateTmp('#popupCreateItem select[name="readyTmp"]');

        // submenu control panel
        $('#layout-sidenav ul li').mouseover(function() {
            $(this).children('.page-control:eq(0)').css({'opacity': '1'});
        }).mouseout(function() {
            $(this).children('.page-control:eq(0)').css({'opacity': '0.4'});
        });
        $('#layout-sidenav ul').on('mouseover mouseout click', 'li .page-control button', function(e)
        {
            var $this = $(this);
            switch (e.type)
            {
                case 'mouseover': $this.css({'opacity': '1'});   break;
                case 'mouseout':  $this.css({'opacity': '0.8'}); break;

                case 'click':
                {
                    var $parentLi = $this.closest('li');
                    switch ($this.data('btn-type'))
                    {
                        case 'clone':
                            me.show_changePageModalData('clone', $parentLi);
                            break;
                    }
                }
            }
        });

        // item rename block btn
        $(document).on('click', '.contentItemRenameBtn button', function()
        {
            var $this = $(this),
                $popup = $('#popupRenameItem'),
                itemId = $this.data('item-id'),
                itemTitle = $this.data('item-title'),
                itemName = $this.data('item-name');

            $popup.find('.contentItemId').text(' - #'+itemId);
            $popup.find('input[name="title"]').val(itemTitle);
            $popup.find('input[name="name"]').val(itemName);
            $popup.find('input[name="old_name"]').val(itemName);
            $popup.modal('show');
        });

        // Fill in blanks and Save
        $('#fill_and_save').click(function()
        {
            var langLocales = [];
            var $langLocales = $('.langLocale');
            if (! $langLocales.length)
                return;
            $langLocales.each(function(i, el) {
                langLocales[i] = $(el).data('field-name').toLowerCase();
            });

            var funcFieldsFill = function(el, tagName)
            {
                // field name attr
                var fieldName = $(el).attr('name').trim();//
                var re = /^Item\[items\]\[(.*?)\]$/;
                if (! fieldName.match(re))
                    return;
                fieldName = fieldName.replace(re, "$1").trim();
                if (! fieldName)
                    return;

                // fill fields
                var $transField;
                var $emptyFields = [];
                var fieldSetData = $(el).val().trim();
                if (! fieldSetData)
                    $emptyFields[0] = $(el);

                var funcSetField = function($el)
                {
                    $el.val(fieldSetData);
                    if (tagName === 'textarea') {
                        if ($el.attr('id').match(/^RichEditor/))
                            $el.parent().find("div.fr-element").html(fieldSetData);
                    }
                };

                langLocales.forEach(function(langCode) {
                    $transField = $("[name='Item["+langCode+"]["+fieldName+"]']");
                    if ($transField.length !== 1)
                        return;
                    if (fieldSetData) {
                        if (! $transField.val().trim())
                            funcSetField($transField);
                    }
                    else {
                        fieldSetData = $transField.val().trim();
                        if (! fieldSetData)
                            $emptyFields[$emptyFields.length] = $transField;
                    }
                });

                if (fieldSetData) {
                    $emptyFields.forEach(function($el) {
                        funcSetField($el);
                    });
                }
            };

            // search all send fields
            $('#layout-body form.layout').find("[name^='Item[items][']").each(function(i, el)
            {
                var tagName = $(el).prop('tagName').toLowerCase();
                switch (tagName)
                {
                    case 'textarea': // <p>Регистрируясь, я принимаю <a href="/privacy-policy">Политику конфиденциальности</a>.</p>
                        funcFieldsFill(el, tagName);
                        return;
                    case 'input':
                    {
                        var fieldType = $(el).attr('type').toLowerCase();
                        switch (fieldType) {
                            case 'file':
                            case 'image':
                            case 'button':
                            case 'submit':
                            case 'reset':
                            case 'radio':
                            case 'checkbox':
                                return;
                            default:
                                funcFieldsFill(el, tagName);
                                return;
                        }
                    }
                }
            });
            // return false;
        });
    },

    show_changePageModalData: function(modalType, liObj)
    {
        var $modal  = $('#popupChangePage'),
            isClone = modalType === 'clone',
            iconVal = isClone ? liObj.data('submenu-icon') : 'icon-plus',
            request = 'on'+ modalType.substring(0, 1).toUpperCase() + modalType.substring(1) +'Page',
            valData = {};

        valData.title    = isClone ? liObj.data('submenu-title') : '';
        valData.slug     = isClone ? liObj.data('submenu-slug')  : '';
        valData.order    = isClone ? liObj.data('submenu-order') : '100';
        valData.old_slug = isClone ? valData.slug : '';

        for (var k in valData)
            $modal.find('input[name="' + k + '"]').val(valData[k]);

        $modal.find('select[name="icon"] option[value="'+ iconVal +'"]:eq(0)').prop('selected', true).change();
        $modal.find('form[data-request]').data('request',request);
        $modal.find('.toggle-change').hide();
        $modal.find('.toggle-'+modalType).show();
        $modal.modal('show');
    },

    init: function()
    {
        this.addSubmenuControlPanels();
        this.popupChangePage();
        this.events();
        this.select2Icons('#editPageForm select[name="Page[icon]"]');
    }
};

$(document).ready(function(){
    wd_items.init();
});