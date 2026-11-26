/**
 * Terminal Mastery Lab - Survival Guide Content
 * Structured content for each guide category
 */

const GUIDE_CONTENT = {
  basics: {
    titleKey: 'guide_basics_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_basics_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_basics_what'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_basics_what_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_basics_shell'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_basics_shell_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_basics_prompt'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_basics_prompt_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_basics_tips'
      },
      {
        type: 'tips',
        items: [
          'guide_basics_tip1',
          'guide_basics_tip2',
          'guide_basics_tip3',
          'guide_basics_tip4',
          'guide_basics_tip5',
          'guide_basics_tip6'
        ]
      }
    ]
  },

  prompt: {
    titleKey: 'guide_prompt_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_prompt_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_structure'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_structure_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_cmd'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_cmd_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_opts'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_opts_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_args'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_args_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_quotes'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_quotes_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_prompt_redirect'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_prompt_redirect_desc'
      }
    ]
  },

  paths: {
    titleKey: 'guide_paths_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_paths_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_paths_abs'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_paths_abs_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_paths_rel'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_paths_rel_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_paths_examples'
      },
      {
        type: 'codeList',
        items: [
          'guide_paths_ex1',
          'guide_paths_ex2',
          'guide_paths_ex3',
          'guide_paths_ex4'
        ]
      },
      {
        type: 'heading',
        contentKey: 'guide_paths_special'
      },
      {
        type: 'definitionList',
        items: [
          { termKey: 'guide_paths_root', defKey: 'guide_paths_root' },
          { termKey: 'guide_paths_home', defKey: 'guide_paths_home' },
          { termKey: 'guide_paths_dot', defKey: 'guide_paths_dot' },
          { termKey: 'guide_paths_dotdot', defKey: 'guide_paths_dotdot' },
          { termKey: 'guide_paths_prev', defKey: 'guide_paths_prev' }
        ]
      }
    ]
  },

  processes: {
    titleKey: 'guide_processes_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_processes_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_processes_view'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_processes_view_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_processes_kill'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_processes_kill_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_processes_jobs'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_processes_jobs_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_processes_nohup'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_processes_nohup_desc'
      }
    ]
  },

  scripts: {
    titleKey: 'guide_scripts_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_scripts_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_scripts_create'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_scripts_create_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_scripts_shebang'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_scripts_shebang_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_scripts_vars'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_scripts_vars_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_scripts_control'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_scripts_control_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_scripts_functions'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_scripts_functions_desc'
      }
    ]
  },

  perms: {
    titleKey: 'guide_perms_title',
    sections: [
      {
        type: 'intro',
        contentKey: 'guide_perms_intro'
      },
      {
        type: 'heading',
        contentKey: 'guide_perms_ls'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_perms_ls_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_perms_chmod'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_perms_chmod_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_perms_special'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_perms_special_desc'
      },
      {
        type: 'heading',
        contentKey: 'guide_perms_umask'
      },
      {
        type: 'paragraph',
        contentKey: 'guide_perms_umask_desc'
      }
    ]
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GUIDE_CONTENT };
}