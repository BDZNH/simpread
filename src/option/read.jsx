console.log( "===== simpread option read mode load =====" )

import { verifyHtml } from 'util';
import {browser}   from 'browser';
import th          from 'theme';

import TextField   from 'textfield';
import SelectField from 'selectfield';

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';
import Exclude   from 'exclude';

const path  = icon=>browser.extension.getURL( `assets/images/${icon}.png` ),
      fontsize = [
        {
            icon  : "",
            value : "70%",
            name  : "增大",
            info  : "ctrl + A",
        },
        {
            icon  : "",
            value : "62.5%",
            name  : "正常",
            info  : "ctrl + B",
        },
        {
            icon  : "",
            value : "58%",
            name  : "减小",
            info  : "",
      }],
      weight = [
        {
            icon  : "",
            value : "10%",
            name  : "宽栏",
            info  : "shift + A",
        },
        {
            icon  : "",
            value : "20%",
            name  : "正常",
            info  : "shift + B",
        },
        {
            icon  : "",
            value : "30%",
            name  : "窄栏",
            info  : "shift + C",
        },
];

export default class ReadOpt extends React.Component {

    state = {
        errtitle : "",
        errdesc  : "",
    };

    changeBgColor( theme ) {
        this.props.option.theme = theme;
        th.Change( this.props.option.theme );
        console.log( "this.props.option.theme = ", this.props.option.theme )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeFontsize( value, name ) {
        console.log( "this.props.option.fontsize = ", value, name )
    }

    changeWeight( value, name ) {
        console.log( "this.props.option.weight = ", value, name )
    }

    changeTitle() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errtitle : "" });
            this.props.option.site.title = event.target.value.trim();
            console.log( "this.props.option.site.title = ", this.props.option.site.title )
        } else {
            this.setState({ errtitle : "当前输入为非法。" });
        }
    }

    changeDesc() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errdesc : "" });
            this.props.option.site.desc = event.target.value.trim();
            console.log( "this.props.option.site.desc = ", this.props.option.site.desc )
        } else {
            this.setState({ errdesc : "当前输入为非法。" });
        }
    }

    changeInclude( value ) {
        this.props.option.site.include = value;
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    changeExclude( value ) {
        this.props.option.site.exclude = value;
        console.log( "this.props.option.site.exclude = ", this.props.option.site.exclude )
    }

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField items={ fontsize } floatingtext="字体大小" placeholder="请选择字体大小，默认为正常。" onChange={ (v,n)=>this.changeFontsize(v,n) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField items={ weight } floatingtext="版面布局" placeholder="默认为正常宽度" onChange={ (v,n)=>this.changeWeight(v,n) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField 
                        multi={ false } 
                        floatingtext="标题" 
                        value={ this.props.option.site.title }
                        errortext={ this.state.errtitle }
                        onChange={ ()=>this.changeTitle() }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField 
                            multi={ false } 
                            placeholder="默认为空。" 
                            floatingtext="描述" 
                            value={ this.props.option.site.desc }
                            errortext={ this.state.errdesc }
                            onChange={ ()=>this.changeDesc() }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Include include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Exclude exclude={ this.props.option.site.exclude } changeExclude={ val=>this.changeExclude(val) } />
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}
