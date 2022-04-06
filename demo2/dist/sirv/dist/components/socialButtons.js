Sirv.define('SocialButtons', ['bHelpers', 'magicJS', 'EventEmitter', 'helper', 'globalFunctions'], function (bHelpers, magicJS, EventEmitter, helper, globalFunctions) {
  var moduleName = 'SocialButtons';
  var $J = magicJS;
  var $ = $J.$;
  /* start-removable-module-css */

  globalFunctions.rootDOM.addModuleCSSByName(moduleName, function () {
    return '.smv-manager-container,.smv-manager-container-mobile{display:inline-block;position:absolute;top:0;left:0;margin:12px;transition:opacity .3s linear;opacity:0;z-index:999999999999}.smv-buttons-container{pointer-events:none;display:none;margin:0 10px;opacity:0}.smv-share-container{display:inline-block}.smv-social-button{display:inline-block;width:36px;height:36px;margin-right:5px}.smv-social-button:nth-last-child(-n+1){margin-right:0}.smv-link{display:block;height:100%;outline:0;text-decoration:none}.smv-show{display:inline-block;opacity:1;pointer-events:auto}.smv-slides-box:hover .smv-manager-container{transition:opacity .3s linear;opacity:.999999}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-facebook:hover{background-color:#4267b2}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-twitter:hover{background-color:#1da1f2}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-linkedin:hover{background-color:#0073b0}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-reddit:hover{background-color:#ff640f}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-tumblr:hover{background-color:#395976}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-pinterest:hover{background-color:#cb2027}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-telegram:hover{background-color:#28a0d4}.smv-slides-box .smv-manager-container .smv-buttons-container .smv-social-button .smv-link .smv-share-icon.smv-share:hover{background-color:#000}.smv-share-icon{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:cover;mask-size:cover;height:100%;transition:background-color .3s linear;background-color:#999;background-image:none;background-size:cover}.smv-share-icon.smv-twitter{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHdpdHRlciBpY29uPC90aXRsZT48cGF0aCBkPSJNMjMuOTU0IDQuNTY5Yy0uODg1LjM4OS0xLjgzLjY1NC0yLjgyNS43NzUgMS4wMTQtLjYxMSAxLjc5NC0xLjU3NCAyLjE2My0yLjcyMy0uOTUxLjU1NS0yLjAwNS45NTktMy4xMjcgMS4xODQtLjg5Ni0uOTU5LTIuMTczLTEuNTU5LTMuNTkxLTEuNTU5LTIuNzE3IDAtNC45MiAyLjIwMy00LjkyIDQuOTE3IDAgLjM5LjA0NS43NjUuMTI3IDEuMTI0QzcuNjkxIDguMDk0IDQuMDY2IDYuMTMgMS42NCAzLjE2MWMtLjQyNy43MjItLjY2NiAxLjU2MS0uNjY2IDIuNDc1IDAgMS43MS44NyAzLjIxMyAyLjE4OCA0LjA5Ni0uODA3LS4wMjYtMS41NjYtLjI0OC0yLjIyOC0uNjE2di4wNjFjMCAyLjM4NSAxLjY5MyA0LjM3NCAzLjk0NiA0LjgyNy0uNDEzLjExMS0uODQ5LjE3MS0xLjI5Ni4xNzEtLjMxNCAwLS42MTUtLjAzLS45MTYtLjA4Ni42MzEgMS45NTMgMi40NDUgMy4zNzcgNC42MDQgMy40MTctMS42OCAxLjMxOS0zLjgwOSAyLjEwNS02LjEwMiAyLjEwNS0uMzkgMC0uNzc5LS4wMjMtMS4xNy0uMDY3IDIuMTg5IDEuMzk0IDQuNzY4IDIuMjA5IDcuNTU3IDIuMjA5IDkuMDU0IDAgMTMuOTk5LTcuNDk2IDEzLjk5OS0xMy45ODYgMC0uMjA5IDAtLjQyLS4wMTUtLjYzLjk2MS0uNjg5IDEuOC0xLjU2IDIuNDYtMi41NDhsLS4wNDctLjAyeiIvPjwvc3ZnPg==);mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHdpdHRlciBpY29uPC90aXRsZT48cGF0aCBkPSJNMjMuOTU0IDQuNTY5Yy0uODg1LjM4OS0xLjgzLjY1NC0yLjgyNS43NzUgMS4wMTQtLjYxMSAxLjc5NC0xLjU3NCAyLjE2My0yLjcyMy0uOTUxLjU1NS0yLjAwNS45NTktMy4xMjcgMS4xODQtLjg5Ni0uOTU5LTIuMTczLTEuNTU5LTMuNTkxLTEuNTU5LTIuNzE3IDAtNC45MiAyLjIwMy00LjkyIDQuOTE3IDAgLjM5LjA0NS43NjUuMTI3IDEuMTI0QzcuNjkxIDguMDk0IDQuMDY2IDYuMTMgMS42NCAzLjE2MWMtLjQyNy43MjItLjY2NiAxLjU2MS0uNjY2IDIuNDc1IDAgMS43MS44NyAzLjIxMyAyLjE4OCA0LjA5Ni0uODA3LS4wMjYtMS41NjYtLjI0OC0yLjIyOC0uNjE2di4wNjFjMCAyLjM4NSAxLjY5MyA0LjM3NCAzLjk0NiA0LjgyNy0uNDEzLjExMS0uODQ5LjE3MS0xLjI5Ni4xNzEtLjMxNCAwLS42MTUtLjAzLS45MTYtLjA4Ni42MzEgMS45NTMgMi40NDUgMy4zNzcgNC42MDQgMy40MTctMS42OCAxLjMxOS0zLjgwOSAyLjEwNS02LjEwMiAyLjEwNS0uMzkgMC0uNzc5LS4wMjMtMS4xNy0uMDY3IDIuMTg5IDEuMzk0IDQuNzY4IDIuMjA5IDcuNTU3IDIuMjA5IDkuMDU0IDAgMTMuOTk5LTcuNDk2IDEzLjk5OS0xMy45ODYgMC0uMjA5IDAtLjQyLS4wMTUtLjYzLjk2MS0uNjg5IDEuOC0xLjU2IDIuNDYtMi41NDhsLS4wNDctLjAyeiIvPjwvc3ZnPg==)}.smv-share-icon.smv-facebook{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RmFjZWJvb2sgaWNvbjwvdGl0bGU+PHBhdGggZD0iTTIzLjk5ODEgMTEuOTk5MUMyMy45OTgxIDUuMzcyMTYgMTguNjI2IDAgMTEuOTk5MSAwQzUuMzcyMTYgMCAwIDUuMzcyMTYgMCAxMS45OTkxQzAgMTcuOTg4MiA0LjM4Nzg5IDIyLjk1MjIgMTAuMTI0MiAyMy44NTI0VjE1LjQ2NzZINy4wNzc1OFYxMS45OTkxSDEwLjEyNDJWOS4zNTU1M0MxMC4xMjQyIDYuMzQ4MjYgMTEuOTE1NiA0LjY4NzE0IDE0LjY1NjQgNC42ODcxNEMxNS45NjkyIDQuNjg3MTQgMTcuMzQyNCA0LjkyMTQ5IDE3LjM0MjQgNC45MjE0OVY3Ljg3NDM5SDE1LjgyOTRDMTQuMzM4OCA3Ljg3NDM5IDEzLjg3MzkgOC43OTkzMyAxMy44NzM5IDkuNzQ4MjRWMTEuOTk5MUgxNy4yMDE4TDE2LjY2OTggMTUuNDY3NkgxMy44NzM5VjIzLjg1MjRDMTkuNjEwMyAyMi45NTIyIDIzLjk5ODEgMTcuOTg4MiAyMy45OTgxIDExLjk5OTFaIi8+PC9zdmc+);mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RmFjZWJvb2sgaWNvbjwvdGl0bGU+PHBhdGggZD0iTTIzLjk5ODEgMTEuOTk5MUMyMy45OTgxIDUuMzcyMTYgMTguNjI2IDAgMTEuOTk5MSAwQzUuMzcyMTYgMCAwIDUuMzcyMTYgMCAxMS45OTkxQzAgMTcuOTg4MiA0LjM4Nzg5IDIyLjk1MjIgMTAuMTI0MiAyMy44NTI0VjE1LjQ2NzZINy4wNzc1OFYxMS45OTkxSDEwLjEyNDJWOS4zNTU1M0MxMC4xMjQyIDYuMzQ4MjYgMTEuOTE1NiA0LjY4NzE0IDE0LjY1NjQgNC42ODcxNEMxNS45NjkyIDQuNjg3MTQgMTcuMzQyNCA0LjkyMTQ5IDE3LjM0MjQgNC45MjE0OVY3Ljg3NDM5SDE1LjgyOTRDMTQuMzM4OCA3Ljg3NDM5IDEzLjg3MzkgOC43OTkzMyAxMy44NzM5IDkuNzQ4MjRWMTEuOTk5MUgxNy4yMDE4TDE2LjY2OTggMTUuNDY3NkgxMy44NzM5VjIzLjg1MjRDMTkuNjEwMyAyMi45NTIyIDIzLjk5ODEgMTcuOTg4MiAyMy45OTgxIDExLjk5OTFaIi8+PC9zdmc+)}.smv-share-icon.smv-linkedin{-webkit-mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+IDxzdmcgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgMEMxMC43NDUyIDAgMCAxMC43NDUyIDAgMjRDMCAzNy4yNTQ4IDEwLjc0NTIgNDggMjQgNDhDMzcuMjU0OCA0OCA0OCAzNy4yNTQ4IDQ4IDI0QzQ4IDEwLjc0NTIgMzcuMjU0OCAwIDI0IDBaTTExLjUyMTYgMTkuODc3OEgxNi45NjA1VjM2LjIxOTZIMTEuNTIxNlYxOS44Nzc4Wk0xNy4zMTg4IDE0LjgyMjdDMTcuMjgzNSAxMy4yMjA0IDE2LjEzNzcgMTIgMTQuMjc3IDEyQzEyLjQxNjQgMTIgMTEuMiAxMy4yMjA0IDExLjIgMTQuODIyN0MxMS4yIDE2LjM5MTggMTIuMzgwNSAxNy42NDczIDE0LjIwNjQgMTcuNjQ3M0gxNC4yNDEyQzE2LjEzNzcgMTcuNjQ3MyAxNy4zMTg4IDE2LjM5MTggMTcuMzE4OCAxNC44MjI3Wk0zMC4zMTMxIDE5LjQ5NDFDMzMuODkyMiAxOS40OTQxIDM2LjU3NTQgMjEuODMwMyAzNi41NzU0IDI2Ljg0OTdMMzYuNTc1MiAzNi4yMTk2SDMxLjEzNjVWMjcuNDc2N0MzMS4xMzY1IDI1LjI4MDcgMzAuMzQ5NCAyMy43ODIyIDI4LjM4MDUgMjMuNzgyMkMyNi44Nzc5IDIzLjc4MjIgMjUuOTgyOSAyNC43OTI0IDI1LjU4OTggMjUuNzY4MkMyNS40NDYgMjYuMTE3OCAyNS40MTA3IDI2LjYwNSAyNS40MTA3IDI3LjA5MzRWMzYuMjJIMTkuOTcxMUMxOS45NzExIDM2LjIyIDIwLjA0MjggMjEuNDExNyAxOS45NzExIDE5Ljg3ODNIMjUuNDEwN1YyMi4xOTI5QzI2LjEzMjUgMjEuMDgwMiAyNy40MjU0IDE5LjQ5NDEgMzAuMzEzMSAxOS40OTQxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==);mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+IDxzdmcgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgMEMxMC43NDUyIDAgMCAxMC43NDUyIDAgMjRDMCAzNy4yNTQ4IDEwLjc0NTIgNDggMjQgNDhDMzcuMjU0OCA0OCA0OCAzNy4yNTQ4IDQ4IDI0QzQ4IDEwLjc0NTIgMzcuMjU0OCAwIDI0IDBaTTExLjUyMTYgMTkuODc3OEgxNi45NjA1VjM2LjIxOTZIMTEuNTIxNlYxOS44Nzc4Wk0xNy4zMTg4IDE0LjgyMjdDMTcuMjgzNSAxMy4yMjA0IDE2LjEzNzcgMTIgMTQuMjc3IDEyQzEyLjQxNjQgMTIgMTEuMiAxMy4yMjA0IDExLjIgMTQuODIyN0MxMS4yIDE2LjM5MTggMTIuMzgwNSAxNy42NDczIDE0LjIwNjQgMTcuNjQ3M0gxNC4yNDEyQzE2LjEzNzcgMTcuNjQ3MyAxNy4zMTg4IDE2LjM5MTggMTcuMzE4OCAxNC44MjI3Wk0zMC4zMTMxIDE5LjQ5NDFDMzMuODkyMiAxOS40OTQxIDM2LjU3NTQgMjEuODMwMyAzNi41NzU0IDI2Ljg0OTdMMzYuNTc1MiAzNi4yMTk2SDMxLjEzNjVWMjcuNDc2N0MzMS4xMzY1IDI1LjI4MDcgMzAuMzQ5NCAyMy43ODIyIDI4LjM4MDUgMjMuNzgyMkMyNi44Nzc5IDIzLjc4MjIgMjUuOTgyOSAyNC43OTI0IDI1LjU4OTggMjUuNzY4MkMyNS40NDYgMjYuMTE3OCAyNS40MTA3IDI2LjYwNSAyNS40MTA3IDI3LjA5MzRWMzYuMjJIMTkuOTcxMUMxOS45NzExIDM2LjIyIDIwLjA0MjggMjEuNDExNyAxOS45NzExIDE5Ljg3ODNIMjUuNDEwN1YyMi4xOTI5QzI2LjEzMjUgMjEuMDgwMiAyNy40MjU0IDE5LjQ5NDEgMzAuMzEzMSAxOS40OTQxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==)}.smv-share-icon.smv-reddit{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UmVkZGl0IGljb248L3RpdGxlPjxwYXRoIGQ9Ik0yLjIwNCAxNC4wNDljLS4wNi4yNzYtLjA5MS41Ni0uMDkxLjg0NyAwIDMuNDQzIDQuNDAyIDYuMjQ5IDkuODE0IDYuMjQ5IDUuNDEgMCA5LjgxMi0yLjgwNCA5LjgxMi02LjI0OSAwLS4yNzQtLjAyOS0uNTQ2LS4wODItLjgwOWwtLjAxNS0uMDMyYy0uMDIxLS4wNTUtLjAyOS0uMTEtLjAyOS0uMTY1LS4zMDItMS4xNzUtMS4xMTctMi4yNDEtMi4yOTYtMy4xMDMtLjA0NS0uMDE2LS4wODgtLjAzOS0uMTI2LS4wNy0uMDI2LS4wMi0uMDQ1LS4wNDItLjA2Ny0uMDY0LTEuNzkyLTEuMjM0LTQuMzU2LTIuMDA4LTcuMTk2LTIuMDA4LTIuODE1IDAtNS4zNTQuNzU5LTcuMTQ2IDEuOTcxLS4wMTQuMDE4LS4wMjkuMDMzLS4wNDkuMDQ5LS4wMzkuMDMzLS4wODQuMDYtLjEzLjA3NS0xLjIwNi44NjItMi4wNDIgMS45MzctMi4zNTQgMy4xMjMgMCAuMDU4LS4wMTQuMTE0LS4wMzcuMTcxbC0uMDA4LjAxNXptOS43NzMgNS40NDFjLTEuNzk0IDAtMy4wNTctLjM4OS0zLjg2My0xLjE5Ny0uMTczLS4xNzQtLjE3My0uNDU3IDAtLjYzMi4xNzYtLjE2NS40Ni0uMTY1LjYzNSAwIC42My42MjkgMS42ODUuOTQzIDMuMjI4Ljk0MyAxLjU0MiAwIDIuNTkxLS4zIDMuMjE5LS45MjkuMTY1LS4xNjQuNDUtLjE2NC42MjkgMCAuMTY1LjE4LjE2NS40NjUgMCAuNjQ1LS44MDkuODA4LTIuMDY1IDEuMTk4LTMuODYyIDEuMTk4bC4wMTQtLjAyOHptLTMuNjA2LTcuNTczYy0uOTE0IDAtMS42NzcuNzY1LTEuNjc3IDEuNjc3IDAgLjkxLjc2MyAxLjY1IDEuNjc3IDEuNjVzMS42NTEtLjc0IDEuNjUxLTEuNjVjMC0uOTEyLS43MzktMS42NzctMS42NTEtMS42Nzd6bTcuMjMzIDBjLS45MTQgMC0xLjY3OC43NjUtMS42NzggMS42NzcgMCAuOTEuNzY0IDEuNjUgMS42NzggMS42NXMxLjY1MS0uNzQgMS42NTEtMS42NWMwLS45MTItLjczOS0xLjY3Ny0xLjY1MS0xLjY3N3ptNC41NDgtMS41OTVjMS4wMzcuODMzIDEuOCAxLjgyMSAyLjE4OSAyLjkwNC40NS0uMzM2LjcxOS0uODY0LjcxOS0xLjQ0OSAwLTEuMDAyLS44MTUtMS44MTYtMS44MTgtMS44MTYtLjM5OSAwLS43NzguMTI5LTEuMDkuMzYzdi0uMDAyek0yLjcxMSA5Ljk2M2MtMS4wMDMgMC0xLjgxNy44MTYtMS44MTcgMS44MTggMCAuNTQzLjIzOSAxLjA0OC42NDQgMS4zODkuNDAxLTEuMDc5IDEuMTcyLTIuMDUzIDIuMjEzLTIuODc2LS4zMDItLjIxLS42NjMtLjMyOS0xLjAzOS0uMzI5di0uMDAyem05LjIxNyAxMi4wNzljLTUuOTA2IDAtMTAuNzA5LTMuMjA1LTEwLjcwOS03LjE0MiAwLS4yNzUuMDIzLS41NDQuMDY4LS44MDlDLjQ5NCAxMy41OTggMCAxMi43MjkgMCAxMS43NzdjMC0xLjQ5NiAxLjIyNy0yLjcxMyAyLjcyNS0yLjcxMy42NzQgMCAxLjMwMy4yNDYgMS43OTcuNjgyIDEuODU2LTEuMTkxIDQuMzU3LTEuOTQxIDcuMTEyLTEuOTkybDEuODEyLTUuNTI0LjQwNC4wOTVzLjAxNiAwIC4wMTYuMDAybDQuMjIzLjk5M2MuMzQ0LS43OTggMS4xMzgtMS4zNiAyLjA2NS0xLjM2IDEuMjI5IDAgMi4yMzEgMS4wMDQgMi4yMzEgMi4yMzQgMCAxLjIzMi0xLjAwMyAyLjIzNC0yLjIzMSAyLjIzNHMtMi4yMy0xLjAwNC0yLjIzLTIuMjNsLTMuODUxLS45MTItMS40NjcgNC40NzdjMi42NS4xMDUgNS4wNDcuODU0IDYuODQ0IDIuMDIxLjQ5NC0uNDY0IDEuMTQ0LS43MTkgMS44MzMtLjcxOSAxLjQ5OCAwIDIuNzE4IDEuMjEzIDIuNzE4IDIuNzExIDAgLjk4Ny0uNTQgMS44ODYtMS4zNzggMi4zNjUuMDI5LjI1NS4wNTkuNDk0LjA1OS43NDktLjAxNSAzLjkzOC00LjgwNiA3LjE0My0xMC43MiA3LjE0M2wtLjAzNC4wMDl6bTguMTc5LTE5LjE4N2MtLjc0IDAtMS4zNC41OTktMS4zNCAxLjMzOCAwIC43MzguNiAxLjM0IDEuMzQgMS4zNC43MzIgMCAxLjMzLS42IDEuMzMtMS4zMzQgMC0uNzMzLS41OTgtMS4zMzItMS4zNDctMS4zMzJsLjAxNy0uMDEyeiIvPjwvc3ZnPg==);mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UmVkZGl0IGljb248L3RpdGxlPjxwYXRoIGQ9Ik0yLjIwNCAxNC4wNDljLS4wNi4yNzYtLjA5MS41Ni0uMDkxLjg0NyAwIDMuNDQzIDQuNDAyIDYuMjQ5IDkuODE0IDYuMjQ5IDUuNDEgMCA5LjgxMi0yLjgwNCA5LjgxMi02LjI0OSAwLS4yNzQtLjAyOS0uNTQ2LS4wODItLjgwOWwtLjAxNS0uMDMyYy0uMDIxLS4wNTUtLjAyOS0uMTEtLjAyOS0uMTY1LS4zMDItMS4xNzUtMS4xMTctMi4yNDEtMi4yOTYtMy4xMDMtLjA0NS0uMDE2LS4wODgtLjAzOS0uMTI2LS4wNy0uMDI2LS4wMi0uMDQ1LS4wNDItLjA2Ny0uMDY0LTEuNzkyLTEuMjM0LTQuMzU2LTIuMDA4LTcuMTk2LTIuMDA4LTIuODE1IDAtNS4zNTQuNzU5LTcuMTQ2IDEuOTcxLS4wMTQuMDE4LS4wMjkuMDMzLS4wNDkuMDQ5LS4wMzkuMDMzLS4wODQuMDYtLjEzLjA3NS0xLjIwNi44NjItMi4wNDIgMS45MzctMi4zNTQgMy4xMjMgMCAuMDU4LS4wMTQuMTE0LS4wMzcuMTcxbC0uMDA4LjAxNXptOS43NzMgNS40NDFjLTEuNzk0IDAtMy4wNTctLjM4OS0zLjg2My0xLjE5Ny0uMTczLS4xNzQtLjE3My0uNDU3IDAtLjYzMi4xNzYtLjE2NS40Ni0uMTY1LjYzNSAwIC42My42MjkgMS42ODUuOTQzIDMuMjI4Ljk0MyAxLjU0MiAwIDIuNTkxLS4zIDMuMjE5LS45MjkuMTY1LS4xNjQuNDUtLjE2NC42MjkgMCAuMTY1LjE4LjE2NS40NjUgMCAuNjQ1LS44MDkuODA4LTIuMDY1IDEuMTk4LTMuODYyIDEuMTk4bC4wMTQtLjAyOHptLTMuNjA2LTcuNTczYy0uOTE0IDAtMS42NzcuNzY1LTEuNjc3IDEuNjc3IDAgLjkxLjc2MyAxLjY1IDEuNjc3IDEuNjVzMS42NTEtLjc0IDEuNjUxLTEuNjVjMC0uOTEyLS43MzktMS42NzctMS42NTEtMS42Nzd6bTcuMjMzIDBjLS45MTQgMC0xLjY3OC43NjUtMS42NzggMS42NzcgMCAuOTEuNzY0IDEuNjUgMS42NzggMS42NXMxLjY1MS0uNzQgMS42NTEtMS42NWMwLS45MTItLjczOS0xLjY3Ny0xLjY1MS0xLjY3N3ptNC41NDgtMS41OTVjMS4wMzcuODMzIDEuOCAxLjgyMSAyLjE4OSAyLjkwNC40NS0uMzM2LjcxOS0uODY0LjcxOS0xLjQ0OSAwLTEuMDAyLS44MTUtMS44MTYtMS44MTgtMS44MTYtLjM5OSAwLS43NzguMTI5LTEuMDkuMzYzdi0uMDAyek0yLjcxMSA5Ljk2M2MtMS4wMDMgMC0xLjgxNy44MTYtMS44MTcgMS44MTggMCAuNTQzLjIzOSAxLjA0OC42NDQgMS4zODkuNDAxLTEuMDc5IDEuMTcyLTIuMDUzIDIuMjEzLTIuODc2LS4zMDItLjIxLS42NjMtLjMyOS0xLjAzOS0uMzI5di0uMDAyem05LjIxNyAxMi4wNzljLTUuOTA2IDAtMTAuNzA5LTMuMjA1LTEwLjcwOS03LjE0MiAwLS4yNzUuMDIzLS41NDQuMDY4LS44MDlDLjQ5NCAxMy41OTggMCAxMi43MjkgMCAxMS43NzdjMC0xLjQ5NiAxLjIyNy0yLjcxMyAyLjcyNS0yLjcxMy42NzQgMCAxLjMwMy4yNDYgMS43OTcuNjgyIDEuODU2LTEuMTkxIDQuMzU3LTEuOTQxIDcuMTEyLTEuOTkybDEuODEyLTUuNTI0LjQwNC4wOTVzLjAxNiAwIC4wMTYuMDAybDQuMjIzLjk5M2MuMzQ0LS43OTggMS4xMzgtMS4zNiAyLjA2NS0xLjM2IDEuMjI5IDAgMi4yMzEgMS4wMDQgMi4yMzEgMi4yMzQgMCAxLjIzMi0xLjAwMyAyLjIzNC0yLjIzMSAyLjIzNHMtMi4yMy0xLjAwNC0yLjIzLTIuMjNsLTMuODUxLS45MTItMS40NjcgNC40NzdjMi42NS4xMDUgNS4wNDcuODU0IDYuODQ0IDIuMDIxLjQ5NC0uNDY0IDEuMTQ0LS43MTkgMS44MzMtLjcxOSAxLjQ5OCAwIDIuNzE4IDEuMjEzIDIuNzE4IDIuNzExIDAgLjk4Ny0uNTQgMS44ODYtMS4zNzggMi4zNjUuMDI5LjI1NS4wNTkuNDk0LjA1OS43NDktLjAxNSAzLjkzOC00LjgwNiA3LjE0My0xMC43MiA3LjE0M2wtLjAzNC4wMDl6bTguMTc5LTE5LjE4N2MtLjc0IDAtMS4zNC41OTktMS4zNCAxLjMzOCAwIC43MzguNiAxLjM0IDEuMzQgMS4zNC43MzIgMCAxLjMzLS42IDEuMzMtMS4zMzQgMC0uNzMzLS41OTgtMS4zMzItMS4zNDctMS4zMzJsLjAxNy0uMDEyeiIvPjwvc3ZnPg==)}.smv-share-icon.smv-tumblr{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHVtYmxyIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0xNC41NjMgMjRjLTUuMDkzIDAtNy4wMzEtMy43NTYtNy4wMzEtNi40MTFWOS43NDdINS4xMTZWNi42NDhjMy42My0xLjMxMyA0LjUxMi00LjU5NiA0LjcxLTYuNDY5QzkuODQuMDUxIDkuOTQxIDAgOS45OTkgMGgzLjUxN3Y2LjExNGg0LjgwMXYzLjYzM2gtNC44MnY3LjQ3Yy4wMTYgMS4wMDEuMzc1IDIuMzcxIDIuMjA3IDIuMzcxaC4wOWMuNjMxLS4wMiAxLjQ4Ni0uMjA1IDEuOTM2LS40MTlsMS4xNTYgMy40MjVjLS40MzYuNjM2LTIuNCAxLjM3NC00LjE1NiAxLjQwNGgtLjE3OGwuMDExLjAwMnoiLz48L3N2Zz4=);mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHVtYmxyIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0xNC41NjMgMjRjLTUuMDkzIDAtNy4wMzEtMy43NTYtNy4wMzEtNi40MTFWOS43NDdINS4xMTZWNi42NDhjMy42My0xLjMxMyA0LjUxMi00LjU5NiA0LjcxLTYuNDY5QzkuODQuMDUxIDkuOTQxIDAgOS45OTkgMGgzLjUxN3Y2LjExNGg0LjgwMXYzLjYzM2gtNC44MnY3LjQ3Yy4wMTYgMS4wMDEuMzc1IDIuMzcxIDIuMjA3IDIuMzcxaC4wOWMuNjMxLS4wMiAxLjQ4Ni0uMjA1IDEuOTM2LS40MTlsMS4xNTYgMy40MjVjLS40MzYuNjM2LTIuNCAxLjM3NC00LjE1NiAxLjQwNGgtLjE3OGwuMDExLjAwMnoiLz48L3N2Zz4=)}.smv-share-icon.smv-pinterest{-webkit-mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjguMSAoMjk2ODcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPnBpbnRlcmVzdCBbIzE4MF08L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJpYmJibGUtTGlnaHQtUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMC4wMDAwMDAsIC03Mzk5LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU2LjAwMDAwMCwgMTYwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3My44NzYsNzIzOSBDMTY4LjM5OSw3MjM5IDE2NCw3MjQzLjQzNDgxIDE2NCw3MjQ4Ljk1ODY2IEMxNjQsNzI1My4wNTg2OSAxNjYuNDA3LDcyNTYuNDg5MTYgMTY5Ljg5Myw3MjU4LjA3OTM2IEMxNjkuODkzLDcyNTYuMjExODYgMTY5Ljg4LDcyNTYuNDUyODYgMTcxLjMwMyw3MjUwLjM4MDQ2IEMxNzAuNTIxLDcyNDguODAyMzYgMTcxLjEyOSw3MjQ2LjE5NjczIDE3Mi44OCw3MjQ2LjE5NjczIEMxNzUuMzEsNzI0Ni4xOTY3MyAxNzMuNjU5LDcyNDkuNzk5NjQgMTczLjM3OCw3MjUxLjIxNzQgQzE3My4xMjksNzI1Mi4zMDU0NCAxNzMuOTU5LDcyNTMuMTQyMzggMTc0Ljk1NSw3MjUzLjE0MjM4IEMxNzYuODY0LDcyNTMuMTQyMzggMTc4LjEwOCw3MjUwLjcxNTI0IDE3OC4xMDgsNzI0Ny44NzA2MyBDMTc4LjEwOCw3MjQ1LjY5NDU2IDE3Ni42MTUsNzI0NC4xMDQzNyAxNzQuMDQyLDcyNDQuMTA0MzcgQzE2OS40NjcsNzI0NC4xMDQzNyAxNjguMzA3LDcyNDkuMTk5NjYgMTY5Ljg5Myw3MjUwLjc5ODkzIEMxNzAuMjkyLDcyNTEuNDAyOTQgMTY5Ljg5Myw3MjUxLjQzMTE4IDE2OS44OTMsNzI1Mi4yMjE3NCBDMTY5LjYxNiw3MjUzLjA1NzY4IDE2Ny40MDMsNzI1MS44NDI1OSAxNjcuNDAzLDcyNDguNzA3NTcgQzE2Ny40MDMsNzI0NS44NjE5NSAxNjkuNzI3LDcyNDIuNTE1MTggMTc0LjQ1Nyw3MjQyLjUxNTE4IEMxNzguMTkxLDcyNDIuNTE1MTggMTgwLjY4MSw3MjQ1LjI3NjA5IDE4MC42ODEsNzI0OC4yMDU0IEMxODAuNjgxLDcyNTIuMTM4MDUgMTc4LjUyMyw3MjU0Ljk4MzY2IDE3NS4zNyw3MjU0Ljk4MzY2IEMxNzQuMjkxLDcyNTQuOTgzNjYgMTczLjI5NSw3MjU0LjM5NzggMTcyLjk2Myw3MjUzLjcyODI0IEMxNzIuMzYsNzI1Ni4wNzM3MSAxNzIuMjM4LDcyNTcuMjYyNTggMTcxLjMwMyw3MjU4LjU4MTUzIEMxNzIuMjE2LDcyNTguODMyNjEgMTczLjEyOSw3MjU5IDE3NC4xMjUsNzI1OSBDMTc5LjYwMiw3MjU5IDE4NCw3MjU0LjU2NTE5IDE4NCw3MjQ5LjA0MjM1IEMxODMuNzUyLDcyNDMuNDM0ODEgMTc5LjM1Myw3MjM5IDE3My44NzYsNzIzOSIgaWQ9InBpbnRlcmVzdC1bIzE4MF0iPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjguMSAoMjk2ODcpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPnBpbnRlcmVzdCBbIzE4MF08L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJpYmJibGUtTGlnaHQtUHJldmlldyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMC4wMDAwMDAsIC03Mzk5LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iaWNvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU2LjAwMDAwMCwgMTYwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3My44NzYsNzIzOSBDMTY4LjM5OSw3MjM5IDE2NCw3MjQzLjQzNDgxIDE2NCw3MjQ4Ljk1ODY2IEMxNjQsNzI1My4wNTg2OSAxNjYuNDA3LDcyNTYuNDg5MTYgMTY5Ljg5Myw3MjU4LjA3OTM2IEMxNjkuODkzLDcyNTYuMjExODYgMTY5Ljg4LDcyNTYuNDUyODYgMTcxLjMwMyw3MjUwLjM4MDQ2IEMxNzAuNTIxLDcyNDguODAyMzYgMTcxLjEyOSw3MjQ2LjE5NjczIDE3Mi44OCw3MjQ2LjE5NjczIEMxNzUuMzEsNzI0Ni4xOTY3MyAxNzMuNjU5LDcyNDkuNzk5NjQgMTczLjM3OCw3MjUxLjIxNzQgQzE3My4xMjksNzI1Mi4zMDU0NCAxNzMuOTU5LDcyNTMuMTQyMzggMTc0Ljk1NSw3MjUzLjE0MjM4IEMxNzYuODY0LDcyNTMuMTQyMzggMTc4LjEwOCw3MjUwLjcxNTI0IDE3OC4xMDgsNzI0Ny44NzA2MyBDMTc4LjEwOCw3MjQ1LjY5NDU2IDE3Ni42MTUsNzI0NC4xMDQzNyAxNzQuMDQyLDcyNDQuMTA0MzcgQzE2OS40NjcsNzI0NC4xMDQzNyAxNjguMzA3LDcyNDkuMTk5NjYgMTY5Ljg5Myw3MjUwLjc5ODkzIEMxNzAuMjkyLDcyNTEuNDAyOTQgMTY5Ljg5Myw3MjUxLjQzMTE4IDE2OS44OTMsNzI1Mi4yMjE3NCBDMTY5LjYxNiw3MjUzLjA1NzY4IDE2Ny40MDMsNzI1MS44NDI1OSAxNjcuNDAzLDcyNDguNzA3NTcgQzE2Ny40MDMsNzI0NS44NjE5NSAxNjkuNzI3LDcyNDIuNTE1MTggMTc0LjQ1Nyw3MjQyLjUxNTE4IEMxNzguMTkxLDcyNDIuNTE1MTggMTgwLjY4MSw3MjQ1LjI3NjA5IDE4MC42ODEsNzI0OC4yMDU0IEMxODAuNjgxLDcyNTIuMTM4MDUgMTc4LjUyMyw3MjU0Ljk4MzY2IDE3NS4zNyw3MjU0Ljk4MzY2IEMxNzQuMjkxLDcyNTQuOTgzNjYgMTczLjI5NSw3MjU0LjM5NzggMTcyLjk2Myw3MjUzLjcyODI0IEMxNzIuMzYsNzI1Ni4wNzM3MSAxNzIuMjM4LDcyNTcuMjYyNTggMTcxLjMwMyw3MjU4LjU4MTUzIEMxNzIuMjE2LDcyNTguODMyNjEgMTczLjEyOSw3MjU5IDE3NC4xMjUsNzI1OSBDMTc5LjYwMiw3MjU5IDE4NCw3MjU0LjU2NTE5IDE4NCw3MjQ5LjA0MjM1IEMxODMuNzUyLDcyNDMuNDM0ODEgMTc5LjM1Myw3MjM5IDE3My44NzYsNzIzOSIgaWQ9InBpbnRlcmVzdC1bIzE4MF0iPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+)}.smv-share-icon.smv-telegram{-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48dGl0bGU+VGVsZWdyYW0gaWNvbjwvdGl0bGU+PHBhdGggZD0iTTIzLjkxIDMuNzlMMjAuMyAyMC44NGMtLjI1IDEuMjEtLjk4IDEuNS0yIC45NGwtNS41LTQuMDctMi42NiAyLjU3Yy0uMy4zLS41NS41Ni0xLjEuNTYtLjcyIDAtLjYtLjI3LS44NC0uOTVMNi4zIDEzLjdsLTUuNDUtMS43Yy0xLjE4LS4zNS0xLjE5LTEuMTYuMjYtMS43NWwyMS4yNi04LjJjLjk3LS40MyAxLjkuMjQgMS41MyAxLjczeiIvPjwvc3ZnPg==);mask-image:url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48dGl0bGU+VGVsZWdyYW0gaWNvbjwvdGl0bGU+PHBhdGggZD0iTTIzLjkxIDMuNzlMMjAuMyAyMC44NGMtLjI1IDEuMjEtLjk4IDEuNS0yIC45NGwtNS41LTQuMDctMi42NiAyLjU3Yy0uMy4zLS41NS41Ni0xLjEuNTYtLjcyIDAtLjYtLjI3LS44NC0uOTVMNi4zIDEzLjdsLTUuNDUtMS43Yy0xLjE4LS4zNS0xLjE5LTEuMTYuMjYtMS43NWwyMS4yNi04LjJjLjk3LS40MyAxLjkuMjQgMS41MyAxLjczeiIvPjwvc3ZnPg==)}.smv-share-icon.smv-share{-webkit-mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQzMC4xMTdweCIgaGVpZ2h0PSI0MzAuMTE4cHgiIHZpZXdCb3g9IjAgMCA0MzAuMTE3IDQzMC4xMTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzMC4xMTcgNDMwLjExODsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggaWQ9IlNoYXJlVGhpcyIgZD0iTTE1MS44MDQsMjE1LjA1OWMwLDEuNDc1LTAuMzM2LDIuODU2LTAuNDIzLDQuMzI2bDE1NC4xMTEsNzcuMDMNCgkJYzEzLjE5NC0xMS4xNzMsMzAuMDc1LTE4LjE0Niw0OC43MjUtMTguMTQ2YzQxLjkyNSwwLjAwOSw3NS45LDMzLjk4NSw3NS45LDc1LjkwNWMwLDQxLjk2Ny0zMy45NzYsNzUuOTQyLTc1LjksNzUuOTQyDQoJCWMtNDEuOTYxLDAtNzUuOS0zMy45NzYtNzUuOS03NS45NDJjMC0xLjUxMiwwLjMzNi0yLjg2MSwwLjQyLTQuMzI2bC0xNTQuMTExLTc3LjAzNWMtMTMuMjM0LDExLjEzMS0zMC4wNzUsMTguMTA0LTQ4LjcyNSwxOC4xMDQNCgkJYy00MS45MjIsMC03NS45LTMzLjkzOC03NS45LTc1Ljg1OGMwLTQxLjk2MiwzMy45NzktNzUuOTQ1LDc1LjktNzUuOTQ1YzE4LjY0OSwwLDM1LjQ5Niw3LjAxNyw0OC43MjUsMTguMTQ4bDE1NC4xMTEtNzcuMDM1DQoJCWMtMC4wODQtMS40NzMtMC40Mi0yLjg1OC0wLjQyLTQuMzY4YzAtNDEuODgsMzMuOTM5LTc1Ljg1OSw3NS45LTc1Ljg1OWM0MS45MjUsMCw3NS45LDMzLjk3OSw3NS45LDc1Ljg1OQ0KCQljMCw0MS45NTktMzMuOTc2LDc1Ljk0NS03NS45LDc1Ljk0NWMtMTguNjkxLDAtMzUuNTM5LTcuMDE3LTQ4LjcyNS0xOC4xOWwtMTU0LjExMSw3Ny4wNzcNCgkJQzE1MS40NjMsMjEyLjE2MywxNTEuODA0LDIxMy41NDksMTUxLjgwNCwyMTUuMDU5eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);mask-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQzMC4xMTdweCIgaGVpZ2h0PSI0MzAuMTE4cHgiIHZpZXdCb3g9IjAgMCA0MzAuMTE3IDQzMC4xMTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzMC4xMTcgNDMwLjExODsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggaWQ9IlNoYXJlVGhpcyIgZD0iTTE1MS44MDQsMjE1LjA1OWMwLDEuNDc1LTAuMzM2LDIuODU2LTAuNDIzLDQuMzI2bDE1NC4xMTEsNzcuMDMNCgkJYzEzLjE5NC0xMS4xNzMsMzAuMDc1LTE4LjE0Niw0OC43MjUtMTguMTQ2YzQxLjkyNSwwLjAwOSw3NS45LDMzLjk4NSw3NS45LDc1LjkwNWMwLDQxLjk2Ny0zMy45NzYsNzUuOTQyLTc1LjksNzUuOTQyDQoJCWMtNDEuOTYxLDAtNzUuOS0zMy45NzYtNzUuOS03NS45NDJjMC0xLjUxMiwwLjMzNi0yLjg2MSwwLjQyLTQuMzI2bC0xNTQuMTExLTc3LjAzNWMtMTMuMjM0LDExLjEzMS0zMC4wNzUsMTguMTA0LTQ4LjcyNSwxOC4xMDQNCgkJYy00MS45MjIsMC03NS45LTMzLjkzOC03NS45LTc1Ljg1OGMwLTQxLjk2MiwzMy45NzktNzUuOTQ1LDc1LjktNzUuOTQ1YzE4LjY0OSwwLDM1LjQ5Niw3LjAxNyw0OC43MjUsMTguMTQ4bDE1NC4xMTEtNzcuMDM1DQoJCWMtMC4wODQtMS40NzMtMC40Mi0yLjg1OC0wLjQyLTQuMzY4YzAtNDEuODgsMzMuOTM5LTc1Ljg1OSw3NS45LTc1Ljg1OWM0MS45MjUsMCw3NS45LDMzLjk3OSw3NS45LDc1Ljg1OQ0KCQljMCw0MS45NTktMzMuOTc2LDc1Ljk0NS03NS45LDc1Ljk0NWMtMTguNjkxLDAtMzUuNTM5LTcuMDE3LTQ4LjcyNS0xOC4xOWwtMTU0LjExMSw3Ny4wNzcNCgkJQzE1MS40NjMsMjEyLjE2MywxNTEuODA0LDIxMy41NDksMTUxLjgwNCwyMTUuMDU5eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=)}';
  });
  /* end-removable-module-css */

  var buttonsContainer = {};
  /* eslint-env es6 */

  /* global EventEmitter, $J*/

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var SocialButton = /*#__PURE__*/function (_EventEmitter) {
    "use strict";

    bHelpers.inheritsLoose(SocialButton, _EventEmitter);

    function SocialButton(data) {
      var _this;

      _this = _EventEmitter.call(this) || this;
      _this.name = 'blank';
      _this.dataButton = data;
      _this.linkClass = 'smv-link';
      _this.wrapClass = 'smv-share-icon';
      _this.conteiner = null;
      _this.a = null;
      _this.nodeForImg = null;
      _this.target = '_blank';
      _this.fullLink = null;
      return _this;
    }

    var _proto = SocialButton.prototype;

    _proto.init = function init() {
      this.conteiner = $J.$new('div');
      this.conteiner.addClass('smv-social-button');
      this.a = $J.$new('a');
      this.a.addClass(this.linkClass);
      this.nodeForImg = $J.$new('div');
      this.nodeForImg.addClass(this.wrapClass);

      if (!this.dataButton) {
        this.dataButton = {
          text: '',
          title: ''
        };
      }

      if (this.dataButton && !this.dataButton.title) {
        this.dataButton.title = '';
      }

      if (this.dataButton && !this.dataButton.text) {
        this.dataButton.text = '';
      }

      this.buildButton();
      this.setEvents();
    };

    _proto.buildButton = function buildButton() {
      this.a.append(this.nodeForImg);
      this.conteiner.append(this.a);
    };

    _proto.setEvents = function setEvents() {
      var _this2 = this;

      this.a.addEvent('btnclick tap', function () {
        $J.W.node.open(_this2.fullLink, _this2.target);
      });
    };

    _proto.show = function show() {
      this.conteiner.setCss({
        opacity: 1
      });
    };

    _proto.hide = function hide() {
      this.conteiner.setCss({
        opacity: 0
      });
    };

    _proto.destroy = function destroy() {
      this.name = null;
      this.dataButton = null;
      this.linkClass = null;
      this.wrapClass = null;
      this.conteiner.remove();
      this.conteiner = null;
      this.a.removeEvent('btnclick');
      this.a.removeEvent('tap');
      this.a.remove();
      this.a = null;
      this.nodeForImg.remove();
      this.nodeForImg = null;
      this.target = null;
      this.fullLink = null;
    };

    return SocialButton;
  }(EventEmitter);
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars


  var FacebookSocialButton = /*#__PURE__*/function (_SocialButton) {
    "use strict";

    bHelpers.inheritsLoose(FacebookSocialButton, _SocialButton);

    function FacebookSocialButton(data) {
      var _this3;

      _this3 = _SocialButton.call(this, data) || this;
      _this3.name = 'facebook';
      _this3.prefix = 'sharer/sharer.php?s=100';
      _this3.url = 'https://www.facebook.com/';

      _this3.init();

      _this3.setClasses();

      return _this3;
    }

    var _proto2 = FacebookSocialButton.prototype;

    _proto2.init = function init() {
      _SocialButton.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto2.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += '&p[title]=' + encodeURIComponent(this.dataButton.title);
      result += '&p[summary]=' + encodeURIComponent(this.dataButton.text);
      result += '&p[url]=' + encodeURIComponent(this.dataButton.link);
      this.fullLink = result;
      return result;
    };

    _proto2.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto2.getNode = function getNode() {
      return this.conteiner;
    };

    _proto2.destroy = function destroy() {
      _SocialButton.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return FacebookSocialButton;
  }(SocialButton);

  buttonsContainer.Facebook = FacebookSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var LinkedinSocialButton = /*#__PURE__*/function (_SocialButton2) {
    "use strict";

    bHelpers.inheritsLoose(LinkedinSocialButton, _SocialButton2);

    function LinkedinSocialButton(data) {
      var _this4;

      _this4 = _SocialButton2.call(this, data) || this;
      _this4.name = 'linkedin';
      _this4.prefix = 'cws/share?';
      _this4.url = 'https://www.linkedin.com/';

      _this4.init();

      _this4.setClasses();

      return _this4;
    }

    var _proto3 = LinkedinSocialButton.prototype;

    _proto3.init = function init() {
      _SocialButton2.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto3.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'url=' + encodeURIComponent(this.dataButton.link);
      result += '&[title]=' + encodeURIComponent(this.dataButton.title);
      result += '&[summary]=' + encodeURIComponent(this.dataButton.text);
      this.fullLink = result;
      return result;
    };

    _proto3.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto3.getNode = function getNode() {
      return this.conteiner;
    };

    _proto3.destroy = function destroy() {
      _SocialButton2.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return LinkedinSocialButton;
  }(SocialButton);

  buttonsContainer.Linkedin = LinkedinSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var TwitterSocialButton = /*#__PURE__*/function (_SocialButton3) {
    "use strict";

    bHelpers.inheritsLoose(TwitterSocialButton, _SocialButton3);

    function TwitterSocialButton(data) {
      var _this5;

      _this5 = _SocialButton3.call(this, data) || this;
      _this5.name = 'twitter';
      _this5.prefix = 'share?';
      _this5.url = 'https://www.twitter.com/';

      _this5.init();

      _this5.setClasses();

      return _this5;
    }

    var _proto4 = TwitterSocialButton.prototype;

    _proto4.init = function init() {
      _SocialButton3.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto4.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'text=' + encodeURIComponent(this.dataButton.title);
      result += '&url=' + encodeURIComponent(this.dataButton.link);
      this.fullLink = result;
      return result;
    };

    _proto4.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto4.getNode = function getNode() {
      return this.conteiner;
    };

    _proto4.destroy = function destroy() {
      _SocialButton3.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return TwitterSocialButton;
  }(SocialButton);

  buttonsContainer.Twitter = TwitterSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var RedditSocialButton = /*#__PURE__*/function (_SocialButton4) {
    "use strict";

    bHelpers.inheritsLoose(RedditSocialButton, _SocialButton4);

    function RedditSocialButton(data) {
      var _this6;

      _this6 = _SocialButton4.call(this, data) || this;
      _this6.name = 'reddit';
      _this6.prefix = 'submit?';
      _this6.url = 'https://www.reddit.com/';

      _this6.init();

      _this6.setClasses();

      return _this6;
    }

    var _proto5 = RedditSocialButton.prototype;

    _proto5.init = function init() {
      _SocialButton4.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto5.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'url=' + encodeURIComponent(this.dataButton.link);
      result += '&title=' + encodeURIComponent(this.dataButton.title);
      this.fullLink = result;
      return result;
    };

    _proto5.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto5.getNode = function getNode() {
      return this.conteiner;
    };

    _proto5.destroy = function destroy() {
      _SocialButton4.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return RedditSocialButton;
  }(SocialButton);

  buttonsContainer.Reddit = RedditSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var TumblrSocialButton = /*#__PURE__*/function (_SocialButton5) {
    "use strict";

    bHelpers.inheritsLoose(TumblrSocialButton, _SocialButton5);

    function TumblrSocialButton(data) {
      var _this7;

      _this7 = _SocialButton5.call(this, data) || this;
      _this7.name = 'tumblr';
      _this7.prefix = 'share?';
      _this7.url = 'https://www.tumblr.com/';

      _this7.init();

      _this7.setClasses();

      return _this7;
    }

    var _proto6 = TumblrSocialButton.prototype;

    _proto6.init = function init() {
      _SocialButton5.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto6.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'url=' + encodeURIComponent(this.dataButton.link);
      result += '&text=' + encodeURIComponent(this.dataButton.text);
      result += '&title=' + encodeURIComponent(this.dataButton.title);
      this.fullLink = result;
      return result;
    };

    _proto6.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto6.getNode = function getNode() {
      return this.conteiner;
    };

    _proto6.destroy = function destroy() {
      _SocialButton5.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return TumblrSocialButton;
  }(SocialButton);

  buttonsContainer.Tumblr = TumblrSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var PinterestSocialButton = /*#__PURE__*/function (_SocialButton6) {
    "use strict";

    bHelpers.inheritsLoose(PinterestSocialButton, _SocialButton6);

    function PinterestSocialButton(data) {
      var _this8;

      _this8 = _SocialButton6.call(this, data) || this;
      _this8.name = 'pinterest';
      _this8.prefix = 'pin/create/button/?';
      _this8.url = 'https://www.pinterest.com/';

      _this8.init();

      _this8.setClasses();

      return _this8;
    }

    var _proto7 = PinterestSocialButton.prototype;

    _proto7.init = function init() {
      _SocialButton6.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto7.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'url=' + encodeURIComponent(this.dataButton.link);
      result += '&description=' + encodeURIComponent(this.dataButton.title);
      this.fullLink = result;
      return result;
    };

    _proto7.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto7.getNode = function getNode() {
      return this.conteiner;
    };

    _proto7.destroy = function destroy() {
      _SocialButton6.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return PinterestSocialButton;
  }(SocialButton);

  buttonsContainer.Pinterest = PinterestSocialButton;
  /* eslint-env es6 */

  /* global buttonsContainer, SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var TelegramSocialButton = /*#__PURE__*/function (_SocialButton7) {
    "use strict";

    bHelpers.inheritsLoose(TelegramSocialButton, _SocialButton7);

    function TelegramSocialButton(data) {
      var _this9;

      _this9 = _SocialButton7.call(this, data) || this;
      _this9.name = 'telegram';
      _this9.prefix = 'share/url?';
      _this9.url = 'https://telegram.me/';

      _this9.init();

      _this9.setClasses();

      return _this9;
    }

    var _proto8 = TelegramSocialButton.prototype;

    _proto8.init = function init() {
      _SocialButton7.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
      this.a.attr('target', this.target);
    };

    _proto8.buildLink = function buildLink() {
      var result = this.url + this.prefix;
      result += 'url=' + encodeURIComponent(this.dataButton.link);
      result += '&text=' + encodeURIComponent(this.dataButton.title);
      this.fullLink = result;
      return result;
    };

    _proto8.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto8.getNode = function getNode() {
      return this.conteiner;
    };

    _proto8.destroy = function destroy() {
      _SocialButton7.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
    };

    return TelegramSocialButton;
  }(SocialButton);

  buttonsContainer.Telegram = TelegramSocialButton;
  /* eslint-env es6 */

  /* global SocialButton */

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */
  // eslint-disable-next-line no-unused-vars

  var ShareSocialButton = /*#__PURE__*/function (_SocialButton8) {
    "use strict";

    bHelpers.inheritsLoose(ShareSocialButton, _SocialButton8);

    function ShareSocialButton(data) {
      var _this10;

      _this10 = _SocialButton8.call(this, data) || this;
      _this10.name = 'share';
      _this10.control = true;

      _this10.init();

      _this10.setClasses();

      return _this10;
    }

    var _proto9 = ShareSocialButton.prototype;

    _proto9.init = function init() {
      _SocialButton8.prototype.init.call(this);

      this.a.attr('href', this.buildLink());
    };

    _proto9.buildLink = function buildLink() {
      var result = '#';
      this.fullLink = result;
      return result;
    };

    _proto9.setClasses = function setClasses() {
      this.a.attr('title', this.name.charAt(0).toUpperCase() + this.name.substring(1));
      this.nodeForImg.addClass('smv-' + this.name);
    };

    _proto9.setEvents = function setEvents() {
      var _this11 = this;

      this.a.addEvent('btnclick tap', function () {
        _this11.emit('eventButton', {
          data: _this11.control
        });

        if (_this11.control) {
          _this11.control = false;
        } else {
          _this11.control = true;
        }
      });
    };

    _proto9.setControl = function setControl(control) {
      this.control = control;
    };

    _proto9.getNode = function getNode() {
      return this.conteiner;
    };

    _proto9.destroy = function destroy() {
      _SocialButton8.prototype.destroy.call(this);

      this.name = null;
      this.prefix = null;
      this.url = null;
      this.control = null;
    };

    return ShareSocialButton;
  }(SocialButton);
  /* eslint-env es6 */

  /* global EventEmitter, helper, buttonsContainer, ShareSocialButton, $J*/

  /* eslint-disable indent */

  /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */

  /* eslint no-unused-vars: ["error", { "args": "none", "varsIgnorePattern": "SirvSlider" }] */


  var getClassName = function (str) {
    return $J.camelize('-' + str);
  }; // eslint-disable-next-line no-unused-vars


  var SocialButtonManager = /*#__PURE__*/function (_EventEmitter2) {
    "use strict";

    bHelpers.inheritsLoose(SocialButtonManager, _EventEmitter2);

    function SocialButtonManager(data, options, parentNode) {
      var _this12;

      _this12 = _EventEmitter2.call(this) || this;
      _this12.data = data;
      _this12.options = $J.extend({
        facebook: true,
        twitter: true,
        linkedin: true,
        reddit: true,
        tumblr: true,
        pinterest: true,
        telegram: true
      }, options || {});
      _this12.classes = [];
      _this12.managerContainer = null;
      _this12.managerButtonsContainer = null;
      _this12.managerShareContainer = null;
      _this12.nodeContainer = parentNode;
      _this12.shareButton = null;
      _this12.lastState = false;
      _this12.capShareBut = {
        text: '',
        link: '#',
        title: ''
      };
      _this12.timer = null;

      _this12.init();

      _this12.buildButtons();

      _this12.setManagerContainer();

      return _this12;
    }

    var _proto10 = SocialButtonManager.prototype;

    _proto10.init = function init() {
      this.managerContainer = $J.$new('div');
      this.managerButtonsContainer = $J.$new('div');
      this.managerShareContainer = $J.$new('div');
      this.managerButtonsContainer.addClass('smv-buttons-container');
      this.managerShareContainer.addClass('smv-share-container');

      if ($J.browser.mobile) {
        this.managerContainer.addClass('smv-manager-container-mobile');
      } else {
        this.managerContainer.addClass('smv-manager-container');
      }

      this.shareButton = new ShareSocialButton(this.capShareBut);
      this.managerShareContainer.append(this.shareButton.getNode());
      this.shareButton.setParent(this);
      this.addCustomEvent();
      this.addEventAnimationEnd();
    };

    SocialButtonManager.getDataImage = function getDataImage() {
      var data = {
        facebook: {
          width: 1080 * 2,
          height: 1080 * 2
        },
        twitter: {
          width: 1024 * 2,
          height: 512 * 2
        },
        linkedin: {
          width: 1200 * 2,
          height: 628 * 2
        },
        pinterest: {
          width: 735 * 2,
          height: 1102 * 2
        },
        tumblr: {
          width: 500 * 2,
          height: 750 * 2
        },
        telegram: {
          width: 1280 * 2,
          height: 1280 * 2
        },
        reddit: {
          width: 1125 * 2,
          height: 432 * 2
        }
      };
      return data;
    };

    _proto10.clickShareButton = function clickShareButton(control) {
      if (!control) {
        this.hide();
        this.clearTimer();
      } else if (control) {
        this.show();
        this.setAutoCloseButton();
      }

      this.lastState = control;
    };

    _proto10.addEventAnimationEnd = function addEventAnimationEnd() {
      var _this13 = this;

      this.managerContainer.addEvent('transitionend', function (e) {
        e.stop();
        e.stopQueue();

        if (e.oe.target === _this13.managerContainer && _this13.managerButtonsContainer.hasClass('smv-show')) {
          if (_this13.lastState) {
            _this13.hide();

            _this13.shareButton.setControl(_this13.lastState);

            _this13.clearTimer();
          }
        }
      });
    };

    _proto10.addCustomEvent = function addCustomEvent() {
      var _this14 = this;

      this.on('eventButton', function (e) {
        e.stop();

        _this14.clickShareButton(e.data);
      });
    };

    _proto10.closeButtons = function closeButtons() {
      if (this.managerButtonsContainer.hasClass('smv-show')) {
        this.hide();
        this.shareButton.setControl(this.lastState);
        this.clearTimer();
      }
    };

    _proto10.setAutoCloseButton = function setAutoCloseButton() {
      var _this15 = this;

      if (!$J.browser.mobile) {
        this.timer = setTimeout(function () {
          _this15.closeButtons();
        }, 5000);
      }
    };

    _proto10.clearTimer = function clearTimer() {
      if (!$J.browser.mobile) {
        clearTimeout(this.timer);
      }
    };

    _proto10.buildButtons = function buildButtons() {
      var _this16 = this;

      helper.objEach(this.options, function (key, value, index) {
        if (value) {
          var data = {
            text: _this16.data.text,
            link: _this16.data.link[key],
            title: _this16.data.title
          };
          var button = new buttonsContainer[getClassName(key)](data);

          _this16.classes.push(button);

          _this16.managerButtonsContainer.append(button.getNode());
        }
      });

      if ($J.browser.mobile) {
        this.showManagerContainer();
      }

      this.hide();
    };

    _proto10.getObjects = function getObjects() {
      return this.classes;
    };

    _proto10.getObject = function getObject(index) {
      if ($J.typeOf(index) === 'number' && index < this.classes.length) {
        return this.classes[index];
      }

      return -1;
    };

    _proto10.setManagerContainer = function setManagerContainer() {
      this.managerContainer.append(this.managerShareContainer);
      this.managerContainer.append(this.managerButtonsContainer);
      this.nodeContainer.append(this.managerContainer);
    };

    _proto10.show = function show() {
      this.managerButtonsContainer.addClass('smv-show');
    };

    _proto10.hide = function hide() {
      this.managerButtonsContainer.removeClass('smv-show');
    };

    _proto10.showManagerContainer = function showManagerContainer() {
      this.managerContainer.setCss({
        opacity: 1
      });
    };

    _proto10.destroy = function destroy() {
      this.options = null;

      if (this.classes) {
        this.classes.forEach(function (el) {
          if (el) {
            el.destroy();
          }
        });
      }

      this.data = null;
      this.classes = null;
      this.lastState = null;
      this.capShareBut = null;
      this.managerContainer.removeEvent('transitionend');
      this.managerContainer.remove();
      this.managerShareContainer.remove();
      this.managerButtonsContainer.remove();
      this.managerContainer = null;
      this.managerShareContainer = null;
      this.managerButtonsContainer = null;
      this.nodeContainer.remove();
      this.nodeContainer = null;
      this.off('eventButton');
      this.shareButton.destroy();
      this.shareButton = null;
      this.timer = null;
    };

    return SocialButtonManager;
  }(EventEmitter);

  return SocialButtonManager;
});
//# sourceMappingURL=socialButtons.js.map
