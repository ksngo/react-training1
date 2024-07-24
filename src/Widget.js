import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import "../styles/Widget.css"

const Container = styled.div`
  height: auto;
  width: 300px;
  
`

const Display = styled.div`
  color: orange;
  font-size: 32px;
`

const SelectContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  min-width: 200px;
  >div:first-child {
    ${(props) => props.openmenu ? `
      background-color: white;
      border-radius: 20px 20px 0px 0px;
      border-width: 1px 1px 0px;
      border-top-style: solid;
      border-right-style: solid;
      border-left-style: solid;
      border-top-color: rgb(170, 170, 170);
      border-right-color: rgb(170, 170, 170);
      border-left-color: rgb(170, 170, 170);
      border-image: initial;
      border-bottom-style: initial;
      border-bottom-color: initial;
      padding: 0px 10px;
      display: flex;
      white-space: nowrap;
      filter: drop-shadow(rgba(0, 0, 0, 0.16) 4px 4px 4px);
      cursor: pointer;
    ` :
    `
    background-color: white;
    border-radius: 40px;
    border: 1px solid rgb(170, 170, 170);
    padding: 0px 10px;
    display: flex;
    white-space: nowrap;
    cursor: pointer;
    `}
    >div:nth-child(1) {
      align-items: center;
      display: flex;
      flex: 1 1 0%;
      flex-wrap: wrap;
      padding: 2px 8px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      >div {
        margin-left: 2px;
        margin-right: 2px;
        max-width: calc(100% - 8px);
        overflow: hidden;
        position: absolute;
        text-overflow: ellipsis;
        top: 50%;
        transform: translateY(-50%);
        box-sizing: border-box;
        font-size: inherit;
        line-height: inherit;
      }
    }
    >div:nth-child(2) {
      align-items: center;
      align-self: stretch;
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      >div {
        color: black;
        display: flex;
        padding: 8px;
        transition: color 150ms ease 0s;
        box-sizing: border-box;
        opacity: 1;
        >span.icon-caret-up{
          font-size: 10px;
          line-height: 1.4rem;
          &::before {
            content: "\\25b2";
          }
        }
        >span.icon-caret-down{
          font-size: 10px;
          line-height: 1.4rem;
          &::before {
            content: "\\25bc";
          }
        }
      }
    }
  }

  // menu
  >div:nth-child(2) {
    top: calc(100% - 6px);
    background-color: rgb(255, 255, 255);
    border-radius: 0px 0px 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
    margin-bottom: 8px;
    margin-top: 8px;
    position: absolute;
    width: 100%;
    z-index: 10;
    box-sizing: border-box;
    border-width: 0px 1px 1px;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-right-color: rgb(170, 170, 170);
    border-bottom-color: rgb(170, 170, 170);
    border-left-color: rgb(170, 170, 170);
    border-image: initial;
    border-top-style: initial;
    border-top-color: initial;
    >div {
      max-height: 300px;
      overflow-y: auto;
      padding-bottom: 4px;
      padding-top: 4px;
      position: relative;
      box-sizing: border-box;
      //options
      >div.red {
        color: rgb(237, 89, 33);
        cursor: pointer;
        display: block;
        font-size: inherit;
        padding: 8px 12px;
        width: 100%;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        box-sizing: border-box;
        background: rgb(239, 239, 239);
      }
      >div{
        background-color: transparent;
        color: rgb(51, 51, 51);
        cursor: default;
        display: block;
        font-size: inherit;
        padding: 8px 12px;
        width: 100%;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        box-sizing: border-box;
      }
    }
  }
  
`



function Widget({data}) {
  
  const containerRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [selections, setSelections] = useState();

  const toggleSelection = (e) => {
    setOpenMenu(!openMenu);
  }

  useEffect(()=> {
    setSelections({current: "", options: data});
  },[data])

  useEffect(()=> {
    function checkMouseDownLocation(e){
      if(containerRef.current && !containerRef.current.contains(e.target)){
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown",checkMouseDownLocation);

    return ()=> {
      document.removeEventListener("mousedown",checkMouseDownLocation);
    }
  },[containerRef])

  



  return <Container ref={containerRef} className="widget-container">
    <Display>{selections?.current}</Display>
    <SelectContainer openmenu={openMenu}>
      <div>
        <div>
          <div>{selections?.current}</div>
        </div>
        <div>
          <div aria-hidden="true">
            <span className={openMenu ? "icon-caret-up" : "icon-caret-down"} onClick={toggleSelection}></span>
          </div>
        </div>
      </div>
      {openMenu ?
        <div>
          <div>
            {selections && selections?.options?.map((option) =>
              <div className={ option === selections?.current ? "red": "" } onClick={()=> setSelections({...selections, current:option})} key={option}>{option}</div>
            )}
          </div>
        </div> : null}
    </SelectContainer>
  </Container>
}

export default Widget;