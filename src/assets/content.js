// @ts-ignore

chrome.runtime.onMessage.addListener((message) => {

    console.log(' IN CONTENT ')
    console.log(message);
    const groupToHop = 'omegapool';

    // @ts-ignore
    const selectAllCheckbox = document.querySelector('.select_all');
    const assignGroupBtn = document.getElementById('buttonUserGroup');

    // @ts-ignore
    if (selectAllCheckbox && !selectAllCheckbox.checked) {
        // @ts-ignore
        selectAllCheckbox.click();
        // @ts-ignore
        assignGroupBtn.click();
    }

    const groupSelectList = document.getElementById('userGroupId');
    const groupSaveBtn = document.getElementsByClassName('btn-save-group');

    console.log(groupSelectList)
    if (groupSelectList) {

        let groupToActivateIndex;
        // @ts-ignore
        for (let i = 0; i < groupSelectList.length; i += 1) {

            console.log(groupSelectList[i].text);


            if (groupSelectList[i].text.includes(groupToHop)) {
                groupToActivateIndex = i;
                break;
            }
        }

        // @ts-ignore
        groupSelectList.options.selectedIndex = groupToActivateIndex;

        if (groupSaveBtn && groupSaveBtn[0]) {
            setTimeout(() => {
                // @ts-ignore
                groupSaveBtn[0].click();
            }, 1000);

            setTimeout(() => {
                // chrome.runtime.sendMessage( 'Hop successful!',  options, function responseCallback)
            }, 5000);
        }

    }
});





// $('body').mousemove(function (event) {
//     // console.log(event)
//     $('.mphce-hover').removeClass('mphce-hover');
//     $(event.target).addClass('mphce-hover');
// });

// $(document).click(function (event) {
//     event.preventDefault();

//     const path = fullPath(event.target);
//     const el = $(path);
//     const text = $($(path)[0]).text();

//     // chrome.storage.sync.set({
//     //     type: 'selected-element',
//     //     elementSelector: path,
//     //     elementText: +text
//     // }, function () {
//     //     console.log('Value is set to ' + path);
//     //     console.log(+text);
//     // });
//     // $(document).unbind('click');
//     // $('body').unbind('mousemove');
//     // $('.mphce-hover').removeClass('mphce-hover');

//     // chrome.runtime.sendMessage({
//     //     type: 'selected-element',
//     //     elementSelector: path,
//     //     elementText: +text
//     // }, function (response) {
//     //     if (response) {
//     //         $(document).unbind('click');
//     //         $('body').unbind('mousemove');
//     //         $('.mphce-hover').removeClass('mphce-hover');
//     //     }
//     // });
// });



// // function fullPath(el: any) {
// //     const names = [];
// //     while (el.parentNode) {
// //         if (el.id) {
// //             names.unshift('#' + el.id);
// //             break;
// //         } else {
// //             if (el === el.ownerDocument.documentElement) names.unshift(el.tagName);
// //             else {
// //                 for (let c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++) {
// //                     names.unshift(el.tagName + ':nth-child(' + c + ')');
// //                 }
// //             }
// //             el = el.parentNode;
// //         }
// //     }
// //     return names.join(' > ');
// // }

// function fullPath(el: any): string {
//     if (!(el instanceof Element))
//         return '';
//     const path = [];
//     while (el.nodeType === Node.ELEMENT_NODE) {
//         let selector = el.nodeName.toLowerCase();
//         if (el.id) {
//             selector += '#' + el.id;
//             path.unshift(selector);
//             break;
//         } else {
//             let sib = el, nth = 1;
//             while (sib = sib.previousElementSibling) {
//                 if (sib.nodeName.toLowerCase() == selector)
//                     nth++;
//             }
//             // tslint:disable-next-line:triple-equals
//             if (nth != 1)
//                 selector += ':nth-of-type(' + nth + ')';
//         }
//         path.unshift(selector);
//         el = el.parentNode;
//     }
//     return path.join(' > ');
// }
