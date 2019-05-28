<?php return [
    'prompt' => 'Add new item',
    'items' => [
        'title_label' => 'Name',
        'name_label'  => 'Key',
        'name_cmt'    => 'The name by which you will receive the content. Valid characters: a-z_-',
        'items_label' => 'Content',
        'sort_order'  => 'Sort',
        'create_at'   => 'Created',
        'updated_at'  => 'Updated',
    ],
    'pages' => [
        'tab_main'    => 'Main',
        'section_settings' => 'Page',
        'field_title' => 'Title',
        'field_slug'  => 'Slug (part URN)',
        'field_icon'  => 'Icon',
        'field_order' => 'Order',
    ],
    'list' => [
        'title'      => 'List',
        'create_btn' => 'Create block',
        'sort_btn'   => 'Sort blocks',
        'no_content' => 'Add control area',
        'delete_selected_btn' => 'Delete selected blocks',
        'page_config_example' => 'The correct example is:',
    ],
    'form' => [
        'title'         => 'Update - :title',
        'items_missing' => 'No form',
        'items_empty'   => 'Form is empty',
    ],
    'tabs' => [
        'content'  => 'Content',
        'settings' => 'Settings',
    ],
    'submenu' => [
        'create_page_btn' => 'Create',
    ],
    'popup' => [
        'page' => [
            'title_create' => 'Create page',
            'title_edit'   => 'Edit page',
        ],
        'block' => [
            'title_create'   => 'Create block for page - :page',
            'btn_new_item'   => 'New template',
            'btn_ready_item' => 'Ready template',
            'field_ready_tmp_label' => 'Template',
            'field_ready_tmp_empty' => 'No pre-made templates',
            'optgroup_ready_tmp_current' => 'For the current page',
            'optgroup_ready_tmp_global'  => 'General templates',
            'field_ready_tmp_name'  => 'Template name',
        ],
        'rename_block' => [
            'title_rename' => 'Rename block',
        ],
    ],
    'errors' => [
        'pages_menu'  => 'Correctly declare the page menu item in the file :fileName',
        'pages_list'  => 'Correctly declare the block list item in the file :fileName',
        'page_config' => 'Incorrect syntax in page configuration file ":fileName"',
        'section_config'  => 'Incorrect syntax in section configuration file ":fileName"',
        'file_item_slug'  => 'Invalid syntax in section name ":fileName" -> ":itemSlug"',
        'no_page'         => 'Not found the settings page ":pageSlug"',
        'no_item'         => 'Content block ":itemSlug" not found',
        'no_item_tmp'     => 'Template ":itemSlug" not found',
        'no_exists_item'  => 'Content block ":itemSlug" already exists',
        'available_item'  => 'The content of the page ":pageSlug" setting ":itemSlug" is already available',
        'non_item_create' => 'It is forbidden to add blocks',
        'non_item_create_new_tmp'   => 'It is forbidden to add new blocks',
        'non_item_create_ready_tmp' => 'It is forbidden to add template blocks',
        'non_item_rename' => 'Forbidden to rename templates',
        'non_item_delete' => 'It is forbidden to delete templates',
        'non_page_create' => 'It is forbidden to create pages',
        'non_page_edit'   => 'Forbidden to edit pages',
        'non_page_delete' => 'It is forbidden to delete pages',
        'exists_old_page' => 'Old slug ":slug" not found',
        'no_exists_page'  => 'The page with slug ":itemSlug" already exists',
        'add_item_type'   => 'Wrong type of added block',
        'item_slug'       => 'Invalid block key name ":itemSlug"',
        'no_section_file' => 'File template section ":sectionFile" not found',
    ],
    'success' => [
        'create_item' => 'Content block ":itemName" successfully added',
        'rename_item' => 'Content block successfully renamed',
        'create_page' => 'Page ":page" successfully created',
        'edit_page'   => 'Page ":page" successfully changed',
        'delete_page' => 'Page successfully deleted',
    ],
    'msg' => [
        'confirm_page_delete' => 'The page will be permanently deleted! Do you really want to delete the page ":page"?',
    ],
];